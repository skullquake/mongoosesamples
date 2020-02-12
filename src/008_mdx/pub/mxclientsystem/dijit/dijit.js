//>>built
require({
    cache: {
        "dijit/main": function() {
            define(["dojo/_base/kernel"], function(_1) {
                return _1.dijit;
            });
        },
        "dijit/_base": function() {
            define(["./main", "./a11y", "./WidgetSet", "./_base/focus", "./_base/manager", "./_base/place", "./_base/popup", "./_base/scroll", "./_base/sniff", "./_base/typematic", "./_base/wai", "./_base/window"], function(_2) {
                return _2._base;
            });
        },
        "dijit/a11y": function() {
            define(["dojo/_base/array", "dojo/dom", "dojo/dom-attr", "dojo/dom-style", "dojo/_base/lang", "dojo/sniff", "./main"], function(_3, _4, _5, _6, _7, _8, _9) {
                var _a;
                var _b = {
                    _isElementShown: function(_c) {
                        var s = _6.get(_c);
                        return (s.visibility != "hidden") && (s.visibility != "collapsed") && (s.display != "none") && (_5.get(_c, "type") != "hidden");
                    },
                    hasDefaultTabStop: function(_d) {
                        switch (_d.nodeName.toLowerCase()) {
                            case "a":
                                return _5.has(_d, "href");
                            case "area":
                            case "button":
                            case "input":
                            case "object":
                            case "select":
                            case "textarea":
                                return true;
                            case "iframe":
                                var _e;
                                try {
                                    var _f = _d.contentDocument;
                                    if ("designMode" in _f && _f.designMode == "on") {
                                        return true;
                                    }
                                    _e = _f.body;
                                } catch (e1) {
                                    try {
                                        _e = _d.contentWindow.document.body;
                                    } catch (e2) {
                                        return false;
                                    }
                                }
                                return _e && (_e.contentEditable == "true" || (_e.firstChild && _e.firstChild.contentEditable == "true"));
                            default:
                                return _d.contentEditable == "true";
                        }
                    },
                    effectiveTabIndex: function(_10) {
                        if (_5.get(_10, "disabled")) {
                            return _a;
                        } else {
                            if (_5.has(_10, "tabIndex")) {
                                return +_5.get(_10, "tabIndex");
                            } else {
                                return _b.hasDefaultTabStop(_10) ? 0 : _a;
                            }
                        }
                    },
                    isTabNavigable: function(_11) {
                        return _b.effectiveTabIndex(_11) >= 0;
                    },
                    isFocusable: function(_12) {
                        return _b.effectiveTabIndex(_12) >= -1;
                    },
                    _getTabNavigable: function(_13) {
                        var _14, _15, _16, _17, _18, _19, _1a = {};

                        function _1b(_1c) {
                            return _1c && _1c.tagName.toLowerCase() == "input" && _1c.type && _1c.type.toLowerCase() == "radio" && _1c.name && _1c.name.toLowerCase();
                        };
                        var _1d = _b._isElementShown,
                            _1e = _b.effectiveTabIndex;
                        var _1f = function(_20) {
                            for (var _21 = _20.firstChild; _21; _21 = _21.nextSibling) {
                                if (_21.nodeType != 1 || (_8("ie") <= 9 && _21.scopeName !== "HTML") || !_1d(_21)) {
                                    continue;
                                }
                                var _22 = _1e(_21);
                                if (_22 >= 0) {
                                    if (_22 == 0) {
                                        if (!_14) {
                                            _14 = _21;
                                        }
                                        _15 = _21;
                                    } else {
                                        if (_22 > 0) {
                                            if (!_16 || _22 < _17) {
                                                _17 = _22;
                                                _16 = _21;
                                            }
                                            if (!_18 || _22 >= _19) {
                                                _19 = _22;
                                                _18 = _21;
                                            }
                                        }
                                    }
                                    var rn = _1b(_21);
                                    if (_5.get(_21, "checked") && rn) {
                                        _1a[rn] = _21;
                                    }
                                }
                                if (_21.nodeName.toUpperCase() != "SELECT") {
                                    _1f(_21);
                                }
                            }
                        };
                        if (_1d(_13)) {
                            _1f(_13);
                        }

                        function rs(_23) {
                            return _1a[_1b(_23)] || _23;
                        };
                        return {
                            first: rs(_14),
                            last: rs(_15),
                            lowest: rs(_16),
                            highest: rs(_18)
                        };
                    },
                    getFirstInTabbingOrder: function(_24, doc) {
                        var _25 = _b._getTabNavigable(_4.byId(_24, doc));
                        return _25.lowest ? _25.lowest : _25.first;
                    },
                    getLastInTabbingOrder: function(_26, doc) {
                        var _27 = _b._getTabNavigable(_4.byId(_26, doc));
                        return _27.last ? _27.last : _27.highest;
                    }
                };
                1 && _7.mixin(_9, _b);
                return _b;
            });
        },
        "dijit/WidgetSet": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/_base/kernel", "./registry"], function(_28, _29, _2a, _2b) {
                var _2c = _29("dijit.WidgetSet", null, {
                    constructor: function() {
                        this._hash = {};
                        this.length = 0;
                    },
                    add: function(_2d) {
                        if (this._hash[_2d.id]) {
                            throw new Error("Tried to register widget with id==" + _2d.id + " but that id is already registered");
                        }
                        this._hash[_2d.id] = _2d;
                        this.length++;
                    },
                    remove: function(id) {
                        if (this._hash[id]) {
                            delete this._hash[id];
                            this.length--;
                        }
                    },
                    forEach: function(_2e, _2f) {
                        _2f = _2f || _2a.global;
                        var i = 0,
                            id;
                        for (id in this._hash) {
                            _2e.call(_2f, this._hash[id], i++, this._hash);
                        }
                        return this;
                    },
                    filter: function(_30, _31) {
                        _31 = _31 || _2a.global;
                        var res = new _2c(),
                            i = 0,
                            id;
                        for (id in this._hash) {
                            var w = this._hash[id];
                            if (_30.call(_31, w, i++, this._hash)) {
                                res.add(w);
                            }
                        }
                        return res;
                    },
                    byId: function(id) {
                        return this._hash[id];
                    },
                    byClass: function(cls) {
                        var res = new _2c(),
                            id, _32;
                        for (id in this._hash) {
                            _32 = this._hash[id];
                            if (_32.declaredClass == cls) {
                                res.add(_32);
                            }
                        }
                        return res;
                    },
                    toArray: function() {
                        var ar = [];
                        for (var id in this._hash) {
                            ar.push(this._hash[id]);
                        }
                        return ar;
                    },
                    map: function(_33, _34) {
                        return _28.map(this.toArray(), _33, _34);
                    },
                    every: function(_35, _36) {
                        _36 = _36 || _2a.global;
                        var x = 0,
                            i;
                        for (i in this._hash) {
                            if (!_35.call(_36, this._hash[i], x++, this._hash)) {
                                return false;
                            }
                        }
                        return true;
                    },
                    some: function(_37, _38) {
                        _38 = _38 || _2a.global;
                        var x = 0,
                            i;
                        for (i in this._hash) {
                            if (_37.call(_38, this._hash[i], x++, this._hash)) {
                                return true;
                            }
                        }
                        return false;
                    }
                });
                _28.forEach(["forEach", "filter", "byClass", "map", "every", "some"], function(_39) {
                    _2b[_39] = _2c.prototype[_39];
                });
                return _2c;
            });
        },
        "dijit/registry": function() {
            define(["dojo/_base/array", "dojo/_base/window", "./main"], function(_3a, win, _3b) {
                var _3c = {},
                    _3d = {};
                var _3e = {
                    length: 0,
                    add: function(_3f) {
                        if (_3d[_3f.id]) {
                            throw new Error("Tried to register widget with id==" + _3f.id + " but that id is already registered");
                        }
                        _3d[_3f.id] = _3f;
                        this.length++;
                    },
                    remove: function(id) {
                        if (_3d[id]) {
                            delete _3d[id];
                            this.length--;
                        }
                    },
                    byId: function(id) {
                        return typeof id == "string" ? _3d[id] : id;
                    },
                    byNode: function(_40) {
                        return _3d[_40.getAttribute("widgetId")];
                    },
                    toArray: function() {
                        var ar = [];
                        for (var id in _3d) {
                            ar.push(_3d[id]);
                        }
                        return ar;
                    },
                    getUniqueId: function(_41) {
                        var id;
                        do {
                            id = _41 + "_" + (_41 in _3c ? ++_3c[_41] : _3c[_41] = 0);
                        } while (_3d[id]);
                        return _3b._scopeName == "dijit" ? id : _3b._scopeName + "_" + id;
                    },
                    findWidgets: function(_42, _43) {
                        var _44 = [];

                        function _45(_46) {
                            for (var _47 = _46.firstChild; _47; _47 = _47.nextSibling) {
                                if (_47.nodeType == 1) {
                                    var _48 = _47.getAttribute("widgetId");
                                    if (_48) {
                                        var _49 = _3d[_48];
                                        if (_49) {
                                            _44.push(_49);
                                        }
                                    } else {
                                        if (_47 !== _43) {
                                            _45(_47);
                                        }
                                    }
                                }
                            }
                        };
                        _45(_42);
                        return _44;
                    },
                    _destroyAll: function() {
                        _3b._curFocus = null;
                        _3b._prevFocus = null;
                        _3b._activeStack = [];
                        _3a.forEach(_3e.findWidgets(win.body()), function(_4a) {
                            if (!_4a._destroyed) {
                                if (_4a.destroyRecursive) {
                                    _4a.destroyRecursive();
                                } else {
                                    if (_4a.destroy) {
                                        _4a.destroy();
                                    }
                                }
                            }
                        });
                    },
                    getEnclosingWidget: function(_4b) {
                        while (_4b) {
                            var id = _4b.nodeType == 1 && _4b.getAttribute("widgetId");
                            if (id) {
                                return _3d[id];
                            }
                            _4b = _4b.parentNode;
                        }
                        return null;
                    },
                    _hash: _3d
                };
                _3b.registry = _3e;
                return _3e;
            });
        },
        "dijit/_base/focus": function() {
            define(["dojo/_base/array", "dojo/dom", "dojo/_base/lang", "dojo/topic", "dojo/_base/window", "../focus", "../selection", "../main"], function(_4c, dom, _4d, _4e, win, _4f, _50, _51) {
                var _52 = {
                    _curFocus: null,
                    _prevFocus: null,
                    isCollapsed: function() {
                        return _51.getBookmark().isCollapsed;
                    },
                    getBookmark: function() {
                        var sel = win.global == window ? _50 : new _50.SelectionManager(win.global);
                        return sel.getBookmark();
                    },
                    moveToBookmark: function(_53) {
                        var sel = win.global == window ? _50 : new _50.SelectionManager(win.global);
                        return sel.moveToBookmark(_53);
                    },
                    getFocus: function(_54, _55) {
                        var _56 = !_4f.curNode || (_54 && dom.isDescendant(_4f.curNode, _54.domNode)) ? _51._prevFocus : _4f.curNode;
                        return {
                            node: _56,
                            bookmark: _56 && (_56 == _4f.curNode) && win.withGlobal(_55 || win.global, _51.getBookmark),
                            openedForWindow: _55
                        };
                    },
                    _activeStack: [],
                    registerIframe: function(_57) {
                        return _4f.registerIframe(_57);
                    },
                    unregisterIframe: function(_58) {
                        _58 && _58.remove();
                    },
                    registerWin: function(_59, _5a) {
                        return _4f.registerWin(_59, _5a);
                    },
                    unregisterWin: function(_5b) {
                        _5b && _5b.remove();
                    }
                };
                _4f.focus = function(_5c) {
                    if (!_5c) {
                        return;
                    }
                    var _5d = "node" in _5c ? _5c.node : _5c,
                        _5e = _5c.bookmark,
                        _5f = _5c.openedForWindow,
                        _60 = _5e ? _5e.isCollapsed : false;
                    if (_5d) {
                        var _61 = (_5d.tagName.toLowerCase() == "iframe") ? _5d.contentWindow : _5d;
                        if (_61 && _61.focus) {
                            try {
                                _61.focus();
                            } catch (e) {}
                        }
                        _4f._onFocusNode(_5d);
                    }
                    if (_5e && win.withGlobal(_5f || win.global, _51.isCollapsed) && !_60) {
                        if (_5f) {
                            _5f.focus();
                        }
                        try {
                            win.withGlobal(_5f || win.global, _51.moveToBookmark, null, [_5e]);
                        } catch (e2) {}
                    }
                };
                _4f.watch("curNode", function(_62, _63, _64) {
                    _51._curFocus = _64;
                    _51._prevFocus = _63;
                    if (_64) {
                        _4e.publish("focusNode", _64);
                    }
                });
                _4f.watch("activeStack", function(_65, _66, _67) {
                    _51._activeStack = _67;
                });
                _4f.on("widget-blur", function(_68, by) {
                    _4e.publish("widgetBlur", _68, by);
                });
                _4f.on("widget-focus", function(_69, by) {
                    _4e.publish("widgetFocus", _69, by);
                });
                _4d.mixin(_51, _52);
                return _51;
            });
        },
        "dijit/focus": function() {
            define(["dojo/aspect", "dojo/_base/declare", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-construct", "dojo/Evented", "dojo/_base/lang", "dojo/on", "dojo/domReady", "dojo/sniff", "dojo/Stateful", "dojo/_base/window", "dojo/window", "./a11y", "./registry", "./main"], function(_6a, _6b, dom, _6c, _6d, _6e, _6f, _70, on, _71, has, _72, win, _73, _74, _75, _76) {
                var _77;
                var _78;
                var _79 = _6b([_72, _6f], {
                    curNode: null,
                    activeStack: [],
                    constructor: function() {
                        var _7a = _70.hitch(this, function(_7b) {
                            if (dom.isDescendant(this.curNode, _7b)) {
                                this.set("curNode", null);
                            }
                            if (dom.isDescendant(this.prevNode, _7b)) {
                                this.set("prevNode", null);
                            }
                        });
                        _6a.before(_6e, "empty", _7a);
                        _6a.before(_6e, "destroy", _7a);
                    },
                    registerIframe: function(_7c) {
                        return this.registerWin(_7c.contentWindow, _7c);
                    },
                    registerWin: function(_7d, _7e) {
                        var _7f = this,
                            _80 = _7d.document && _7d.document.body;
                        if (_80) {
                            var _81 = has("pointer-events") ? "pointerdown" : has("MSPointer") ? "MSPointerDown" : has("touch-events") ? "mousedown, touchstart" : "mousedown";
                            var mdh = on(_7d.document, _81, function(evt) {
                                if (evt && evt.target && evt.target.parentNode == null) {
                                    return;
                                }
                                _7f._onTouchNode(_7e || evt.target, "mouse");
                            });
                            var fih = on(_80, "focusin", function(evt) {
                                if (!evt.target.tagName) {
                                    return;
                                }
                                var tag = evt.target.tagName.toLowerCase();
                                if (tag == "#document" || tag == "body") {
                                    return;
                                }
                                if (_74.isFocusable(evt.target)) {
                                    _7f._onFocusNode(_7e || evt.target);
                                } else {
                                    _7f._onTouchNode(_7e || evt.target);
                                }
                            });
                            var foh = on(_80, "focusout", function(evt) {
                                _7f._onBlurNode(_7e || evt.target);
                            });
                            return {
                                remove: function() {
                                    mdh.remove();
                                    fih.remove();
                                    foh.remove();
                                    mdh = fih = foh = null;
                                    _80 = null;
                                }
                            };
                        }
                    },
                    _onBlurNode: function(_82) {
                        var now = (new Date()).getTime();
                        if (now < _77 + 100) {
                            return;
                        }
                        if (this._clearFocusTimer) {
                            clearTimeout(this._clearFocusTimer);
                        }
                        this._clearFocusTimer = setTimeout(_70.hitch(this, function() {
                            this.set("prevNode", this.curNode);
                            this.set("curNode", null);
                        }), 0);
                        if (this._clearActiveWidgetsTimer) {
                            clearTimeout(this._clearActiveWidgetsTimer);
                        }
                        if (now < _78 + 100) {
                            return;
                        }
                        this._clearActiveWidgetsTimer = setTimeout(_70.hitch(this, function() {
                            delete this._clearActiveWidgetsTimer;
                            this._setStack([]);
                        }), 0);
                    },
                    _onTouchNode: function(_83, by) {
                        _78 = (new Date()).getTime();
                        if (this._clearActiveWidgetsTimer) {
                            clearTimeout(this._clearActiveWidgetsTimer);
                            delete this._clearActiveWidgetsTimer;
                        }
                        if (_6d.contains(_83, "dijitPopup")) {
                            _83 = _83.firstChild;
                        }
                        var _84 = [];
                        try {
                            while (_83) {
                                var _85 = _6c.get(_83, "dijitPopupParent");
                                if (_85) {
                                    _83 = _75.byId(_85).domNode;
                                } else {
                                    if (_83.tagName && _83.tagName.toLowerCase() == "body") {
                                        if (_83 === win.body()) {
                                            break;
                                        }
                                        _83 = _73.get(_83.ownerDocument).frameElement;
                                    } else {
                                        var id = _83.getAttribute && _83.getAttribute("widgetId"),
                                            _86 = id && _75.byId(id);
                                        if (_86 && !(by == "mouse" && _86.get("disabled"))) {
                                            _84.unshift(id);
                                        }
                                        _83 = _83.parentNode;
                                    }
                                }
                            }
                        } catch (e) {}
                        this._setStack(_84, by);
                    },
                    _onFocusNode: function(_87) {
                        if (!_87) {
                            return;
                        }
                        if (_87.nodeType == 9) {
                            return;
                        }
                        _77 = (new Date()).getTime();
                        if (this._clearFocusTimer) {
                            clearTimeout(this._clearFocusTimer);
                            delete this._clearFocusTimer;
                        }
                        this._onTouchNode(_87);
                        if (_87 == this.curNode) {
                            return;
                        }
                        this.set("prevNode", this.curNode);
                        this.set("curNode", _87);
                    },
                    _setStack: function(_88, by) {
                        var _89 = this.activeStack,
                            _8a = _89.length - 1,
                            _8b = _88.length - 1;
                        if (_88[_8b] == _89[_8a]) {
                            return;
                        }
                        this.set("activeStack", _88);
                        var _8c, i;
                        for (i = _8a; i >= 0 && _89[i] != _88[i]; i--) {
                            _8c = _75.byId(_89[i]);
                            if (_8c) {
                                _8c._hasBeenBlurred = true;
                                _8c.set("focused", false);
                                if (_8c._focusManager == this) {
                                    _8c._onBlur(by);
                                }
                                this.emit("widget-blur", _8c, by);
                            }
                        }
                        for (i++; i <= _8b; i++) {
                            _8c = _75.byId(_88[i]);
                            if (_8c) {
                                _8c.set("focused", true);
                                if (_8c._focusManager == this) {
                                    _8c._onFocus(by);
                                }
                                this.emit("widget-focus", _8c, by);
                            }
                        }
                    },
                    focus: function(_8d) {
                        if (_8d) {
                            try {
                                _8d.focus();
                            } catch (e) {}
                        }
                    }
                });
                var _8e = new _79();
                _71(function() {
                    var _8f = _8e.registerWin(_73.get(document));
                    if (has("ie")) {
                        on(window, "unload", function() {
                            if (_8f) {
                                _8f.remove();
                                _8f = null;
                            }
                        });
                    }
                });
                _76.focus = function(_90) {
                    _8e.focus(_90);
                };
                for (var _91 in _8e) {
                    if (!/^_/.test(_91)) {
                        _76.focus[_91] = typeof _8e[_91] == "function" ? _70.hitch(_8e, _91) : _8e[_91];
                    }
                }
                _8e.watch(function(_92, _93, _94) {
                    _76.focus[_92] = _94;
                });
                return _8e;
            });
        },
        "dojo/Stateful": function() {
            define(["./_base/declare", "./_base/lang", "./_base/array", "./when"], function(_95, _96, _97, _98) {
                return _95("dojo.Stateful", null, {
                    _attrPairNames: {},
                    _getAttrNames: function(_99) {
                        var apn = this._attrPairNames;
                        if (apn[_99]) {
                            return apn[_99];
                        }
                        return (apn[_99] = {
                            s: "_" + _99 + "Setter",
                            g: "_" + _99 + "Getter"
                        });
                    },
                    postscript: function(_9a) {
                        if (_9a) {
                            this.set(_9a);
                        }
                    },
                    _get: function(_9b, _9c) {
                        return typeof this[_9c.g] === "function" ? this[_9c.g]() : this[_9b];
                    },
                    get: function(_9d) {
                        return this._get(_9d, this._getAttrNames(_9d));
                    },
                    set: function(_9e, _9f) {
                        if (typeof _9e === "object") {
                            for (var x in _9e) {
                                if (_9e.hasOwnProperty(x) && x != "_watchCallbacks") {
                                    this.set(x, _9e[x]);
                                }
                            }
                            return this;
                        }
                        var _a0 = this._getAttrNames(_9e),
                            _a1 = this._get(_9e, _a0),
                            _a2 = this[_a0.s],
                            _a3;
                        if (typeof _a2 === "function") {
                            _a3 = _a2.apply(this, Array.prototype.slice.call(arguments, 1));
                        } else {
                            this[_9e] = _9f;
                        }
                        if (this._watchCallbacks) {
                            var _a4 = this;
                            _98(_a3, function() {
                                _a4._watchCallbacks(_9e, _a1, _9f);
                            });
                        }
                        return this;
                    },
                    _changeAttrValue: function(_a5, _a6) {
                        var _a7 = this.get(_a5);
                        this[_a5] = _a6;
                        if (this._watchCallbacks) {
                            this._watchCallbacks(_a5, _a7, _a6);
                        }
                        return this;
                    },
                    watch: function(_a8, _a9) {
                        var _aa = this._watchCallbacks;
                        if (!_aa) {
                            var _ab = this;
                            _aa = this._watchCallbacks = function(_ac, _ad, _ae, _af) {
                                var _b0 = function(_b1) {
                                    if (_b1) {
                                        _b1 = _b1.slice();
                                        for (var i = 0, l = _b1.length; i < l; i++) {
                                            _b1[i].call(_ab, _ac, _ad, _ae);
                                        }
                                    }
                                };
                                _b0(_aa["_" + _ac]);
                                if (!_af) {
                                    _b0(_aa["*"]);
                                }
                            };
                        }
                        if (!_a9 && typeof _a8 === "function") {
                            _a9 = _a8;
                            _a8 = "*";
                        } else {
                            _a8 = "_" + _a8;
                        }
                        var _b2 = _aa[_a8];
                        if (typeof _b2 !== "object") {
                            _b2 = _aa[_a8] = [];
                        }
                        _b2.push(_a9);
                        var _b3 = {};
                        _b3.unwatch = _b3.remove = function() {
                            var _b4 = _97.indexOf(_b2, _a9);
                            if (_b4 > -1) {
                                _b2.splice(_b4, 1);
                            }
                        };
                        return _b3;
                    }
                });
            });
        },
        "dojo/window": function() {
            define(["./_base/lang", "./sniff", "./_base/window", "./dom", "./dom-geometry", "./dom-style", "./dom-construct"], function(_b5, has, _b6, dom, _b7, _b8, _b9) {
                has.add("rtl-adjust-position-for-verticalScrollBar", function(win, doc) {
                    var _ba = _b6.body(doc),
                        _bb = _b9.create("div", {
                            style: {
                                overflow: "scroll",
                                overflowX: "visible",
                                direction: "rtl",
                                visibility: "hidden",
                                position: "absolute",
                                left: "0",
                                top: "0",
                                width: "64px",
                                height: "64px"
                            }
                        }, _ba, "last"),
                        div = _b9.create("div", {
                            style: {
                                overflow: "hidden",
                                direction: "ltr"
                            }
                        }, _bb, "last"),
                        ret = _b7.position(div).x != 0;
                    _bb.removeChild(div);
                    _ba.removeChild(_bb);
                    return ret;
                });
                has.add("position-fixed-support", function(win, doc) {
                    var _bc = _b6.body(doc),
                        _bd = _b9.create("span", {
                            style: {
                                visibility: "hidden",
                                position: "fixed",
                                left: "1px",
                                top: "1px"
                            }
                        }, _bc, "last"),
                        _be = _b9.create("span", {
                            style: {
                                position: "fixed",
                                left: "0",
                                top: "0"
                            }
                        }, _bd, "last"),
                        ret = _b7.position(_be).x != _b7.position(_bd).x;
                    _bd.removeChild(_be);
                    _bc.removeChild(_bd);
                    return ret;
                });
                var _bf = {
                    getBox: function(doc) {
                        doc = doc || _b6.doc;
                        var _c0 = (doc.compatMode == "BackCompat") ? _b6.body(doc) : doc.documentElement,
                            _c1 = _b7.docScroll(doc),
                            w, h;
                        if (has("touch")) {
                            var _c2 = _bf.get(doc);
                            w = _c2.innerWidth || _c0.clientWidth;
                            h = _c2.innerHeight || _c0.clientHeight;
                        } else {
                            w = _c0.clientWidth;
                            h = _c0.clientHeight;
                        }
                        return {
                            l: _c1.x,
                            t: _c1.y,
                            w: w,
                            h: h
                        };
                    },
                    get: function(doc) {
                        if (has("ie") && _bf !== document.parentWindow) {
                            doc.parentWindow.execScript("document._parentWindow = window;", "Javascript");
                            var win = doc._parentWindow;
                            doc._parentWindow = null;
                            return win;
                        }
                        return doc.parentWindow || doc.defaultView;
                    },
                    scrollIntoView: function(_c3, pos) {
                        try {
                            _c3 = dom.byId(_c3);
                            var doc = _c3.ownerDocument || _b6.doc,
                                _c4 = _b6.body(doc),
                                _c5 = doc.documentElement || _c4.parentNode,
                                _c6 = has("ie") || has("trident"),
                                _c7 = has("webkit");
                            if (_c3 == _c4 || _c3 == _c5) {
                                return;
                            }
                            if (!(has("mozilla") || _c6 || _c7 || has("opera") || has("trident") || has("edge")) && ("scrollIntoView" in _c3)) {
                                _c3.scrollIntoView(false);
                                return;
                            }
                            var _c8 = doc.compatMode == "BackCompat",
                                _c9 = Math.min(_c4.clientWidth || _c5.clientWidth, _c5.clientWidth || _c4.clientWidth),
                                _ca = Math.min(_c4.clientHeight || _c5.clientHeight, _c5.clientHeight || _c4.clientHeight),
                                _cb = (_c7 || _c8) ? _c4 : _c5,
                                _cc = pos || _b7.position(_c3),
                                el = _c3.parentNode,
                                _cd = function(el) {
                                    return (_c6 <= 6 || (_c6 == 7 && _c8)) ? false : (has("position-fixed-support") && (_b8.get(el, "position").toLowerCase() == "fixed"));
                                },
                                _ce = this,
                                _cf = function(el, x, y) {
                                    if (el.tagName == "BODY" || el.tagName == "HTML") {
                                        _ce.get(el.ownerDocument).scrollBy(x, y);
                                    } else {
                                        x && (el.scrollLeft += x);
                                        y && (el.scrollTop += y);
                                    }
                                };
                            if (_cd(_c3)) {
                                return;
                            }
                            while (el) {
                                if (el == _c4) {
                                    el = _cb;
                                }
                                var _d0 = _b7.position(el),
                                    _d1 = _cd(el),
                                    rtl = _b8.getComputedStyle(el).direction.toLowerCase() == "rtl";
                                if (el == _cb) {
                                    _d0.w = _c9;
                                    _d0.h = _ca;
                                    if (_cb == _c5 && (_c6 || has("trident")) && rtl) {
                                        _d0.x += _cb.offsetWidth - _d0.w;
                                    }
                                    _d0.x = 0;
                                    _d0.y = 0;
                                } else {
                                    var pb = _b7.getPadBorderExtents(el);
                                    _d0.w -= pb.w;
                                    _d0.h -= pb.h;
                                    _d0.x += pb.l;
                                    _d0.y += pb.t;
                                    var _d2 = el.clientWidth,
                                        _d3 = _d0.w - _d2;
                                    if (_d2 > 0 && _d3 > 0) {
                                        if (rtl && has("rtl-adjust-position-for-verticalScrollBar")) {
                                            _d0.x += _d3;
                                        }
                                        _d0.w = _d2;
                                    }
                                    _d2 = el.clientHeight;
                                    _d3 = _d0.h - _d2;
                                    if (_d2 > 0 && _d3 > 0) {
                                        _d0.h = _d2;
                                    }
                                }
                                if (_d1) {
                                    if (_d0.y < 0) {
                                        _d0.h += _d0.y;
                                        _d0.y = 0;
                                    }
                                    if (_d0.x < 0) {
                                        _d0.w += _d0.x;
                                        _d0.x = 0;
                                    }
                                    if (_d0.y + _d0.h > _ca) {
                                        _d0.h = _ca - _d0.y;
                                    }
                                    if (_d0.x + _d0.w > _c9) {
                                        _d0.w = _c9 - _d0.x;
                                    }
                                }
                                var l = _cc.x - _d0.x,
                                    t = _cc.y - _d0.y,
                                    r = l + _cc.w - _d0.w,
                                    bot = t + _cc.h - _d0.h;
                                var s, old;
                                if (r * l > 0 && (!!el.scrollLeft || el == _cb || el.scrollWidth > el.offsetHeight)) {
                                    s = Math[l < 0 ? "max" : "min"](l, r);
                                    if (rtl && ((_c6 == 8 && !_c8) || has("trident") >= 5)) {
                                        s = -s;
                                    }
                                    old = el.scrollLeft;
                                    _cf(el, s, 0);
                                    s = el.scrollLeft - old;
                                    _cc.x -= s;
                                }
                                if (bot * t > 0 && (!!el.scrollTop || el == _cb || el.scrollHeight > el.offsetHeight)) {
                                    s = Math.ceil(Math[t < 0 ? "max" : "min"](t, bot));
                                    old = el.scrollTop;
                                    _cf(el, 0, s);
                                    s = el.scrollTop - old;
                                    _cc.y -= s;
                                }
                                el = (el != _cb) && !_d1 && el.parentNode;
                            }
                        } catch (error) {
                            console.error("scrollIntoView: " + error);
                            _c3.scrollIntoView(false);
                        }
                    }
                };
                1 && _b5.setObject("dojo.window", _bf);
                return _bf;
            });
        },
        "dijit/selection": function() {
            define(["dojo/_base/array", "dojo/dom", "dojo/_base/lang", "dojo/sniff", "dojo/_base/window", "dijit/focus"], function(_d4, dom, _d5, has, _d6, _d7) {
                var _d8 = function(win) {
                    var doc = win.document;
                    this.getType = function() {
                        if (doc.getSelection) {
                            var _d9 = "text";
                            var _da;
                            try {
                                _da = win.getSelection();
                            } catch (e) {}
                            if (_da && _da.rangeCount == 1) {
                                var _db = _da.getRangeAt(0);
                                if ((_db.startContainer == _db.endContainer) && ((_db.endOffset - _db.startOffset) == 1) && (_db.startContainer.nodeType != 3)) {
                                    _d9 = "control";
                                }
                            }
                            return _d9;
                        } else {
                            return doc.selection.type.toLowerCase();
                        }
                    };
                    this.getSelectedText = function() {
                        if (doc.getSelection) {
                            var _dc = win.getSelection();
                            return _dc ? _dc.toString() : "";
                        } else {
                            if (this.getType() == "control") {
                                return null;
                            }
                            return doc.selection.createRange().text;
                        }
                    };
                    this.getSelectedHtml = function() {
                        if (doc.getSelection) {
                            var _dd = win.getSelection();
                            if (_dd && _dd.rangeCount) {
                                var i;
                                var _de = "";
                                for (i = 0; i < _dd.rangeCount; i++) {
                                    var _df = _dd.getRangeAt(i).cloneContents();
                                    var div = doc.createElement("div");
                                    div.appendChild(_df);
                                    _de += div.innerHTML;
                                }
                                return _de;
                            }
                            return null;
                        } else {
                            if (this.getType() == "control") {
                                return null;
                            }
                            return doc.selection.createRange().htmlText;
                        }
                    };
                    this.getSelectedElement = function() {
                        if (this.getType() == "control") {
                            if (doc.getSelection) {
                                var _e0 = win.getSelection();
                                return _e0.anchorNode.childNodes[_e0.anchorOffset];
                            } else {
                                var _e1 = doc.selection.createRange();
                                if (_e1 && _e1.item) {
                                    return doc.selection.createRange().item(0);
                                }
                            }
                        }
                        return null;
                    };
                    this.getParentElement = function() {
                        if (this.getType() == "control") {
                            var p = this.getSelectedElement();
                            if (p) {
                                return p.parentNode;
                            }
                        } else {
                            if (doc.getSelection) {
                                var _e2 = doc.getSelection();
                                if (_e2) {
                                    var _e3 = _e2.anchorNode;
                                    while (_e3 && (_e3.nodeType != 1)) {
                                        _e3 = _e3.parentNode;
                                    }
                                    return _e3;
                                }
                            } else {
                                var r = doc.selection.createRange();
                                r.collapse(true);
                                return r.parentElement();
                            }
                        }
                        return null;
                    };
                    this.hasAncestorElement = function(_e4) {
                        return this.getAncestorElement.apply(this, arguments) != null;
                    };
                    this.getAncestorElement = function(_e5) {
                        var _e6 = this.getSelectedElement() || this.getParentElement();
                        return this.getParentOfType(_e6, arguments);
                    };
                    this.isTag = function(_e7, _e8) {
                        if (_e7 && _e7.tagName) {
                            var _e9 = _e7.tagName.toLowerCase();
                            for (var i = 0; i < _e8.length; i++) {
                                var _ea = String(_e8[i]).toLowerCase();
                                if (_e9 == _ea) {
                                    return _ea;
                                }
                            }
                        }
                        return "";
                    };
                    this.getParentOfType = function(_eb, _ec) {
                        while (_eb) {
                            if (this.isTag(_eb, _ec).length) {
                                return _eb;
                            }
                            _eb = _eb.parentNode;
                        }
                        return null;
                    };
                    this.collapse = function(_ed) {
                        if (doc.getSelection) {
                            var _ee = win.getSelection();
                            if (_ee.removeAllRanges) {
                                if (_ed) {
                                    _ee.collapseToStart();
                                } else {
                                    _ee.collapseToEnd();
                                }
                            } else {
                                _ee.collapse(_ed);
                            }
                        } else {
                            var _ef = doc.selection.createRange();
                            _ef.collapse(_ed);
                            _ef.select();
                        }
                    };
                    this.remove = function() {
                        var sel = doc.selection;
                        if (doc.getSelection) {
                            sel = win.getSelection();
                            sel.deleteFromDocument();
                            return sel;
                        } else {
                            if (sel.type.toLowerCase() != "none") {
                                sel.clear();
                            }
                            return sel;
                        }
                    };
                    this.selectElementChildren = function(_f0, _f1) {
                        var _f2;
                        _f0 = dom.byId(_f0);
                        if (doc.getSelection) {
                            var _f3 = win.getSelection();
                            if (has("opera")) {
                                if (_f3.rangeCount) {
                                    _f2 = _f3.getRangeAt(0);
                                } else {
                                    _f2 = doc.createRange();
                                }
                                _f2.setStart(_f0, 0);
                                _f2.setEnd(_f0, (_f0.nodeType == 3) ? _f0.length : _f0.childNodes.length);
                                _f3.addRange(_f2);
                            } else {
                                _f3.selectAllChildren(_f0);
                            }
                        } else {
                            _f2 = _f0.ownerDocument.body.createTextRange();
                            _f2.moveToElementText(_f0);
                            if (!_f1) {
                                try {
                                    _f2.select();
                                } catch (e) {}
                            }
                        }
                    };
                    this.selectElement = function(_f4, _f5) {
                        var _f6;
                        _f4 = dom.byId(_f4);
                        if (doc.getSelection) {
                            var _f7 = doc.getSelection();
                            _f6 = doc.createRange();
                            if (_f7.removeAllRanges) {
                                if (has("opera")) {
                                    if (_f7.getRangeAt(0)) {
                                        _f6 = _f7.getRangeAt(0);
                                    }
                                }
                                _f6.selectNode(_f4);
                                _f7.removeAllRanges();
                                _f7.addRange(_f6);
                            }
                        } else {
                            try {
                                var tg = _f4.tagName ? _f4.tagName.toLowerCase() : "";
                                if (tg === "img" || tg === "table") {
                                    _f6 = _d6.body(doc).createControlRange();
                                } else {
                                    _f6 = _d6.body(doc).createRange();
                                }
                                _f6.addElement(_f4);
                                if (!_f5) {
                                    _f6.select();
                                }
                            } catch (e) {
                                this.selectElementChildren(_f4, _f5);
                            }
                        }
                    };
                    this.inSelection = function(_f8) {
                        if (_f8) {
                            var _f9;
                            var _fa;
                            if (doc.getSelection) {
                                var sel = win.getSelection();
                                if (sel && sel.rangeCount > 0) {
                                    _fa = sel.getRangeAt(0);
                                }
                                if (_fa && _fa.compareBoundaryPoints && doc.createRange) {
                                    try {
                                        _f9 = doc.createRange();
                                        _f9.setStart(_f8, 0);
                                        if (_fa.compareBoundaryPoints(_fa.START_TO_END, _f9) === 1) {
                                            return true;
                                        }
                                    } catch (e) {}
                                }
                            } else {
                                _fa = doc.selection.createRange();
                                try {
                                    _f9 = _f8.ownerDocument.body.createTextRange();
                                    _f9.moveToElementText(_f8);
                                } catch (e2) {}
                                if (_fa && _f9) {
                                    if (_fa.compareEndPoints("EndToStart", _f9) === 1) {
                                        return true;
                                    }
                                }
                            }
                        }
                        return false;
                    };
                    this.getBookmark = function() {
                        var bm, rg, tg, sel = doc.selection,
                            cf = _d7.curNode;
                        if (doc.getSelection) {
                            sel = win.getSelection();
                            if (sel) {
                                if (sel.isCollapsed) {
                                    tg = cf ? cf.tagName : "";
                                    if (tg) {
                                        tg = tg.toLowerCase();
                                        if (tg == "textarea" || (tg == "input" && (!cf.type || cf.type.toLowerCase() == "text"))) {
                                            sel = {
                                                start: cf.selectionStart,
                                                end: cf.selectionEnd,
                                                node: cf,
                                                pRange: true
                                            };
                                            return {
                                                isCollapsed: (sel.end <= sel.start),
                                                mark: sel
                                            };
                                        }
                                    }
                                    bm = {
                                        isCollapsed: true
                                    };
                                    if (sel.rangeCount) {
                                        bm.mark = sel.getRangeAt(0).cloneRange();
                                    }
                                } else {
                                    rg = sel.getRangeAt(0);
                                    bm = {
                                        isCollapsed: false,
                                        mark: rg.cloneRange()
                                    };
                                }
                            }
                        } else {
                            if (sel) {
                                tg = cf ? cf.tagName : "";
                                tg = tg.toLowerCase();
                                if (cf && tg && (tg == "button" || tg == "textarea" || tg == "input")) {
                                    if (sel.type && sel.type.toLowerCase() == "none") {
                                        return {
                                            isCollapsed: true,
                                            mark: null
                                        };
                                    } else {
                                        rg = sel.createRange();
                                        return {
                                            isCollapsed: rg.text && rg.text.length ? false : true,
                                            mark: {
                                                range: rg,
                                                pRange: true
                                            }
                                        };
                                    }
                                }
                                bm = {};
                                try {
                                    rg = sel.createRange();
                                    bm.isCollapsed = !(sel.type == "Text" ? rg.htmlText.length : rg.length);
                                } catch (e) {
                                    bm.isCollapsed = true;
                                    return bm;
                                }
                                if (sel.type.toUpperCase() == "CONTROL") {
                                    if (rg.length) {
                                        bm.mark = [];
                                        var i = 0,
                                            len = rg.length;
                                        while (i < len) {
                                            bm.mark.push(rg.item(i++));
                                        }
                                    } else {
                                        bm.isCollapsed = true;
                                        bm.mark = null;
                                    }
                                } else {
                                    bm.mark = rg.getBookmark();
                                }
                            } else {
                                console.warn("No idea how to store the current selection for this browser!");
                            }
                        }
                        return bm;
                    };
                    this.moveToBookmark = function(_fb) {
                        var _fc = _fb.mark;
                        if (_fc) {
                            if (doc.getSelection) {
                                var sel = win.getSelection();
                                if (sel && sel.removeAllRanges) {
                                    if (_fc.pRange) {
                                        var n = _fc.node;
                                        n.selectionStart = _fc.start;
                                        n.selectionEnd = _fc.end;
                                    } else {
                                        sel.removeAllRanges();
                                        sel.addRange(_fc);
                                    }
                                } else {
                                    console.warn("No idea how to restore selection for this browser!");
                                }
                            } else {
                                if (doc.selection && _fc) {
                                    var rg;
                                    if (_fc.pRange) {
                                        rg = _fc.range;
                                    } else {
                                        if (_d5.isArray(_fc)) {
                                            rg = doc.body.createControlRange();
                                            _d4.forEach(_fc, function(n) {
                                                rg.addElement(n);
                                            });
                                        } else {
                                            rg = doc.body.createTextRange();
                                            rg.moveToBookmark(_fc);
                                        }
                                    }
                                    rg.select();
                                }
                            }
                        }
                    };
                    this.isCollapsed = function() {
                        return this.getBookmark().isCollapsed;
                    };
                };
                var _fd = new _d8(window);
                _fd.SelectionManager = _d8;
                return _fd;
            });
        },
        "dijit/_base/manager": function() {
            define(["dojo/_base/array", "dojo/_base/config", "dojo/_base/lang", "../registry", "../main"], function(_fe, _ff, lang, _100, _101) {
                var _102 = {};
                _fe.forEach(["byId", "getUniqueId", "findWidgets", "_destroyAll", "byNode", "getEnclosingWidget"], function(name) {
                    _102[name] = _100[name];
                });
                lang.mixin(_102, {
                    defaultDuration: _ff["defaultDuration"] || 200
                });
                lang.mixin(_101, _102);
                return _101;
            });
        },
        "dijit/_base/place": function() {
            define(["dojo/_base/array", "dojo/_base/lang", "dojo/window", "../place", "../main"], function(_103, lang, _104, _105, _106) {
                var _107 = {};
                _107.getViewport = function() {
                    return _104.getBox();
                };
                _107.placeOnScreen = _105.at;
                _107.placeOnScreenAroundElement = function(node, _108, _109, _10a) {
                    var _10b;
                    if (lang.isArray(_109)) {
                        _10b = _109;
                    } else {
                        _10b = [];
                        for (var key in _109) {
                            _10b.push({
                                aroundCorner: key,
                                corner: _109[key]
                            });
                        }
                    }
                    return _105.around(node, _108, _10b, true, _10a);
                };
                _107.placeOnScreenAroundNode = _107.placeOnScreenAroundElement;
                _107.placeOnScreenAroundRectangle = _107.placeOnScreenAroundElement;
                _107.getPopupAroundAlignment = function(_10c, _10d) {
                    var _10e = {};
                    _103.forEach(_10c, function(pos) {
                        var ltr = _10d;
                        switch (pos) {
                            case "after":
                                _10e[_10d ? "BR" : "BL"] = _10d ? "BL" : "BR";
                                break;
                            case "before":
                                _10e[_10d ? "BL" : "BR"] = _10d ? "BR" : "BL";
                                break;
                            case "below-alt":
                                ltr = !ltr;
                            case "below":
                                _10e[ltr ? "BL" : "BR"] = ltr ? "TL" : "TR";
                                _10e[ltr ? "BR" : "BL"] = ltr ? "TR" : "TL";
                                break;
                            case "above-alt":
                                ltr = !ltr;
                            case "above":
                            default:
                                _10e[ltr ? "TL" : "TR"] = ltr ? "BL" : "BR";
                                _10e[ltr ? "TR" : "TL"] = ltr ? "BR" : "BL";
                                break;
                        }
                    });
                    return _10e;
                };
                lang.mixin(_106, _107);
                return _106;
            });
        },
        "dijit/place": function() {
            define(["dojo/_base/array", "dojo/dom-geometry", "dojo/dom-style", "dojo/_base/kernel", "dojo/_base/window", "./Viewport", "./main"], function(_10f, _110, _111, _112, win, _113, _114) {
                function _115(node, _116, _117, _118) {
                    var view = _113.getEffectiveBox(node.ownerDocument);
                    if (!node.parentNode || String(node.parentNode.tagName).toLowerCase() != "body") {
                        win.body(node.ownerDocument).appendChild(node);
                    }
                    var best = null;
                    _10f.some(_116, function(_119) {
                        var _11a = _119.corner;
                        var pos = _119.pos;
                        var _11b = 0;
                        var _11c = {
                            w: {
                                "L": view.l + view.w - pos.x,
                                "R": pos.x - view.l,
                                "M": view.w
                            } [_11a.charAt(1)],
                            h: {
                                "T": view.t + view.h - pos.y,
                                "B": pos.y - view.t,
                                "M": view.h
                            } [_11a.charAt(0)]
                        };
                        var s = node.style;
                        s.left = s.right = "auto";
                        if (_117) {
                            var res = _117(node, _119.aroundCorner, _11a, _11c, _118);
                            _11b = typeof res == "undefined" ? 0 : res;
                        }
                        var _11d = node.style;
                        var _11e = _11d.display;
                        var _11f = _11d.visibility;
                        if (_11d.display == "none") {
                            _11d.visibility = "hidden";
                            _11d.display = "";
                        }
                        var bb = _110.position(node);
                        _11d.display = _11e;
                        _11d.visibility = _11f;
                        var _120 = {
                                "L": pos.x,
                                "R": pos.x - bb.w,
                                "M": Math.max(view.l, Math.min(view.l + view.w, pos.x + (bb.w >> 1)) - bb.w)
                            } [_11a.charAt(1)],
                            _121 = {
                                "T": pos.y,
                                "B": pos.y - bb.h,
                                "M": Math.max(view.t, Math.min(view.t + view.h, pos.y + (bb.h >> 1)) - bb.h)
                            } [_11a.charAt(0)],
                            _122 = Math.max(view.l, _120),
                            _123 = Math.max(view.t, _121),
                            endX = Math.min(view.l + view.w, _120 + bb.w),
                            endY = Math.min(view.t + view.h, _121 + bb.h),
                            _124 = endX - _122,
                            _125 = endY - _123;
                        _11b += (bb.w - _124) + (bb.h - _125);
                        if (best == null || _11b < best.overflow) {
                            best = {
                                corner: _11a,
                                aroundCorner: _119.aroundCorner,
                                x: _122,
                                y: _123,
                                w: _124,
                                h: _125,
                                overflow: _11b,
                                spaceAvailable: _11c
                            };
                        }
                        return !_11b;
                    });
                    if (best.overflow && _117) {
                        _117(node, best.aroundCorner, best.corner, best.spaceAvailable, _118);
                    }
                    var top = best.y,
                        side = best.x,
                        body = win.body(node.ownerDocument);
                    if (/relative|absolute/.test(_111.get(body, "position"))) {
                        top -= _111.get(body, "marginTop");
                        side -= _111.get(body, "marginLeft");
                    }
                    var s = node.style;
                    s.top = top + "px";
                    s.left = side + "px";
                    s.right = "auto";
                    return best;
                };
                var _126 = {
                    "TL": "BR",
                    "TR": "BL",
                    "BL": "TR",
                    "BR": "TL"
                };
                var _127 = {
                    at: function(node, pos, _128, _129, _12a) {
                        var _12b = _10f.map(_128, function(_12c) {
                            var c = {
                                corner: _12c,
                                aroundCorner: _126[_12c],
                                pos: {
                                    x: pos.x,
                                    y: pos.y
                                }
                            };
                            if (_129) {
                                c.pos.x += _12c.charAt(1) == "L" ? _129.x : -_129.x;
                                c.pos.y += _12c.charAt(0) == "T" ? _129.y : -_129.y;
                            }
                            return c;
                        });
                        return _115(node, _12b, _12a);
                    },
                    around: function(node, _12d, _12e, _12f, _130) {
                        var _131;
                        if (typeof _12d == "string" || "offsetWidth" in _12d || "ownerSVGElement" in _12d) {
                            _131 = _110.position(_12d, true);
                            if (/^(above|below)/.test(_12e[0])) {
                                var _132 = _110.getBorderExtents(_12d),
                                    _133 = _12d.firstChild ? _110.getBorderExtents(_12d.firstChild) : {
                                        t: 0,
                                        l: 0,
                                        b: 0,
                                        r: 0
                                    },
                                    _134 = _110.getBorderExtents(node),
                                    _135 = node.firstChild ? _110.getBorderExtents(node.firstChild) : {
                                        t: 0,
                                        l: 0,
                                        b: 0,
                                        r: 0
                                    };
                                _131.y += Math.min(_132.t + _133.t, _134.t + _135.t);
                                _131.h -= Math.min(_132.t + _133.t, _134.t + _135.t) + Math.min(_132.b + _133.b, _134.b + _135.b);
                            }
                        } else {
                            _131 = _12d;
                        }
                        if (_12d.parentNode) {
                            var _136 = _111.getComputedStyle(_12d).position == "absolute";
                            var _137 = _12d.parentNode;
                            while (_137 && _137.nodeType == 1 && _137.nodeName != "BODY") {
                                var _138 = _110.position(_137, true),
                                    pcs = _111.getComputedStyle(_137);
                                if (/relative|absolute/.test(pcs.position)) {
                                    _136 = false;
                                }
                                if (!_136 && /hidden|auto|scroll/.test(pcs.overflow)) {
                                    var _139 = Math.min(_131.y + _131.h, _138.y + _138.h);
                                    var _13a = Math.min(_131.x + _131.w, _138.x + _138.w);
                                    _131.x = Math.max(_131.x, _138.x);
                                    _131.y = Math.max(_131.y, _138.y);
                                    _131.h = _139 - _131.y;
                                    _131.w = _13a - _131.x;
                                }
                                if (pcs.position == "absolute") {
                                    _136 = true;
                                }
                                _137 = _137.parentNode;
                            }
                        }
                        var x = _131.x,
                            y = _131.y,
                            _13b = "w" in _131 ? _131.w : (_131.w = _131.width),
                            _13c = "h" in _131 ? _131.h : (_112.deprecated("place.around: dijit/place.__Rectangle: { x:" + x + ", y:" + y + ", height:" + _131.height + ", width:" + _13b + " } has been deprecated.  Please use { x:" + x + ", y:" + y + ", h:" + _131.height + ", w:" + _13b + " }", "", "2.0"), _131.h = _131.height);
                        var _13d = [];

                        function push(_13e, _13f) {
                            _13d.push({
                                aroundCorner: _13e,
                                corner: _13f,
                                pos: {
                                    x: {
                                        "L": x,
                                        "R": x + _13b,
                                        "M": x + (_13b >> 1)
                                    } [_13e.charAt(1)],
                                    y: {
                                        "T": y,
                                        "B": y + _13c,
                                        "M": y + (_13c >> 1)
                                    } [_13e.charAt(0)]
                                }
                            });
                        };
                        _10f.forEach(_12e, function(pos) {
                            var ltr = _12f;
                            switch (pos) {
                                case "above-centered":
                                    push("TM", "BM");
                                    break;
                                case "below-centered":
                                    push("BM", "TM");
                                    break;
                                case "after-centered":
                                    ltr = !ltr;
                                case "before-centered":
                                    push(ltr ? "ML" : "MR", ltr ? "MR" : "ML");
                                    break;
                                case "after":
                                    ltr = !ltr;
                                case "before":
                                    push(ltr ? "TL" : "TR", ltr ? "TR" : "TL");
                                    push(ltr ? "BL" : "BR", ltr ? "BR" : "BL");
                                    break;
                                case "below-alt":
                                    ltr = !ltr;
                                case "below":
                                    push(ltr ? "BL" : "BR", ltr ? "TL" : "TR");
                                    push(ltr ? "BR" : "BL", ltr ? "TR" : "TL");
                                    break;
                                case "above-alt":
                                    ltr = !ltr;
                                case "above":
                                    push(ltr ? "TL" : "TR", ltr ? "BL" : "BR");
                                    push(ltr ? "TR" : "TL", ltr ? "BR" : "BL");
                                    break;
                                default:
                                    push(pos.aroundCorner, pos.corner);
                            }
                        });
                        var _140 = _115(node, _13d, _130, {
                            w: _13b,
                            h: _13c
                        });
                        _140.aroundNodePos = _131;
                        return _140;
                    }
                };
                return _114.place = _127;
            });
        },
        "dijit/Viewport": function() {
            define(["dojo/Evented", "dojo/on", "dojo/domReady", "dojo/sniff", "dojo/window"], function(_141, on, _142, has, _143) {
                var _144 = new _141();
                var _145;
                _142(function() {
                    var _146 = _143.getBox();
                    _144._rlh = on(window, "resize", function() {
                        var _147 = _143.getBox();
                        if (_146.h == _147.h && _146.w == _147.w) {
                            return;
                        }
                        _146 = _147;
                        _144.emit("resize");
                    });
                    if (has("ie") == 8) {
                        var _148 = screen.deviceXDPI;
                        setInterval(function() {
                            if (screen.deviceXDPI != _148) {
                                _148 = screen.deviceXDPI;
                                _144.emit("resize");
                            }
                        }, 500);
                    }
                    if (has("ios")) {
                        on(document, "focusin", function(evt) {
                            _145 = evt.target;
                        });
                        on(document, "focusout", function(evt) {
                            _145 = null;
                        });
                    }
                });
                _144.getEffectiveBox = function(doc) {
                    var box = _143.getBox(doc);
                    var tag = _145 && _145.tagName && _145.tagName.toLowerCase();
                    if (has("ios") && _145 && !_145.readOnly && (tag == "textarea" || (tag == "input" && /^(color|email|number|password|search|tel|text|url)$/.test(_145.type)))) {
                        box.h *= (orientation == 0 || orientation == 180 ? 0.66 : 0.4);
                        var rect = _145.getBoundingClientRect();
                        box.h = Math.max(box.h, rect.top + rect.height);
                    }
                    return box;
                };
                return _144;
            });
        },
        "dijit/_base/popup": function() {
            define(["dojo/dom-class", "dojo/_base/window", "../popup", "../BackgroundIframe"], function(_149, win, _14a) {
                var _14b = _14a._createWrapper;
                _14a._createWrapper = function(_14c) {
                    if (!_14c.declaredClass) {
                        _14c = {
                            _popupWrapper: (_14c.parentNode && _149.contains(_14c.parentNode, "dijitPopup")) ? _14c.parentNode : null,
                            domNode: _14c,
                            destroy: function() {},
                            ownerDocument: _14c.ownerDocument,
                            ownerDocumentBody: win.body(_14c.ownerDocument)
                        };
                    }
                    return _14b.call(this, _14c);
                };
                var _14d = _14a.open;
                _14a.open = function(args) {
                    if (args.orient && typeof args.orient != "string" && !("length" in args.orient)) {
                        var ary = [];
                        for (var key in args.orient) {
                            ary.push({
                                aroundCorner: key,
                                corner: args.orient[key]
                            });
                        }
                        args.orient = ary;
                    }
                    return _14d.call(this, args);
                };
                return _14a;
            });
        },
        "dijit/popup": function() {
            define(["dojo/_base/array", "dojo/aspect", "dojo/_base/declare", "dojo/dom", "dojo/dom-attr", "dojo/dom-construct", "dojo/dom-geometry", "dojo/dom-style", "dojo/has", "dojo/keys", "dojo/_base/lang", "dojo/on", "./place", "./BackgroundIframe", "./Viewport", "./main", "dojo/touch"], function(_14e, _14f, _150, dom, _151, _152, _153, _154, has, keys, lang, on, _155, _156, _157, _158) {
                function _159() {
                    if (this._popupWrapper) {
                        _152.destroy(this._popupWrapper);
                        delete this._popupWrapper;
                    }
                };
                var _15a = _150(null, {
                    _stack: [],
                    _beginZIndex: 1000,
                    _idGen: 1,
                    _repositionAll: function() {
                        if (this._firstAroundNode) {
                            var _15b = this._firstAroundPosition,
                                _15c = _153.position(this._firstAroundNode, true),
                                dx = _15c.x - _15b.x,
                                dy = _15c.y - _15b.y;
                            if (dx || dy) {
                                this._firstAroundPosition = _15c;
                                for (var i = 0; i < this._stack.length; i++) {
                                    var _15d = this._stack[i].wrapper.style;
                                    _15d.top = (parseFloat(_15d.top) + dy) + "px";
                                    if (_15d.right == "auto") {
                                        _15d.left = (parseFloat(_15d.left) + dx) + "px";
                                    } else {
                                        _15d.right = (parseFloat(_15d.right) - dx) + "px";
                                    }
                                }
                            }
                            this._aroundMoveListener = setTimeout(lang.hitch(this, "_repositionAll"), dx || dy ? 10 : 50);
                        }
                    },
                    _createWrapper: function(_15e) {
                        var _15f = _15e._popupWrapper,
                            node = _15e.domNode;
                        if (!_15f) {
                            _15f = _152.create("div", {
                                "class": "dijitPopup",
                                style: {
                                    display: "none"
                                },
                                role: "region",
                                "aria-label": _15e["aria-label"] || _15e.label || _15e.name || _15e.id
                            }, _15e.ownerDocumentBody);
                            _15f.appendChild(node);
                            var s = node.style;
                            s.display = "";
                            s.visibility = "";
                            s.position = "";
                            s.top = "0px";
                            _15e._popupWrapper = _15f;
                            _14f.after(_15e, "destroy", _159, true);
                            if ("ontouchend" in document) {
                                on(_15f, "touchend", function(evt) {
                                    if (!/^(input|button|textarea)$/i.test(evt.target.tagName)) {
                                        evt.preventDefault();
                                    }
                                });
                            }
                            _15f.dojoClick = true;
                        }
                        return _15f;
                    },
                    moveOffScreen: function(_160) {
                        var _161 = this._createWrapper(_160);
                        var ltr = _153.isBodyLtr(_160.ownerDocument),
                            _162 = {
                                visibility: "hidden",
                                top: "-9999px",
                                display: ""
                            };
                        _162[ltr ? "left" : "right"] = "-9999px";
                        _162[ltr ? "right" : "left"] = "auto";
                        _154.set(_161, _162);
                        return _161;
                    },
                    hide: function(_163) {
                        var _164 = this._createWrapper(_163);
                        _154.set(_164, {
                            display: "none",
                            height: "auto",
                            overflowY: "visible",
                            border: ""
                        });
                        var node = _163.domNode;
                        if ("_originalStyle" in node) {
                            node.style.cssText = node._originalStyle;
                        }
                    },
                    getTopPopup: function() {
                        var _165 = this._stack;
                        for (var pi = _165.length - 1; pi > 0 && _165[pi].parent === _165[pi - 1].widget; pi--) {}
                        return _165[pi];
                    },
                    open: function(args) {
                        var _166 = this._stack,
                            _167 = args.popup,
                            node = _167.domNode,
                            _168 = args.orient || ["below", "below-alt", "above", "above-alt"],
                            ltr = args.parent ? args.parent.isLeftToRight() : _153.isBodyLtr(_167.ownerDocument),
                            _169 = args.around,
                            id = (args.around && args.around.id) ? (args.around.id + "_dropdown") : ("popup_" + this._idGen++);
                        while (_166.length && (!args.parent || !dom.isDescendant(args.parent.domNode, _166[_166.length - 1].widget.domNode))) {
                            this.close(_166[_166.length - 1].widget);
                        }
                        var _16a = this.moveOffScreen(_167);
                        if (_167.startup && !_167._started) {
                            _167.startup();
                        }
                        var _16b, _16c = _153.position(node);
                        if ("maxHeight" in args && args.maxHeight != -1) {
                            _16b = args.maxHeight || Infinity;
                        } else {
                            var _16d = _157.getEffectiveBox(this.ownerDocument),
                                _16e = _169 ? _153.position(_169, false) : {
                                    y: args.y - (args.padding || 0),
                                    h: (args.padding || 0) * 2
                                };
                            _16b = Math.floor(Math.max(_16e.y, _16d.h - (_16e.y + _16e.h)));
                        }
                        if (_16c.h > _16b) {
                            var cs = _154.getComputedStyle(node),
                                _16f = cs.borderLeftWidth + " " + cs.borderLeftStyle + " " + cs.borderLeftColor;
                            _154.set(_16a, {
                                overflowY: "scroll",
                                height: _16b + "px",
                                border: _16f
                            });
                            node._originalStyle = node.style.cssText;
                            node.style.border = "none";
                        }
                        _151.set(_16a, {
                            id: id,
                            style: {
                                zIndex: this._beginZIndex + _166.length
                            },
                            "class": "dijitPopup " + (_167.baseClass || _167["class"] || "").split(" ")[0] + "Popup",
                            dijitPopupParent: args.parent ? args.parent.id : ""
                        });
                        if (_166.length == 0 && _169) {
                            this._firstAroundNode = _169;
                            this._firstAroundPosition = _153.position(_169, true);
                            this._aroundMoveListener = setTimeout(lang.hitch(this, "_repositionAll"), 50);
                        }
                        if (has("config-bgIframe") && !_167.bgIframe) {
                            _167.bgIframe = new _156(_16a);
                        }
                        var _170 = _167.orient ? lang.hitch(_167, "orient") : null,
                            best = _169 ? _155.around(_16a, _169, _168, ltr, _170) : _155.at(_16a, args, _168 == "R" ? ["TR", "BR", "TL", "BL"] : ["TL", "BL", "TR", "BR"], args.padding, _170);
                        _16a.style.visibility = "visible";
                        node.style.visibility = "visible";
                        var _171 = [];
                        _171.push(on(_16a, "keydown", lang.hitch(this, function(evt) {
                            if (evt.keyCode == keys.ESCAPE && args.onCancel) {
                                evt.stopPropagation();
                                evt.preventDefault();
                                args.onCancel();
                            } else {
                                if (evt.keyCode == keys.TAB) {
                                    evt.stopPropagation();
                                    evt.preventDefault();
                                    var _172 = this.getTopPopup();
                                    if (_172 && _172.onCancel) {
                                        _172.onCancel();
                                    }
                                }
                            }
                        })));
                        if (_167.onCancel && args.onCancel) {
                            _171.push(_167.on("cancel", args.onCancel));
                        }
                        _171.push(_167.on(_167.onExecute ? "execute" : "change", lang.hitch(this, function() {
                            var _173 = this.getTopPopup();
                            if (_173 && _173.onExecute) {
                                _173.onExecute();
                            }
                        })));
                        _166.push({
                            widget: _167,
                            wrapper: _16a,
                            parent: args.parent,
                            onExecute: args.onExecute,
                            onCancel: args.onCancel,
                            onClose: args.onClose,
                            handlers: _171
                        });
                        if (_167.onOpen) {
                            _167.onOpen(best);
                        }
                        return best;
                    },
                    close: function(_174) {
                        var _175 = this._stack;
                        while ((_174 && _14e.some(_175, function(elem) {
                                return elem.widget == _174;
                            })) || (!_174 && _175.length)) {
                            var top = _175.pop(),
                                _176 = top.widget,
                                _177 = top.onClose;
                            if (_176.bgIframe) {
                                _176.bgIframe.destroy();
                                delete _176.bgIframe;
                            }
                            if (_176.onClose) {
                                _176.onClose();
                            }
                            var h;
                            while (h = top.handlers.pop()) {
                                h.remove();
                            }
                            if (_176 && _176.domNode) {
                                this.hide(_176);
                            }
                            if (_177) {
                                _177();
                            }
                        }
                        if (_175.length == 0 && this._aroundMoveListener) {
                            clearTimeout(this._aroundMoveListener);
                            this._firstAroundNode = this._firstAroundPosition = this._aroundMoveListener = null;
                        }
                    }
                });
                return (_158.popup = new _15a());
            });
        },
        "dijit/BackgroundIframe": function() {
            define(["require", "./main", "dojo/_base/config", "dojo/dom-construct", "dojo/dom-style", "dojo/_base/lang", "dojo/on", "dojo/sniff"], function(_178, _179, _17a, _17b, _17c, lang, on, has) {
                has.add("config-bgIframe", (has("ie") || has("trident")) && !/IEMobile\/10\.0/.test(navigator.userAgent));
                var _17d = new function() {
                    var _17e = [];
                    this.pop = function() {
                        var _17f;
                        if (_17e.length) {
                            _17f = _17e.pop();
                            _17f.style.display = "";
                        } else {
                            if (has("ie") < 9) {
                                var burl = _17a["dojoBlankHtmlUrl"] || _178.toUrl("dojo/resources/blank.html") || "javascript:\"\"";
                                var html = "<iframe src='" + burl + "' role='presentation'" + " style='position: absolute; left: 0px; top: 0px;" + "z-index: -1; filter:Alpha(Opacity=\"0\");'>";
                                _17f = document.createElement(html);
                            } else {
                                _17f = _17b.create("iframe");
                                _17f.src = "javascript:\"\"";
                                _17f.className = "dijitBackgroundIframe";
                                _17f.setAttribute("role", "presentation");
                                _17c.set(_17f, "opacity", 0.1);
                            }
                            _17f.tabIndex = -1;
                        }
                        return _17f;
                    };
                    this.push = function(_180) {
                        _180.style.display = "none";
                        _17e.push(_180);
                    };
                }();
                _179.BackgroundIframe = function(node) {
                    if (!node.id) {
                        throw new Error("no id");
                    }
                    if (has("config-bgIframe")) {
                        var _181 = (this.iframe = _17d.pop());
                        node.appendChild(_181);
                        if (has("ie") < 7 || has("quirks")) {
                            this.resize(node);
                            this._conn = on(node, "resize", lang.hitch(this, "resize", node));
                        } else {
                            _17c.set(_181, {
                                width: "100%",
                                height: "100%"
                            });
                        }
                    }
                };
                lang.extend(_179.BackgroundIframe, {
                    resize: function(node) {
                        if (this.iframe) {
                            _17c.set(this.iframe, {
                                width: node.offsetWidth + "px",
                                height: node.offsetHeight + "px"
                            });
                        }
                    },
                    destroy: function() {
                        if (this._conn) {
                            this._conn.remove();
                            this._conn = null;
                        }
                        if (this.iframe) {
                            this.iframe.parentNode.removeChild(this.iframe);
                            _17d.push(this.iframe);
                            delete this.iframe;
                        }
                    }
                });
                return _179.BackgroundIframe;
            });
        },
        "dojo/touch": function() {
            define(["./_base/kernel", "./aspect", "./dom", "./dom-class", "./_base/lang", "./on", "./has", "./mouse", "./domReady", "./_base/window"], function(dojo, _182, dom, _183, lang, on, has, _184, _185, win) {
                var ios4 = has("ios") < 5;
                var _186 = has("pointer-events") || has("MSPointer"),
                    _187 = (function() {
                        var _188 = {};
                        for (var type in {
                                down: 1,
                                move: 1,
                                up: 1,
                                cancel: 1,
                                over: 1,
                                out: 1
                            }) {
                            _188[type] = has("MSPointer") ? "MSPointer" + type.charAt(0).toUpperCase() + type.slice(1) : "pointer" + type;
                        }
                        return _188;
                    })();
                var _189 = has("touch-events");
                var _18a, _18b, _18c = false,
                    _18d, _18e, _18f, _190, _191, _192;
                var _193;

                function _194(_195, _196, _197) {
                    if (_186 && _197) {
                        return function(node, _198) {
                            return on(node, _197, _198);
                        };
                    } else {
                        if (_189) {
                            return function(node, _199) {
                                var _19a = on(node, _196, function(evt) {
                                        _199.call(this, evt);
                                        _193 = (new Date()).getTime();
                                    }),
                                    _19b = on(node, _195, function(evt) {
                                        if (!_193 || (new Date()).getTime() > _193 + 1000) {
                                            _199.call(this, evt);
                                        }
                                    });
                                return {
                                    remove: function() {
                                        _19a.remove();
                                        _19b.remove();
                                    }
                                };
                            };
                        } else {
                            return function(node, _19c) {
                                return on(node, _195, _19c);
                            };
                        }
                    }
                };

                function _19d(node) {
                    do {
                        if (node.dojoClick !== undefined) {
                            return node;
                        }
                    } while (node = node.parentNode);
                };

                function _19e(e, _19f, _1a0) {
                    if (_184.isRight(e)) {
                        return;
                    }
                    var _1a1 = _19d(e.target);
                    _18b = !e.target.disabled && _1a1 && _1a1.dojoClick;
                    if (_18b) {
                        _18c = (_18b == "useTarget");
                        _18d = (_18c ? _1a1 : e.target);
                        if (_18c) {
                            e.preventDefault();
                        }
                        _18e = e.changedTouches ? e.changedTouches[0].pageX - win.global.pageXOffset : e.clientX;
                        _18f = e.changedTouches ? e.changedTouches[0].pageY - win.global.pageYOffset : e.clientY;
                        _190 = (typeof _18b == "object" ? _18b.x : (typeof _18b == "number" ? _18b : 0)) || 4;
                        _191 = (typeof _18b == "object" ? _18b.y : (typeof _18b == "number" ? _18b : 0)) || 4;
                        if (!_18a) {
                            _18a = true;

                            function _1a2(e) {
                                if (_18c) {
                                    _18b = dom.isDescendant(win.doc.elementFromPoint((e.changedTouches ? e.changedTouches[0].pageX - win.global.pageXOffset : e.clientX), (e.changedTouches ? e.changedTouches[0].pageY - win.global.pageYOffset : e.clientY)), _18d);
                                } else {
                                    _18b = _18b && (e.changedTouches ? e.changedTouches[0].target : e.target) == _18d && Math.abs((e.changedTouches ? e.changedTouches[0].pageX - win.global.pageXOffset : e.clientX) - _18e) <= _190 && Math.abs((e.changedTouches ? e.changedTouches[0].pageY - win.global.pageYOffset : e.clientY) - _18f) <= _191;
                                }
                            };
                            win.doc.addEventListener(_19f, function(e) {
                                if (_184.isRight(e)) {
                                    return;
                                }
                                _1a2(e);
                                if (_18c) {
                                    e.preventDefault();
                                }
                            }, true);
                            win.doc.addEventListener(_1a0, function(e) {
                                if (_184.isRight(e)) {
                                    return;
                                }
                                _1a2(e);
                                if (_18b) {
                                    _192 = (new Date()).getTime();
                                    var _1a3 = (_18c ? _18d : e.target);
                                    if (_1a3.tagName === "LABEL") {
                                        _1a3 = dom.byId(_1a3.getAttribute("for")) || _1a3;
                                    }
                                    var src = (e.changedTouches) ? e.changedTouches[0] : e;

                                    function _1a4(type) {
                                        var evt = document.createEvent("MouseEvents");
                                        evt._dojo_click = true;
                                        evt.initMouseEvent(type, true, true, e.view, e.detail, src.screenX, src.screenY, src.clientX, src.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null);
                                        return evt;
                                    };
                                    var _1a5 = _1a4("mousedown");
                                    var _1a6 = _1a4("mouseup");
                                    var _1a7 = _1a4("click");
                                    setTimeout(function() {
                                        on.emit(_1a3, "mousedown", _1a5);
                                        on.emit(_1a3, "mouseup", _1a6);
                                        on.emit(_1a3, "click", _1a7);
                                        _192 = (new Date()).getTime();
                                    }, 0);
                                }
                            }, true);

                            function _1a8(type) {
                                win.doc.addEventListener(type, function(e) {
                                    var _1a9 = e.target;
                                    if (_18b && !e._dojo_click && (new Date()).getTime() <= _192 + 1000 && !(_1a9.tagName == "INPUT" && _183.contains(_1a9, "dijitOffScreen"))) {
                                        e.stopPropagation();
                                        e.stopImmediatePropagation && e.stopImmediatePropagation();
                                        if (type == "click" && (_1a9.tagName != "INPUT" || (_1a9.type == "radio" && (_183.contains(_1a9, "dijitCheckBoxInput") || _183.contains(_1a9, "mblRadioButton"))) || (_1a9.type == "checkbox" && (_183.contains(_1a9, "dijitCheckBoxInput") || _183.contains(_1a9, "mblCheckBox")))) && _1a9.tagName != "TEXTAREA" && _1a9.tagName != "AUDIO" && _1a9.tagName != "VIDEO") {
                                            e.preventDefault();
                                        }
                                    }
                                }, true);
                            };
                            _1a8("click");
                            _1a8("mousedown");
                            _1a8("mouseup");
                        }
                    }
                };
                var _1aa;
                if (has("touch")) {
                    if (_186) {
                        _185(function() {
                            win.doc.addEventListener(_187.down, function(evt) {
                                _19e(evt, _187.move, _187.up);
                            }, true);
                        });
                    } else {
                        _185(function() {
                            _1aa = win.body();
                            win.doc.addEventListener("touchstart", function(evt) {
                                _193 = (new Date()).getTime();
                                var _1ab = _1aa;
                                _1aa = evt.target;
                                on.emit(_1ab, "dojotouchout", {
                                    relatedTarget: _1aa,
                                    bubbles: true
                                });
                                on.emit(_1aa, "dojotouchover", {
                                    relatedTarget: _1ab,
                                    bubbles: true
                                });
                                _19e(evt, "touchmove", "touchend");
                            }, true);

                            function _1ac(evt) {
                                var _1ad = lang.delegate(evt, {
                                    bubbles: true
                                });
                                if (has("ios") >= 6) {
                                    _1ad.touches = evt.touches;
                                    _1ad.altKey = evt.altKey;
                                    _1ad.changedTouches = evt.changedTouches;
                                    _1ad.ctrlKey = evt.ctrlKey;
                                    _1ad.metaKey = evt.metaKey;
                                    _1ad.shiftKey = evt.shiftKey;
                                    _1ad.targetTouches = evt.targetTouches;
                                }
                                return _1ad;
                            };
                            on(win.doc, "touchmove", function(evt) {
                                _193 = (new Date()).getTime();
                                var _1ae = win.doc.elementFromPoint(evt.pageX - (ios4 ? 0 : win.global.pageXOffset), evt.pageY - (ios4 ? 0 : win.global.pageYOffset));
                                if (_1ae) {
                                    if (_1aa !== _1ae) {
                                        on.emit(_1aa, "dojotouchout", {
                                            relatedTarget: _1ae,
                                            bubbles: true
                                        });
                                        on.emit(_1ae, "dojotouchover", {
                                            relatedTarget: _1aa,
                                            bubbles: true
                                        });
                                        _1aa = _1ae;
                                    }
                                    if (!on.emit(_1ae, "dojotouchmove", _1ac(evt))) {
                                        evt.preventDefault();
                                    }
                                }
                            });
                            on(win.doc, "touchend", function(evt) {
                                _193 = (new Date()).getTime();
                                var node = win.doc.elementFromPoint(evt.pageX - (ios4 ? 0 : win.global.pageXOffset), evt.pageY - (ios4 ? 0 : win.global.pageYOffset)) || win.body();
                                on.emit(node, "dojotouchend", _1ac(evt));
                            });
                        });
                    }
                }
                var _1af = {
                    press: _194("mousedown", "touchstart", _187.down),
                    move: _194("mousemove", "dojotouchmove", _187.move),
                    release: _194("mouseup", "dojotouchend", _187.up),
                    cancel: _194(_184.leave, "touchcancel", _186 ? _187.cancel : null),
                    over: _194("mouseover", "dojotouchover", _187.over),
                    out: _194("mouseout", "dojotouchout", _187.out),
                    enter: _184._eventHandler(_194("mouseover", "dojotouchover", _187.over)),
                    leave: _184._eventHandler(_194("mouseout", "dojotouchout", _187.out))
                };
                1 && (dojo.touch = _1af);
                return _1af;
            });
        },
        "dijit/_base/scroll": function() {
            define(["dojo/window", "../main"], function(_1b0, _1b1) {
                _1b1.scrollIntoView = function(node, pos) {
                    _1b0.scrollIntoView(node, pos);
                };
            });
        },
        "dijit/_base/sniff": function() {
            define(["dojo/uacss"], function() {});
        },
        "dojo/uacss": function() {
            define(["./dom-geometry", "./_base/lang", "./domReady", "./sniff", "./_base/window"], function(_1b2, lang, _1b3, has, _1b4) {
                var html = _1b4.doc.documentElement,
                    ie = has("ie"),
                    _1b5 = has("trident"),
                    _1b6 = has("opera"),
                    maj = Math.floor,
                    ff = has("ff"),
                    _1b7 = _1b2.boxModel.replace(/-/, ""),
                    _1b8 = {
                        "dj_quirks": has("quirks"),
                        "dj_opera": _1b6,
                        "dj_khtml": has("khtml"),
                        "dj_webkit": has("webkit"),
                        "dj_safari": has("safari"),
                        "dj_chrome": has("chrome"),
                        "dj_edge": has("edge"),
                        "dj_gecko": has("mozilla"),
                        "dj_ios": has("ios"),
                        "dj_android": has("android")
                    };
                if (ie) {
                    _1b8["dj_ie"] = true;
                    _1b8["dj_ie" + maj(ie)] = true;
                    _1b8["dj_iequirks"] = has("quirks");
                }
                if (_1b5) {
                    _1b8["dj_trident"] = true;
                    _1b8["dj_trident" + maj(_1b5)] = true;
                }
                if (ff) {
                    _1b8["dj_ff" + maj(ff)] = true;
                }
                _1b8["dj_" + _1b7] = true;
                var _1b9 = "";
                for (var clz in _1b8) {
                    if (_1b8[clz]) {
                        _1b9 += clz + " ";
                    }
                }
                html.className = lang.trim(html.className + " " + _1b9);
                _1b3(function() {
                    if (!_1b2.isBodyLtr()) {
                        var _1ba = "dj_rtl dijitRtl " + _1b9.replace(/ /g, "-rtl ");
                        html.className = lang.trim(html.className + " " + _1ba + "dj_rtl dijitRtl " + _1b9.replace(/ /g, "-rtl "));
                    }
                });
                return has;
            });
        },
        "dijit/_base/typematic": function() {
            define(["../typematic"], function() {});
        },
        "dijit/typematic": function() {
            define(["dojo/_base/array", "dojo/_base/connect", "dojo/_base/lang", "dojo/on", "dojo/sniff", "./main"], function(_1bb, _1bc, lang, on, has, _1bd) {
                var _1be = (_1bd.typematic = {
                    _fireEventAndReload: function() {
                        this._timer = null;
                        this._callback(++this._count, this._node, this._evt);
                        this._currentTimeout = Math.max(this._currentTimeout < 0 ? this._initialDelay : (this._subsequentDelay > 1 ? this._subsequentDelay : Math.round(this._currentTimeout * this._subsequentDelay)), this._minDelay);
                        this._timer = setTimeout(lang.hitch(this, "_fireEventAndReload"), this._currentTimeout);
                    },
                    trigger: function(evt, _1bf, node, _1c0, obj, _1c1, _1c2, _1c3) {
                        if (obj != this._obj) {
                            this.stop();
                            this._initialDelay = _1c2 || 500;
                            this._subsequentDelay = _1c1 || 0.9;
                            this._minDelay = _1c3 || 10;
                            this._obj = obj;
                            this._node = node;
                            this._currentTimeout = -1;
                            this._count = -1;
                            this._callback = lang.hitch(_1bf, _1c0);
                            this._evt = {
                                faux: true
                            };
                            for (var attr in evt) {
                                if (attr != "layerX" && attr != "layerY") {
                                    var v = evt[attr];
                                    if (typeof v != "function" && typeof v != "undefined") {
                                        this._evt[attr] = v;
                                    }
                                }
                            }
                            this._fireEventAndReload();
                        }
                    },
                    stop: function() {
                        if (this._timer) {
                            clearTimeout(this._timer);
                            this._timer = null;
                        }
                        if (this._obj) {
                            this._callback(-1, this._node, this._evt);
                            this._obj = null;
                        }
                    },
                    addKeyListener: function(node, _1c4, _1c5, _1c6, _1c7, _1c8, _1c9) {
                        var type = "keyCode" in _1c4 ? "keydown" : "charCode" in _1c4 ? "keypress" : _1bc._keypress,
                            attr = "keyCode" in _1c4 ? "keyCode" : "charCode" in _1c4 ? "charCode" : "charOrCode";
                        var _1ca = [on(node, type, lang.hitch(this, function(evt) {
                            if (evt[attr] == _1c4[attr] && (_1c4.ctrlKey === undefined || _1c4.ctrlKey == evt.ctrlKey) && (_1c4.altKey === undefined || _1c4.altKey == evt.altKey) && (_1c4.metaKey === undefined || _1c4.metaKey == (evt.metaKey || false)) && (_1c4.shiftKey === undefined || _1c4.shiftKey == evt.shiftKey)) {
                                evt.stopPropagation();
                                evt.preventDefault();
                                _1be.trigger(evt, _1c5, node, _1c6, _1c4, _1c7, _1c8, _1c9);
                            } else {
                                if (_1be._obj == _1c4) {
                                    _1be.stop();
                                }
                            }
                        })), on(node, "keyup", lang.hitch(this, function() {
                            if (_1be._obj == _1c4) {
                                _1be.stop();
                            }
                        }))];
                        return {
                            remove: function() {
                                _1bb.forEach(_1ca, function(h) {
                                    h.remove();
                                });
                            }
                        };
                    },
                    addMouseListener: function(node, _1cb, _1cc, _1cd, _1ce, _1cf) {
                        var _1d0 = [on(node, "mousedown", lang.hitch(this, function(evt) {
                            evt.preventDefault();
                            _1be.trigger(evt, _1cb, node, _1cc, node, _1cd, _1ce, _1cf);
                        })), on(node, "mouseup", lang.hitch(this, function(evt) {
                            if (this._obj) {
                                evt.preventDefault();
                            }
                            _1be.stop();
                        })), on(node, "mouseout", lang.hitch(this, function(evt) {
                            if (this._obj) {
                                evt.preventDefault();
                            }
                            _1be.stop();
                        })), on(node, "dblclick", lang.hitch(this, function(evt) {
                            evt.preventDefault();
                            if (has("ie") < 9) {
                                _1be.trigger(evt, _1cb, node, _1cc, node, _1cd, _1ce, _1cf);
                                setTimeout(lang.hitch(this, _1be.stop), 50);
                            }
                        }))];
                        return {
                            remove: function() {
                                _1bb.forEach(_1d0, function(h) {
                                    h.remove();
                                });
                            }
                        };
                    },
                    addListener: function(_1d1, _1d2, _1d3, _1d4, _1d5, _1d6, _1d7, _1d8) {
                        var _1d9 = [this.addKeyListener(_1d2, _1d3, _1d4, _1d5, _1d6, _1d7, _1d8), this.addMouseListener(_1d1, _1d4, _1d5, _1d6, _1d7, _1d8)];
                        return {
                            remove: function() {
                                _1bb.forEach(_1d9, function(h) {
                                    h.remove();
                                });
                            }
                        };
                    }
                });
                return _1be;
            });
        },
        "dijit/_base/wai": function() {
            define(["dojo/dom-attr", "dojo/_base/lang", "../main", "../hccss"], function(_1da, lang, _1db) {
                var _1dc = {
                    hasWaiRole: function(elem, role) {
                        var _1dd = this.getWaiRole(elem);
                        return role ? (_1dd.indexOf(role) > -1) : (_1dd.length > 0);
                    },
                    getWaiRole: function(elem) {
                        return lang.trim((_1da.get(elem, "role") || "").replace("wairole:", ""));
                    },
                    setWaiRole: function(elem, role) {
                        _1da.set(elem, "role", role);
                    },
                    removeWaiRole: function(elem, role) {
                        var _1de = _1da.get(elem, "role");
                        if (!_1de) {
                            return;
                        }
                        if (role) {
                            var t = lang.trim((" " + _1de + " ").replace(" " + role + " ", " "));
                            _1da.set(elem, "role", t);
                        } else {
                            elem.removeAttribute("role");
                        }
                    },
                    hasWaiState: function(elem, _1df) {
                        return elem.hasAttribute ? elem.hasAttribute("aria-" + _1df) : !!elem.getAttribute("aria-" + _1df);
                    },
                    getWaiState: function(elem, _1e0) {
                        return elem.getAttribute("aria-" + _1e0) || "";
                    },
                    setWaiState: function(elem, _1e1, _1e2) {
                        elem.setAttribute("aria-" + _1e1, _1e2);
                    },
                    removeWaiState: function(elem, _1e3) {
                        elem.removeAttribute("aria-" + _1e3);
                    }
                };
                lang.mixin(_1db, _1dc);
                return _1db;
            });
        },
        "dijit/hccss": function() {
            define(["dojo/dom-class", "dojo/hccss", "dojo/domReady", "dojo/_base/window"], function(_1e4, has, _1e5, win) {
                _1e5(function() {
                    if (has("highcontrast")) {
                        _1e4.add(win.body(), "dijit_a11y");
                    }
                });
                return has;
            });
        },
        "dojo/hccss": function() {
            define(["require", "./_base/config", "./dom-class", "./dom-style", "./has", "./domReady", "./_base/window"], function(_1e6, _1e7, _1e8, _1e9, has, _1ea, win) {
                has.add("highcontrast", function() {
                    var div = win.doc.createElement("div");
                    try {
                        div.style.cssText = "border: 1px solid; border-color:red green; position: absolute; height: 5px; top: -999px;" + "background-image: url(\"" + (_1e7.blankGif || _1e6.toUrl("./resources/blank.gif")) + "\");";
                        win.body().appendChild(div);
                        var cs = _1e9.getComputedStyle(div),
                            _1eb = cs.backgroundImage;
                        return cs.borderTopColor == cs.borderRightColor || (_1eb && (_1eb == "none" || _1eb == "url(invalid-url:)"));
                    } catch (e) {
                        console.warn("hccss: exception detecting high-contrast mode, document is likely hidden: " + e.toString());
                        return false;
                    } finally {
                        if (has("ie") <= 8) {
                            div.outerHTML = "";
                        } else {
                            win.body().removeChild(div);
                        }
                    }
                });
                _1ea(function() {
                    if (has("highcontrast")) {
                        _1e8.add(win.body(), "dj_a11y");
                    }
                });
                return has;
            });
        },
        "dijit/_base/window": function() {
            define(["dojo/window", "../main"], function(_1ec, _1ed) {
                _1ed.getDocumentWindow = function(doc) {
                    return _1ec.get(doc);
                };
            });
        },
        "dojo/parser": function() {
            define(["require", "./_base/kernel", "./_base/lang", "./_base/array", "./_base/config", "./dom", "./_base/window", "./_base/url", "./aspect", "./promise/all", "./date/stamp", "./Deferred", "./has", "./query", "./on", "./ready"], function(_1ee, dojo, _1ef, _1f0, _1f1, dom, _1f2, _1f3, _1f4, all, _1f5, _1f6, has, _1f7, don, _1f8) {
                new Date("X");

                function _1f9(text) {
                    return eval("(" + text + ")");
                };
                var _1fa = 0;
                _1f4.after(_1ef, "extend", function() {
                    _1fa++;
                }, true);

                function _1fb(ctor) {
                    var map = ctor._nameCaseMap,
                        _1fc = ctor.prototype;
                    if (!map || map._extendCnt < _1fa) {
                        map = ctor._nameCaseMap = {};
                        for (var name in _1fc) {
                            if (name.charAt(0) === "_") {
                                continue;
                            }
                            map[name.toLowerCase()] = name;
                        }
                        map._extendCnt = _1fa;
                    }
                    return map;
                };

                function _1fd(_1fe, _1ff) {
                    if (!_1ff) {
                        _1ff = _1ee;
                    }
                    var _200 = _1ff._dojoParserCtorMap || (_1ff._dojoParserCtorMap = {});
                    var ts = _1fe.join();
                    if (!_200[ts]) {
                        var _201 = [];
                        for (var i = 0, l = _1fe.length; i < l; i++) {
                            var t = _1fe[i];
                            _201[_201.length] = (_200[t] = _200[t] || (_1ef.getObject(t) || (~t.indexOf("/") && _1ff(t))));
                        }
                        var ctor = _201.shift();
                        _200[ts] = _201.length ? (ctor.createSubclass ? ctor.createSubclass(_201) : ctor.extend.apply(ctor, _201)) : ctor;
                    }
                    return _200[ts];
                };
                var _202 = {
                    _clearCache: function() {
                        _1fa++;
                        _ctorMap = {};
                    },
                    _functionFromScript: function(_203, _204) {
                        var _205 = "",
                            _206 = "",
                            _207 = (_203.getAttribute(_204 + "args") || _203.getAttribute("args")),
                            _208 = _203.getAttribute("with");
                        var _209 = (_207 || "").split(/\s*,\s*/);
                        if (_208 && _208.length) {
                            _1f0.forEach(_208.split(/\s*,\s*/), function(part) {
                                _205 += "with(" + part + "){";
                                _206 += "}";
                            });
                        }
                        return new Function(_209, _205 + _203.innerHTML + _206);
                    },
                    instantiate: function(_20a, _20b, _20c) {
                        _20b = _20b || {};
                        _20c = _20c || {};
                        var _20d = (_20c.scope || dojo._scopeName) + "Type",
                            _20e = "data-" + (_20c.scope || dojo._scopeName) + "-",
                            _20f = _20e + "type",
                            _210 = _20e + "mixins";
                        var list = [];
                        _1f0.forEach(_20a, function(node) {
                            var type = _20d in _20b ? _20b[_20d] : node.getAttribute(_20f) || node.getAttribute(_20d);
                            if (type) {
                                var _211 = node.getAttribute(_210),
                                    _212 = _211 ? [type].concat(_211.split(/\s*,\s*/)) : [type];
                                list.push({
                                    node: node,
                                    types: _212
                                });
                            }
                        });
                        return this._instantiate(list, _20b, _20c);
                    },
                    _instantiate: function(_213, _214, _215, _216) {
                        var _217 = _1f0.map(_213, function(obj) {
                            var ctor = obj.ctor || _1fd(obj.types, _215.contextRequire);
                            if (!ctor) {
                                throw new Error("Unable to resolve constructor for: '" + obj.types.join() + "'");
                            }
                            return this.construct(ctor, obj.node, _214, _215, obj.scripts, obj.inherited);
                        }, this);

                        function _218(_219) {
                            if (!_214._started && !_215.noStart) {
                                _1f0.forEach(_219, function(_21a) {
                                    if (typeof _21a.startup === "function" && !_21a._started) {
                                        _21a.startup();
                                    }
                                });
                            }
                            return _219;
                        };
                        if (_216) {
                            return all(_217).then(_218);
                        } else {
                            return _218(_217);
                        }
                    },
                    construct: function(ctor, node, _21b, _21c, _21d, _21e) {
                        var _21f = ctor && ctor.prototype;
                        _21c = _21c || {};
                        var _220 = {};
                        if (_21c.defaults) {
                            _1ef.mixin(_220, _21c.defaults);
                        }
                        if (_21e) {
                            _1ef.mixin(_220, _21e);
                        }
                        var _221;
                        if (has("dom-attributes-explicit")) {
                            _221 = node.attributes;
                        } else {
                            if (has("dom-attributes-specified-flag")) {
                                _221 = _1f0.filter(node.attributes, function(a) {
                                    return a.specified;
                                });
                            } else {
                                var _222 = /^input$|^img$/i.test(node.nodeName) ? node : node.cloneNode(false),
                                    _223 = _222.outerHTML.replace(/=[^\s"']+|="[^"]*"|='[^']*'/g, "").replace(/^\s*<[a-zA-Z0-9]*\s*/, "").replace(/\s*>.*$/, "");
                                _221 = _1f0.map(_223.split(/\s+/), function(name) {
                                    var _224 = name.toLowerCase();
                                    return {
                                        name: name,
                                        value: (node.nodeName == "LI" && name == "value") || _224 == "enctype" ? node.getAttribute(_224) : node.getAttributeNode(_224).value
                                    };
                                });
                            }
                        }
                        var _225 = _21c.scope || dojo._scopeName,
                            _226 = "data-" + _225 + "-",
                            hash = {};
                        if (_225 !== "dojo") {
                            hash[_226 + "props"] = "data-dojo-props";
                            hash[_226 + "type"] = "data-dojo-type";
                            hash[_226 + "mixins"] = "data-dojo-mixins";
                            hash[_225 + "type"] = "dojotype";
                            hash[_226 + "id"] = "data-dojo-id";
                        }
                        var i = 0,
                            item, _227 = [],
                            _228, _229;
                        while (item = _221[i++]) {
                            var name = item.name,
                                _22a = name.toLowerCase(),
                                _22b = item.value;
                            switch (hash[_22a] || _22a) {
                                case "data-dojo-type":
                                case "dojotype":
                                case "data-dojo-mixins":
                                    break;
                                case "data-dojo-props":
                                    _229 = _22b;
                                    break;
                                case "data-dojo-id":
                                case "jsid":
                                    _228 = _22b;
                                    break;
                                case "data-dojo-attach-point":
                                case "dojoattachpoint":
                                    _220.dojoAttachPoint = _22b;
                                    break;
                                case "data-dojo-attach-event":
                                case "dojoattachevent":
                                    _220.dojoAttachEvent = _22b;
                                    break;
                                case "class":
                                    _220["class"] = node.className;
                                    break;
                                case "style":
                                    _220["style"] = node.style && node.style.cssText;
                                    break;
                                default:
                                    if (!(name in _21f)) {
                                        var map = _1fb(ctor);
                                        name = map[_22a] || name;
                                    }
                                    if (name in _21f) {
                                        switch (typeof _21f[name]) {
                                            case "string":
                                                _220[name] = _22b;
                                                break;
                                            case "number":
                                                _220[name] = _22b.length ? Number(_22b) : NaN;
                                                break;
                                            case "boolean":
                                                _220[name] = _22b.toLowerCase() != "false";
                                                break;
                                            case "function":
                                                if (_22b === "" || _22b.search(/[^\w\.]+/i) != -1) {
                                                    _220[name] = new Function(_22b);
                                                } else {
                                                    _220[name] = _1ef.getObject(_22b, false) || new Function(_22b);
                                                }
                                                _227.push(name);
                                                break;
                                            default:
                                                var pVal = _21f[name];
                                                _220[name] = (pVal && "length" in pVal) ? (_22b ? _22b.split(/\s*,\s*/) : []) : (pVal instanceof Date) ? (_22b == "" ? new Date("") : _22b == "now" ? new Date() : _1f5.fromISOString(_22b)) : (pVal instanceof _1f3) ? (dojo.baseUrl + _22b) : _1f9(_22b);
                                        }
                                    } else {
                                        _220[name] = _22b;
                                    }
                            }
                        }
                        for (var j = 0; j < _227.length; j++) {
                            var _22c = _227[j].toLowerCase();
                            node.removeAttribute(_22c);
                            node[_22c] = null;
                        }
                        if (_229) {
                            try {
                                _229 = _1f9.call(_21c.propsThis, "{" + _229 + "}");
                                _1ef.mixin(_220, _229);
                            } catch (e) {
                                throw new Error(e.toString() + " in data-dojo-props='" + _229 + "'");
                            }
                        }
                        _1ef.mixin(_220, _21b);
                        if (!_21d) {
                            _21d = (ctor && (ctor._noScript || _21f._noScript) ? [] : _1f7("> script[type^='dojo/']", node));
                        }
                        var _22d = [],
                            _22e = [],
                            _22f = [],
                            ons = [];
                        if (_21d) {
                            for (i = 0; i < _21d.length; i++) {
                                var _230 = _21d[i];
                                node.removeChild(_230);
                                var _231 = (_230.getAttribute(_226 + "event") || _230.getAttribute("event")),
                                    prop = _230.getAttribute(_226 + "prop"),
                                    _232 = _230.getAttribute(_226 + "method"),
                                    _233 = _230.getAttribute(_226 + "advice"),
                                    _234 = _230.getAttribute("type"),
                                    nf = this._functionFromScript(_230, _226);
                                if (_231) {
                                    if (_234 == "dojo/connect") {
                                        _22d.push({
                                            method: _231,
                                            func: nf
                                        });
                                    } else {
                                        if (_234 == "dojo/on") {
                                            ons.push({
                                                event: _231,
                                                func: nf
                                            });
                                        } else {
                                            _220[_231] = nf;
                                        }
                                    }
                                } else {
                                    if (_234 == "dojo/aspect") {
                                        _22d.push({
                                            method: _232,
                                            advice: _233,
                                            func: nf
                                        });
                                    } else {
                                        if (_234 == "dojo/watch") {
                                            _22f.push({
                                                prop: prop,
                                                func: nf
                                            });
                                        } else {
                                            _22e.push(nf);
                                        }
                                    }
                                }
                            }
                        }
                        var _235 = ctor.markupFactory || _21f.markupFactory;
                        var _236 = _235 ? _235(_220, node, ctor) : new ctor(_220, node);

                        function _237(_238) {
                            if (_228) {
                                _1ef.setObject(_228, _238);
                            }
                            for (i = 0; i < _22d.length; i++) {
                                _1f4[_22d[i].advice || "after"](_238, _22d[i].method, _1ef.hitch(_238, _22d[i].func), true);
                            }
                            for (i = 0; i < _22e.length; i++) {
                                _22e[i].call(_238);
                            }
                            for (i = 0; i < _22f.length; i++) {
                                _238.watch(_22f[i].prop, _22f[i].func);
                            }
                            for (i = 0; i < ons.length; i++) {
                                don(_238, ons[i].event, ons[i].func);
                            }
                            return _238;
                        };
                        if (_236.then) {
                            return _236.then(_237);
                        } else {
                            return _237(_236);
                        }
                    },
                    scan: function(root, _239) {
                        var list = [],
                            mids = [],
                            _23a = {};
                        var _23b = (_239.scope || dojo._scopeName) + "Type",
                            _23c = "data-" + (_239.scope || dojo._scopeName) + "-",
                            _23d = _23c + "type",
                            _23e = _23c + "textdir",
                            _23f = _23c + "mixins";
                        var node = root.firstChild;
                        var _240 = _239.inherited;
                        if (!_240) {
                            function _241(node, attr) {
                                return (node.getAttribute && node.getAttribute(attr)) || (node.parentNode && _241(node.parentNode, attr));
                            };
                            _240 = {
                                dir: _241(root, "dir"),
                                lang: _241(root, "lang"),
                                textDir: _241(root, _23e)
                            };
                            for (var key in _240) {
                                if (!_240[key]) {
                                    delete _240[key];
                                }
                            }
                        }
                        var _242 = {
                            inherited: _240
                        };
                        var _243;
                        var _244;

                        function _245(_246) {
                            if (!_246.inherited) {
                                _246.inherited = {};
                                var node = _246.node,
                                    _247 = _245(_246.parent);
                                var _248 = {
                                    dir: node.getAttribute("dir") || _247.dir,
                                    lang: node.getAttribute("lang") || _247.lang,
                                    textDir: node.getAttribute(_23e) || _247.textDir
                                };
                                for (var key in _248) {
                                    if (_248[key]) {
                                        _246.inherited[key] = _248[key];
                                    }
                                }
                            }
                            return _246.inherited;
                        };
                        while (true) {
                            if (!node) {
                                if (!_242 || !_242.node) {
                                    break;
                                }
                                node = _242.node.nextSibling;
                                _244 = false;
                                _242 = _242.parent;
                                _243 = _242.scripts;
                                continue;
                            }
                            if (node.nodeType != 1) {
                                node = node.nextSibling;
                                continue;
                            }
                            if (_243 && node.nodeName.toLowerCase() == "script") {
                                type = node.getAttribute("type");
                                if (type && /^dojo\/\w/i.test(type)) {
                                    _243.push(node);
                                }
                                node = node.nextSibling;
                                continue;
                            }
                            if (_244) {
                                node = node.nextSibling;
                                continue;
                            }
                            var type = node.getAttribute(_23d) || node.getAttribute(_23b);
                            var _249 = node.firstChild;
                            if (!type && (!_249 || (_249.nodeType == 3 && !_249.nextSibling))) {
                                node = node.nextSibling;
                                continue;
                            }
                            var _24a;
                            var ctor = null;
                            if (type) {
                                var _24b = node.getAttribute(_23f),
                                    _24c = _24b ? [type].concat(_24b.split(/\s*,\s*/)) : [type];
                                try {
                                    ctor = _1fd(_24c, _239.contextRequire);
                                } catch (e) {}
                                if (!ctor) {
                                    _1f0.forEach(_24c, function(t) {
                                        if (~t.indexOf("/") && !_23a[t]) {
                                            _23a[t] = true;
                                            mids[mids.length] = t;
                                        }
                                    });
                                }
                                var _24d = ctor && !ctor.prototype._noScript ? [] : null;
                                _24a = {
                                    types: _24c,
                                    ctor: ctor,
                                    parent: _242,
                                    node: node,
                                    scripts: _24d
                                };
                                _24a.inherited = _245(_24a);
                                list.push(_24a);
                            } else {
                                _24a = {
                                    node: node,
                                    scripts: _243,
                                    parent: _242
                                };
                            }
                            _243 = _24d;
                            _244 = node.stopParser || (ctor && ctor.prototype.stopParser && !(_239.template));
                            _242 = _24a;
                            node = _249;
                        }
                        var d = new _1f6();
                        if (mids.length) {
                            if (has("dojo-debug-messages")) {
                                console.warn("WARNING: Modules being Auto-Required: " + mids.join(", "));
                            }
                            var r = _239.contextRequire || _1ee;
                            r(mids, function() {
                                d.resolve(_1f0.filter(list, function(_24e) {
                                    if (!_24e.ctor) {
                                        try {
                                            _24e.ctor = _1fd(_24e.types, _239.contextRequire);
                                        } catch (e) {}
                                    }
                                    var _24f = _24e.parent;
                                    while (_24f && !_24f.types) {
                                        _24f = _24f.parent;
                                    }
                                    var _250 = _24e.ctor && _24e.ctor.prototype;
                                    _24e.instantiateChildren = !(_250 && _250.stopParser && !(_239.template));
                                    _24e.instantiate = !_24f || (_24f.instantiate && _24f.instantiateChildren);
                                    return _24e.instantiate;
                                }));
                            });
                        } else {
                            d.resolve(list);
                        }
                        return d.promise;
                    },
                    _require: function(_251, _252) {
                        var hash = _1f9("{" + _251.innerHTML + "}"),
                            vars = [],
                            mids = [],
                            d = new _1f6();
                        var _253 = (_252 && _252.contextRequire) || _1ee;
                        for (var name in hash) {
                            vars.push(name);
                            mids.push(hash[name]);
                        }
                        _253(mids, function() {
                            for (var i = 0; i < vars.length; i++) {
                                _1ef.setObject(vars[i], arguments[i]);
                            }
                            d.resolve(arguments);
                        });
                        return d.promise;
                    },
                    _scanAmd: function(root, _254) {
                        var _255 = new _1f6(),
                            _256 = _255.promise;
                        _255.resolve(true);
                        var self = this;
                        _1f7("script[type='dojo/require']", root).forEach(function(node) {
                            _256 = _256.then(function() {
                                return self._require(node, _254);
                            });
                            node.parentNode.removeChild(node);
                        });
                        return _256;
                    },
                    parse: function(_257, _258) {
                        if (_257 && typeof _257 != "string" && !("nodeType" in _257)) {
                            _258 = _257;
                            _257 = _258.rootNode;
                        }
                        var root = _257 ? dom.byId(_257) : _1f2.body();
                        _258 = _258 || {};
                        var _259 = _258.template ? {
                                template: true
                            } : {},
                            _25a = [],
                            self = this;
                        var p = this._scanAmd(root, _258).then(function() {
                            return self.scan(root, _258);
                        }).then(function(_25b) {
                            return self._instantiate(_25b, _259, _258, true);
                        }).then(function(_25c) {
                            return _25a = _25a.concat(_25c);
                        }).otherwise(function(e) {
                            console.error("dojo/parser::parse() error", e);
                            throw e;
                        });
                        _1ef.mixin(_25a, p);
                        return _25a;
                    }
                };
                if (1) {
                    dojo.parser = _202;
                }
                if (_1f1.parseOnLoad) {
                    _1f8(100, _202, "parse");
                }
                return _202;
            });
        },
        "dojo/_base/url": function() {
            define(["./kernel"], function(dojo) {
                var ore = new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?$"),
                    ire = new RegExp("^((([^\\[:]+):)?([^@]+)@)?(\\[([^\\]]+)\\]|([^\\[:]*))(:([0-9]+))?$"),
                    _25d = function() {
                        var n = null,
                            _25e = arguments,
                            uri = [_25e[0]];
                        for (var i = 1; i < _25e.length; i++) {
                            if (!_25e[i]) {
                                continue;
                            }
                            var _25f = new _25d(_25e[i] + ""),
                                _260 = new _25d(uri[0] + "");
                            if (_25f.path == "" && !_25f.scheme && !_25f.authority && !_25f.query) {
                                if (_25f.fragment != n) {
                                    _260.fragment = _25f.fragment;
                                }
                                _25f = _260;
                            } else {
                                if (!_25f.scheme) {
                                    _25f.scheme = _260.scheme;
                                    if (!_25f.authority) {
                                        _25f.authority = _260.authority;
                                        if (_25f.path.charAt(0) != "/") {
                                            var path = _260.path.substring(0, _260.path.lastIndexOf("/") + 1) + _25f.path;
                                            var segs = path.split("/");
                                            for (var j = 0; j < segs.length; j++) {
                                                if (segs[j] == ".") {
                                                    if (j == segs.length - 1) {
                                                        segs[j] = "";
                                                    } else {
                                                        segs.splice(j, 1);
                                                        j--;
                                                    }
                                                } else {
                                                    if (j > 0 && !(j == 1 && segs[0] == "") && segs[j] == ".." && segs[j - 1] != "..") {
                                                        if (j == (segs.length - 1)) {
                                                            segs.splice(j, 1);
                                                            segs[j - 1] = "";
                                                        } else {
                                                            segs.splice(j - 1, 2);
                                                            j -= 2;
                                                        }
                                                    }
                                                }
                                            }
                                            _25f.path = segs.join("/");
                                        }
                                    }
                                }
                            }
                            uri = [];
                            if (_25f.scheme) {
                                uri.push(_25f.scheme, ":");
                            }
                            if (_25f.authority) {
                                uri.push("//", _25f.authority);
                            }
                            uri.push(_25f.path);
                            if (_25f.query) {
                                uri.push("?", _25f.query);
                            }
                            if (_25f.fragment) {
                                uri.push("#", _25f.fragment);
                            }
                        }
                        this.uri = uri.join("");
                        var r = this.uri.match(ore);
                        this.scheme = r[2] || (r[1] ? "" : n);
                        this.authority = r[4] || (r[3] ? "" : n);
                        this.path = r[5];
                        this.query = r[7] || (r[6] ? "" : n);
                        this.fragment = r[9] || (r[8] ? "" : n);
                        if (this.authority != n) {
                            r = this.authority.match(ire);
                            this.user = r[3] || n;
                            this.password = r[4] || n;
                            this.host = r[6] || r[7];
                            this.port = r[9] || n;
                        }
                    };
                _25d.prototype.toString = function() {
                    return this.uri;
                };
                return dojo._Url = _25d;
            });
        },
        "dojo/promise/all": function() {
            define(["../_base/array", "../Deferred", "../when"], function(_261, _262, when) {
                "use strict";
                var some = _261.some;
                return function all(_263) {
                    var _264, _261;
                    if (_263 instanceof Array) {
                        _261 = _263;
                    } else {
                        if (_263 && typeof _263 === "object") {
                            _264 = _263;
                        }
                    }
                    var _265;
                    var _266 = [];
                    if (_264) {
                        _261 = [];
                        for (var key in _264) {
                            if (Object.hasOwnProperty.call(_264, key)) {
                                _266.push(key);
                                _261.push(_264[key]);
                            }
                        }
                        _265 = {};
                    } else {
                        if (_261) {
                            _265 = [];
                        }
                    }
                    if (!_261 || !_261.length) {
                        return new _262().resolve(_265);
                    }
                    var _267 = new _262();
                    _267.promise.always(function() {
                        _265 = _266 = null;
                    });
                    var _268 = _261.length;
                    some(_261, function(_269, _26a) {
                        if (!_264) {
                            _266.push(_26a);
                        }
                        when(_269, function(_26b) {
                            if (!_267.isFulfilled()) {
                                _265[_266[_26a]] = _26b;
                                if (--_268 === 0) {
                                    _267.resolve(_265);
                                }
                            }
                        }, _267.reject);
                        return _267.isFulfilled();
                    });
                    return _267.promise;
                };
            });
        },
        "dojo/date/stamp": function() {
            define(["../_base/lang", "../_base/array"], function(lang, _26c) {
                var _26d = {};
                lang.setObject("dojo.date.stamp", _26d);
                _26d.fromISOString = function(_26e, _26f) {
                    if (!_26d._isoRegExp) {
                        _26d._isoRegExp = /^(?:(\d{4})(?:-(\d{2})(?:-(\d{2}))?)?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(.\d+)?)?((?:[+-](\d{2}):(\d{2}))|Z)?)?$/;
                    }
                    var _270 = _26d._isoRegExp.exec(_26e),
                        _271 = null;
                    if (_270) {
                        _270.shift();
                        if (_270[1]) {
                            _270[1]--;
                        }
                        if (_270[6]) {
                            _270[6] *= 1000;
                        }
                        if (_26f) {
                            _26f = new Date(_26f);
                            _26c.forEach(_26c.map(["FullYear", "Month", "Date", "Hours", "Minutes", "Seconds", "Milliseconds"], function(prop) {
                                return _26f["get" + prop]();
                            }), function(_272, _273) {
                                _270[_273] = _270[_273] || _272;
                            });
                        }
                        _271 = new Date(_270[0] || 1970, _270[1] || 0, _270[2] || 1, _270[3] || 0, _270[4] || 0, _270[5] || 0, _270[6] || 0);
                        if (_270[0] < 100) {
                            _271.setFullYear(_270[0] || 1970);
                        }
                        var _274 = 0,
                            _275 = _270[7] && _270[7].charAt(0);
                        if (_275 != "Z") {
                            _274 = ((_270[8] || 0) * 60) + (Number(_270[9]) || 0);
                            if (_275 != "-") {
                                _274 *= -1;
                            }
                        }
                        if (_275) {
                            _274 -= _271.getTimezoneOffset();
                        }
                        if (_274) {
                            _271.setTime(_271.getTime() + _274 * 60000);
                        }
                    }
                    return _271;
                };
                _26d.toISOString = function(_276, _277) {
                    var _278 = function(n) {
                        return (n < 10) ? "0" + n : n;
                    };
                    _277 = _277 || {};
                    var _279 = [],
                        _27a = _277.zulu ? "getUTC" : "get",
                        date = "";
                    if (_277.selector != "time") {
                        var year = _276[_27a + "FullYear"]();
                        date = ["0000".substr((year + "").length) + year, _278(_276[_27a + "Month"]() + 1), _278(_276[_27a + "Date"]())].join("-");
                    }
                    _279.push(date);
                    if (_277.selector != "date") {
                        var time = [_278(_276[_27a + "Hours"]()), _278(_276[_27a + "Minutes"]()), _278(_276[_27a + "Seconds"]())].join(":");
                        var _27b = _276[_27a + "Milliseconds"]();
                        if (_277.milliseconds) {
                            time += "." + (_27b < 100 ? "0" : "") + _278(_27b);
                        }
                        if (_277.zulu) {
                            time += "Z";
                        } else {
                            if (_277.selector != "time") {
                                var _27c = _276.getTimezoneOffset();
                                var _27d = Math.abs(_27c);
                                time += (_27c > 0 ? "-" : "+") + _278(Math.floor(_27d / 60)) + ":" + _278(_27d % 60);
                            }
                        }
                        _279.push(time);
                    }
                    return _279.join("T");
                };
                return _26d;
            });
        },
        "dijit/_Widget": function() {
            define(["dojo/aspect", "dojo/_base/config", "dojo/_base/connect", "dojo/_base/declare", "dojo/has", "dojo/_base/kernel", "dojo/_base/lang", "dojo/query", "dojo/ready", "./registry", "./_WidgetBase", "./_OnDijitClickMixin", "./_FocusMixin", "dojo/uacss", "./hccss"], function(_27e, _27f, _280, _281, has, _282, lang, _283, _284, _285, _286, _287, _288) {
                function _289() {};

                function _28a(_28b) {
                    return function(obj, _28c, _28d, _28e) {
                        if (obj && typeof _28c == "string" && obj[_28c] == _289) {
                            return obj.on(_28c.substring(2).toLowerCase(), lang.hitch(_28d, _28e));
                        }
                        return _28b.apply(_280, arguments);
                    };
                };
                _27e.around(_280, "connect", _28a);
                if (_282.connect) {
                    _27e.around(_282, "connect", _28a);
                }
                var _28f = _281("dijit._Widget", [_286, _287, _288], {
                    onClick: _289,
                    onDblClick: _289,
                    onKeyDown: _289,
                    onKeyPress: _289,
                    onKeyUp: _289,
                    onMouseDown: _289,
                    onMouseMove: _289,
                    onMouseOut: _289,
                    onMouseOver: _289,
                    onMouseLeave: _289,
                    onMouseEnter: _289,
                    onMouseUp: _289,
                    constructor: function(_290) {
                        this._toConnect = {};
                        for (var name in _290) {
                            if (this[name] === _289) {
                                this._toConnect[name.replace(/^on/, "").toLowerCase()] = _290[name];
                                delete _290[name];
                            }
                        }
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        for (var name in this._toConnect) {
                            this.on(name, this._toConnect[name]);
                        }
                        delete this._toConnect;
                    },
                    on: function(type, func) {
                        if (this[this._onMap(type)] === _289) {
                            return _280.connect(this.domNode, type.toLowerCase(), this, func);
                        }
                        return this.inherited(arguments);
                    },
                    _setFocusedAttr: function(val) {
                        this._focused = val;
                        this._set("focused", val);
                    },
                    setAttribute: function(attr, _291) {
                        _282.deprecated(this.declaredClass + "::setAttribute(attr, value) is deprecated. Use set() instead.", "", "2.0");
                        this.set(attr, _291);
                    },
                    attr: function(name, _292) {
                        var args = arguments.length;
                        if (args >= 2 || typeof name === "object") {
                            return this.set.apply(this, arguments);
                        } else {
                            return this.get(name);
                        }
                    },
                    getDescendants: function() {
                        _282.deprecated(this.declaredClass + "::getDescendants() is deprecated. Use getChildren() instead.", "", "2.0");
                        return this.containerNode ? _283("[widgetId]", this.containerNode).map(_285.byNode) : [];
                    },
                    _onShow: function() {
                        this.onShow();
                    },
                    onShow: function() {},
                    onHide: function() {},
                    onClose: function() {
                        return true;
                    }
                });
                if (has("dijit-legacy-requires")) {
                    _284(0, function() {
                        var _293 = ["dijit/_base"];
                        require(_293);
                    });
                }
                return _28f;
            });
        },
        "dijit/_WidgetBase": function() {
            define(["require", "dojo/_base/array", "dojo/aspect", "dojo/_base/config", "dojo/_base/connect", "dojo/_base/declare", "dojo/dom", "dojo/dom-attr", "dojo/dom-class", "dojo/dom-construct", "dojo/dom-geometry", "dojo/dom-style", "dojo/has", "dojo/_base/kernel", "dojo/_base/lang", "dojo/on", "dojo/ready", "dojo/Stateful", "dojo/topic", "dojo/_base/window", "./Destroyable", "dojo/has!dojo-bidi?./_BidiMixin", "./registry"], function(_294, _295, _296, _297, _298, _299, dom, _29a, _29b, _29c, _29d, _29e, has, _29f, lang, on, _2a0, _2a1, _2a2, win, _2a3, _2a4, _2a5) {
                has.add("dijit-legacy-requires", !_29f.isAsync);
                has.add("dojo-bidi", false);
                if (has("dijit-legacy-requires")) {
                    _2a0(0, function() {
                        var _2a6 = ["dijit/_base/manager"];
                        _294(_2a6);
                    });
                }
                var _2a7 = {};

                function _2a8(obj) {
                    var ret = {};
                    for (var attr in obj) {
                        ret[attr.toLowerCase()] = true;
                    }
                    return ret;
                };

                function _2a9(attr) {
                    return function(val) {
                        _29a[val ? "set" : "remove"](this.domNode, attr, val);
                        this._set(attr, val);
                    };
                };

                function _2aa(a, b) {
                    return a === b || (a !== a && b !== b);
                };
                var _2ab = _299("dijit._WidgetBase", [_2a1, _2a3], {
                    id: "",
                    _setIdAttr: "domNode",
                    lang: "",
                    _setLangAttr: _2a9("lang"),
                    dir: "",
                    _setDirAttr: _2a9("dir"),
                    "class": "",
                    _setClassAttr: {
                        node: "domNode",
                        type: "class"
                    },
                    _setTypeAttr: null,
                    style: "",
                    title: "",
                    tooltip: "",
                    baseClass: "",
                    srcNodeRef: null,
                    domNode: null,
                    containerNode: null,
                    ownerDocument: null,
                    _setOwnerDocumentAttr: function(val) {
                        this._set("ownerDocument", val);
                    },
                    attributeMap: {},
                    _blankGif: _297.blankGif || _294.toUrl("dojo/resources/blank.gif"),
                    textDir: "",
                    _introspect: function() {
                        var ctor = this.constructor;
                        if (!ctor._setterAttrs) {
                            var _2ac = ctor.prototype,
                                _2ad = ctor._setterAttrs = [],
                                _2ae = (ctor._onMap = {});
                            for (var name in _2ac.attributeMap) {
                                _2ad.push(name);
                            }
                            for (name in _2ac) {
                                if (/^on/.test(name)) {
                                    _2ae[name.substring(2).toLowerCase()] = name;
                                }
                                if (/^_set[A-Z](.*)Attr$/.test(name)) {
                                    name = name.charAt(4).toLowerCase() + name.substr(5, name.length - 9);
                                    if (!_2ac.attributeMap || !(name in _2ac.attributeMap)) {
                                        _2ad.push(name);
                                    }
                                }
                            }
                        }
                    },
                    postscript: function(_2af, _2b0) {
                        this.create(_2af, _2b0);
                    },
                    create: function(_2b1, _2b2) {
                        this._introspect();
                        this.srcNodeRef = dom.byId(_2b2);
                        this._connects = [];
                        this._supportingWidgets = [];
                        if (this.srcNodeRef && this.srcNodeRef.id && (typeof this.srcNodeRef.id == "string")) {
                            this.id = this.srcNodeRef.id;
                        }
                        if (_2b1) {
                            this.params = _2b1;
                            lang.mixin(this, _2b1);
                        }
                        this.postMixInProperties();
                        if (!this.id) {
                            this.id = _2a5.getUniqueId(this.declaredClass.replace(/\./g, "_"));
                            if (this.params) {
                                delete this.params.id;
                            }
                        }
                        this.ownerDocument = this.ownerDocument || (this.srcNodeRef ? this.srcNodeRef.ownerDocument : document);
                        this.ownerDocumentBody = win.body(this.ownerDocument);
                        _2a5.add(this);
                        this.buildRendering();
                        var _2b3;
                        if (this.domNode) {
                            this._applyAttributes();
                            var _2b4 = this.srcNodeRef;
                            if (_2b4 && _2b4.parentNode && this.domNode !== _2b4) {
                                _2b4.parentNode.replaceChild(this.domNode, _2b4);
                                _2b3 = true;
                            }
                            this.domNode.setAttribute("widgetId", this.id);
                        }
                        this.postCreate();
                        if (_2b3) {
                            delete this.srcNodeRef;
                        }
                        this._created = true;
                    },
                    _applyAttributes: function() {
                        var _2b5 = {};
                        for (var key in this.params || {}) {
                            _2b5[key] = this._get(key);
                        }
                        _295.forEach(this.constructor._setterAttrs, function(key) {
                            if (!(key in _2b5)) {
                                var val = this._get(key);
                                if (val) {
                                    this.set(key, val);
                                }
                            }
                        }, this);
                        for (key in _2b5) {
                            this.set(key, _2b5[key]);
                        }
                    },
                    postMixInProperties: function() {},
                    buildRendering: function() {
                        if (!this.domNode) {
                            this.domNode = this.srcNodeRef || this.ownerDocument.createElement("div");
                        }
                        if (this.baseClass) {
                            var _2b6 = this.baseClass.split(" ");
                            if (!this.isLeftToRight()) {
                                _2b6 = _2b6.concat(_295.map(_2b6, function(name) {
                                    return name + "Rtl";
                                }));
                            }
                            _29b.add(this.domNode, _2b6);
                        }
                    },
                    postCreate: function() {},
                    startup: function() {
                        if (this._started) {
                            return;
                        }
                        this._started = true;
                        _295.forEach(this.getChildren(), function(obj) {
                            if (!obj._started && !obj._destroyed && lang.isFunction(obj.startup)) {
                                obj.startup();
                                obj._started = true;
                            }
                        });
                    },
                    destroyRecursive: function(_2b7) {
                        this._beingDestroyed = true;
                        this.destroyDescendants(_2b7);
                        this.destroy(_2b7);
                    },
                    destroy: function(_2b8) {
                        this._beingDestroyed = true;
                        this.uninitialize();

                        function _2b9(w) {
                            if (w.destroyRecursive) {
                                w.destroyRecursive(_2b8);
                            } else {
                                if (w.destroy) {
                                    w.destroy(_2b8);
                                }
                            }
                        };
                        _295.forEach(this._connects, lang.hitch(this, "disconnect"));
                        _295.forEach(this._supportingWidgets, _2b9);
                        if (this.domNode) {
                            _295.forEach(_2a5.findWidgets(this.domNode, this.containerNode), _2b9);
                        }
                        this.destroyRendering(_2b8);
                        _2a5.remove(this.id);
                        this._destroyed = true;
                    },
                    destroyRendering: function(_2ba) {
                        if (this.bgIframe) {
                            this.bgIframe.destroy(_2ba);
                            delete this.bgIframe;
                        }
                        if (this.domNode) {
                            if (_2ba) {
                                _29a.remove(this.domNode, "widgetId");
                            } else {
                                _29c.destroy(this.domNode);
                            }
                            delete this.domNode;
                        }
                        if (this.srcNodeRef) {
                            if (!_2ba) {
                                _29c.destroy(this.srcNodeRef);
                            }
                            delete this.srcNodeRef;
                        }
                    },
                    destroyDescendants: function(_2bb) {
                        _295.forEach(this.getChildren(), function(_2bc) {
                            if (_2bc.destroyRecursive) {
                                _2bc.destroyRecursive(_2bb);
                            }
                        });
                    },
                    uninitialize: function() {
                        return false;
                    },
                    _setStyleAttr: function(_2bd) {
                        var _2be = this.domNode;
                        if (lang.isObject(_2bd)) {
                            _29e.set(_2be, _2bd);
                        } else {
                            if (_2be.style.cssText) {
                                _2be.style.cssText += "; " + _2bd;
                            } else {
                                _2be.style.cssText = _2bd;
                            }
                        }
                        this._set("style", _2bd);
                    },
                    _attrToDom: function(attr, _2bf, _2c0) {
                        _2c0 = arguments.length >= 3 ? _2c0 : this.attributeMap[attr];
                        _295.forEach(lang.isArray(_2c0) ? _2c0 : [_2c0], function(_2c1) {
                            var _2c2 = this[_2c1.node || _2c1 || "domNode"];
                            var type = _2c1.type || "attribute";
                            switch (type) {
                                case "attribute":
                                    if (lang.isFunction(_2bf)) {
                                        _2bf = lang.hitch(this, _2bf);
                                    }
                                    var _2c3 = _2c1.attribute ? _2c1.attribute : (/^on[A-Z][a-zA-Z]*$/.test(attr) ? attr.toLowerCase() : attr);
                                    if (_2c2.tagName) {
                                        _29a.set(_2c2, _2c3, _2bf);
                                    } else {
                                        _2c2.set(_2c3, _2bf);
                                    }
                                    break;
                                case "innerText":
                                    _2c2.innerHTML = "";
                                    _2c2.appendChild(this.ownerDocument.createTextNode(_2bf));
                                    break;
                                case "innerHTML":
                                    _2c2.innerHTML = _2bf;
                                    break;
                                case "class":
                                    _29b.replace(_2c2, _2bf, this[attr]);
                                    break;
                                case "toggleClass":
                                    _29b.toggle(_2c2, _2c1.className || attr, _2bf);
                                    break;
                            }
                        }, this);
                    },
                    get: function(name) {
                        var _2c4 = this._getAttrNames(name);
                        return this[_2c4.g] ? this[_2c4.g]() : this._get(name);
                    },
                    set: function(name, _2c5) {
                        if (typeof name === "object") {
                            for (var x in name) {
                                this.set(x, name[x]);
                            }
                            return this;
                        }
                        var _2c6 = this._getAttrNames(name),
                            _2c7 = this[_2c6.s];
                        if (lang.isFunction(_2c7)) {
                            var _2c8 = _2c7.apply(this, Array.prototype.slice.call(arguments, 1));
                        } else {
                            var _2c9 = this.focusNode && !lang.isFunction(this.focusNode) ? "focusNode" : "domNode",
                                tag = this[_2c9] && this[_2c9].tagName,
                                _2ca = tag && (_2a7[tag] || (_2a7[tag] = _2a8(this[_2c9]))),
                                map = name in this.attributeMap ? this.attributeMap[name] : _2c6.s in this ? this[_2c6.s] : ((_2ca && _2c6.l in _2ca && typeof _2c5 != "function") || /^aria-|^data-|^role$/.test(name)) ? _2c9 : null;
                            if (map != null) {
                                this._attrToDom(name, _2c5, map);
                            }
                            this._set(name, _2c5);
                        }
                        return _2c8 || this;
                    },
                    _attrPairNames: {},
                    _getAttrNames: function(name) {
                        var apn = this._attrPairNames;
                        if (apn[name]) {
                            return apn[name];
                        }
                        var uc = name.replace(/^[a-z]|-[a-zA-Z]/g, function(c) {
                            return c.charAt(c.length - 1).toUpperCase();
                        });
                        return (apn[name] = {
                            n: name + "Node",
                            s: "_set" + uc + "Attr",
                            g: "_get" + uc + "Attr",
                            l: uc.toLowerCase()
                        });
                    },
                    _set: function(name, _2cb) {
                        var _2cc = this[name];
                        this[name] = _2cb;
                        if (this._created && !_2aa(_2cc, _2cb)) {
                            if (this._watchCallbacks) {
                                this._watchCallbacks(name, _2cc, _2cb);
                            }
                            this.emit("attrmodified-" + name, {
                                detail: {
                                    prevValue: _2cc,
                                    newValue: _2cb
                                }
                            });
                        }
                    },
                    _get: function(name) {
                        return this[name];
                    },
                    emit: function(type, _2cd, _2ce) {
                        _2cd = _2cd || {};
                        if (_2cd.bubbles === undefined) {
                            _2cd.bubbles = true;
                        }
                        if (_2cd.cancelable === undefined) {
                            _2cd.cancelable = true;
                        }
                        if (!_2cd.detail) {
                            _2cd.detail = {};
                        }
                        _2cd.detail.widget = this;
                        var ret, _2cf = this["on" + type];
                        if (_2cf) {
                            ret = _2cf.apply(this, _2ce ? _2ce : [_2cd]);
                        }
                        if (this._started && !this._beingDestroyed) {
                            on.emit(this.domNode, type.toLowerCase(), _2cd);
                        }
                        return ret;
                    },
                    on: function(type, func) {
                        var _2d0 = this._onMap(type);
                        if (_2d0) {
                            return _296.after(this, _2d0, func, true);
                        }
                        return this.own(on(this.domNode, type, func))[0];
                    },
                    _onMap: function(type) {
                        var ctor = this.constructor,
                            map = ctor._onMap;
                        if (!map) {
                            map = (ctor._onMap = {});
                            for (var attr in ctor.prototype) {
                                if (/^on/.test(attr)) {
                                    map[attr.replace(/^on/, "").toLowerCase()] = attr;
                                }
                            }
                        }
                        return map[typeof type == "string" && type.toLowerCase()];
                    },
                    toString: function() {
                        return "[Widget " + this.declaredClass + ", " + (this.id || "NO ID") + "]";
                    },
                    getChildren: function() {
                        return this.containerNode ? _2a5.findWidgets(this.containerNode) : [];
                    },
                    getParent: function() {
                        return _2a5.getEnclosingWidget(this.domNode.parentNode);
                    },
                    connect: function(obj, _2d1, _2d2) {
                        return this.own(_298.connect(obj, _2d1, this, _2d2))[0];
                    },
                    disconnect: function(_2d3) {
                        _2d3.remove();
                    },
                    subscribe: function(t, _2d4) {
                        return this.own(_2a2.subscribe(t, lang.hitch(this, _2d4)))[0];
                    },
                    unsubscribe: function(_2d5) {
                        _2d5.remove();
                    },
                    isLeftToRight: function() {
                        return this.dir ? (this.dir.toLowerCase() == "ltr") : _29d.isBodyLtr(this.ownerDocument);
                    },
                    isFocusable: function() {
                        return this.focus && (_29e.get(this.domNode, "display") != "none");
                    },
                    placeAt: function(_2d6, _2d7) {
                        var _2d8 = !_2d6.tagName && _2a5.byId(_2d6);
                        if (_2d8 && _2d8.addChild && (!_2d7 || typeof _2d7 === "number")) {
                            _2d8.addChild(this, _2d7);
                        } else {
                            var ref = _2d8 && ("domNode" in _2d8) ? (_2d8.containerNode && !/after|before|replace/.test(_2d7 || "") ? _2d8.containerNode : _2d8.domNode) : dom.byId(_2d6, this.ownerDocument);
                            _29c.place(this.domNode, ref, _2d7);
                            if (!this._started && (this.getParent() || {})._started) {
                                this.startup();
                            }
                        }
                        return this;
                    },
                    defer: function(fcn, _2d9) {
                        var _2da = setTimeout(lang.hitch(this, function() {
                            if (!_2da) {
                                return;
                            }
                            _2da = null;
                            if (!this._destroyed) {
                                lang.hitch(this, fcn)();
                            }
                        }), _2d9 || 0);
                        return {
                            remove: function() {
                                if (_2da) {
                                    clearTimeout(_2da);
                                    _2da = null;
                                }
                                return null;
                            }
                        };
                    }
                });
                if (has("dojo-bidi")) {
                    _2ab.extend(_2a4);
                }
                return _2ab;
            });
        },
        "dijit/Destroyable": function() {
            define(["dojo/_base/array", "dojo/aspect", "dojo/_base/declare"], function(_2db, _2dc, _2dd) {
                return _2dd("dijit.Destroyable", null, {
                    destroy: function(_2de) {
                        this._destroyed = true;
                    },
                    own: function() {
                        var _2df = ["destroyRecursive", "destroy", "remove"];
                        _2db.forEach(arguments, function(_2e0) {
                            var _2e1;
                            var odh = _2dc.before(this, "destroy", function(_2e2) {
                                _2e0[_2e1](_2e2);
                            });
                            var hdhs = [];

                            function _2e3() {
                                odh.remove();
                                _2db.forEach(hdhs, function(hdh) {
                                    hdh.remove();
                                });
                            };
                            if (_2e0.then) {
                                _2e1 = "cancel";
                                _2e0.then(_2e3, _2e3);
                            } else {
                                _2db.forEach(_2df, function(_2e4) {
                                    if (typeof _2e0[_2e4] === "function") {
                                        if (!_2e1) {
                                            _2e1 = _2e4;
                                        }
                                        hdhs.push(_2dc.after(_2e0, _2e4, _2e3, true));
                                    }
                                });
                            }
                        }, this);
                        return arguments;
                    }
                });
            });
        },
        "dijit/_OnDijitClickMixin": function() {
            define(["dojo/on", "dojo/_base/array", "dojo/keys", "dojo/_base/declare", "dojo/has", "./a11yclick"], function(on, _2e5, keys, _2e6, has, _2e7) {
                var ret = _2e6("dijit._OnDijitClickMixin", null, {
                    connect: function(obj, _2e8, _2e9) {
                        return this.inherited(arguments, [obj, _2e8 == "ondijitclick" ? _2e7 : _2e8, _2e9]);
                    }
                });
                ret.a11yclick = _2e7;
                return ret;
            });
        },
        "dijit/a11yclick": function() {
            define(["dojo/keys", "dojo/mouse", "dojo/on", "dojo/touch"], function(keys, _2ea, on, _2eb) {
                function _2ec(e) {
                    if ((e.keyCode === keys.ENTER || e.keyCode === keys.SPACE) && !/input|button|textarea/i.test(e.target.nodeName)) {
                        for (var node = e.target; node; node = node.parentNode) {
                            if (node.dojoClick) {
                                return true;
                            }
                        }
                    }
                };
                var _2ed;
                on(document, "keydown", function(e) {
                    if (_2ec(e)) {
                        _2ed = e.target;
                        e.preventDefault();
                    } else {
                        _2ed = null;
                    }
                });
                on(document, "keyup", function(e) {
                    if (_2ec(e) && e.target == _2ed) {
                        _2ed = null;
                        on.emit(e.target, "click", {
                            cancelable: true,
                            bubbles: true,
                            ctrlKey: e.ctrlKey,
                            shiftKey: e.shiftKey,
                            metaKey: e.metaKey,
                            altKey: e.altKey,
                            _origType: e.type
                        });
                    }
                });
                var _2ee = function(node, _2ef) {
                    node.dojoClick = true;
                    return on(node, "click", _2ef);
                };
                _2ee.click = _2ee;
                _2ee.press = function(node, _2f0) {
                    var _2f1 = on(node, _2eb.press, function(evt) {
                            if (evt.type == "mousedown" && !_2ea.isLeft(evt)) {
                                return;
                            }
                            _2f0(evt);
                        }),
                        _2f2 = on(node, "keydown", function(evt) {
                            if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
                                _2f0(evt);
                            }
                        });
                    return {
                        remove: function() {
                            _2f1.remove();
                            _2f2.remove();
                        }
                    };
                };
                _2ee.release = function(node, _2f3) {
                    var _2f4 = on(node, _2eb.release, function(evt) {
                            if (evt.type == "mouseup" && !_2ea.isLeft(evt)) {
                                return;
                            }
                            _2f3(evt);
                        }),
                        _2f5 = on(node, "keyup", function(evt) {
                            if (evt.keyCode === keys.ENTER || evt.keyCode === keys.SPACE) {
                                _2f3(evt);
                            }
                        });
                    return {
                        remove: function() {
                            _2f4.remove();
                            _2f5.remove();
                        }
                    };
                };
                _2ee.move = _2eb.move;
                return _2ee;
            });
        },
        "dijit/_FocusMixin": function() {
            define(["./focus", "./_WidgetBase", "dojo/_base/declare", "dojo/_base/lang"], function(_2f6, _2f7, _2f8, lang) {
                lang.extend(_2f7, {
                    focused: false,
                    onFocus: function() {},
                    onBlur: function() {},
                    _onFocus: function() {
                        this.onFocus();
                    },
                    _onBlur: function() {
                        this.onBlur();
                    }
                });
                return _2f8("dijit._FocusMixin", null, {
                    _focusManager: _2f6
                });
            });
        },
        "dijit/_TemplatedMixin": function() {
            define(["dojo/cache", "dojo/_base/declare", "dojo/dom-construct", "dojo/_base/lang", "dojo/on", "dojo/sniff", "dojo/string", "./_AttachMixin"], function(_2f9, _2fa, _2fb, lang, on, has, _2fc, _2fd) {
                var _2fe = _2fa("dijit._TemplatedMixin", _2fd, {
                    templateString: null,
                    templatePath: null,
                    _skipNodeCache: false,
                    searchContainerNode: true,
                    _stringRepl: function(tmpl) {
                        var _2ff = this.declaredClass,
                            _300 = this;
                        return _2fc.substitute(tmpl, this, function(_301, key) {
                            if (key.charAt(0) == "!") {
                                _301 = lang.getObject(key.substr(1), false, _300);
                            }
                            if (typeof _301 == "undefined") {
                                throw new Error(_2ff + " template:" + key);
                            }
                            if (_301 == null) {
                                return "";
                            }
                            return key.charAt(0) == "!" ? _301 : this._escapeValue("" + _301);
                        }, this);
                    },
                    _escapeValue: function(val) {
                        return val.replace(/["'<>&]/g, function(val) {
                            return {
                                "&": "&amp;",
                                "<": "&lt;",
                                ">": "&gt;",
                                "\"": "&quot;",
                                "'": "&#x27;"
                            } [val];
                        });
                    },
                    buildRendering: function() {
                        if (!this._rendered) {
                            if (!this.templateString) {
                                this.templateString = _2f9(this.templatePath, {
                                    sanitize: true
                                });
                            }
                            var _302 = _2fe.getCachedTemplate(this.templateString, this._skipNodeCache, this.ownerDocument);
                            var node;
                            if (lang.isString(_302)) {
                                node = _2fb.toDom(this._stringRepl(_302), this.ownerDocument);
                                if (node.nodeType != 1) {
                                    throw new Error("Invalid template: " + _302);
                                }
                            } else {
                                node = _302.cloneNode(true);
                            }
                            this.domNode = node;
                        }
                        this.inherited(arguments);
                        if (!this._rendered) {
                            this._fillContent(this.srcNodeRef);
                        }
                        this._rendered = true;
                    },
                    _fillContent: function(_303) {
                        var dest = this.containerNode;
                        if (_303 && dest) {
                            while (_303.hasChildNodes()) {
                                dest.appendChild(_303.firstChild);
                            }
                        }
                    }
                });
                _2fe._templateCache = {};
                _2fe.getCachedTemplate = function(_304, _305, doc) {
                    var _306 = _2fe._templateCache;
                    var key = _304;
                    var _307 = _306[key];
                    if (_307) {
                        try {
                            if (!_307.ownerDocument || _307.ownerDocument == (doc || document)) {
                                return _307;
                            }
                        } catch (e) {}
                        _2fb.destroy(_307);
                    }
                    _304 = _2fc.trim(_304);
                    if (_305 || _304.match(/\$\{([^\}]+)\}/g)) {
                        return (_306[key] = _304);
                    } else {
                        var node = _2fb.toDom(_304, doc);
                        if (node.nodeType != 1) {
                            throw new Error("Invalid template: " + _304);
                        }
                        return (_306[key] = node);
                    }
                };
                if (has("ie")) {
                    on(window, "unload", function() {
                        var _308 = _2fe._templateCache;
                        for (var key in _308) {
                            var _309 = _308[key];
                            if (typeof _309 == "object") {
                                _2fb.destroy(_309);
                            }
                            delete _308[key];
                        }
                    });
                }
                return _2fe;
            });
        },
        "dojo/cache": function() {
            define(["./_base/kernel", "./text"], function(dojo) {
                return dojo.cache;
            });
        },
        "dojo/string": function() {
            define(["./_base/kernel", "./_base/lang"], function(_30a, lang) {
                var _30b = /[&<>'"\/]/g;
                var _30c = {
                    "&": "&amp;",
                    "<": "&lt;",
                    ">": "&gt;",
                    "\"": "&quot;",
                    "'": "&#x27;",
                    "/": "&#x2F;"
                };
                var _30d = {};
                lang.setObject("dojo.string", _30d);
                _30d.escape = function(str) {
                    if (!str) {
                        return "";
                    }
                    return str.replace(_30b, function(c) {
                        return _30c[c];
                    });
                };
                _30d.rep = function(str, num) {
                    if (num <= 0 || !str) {
                        return "";
                    }
                    var buf = [];
                    for (;;) {
                        if (num & 1) {
                            buf.push(str);
                        }
                        if (!(num >>= 1)) {
                            break;
                        }
                        str += str;
                    }
                    return buf.join("");
                };
                _30d.pad = function(text, size, ch, end) {
                    if (!ch) {
                        ch = "0";
                    }
                    var out = String(text),
                        pad = _30d.rep(ch, Math.ceil((size - out.length) / ch.length));
                    return end ? out + pad : pad + out;
                };
                _30d.substitute = function(_30e, map, _30f, _310) {
                    _310 = _310 || _30a.global;
                    _30f = _30f ? lang.hitch(_310, _30f) : function(v) {
                        return v;
                    };
                    return _30e.replace(/\$\{([^\s\:\}]*)(?:\:([^\s\:\}]+))?\}/g, function(_311, key, _312) {
                        if (key == "") {
                            return "$";
                        }
                        var _313 = lang.getObject(key, false, map);
                        if (_312) {
                            _313 = lang.getObject(_312, false, _310).call(_310, _313, key);
                        }
                        var _314 = _30f(_313, key);
                        if (typeof _314 === "undefined") {
                            throw new Error("string.substitute could not find key \"" + key + "\" in template");
                        }
                        return _314.toString();
                    });
                };
                _30d.trim = String.prototype.trim ? lang.trim : function(str) {
                    str = str.replace(/^\s+/, "");
                    for (var i = str.length - 1; i >= 0; i--) {
                        if (/\S/.test(str.charAt(i))) {
                            str = str.substring(0, i + 1);
                            break;
                        }
                    }
                    return str;
                };
                return _30d;
            });
        },
        "dijit/_AttachMixin": function() {
            define(["require", "dojo/_base/array", "dojo/_base/connect", "dojo/_base/declare", "dojo/_base/lang", "dojo/mouse", "dojo/on", "dojo/touch", "./_WidgetBase"], function(_315, _316, _317, _318, lang, _319, on, _31a, _31b) {
                var _31c = lang.delegate(_31a, {
                    "mouseenter": _319.enter,
                    "mouseleave": _319.leave,
                    "keypress": _317._keypress
                });
                var _31d;
                var _31e = _318("dijit._AttachMixin", null, {
                    constructor: function() {
                        this._attachPoints = [];
                        this._attachEvents = [];
                    },
                    buildRendering: function() {
                        this.inherited(arguments);
                        this._attachTemplateNodes(this.domNode);
                        this._beforeFillContent();
                    },
                    _beforeFillContent: function() {},
                    _attachTemplateNodes: function(_31f) {
                        var node = _31f;
                        while (true) {
                            if (node.nodeType == 1 && (this._processTemplateNode(node, function(n, p) {
                                    return n.getAttribute(p);
                                }, this._attach) || this.searchContainerNode) && node.firstChild) {
                                node = node.firstChild;
                            } else {
                                if (node == _31f) {
                                    return;
                                }
                                while (!node.nextSibling) {
                                    node = node.parentNode;
                                    if (node == _31f) {
                                        return;
                                    }
                                }
                                node = node.nextSibling;
                            }
                        }
                    },
                    _processTemplateNode: function(_320, _321, _322) {
                        var ret = true;
                        var _323 = this.attachScope || this,
                            _324 = _321(_320, "dojoAttachPoint") || _321(_320, "data-dojo-attach-point");
                        if (_324) {
                            var _325, _326 = _324.split(/\s*,\s*/);
                            while ((_325 = _326.shift())) {
                                if (lang.isArray(_323[_325])) {
                                    _323[_325].push(_320);
                                } else {
                                    _323[_325] = _320;
                                }
                                ret = (_325 != "containerNode");
                                this._attachPoints.push(_325);
                            }
                        }
                        var _327 = _321(_320, "dojoAttachEvent") || _321(_320, "data-dojo-attach-event");
                        if (_327) {
                            var _328, _329 = _327.split(/\s*,\s*/);
                            var trim = lang.trim;
                            while ((_328 = _329.shift())) {
                                if (_328) {
                                    var _32a = null;
                                    if (_328.indexOf(":") != -1) {
                                        var _32b = _328.split(":");
                                        _328 = trim(_32b[0]);
                                        _32a = trim(_32b[1]);
                                    } else {
                                        _328 = trim(_328);
                                    }
                                    if (!_32a) {
                                        _32a = _328;
                                    }
                                    this._attachEvents.push(_322(_320, _328, lang.hitch(_323, _32a)));
                                }
                            }
                        }
                        return ret;
                    },
                    _attach: function(node, type, func) {
                        type = type.replace(/^on/, "").toLowerCase();
                        if (type == "dijitclick") {
                            type = _31d || (_31d = _315("./a11yclick"));
                        } else {
                            type = _31c[type] || type;
                        }
                        return on(node, type, func);
                    },
                    _detachTemplateNodes: function() {
                        var _32c = this.attachScope || this;
                        _316.forEach(this._attachPoints, function(_32d) {
                            delete _32c[_32d];
                        });
                        this._attachPoints = [];
                        _316.forEach(this._attachEvents, function(_32e) {
                            _32e.remove();
                        });
                        this._attachEvents = [];
                    },
                    destroyRendering: function() {
                        this._detachTemplateNodes();
                        this.inherited(arguments);
                    }
                });
                lang.extend(_31b, {
                    dojoAttachEvent: "",
                    dojoAttachPoint: ""
                });
                return _31e;
            });
        },
        "dijit/_Container": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-construct", "dojo/_base/kernel"], function(_32f, _330, _331, _332) {
                return _330("dijit._Container", null, {
                    buildRendering: function() {
                        this.inherited(arguments);
                        if (!this.containerNode) {
                            this.containerNode = this.domNode;
                        }
                    },
                    addChild: function(_333, _334) {
                        var _335 = this.containerNode;
                        if (_334 > 0) {
                            _335 = _335.firstChild;
                            while (_334 > 0) {
                                if (_335.nodeType == 1) {
                                    _334--;
                                }
                                _335 = _335.nextSibling;
                            }
                            if (_335) {
                                _334 = "before";
                            } else {
                                _335 = this.containerNode;
                                _334 = "last";
                            }
                        }
                        _331.place(_333.domNode, _335, _334);
                        if (this._started && !_333._started) {
                            _333.startup();
                        }
                    },
                    removeChild: function(_336) {
                        if (typeof _336 == "number") {
                            _336 = this.getChildren()[_336];
                        }
                        if (_336) {
                            var node = _336.domNode;
                            if (node && node.parentNode) {
                                node.parentNode.removeChild(node);
                            }
                        }
                    },
                    hasChildren: function() {
                        return this.getChildren().length > 0;
                    },
                    _getSiblingOfChild: function(_337, dir) {
                        var _338 = this.getChildren(),
                            idx = _32f.indexOf(_338, _337);
                        return _338[idx + dir];
                    },
                    getIndexOfChild: function(_339) {
                        return _32f.indexOf(this.getChildren(), _339);
                    }
                });
            });
        },
        "dijit/layout/_LayoutWidget": function() {
            define(["dojo/_base/lang", "../_Widget", "../_Container", "../_Contained", "../Viewport", "dojo/_base/declare", "dojo/dom-class", "dojo/dom-geometry", "dojo/dom-style"], function(lang, _33a, _33b, _33c, _33d, _33e, _33f, _340, _341) {
                return _33e("dijit.layout._LayoutWidget", [_33a, _33b, _33c], {
                    baseClass: "dijitLayoutContainer",
                    isLayoutContainer: true,
                    _setTitleAttr: null,
                    buildRendering: function() {
                        this.inherited(arguments);
                        _33f.add(this.domNode, "dijitContainer");
                    },
                    startup: function() {
                        if (this._started) {
                            return;
                        }
                        this.inherited(arguments);
                        var _342 = this.getParent && this.getParent();
                        if (!(_342 && _342.isLayoutContainer)) {
                            this.resize();
                            this.own(_33d.on("resize", lang.hitch(this, "resize")));
                        }
                    },
                    resize: function(_343, _344) {
                        var node = this.domNode;
                        if (_343) {
                            _340.setMarginBox(node, _343);
                        }
                        var mb = _344 || {};
                        lang.mixin(mb, _343 || {});
                        if (!("h" in mb) || !("w" in mb)) {
                            mb = lang.mixin(_340.getMarginBox(node), mb);
                        }
                        var cs = _341.getComputedStyle(node);
                        var me = _340.getMarginExtents(node, cs);
                        var be = _340.getBorderExtents(node, cs);
                        var bb = (this._borderBox = {
                            w: mb.w - (me.w + be.w),
                            h: mb.h - (me.h + be.h)
                        });
                        var pe = _340.getPadExtents(node, cs);
                        this._contentBox = {
                            l: _341.toPixelValue(node, cs.paddingLeft),
                            t: _341.toPixelValue(node, cs.paddingTop),
                            w: bb.w - pe.w,
                            h: bb.h - pe.h
                        };
                        this.layout();
                    },
                    layout: function() {},
                    _setupChild: function(_345) {
                        var cls = this.baseClass + "-child " + (_345.baseClass ? this.baseClass + "-" + _345.baseClass : "");
                        _33f.add(_345.domNode, cls);
                    },
                    addChild: function(_346, _347) {
                        this.inherited(arguments);
                        if (this._started) {
                            this._setupChild(_346);
                        }
                    },
                    removeChild: function(_348) {
                        var cls = this.baseClass + "-child" + (_348.baseClass ? " " + this.baseClass + "-" + _348.baseClass : "");
                        _33f.remove(_348.domNode, cls);
                        this.inherited(arguments);
                    }
                });
            });
        },
        "dijit/_Contained": function() {
            define(["dojo/_base/declare", "./registry"], function(_349, _34a) {
                return _349("dijit._Contained", null, {
                    _getSibling: function(_34b) {
                        var p = this.getParent();
                        return (p && p._getSiblingOfChild && p._getSiblingOfChild(this, _34b == "previous" ? -1 : 1)) || null;
                    },
                    getPreviousSibling: function() {
                        return this._getSibling("previous");
                    },
                    getNextSibling: function() {
                        return this._getSibling("next");
                    },
                    getIndexInParent: function() {
                        var p = this.getParent();
                        if (!p || !p.getIndexOfChild) {
                            return -1;
                        }
                        return p.getIndexOfChild(this);
                    }
                });
            });
        },
        "dijit/form/_FormWidget": function() {
            define(["dojo/_base/declare", "dojo/sniff", "dojo/_base/kernel", "dojo/ready", "../_Widget", "../_CssStateMixin", "../_TemplatedMixin", "./_FormWidgetMixin"], function(_34c, has, _34d, _34e, _34f, _350, _351, _352) {
                if (has("dijit-legacy-requires")) {
                    _34e(0, function() {
                        var _353 = ["dijit/form/_FormValueWidget"];
                        require(_353);
                    });
                }
                return _34c("dijit.form._FormWidget", [_34f, _351, _350, _352], {
                    setDisabled: function(_354) {
                        _34d.deprecated("setDisabled(" + _354 + ") is deprecated. Use set('disabled'," + _354 + ") instead.", "", "2.0");
                        this.set("disabled", _354);
                    },
                    setValue: function(_355) {
                        _34d.deprecated("dijit.form._FormWidget:setValue(" + _355 + ") is deprecated.  Use set('value'," + _355 + ") instead.", "", "2.0");
                        this.set("value", _355);
                    },
                    getValue: function() {
                        _34d.deprecated(this.declaredClass + "::getValue() is deprecated. Use get('value') instead.", "", "2.0");
                        return this.get("value");
                    },
                    postMixInProperties: function() {
                        this.nameAttrSetting = (this.name && !has("msapp")) ? ("name=\"" + this.name.replace(/"/g, "&quot;") + "\"") : "";
                        this.inherited(arguments);
                    }
                });
            });
        },
        "dijit/_CssStateMixin": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom", "dojo/dom-class", "dojo/has", "dojo/_base/lang", "dojo/on", "dojo/domReady", "dojo/touch", "dojo/_base/window", "./a11yclick", "./registry"], function(_356, _357, dom, _358, has, lang, on, _359, _35a, win, _35b, _35c) {
                var _35d = _357("dijit._CssStateMixin", [], {
                    hovering: false,
                    active: false,
                    _applyAttributes: function() {
                        this.inherited(arguments);
                        _356.forEach(["disabled", "readOnly", "checked", "selected", "focused", "state", "hovering", "active", "_opened"], function(attr) {
                            this.watch(attr, lang.hitch(this, "_setStateClass"));
                        }, this);
                        for (var ap in this.cssStateNodes || {}) {
                            this._trackMouseState(this[ap], this.cssStateNodes[ap]);
                        }
                        this._trackMouseState(this.domNode, this.baseClass);
                        this._setStateClass();
                    },
                    _cssMouseEvent: function(_35e) {
                        if (!this.disabled) {
                            switch (_35e.type) {
                                case "mouseover":
                                case "MSPointerOver":
                                case "pointerover":
                                    this._set("hovering", true);
                                    this._set("active", this._mouseDown);
                                    break;
                                case "mouseout":
                                case "MSPointerOut":
                                case "pointerout":
                                    this._set("hovering", false);
                                    this._set("active", false);
                                    break;
                                case "mousedown":
                                case "touchstart":
                                case "MSPointerDown":
                                case "pointerdown":
                                case "keydown":
                                    this._set("active", true);
                                    break;
                                case "mouseup":
                                case "dojotouchend":
                                case "MSPointerUp":
                                case "pointerup":
                                case "keyup":
                                    this._set("active", false);
                                    break;
                            }
                        }
                    },
                    _setStateClass: function() {
                        var _35f = this.baseClass.split(" ");

                        function _360(_361) {
                            _35f = _35f.concat(_356.map(_35f, function(c) {
                                return c + _361;
                            }), "dijit" + _361);
                        };
                        if (!this.isLeftToRight()) {
                            _360("Rtl");
                        }
                        var _362 = this.checked == "mixed" ? "Mixed" : (this.checked ? "Checked" : "");
                        if (this.checked) {
                            _360(_362);
                        }
                        if (this.state) {
                            _360(this.state);
                        }
                        if (this.selected) {
                            _360("Selected");
                        }
                        if (this._opened) {
                            _360("Opened");
                        }
                        if (this.disabled) {
                            _360("Disabled");
                        } else {
                            if (this.readOnly) {
                                _360("ReadOnly");
                            } else {
                                if (this.active) {
                                    _360("Active");
                                } else {
                                    if (this.hovering) {
                                        _360("Hover");
                                    }
                                }
                            }
                        }
                        if (this.focused) {
                            _360("Focused");
                        }
                        var tn = this.stateNode || this.domNode,
                            _363 = {};
                        _356.forEach(tn.className.split(" "), function(c) {
                            _363[c] = true;
                        });
                        if ("_stateClasses" in this) {
                            _356.forEach(this._stateClasses, function(c) {
                                delete _363[c];
                            });
                        }
                        _356.forEach(_35f, function(c) {
                            _363[c] = true;
                        });
                        var _364 = [];
                        for (var c in _363) {
                            _364.push(c);
                        }
                        tn.className = _364.join(" ");
                        this._stateClasses = _35f;
                    },
                    _subnodeCssMouseEvent: function(node, _365, evt) {
                        if (this.disabled || this.readOnly) {
                            return;
                        }

                        function _366(_367) {
                            _358.toggle(node, _365 + "Hover", _367);
                        };

                        function _368(_369) {
                            _358.toggle(node, _365 + "Active", _369);
                        };

                        function _36a(_36b) {
                            _358.toggle(node, _365 + "Focused", _36b);
                        };
                        switch (evt.type) {
                            case "mouseover":
                            case "MSPointerOver":
                            case "pointerover":
                                _366(true);
                                break;
                            case "mouseout":
                            case "MSPointerOut":
                            case "pointerout":
                                _366(false);
                                _368(false);
                                break;
                            case "mousedown":
                            case "touchstart":
                            case "MSPointerDown":
                            case "pointerdown":
                            case "keydown":
                                _368(true);
                                break;
                            case "mouseup":
                            case "MSPointerUp":
                            case "pointerup":
                            case "dojotouchend":
                            case "keyup":
                                _368(false);
                                break;
                            case "focus":
                            case "focusin":
                                _36a(true);
                                break;
                            case "blur":
                            case "focusout":
                                _36a(false);
                                break;
                        }
                    },
                    _trackMouseState: function(node, _36c) {
                        node._cssState = _36c;
                    }
                });
                _359(function() {
                    function _36d(evt, _36e, _36f) {
                        if (_36f && dom.isDescendant(_36f, _36e)) {
                            return;
                        }
                        for (var node = _36e; node && node != _36f; node = node.parentNode) {
                            if (node._cssState) {
                                var _370 = _35c.getEnclosingWidget(node);
                                if (_370) {
                                    if (node == _370.domNode) {
                                        _370._cssMouseEvent(evt);
                                    } else {
                                        _370._subnodeCssMouseEvent(node, node._cssState, evt);
                                    }
                                }
                            }
                        }
                    };
                    var body = win.body(),
                        _371;
                    on(body, _35a.over, function(evt) {
                        _36d(evt, evt.target, evt.relatedTarget);
                    });
                    on(body, _35a.out, function(evt) {
                        _36d(evt, evt.target, evt.relatedTarget);
                    });
                    on(body, _35b.press, function(evt) {
                        _371 = evt.target;
                        _36d(evt, _371);
                    });
                    on(body, _35b.release, function(evt) {
                        _36d(evt, _371);
                        _371 = null;
                    });
                    on(body, "focusin, focusout", function(evt) {
                        var node = evt.target;
                        if (node._cssState && !node.getAttribute("widgetId")) {
                            var _372 = _35c.getEnclosingWidget(node);
                            if (_372) {
                                _372._subnodeCssMouseEvent(node, node._cssState, evt);
                            }
                        }
                    });
                });
                return _35d;
            });
        },
        "dijit/form/_FormWidgetMixin": function() {
            define(["dojo/_base/array", "dojo/_base/declare", "dojo/dom-attr", "dojo/dom-style", "dojo/_base/lang", "dojo/mouse", "dojo/on", "dojo/sniff", "dojo/window", "../a11y"], function(_373, _374, _375, _376, lang, _377, on, has, _378, a11y) {
                return _374("dijit.form._FormWidgetMixin", null, {
                    name: "",
                    alt: "",
                    value: "",
                    type: "text",
                    "aria-label": "focusNode",
                    tabIndex: "0",
                    _setTabIndexAttr: "focusNode",
                    disabled: false,
                    intermediateChanges: false,
                    scrollOnFocus: true,
                    _setIdAttr: "focusNode",
                    _setDisabledAttr: function(_379) {
                        this._set("disabled", _379);
                        if (/^(button|input|select|textarea|optgroup|option|fieldset)$/i.test(this.focusNode.tagName)) {
                            _375.set(this.focusNode, "disabled", _379);
                        } else {
                            this.focusNode.setAttribute("aria-disabled", _379 ? "true" : "false");
                        }
                        if (this.valueNode) {
                            _375.set(this.valueNode, "disabled", _379);
                        }
                        if (_379) {
                            this._set("hovering", false);
                            this._set("active", false);
                            var _37a = "tabIndex" in this.attributeMap ? this.attributeMap.tabIndex : ("_setTabIndexAttr" in this) ? this._setTabIndexAttr : "focusNode";
                            _373.forEach(lang.isArray(_37a) ? _37a : [_37a], function(_37b) {
                                var node = this[_37b];
                                if (has("webkit") || a11y.hasDefaultTabStop(node)) {
                                    node.setAttribute("tabIndex", "-1");
                                } else {
                                    node.removeAttribute("tabIndex");
                                }
                            }, this);
                        } else {
                            if (this.tabIndex != "") {
                                this.set("tabIndex", this.tabIndex);
                            }
                        }
                    },
                    _onFocus: function(by) {
                        if (by == "mouse" && this.isFocusable()) {
                            var _37c = this.own(on(this.focusNode, "focus", function() {
                                _37d.remove();
                                _37c.remove();
                            }))[0];
                            var _37e = has("pointer-events") ? "pointerup" : has("MSPointer") ? "MSPointerUp" : has("touch-events") ? "touchend, mouseup" : "mouseup";
                            var _37d = this.own(on(this.ownerDocumentBody, _37e, lang.hitch(this, function(evt) {
                                _37d.remove();
                                _37c.remove();
                                if (this.focused) {
                                    if (evt.type == "touchend") {
                                        this.defer("focus");
                                    } else {
                                        this.focus();
                                    }
                                }
                            })))[0];
                        }
                        if (this.scrollOnFocus) {
                            this.defer(function() {
                                _378.scrollIntoView(this.domNode);
                            });
                        }
                        this.inherited(arguments);
                    },
                    isFocusable: function() {
                        return !this.disabled && this.focusNode && (_376.get(this.domNode, "display") != "none");
                    },
                    focus: function() {
                        if (!this.disabled && this.focusNode.focus) {
                            try {
                                this.focusNode.focus();
                            } catch (e) {}
                        }
                    },
                    compare: function(val1, val2) {
                        if (typeof val1 == "number" && typeof val2 == "number") {
                            return (isNaN(val1) && isNaN(val2)) ? 0 : val1 - val2;
                        } else {
                            if (val1 > val2) {
                                return 1;
                            } else {
                                if (val1 < val2) {
                                    return -1;
                                } else {
                                    return 0;
                                }
                            }
                        }
                    },
                    onChange: function() {},
                    _onChangeActive: false,
                    _handleOnChange: function(_37f, _380) {
                        if (this._lastValueReported == undefined && (_380 === null || !this._onChangeActive)) {
                            this._resetValue = this._lastValueReported = _37f;
                        }
                        this._pendingOnChange = this._pendingOnChange || (typeof _37f != typeof this._lastValueReported) || (this.compare(_37f, this._lastValueReported) != 0);
                        if ((this.intermediateChanges || _380 || _380 === undefined) && this._pendingOnChange) {
                            this._lastValueReported = _37f;
                            this._pendingOnChange = false;
                            if (this._onChangeActive) {
                                if (this._onChangeHandle) {
                                    this._onChangeHandle.remove();
                                }
                                this._onChangeHandle = this.defer(function() {
                                    this._onChangeHandle = null;
                                    this.onChange(_37f);
                                });
                            }
                        }
                    },
                    create: function() {
                        this.inherited(arguments);
                        this._onChangeActive = true;
                    },
                    destroy: function() {
                        if (this._onChangeHandle) {
                            this._onChangeHandle.remove();
                            this.onChange(this._lastValueReported);
                        }
                        this.inherited(arguments);
                    }
                });
            });
        },
        "dijit/form/_FormValueWidget": function() {
            define(["dojo/_base/declare", "dojo/sniff", "./_FormWidget", "./_FormValueMixin"], function(_381, has, _382, _383) {
                return _381("dijit.form._FormValueWidget", [_382, _383], {
                    _layoutHackIE7: function() {
                        if (has("ie") == 7) {
                            var _384 = this.domNode;
                            var _385 = _384.parentNode;
                            var _386 = _384.firstChild || _384;
                            var _387 = _386.style.filter;
                            var _388 = this;
                            while (_385 && _385.clientHeight == 0) {
                                (function ping() {
                                    var _389 = _388.connect(_385, "onscroll", function() {
                                        _388.disconnect(_389);
                                        _386.style.filter = (new Date()).getMilliseconds();
                                        _388.defer(function() {
                                            _386.style.filter = _387;
                                        });
                                    });
                                })();
                                _385 = _385.parentNode;
                            }
                        }
                    }
                });
            });
        },
        "dijit/form/_FormValueMixin": function() {
            define(["dojo/_base/declare", "dojo/dom-attr", "dojo/keys", "dojo/_base/lang", "dojo/on", "./_FormWidgetMixin"], function(_38a, _38b, keys, lang, on, _38c) {
                return _38a("dijit.form._FormValueMixin", _38c, {
                    readOnly: false,
                    _setReadOnlyAttr: function(_38d) {
                        _38b.set(this.focusNode, "readOnly", _38d);
                        this._set("readOnly", _38d);
                    },
                    postCreate: function() {
                        this.inherited(arguments);
                        if (this._resetValue === undefined) {
                            this._lastValueReported = this._resetValue = this.value;
                        }
                    },
                    _setValueAttr: function(_38e, _38f) {
                        this._handleOnChange(_38e, _38f);
                    },
                    _handleOnChange: function(_390, _391) {
                        this._set("value", _390);
                        this.inherited(arguments);
                    },
                    undo: function() {
                        this._setValueAttr(this._lastValueReported, false);
                    },
                    reset: function() {
                        this._hasBeenBlurred = false;
                        this._setValueAttr(this._resetValue, true);
                    }
                });
            });
        }
    }
});
define("dijit/dijit", ["./main", "./_base", "dojo/parser", "./_Widget", "./_TemplatedMixin", "./_Container", "./layout/_LayoutWidget", "./form/_FormWidget", "./form/_FormValueWidget"], function(_392) {
    return _392;
});