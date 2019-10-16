/**
 * 后端服务器入口文件
 * @type {module.Application|*}
 */
const
    Koa = require('koa'),
    Router = require('koa-router'),
    bodyParser = require('koa-bodyparser'),
    cors = require('@koa/cors'),
    index = require('./serverSrc/api');

//  实例化对象
const
    app = new Koa(),
    router = new Router();

// post请求中间件
app.use(bodyParser());
// 跨域请求的中间件
app.use(cors());
// 配置 session
app.keys = ['some secret hurr'];

router.use('/api',index.routes());

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(9191);