function index(db) {
  var dbo = db.db('foods');
  var foodInfo = dbo.collection('foodInfo');
  var mongoose = require('mongoose');
  var formidable = require('formidable')
  var fs = require('fs')
  // var co = require('co')
  var path = require('path')

  this.foodsShow = function (req, res) {
    foodInfo.find().toArray(function (err, result) {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  };

  //上传文件
  this.uploadFile = function (req, res) {
    
    console.log(req.files.file);  // 上传的文件信息
    var des_file = process.cwd() + "/public/" + req.files.file[0].originalname;
    fs.readFile( req.files.file[0].path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
          if( err ){
              console.log( err );
          }else{
                response = {
                    message:'File uploaded successfully', 
                    filename:req.files.file[0].originalname
              };
          }
          res.json(response);
        });
    });
  }
  this.setNewFood = function (req, res) {
    var foodBody = req.body
    foodInfo.insertOne(foodBody,function (err, result) {
      if (err) {
        throw err;
      }
      if (result.insertedCount == 1) {
        res.json({
          code:0000
        });
      }
    })
  };
  this.updateFood = function (req, res) {
    var foodID = mongoose.Types.ObjectId(req.body.id)
    var updateObj = {}
    if (req.body.foodName) {
      updateObj = Object.assign(updateObj,{"foodName":req.body.foodName})
    }
    if (req.body.imageSrc) {
      updateObj = Object.assign(updateObj,{"imageSrc":req.body.imageSrc})
    }
    if (req.body.price) {
      updateObj = Object.assign(updateObj,{"price":req.body.price})
    }
    console.log(req.body,updateObj)
    if (Object.keys(updateObj).length == 0) {
      res.json({
        code:9999
      });
      return false
    }
    var update = { $set: updateObj };
    
    var deleteImageSrc = ''
    foodInfo.find({"_id":foodID}).toArray(function (err, result) {
      if (err) {
        throw err;
      }
      console.log(result)
      if (result[0].imageSrc !== updateObj.imageSrc && result[0].imageSrc.indexOf('http://192.168.250.200:8080') > -1) {
        deleteImageSrc = process.cwd() + result[0].imageSrc.split('http://192.168.250.200:8080')[1]
      }
      
      foodInfo.updateOne({"_id":foodID},update,function (err, result) {
        if (err) {
          throw err;
        }
        if (result.modifiedCount == 1) {
          if (deleteImageSrc) {
            fs.unlink(deleteImageSrc, function () {})
          }
          res.json({
            code:0000
          });
        }
      })
    });
  }
  this.deleteFood = function (req, res) {
    var foodID = mongoose.Types.ObjectId(req.query.id)
    var deleteImageSrc = ''
    foodInfo.find({"_id":foodID}).toArray(function (err, result) {
      if (err) {
        throw err;
      }
      console.log(result)
      if (result[0].imageSrc.indexOf('http://192.168.250.200:8080') > -1) {
        deleteImageSrc = process.cwd() + result[0].imageSrc.split('http://192.168.250.200:8080')[1]
      }
      foodInfo.deleteOne({"_id":foodID},function (err, result) {
        if (err) {
          throw err;
        }
        if (result.deletedCount == 1) {
          console.log(deleteImageSrc)
          if (deleteImageSrc) {
            fs.unlink(deleteImageSrc, function () {})
          }
          res.json({
            code:0000
          });
        }
      })
    });
  }
}
module.exports = index;
