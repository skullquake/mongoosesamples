//>>built
require({
    cache: {
        "url:dijit/layout/templates/_TabButton.html": '\x3cdiv role\x3d"presentation" data-dojo-attach-point\x3d"titleNode,innerDiv,tabContent" class\x3d"dijitTabInner dijitTabContent"\x3e\n\t\x3cspan role\x3d"presentation" class\x3d"dijitInline dijitIcon dijitTabButtonIcon" data-dojo-attach-point\x3d"iconNode"\x3e\x3c/span\x3e\n\t\x3cspan data-dojo-attach-point\x3d\'containerNode,focusNode\' class\x3d\'tabLabel\'\x3e\x3c/span\x3e\n\t\x3cspan class\x3d"dijitInline dijitTabCloseButton dijitTabCloseIcon" data-dojo-attach-point\x3d\'closeNode\'\n\t\t  role\x3d"presentation"\x3e\n\t\t\x3cspan data-dojo-attach-point\x3d\'closeText\' class\x3d\'dijitTabCloseText\'\x3e[x]\x3c/span\n\t\t\t\t\x3e\x3c/span\x3e\n\x3c/div\x3e\n'
    }
});
define("dijit/layout/TabController", "dojo/_base/declare dojo/dom dojo/dom-attr dojo/dom-class dojo/has dojo/i18n dojo/_base/lang ./StackController ../registry ../Menu ../MenuItem dojo/text!./templates/_TabButton.html dojo/i18n!../nls/common".split(" "), function(b, k, d, e, g, f, l, h, m, n, p, c) {
    c = b("dijit.layout._TabButton" + (g("dojo-bidi") ? "_NoBidi" : ""), h.StackButton, {
        baseClass: "dijitTab",
        cssStateNodes: {
            closeNode: "dijitTabCloseButton"
        },
        templateString: c,
        _setNameAttr: "focusNode",
        scrollOnFocus: !1,
        buildRendering: function() {
            this.inherited(arguments);
            k.setSelectable(this.containerNode, !1)
        },
        startup: function() {
            this.inherited(arguments);
            var a = this.domNode;
            this.defer(function() {
                a.className = a.className
            }, 1)
        },
        _setCloseButtonAttr: function(a) {
            this._set("closeButton", a);
            e.toggle(this.domNode, "dijitClosable", a);
            this.closeNode.style.display = a ? "" : "none";
            a && (a = f.getLocalization("dijit", "common"), this.closeNode && d.set(this.closeNode, "title", a.itemClose))
        },
        _setDisabledAttr: function(a) {
            this.inherited(arguments);
            if (this.closeNode)
                if (a) d.remove(this.closeNode, "title");
                else {
                    var b = f.getLocalization("dijit", "common");
                    d.set(this.closeNode, "title", b.itemClose)
                }
        },
        _setLabelAttr: function(a) {
            this.inherited(arguments);
            this.showLabel || this.params.title || (this.iconNode.alt = l.trim(this.containerNode.innerText || this.containerNode.textContent || ""))
        }
    });
    g("dojo-bidi") && (c = b("dijit.layout._TabButton", c, {
        _setLabelAttr: function(a) {
            this.inherited(arguments);
            this.applyTextDir(this.iconNode, this.iconNode.alt)
        }
    }));
    b = b("dijit.layout.TabController", h, {
        baseClass: "dijitTabController",
        templateString: "\x3cdiv role\x3d'tablist' data-dojo-attach-event\x3d'onkeydown:onkeydown'\x3e\x3c/div\x3e",
        tabPosition: "top",
        buttonWidget: c,
        buttonWidgetCloseClass: "dijitTabCloseButton",
        postCreate: function() {
            this.inherited(arguments);
            var a = new n({
                id: this.id + "_Menu",
                ownerDocument: this.ownerDocument,
                dir: this.dir,
                lang: this.lang,
                textDir: this.textDir,
                targetNodeIds: [this.domNode],
                selector: function(a) {
                    return e.contains(a, "dijitClosable") && !e.contains(a, "dijitTabDisabled")
                }
            });
            this.own(a);
            var b = f.getLocalization("dijit", "common"),
                c = this;
            a.addChild(new p({
                label: b.itemClose,
                ownerDocument: this.ownerDocument,
                dir: this.dir,
                lang: this.lang,
                textDir: this.textDir,
                onClick: function(a) {
                    a = m.byNode(this.getParent().currentTarget);
                    c.onCloseButtonClick(a.page)
                }
            }))
        }
    });
    b.TabButton = c;
    return b
});