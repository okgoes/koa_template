const redis = require('redis');
const redisConfig = require('../configs/redis');

class Redis {
    constructor() {
        this.client = redis.createClient(redisConfig);
        this.client.on('connect', err => {
            if (err) {
                throw new Error('redis is connect error');
            }
        });
    }

    /**
     * 创建一个redis客户端
     * @param {Object} config
     * @return {Object}
     */
    createClient(config) {
        return redis.createClient(config);
    }

    /**
     * 数据库选择
     * @param {Number} num
     * @return {Object}
     */
    select(num) {
        return new Promise((resolve, reject) => {
            this.client.select(num, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }

    set(key, value, expire) {
        expire = expire || 0;
        return new Promise((resolve, reject) => {
            let result = [];
            this.client.set(key, value, (err, value) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                result['value'] = value;
            });
            if (expire) {
                this.client.expire(key, expire, (err) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                });
            }
        });
    }

    get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, value) => {
                if (err) {
                    return reject(err);
                }
                resolve(value);
            });
        });
    }

    /**
     * 删除键
     * @param {String} key
     * @return {Promise}
     */
    del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }

    /**
     * 序列化键
     * @param {String} key
     * @return {Promise}
     */
    dump(key) {
        return new Promsie((resolve, reject)=>{
            this.client.dump(key, (err, value) => {
                if (err) {
                    return reject(err);
                }
                resolve(value);
            });
        });
    }

    /**
     * 判断键是否存在
     * @param {String} key
     * @return {Promsie}
     */
    exists(key) {
        return new Promise((resolve, reject) => {
            this.client.exists(key, (err, exists) => {
                if (err) {
                    return reject(err);
                }
                resolve(exists);
            });
        });
    }

    /**
     * 更新生存时间
     * @param {String} key
     * @param {Number} seconds
     * @return {Promise}
     */
    expire(key, seconds) {
        return new Promise((resolve, reject)=>{
            this.client.expire(key, seconds, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }

    /**
     * 设置过期时间
     * @param {String} key
     * @param {Number} timestamp
     * @return {Promise}
     */
    expireat(key, timestamp) {
        return new Promise((resolve, reject) => {
            this.client.expireat(key, timestamp, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(true);
            });
        });
    }

    /**
     * 正则查找键
     * @param {String} pattern
     * @return {Promise}
     */
    keys(pattern) {
        return new Promise((resolve, reject) => {
            this.client.keys(pattern, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }
}

module.exports = Redis;