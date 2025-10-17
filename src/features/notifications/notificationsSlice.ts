// src/features/notifications/notificationsSlice.ts
import { createSlice } from "@reduxjs/toolkit";

export type NotificationSeverity = "success" | "info" | "warning" | "error";

interface NotificationState {
  open: boolean;
  message: string | null;
  severity: NotificationSeverity;
}

const initialState: NotificationState = {
  open: false,
  message: null,
  severity: "info",
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    showNotification(
      state,
      action: { payload: { message: string; severity?: NotificationSeverity } }
    ) {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity ?? "info";
    },
    hideNotification(state) {
      state.open = false;
      state.message = null;
    },
  },
});

export const { showNotification, hideNotification } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
