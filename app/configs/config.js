const path = require('path');
module.exports = {
    server: {port: 3002},
    cookie: {
        key: 'ns:psid', /** (string) cookie key (default is koa:sess) */
        /** (number || 'session') maxAge in ms (default is 1 days) */
        /** 'session' will result in a cookie that expires when session/browser is closed */
        /** Warning: If a session cookie is stolen, this cookie will never expire */
        maxAge: 60, // session过期时间
        overwrite: true, /** (boolean) can overwrite or not (default true) */
        httpOnly: true, /** (boolean) httpOnly or not (default true) */
        signed: true, /** (boolean) signed or not (default true) */
        rolling: false, 
    },
    app: {
        keys: [
            'abcdefg'
        ]
    },
    views: {
        root: path.join(__dirname, '../views'),
        layout: 'template',
        viewExt: 'html',
        cache: false,
        debug: false,
        static: {
            root: path.join(__dirname, '../../public'),
            maxAge: 365 * 24 * 60 * 60, 
            extensions: true
        }
    }
}