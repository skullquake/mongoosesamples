//>>built
define("dijit/_editor/plugins/NewPage", "dojo/_base/declare dojo/i18n dojo/_base/lang ../_Plugin ../../form/Button dojo/i18n!../nls/commands".split(" "), function(c, d, e, a, f) {
    var b = c("dijit._editor.plugins.NewPage", a, {
        content: "\x3cbr\x3e",
        _initButton: function() {
            var g = d.getLocalization("dijit._editor", "commands"),
                a = this.editor;
            this.button = new f({
                label: g.newPage,
                ownerDocument: a.ownerDocument,
                dir: a.dir,
                lang: a.lang,
                showLabel: !1,
                iconClass: this.iconClassPrefix + " " + this.iconClassPrefix + "NewPage",
                tabIndex: "-1",
                onClick: e.hitch(this, "_newPage")
            })
        },
        setEditor: function(a) {
            this.editor = a;
            this._initButton()
        },
        updateState: function() {
            this.button.set("disabled", this.get("disabled"))
        },
        _newPage: function() {
            this.editor.beginEditing();
            this.editor.set("value", this.content);
            this.editor.endEditing();
            this.editor.focus()
        }
    });
    a.registry.newPage = a.registry.newpage = function(a) {
        return new b({
            content: "content" in a ? a.content : "\x3cbr\x3e"
        })
    };
    return b
});