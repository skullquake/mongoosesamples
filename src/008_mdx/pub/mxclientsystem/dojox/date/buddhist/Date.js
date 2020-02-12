//>>built
define("dojox/date/buddhist/Date", ["dojo/_base/lang", "dojo/_base/declare", "dojo/date"], function(c, d, e) {
    c = d("dojox.date.buddhist.Date", null, {
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
            a ? 1 == a ? (a = arguments[0], "number" == typeof a && (a = new Date(a)), a instanceof Date ? this.fromGregorian(a) : "" == a ? this._date = new Date("") : (this._year = a._year, this._month = a._month, this._date = a._date, this._hours = a._hours, this._minutes = a._minutes, this._seconds =
                a._seconds, this._milliseconds = a._milliseconds)) : 3 <= a && (this._year += arguments[0], this._month += arguments[1], this._date += arguments[2], 11 < this._month && (console.warn("the month is incorrect , set 0"), this._month = 0), this._hours += arguments[3] || 0, this._minutes += arguments[4] || 0, this._seconds += arguments[5] || 0, this._milliseconds += arguments[6] || 0) : this.fromGregorian(new Date)
        },
        getDate: function(a) {
            return parseInt(this._date)
        },
        getMonth: function() {
            return parseInt(this._month)
        },
        getFullYear: function() {
            return parseInt(this._year)
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
            if (!(0 < a && a <= this._getDaysInMonth(this._month, this._year))) {
                var b;
                if (0 < a)
                    for (b = this._getDaysInMonth(this._month, this._year); a > b; a -= b, b = this._getDaysInMonth(this._month, this._year)) this._month++, 12 <= this._month && (this._year++, this._month -= 12);
                else
                    for (b = this._getDaysInMonth(0 <= this._month -
                            1 ? this._month - 1 : 11, 0 <= this._month - 1 ? this._year : this._year - 1); 0 >= a; b = this._getDaysInMonth(0 <= this._month - 1 ? this._month - 1 : 11, 0 <= this._month - 1 ? this._year : this._year - 1)) this._month--, 0 > this._month && (this._year--, this._month += 12), a += b
            }
            this._date = a;
            return this
        },
        setFullYear: function(a, b, c) {
            this._year = parseInt(a)
        },
        setMonth: function(a) {
            this._year += Math.floor(a / 12);
            for (this._month = Math.floor(a % 12); 0 > this._month; this._month += 12);
        },
        setHours: function() {
            var a = arguments.length,
                b = 0;
            1 <= a && (b = parseInt(arguments[0]));
            2 <= a && (this._minutes = parseInt(arguments[1]));
            3 <= a && (this._seconds = parseInt(arguments[2]));
            4 == a && (this._milliseconds = parseInt(arguments[3]));
            for (; 24 <= b;) this._date++, a = this._getDaysInMonth(this._month, this._year), this._date > a && (this._month++, 12 <= this._month && (this._year++, this._month -= 12), this._date -= a), b -= 24;
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
            this._addMinutes(parseInt(a /
                60));
            return this
        },
        _addMilliseconds: function(a) {
            a += this._milliseconds;
            this.setMilliseconds(a);
            this._addSeconds(parseInt(a / 1E3));
            return this
        },
        setMinutes: function(a) {
            this._minutes = a % 60;
            return this
        },
        setSeconds: function(a) {
            this._seconds = a % 60;
            return this
        },
        setMilliseconds: function(a) {
            this._milliseconds = a % 1E3;
            return this
        },
        toString: function() {
            return isNaN(this._date) ? "Invalid Date" : this._date + ", " + this._month + ", " + this._year + "  " + this._hours + ":" + this._minutes + ":" + this._seconds
        },
        _getDaysInMonth: function(a,
            b) {
            return e.getDaysInMonth(new Date(b - 543, a))
        },
        fromGregorian: function(a) {
            a = new Date(a);
            this._date = a.getDate();
            this._month = a.getMonth();
            this._year = a.getFullYear() + 543;
            this._hours = a.getHours();
            this._minutes = a.getMinutes();
            this._seconds = a.getSeconds();
            this._milliseconds = a.getMilliseconds();
            this._day = a.getDay();
            return this
        },
        toGregorian: function() {
            return new Date(this._year - 543, this._month, this._date, this._hours, this._minutes, this._seconds, this._milliseconds)
        },
        getDay: function() {
            return this.toGregorian().getDay()
        }
    });
    c.prototype.valueOf = function() {
        return this.toGregorian().valueOf()
    };
    return c
});