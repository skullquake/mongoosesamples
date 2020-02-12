//>>built
define("dijit/form/TimeTextBox", ["dojo/_base/declare", "dojo/keys", "dojo/_base/lang", "../_TimePicker", "./_DateTimeTextBox"], function(b, f, c, d, e) {
    return b("dijit.form.TimeTextBox", e, {
        baseClass: "dijitTextBox dijitComboBox dijitTimeTextBox",
        popupClass: d,
        _selector: "time",
        value: new Date(""),
        maxHeight: -1,
        openDropDown: function(a) {
            this.inherited(arguments);
            this.dropDown.on("input", c.hitch(this, function() {
                this.set("value", this.dropDown.get("value"), !1)
            }))
        },
        _onInput: function() {
            this.inherited(arguments);
            var a =
                this.get("displayedValue");
            this.filterString = a && !this.parse(a, this.constraints) ? a.toLowerCase() : "";
            this._opened && this.closeDropDown();
            this.openDropDown()
        }
    })
});