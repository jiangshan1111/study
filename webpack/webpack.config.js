let path = require('path');
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let postCss = require('autoprefixer')({
  "overrideBrowserslist": [
    'last 10 Chrome version',
    'last 5 Firefox version',
    'Safari >= 6',
    'ie > 8'
  ]
})

module.exports = {
  //mode模式 默认两种 production(生产环境：代码压缩) development(开发环境：代码不压缩)
  mode: 'development',
  entry: {
    index: './src/index.js',//入口
    admin: './src/admin.js',//入口
  },
  output: {
    filename: 'static/js/[name].js',//打包后的文件名
    path: path.resolve('dist'), //路径必须是一个绝对路径 表示根目录下面的dist文件夹
    publicPath: "/" //build之后的公共路径
  },
  devServer: {//开启服务器配置
    port: "8080",//端口
    host: "localhost",//ip地址localhost本地，192.168.0.200可以访问网络地址 用于真机测试
    progress: true,//开启进度条
    // contentBase: "./build",//默认打开目录
    open: true,//自动打开浏览器
    compress: true,//启动gzip压缩
    //跨域
    proxy: {
      '/api': {
        target: 'http://10.1.2.147:8080',
        changeOrigin: true,//是否跨域
        pathRewrite: {
          '^/api': ''//需要rewrite的，
        }
      }
    }
  },
  //一个数组存放所以插件
  plugins: [
    //配置这个模板后contentBase:'./build'不生效
    new HtmlWebpackPlugin({
      //生成两个看不到的文件
      template: "./public/index.html",
      filename: "index.html",
      minify: {
        //折叠换行true不换行
        collapseWhitespace: true
      },
      hash: true //生产环境下生成hash戳
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/main.css',
    })
  ],
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,//都放到了上面的main.css里
        {
          loader: 'css-loader'
        },
        {//处理css兼容
          loader: 'postcss-loader',
          options: {
            plugins: [
              postCss
            ]
          }
        }
      ]
    }]
  }
}