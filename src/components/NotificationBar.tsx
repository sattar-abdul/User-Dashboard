// src/components/NotificationBar.tsx

import { Snackbar, Alert } from "@mui/material";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { hideNotification } from "../features/notifications/notificationsSlice";

export default function NotificationBar() {
  const dispatch = useAppDispatch();
  const { open, message, severity } = useSelector((s: RootState) => s.notifications
  );

  const handleClose = (_: unknown, reason?: string) => {
    if (reason === "clickaway") return;
    dispatch(hideNotification());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
