//>>built
define("dojox/date/umalqura/Date", ["dojo/_base/lang", "dojo/_base/declare", "dojo/date", "../islamic/Date"], function(l, h, k) {
    var g = h("dojox.date.umalqura.Date", null, {
        _MONTH_LENGTH: "101010101010 110101010100 111011001001 011011010100 011011101010 001101101100 101010101101 010101010101 011010101001 011110010010 101110101001 010111010100 101011011010 010101011100 110100101101 011010010101 011101001010 101101010100 101101101010 010110101101 010010101110 101001001111 010100010111 011010001011 011010100101 101011010101 001011010110 100101011011 010010011101 101001001101 110100100110 110110010101 010110101100 100110110110 001010111010 101001011011 010100101011 101010010101 011011001010 101011101001 001011110100 100101110110 001010110110 100101010110 101011001010 101110100100 101111010010 010111011001 001011011100 100101101101 010101001101 101010100101 101101010010 101110100101 010110110100 100110110110 010101010111 001010010111 010101001011 011010100011 011101010010 101101100101 010101101010 101010101011 010100101011 110010010101 110101001010 110110100101 010111001010 101011010110 100101010111 010010101011 100101001011 101010100101 101101010010 101101101010 010101110101 001001110110 100010110111 010001011011 010101010101 010110101001 010110110100 100111011010 010011011101 001001101110 100100110110 101010101010 110101010100 110110110010 010111010101 001011011010 100101011011 010010101011 101001010101 101101001001 101101100100 101101110001 010110110100 101010110101 101001010101 110100100101 111010010010 111011001001 011011010100 101011101001 100101101011 010010101011 101010010011 110101001001 110110100100 110110110010 101010111001 010010111010 101001011011 010100101011 101010010101 101100101010 101101010101 010101011100 010010111101 001000111101 100100011101 101010010101 101101001010 101101011010 010101101101 001010110110 100100111011 010010011011 011001010101 011010101001 011101010100 101101101010 010101101100 101010101101 010101010101 101100101001 101110010010 101110101001 010111010100 101011011010 010101011010 101010101011 010110010101 011101001001 011101100100 101110101010 010110110101 001010110110 101001010110 111001001101 101100100101 101101010010 101101101010 010110101101 001010101110 100100101111 010010010111 011001001011 011010100101 011010101100 101011010110 010101011101 010010011101 101001001101 110100010110 110110010101 010110101010 010110110101 001011011010 100101011011 010010101101 010110010101 011011001010 011011100100 101011101010 010011110101 001010110110 100101010110 101010101010 101101010100 101111010010 010111011001 001011101010 100101101101 010010101101 101010010101 101101001010 101110100101 010110110010 100110110101 010011010110 101010010111 010101000111 011010010011 011101001001 101101010101 010101101010 101001101011 010100101011 101010001011 110101000110 110110100011 010111001010 101011010110 010011011011 001001101011 100101001011 101010100101 101101010010 101101101001 010101110101 000101110110 100010110111 001001011011 010100101011 010101100101 010110110100 100111011010 010011101101 000101101101 100010110110 101010100110 110101010010 110110101001 010111010100 101011011010 100101011011 010010101011 011001010011 011100101001 011101100010 101110101001 010110110010 101010110101 010101010101 101100100101 110110010010 111011001001 011011010010 101011101001 010101101011 010010101011 101001010101 110100101001 110101010100 110110101010 100110110101 010010111010 101000111011 010010011011 101001001101 101010101010 101011010101 001011011010 100101011101 010001011110 101000101110 110010011010 110101010101 011010110010 011010111001 010010111010 101001011101 010100101101 101010010101 101101010010 101110101000 101110110100 010110111001 001011011010 100101011010 101101001010 110110100100 111011010001 011011101000 101101101010 010101101101 010100110101 011010010101 110101001010 110110101000 110111010100 011011011010 010101011011 001010011101 011000101011 101100010101 101101001010 101110010101 010110101010 101010101110 100100101110 110010001111 010100100111 011010010101 011010101010 101011010110 010101011101 001010011101".split(" "),
        _hijriBegin: 1300,
        _hijriEnd: 1600,
        _date: 0,
        _month: 0,
        _year: 0,
        _hours: 0,
        _minutes: 0,
        _seconds: 0,
        _milliseconds: 0,
        _day: 0,
        constructor: function() {
            var a = arguments.length;
            a ? 1 == a ? (a = arguments[0], "number" == typeof a && (a = new Date(a)), a instanceof Date ? this.fromGregorian(a) : "" == a ? this._date = new Date("") : (this._year = a._year, this._month = a._month, this._date = a._date, this._hours = a._hours, this._minutes = a._minutes, this._seconds = a._seconds, this._milliseconds = a._milliseconds)) : 3 <= a && (this._year += arguments[0], this._month += arguments[1],
                this._date += arguments[2], this._hours += arguments[3] || 0, this._minutes += arguments[4] || 0, this._seconds += arguments[5] || 0, this._milliseconds += arguments[6] || 0) : this.fromGregorian(new Date)
        },
        getDate: function() {
            return this._date
        },
        getMonth: function() {
            return this._month
        },
        getFullYear: function() {
            return this._year
        },
        getDay: function() {
            return this.toGregorian().getDay()
        },
        getHours: function() {
            return this._hours
        },
        getMinutes: function() {
            return this._minutes
        },
        getSeconds: function() {
            return this._seconds
        },
        getMilliseconds: function() {
            return this._milliseconds
        },
        setDate: function(a) {
            a = parseInt(a);
            if (!(0 < a && a <= this.getDaysInIslamicMonth(this._month, this._year))) {
                var b;
                if (0 < a)
                    for (b = this.getDaysInIslamicMonth(this._month, this._year); a > b; a -= b, b = this.getDaysInIslamicMonth(this._month, this._year)) this._month++, 12 <= this._month && (this._year++, this._month -= 12);
                else
                    for (b = this.getDaysInIslamicMonth(0 <= this._month - 1 ? this._month - 1 : 11, 0 <= this._month - 1 ? this._year : this._year - 1); 0 >= a; b = this.getDaysInIslamicMonth(0 <= this._month - 1 ? this._month - 1 : 11, 0 <= this._month - 1 ? this._year :
                            this._year - 1)) this._month--, 0 > this._month && (this._year--, this._month += 12), a += b
            }
            this._date = a;
            return this
        },
        setFullYear: function(a) {
            this._year = +a
        },
        setMonth: function(a) {
            this._year += Math.floor(a / 12);
            this._month = 0 < a ? Math.floor(a % 12) : Math.floor((a % 12 + 12) % 12)
        },
        setHours: function() {
            var a = arguments.length,
                b = 0;
            1 <= a && (b = parseInt(arguments[0]));
            2 <= a && (this._minutes = parseInt(arguments[1]));
            3 <= a && (this._seconds = parseInt(arguments[2]));
            4 == a && (this._milliseconds = parseInt(arguments[3]));
            for (; 24 <= b;) this._date++, a = this.getDaysInIslamicMonth(this._month,
                this._year), this._date > a && (this._month++, 12 <= this._month && (this._year++, this._month -= 12), this._date -= a), b -= 24;
            this._hours = b
        },
        _addMinutes: function(a) {
            a += this._minutes;
            this.setMinutes(a);
            this.setHours(this._hours + parseInt(a / 60));
            return this
        },
        _addSeconds: function(a) {
            a += this._seconds;
            this.setSeconds(a);
            this._addMinutes(parseInt(a / 60));
            return this
        },
        _addMilliseconds: function(a) {
            a += this._milliseconds;
            this.setMilliseconds(a);
            this._addSeconds(parseInt(a / 1E3));
            return this
        },
        setMinutes: function(a) {
            for (; 60 <= a;) {
                this._hours++;
                if (24 <= this._hours) {
                    this._date++;
                    this._hours -= 24;
                    var b = this.getDaysInIslamicMonth(this._month, this._year);
                    this._date > b && (this._month++, 12 <= this._month && (this._year++, this._month -= 12), this._date -= b)
                }
                a -= 60
            }
            this._minutes = a
        },
        setSeconds: function(a) {
            for (; 60 <= a;) {
                this._minutes++;
                if (60 <= this._minutes && (this._hours++, this._minutes -= 60, 24 <= this._hours)) {
                    this._date++;
                    this._hours -= 24;
                    var b = this.getDaysInIslamicMonth(this._month, this._year);
                    this._date > b && (this._month++, 12 <= this._month && (this._year++, this._month -=
                        12), this._date -= b)
                }
                a -= 60
            }
            this._seconds = a
        },
        setMilliseconds: function(a) {
            for (; 1E3 <= a;) {
                this.setSeconds++;
                if (60 <= this.setSeconds && (this._minutes++, this.setSeconds -= 60, 60 <= this._minutes && (this._hours++, this._minutes -= 60, 24 <= this._hours))) {
                    this._date++;
                    this._hours -= 24;
                    var b = this.getDaysInIslamicMonth(this._month, this._year);
                    this._date > b && (this._month++, 12 <= this._month && (this._year++, this._month -= 12), this._date -= b)
                }
                a -= 1E3
            }
            this._milliseconds = a
        },
        toString: function() {
            var a = new Date;
            a.setHours(this._hours);
            a.setMinutes(this._minutes);
            a.setSeconds(this._seconds);
            a.setMilliseconds(this._milliseconds);
            return this._month + " " + this._date + " " + this._year + " " + a.toTimeString()
        },
        toGregorian: function() {
            var a = this._year,
                b = this._month,
                c = new Date,
                c = this._date - 1,
                d = new Date(1882, 10, 12, this._hours, this._minutes, this._seconds, this._milliseconds);
            if (a >= this._hijriBegin && a <= this._hijriEnd) {
                for (var f = 0; f < a - this._hijriBegin; f++)
                    for (var e = 0; 12 > e; e++) c += parseInt(this._MONTH_LENGTH[f][e], 10) + 29;
                for (e = 0; e < b; e++) c += parseInt(this._MONTH_LENGTH[a - this._hijriBegin][e],
                    10) + 29;
                c = k.add(d, "day", c)
            } else a = new dojox.date.islamic.Date(this._year, this._month, this._date, this._hours, this._minutes, this._seconds, this._milliseconds), c = new Date(a.toGregorian());
            return c
        },
        getDaysDiff: function(a, b) {
            var c = Math.abs(a.getTime() - b.getTime());
            return Math.round(c / 864E5)
        },
        fromGregorian: function(a) {
            var b = new Date(a),
                c = new Date(1882, 10, 12, 0, 0, 0, 0),
                d = new Date(2174, 10, 25, 23, 59, 59, 999),
                f = this.getDaysDiff(b, c);
            if (0 <= b - c && 0 >= b - d)
                for (a = 1300, c = 0; c < this._MONTH_LENGTH.length; c++, a++)
                    for (d = 0; 12 >
                        d; d++) {
                        var e = parseInt(this._MONTH_LENGTH[c][d], 10) + 29;
                        if (f <= e) return this._date = f + 1, this._date > e && (this._date = 1, d++), 11 < d && (d = 0, a++), this._month = d, this._year = a, this._hours = b.getHours(), this._minutes = b.getMinutes(), this._seconds = b.getSeconds(), this._milliseconds = b.getMilliseconds(), this._day = b.getDay(), this;
                        f = parseInt(f, 10) - e
                    } else b = new dojox.date.islamic.Date(b), this._date = b.getDate(), this._month = b.getMonth(), this._year = b.getFullYear(), this._hours = a.getHours(), this._minutes = a.getMinutes(), this._seconds =
                        a.getSeconds(), this._milliseconds = a.getMilliseconds(), this._day = a.getDay();
            return this
        },
        valueOf: function() {
            return this.toGregorian().valueOf()
        },
        _yearStart: function(a) {
            return 354 * (a - 1) + Math.floor((3 + 11 * a) / 30)
        },
        _monthStart: function(a, b) {
            return Math.ceil(29.5 * b) + 354 * (a - 1) + Math.floor((3 + 11 * a) / 30)
        },
        _civilLeapYear: function(a) {
            return 11 > (14 + 11 * a) % 30
        },
        getDaysInIslamicMonth: function(a, b) {
            if (b >= this._hijriBegin && b <= this._hijriEnd) var c = 0,
                c = 1 == this._MONTH_LENGTH[b - this._hijriBegin].charAt(a) ? 30 : 29;
            else c = (new dojox.date.islamic.Date).getDaysInIslamicMonth(a,
                b);
            return c
        }
    });
    g.getDaysInIslamicMonth = function(a) {
        return (new g).getDaysInIslamicMonth(a.getMonth(), a.getFullYear())
    };
    return g
});