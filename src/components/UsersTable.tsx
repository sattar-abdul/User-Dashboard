import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  IconButton,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetUsersQuery } from "../features/users/usersApi";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { openConfirm, openEditDialog } from "../features/ui/uiSlice";

export default function UsersTable() {
  const { data: users, isLoading, isError, error } = useGetUsersQuery;
  const dispatch = useAppDispatch();

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" py={6}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box py={6}>
        <Typography color="error">Error loading users.</Typography>
      </Box>
    );

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>UserName</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.name}</TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>{u.username}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => dispatch(openEditDialog(u.id))}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => dispatch(openConfirm(u.id))}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
