const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("fitness_app.sqlite");

db.all("PRAGMA table_info(user_profiles);", [], (err, rows) => {
    if (err) {
        console.error("Error reading schema:", err.message);
    } else {
        console.log("Schema for user_profiles:", rows);
    }
});
