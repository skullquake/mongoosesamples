/* @preserve
    Copyright (c) 2005-2016, Mendix bv. All rights reserved.
    See mxclientsystem/licenses.txt for third party licenses that apply.
*/
(window.mxJsonp = window.mxJsonp || []).push([
    [1], {
        132: function(e, t) {
            function n(e) {
                this.fork = e
            }
            n.of = function(e) {
                return new n(function(t, n) {
                    n(e)
                })
            }, n.prototype.chain = function(e) {
                var t = this;
                return new n(function(n, r) {
                    t.fork(n, function(t) {
                        e(t).fork(n, r)
                    })
                })
            }, n.prototype.orElse = function(e) {
                var t = this;
                return new n(function(n, r) {
                    t.fork(function(t) {
                        e(t).fork(n, r)
                    }, r)
                })
            }, n.prototype.ap = function(e) {
                var t, r, i, u = this,
                    o = 2;
                return new n(function(n, a) {
                    function c() {
                        0 == --o && a(t(r))
                    }

                    function s(e) {
                        void 0 === i && n(i = e)
                    }
                    u.fork(s, function(e) {
                        t = e, c()
                    }), e.fork(s, function(e) {
                        r = e, c()
                    })
                })
            }, n.prototype.map = function(e) {
                return this.chain(function(t) {
                    return n.of(e(t))
                })
            }, n.rejected = n.prototype.rejected = function(e) {
                return new n(function(t, n) {
                    t(e)
                })
            }, n.parallel = function(e) {
                return new n(function(t, n) {
                    var r, i = e.length,
                        u = new Array(e.length);
                    0 !== e.length ? e.forEach(function(e, o) {
                        e.fork(function(e) {
                            void 0 === r && (r = e, t(e))
                        }, function(e) {
                            return function(t) {
                                u[e] = t, void 0 === r && 0 == --i && n(u)
                            }
                        }(o))
                    }) : n(u)
                })
            }, n.sequence = function(e) {
                return e.reduce(function(e, t) {
                    return e.chain(function(e) {
                        return t
                    })
                }, n.of(null))
            }, e.exports = n
        },
        133: function(e, t) {
            e.exports = {
                LIKE_ESCAPE_CHAR: "~",
                QUOTE_CHAR: '"'
            }
        },
        154: function(e, t, n) {
            var r = n(270),
                i = n(132),
                u = new r(i);
            u.rejected = function(e) {
                return new u(function(t) {
                    return i.rejected(e)
                })
            }, u.parallel = function(e) {
                return new u(function(t) {
                    return new i(function(n, r) {
                        if (0 !== e.length) {
                            var i = new Array(e.length),
                                u = e.length,
                                o = !1;
                            e.forEach(function(e, a) {
                                e.run(t).fork(function(e) {
                                    o || (o = !0, n(e))
                                }, function(e) {
                                    i[a] = e, o || 0 != --u || r(i)
                                })
                            })
                        } else r([])
                    })
                })
            }, u.sequence = function(e) {
                return e.reduce(function(e, t) {
                    return e.chain(function(e) {
                        return t.map(function(t) {
                            return e.concat([t])
                        })
                    })
                }, u.of([]))
            }, e.exports = u
        },
        188: function(e, t, n) {
            var r = n(132),
                i = {
                    promiseFromTask: function(e) {
                        return new Promise(function(t, n) {
                            e.fork(n, t)
                        })
                    },
                    callbackFromTask: function(e, t, n) {
                        e.fork(function(e) {
                            n && n(e)
                        }, function(e) {
                            t && t(e)
                        })
                    },
                    taskFromPromise: function(e) {
                        return new r(function(t, n) {
                            e.then(n, t)
                        })
                    }
                };
            e.exports = i
        },
        191: function(e, t, n) {
            var r = n(274),
                i = n(269),
                u = n(268),
                o = n(154),
                a = n(188);

            function c() {
                return window.openDatabase("MendixDatabase", "1", "Mendix Database", 10485760)
            }

            function s(e, t) {
                u.call(this), t = t || c, this._tableNames = e;
                var n = t();
                this._databasePromise = this._initialize(n)
            }
            s.prototype = Object.create(u.prototype), s.prototype._getDatabase = function() {
                return this._databasePromise
            }, s.prototype._initialize = function(e) {
                var t = r.createCreateTransaction(this._tableNames);
                return a.promiseFromTask(i.runWriteTransaction(e, t)).then(function() {
                    return e
                })
            }, s.prototype._fetch = function(e) {
                return function(t) {
                    var n = r.createFetchByGuidTransaction(e);
                    return a.promiseFromTask(i.runReadTransaction(t, n))
                }
            }, s.prototype._fetchSlice = function(e, t, n) {
                return function(u) {
                    var o = r.createFetchSliceTransaction(e, t, n.offset, n.limit, n.sort);
                    return a.promiseFromTask(i.runReadTransaction(u, o))
                }
            }, s.prototype._rebuildDb = function(e) {
                return o.ask().chain(function(t) {
                    var n = r.createRebuildTransaction(this._tableNames, e);
                    return new o(function(e) {
                        return i.runWriteTransaction(t, n)
                    })
                }.bind(this))
            }, s.prototype._insertOrReplace = function(e) {
                return function(t) {
                    var n = r.createInsertOrReplaceTransaction(e);
                    return a.promiseFromTask(i.runWriteTransaction(t, n))
                }
            }, s.prototype._cleanDatabase = function() {
                var e = this;
                return function(t) {
                    var n = r.createCleanTransaction(e._tableNames);
                    return a.promiseFromTask(i.runWriteTransaction(t, n))
                }
            }, s.prototype._fetchDirty = function() {
                return o.ask().chain(function(e) {
                    var t = r.createFetchDirtyObjectsTransaction();
                    return new o(function(n) {
                        return i.runWriteTransaction(e, t)
                    })
                })
            }, s.prototype._makeClean = function(e) {
                return o.ask().chain(function(t) {
                    var n = r.createMakeCleanTransaction(e);
                    return new o(function(e) {
                        return i.runWriteTransaction(t, n)
                    })
                })
            }, s.prototype._cleanupDirtyObjects = function() {
                return function(e) {
                    var t = r.createDirtyCleanupTransaction();
                    return a.promiseFromTask(i.runWriteTransaction(e, t))
                }
            }, e.exports = s
        },
        268: function(e, t, n) {
            var r = n(188),
                i = n(154);

            function u() {}
            u.prototype.getSlice = function(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
                return this._getDatabase().then(this._fetchSlice(e, t, n))
            }, u.prototype.getByGuid = function(e) {
                return this._getDatabase().then(this._fetch(e))
            }, u.prototype.insertOrReplace = function(e) {
                return this._getDatabase().then(this._insertOrReplace(e))
            }, u.prototype.cleanDatabase = function() {
                return this._getDatabase().then(this._cleanDatabase())
            }, u.prototype.rebuildDatabase = function(e) {
                var t = this;
                return this._getDatabase().then(function(n) {
                    return r.promiseFromTask(t._rebuildDb(e).run(n))
                })
            }, u.prototype.fetchDirty = function() {
                var e = this;
                return this._getDatabase().then(function(t) {
                    return r.promiseFromTask(e._fetchDirty().run(t))
                })
            }, u.prototype.makeClean = function(e) {
                var t = this;
                return this._getDatabase().then(function(n) {
                    return r.promiseFromTask(t._makeClean(e).run(n))
                })
            }, u.prototype.cleanupDirtyObjects = function() {
                return this._getDatabase().then(this._cleanupDirtyObjects())
            }, u.prototype._getDatabase = function() {
                return Promise.reject(new Error("not implemented"))
            }, u.prototype._initialize = function() {
                return Promise.reject(new Error("not implemented"))
            }, u.prototype._fetch = function(e) {
                return function(e) {
                    return Promise.reject(new Error("not implemented"))
                }
            }, u.prototype._fetchSlice = function(e, t, n) {
                return function(e) {
                    return Promise.reject(new Error("not implemented"))
                }
            }, u.prototype._insertOrReplace = function(e) {
                return function(e) {
                    return Promise.reject(new Error("not implemented"))
                }
            }, u.prototype._cleanDatabase = function() {
                return function(e) {
                    return Promise.reject(new Error("not implemented"))
                }
            }, u.prototype._rebuildDb = function(e) {
                return i.rejected(new Error("not implemented"))
            }, u.prototype._fetchDirty = function() {
                return i.rejected(new Error("not implemented"))
            }, u.prototype._makeClean = function() {
                return i.rejected(new Error("not implemented"))
            }, u.prototype._cleanupDirtyObjects = function() {
                return function(e) {
                    return Promise.reject(new Error("not implemented"))
                }
            }, e.exports = u
        },
        269: function(e, t, n) {
            var r = n(132);

            function i(e) {
                return function(t, n) {
                    return new r(function(r, i) {
                        var u, o = 2;
                        t[e](function(e) {
                            n.run(e).fork(r, function(e) {
                                u = e, 0 == --o && i(u)
                            })
                        }, r, function() {
                            0 == --o && i(u)
                        })
                    })
                }
            }
            e.exports = {
                runReadTransaction: i("readTransaction"),
                runWriteTransaction: i("transaction")
            }
        },
        270: function(e, t) {
            e.exports = function(e) {
                function t(e) {
                    this.run = e
                }
                return t.prototype.chain = function(e) {
                    return new t(function(t) {
                        return this.run(t).chain(function(n) {
                            return e(n).run(t)
                        })
                    }.bind(this))
                }, t.prototype.ap = function(e) {
                    return new t(function(t) {
                        return this.run(t).ap(e.run(t))
                    }.bind(this))
                }, t.prototype.map = function(e) {
                    return this.chain(function(n) {
                        return t.of(e(n))
                    })
                }, t.of = function(n) {
                    return new t(function(t) {
                        return e.of(n)
                    })
                }, t.ask = function() {
                    return new t(e.of)
                }, t
            }
        },
        271: function(e, t, n) {
            var r = n(133);

            function i(e, t) {
                if (!(this instanceof i)) return new i;
                this._tableName = t && t.tableName || e && e._tableName || null, this._columnNames = t && t.columnNames || e && e._columnNames || []
            }

            function u(e) {
                var t = r.QUOTE_CHAR;
                return t + e + t
            }
            i.prototype.into = function(e) {
                return new i(this, {
                    tableName: e
                })
            }, i.prototype.column = function(e) {
                return new i(this, {
                    columnNames: this._columnNames.concat(e)
                })
            }, i.prototype.insert = function() {
                var e = "";
                return e += "INSERT INTO " + u(this._tableName), e += this._buildSql()
            }, i.prototype.insertOrReplace = function() {
                var e = "";
                return e += "INSERT OR REPLACE INTO " + u(this._tableName), e += this._buildSql()
            }, i.prototype._buildSql = function() {
                var e = "";
                return this._columnNames.length > 0 && (e += " (", e += this._columnNames.map(u).join(", "), e += ")"), e += " VALUES (", e += "?" + new Array(this._columnNames.length).join(", ?"), e += ")"
            }, e.exports = i
        },
        272: function(e, t, n) {
            var r = n(133);

            function i(e, t) {
                this._tableName = t && t.tableName || e && e._tableName || null, this._columns = t && t.columns || e && e._columns || []
            }

            function u(e) {
                var t = r.QUOTE_CHAR;
                return t + e + t
            }
            i.prototype.table = function(e) {
                return new i(this, {
                    tableName: e
                })
            }, i.prototype.column = function(e, t) {
                return new i(this, {
                    columns: this._columns.concat({
                        columnName: e,
                        columnType: t,
                        isPrimary: !1
                    })
                })
            }, i.prototype.primaryKeyColumn = function(e, t) {
                return new i(this, {
                    columns: this._columns.concat({
                        columnName: e,
                        columnType: t,
                        isPrimary: !0
                    })
                })
            }, i.prototype.createIfNotExists = function() {
                var e = "";
                return e += "CREATE TABLE IF NOT EXISTS " + u(this._tableName), e += this._buildSql()
            }, i.prototype._buildSql = function() {
                var e = "";
                return this._columns.length > 0 && (e += " (", e += this._columns.map(function(e) {
                    return [u(e.columnName), e.columnType, "text" === e.columnType ? " COLLATE NOCASE " : "", e.isPrimary ? "PRIMARY KEY " : ""].join(" ").slice(0, -1)
                }, this).join(", "), e += ")"), e
            }, e.exports = i
        },
        273: function(e, t, n) {
            "use strict";
            n.r(t), n.d(t, "SqlSelectBuilder", function() {
                return o
            }), n.d(t, "constraintBuilder", function() {
                return f
            });
            var r = function() {
                function e(e, t) {
                    for (var n = 0; n < t.length; n++) {
                        var r = t[n];
                        r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                    }
                }
                return function(t, n, r) {
                    return n && e(t.prototype, n), r && e(t, r), t
                }
            }();

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            var u = n(133),
                o = function() {
                    function e(t, n) {
                        i(this, e), this._select = n && n.select || t && t._select || null, this._from = n && n.from || t && t._from || null, this._join = n && n.join || t && t._join || null, this._constraints = n && n.constraints || t && t._constraints || [], this._orderBy = n && n.orderBy || t && t._orderBy || [], this._limit = n && n.limit || t && t._limit || null, this._offset = n && n.offset || t && t._offset || null
                    }
                    return r(e, [{
                        key: "from",
                        value: function(t) {
                            return new e(this, {
                                from: t
                            })
                        }
                    }, {
                        key: "join",
                        value: function(t, n, r) {
                            return new e(this, {
                                join: {
                                    tableName: t,
                                    joinOnColumn: n,
                                    selectedColumns: r
                                }
                            })
                        }
                    }, {
                        key: "where",
                        value: function(t) {
                            return new e(this, {
                                constraints: this._constraints.concat(t)
                            })
                        }
                    }, {
                        key: "order",
                        value: function(t, n) {
                            return new e(this, {
                                orderBy: this._orderBy.concat([
                                    [t, n]
                                ])
                            })
                        }
                    }, {
                        key: "limit",
                        value: function(t) {
                            return new e(this, {
                                limit: t
                            })
                        }
                    }, {
                        key: "offset",
                        value: function(t) {
                            return new e(this, {
                                offset: t
                            })
                        }
                    }, {
                        key: "selectDistinct",
                        value: function(e) {
                            return Array.isArray(e) && (e = e.join(", ")), "SELECT DISTINCT " + e + " " + this._buildSql()
                        }
                    }, {
                        key: "selectCount",
                        value: function(e) {
                            return "SELECT COUNT(*) AS " + e + this._buildSql()
                        }
                    }, {
                        key: "select",
                        value: function() {
                            var e = this,
                                t = "SELECT " + this._from + ".*";
                            return this._join && this._join.selectedColumns.forEach(function(n) {
                                t += ", " + e._join.tableName + ".[" + n + '] as "' + e._join.tableName + "." + n + '"'
                            }), t + this._buildSql()
                        }
                    }, {
                        key: "_buildSql",
                        value: function() {
                            var e = this,
                                t = " FROM " + this._from + " AS " + this._from;
                            return this._join && (t += " JOIN " + this._join.tableName + " AS " + this._join.tableName + " USING (" + this._join.joinOnColumn + ")"), this._constraints.length > 0 && (t += " WHERE " + this._constraints.map(function(t) {
                                return t.build(e._from)
                            }).join(" AND ")), this._orderBy.length > 0 && (t += " ORDER BY " + this._orderBy.map(function(t) {
                                return e._from + ".[" + t[0] + "] " + t[1]
                            }).join(", ")), this._limit && (t += " LIMIT " + this._limit), this._offset && (t += " OFFSET " + this._offset), t
                        }
                    }]), e
                }(),
                a = {
                    equals: m("="),
                    lessThan: m("<"),
                    lessThanOrEquals: m("<="),
                    greaterThan: m(">"),
                    greaterThanOrEquals: m(">="),
                    contains: function(e) {
                        var t = "";
                        return t += e, t += " LIKE '%' || ? || '%'", t += " ESCAPE '" + u.LIKE_ESCAPE_CHAR + "'"
                    }
                },
                c = function() {
                    function e(t, n, r) {
                        i(this, e), this._column = t, this._operator = n, this._negate = !!r
                    }
                    return r(e, [{
                        key: "build",
                        value: function(e) {
                            var t = a[this._operator],
                                n = this._column.indexOf(".") > -1 ? this._column : e + ".[" + this._column + "]";
                            return (this._negate ? "NOT " : "") + t(n)
                        }
                    }]), e
                }(),
                s = function() {
                    function e(t, n) {
                        i(this, e), this._column = t, this._negate = !!n
                    }
                    return r(e, [{
                        key: "build",
                        value: function(e) {
                            return (this._column.indexOf(".") > -1 ? this._column : e + ".[" + this._column + "]") + " IS " + (this._negate ? "NOT " : "") + "NULL"
                        }
                    }]), e
                }(),
                l = function() {
                    function e(t, n) {
                        i(this, e), this.group = t, this.constraints = n || []
                    }
                    return r(e, [{
                        key: "add",
                        value: function(e) {
                            this.constraints.push(e)
                        }
                    }, {
                        key: "build",
                        value: function(e) {
                            return "(" + this.constraints.map(function(t) {
                                return t.build(e)
                            }).join(" " + this.group + " ") + ")"
                        }
                    }]), e
                }(),
                f = {
                    and: function(e) {
                        return new l("and", e)
                    },
                    or: function(e) {
                        return new l("or", e)
                    },
                    equals: function(e, t) {
                        return new c(e, "equals", t)
                    },
                    isNull: function(e, t) {
                        return new s(e, t)
                    },
                    lessThan: function(e, t) {
                        return new c(e, "lessThan", t)
                    },
                    lessThanOrEquals: function(e, t) {
                        return new c(e, "lessThanOrEquals", t)
                    },
                    greaterThan: function(e, t) {
                        return new c(e, "greaterThan", t)
                    },
                    greaterThanOrEquals: function(e, t) {
                        return new c(e, "greaterThanOrEquals", t)
                    },
                    contains: function(e, t) {
                        return new c(e, "contains", t)
                    }
                };

            function m(e) {
                return function(t) {
                    return t + " " + e + " ?"
                }
            }
        },
        274: function(e, t, n) {
            var r = n(133),
                i = n(273),
                u = i.SqlSelectBuilder,
                o = i.constraintBuilder,
                a = n(272),
                c = n(271),
                s = n(154),
                l = n(132),
                f = n(8),
                m = "_guidToTable",
                h = {
                    String: "text",
                    Integer: "text",
                    Long: "text",
                    Decimal: "text",
                    Float: "text",
                    Currency: "text",
                    Enum: "text",
                    HashString: "text",
                    ObjectReference: "text",
                    DateTime: "integer",
                    Boolean: "integer",
                    AutoNumber: "integer",
                    Binary: "blob"
                },
                p = {
                    String: x,
                    Integer: j,
                    Long: j,
                    Decimal: j,
                    Float: j,
                    Currency: j,
                    Enum: x,
                    HashString: x,
                    ObjectReference: x,
                    DateTime: function(e) {
                        return null != e ? Number(e) : null
                    },
                    Boolean: Number,
                    AutoNumber: x,
                    Binary: x
                },
                y = {
                    String: x,
                    Integer: x,
                    Long: x,
                    Decimal: x,
                    Float: x,
                    Currency: x,
                    Enum: x,
                    HashString: x,
                    ObjectReference: x,
                    DateTime: T,
                    Boolean: Boolean,
                    AutoNumber: x,
                    Binary: x
                },
                d = {
                    String: T,
                    Integer: T,
                    Long: T,
                    Decimal: T,
                    Float: T,
                    Currency: T,
                    Enum: T,
                    HashString: T,
                    ObjectReference: T,
                    DateTime: function(e) {
                        return e ? Number(e) : null
                    },
                    Boolean: function(e) {
                        return "false" !== e
                    },
                    AutoNumber: T,
                    Binary: T
                },
                b = {
                    createCreateTransaction: g,
                    createCleanTransaction: function(e) {
                        var t = [m].concat(e).map(k).map(function(e) {
                            return "DELETE FROM '" + e + "'"
                        }).map(function(e) {
                            return C(e, [])
                        });
                        return s.parallel(t).map(function(e) {})
                    },
                    createFetchByGuidTransaction: function(e) {
                        return C((new u).from(m).where(o.equals("guid")).select(), [e]).chain(function(t) {
                            if (0 === t.rows.length) return s.of(null);
                            if (1 !== t.rows.length) return s.rejected(new Error("db consistency error"));
                            var n = t.rows.item(0),
                                r = n.tableName,
                                i = Boolean(n.dirty),
                                a = n.readonlyAttrs;
                            return C((new u).from(k(r)).where(o.equals("guid")).select(), [e]).chain(function(e) {
                                return 0 === e.rows.length ? s.rejected(new Error("entity not found")) : 1 !== e.rows.length ? s.rejected(new Error("db consistency error")) : s.of(R(window.mx.meta.getEntity(r), i, a, e.rows.item(0)))
                            })
                        })
                    },
                    createFetchSliceTransaction: function(e, t, n, i, a) {
                        t = t || [], a = a || [];
                        var c = window.mx.meta.getEntity(e),
                            l = function(e, t) {
                                var n = [];
                                return {
                                    builder: (new u).where(t.map(function t(i) {
                                        if (i.constraints) return o[i.operator](i.constraints.map(t).filter(function(e) {
                                            return null !== e
                                        }));
                                        if (null == i.value) switch (i.operator) {
                                            case "contains":
                                                return null;
                                            case "equals":
                                                return o.isNull(k(i.attribute), i.negate)
                                        }
                                        var u = e.getAttributeType(i.attribute);
                                        var a = d[u];
                                        var c = p[u];
                                        var s = c(a(i.value));
                                        n.push("contains" === i.operator ? (l = s, f = r.LIKE_ESCAPE_CHAR, l.replace(new RegExp(f, "g"), f + f).replace(/%/g, f + "%").replace(/_/g, f + "_")) : s);
                                        var l, f;
                                        return o[i.operator](k(i.attribute), i.negate)
                                    }).filter(function(e) {
                                        return null !== e
                                    })),
                                    args: n
                                }
                            }(c, t),
                            f = l.builder.from(k(e)),
                            h = l.args,
                            y = f.offset(n).limit(i).join(m, "guid", ["dirty", "readonlyAttrs"]),
                            b = C((y = a.reduce(function(e, t) {
                                return e.order(t[0], t[1])
                            }, y)).select(), h).map(function(e) {
                                for (var t = [], n = 0; n < e.rows.length; ++n) {
                                    var r = e.rows.item(n),
                                        i = Boolean(r[m + ".dirty"]),
                                        u = D(r, "readonlyAttrs");
                                    t.push(R(c, i, u, r))
                                }
                                return t
                            }),
                            g = C(f.selectCount("cnt"), h).map(function(e) {
                                return e.rows.item(0).cnt
                            });
                        return s.parallel([b, g])
                    },
                    createInsertOrReplaceTransaction: function(e) {
                        return s.parallel(e.map(function(e) {
                            var t = e.$objectType,
                                n = _(),
                                r = w(t, e);
                            return [C(n.insertOrReplace(), [e.guid, t, 1, JSON.stringify(e.$readonlyAttrs)]), C(r.builder.insertOrReplace(), r.values)]
                        }).reduce(function(e, t) {
                            return e.concat(t)
                        }, [])).map(function(e) {})
                    },
                    createFetchDirtyObjectsTransaction: function() {
                        return v().chain(function(e) {
                            var t = E(e.rows).map(function(e) {
                                var t = e.tableName,
                                    n = (new u).from(k(t)).join(m, "guid", ["dirty", "readonlyAttrs"]).where(o.equals(m + ".dirty")).select(),
                                    r = window.mx.meta.getEntity(t);
                                return C(n, [1]).map(function(e) {
                                    return E(e.rows).map(function(e) {
                                        return R(r, !0, D(e, "readonlyAttrs"), e)
                                    })
                                })
                            });
                            return s.parallel(t)
                        }).map(function(e) {
                            return e.reduce(function(e, t) {
                                return e.concat(t)
                            }, [])
                        })
                    },
                    createMakeCleanTransaction: function(e) {
                        var t = e.map(function(e) {
                            return C("UPDATE " + m + " set dirty = 0 where guid = ?", [e.guid])
                        });
                        return s.parallel(t).map(function(e) {})
                    },
                    createDirtyCleanupTransaction: function() {
                        return v().chain(function(e) {
                            var t = E(e.rows).map(function(e) {
                                var t = e.tableName;
                                return C("DELETE FROM " + k(t) + " WHERE guid IN (\n                            SELECT guid FROM " + m + " WHERE tableName = ? AND dirty = 1)", [t])
                            });
                            return s.sequence([s.parallel(t), C("DELETE FROM " + m + " WHERE dirty = 1")]).map(function(e) {})
                        })
                    },
                    createRebuildTransaction: function(e, t) {
                        var n = function(e) {
                                var t = [m].concat(e).map(k).map(function(e) {
                                    return "DROP TABLE IF EXISTS '" + e + "'"
                                }).map(function(e) {
                                    return C(e, [])
                                });
                                return s.sequence([s.parallel(t), g(e)])
                            }(e),
                            r = e.map(function(e) {
                                var n = t.filter(function(t) {
                                    return t.$objectType === e
                                });
                                return function(e, t) {
                                    var n = t.reduce(function(t, n) {
                                        var r = _(),
                                            i = w(e, n);
                                        return t.concat([C(r.insert(), [n.guid, e, 0, JSON.stringify(n.$readonlyAttrs)]), C(i.builder.insert(), i.values)])
                                    }, []);
                                    return s.parallel(n).map(function(e) {})
                                }(e, n)
                            });
                        return s.sequence([n, s.parallel(r)]).map(function(e) {})
                    }
                };

            function g(e) {
                var t = [C((new a).table(m).primaryKeyColumn("guid", "text").column("tableName", "text").column("dirty", "boolean").column("readonlyAttrs", "text").createIfNotExists(), [])].concat(e.map(function(e) {
                    return C(function(e) {
                        var t = window.mx.meta.getEntity(e);
                        return t.getAttributes().map(function(e) {
                            var n = t.getAttributeType(e);
                            return {
                                attr: e,
                                type: h[n]
                            }
                        })
                    }(e).reduce(function(e, t) {
                        return e.column(k(t.attr), t.type)
                    }, (new a).table(k(e)).primaryKeyColumn("guid", "text")).createIfNotExists(), [])
                }));
                return s.parallel(t).map(function(e) {})
            }

            function v() {
                return C((new u).from(m).where(o.equals("dirty")).selectDistinct("tableName"), [1])
            }

            function _() {
                return (new c).into(m).column("guid").column("tableName").column("dirty").column("readonlyAttrs")
            }

            function w(e, t) {
                var n = window.mx.meta.getEntity(e),
                    r = n.getAttributes().reduce(function(e, r) {
                        var i = n.getAttributeType(r),
                            u = p[i];
                        if (!u) return e;
                        var o = u(t[r]);
                        return {
                            attrs: e.attrs.concat([r]),
                            values: e.values.concat([o])
                        }
                    }, {
                        attrs: ["guid"],
                        values: [t.guid]
                    });
                return {
                    builder: r.attrs.reduce(function(e, t) {
                        return e.column(k(t))
                    }, (new c).into(k(e))),
                    values: r.values
                }
            }

            function j(e) {
                if (null == e) return null;
                var t = new f(e),
                    n = 20 - Math.max(0, t.e) - 1;
                return (t.s < 0 ? "-" : "") + new Array(n + 1).join("0") + t.abs().toFixed()
            }

            function x(e) {
                return null != e ? String(e) : null
            }

            function T(e) {
                return e
            }

            function E(e) {
                for (var t = [], n = 0; n < e.length; ++n) t.push(e.item(n));
                return t
            }

            function k(e) {
                return e.replace(".", "$")
            }

            function O(e) {
                return e.replace("$", ".")
            }

            function R(e, t, n, r) {
                var i, u = {
                    guid: r.guid,
                    $objectType: e.getEntity(),
                    $dirty: t,
                    $readonlyAttrs: JSON.parse(n)
                };
                for (var o in r)
                    if (!("guid" === (i = o) || i.indexOf(".") > -1)) {
                        var a = O(o),
                            c = e.getAttributeType(a),
                            s = y[c];
                        s && (u[a] = s(r[o]))
                    } return u
            }

            function D(e, t) {
                return e[m + "." + t]
            }

            function C(e, t) {
                return t = t || [], new s(function(n) {
                    return new l(function(r, i) {
                        n.executeSql(e, t, function(e, t) {
                            return i(t)
                        }, function(e, t) {
                            return r(t)
                        })
                    })
                })
            }
            e.exports = b
        },
        291: function(e, t, n) {
            "use strict";
            n.r(t);
            var r = n(191),
                i = n(18),
                u = n(56),
                o = n(22),
                a = function() {
                    return function(e, t) {
                        if (Array.isArray(e)) return e;
                        if (Symbol.iterator in Object(e)) return function(e, t) {
                            var n = [],
                                r = !0,
                                i = !1,
                                u = void 0;
                            try {
                                for (var o, a = e[Symbol.iterator](); !(r = (o = a.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                            } catch (e) {
                                i = !0, u = e
                            } finally {
                                try {
                                    !r && a.return && a.return()
                                } finally {
                                    if (i) throw u
                                }
                            }
                            return n
                        }(e, t);
                        throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                }(),
                c = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                        }
                    }
                    return function(t, n, r) {
                        return n && e(t.prototype, n), r && e(t, r), t
                    }
                }();
            var s = function() {
                function e(t) {
                    ! function(e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, e), this._config = t, this._storageDirPromise = null
                }
                return c(e, [{
                    key: "readFile",
                    value: function(e) {
                        return this._openFile(e).then(function(e) {
                            return function(e) {
                                return Object(u.callbackToPromise)(e.file.bind(e)).then(p).then(function(e) {
                                    return new Blob([e])
                                })
                            }(e)
                        })
                    }
                }, {
                    key: "storeFile",
                    value: function(e, t) {
                        return this._openFile(t, !0).then(function(t) {
                            return n = t, r = e, Object(u.callbackToPromise)(n.createWriter.bind(n)).then(function(e) {
                                return function(e, t) {
                                    return new Promise(function(n, r) {
                                        t.onwrite = n, t.onerror = r, t.write(e)
                                    })
                                }(r, e)
                            });
                            var n, r
                        })
                    }
                }, {
                    key: "moveFile",
                    value: function(e, t) {
                        var n, r, i, u, o, c;
                        return regeneratorRuntime.async(function(s) {
                            for (;;) switch (s.prev = s.next) {
                                case 0:
                                    return s.next = 2, regeneratorRuntime.awrap(this._openFile(e));
                                case 2:
                                    return n = s.sent, r = l(t), i = a(r, 2), u = i[0], o = i[1], s.next = 6, regeneratorRuntime.awrap(this._openDir(u));
                                case 6:
                                    return c = s.sent, s.next = 9, regeneratorRuntime.awrap(y(n, c, o));
                                case 9:
                                case "end":
                                    return s.stop()
                            }
                        }, null, this)
                    }
                }, {
                    key: "downloadFile",
                    value: function(e, t) {
                        var n = this;
                        return this._config.downloadFileFn ? Object(u.callbackToPromise)(this._config.downloadFileFn, e, t) : Object(o.get)(e, "blob").then(function(e) {
                            return n.storeFile(e, t)
                        })
                    }
                }, {
                    key: "removeDir",
                    value: function(e) {
                        var t;
                        return regeneratorRuntime.async(function(n) {
                            for (;;) switch (n.prev = n.next) {
                                case 0:
                                    return n.prev = 0, n.next = 3, regeneratorRuntime.awrap(this._openDir(e));
                                case 3:
                                    return t = n.sent, n.next = 6, regeneratorRuntime.awrap(h(t));
                                case 6:
                                    n.next = 12;
                                    break;
                                case 8:
                                    if (n.prev = 8, n.t0 = n.catch(0), 1 === n.t0.code) {
                                        n.next = 12;
                                        break
                                    }
                                    throw n.t0;
                                case 12:
                                case "end":
                                    return n.stop()
                            }
                        }, null, this, [
                            [0, 8]
                        ])
                    }
                }, {
                    key: "_openFile",
                    value: function(e) {
                        var t, n, r, i, u, o = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                        return regeneratorRuntime.async(function(c) {
                            for (;;) switch (c.prev = c.next) {
                                case 0:
                                    return t = l(e), n = a(t, 2), r = n[0], i = n[1], c.next = 3, regeneratorRuntime.awrap(this._openDir(r, o));
                                case 3:
                                    return u = c.sent, c.abrupt("return", m(u, i, o));
                                case 5:
                                case "end":
                                    return c.stop()
                            }
                        }, null, this)
                    }
                }, {
                    key: "_openDir",
                    value: function(e) {
                        var t, n, r, i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
                        return regeneratorRuntime.async(function(u) {
                            for (;;) switch (u.prev = u.next) {
                                case 0:
                                    return t = e.split("/").filter(function(e) {
                                        return "" !== e
                                    }), u.next = 3, regeneratorRuntime.awrap(this._getStorageDir());
                                case 3:
                                    n = u.sent, r = 0;
                                case 5:
                                    if (!(r < t.length)) {
                                        u.next = 12;
                                        break
                                    }
                                    return u.next = 8, regeneratorRuntime.awrap(f(n, t[r], i));
                                case 8:
                                    n = u.sent;
                                case 9:
                                    ++r, u.next = 5;
                                    break;
                                case 12:
                                    return u.abrupt("return", n);
                                case 13:
                                case "end":
                                    return u.stop()
                            }
                        }, null, this)
                    }
                }, {
                    key: "_getStorageDir",
                    value: function() {
                        return this._config.getStorageDirFn ? Object(u.callbackToPromise)(this._config.getStorageDirFn) : (null === this._storageDirPromise && (this._storageDirPromise = Object(u.callbackToPromise)(window.webkitRequestFileSystem, window.TEMPORARY, 1048576).then(function(e) {
                            return e.root
                        })), this._storageDirPromise)
                    }
                }]), e
            }();

            function l(e) {
                return e.split(/\/([^/]+)$/)
            }

            function f(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                return Object(u.callbackToPromise)(e.getDirectory.bind(e), t, {
                    create: n
                })
            }

            function m(e, t) {
                var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
                return Object(u.callbackToPromise)(e.getFile.bind(e), t, {
                    create: n
                })
            }

            function h(e) {
                return Object(u.callbackToPromise)(e.removeRecursively.bind(e))
            }

            function p(e) {
                return new Promise(function(t, n) {
                    var r = new FileReader;
                    r.onload = function(e) {
                        return t(e.target.result)
                    }, r.onerror = function(e) {
                        return n(e.target.error)
                    }, r.readAsArrayBuffer(e)
                })
            }

            function y(e, t, n) {
                return new Promise(function(r, i) {
                    e.moveTo(t, n, r, i)
                })
            }
            var d = n(7);

            function b(e) {
                return e.replace(/:/g, "_")
            }
            var g = "GUID:",
                v = new RegExp("^" + g);

            function _(e) {
                return !v.test(e)
            }

            function w(e) {
                return "guid" === e || "$" === e[0]
            }

            function j(e, t) {
                return e.$readonlyAttrs.includes(t)
            }

            function x(e) {
                var t = Object.keys(e).filter(function(e) {
                    return !w(e)
                }).reduce(function(t, n) {
                    return t[n] = {
                        value: e[n]
                    }, j(e, n) && (t[n].readonly = !0), t
                }, {});
                return {
                    guid: e.guid,
                    objectType: e.$objectType,
                    attributes: t
                }
            }

            function T(e) {
                var t = {
                    guid: e.guid,
                    $objectType: e.objectType,
                    $readonlyAttrs: []
                };
                for (var n in e.attributes) t[n] = e.attributes[n].value, e.attributes[n].readonly && t.$readonlyAttrs.push(n);
                return t
            }
            var E = n(51),
                k = n(20),
                O = n(148),
                R = function() {
                    return function(e, t) {
                        if (Array.isArray(e)) return e;
                        if (Symbol.iterator in Object(e)) return function(e, t) {
                            var n = [],
                                r = !0,
                                i = !1,
                                u = void 0;
                            try {
                                for (var o, a = e[Symbol.iterator](); !(r = (o = a.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                            } catch (e) {
                                i = !0, u = e
                            } finally {
                                try {
                                    !r && a.return && a.return()
                                } finally {
                                    if (i) throw u
                                }
                            }
                            return n
                        }(e, t);
                        throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                }(),
                D = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                        }
                    }
                    return function(t, n, r) {
                        return n && e(t.prototype, n), r && e(t, r), t
                    }
                }();

            function C(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                    return n
                }
                return Array.from(e)
            }
            var S = n(7),
                A = {
                    String: null,
                    Integer: "0",
                    Long: "0",
                    Decimal: "0",
                    Float: "0",
                    Currency: "0",
                    Enum: null,
                    HashString: null,
                    ObjectReference: null,
                    DateTime: null,
                    Boolean: !1,
                    AutoNumber: "0",
                    Binary: null
                },
                F = function(e) {
                    function t(e, n, r, i, u) {
                        ! function(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        var o = function(e, t) {
                            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !t || "object" != typeof t && "function" != typeof t ? e : t
                        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        return e = e || {}, o._store = r, o._getDocumentUrl = e.getDocumentUrlFn || P, o._objectCache = n, o._fileBackend = i, o._synchronizer = u, o._dirtyGuids = [], o
                    }
                    return function(e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, O["a"]), D(t, [{
                        key: "initialize",
                        value: function() {
                            var e;
                            return regeneratorRuntime.async(function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, regeneratorRuntime.awrap(this._store.fetchDirty());
                                    case 2:
                                        e = t.sent, this._dirtyGuids = e.map(function(e) {
                                            return e.guid
                                        });
                                    case 4:
                                    case "end":
                                        return t.stop()
                                }
                            }, null, this)
                        }
                    }, {
                        key: "getByGuid",
                        value: function(e, t) {
                            return Promise.all(e.map(this._getByGuid, this)).then(function(e) {
                                return {
                                    mxobjects: e.filter(function(e) {
                                        return null != e
                                    }).map(x)
                                }
                            })
                        }
                    }, {
                        key: "getByPath",
                        value: function(e, t, n, r) {
                            var i, u, o, a, c, s, l, f, m, h, p, y, d, b, g = this;
                            return regeneratorRuntime.async(function(v) {
                                for (;;) switch (v.prev = v.next) {
                                    case 0:
                                        if ("reverse" !== r) {
                                            v.next = 11;
                                            break
                                        }
                                        return i = this._objectCache.getAllObjects().filter(function(n) {
                                            return n.getReferences(t).includes(e)
                                        }).map(function(e) {
                                            return e.jsonData
                                        }), v.next = 4, regeneratorRuntime.awrap(this.getSlice(n, [{
                                            attribute: t,
                                            operator: "equals",
                                            value: e
                                        }]));
                                    case 4:
                                        return u = v.sent, o = u.mxobjects, a = o.map(function(e) {
                                            return k.MxObject.fromJson(e)
                                        }).filter(function(n) {
                                            return n.getReferences(t).includes(e)
                                        }), c = a.filter(function(e) {
                                            return !i.some(function(t) {
                                                return t.guid === e.getGuid()
                                            })
                                        }).map(function(e) {
                                            return e.jsonData
                                        }), v.abrupt("return", {
                                            mxobjects: i.concat(c)
                                        });
                                    case 11:
                                        if (s = this._objectCache.getObject(e)) {
                                            v.next = 19;
                                            break
                                        }
                                        return v.next = 15, regeneratorRuntime.awrap(this.getByGuid([e]));
                                    case 15:
                                        l = v.sent, f = R(l.mxobjects, 1), (m = f[0]) && (s = k.MxObject.fromJson(m));
                                    case 19:
                                        if (s) {
                                            v.next = 21;
                                            break
                                        }
                                        return v.abrupt("return", {
                                            mxobjects: []
                                        });
                                    case 21:
                                        return h = s.getReferences(t), p = h.map(function(e) {
                                            return g._objectCache.getObject(e)
                                        }).filter(function(e) {
                                            return null !== e
                                        }).map(function(e) {
                                            return e.jsonData
                                        }), y = h.filter(function(e) {
                                            return !g._objectCache.has(e)
                                        }), v.next = 26, regeneratorRuntime.awrap(this.getByGuid(y));
                                    case 26:
                                        return d = v.sent, b = d.mxobjects, v.abrupt("return", {
                                            mxobjects: b.concat(p)
                                        });
                                    case 29:
                                    case "end":
                                        return v.stop()
                                }
                            }, null, this)
                        }
                    }, {
                        key: "getSlice",
                        value: function(e, t, n) {
                            var r = this,
                                i = window.mx.meta.getEntity(e),
                                u = (t || []).map(function(e) {
                                    return e.attribute && i.isReference(e.attribute) && (e.value = r._synchronizer.getInternalGuid(e.value)), e
                                });
                            return this._store.getSlice(e, u, n).then(function(e) {
                                var t = R(e, 2),
                                    n = t[0],
                                    i = t[1];
                                return {
                                    mxobjects: n.map(r._synchronizer.makeObjectExternal, r._synchronizer).map(x),
                                    count: i
                                }
                            })
                        }
                    }, {
                        key: "create",
                        value: function(e) {
                            var t = g + d.getUniqueId();
                            return this._objectCache.onCreate([t]), this._objectCache.setMxObjects([function(e, t) {
                                var n = {
                                        guid: e,
                                        objectType: t,
                                        attributes: {}
                                    },
                                    r = window.mx.meta.getEntity(t);
                                return r.getAttributes().forEach(function(e) {
                                    n.attributes[e] = {
                                        value: A[r.getAttributeType(e)]
                                    }
                                }), n
                            }(t, e)]), Promise.resolve({
                                actionResult: t
                            })
                        }
                    }, {
                        key: "commit",
                        value: function(e, t) {
                            var n, r, i, u, o, a, c, s, l, f, m, h = this;
                            return regeneratorRuntime.async(function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return m = function(e) {
                                            var t = {};
                                            return Object.keys(e).forEach(function(n) {
                                                t[n] = Object.keys(e[n])
                                            }), t
                                        }, f = function(e) {
                                            return Object.assign({}, e, S.mapObject(r[e.guid], function(e) {
                                                return e.value
                                            }))
                                        }, r = S.objectFromArray(e.map(function(e) {
                                            return [e, S.clone(h._objectCache.getChanges(e))]
                                        })), i = S.partition(function(e) {
                                            return h._objectCache.has(e)
                                        }, e), u = R(i, 2), o = u[0], a = u[1], c = o.map(function(e) {
                                            return h._objectCache.getObject(e)
                                        }).map(N), t.next = 7, regeneratorRuntime.awrap(Promise.all(a.map(this._getByGuid, this)));
                                    case 7:
                                        return s = t.sent, l = s.concat(c).map(f), t.next = 11, regeneratorRuntime.awrap(this._store.insertOrReplace(l.map(this._synchronizer.makeObjectInternal, this._synchronizer)));
                                    case 11:
                                        return (n = this._dirtyGuids).push.apply(n, C(e)), this._objectCache.onCommit(e), this._objectCache.setMxObjects(l.map(function(e) {
                                            return x(Object.assign(e, {
                                                $dirty: !0
                                            }))
                                        })), this._objectCache.removeChanges(m(r)), t.abrupt("return", {});
                                    case 16:
                                    case "end":
                                        return t.stop()
                                }
                            }, null, this)
                        }
                    }, {
                        key: "rollback",
                        value: function(e) {
                            var t = this;
                            this._objectCache.removeAllChanges(e);
                            var n = e.filter(function(e) {
                                return t._objectCache.isNew(e)
                            });
                            return this._objectCache.removeObjects(n), Promise.resolve({})
                        }
                    }, {
                        key: "validate",
                        value: function(e) {
                            return Promise.resolve({})
                        }
                    }, {
                        key: "saveDocument",
                        value: function(e, t, n, r) {
                            var i = this;
                            if (r.size / 1048576 > n.maxFileSize) return Promise.reject(new E.DescribedError("File too large"));
                            var u = b(this._synchronizer.getInternalGuid(e));
                            return this._fileBackend.storeFile(r, "files/documents/" + u).then(function() {
                                return i._objectCache.makeChange(e, "HasContents", !0), i.commit([e], null)
                            })
                        }
                    }, {
                        key: "getDocumentUrl",
                        value: function(e, t, n) {
                            return this._getDocumentUrl(b(this._synchronizer.getInternalGuid(e)), t, n)
                        }
                    }, {
                        key: "getImageUrl",
                        value: function(e) {
                            return Promise.resolve(e)
                        }
                    }, {
                        key: "upload",
                        value: function() {
                            return this._synchronizer.upload()
                        }
                    }, {
                        key: "downloadObjects",
                        value: function(e) {
                            return regeneratorRuntime.async(function(t) {
                                for (;;) switch (t.prev = t.next) {
                                    case 0:
                                        return t.next = 2, regeneratorRuntime.awrap(this._synchronizer.downloadObjects(e));
                                    case 2:
                                        this._dirtyGuids = [];
                                    case 3:
                                    case "end":
                                        return t.stop()
                                }
                            }, null, this)
                        }
                    }, {
                        key: "downloadFiles",
                        value: function(e) {
                            return this._synchronizer.downloadFiles(e)
                        }
                    }, {
                        key: "cleanupDirtyObjects",
                        value: function() {
                            return this._store.cleanupDirtyObjects()
                        }
                    }, {
                        key: "isDirty",
                        value: function(e) {
                            return this._dirtyGuids.includes(e)
                        }
                    }, {
                        key: "cleanup",
                        value: function() {
                            return regeneratorRuntime.async(function(e) {
                                for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return e.next = 2, regeneratorRuntime.awrap(this._store.cleanDatabase());
                                    case 2:
                                        return e.next = 4, regeneratorRuntime.awrap(this._fileBackend.removeDir("files/documents/"));
                                    case 4:
                                        return e.next = 6, regeneratorRuntime.awrap(this._fileBackend.removeDir("files/thumbnails/"));
                                    case 6:
                                        this._dirtyGuids = [];
                                    case 7:
                                    case "end":
                                        return e.stop()
                                }
                            }, null, this)
                        }
                    }, {
                        key: "_getByGuid",
                        value: function(e) {
                            var t = this;
                            return this._store.getByGuid(this._synchronizer.getInternalGuid(e)).then(function(e) {
                                return t._synchronizer.makeObjectExternal(e)
                            })
                        }
                    }]), t
                }();

            function N(e) {
                return T(e.jsonData)
            }

            function P(e, t, n) {
                var r = n ? "thumbnails" : "documents";
                return "filesystem:" + window.mx.appUrl + "temporary/files/" + r + "/" + e + "?" + +new Date
            }
            var B = n(78),
                I = n(45),
                q = n(34),
                G = function() {
                    return function(e, t) {
                        if (Array.isArray(e)) return e;
                        if (Symbol.iterator in Object(e)) return function(e, t) {
                            var n = [],
                                r = !0,
                                i = !1,
                                u = void 0;
                            try {
                                for (var o, a = e[Symbol.iterator](); !(r = (o = a.next()).done) && (n.push(o.value), !t || n.length !== t); r = !0);
                            } catch (e) {
                                i = !0, u = e
                            } finally {
                                try {
                                    !r && a.return && a.return()
                                } finally {
                                    if (i) throw u
                                }
                            }
                            return n
                        }(e, t);
                        throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                }(),
                L = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var r = t[n];
                            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
                        }
                    }
                    return function(t, n, r) {
                        return n && e(t.prototype, n), r && e(t, r), t
                    }
                }();
            var $ = n(7),
                z = function() {
                    function e(t, n, r, i) {
                        ! function(e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), this._store = t, this._runtimeApi = n, this._fileBackend = r, this._objectCache = i, this._internalToExternal = {}
                    }
                    return L(e, [{
                        key: "upload",
                        value: function() {
                            var e, t, n, r, i, u, o, a, c, s, l, f, m, h, p, y, d, g = this;
                            return regeneratorRuntime.async(function(v) {
                                for (;;) switch (v.prev = v.next) {
                                    case 0:
                                        return d = function(n, r) {
                                            var i, u, o;
                                            return regeneratorRuntime.async(function(a) {
                                                for (;;) switch (a.prev = a.next) {
                                                    case 0:
                                                        if (i = "files/documents/" + b(n.guid), u = "files/documents/" + b(r), i === u) {
                                                            a.next = 5;
                                                            break
                                                        }
                                                        return a.next = 5, regeneratorRuntime.awrap(t.moveFile(i, u));
                                                    case 5:
                                                        return a.next = 7, regeneratorRuntime.awrap(t.readFile(u));
                                                    case 7:
                                                        return o = a.sent, a.next = 10, regeneratorRuntime.awrap(e.upload(r, n.Name, {}, o, {}, []));
                                                    case 10:
                                                    case "end":
                                                        return a.stop()
                                                }
                                            }, null, this)
                                        }, y = function(e, t) {
                                            var n = window.mx.meta.getEntity(e.$objectType),
                                                r = Object.keys(e).filter(function(t) {
                                                    return !w(t) && n.isSyncable(t) && !j(e, t)
                                                }).map(function(r) {
                                                    var i = e[r];
                                                    return [r, {
                                                        value: n.isObjectReference(r) && null != i && !_(i) ? t[i] : i
                                                    }]
                                                });
                                            return [_(e.guid) ? e.guid : t[e.guid], $.objectFromArray(r)]
                                        }, p = function(t) {
                                            return e.instantiate(t.$objectType).then(function(e) {
                                                var n = e.objects.find(function(t) {
                                                    return t.guid === e.actionResult
                                                });
                                                return {
                                                    internalObj: t,
                                                    remoteJson: n
                                                }
                                            })
                                        }, h = function(e) {
                                            var t = window.mx.meta.getEntity(e.$objectType);
                                            return $.arrayFromObject(e).filter(function(e) {
                                                var n = G(e, 2),
                                                    r = n[0];
                                                n[1];
                                                return "guid" === r || !w(r) && t.isReference(r)
                                            })
                                        }, m = function(e) {
                                            var t = e.map(function(e) {
                                                    return e.guid
                                                }),
                                                n = $.unique(e.map(function(e) {
                                                    return h(e).map(function(e) {
                                                        var t = G(e, 2);
                                                        t[0];
                                                        return t[1]
                                                    })
                                                }).reduce(function(e, t) {
                                                    return e.concat(t)
                                                }, [])).filter(function(e) {
                                                    return !_(e)
                                                }).filter(function(e) {
                                                    return !t.includes(e)
                                                });
                                            if (n.length > 0) {
                                                var r = "Sync has failed due to a modeling error. Your database contains objects that reference uncommitted objects:\n" + $.unique(e.map(function(e) {
                                                    return h(e).filter(function(e) {
                                                        var t = G(e, 2),
                                                            r = (t[0], t[1]);
                                                        return n.includes(r)
                                                    }).map(function(t) {
                                                        var n = G(t, 2),
                                                            r = n[0];
                                                        n[1];
                                                        return "object of type " + e.$objectType + " (reference " + r + ")"
                                                    })
                                                }).reduce(function(e, t) {
                                                    return e.concat(t)
                                                }, [])).join(", ") + ".";
                                                throw new B.a(r)
                                            }
                                        }, e = this._runtimeApi, t = this._fileBackend, v.next = 9, regeneratorRuntime.awrap(this._store.fetchDirty());
                                    case 9:
                                        return n = v.sent, m(n), r = $.partition(function(e) {
                                            return _(e.guid)
                                        }, n), i = G(r, 2), u = i[0], o = i[1], v.next = 14, regeneratorRuntime.awrap(Promise.all(o.map(p)));
                                    case 14:
                                        return a = v.sent, c = $.objectFromArray(a.map(function(e) {
                                            var t = e.internalObj,
                                                n = e.remoteJson;
                                            return [t.guid, n.guid]
                                        })), s = a.map(function(e) {
                                            return e.remoteJson
                                        }), l = u.map(function(e) {
                                            return e.guid
                                        }).concat(a.map(function(e) {
                                            return e.remoteJson.guid
                                        })), f = $.objectFromArray(n.map(function(e) {
                                            return y(e, c)
                                        })), v.next = 21, regeneratorRuntime.awrap(e.commit(l, new I.MxContext, f, s));
                                    case 21:
                                        return v.next = 23, regeneratorRuntime.awrap(this._store.makeClean(n));
                                    case 23:
                                        return v.next = 25, regeneratorRuntime.awrap(Promise.all(n.filter(function(e) {
                                            return window.mx.meta.getEntity(e.$objectType).isA("System.FileDocument")
                                        }).filter(function(e) {
                                            return e.HasContents
                                        }).map(function(e) {
                                            return d(e, _(e.guid) ? e.guid : c[e.guid])
                                        })));
                                    case 25:
                                        return $.arrayFromObject(c).forEach(function(e) {
                                            var t = G(e, 2),
                                                n = t[0],
                                                r = t[1];
                                            return g._mapInternalGuid(n, r)
                                        }), v.abrupt("return", {});
                                    case 27:
                                    case "end":
                                        return v.stop()
                                }
                            }, null, this)
                        }
                    }, {
                        key: "downloadObjects",
                        value: function(e) {
                            var t, n, r, i, u = this;
                            return regeneratorRuntime.async(function(o) {
                                for (;;) switch (o.prev = o.next) {
                                    case 0:
                                        return i = function(e, n) {
                                            return t.retrieveByXPath(n).then(function(t) {
                                                return t.mxobjects.map(T).map(function(t) {
                                                    return Object.assign({}, t, {
                                                        $objectType: e
                                                    })
                                                })
                                            })
                                        }, t = this._runtimeApi, o.t0 = $, o.next = 5, regeneratorRuntime.awrap(Promise.all(e.map(function(e) {
                                            return i(e.store, e.xpath)
                                        })));
                                    case 5:
                                        return o.t1 = o.sent, n = o.t0.flatten.call(o.t0, o.t1), o.next = 9, regeneratorRuntime.awrap(this._store.rebuildDatabase(n));
                                    case 9:
                                        return r = n.map(this.makeObjectExternal, this).filter(function(e) {
                                            return u._objectCache.has(e.guid)
                                        }), this._objectCache.setMxObjects(r.map(x)), o.abrupt("return", {});
                                    case 12:
                                    case "end":
                                        return o.stop()
                                }
                            }, null, this)
                        }
                    }, {
                        key: "downloadFiles",
                        value: function(e) {
                            var t, n, r, i, u, o, a;
                            return regeneratorRuntime.async(function(c) {
                                for (;;) switch (c.prev = c.next) {
                                    case 0:
                                        return a = function(e, t) {
                                            var r = Object(q.getRemoteDynamicResourceUrl)(e.guid, e.changedDate, t),
                                                i = (t ? "files/thumbnails/" : "files/documents/") + b(e.guid);
                                            return n.downloadFile(r, i)
                                        }, o = function(e) {
                                            return t.getSlice(e, [{
                                                attribute: "HasContents",
                                                operator: "equals",
                                                value: "true"
                                            }]).then(function(e) {
                                                var t = G(e, 2),
                                                    n = t[0];
                                                t[1];
                                                return n
                                            })
                                        }, t = this._store, n = this._fileBackend, c.t0 = $, c.next = 7, regeneratorRuntime.awrap(Promise.all(e.map(function(e) {
                                            return o(e)
                                        })));
                                    case 7:
                                        return c.t1 = c.sent, r = c.t0.flatten.call(c.t0, c.t1), i = r.map(function(e) {
                                            return a(e, !1)
                                        }), u = r.filter(function(e) {
                                            return window.mx.meta.getEntity(e.$objectType).isA("System.Image")
                                        }).map(function(e) {
                                            return a(e, !0)
                                        }), c.next = 13, regeneratorRuntime.awrap(Promise.all(i.concat(u)));
                                    case 13:
                                        return c.abrupt("return", {});
                                    case 14:
                                    case "end":
                                        return c.stop()
                                }
                            }, null, this)
                        }
                    }, {
                        key: "getExternalGuid",
                        value: function(e) {
                            return this._internalToExternal[e] || e
                        }
                    }, {
                        key: "getInternalGuid",
                        value: function(e) {
                            for (var t in this._internalToExternal)
                                if (this._internalToExternal[t] === e) return t;
                            return e
                        }
                    }, {
                        key: "makeObjectExternal",
                        value: function(e) {
                            return M(e, this.getExternalGuid.bind(this))
                        }
                    }, {
                        key: "makeObjectInternal",
                        value: function(e) {
                            return M(e, this.getInternalGuid.bind(this))
                        }
                    }, {
                        key: "_mapInternalGuid",
                        value: function(e, t) {
                            this._internalToExternal[t] = e
                        }
                    }]), e
                }();

            function M(e, t) {
                if (null === e) return null;
                var n = window.mx.meta.getEntity(e.$objectType);
                return $.mapObject(e, function(e, r) {
                    return ("guid" === r || !w(r) && n.isReference(r)) && null != e ? t(e) : e
                })
            }

            function U(e, t) {
                var n, u, o, a, c = t.createStoreFn,
                    l = t.getStorageDirFn,
                    f = t.downloadFileFn,
                    m = t.getDocumentUrlFn;
                return regeneratorRuntime.async(function(t) {
                    for (;;) switch (t.prev = t.next) {
                        case 0:
                            return n = new r(window.mx.session.getConfig("sync_config.schema"), c), u = new s({
                                downloadFileFn: f,
                                getStorageDirFn: l
                            }), o = new z(n, i, u, e), a = new F({
                                getDocumentUrlFn: m
                            }, e, n, u, o), t.next = 6, regeneratorRuntime.awrap(a.initialize());
                        case 6:
                            return t.abrupt("return", a);
                        case 7:
                        case "end":
                            return t.stop()
                    }
                }, null, this)
            }
            n.d(t, "buildOfflineDataBackend", function() {
                return U
            })
        }
    }
]);