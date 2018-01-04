const database = require('../configs/database');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
  $gt: Op.gt,
  $and: Op.and,
  $or: Op.or,
  $like: Op.like
}
const sequelize = new Sequelize(database.database, database.user, database.password, {
    host: database.host,
    dialect: database.type,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorsAliases
    // SQLite only
    //   storage: 'path/to/database.sqlite'
});

// Or you can simply use a connection uri
// const sequelize = new Sequelize(database.type + '://' + database.user + ':' + database.password + '@' + database.host + ':' + database.port + '/' + database.database);
class Table {
    constructor(tableName, fields, options) {
        if (!options) {
            options = null;
        }
        this.Sequelize = Sequelize;
        this.model = sequelize.define(tableName, fields, options);
    }

    async findAllAndCount(page, pagesize, where, order, group) {
        let options = {};
        if (page) {
            options.limit = (pagesize || 10);
            options.offset = (page - 1) * pagesize;
        }
        if (where) {
            options.where = where;
        }
        if (order) {
            options.order = [order];
        }
        if (group) {
            options.group = group;
        }
        return await this.model.findAndCount(options);
    }

    async execureSql(sql) {
        return await sequelize.query(sql);
    }
}

module.exports = Table;
