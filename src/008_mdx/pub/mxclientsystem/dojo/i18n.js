/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/i18n", "./_base/kernel require ./has ./_base/array ./_base/config ./_base/lang ./_base/xhr ./json module".split(" "), function(m, k, p, q, F, n, A, G, H) {
    p.add("dojo-preload-i18n-Api", 1);
    var t = m.i18n = {},
        I = /(^.*(^|\/)nls)(\/|$)([^\/]*)\/?([^\/]*)/,
        J = function(a, b, e, c) {
            var d = [e + c];
            b = b.split("-");
            for (var g = "", l = 0; l < b.length; l++)
                if (g += (g ? "-" : "") + b[l], !a || a[g]) d.push(e + g + "/" + c), d.specificity = g;
            return d
        },
        g = {},
        C = function(a, b, e) {
            e = e ? e.toLowerCase() : m.locale;
            a = a.replace(/\./g, "/");
            b = b.replace(/\./g, "/");
            return /root/i.test(e) ? a + "/nls/" + b : a + "/nls/" + e + "/" + b
        },
        K = m.getL10nName = function(a, b, e) {
            return a = H.id + "!" + C(a, b, e)
        },
        M = function(a, b, e, c, d, k) {
            a([b], function(l) {
                var f = n.clone(l.root || l.ROOT),
                    h = J(!l._v1x && l, d, e, c);
                a(h, function() {
                    for (var a = 1; a < h.length; a++) f = n.mixin(n.clone(f), arguments[a]);
                    g[b + "/" + d] = f;
                    f.$locale = h.specificity;
                    k()
                })
            })
        },
        N = function(a) {
            var b = F.extraLocale || [],
                b = n.isArray(b) ? b : [b];
            b.push(a);
            return b
        },
        x = function(a, b, e) {
            var c = I.exec(a),
                d = c[1] + "/",
                k = c[5] || c[4],
                l = d + k,
                f = (c = c[5] && c[4]) || m.locale ||
                "",
                h = l + "/" + f,
                c = c ? [f] : N(f),
                L = c.length,
                D = function() {
                    --L || e(n.delegate(g[h]))
                },
                f = a.split("*"),
                v = "preload" == f[1];
            if (p("dojo-preload-i18n-Api")) {
                if (v && (g[a] || (g[a] = 1, O(f[2], G.parse(f[3]), 1, b)), e(1)), (f = v) || (r && w.push([a, b, e]), f = r && !g[h]), f) return
            } else if (v) {
                e(1);
                return
            }
            q.forEach(c, function(a) {
                var c = l + "/" + a;
                p("dojo-preload-i18n-Api") && u(c);
                g[c] ? D() : M(b, l, d, k, a, D)
            })
        };
    p("dojo-preload-i18n-Api");
    var P = t.normalizeLocale = function(a) {
            a = a ? a.toLowerCase() : m.locale;
            return "root" == a ? "ROOT" : a
        },
        r = 0,
        w = [],
        O = t._preloadLocalizations =
        function(a, b, e, c) {
            function d(a, b) {
                c.isXdUrl(k.toUrl(a + ".js")) || e ? c([a], b) : E([a], b, c)
            }

            function B(a, b) {
                for (var c = a.split("-"); c.length;) {
                    if (b(c.join("-"))) return;
                    c.pop()
                }
                b("ROOT")
            }

            function l() {
                for (--r; !r && w.length;) x.apply(null, w.shift())
            }

            function f(e) {
                e = P(e);
                B(e, function(f) {
                    if (0 <= q.indexOf(b, f)) {
                        var h = a.replace(/\./g, "/") + "_" + f;
                        r++;
                        d(h, function(a) {
                            for (var b in a) {
                                var d = a[b],
                                    h = b.match(/(.+)\/([^\/]+)$/),
                                    m;
                                if (h && (m = h[2], h = h[1] + "/", d._localized)) {
                                    var p;
                                    if ("ROOT" === f) {
                                        var q = p = d._localized;
                                        delete d._localized;
                                        q.root = d;
                                        g[k.toAbsMid(b)] = q
                                    } else p = d._localized, g[k.toAbsMid(h + m + "/" + f)] = d;
                                    f !== e && function(a, b, d, f) {
                                        var h = [],
                                            m = [];
                                        B(e, function(c) {
                                            f[c] && (h.push(k.toAbsMid(a + c + "/" + b)), m.push(k.toAbsMid(a + b + "/" + c)))
                                        });
                                        h.length ? (r++, c(h, function() {
                                            for (var c = h.length - 1; 0 <= c; c--) d = n.mixin(n.clone(d), arguments[c]), g[m[c]] = d;
                                            g[k.toAbsMid(a + b + "/" + e)] = n.clone(d);
                                            l()
                                        })) : g[k.toAbsMid(a + b + "/" + e)] = d
                                    }(h, m, d, p)
                                }
                            }
                            l()
                        });
                        return !0
                    }
                    return !1
                })
            }
            c = c || k;
            f();
            q.forEach(m.config.extraLocale, f)
        },
        u = function() {},
        y = {},
        z, E = function(a, b, e) {
            var c = [];
            q.forEach(a, function(a) {
                function b(b) {
                    z || (z = new Function("__bundle", "__checkForLegacyModules", "__mid", "__amdValue", "var define \x3d function(mid, factory){define.called \x3d 1; __amdValue.result \x3d factory || mid;},\t   require \x3d function(){define.called \x3d 1;};try{define.called \x3d 0;eval(__bundle);if(define.called\x3d\x3d1)return __amdValue;if((__checkForLegacyModules \x3d __checkForLegacyModules(__mid)))return __checkForLegacyModules;}catch(e){}try{return eval('('+__bundle+')');}catch(e){return e;}"));
                    b = z(b, u, a, y);
                    b === y ? c.push(g[d] = y.result) : (b instanceof Error && (console.error("failed to evaluate i18n bundle; url\x3d" + d, b), b = {}), c.push(g[d] = /nls\/[^\/]+\/[^\/]+$/.test(d) ? b : {
                        root: b,
                        _v1x: 1
                    }))
                }
                var d = e.toUrl(a + ".js");
                if (g[d]) c.push(g[d]);
                else {
                    var f = e.syncLoadNls(a);
                    f || (f = u(a.replace(/nls\/([^\/]*)\/([^\/]*)$/, "nls/$2/$1")));
                    if (f) c.push(f);
                    else if (A) A.get({
                        url: d,
                        sync: !0,
                        load: b,
                        error: function() {
                            c.push(g[d] = {})
                        }
                    });
                    else try {
                        e.getText(d, !0, b)
                    } catch (h) {
                        c.push(g[d] = {})
                    }
                }
            });
            b && b.apply(null, c)
        },
        u = function(a) {
            for (var b,
                    e = a.split("/"), c = m.global[e[0]], d = 1; c && d < e.length - 1; c = c[e[d++]]);
            c && ((b = c[e[d]]) || (b = c[e[d].replace(/-/g, "_")]), b && (g[a] = b));
            return b
        };
    t.getLocalization = function(a, b, e) {
        var c;
        a = C(a, b, e);
        x(a, k.isXdUrl(k.toUrl(a + ".js")) ? k : function(a, b) {
            E(a, b, k)
        }, function(a) {
            c = a
        });
        return c
    };
    return n.mixin(t, {
        dynamic: !0,
        normalize: function(a, b) {
            return /^\./.test(a) ? b(a) : a
        },
        load: x,
        cache: g,
        getL10nName: K
    })
});