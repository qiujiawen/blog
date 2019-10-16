const mongoose = require('mongoose');
const userSchema = require('../Schema/user');

// 对上面的导入的user的schema生成一个User的model并导出
module.exports = mongoose.model('User',userSchema);
