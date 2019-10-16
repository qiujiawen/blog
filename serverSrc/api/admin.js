/**
 * 后台管理的API
 * @type {*|module:koa-router|Router}
 */
const route = require("koa-router")();
const User = require('../mongoose/Model/user');
const Category = require('../mongoose/Model/category');
const Content = require('../mongoose/Model/content');

// 定义一个返回给前端的对象
let result = {
    code: 0,
    message: "",
    data: [],
};

/**
 *  用户列表
 */
route.get('/',async ctx=>{

    let
        page = Number(ctx.query.page || 1), //前台的当前页数
        pages =  0, //总页数
        limit = 5, //查询多少条数据
        skip = 0,     // 忽略几条数据
        pageInfo = {};

    // 查询总数据
    await User.collection.countDocuments().then(async count=>{

        pages = Math.ceil( count / limit);    // 向上取整
        page = Math.min(page, pages);           // 取值不能超过pages
        page = Math.max(page, 1);               //  取值不能小于1
        pageInfo = {
            pages,
            page,
            count
        };
        skip = (page - 1) * limit;
    });

    // 查询所有数据，并且根据条件查询
    await User.find().limit(limit).skip(skip).then(doc=>{
        result.message = '查询成功';
        result.data = doc;
    });
    ctx.body = {...result, ...pageInfo};

});

/**
 * 分类添加
 */
route.post('/category/add', async ctx=>{

    let {name} = ctx.request.body || '';
    if (!name) {
        result.message = '分类名称不能为空，请输入分类名称';
        result.code = 1;
        ctx.body = result;
        return ;
    }

    await Category.findOne({name}).then(doc=>{
        if (!doc){
            const category = new Category({name});
            category.save();
            result.message = '保存成功';
        }else{
            result.code = 4;
            result.message = '分类名称已存在';
        }
        ctx.body = result;
    });

});

/**
 * 分类首页
 */
route.get('/category',async ctx=>{
    let
        page = Number(ctx.query.page || 1), //前台的当前页数
        pages =  0, //总页数
        limit = 5, //查询多少条数据
        skip = 0,     // 忽略几条数据
        pageInfo = {};
    await Category.collection.countDocuments().then(count=>{
        pages = Math.ceil(count / 5);
        page = Math.max(page, 1);
        page = Math.min(page, pages);
        pageInfo = {
            pages,
            page,
            count
        };
        skip = (page - 1) * limit;
    });

    /**
     *  sort()
     *  1：升序
     *  -1：降序
     */
    await Category.find().sort({_id:-1}).limit(limit).skip(skip).then(doc=>{
        result.message = '查询成功';
        result.data = doc;
    });
    ctx.body = {...result, ...pageInfo};

});

/**
 * 分类修改
 */
route.post('/category/edit', async ctx=>{
    let {id, name} = ctx.request.body;
    if (!id || !name){
        result.code = 1;
        result.message = '请传入查询条件';
        return ctx.body = await result;
    }

    await Category.findOne({_id:id})
        .then(category=>{
            if (!category) {
                result.code = 1;
                result.message = '查询条件有错';
                return ctx.body = result;
            }else return Promise.resolve(category);
        }).then(async doc=>{
            let oName = await Category.findOne({name:name}).then(doc=>doc);
            if (oName){
                result.code = 4;
                result.message = '该名称已有';
            } else {
                await Category.updateOne({_id:id}, {name:name});
                result.message = '修改成功';
            }
        });
    ctx.body = result;
});

/**
 *  分类删除
 */
route.del('/category/delete', async ctx=>{
    let {id} = ctx.request.body;
    await Category.deleteOne({_id:id})
        .then(doc=>{
            if (doc.n === 0){
                result.code = 2;
                result.message = '删除失败，删除不存在';
            } else {
                result.message = '删除成功';
            }
        });
    ctx.body = result;
});

/**
 *   内容页面中的分类信息
 */
route.get('/content/category', async ctx=>{
    await Category.find().sort({_id:-1}).then(doc=>{
        result.message = '分类信息查询成功';
        result.data = doc;
    });
    ctx.body = result;
});

/**
 * 内容保存
 */
route.post('/content/add', async ctx=>{
    let {category, title, description, content, user} = ctx.request.body;
    if(!category || !title || !description || !content || !user){
        result.code = 1;
        result.message = '请求失败，参数不为空';
        return ctx.body = await result;
    }
    await new Content({
        category,
        title,
        description,
        content,
        user
    }).save();
    result.message = '内容保存成功';
    ctx.body = await result;
});

/**
 *  内容首页
 */
route.get('/content',async ctx=>{
    let page = Number(ctx.query.page || 1),
        pages = 1,
        limit = 5,
        skip = 0,
        pageInfo = {};
    await Content.collection.countDocuments().then(count=>{
        pages = Math.ceil(count / limit);
        page = Math.min(page, pages);
        page = Math.max(page, 1);
        skip = (page - 1) * limit;
        pageInfo = {
            pages,
            page,
            count
        }
    });
    await Content.find().sort({addTime:-1}).limit(limit).skip(skip).populate(['category','user'])
        .then(contents=>{
            result.data = contents;
            result.message = '查询成功';
        });
    ctx.body = {...result, ...pageInfo};
});

/**
 *  内容编辑页面，通过id返回内容数据
 */
route.get('/content/edit',async ctx=>{
    const id = ctx.query.id;
    await Content.find({_id:id}).populate(['category','user']).then(doc=>{
        result.message = '查询成功';
        result.data = doc;
    });
    ctx.body = result;
});

/**
 * 内容编辑保存
 */
route.post('/content/update', async ctx=>{
    const { _id, category, title, content, description} = ctx.request.body;
    await Content.updateOne({_id}, {
        category,
        title,
        content,
        description
    }).then(doc=>{
        result.message = '更新成功';
        result.data = [];
    });
    ctx.body = result;
});

/**
 *  内容删除
 */
route.del('/content/delete', async ctx=>{
    const {_id} = ctx.request.body;
    await Content.deleteOne({_id})
        .then(doc=>{
            if (doc.n === 0){
                result.code = 2;
                result.message = '删除失败，删除不存在';
            } else {
                result.message = '删除成功';
            }
        });
    ctx.body = result;
});

module.exports = route;