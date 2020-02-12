/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/NodeList-data", ["./_base/kernel", "./query", "./_base/lang", "./_base/array", "./dom-attr"], function(c, h, k, m, l) {
    var e = h.NodeList,
        d = {},
        n = 0,
        g = function(b) {
            var a = l.get(b, "data-dojo-dataid");
            a || (a = "pid" + n++, l.set(b, "data-dojo-dataid", a));
            return a
        },
        p = c._nodeData = function(b, a, e) {
            var f = g(b),
                c;
            d[f] || (d[f] = {});
            if (1 == arguments.length) return d[f];
            "string" == typeof a ? 2 < arguments.length ? d[f][a] = e : c = d[f][a] : c = k.mixin(d[f], a);
            return c
        },
        q = c._removeNodeData = function(b, a) {
            var c = g(b);
            d[c] && (a ? delete d[c][a] :
                delete d[c])
        };
    e._gcNodeData = c._gcNodeData = function() {
        var b = h("[data-dojo-dataid]").map(g),
            a;
        for (a in d) 0 > m.indexOf(b, a) && delete d[a]
    };
    k.extend(e, {
        data: e._adaptWithCondition(p, function(b) {
            return 0 === b.length || 1 == b.length && "string" == typeof b[0]
        }),
        removeData: e._adaptAsForEach(q)
    });
    return e
});