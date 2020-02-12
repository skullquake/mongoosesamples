//>>built
define("dijit/BackgroundIframe", "require ./main dojo/_base/config dojo/dom-construct dojo/dom-style dojo/_base/lang dojo/on dojo/sniff".split(" "), function(h, d, k, l, e, f, m, c) {
    c.add("config-bgIframe", (c("ie") || c("trident")) && !/IEMobile\/10\.0/.test(navigator.userAgent));
    var g = new function() {
        var b = [];
        this.pop = function() {
            var a;
            b.length ? (a = b.pop(), a.style.display = "") : (9 > c("ie") ? (a = k.dojoBlankHtmlUrl || h.toUrl("dojo/resources/blank.html") || 'javascript:""', a = document.createElement("\x3ciframe src\x3d'" + a +
                "' role\x3d'presentation' style\x3d'position: absolute; left: 0px; top: 0px;z-index: -1; filter:Alpha(Opacity\x3d\"0\");'\x3e")) : (a = l.create("iframe"), a.src = 'javascript:""', a.className = "dijitBackgroundIframe", a.setAttribute("role", "presentation"), e.set(a, "opacity", .1)), a.tabIndex = -1);
            return a
        };
        this.push = function(a) {
            a.style.display = "none";
            b.push(a)
        }
    };
    d.BackgroundIframe = function(b) {
        if (!b.id) throw Error("no id");
        if (c("config-bgIframe")) {
            var a = this.iframe = g.pop();
            b.appendChild(a);
            7 > c("ie") || c("quirks") ?
                (this.resize(b), this._conn = m(b, "resize", f.hitch(this, "resize", b))) : e.set(a, {
                    width: "100%",
                    height: "100%"
                })
        }
    };
    f.extend(d.BackgroundIframe, {
        resize: function(b) {
            this.iframe && e.set(this.iframe, {
                width: b.offsetWidth + "px",
                height: b.offsetHeight + "px"
            })
        },
        destroy: function() {
            this._conn && (this._conn.remove(), this._conn = null);
            this.iframe && (this.iframe.parentNode.removeChild(this.iframe), g.push(this.iframe), delete this.iframe)
        }
    });
    return d.BackgroundIframe
});