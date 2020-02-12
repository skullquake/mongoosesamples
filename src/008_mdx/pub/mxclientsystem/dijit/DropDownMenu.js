//>>built
require({
    cache: {
        "url:dijit/templates/Menu.html": '\x3ctable class\x3d"dijit dijitMenu dijitMenuPassive dijitReset dijitMenuTable" role\x3d"menu" tabIndex\x3d"${tabIndex}"\n\t   cellspacing\x3d"0"\x3e\n\t\x3ctbody class\x3d"dijitReset" data-dojo-attach-point\x3d"containerNode"\x3e\x3c/tbody\x3e\n\x3c/table\x3e\n'
    }
});
define("dijit/DropDownMenu", ["dojo/_base/declare", "dojo/keys", "dojo/text!./templates/Menu.html", "./_MenuBase"], function(b, e, c, d) {
    return b("dijit.DropDownMenu", d, {
        templateString: c,
        baseClass: "dijitMenu",
        _onUpArrow: function() {
            this.focusPrev()
        },
        _onDownArrow: function() {
            this.focusNext()
        },
        _onRightArrow: function(a) {
            this._moveToPopup(a);
            a.stopPropagation();
            a.preventDefault()
        },
        _onLeftArrow: function(a) {
            if (this.parentMenu)
                if (this.parentMenu._isMenuBar) this.parentMenu.focusPrev();
                else this.onCancel(!1);
            else a.stopPropagation(),
                a.preventDefault()
        }
    })
});