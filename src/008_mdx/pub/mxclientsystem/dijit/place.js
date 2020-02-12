//>>built
define("dijit/place", "dojo/_base/array dojo/dom-geometry dojo/dom-style dojo/_base/kernel dojo/_base/window ./Viewport ./main".split(" "), function(x, r, u, z, w, A, B) {
    function y(f, a, m, p) {
        var d = A.getEffectiveBox(f.ownerDocument);
        f.parentNode && "body" == String(f.parentNode.tagName).toLowerCase() || w.body(f.ownerDocument).appendChild(f);
        var c = null;
        x.some(a, function(b) {
            var a = b.corner,
                g = b.pos,
                e = 0,
                l = {
                    w: {
                        L: d.l + d.w - g.x,
                        R: g.x - d.l,
                        M: d.w
                    } [a.charAt(1)],
                    h: {
                        T: d.t + d.h - g.y,
                        B: g.y - d.t,
                        M: d.h
                    } [a.charAt(0)]
                },
                h = f.style;
            h.left =
                h.right = "auto";
            m && (e = m(f, b.aroundCorner, a, l, p), e = "undefined" == typeof e ? 0 : e);
            var k = f.style,
                n = k.display,
                q = k.visibility;
            "none" == k.display && (k.visibility = "hidden", k.display = "");
            h = r.position(f);
            k.display = n;
            k.visibility = q;
            n = {
                L: g.x,
                R: g.x - h.w,
                M: Math.max(d.l, Math.min(d.l + d.w, g.x + (h.w >> 1)) - h.w)
            } [a.charAt(1)];
            q = {
                T: g.y,
                B: g.y - h.h,
                M: Math.max(d.t, Math.min(d.t + d.h, g.y + (h.h >> 1)) - h.h)
            } [a.charAt(0)];
            g = Math.max(d.l, n);
            k = Math.max(d.t, q);
            n = Math.min(d.l + d.w, n + h.w) - g;
            q = Math.min(d.t + d.h, q + h.h) - k;
            e += h.w - n + (h.h - q);
            if (null ==
                c || e < c.overflow) c = {
                corner: a,
                aroundCorner: b.aroundCorner,
                x: g,
                y: k,
                w: n,
                h: q,
                overflow: e,
                spaceAvailable: l
            };
            return !e
        });
        c.overflow && m && m(f, c.aroundCorner, c.corner, c.spaceAvailable, p);
        a = c.y;
        var b = c.x,
            e = w.body(f.ownerDocument);
        /relative|absolute/.test(u.get(e, "position")) && (a -= u.get(e, "marginTop"), b -= u.get(e, "marginLeft"));
        e = f.style;
        e.top = a + "px";
        e.left = b + "px";
        e.right = "auto";
        return c
    }
    var C = {
        TL: "BR",
        TR: "BL",
        BL: "TR",
        BR: "TL"
    };
    return B.place = {
        at: function(f, a, m, p, d) {
            m = x.map(m, function(c) {
                var b = {
                    corner: c,
                    aroundCorner: C[c],
                    pos: {
                        x: a.x,
                        y: a.y
                    }
                };
                p && (b.pos.x += "L" == c.charAt(1) ? p.x : -p.x, b.pos.y += "T" == c.charAt(0) ? p.y : -p.y);
                return b
            });
            return y(f, m, d)
        },
        around: function(f, a, m, p, d) {
            function c(b, a) {
                q.push({
                    aroundCorner: b,
                    corner: a,
                    pos: {
                        x: {
                            L: v,
                            R: v + k,
                            M: v + (k >> 1)
                        } [b.charAt(1)],
                        y: {
                            T: h,
                            B: h + n,
                            M: h + (n >> 1)
                        } [b.charAt(0)]
                    }
                })
            }
            var b;
            if ("string" == typeof a || "offsetWidth" in a || "ownerSVGElement" in a) {
                if (b = r.position(a, !0), /^(above|below)/.test(m[0])) {
                    var e = r.getBorderExtents(a),
                        l = a.firstChild ? r.getBorderExtents(a.firstChild) : {
                            t: 0,
                            l: 0,
                            b: 0,
                            r: 0
                        },
                        t = r.getBorderExtents(f),
                        g = f.firstChild ? r.getBorderExtents(f.firstChild) : {
                            t: 0,
                            l: 0,
                            b: 0,
                            r: 0
                        };
                    b.y += Math.min(e.t + l.t, t.t + g.t);
                    b.h -= Math.min(e.t + l.t, t.t + g.t) + Math.min(e.b + l.b, t.b + g.b)
                }
            } else b = a;
            if (a.parentNode)
                for (e = "absolute" == u.getComputedStyle(a).position, a = a.parentNode; a && 1 == a.nodeType && "BODY" != a.nodeName;) {
                    l = r.position(a, !0);
                    t = u.getComputedStyle(a);
                    /relative|absolute/.test(t.position) && (e = !1);
                    if (!e && /hidden|auto|scroll/.test(t.overflow)) {
                        var g = Math.min(b.y + b.h, l.y + l.h),
                            w = Math.min(b.x + b.w, l.x + l.w);
                        b.x = Math.max(b.x, l.x);
                        b.y =
                            Math.max(b.y, l.y);
                        b.h = g - b.y;
                        b.w = w - b.x
                    }
                    "absolute" == t.position && (e = !0);
                    a = a.parentNode
                }
            var v = b.x,
                h = b.y,
                k = "w" in b ? b.w : b.w = b.width,
                n = "h" in b ? b.h : (z.deprecated("place.around: dijit/place.__Rectangle: { x:" + v + ", y:" + h + ", height:" + b.height + ", width:" + k + " } has been deprecated.  Please use { x:" + v + ", y:" + h + ", h:" + b.height + ", w:" + k + " }", "", "2.0"), b.h = b.height),
                q = [];
            x.forEach(m, function(b) {
                var a = p;
                switch (b) {
                    case "above-centered":
                        c("TM", "BM");
                        break;
                    case "below-centered":
                        c("BM", "TM");
                        break;
                    case "after-centered":
                        a = !a;
                    case "before-centered":
                        c(a ? "ML" : "MR", a ? "MR" : "ML");
                        break;
                    case "after":
                        a = !a;
                    case "before":
                        c(a ? "TL" : "TR", a ? "TR" : "TL");
                        c(a ? "BL" : "BR", a ? "BR" : "BL");
                        break;
                    case "below-alt":
                        a = !a;
                    case "below":
                        c(a ? "BL" : "BR", a ? "TL" : "TR");
                        c(a ? "BR" : "BL", a ? "TR" : "TL");
                        break;
                    case "above-alt":
                        a = !a;
                    case "above":
                        c(a ? "TL" : "TR", a ? "BL" : "BR");
                        c(a ? "TR" : "TL", a ? "BR" : "BL");
                        break;
                    default:
                        c(b.aroundCorner, b.corner)
                }
            });
            f = y(f, q, d, {
                w: k,
                h: n
            });
            f.aroundNodePos = b;
            return f
        }
    }
});