"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
var serviceAccount = require('../key/ateste-js-27fa5020b99d.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
var db = admin.firestore();
var docRef = db.collection('books').doc();
var setBook = docRef.set({
    isbn: '849302',
    title: '吾輩は猫である',
    actor: '夏目漱石',
    date: new Date('2002-06-04')
}).then((value) => {
    console.log(value);
}).catch(error => {
    console.error(error);
});
console.log(db.collection('books').get().then((value) => {
    console.log(value.docs);
}));
//# sourceMappingURL=app.js.map