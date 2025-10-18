// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uiSlice";
import notificationsReducer from "../features/notifications/notificationsSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    ui: uiReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
