const Table = require('../table');

class Account extends Table {
    constructor() {
        super();
        this.primaryKey = 'id';
        this.table = 'b_account';
    }

    async findById(id) {
        if (!id) {
            return false;
        }
        this.tableWhere.set({id: id});
        let sql = 'SELECT * FROM ' + this.table;
        let sql = sql + ' WHERE ' + this.tableWhere.toString();
        let res = await this.query(sql);
        return res.length ? res[0] : false;
    }

    async auth(user, passwd) {

    }

    async register(username, email, validatecode, passwd, passwdComfirm, ) {
        let result = {code: 0, msg: ''};
        if (username.length < 6 || username.length > 20) {
            result.msg = '用户名长度过短或过长';
            return result;
        }
        if (!/[\S]{1,}@[\S]{1,}\.[\S]{1,}/.test(email)) {
            result.msg = '不合法的邮箱';
        }
        if (validatecode.length ) {

        }
    }
}

module.exports = Account;