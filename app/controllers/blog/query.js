const Blog = require('../../models/tables/blog');

class BlogQuery {
    constructor () {
        this.blog = new Blog();
        // this.newBlog = new Blogs();
    }

    async getList(page, pagesize, where, order, type) {
        if (order == 1) {
            order = ["updatetime", "ASC"];
        } else if (order == 2) {
            order = ["updatetime", "DESC"];
        }

        if (type) {

        }
        where = {$and: {isvalid: 1}}
        return await this.blog.findAllAndCount(page, pagesize, where, order);
    }

    async search(page, pagesize, keyword, order) {
        let where = {};
        if (order == 1) {
            order = ["updatetime", "ASC"];
        } else if (order == 2) {
            order = ["updatetime", "DESC"];
        }
        if (keyword) {
            where['$or'] = [{title: {$like: '%' + keyword + '%'}}, {text: {$like: '%' + keyword + '%'}}, {tab: {$like: '%' + keyword + '%'}}];
        } else {
            return {code: 0, msg: '关键词必填'}
        }
        where.$and = {isvalid: 1};
        return await this.blog.findAllAndCount(page, pagesize, where, order);
    }

    async hotlists(page, pagesize) {
        let where = {};
        where.$and = {isvalid: 1};
        return await this.blog.getHotLists(page, pagesize, where);
    }

    async todaySort(page, pagesize) {
        let where = {};
        where.$and = {isvalid: 1};
        return await this.blog.getClickCount(page, pagesize, where);
    }

    async evaluate(blogId, type, ip, userId) {
        if (!blogId) {
            return {code: 0, msg: 'blogId is must'}
        }
        let res = await this.blog.setEvaluate(blogId, type, this._ipToNumber(ip), userId);
        if (res) {
            return {code: 1, msg: '评价成功'};
        }
        return {code: 0, msg: '评价失败'};
    }

    /**
     * ip转为数字
     * @param {String} ip 
     * @return {Number}
     */
    _ipToNumber(ip) {
        let numbers = ip.split('.');
        return parseInt(numbers[0]) * 256 * 256 * 256 + parseInt(numbers[1]) * 256 * 256 + parseInt(numbers[2]) * 256 + parseInt(numbers[3]);
    }
}

module.exports = BlogQuery;