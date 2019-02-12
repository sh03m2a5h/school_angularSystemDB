"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Book {
    constructor(obj) {
        if (obj) {
            this.isbn = obj.isbn;
            this.title = obj.title;
            this.actor = obj.actor;
            this.date = obj.date;
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
            this.isbn = obj.isbn;
            this.serial = obj.serial;
            if (obj.status) {
                this.status = obj.status;
                this.rentalDate = obj.rentalDate;
                this.returnDate = obj.returnDate;
            }
        }
    }
}
exports.BookDetail = BookDetail;
class RentHistory {
    constructor(obj) {
        if (obj) {
            this.id = obj.id;
            this.isbn = obj.isbn;
            this.serial = obj.serial;
            this.type = obj.type;
            this.date = obj.date;
        }
    }
}
exports.RentHistory = RentHistory;
class DataBase {
    constructor() {
        this.members = new Array();
        this.books = new Array();
        this.bookDetails = new Array();
        this.histories = new Array();
        // this.persons.push(new Member());
        // this.books.push(new Book());
        // this.bookDetails.push(new BookDetail());
    }
}
exports.DataBase = DataBase;
class Message extends DataBase {
    constructor() {
        super(...arguments);
        this.message = '';
    }
}
exports.Message = Message;
//# sourceMappingURL=dbClasses.js.map