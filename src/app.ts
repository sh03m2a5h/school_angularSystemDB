import Realm = require('realm');
import { Server } from  'ws';
import { Book, BookDetail, RentHistory, Member } from './dbClasses';

var ws = new Server({port:5000});

var schemas:Object = {
  Book: Book,
  BookDetail: BookDetail,
  RentHistory: RentHistory,
  Member: Member
}

Realm.open({ schema: Object.values(schemas) })
  .then(realm => {
    realm.write(() => {
      let book = realm.objects('Book').filtered('title LIKE "*である*"');
      console.log(book);
    });
  })
  .catch(error => {
    console.log(error);
  });