const Table = require("../table");
const Sequelize = require('sequelize');

class BlogEvaluate extends Table{
    constructor() {
        super('b_blog_evaluate', {
            id: {
                type: Sequelize.INTEGER(10),
                primaryKey: true,
                autoIncrement: true
            },
            cid: {
                type: Sequelize.INTEGER(10),
                references: {
                    model: 'b_blog_content',
                    key: 'id'
                },
                comment: '博文id'
            },
            praise: {
                type: Sequelize.INTEGER(10)
            },
            debase: {
                type: Sequelize.INTEGER(10)
            }
        }, {
            // 自定义表名
            'freezeTableName': true,
            'tableName': 'b_blog_evaluate',
    
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
    }
}

module.exports = BlogEvaluate;