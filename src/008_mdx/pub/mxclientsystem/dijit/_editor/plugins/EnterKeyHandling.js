//>>built
define("dijit/_editor/plugins/EnterKeyHandling", "dojo/_base/declare dojo/dom-construct dojo/keys dojo/_base/lang dojo/on dojo/sniff dojo/_base/window dojo/window ../_Plugin ../RichText ../range".split(" "), function(w, m, x, r, v, q, z, t, y, u, h) {
    return w("dijit._editor.plugins.EnterKeyHandling", y, {
        blockNodeForEnter: "BR",
        constructor: function(b) {
            b && ("blockNodeForEnter" in b && (b.blockNodeForEnter = b.blockNodeForEnter.toUpperCase()), r.mixin(this, b))
        },
        setEditor: function(b) {
            if (this.editor !== b)
                if (this.editor = b, "BR" ==
                    this.blockNodeForEnter) this.editor.customUndo = !0, b.onLoadDeferred.then(r.hitch(this, function(a) {
                    this.own(v(b.document, "keydown", r.hitch(this, function(a) {
                        if (a.keyCode == x.ENTER) {
                            var b = r.mixin({}, a);
                            b.shiftKey = !0;
                            this.handleEnterKey(b) || (a.stopPropagation(), a.preventDefault())
                        }
                    })));
                    9 <= q("ie") && 10 >= q("ie") && this.own(v(b.document, "paste", r.hitch(this, function(a) {
                        setTimeout(r.hitch(this, function() {
                            var a = this.editor.document.selection.createRange();
                            a.move("character", -1);
                            a.select();
                            a.move("character", 1);
                            a.select()
                        }), 0)
                    })));
                    return a
                }));
                else if (this.blockNodeForEnter) {
                var a = r.hitch(this, "handleEnterKey");
                b.addKeyHandler(13, 0, 0, a);
                b.addKeyHandler(13, 0, 1, a);
                this.own(this.editor.on("KeyPressed", r.hitch(this, "onKeyPressed")))
            }
        },
        onKeyPressed: function() {
            if (this._checkListLater) {
                if (this.editor.selection.isCollapsed()) {
                    var b = this.editor.selection.getAncestorElement("LI");
                    if (b) {
                        q("mozilla") && "LI" == b.parentNode.parentNode.nodeName && (b = b.parentNode.parentNode);
                        var a = b.firstChild;
                        !a || 1 != a.nodeType || "UL" != a.nodeName &&
                            "OL" != a.nodeName || (b.insertBefore(a.ownerDocument.createTextNode("\u00a0"), a), a = h.create(this.editor.window), a.setStart(b.firstChild, 0), b = h.getSelection(this.editor.window, !0), b.removeAllRanges(), b.addRange(a))
                    } else u.prototype.execCommand.call(this.editor, "formatblock", this.blockNodeForEnter), (b = this.editor.selection.getAncestorElement(this.blockNodeForEnter)) ? (b.innerHTML = this.bogusHtmlContent, 9 >= q("ie") && (b = this.editor.document.selection.createRange(), b.move("character", -1), b.select())) : console.error("onKeyPressed: Cannot find the new block node")
                }
                this._checkListLater = !1
            }
            this._pressedEnterInBlock && (this._pressedEnterInBlock.previousSibling && this.removeTrailingBr(this._pressedEnterInBlock.previousSibling), delete this._pressedEnterInBlock)
        },
        bogusHtmlContent: "\x26#160;",
        blockNodes: /^(?:P|H1|H2|H3|H4|H5|H6|LI)$/,
        handleEnterKey: function(b) {
            var a, n, c, f, k = this.editor.document,
                d, e, l;
            if (b.shiftKey) {
                b = this.editor.selection.getParentElement();
                if (f = h.getAncestor(b, this.blockNodes)) {
                    if ("LI" == f.tagName) return !0;
                    b = h.getSelection(this.editor.window);
                    a = b.getRangeAt(0);
                    a.collapsed ||
                        (a.deleteContents(), b = h.getSelection(this.editor.window), a = b.getRangeAt(0));
                    if (h.atBeginningOfContainer(f, a.startContainer, a.startOffset)) d = k.createElement("br"), a = h.create(this.editor.window), f.insertBefore(d, f.firstChild), a.setStartAfter(d), b.removeAllRanges(), b.addRange(a);
                    else if (h.atEndOfContainer(f, a.startContainer, a.startOffset)) a = h.create(this.editor.window), d = k.createElement("br"), f.appendChild(d), f.appendChild(k.createTextNode("\u00a0")), a.setStart(f.lastChild, 0), b.removeAllRanges(), b.addRange(a);
                    else return (e = a.startContainer) && 3 == e.nodeType ? (l = e.nodeValue, n = k.createTextNode(l.substring(0, a.startOffset)), c = k.createTextNode(l.substring(a.startOffset)), f = k.createElement("br"), "" == c.nodeValue && q("webkit") && (c = k.createTextNode("\u00a0")), m.place(n, e, "after"), m.place(f, n, "after"), m.place(c, f, "after"), m.destroy(e), a = h.create(this.editor.window), a.setStart(c, 0), b.removeAllRanges(), b.addRange(a), !1) : !0
                } else b = h.getSelection(this.editor.window), b.rangeCount ? (a = b.getRangeAt(0)) && a.startContainer &&
                    (a.collapsed || (a.deleteContents(), b = h.getSelection(this.editor.window), a = b.getRangeAt(0)), (e = a.startContainer) && 3 == e.nodeType ? (f = a.startOffset, e.length < f && (c = this._adjustNodeAndOffset(e, f), e = c.node, f = c.offset), l = e.nodeValue, n = k.createTextNode(l.substring(0, f)), c = k.createTextNode(l.substring(f)), f = k.createElement("br"), c.length || (c = k.createTextNode("\u00a0")), n.length ? m.place(n, e, "after") : n = e, m.place(f, n, "after"), m.place(c, f, "after"), m.destroy(e)) : (0 <= a.startOffset && (d = e.childNodes[a.startOffset]),
                        f = k.createElement("br"), c = k.createTextNode("\u00a0"), d ? (m.place(f, d, "before"), m.place(c, f, "after")) : (e.appendChild(f), e.appendChild(c))), a = h.create(this.editor.window), a.setStart(c, 0), a.setEnd(c, c.length), b.removeAllRanges(), b.addRange(a), this.editor.selection.collapse(!0)) : u.prototype.execCommand.call(this.editor, "inserthtml", "\x3cbr\x3e");
                return !1
            }
            var p = !0;
            b = h.getSelection(this.editor.window);
            a = b.getRangeAt(0);
            a.collapsed || (a.deleteContents(), b = h.getSelection(this.editor.window), a = b.getRangeAt(0));
            d = h.getBlockAncestor(a.endContainer, null, this.editor.editNode);
            var g = d.blockNode;
            if (this._checkListLater = g && ("LI" == g.nodeName || "LI" == g.parentNode.nodeName)) return q("mozilla") && (this._pressedEnterInBlock = g), /^(\s|&nbsp;|&#160;|\xA0|<span\b[^>]*\bclass=['"]Apple-style-span['"][^>]*>(\s|&nbsp;|&#160;|\xA0)<\/span>)?(<br>)?$/.test(g.innerHTML) && (g.innerHTML = "", q("webkit") && (a = h.create(this.editor.window), a.setStart(g, 0), b.removeAllRanges(), b.addRange(a)), this._checkListLater = !1), !0;
            if (!d.blockNode ||
                d.blockNode === this.editor.editNode) {
                try {
                    u.prototype.execCommand.call(this.editor, "formatblock", this.blockNodeForEnter)
                } catch (A) {}
                d = {
                    blockNode: this.editor.selection.getAncestorElement(this.blockNodeForEnter),
                    blockContainer: this.editor.editNode
                };
                if (d.blockNode) {
                    if (d.blockNode != this.editor.editNode && !(d.blockNode.textContent || d.blockNode.innerHTML).replace(/^\s+|\s+$/g, "").length) return this.removeTrailingBr(d.blockNode), !1
                } else d.blockNode = this.editor.editNode;
                b = h.getSelection(this.editor.window);
                a =
                    b.getRangeAt(0)
            }
            g = k.createElement(this.blockNodeForEnter);
            g.innerHTML = this.bogusHtmlContent;
            this.removeTrailingBr(d.blockNode);
            c = a.endOffset;
            p = a.endContainer;
            p.length < c && (c = this._adjustNodeAndOffset(p, c), p = c.node, c = c.offset);
            if (h.atEndOfContainer(d.blockNode, p, c)) d.blockNode === d.blockContainer ? d.blockNode.appendChild(g) : m.place(g, d.blockNode, "after"), p = !1, a = h.create(this.editor.window), a.setStart(g, 0), b.removeAllRanges(), b.addRange(a), this.editor.height && t.scrollIntoView(g);
            else if (h.atBeginningOfContainer(d.blockNode,
                    a.startContainer, a.startOffset)) m.place(g, d.blockNode, d.blockNode === d.blockContainer ? "first" : "before"), g.nextSibling && this.editor.height && (a = h.create(this.editor.window), a.setStart(g.nextSibling, 0), b.removeAllRanges(), b.addRange(a), t.scrollIntoView(g.nextSibling)), p = !1;
            else {
                d.blockNode === d.blockContainer ? d.blockNode.appendChild(g) : m.place(g, d.blockNode, "after");
                p = !1;
                d.blockNode.style && g.style && d.blockNode.style.cssText && (g.style.cssText = d.blockNode.style.cssText);
                if ((e = a.startContainer) && 3 == e.nodeType) {
                    c =
                        a.endOffset;
                    e.length < c && (c = this._adjustNodeAndOffset(e, c), e = c.node, c = c.offset);
                    l = e.nodeValue;
                    n = k.createTextNode(l.substring(0, c));
                    c = k.createTextNode(l.substring(c, l.length));
                    m.place(n, e, "before");
                    m.place(c, e, "after");
                    m.destroy(e);
                    for (a = n.parentNode; a !== d.blockNode;) {
                        l = k.createElement(a.tagName);
                        a.style && l.style && a.style.cssText && (l.style.cssText = a.style.cssText);
                        "FONT" === a.tagName && (a.color && (l.color = a.color), a.face && (l.face = a.face), a.size && (l.size = a.size));
                        for (; c;) e = c.nextSibling, l.appendChild(c),
                            c = e;
                        m.place(l, a, "after");
                        n = a;
                        c = l;
                        a = a.parentNode
                    }
                    if (1 == c.nodeType || 3 == c.nodeType && c.nodeValue) g.innerHTML = "";
                    for (n = c; c;) e = c.nextSibling, g.appendChild(c), c = e
                }
                a = h.create(this.editor.window);
                k = n;
                if ("BR" !== this.blockNodeForEnter) {
                    for (; k;) f = k, k = e = k.firstChild;
                    f && f.parentNode ? (g = f.parentNode, a.setStart(g, 0), b.removeAllRanges(), b.addRange(a), this.editor.height && t.scrollIntoView(g), q("mozilla") && (this._pressedEnterInBlock = d.blockNode)) : p = !0
                } else a.setStart(g, 0), b.removeAllRanges(), b.addRange(a), this.editor.height &&
                    t.scrollIntoView(g), q("mozilla") && (this._pressedEnterInBlock = d.blockNode)
            }
            return p
        },
        _adjustNodeAndOffset: function(b, a) {
            for (; b.length < a && b.nextSibling && 3 == b.nextSibling.nodeType;) a -= b.length, b = b.nextSibling;
            return {
                node: b,
                offset: a
            }
        },
        removeTrailingBr: function(b) {
            if (b = /P|DIV|LI/i.test(b.tagName) ? b : this.editor.selection.getParentOfType(b, ["P", "DIV", "LI"])) b.lastChild && (1 < b.childNodes.length && 3 == b.lastChild.nodeType && /^[\s\xAD]*$/.test(b.lastChild.nodeValue) || "BR" == b.lastChild.tagName) && m.destroy(b.lastChild),
                b.childNodes.length || (b.innerHTML = this.bogusHtmlContent)
        }
    })
});