"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const mysql_1 = require("mysql");
const http_1 = require("http");
const socket_io = require("socket.io");
const dbClasses_1 = require("./dbClasses");
const app = express();
app.use(express.static(__dirname + "/"));
const server = http_1.createServer(app);
// server.listen(80);
const wss = socket_io(8080);
const connection = mysql_1.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "bookrentalsystem"
});
connection.connect();
wss.on("connection", ws => {
    console.log("connected");
    ws.on("get", () => {
        let database = new dbClasses_1.Message();
        database.message = dbClasses_1.reqtype.set;
        connection.query("select * from bookrentalsystem.books", getBooks);
        function getBooks(err, rows) {
            if (err)
                throw err;
            database.books = rows;
            connection.query("select * from bookrentalsystem.members", getMembers);
        }
        function getMembers(err, rows) {
            if (err)
                throw err;
            database.members = rows;
            connection.query("select * from bookrentalsystem.bookdetails", getBookDetails);
        }
        function getBookDetails(err, rows) {
            if (err)
                throw err;
            database.bookDetails = rows;
            connection.query("select * from bookrentalsystem.history", getHistories);
        }
        function getHistories(err, rows) {
            if (err)
                throw err;
            database.histories = rows;
            console.log(database);
            ws.emit("set", database);
        }
    });
});
//# sourceMappingURL=app.js.map