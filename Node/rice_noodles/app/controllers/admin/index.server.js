'use strict';

function index (db) {
    var dbo = db.db("food");
    var foodinfo = dbo.collection('foods');
    var addressinfo = dbo.collection('user_address');
    var orderwrite = dbo.collection('order');
    var admin = dbo.collection('admin');
    var deuser = dbo.collection('deuser');
    var mongoose = require('mongoose'),
        silly = require('silly-datetime'),
        moment = require('moment');


    //var nowtime=silly.format(new Date(), 'YYYY-MM-DD HH:mm');

    //商家登录
    this.adminlogin = function(req, res){

        var ad_info = {"ad_name":req.body.name,"ad_pass" : req.body.pass};  // 查询条件
        admin.find(ad_info).toArray(function(err, result) {
            if (err) throw err;
            if(result!=''){
                res.cookie('adminname',req.body.name); //存储登录信息
                res.end("200");
            }else {
                res.end("用户名或密码错误！");
            }
        });
    };

    //外卖小哥登录
    this.delogin = function(req, res){

        var deuser_info = {"d_phone":req.body.phone,"d_password" : req.body.pass};  // 查询条件
        deuser.find(deuser_info).toArray(function(err, result) {
            if (err) throw err;
            if(result!=''){
                res.cookie('dephone',req.body.phone); //存储登录信息
                res.end("200");
            }else {
                res.end("用户名或密码错误！");
            }
        });
    };

    //商家、外卖小哥登录退出
    this.adminout = function(req, res){
        res.cookie('adminname', '', { expires: new Date(0)});
        res.send('<meta http-equiv="refresh" content="0;url=/admin_login">');
    };

    this.delout = function(req, res){
        res.cookie('dephone', '', { expires: new Date(0)});
        res.send('<meta http-equiv="refresh" content="0;url=/delivery_login">');
    };

    //首页数据源
    this.admin_count = function(req, res){
        var indexdata=[];
        //订单总量
        var or_count = {"or_state":{$gt:"0"}};
        var nowtime=silly.format(new Date(), 'YYYY-MM-DD');
        var or_daycount = {"or_time":{$regex: nowtime},"or_state":{$gt:"0"}};
        orderwrite.find(or_count).toArray(function(err, result) {
            if (err) throw err;
            var ordercount = result.length;
            indexdata.push({"ordercount":ordercount});
            orderwrite.find(or_daycount).toArray(function(err, result) {
                if (err) throw err;
                var daycount=result.length;
                indexdata.push({"daycount":daycount});
                res.json(indexdata);
            })

        });

    };

    this.admin_seven = function(req, res){
        var weekdata=[];

        //七天日期数据
        var daydate = moment().format('YYYY-MM-DD');
        var oneday = moment().subtract(1, "days").format("YYYY-MM-DD");
        var twoday = moment().subtract(2, "days").format("YYYY-MM-DD");
        var threeday = moment().subtract(3, "days").format("YYYY-MM-DD");
        var fourday = moment().subtract(4, "days").format("YYYY-MM-DD");
        var filveday = moment().subtract(5, "days").format("YYYY-MM-DD");
        var sixday = moment().subtract(6, "days").format("YYYY-MM-DD");

        var sevendate=[sixday,filveday,fourday,threeday,twoday,oneday,daydate];
        weekdata.push({"sevenday":sevendate});

        //七天数据

        res.json(weekdata);
    };

    //获取米线展示数据
    this.admin_rice = function(req, res){
        var ricedata=[];
        var page=(req.query.page-1)*10;
        var f_state = {"f_state":'1'};  // 查询条件
        foodinfo.find(f_state).limit(10).skip(page).toArray(function(err, result) {
            if (err) throw err;
            var len=result.length;
            ricedata.push({"code":0,"msg":"","count":len,"data":result});
            ricedata.forEach(function(a){
                res.json(a);
            })
            //res.json(ricedata);
        });
    };

    //删除米线数据
    this.admin_delrice = function(req, res){
        var id = mongoose.Types.ObjectId(req.body.id);
        var foodid = {"_id":id};  // 查询条件
        var upstate={$set: { "f_state" : "0" }}; //字段更改内容
        foodinfo.updateOne(foodid, upstate, function(err, res) {
            if (err) throw err;
        });
        res.end("200");
    };

    //添加米线
    this.admin_addricem_do = function(req, res){
        var foodin = { f_name: req.body.f_name, f_marks: req.body.f_marks, f_price: req.body.f_price,f_img: req.body.f_img, f_state: "1" };
        foodinfo.insertOne(foodin, function(err, res) {
            if (err) throw err;
        });
        res.end("200");
    };

    //添加缩略图
    this.admin_addricem_img = function(req, res){
        //自我学习部分，一定要搞出来！
    };

    //编辑米线
    this.admin_addricem_editinfo = function(req, res){
        var foodid=mongoose.Types.ObjectId(req.query.id);
        console.log(req.query.id);
        var fdid = {"_id":foodid};  // 查询条件
        foodinfo.find(fdid).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        });
    };

    this.admin_addricem_edit = function(req, res){
        var id = mongoose.Types.ObjectId(req.body.id);
        var foodid = {"_id":id};  // 查询条件
        var upstate={$set: { "f_name": req.body.f_name, "f_marks": req.body.f_marks, "f_price": req.body.f_price,"f_img": req.body.f_img }}; //字段更改内容
        foodinfo.updateOne(foodid, upstate, function(err, res) {
            if (err) throw err;
        });
        res.end("200");
    };

    //获取未接订单
    this.ad_ordering = function(req, res){
        var ricedata={};
        orderwrite.aggregate([
            {
                $match : {
                    "or_state":"1"
                }
            },
            { $lookup:
                {
                    from: 'foods',            // 右集合
                    localField: 'or_fid',    // 左集合 join 字段
                    foreignField: '_id',         // 右集合 join 字段
                    as: 'foodcont'           // 新生成字段（类型array）
                }
            },
            { $lookup:
                {
                    from: 'user_address',            // 右集合
                    localField: 'or_adid',    // 左集合 join 字段
                    foreignField: '_id',         // 右集合 join 字段
                    as: 'address'           // 新生成字段（类型array）
                }
            }

        ]).toArray(function(err, result) {
            if (err) throw err;
            var len=result.length;
            // ricedata.push({"code":0,"msg":"","count":len,"data":result});
            // ricedata.forEach(function(a){
            //     res.json(a);
            // })
            ricedata = { "code": 0, "msg": "", "count": len, "data": result }
            res.json(ricedata);
            //res.json(result);
        });
    };

    //配送员信息
    this.deuserinfo = function(req, res){
        deuser.find().toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        });
    };

    //承接订单并修改状态
    this.getorder_do = function(req, res){
        var id=mongoose.Types.ObjectId(req.body.orderid);
        var deuerphone=req.body.deuserphone;
        console.log(req.query.orderid);
        console.log(deuerphone);
        var orderid = {"_id":id};  // 查询条件
        var upstate={$set: { "or_dephone": deuerphone, "or_state": "2" }}; //字段更改内容
        orderwrite.updateOne(orderid, upstate, function(err, res) {
            if (err) throw err;
        });
        res.end("200");
    };

}
module.exports = index;
