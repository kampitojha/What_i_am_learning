# MongoDB Connection - Run karne ke liye options:

## Demo Output (Local MongoDB not running):

```
🔄 Connecting to MongoDB...
❌ Connection failed: connect ECONNREFUSED 127.0.0.1:27017
❌ Error during operations: connect ECONNREFUSED 127.0.0.1:27017
```

---

## ✅ Option 1: Use MongoDB Atlas (Cloud - FREE & Easy)

### Steps:

1. **Create Free Account:**

   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Sign up (free forever for 512MB)

2. **Create Cluster:**

   - Click "Build a Database"
   - Choose FREE tier (M0)
   - Select region closest to you
   - Click "Create"

3. **Create Database User:**

   - Security → Database Access
   - Add New User
   - Username: `testuser`
   - Password: `Test123!` (save this)
   - User Privileges: Read and write to any database

4. **Whitelist IP:**

   - Security → Network Access
   - Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

5. **Get Connection String:**

   - Database → Connect
   - Choose "Connect your application"
   - Copy connection string
   - Should look like:

   ```
   mongodb+srv://testuser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

6. **Update index.js:**
   Replace line 4:

   ```javascript
   const localUri = "mongodb://localhost:27017";
   ```

   With:

   ```javascript
   const localUri =
     "mongodb+srv://testuser:Test123!@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority";
   ```

   (Replace with YOUR connection string)

7. **Run:**
   ```bash
   node index.js
   ```

---

## ✅ Option 2: Install MongoDB Locally

### Windows:

1. **Download:**

   - https://www.mongodb.com/try/download/community
   - Choose Windows
   - Download MSI file

2. **Install:**

   - Run installer
   - Choose "Complete" installation
   - Install as Windows Service

3. **Start MongoDB:**

   ```bash
   # MongoDB should auto-start as service
   # Or manually start:
   net start MongoDB
   ```

4. **Run Code:**
   ```bash
   node index.js
   ```

---

## 📊 Expected Output (When Connected):

```
🔄 Connecting to MongoDB...
✅ Successfully connected to MongoDB!
📊 Total documents in 'users' collection: 0

📝 Performing CRUD Operations...

1️⃣ INSERT Operation:
   ✅ Inserted document with ID: 6774abc123def...
   ✅ Inserted 2 documents

2️⃣ READ Operation:
   📖 Total users: 3
   First user: {
     _id: 6774abc123def...,
     name: 'John Doe',
     email: 'john@example.com',
     age: 25,
     city: 'Mumbai'
   }
   📍 Users from Mumbai: 1
   🔍 Found user: John Doe

3️⃣ UPDATE Operation:
   ✏️  Updated 1 document
   ✏️  Updated 3 documents

4️⃣ DELETE Operation:
   🗑️  Deleted 1 document
   📊 Remaining documents: 2

🔒 Connection closed
```

---

## 🎯 Recommendation

**Use MongoDB Atlas (Option 1)** - Easy, no installation needed, free!

---

## ❓ Need Help?

If you face any issue, let me know:

- Screenshot of error
- Which option you're trying
- Your connection string (hide password)
