/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/NodeList-traverse", ["./query", "./_base/lang", "./_base/array"], function(f, g, k) {
    var h = f.NodeList;
    g.extend(h, {
        _buildArrayFromCallback: function(b) {
            for (var a = [], c = 0; c < this.length; c++) {
                var d = b.call(this[c], this[c], a);
                d && (a = a.concat(d))
            }
            return a
        },
        _getUniqueAsNodeList: function(b) {
            for (var a = [], c = 0, d; d = b[c]; c++) 1 == d.nodeType && -1 == k.indexOf(a, d) && a.push(d);
            return this._wrap(a, null, this._NodeListCtor)
        },
        _getUniqueNodeListWithParent: function(b, a) {
            var c = this._getUniqueAsNodeList(b),
                c = a ? f._filterResult(c,
                    a) : c;
            return c._stash(this)
        },
        _getRelatedUniqueNodes: function(b, a) {
            return this._getUniqueNodeListWithParent(this._buildArrayFromCallback(a), b)
        },
        children: function(b) {
            return this._getRelatedUniqueNodes(b, function(a, b) {
                return g._toArray(a.childNodes)
            })
        },
        closest: function(b, a) {
            return this._getRelatedUniqueNodes(null, function(c, d) {
                do
                    if (f._filterResult([c], b, a).length) return c; while (c != a && (c = c.parentNode) && 1 == c.nodeType);
                return null
            })
        },
        parent: function(b) {
            return this._getRelatedUniqueNodes(b, function(a, b) {
                return a.parentNode
            })
        },
        parents: function(b) {
            return this._getRelatedUniqueNodes(b, function(a, b) {
                for (var d = []; a.parentNode;) a = a.parentNode, d.push(a);
                return d
            })
        },
        siblings: function(b) {
            return this._getRelatedUniqueNodes(b, function(a, b) {
                for (var d = [], c = a.parentNode && a.parentNode.childNodes, e = 0; e < c.length; e++) c[e] != a && d.push(c[e]);
                return d
            })
        },
        next: function(b) {
            return this._getRelatedUniqueNodes(b, function(a, b) {
                for (var d = a.nextSibling; d && 1 != d.nodeType;) d = d.nextSibling;
                return d
            })
        },
        nextAll: function(b) {
            return this._getRelatedUniqueNodes(b,
                function(a, b) {
                    for (var d = [], c = a; c = c.nextSibling;) 1 == c.nodeType && d.push(c);
                    return d
                })
        },
        prev: function(b) {
            return this._getRelatedUniqueNodes(b, function(a, b) {
                for (var d = a.previousSibling; d && 1 != d.nodeType;) d = d.previousSibling;
                return d
            })
        },
        prevAll: function(b) {
            return this._getRelatedUniqueNodes(b, function(a, b) {
                for (var d = [], c = a; c = c.previousSibling;) 1 == c.nodeType && d.push(c);
                return d
            })
        },
        andSelf: function() {
            return this.concat(this._parent)
        },
        first: function() {
            return this._wrap(this[0] && [this[0]] || [], this)
        },
        last: function() {
            return this._wrap(this.length ? [this[this.length - 1]] : [], this)
        },
        even: function() {
            return this.filter(function(b, a) {
                return 0 != a % 2
            })
        },
        odd: function() {
            return this.filter(function(b, a) {
                return 0 == a % 2
            })
        }
    });
    return h
});