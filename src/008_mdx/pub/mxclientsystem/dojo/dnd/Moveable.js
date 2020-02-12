/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/dnd/Moveable", "../_base/array ../_base/declare ../_base/lang ../dom ../dom-class ../Evented ../has ../on ../topic ../touch ./common ./Mover ../_base/window".split(" "), function(p, q, c, k, f, r, t, d, l, g, m, u, n) {
    function v(a, b) {
        "touchAction" in document.body.style ? h = "touchAction" : "msTouchAction" in document.body.style && (h = "msTouchAction");
        e = function(a, b) {
            a.style[h] = b
        };
        e(a, b)
    }
    var h, e = function() {};
    t("touch-action") && (e = v);
    return q("dojo.dnd.Moveable", [r], {
        handle: "",
        delay: 0,
        skip: !1,
        constructor: function(a,
            b) {
            this.node = k.byId(a);
            e(this.node, "none");
            b || (b = {});
            this.handle = b.handle ? k.byId(b.handle) : null;
            this.handle || (this.handle = this.node);
            this.delay = 0 < b.delay ? b.delay : 0;
            this.skip = b.skip;
            this.mover = b.mover ? b.mover : u;
            this.events = [d(this.handle, g.press, c.hitch(this, "onMouseDown")), d(this.handle, "dragstart", c.hitch(this, "onSelectStart")), d(this.handle, "selectstart", c.hitch(this, "onSelectStart"))]
        },
        markupFactory: function(a, b, c) {
            return new c(b, a)
        },
        destroy: function() {
            p.forEach(this.events, function(a) {
                a.remove()
            });
            e(this.node, "");
            this.events = this.node = this.handle = null
        },
        onMouseDown: function(a) {
            if (!this.skip || !m.isFormElement(a)) {
                if (this.delay) this.events.push(d(this.handle, g.move, c.hitch(this, "onMouseMove")), d(this.handle.ownerDocument, g.release, c.hitch(this, "onMouseUp"))), this._lastX = a.pageX, this._lastY = a.pageY;
                else this.onDragDetected(a);
                a.stopPropagation();
                a.preventDefault()
            }
        },
        onMouseMove: function(a) {
            if (Math.abs(a.pageX - this._lastX) > this.delay || Math.abs(a.pageY - this._lastY) > this.delay) this.onMouseUp(a), this.onDragDetected(a);
            a.stopPropagation();
            a.preventDefault()
        },
        onMouseUp: function(a) {
            for (var b = 0; 2 > b; ++b) this.events.pop().remove();
            a.stopPropagation();
            a.preventDefault()
        },
        onSelectStart: function(a) {
            this.skip && m.isFormElement(a) || (a.stopPropagation(), a.preventDefault())
        },
        onDragDetected: function(a) {
            new this.mover(this.node, a, this)
        },
        onMoveStart: function(a) {
            l.publish("/dnd/move/start", a);
            f.add(n.body(), "dojoMove");
            f.add(this.node, "dojoMoveItem")
        },
        onMoveStop: function(a) {
            l.publish("/dnd/move/stop", a);
            f.remove(n.body(), "dojoMove");
            f.remove(this.node, "dojoMoveItem")
        },
        onFirstMove: function() {},
        onMove: function(a, b) {
            this.onMoving(a, b);
            var c = a.node.style;
            c.left = b.l + "px";
            c.top = b.t + "px";
            this.onMoved(a, b)
        },
        onMoving: function() {},
        onMoved: function() {}
    })
});