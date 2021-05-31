'use strict';

function login (db) {
    var dbo = db.db("food");
    var userinfo = dbo.collection('user');

    //登录方法
    this.login_do = function (req, res) {
        //console.log(JSON.stringify(req.body.u_phone));
        //res.end(req.body.u_phone);
        var u_info = {"u_phone":req.body.u_phone,"u_pass" : req.body.u_pass};  // 查询条件
        userinfo.find(u_info).toArray(function(err, result) {
            if (err) throw err;
            if(result!=''){
                res.cookie('userphone',req.body.u_phone); //存储登录信息
                res.end("200");
                //console.log(req.cookies.userphone);
            }else {
                res.end("用户名或密码错误！");
            }
            //db.close();
        });
    };

    //注册
    this.register_do=function (req,res) {
        var u_phone = {"u_phone":req.body.u_phone};  // 查询条件
        userinfo.find(u_phone).toArray(function(err, result) {
            if (err) throw err;
            if(result!=''){
                res.end("用户名已存在");
            }else {
                var users = { u_phone: req.body.u_phone, u_name: req.body.u_name, u_pass: req.body.u_pass, u_state: "1" };
                userinfo.insertOne(users, function(err, res) {
                    if (err) throw err;
                });
                res.end("200");
            }
        });
    };

    //退出
    this.login_out = function (req, res) {
        res.cookie('userphone', '', { expires: new Date(0)});
        res.send('<meta http-equiv="refresh" content="0;url=/login">');
    };

}

module.exports = login;