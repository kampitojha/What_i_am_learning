# Prisma Simplified Guide (Hinglish)

Prisma ko samajhna bohot aasaan hai agar aap ise ek **"Translater" (Anuvadak)** ki tarah dekhein.

---

## 1. Prisma Kya Hai? (In Simple Terms)

Socho aapko **JavaScript** aati hai, aur Database ko **SQL** aati hai. Dono ki bhasha alag hai.
**Prisma wo bich ka aadmi (Middleman) hai jo aapki JavaScript baat ko Database ki SQL bhasha mein translate karta hai.**

---

## 2. Keywords Dictionary (Sabse Important Section)

Yeh rahi Prisma Schema mein use hone wale saare important keywords ki list. Isse "Ratta maarne" ki zarurat nahi, bas samajh lo ki kaun kya karta hai.

### A. Main Blocks (Ghar ke Kamre)

| Keyword      | Kya karta hai?                                      | Example                         |
| :----------- | :-------------------------------------------------- | :------------------------------ |
| `datasource` | Batata hai database kaunsa hai aur kahan hai (URL). | `provider = "postgresql"`       |
| `generator`  | Code generate karta hai (Client).                   | `provider = "prisma-client-js"` |
| `model`      | Database ki **Table** define karta hai.             | `model User { ... }`            |
| `enum`       | Fixed options ki list banata hai.                   | `enum Role { ADMIN, USER }`     |

### B. Field Attributes (Column ki Properties - `@`)

Yeh kisi ek specific column (field) par lagte hain.

| Keyword          | Meaning (Hinglish)                                                                             |
| :--------------- | :--------------------------------------------------------------------------------------------- |
| `@id`            | **Primary Key**. Har row ki pehchaan (ID).                                                     |
| `@default(...)`  | Agar value nahi di, toh yeh value use hogi.                                                    |
| `@unique`        | Is column mein duplicate value allowed nahi hai (e.g. Email).                                  |
| `@relation(...)` | Do tables ko jodta hai (Foreign Key).                                                          |
| `@updatedAt`     | Jab bhi record update hoga, current time set kar dega.                                         |
| `@map("name")`   | Database mein column ka naam alag rakhna ho toh (DB mein `first_name`, Code mein `firstName`). |
| `@ignore`        | Prisma is field ko ignore karega (Code mein nahi dikhayega).                                   |
| `@db.Text`       | Agar bohot bada text store karna ho (String chota hota hai, Text bada).                        |

### C. Functions (Jo `@default` ke andar use hote hain)

| Function          | Kaam                                                     |
| :---------------- | :------------------------------------------------------- |
| `autoincrement()` | Automatically 1, 2, 3... count badhata hai.              |
| `uuid()`          | Ek lambi unique ID banata hai (`550e8400-e29b...`).      |
| `cuid()`          | UUID se thoda chota aur safe ID format.                  |
| `now()`           | Abhi ka time (Current Timestamp) dalta hai.              |
| `dbgenerated()`   | Agar database ka apna koi special function use karna ho. |

### D. Block Attributes (Poore Model ke liye - `@@`)

Yeh model ke end mein lagte hain aur poori table par asar dalte hain.

| Keyword            | Meaning                                                                         |
| :----------------- | :------------------------------------------------------------------------------ |
| `@@id([fields])`   | Composite Primary Key (Jab 2 columns milkar ID banein).                         |
| `@@unique([a, b])` | Jab 2 columns ka combination unique hona chahiye (e.g. First Name + Last Name). |
| `@@index([email])` | Searching fast karne ke liye Index banata hai.                                  |
| `@@map("users")`   | Model ka naam `User` par Database table ka naam `users` rakhna ho.              |

### E. Data Types (Column kaisa data rakhega?)

| Type                | Description                                              |
| :------------------ | :------------------------------------------------------- |
| `String`            | Text value (Name, Email).                                |
| `Int`               | Number (Age, Quantity).                                  |
| `Boolean`           | True / False (IsActive?).                                |
| `DateTime`          | Date aur Time.                                           |
| `Float` / `Decimal` | Points wale number (Price: 99.50).                       |
| `Json`              | Poora JSON data store karne ke liye (Config, Metadata).  |
| `Bytes`             | Images ya Files ka raw data (Kam use hota hai).          |
| `Unsupported("")`   | Aisa type jo Prisma support nahi karta par DB karta hai. |

---

## 3. Real Example Breakdown

Ek chota example dekhte hain saare keywords ke saath:

```prisma
model User {
  // 1. INT ID: Auto-increment (1, 2, 3...)
  id        Int      @id @default(autoincrement())

  // 2. STRING: Unique Email
  email     String   @unique

  // 3. OPTIONAL: Name ho bhi sakta hai, nahi bhi (?)
  name      String?

  // 4. DEFAULT: By default role 'USER' hoga
  role      Role     @default(USER)

  // 5. RELATION: User ke posts (Array [])
  posts     Post[]

  // 6. MAP: DB mein column 'created_at' hoga, par code mein 'createdAt'
  createdAt DateTime @default(now()) @map("created_at")

  // 7. UPDATED AT: Auto update time
  updatedAt DateTime @updatedAt

  // 8. BLOCK ATTRIBUTE: Table ka naam 'users' hoga
  @@map("users")
}

enum Role {
  USER
  ADMIN
}
```

---

## 4. Kaise Use Karte Hain? (Quick Refresh)

1.  **Schema Likho:** `schema.prisma` mein.
2.  **Migrate:** `npx prisma migrate dev` (DB update).
3.  **Code:** `await prisma.user.create(...)`.

Bas itna hi hai Prisma! Keywords yaad karne ki zarurat nahi, jab code likhoge toh auto-suggestion mein sab aa jata hai.
