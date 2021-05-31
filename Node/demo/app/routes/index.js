
var mongoose = require('mongoose');
module.exports = function (app, db) {
  var food = db.db('food')
  var numDb = food.collection("num")
  app.route('/')
    .get(function (req, res) {
      res.sendFile(process.cwd()+'/view/index.html')
    })
    //获取数量
    app.route('/getNum')
      .get(function (req, res) {
        numDb.find().toArray(function(err, result) {
          if (err) throw err;
          console.log(result.length);
          if (result.length === 0) {
            numDb.insertOne({
              num: 0,
              name:'num'
            },function(err, result) {
              if (err) throw err;
              res.json({
                code: 200,
                num:0
              })
            });
          } else {
            res.json({
              code: 200,
              num:result[0].num
            })
          }
        });
      })
    //更新数量
    app.route('/insertNum')
      .post(function (req, res) {
        numDb.find().toArray(function(err, result) {
          if (err) throw err;
          console.log(result.length);
          let numA = result[0].num
          numDb.updateOne({'_id':mongoose.Types.ObjectId('609901867a1c596b30092f38')},{$set: { num: Number(numA)+1 }},function(err, result) {
            if (err) throw err;
            res.json({
              code: 200,
              num:Number(numA)+1
            })
          });
        })
      })
}