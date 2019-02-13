"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const promise_mysql_1 = require("promise-mysql");
const http_1 = require("http");
const socket_io = require("socket.io");
const dbClasses_1 = require("./dbClasses");
const app = express();
app.use(express.static(__dirname + "/"));
const server = http_1.createServer(app);
// server.listen(80);
const wss = socket_io(8080);
const conn = promise_mysql_1.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "bookrentalsystem"
}).then((connection) => {
    wss.on("connection", ws => {
        console.log("connected");
        ws.on("get", () => {
            console.log('get');
            let database = new dbClasses_1.DataBase();
            connection.query("select * from bookrentalsystem.books")
                .then((rows) => {
                database.books = rows;
                return connection.query("select * from bookrentalsystem.members");
            }).then((rows) => {
                database.members = rows;
                return connection.query("select * from bookrentalsystem.bookdetails");
            }).then((rows) => {
                database.bookDetails = rows;
                return connection.query("select * from bookrentalsystem.histories");
            }).then((rows) => {
                database.histories = rows;
                ws.emit("set", database);
            }).catch((err) => { throw err; });
        });
        ws.on("append", (dataBase) => {
            console.log(dataBase);
            Object.keys(dataBase).forEach((tablename) => {
                if (typeof dataBase[tablename] === 'object' && dataBase[tablename][0]) {
                    console.log(tablename);
                    dataBase[tablename].forEach((rows) => {
                        connection.query(`insert into bookrentalsystem.${tablename} set ?`, rows).catch(err => {
                            ws.emit("err", err);
                            throw err;
                        });
                    });
                }
            });
            wss.emit("append", dataBase);
        });
    });
});
//# sourceMappingURL=app.js.map