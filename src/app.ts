import express = require("express");
import { createConnection } from "mysql";
import { createServer } from "http";
import socket_io = require("socket.io");
import {
  BookDetail,
  Book,
  RentHistory,
  Member,
  Message,
  reqtype
} from "./dbClasses";

const app = express();
app.use(express.static(__dirname + "/"));
const server = createServer(app);
// server.listen(80);
const wss = socket_io(8080);
const connection = createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "bookrentalsystem"
});
connection.connect();

wss.on("connection", ws => {
  console.log("connected");
  ws.on("get", () => {
    let database: Message = new Message();
    database.message = reqtype.set;
    connection.query("select * from bookrentalsystem.books", getBooks);
    function getBooks(err, rows) {
      if (err) throw err;
      database.books = <Book[]>rows;
      connection.query("select * from bookrentalsystem.members", getMembers);
    }
    function getMembers(err, rows) {
      if (err) throw err;
      database.members = <Member[]>rows;
      connection.query("select * from bookrentalsystem.bookdetails", getBookDetails);
    }
    function getBookDetails(err, rows) {
      if (err) throw err;
      database.bookDetails = <BookDetail[]>rows;
      connection.query("select * from bookrentalsystem.history", getHistories);
    }
    function getHistories(err, rows) {
      if (err) throw err;
      database.histories = <RentHistory[]>rows;
      console.log(database);
      ws.emit("set", database);
    }
  });
});
