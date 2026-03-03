const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create/Open database file in the root directory of the backend
const dbPath = path.resolve(__dirname, "../fitness_app.sqlite");
const dbConnection = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Could not connect to SQLite database:", err.message);
    } else {
        console.log("Successfully connected to SQLite database.");
    }
});

// Mocking the mysql2 .query interface for compatibility with existing controllers
const db = {
    query: (sql, params, callback) => {
        if (typeof params === 'function') {
            callback = params;
            params = [];
        }

        const trimmedSql = sql.trim().toUpperCase();

        if (trimmedSql.startsWith("SELECT")) {
            // Use dbConnection.all for SELECTs to get an array of rows
            dbConnection.all(sql, params, (err, rows) => {
                if (err) {
                    console.error("SELECT Error:", err.message);
                    return callback(err, null);
                }
                callback(null, rows);
            });
        } else {
            // INSERT, UPDATE, DELETE
            dbConnection.run(sql, params, function (err) {
                if (err) {
                    console.error("WRITE Error:", err.message);
                    return callback(err, null);
                }
                // Mocking mysql OK packet structure for compatibility
                const result = {
                    insertId: this.lastID,
                    affectedRows: this.changes,
                };
                callback(null, result);
            });
        }
    },
    // Expose the raw connection if needed by setup script
    connection: dbConnection
};

module.exports = db;
