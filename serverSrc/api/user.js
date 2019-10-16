/**
 * 首页的API
 * @type {*|module:koa-router|Router}
 */
const router = require('koa-router')();
const User = require('../mongoose/Model/user');

// 定义一个返回给前端的对象
let result = {
    code: 0,
    message: "",
    data: [],
    userInfo:{
        _id:'',
        username:''
    }
};

/**
 * 注册
 */
router.post('register', async ctx =>{

    // 重置
    result = {
        code: 0,
        message: "",
        data: {}
    };

    const {
        username,
        password,
        repassword
    } = ctx.request.body;

    if (!username || !password || (password !== repassword)) {

        if (!username){
            result.code = 1;
            result.message = '用户名不为空';
        }else if(!password){
            result.code = 1;
            result.message = '密码不为空';
        }else if(password !== repassword){
            result.code = 1;
            result.message = '密码不一致';
        }
        return ctx.body = result;
    }

    /**
     *  查找数据库
     */
    await User.findOne({ username })
        .then(doc=>{
            if(doc){
                result.code = 4;
                result.message = '用户名已被注册';
            }else{
                result.message = '注册成功';
                const user = new User({username, password});
                user.save();
            }
            ctx.body = result;
        });
});

/**
 * 登录
 */
router.post('login', async ctx =>{

    // 重置
    result = {
        code: 0,
        message: "",
        data: {}
    };
    const { username, password} = ctx.request.body;

    if(!username || !password){
        result.message = '用户名或者密码不为空';
        result.code = 1;
        return ctx.body = result;
    }

    await User.findOne({username, password})
        .then(doc=>{
            if (!doc){
                result.code = 2;
                result.message = '用户名与密码不一致';
                return ctx.body = result;
            }
            result.message = '登录成功';
            result.userInfo = {
                _id : doc._id,
                username: doc.username,
            };

            ctx.body = result;
        });

});

/**
 * 退出登录
 */
router.get('user', ctx=>{
    result.message = '退出成功';
    result.userInfo = null;
    ctx.body = result;
});

/**
 * 判断用户的权限
 */
router.post('permission',async ctx=>{

    const {username} = ctx.request.body;
    if (!username){
        result.message = '查询条件不为空';
        result.code = 1;
        return ctx.body = result;
    }
    await User.findOne({username}).then(doc=>{
        result.message = '查询成功';
        ctx.body = {...{isAdmin:doc.isAdmin},...result};
    })
});

module.exports = router;