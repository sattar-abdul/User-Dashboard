// src/components/UserDialog.tsx
import React, { useEffect } from "react";
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
import {
  useAddUserMutation,
  useUpdateUserMutation,
  useGetUsersQuery,
} from "../features/users/usersApi";
import { useAppDispatch } from "../hooks/useAppDispatch";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1, "Email is required"),
  username: z.string().min(1, "Username is required"),
});
type FormSchema = z.infer<typeof schema>;

export default function UserDialog() {
  const dispatch = useAppDispatch();
  const { dialogOpen, editingUserId } = useSelector((s: RootState) => s.ui);

  // Get users so we can prefill when editing
  const { data: users } = useGetUsersQuery();

  const [addUser, { isLoading: adding }] = useAddUserMutation();
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(schema),
  });

  // Prefill when editingUserId changes
  useEffect(() => {
    if (editingUserId && users) {
      const u = users.find((x) => x.id === editingUserId);
      if (u) {
        setValue("name", u.name);
        setValue("email", u.email);
        setValue("username", u.username);
      }
    } else {
      reset();
    }
  }, [editingUserId, users]);

  const onSubmit = async (data: FormSchema) => {
    try {
      if (editingUserId) {
        await updateUser({ id: editingUserId, ...data }).unwrap();
      } else {
        // jsonplaceholder will return a mock id
        await addUser(data as any).unwrap();
      }
      dispatch(closeDialog());
    } catch (err) {
      // For now log; later hook in snackbars for user feedback
      console.error("Mutation error:", err);
    }
  };

  return (
    <Dialog
      open={dialogOpen}
      onClose={() => dispatch(closeDialog())}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{editingUserId ? "Edit User" : "Add User"}</DialogTitle>

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
          <Button onClick={() => dispatch(closeDialog())}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={adding || updating}
          >
            {editingUserId ? "Save Changes" : "Add User"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
