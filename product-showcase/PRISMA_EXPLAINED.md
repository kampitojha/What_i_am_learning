# Prisma Simplified Guide (Hinglish)

Prisma ko samajhna bohot aasaan hai agar aap ise ek **"Translater" (Anuvadak)** ki tarah dekhein.

---

## 1. Prisma Kya Hai? (In Simple Terms)

Socho aapko **JavaScript** aati hai, aur Database ko **SQL** aati hai.
Dono ki bhasha alag hai.

- Aap bolte ho: `user dhoondo jiska id 1 hai`.
- Database chahta hai: `SELECT * FROM users WHERE id = 1;`.

**Prisma wo bich ka aadmi (Middleman) hai jo aapki JavaScript baat ko Database ki SQL bhasha mein translate karta hai.**

Aap bas likhte ho:

```javascript
db.user.findUnique({ where: { id: 1 } });
```

Aur Prisma background mein heavy SQL queries khud handle kar leta hai. Isko technically **ORM (Object-Relational Mapper)** kehte hain.

---

## 2. Prisma Ke 3 Main Hisse

Prisma 3 cheezon se milkar banta hai:

### A. Prisma Schema (`schema.prisma`)

Yeh aapke ghar ka naksha (Blueprint) hai.
Yahan aap batate ho ki:

- Database kaunsa use kar rahe ho (PostgreSQL, MySQL, etc).
- Tables kaisi dikhengi (User table, Product table).
- Kiska kiske saath rishta hai (User ke paas multiple Orders hain).

### B. Prisma Client

Yeh wo tool hai jo aap apne code mein use karte ho.
Aap likhte ho `prisma.user.create(...)` aur yeh jaadu se database mein data daal deta hai.
Maze ki baat: Yeh **Auto-complete** deta hai. Jaise hi `prisma.` likhoge, wo khud dikhayega ki `user`, `product` available hain.

### C. Prisma Migrate

Jab aap Schema file mein kuch change karte ho (jaise naya column add kiya), toh Database ko kaise pata chalega?
**Migrate** command aapke database ko update karti hai taaki wo Schema se match kare.
Command: `npx prisma migrate dev` (Matlab: "Dev bhai, database update kar do").

---

## 3. `schema.prisma` File Ka Breakdown

Jo file humne banayi, uske keywords ka matlab:

1.  **`model User {}`**: Iska matlab database mein ek Table banegi jiska naam `User` hoga.
2.  **`@id`**: Yeh batata hai ki yeh field har user ka alag (unique) hoga, jaise Roll Number.
3.  **`@default(autoincrement())`**: Matlab "Prisma bhai, ID khud 1, 2, 3... badhate rehna, main nahi dunga".
4.  **`@unique`**: Matlab, pure database mein yeh value dubara nahi aa sakti (jaise Email).
5.  **`?` (Question Mark)**: Matlab yeh field chaho toh khaali chhod do (Optional).
6.  **`@relation`**: Do unjaan tables ki dosti karana.
    - _Example:_ `orders Order[]` ka matlab ek User ke paas bohot saare Orders ki list ho sakti hai.

---

## 4. Kaise Use Karte Hain? (Workflow)

Real project mein flow aisa hota hai:

**Step 1: Schema Likho**
`schema.prisma` file mein apne tables define karo.

**Step 2: Database Update Karo (Migrate)**
Terminal mein chalao:

```bash
npx prisma migrate dev --name init
```

Isse database mein asli tables ban jayengi.

**Step 3: Code Mein Use Karo**
Apni JavaScript/Typescript file mein:

```javascript
// 1. User banana
const newUser = await prisma.user.create({
  data: {
    name: "Rahul",
    email: "rahul@gmail.com",
  },
});

// 2. User dhoondna
const user = await prisma.user.findFirst({
  where: { email: "rahul@gmail.com" },
});
```

---

## 5. Kyun Use Karein? (Benefits)

1.  **Type-Safety:** Agar aap galti se `email` ki jagah `emial` likh doge, toh code run hone se pehle hi laal rang (red underline) dega.
2.  **Speed:** SQL queries likhne mein time lagta hai, Prisma mein bas function call karna hai.
3.  **Readability:** Code padhke samajh aa jata hai ki kya ho raha hai, SQL ke complex joins samajhne ki zarurat nahi.
