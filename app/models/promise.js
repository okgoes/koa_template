const PENDING = 0;  // 进行中  
const FULFILLED = 1; // 成功  
const REJECTED = 2;  // 失败
class Promise{
    constructor(fn) {
        this.status = PENDING;
        this.value = null;
        this.defferd = [];
        fn.bind(this, this.resolve.bind(this), this.reject.bind(this));
    }

    resolve(value) {
        this.status = FULFILLED;
        this.value = this.value;
        this.done();
    }

    reject(err) {
        this.status = REJECTED;
        this.value = err;
    }

    // then(onfulfilled) {
    //     return this;
    // }

    done() {
        var status = this.status;
        if (status == PENDING) {
            return;
        }
        var defferd = this.defferd;
        for (var i = 0; i < defferd.length; i++) {
            this.handle(defferd[i]);
        }
    }
    handle (fn) {
        if (!fn) {
            return;
        }
        var value = this.value;
        var t = this.status;
        var p;
        if (t == PENDING) {
            this.defferd.push(fn);
        } else {
            if (t == FULFILLED && typeof fn.onfulfiled == 'function') {
                p = fn.onfulfiled(value);
            }
            if (t == REJECTED && typeof fn.onrejected == 'function') {
                p = fn.onrejected(value);
            }
            var promise = fn.promise;
            if (promise) {
                if (p && p.constructor == Promise) {
                    p.defferd = promise.defferd;
                } else {
                    p = this;
                    p.defferd = promise.defferd;
                    this.done();
                }
            }
        }
    }

    catch(onrejected){
        return this;
    }

    then(onfulfilled, onrejected) {
        var o = {
            onfulfiled: "success",
            onrejected: "fail"
        };
        var status = this.status;
        o.promise = new this.constructor(function () {

        });
        if (status == PENDING) {
            this.defferd.push(o);
        } else if (status == FULFILLED || status == REJECTED) {
            this.handle(o);
        }
        console.log(o.promise);
        return o.promise;
    }
}

module.exports = Promise;