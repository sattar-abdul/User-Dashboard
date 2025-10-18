// src/components/UsersTable.tsx
import { useMemo, useState, useEffect } from "react";
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
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGetUsersQuery } from "../features/users/usersApi";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { openEditDialog, openConfirm } from "../features/ui/uiSlice";

export default function UsersTable() {
  const { data: users, isLoading, isError, error } = useGetUsersQuery();
  const dispatch = useAppDispatch();

  // Search state + debounced query text
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Filter users client-side by name (case-insensitive)
  const filtered = useMemo(() => {
    if (!users) return [];
    if (!debouncedQuery) return users;
    const q = debouncedQuery.toLowerCase();
    return users.filter((u) => u.name.toLowerCase().includes(q));
  }, [users, debouncedQuery]);

  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" py={6}>
        <CircularProgress />
      </Box>
    );

  if (isError)
    return (
      <Box py={6}>
        <Typography color="error">
          Error loading users: {JSON.stringify(error)}
        </Typography>
      </Box>
    );

  return (
    <Box>
      {/* Search bar */}
      <Box mb={2} display="flex" justifyContent="flex-start">
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name..."
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
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Username</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <Box py={4} textAlign="center">
                    <Typography>No users found.</Typography>
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
                    <IconButton onClick={() => dispatch(openEditDialog(u.id))}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => dispatch(openConfirm(u.id))}>
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
