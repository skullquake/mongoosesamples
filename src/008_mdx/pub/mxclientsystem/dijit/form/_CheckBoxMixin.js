//>>built
define("dijit/form/_CheckBoxMixin", ["dojo/_base/declare", "dojo/dom-attr"], function(c, b) {
    return c("dijit.form._CheckBoxMixin", null, {
        type: "checkbox",
        value: "on",
        readOnly: !1,
        _aria_attr: "aria-checked",
        _setReadOnlyAttr: function(a) {
            this._set("readOnly", a);
            b.set(this.focusNode, "readOnly", a)
        },
        _setLabelAttr: void 0,
        _getSubmitValue: function(a) {
            return null == a || "" === a ? "on" : a
        },
        _setValueAttr: function(a) {
            a = this._getSubmitValue(a);
            this._set("value", a);
            b.set(this.focusNode, "value", a)
        },
        reset: function() {
            this.inherited(arguments);
            this._set("value", this._getSubmitValue(this.params.value));
            b.set(this.focusNode, "value", this.value)
        },
        _onClick: function(a) {
            return this.readOnly ? (a.stopPropagation(), a.preventDefault(), !1) : this.inherited(arguments)
        }
    })
});