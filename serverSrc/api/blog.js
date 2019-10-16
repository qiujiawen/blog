const router = require("koa-router")();
const Category = require('../mongoose/Model/category');
const Content = require('../mongoose/Model/content');
const User = require('../mongoose/Model/user');

// 定义一个返回给前端的对象
let result = {
    code: 0,
    message: "",
    data: [],
};

/**
 * 分类信息
 */
router.get('/category', async ctx=>{
    await Category.find().then(doc=>{
        result.data = doc;
        result.message = '查询成功';
    });
    ctx.body = result;
});

/**
 *  分类内容
 */
router.get('/',async ctx=>{

    let page = Number(ctx.query.page || 1),
        category = ctx.query.category,
        pages = 1, //总页数
        limit = 3, //每次查询几条数据
        pageInfo = {},//返回给前端的页码等信息
        skip = 0;  //忽略查询几条数据

    let where = {};
    if (category) where.category = category;

    await Content.countDocuments().where(where).then(count=>{
        pages = Math.ceil(count / limit);
        page = Math.min(pages, page);
        page = Math.max(1, page);
        skip = (page - 1) * limit;
        pageInfo = {
            pages,
            page,
            count
        }
    });

    await Content.where(where).find().sort({addTime:-1}).limit(limit).skip(skip).populate(['category','user'])
        .then(doc=>{
            result.data = doc;
            result.message = '查询成功';
        });
    ctx.body = {...result,...pageInfo};

});

/**
 *  通过id查询用户数据
 */
router.get('/query', async ctx=>{
    const _id = ctx.query.id;
    if(!_id) return ctx.body = {code: 2, message:'ID为空，查询错误'};
    await Content.findOne({_id}).populate(['category', 'user'])
        .then(doc=>{
            doc.views++;
            doc.save();
            result.message = '查询成功';
            result.data = [];
            result.data.push(doc);
        });
    ctx.body = result;
});

/**
 *  用户评论后提交
 */
router.post('/commit', async ctx =>{
    const { _id, comments, userId} = ctx.request.body;
    await Content.findOne({_id})
        .then(async doc=>{
            await User.findOne({_id: userId})
                .then(user=>{
                    doc.comments.push({
                        username: user.username,
                        _id: user._id,
                        time:new Date(),
                        content:comments
                    });
                    doc.save();
                    result.data = [];
                    result.message = '保存成功';
                });
        });
    ctx.body = result;
});


module.exports = router;