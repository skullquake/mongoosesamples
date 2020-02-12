//>>built
define("dijit/selection", "dojo/_base/array dojo/dom dojo/_base/lang dojo/sniff dojo/_base/window dijit/focus".split(" "), function(p, h, q, k, l, r) {
    var m = function(f) {
            var d = f.document;
            this.getType = function() {
                if (d.getSelection) {
                    var a = "text",
                        b;
                    try {
                        b = f.getSelection()
                    } catch (c) {}
                    b && 1 == b.rangeCount && (b = b.getRangeAt(0), b.startContainer == b.endContainer && 1 == b.endOffset - b.startOffset && 3 != b.startContainer.nodeType && (a = "control"));
                    return a
                }
                return d.selection.type.toLowerCase()
            };
            this.getSelectedText = function() {
                if (d.getSelection) {
                    var a =
                        f.getSelection();
                    return a ? a.toString() : ""
                }
                return "control" == this.getType() ? null : d.selection.createRange().text
            };
            this.getSelectedHtml = function() {
                if (d.getSelection) {
                    var a = f.getSelection();
                    if (a && a.rangeCount) {
                        var b, c = "";
                        for (b = 0; b < a.rangeCount; b++) {
                            var e = a.getRangeAt(b).cloneContents(),
                                g = d.createElement("div");
                            g.appendChild(e);
                            c += g.innerHTML
                        }
                        return c
                    }
                    return null
                }
                return "control" == this.getType() ? null : d.selection.createRange().htmlText
            };
            this.getSelectedElement = function() {
                if ("control" == this.getType()) {
                    if (d.getSelection) {
                        var a =
                            f.getSelection();
                        return a.anchorNode.childNodes[a.anchorOffset]
                    }
                    if ((a = d.selection.createRange()) && a.item) return d.selection.createRange().item(0)
                }
                return null
            };
            this.getParentElement = function() {
                if ("control" == this.getType()) {
                    var a = this.getSelectedElement();
                    if (a) return a.parentNode
                } else if (d.getSelection) {
                    if (a = d.getSelection()) {
                        for (a = a.anchorNode; a && 1 != a.nodeType;) a = a.parentNode;
                        return a
                    }
                } else return a = d.selection.createRange(), a.collapse(!0), a.parentElement();
                return null
            };
            this.hasAncestorElement = function(a) {
                return null !=
                    this.getAncestorElement.apply(this, arguments)
            };
            this.getAncestorElement = function(a) {
                var b = this.getSelectedElement() || this.getParentElement();
                return this.getParentOfType(b, arguments)
            };
            this.isTag = function(a, b) {
                if (a && a.tagName)
                    for (var c = a.tagName.toLowerCase(), e = 0; e < b.length; e++) {
                        var d = String(b[e]).toLowerCase();
                        if (c == d) return d
                    }
                return ""
            };
            this.getParentOfType = function(a, b) {
                for (; a;) {
                    if (this.isTag(a, b).length) return a;
                    a = a.parentNode
                }
                return null
            };
            this.collapse = function(a) {
                if (d.getSelection) {
                    var b = f.getSelection();
                    b.removeAllRanges ? a ? b.collapseToStart() : b.collapseToEnd() : b.collapse(a)
                } else b = d.selection.createRange(), b.collapse(a), b.select()
            };
            this.remove = function() {
                var a = d.selection;
                d.getSelection ? (a = f.getSelection(), a.deleteFromDocument()) : "none" != a.type.toLowerCase() && a.clear();
                return a
            };
            this.selectElementChildren = function(a, b) {
                var c;
                a = h.byId(a);
                if (d.getSelection) {
                    var e = f.getSelection();
                    k("opera") ? (c = e.rangeCount ? e.getRangeAt(0) : d.createRange(), c.setStart(a, 0), c.setEnd(a, 3 == a.nodeType ? a.length : a.childNodes.length),
                        e.addRange(c)) : e.selectAllChildren(a)
                } else if (c = a.ownerDocument.body.createTextRange(), c.moveToElementText(a), !b) try {
                    c.select()
                } catch (g) {}
            };
            this.selectElement = function(a, b) {
                var c;
                a = h.byId(a);
                if (d.getSelection) {
                    var e = d.getSelection();
                    c = d.createRange();
                    e.removeAllRanges && (k("opera") && e.getRangeAt(0) && (c = e.getRangeAt(0)), c.selectNode(a), e.removeAllRanges(), e.addRange(c))
                } else try {
                    e = a.tagName ? a.tagName.toLowerCase() : "", c = "img" === e || "table" === e ? l.body(d).createControlRange() : l.body(d).createRange(), c.addElement(a),
                        b || c.select()
                } catch (g) {
                    this.selectElementChildren(a, b)
                }
            };
            this.inSelection = function(a) {
                if (a) {
                    var b, c;
                    if (d.getSelection) {
                        var e = f.getSelection();
                        e && 0 < e.rangeCount && (c = e.getRangeAt(0));
                        if (c && c.compareBoundaryPoints && d.createRange) try {
                            if (b = d.createRange(), b.setStart(a, 0), 1 === c.compareBoundaryPoints(c.START_TO_END, b)) return !0
                        } catch (g) {}
                    } else {
                        c = d.selection.createRange();
                        try {
                            b = a.ownerDocument.body.createTextRange(), b.moveToElementText(a)
                        } catch (g) {}
                        if (c && b && 1 === c.compareEndPoints("EndToStart", b)) return !0
                    }
                }
                return !1
            };
            this.getBookmark = function() {
                var a, b, c = d.selection,
                    e = r.curNode;
                if (d.getSelection) {
                    if (c = f.getSelection())
                        if (c.isCollapsed) {
                            if (a = e ? e.tagName : "")
                                if (a = a.toLowerCase(), "textarea" == a || "input" == a && (!e.type || "text" == e.type.toLowerCase())) return c = {
                                    start: e.selectionStart,
                                    end: e.selectionEnd,
                                    node: e,
                                    pRange: !0
                                }, {
                                    isCollapsed: c.end <= c.start,
                                    mark: c
                                };
                            a = {
                                isCollapsed: !0
                            };
                            c.rangeCount && (a.mark = c.getRangeAt(0).cloneRange())
                        } else b = c.getRangeAt(0), a = {
                            isCollapsed: !1,
                            mark: b.cloneRange()
                        }
                } else if (c) {
                    a = e ? e.tagName : "";
                    a = a.toLowerCase();
                    if (e && a && ("button" == a || "textarea" == a || "input" == a)) {
                        if (c.type && "none" == c.type.toLowerCase()) return {
                            isCollapsed: !0,
                            mark: null
                        };
                        b = c.createRange();
                        return {
                            isCollapsed: b.text && b.text.length ? !1 : !0,
                            mark: {
                                range: b,
                                pRange: !0
                            }
                        }
                    }
                    a = {};
                    try {
                        b = c.createRange(), a.isCollapsed = !("Text" == c.type ? b.htmlText.length : b.length)
                    } catch (g) {
                        return a.isCollapsed = !0, a
                    }
                    if ("CONTROL" == c.type.toUpperCase())
                        if (b.length)
                            for (a.mark = [], c = 0, e = b.length; c < e;) a.mark.push(b.item(c++));
                        else a.isCollapsed = !0, a.mark = null;
                    else a.mark = b.getBookmark()
                } else console.warn("No idea how to store the current selection for this browser!");
                return a
            };
            this.moveToBookmark = function(a) {
                if (a = a.mark)
                    if (d.getSelection) {
                        var b = f.getSelection();
                        b && b.removeAllRanges ? a.pRange ? (b = a.node, b.selectionStart = a.start, b.selectionEnd = a.end) : (b.removeAllRanges(), b.addRange(a)) : console.warn("No idea how to restore selection for this browser!")
                    } else if (d.selection && a) {
                    var c;
                    a.pRange ? c = a.range : q.isArray(a) ? (c = d.body.createControlRange(), p.forEach(a, function(a) {
                        c.addElement(a)
                    })) : (c = d.body.createTextRange(), c.moveToBookmark(a));
                    c.select()
                }
            };
            this.isCollapsed =
                function() {
                    return this.getBookmark().isCollapsed
                }
        },
        n = new m(window);
    n.SelectionManager = m;
    return n
});