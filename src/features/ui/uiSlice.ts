// src/features/ui/uiSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UiState {
  dialogOpen: boolean;
  editingUserId: number | null;
  confirmOpen: boolean;
  deletingUserId: number | null;
}

const initialState: UiState = {
  dialogOpen: false,
  editingUserId: null,
  confirmOpen: false,
  deletingUserId: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    openAddDialog(state) {
      state.dialogOpen = true;
      state.editingUserId = null;
    },
    openEditDialog(state, action: PayloadAction<number>) {
      state.dialogOpen = true;
      state.editingUserId = action.payload;
    },
    closeDialog(state) {
      state.dialogOpen = false;
      state.editingUserId = null;
    },
    openConfirm(state, action: PayloadAction<number>) {
      state.confirmOpen = true;
      state.deletingUserId = action.payload;
    },
    closeConfirm(state) {
      state.confirmOpen = false;
      state.deletingUserId = null;
    },
  },
});

export const {
  openAddDialog,
  openEditDialog,
  closeDialog,
  openConfirm,
  closeConfirm,
} = uiSlice.actions;

export default uiSlice.reducer;
