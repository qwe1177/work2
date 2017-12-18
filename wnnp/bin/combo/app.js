var express = require('express');
var path = require('path');
// var favicon = require('static-favicon');
var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

var combo = require('./combo');

var app = express();

// view engine setup
app.disable('x-powered-by');
app.disable('etag');
app.enable('trust proxy');
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(favicon());
app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', combo);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});


module.exports = app;