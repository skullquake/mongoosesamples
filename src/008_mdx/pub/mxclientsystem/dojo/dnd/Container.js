/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/dnd/Container", "../_base/array ../_base/declare ../_base/kernel ../_base/lang ../_base/window ../dom ../dom-class ../dom-construct ../Evented ../has ../on ../query ../touch ./common".split(" "), function(r, n, t, g, w, p, f, k, u, x, l, v, q, e) {
    n = n("dojo.dnd.Container", u, {
        skipForm: !1,
        allowNested: !1,
        constructor: function(a, b) {
            this.node = p.byId(a);
            b || (b = {});
            this.creator = b.creator || null;
            this.skipForm = b.skipForm;
            this.parent = b.dropParent && p.byId(b.dropParent);
            this.map = {};
            this.current = null;
            this.containerState =
                "";
            f.add(this.node, "dojoDndContainer");
            b && b._skipStartup || this.startup();
            this.events = [l(this.node, q.over, g.hitch(this, "onMouseOver")), l(this.node, q.out, g.hitch(this, "onMouseOut")), l(this.node, "dragstart", g.hitch(this, "onSelectStart")), l(this.node, "selectstart", g.hitch(this, "onSelectStart"))]
        },
        creator: function() {},
        getItem: function(a) {
            return this.map[a]
        },
        setItem: function(a, b) {
            this.map[a] = b
        },
        delItem: function(a) {
            delete this.map[a]
        },
        forInItems: function(a, b) {
            b = b || t.global;
            var c = this.map,
                d = e._empty,
                m;
            for (m in c) m in
                d || a.call(b, c[m], m, this);
            return b
        },
        clearItems: function() {
            this.map = {}
        },
        getAllNodes: function() {
            return v((this.allowNested ? "" : "\x3e ") + ".dojoDndItem", this.parent)
        },
        sync: function() {
            var a = {};
            this.getAllNodes().forEach(function(b) {
                if (b.id) {
                    var c = this.getItem(b.id);
                    if (c) {
                        a[b.id] = c;
                        return
                    }
                } else b.id = e.getUniqueId();
                var c = b.getAttribute("dndType"),
                    d = b.getAttribute("dndData");
                a[b.id] = {
                    data: d || b.innerHTML,
                    type: c ? c.split(/\s*,\s*/) : ["text"]
                }
            }, this);
            this.map = a;
            return this
        },
        insertNodes: function(a, b, c) {
            this.parent.firstChild ?
                b ? c || (c = this.parent.firstChild) : c && (c = c.nextSibling) : c = null;
            var d;
            if (c)
                for (b = 0; b < a.length; ++b) d = this._normalizedCreator(a[b]), this.setItem(d.node.id, {
                    data: d.data,
                    type: d.type
                }), c.parentNode.insertBefore(d.node, c);
            else
                for (b = 0; b < a.length; ++b) d = this._normalizedCreator(a[b]), this.setItem(d.node.id, {
                    data: d.data,
                    type: d.type
                }), this.parent.appendChild(d.node);
            return this
        },
        destroy: function() {
            r.forEach(this.events, function(a) {
                a.remove()
            });
            this.clearItems();
            this.node = this.parent = this.current = null
        },
        markupFactory: function(a,
            b, c) {
            a._skipStartup = !0;
            return new c(b, a)
        },
        startup: function() {
            if (!this.parent && (this.parent = this.node, "table" == this.parent.tagName.toLowerCase())) {
                var a = this.parent.getElementsByTagName("tbody");
                a && a.length && (this.parent = a[0])
            }
            this.defaultCreator = e._defaultCreator(this.parent);
            this.sync()
        },
        onMouseOver: function(a) {
            for (var b = a.relatedTarget; b && b != this.node;) try {
                b = b.parentNode
            } catch (c) {
                b = null
            }
            b || (this._changeState("Container", "Over"), this.onOverEvent());
            b = this._getChildByEvent(a);
            this.current != b && (this.current &&
                this._removeItemClass(this.current, "Over"), b && this._addItemClass(b, "Over"), this.current = b)
        },
        onMouseOut: function(a) {
            for (a = a.relatedTarget; a;) {
                if (a == this.node) return;
                try {
                    a = a.parentNode
                } catch (b) {
                    a = null
                }
            }
            this.current && (this._removeItemClass(this.current, "Over"), this.current = null);
            this._changeState("Container", "");
            this.onOutEvent()
        },
        onSelectStart: function(a) {
            this.skipForm && e.isFormElement(a) || (a.stopPropagation(), a.preventDefault())
        },
        onOverEvent: function() {},
        onOutEvent: function() {},
        _changeState: function(a,
            b) {
            var c = "dojoDnd" + a,
                d = a.toLowerCase() + "State";
            f.replace(this.node, c + b, c + this[d]);
            this[d] = b
        },
        _addItemClass: function(a, b) {
            f.add(a, "dojoDndItem" + b)
        },
        _removeItemClass: function(a, b) {
            f.remove(a, "dojoDndItem" + b)
        },
        _getChildByEvent: function(a) {
            if (a = a.target)
                for (var b = a.parentNode; b; a = b, b = a.parentNode)
                    if ((b == this.parent || this.allowNested) && f.contains(a, "dojoDndItem")) return a;
            return null
        },
        _normalizedCreator: function(a, b) {
            var c = (this.creator || this.defaultCreator).call(this, a, b);
            g.isArray(c.type) || (c.type = ["text"]);
            c.node.id || (c.node.id = e.getUniqueId());
            f.add(c.node, "dojoDndItem");
            return c
        }
    });
    e._createNode = function(a) {
        return a ? function(b) {
            return k.create(a, {
                innerHTML: b
            })
        } : e._createSpan
    };
    e._createTrTd = function(a) {
        var b = k.create("tr");
        k.create("td", {
            innerHTML: a
        }, b);
        return b
    };
    e._createSpan = function(a) {
        return k.create("span", {
            innerHTML: a
        })
    };
    e._defaultCreatorNodes = {
        ul: "li",
        ol: "li",
        div: "div",
        p: "div"
    };
    e._defaultCreator = function(a) {
        a = a.tagName.toLowerCase();
        var b = "tbody" == a || "thead" == a ? e._createTrTd : e._createNode(e._defaultCreatorNodes[a]);
        return function(a, d) {
            var c = a && g.isObject(a),
                f, h;
            c && a.tagName && a.nodeType && a.getAttribute ? (f = a.getAttribute("dndData") || a.innerHTML, c = (c = a.getAttribute("dndType")) ? c.split(/\s*,\s*/) : ["text"], h = a) : (f = c && a.data ? a.data : a, c = c && a.type ? a.type : ["text"], h = ("avatar" == d ? e._createSpan : b)(String(f)));
            h.id || (h.id = e.getUniqueId());
            return {
                node: h,
                data: f,
                type: c
            }
        }
    };
    return n
});