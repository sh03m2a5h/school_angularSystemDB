"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mysql_1 = require("mysql");
const http_1 = require("http");
const ws_1 = require("ws");
const app = express();
app.use(express.static(__dirname + '/'));
const server = http_1.createServer(app);
const wss = new ws_1.Server({ port: 8080 });
const connection = mysql_1.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'bookrentalsystem'
});
connection.connect();
wss.on('connection', (ws) => {
    console.log('connected');
    ws.on('message', (message) => {
        console.log('received: %s', message);
    });
    let book;
    connection.query('select * from bookrentalsystem.books', (err, rows, fields) => {
        if (err)
            throw err;
        book = rows[0];
        console.log(book.date);
        ws.send(JSON.stringify(book));
    });
});
//# sourceMappingURL=app.js.map