const uuid = require('uuid');
const Redis = require('./models/redis');
class Session {
    constructor() {
        this.redis = new Redis();
    }

    async set(key, value, expire) {
        expire = expire || 7200;
        return await this.redis.set(key, value, expire);
    }

    async get(key) {
        if (!key) {
            return false;
        }
        return await this.redis.get(key);
    }

}

module.exports = Session;