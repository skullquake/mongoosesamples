/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/window", "./_base/lang ./sniff ./_base/window ./dom ./dom-geometry ./dom-style ./dom-construct".split(" "), function(A, f, t, I, p, D, l) {
    f.add("rtl-adjust-position-for-verticalScrollBar", function(b, f) {
        var d = t.body(f),
            e = l.create("div", {
                style: {
                    overflow: "scroll",
                    overflowX: "visible",
                    direction: "rtl",
                    visibility: "hidden",
                    position: "absolute",
                    left: "0",
                    top: "0",
                    width: "64px",
                    height: "64px"
                }
            }, d, "last"),
            g = l.create("div", {
                style: {
                    overflow: "hidden",
                    direction: "ltr"
                }
            }, e, "last"),
            k = 0 != p.position(g).x;
        e.removeChild(g);
        d.removeChild(e);
        return k
    });
    f.add("position-fixed-support", function(b, f) {
        var d = t.body(f),
            e = l.create("span", {
                style: {
                    visibility: "hidden",
                    position: "fixed",
                    left: "1px",
                    top: "1px"
                }
            }, d, "last"),
            g = l.create("span", {
                style: {
                    position: "fixed",
                    left: "0",
                    top: "0"
                }
            }, e, "last"),
            k = p.position(g).x != p.position(e).x;
        e.removeChild(g);
        d.removeChild(e);
        return k
    });
    var m = {
        getBox: function(b) {
            b = b || t.doc;
            var g = "BackCompat" == b.compatMode ? t.body(b) : b.documentElement,
                d = p.docScroll(b);
            if (f("touch")) {
                var e = m.get(b);
                b = e.innerWidth || g.clientWidth;
                g = e.innerHeight || g.clientHeight
            } else b = g.clientWidth, g = g.clientHeight;
            return {
                l: d.x,
                t: d.y,
                w: b,
                h: g
            }
        },
        get: function(b) {
            if (f("ie") && m !== document.parentWindow) {
                b.parentWindow.execScript("document._parentWindow \x3d window;", "Javascript");
                var g = b._parentWindow;
                b._parentWindow = null;
                return g
            }
            return b.parentWindow || b.defaultView
        },
        scrollIntoView: function(b, g) {
            try {
                b = I.byId(b);
                var d = b.ownerDocument || t.doc,
                    e = t.body(d),
                    q = d.documentElement || e.parentNode,
                    k = f("ie") || f("trident"),
                    u = f("webkit");
                if (b != e && b != q)
                    if (!(f("mozilla") ||
                            k || u || f("opera") || f("trident") || f("edge")) && "scrollIntoView" in b) b.scrollIntoView(!1);
                    else {
                        var l = "BackCompat" == d.compatMode,
                            m = Math.min(e.clientWidth || q.clientWidth, q.clientWidth || e.clientWidth),
                            B = Math.min(e.clientHeight || q.clientHeight, q.clientHeight || e.clientHeight),
                            d = u || l ? e : q,
                            n = g || p.position(b),
                            c = b.parentNode,
                            u = function(a) {
                                return 6 >= k || 7 == k && l ? !1 : f("position-fixed-support") && "fixed" == D.get(a, "position").toLowerCase()
                            },
                            A = this,
                            E = function(a, b, c) {
                                "BODY" == a.tagName || "HTML" == a.tagName ? A.get(a.ownerDocument).scrollBy(b,
                                    c) : (b && (a.scrollLeft += b), c && (a.scrollTop += c))
                            };
                        if (!u(b))
                            for (; c;) {
                                c == e && (c = d);
                                var a = p.position(c),
                                    F = u(c),
                                    C = "rtl" == D.getComputedStyle(c).direction.toLowerCase();
                                if (c == d) a.w = m, a.h = B, d == q && (k || f("trident")) && C && (a.x += d.offsetWidth - a.w), a.x = 0, a.y = 0;
                                else {
                                    var v = p.getPadBorderExtents(c);
                                    a.w -= v.w;
                                    a.h -= v.h;
                                    a.x += v.l;
                                    a.y += v.t;
                                    var r = c.clientWidth,
                                        w = a.w - r;
                                    0 < r && 0 < w && (C && f("rtl-adjust-position-for-verticalScrollBar") && (a.x += w), a.w = r);
                                    r = c.clientHeight;
                                    w = a.h - r;
                                    0 < r && 0 < w && (a.h = r)
                                }
                                F && (0 > a.y && (a.h += a.y, a.y = 0), 0 > a.x && (a.w +=
                                    a.x, a.x = 0), a.y + a.h > B && (a.h = B - a.y), a.x + a.w > m && (a.w = m - a.x));
                                var x = n.x - a.x,
                                    y = n.y - a.y,
                                    G = x + n.w - a.w,
                                    H = y + n.h - a.h,
                                    h, z;
                                0 < G * x && (c.scrollLeft || c == d || c.scrollWidth > c.offsetHeight) && (h = Math[0 > x ? "max" : "min"](x, G), C && (8 == k && !l || 5 <= f("trident")) && (h = -h), z = c.scrollLeft, E(c, h, 0), h = c.scrollLeft - z, n.x -= h);
                                0 < H * y && (c.scrollTop || c == d || c.scrollHeight > c.offsetHeight) && (h = Math.ceil(Math[0 > y ? "max" : "min"](y, H)), z = c.scrollTop, E(c, 0, h), h = c.scrollTop - z, n.y -= h);
                                c = c != d && !F && c.parentNode
                            }
                    }
            } catch (J) {
                console.error("scrollIntoView: " +
                    J), b.scrollIntoView(!1)
            }
        }
    };
    A.setObject("dojo.window", m);
    return m
});