const Koa = require('koa');
const app = new Koa();
const session = require('koa-session');
// const views = require('koa-views');
const cors = require('koa-cors');
const render = require('koa-ejs');
const koaStatic = require('koa-static');
const convert = require('koa-convert');
/**
 * 处理文件上传
 */
const koaBody = require('koa-body');
/**
 * 用户配置
 */
const config = require('./app/configs/config');
const router = require('./app/routers/router');

app.keys = config.app.keys;
app.use(session(config.cookie, app));

app.use(convert(cors()));
// app.use(views(__dirname + '/app/views', {
//     map: {
//       html: 'underscore'
//     }
// }));
/**
 * 配置静态文件
 */
app.use(koaStatic(config.views.static.root, {
    maxAge: config.views.static.maxAge, 
    extensions: config.views.static.extensions
}));
/**
 * 配置允许文件上传
 */
app.use(koaBody({multipart: true}));

render(app, {
    root: config.views.root,
    layout: config.views.layout,
    viewExt: config.views.viewExt,
    cache: config.views.cache,
    debug: config.views.debug
});


app.use(router.routes())
   .use(router.allowedMethods());

app.listen(config.server.port);