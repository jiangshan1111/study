var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/jiangshan';
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("example");
    dbo.collection('user').aggregate([
    { $match: {name:'江山'}},//左关联限制条件
      { $lookup:
        {
          from: 'newData',            // 右集合
          localField: 'name',    // 左集合 join 字段
          foreignField: 'name',         // 右集合 join 字段
          as: 'name'           // 新生成字段（类型array）
        }
      }
    ]).toArray(function(err, res) {
      if (err) throw err;
      console.log(JSON.stringify(res));
      //[{"_id":"60960526dbf6a43824e98389","name":[{"_id":"609634a2dbf6a43824e98c4d","name":"江山","school":"xxx"}],"age":"23"}]
      db.close();
    });
});