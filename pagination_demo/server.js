import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
app.use(cors());

const db = new sqlite3.Database('./database.sqlite');

const PORT = 3000;

// 🟡 Type 1: Offset Pagination Endpoint
// GET /users-offset?page=1&limit=10
app.get('/users-offset', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    // Formula: OFFSET = (page - 1) * limit
    const offset = (page - 1) * limit;

    // Slow Query if offset is huge!
    const query = `
        SELECT * FROM users 
        ORDER BY created_at ASC, id ASC 
        LIMIT ? OFFSET ?
    `;

    // We also need total count for frontend pagination "1 of 100 pages"
    db.get("SELECT COUNT(*) as count FROM users", (err, countRow) => {
        if (err) return res.status(500).json({ error: err.message });

        db.all(query, [limit, offset], (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                data: rows,
                meta: {
                    total: countRow.count,
                    page,
                    limit,
                    totalPages: Math.ceil(countRow.count / limit)
                }
            });
        });
    });
});

// 🟢 Type 2: Cursor Pagination Endpoint
// GET /users-cursor?limit=10&cursor=...
app.get('/users-cursor', (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const cursor = req.query.cursor; // Base64 encoded string

    let query = `SELECT * FROM users`;
    let params = [];

    // If cursor is provided, we need to decode it and add WHERE clause
    if (cursor) {
        try {
            // Decode: "eyJjcmVhdGVkX2F0Ijoi..."" -> {"created_at":"2024...", "id":123}
            const decoded = JSON.parse(Buffer.from(cursor, 'base64').toString('utf-8'));
            
            // KEY POINT: Seek Operation
            // We want records AFTER this specific point (created_at, id)
            // SQL: WHERE (created_at > ?) OR (created_at = ? AND id > ?)
            query += ` WHERE (created_at > ?) OR (created_at = ? AND id > ?)`;
            params.push(decoded.created_at, decoded.created_at, decoded.id);
            
        } catch (e) {
            return res.status(400).json({ error: "Invalid cursor format" });
        }
    }

    // Always deterministic sort
    query += ` ORDER BY created_at ASC, id ASC`;
    
    // FETCH ONE EXTRA RECORD to see if there is a next page
    query += ` LIMIT ?`;
    params.push(limit + 1);

    db.all(query, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        // Check if we have more data
        const hasNextPage = rows.length > limit;
        if (hasNextPage) {
            rows.pop(); // Remove the extra record we fetched
        }

        // Create new cursor from the last item
        let nextCursor = null;
        if (rows.length > 0 && hasNextPage) {
            const lastItem = rows[rows.length - 1];
            const cursorData = {
                created_at: lastItem.created_at,
                id: lastItem.id
            };
            nextCursor = Buffer.from(JSON.stringify(cursorData)).toString('base64');
        }

        res.json({
            data: rows,
            meta: {
                nextCursor,
                hasNextPage
            }
        });
    });
});

app.listen(PORT, () => {
    console.log(`🔥 Server running at http://localhost:${PORT}`);
    console.log(`   👉 Offset Demo: http://localhost:${PORT}/users-offset`);
    console.log(`   👉 Cursor Demo: http://localhost:${PORT}/users-cursor`);
});
