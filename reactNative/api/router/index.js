'use strict';
var Index = require(process.cwd() + '/controllers/foodControl.js');

module.exports = function (app, db,cpUpload) {
  var index = new Index(db);
  //菜品展示
  app.route('/getFoods').get(index.foodsShow);
  //新增菜品
  app.route('/setNewFood').post(index.setNewFood);
  //修改菜品
  app.route('/updateFood').post(index.updateFood);
  //删除菜品
  app.route('/deleteFood').get(index.deleteFood);
  app.route('/uploadFile').post(cpUpload,index.uploadFile)
  app.route('/').get(function (req,res) {
    res.sendFile(process.cwd() + '/public/file.html');
  })
};
