"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Book {
    constructor(obj) {
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
}
exports.Book = Book;
class Member {
    constructor(obj) {
        if (obj) {
            this.name = obj.name;
            this.address = obj.address;
            this.tel = obj.tel;
            this.email = obj.email;
            this.id = obj.id;
        }
    }
}
exports.Member = Member;
class BookDetail {
    constructor(obj) {
        if (obj) {
            this.serial = obj.serial;
            this.status = obj.status;
            this.date = obj.date;
        }
    }
}
exports.BookDetail = BookDetail;
class RentHistory {
    constructor(obj) {
        if (obj) {
            this.member = obj.member;
            this.book = obj.book;
            this.bookDetail = obj.bookDetail;
            this.type = obj.type;
            this.date = obj.date;
        }
    }
}
exports.RentHistory = RentHistory;
//# sourceMappingURL=dbClasses.js.map