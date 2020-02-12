/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/request/xhr", ["../errors/RequestError", "./watch", "./handlers", "./util", "../has"], function(n, y, p, e, b) {
    function z(a, c) {
        var f = a.xhr;
        a.status = a.xhr.status;
        try {
            a.text = f.responseText
        } catch (d) {}
        "xml" === a.options.handleAs && (a.data = f.responseXML);
        if (!c) try {
            p(a)
        } catch (d) {
            c = d
        }
        var b;
        if (c) this.reject(c);
        else {
            try {
                p(a)
            } catch (d) {
                b = d
            }
            e.checkStatus(f.status) ? b ? this.reject(b) : this.resolve(a) : (c = b ? new n("Unable to load " + a.url + " status: " + f.status + " and an error in handleAs: transformation of response",
                a) : new n("Unable to load " + a.url + " status: " + f.status, a), this.reject(c))
        }
    }

    function A(a) {
        return this.xhr.getResponseHeader(a)
    }

    function k(a, c, f) {
        var v = b("native-formdata") && c && c.data && c.data instanceof FormData,
            d = e.parseArgs(a, e.deepCreate(B, c), v);
        a = d.url;
        c = d.options;
        var q, h = e.deferred(d, r, t, w, z, function() {
                q && q()
            }),
            g = d.xhr = k._create();
        if (!g) return h.cancel(new n("XHR was not created")), f ? h : h.promise;
        d.getHeader = A;
        u && (q = u(g, h, d));
        var p = "undefined" === typeof c.data ? null : c.data,
            C = !c.sync,
            D = c.method;
        try {
            g.open(D,
                a, C, c.user || void 0, c.password || void 0);
            c.withCredentials && (g.withCredentials = c.withCredentials);
            b("native-response-type") && c.handleAs in x && (g.responseType = x[c.handleAs]);
            var l = c.headers;
            a = v ? !1 : "application/x-www-form-urlencoded";
            if (l)
                for (var m in l) "content-type" === m.toLowerCase() ? a = l[m] : l[m] && g.setRequestHeader(m, l[m]);
            a && !1 !== a && g.setRequestHeader("Content-Type", a);
            l && "X-Requested-With" in l || g.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            e.notify && e.notify.emit("send", d, h.promise.cancel);
            g.send(p)
        } catch (E) {
            h.reject(E)
        }
        y(h);
        g = null;
        return f ? h : h.promise
    }
    b.add("native-xhr", function() {
        return "undefined" !== typeof XMLHttpRequest
    });
    b.add("dojo-force-activex-xhr", function() {
        return b("activex") && "file:" === window.location.protocol
    });
    b.add("native-xhr2", function() {
        if (b("native-xhr") && !b("dojo-force-activex-xhr")) {
            var a = new XMLHttpRequest;
            return "undefined" !== typeof a.addEventListener && ("undefined" === typeof opera || "undefined" !== typeof a.upload)
        }
    });
    b.add("native-formdata", function() {
        return "undefined" !==
            typeof FormData
    });
    b.add("native-response-type", function() {
        return b("native-xhr") && "undefined" !== typeof(new XMLHttpRequest).responseType
    });
    b.add("native-xhr2-blob", function() {
        if (b("native-response-type")) {
            var a = new XMLHttpRequest;
            a.open("GET", "/", !0);
            a.responseType = "blob";
            var c = a.responseType;
            a.abort();
            return "blob" === c
        }
    });
    var x = {
            blob: b("native-xhr2-blob") ? "blob" : "arraybuffer",
            document: "document",
            arraybuffer: "arraybuffer"
        },
        t, w, u, r;
    b("native-xhr2") ? (t = function(a) {
        return !this.isFulfilled()
    }, r = function(a,
        c) {
        c.xhr.abort()
    }, u = function(a, c, b) {
        function f(a) {
            c.handleResponse(b)
        }

        function d(a) {
            a = new n("Unable to load " + b.url + " status: " + a.target.status, b);
            c.handleResponse(b, a)
        }

        function e(a) {
            a.lengthComputable ? (b.loaded = a.loaded, b.total = a.total, c.progress(b)) : 3 === b.xhr.readyState && (b.loaded = "loaded" in a ? a.loaded : a.position, c.progress(b))
        }
        a.addEventListener("load", f, !1);
        a.addEventListener("error", d, !1);
        a.addEventListener("progress", e, !1);
        return function() {
            a.removeEventListener("load", f, !1);
            a.removeEventListener("error",
                d, !1);
            a.removeEventListener("progress", e, !1);
            a = null
        }
    }) : (t = function(a) {
        return a.xhr.readyState
    }, w = function(a) {
        return 4 === a.xhr.readyState
    }, r = function(a, c) {
        var b = c.xhr,
            e = typeof b.abort;
        "function" !== e && "object" !== e && "unknown" !== e || b.abort()
    });
    var B = {
        data: null,
        query: null,
        sync: !1,
        method: "GET"
    };
    k._create = function() {
        throw Error("XMLHTTP not available");
    };
    if (b("native-xhr") && !b("dojo-force-activex-xhr")) k._create = function() {
        return new XMLHttpRequest
    };
    else if (b("activex")) try {
        new ActiveXObject("Msxml2.XMLHTTP"),
            k._create = function() {
                return new ActiveXObject("Msxml2.XMLHTTP")
            }
    } catch (a) {
        try {
            new ActiveXObject("Microsoft.XMLHTTP"), k._create = function() {
                return new ActiveXObject("Microsoft.XMLHTTP")
            }
        } catch (c) {}
    }
    e.addCommonMethods(k);
    return k
});