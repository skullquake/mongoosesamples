//>>built
define("dijit/form/_SearchMixin", "dojo/_base/declare dojo/keys dojo/_base/lang dojo/query dojo/string dojo/when ../registry".split(" "), function(m, f, k, q, n, l, p) {
    return m("dijit.form._SearchMixin", null, {
        pageSize: Infinity,
        store: null,
        fetchProperties: {},
        query: {},
        list: "",
        _setListAttr: function(a) {
            this._set("list", a)
        },
        searchDelay: 200,
        searchAttr: "name",
        queryExpr: "${0}*",
        ignoreCase: !0,
        _patternToRegExp: function(a) {
            return new RegExp("^" + a.replace(/(\\.)|(\*)|(\?)|\W/g, function(c, a, b, g) {
                return b ? ".*" : g ? "." : a ?
                    a : "\\" + c
            }) + "$", this.ignoreCase ? "mi" : "m")
        },
        _abortQuery: function() {
            this.searchTimer && (this.searchTimer = this.searchTimer.remove());
            this._queryDeferHandle && (this._queryDeferHandle = this._queryDeferHandle.remove());
            this._fetchHandle && (this._fetchHandle.abort && (this._cancelingQuery = !0, this._fetchHandle.abort(), this._cancelingQuery = !1), this._fetchHandle.cancel && (this._cancelingQuery = !0, this._fetchHandle.cancel(), this._cancelingQuery = !1), this._fetchHandle = null)
        },
        _processInput: function(a) {
            if (!this.disabled &&
                !this.readOnly) {
                a = a.charOrCode;
                this._prev_key_backspace = !1;
                if (a == f.DELETE || a == f.BACKSPACE) this._maskValidSubsetError = this._prev_key_backspace = !0;
                if (this.store) this.searchTimer = this.defer("_startSearchFromInput", 1);
                else this.onSearch()
            }
        },
        onSearch: function() {},
        _startSearchFromInput: function() {
            this._startSearch(this.focusNode.value)
        },
        _startSearch: function(a) {
            this._abortQuery();
            var c = this,
                h = k.clone(this.query),
                b = {
                    start: 0,
                    count: this.pageSize,
                    queryOptions: {
                        ignoreCase: this.ignoreCase,
                        deep: !0
                    }
                },
                g = n.substitute(this.queryExpr,
                    [a.replace(/([\\\*\?])/g, "\\$1")]),
                d, f = function() {
                    var a = c._fetchHandle = c.store.query(h, b);
                    c.disabled || c.readOnly || d !== c._lastQuery || l(a, function(e) {
                        c._fetchHandle = null;
                        c.disabled || c.readOnly || d !== c._lastQuery || l(a.total, function(a) {
                            e.total = a;
                            var d = c.pageSize;
                            if (isNaN(d) || d > e.total) d = e.total;
                            e.nextPage = function(a) {
                                b.direction = a = !1 !== a;
                                b.count = d;
                                a ? (b.start += e.length, b.start >= e.total && (b.count = 0)) : (b.start -= d, 0 > b.start && (b.count = Math.max(d + b.start, 0), b.start = 0));
                                0 >= b.count ? (e.length = 0, c.onSearch(e, h,
                                    b)) : f()
                            };
                            c.onSearch(e, h, b)
                        })
                    }, function(a) {
                        c._fetchHandle = null;
                        c._cancelingQuery || console.error(c.declaredClass + " " + a.toString())
                    })
                };
            k.mixin(b, this.fetchProperties);
            this.store._oldAPI ? d = g : (d = this._patternToRegExp(g), d.toString = function() {
                return g
            });
            this._lastQuery = h[this.searchAttr] = d;
            this._queryDeferHandle = this.defer(f, this.searchDelay)
        },
        constructor: function() {
            this.query = {};
            this.fetchProperties = {}
        },
        postMixInProperties: function() {
            if (!this.store) {
                var a = this.list;
                a && (this.store = p.byId(a))
            }
            this.inherited(arguments)
        }
    })
});