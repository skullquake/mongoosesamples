/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/_base/xhr", "./kernel ./sniff require ../io-query ../dom ../dom-form ./Deferred ./config ./json ./lang ./array ../on ../aspect ../request/watch ../request/xhr ../request/util".split(" "), function(b, r, G, q, y, e, z, A, u, p, B, H, v, m, w, C) {
    b._xhrObj = w._create;
    var t = b.config;
    b.objectToQuery = q.objectToQuery;
    b.queryToObject = q.queryToObject;
    b.fieldToObject = e.fieldToObject;
    b.formToObject = e.toObject;
    b.formToQuery = e.toQuery;
    b.formToJson = e.toJson;
    b._blockAsync = !1;
    var n = b._contentHandlers = b.contentHandlers = {
        text: function(a) {
            return a.responseText
        },
        json: function(a) {
            return u.fromJson(a.responseText || null)
        },
        "json-comment-filtered": function(a) {
            A.useCommentedJson || console.warn("Consider using the standard mimetype:application/json. json-commenting can introduce security issues. To decrease the chances of hijacking, use the standard the 'json' handler and prefix your json with: {}\x26\x26\nUse djConfig.useCommentedJson\x3dtrue to turn off this message.");
            a = a.responseText;
            var b = a.indexOf("/*"),
                g = a.lastIndexOf("*/");
            if (-1 == b || -1 == g) throw Error("JSON was not comment filtered");
            return u.fromJson(a.substring(b + 2, g))
        },
        javascript: function(a) {
            return b.eval(a.responseText)
        },
        xml: function(a) {
            var b = a.responseXML;
            b && r("dom-qsa2.1") && !b.querySelectorAll && r("dom-parser") && (b = (new DOMParser).parseFromString(a.responseText, "application/xml"));
            if (r("ie") && (!b || !b.documentElement)) {
                var g = function(a) {
                        return "MSXML" + a + ".DOMDocument"
                    },
                    g = ["Microsoft.XMLDOM", g(6), g(4), g(3), g(2)];
                B.some(g, function(d) {
                    try {
                        var c = new ActiveXObject(d);
                        c.async = !1;
                        c.loadXML(a.responseText);
                        b = c
                    } catch (f) {
                        return !1
                    }
                    return !0
                })
            }
            return b
        },
        "json-comment-optional": function(a) {
            return a.responseText && /^[^{\[]*\/\*/.test(a.responseText) ? n["json-comment-filtered"](a) : n.json(a)
        }
    };
    b._ioSetArgs = function(a, d, g, D) {
        var c = {
                args: a,
                url: a.url
            },
            f = null;
        if (a.form) {
            var f = y.byId(a.form),
                h = f.getAttributeNode("action");
            c.url = c.url || (h ? h.value : b.doc ? b.doc.URL : null);
            f = e.toObject(f)
        }
        h = [{}];
        f && h.push(f);
        a.content && h.push(a.content);
        a.preventCache && h.push({
            "dojo.preventCache": (new Date).valueOf()
        });
        c.query = q.objectToQuery(p.mixin.apply(null, h));
        c.handleAs = a.handleAs || "text";
        var k = new z(function(a) {
            a.canceled = !0;
            d && d(a);
            var b = a.ioArgs.error;
            b || (b = Error("request cancelled"), b.dojoType = "cancel", a.ioArgs.error = b);
            return b
        });
        k.addCallback(g);
        var l = a.load;
        l && p.isFunction(l) && k.addCallback(function(b) {
            return l.call(a, b, c)
        });
        var m = a.error;
        m && p.isFunction(m) && k.addErrback(function(b) {
            return m.call(a, b, c)
        });
        var n = a.handle;
        n && p.isFunction(n) && k.addBoth(function(b) {
            return n.call(a, b, c)
        });
        k.addErrback(function(a) {
            return D(a,
                k)
        });
        t.ioPublish && b.publish && !1 !== c.args.ioPublish && (k.addCallbacks(function(a) {
            b.publish("/dojo/io/load", [k, a]);
            return a
        }, function(a) {
            b.publish("/dojo/io/error", [k, a]);
            return a
        }), k.addBoth(function(a) {
            b.publish("/dojo/io/done", [k, a]);
            return a
        }));
        k.ioArgs = c;
        return k
    };
    var E = function(a) {
            a = n[a.ioArgs.handleAs](a.ioArgs.xhr);
            return void 0 === a ? null : a
        },
        F = function(a, b) {
            b.ioArgs.args.failOk || console.error(a);
            return a
        },
        x = function(a) {
            0 >= l && (l = 0, t.ioPublish && b.publish && (!a || a && !1 !== a.ioArgs.args.ioPublish) &&
                b.publish("/dojo/io/stop"))
        },
        l = 0;
    v.after(m, "_onAction", function() {
        --l
    });
    v.after(m, "_onInFlight", x);
    b._ioCancelAll = m.cancelAll;
    b._ioNotifyStart = function(a) {
        t.ioPublish && b.publish && !1 !== a.ioArgs.args.ioPublish && (l || b.publish("/dojo/io/start"), l += 1, b.publish("/dojo/io/send", [a]))
    };
    b._ioWatch = function(a, b, g, e) {
        a.ioArgs.options = a.ioArgs.args;
        p.mixin(a, {
            response: a.ioArgs,
            isValid: function(c) {
                return b(a)
            },
            isReady: function(b) {
                return g(a)
            },
            handleResponse: function(b) {
                return e(a)
            }
        });
        m(a);
        x(a)
    };
    b._ioAddQueryToUrl =
        function(a) {
            a.query.length && (a.url += (-1 == a.url.indexOf("?") ? "?" : "\x26") + a.query, a.query = null)
        };
    b.xhr = function(a, d, g) {
        var e, c = b._ioSetArgs(d, function(a) {
                e && e.cancel()
            }, E, F),
            f = c.ioArgs;
        "postData" in d ? f.query = d.postData : "putData" in d ? f.query = d.putData : "rawBody" in d ? f.query = d.rawBody : (2 < arguments.length && !g || -1 === "POST|PUT".indexOf(a.toUpperCase())) && b._ioAddQueryToUrl(f);
        var h = {
            method: a,
            handleAs: "text",
            timeout: d.timeout,
            withCredentials: d.withCredentials,
            ioArgs: f
        };
        "undefined" !== typeof d.headers && (h.headers =
            d.headers);
        "undefined" !== typeof d.contentType && (h.headers || (h.headers = {}), h.headers["Content-Type"] = d.contentType);
        "undefined" !== typeof f.query && (h.data = f.query);
        "undefined" !== typeof d.sync && (h.sync = d.sync);
        b._ioNotifyStart(c);
        try {
            e = w(f.url, h, !0)
        } catch (k) {
            return c.cancel(), c
        }
        c.ioArgs.xhr = e.response.xhr;
        e.then(function() {
            c.resolve(c)
        }).otherwise(function(a) {
            f.error = a;
            a.response && (a.status = a.response.status, a.responseText = a.response.text, a.xhr = a.response.xhr);
            c.reject(a)
        });
        return c
    };
    b.xhrGet = function(a) {
        return b.xhr("GET",
            a)
    };
    b.rawXhrPost = b.xhrPost = function(a) {
        return b.xhr("POST", a, !0)
    };
    b.rawXhrPut = b.xhrPut = function(a) {
        return b.xhr("PUT", a, !0)
    };
    b.xhrDelete = function(a) {
        return b.xhr("DELETE", a)
    };
    b._isDocumentOk = function(a) {
        return C.checkStatus(a.status)
    };
    b._getText = function(a) {
        var d;
        b.xhrGet({
            url: a,
            sync: !0,
            load: function(a) {
                d = a
            }
        });
        return d
    };
    p.mixin(b.xhr, {
        _xhrObj: b._xhrObj,
        fieldToObject: e.fieldToObject,
        formToObject: e.toObject,
        objectToQuery: q.objectToQuery,
        formToQuery: e.toQuery,
        formToJson: e.toJson,
        queryToObject: q.queryToObject,
        contentHandlers: n,
        _ioSetArgs: b._ioSetArgs,
        _ioCancelAll: b._ioCancelAll,
        _ioNotifyStart: b._ioNotifyStart,
        _ioWatch: b._ioWatch,
        _ioAddQueryToUrl: b._ioAddQueryToUrl,
        _isDocumentOk: b._isDocumentOk,
        _getText: b._getText,
        get: b.xhrGet,
        post: b.xhrPost,
        put: b.xhrPut,
        del: b.xhrDelete
    });
    return b.xhr
});