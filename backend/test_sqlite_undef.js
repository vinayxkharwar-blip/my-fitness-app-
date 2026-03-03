const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
    db.run("CREATE TABLE test (id INT, name TEXT)");

    const stmt = db.prepare("INSERT INTO test VALUES (?, ?)");
    try {
        stmt.run(1, undefined, (err) => {
            if (err) {
                console.error("Error with undefined:", err.message);
            } else {
                console.log("Success with undefined");
            }
        });
    } catch (e) {
        console.error("Exception with undefined:", e.message);
    }
    stmt.finalize();
});
