/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/data/ObjectStore", "../_base/lang ../Evented ../_base/declare ../_base/Deferred ../_base/array ../_base/connect ../regexp".split(" "), function(h, r, t, l, q, u, v) {
    function w(a) {
        return "*" == a ? ".*" : "?" == a ? "." : a
    }
    return t("dojo.data.ObjectStore", [r], {
        objectStore: null,
        constructor: function(a) {
            this._dirtyObjects = [];
            a.labelAttribute && (a.labelProperty = a.labelAttribute);
            h.mixin(this, a)
        },
        labelProperty: "label",
        getValue: function(a, c, b) {
            return "function" === typeof a.get ? a.get(c) : c in a ? a[c] : b
        },
        getValues: function(a,
            c) {
            var b = this.getValue(a, c);
            return b instanceof Array ? b : void 0 === b ? [] : [b]
        },
        getAttributes: function(a) {
            var c = [],
                b;
            for (b in a) !a.hasOwnProperty(b) || "_" == b.charAt(0) && "_" == b.charAt(1) || c.push(b);
            return c
        },
        hasAttribute: function(a, c) {
            return c in a
        },
        containsValue: function(a, c, b) {
            return -1 < q.indexOf(this.getValues(a, c), b)
        },
        isItem: function(a) {
            return "object" == typeof a && a && !(a instanceof Date)
        },
        isItemLoaded: function(a) {
            return a && "function" !== typeof a.load
        },
        loadItem: function(a) {
            var c;
            "function" === typeof a.item.load ?
                l.when(a.item.load(), function(b) {
                    c = b;
                    var d = b instanceof Error ? a.onError : a.onItem;
                    d && d.call(a.scope, b)
                }) : a.onItem && a.onItem.call(a.scope, a.item);
            return c
        },
        close: function(a) {
            return a && a.abort && a.abort()
        },
        fetch: function(a) {
            function c(b) {
                a.onError && a.onError.call(d, b, a)
            }
            a = h.delegate(a, a && a.queryOptions);
            var b = this,
                d = a.scope || b,
                e = a.query;
            if ("object" == typeof e) {
                var e = h.delegate(e),
                    f;
                for (f in e) {
                    var k = e[f];
                    "string" == typeof k && (e[f] = RegExp("^" + v.escapeString(k, "*?\\").replace(/\\.|\*|\?/g, w) + "$", a.ignoreCase ?
                        "mi" : "m"), e[f].toString = function(a) {
                        return function() {
                            return a
                        }
                    }(k))
                }
            }
            var g = this.objectStore.query(e, a);
            l.when(g.total, function(b) {
                l.when(g, function(c) {
                    a.onBegin && a.onBegin.call(d, b || c.length, a);
                    if (a.onItem)
                        for (var e = 0; e < c.length; e++) a.onItem.call(d, c[e], a);
                    a.onComplete && a.onComplete.call(d, a.onItem ? null : c, a);
                    return c
                }, c)
            }, c);
            a.abort = function() {
                g.cancel && g.cancel()
            };
            g.observe && (this.observing && this.observing.cancel(), this.observing = g.observe(function(a, c, d) {
                if (-1 == q.indexOf(b._dirtyObjects, a))
                    if (-1 ==
                        c) b.onNew(a);
                    else if (-1 == d) b.onDelete(a);
                else
                    for (var e in a)
                        if (e != b.objectStore.idProperty) b.onSet(a, e, null, a[e])
            }, !0));
            this.onFetch(g);
            a.store = this;
            return a
        },
        getFeatures: function() {
            return {
                "dojo.data.api.Read": !!this.objectStore.get,
                "dojo.data.api.Identity": !0,
                "dojo.data.api.Write": !!this.objectStore.put,
                "dojo.data.api.Notification": !0
            }
        },
        getLabel: function(a) {
            if (this.isItem(a)) return this.getValue(a, this.labelProperty)
        },
        getLabelAttributes: function(a) {
            return [this.labelProperty]
        },
        getIdentity: function(a) {
            return this.objectStore.getIdentity ?
                this.objectStore.getIdentity(a) : a[this.objectStore.idProperty || "id"]
        },
        getIdentityAttributes: function(a) {
            return [this.objectStore.idProperty]
        },
        fetchItemByIdentity: function(a) {
            var c;
            l.when(this.objectStore.get(a.identity), function(b) {
                c = b;
                a.onItem.call(a.scope, b)
            }, function(b) {
                a.onError.call(a.scope, b)
            });
            return c
        },
        newItem: function(a, c) {
            if (c) {
                var b = this.getValue(c.parent, c.attribute, []),
                    b = b.concat([a]);
                a.__parent = b;
                this.setValue(c.parent, c.attribute, b)
            }
            this._dirtyObjects.push({
                object: a,
                save: !0
            });
            this.onNew(a);
            return a
        },
        deleteItem: function(a) {
            this.changing(a, !0);
            this.onDelete(a)
        },
        setValue: function(a, c, b) {
            var d = a[c];
            this.changing(a);
            a[c] = b;
            this.onSet(a, c, d, b)
        },
        setValues: function(a, c, b) {
            if (!h.isArray(b)) throw Error("setValues expects to be passed an Array object as its value");
            this.setValue(a, c, b)
        },
        unsetAttribute: function(a, c) {
            this.changing(a);
            var b = a[c];
            delete a[c];
            this.onSet(a, c, b, void 0)
        },
        changing: function(a, c) {
            a.__isDirty = !0;
            for (var b = 0; b < this._dirtyObjects.length; b++) {
                var d = this._dirtyObjects[b];
                if (a ==
                    d.object) {
                    c && (d.object = !1, this._saveNotNeeded || (d.save = !0));
                    return
                }
            }
            d = a instanceof Array ? [] : {};
            for (b in a) a.hasOwnProperty(b) && (d[b] = a[b]);
            this._dirtyObjects.push({
                object: !c && a,
                old: d,
                save: !this._saveNotNeeded
            })
        },
        save: function(a) {
            a = a || {};
            var c, b = [],
                d = [],
                e = this,
                f = this._dirtyObjects,
                k = f.length;
            try {
                u.connect(a, "onError", function() {
                    if (!1 !== a.revertOnError) {
                        var b = f;
                        f = d;
                        e.revert();
                        e._dirtyObjects = b
                    } else e._dirtyObjects = f.concat(d)
                });
                if (this.objectStore.transaction) var g = this.objectStore.transaction();
                for (var h =
                        0; h < f.length; h++) {
                    var m = f[h],
                        n = m.object,
                        p = m.old;
                    delete n.__isDirty;
                    n ? c = this.objectStore.put(n, {
                        overwrite: !!p
                    }) : "undefined" != typeof p && (c = this.objectStore.remove(this.getIdentity(p)));
                    d.push(m);
                    f.splice(h--, 1);
                    l.when(c, function(c) {
                        --k || a.onComplete && a.onComplete.call(a.scope, b)
                    }, function(b) {
                        k = -1;
                        a.onError.call(a.scope, b)
                    })
                }
                g && g.commit()
            } catch (x) {
                a.onError.call(a.scope, value)
            }
        },
        revert: function() {
            for (var a = this._dirtyObjects, c = a.length; 0 < c;) {
                c--;
                var b = a[c],
                    d = b.object,
                    b = b.old;
                if (d && b) {
                    for (var e in b) b.hasOwnProperty(e) &&
                        d[e] !== b[e] && (this.onSet(d, e, d[e], b[e]), d[e] = b[e]);
                    for (e in d) b.hasOwnProperty(e) || (this.onSet(d, e, d[e]), delete d[e])
                } else if (b) this.onNew(b);
                else this.onDelete(d);
                delete(d || b).__isDirty;
                a.splice(c, 1)
            }
        },
        isDirty: function(a) {
            return a ? a.__isDirty : !!this._dirtyObjects.length
        },
        onSet: function() {},
        onNew: function() {},
        onDelete: function() {},
        onFetch: function(a) {}
    })
});