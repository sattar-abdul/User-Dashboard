// src/components/UsersTable.tsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUsers } from "../hooks/useUsers";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { openEditDialog, openConfirm } from "../features/ui/uiSlice";

export default function UsersTable() {
  const dispatch = useAppDispatch();
  const { users } = useUsers(); // from local users slice

  // Search state + debounced value
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 250);
    return () => clearTimeout(t);
  }, [query]);

  const filtered = useMemo(() => {
    if (!users) return [];
    if (!debouncedQuery) return users;
    const q = debouncedQuery.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q)
    );
  }, [users, debouncedQuery]);

  return (
    <Box>
      {/* Search bar */}
      <Box mb={2} display="flex" justifyContent="flex-start">
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, email or username..."
          size="small"
          variant="filled"
          sx={{ width: 340, backgroundColor: "#ffffff", borderRadius: 1.5 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: query ? (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => {
                    setQuery("");
                    setDebouncedQuery("");
                  }}
                >
                  ✕
                </IconButton>
              </InputAdornment>
            ) : undefined,
          }}
        />
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Username</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Box py={4} textAlign="center">
                    <Typography variant="body1" color="text.secondary">
                      {users.length === 0
                        ? "No users available. Add a user to get started."
                        : "No users match your search."}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((u) => (
                <TableRow key={u.id}>
                  <TableCell>{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.username}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      onClick={() => dispatch(openEditDialog(u.id))}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => dispatch(openConfirm(u.id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
