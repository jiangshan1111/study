'use strict';
var express = require('express');
var routes=require('./app/routes/index.js');
var mongo = require('mongodb').MongoClient;
var app = express();

app.use('/public',express.static(process.cwd()+'/public'));
app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

mongo.connect('mongodb://localhost:27017/clickdb', function (err, db) {

    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected!');
    }
    routes(app,db);

    app.listen(3000, function () {
        console.log('Listening on port 3000...');
    });

});

