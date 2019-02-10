"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Realm = require("realm");
var ws_1 = require("ws");
var dbClasses_1 = require("./dbClasses");
var ws = new ws_1.Server({ port: 5000 });
var schemas = {
    Book: dbClasses_1.Book,
    BookDetail: dbClasses_1.BookDetail,
    RentHistory: dbClasses_1.RentHistory,
    Member: dbClasses_1.Member
};
Realm.open({ schema: Object.values(schemas) })
    .then(function (realm) {
    realm.write(function () {
        var book = realm.objects('Book').filtered('title LIKE "*である*"');
        console.log(book);
    });
})
    .catch(function (error) {
    console.log(error);
});
//# sourceMappingURL=app.js.map