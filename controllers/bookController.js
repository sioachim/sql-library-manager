'use strict';

const {Book} = require('../models');
const { validationResult } = require('express-validator');

/* Displays a list of all books */
module.exports.index = async function(req, res, next) {
    let books = await Book.findAll();

    res.render('books/index', { title: 'Books', books: books, message: req.flash('message') });
};


/* Displays the new book form */
module.exports.new = function (req, res, next) {
    let book = Book.build();

    res.render('books/new', { title: 'New Book', book: book, errors: [] });
};


/* Creates the new book record */
module.exports.create = async function (req, res, next) {
    let errors = validationResult(req);

    let book = Book.build(req.body);

    // display the form again with error messages
    if (!errors.isEmpty()) {
        res.render('books/new', { title: 'New Book', book: book, errors: errors.array() });
        return;
    }

    let result = await book.save();

    if (!result) {
        errors.push('Something went wrong when saving the record, please contact the administrator !');
        res.render('books/new', { title: 'New Book', book: book, errors: errors });
        return;
    }

    req.flash('message', 'Your book was successfully created!');
    res.redirect('/books');
};


/* Displays the edit form */
module.exports.edit = async function (req, res, next) {
    let id = req.params.id;

    let book = await Book.findByPk(id);

    res.render('books/edit', { title: 'Update Book', book: book, errors: [] });
};


/* Updates the book record */
module.exports.update = async function (req, res, next) {
    let errors = validationResult(req);
    let id = req.params.id;

    let book = await Book.findByPk(id);

    // display the form again with error messages
    if (!errors.isEmpty()) {
        res.render('books/edit', { title: 'Update Book', book: book, errors: errors.array() });
        return;
    }

    let result = await book.update(req.body);

    if (!result) {
        errors.push('Something went wrong when updating the record, please contact the administrator !');
        res.render('books/edit', { title: 'Update Book', book: book, errors: errors.array() });
        return;
    }

    req.flash('message', 'Your book was successfully updated!');
    res.redirect('/books');
};


/* Deletes the book record */
module.exports.delete = async function (req, res, next) {
    let id = req.params.id;

    let book = await Book.findByPk(id);

    if (!book) {
        req.flash('message', 'Your book could not be deleted!');
        res.redirect('/books');
        return;
    }

    let result = await book.destroy();

    if (!result) {
        req.flash('message', 'Your book could not be deleted!');
        res.redirect('/books');
        return;
    }

    req.flash('message', 'Your book was successfully deleted!');
    res.redirect('/books');
};
