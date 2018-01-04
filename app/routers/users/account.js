const Users = require('../../controllers/account/users');
let users = new Users();
/**
 * 账户相关路由
 */
module.exports = function (router) {
    /**
     * 注册
     */
    router.get('/email/test', async function(ctx, next) {
        let res = await users.send();
        ctx.body = res;
    });

    router.get('/user/times', async function(ctx, next) {
        await ctx.render('account/times');
    });
    return router;
}