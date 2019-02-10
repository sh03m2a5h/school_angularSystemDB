"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Book = /** @class */ (function () {
    function Book(obj) {
        this.date = new Date;
        this.detail = new Array();
        if (obj) {
            this.isbn = obj.isbn;
            this.title = obj.title;
            this.actor = obj.actor;
            this.date = obj.date;
            if (obj.detail) {
                this.detail = obj.detail;
            }
        }
    }
    Book.schema = {
        name: 'Book',
        properties: {
            isbn: 'string',
            title: 'string',
            actor: 'string',
            date: 'date',
            detail: 'BookDetail[]',
            picture: 'data?'
        }
    };
    return Book;
}());
exports.Book = Book;
var Member = /** @class */ (function () {
    function Member(obj) {
        if (obj) {
            this.name = obj.name;
            this.address = obj.address;
            this.tel = obj.tel;
            this.email = obj.email;
            this.id = obj.id;
        }
    }
    Member.schema = {
        name: 'Member',
        properties: {
            name: 'string',
            address: 'string',
            tel: 'string',
            email: 'string',
            id: 'int'
        }
    };
    return Member;
}());
exports.Member = Member;
var BookDetail = /** @class */ (function () {
    function BookDetail(obj) {
        if (obj) {
            this.serial = obj.serial;
            this.status = obj.status;
            this.date = obj.date;
        }
    }
    BookDetail.schema = {
        name: 'BookDetail',
        properties: {
            serial: 'int',
            status: 'Member?',
            date: 'date?'
        }
    };
    return BookDetail;
}());
exports.BookDetail = BookDetail;
var RentHistory = /** @class */ (function () {
    function RentHistory(obj) {
        if (obj) {
            this.member = obj.member;
            this.book = obj.book;
            this.bookDetail = obj.bookDetail;
            this.type = obj.type;
            this.date = obj.date;
        }
    }
    RentHistory.schema = {
        name: 'RentHistory',
        properties: {
            member: 'Member',
            book: 'Book',
            bookDetail: 'BookDetail',
            type: 'string',
            date: 'date'
        }
    };
    return RentHistory;
}());
exports.RentHistory = RentHistory;
//# sourceMappingURL=dbClasses.js.map