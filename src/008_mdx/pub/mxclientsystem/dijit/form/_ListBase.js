//>>built
define("dijit/form/_ListBase", ["dojo/_base/declare", "dojo/on", "dojo/window"], function(e, d, f) {
    return e("dijit.form._ListBase", null, {
        selected: null,
        _listConnect: function(a, c) {
            var b = this;
            return b.own(d(b.containerNode, d.selector(function(a, b, c) {
                return a.parentNode == c
            }, a), function(a) {
                b[c](a, this)
            }))
        },
        selectFirstNode: function() {
            for (var a = this.containerNode.firstChild; a && "none" == a.style.display;) a = a.nextSibling;
            this._setSelectedAttr(a, !0)
        },
        selectLastNode: function() {
            for (var a = this.containerNode.lastChild; a &&
                "none" == a.style.display;) a = a.previousSibling;
            this._setSelectedAttr(a, !0)
        },
        selectNextNode: function() {
            var a = this.selected;
            if (a) {
                for (a = a.nextSibling; a && "none" == a.style.display;) a = a.nextSibling;
                a ? this._setSelectedAttr(a, !0) : this.selectFirstNode()
            } else this.selectFirstNode()
        },
        selectPreviousNode: function() {
            var a = this.selected;
            if (a) {
                for (a = a.previousSibling; a && "none" == a.style.display;) a = a.previousSibling;
                a ? this._setSelectedAttr(a, !0) : this.selectLastNode()
            } else this.selectLastNode()
        },
        _setSelectedAttr: function(a,
            c) {
            if (this.selected != a) {
                var b = this.selected;
                if (b) this.onDeselect(b);
                a && (c && f.scrollIntoView(a), this.onSelect(a));
                this._set("selected", a)
            } else if (a) this.onSelect(a)
        }
    })
});