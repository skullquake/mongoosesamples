/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/store/DataStore", "../_base/lang ../_base/declare ../Deferred ../_base/array ./util/QueryResults ./util/SimpleQueryEngine".split(" "), function(k, p, l, q, r, t) {
    return p("dojo.store.DataStore", null, {
        target: "",
        constructor: function(a) {
            k.mixin(this, a);
            if (!("idProperty" in a)) {
                var c;
                try {
                    c = this.store.getIdentityAttributes()
                } catch (b) {}
                this.idProperty = (k.isArray(c) ? c[0] : c) || this.idProperty
            }
            a = this.store.getFeatures();
            a["dojo.data.api.Read"] || (this.get = null);
            a["dojo.data.api.Identity"] || (this.getIdentity =
                null);
            a["dojo.data.api.Write"] || (this.put = this.add = null)
        },
        idProperty: "id",
        store: null,
        queryEngine: t,
        _objectConverter: function(a) {
            function c(a) {
                for (var g = {}, f = b.getAttributes(a), n = 0; n < f.length; n++) {
                    var e = f[n],
                        m = b.getValues(a, e);
                    if (1 < m.length) {
                        for (e = 0; e < m.length; e++) {
                            var h = m[e];
                            "object" == typeof h && b.isItem(h) && (m[e] = c(h))
                        }
                        h = m
                    } else h = b.getValue(a, e), "object" == typeof h && b.isItem(h) && (h = c(h));
                    g[f[n]] = h
                }
                d in g || !b.getIdentity || (g[d] = b.getIdentity(a));
                return g
            }
            var b = this.store,
                d = this.idProperty;
            return function(b) {
                return a(b &&
                    c(b))
            }
        },
        get: function(a, c) {
            var b, d, f = new l;
            this.store.fetchItemByIdentity({
                identity: a,
                onItem: this._objectConverter(function(a) {
                    f.resolve(b = a)
                }),
                onError: function(a) {
                    f.reject(d = a)
                }
            });
            if (void 0 !== b) return null == b ? void 0 : b;
            if (d) throw d;
            return f.promise
        },
        put: function(a, c) {
            c = c || {};
            var b = "undefined" != typeof c.id ? c.id : this.getIdentity(a),
                d = this.store,
                f = this.idProperty,
                g = new l;
            if ("undefined" == typeof b) {
                var k = d.newItem(a);
                d.save({
                    onComplete: function() {
                        g.resolve(k)
                    },
                    onError: function(a) {
                        g.reject(a)
                    }
                })
            } else d.fetchItemByIdentity({
                identity: b,
                onItem: function(b) {
                    if (b) {
                        if (!1 === c.overwrite) return g.reject(Error("Overwriting existing object not allowed"));
                        for (var e in a) e != f && a.hasOwnProperty(e) && d.getValue(b, e) != a[e] && d.setValue(b, e, a[e])
                    } else {
                        if (!0 === c.overwrite) return g.reject(Error("Creating new object not allowed"));
                        b = d.newItem(a)
                    }
                    d.save({
                        onComplete: function() {
                            g.resolve(b)
                        },
                        onError: function(a) {
                            g.reject(a)
                        }
                    })
                },
                onError: function(a) {
                    g.reject(a)
                }
            });
            return g.promise
        },
        add: function(a, c) {
            (c = c || {}).overwrite = !1;
            return this.put(a, c)
        },
        remove: function(a) {
            var c =
                this.store,
                b = new l;
            this.store.fetchItemByIdentity({
                identity: a,
                onItem: function(a) {
                    try {
                        null == a ? b.resolve(!1) : (c.deleteItem(a), c.save(), b.resolve(!0))
                    } catch (f) {
                        b.reject(f)
                    }
                },
                onError: function(a) {
                    b.reject(a)
                }
            });
            return b.promise
        },
        query: function(a, c) {
            var b, d = new l(function() {
                b.abort && b.abort()
            });
            d.total = new l;
            var f = this._objectConverter(function(a) {
                return a
            });
            b = this.store.fetch(k.mixin({
                    query: a,
                    onBegin: function(a) {
                        d.total.resolve(a)
                    },
                    onComplete: function(a) {
                        d.resolve(q.map(a, f))
                    },
                    onError: function(a) {
                        d.reject(a)
                    }
                },
                c));
            return r(d)
        },
        getIdentity: function(a) {
            return a[this.idProperty]
        }
    })
});