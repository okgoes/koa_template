class Test {
    constructor() {

    }

    myTest (v) {
        return new Promise((resolve, reject) => {
            if (v) {
                return resolve(v);
            }
            reject(new Error('undefined'));
        });
    }
}

module.exports = Test;
