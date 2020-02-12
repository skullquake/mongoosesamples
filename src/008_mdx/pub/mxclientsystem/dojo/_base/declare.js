/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/_base/declare", ["./kernel", "../has", "./lang"], function(y, u, v) {
    function q(d, c) {
        throw Error("declare" + (c ? " " + c : "") + ": " + d);
    }

    function C(d, c) {
        for (var a = [], b = [{
                cls: 0,
                refs: []
            }], e = {}, g = 1, k = d.length, h = 0, f, l, m, n, p; h < k; ++h) {
            (f = d[h]) ? "[object Function]" != r.call(f) && q("mixin #" + h + " is not a callable constructor.", c): q("mixin #" + h + " is unknown. Did you use dojo.require to pull it in?", c);
            l = f._meta ? f._meta.bases : [f];
            m = 0;
            for (f = l.length - 1; 0 <= f; --f) n = l[f].prototype, n.hasOwnProperty("declaredClass") ||
                (n.declaredClass = "uniqName_" + D++), n = n.declaredClass, e.hasOwnProperty(n) || (e[n] = {
                    count: 0,
                    refs: [],
                    cls: l[f]
                }, ++g), n = e[n], m && m !== n && (n.refs.push(m), ++m.count), m = n;
            ++m.count;
            b[0].refs.push(m)
        }
        for (; b.length;) {
            m = b.pop();
            a.push(m.cls);
            for (--g; p = m.refs, 1 == p.length;) {
                m = p[0];
                if (!m || --m.count) {
                    m = 0;
                    break
                }
                a.push(m.cls);
                --g
            }
            if (m)
                for (h = 0, k = p.length; h < k; ++h) m = p[h], --m.count || b.push(m)
        }
        g && q("can't build consistent linearization", c);
        f = d[0];
        a[0] = f ? f._meta && f === a[a.length - f._meta.bases.length] ? f._meta.bases.length : 1 :
            0;
        return a
    }

    function A(d, c, a) {
        var b, e, g, k, h, f, l, m = this._inherited = this._inherited || {};
        "string" == typeof d && (b = d, d = c, c = a);
        a = 0;
        k = d.callee;
        (b = b || k.nom) || q("can't deduce a name to call inherited()", this.declaredClass);
        h = this.constructor._meta;
        g = h.bases;
        l = m.p;
        if ("constructor" != b) {
            if (m.c !== k && (l = 0, f = g[0], h = f._meta, h.hidden[b] !== k)) {
                (e = h.chains) && "string" == typeof e[b] && q("calling chained method with inherited: " + b, this.declaredClass);
                do
                    if (h = f._meta, e = f.prototype, h && (e[b] === k && e.hasOwnProperty(b) || h.hidden[b] ===
                            k)) break; while (f = g[++l]);
                l = f ? l : -1
            }
            if (f = g[++l])
                if (e = f.prototype, f._meta && e.hasOwnProperty(b)) a = e[b];
                else {
                    k = p[b];
                    do
                        if (e = f.prototype, (a = e[b]) && (f._meta ? e.hasOwnProperty(b) : a !== k)) break; while (f = g[++l])
                } a = f && a || p[b]
        } else {
            if (m.c !== k && (l = 0, (h = g[0]._meta) && h.ctor !== k)) {
                for ((e = h.chains) && "manual" === e.constructor || q("calling chained constructor with inherited", this.declaredClass);
                    (f = g[++l]) && (!(h = f._meta) || h.ctor !== k););
                l = f ? l : -1
            }
            for (;
                (f = g[++l]) && !(a = (h = f._meta) ? h.ctor : f););
            a = f && a
        }
        m.c = a;
        m.p = l;
        if (a) return !0 ===
            c ? a : a.apply(this, c || d)
    }

    function E(d, c) {
        return "string" == typeof d ? this.__inherited(d, c, !0) : this.__inherited(d, !0)
    }

    function F(d, c, a) {
        var b = this.getInherited(d, c);
        if (b) return b.apply(this, a || c || d)
    }

    function G(d) {
        for (var c = this.constructor._meta.bases, a = 0, b = c.length; a < b; ++a)
            if (c[a] === d) return !0;
        return this instanceof d
    }

    function H(d, c) {
        for (var a in c) "constructor" != a && c.hasOwnProperty(a) && (d[a] = c[a]);
        if (u("bug-for-in-skips-shadowed"))
            for (var b = v._extraNames, e = b.length; e;) a = b[--e], "constructor" != a && c.hasOwnProperty(a) &&
                (d[a] = c[a])
    }

    function I(d) {
        t.safeMixin(this.prototype, d);
        return this
    }

    function J(d, c) {
        d instanceof Array || "function" == typeof d || (c = d, d = void 0);
        c = c || {};
        d = d || [];
        return t([this].concat(d), c)
    }

    function K(d, c) {
        return function() {
            var a = arguments,
                b = a,
                e = a[0],
                g, k;
            k = d.length;
            var h;
            if (!(this instanceof a.callee)) return z(a);
            if (c && (e && e.preamble || this.preamble))
                for (h = Array(d.length), h[0] = a, g = 0;;) {
                    (e = a[0]) && (e = e.preamble) && (a = e.apply(this, a) || a);
                    e = d[g].prototype;
                    (e = e.hasOwnProperty("preamble") && e.preamble) && (a = e.apply(this,
                        a) || a);
                    if (++g == k) break;
                    h[g] = a
                }
            for (g = k - 1; 0 <= g; --g) e = d[g], (e = (k = e._meta) ? k.ctor : e) && e.apply(this, h ? h[g] : a);
            (e = this.postscript) && e.apply(this, b)
        }
    }

    function L(d, c) {
        return function() {
            var a = arguments,
                b = a,
                e = a[0];
            if (!(this instanceof a.callee)) return z(a);
            c && (e && (e = e.preamble) && (b = e.apply(this, b) || b), (e = this.preamble) && e.apply(this, b));
            d && d.apply(this, a);
            (e = this.postscript) && e.apply(this, a)
        }
    }

    function M(d) {
        return function() {
            var c = arguments,
                a = 0,
                b, e;
            if (!(this instanceof c.callee)) return z(c);
            for (; b = d[a]; ++a)
                if (b =
                    (e = b._meta) ? e.ctor : b) {
                    b.apply(this, c);
                    break
                }(b = this.postscript) && b.apply(this, c)
        }
    }

    function N(d, c, a) {
        return function() {
            var b, e, g = 0,
                k = 1;
            a && (g = c.length - 1, k = -1);
            for (; b = c[g]; g += k) e = b._meta, (b = (e ? e.hidden : b.prototype)[d]) && b.apply(this, arguments)
        }
    }

    function B(d) {
        w.prototype = d.prototype;
        d = new w;
        w.prototype = null;
        return d
    }

    function z(d) {
        var c = d.callee,
            a = B(c);
        c.apply(a, d);
        return a
    }

    function t(d, c, a) {
        "string" != typeof d && (a = c, c = d, d = "");
        a = a || {};
        var b, e, g, k, h, f, l, m = 1,
            n = c;
        "[object Array]" == r.call(c) ? (f = C(c, d), g = f[0],
            m = f.length - g, c = f[m]) : (f = [0], c ? "[object Function]" == r.call(c) ? (g = c._meta, f = f.concat(g ? g.bases : c)) : q("base class is not a callable constructor.", d) : null !== c && q("unknown base class. Did you use dojo.require to pull it in?", d));
        if (c)
            for (e = m - 1;; --e) {
                b = B(c);
                if (!e) break;
                g = f[e];
                (g._meta ? H : x)(b, g.prototype);
                k = u("csp-restrictions") ? function() {} : new Function;
                k.superclass = c;
                k.prototype = b;
                c = b.constructor = k
            } else b = {};
        t.safeMixin(b, a);
        g = a.constructor;
        g !== p.constructor && (g.nom = "constructor", b.constructor = g);
        for (e =
            m - 1; e; --e)(g = f[e]._meta) && g.chains && (l = x(l || {}, g.chains));
        b["-chains-"] && (l = x(l || {}, b["-chains-"]));
        c && c.prototype && c.prototype["-chains-"] && (l = x(l || {}, c.prototype["-chains-"]));
        g = !l || !l.hasOwnProperty("constructor");
        f[0] = k = l && "manual" === l.constructor ? M(f) : 1 == f.length ? L(a.constructor, g) : K(f, g);
        k._meta = {
            bases: f,
            hidden: a,
            chains: l,
            parents: n,
            ctor: a.constructor
        };
        k.superclass = c && c.prototype;
        k.extend = I;
        k.createSubclass = J;
        k.prototype = b;
        b.constructor = k;
        b.getInherited = E;
        b.isInstanceOf = G;
        b.inherited = O;
        b.__inherited =
            A;
        d && (b.declaredClass = d, v.setObject(d, k));
        if (l)
            for (h in l) b[h] && "string" == typeof l[h] && "constructor" != h && (g = b[h] = N(h, f, "after" === l[h]), g.nom = h);
        return k
    }
    var x = v.mixin,
        p = Object.prototype,
        r = p.toString,
        w, D = 0;
    w = u("csp-restrictions") ? function() {} : new Function;
    var O = y.config.isDebug ? F : A;
    y.safeMixin = t.safeMixin = function(d, c) {
        var a, b;
        for (a in c) b = c[a], b === p[a] && a in p || "constructor" == a || ("[object Function]" == r.call(b) && (b.nom = a), d[a] = b);
        if (u("bug-for-in-skips-shadowed") && c)
            for (var e = v._extraNames, g = e.length; g;) a =
                e[--g], b = c[a], b === p[a] && a in p || "constructor" == a || ("[object Function]" == r.call(b) && (b.nom = a), d[a] = b);
        return d
    };
    return y.declare = t
});