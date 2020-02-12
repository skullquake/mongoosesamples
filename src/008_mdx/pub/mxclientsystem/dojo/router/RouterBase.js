/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/router/RouterBase", ["dojo/_base/declare", "dojo/hash", "dojo/topic"], function(q, n, r) {
    function t(a, b, c) {
        var d, e, f, g;
        d = this.callbackQueue;
        f = e = !1;
        b = [{
            stopImmediatePropagation: function() {
                e = !0
            },
            preventDefault: function() {
                f = !0
            },
            oldPath: b,
            newPath: c,
            params: a
        }];
        if (a instanceof Array) b = b.concat(a);
        else
            for (g in a) b.push(a[g]);
        a = 0;
        for (g = d.length; a < g; ++a) e || d[a].apply(null, b);
        return !f
    }
    var p;
    p = String.prototype.trim ? function(a) {
        return a.trim()
    } : function(a) {
        return a.replace(/^\s\s*/, "").replace(/\s\s*$/,
            "")
    };
    return q(null, {
        _routes: null,
        _routeIndex: null,
        _started: !1,
        _currentPath: "",
        idMatch: /:(\w[\w\d]*)/g,
        idReplacement: "([^\\/]+)",
        globMatch: /\*(\w[\w\d]*)/,
        globReplacement: "(.+)",
        constructor: function(a) {
            this._routes = [];
            this._routeIndex = {};
            for (var b in a) a.hasOwnProperty(b) && (this[b] = a[b])
        },
        register: function(a, b) {
            return this._registerRoute(a, b)
        },
        registerBefore: function(a, b) {
            return this._registerRoute(a, b, !0)
        },
        go: function(a, b) {
            var c;
            if ("string" !== typeof a) return !1;
            a = p(a);
            (c = this._handlePathChange(a)) &&
            n(a, b);
            return c
        },
        startup: function(a) {
            if (!this._started) {
                var b = this,
                    c = n();
                this._started = !0;
                this._hashchangeHandle = r.subscribe("/dojo/hashchange", function() {
                    b._handlePathChange.apply(b, arguments)
                });
                c ? this._handlePathChange(c) : this.go(a, !0)
            }
        },
        destroy: function() {
            this._hashchangeHandle && this._hashchangeHandle.remove();
            this._routeIndex = this._routes = null
        },
        _handlePathChange: function(a) {
            var b, c, d, e, f, g, h, k, l = this._routes,
                m = this._currentPath;
            if (!this._started || a === m) return c;
            c = !0;
            b = 0;
            for (d = l.length; b < d; ++b)
                if (f =
                    l[b], g = f.route.exec(a)) {
                    if (f.parameterNames)
                        for (h = f.parameterNames, k = {}, c = 0, e = h.length; c < e; ++c) k[h[c]] = g[c + 1];
                    else k = g.slice(1);
                    c = f.fire(k, m, a)
                } c && (this._currentPath = a);
            return c
        },
        _convertRouteToRegExp: function(a) {
            a = a.replace(this.idMatch, this.idReplacement);
            a = a.replace(this.globMatch, this.globReplacement);
            return new RegExp("^" + a + "$")
        },
        _getParameterNames: function(a) {
            var b = this.idMatch,
                c = this.globMatch,
                d = [],
                e;
            for (b.lastIndex = 0; null !== (e = b.exec(a));) d.push(e[1]);
            null !== (e = c.exec(a)) && d.push(e[1]);
            return 0 <
                d.length ? d : null
        },
        _indexRoutes: function() {
            var a, b, c, d, e = this._routes;
            d = this._routeIndex = {};
            a = 0;
            for (b = e.length; a < b; ++a) c = e[a], d[c.route] = a
        },
        _registerRoute: function(a, b, c) {
            var d, e, f, g, h, k = this,
                l = this._routes,
                m = this._routeIndex;
            d = this._routeIndex[a];
            (e = "undefined" !== typeof d) && (f = l[d]);
            f || (f = {
                route: a,
                callbackQueue: [],
                fire: t
            });
            g = f.callbackQueue;
            "string" == typeof a && (f.parameterNames = this._getParameterNames(a), f.route = this._convertRouteToRegExp(a));
            c ? g.unshift(b) : g.push(b);
            e || (d = l.length, m[a] = d, l.push(f));
            h = !1;
            return {
                remove: function() {
                    var a, c;
                    if (!h) {
                        a = 0;
                        for (c = g.length; a < c; ++a) g[a] === b && g.splice(a, 1);
                        0 === g.length && (l.splice(d, 1), k._indexRoutes());
                        h = !0
                    }
                },
                register: function(b, c) {
                    return k.register(a, b, c)
                }
            }
        }
    })
});