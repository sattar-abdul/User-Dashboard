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
import { useAppDispatch } from "../hooks/useAppDispatch";
import { closeConfirm } from "../features/ui/uiSlice";
import { useUsers } from "../hooks/useUsers";
import { showNotification } from "../features/notifications/notificationsSlice";

export default function ConfirmDialog() {
  const dispatch = useAppDispatch();
  const { confirmOpen, deletingUserId } = useSelector(
    (state: RootState) => state.ui
  );
  const { deleteUser } = useUsers();

  const handleConfirm = () => {
    if (deletingUserId != null) {
      deleteUser(deletingUserId);
      dispatch(
        showNotification({ message: "User deleted", severity: "success" })
      );
    }
    dispatch(closeConfirm());
  };

  return (
    <Dialog
      open={confirmOpen}
      onClose={() => dispatch(closeConfirm())}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to delete this user?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closeConfirm())}>Cancel</Button>
        <Button onClick={handleConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
