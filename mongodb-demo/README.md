# MongoDB Connection Demo

Complete guide to connect MongoDB with Node.js

---

## 📦 Setup Complete

```
✅ Folder created: mongodb-demo
✅ npm initialized
✅ mongodb package installed
✅ Connection code ready
```

---

## 🚀 How to Run

### Option 1: Local MongoDB (Recommended for learning)

**Step 1: Install MongoDB**

- Download from: https://www.mongodb.com/try/download/community
- Install and run `mongod` command

**Step 2: Run the code**

```bash
node index.js
```

### Option 2: MongoDB Atlas (Cloud - Free)

**Step 1: Create free account**

- Go to: https://www.mongodb.com/cloud/atlas
- Create free cluster (512MB free forever)

**Step 2: Get connection string**

- Click "Connect" → "Connect your application"
- Copy connection string
- Replace in `index.js`:

```javascript
const atlasUri = "your-connection-string-here";
// Change localUri to atlasUri in MongoClient
```

**Step 3: Run**

```bash
node index.js
```

---

## 📚 What's Inside?

### 1. Basic Connection

```javascript
const client = new MongoClient(uri);
await client.connect();
```

### 2. CRUD Operations

#### CREATE (Insert)

```javascript
// Insert one
await collection.insertOne({ name: "John", age: 25 });

// Insert many
await collection.insertMany([
  { name: "Jane", age: 28 },
  { name: "Bob", age: 32 },
]);
```

#### READ (Find)

```javascript
// Find all
const users = await collection.find({}).toArray();

// Find with filter
const result = await collection.find({ age: { $gte: 25 } }).toArray();

// Find one
const user = await collection.findOne({ name: "John" });
```

#### UPDATE

```javascript
// Update one
await collection.updateOne({ name: "John" }, { $set: { age: 26 } });

// Update many
await collection.updateMany(
  { age: { $gte: 25 } },
  { $set: { status: "active" } }
);
```

#### DELETE

```javascript
// Delete one
await collection.deleteOne({ name: "John" });

// Delete many
await collection.deleteMany({ age: { $lt: 18 } });
```

### 3. Advanced Operations

```javascript
// Sorting
collection.find({}).sort({ price: -1 });

// Projection (select fields)
collection.find({}, { projection: { name: 1, _id: 0 } });

// Aggregation
collection.aggregate([{ $group: { _id: "$category", total: { $sum: 1 } } }]);
```

---

## 🎯 Key Concepts

### 1. MongoClient

Connection object jo database se baat karta hai

### 2. Database

Container for collections (MySQL me database jaisa)

### 3. Collection

Group of documents (MySQL me table jaisa)

### 4. Document

Single record (MySQL me row jaisa)

---

## 🔧 Common Operators

### Comparison

- `$eq` - Equal
- `$ne` - Not equal
- `$gt` - Greater than
- `$gte` - Greater than or equal
- `$lt` - Less than
- `$lte` - Less than or equal

### Logical

- `$and` - AND condition
- `$or` - OR condition
- `$not` - NOT condition

### Update

- `$set` - Set field value
- `$inc` - Increment value
- `$push` - Add to array
- `$pull` - Remove from array

---

## ⚠️ Troubleshooting

### Error: "ECONNREFUSED"

**Solution:** MongoDB not running

```bash
# Start MongoDB
mongod
```

### Error: "Authentication failed"

**Solution:** Check username/password in connection string

### Error: "Network timeout"

**Solution:** Check internet or MongoDB Atlas IP whitelist

---

## 📖 Example Output

```
🔄 Connecting to MongoDB...
✅ Successfully connected to MongoDB!
📊 Total documents in 'users' collection: 0

📝 Performing CRUD Operations...

1️⃣ INSERT Operation:
   ✅ Inserted document with ID: 6774...
   ✅ Inserted 2 documents

2️⃣ READ Operation:
   📖 Total users: 3
   First user: { _id: ..., name: 'John Doe', ... }
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

## 🎓 Learning Path

1. ✅ Basic connection
2. ✅ CRUD operations
3. ✅ Filtering and sorting
4. ⏭️ Aggregation pipelines
5. ⏭️ Indexes for performance
6. ⏭️ Transactions
7. ⏭️ Schema validation

---

## 🔗 Useful Links

- [MongoDB Docs](https://docs.mongodb.com/)
- [Node.js Driver](https://www.mongodb.com/docs/drivers/node/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 💡 Pro Tips

1. Always close connections with `client.close()`
2. Use try-catch for error handling
3. Store connection strings in `.env` file
4. Use connection pooling for production
5. Create indexes on frequently queried fields

---

**Happy Coding! 🚀**
