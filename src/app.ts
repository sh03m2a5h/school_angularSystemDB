import mysql = require('mysql');
import { BookDetail } from './dbClasses';
const connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    database : 'bookrentalsystem'
});

connection.connect();

let sql = 'select * from bookrentalsystem.bookdetails';
connection.query(sql, (err, rows, fields) => {
  if (err) throw err; 
  console.log((<BookDetail>rows[0]).serial);
});

connection.end();