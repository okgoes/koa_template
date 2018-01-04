const Router = require('koa-router');
const Promise = require('../models/promise');
let router = new Router();

// 路由引入
router = require('./blog/blog')(router);
router = require('./users/account')(router);
router = require('./files/upload')(router);
/**
 * controller引入
 */
const Test = require('../controllers/test/test');

/**
 * 生成数据表文档
 */
router.get('/build/tables', async function(ctx, next) {
    await ctx.render('build/tables');
});

/**
 * 生成接口文档
 */
router.get('/build/interface', async function(ctx, next) {
    await ctx.render('build/interface');
});

router.get('/index', function(ctx, next) {
    ctx.session.views = ctx.session.views || 0;
    ctx.session.views++;
    ctx.body = 'session is set';
});

router.get('/index/index', function(ctx, next) {
    ctx.body = ctx.session.views;
});

/**
 * 测试使用
 */
router.get('/test/index', function(ctx, next) {
    let promise = new Promise((resolve, reject) => {
        setTimeout(function(){
            resolve(1);
        }, 1000);
    });
    promise.catch((err) => {
        ctx.body = err;
    }).then((result, err) => {
        ctx.body = result;
    });
});
module.exports = router;