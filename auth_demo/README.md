# Auth Demo Project

This project demonstrates **Authentication (AuthN)** and **Authorization (AuthZ)** using Node.js, Express, and JWT.

## Setup

1. Open terminal in this folder: `cd auth_demo`
2. Install: `npm install`

## How to Run

1. Start the server (keep this terminal open):

   ```bash
   node server.js
   ```

2. **Test the Flow (Automated Demo)**
   Open a **new** terminal window and run:
   ```powershell
   powershell -ExecutionPolicy Bypass -File test_flow.ps1
   ```
   This script will automatically:
   - Login as a User (John).
   - Show you the Token.
   - Access Profile (Success).
   - Try to access Admin Panel (Fail/Blocked).
   - Login as an Admin (Jane).
   - Access Admin Panel (Success).

## Manual Testing (API)

| Action      | Method | URL        | Body/Headers                                          |
| ----------- | ------ | ---------- | ----------------------------------------------------- |
| **Login**   | POST   | `/login`   | `{"username": "john_doe", "password": "password123"}` |
| **Profile** | GET    | `/profile` | Header: `Authorization: Bearer <TOKEN>`               |
| **Admin**   | GET    | `/admin`   | Header: `Authorization: Bearer <TOKEN>`               |

## Key Files

- `server.js`: The main backend logic.
- `generate_token_script.js`: A simple script to understand how JWTs are created.
- `conceptual_guide.md`: Detailed explanation in Hinglish.
