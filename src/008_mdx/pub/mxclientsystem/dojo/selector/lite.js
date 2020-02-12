/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/selector/lite", ["../has", "../_base/kernel"], function(m, q) {
    var l = document.createElement("div"),
        n = l.matches || l.webkitMatchesSelector || l.mozMatchesSelector || l.msMatchesSelector || l.oMatchesSelector,
        r = l.querySelectorAll,
        t = /([^\s,](?:"(?:\\.|[^"])+"|'(?:\\.|[^'])+'|[^,])*)/g;
    m.add("dom-matches-selector", !!n);
    m.add("dom-qsa", !!r);
    var p = function(g, a) {
            if (u && -1 < g.indexOf(",")) return u(g, a);
            var d = a ? a.ownerDocument || a : q.doc || document,
                c = (r ? /^([\w]*)#([\w\-]+$)|^(\.)([\w\-\*]+$)|^(\w+$)/ : /^([\w]*)#([\w\-]+)(?:\s+(.*))?$|(?:^|(>|.+\s+))([\w\-\*]+)(\S*$)/).exec(g);
            a = a || d;
            if (c) {
                var e = 8 === m("ie") && m("quirks") ? a.nodeType === d.nodeType : null !== a.parentNode && 9 !== a.nodeType && a.parentNode === d;
                if (c[2] && e) {
                    var h = q.byId ? q.byId(c[2], d) : d.getElementById(c[2]);
                    if (!h || c[1] && c[1] != h.tagName.toLowerCase()) return [];
                    if (a != d)
                        for (d = h; d != a;)
                            if (d = d.parentNode, !d) return [];
                    return c[3] ? p(c[3], h) : [h]
                }
                if (c[3] && a.getElementsByClassName) return a.getElementsByClassName(c[4]);
                if (c[5])
                    if (h = a.getElementsByTagName(c[5]), c[4] || c[6]) g = (c[4] || "") + c[6];
                    else return h
            }
            if (r) return 1 === a.nodeType && "object" !==
                a.nodeName.toLowerCase() ? v(a, g, a.querySelectorAll) : a.querySelectorAll(g);
            h || (h = a.getElementsByTagName("*"));
            c = [];
            d = 0;
            for (e = h.length; d < e; d++) {
                var k = h[d];
                1 == k.nodeType && w(k, g, a) && c.push(k)
            }
            return c
        },
        v = function(g, a, d) {
            var c = g,
                e = g.getAttribute("id"),
                h = e || "__dojo__",
                k = g.parentNode,
                l = /^\s*[+~]/.test(a);
            if (l && !k) return [];
            e ? h = h.replace(/'/g, "\\$\x26") : g.setAttribute("id", h);
            l && k && (g = g.parentNode);
            a = a.match(t);
            for (k = 0; k < a.length; k++) a[k] = "[id\x3d'" + h + "'] " + a[k];
            a = a.join(",");
            try {
                return d.call(g, a)
            } finally {
                e ||
                    c.removeAttribute("id")
            }
        };
    if (!m("dom-matches-selector")) var w = function() {
        function g(a, b, c) {
            var f = b.charAt(0);
            if ('"' == f || "'" == f) b = b.slice(1, -1);
            b = b.replace(/\\/g, "");
            var d = k[c || ""];
            return function(f) {
                return (f = f.getAttribute(a)) && d(f, b)
            }
        }

        function a(f) {
            return function(b, a) {
                for (;
                    (b = b.parentNode) != a;)
                    if (f(b, a)) return !0
            }
        }

        function d(a) {
            return function(b, f) {
                b = b.parentNode;
                return a ? b != f && a(b, f) : b == f
            }
        }

        function c(a, b) {
            return a ? function(f, c) {
                return b(f) && a(f, c)
            } : b
        }
        var e = "div" == l.tagName ? "toLowerCase" : "toUpperCase",
            h = {
                "": function(a) {
                    a = a[e]();
                    return function(b) {
                        return b.tagName == a
                    }
                },
                ".": function(a) {
                    var b = " " + a + " ";
                    return function(f) {
                        return -1 < f.className.indexOf(a) && -1 < (" " + f.className + " ").indexOf(b)
                    }
                },
                "#": function(a) {
                    return function(b) {
                        return b.id == a
                    }
                }
            },
            k = {
                "^\x3d": function(a, b) {
                    return 0 == a.indexOf(b)
                },
                "*\x3d": function(a, b) {
                    return -1 < a.indexOf(b)
                },
                "$\x3d": function(a, b) {
                    return a.substring(a.length - b.length, a.length) == b
                },
                "~\x3d": function(a, b) {
                    return -1 < (" " + a + " ").indexOf(" " + b + " ")
                },
                "|\x3d": function(a, b) {
                    return 0 ==
                        (a + "-").indexOf(b + "-")
                },
                "\x3d": function(a, b) {
                    return a == b
                },
                "": function(a, b) {
                    return !0
                }
            },
            m = {};
        return function(f, b, k) {
            var e = m[b];
            if (!e) {
                if (b.replace(/(?:\s*([> ])\s*)|(#|\.)?((?:\\.|[\w-])+)|\[\s*([\w-]+)\s*(.?=)?\s*("(?:\\.|[^"])+"|'(?:\\.|[^'])+'|(?:\\.|[^\]])*)\s*\]/g, function(b, f, k, l, m, n, p) {
                        l ? e = c(e, h[k || ""](l.replace(/\\/g, ""))) : f ? e = (" " == f ? a : d)(e) : m && (e = c(e, g(m, p, n)));
                        return ""
                    })) throw Error("Syntax error in query");
                if (!e) return !0;
                m[b] = e
            }
            return e(f, k)
        }
    }();
    if (!m("dom-qsa")) var u = function(g, a) {
        for (var d =
                g.match(t), c = [], e = 0; e < d.length; e++) {
            g = new String(d[e].replace(/\s*$/, ""));
            g.indexOf = escape;
            for (var h = p(g, a), k = 0, l = h.length; k < l; k++) {
                var f = h[k];
                c[f.sourceIndex] = f
            }
        }
        d = [];
        for (e in c) d.push(c[e]);
        return d
    };
    p.match = n ? function(g, a, d) {
        return d && 9 != d.nodeType ? v(d, a, function(a) {
            return n.call(g, a)
        }) : n.call(g, a)
    } : w;
    return p
});