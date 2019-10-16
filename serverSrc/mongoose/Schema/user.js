const mongoose = require('../index');

// 导出 mongoose 定义的数据模式（schema）
module.exports = new mongoose.Schema({
    username: String, // 用户名
    password: String, // 密码
    isAdmin:{
        type:Boolean,
        default:false
    }, //   是不是管理员
});