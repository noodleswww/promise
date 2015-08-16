+(function (name, func) {
    if (typeof define === 'function') {
        define(name, define);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = func();
    } else {
        window[name] = func();
    }
})('Promise', function () {
    var Promise = function () {
        this.queue = [];
        this.isPromise = true;
    };
    Promise.prototype.then = function (fulfilledHandler, errHandler) {
        var handler = {};
        if (typeof fulfilledHandler === 'function') {
            handler.fulfilled = fulfilledHandler;
        }
        if (typeof errHandler === 'function') {
            handler.error = errHandler;
        }
        this.queue.push(handler);
        return this;
    };
    return Promise;
});