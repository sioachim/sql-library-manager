'use strict';

const {Book} = require('../models');

// Displays a list of all books
module.exports.index = async function(req, res, next) {
    let books = await Book.findAll();

    res.render('index', { title: 'Books', books: books });
};
