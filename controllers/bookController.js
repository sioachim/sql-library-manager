'use strict';

const { Book } = require('../models');
const { Op } = require('sequelize');
const Helpers = require('../helpers');

/* Displays a list of all books */
module.exports.index = async function(req, res, next) {
    let search = req.query.search || '';
    let current = req.query.page || 1;
    let limit = Helpers.limit;

    let sql = search
        ? {
            where: {
                title: {
                    [Op.substring]: search,
                }
            },
            offset: current * limit,
            limit: limit
        }
        : {
            offset: current * limit,
            limit: limit
        };

    let result = await Book.findAndCountAll(sql);

    res.render(
        'books/index',
        {
            title: 'Books',
            books: result.rows,
            message: req.flash('message'),
            search: search,
            pagination: Helpers.pagination(current, result.count)
        }
    );
};


/* Displays the new book form */
module.exports.new = function (req, res, next) {
    let book = Book.build();

    res.render('books/new', { title: 'New Book', book: book, errors: [] });
};


/* Creates the new book record */
module.exports.create = async function (req, res, next) {
    let book = Book.build(req.body);

    await book.save().then(function (result) {
        req.flash('message', 'Your book was successfully created!');
        res.redirect('/books');
    }).catch(function (result) {
        res.render(
            'books/new',
            {
                title: 'New Book',
                book: book,
                errors: result.errors.map(error => error.message)
            }
        );
    });
};


/* Displays the edit form */
module.exports.edit = async function (req, res, next) {
    let id = req.params.id;

    let book = await Book.findByPk(id);

    res.render('books/edit', { title: 'Update Book', book: book, errors: [] });
};


/* Updates the book record */
module.exports.update = async function (req, res, next) {
    let id = req.params.id;

    let book = await Book.findByPk(id);

    // display the form again with error messages
    if (!book) {
        req.flash('message', `Book with id ${id} was not found!`);
        res.redirect('/books');
        return;
    }

    await book.update(req.body).then(function (result) {
        req.flash('message', 'Your book was successfully updated!');
        res.redirect('/books');
    }).catch(function (result) {
        res.render(
            'books/edit',
            {
                title: 'Update Book',
                book: book,
                errors: result.errors.map(error => error.message)
            }
        );
    });
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
