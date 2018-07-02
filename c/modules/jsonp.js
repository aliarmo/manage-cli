/**
 * jspnp
 * @version 1.0.1
 * @author switer
 * @github https://github.com/switer/jsonp
 */
'use strict';

var fns = require('modules/fns')
var TURL = require('modules/url')
var _ns = '_jsonp'
// callback name, 为什么叫 pn ？忘记了
var _pn = 'callback'
var _id = 0
var _t = 20*1000 // 超时时间
var _beforeHooks = [] // hook before send

function noop () {}
function uuid() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
}
function remove(el) {
    if (el && el.parentNode) {
        el.parentNode.removeChild(el)
    }
}

function jsonp (url/*[, data]*/, cb, options) {
var args = arguments
return PWrap(function (resolve, reject) {
    var data
    // 参数右移
    if (typeof cb == 'object') {
        data = cb
        cb = options
        options = args[3]
    }
    data = data || {}
    options = options || {}
    cb = cb || noop
    if (typeof cb !== 'function') {
        throw Error('illegal jsonp callback function:', cb)
    }

    var con = document.getElementsByTagName('head') ? document.getElementsByTagName('head')[0] : document.body
    var s = document.createElement('script')
    s.charset = 'UTF-8'
    var cid = [options.ns || _ns, _id ++, uuid()].join('_')
    var useTs = true // enable timestamp of not
    var tsName = '_t' // 
    var time = options.time

    if (options.callbackid) {
        cid = options.callbackid
    }
    if (time === false) {
        useTs = false
    } else if (time) {
        tsName = time
    }
    /**
     * JSONP owner params
     */
    data[options.pn || options.callbackName || _pn] = cid

    if (useTs) {
        data[tsName] = +new Date()
    }

    var onsuccess = function (data) {
        remove(s)
        cb(null, data)
        resolve && resolve(data)
    }
    var onerror = function (e) {
        remove(s)
        cb(e || 'error')
        window[cid] = onsuccess = onerror = noop
        reject && reject(e || error)
    }
    var prehook = window[cid]
    window[cid] = function (data) {
        window[cid] = noop
        try {
            prehook && prehook(data)
        } finally {
            onsuccess(data)
            onsuccess = onerror = noop
        }
    }
    s.onerror = s.onabort = function (e) {
        onerror(e ? e.type : 'error')
    }

    // hook can change url one by one
    fns.forEach(_beforeHooks, function (fn) {
        if (fns.type(fn) == 'function') {
            url = fn(url, data) || url
        }
    })
    s.src = TURL.queryJoin(url, data)
    con.appendChild(s)
    setTimeout(function () {
        onerror('timeout')
    }, options.timeout || _t)
})}
jsonp.timeout = function (t) {
    _t = t
}
jsonp.ns = function (n) {
    _ns = n
}
jsonp.pn = function (n) {
    _pn = n
}
jsonp.before = function (fn) {
    _beforeHooks.push(fn)
}
function PWrap(handler) {
    if (window.Promise) return new Promise(handler)
    else {
        handler(noop, noop)
    }
}
module.exports = jsonp