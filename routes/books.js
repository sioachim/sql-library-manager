var express = require('express');
var router = express.Router();
var controller = require('../controllers/bookController');
const { body } = require('express-validator');

/* GET books listing. */
router.get('/', controller.index);

/* GET new book form. */
router.get('/new', controller.new);

/* POST new book */
router.post('/new',
    body('title').exists(),
    body('author').exists(),
    body('genre').exists(),
    body('year').exists().isInt(),
    controller.create
);

/* GET the book details form */
router.get('/:id', controller.edit);

/* POST book updates */
router.post('/:id',
    body('title').exists(),
    body('author').exists(),
    body('genre').exists(),
    body('year').exists().isInt(),
    controller.update
);

/* DELETE book */
router.post('/:id/delete', controller.delete);

module.exports = router;
