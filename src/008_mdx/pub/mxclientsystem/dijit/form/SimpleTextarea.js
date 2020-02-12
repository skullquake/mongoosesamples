//>>built
define("dijit/form/SimpleTextarea", ["dojo/_base/declare", "dojo/dom-class", "dojo/sniff", "./TextBox"], function(h, k, g, l) {
    return h("dijit.form.SimpleTextarea", l, {
        baseClass: "dijitTextBox dijitTextArea",
        rows: "3",
        cols: "20",
        templateString: "\x3ctextarea ${!nameAttrSetting} data-dojo-attach-point\x3d'focusNode,containerNode,textbox' autocomplete\x3d'off'\x3e\x3c/textarea\x3e",
        postMixInProperties: function() {
            !this.value && this.srcNodeRef && (this.value = this.srcNodeRef.value);
            this.inherited(arguments)
        },
        buildRendering: function() {
            this.inherited(arguments);
            g("ie") && this.cols && k.add(this.textbox, "dijitTextAreaCols")
        },
        filter: function(d) {
            d && (d = d.replace(/\r/g, ""));
            return this.inherited(arguments)
        },
        _onInput: function(d) {
            if (this.maxLength) {
                var a = parseInt(this.maxLength),
                    b = this.textbox.value.replace(/\r/g, ""),
                    a = b.length - a;
                if (0 < a) {
                    var e = this.textbox;
                    if (e.selectionStart) {
                        var c = e.selectionStart,
                            f = 0;
                        g("opera") && (f = (this.textbox.value.substring(0, c).match(/\r/g) || []).length);
                        this.textbox.value = b.substring(0, c - a - f) + b.substring(c - f);
                        e.setSelectionRange(c - a, c - a)
                    } else this.ownerDocument.selection &&
                        (e.focus(), b = this.ownerDocument.selection.createRange(), b.moveStart("character", -a), b.text = "", b.select())
                }
            }
            this.inherited(arguments)
        }
    })
});