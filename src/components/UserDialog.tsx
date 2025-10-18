// src/components/UserDialog.tsx
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { closeDialog } from "../features/ui/uiSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useUsers } from "../hooks/useUsers";
import { showNotification } from "../features/notifications/notificationsSlice";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  username: z.string().min(1, "Username is required"),
});
type FormSchema = z.infer<typeof schema>;

export default function UserDialog() {
  const dispatch = useAppDispatch();
  const { dialogOpen, editingUserId } = useSelector((s: RootState) => s.ui);

  // local users API (in-memory)
  const { users, addUser, updateUser } = useUsers();

  // submission indicator
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  // prefill fields when editing
  useEffect(() => {
    if (editingUserId != null) {
      const u = users.find((x) => x.id === editingUserId);
      if (u) {
        setValue("name", u.name);
        setValue("email", u.email);
        setValue("username", u.username);
        return;
      }
    }
    // otherwise reset (for add)
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingUserId, users, setValue, reset]);

  const onSubmit = async (data: FormSchema) => {
    setIsSubmitting(true);
    try {
      if (editingUserId != null) {
        // update existing user
        await Promise.resolve(updateUser({ id: editingUserId, ...data }));
        dispatch(
          showNotification({ message: "User updated", severity: "success" })
        );
      } else {
        // add new user
        await Promise.resolve(addUser(data)); /* addUser dispatch; wrapped */
        dispatch(
          showNotification({ message: "User added", severity: "success" })
        );
      }
      dispatch(closeDialog());
    } catch (err) {
      console.error("User dialog operation failed", err);
      dispatch(
        showNotification({ message: "Operation failed", severity: "error" })
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => dispatch(closeDialog())}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {editingUserId != null ? "Edit User" : "Add User"}
      </DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <DialogContent>
          <TextField
            label="Name"
            margin="normal"
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Email"
            margin="normal"
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Username"
            margin="normal"
            fullWidth
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => dispatch(closeDialog())}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {editingUserId != null ? "Save Changes" : "Add User"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
