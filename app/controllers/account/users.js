const Account = require('../../models/business/account');

class Users {
    constructor () {
        this.account = new Account();
    }

    async send() {
        let res = await this.account.test(1, '327523057@qq.com');
        console.log(res);
        return res;
    }
}

module.exports = Users;
