import Realm = require('realm');
import { Book, BookDetail, RentHistory, Member } from './dbClasses';

Realm.open({ schema: [Book, Member, BookDetail, RentHistory] })
  .then(realm => {
    realm.write(() => {
      const bookDetail = realm.create('BookDetail',
        new BookDetail({
          serial: 4322
        })
      );
      
      const book = realm.create('Book',
        new Book({
          isbn: '753922',
          title: '吾輩は猫である',
          actor: '夏目漱石',
          date: new Date('2017-2-25')
        })
      );
      book.detail.push(bookDetail);
      realm.create('Book',
        new Book({
          isbn: '5782343',
          title: '坊ちゃん',
          actor: '夏目漱石',
          date: new Date('2017-2-23')
        })
      );
      realm.create('Book',
        new Book({
          isbn: '905432',
          title: '学問のすすめ',
          actor: '福沢諭吉',
          date: new Date('2017-2-21')
        })
      );

      const member = realm.create('Member',
        new Member({
          name: '佐藤',
          address: '北海道',
          email: 'aaaa@example.com',
          tel: '090xxxxxxxx',
          id: 1859
        })
      );
      realm.create('Member',
        new Member({
          name: '鈴木',
          address: '青森県',
          email: 'bbbb@example.com',
          tel: '090yyyyyyyy',
          id: 5781
        })
      );
      realm.create('Member',
        new Member({
          name: '田中',
          address: '秋田県',
          email: 'cccc@example.com',
          tel: '090zzzzzzzz',
          id: 3832
        })
      );

      const rentHistory = realm.create('RentHistory',
        new RentHistory({
          date: new Date(Date.now()),
          member: member,
          book: book,
          bookDetail: bookDetail,
          type: 'rental',
        })
      );
    });
  })
  .catch(error => {
    console.log(error);
  });