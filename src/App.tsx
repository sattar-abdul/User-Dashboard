import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UsersTable from "./components/UsersTable";
import UserDialog from "./components/UserDialog";
import ConfirmDialog from "./components/ConfirmDialog";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { openAddDialog } from "./features/ui/uiSlice";

export default function App() {
  const dispatch = useAppDispatch();

  return (
    <Container maxWidth="lg">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
        mb={2}
      >
        <Typography variant="h4">User Management Dashboard</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => dispatch(openAddDialog())}
        >
          Add User
        </Button>
      </Box>

      <UsersTable />

      <UserDialog />
      <ConfirmDialog />
    </Container>
  );
}
