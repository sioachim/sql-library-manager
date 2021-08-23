'use strict';

/* Redirects to full list of all books */
module.exports.index = function(req, res, next) {
    res.redirect('/books');
};
