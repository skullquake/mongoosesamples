//>>built
require({
    cache: {
        "url:dijit/layout/templates/ScrollingTabController.html": '\x3cdiv class\x3d"dijitTabListContainer-${tabPosition}" style\x3d"visibility:hidden"\x3e\n\t\x3cdiv data-dojo-type\x3d"dijit.layout._ScrollingTabControllerMenuButton"\n\t\t class\x3d"tabStripButton-${tabPosition}"\n\t\t id\x3d"${id}_menuBtn"\n\t\t data-dojo-props\x3d"containerId: \'${containerId}\', iconClass: \'dijitTabStripMenuIcon\',\n\t\t\t\t\tdropDownPosition: [\'below-alt\', \'above-alt\']"\n\t\t data-dojo-attach-point\x3d"_menuBtn" showLabel\x3d"false" title\x3d""\x3e\x26#9660;\x3c/div\x3e\n\t\x3cdiv data-dojo-type\x3d"dijit.layout._ScrollingTabControllerButton"\n\t\t class\x3d"tabStripButton-${tabPosition}"\n\t\t id\x3d"${id}_leftBtn"\n\t\t data-dojo-props\x3d"iconClass:\'dijitTabStripSlideLeftIcon\', showLabel:false, title:\'\'"\n\t\t data-dojo-attach-point\x3d"_leftBtn" data-dojo-attach-event\x3d"onClick: doSlideLeft"\x3e\x26#9664;\x3c/div\x3e\n\t\x3cdiv data-dojo-type\x3d"dijit.layout._ScrollingTabControllerButton"\n\t\t class\x3d"tabStripButton-${tabPosition}"\n\t\t id\x3d"${id}_rightBtn"\n\t\t data-dojo-props\x3d"iconClass:\'dijitTabStripSlideRightIcon\', showLabel:false, title:\'\'"\n\t\t data-dojo-attach-point\x3d"_rightBtn" data-dojo-attach-event\x3d"onClick: doSlideRight"\x3e\x26#9654;\x3c/div\x3e\n\t\x3cdiv class\x3d\'dijitTabListWrapper\' data-dojo-attach-point\x3d\'tablistWrapper\'\x3e\n\t\t\x3cdiv role\x3d\'tablist\' data-dojo-attach-event\x3d\'onkeydown:onkeydown\'\n\t\t\t data-dojo-attach-point\x3d\'containerNode\' class\x3d\'nowrapTabStrip\'\x3e\x3c/div\x3e\n\t\x3c/div\x3e\n\x3c/div\x3e',
        "url:dijit/layout/templates/_ScrollingTabControllerButton.html": '\x3cdiv data-dojo-attach-event\x3d"ondijitclick:_onClick" class\x3d"dijitTabInnerDiv dijitTabContent dijitButtonContents"  data-dojo-attach-point\x3d"focusNode" role\x3d"button"\x3e\n\t\x3cspan role\x3d"presentation" class\x3d"dijitInline dijitTabStripIcon" data-dojo-attach-point\x3d"iconNode"\x3e\x3c/span\x3e\n\t\x3cspan data-dojo-attach-point\x3d"containerNode,titleNode" class\x3d"dijitButtonText"\x3e\x3c/span\x3e\n\x3c/div\x3e'
    }
});
define("dijit/layout/ScrollingTabController", "dojo/_base/array dojo/_base/declare dojo/dom-class dojo/dom-geometry dojo/dom-style dojo/_base/fx dojo/_base/lang dojo/on dojo/query dojo/sniff ../registry dojo/text!./templates/ScrollingTabController.html dojo/text!./templates/_ScrollingTabControllerButton.html ./TabController ./utils ../_WidgetsInTemplateMixin ../Menu ../MenuItem ../form/Button ../_HasDropDown dojo/NodeList-dom ../a11yclick".split(" "), function(r, g, h, m, c, n, t, u, v, d, w, l, k, x, p, y, z, A, q,
    B) {
    l = g("dijit.layout.ScrollingTabController", [x, y], {
        baseClass: "dijitTabController dijitScrollingTabController",
        templateString: l,
        useMenu: !0,
        useSlider: !0,
        tabStripClass: "",
        _minScroll: 5,
        _setClassAttr: {
            node: "containerNode",
            type: "class"
        },
        buildRendering: function() {
            this.inherited(arguments);
            var a = this.domNode;
            this.scrollNode = this.tablistWrapper;
            this._initButtons();
            this.tabStripClass || (this.tabStripClass = "dijitTabContainer" + this.tabPosition.charAt(0).toUpperCase() + this.tabPosition.substr(1).replace(/-.*/,
                "") + "None", h.add(a, "tabStrip-disabled"));
            h.add(this.tablistWrapper, this.tabStripClass)
        },
        onStartup: function() {
            this.inherited(arguments);
            c.set(this.domNode, "visibility", "");
            this._postStartup = !0;
            this.own(u(this.containerNode, "attrmodified-label, attrmodified-iconclass", t.hitch(this, function(a) {
                this._dim && this.resize(this._dim)
            })))
        },
        onAddChild: function(a, b) {
            this.inherited(arguments);
            c.set(this.containerNode, "width", c.get(this.containerNode, "width") + 200 + "px")
        },
        onRemoveChild: function(a, b) {
            var e = this.pane2button(a.id);
            this._selectedTab === e.domNode && (this._selectedTab = null);
            this.inherited(arguments)
        },
        _initButtons: function() {
            this._btnWidth = 0;
            this._buttons = v("\x3e .tabStripButton", this.domNode).filter(function(a) {
                if (this.useMenu && a == this._menuBtn.domNode || this.useSlider && (a == this._rightBtn.domNode || a == this._leftBtn.domNode)) return this._btnWidth += m.getMarginSize(a).w, !0;
                c.set(a, "display", "none");
                return !1
            }, this)
        },
        _getTabsWidth: function() {
            var a = this.getChildren();
            if (a.length) {
                var b = a[this.isLeftToRight() ? 0 : a.length -
                        1].domNode,
                    a = a[this.isLeftToRight() ? a.length - 1 : 0].domNode;
                return a.offsetLeft + a.offsetWidth - b.offsetLeft
            }
            return 0
        },
        _enableBtn: function(a) {
            var b = this._getTabsWidth();
            a = a || c.get(this.scrollNode, "width");
            return 0 < b && a < b
        },
        resize: function(a) {
            this._dim = a;
            this.scrollNode.style.height = "auto";
            var b = this._contentBox = p.marginBox2contentBox(this.domNode, {
                h: 0,
                w: a.w
            });
            b.h = this.scrollNode.offsetHeight;
            m.setContentSize(this.domNode, b);
            b = this._enableBtn(this._contentBox.w);
            this._buttons.style("display", b ? "" : "none");
            this._leftBtn.region = "left";
            this._rightBtn.region = "right";
            this._menuBtn.region = this.isLeftToRight() ? "right" : "left";
            p.layoutChildren(this.domNode, this._contentBox, [this._menuBtn, this._leftBtn, this._rightBtn, {
                domNode: this.scrollNode,
                region: "center"
            }]);
            this._selectedTab && (this._anim && "playing" == this._anim.status() && this._anim.stop(), this.scrollNode.scrollLeft = this._convertToScrollLeft(this._getScrollForSelectedTab()));
            this._setButtonClass(this._getScroll());
            this._postResize = !0;
            return {
                h: this._contentBox.h,
                w: a.w
            }
        },
        _getScroll: function() {
            return this.isLeftToRight() || 8 > d("ie") || d("trident") && d("quirks") || d("webkit") ? this.scrollNode.scrollLeft : c.get(this.containerNode, "width") - c.get(this.scrollNode, "width") + (d("trident") || d("edge") ? -1 : 1) * this.scrollNode.scrollLeft
        },
        _convertToScrollLeft: function(a) {
            if (this.isLeftToRight() || 8 > d("ie") || d("trident") && d("quirks") || d("webkit")) return a;
            var b = c.get(this.containerNode, "width") - c.get(this.scrollNode, "width");
            return (d("trident") || d("edge") ? -1 : 1) * (a - b)
        },
        onSelectChild: function(a,
            b) {
            var e = this.pane2button(a.id);
            if (e) {
                var f = e.domNode;
                if (f != this._selectedTab && (this._selectedTab = f, this._postResize)) {
                    var d = this._getScroll();
                    d > f.offsetLeft || d + c.get(this.scrollNode, "width") < f.offsetLeft + c.get(f, "width") ? (f = this.createSmoothScroll(), b && (f.onEnd = function() {
                        e.focus()
                    }), f.play()) : b && e.focus()
                }
                this.inherited(arguments)
            }
        },
        _getScrollBounds: function() {
            var a = this.getChildren(),
                b = c.get(this.scrollNode, "width"),
                e = c.get(this.containerNode, "width") - b,
                d = this._getTabsWidth();
            if (a.length && d > b) return {
                min: this.isLeftToRight() ?
                    0 : a[a.length - 1].domNode.offsetLeft,
                max: this.isLeftToRight() ? a[a.length - 1].domNode.offsetLeft + a[a.length - 1].domNode.offsetWidth - b : e
            };
            a = this.isLeftToRight() ? 0 : e;
            return {
                min: a,
                max: a
            }
        },
        _getScrollForSelectedTab: function() {
            var a = this._selectedTab,
                b = c.get(this.scrollNode, "width"),
                e = this._getScrollBounds(),
                a = a.offsetLeft + c.get(a, "width") / 2 - b / 2;
            return a = Math.min(Math.max(a, e.min), e.max)
        },
        createSmoothScroll: function(a) {
            if (0 < arguments.length) {
                var b = this._getScrollBounds();
                a = Math.min(Math.max(a, b.min), b.max)
            } else a =
                this._getScrollForSelectedTab();
            this._anim && "playing" == this._anim.status() && this._anim.stop();
            var e = this,
                d = this.scrollNode,
                c = new n.Animation({
                    beforeBegin: function() {
                        this.curve && delete this.curve;
                        var b = d.scrollLeft,
                            f = e._convertToScrollLeft(a);
                        c.curve = new n._Line(b, f)
                    },
                    onAnimate: function(a) {
                        d.scrollLeft = a
                    }
                });
            this._anim = c;
            this._setButtonClass(a);
            return c
        },
        _getBtnNode: function(a) {
            for (a = a.target; a && !h.contains(a, "tabStripButton");) a = a.parentNode;
            return a
        },
        doSlideRight: function(a) {
            this.doSlide(1, this._getBtnNode(a))
        },
        doSlideLeft: function(a) {
            this.doSlide(-1, this._getBtnNode(a))
        },
        doSlide: function(a, b) {
            if (!b || !h.contains(b, "dijitTabDisabled")) {
                var e = .75 * c.get(this.scrollNode, "width") * a,
                    e = this._getScroll() + e;
                this._setButtonClass(e);
                this.createSmoothScroll(e).play()
            }
        },
        _setButtonClass: function(a) {
            var b = this._getScrollBounds();
            this._leftBtn.set("disabled", a <= b.min);
            this._rightBtn.set("disabled", a >= b.max)
        }
    });
    k = g("dijit.layout._ScrollingTabControllerButtonMixin", null, {
        baseClass: "dijitTab tabStripButton",
        templateString: k,
        tabIndex: "",
        isFocusable: function() {
            return !1
        }
    });
    g("dijit.layout._ScrollingTabControllerButton", [q, k]);
    g("dijit.layout._ScrollingTabControllerMenuButton", [q, B, k], {
        containerId: "",
        tabIndex: "-1",
        isLoaded: function() {
            return !1
        },
        loadDropDown: function(a) {
            this.dropDown = new z({
                id: this.containerId + "_menu",
                ownerDocument: this.ownerDocument,
                dir: this.dir,
                lang: this.lang,
                textDir: this.textDir
            });
            var b = w.byId(this.containerId);
            r.forEach(b.getChildren(), function(a) {
                var c = new A({
                    id: a.id + "_stcMi",
                    label: a.title,
                    iconClass: a.iconClass,
                    disabled: a.disabled,
                    ownerDocument: this.ownerDocument,
                    dir: a.dir,
                    lang: a.lang,
                    textDir: a.textDir || b.textDir,
                    onClick: function() {
                        b.selectChild(a)
                    }
                });
                this.dropDown.addChild(c)
            }, this);
            a()
        },
        closeDropDown: function(a) {
            this.inherited(arguments);
            this.dropDown && (this._popupStateNode.removeAttribute("aria-owns"), this.dropDown.destroyRecursive(), delete this.dropDown)
        }
    });
    return l
});