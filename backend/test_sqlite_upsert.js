const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
    db.run(`
        CREATE TABLE user_profiles (
            profile_id INTEGER PRIMARY KEY AUTOINCREMENT,
            clerk_user_id TEXT NOT NULL UNIQUE,
            age INTEGER,
            weight_kg REAL,
            height_cm REAL,
            goal TEXT,
            activity_level TEXT,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    const sql = `
        INSERT INTO user_profiles (clerk_user_id, age, height_cm, weight_kg, activity_level, goal)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(clerk_user_id) DO UPDATE SET
            age = excluded.age,
            height_cm = excluded.height_cm,
            weight_kg = excluded.weight_kg,
            activity_level = excluded.activity_level,
            goal = excluded.goal,
            updated_at = CURRENT_TIMESTAMP
    `;
    db.run(sql, ['user_123', 25, 170, 70, 'Light', 'Lose Weight'], function (err) {
        if (err) {
            console.error("UPSERT Error:", err.message);
        } else {
            console.log("UPSERT Success. Changes:", this.changes);
        }
    });
});
