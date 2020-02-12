//>>built
define("dijit/_editor/plugins/ToggleDir", "dojo/_base/declare dojo/dom-style dojo/_base/kernel dojo/_base/lang dojo/on ../_Plugin ../../form/ToggleButton".split(" "), function(c, g, h, e, k, a, f) {
    var b = c("dijit._editor.plugins.ToggleDir", a, {
        useDefaultCommand: !1,
        command: "toggleDir",
        buttonClass: f,
        _initButton: function() {
            function a(a) {
                b.set("checked", a && a !== c, !1)
            }
            this.inherited(arguments);
            var b = this.button,
                d = this.editor.isLeftToRight();
            this.own(this.button.on("change", e.hitch(this, function(a) {
                this.editor.set("textDir",
                    d ^ a ? "ltr" : "rtl")
            })));
            var c = d ? "ltr" : "rtl";
            a(this.editor.get("textDir"));
            this.editor.watch("textDir", function(b, c, d) {
                a(d)
            })
        },
        updateState: function() {
            this.button.set("disabled", this.get("disabled"))
        }
    });
    a.registry.toggleDir = function() {
        return new b({
            command: "toggleDir"
        })
    };
    return b
});