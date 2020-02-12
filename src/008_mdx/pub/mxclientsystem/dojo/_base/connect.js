/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/_base/connect", "./kernel ../on ../topic ../aspect ./event ../mouse ./sniff ./lang ../keys".split(" "), function(m, e, n, v, z, r, h, l) {
    function w(a, c, b, k, t) {
        k = l.hitch(b, k);
        if (!a || !a.addEventListener && !a.attachEvent) return v.after(a || m.global, c, k, !0);
        "string" == typeof c && "on" == c.substring(0, 2) && (c = c.substring(2));
        a || (a = m.global);
        if (!t) switch (c) {
            case "keypress":
                c = p;
                break;
            case "mouseenter":
                c = r.enter;
                break;
            case "mouseleave":
                c = r.leave
        }
        return e(a, c, k, t)
    }

    function u(a) {
        a.keyChar = a.charCode ? String.fromCharCode(a.charCode) :
            "";
        a.charOrCode = a.keyChar || a.keyCode
    }
    h.add("events-keypress-typed", function() {
        var a = {
            charCode: 0
        };
        try {
            a = document.createEvent("KeyboardEvent"), (a.initKeyboardEvent || a.initKeyEvent).call(a, "keypress", !0, !0, null, !1, !1, !1, !1, 9, 3)
        } catch (c) {}
        return 0 == a.charCode && !h("opera")
    });
    var x = {
            106: 42,
            111: 47,
            186: 59,
            187: 43,
            188: 44,
            189: 45,
            190: 46,
            191: 47,
            192: 96,
            219: 91,
            220: 92,
            221: 93,
            222: 39,
            229: 113
        },
        y = h("mac") ? "metaKey" : "ctrlKey",
        q = function(a, c) {
            var b = l.mixin({}, a, c);
            u(b);
            b.preventDefault = function() {
                a.preventDefault()
            };
            b.stopPropagation =
                function() {
                    a.stopPropagation()
                };
            return b
        },
        p;
    p = h("events-keypress-typed") ? function(a, c) {
        var b = e(a, "keydown", function(a) {
                var d = a.keyCode,
                    b = 13 != d && 32 != d && (27 != d || !h("ie")) && (48 > d || 90 < d) && (96 > d || 111 < d) && (186 > d || 192 < d) && (219 > d || 222 < d) && 229 != d;
                if (b || a.ctrlKey) {
                    b = b ? 0 : d;
                    if (a.ctrlKey) {
                        if (3 == d || 13 == d) return c.call(a.currentTarget, a);
                        b = 95 < b && 106 > b ? b - 48 : !a.shiftKey && 65 <= b && 90 >= b ? b + 32 : x[b] || b
                    }
                    d = q(a, {
                        type: "keypress",
                        faux: !0,
                        charCode: b
                    });
                    c.call(a.currentTarget, d);
                    if (h("ie")) try {
                        a.keyCode = d.keyCode
                    } catch (g) {}
                }
            }),
            k = e(a, "keypress", function(a) {
                var b = a.charCode;
                a = q(a, {
                    charCode: 32 <= b ? b : 0,
                    faux: !0
                });
                return c.call(this, a)
            });
        return {
            remove: function() {
                b.remove();
                k.remove()
            }
        }
    } : h("opera") ? function(a, c) {
        return e(a, "keypress", function(a) {
            var b = a.which;
            3 == b && (b = 99);
            b = 32 > b && !a.shiftKey ? 0 : b;
            a.ctrlKey && !a.shiftKey && 65 <= b && 90 >= b && (b += 32);
            return c.call(this, q(a, {
                charCode: b
            }))
        })
    } : function(a, c) {
        return e(a, "keypress", function(a) {
            u(a);
            return c.call(this, a)
        })
    };
    var f = {
        _keypress: p,
        connect: function(a, c, b, k, h) {
            var d = arguments,
                f = [],
                g =
                0;
            f.push("string" == typeof d[0] ? null : d[g++], d[g++]);
            var e = d[g + 1];
            f.push("string" == typeof e || "function" == typeof e ? d[g++] : null, d[g++]);
            for (e = d.length; g < e; g++) f.push(d[g]);
            return w.apply(this, f)
        },
        disconnect: function(a) {
            a && a.remove()
        },
        subscribe: function(a, c, b) {
            return n.subscribe(a, l.hitch(c, b))
        },
        publish: function(a, c) {
            return n.publish.apply(n, [a].concat(c))
        },
        connectPublisher: function(a, c, b) {
            var e = function() {
                f.publish(a, arguments)
            };
            return b ? f.connect(c, b, e) : f.connect(c, e)
        },
        isCopyKey: function(a) {
            return a[y]
        }
    };
    f.unsubscribe = f.disconnect;
    l.mixin(m, f);
    return f
});