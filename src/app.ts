import express = require('express');
import { createConnection, Connection } from 'promise-mysql';
import { createServer } from 'http';
import { join } from 'path';
import socket_io = require('socket.io');
import { DataBase } from './dbClasses';

const app = express();
app.use(express.static(join(__dirname,'../public')));
app.get('/*',(req,res) => res.sendFile(join(__dirname,'../public/index.html')));
const server = createServer(app);
server.listen(80);
const wss = socket_io(8080);
const conn = createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'bookrentalsystem'
}).then((connection) => {
  wss.on('connection', ws => {
    console.log('connected');
    ws.on('get', () => {
      console.log('get');
      (async () => {
        try {
          let database: DataBase = new DataBase();
          database.books = await connection.query('select * from bookrentalsystem.books');
          database.members = await connection.query('select * from bookrentalsystem.members');
          database.bookDetails = await connection.query('select * from bookrentalsystem.bookDetails');
          database.histories = await connection.query('select * from bookrentalsystem.histories');
          ws.emit('set', database);
        } catch (e) {
          console.error(e);
        }
      })();
    });
    ws.on('append', async (dataBase: DataBase) => {
      console.log('append');
      for (let tablename of Object.keys(dataBase)) {
        if (typeof dataBase[tablename] === 'object' && dataBase[tablename][0]) {
          for (let rows of dataBase[tablename]) {
            await connection.query(`insert into bookrentalsystem.${tablename} set ?`, rows).catch(err => {
              ws.emit('err', err);
              console.error(err);
            });
          }
        }
      }
      wss.emit('append', dataBase);
    });
    ws.on('update', async (dataBase: DataBase) => {
      console.log('update');
      if (dataBase.books[0]) {
        for (let row of dataBase.books) {
          await connection.query(`update bookrentalsystem.books set ? where isbn = ?`, [row, row.isbn]);
        }
      }
      if (dataBase.bookDetails[0]) {
        for (let row of dataBase.bookDetails) {
          await connection.query(`update bookrentalsystem.bookDetails set ? where isbn = ? and serial = ?`, [row, row.isbn, row.serial]);
        }
      }
      if (dataBase.members[0]) {
        for (let row of dataBase.members) {
          await connection.query(`update bookrentalsystem.members set ? where id = ?`, [row, row.id]);
        }
      }
      if (dataBase.histories[0]) {
        for (let row of dataBase.histories) {
          await connection.query(`insert into bookrentalsystem.histories set ?`, row);
        }
      }
      wss.emit('update', dataBase);
    });
    ws.on('drop', async (dataBase: DataBase) => {
      console.log('drop');
      if (dataBase.books[0]) {
        for (let row of dataBase.books) {
          await connection.query(`delete from bookrentalsystem.books where isbn = ?`, row.isbn);
        }
      }
      if (dataBase.bookDetails[0]) {
        for (let row of dataBase.bookDetails) {
          await connection.query(`delete from bookrentalsystem.bookDetails where isbn = ? and serial = ?`, [row.isbn, row.serial]);
        }
      }
      if (dataBase.members[0]) {
        for (let row of dataBase.members) {
          await connection.query(`delete from bookrentalsystem.members where id = ?`, row.id);
        }
      }
      wss.emit('drop', dataBase);
    });
  });
});