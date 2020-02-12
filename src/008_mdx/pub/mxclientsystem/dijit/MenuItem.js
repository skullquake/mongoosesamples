//>>built
require({
    cache: {
        "url:dijit/templates/MenuItem.html": '\x3ctr class\x3d"dijitReset" data-dojo-attach-point\x3d"focusNode" role\x3d"menuitem" tabIndex\x3d"-1"\x3e\n\t\x3ctd class\x3d"dijitReset dijitMenuItemIconCell" role\x3d"presentation"\x3e\n\t\t\x3cspan role\x3d"presentation" class\x3d"dijitInline dijitIcon dijitMenuItemIcon" data-dojo-attach-point\x3d"iconNode"\x3e\x3c/span\x3e\n\t\x3c/td\x3e\n\t\x3ctd class\x3d"dijitReset dijitMenuItemLabel" colspan\x3d"2" data-dojo-attach-point\x3d"containerNode,textDirNode"\n\t\trole\x3d"presentation"\x3e\x3c/td\x3e\n\t\x3ctd class\x3d"dijitReset dijitMenuItemAccelKey" style\x3d"display: none" data-dojo-attach-point\x3d"accelKeyNode"\x3e\x3c/td\x3e\n\t\x3ctd class\x3d"dijitReset dijitMenuArrowCell" role\x3d"presentation"\x3e\n\t\t\x3cspan data-dojo-attach-point\x3d"arrowWrapper" style\x3d"visibility: hidden"\x3e\n\t\t\t\x3cspan class\x3d"dijitInline dijitIcon dijitMenuExpand"\x3e\x3c/span\x3e\n\t\t\t\x3cspan class\x3d"dijitMenuExpandA11y"\x3e+\x3c/span\x3e\n\t\t\x3c/span\x3e\n\t\x3c/td\x3e\n\x3c/tr\x3e\n'
    }
});
define("dijit/MenuItem", "dojo/_base/declare dojo/dom dojo/dom-attr dojo/dom-class dojo/_base/kernel dojo/sniff dojo/_base/lang ./_Widget ./_TemplatedMixin ./_Contained ./_CssStateMixin dojo/text!./templates/MenuItem.html".split(" "), function(f, h, d, k, g, e, b, l, m, n, p, q) {
    b = f("dijit.MenuItem" + (e("dojo-bidi") ? "_NoBidi" : ""), [l, m, n, p], {
        templateString: q,
        baseClass: "dijitMenuItem",
        label: "",
        _setLabelAttr: function(a) {
            this._set("label", a);
            var b = "",
                c;
            c = a.search(/{\S}/);
            if (0 <= c) {
                var b = a.charAt(c + 1),
                    d = a.substr(0, c);
                a = a.substr(c + 3);
                c = d + b + a;
                a = d + '\x3cspan class\x3d"dijitMenuItemShortcutKey"\x3e' + b + "\x3c/span\x3e" + a
            } else c = a;
            this.domNode.setAttribute("aria-label", c + " " + this.accelKey);
            this.containerNode.innerHTML = a;
            this._set("shortcutKey", b)
        },
        iconClass: "dijitNoIcon",
        _setIconClassAttr: {
            node: "iconNode",
            type: "class"
        },
        accelKey: "",
        disabled: !1,
        _fillContent: function(a) {
            !a || "label" in this.params || this._set("label", a.innerHTML)
        },
        buildRendering: function() {
            this.inherited(arguments);
            d.set(this.containerNode, "id", this.id + "_text");
            this.accelKeyNode && d.set(this.accelKeyNode, "id", this.id + "_accel");
            h.setSelectable(this.domNode, !1)
        },
        onClick: function() {},
        focus: function() {
            try {
                8 == e("ie") && this.containerNode.focus(), this.focusNode.focus()
            } catch (a) {}
        },
        _setSelected: function(a) {
            k.toggle(this.domNode, "dijitMenuItemSelected", a)
        },
        setLabel: function(a) {
            g.deprecated("dijit.MenuItem.setLabel() is deprecated.  Use set('label', ...) instead.", "", "2.0");
            this.set("label", a)
        },
        setDisabled: function(a) {
            g.deprecated("dijit.Menu.setDisabled() is deprecated.  Use set('disabled', bool) instead.",
                "", "2.0");
            this.set("disabled", a)
        },
        _setDisabledAttr: function(a) {
            this.focusNode.setAttribute("aria-disabled", a ? "true" : "false");
            this._set("disabled", a)
        },
        _setAccelKeyAttr: function(a) {
            this.accelKeyNode && (this.accelKeyNode.style.display = a ? "" : "none", this.accelKeyNode.innerHTML = a, d.set(this.containerNode, "colSpan", a ? "1" : "2"));
            this._set("accelKey", a)
        }
    });
    e("dojo-bidi") && (b = f("dijit.MenuItem", b, {
        _setLabelAttr: function(a) {
            this.inherited(arguments);
            "auto" === this.textDir && this.applyTextDir(this.textDirNode)
        }
    }));
    return b
});