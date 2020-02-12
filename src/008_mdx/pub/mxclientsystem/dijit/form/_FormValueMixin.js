//>>built
define("dijit/form/_FormValueMixin", "dojo/_base/declare dojo/dom-attr dojo/keys dojo/_base/lang dojo/on ./_FormWidgetMixin".split(" "), function(c, d, f, g, h, e) {
    return c("dijit.form._FormValueMixin", e, {
        readOnly: !1,
        _setReadOnlyAttr: function(a) {
            d.set(this.focusNode, "readOnly", a);
            this._set("readOnly", a)
        },
        postCreate: function() {
            this.inherited(arguments);
            void 0 === this._resetValue && (this._lastValueReported = this._resetValue = this.value)
        },
        _setValueAttr: function(a, b) {
            this._handleOnChange(a, b)
        },
        _handleOnChange: function(a,
            b) {
            this._set("value", a);
            this.inherited(arguments)
        },
        undo: function() {
            this._setValueAttr(this._lastValueReported, !1)
        },
        reset: function() {
            this._hasBeenBlurred = !1;
            this._setValueAttr(this._resetValue, !0)
        }
    })
});