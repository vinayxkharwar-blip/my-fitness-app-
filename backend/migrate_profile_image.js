const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "fitness_app.sqlite");
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Could not connect:", err.message);
        return;
    }

    db.run("ALTER TABLE user_profiles ADD COLUMN profile_image TEXT", (err) => {
        if (err) {
            if (err.message.includes("duplicate column name")) {
                console.log("Column profile_image already exists.");
            } else {
                console.error("Error adding column:", err.message);
            }
        } else {
            console.log("Successfully added profile_image column.");
        }
    });
});
