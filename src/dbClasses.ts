export class Book {
  public isbn: number;
  public title: string;
  public actor: string;
  public date: Date;
  public picture?: ImageBitmap;
  constructor(obj?: Book) {
    if (obj) {
      this.isbn = obj.isbn;
      this.title = obj.title;
      this.actor = obj.actor;
      this.date = obj.date;
    }
  }
}
export class Member {
  public id: number;
  public name: string;
  public address: string;
  public tel: string;
  public email: string;
  constructor(obj?: Member) {
    if (obj) {
      this.name = obj.name;
      this.address = obj.address;
      this.tel = obj.tel;
      this.email = obj.email;
      this.id = obj.id;
    }
  }
}
export class BookDetail {
  public isbn: number;
  public serial: number;
  public status?: number;
  public rentalDate?: Date;
  public returnDate?: Date;
  constructor(obj?: BookDetail) {
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
export class RentHistory {
  public id: number;
  public isbn: number;
  public serial: number;
  public type: string;
  public date: Date;
  constructor(obj?: RentHistory) {
    if (obj) {
      this.id = obj.id;
      this.isbn = obj.isbn;
      this.serial = obj.serial;
      this.type = obj.type;
      this.date = obj.date;
    }
  }
}

export class DataBase {
    public members: Array<Member> = new Array<Member>();
    public books: Array<Book> = new Array<Book>();
    public bookDetails: Array<BookDetail> = new Array<BookDetail>();
    public histories: Array<RentHistory> = new Array<RentHistory>();

    constructor() {
        // this.persons.push(new Member());
        // this.books.push(new Book());
        // this.bookDetails.push(new BookDetail());
    }
}
export enum reqtype {
  get,set,update,delete,append
}
export class Message extends DataBase {
  public message: reqtype;
}