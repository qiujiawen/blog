let mongoose = require('mongoose');
const location = 'mongodb://localhost:27017/blogdatabase';
mongoose.Promise = global.Promise;
// 连接本地的blogDataBase数据库
mongoose.connect(location,{useNewUrlParser:true});
let db = mongoose.connection;

// 连接异常
db.on('error',err=>{
    console.log('Mongoose 连接失败: ' + err);
});

// 连接成功
db.once('open', ()=>{
    console.log('Mongoose 连接成功： ' + location);
});

// 连接断开
db.on('disconnected', function () {
    console.log('Mongoose 已断开连接')
});

module.exports = mongoose;
