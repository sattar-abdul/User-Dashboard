// Using React Hook From + Zod for Validation

import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useFrom } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { closeDialog } from "../features/ui/uiSlice";
import {
  useAddUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../features/users/usersApi";
import { useAppDispatch } from "../hooks/useAppDispatch";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email").min(1),
  username: z.string().min(1, "Username is required"),
});

type FormSchema = z.infer<typeof schema>;

export default function UserDialog() {
  const { dialogOpen, editingUserId } = useSelector((s: RootState) => s.ui);
  const { data: users } = useGetUsersQuery();

  const [addUser, { isLoading: adding }] = useAddUserMutation();
  const [updateUser, { isLoading: updating }] = useUpdateUserMutation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useFrom<FormSchema>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (editingUserId && users) {
      const u = users.find((x) => x.id === editingUserId);
      if (u) {
        setValue("name", u.name);
        setValue("eamil", u.email);
        setValue("username", u.username);
      }
    } else {
      reset();
    }
  }, [editingUserId, users, setValue, reset]);

  const onSubmit = async (data: FormSchema) => {
    try {
      if (editingUserId) {
        await updateUser({ id: editingUserId, ...data }).unwrap();
      } else {
        await addUser(data as any).unwrap();
      }
      dispatch(closeDialog());
    } catch (e) {
      //Todo: Handle error - show snackbar, etc
      console.error(e);
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            margin="normal"
            fullwidth
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Username"
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
