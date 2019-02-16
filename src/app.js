"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const promise_mysql_1 = require("promise-mysql");
const http_1 = require("http");
const socket_io = require("socket.io");
const dbClasses_1 = require("./dbClasses");
const app = express();
app.use(express.static('public'));
const server = http_1.createServer(app);
server.listen(80);
const wss = socket_io(8080);
const conn = promise_mysql_1.createConnection({
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
                    let database = new dbClasses_1.DataBase();
                    database.books = await connection.query('select * from bookrentalsystem.books');
                    database.members = await connection.query('select * from bookrentalsystem.members');
                    database.bookDetails = await connection.query('select * from bookrentalsystem.bookDetails');
                    database.histories = await connection.query('select * from bookrentalsystem.histories');
                    ws.emit('set', database);
                }
                catch (e) {
                    console.error(e);
                }
            })();
        });
        ws.on('append', async (dataBase) => {
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
        ws.on('update', async (dataBase) => {
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
        ws.on('drop', async (dataBase) => {
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
//# sourceMappingURL=app.js.map