//>>built
define("dojox/date/hebrew", ["dojox/main", "dojo/_base/lang", "dojo/date", "./hebrew/Date"], function(l, m, n, k) {
    var g = m.getObject("date.hebrew", !0, l);
    g.getDaysInMonth = function(a) {
        return a.getDaysInHebrewMonth(a.getMonth(), a.getFullYear())
    };
    g.compare = function(a, b, c) {
        a instanceof k && (a = a.toGregorian());
        b instanceof k && (b = b.toGregorian());
        return n.compare.apply(null, arguments)
    };
    g.add = function(a, b, c) {
        var e = new k(a);
        switch (b) {
            case "day":
                e.setDate(a.getDate() + c);
                break;
            case "weekday":
                b = a.getDay();
                var d = 0;
                0 > c &&
                    6 == b && (b = 5, d = -1);
                if (5 > b + c && 0 <= b + c) e.setDate(a.getDate() + c + d);
                else {
                    var f = 0 < c ? 5 : -1,
                        h = 0 < c ? 2 : -2;
                    0 < c && (5 == b || 6 == b) && (d = 4 - b, b = 4);
                    var g = b + c - f;
                    c = parseInt(g / 5);
                    g %= 5;
                    e.setDate(a.getDate() - b + h + 7 * c + d + g + f)
                }
                break;
            case "year":
                e.setFullYear(a.getFullYear() + c);
                break;
            case "week":
                c *= 7;
                e.setDate(a.getDate() + c);
                break;
            case "month":
                b = a.getMonth();
                d = b + c;
                a.isLeapYear(a.getFullYear()) || (5 > b && 5 <= d ? d++ : 5 < b && 5 >= d && d--);
                e.setMonth(d);
                break;
            case "hour":
                e.setHours(a.getHours() + c);
                break;
            case "minute":
                e._addMinutes(c);
                break;
            case "second":
                e._addSeconds(c);
                break;
            case "millisecond":
                e._addMilliseconds(c)
        }
        return e
    };
    g.difference = function(a, b, c) {
        b = b || new k;
        c = c || "day";
        var e = b.getFullYear() - a.getFullYear(),
            d = 1;
        switch (c) {
            case "weekday":
                d = Math.round(g.difference(a, b, "day"));
                c = parseInt(g.difference(a, b, "week"));
                if (0 == d % 7) d = 5 * c;
                else {
                    var e = 0,
                        f = a.getDay(),
                        h = b.getDay();
                    c = parseInt(d / 7);
                    b = d % 7;
                    a = new k(a);
                    a.setDate(a.getDate() + 7 * c);
                    a = a.getDay();
                    if (0 < d) switch (!0) {
                        case 5 == f:
                            e = -1;
                            break;
                        case 6 == f:
                            e = 0;
                            break;
                        case 5 == h:
                            e = -1;
                            break;
                        case 6 == h:
                            e = -2;
                            break;
                        case 5 < a + b:
                            e = -2
                    } else if (0 >
                        d) switch (!0) {
                        case 5 == f:
                            e = 0;
                            break;
                        case 6 == f:
                            e = 1;
                            break;
                        case 5 == h:
                            e = 2;
                            break;
                        case 6 == h:
                            e = 1;
                            break;
                        case 0 > a + b:
                            e = 2
                    }
                    d = d + e - 2 * c
                }
                break;
            case "year":
                d = e;
                break;
            case "month":
                f = b.toGregorian() > a.toGregorian() ? b : a;
                c = b.toGregorian() > a.toGregorian() ? a : b;
                h = f.getMonth();
                d = c.getMonth();
                if (0 == e) d = !b.isLeapYear(b.getFullYear()) && 5 < f.getMonth() && 5 >= c.getMonth() ? f.getMonth() - c.getMonth() - 1 : f.getMonth() - c.getMonth();
                else
                    for (d = !c.isLeapYear(c.getFullYear()) && 6 > d ? 13 - d - 1 : 13 - d, d += !f.isLeapYear(f.getFullYear()) && 5 < h ? h - 1 : h, e = c.getFullYear() +
                        1, f = f.getFullYear(), e; e < f; e++) d += c.isLeapYear(e) ? 13 : 12;
                b.toGregorian() < a.toGregorian() && (d = -d);
                break;
            case "week":
                d = parseInt(g.difference(a, b, "day") / 7);
                break;
            case "day":
                d /= 24;
            case "hour":
                d /= 60;
            case "minute":
                d /= 60;
            case "second":
                d /= 1E3;
            case "millisecond":
                d *= b.toGregorian().getTime() - a.toGregorian().getTime()
        }
        return Math.round(d)
    };
    return g
});