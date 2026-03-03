const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const dbPath = path.resolve(__dirname, "fitness_app.sqlite");
const dbConnection = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Could not connect to SQLite database:", err.message);
        process.exit(1);
    } else {
        console.log("Connected to SQLite database.");
    }
});

// Read the schema file
const schemaPath = path.join(__dirname, 'db_schema.sql');
try {
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log("Executing schema queries...");
    dbConnection.exec(schemaSql, (err) => {
        if (err) {
            console.error("Error creating tables:", err);
        } else {
            console.log("All tables created successfully according to db_schema.sql!");
        }
        dbConnection.close();
    });
} catch (fsErr) {
    console.error("Failed to read db_schema.sql:", fsErr);
    dbConnection.close();
}
