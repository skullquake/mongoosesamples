//>>built
require({
    cache: {
        "url:dijit/layout/templates/TabContainer.html": '\x3cdiv class\x3d"dijitTabContainer"\x3e\n\t\x3cdiv class\x3d"dijitTabListWrapper" data-dojo-attach-point\x3d"tablistNode"\x3e\x3c/div\x3e\n\t\x3cdiv data-dojo-attach-point\x3d"tablistSpacer" class\x3d"dijitTabSpacer ${baseClass}-spacer"\x3e\x3c/div\x3e\n\t\x3cdiv class\x3d"dijitTabPaneWrapper ${baseClass}-container" data-dojo-attach-point\x3d"containerNode"\x3e\x3c/div\x3e\n\x3c/div\x3e\n'
    }
});
define("dijit/layout/_TabContainerBase", "dojo/_base/declare dojo/dom-class dojo/dom-geometry dojo/dom-style ./StackContainer ./utils ../_TemplatedMixin dojo/text!./templates/TabContainer.html".split(" "), function(c, a, e, f, g, d, h, k) {
    return c("dijit.layout._TabContainerBase", [g, h], {
        tabPosition: "top",
        baseClass: "dijitTabContainer",
        tabStrip: !1,
        nested: !1,
        templateString: k,
        postMixInProperties: function() {
            this.baseClass += this.tabPosition.charAt(0).toUpperCase() + this.tabPosition.substr(1).replace(/-.*/, "");
            this.srcNodeRef &&
                f.set(this.srcNodeRef, "visibility", "hidden");
            this.inherited(arguments)
        },
        buildRendering: function() {
            this.inherited(arguments);
            this.tablist = this._makeController(this.tablistNode);
            this.doLayout || a.add(this.domNode, "dijitTabContainerNoLayout");
            this.nested ? (a.add(this.domNode, "dijitTabContainerNested"), a.add(this.tablist.containerNode, "dijitTabContainerTabListNested"), a.add(this.tablistSpacer, "dijitTabContainerSpacerNested"), a.add(this.containerNode, "dijitTabPaneWrapperNested")) : a.add(this.domNode, "tabStrip-" +
                (this.tabStrip ? "enabled" : "disabled"))
        },
        _setupChild: function(b) {
            a.add(b.domNode, "dijitTabPane");
            this.inherited(arguments)
        },
        removeChild: function(b) {
            a.remove(b.domNode, "dijitTabPane");
            this.inherited(arguments)
        },
        startup: function() {
            this._started || (this.tablist.startup(), this.inherited(arguments))
        },
        layout: function() {
            if (this._contentBox && "undefined" != typeof this._contentBox.l) {
                var b = this.selectedChildWidget;
                if (this.doLayout) {
                    var a = this.tabPosition.replace(/-h/, "");
                    this.tablist.region = a;
                    a = [this.tablist, {
                        domNode: this.tablistSpacer,
                        region: a
                    }, {
                        domNode: this.containerNode,
                        region: "center"
                    }];
                    d.layoutChildren(this.domNode, this._contentBox, a);
                    this._containerContentBox = d.marginBox2contentBox(this.containerNode, a[2]);
                    b && b.resize && b.resize(this._containerContentBox)
                } else {
                    if (this.tablist.resize) {
                        a = this.tablist.domNode.style;
                        a.width = "0";
                        var c = e.getContentBox(this.domNode).w;
                        a.width = "";
                        this.tablist.resize({
                            w: c
                        })
                    }
                    b && b.resize && b.resize()
                }
            }
        },
        destroy: function(a) {
            this.tablist && this.tablist.destroy(a);
            this.inherited(arguments)
        }
    })
});