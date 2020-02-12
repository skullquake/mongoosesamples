//>>built
define("dijit/a11y", "dojo/_base/array dojo/dom dojo/dom-attr dojo/dom-style dojo/_base/lang dojo/sniff ./main".split(" "), function(x, g, f, k, u, v, w) {
    var e = {
        _isElementShown: function(a) {
            var c = k.get(a);
            return "hidden" != c.visibility && "collapsed" != c.visibility && "none" != c.display && "hidden" != f.get(a, "type")
        },
        hasDefaultTabStop: function(a) {
            switch (a.nodeName.toLowerCase()) {
                case "a":
                    return f.has(a, "href");
                case "area":
                case "button":
                case "input":
                case "object":
                case "select":
                case "textarea":
                    return !0;
                case "iframe":
                    var c;
                    try {
                        var d = a.contentDocument;
                        if ("designMode" in d && "on" == d.designMode) return !0;
                        c = d.body
                    } catch (h) {
                        try {
                            c = a.contentWindow.document.body
                        } catch (l) {
                            return !1
                        }
                    }
                    return c && ("true" == c.contentEditable || c.firstChild && "true" == c.firstChild.contentEditable);
                default:
                    return "true" == a.contentEditable
            }
        },
        effectiveTabIndex: function(a) {
            if (!f.get(a, "disabled")) return f.has(a, "tabIndex") ? +f.get(a, "tabIndex") : e.hasDefaultTabStop(a) ? 0 : void 0
        },
        isTabNavigable: function(a) {
            return 0 <= e.effectiveTabIndex(a)
        },
        isFocusable: function(a) {
            return -1 <=
                e.effectiveTabIndex(a)
        },
        _getTabNavigable: function(a) {
            function c(b) {
                return b && "input" == b.tagName.toLowerCase() && b.type && "radio" == b.type.toLowerCase() && b.name && b.name.toLowerCase()
            }

            function d(b) {
                return p[c(b)] || b
            }
            var h, l, m, g, n, q, p = {},
                r = e._isElementShown,
                k = e.effectiveTabIndex,
                t = function(b) {
                    for (b = b.firstChild; b; b = b.nextSibling)
                        if (!(1 != b.nodeType || 9 >= v("ie") && "HTML" !== b.scopeName) && r(b)) {
                            var a = k(b);
                            if (0 <= a) {
                                if (0 == a) h || (h = b), l = b;
                                else if (0 < a) {
                                    if (!m || a < g) g = a, m = b;
                                    if (!n || a >= q) q = a, n = b
                                }
                                a = c(b);
                                f.get(b, "checked") &&
                                    a && (p[a] = b)
                            }
                            "SELECT" != b.nodeName.toUpperCase() && t(b)
                        }
                };
            r(a) && t(a);
            return {
                first: d(h),
                last: d(l),
                lowest: d(m),
                highest: d(n)
            }
        },
        getFirstInTabbingOrder: function(a, c) {
            var d = e._getTabNavigable(g.byId(a, c));
            return d.lowest ? d.lowest : d.first
        },
        getLastInTabbingOrder: function(a, c) {
            var d = e._getTabNavigable(g.byId(a, c));
            return d.last ? d.last : d.highest
        }
    };
    u.mixin(w, e);
    return e
});