const Email = require('../email');
const Redis = require('../redis');
const validateUrlHost = 'http://123.206.135.206:3007';
const md5 = require('md5');
class Account {
    constructor() {

    }

    /**
     * 注册验证码
     */
    async sendRegisterValidate(operator, userEmail) {
        // let code = parseInt(Math.random() * 999999) + 100000;
        let email = new Email();
        let screct = md5("wmqh" + userEmail + "blog");
        let href = validateUrlHost + "/users/validatemail?p=register&t=" + ((new Date()).getTime() / 1000) + "&m=" + userEmail + "&ms=" + screct;
        let msg = "尊敬的用户您好！<br /><p style='text-indent:2em;'>你收到此邮件是因为你注册了起航博客的用户，请点击以下链接激活邮箱，如不是你注册的请忽略此邮件。</p>" + href + "<p>如遇到不能点击，请手动复制到浏览器访问。</p>";
        let subject = "起航博客注册邮箱激活";
        let content = "<a href='" + href + "'>" + msg + "</a>";
        return await email.send(userEmail, subject, content);
    }

    async test(operator, userEmail) {
        let email = new Email();
        let screct = md5("wmqh" + userEmail + "blog");
        let href = validateUrlHost + "/users/validatemail?p=register&t=" + ((new Date()).getTime() / 1000) + "&m=" + userEmail + "&ms=" + screct;
        let msg = "尊敬的用户您好！<br /><p style='text-indent:2em;'>你收到此邮件是因为你注册了起航博客的用户，请点击以下链接激活邮箱，如不是你注册的请忽略此邮件。</p>" + href + "<p>如遇到不能点击，请手动复制到浏览器访问。</p>";
        let subject = "起航博客注册邮箱激活";
        let content = "<a href='" + href + "'>" + msg + "</a>";
        return await email.send(userEmail, subject, content);
    }    
}

module.exports = Account;
