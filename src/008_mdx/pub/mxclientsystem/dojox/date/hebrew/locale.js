//>>built
define("dojox/date/hebrew/locale", "dojox/main dojo/_base/lang dojo/_base/array dojo/date dojo/i18n dojo/regexp dojo/string ./Date ./numerals dojo/i18n!dojo/cldr/nls/hebrew".split(" "), function(y, p, q, D, m, z, A, v, u) {
    function B(c, d, a, e, h) {
        return h.replace(/([a-z])\1*/ig, function(f) {
            var b, g, r = f.charAt(0);
            f = f.length;
            var e = ["abbr", "wide", "narrow"];
            switch (r) {
                case "G":
                    b = d[4 > f ? "eraAbbr" : "eraNames"][0];
                    break;
                case "y":
                    b = a.match(/^he(?:-.+)?$/) ? u.getYearHebrewLetters(c.getFullYear()) : String(c.getFullYear());
                    break;
                case "M":
                    b = c.getMonth();
                    3 > f ? (!c.isLeapYear(c.getFullYear()) && 5 < b && b--, a.match(/^he(?:-.+)?$/) ? b = u.getMonthHebrewLetters(b) : (b += 1, g = !0)) : b = k.getNames("months", e[f - 3], "format", a, c)[b];
                    break;
                case "d":
                    a.match(/^he(?:-.+)?$/) ? b = c.getDateLocalized(a) : (b = c.getDate(), g = !0);
                    break;
                case "E":
                    b = c.getDay();
                    3 > f ? (b += 1, g = !0) : (r = ["days-format", e[f - 3]].join("-"), b = d[r][b]);
                    break;
                case "a":
                    b = 12 > c.getHours() ? "am" : "pm";
                    b = d["dayPeriods-format-wide-" + b];
                    break;
                case "h":
                case "H":
                case "K":
                case "k":
                    g = c.getHours();
                    switch (r) {
                        case "h":
                            b =
                                g % 12 || 12;
                            break;
                        case "H":
                            b = g;
                            break;
                        case "K":
                            b = g % 12;
                            break;
                        case "k":
                            b = g || 24
                    }
                    g = !0;
                    break;
                case "m":
                    b = c.getMinutes();
                    g = !0;
                    break;
                case "s":
                    b = c.getSeconds();
                    g = !0;
                    break;
                case "S":
                    b = Math.round(c.getMilliseconds() * Math.pow(10, f - 3));
                    g = !0;
                    break;
                case "z":
                    b = "";
                    break;
                default:
                    throw Error("dojox.date.hebrew.locale.formatPattern: invalid pattern char: " + h);
            }
            g && (b = A.pad(b, f));
            return b
        })
    }

    function w(c, d, a, e) {
        var h = function(b) {
            return b
        };
        d = d || h;
        a = a || h;
        e = e || h;
        var f = c.match(/(''|[^'])+/g),
            b = "'" == c.charAt(0);
        q.forEach(f, function(c,
            e) {
            c ? (f[e] = (b ? a : d)(c), b = !b) : f[e] = ""
        });
        return e(f.join(""))
    }

    function C(c, d, a, e) {
        e = z.escapeString(e);
        var h = m.normalizeLocale(a.locale);
        return e.replace(/([a-z])\1*/ig, function(f) {
            var b;
            b = f.charAt(0);
            var g = f.length,
                e = "";
            a.strict ? 1 < g && (e = "0{" + (g - 1) + "}") : e = "0?";
            switch (b) {
                case "y":
                    b = "\\S+";
                    break;
                case "M":
                    b = h.match("^he(?:-.+)?$") ? 2 < g ? "\\S+ ?\\S+" : "\\S{1,4}" : 2 < g ? "\\S+ ?\\S+" : e + "[1-9]|1[0-3]";
                    break;
                case "d":
                    b = h.match("^he(?:-.+)?$") ? "\\S['\"'\u05f3]{1,2}\\S?" : "[12]\\d|" + e + "[1-9]|30";
                    break;
                case "E":
                    b = h.match("^he(?:-.+)?$") ?
                        3 < g ? "\\S+ ?\\S+" : "\\S" : "\\S+";
                    break;
                case "h":
                    b = e + "[1-9]|1[0-2]";
                    break;
                case "k":
                    b = e + "\\d|1[01]";
                    break;
                case "H":
                    b = e + "\\d|1\\d|2[0-3]";
                    break;
                case "K":
                    b = e + "[1-9]|1\\d|2[0-4]";
                    break;
                case "m":
                case "s":
                    b = e + "\\d|[0-5]\\d";
                    break;
                case "S":
                    b = "\\d{" + g + "}";
                    break;
                case "a":
                    g = a.am || d["dayPeriods-format-wide-am"];
                    e = a.pm || d["dayPeriods-format-wide-pm"];
                    a.strict ? b = g + "|" + e : (b = g + "|" + e, g != g.toLowerCase() && (b += "|" + g.toLowerCase()), e != e.toLowerCase() && (b += "|" + e.toLowerCase()));
                    break;
                default:
                    b = ".*"
            }
            c && c.push(f);
            return "(" +
                b + ")"
        }).replace(/[\xa0 ]/g, "[\\s\\xa0]")
    }
    var k = p.getObject("date.hebrew.locale", !0, y);
    m.getLocalization("dojo.cldr", "hebrew");
    k.format = function(c, d) {
        d = d || {};
        var a = m.normalizeLocale(d.locale),
            e = d.formatLength || "short",
            h = k._getHebrewBundle(a),
            f = [],
            b = p.hitch(this, B, c, h, a, d.fullYear);
        if ("year" == d.selector) return f = c.getFullYear(), a.match(/^he(?:-.+)?$/) ? u.getYearHebrewLetters(f) : f;
        "time" != d.selector && (a = d.datePattern || h["dateFormat-" + e]) && f.push(w(a, b));
        "date" != d.selector && (a = d.timePattern || h["timeFormat-" +
            e]) && f.push(w(a, b));
        return f.join(" ")
    };
    k.regexp = function(c) {
        return k._parseInfo(c).regexp
    };
    k._parseInfo = function(c) {
        c = c || {};
        var d = m.normalizeLocale(c.locale),
            d = k._getHebrewBundle(d),
            a = c.formatLength || "short",
            e = c.datePattern || d["dateFormat-" + a],
            a = c.timePattern || d["timeFormat-" + a],
            h = [];
        return {
            regexp: w("date" == c.selector ? e : "time" == c.selector ? a : void 0 === a ? e : e + " " + a, p.hitch(this, C, h, d, c)),
            tokens: h,
            bundle: d
        }
    };
    k.parse = function(c, d) {
        c = c.replace(/[\u200E\u200F\u202A-\u202E]/g, "");
        d || (d = {});
        var a = k._parseInfo(d),
            e = a.tokens,
            h = a.bundle,
            a = (new RegExp("^" + a.regexp + "$")).exec(c),
            f = m.normalizeLocale(d.locale);
        if (!a) return null;
        var b = [5730, 3, 23, 0, 0, 0, 0],
            g = "",
            r = 0,
            p = ["abbr", "wide", "narrow"];
        q.every(a, function(a, c) {
            if (!c) return !0;
            var l = e[c - 1],
                n = l.length;
            switch (l.charAt(0)) {
                case "y":
                    f.match(/^he(?:-.+)?$/) ? b[0] = u.parseYearHebrewLetters(a) : b[0] = Number(a);
                    break;
                case "M":
                    if (2 < n) {
                        var l = k.getNames("months", p[n - 3], "format", f, new v(5769, 1, 1)),
                            t = k.getNames("months", p[n - 3], "format", f, new v(5768, 1, 1));
                        d.strict || (a = a.replace(".",
                            "").toLowerCase(), l = q.map(l, function(a) {
                            return a ? a.replace(".", "").toLowerCase() : a
                        }), t = q.map(t, function(a) {
                            return a ? a.replace(".", "").toLowerCase() : a
                        }));
                        var m = a;
                        a = q.indexOf(l, m);
                        if (-1 == a && (a = q.indexOf(t, m), -1 == a)) return !1;
                        r = n
                    } else f.match(/^he(?:-.+)?$/) ? a = u.parseMonthHebrewLetters(a) : a--;
                    b[1] = Number(a);
                    break;
                case "D":
                    b[1] = 0;
                case "d":
                    f.match(/^he(?:-.+)?$/) ? b[2] = u.parseDayHebrewLetters(a) : b[2] = Number(a);
                    break;
                case "a":
                    n = d.am || h["dayPeriods-format-wide-am"];
                    l = d.pm || h["dayPeriods-format-wide-pm"];
                    d.strict ||
                        (t = /\./g, a = a.replace(t, "").toLowerCase(), n = n.replace(t, "").toLowerCase(), l = l.replace(t, "").toLowerCase());
                    if (d.strict && a != n && a != l) return !1;
                    g = a == l ? "p" : a == n ? "a" : "";
                    break;
                case "K":
                    24 == a && (a = 0);
                case "h":
                case "H":
                case "k":
                    b[3] = Number(a);
                    break;
                case "m":
                    b[4] = Number(a);
                    break;
                case "s":
                    b[5] = Number(a);
                    break;
                case "S":
                    b[6] = Number(a)
            }
            return !0
        });
        a = +b[3];
        "p" === g && 12 > a ? b[3] = a + 12 : "a" === g && 12 == a && (b[3] = 0);
        a = new v(b[0], b[1], b[2], b[3], b[4], b[5], b[6]);
        3 > r && 5 <= b[1] && !a.isLeapYear(a.getFullYear()) && a.setMonth(b[1] + 1);
        return a
    };
    var x = [];
    k.addCustomFormats = function(c, d) {
        x.push({
            pkg: c,
            name: d
        })
    };
    k._getHebrewBundle = function(c) {
        var d = {};
        q.forEach(x, function(a) {
            a = m.getLocalization(a.pkg, a.name, c);
            d = p.mixin(d, a)
        }, this);
        return d
    };
    k.addCustomFormats("dojo.cldr", "hebrew");
    k.getNames = function(c, d, a, e, h) {
        var f;
        e = k._getHebrewBundle(e);
        d = [c, a, d];
        "standAlone" == a && (a = d.join("-"), f = e[a], 1 == f[0] && (f = void 0));
        d[1] = "format";
        a = (f || e[d.join("-")]).concat();
        "months" == c && (h.isLeapYear(h.getFullYear()) ? (d.push("leap"), a[6] = e[d.join("-")]) : delete a[5]);
        return a
    };
    return k
});