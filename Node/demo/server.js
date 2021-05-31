var express = require('express');
var app = express();
var routes = require('./app/routes/index')
var bodyParser = require('body-parser')
mongo = require('mongodb').MongoClient;
console.log(process.cwd())

var options = {
  server: {
      auto_reconnect: true,
      poolSize: 10
  }
};
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

mongo.connect('mongodb://localhost:27017/food', options, function (err, db) {

    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully');
    }
    console.log(db)
    routes(app, db);
    app.use('/public',express.static(process.cwd()+'/public'))
    app.listen(3000, function () {
      console.log('success')
    })
});
