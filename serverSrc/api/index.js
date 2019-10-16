/**
 * 根路由
 * @type {*|module:koa-router|Router}
 */
const router = require('koa-router')();
const
    admin = require('./admin'),
    blog = require('./blog'),
    user = require('./user');

/**
 *  '/api/:id' 路径下子路由模块
 */
router.use('/',user.routes());

/**
 *  '/api/admin/:id' 路径下子路由模块
 */
router.use('/admin',admin.routes());

/**
 *  '/api/blog/:id' 路径下子路由模块
 */
router.use('/blog',blog.routes());


module.exports = router;