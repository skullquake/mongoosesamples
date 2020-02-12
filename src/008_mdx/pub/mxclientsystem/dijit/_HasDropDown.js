//>>built
define("dijit/_HasDropDown", "dojo/_base/declare dojo/_base/Deferred dojo/dom dojo/dom-attr dojo/dom-class dojo/dom-geometry dojo/dom-style dojo/has dojo/keys dojo/_base/lang dojo/on dojo/touch ./registry ./focus ./popup ./_FocusMixin".split(" "), function(q, r, v, l, h, m, w, x, k, f, g, n, t, y, p, u) {
    return q("dijit._HasDropDown", u, {
        _buttonNode: null,
        _arrowWrapperNode: null,
        _popupStateNode: null,
        _aroundNode: null,
        dropDown: null,
        autoWidth: !0,
        forceWidth: !1,
        maxHeight: -1,
        dropDownPosition: ["below", "above"],
        _stopClickEvents: !0,
        _onDropDownMouseDown: function(a) {
            this.disabled || this.readOnly || ("MSPointerDown" != a.type && a.preventDefault(), this.own(g.once(this.ownerDocument, n.release, f.hitch(this, "_onDropDownMouseUp"))), this.toggleDropDown())
        },
        _onDropDownMouseUp: function(a) {
            var c = this.dropDown,
                d = !1;
            if (a && this._opened) {
                var b = m.position(this._buttonNode, !0);
                if (!(a.pageX >= b.x && a.pageX <= b.x + b.w && a.pageY >= b.y && a.pageY <= b.y + b.h)) {
                    for (b = a.target; b && !d;) h.contains(b, "dijitPopup") ? d = !0 : b = b.parentNode;
                    if (d) {
                        b = a.target;
                        if (c.onItemClick) {
                            for (var e; b &&
                                !(e = t.byNode(b));) b = b.parentNode;
                            if (e && e.onClick && e.getParent) e.getParent().onItemClick(e, a)
                        }
                        return
                    }
                }
            }
            this._opened ? c.focus && (!1 !== c.autoFocus || "mouseup" == a.type && !this.hovering) && (this._focusDropDownTimer = this.defer(function() {
                c.focus();
                delete this._focusDropDownTimer
            })) : this.focus && this.defer("focus")
        },
        _onDropDownClick: function(a) {
            this._stopClickEvents && (a.stopPropagation(), a.preventDefault())
        },
        buildRendering: function() {
            this.inherited(arguments);
            this._buttonNode = this._buttonNode || this.focusNode ||
                this.domNode;
            this._popupStateNode = this._popupStateNode || this.focusNode || this._buttonNode;
            var a = {
                after: this.isLeftToRight() ? "Right" : "Left",
                before: this.isLeftToRight() ? "Left" : "Right",
                above: "Up",
                below: "Down",
                left: "Left",
                right: "Right"
            } [this.dropDownPosition[0]] || this.dropDownPosition[0] || "Down";
            h.add(this._arrowWrapperNode || this._buttonNode, "dijit" + a + "ArrowButton")
        },
        postCreate: function() {
            this.inherited(arguments);
            var a = this.focusNode || this.domNode;
            this.own(g(this._buttonNode, n.press, f.hitch(this, "_onDropDownMouseDown")),
                g(this._buttonNode, "click", f.hitch(this, "_onDropDownClick")), g(a, "keydown", f.hitch(this, "_onKey")), g(a, "keyup", f.hitch(this, "_onKeyUp")))
        },
        destroy: function() {
            this._opened && this.closeDropDown(!0);
            this.dropDown && (this.dropDown._destroyed || this.dropDown.destroyRecursive(), delete this.dropDown);
            this.inherited(arguments)
        },
        _onKey: function(a) {
            if (!this.disabled && !this.readOnly) {
                var c = this.dropDown,
                    d = a.target;
                c && this._opened && c.handleKey && !1 === c.handleKey(a) ? (a.stopPropagation(), a.preventDefault()) : c && this._opened &&
                    a.keyCode == k.ESCAPE ? (this.closeDropDown(), a.stopPropagation(), a.preventDefault()) : !this._opened && (a.keyCode == k.DOWN_ARROW || (a.keyCode == k.ENTER || a.keyCode == k.SPACE && (!this._searchTimer || a.ctrlKey || a.altKey || a.metaKey)) && ("input" !== (d.tagName || "").toLowerCase() || d.type && "text" !== d.type.toLowerCase())) && (this._toggleOnKeyUp = !0, a.stopPropagation(), a.preventDefault())
            }
        },
        _onKeyUp: function() {
            if (this._toggleOnKeyUp) {
                delete this._toggleOnKeyUp;
                this.toggleDropDown();
                var a = this.dropDown;
                a && a.focus && this.defer(f.hitch(a,
                    "focus"), 1)
            }
        },
        _onBlur: function() {
            this.closeDropDown(!1);
            this.inherited(arguments)
        },
        isLoaded: function() {
            return !0
        },
        loadDropDown: function(a) {
            a()
        },
        loadAndOpenDropDown: function() {
            var a = new r,
                c = f.hitch(this, function() {
                    this.openDropDown();
                    a.resolve(this.dropDown)
                });
            this.isLoaded() ? c() : this.loadDropDown(c);
            return a
        },
        toggleDropDown: function() {
            this.disabled || this.readOnly || (this._opened ? this.closeDropDown(!0) : this.loadAndOpenDropDown())
        },
        openDropDown: function() {
            var a = this.dropDown,
                c = a.domNode,
                d = this._aroundNode ||
                this.domNode,
                b = this,
                e = p.open({
                    parent: this,
                    popup: a,
                    around: d,
                    orient: this.dropDownPosition,
                    maxHeight: this.maxHeight,
                    onExecute: function() {
                        b.closeDropDown(!0)
                    },
                    onCancel: function() {
                        b.closeDropDown(!0)
                    },
                    onClose: function() {
                        l.set(b._popupStateNode, "popupActive", !1);
                        h.remove(b._popupStateNode, "dijitHasDropDownOpen");
                        b._set("_opened", !1)
                    }
                });
            if (this.forceWidth || this.autoWidth && d.offsetWidth > a._popupWrapper.offsetWidth) {
                var d = d.offsetWidth - a._popupWrapper.offsetWidth,
                    g = {
                        w: a.domNode.offsetWidth + d
                    };
                this._origStyle =
                    c.style.cssText;
                f.isFunction(a.resize) ? a.resize(g) : m.setMarginBox(c, g);
                "R" == e.corner[1] && (a._popupWrapper.style.left = a._popupWrapper.style.left.replace("px", "") - d + "px")
            }
            l.set(this._popupStateNode, "popupActive", "true");
            h.add(this._popupStateNode, "dijitHasDropDownOpen");
            this._set("_opened", !0);
            this._popupStateNode.setAttribute("aria-expanded", "true");
            this._popupStateNode.setAttribute("aria-owns", a.id);
            "presentation" === c.getAttribute("role") || c.getAttribute("aria-labelledby") || c.setAttribute("aria-labelledby",
                this.id);
            return e
        },
        closeDropDown: function(a) {
            this._focusDropDownTimer && (this._focusDropDownTimer.remove(), delete this._focusDropDownTimer);
            this._opened && (this._popupStateNode.setAttribute("aria-expanded", "false"), a && this.focus && this.focus(), p.close(this.dropDown), this._opened = !1);
            this._origStyle && (this.dropDown.domNode.style.cssText = this._origStyle, delete this._origStyle)
        }
    })
});