//>>built
define("dijit/form/_ComboBoxMenu", "dojo/_base/declare dojo/dom-class dojo/dom-style dojo/keys ../_WidgetBase ../_TemplatedMixin ./_ComboBoxMenuMixin ./_ListMouseMixin".split(" "), function(e, b, f, c, g, h, k, l) {
    return e("dijit.form._ComboBoxMenu", [g, h, l, k], {
        templateString: "\x3cdiv class\x3d'dijitReset dijitMenu' data-dojo-attach-point\x3d'containerNode' style\x3d'overflow: auto; overflow-x: hidden;' role\x3d'listbox'\x3e\x3cdiv class\x3d'dijitMenuItem dijitMenuPreviousButton' data-dojo-attach-point\x3d'previousButton' role\x3d'option'\x3e\x3c/div\x3e\x3cdiv class\x3d'dijitMenuItem dijitMenuNextButton' data-dojo-attach-point\x3d'nextButton' role\x3d'option'\x3e\x3c/div\x3e\x3c/div\x3e",
        baseClass: "dijitComboBoxMenu",
        postCreate: function() {
            this.inherited(arguments);
            this.isLeftToRight() || (b.add(this.previousButton, "dijitMenuItemRtl"), b.add(this.nextButton, "dijitMenuItemRtl"));
            this.containerNode.setAttribute("role", "listbox")
        },
        _createMenuItem: function() {
            var a = this.ownerDocument.createElement("div");
            a.className = "dijitReset dijitMenuItem" + (this.isLeftToRight() ? "" : " dijitMenuItemRtl");
            a.setAttribute("role", "option");
            return a
        },
        onHover: function(a) {
            b.add(a, "dijitMenuItemHover")
        },
        onUnhover: function(a) {
            b.remove(a,
                "dijitMenuItemHover")
        },
        onSelect: function(a) {
            b.add(a, "dijitMenuItemSelected")
        },
        onDeselect: function(a) {
            b.remove(a, "dijitMenuItemSelected")
        },
        _page: function(a) {
            var b = 0,
                c = this.domNode.scrollTop,
                e = f.get(this.domNode, "height");
            for (this.getHighlightedOption() || this.selectNextNode(); b < e;) {
                var d = this.getHighlightedOption();
                if (a) {
                    if (!d.previousSibling || "none" == d.previousSibling.style.display) break;
                    this.selectPreviousNode()
                } else {
                    if (!d.nextSibling || "none" == d.nextSibling.style.display) break;
                    this.selectNextNode()
                }
                d =
                    this.domNode.scrollTop;
                b += (d - c) * (a ? -1 : 1);
                c = d
            }
        },
        handleKey: function(a) {
            switch (a.keyCode) {
                case c.DOWN_ARROW:
                    return this.selectNextNode(), !1;
                case c.PAGE_DOWN:
                    return this._page(!1), !1;
                case c.UP_ARROW:
                    return this.selectPreviousNode(), !1;
                case c.PAGE_UP:
                    return this._page(!0), !1;
                default:
                    return !0
            }
        }
    })
});