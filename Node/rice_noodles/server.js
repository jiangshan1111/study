'use strict';
var express = require('express'),
    routes = require('./app/routes/index.js'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongo = require('mongodb').MongoClient;

var options = {
    server: {
        auto_reconnect: true,
        poolSize: 10
    }
};

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

mongo.connect('mongodb://localhost:27017/food', options, function (err, db) {

    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully');
    }

    app.use('/public',express.static(process.cwd()+'/public'));
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

    routes(app, db);

    app.listen(8080, function () {
        console.log('success!');
    });
});

