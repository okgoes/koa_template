const BlogQuery = require('../../controllers/blog/query');
/**
 * router
 */
module.exports = function (router) {
    /**
     * 实例化控制器
     */
    let blogQuery = new BlogQuery();
    /**
     * 路由配置
     */
    router.get('/', async function(ctx, next) {
        await ctx.render('index/index');
    });

    /**
     * 博客列表接口
     */
    router.get('/blog/getlists', async function(ctx, next) {
        let page = ctx.query.page || 1;
        let pagesize = ctx.query.pagesize || 20;
        let orderByTime = ctx.query.orderByTime || 2;
        let res = await blogQuery.getList(page, pagesize, null, orderByTime);
        if (res.code) {
            res.code = 1;
        } else {
            res.code = 0;
        }
        res = {
            data: {
                data: res.rows,
                rows: res.count,
                pagesize: pagesize,
                current: page
            }
        }
        ctx.body = res;
    });

    router.get('/blog/search', async function(ctx, next) {
        let page = ctx.query.page || 1;
        let pagesize = ctx.query.pagesize || 10;
        let orderByTime = ctx.query.orderByTime || 2;
        let keyword = ctx.query.keyword || null;
        let res = await blogQuery.search(page, pagesize, keyword, orderByTime);
        res.data = {
            data: res.data,
            pagesize: pagesize,
            current: page
        }
        ctx.body = res;
    });

    router.get('/blog/hotlist', async function(ctx, next) {
        let page = ctx.query.page || 1;
        let pagesize = ctx.query.pagesize || 10;
        let orderByTime = ctx.query.orderByTime || 2;
        let keyword = ctx.query.keyword || null;
        let res = await blogQuery.hotlists(1, 10);
        res = {code: 1, data: {data: res}};
        ctx.body = res;
    });

    router.get('/blog/today', async function(ctx, next) {
        let page = ctx.query.page || 1;
        let pagesize = ctx.query.pagesize || 10;
        let orderByTime = ctx.query.orderByTime || 2;
        let keyword = ctx.query.keyword || null;
        let res = await blogQuery.todaySort(page, pagesize);
        res = {code: 1, data: {data: res}};
        ctx.body = res;
    });

    /**
     * 点赞
     */
    router.post('/blog/evaluate', async function(ctx, next) {
        let blogId = ctx.request.body.blogId || 0;
        let type = ctx.request.body.type || 0;
        let ip = ctx.request.ip || '127.0.0.1';
        if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7)
        }
        let userId = null;
        let res = await blogQuery.evaluate(blogId, type, ip, userId);
    });

    /**
     * 发布blog
     */
    router.post('/blog/deploy', async function(ctx, next) {

    });
    
    router.get('/blog/lists', async function(ctx, next) {
        await ctx.render('index/index');
    });
    return router;
};