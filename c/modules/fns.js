'use strict'

var undef = void(0)
function hasOwn (obj, prop) {
    return obj && obj.hasOwnProperty && obj.hasOwnProperty(prop)
}
function _nextTick() {
    var ctx = this
    return function () {
        setTimeout.apply(ctx, arguments)
    }
}
var fns = {
    escape: function (markup) {
        if (!markup) return '';
        return String(markup)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;');
    },
    type: function(obj) {
        if (obj === null) return 'null'
        else if (obj === undef) return 'undefined'
        var m = /\[object (\w+)\]/.exec(Object.prototype.toString.call(obj))
        return m ? m[1].toLowerCase() : ''
    },
    keys: function (obj) {
        var keys = []
        if (!obj) return keys
        if (Object.keys) return Object.keys(obj)
        this.objEach(obj, function (key) {
            keys.push(key)
        })
        return keys
    },
    bind: function (fn, ctx) {
        if (fn.bind) return fn.bind(ctx)
        return function () {
            return fn.apply(ctx, arguments)
        }
    },
    extend: function(obj) {
        if (this.type(obj) != 'object' && this.type(obj) != 'function') return obj;
        var source, prop;
        for (var i = 1, length = arguments.length; i < length; i++) {
            source = arguments[i];
            for (prop in source) {
                if (hasOwn(source, prop)) {
                    obj[prop] = source[prop];
                }
            }
        }
        return obj;
    },
    trim: function (str) {
        if (str.trim) return str.trim()
        else {
            return str.replace(/^\s+|\s+$/gm, '')
        }
    },
    indexOf: function (arr, tar) {
        if (arr.indexOf) return arr.indexOf(tar)
        else {
            var i = -1
            fns.some(arr, function (item, index) {
                if (item === tar) {
                    i = index
                    return true
                }
            })
            return i
        }
    },
    forEach: function (arr, fn) {
        if (arr.forEach) return arr.forEach(fn)
        else {
            var len = arr.length
            for (var i = 0 ; i < len; i++) {
                fn(arr[i], i)
            }
        }
        return arr
    },
    some: function (arr, fn) {
        if (arr.some) return arr.some(fn)
        else {
            var len = arr.length
            var r = false
            for (var i = 0 ; i < len; i++) {
                if (fn(arr[i], i)) {
                    r = true
                    break
                }
            }
            return r
        }
    },
    map: function (arr, fn) {
        if (arr.map) return arr.map(fn)
        else {
            var len = arr.length
            var next = []
            for (var i = 0 ; i < len; i++) {
                next.push(fn(arr[i], i))
            }
            return next
        }
    },
    objEach: function (obj, fn) {
        if (!obj) return
        for(var key in obj) {
            if (hasOwn(obj, key)) {
                if(fn(key, obj[key]) === false) break
            }
        }
    },
    reduce: function (arr, cb/*initValue*/) {
        if (fns.type(cb) != 'function') throw new TypeError('Array.prototype.reduce callback must be a function')

        var length = arr.length
        if (length === 0 && arguments.length === 2) {
            throw new TypeError('reduce of empty array with no initial value');
        }
        var result;
        var i = 0
        if (arguments.length >= 3) {
            result = arguments[2]
        } else {
            do {
                if (i in arr) {
                    result = arr[i++];
                    break;
                }
                // if array contains no values, no initial value to return
                if (++i >= length) {
                    throw new TypeError('reduceRight of empty array with no initial value');
                }
            } while (true);
        }
        for (; i < length; i++) {
            result = cb(result, arr[i], i, arr);
        }
        return result;
    },
    filter: function(arr, fn, context) {
        if (arr.filter) return arr.filter(fn)
        else {
            var len = arr.length
            var res = []
            for(var i = 0; i < len; i++) {
                var val = arr[i]
                if(fn.call(context, val, i, arr)) {
                    res.push(val)
                }
            }
            return res
        }
    },
    nextTick: _nextTick(),
    /**
     * Lock function before lock release
     */
    lock: function lock(fn) {
        var pending
        return function () {
            if (pending) return
            pending = true
            var args = [].slice.call(arguments, 0)
            args.unshift(function () {
                pending = false
            })
            fn.apply(this, args)
        }
    },
    /**
     * Queue when pending, execute one by one
     * @param {Function} fn executed function
     * @param {Number} capacity Allow run how much parall task at once
     * @async
     */
    queue: function queue(fn, capacity) {
        capacity = capacity || 1
        var callbacks = []
        var remains = capacity
        function next() {
            var item = callbacks.shift()
            if (!item) {
                remains = capacity
                return
            }
            remains--
            var fn = item[0]
            var ctx = item[1]
            var args = item[2]
            args.unshift(function () {
                // once task is done, remains increasing
                remains ++
                // then check or call next task
                next.apply(this, arguments)
            })
            setTimeout(function () {
                fn.apply(ctx, args)
            })
        }
        return function () {
            callbacks.push([fn, this, [].slice.call(arguments, 0)])
            if (!remains) return
            return next()
        }
    },
    /**
     * Queue and wait for the same result
     * @param {Function} delegate method
     * @return {Function} the method receive a callback function
     */
    delegator: function (fn) {
        var pending
        var queue = []
        return function (cb) {
            if (pending) return queue.push(cb)
            pending = true
            fn.call(this, function () {
                pending = false
                var ctx = this
                var args = arguments
                cb && cb.apply(ctx, args)
                var tmpQueue = queue;
                queue = []
                fns.forEach(tmpQueue, function (f) {
                    f && f.apply(ctx, args)
                })
            })
        }
    },
    /**
     * Call only once
     */
    once: function (cb/*[, ctx]*/) {
        var args = arguments
        var called
        return function () {
            if (called || !cb) return
            called = true
            return cb.apply(args.length >=2 ? args[1] : null, arguments)
        }
    },
    /**
     * Version compare
     * @param  {String} v1 6.5.5.200
     * @param  {String} v2 6.5.6    缺位默认补0
     * if (v2 > v1) return 1
     * else (v2 == v1) retun 0
     * else return -1
     */
    verCompare: function (v1, v2) {
        if (v1 === v2) return 0

        v1 = v1.split('.')
        v2 = v2.split('.')

        var len = v1.length >= v2.length ? v1.length : v2.length
        var i = 0
        var r = 0

        while(len--) {
            var c1 = Number(v1[i] || 0)
            var c2 = Number(v2[i++] || 0)

            if (c2 > c1) {
                return 1
            } else if (c2 < c1) {
                return -1
            }
        }
        return r
    },
    /**
     * Collect timer in batch
     * @param  {number} count split time by count
     * @param  {number} time timeout number
     */
    batchTimeout: function (count, time) {
      var that = this
      var inter = time/count
      if (!inter || inter < 1) {
        count = 1
        inter = time
      }
      inter = Math.round(inter)
      var collecting = false
      var queue = []
      var startTime
      var endTimes = []
      function handler(fn) {
        queue.push(fn)
        if (collecting) {
            endTimes.push(+new Date())
            return
        } else {
            startTime = +new Date()
            endTimes.push(startTime)
        }
        collecting = true
        setTimeout(function () {
          var offset = Math.round(that.reduce(endTimes, function (result,endTime) {
              return result + (endTime - startTime)
          }, 0)/endTimes.length)
          collecting = false
          endTimes = []
          var flushFns = queue.slice(0)
          queue = []
          setTimeout(function () {
            flushFns.forEach(function (f) {
              try {
                f && f()
              } catch(e) {
                console.error(e)
              }
            })
          }, Math.min(time - inter - offset, 0))
        }, inter)
      }
      return handler
    }
}

module.exports = fns
