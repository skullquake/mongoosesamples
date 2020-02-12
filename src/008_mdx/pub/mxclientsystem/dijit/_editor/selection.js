//>>built
define("dijit/_editor/selection", ["dojo/dom", "dojo/_base/lang", "dojo/sniff", "dojo/_base/window", "../main"], function(h, m, k, c, g) {
    var l = {
        getType: function() {
            if (c.doc.getSelection) {
                var a = "text",
                    b;
                try {
                    b = c.global.getSelection()
                } catch (d) {}
                b && 1 == b.rangeCount && (b = b.getRangeAt(0), b.startContainer == b.endContainer && 1 == b.endOffset - b.startOffset && 3 != b.startContainer.nodeType && (a = "control"));
                return a
            }
            return c.doc.selection.type.toLowerCase()
        },
        getSelectedText: function() {
            if (c.doc.getSelection) {
                var a = c.global.getSelection();
                return a ? a.toString() : ""
            }
            return "control" == g._editor.selection.getType() ? null : c.doc.selection.createRange().text
        },
        getSelectedHtml: function() {
            if (c.doc.getSelection) {
                var a = c.global.getSelection();
                if (a && a.rangeCount) {
                    var b, d = "";
                    for (b = 0; b < a.rangeCount; b++) {
                        var e = a.getRangeAt(b).cloneContents(),
                            f = c.doc.createElement("div");
                        f.appendChild(e);
                        d += f.innerHTML
                    }
                    return d
                }
                return null
            }
            return "control" == g._editor.selection.getType() ? null : c.doc.selection.createRange().htmlText
        },
        getSelectedElement: function() {
            if ("control" ==
                g._editor.selection.getType()) {
                if (c.doc.getSelection) {
                    var a = c.global.getSelection();
                    return a.anchorNode.childNodes[a.anchorOffset]
                }
                if ((a = c.doc.selection.createRange()) && a.item) return c.doc.selection.createRange().item(0)
            }
            return null
        },
        getParentElement: function() {
            if ("control" == g._editor.selection.getType()) {
                var a = this.getSelectedElement();
                if (a) return a.parentNode
            } else if (c.doc.getSelection) {
                if (a = c.global.getSelection()) {
                    for (a = a.anchorNode; a && 1 != a.nodeType;) a = a.parentNode;
                    return a
                }
            } else return a = c.doc.selection.createRange(),
                a.collapse(!0), a.parentElement();
            return null
        },
        hasAncestorElement: function(a) {
            return null != this.getAncestorElement.apply(this, arguments)
        },
        getAncestorElement: function(a) {
            var b = this.getSelectedElement() || this.getParentElement();
            return this.getParentOfType(b, arguments)
        },
        isTag: function(a, b) {
            if (a && a.tagName)
                for (var c = a.tagName.toLowerCase(), e = 0; e < b.length; e++) {
                    var f = String(b[e]).toLowerCase();
                    if (c == f) return f
                }
            return ""
        },
        getParentOfType: function(a, b) {
            for (; a;) {
                if (this.isTag(a, b).length) return a;
                a = a.parentNode
            }
            return null
        },
        collapse: function(a) {
            if (c.doc.getSelection) {
                var b = c.global.getSelection();
                b.removeAllRanges ? a ? b.collapseToStart() : b.collapseToEnd() : b.collapse(a)
            } else b = c.doc.selection.createRange(), b.collapse(a), b.select()
        },
        remove: function() {
            var a = c.doc.selection;
            c.doc.getSelection ? (a = c.global.getSelection(), a.deleteFromDocument()) : "none" != a.type.toLowerCase() && a.clear();
            return a
        },
        selectElementChildren: function(a, b) {
            var d = c.doc;
            a = h.byId(a);
            if (c.doc.getSelection) {
                var e = c.global.getSelection();
                k("opera") ? (d = e.rangeCount ?
                    e.getRangeAt(0) : d.createRange(), d.setStart(a, 0), d.setEnd(a, 3 == a.nodeType ? a.length : a.childNodes.length), e.addRange(d)) : e.selectAllChildren(a)
            } else if (d = a.ownerDocument.body.createTextRange(), d.moveToElementText(a), !b) try {
                d.select()
            } catch (f) {}
        },
        selectElement: function(a, b) {
            var d;
            a = h.byId(a);
            var e = a.ownerDocument,
                f = c.global;
            if (e.getSelection) f = f.getSelection(), d = e.createRange(), f.removeAllRanges && (k("opera") && f.getRangeAt(0) && (d = f.getRangeAt(0)), d.selectNode(a), f.removeAllRanges(), f.addRange(d));
            else try {
                var g =
                    a.tagName ? a.tagName.toLowerCase() : "";
                d = "img" === g || "table" === g ? c.body(e).createControlRange() : c.body(e).createRange();
                d.addElement(a);
                b || d.select()
            } catch (p) {
                this.selectElementChildren(a, b)
            }
        },
        inSelection: function(a) {
            if (a) {
                var b, d = c.doc,
                    e;
                if (c.doc.getSelection) {
                    var f = c.global.getSelection();
                    f && 0 < f.rangeCount && (e = f.getRangeAt(0));
                    if (e && e.compareBoundaryPoints && d.createRange) try {
                        if (b = d.createRange(), b.setStart(a, 0), 1 === e.compareBoundaryPoints(e.START_TO_END, b)) return !0
                    } catch (n) {}
                } else {
                    e = d.selection.createRange();
                    try {
                        (b = a.ownerDocument.body.createControlRange()) && b.addElement(a)
                    } catch (n) {
                        try {
                            b = a.ownerDocument.body.createTextRange(), b.moveToElementText(a)
                        } catch (p) {}
                    }
                    if (e && b && 1 === e.compareEndPoints("EndToStart", b)) return !0
                }
            }
            return !1
        }
    };
    m.setObject("dijit._editor.selection", l);
    return l
});