//>>built
define("dijit/_KeyNavContainer", "dojo/_base/array dojo/_base/declare dojo/dom-attr dojo/_base/kernel dojo/keys dojo/_base/lang ./registry ./_Container ./_FocusMixin ./_KeyNavMixin".split(" "), function(d, e, p, f, g, b, h, k, l, m) {
    return e("dijit._KeyNavContainer", [l, m, k], {
        connectKeyNavHandlers: function(a, n) {
            var c = this._keyNavCodes = {},
                e = b.hitch(this, "focusPrev"),
                f = b.hitch(this, "focusNext");
            d.forEach(a, function(a) {
                c[a] = e
            });
            d.forEach(n, function(a) {
                c[a] = f
            });
            c[g.HOME] = b.hitch(this, "focusFirstChild");
            c[g.END] =
                b.hitch(this, "focusLastChild")
        },
        startupKeyNavChildren: function() {
            f.deprecated("startupKeyNavChildren() call no longer needed", "", "2.0")
        },
        startup: function() {
            this.inherited(arguments);
            d.forEach(this.getChildren(), b.hitch(this, "_startupChild"))
        },
        addChild: function(a, b) {
            this.inherited(arguments);
            this._startupChild(a)
        },
        _startupChild: function(a) {
            a.set("tabIndex", "-1")
        },
        _getFirst: function() {
            var a = this.getChildren();
            return a.length ? a[0] : null
        },
        _getLast: function() {
            var a = this.getChildren();
            return a.length ? a[a.length -
                1] : null
        },
        focusNext: function() {
            this.focusChild(this._getNextFocusableChild(this.focusedChild, 1))
        },
        focusPrev: function() {
            this.focusChild(this._getNextFocusableChild(this.focusedChild, -1), !0)
        },
        childSelector: function(a) {
            return (a = h.byNode(a)) && a.getParent() == this
        }
    })
});