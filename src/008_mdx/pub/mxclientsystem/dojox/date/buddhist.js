//>>built
define("dojox/date/buddhist", ["dojox/main", "dojo/_base/lang", "dojo/date", "./buddhist/Date"], function(m, n, k, l) {
    var h = n.getObject("date.buddhist", !0, m);
    h.getDaysInMonth = function(b) {
        return k.getDaysInMonth(b.toGregorian())
    };
    h.isLeapYear = function(b) {
        return k.isLeapYear(b.toGregorian())
    };
    h.compare = function(b, c, a) {
        return k.compare(b, c, a)
    };
    h.add = function(b, c, a) {
        var d = new l(b);
        switch (c) {
            case "day":
                d.setDate(b.getDate(!0) + a);
                break;
            case "weekday":
                var e;
                (c = a % 5) ? e = parseInt(a / 5): (c = 0 < a ? 5 : -5, e = 0 < a ? (a - 5) / 5 : (a + 5) /
                    5);
                var f = b.getDay(),
                    g = 0;
                6 == f && 0 < a ? g = 1 : 0 == f && 0 > a && (g = -1);
                f += c;
                if (0 == f || 6 == f) g = 0 < a ? 2 : -2;
                a = 7 * e + c + g;
                d.setDate(b.getDate(!0) + a);
                break;
            case "year":
                d.setFullYear(b.getFullYear() + a);
                break;
            case "week":
                a *= 7;
                d.setDate(b.getDate(!0) + a);
                break;
            case "month":
                d.setMonth(b.getMonth() + a);
                break;
            case "hour":
                d.setHours(b.getHours() + a);
                break;
            case "minute":
                d._addMinutes(a);
                break;
            case "second":
                d._addSeconds(a);
                break;
            case "millisecond":
                d._addMilliseconds(a)
        }
        return d
    };
    h.difference = function(b, c, a) {
        c = c || new l;
        a = a || "day";
        var d =
            c.getFullYear() - b.getFullYear(),
            e = 1;
        switch (a) {
            case "weekday":
                d = Math.round(h.difference(b, c, "day"));
                e = parseInt(h.difference(b, c, "week"));
                if (0 == d % 7) d = 5 * e;
                else {
                    a = 0;
                    var f = b.getDay(),
                        g = c.getDay(),
                        e = parseInt(d / 7);
                    b = d % 7;
                    c = new l(c);
                    c.setDate(c.getDate(!0) + 7 * e);
                    c = c.getDay();
                    if (0 < d) switch (!0) {
                        case 5 == f:
                            a = -1;
                            break;
                        case 6 == f:
                            a = 0;
                            break;
                        case 5 == g:
                            a = -1;
                            break;
                        case 6 == g:
                            a = -2;
                            break;
                        case 5 < c + b:
                            a = -2
                    } else if (0 > d) switch (!0) {
                        case 5 == f:
                            a = 0;
                            break;
                        case 6 == f:
                            a = 1;
                            break;
                        case 5 == g:
                            a = 2;
                            break;
                        case 6 == g:
                            a = 1;
                            break;
                        case 0 > c + b:
                            a = 2
                    }
                    d =
                        d + a - 2 * e
                }
                e = d;
                break;
            case "year":
                e = d;
                break;
            case "month":
                a = c.toGregorian() > b.toGregorian() ? c : b;
                f = c.toGregorian() > b.toGregorian() ? b : c;
                e = a.getMonth();
                g = f.getMonth();
                if (0 == d) e = a.getMonth() - f.getMonth();
                else
                    for (e = 12 - g + e, d = f.getFullYear() + 1, a = a.getFullYear(), d; d < a; d++) e += 12;
                c.toGregorian() < b.toGregorian() && (e = -e);
                break;
            case "week":
                e = parseInt(h.difference(b, c, "day") / 7);
                break;
            case "day":
                e /= 24;
            case "hour":
                e /= 60;
            case "minute":
                e /= 60;
            case "second":
                e /= 1E3;
            case "millisecond":
                e *= c.toGregorian().getTime() - b.toGregorian().getTime()
        }
        return Math.round(e)
    };
    return h
});