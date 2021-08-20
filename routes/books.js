var express = require('express');
var router = express.Router();

// Require controller modules.
var bookController = require('../controllers/bookController');

/* GET books listing. */
router.get('/', bookController.index);

/* GET new book form. */
router.get('/new_book', function(req, res, next) {
    res.render('new_book', { title: 'New Book' });
});

module.exports = router;
