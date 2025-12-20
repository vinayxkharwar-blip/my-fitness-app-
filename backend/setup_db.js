const mysql = require("mysql2");

// configuration from db.js
const dbConfig = {
    host: "localhost",
    user: "root",
    password: "Abhi@123",
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
        process.exit(1);
    }
    console.log("Connected to MySQL server.");

    // Create Database
    connection.query("CREATE DATABASE IF NOT EXISTS fitness_app_db", (err) => {
        if (err) {
            console.error("Error creating database:", err);
            connection.end();
            process.exit(1);
        }
        console.log("Database 'fitness_app_db' created or already exists.");

        // Use Database
        connection.changeUser({ database: "fitness_app_db" }, (err) => {
            if (err) {
                console.error("Error connecting to database:", err);
                connection.end();
                process.exit(1);
            }

            // Create Users Table
            const createUsersTable = `
                CREATE TABLE IF NOT EXISTS users (
                    user_id INT AUTO_INCREMENT PRIMARY KEY,
                    full_name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password_hash VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;

            connection.query(createUsersTable, (err) => {
                if (err) {
                    console.error("Error creating users table:", err);
                } else {
                    console.log("Table 'users' created or already exists.");
                }
                connection.end();
            });
        });
    });
});
