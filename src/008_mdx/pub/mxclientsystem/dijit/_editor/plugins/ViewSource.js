//>>built
define("dijit/_editor/plugins/ViewSource", "dojo/_base/array dojo/aspect dojo/_base/declare dojo/dom-attr dojo/dom-construct dojo/dom-geometry dojo/dom-style dojo/i18n dojo/keys dojo/_base/lang dojo/on dojo/sniff dojo/window ../../focus ../_Plugin ../../form/ToggleButton ../.. ../../registry dojo/i18n!../nls/commands".split(" "), function(m, x, y, n, p, h, f, z, q, d, r, t, u, v, e, A, B, C) {
    var l = y("dijit._editor.plugins.ViewSource", e, {
        stripScripts: !0,
        stripComments: !0,
        stripIFrames: !0,
        readOnly: !1,
        _fsPlugin: null,
        toggle: function() {
            t("webkit") &&
                (this._vsFocused = !0);
            this.button.set("checked", !this.button.get("checked"))
        },
        _initButton: function() {
            var a = z.getLocalization("dijit._editor", "commands"),
                b = this.editor;
            this.button = new A({
                label: a.viewSource,
                ownerDocument: b.ownerDocument,
                dir: b.dir,
                lang: b.lang,
                showLabel: !1,
                iconClass: this.iconClassPrefix + " " + this.iconClassPrefix + "ViewSource",
                tabIndex: "-1",
                onChange: d.hitch(this, "_showSource")
            });
            this.button.set("readOnly", !1)
        },
        setEditor: function(a) {
            this.editor = a;
            this._initButton();
            this.editor.addKeyHandler(q.F12,
                !0, !0, d.hitch(this, function(a) {
                    this.button.focus();
                    this.toggle();
                    a.stopPropagation();
                    a.preventDefault();
                    setTimeout(d.hitch(this, function() {
                        this.editor.focused && this.editor.focus()
                    }), 100)
                }))
        },
        _showSource: function(a) {
            var b = this.editor,
                w = b._plugins,
                c;
            this._sourceShown = a;
            var g = this;
            try {
                this.sourceArea || this._createSourceView();
                if (a) b._sourceQueryCommandEnabled = b.queryCommandEnabled, b.queryCommandEnabled = function(a) {
                        return "viewsource" === a.toLowerCase()
                    }, this.editor.onDisplayChanged(), c = b.get("value"),
                    c = this._filter(c), b.set("value", c), m.forEach(w, function(a) {
                        !a || a instanceof l || !a.isInstanceOf(e) || a.set("disabled", !0)
                    }), this._fsPlugin && (this._fsPlugin._getAltViewNode = function() {
                        return g.sourceArea
                    }), this.sourceArea.value = c, this.sourceArea.style.height = b.iframe.style.height, this.sourceArea.style.width = b.iframe.style.width, b.iframe.parentNode.style.position = "relative", f.set(b.iframe, {
                        position: "absolute",
                        top: 0,
                        visibility: "hidden"
                    }), f.set(this.sourceArea, {
                        display: "block"
                    }), this._resizeHandle = r(window,
                        "resize", d.hitch(this, function() {
                            var a = u.getBox(b.ownerDocument);
                            "_prevW" in this && "_prevH" in this && a.w === this._prevW && a.h === this._prevH || (this._prevW = a.w, this._prevH = a.h, this._resizer && (clearTimeout(this._resizer), delete this._resizer), this._resizer = setTimeout(d.hitch(this, function() {
                                delete this._resizer;
                                this._resize()
                            }), 10))
                        })), setTimeout(d.hitch(this, this._resize), 100), this.editor.onNormalizedDisplayChanged(), this.editor.__oldGetValue = this.editor.getValue, this.editor.getValue = d.hitch(this, function() {
                        var a =
                            this.sourceArea.value;
                        return a = this._filter(a)
                    }), this._setListener = x.after(this.editor, "setValue", d.hitch(this, function(a) {
                        a = this._filter(a || "");
                        this.sourceArea.value = a
                    }), !0);
                else {
                    if (!b._sourceQueryCommandEnabled) return;
                    this._setListener.remove();
                    delete this._setListener;
                    this._resizeHandle.remove();
                    delete this._resizeHandle;
                    this.editor.__oldGetValue && (this.editor.getValue = this.editor.__oldGetValue, delete this.editor.__oldGetValue);
                    b.queryCommandEnabled = b._sourceQueryCommandEnabled;
                    this._readOnly ||
                        (c = this.sourceArea.value, c = this._filter(c), b.beginEditing(), b.set("value", c), b.endEditing());
                    m.forEach(w, function(a) {
                        a && a.isInstanceOf(e) && a.set("disabled", !1)
                    });
                    f.set(this.sourceArea, "display", "none");
                    f.set(b.iframe, {
                        position: "relative",
                        visibility: "visible"
                    });
                    delete b._sourceQueryCommandEnabled;
                    this.editor.onDisplayChanged()
                }
                setTimeout(d.hitch(this, function() {
                    var a = b.domNode.parentNode;
                    a && (a = C.getEnclosingWidget(a)) && a.resize && a.resize();
                    b.resize()
                }), 300)
            } catch (k) {}
        },
        updateState: function() {
            this.button.set("disabled",
                this.get("disabled"))
        },
        _resize: function() {
            var a = this.editor,
                b = a.getHeaderHeight(),
                d = a.getFooterHeight(),
                c = h.position(a.domNode),
                g = h.getPadBorderExtents(a.iframe.parentNode),
                k = h.getMarginExtents(a.iframe.parentNode),
                f = h.getPadBorderExtents(a.domNode),
                e = c.w - f.w,
                c = c.h - (b + f.h + d);
            this._fsPlugin && this._fsPlugin.isFullscreen && (a = u.getBox(a.ownerDocument), e = a.w - f.w, c = a.h - (b + f.h + d));
            h.setMarginBox(this.sourceArea, {
                w: Math.round(e - (g.w + k.w)),
                h: Math.round(c - (g.h + k.h))
            })
        },
        _createSourceView: function() {
            var a = this.editor,
                b = a._plugins;
            this.sourceArea = p.create("textarea");
            this.readOnly && (n.set(this.sourceArea, "readOnly", !0), this._readOnly = !0);
            f.set(this.sourceArea, {
                padding: "0px",
                margin: "0px",
                borderWidth: "0px",
                borderStyle: "none"
            });
            n.set(this.sourceArea, "aria-label", this.editor.id);
            p.place(this.sourceArea, a.iframe, "before");
            t("ie") && a.iframe.parentNode.lastChild !== a.iframe && f.set(a.iframe.parentNode.lastChild, {
                width: "0px",
                height: "0px",
                padding: "0px",
                margin: "0px",
                borderWidth: "0px",
                borderStyle: "none"
            });
            a._viewsource_oldFocus =
                a.focus;
            var e = this;
            a.focus = function() {
                if (e._sourceShown) e.setSourceAreaCaret();
                else try {
                    this._vsFocused ? (delete this._vsFocused, v.focus(a.editNode)) : a._viewsource_oldFocus()
                } catch (k) {}
            };
            var c, g;
            for (c = 0; c < b.length; c++)
                if ((g = b[c]) && ("dijit._editor.plugins.FullScreen" === g.declaredClass || g.declaredClass === B._scopeName + "._editor.plugins.FullScreen")) {
                    this._fsPlugin = g;
                    break
                } this._fsPlugin && (this._fsPlugin._viewsource_getAltViewNode = this._fsPlugin._getAltViewNode, this._fsPlugin._getAltViewNode = function() {
                return e._sourceShown ?
                    e.sourceArea : this._viewsource_getAltViewNode()
            });
            this.own(r(this.sourceArea, "keydown", d.hitch(this, function(b) {
                this._sourceShown && b.keyCode == q.F12 && b.ctrlKey && b.shiftKey && (this.button.focus(), this.button.set("checked", !1), setTimeout(d.hitch(this, function() {
                    a.focus()
                }), 100), b.stopPropagation(), b.preventDefault())
            })))
        },
        _stripScripts: function(a) {
            a && (a = a.replace(/<\s*script[^>]*>((.|\s)*?)<\\?\/\s*script\s*>/ig, ""), a = a.replace(/<\s*script\b([^<>]|\s)*>?/ig, ""), a = a.replace(/<[^>]*=(\s|)*[("|')]javascript:[^$1][(\s|.)]*[$1][^>]*>/ig,
                ""));
            return a
        },
        _stripComments: function(a) {
            a && (a = a.replace(/\x3c!--(.|\s){1,}?--\x3e/g, ""));
            return a
        },
        _stripIFrames: function(a) {
            a && (a = a.replace(/<\s*iframe[^>]*>((.|\s)*?)<\\?\/\s*iframe\s*>/ig, ""));
            return a
        },
        _filter: function(a) {
            a && (this.stripScripts && (a = this._stripScripts(a)), this.stripComments && (a = this._stripComments(a)), this.stripIFrames && (a = this._stripIFrames(a)));
            return a
        },
        setSourceAreaCaret: function() {
            var a = this.sourceArea;
            v.focus(a);
            this._sourceShown && !this.readOnly && (a.setSelectionRange ? a.setSelectionRange(0,
                0) : this.sourceArea.createTextRange && (a = a.createTextRange(), a.collapse(!0), a.moveStart("character", -99999), a.moveStart("character", 0), a.moveEnd("character", 0), a.select()))
        },
        destroy: function() {
            this._resizer && (clearTimeout(this._resizer), delete this._resizer);
            this._resizeHandle && (this._resizeHandle.remove(), delete this._resizeHandle);
            this._setListener && (this._setListener.remove(), delete this._setListener);
            this.inherited(arguments)
        }
    });
    e.registry.viewSource = e.registry.viewsource = function(a) {
        return new l({
            readOnly: "readOnly" in
                a ? a.readOnly : !1,
            stripComments: "stripComments" in a ? a.stripComments : !0,
            stripScripts: "stripScripts" in a ? a.stripScripts : !0,
            stripIFrames: "stripIFrames" in a ? a.stripIFrames : !0
        })
    };
    return l
});