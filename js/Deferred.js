+(function (name, func) {
    if (typeof define === 'function') {
        define(name, define);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = func();
    } else {
        window[name] = func();
    }
})('Deferred', function () {
    var Deferred = function () {
        this.promise = new Promise();
    };
    Deferred.prototype.resolve = function (arr) {
        var promise = this.promise;
        var _ref;
        while ((_ref = promise.queue.shift())) {
            if (_ref && _ref.fulfilled) {
                var ret = _ref.fulfilled(arr);
                if (ret && ret.isPromise) {
                    ret.queue = promise.queue;
                    this.promise = ret;
                    return;
                }
            }
        }
    };
    Deferred.prototype.reject = function (err) {
        var promise = this.promise;
        var _ref;
        while ((_ref = promise.queue.shift())) {
            if (_ref && _ref.error) {
                var ret = _ref.error(err);
                if (ret && ret.isPromise) {
                    ret.queue = promise.queue;
                    this.promise = ret;
                    return;
                }
            }
        }
    };
    Deferred.prototype.callback = function () {
        var _this = this;
        return function (err) {
            if (err) return _this.reject(err);
            _this.resolve(Array.prototype.slice.call(arguments, 1));
        }
    };
    return Deferred;
});
