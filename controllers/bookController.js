'use strict';

var models = require('../models');
var Book = models.Book;

console.log(Book);



// Displays a list of all books.
module.exports.index = function(req, res, next) {
    let books = Book.all();
    res.render('index', { title: 'Books', books: books });
};

