const mongoose = require('../index');
module.exports = new mongoose.Schema({
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:String,
    // 简介
    description:{
        type: String,
        default: ''
    },
    // 内容
    content:{
        type: String,
        default: ''
    },
    // 时间
    addTimes:{
        type:Date,
        default:new Date(),
    },
    // 阅读量
    views:{
        type: Number,
        default: 0
    },
    // 评论
    comments:{
        type:Array,
        default:[]
    }
});