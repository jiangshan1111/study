'use strict';

function index (db) {
    var dbo = db.db("food");
    var foodinfo = dbo.collection('foods');
    var addressinfo = dbo.collection('user_address');
    var orderwrite = dbo.collection('order');
    var mongoose = require('mongoose'),
        silly = require('silly-datetime');

    var nowtime=silly.format(new Date(), 'YYYY-MM-DD HH:mm');

    //菜品展示
    this.inshow = function(req, res){
        var f_state = {"f_state":'1'};  // 查询条件
        foodinfo.find(f_state).toArray(function(err, result) {
            if (err) throw err;
            res.jsonp(result);
        });

    };

    //点餐信息
    this.foodinfo = function(req, res){
        var id = mongoose.Types.ObjectId(req.body.foodid);
        var fid = {"_id":id};  // 查询条件
        foodinfo.find(fid).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        });

    };

    //收货地址
    this.adinfo = function(req, res){
        var userphone = {"ad_u_phone":req.body.userphone,"ad_state":"1"};  // 查询条件
        addressinfo.find(userphone).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        });

    };

    //点餐下单
    this.worder = function(req, res){
        var or_fid = mongoose.Types.ObjectId(req.body.foodid);
        var or_adid = mongoose.Types.ObjectId(req.body.addressid);
        var orderinfo = {or_phone: req.body.userphone, or_fid: or_fid, or_adid: or_adid, or_time:nowtime, or_state: "1" };
        orderwrite.insertOne(orderinfo, function(err, res) {
            if (err) throw err;
        });
        res.end("200");
    }

    //我的订单数据
    this.myorder = function(req, res){

        //连表查询方式
        /*orderwrite.aggregate([
            { $lookup:
                {
                    from: 'foods',            // 右集合
                    localField: 'or_fid',   // 左集合 join 字段
                    foreignField: '_id',         // 右集合 join 字段
                    as: 'orderlist'           // 新生成字段（类型array）
                }
            },
            {$match:{"or_phone":req.cookies.userphone,"or_state":{$gt:"0"}}}
        ]).toArray(function(err, result) {
            if (err) throw err;
            console.log(result.or_state);
            res.jsonp(result);
        });*/

        //重组方式
        var myorder = {"or_phone":req.cookies.userphone,"or_state":{$gt:"0"}};  // 查询条件
        orderwrite.find(myorder, {}, function(err, data){
            if (err) throw err;
            //得到A表中的所有数据
            data.toArray(function(err, orderlist){
                if (err) throw err;
                var len = orderlist.length;
                var myorderlist=[];
                var resno=0;
                for (var i = 0; i < len; i++) {
                    var myorder = orderlist[i];
                    var fid = myorder.or_fid;
                    foodinfo.find({_id:fid}).toArray(function(err, result) { // 返回集合中所有数据
                        if (err) throw err;
                        //console.log(orderlist[resno]._id);
                        var order_orstate=orderlist[resno].or_state;
                        var order_state='';
                        if(order_orstate==1){
                            order_state='未接单';
                        }else if(order_orstate==2){
                            order_state='配送中';
                        }else {
                            order_state='已完成';
                        }
                        myorderlist.push({orid:orderlist[resno]._id,adid:orderlist[resno].or_adid,ortime:orderlist[resno].or_time,orstate:order_state,foodid:orderlist[resno].or_fid,f_name:result[0].f_name,f_marks:result[0].f_marks,f_price:result[0].f_price,f_img:result[0].f_img});
                        resno=resno+1;
                        if(resno==len){
                           res.jsonp(myorderlist);
                        }
                    });
                }

            })
        })

    };

    //我的订单地址数据
    this.order_address = function(req, res){
        var id = mongoose.Types.ObjectId(req.body.adid);
        var adid = {"_id":id};  // 查询条件
        addressinfo.find(adid).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        });

    };

    //我的订单状态
    this.getstate = function(req, res){
        var id = mongoose.Types.ObjectId(req.body.orid);
        var orid = {"_id":id};  // 查询条件
        orderwrite.find(orid).toArray(function(err, result) {
            if (err) throw err;
            res.json(result);
        });

    };

    //取消订单
    this.delorder = function(req, res){
        var id = mongoose.Types.ObjectId(req.body.orid);
        var orid = {"_id":id};  // 查询条件
        var upstate={$set: { "or_state" : "0" }}; //字段更改内容
        orderwrite.updateOne(orid, upstate, function(err, res) {
            if (err) throw err;
        });
        res.end("200");

    };

    //我的收货地址
    this.myadress = function(req, res){
        var userphone=req.query.userphone;
        var user_phone = {"ad_u_phone":userphone,"ad_state":"1"};  // 查询条件
        addressinfo.find(user_phone).toArray(function(err, result) {
            if (err) throw err;
            res.jsonp(result);
        });

    };

    //删除我的地址
    this.deladdress = function(req, res){
        var id = mongoose.Types.ObjectId(req.body.adid);
        var adid = {"_id":id};  // 查询条件
        var upstate={$set: { "ad_state" : "0" }}; //字段更改内容
        addressinfo.updateOne(adid, upstate, function(err, res) {
            if (err) throw err;
        });
        res.end("200");

    };

    //添加我的收货地址
    this.add_address=function (req,res) {
        var myaddress = { ad_u_phone: req.body.user, ad_name: req.body.username, ad_phone: req.body.userphone,ad_address:req.body.useraddress, ad_state: "1" };
        addressinfo.insertOne(myaddress, function(err, res) {
            if (err) throw err;
        });
        res.end("200");
    };

}

module.exports = index;

