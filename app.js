var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var session = require('express-session');
var logger = require('morgan');

var homeRouter = require('./routes/home');
var booksRouter = require('./routes/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "25edghfvmmjjfycfgsbvmn",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', homeRouter);
app.use('/books', booksRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    let status = err.status || 500;

    res.status(status);

    if (status === 404) {
        res.render('page-not-found', {title : 'Page Not Found', message: 'Sorry! We couldn\'t find the page you were looking for.'});
    } else if (status === 500) {
        res.render('error', {title : 'Server error', message: 'Sorry! There was an unexpected error on the server.'});
    } else  {
        res.render('error', {title : 'Server error', message: status});
    }
});

module.exports = app;
