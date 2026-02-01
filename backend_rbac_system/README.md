# Backend RBAC System

This project implements a Role-Based Access Control (RBAC) system with three roles: `User`, `Admin`, and `SuperAdmin`.

## Roles & Permissions

1.  **User**:
    - Can Register/Login.
    - Can Create Tasks.
    - Can View their own Tasks.
    - Can mark Tasks as Completed.

2.  **Admin**:
    - Can View all Users.
    - **Cannot** directly delete users or perform sensitive actions.
    - Must **Request** sensitive actions (e.g., `DELETE_USER`).
    - Requests are sent to the SuperAdmin queue.

3.  **SuperAdmin**:
    - Can View all pending requests from Admins.
    - Can **Approve** or **Reject** requests.
    - If Approved, the system automatically executes the action (e.g., deletes the user).

## Setup

1.  Navigate to the directory:
    ```bash
    cd backend_rbac_system
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the server:
    ```bash
    node server.js
    ```
    (Ensure MongoDB is running locally)

## API Endpoints

### Auth

- `POST /api/auth/register` - { username, email, password, role }
- `POST /api/auth/login` - { email, password } -> Returns Token

### User (Requires Token)

- `GET /api/user/tasks`
- `POST /api/user/tasks` - { title, description }
- `PUT /api/user/tasks/:id` - { status }

### Admin (Requires Token + Role: Admin)

- `GET /api/admin/users`
- `POST /api/admin/request-delete-user` - { userId } -> Creates a Request

### SuperAdmin (Requires Token + Role: SuperAdmin)

- `GET /api/superadmin/requests`
- `POST /api/superadmin/process-request` - { requestId, decision: 'Approved' | 'Rejected' }

## Testing Flow

1.  **Register a User**: Create a normal user.
2.  **Register an Admin**: Create a user with `role: "Admin"`.
3.  **Register a SuperAdmin**: Create a user with `role: "SuperAdmin"`.
4.  **Admin Action**: Login as Admin, get the User's ID (from `/api/admin/users`), and call `/request-delete-user`.
5.  **SuperAdmin Action**: Login as SuperAdmin, see the request in `/requests`, and Approve it via `/process-request`.
6.  **Verify**: Log back in as Admin/SuperAdmin and check if the User is deleted.
