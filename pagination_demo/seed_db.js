import sqlite3 from "sqlite3";
import fs from "fs";

// Delete existing db file if exists to start fresh
if (fs.existsSync("./database.sqlite")) {
  fs.unlinkSync("./database.sqlite");
}

const db = new sqlite3.Database("./database.sqlite");

const TOTAL_USERS = 5000;

db.serialize(() => {
  // strict mode helps catch errors, but sqlite3 default is loose.
  // We create a table.
  db.run(`
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

  // Create Index for fast cursor pagination
  db.run(`CREATE INDEX idx_users_created_at_id ON users(created_at, id)`);

  console.log(`🚀 Generating ${TOTAL_USERS} users... please wait.`);

  const stmt = db.prepare(
    "INSERT INTO users (name, email, created_at) VALUES (?, ?, ?)",
  );

  db.run("BEGIN TRANSACTION"); // Fast bulk insert

  for (let i = 1; i <= TOTAL_USERS; i++) {
    const name = `User ${i}`;
    const email = `user${i}@example.com`;
    // Generate a date within the last 30 days
    // We add i seconds to ensure uniqueness for exact timing in this demo,
    // though in reality created_at can collide, which is why we break ties with ID.
    const date = new Date(Date.now() - (TOTAL_USERS - i) * 10000).toISOString();

    stmt.run(name, email, date);
  }

  db.run("COMMIT", () => {
    console.log("✅ Database seeded successfully!");
    // Verify count
    db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
      console.log(`📊 Total Users in DB: ${row.count}`);
      // Show first 5 and last 5 to confirm
      console.log("--- First 3 Users ---");
      db.all(
        "SELECT * FROM users ORDER BY created_at ASC, id ASC LIMIT 3",
        (err, rows) => {
          console.log(rows);
        },
      );
    });
  });

  stmt.finalize();
});

db.close();
