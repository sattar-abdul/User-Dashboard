// src/hooks/useUsers.ts
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { addUser, updateUser, deleteUser } from "../features/users/usersSlice";
import type { User, NewUser } from "../features/users/types";

export const useUsers = () => {
  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch<AppDispatch>();

  return {
    users,
    addUser: (user: NewUser) => dispatch(addUser(user)),
    updateUser: (user: User) => dispatch(updateUser(user)),
    deleteUser: (id: number) => dispatch(deleteUser(id)),
  };
};
