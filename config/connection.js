const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'monterrey1$M',
    database: 'employeesDB'
});

module.exports = connection;

