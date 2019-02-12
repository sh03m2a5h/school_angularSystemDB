import express = require('express');
import { createConnection } from 'mysql';
import { createServer } from 'http';
import { Server } from 'ws';
import { BookDetail, Book, RentHistory, Member, Message } from './dbClasses';

const app = express();
app.use(express.static(__dirname + '/'));
const server = createServer(app);
const wss = new Server({ port: 8080 });
const connection = createConnection({
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
  let book: Book;
  connection.query('select * from bookrentalsystem.books', (err, rows, fields) => {
    if (err) throw err;
    book = (<Book[]>rows)[0];
    console.log(book.date);
    ws.send(JSON.stringify(book));
  });
})