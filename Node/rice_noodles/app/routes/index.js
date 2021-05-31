'use strict';

var Login = require(process.cwd() + '/app/controllers/index/login.server.js');
var Index = require(process.cwd() + '/app/controllers/index/index.server.js');
var Admin = require(process.cwd() + '/app/controllers/admin/index.server.js');

module.exports = function (app,db) {

    var login = new Login(db);
    var index = new Index(db);
    var admin = new Admin(db);

    //菜品展示
    app.route('/')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/index/index.html');
        });

    //菜品展示数据
    app.route('/indexshow')
        .get(index.inshow);

    //点餐详情页
    app.route('/getfood')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/index/getfood.html');
        })
        .post(index.foodinfo);

    //获取收货地址
    app.route('/getaddress')
        .post(index.adinfo);

    //点餐下单
    app.route('/worder')
        .post(index.worder);

    //订单
    app.route('/order')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/index/order.html');
        });

    //我的订单展示数据
    app.route('/myorder')
        .get(index.myorder);

    //我的订单数据详情
    app.route('/orderview')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/index/orderview.html');
        });

    //我的订单详情地址数据
    app.route('/order_address')
        .post(index.order_address);

    //我的订单状态
    app.route('/getstate')
        .post(index.getstate);

    //取消订单
    app.route('/delorder')
        .post(index.delorder);

    //个人中心
    app.route('/center')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/index/center.html');
        });

    //收货地址
    app.route('/address')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/index/address.html');
        });

    //我的收货地址
    app.route('/myadress')
        .get(index.myadress);

    //删除我的收货地址
    app.route('/deladdress')
        .post(index.deladdress);

    //添加我的收货地址
    app.route('/add_address')
        .post(index.add_address);

    //增加收货地址
    app.route('/add_address')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/index/add_address.html');
        });

    //登录
    app.route('/login')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/index/login.html');
        })
        .post(login.login_do);

    //注册
    app.route('/register')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/index/register.html');
        })
        .post(login.register_do);

    //退出
    app.route('/loginout')
        .get(login.login_out);

    //系统管理后台路径

    //商家登录
    app.route('/admin_login')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/admin/login.html');
        });

    //商家登录操作
    app.route('/admin_login_do')
        .post(admin.adminlogin);

    //外卖小哥登录操作
    app.route('/del_login_do')
        .post(admin.delogin);

    //商家、外卖小哥退出
    app.route('/adminout')
        .get(admin.adminout);

    app.route('/delout')
        .get(admin.delout);

    //配送员登录
    app.route('/delivery_login')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/admin/dlogin.html');
        });

    //首页数据展示
    app.route('/admin_index')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/admin/index.html');
        });

    //首页数据源
    app.route('/admin_count')
        .get(admin.admin_count);

    app.route('/admin_seven')
        .get(admin.admin_seven);

    //米线管理
    app.route('/admin_ricem')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/admin/rice.html');
        });

    //添加米线
    app.route('/admin_addricem')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/admin/addrice.html');
        });

    //信息上传
    app.route('/admin_addricem_do')
        .post(admin.admin_addricem_do);

    //图片上传
    app.route('/admin_addricem_img')
        .post(admin.admin_addricem_img);

    //编辑米线信息
    app.route('/admin_editricem')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/admin/editrice.html');
        });

    app.route('/admin_addricem_editinfo')
        .get(admin.admin_addricem_editinfo);

    app.route('/admin_addricem_edit')
        .post(admin.admin_addricem_edit);

    //米线数据获取
    app.route('/admin_rice')
        .get(admin.admin_rice);

    //删除米线数据
    app.route('/admin_delrice')
        .post(admin.admin_delrice);

    //配送员管理
    app.route('/admin_deuser')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/admin/delivery.html');
        });

    //添加配送员
    app.route('/admin_adddeuser')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/admin/adddeuser.html');
        });

    //未接订单管理
    app.route('/admin_ordering')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/admin/admin_ordering.html');
        });

    //获取未接单数据
    app.route('/ad_ordering')
        .get(admin.ad_ordering);

    //已接订单管理
    app.route('/admin_ordered')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/admin/admin_ordered.html');
        });

    //选择配送员接单
    app.route('/getorder')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/admin/getorder.html');
        });

    //配送员信息
    app.route('/deuserinfo')
        .get(admin.deuserinfo);

    //配送员配送中
    app.route('/del_cont')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/admin/decont.html');
        });

    //配送员配送记录
    app.route('/del_conted')
        .get(function (req, res) {
            res.sendFile(process.cwd() + '/app/view/admin/deconted.html');
        });

    //承接订单并修改状态
    app.route('/getorder_do')
        .post(admin.getorder_do);

};
