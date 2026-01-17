# 🌐 API aur JWT Seekhein (Hinglish Guide)

Is folder mein hum seekhenge ki API kaise banti hai aur JWT (JSON Web Token) ka asli kaam kya hota hai.

---

## 🚀 1. API Kya Hai? (Basics)

API (Application Programming Interface) ek "Waiter" ki tarah hoti hai.

- Tum (Client/Frontend) menu se order karte ho.
- Waiter (API) kitchen (Server/Database) tak jata hai.
- Waiter khana (Data) lekar wapas aata hai.

In simple words: API do software pieces ko aapas mein baat karne deti hai.

---

## 🔐 2. JWT (JSON Web Token) Kaun Hai?

JWT ek secure rasta hai ye batane ka ki "Main wahi user hoon jo login hua tha".

**Problem:** Server bhulakkad (stateless) hota hai. Har request pe wo bhool jata hai ki tum kaun ho.
**Solution:** JWT.

### JWT Ka Flow (Hinglish):

1. **Login:** Tumne username/password bheja.
2. **Token Creation:** Server ne check kiya, sab sahi hai. Ab server ek "Identity Card" (Token) banata hai aur tumhe de deta hai.
3. **Storage:** Tum us token ko apne paas (Browser memory/cookies) rakh lete ho.
4. **Usage:** Agli baar jab bhi koi secret data chahiye (like Profile), tum wo token saath mein bhejte ho.
5. **Verification:** Server sirf token check karta hai, agar sign sahi hai toh data de deta hai. Baar-baar password nahi mangta.

---

## 🛠️ 3. Folder Structure

- `server.js`: Hamara main server.
- `middleware/auth.js`: Ye "Guard" hai jo check karega ki token sahi hai ya nahi.
- `.env`: Secret keys rakhne ke liye.

---

## 🚦 4. Kaise Test Karein?

1. `npm install` (Dependencies install karne ke liye)
2. `node server.js` (Server start karne ke liye)
3. Use Postman ya `curl` to test the routes.

---

## 💡 Important Logic

- **`jwt.sign()`**: Token banane ke liye (Login ke waqt).
- **`jwt.verify()`**: Token check karne ke liye (Protected routes ke waqt).

Agla step: Code check karo `server.js` mein!
