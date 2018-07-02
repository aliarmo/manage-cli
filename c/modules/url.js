'use strict'

var util = require('./fns')

var url = {
    /**
     *  解析 query 字符串
     **/
    queryParse: function(search, spliter) {
        if (!search) return {};

        spliter = spliter || '&';

        var query = search.replace(/^\?/, ''),
            queries = {},
            splits = query ? query.split(spliter) : null;

        if (splits && splits.length > 0) {
            util.forEach(splits, function(item) {
                item = item.split('=');
                var key = item.splice(0, 1),
                    value = item.join('=');
                queries[key] = decodeURIComponent(value);
            });
        }
        return queries;
    },
    /**
     * URL添加query
     */
    queryJoin: function (api/*queries*/) {
        var args = [].slice.call(arguments)
        args[0] = {}
        var qs = url.queryStringify(util.extend.apply(util, args))
        if (!qs) return api
        
        var sep
        if (/[\?&]$/.test(api)) {
            sep = ''
        } else if (~api.indexOf('?')) {
            sep = '&'
        } else {
            sep = '?'
        }
        return api + sep + qs
    },
    /**
     * query 对象转换字符串
     */
    queryStringify: function (params, spliter) {
        if (!params) return ''
        return util.map(util.keys(params), function (k) {
            return k + '=' + encodeURIComponent(params[k])
        }).join(spliter || '&')
    }
}

module.exports = url