// 設定引入的套件
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')


// 資料庫設定開始
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testPost6')
    .then(res => console.log("連線資料成功123"));

// 引入路由模組
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postRouter = require('./routes/posts');

// 創建 Express 應用程式
var app = express();

// 設定 middleware
app.use(logger('dev'));  // 紀錄HTTP請求的log狀況
app.use(express.json()); // 解析JSON格式的請求資料
app.use(express.urlencoded({ extended: false }));        // 解析URL編碼格式的請求資料
app.use(cookieParser());                                 // 解析HTTP請求中的cookie資料
app.use(express.static(path.join(__dirname, 'public'))); // 設定靜態檔案目錄
app.use(cors());

// 設定路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postRouter);
// note：將根路徑/、/users、/posts'的請求，分別導向到indexRouter、usersRouter、postRouter路由


module.exports = app;
