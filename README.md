# User Management Dashboard

A simple **User Management Dashboard** built with **React + TypeScript**, featuring CRUD operations, Redux Toolkit, MUI, and mock data using Api.

---

## Overview

This app allows you to:

- View all users in a Material UI table  
- Add, edit, and delete users using dialogs  
- Filter users by name 
- Get success/error notifications via snackbars  
- Manage state using **Redux Toolkit**  
- Validate forms using **React Hook Form + Zod**

---

## Tech Stack

| Category | Library / Tool |
|-----------|----------------|
| **Language** | TypeScript |
| **UI Library** | Material UI (MUI v5) |
| **State Management** | Redux Toolkit |
| **Form Handling** | React Hook Form + Zod |
| **Notifications** | Custom Snackbar System |
| **Build Tool** | Vite |

---

## Project Structure
```
src/
├── app/
│ └── store.ts
├── components/
│ ├── UsersTable.tsx
│ ├── UserDialog.tsx
│ ├── ConfirmDialog.tsx
│ └── NotificationBar.tsx
├── features/
│ ├── users/
│ │ ├── usersSlice.ts
│ │ └── types.ts
│ ├── ui/
│ │ └── uiSlice.ts
│ └── notifications/
│ └── notificationsSlice.ts
├── hooks/
│ ├── useAppDispatch.ts
│ ├── useUsers.ts
│ └── useAppSelector.ts
├── App.tsx
└── main.tsx
```

## Setup Instructions

### 1️. Clone the repository
```bash
git clone https://github.com/<your-username>/user-management-dashboard.git
cd user-management-dashboard
```

### 2️. Install dependencies
```bash
npm install
```

### 3️. Run the development server
```bash
npm run dev
```

Then open your browser and go to: http://localhost:5173/


## Features
### 1. User Table
- Displays all users in a MUI table.
- Supports real-time search filtering.

### 2. Add User
- Opens a dialog with validation.
- Adds a user in Redux state (Mock).

### 3. Edit User
- Opens dialog prefilled with selected user data.
- Updates user instantly in Redux state (Mock) .

### 4. Delete User
- Confirmation dialog before deletion.
- User removed from Redux state (Mock).

### 5. Notifications
- Snackbar notifications for Add/Edit/Delete operations.


## Deployment
Deployed on Netlify:
```bash
npm run build
netlify deploy
```
Live: https://user-dashboard00.netlify.app/
