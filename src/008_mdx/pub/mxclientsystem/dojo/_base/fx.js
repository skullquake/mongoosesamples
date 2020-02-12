/*
	Copyright (c) 2004-2016, The JS Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/_base/fx", "./kernel ./config ./lang ../Evented ./Color ../aspect ../sniff ../dom ../dom-style".split(" "), function(r, x, f, y, k, m, z, t, n) {
    var l = f.mixin,
        d = {},
        u = d._Line = function(a, b) {
            this.start = a;
            this.end = b
        };
    u.prototype.getValue = function(a) {
        return (this.end - this.start) * a + this.start
    };
    var h = d.Animation = function(a) {
        l(this, a);
        f.isArray(this.curve) && (this.curve = new u(this.curve[0], this.curve[1]))
    };
    h.prototype = new y;
    f.extend(h, {
        duration: 350,
        repeat: 0,
        rate: 20,
        _percent: 0,
        _startRepeatCount: 0,
        _getStep: function() {
            var a =
                this._percent,
                b = this.easing;
            return b ? b(a) : a
        },
        _fire: function(a, b) {
            var g = b || [];
            if (this[a])
                if (x.debugAtAllCosts) this[a].apply(this, g);
                else try {
                    this[a].apply(this, g)
                } catch (e) {
                    console.error("exception in animation handler for:", a), console.error(e)
                }
            return this
        },
        play: function(a, b) {
            this._delayTimer && this._clearTimer();
            if (b) this._stopTimer(), this._active = this._paused = !1, this._percent = 0;
            else if (this._active && !this._paused) return this;
            this._fire("beforeBegin", [this.node]);
            var g = a || this.delay,
                e = f.hitch(this,
                    "_play", b);
            if (0 < g) return this._delayTimer = setTimeout(e, g), this;
            e();
            return this
        },
        _play: function(a) {
            this._delayTimer && this._clearTimer();
            this._startTime = (new Date).valueOf();
            this._paused && (this._startTime -= this.duration * this._percent);
            this._active = !0;
            this._paused = !1;
            a = this.curve.getValue(this._getStep());
            this._percent || (this._startRepeatCount || (this._startRepeatCount = this.repeat), this._fire("onBegin", [a]));
            this._fire("onPlay", [a]);
            this._cycle();
            return this
        },
        pause: function() {
            this._delayTimer && this._clearTimer();
            this._stopTimer();
            if (!this._active) return this;
            this._paused = !0;
            this._fire("onPause", [this.curve.getValue(this._getStep())]);
            return this
        },
        gotoPercent: function(a, b) {
            this._stopTimer();
            this._active = this._paused = !0;
            this._percent = a;
            b && this.play();
            return this
        },
        stop: function(a) {
            this._delayTimer && this._clearTimer();
            if (!this._timer) return this;
            this._stopTimer();
            a && (this._percent = 1);
            this._fire("onStop", [this.curve.getValue(this._getStep())]);
            this._active = this._paused = !1;
            return this
        },
        destroy: function() {
            this.stop()
        },
        status: function() {
            return this._active ? this._paused ? "paused" : "playing" : "stopped"
        },
        _cycle: function() {
            if (this._active) {
                var a = (new Date).valueOf(),
                    a = 0 === this.duration ? 1 : (a - this._startTime) / this.duration;
                1 <= a && (a = 1);
                this._percent = a;
                this.easing && (a = this.easing(a));
                this._fire("onAnimate", [this.curve.getValue(a)]);
                1 > this._percent ? this._startTimer() : (this._active = !1, 0 < this.repeat ? (this.repeat--, this.play(null, !0)) : -1 == this.repeat ? this.play(null, !0) : this._startRepeatCount && (this.repeat = this._startRepeatCount,
                    this._startRepeatCount = 0), this._percent = 0, this._fire("onEnd", [this.node]), !this.repeat && this._stopTimer())
            }
            return this
        },
        _clearTimer: function() {
            clearTimeout(this._delayTimer);
            delete this._delayTimer
        }
    });
    var p = 0,
        q = null,
        v = {
            run: function() {}
        };
    f.extend(h, {
        _startTimer: function() {
            this._timer || (this._timer = m.after(v, "run", f.hitch(this, "_cycle"), !0), p++);
            q || (q = setInterval(f.hitch(v, "run"), this.rate))
        },
        _stopTimer: function() {
            this._timer && (this._timer.remove(), this._timer = null, p--);
            0 >= p && (clearInterval(q), q = null,
                p = 0)
        }
    });
    var A = z("ie") ? function(a) {
        var b = a.style;
        b.width.length || "auto" != n.get(a, "width") || (b.width = "auto")
    } : function() {};
    d._fade = function(a) {
        a.node = t.byId(a.node);
        var b = l({
            properties: {}
        }, a);
        a = b.properties.opacity = {};
        a.start = "start" in b ? b.start : function() {
            return +n.get(b.node, "opacity") || 0
        };
        a.end = b.end;
        a = d.animateProperty(b);
        m.after(a, "beforeBegin", f.partial(A, b.node), !0);
        return a
    };
    d.fadeIn = function(a) {
        return d._fade(l({
            end: 1
        }, a))
    };
    d.fadeOut = function(a) {
        return d._fade(l({
            end: 0
        }, a))
    };
    d._defaultEasing =
        function(a) {
            return .5 + Math.sin((a + 1.5) * Math.PI) / 2
        };
    var w = function(a) {
        this._properties = a;
        for (var b in a) {
            var g = a[b];
            g.start instanceof k && (g.tempColor = new k)
        }
    };
    w.prototype.getValue = function(a) {
        var b = {},
            g;
        for (g in this._properties) {
            var e = this._properties[g],
                d = e.start;
            d instanceof k ? b[g] = k.blendColors(d, e.end, a, e.tempColor).toCss() : f.isArray(d) || (b[g] = (e.end - d) * a + d + ("opacity" != g ? e.units || "px" : 0))
        }
        return b
    };
    d.animateProperty = function(a) {
        var b = a.node = t.byId(a.node);
        a.easing || (a.easing = r._defaultEasing);
        a = new h(a);
        m.after(a, "beforeBegin", f.hitch(a, function() {
            var a = {},
                e;
            for (e in this.properties) {
                var d = function(a, b) {
                    var c = {
                        height: a.offsetHeight,
                        width: a.offsetWidth
                    } [b];
                    if (void 0 !== c) return c;
                    c = n.get(a, b);
                    return "opacity" == b ? +c : h ? c : parseFloat(c)
                };
                if ("width" == e || "height" == e) this.node.display = "block";
                var c = this.properties[e];
                f.isFunction(c) && (c = c(b));
                c = a[e] = l({}, f.isObject(c) ? c : {
                    end: c
                });
                f.isFunction(c.start) && (c.start = c.start(b));
                f.isFunction(c.end) && (c.end = c.end(b));
                var h = 0 <= e.toLowerCase().indexOf("color");
                "end" in c ? "start" in c || (c.start = d(b, e)) : c.end = d(b, e);
                h ? (c.start = new k(c.start), c.end = new k(c.end)) : c.start = "opacity" == e ? +c.start : parseFloat(c.start)
            }
            this.curve = new w(a)
        }), !0);
        m.after(a, "onAnimate", f.hitch(n, "set", a.node), !0);
        return a
    };
    d.anim = function(a, b, g, e, f, c) {
        return d.animateProperty({
            node: a,
            duration: g || h.prototype.duration,
            properties: b,
            easing: e,
            onEnd: f
        }).play(c || 0)
    };
    l(r, d);
    r._Animation = h;
    return d
});