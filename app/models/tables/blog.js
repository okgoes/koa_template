const Table = require("../table");
const Sequelize = require('sequelize');
const BlogEvaluate = require('./blog-evaluate');
const BlogClickCount = require('./blog-click-count');

class Blog extends Table {
    constructor () {
        super('b_blog_content', {
            id: {
                type: Sequelize.INTEGER(10),
                primaryKey: true,
                autoIncrement: true
            },
            title: {
                type: Sequelize.toString(200),
                allowNull: false
            },
            text: {
                type: Sequelize.TEXT
            },
            content: {
                type: Sequelize.TEXT
            }
        },{
            // 自定义表名
            'freezeTableName': true,
            'tableName': 'b_blog_content',
    
            // 是否需要增加createdAt、updatedAt、deletedAt字段
            'timestamps': true,
    
            // 不需要createdAt字段
            'createdAt': 'createtime',
    
            // 将updatedAt字段改个名
            'updatedAt': 'updatetime',
    
            // 将deletedAt字段改名
            // 同时需要设置paranoid为true（此种模式下，删除数据时不会进行物理删除，而是设置deletedAt为当前时间
            'deletedAt': false,
            'paranoid': false
        });
        this.blogEvaluate = new BlogEvaluate();
        this.blogClickCount = new BlogClickCount();
    }

    async getHotLists(page, pagesize, where, order, group) {
        this.model.hasOne(this.blogEvaluate.model, {foreignKey: 'cid'});
        let options = {};
        if (page) {
            options.limit = pagesize;
            options.offset = (page - 1) * pagesize;
        }
        if (where) {
            options.where = where;
        }
        order = [{model: this.blogEvaluate.model}, "praise", 'DESC'];
        if (order) {
            options.order = [order];
        }
        options.include = {
            model: this.blogEvaluate.model,
            attributes: [],
            required: false,
            where: {
                
            },
            order: [['praise', 'DESC']]
        };
        return await this.model.findAndCount(options);
    }
    
    async getClickCount(page, pagesize, where, order) {
        this.model.hasOne(this.blogClickCount.model, {foreignKey: 'bid'});
        let options = {};
        if (page) {
            options.limit = pagesize;
            options.offset = (page - 1) * pagesize;
        }
        if (where) {
            options.where = where;
        }
        order = [{model: this.blogClickCount.model}, "num", 'DESC'];
        if (order) {
            options.order = [order];
        }
        options.include = {
            model: this.blogClickCount.model,
            attributes: [],
            required: false,
            where: {

            },
            order: [['num', 'DESC']]
        };
        return await this.model.findAndCount(options);
    }
    async setEvaluate(blogId, type, ip, userId) {
        let createtime = (Date.parse(new Date()) / 1000);
        this.execureSql('SELECT blog_evaluate(' + blogId + ',' . type + ',' + createtime + ',\'' + ip + '\', ' + userId + ') result');
    }
}

module.exports = Blog;
