//>>built
require({
    cache: {
        "url:dijit/templates/InlineEditBox.html": '\x3cspan data-dojo-attach-point\x3d"editNode" role\x3d"presentation" class\x3d"dijitReset dijitInline dijitOffScreen"\n\t\x3e\x3cspan data-dojo-attach-point\x3d"editorPlaceholder"\x3e\x3c/span\n\t\x3e\x3cspan data-dojo-attach-point\x3d"buttonContainer"\n\t\t\x3e\x3cbutton data-dojo-type\x3d"./form/Button" data-dojo-props\x3d"label: \'${buttonSave}\', \'class\': \'saveButton\'"\n\t\t\tdata-dojo-attach-point\x3d"saveButton" data-dojo-attach-event\x3d"onClick:save"\x3e\x3c/button\n\t\t\x3e\x3cbutton data-dojo-type\x3d"./form/Button"  data-dojo-props\x3d"label: \'${buttonCancel}\', \'class\': \'cancelButton\'"\n\t\t\tdata-dojo-attach-point\x3d"cancelButton" data-dojo-attach-event\x3d"onClick:cancel"\x3e\x3c/button\n\t\x3e\x3c/span\n\x3e\x3c/span\x3e\n'
    }
});
define("dijit/InlineEditBox", "require dojo/_base/array dojo/aspect dojo/_base/declare dojo/dom-attr dojo/dom-class dojo/dom-construct dojo/dom-style dojo/i18n dojo/_base/kernel dojo/keys dojo/_base/lang dojo/on dojo/sniff dojo/when ./a11yclick ./focus ./_Widget ./_TemplatedMixin ./_WidgetsInTemplateMixin ./_Container ./form/Button ./form/_TextBoxMixin ./form/TextBox dojo/text!./templates/InlineEditBox.html dojo/i18n!./nls/common".split(" "), function(t, l, u, m, n, e, v, g, x, p, w, c, f, q, y, z, r, b, h, A, E, F, B, C,
    D) {
    h = m("dijit._InlineEditor", [b, h, A], {
        templateString: D,
        contextRequire: t,
        postMixInProperties: function() {
            this.inherited(arguments);
            this.messages = x.getLocalization("dijit", "common", this.lang);
            l.forEach(["buttonSave", "buttonCancel"], function(a) {
                this[a] || (this[a] = this.messages[a])
            }, this)
        },
        buildRendering: function() {
            this.inherited(arguments);
            var a = "string" == typeof this.editor ? c.getObject(this.editor) || t(this.editor) : this.editor,
                d = this.sourceStyle,
                k = "line-height:" + d.lineHeight + ";",
                e = g.getComputedStyle(this.domNode);
            l.forEach(["Weight", "Family", "Size", "Style"], function(a) {
                e["font" + a] != d["font" + a] && (k += "font-" + a + ":" + d["font" + a] + ";")
            }, this);
            l.forEach("marginTop marginBottom marginLeft marginRight position left top right bottom float clear display".split(" "), function(a) {
                this.domNode.style[a] = d[a]
            }, this);
            var b = this.inlineEditBox.width;
            "100%" == b ? (k += "width:100%;", this.domNode.style.display = "block") : k += "width:" + (b + (Number(b) == b ? "px" : "")) + ";";
            b = c.delegate(this.inlineEditBox.editorParams, {
                style: k,
                dir: this.dir,
                lang: this.lang,
                textDir: this.textDir
            });
            this.editWidget = new a(b, this.editorPlaceholder);
            this.inlineEditBox.autoSave && (this.saveButton.destroy(), this.cancelButton.destroy(), this.saveButton = this.cancelButton = null, v.destroy(this.buttonContainer))
        },
        postCreate: function() {
            this.inherited(arguments);
            var a = this.editWidget;
            this.inlineEditBox.autoSave ? this.own(u.after(a, "onChange", c.hitch(this, "_onChange"), !0), f(a, "keydown", c.hitch(this, "_onKeyDown"))) : "intermediateChanges" in a && (a.set("intermediateChanges", !0), this.own(u.after(a,
                "onChange", c.hitch(this, "_onIntermediateChange"), !0)), this.saveButton.set("disabled", !0))
        },
        startup: function() {
            this.editWidget.startup();
            this.inherited(arguments)
        },
        _onIntermediateChange: function() {
            this.saveButton.set("disabled", this.getValue() == this._resetValue || !this.enableSave())
        },
        destroy: function() {
            this.editWidget.destroy(!0);
            this.inherited(arguments)
        },
        getValue: function() {
            var a = this.editWidget;
            return String(a.get("displayedValue" in a || "_getDisplayedValueAttr" in a ? "displayedValue" : "value"))
        },
        _onKeyDown: function(a) {
            this.inlineEditBox.autoSave &&
                this.inlineEditBox.editing && !a.altKey && !a.ctrlKey && (a.keyCode == w.ESCAPE ? (a.stopPropagation(), a.preventDefault(), this.cancel(!0)) : a.keyCode == w.ENTER && "INPUT" == a.target.tagName && (a.stopPropagation(), a.preventDefault(), this._onChange()))
        },
        _onBlur: function() {
            this.inherited(arguments);
            this.inlineEditBox.autoSave && this.inlineEditBox.editing && (this.getValue() == this._resetValue ? this.cancel(!1) : this.enableSave() && this.save(!1))
        },
        _onChange: function() {
            this.inlineEditBox.autoSave && this.inlineEditBox.editing &&
                this.enableSave() && r.focus(this.inlineEditBox.displayNode)
        },
        enableSave: function() {
            return this.editWidget.isValid ? this.editWidget.isValid() : !0
        },
        focus: function() {
            this.editWidget.focus();
            this.editWidget.focusNode && (r._onFocusNode(this.editWidget.focusNode), "INPUT" == this.editWidget.focusNode.tagName && this.defer(function() {
                B.selectInputText(this.editWidget.focusNode)
            }))
        }
    });
    b = m("dijit.InlineEditBox" + (q("dojo-bidi") ? "_NoBidi" : ""), b, {
        editing: !1,
        autoSave: !0,
        buttonSave: "",
        buttonCancel: "",
        renderAsHtml: !1,
        editor: C,
        editorWrapper: h,
        editorParams: {},
        disabled: !1,
        onChange: function() {},
        onCancel: function() {},
        width: "100%",
        value: "",
        noValueIndicator: 6 >= q("ie") ? "\x3cspan style\x3d'font-family: wingdings; text-decoration: underline;'\x3e\x26#160;\x26#160;\x26#160;\x26#160;\x26#x270d;\x26#160;\x26#160;\x26#160;\x26#160;\x3c/span\x3e" : "\x3cspan style\x3d'text-decoration: underline;'\x3e\x26#160;\x26#160;\x26#160;\x26#160;\x26#x270d;\x26#160;\x26#160;\x26#160;\x26#160;\x3c/span\x3e",
        constructor: function() {
            this.editorParams = {}
        },
        postMixInProperties: function() {
            this.inherited(arguments);
            this.displayNode = this.srcNodeRef;
            this.own(f(this.displayNode, z, c.hitch(this, "_onClick")), f(this.displayNode, "mouseover, focus", c.hitch(this, "_onMouseOver")), f(this.displayNode, "mouseout, blur", c.hitch(this, "_onMouseOut")));
            this.displayNode.setAttribute("role", "button");
            this.displayNode.getAttribute("tabIndex") || this.displayNode.setAttribute("tabIndex", 0);
            this.value || "value" in this.params || (this.value = c.trim(this.renderAsHtml ? this.displayNode.innerHTML :
                this.displayNode.innerText || this.displayNode.textContent || ""));
            this.value || (this.displayNode.innerHTML = this.noValueIndicator);
            e.add(this.displayNode, "dijitInlineEditBoxDisplayMode")
        },
        setDisabled: function(a) {
            p.deprecated("dijit.InlineEditBox.setDisabled() is deprecated.  Use set('disabled', bool) instead.", "", "2.0");
            this.set("disabled", a)
        },
        _setDisabledAttr: function(a) {
            this.domNode.setAttribute("aria-disabled", a ? "true" : "false");
            a ? this.displayNode.removeAttribute("tabIndex") : this.displayNode.setAttribute("tabIndex",
                0);
            e.toggle(this.displayNode, "dijitInlineEditBoxDisplayModeDisabled", a);
            this._set("disabled", a)
        },
        _onMouseOver: function() {
            this.disabled || e.add(this.displayNode, "dijitInlineEditBoxDisplayModeHover")
        },
        _onMouseOut: function() {
            e.remove(this.displayNode, "dijitInlineEditBoxDisplayModeHover")
        },
        _onClick: function(a) {
            this.disabled || (a && (a.stopPropagation(), a.preventDefault()), this._onMouseOut(), this.defer("edit"))
        },
        edit: function() {
            if (!this.disabled && !this.editing) {
                this._set("editing", !0);
                this._savedTabIndex =
                    n.get(this.displayNode, "tabIndex") || "0";
                if (!this.wrapperWidget) {
                    var a = v.create("span", null, this.domNode, "before");
                    this.wrapperWidget = new("string" == typeof this.editorWrapper ? c.getObject(this.editorWrapper) : this.editorWrapper)({
                        value: this.value,
                        buttonSave: this.buttonSave,
                        buttonCancel: this.buttonCancel,
                        dir: this.dir,
                        lang: this.lang,
                        tabIndex: this._savedTabIndex,
                        editor: this.editor,
                        inlineEditBox: this,
                        sourceStyle: g.getComputedStyle(this.displayNode),
                        save: c.hitch(this, "save"),
                        cancel: c.hitch(this, "cancel"),
                        textDir: this.textDir
                    }, a);
                    this.wrapperWidget._started || this.wrapperWidget.startup();
                    this._started || this.startup()
                }
                var d = this.wrapperWidget;
                e.add(this.displayNode, "dijitOffScreen");
                e.remove(d.domNode, "dijitOffScreen");
                g.set(d.domNode, {
                    visibility: "visible"
                });
                n.set(this.displayNode, "tabIndex", "-1");
                var b = d.editWidget,
                    f = this;
                y(b.onLoadDeferred, c.hitch(d, function() {
                    b.set("displayedValue" in b || "_setDisplayedValueAttr" in b ? "displayedValue" : "value", f.value);
                    this.defer(function() {
                        d.saveButton && d.saveButton.set("disabled",
                            "intermediateChanges" in b);
                        this.focus();
                        this._resetValue = this.getValue()
                    })
                }))
            }
        },
        _onBlur: function() {
            this.inherited(arguments)
        },
        destroy: function() {
            this.wrapperWidget && !this.wrapperWidget._destroyed && (this.wrapperWidget.destroy(), delete this.wrapperWidget);
            this.inherited(arguments)
        },
        _showText: function(a) {
            var b = this.wrapperWidget;
            g.set(b.domNode, {
                visibility: "hidden"
            });
            e.add(b.domNode, "dijitOffScreen");
            e.remove(this.displayNode, "dijitOffScreen");
            n.set(this.displayNode, "tabIndex", this._savedTabIndex);
            a &&
                r.focus(this.displayNode)
        },
        save: function(a) {
            if (!this.disabled && this.editing) {
                this._set("editing", !1);
                var b = this.wrapperWidget.getValue();
                this.set("value", b);
                this._showText(a)
            }
        },
        setValue: function(a) {
            p.deprecated("dijit.InlineEditBox.setValue() is deprecated.  Use set('value', ...) instead.", "", "2.0");
            return this.set("value", a)
        },
        _setValueAttr: function(a) {
            a = c.trim(a);
            var b = this.renderAsHtml ? a : a.replace(/&/gm, "\x26amp;").replace(/</gm, "\x26lt;").replace(/>/gm, "\x26gt;").replace(/"/gm, "\x26quot;").replace(/\n/g,
                "\x3cbr\x3e");
            this.displayNode.innerHTML = this.editorParams && "password" === this.editorParams.type ? "********" : b || this.noValueIndicator;
            this._set("value", a);
            this._started && this.defer(function() {
                this.onChange(a)
            })
        },
        getValue: function() {
            p.deprecated("dijit.InlineEditBox.getValue() is deprecated.  Use get('value') instead.", "", "2.0");
            return this.get("value")
        },
        cancel: function(a) {
            !this.disabled && this.editing && (this._set("editing", !1), this.defer("onCancel"), this._showText(a))
        }
    });
    q("dojo-bidi") && (b = m("dijit.InlineEditBox",
        b, {
            _setValueAttr: function() {
                this.inherited(arguments);
                this.applyTextDir(this.displayNode)
            }
        }));
    b._InlineEditor = h;
    return b
});