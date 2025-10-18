// src/features/users/usersSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User, NewUser } from "./types";

interface UsersState {
  users: User[];
  nextId: number;
}

const initialUsers: User[] = [
  {
    id: 1,
    name: "Oggy",
    username: "oggy",
    email: "oggy@gmail.com",
  },
  {
    id: 2,
    name: "Jack",
    username: "jack12",
    email: "jack@gmail.com",
  },
  {
    id: 3,
    name: "Olivia",
    username: "olvia",
    email: "olivia@gmail.com",
  },
];

const initialState: UsersState = {
  users: initialUsers,
  nextId: initialUsers.length + 1,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<NewUser>) {
      const newUser: User = { id: state.nextId++, ...action.payload };
      state.users.push(newUser);
    },
    updateUser(state, action: PayloadAction<User>) {
      const idx = state.users.findIndex((u) => u.id === action.payload.id);
      if (idx !== -1) state.users[idx] = action.payload;
    },
    deleteUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((u) => u.id !== action.payload);
    },
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;
