/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/dom-geometry", ["./sniff", "./_base/window", "./dom", "./dom-style"], function(l, h, n, k) {
    function p(a, d, b, c, f, g) {
        g = g || "px";
        a = a.style;
        isNaN(d) || (a.left = d + g);
        isNaN(b) || (a.top = b + g);
        0 <= c && (a.width = c + g);
        0 <= f && (a.height = f + g)
    }

    function q(a) {
        return "button" == a.tagName.toLowerCase() || "input" == a.tagName.toLowerCase() && "button" == (a.getAttribute("type") || "").toLowerCase()
    }

    function r(a) {
        return "border-box" == e.boxModel || "table" == a.tagName.toLowerCase() || q(a)
    }
    var e = {
        boxModel: "content-box"
    };
    l("ie") && (e.boxModel =
        "BackCompat" == document.compatMode ? "border-box" : "content-box");
    e.getPadExtents = function(a, d) {
        a = n.byId(a);
        var b = d || k.getComputedStyle(a),
            c = k.toPixelValue,
            f = c(a, b.paddingLeft),
            g = c(a, b.paddingTop),
            e = c(a, b.paddingRight),
            b = c(a, b.paddingBottom);
        return {
            l: f,
            t: g,
            r: e,
            b: b,
            w: f + e,
            h: g + b
        }
    };
    e.getBorderExtents = function(a, d) {
        a = n.byId(a);
        var b = k.toPixelValue,
            c = d || k.getComputedStyle(a),
            f = "none" != c.borderLeftStyle ? b(a, c.borderLeftWidth) : 0,
            e = "none" != c.borderTopStyle ? b(a, c.borderTopWidth) : 0,
            m = "none" != c.borderRightStyle ?
            b(a, c.borderRightWidth) : 0,
            b = "none" != c.borderBottomStyle ? b(a, c.borderBottomWidth) : 0;
        return {
            l: f,
            t: e,
            r: m,
            b: b,
            w: f + m,
            h: e + b
        }
    };
    e.getPadBorderExtents = function(a, d) {
        a = n.byId(a);
        var b = d || k.getComputedStyle(a),
            c = e.getPadExtents(a, b),
            b = e.getBorderExtents(a, b);
        return {
            l: c.l + b.l,
            t: c.t + b.t,
            r: c.r + b.r,
            b: c.b + b.b,
            w: c.w + b.w,
            h: c.h + b.h
        }
    };
    e.getMarginExtents = function(a, d) {
        a = n.byId(a);
        var b = d || k.getComputedStyle(a),
            c = k.toPixelValue,
            e = c(a, b.marginLeft),
            g = c(a, b.marginTop),
            m = c(a, b.marginRight),
            b = c(a, b.marginBottom);
        return {
            l: e,
            t: g,
            r: m,
            b: b,
            w: e + m,
            h: g + b
        }
    };
    e.getMarginBox = function(a, d) {
        a = n.byId(a);
        var b = d || k.getComputedStyle(a),
            b = e.getMarginExtents(a, b),
            c = a.offsetLeft - b.l,
            f = a.offsetTop - b.t,
            g = a.parentNode,
            m = k.toPixelValue;
        8 == l("ie") && !l("quirks") && g && (g = k.getComputedStyle(g), c -= "none" != g.borderLeftStyle ? m(a, g.borderLeftWidth) : 0, f -= "none" != g.borderTopStyle ? m(a, g.borderTopWidth) : 0);
        return {
            l: c,
            t: f,
            w: a.offsetWidth + b.w,
            h: a.offsetHeight + b.h
        }
    };
    e.getContentBox = function(a, d) {
        a = n.byId(a);
        var b = d || k.getComputedStyle(a),
            c = a.clientWidth,
            f, g = e.getPadExtents(a, b);
        f = e.getBorderExtents(a, b);
        var b = a.offsetLeft + g.l + f.l,
            m = a.offsetTop + g.t + f.t;
        c ? f = a.clientHeight : (c = a.offsetWidth - f.w, f = a.offsetHeight - f.h);
        if (8 == l("ie") && !l("quirks")) {
            var h = a.parentNode,
                p = k.toPixelValue;
            h && (h = k.getComputedStyle(h), b -= "none" != h.borderLeftStyle ? p(a, h.borderLeftWidth) : 0, m -= "none" != h.borderTopStyle ? p(a, h.borderTopWidth) : 0)
        }
        return {
            l: b,
            t: m,
            w: c - g.w,
            h: f - g.h
        }
    };
    e.setContentSize = function(a, d, b) {
        a = n.byId(a);
        var c = d.w;
        d = d.h;
        r(a) && (b = e.getPadBorderExtents(a, b), 0 <= c && (c +=
            b.w), 0 <= d && (d += b.h));
        p(a, NaN, NaN, c, d)
    };
    var t = {
        l: 0,
        t: 0,
        w: 0,
        h: 0
    };
    e.setMarginBox = function(a, d, b) {
        a = n.byId(a);
        var c = b || k.getComputedStyle(a);
        b = d.w;
        var f = d.h,
            g = r(a) ? t : e.getPadBorderExtents(a, c),
            c = e.getMarginExtents(a, c);
        if (l("webkit") && q(a)) {
            var h = a.style;
            0 <= b && !h.width && (h.width = "4px");
            0 <= f && !h.height && (h.height = "4px")
        }
        0 <= b && (b = Math.max(b - g.w - c.w, 0));
        0 <= f && (f = Math.max(f - g.h - c.h, 0));
        p(a, d.l, d.t, b, f)
    };
    e.isBodyLtr = function(a) {
        a = a || h.doc;
        return "ltr" == (h.body(a).dir || a.documentElement.dir || "ltr").toLowerCase()
    };
    e.docScroll = function(a) {
        a = a || h.doc;
        var d = h.doc.parentWindow || h.doc.defaultView;
        return "pageXOffset" in d ? {
            x: d.pageXOffset,
            y: d.pageYOffset
        } : (d = l("quirks") ? h.body(a) : a.documentElement) && {
            x: e.fixIeBiDiScrollLeft(d.scrollLeft || 0, a),
            y: d.scrollTop || 0
        }
    };
    e.getIeDocumentElementOffset = function(a) {
        return {
            x: 0,
            y: 0
        }
    };
    e.fixIeBiDiScrollLeft = function(a, d) {
        d = d || h.doc;
        var b = l("ie");
        if (b && !e.isBodyLtr(d)) {
            var c = l("quirks"),
                f = c ? h.body(d) : d.documentElement,
                g = h.global;
            6 == b && !c && g.frameElement && f.scrollHeight > f.clientHeight &&
                (a += f.clientLeft);
            return 8 > b || c ? a + f.clientWidth - f.scrollWidth : -a
        }
        return a
    };
    e.position = function(a, d) {
        a = n.byId(a);
        var b = h.body(a.ownerDocument),
            c = a.getBoundingClientRect(),
            c = {
                x: c.left,
                y: c.top,
                w: c.right - c.left,
                h: c.bottom - c.top
            };
        9 > l("ie") && (c.x -= l("quirks") ? b.clientLeft + b.offsetLeft : 0, c.y -= l("quirks") ? b.clientTop + b.offsetTop : 0);
        d && (b = e.docScroll(a.ownerDocument), c.x += b.x, c.y += b.y);
        return c
    };
    e.getMarginSize = function(a, d) {
        a = n.byId(a);
        var b = e.getMarginExtents(a, d || k.getComputedStyle(a)),
            c = a.getBoundingClientRect();
        return {
            w: c.right - c.left + b.w,
            h: c.bottom - c.top + b.h
        }
    };
    e.normalizeEvent = function(a) {
        "layerX" in a || (a.layerX = a.offsetX, a.layerY = a.offsetY);
        if (!("pageX" in a)) {
            var d = a.target,
                d = d && d.ownerDocument || document,
                b = l("quirks") ? d.body : d.documentElement;
            a.pageX = a.clientX + e.fixIeBiDiScrollLeft(b.scrollLeft || 0, d);
            a.pageY = a.clientY + (b.scrollTop || 0)
        }
    };
    return e
});