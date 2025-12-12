const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Abhi@123",   // yaha apna MySQL password daalo
    database: "fitness_app_db"
});

module.exports = db;
