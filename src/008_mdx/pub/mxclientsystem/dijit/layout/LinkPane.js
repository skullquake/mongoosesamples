//>>built
define("dijit/layout/LinkPane", ["./ContentPane", "../_TemplatedMixin", "dojo/_base/declare"], function(a, b, c) {
    return c("dijit.layout.LinkPane", [a, b], {
        templateString: '\x3cdiv class\x3d"dijitLinkPane" data-dojo-attach-point\x3d"containerNode"\x3e\x3c/div\x3e',
        postMixInProperties: function() {
            this.srcNodeRef && (this.title += this.srcNodeRef.innerHTML);
            this.inherited(arguments)
        },
        _fillContent: function() {}
    })
});