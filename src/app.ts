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
      (async ()=>{
        try {
          let database: DataBase = new DataBase();
          database.books = await connection.query("select * from bookrentalsystem.books");
          database.members = await connection.query("select * from bookrentalsystem.members");
          database.bookDetails = await connection.query("select * from bookrentalsystem.bookDetails");
          database.histories = await connection.query("select * from bookrentalsystem.histories");
          ws.emit("set", database);
        } catch(e) {
          console.error(e);
        }
      })();
    });
    ws.on("append", (dataBase: DataBase) => {
      console.log(Object.keys(DataBase));
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