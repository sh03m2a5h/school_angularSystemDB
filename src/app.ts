import express = require("express");
import { createConnection, Connection } from "promise-mysql";
import { createServer } from "http";
import socket_io = require("socket.io");
import {
  BookDetail,
  Book,
  RentHistory,
  Member,
  DataBase
} from "./dbClasses";

const app = express();
app.use(express.static(__dirname + "/"));
const server = createServer(app);
// server.listen(80);
const wss = socket_io(8080);
const conn = createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "bookrentalsystem"
}).then((connection) => {
  wss.on("connection", ws => {
    console.log("connected");
    ws.on("get", () => {
      console.log('get');
      let database: DataBase = new DataBase();
      connection.query("select * from bookrentalsystem.books")
        .then((rows) => {
          database.books = <Book[]>rows;
          return connection.query("select * from bookrentalsystem.members");
        }).then((rows) => {
          database.members = <Member[]>rows;
          return connection.query("select * from bookrentalsystem.bookdetails");
        }).then((rows) => {
          database.bookDetails = <BookDetail[]>rows;
          return connection.query("select * from bookrentalsystem.histories");
        }).then((rows) => {
          database.histories = <RentHistory[]>rows;
          ws.emit("set", database);
        }).catch((err) => { throw err });
    });
    ws.on("append", (dataBase: DataBase) => {
      console.log(dataBase);
      Object.keys(dataBase).forEach((tablename) => {
        if (typeof dataBase[tablename] === 'object' && dataBase[tablename][0]) {
          console.log(tablename);
          dataBase[tablename].forEach((rows: Book | BookDetail | Member | RentHistory) => {
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