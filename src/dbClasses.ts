export class Book {
  public isbn: string;
  public title: string;
  public actor: string;
  public date = new Date;
  public detail?= new Array<BookDetail>();
  public picture?: ImageBitmap;
  static schema:Realm.ObjectSchema = {
    name: 'Book',
    properties: {
      isbn: 'string',
      title: 'string',
      actor: 'string',
      date: 'date',
      detail: 'BookDetail[]',
      picture: 'data?'
    }
  }
  constructor(obj?: Book) {
    if(obj){
      this.isbn = obj.isbn;
      this.title = obj.title;
      this.actor = obj.actor;
      this.date = obj.date;
    }
  }
}
export class Member {
  public name: string;
  public address: string;
  public tel: string;
  public email: string;
  public id: number;
  static schema:Realm.ObjectSchema = {
    name: 'Member',
    properties: {
      name: 'string',
      address: 'string',
      tel: 'string',
      email: 'string',
      id: 'int'
    }
  }
  constructor(obj?: Member) {
    if(obj){
      this.name = obj.name;
      this.address = obj.address;
      this.tel = obj.tel;
      this.email = obj.email;
      this.id = obj.id;
    }
  }
}
export class BookDetail {
  public serial: number;
  public status?: number;
  public date?: Date;
  static schema:Realm.ObjectSchema = {
    name: 'BookDetail',
    properties: {
      serial: 'int',
      status: 'Member?',
      date: 'date?'
    }
  };
  constructor(obj?: BookDetail) {
    if(obj){
      this.serial = obj.serial;
      this.status = obj.status;
      this.date = obj.date;
    }
  }
}
export class RentHistory {
  public member: Member;
  public book: Book;
  public bookDetail: BookDetail;
  public type: string;
  public date: Date;
  static schema:Realm.ObjectSchema = {
    name: 'RentHistory',
    properties: {
      member: 'Member',
      book: 'Book',
      bookDetail: 'BookDetail',
      type: 'string',
      date: 'date'
    }
  };
  constructor(obj?: RentHistory) {
    if(obj){
      this.member = obj.member;
      this.book = obj.book;
      this.bookDetail = obj.bookDetail;
      this.type = obj.type;
      this.date = obj.date;
    }
  }
}