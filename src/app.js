"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'bookrentalsystem'
});
connection.connect();
let sql = 'select * from bookrentalsystem.bookdetails';
connection.query(sql, (err, rows, fields) => {
    if (err)
        throw err;
    console.log(rows[0].serial);
});
connection.end();
//# sourceMappingURL=app.js.map