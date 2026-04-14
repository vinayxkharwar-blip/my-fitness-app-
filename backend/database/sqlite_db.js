const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create/Open database file in the same directory
const dbPath = path.resolve(__dirname, "fitness_app.sqlite");
const dbConnection = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Could not connect to SQLite database:", err.message);
    } else {
        console.log("Connected to SQLite database.");
        initDb();
    }
});

function initDb() {
    createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            full_name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password_hash TEXT NOT NULL,
            role TEXT DEFAULT 'user',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `;

    const createProfilesTable = `
        CREATE TABLE IF NOT EXISTS user_profiles (
            profile_id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL UNIQUE,
            height_cm REAL,
            weight_kg REAL,
            activity_level TEXT,
            goal TEXT,
            FOREIGN KEY (user_id) REFERENCES users(user_id)
        )
    `;

    dbConnection.run(createUsersTable, (err) => {
        if (err) {
            console.error("Error ensuring users table exists:", err.message);
        } else {
            console.log("Users table verified.");

            // MIGRATION: Ensure role column exists
            const addRoleCol = "ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'";
            dbConnection.run(addRoleCol, (err) => {
                if (err && !err.message.includes("duplicate column")) {
                    console.log("Column role might already exist, skipping.");
                } else {
                    console.log("Ensured role column exists in users table.");
                }
            });

            // Create profiles table after users
            dbConnection.run(createProfilesTable, (err) => {
                if (err) {
                    console.error("Error ensuring user_profiles table exists:", err.message);
                } else {
                    console.log("User_profiles table verified.");
                    // MIGRATION: Ensure profile_image column exists
                    const addImageCol = "ALTER TABLE user_profiles ADD COLUMN profile_image TEXT";
                    dbConnection.run(addImageCol, (err) => {
                        if (err && !err.message.includes("duplicate column")) {
                            console.log("Column profile_image might already exist, skipping.");
                        } else {
                            console.log("Ensured profile_image column exists.");
                        }
                    });
                }
            });
        }
    });
}

// Mocking the mysql2 .query interface
// mysql2 callback: (err, results, fields)
const db = {
    query: (sql, params, callback) => {
        // If params is the callback (no params passed)
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }

        const trimmedSql = sql.trim().toUpperCase();

        if (trimmedSql.startsWith("SELECT")) {
            console.log("Executing SELECT:", sql);
            dbConnection.all(sql, params, (err, rows) => {
                if (err) {
                    console.error("SELECT Error:", err.message);
                    return callback(err, null);
                }
                // Return rows as "results"
                callback(null, rows);
            });
        } else {
            console.log("Executing WRITE:", sql);
            // INSERT, UPDATE, DELETE
            dbConnection.run(sql, params, function (err) {
                if (err) {
                    console.error("WRITE Error:", err.message);
                    return callback(err, null);
                }
                console.log("Check 1");
                // Mocking mysql OK packet structure for compatibility
                const result = {
                    insertId: this.lastID,
                    affectedRows: this.changes,
                    // other fields if strictly needed, but usually insertId is enough
                };
                console.log("Query Success, Result:", result);
                callback(null, result);
            });
        }
    }
};

module.exports = db;
