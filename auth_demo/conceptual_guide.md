# Authentication vs Authorization: A Complete Guide

Simple bhasha mein samjhein toh:

1.  **Authentication (Pehchan - "Who are you?")**:
    - Yeh verify karta hai ki aap kaun hain.
    - Example: Login form jahan aap username aur password daalte hain.
    - Real-world Example: Jab aap airport gate par apna **ID card/Passport logic** dikhate hain.

2.  **Authorization (Permission - "What can you do?")**:
    - Yeh check karta hai ki aapko kya access karne ki permission hai.
    - Example: Login karne ke baad, kya aap "Admin Panel" dekh sakte hain ya sirf "User Profile"?
    - Real-world Example: Airport ke andar jaane ke baad, kya aapke paas **First Class Lounge** mein jaane ka ticket (Boarding Pass) hai?

---

## 🔑 Details Explained

### 1. Authentication (AuthN)

- **Goal**: Identity Verify karna.
- **Process**: User credentials (username/password) bhejta hai. Server check karta hai DB se. Agar sahi hai, toh server confirm karta hai "Haan, yeh wahi banda hai".
- **Common Methods**:
  - Password
  - OTP (One Time Password)
  - Biometrics (Fingerprint/FaceID)

### 2. Authorization (AuthZ)

- **Goal**: Access Control.
- **Process**: Authentication ke baad, server user ko ek "Token" ya "Session ID" deta hai. Jab user kisi secure page (e.g., /admin) par jaata hai, woh ye token dikhata hai. Server token dekh kar decide karta hai ki gate kholna hai ya nahi.
- **Common Methods**:
  - Roles (Admin, User, Manager)
  - Permissions (Read, Write, Delete)

---

## 🔄 The Flow (Kaise kaam karta hai code mein)

1.  **Login (AuthN)**:
    - User sends `username` & `password`.
    - Server verifies credentials.
    - Server creates a **JWT (JSON Web Token)** (like a stamped digital ID card) and sends it back to the user.

2.  **Accessing Data (AuthZ)**:
    - User wants to see their "Profile".
    - User sends the request + the **JWT** (usually in headers).
    - Server validates the signature of the JWT.
    - Server checks if the JWT allows access to "Profile".
    - Server returns data.

---

## 📝 Is Project Mein Kya Hai?

Humne ek chhota sa Node.js server banaya hai (`server.js`) jo ye demonstrate karta hai:

1.  `/login`: Yahan hum Authentication karenge. Sahi password par token milega.
2.  `/profile`: Yeh ek protected route hai. Bina valid token ke yahan entry nahi milegi (Authorization).
