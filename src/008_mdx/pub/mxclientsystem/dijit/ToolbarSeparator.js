//>>built
define("dijit/ToolbarSeparator", ["dojo/_base/declare", "dojo/dom", "./_Widget", "./_TemplatedMixin"], function(a, b, c, d) {
    return a("dijit.ToolbarSeparator", [c, d], {
        templateString: '\x3cdiv class\x3d"dijitToolbarSeparator dijitInline" role\x3d"presentation"\x3e\x3c/div\x3e',
        buildRendering: function() {
            this.inherited(arguments);
            b.setSelectable(this.domNode, !1)
        },
        isFocusable: function() {
            return !1
        }
    })
});