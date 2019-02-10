"use strict";
exports.__esModule = true;
var Realm = require("realm");
var dbClasses_1 = require("./dbClasses");
Realm.open({ schema: [dbClasses_1.Book, dbClasses_1.Member, dbClasses_1.BookDetail, dbClasses_1.RentHistory] })
    .then(function (realm) {
    realm.write(function () {
        var bookDetail = realm.create('BookDetail', new dbClasses_1.BookDetail({
            serial: 4322
        }));
        var book = realm.create('Book', new dbClasses_1.Book({
            isbn: '753922',
            title: '吾輩は猫である',
            actor: '夏目漱石',
            date: new Date('2017-2-25')
        }));
        book.detail.push(bookDetail);
        realm.create('Book', new dbClasses_1.Book({
            isbn: '5782343',
            title: '坊ちゃん',
            actor: '夏目漱石',
            date: new Date('2017-2-23')
        }));
        realm.create('Book', new dbClasses_1.Book({
            isbn: '905432',
            title: '学問のすすめ',
            actor: '福沢諭吉',
            date: new Date('2017-2-21')
        }));
        var member = realm.create('Member', new dbClasses_1.Member({
            name: '佐藤',
            address: '北海道',
            email: 'aaaa@example.com',
            tel: '090xxxxxxxx',
            id: 1859
        }));
        realm.create('Member', new dbClasses_1.Member({
            name: '鈴木',
            address: '青森県',
            email: 'bbbb@example.com',
            tel: '090yyyyyyyy',
            id: 5781
        }));
        realm.create('Member', new dbClasses_1.Member({
            name: '田中',
            address: '秋田県',
            email: 'cccc@example.com',
            tel: '090zzzzzzzz',
            id: 3832
        }));
        var rentHistory = realm.create('RentHistory', new dbClasses_1.RentHistory({
            date: new Date(Date.now()),
            member: member,
            book: book,
            bookDetail: bookDetail,
            type: 'rental'
        }));
    });
})["catch"](function (error) {
    console.log(error);
});
//# sourceMappingURL=app.js.map