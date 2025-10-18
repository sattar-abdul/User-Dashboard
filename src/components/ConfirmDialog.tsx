// src/components/ConfirmDialog.tsx
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { closeConfirm } from "../features/ui/uiSlice";
import { useDeleteUserMutation } from "../features/users/usersApi";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { showNotification } from "../features/notifications/notificationsSlice";

export default function ConfirmDialog() {
  const dispatch = useAppDispatch();
  const { confirmOpen, confirmTargetId } = useSelector((s: RootState) => s.ui);

  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDelete = async () => {
    if (!confirmTargetId) return;
    try {
      await deleteUser(confirmTargetId).unwrap();
      dispatch(
        showNotification({ message: "User deleted", severity: "success" })
      );
      dispatch(closeConfirm());
    } catch (err) {
      console.error(err);
      dispatch(
        showNotification({ message: "Delete failed", severity: "error" })
      );
    }
  };

  return (
    <Dialog open={confirmOpen} onClose={() => dispatch(closeConfirm())}>
      <DialogTitle>Delete user?</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this user? This action will be mocked.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeConfirm())}>Cancel</Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={isLoading}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
