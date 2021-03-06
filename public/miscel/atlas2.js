!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? t(exports)
    : "function" == typeof define && define.amd
    ? define(["exports"], t)
    : t((((e = e || self).atlas = e.atlas || {}), (e.atlas.service = {})));
})(this, function (d) {
  "use strict";
  function r(e) {
    return e.toLowerCase();
  }
  var y =
    ((e.prototype.set = function (e, t) {
      this._headersMap[r(e)] = { name: e, value: t.toString() };
    }),
    (e.prototype.get = function (e) {
      var t = this._headersMap[r(e)];
      return t ? t.value : void 0;
    }),
    (e.prototype.contains = function (e) {
      return !!this._headersMap[r(e)];
    }),
    (e.prototype.remove = function (e) {
      var t = this.contains(e);
      return delete this._headersMap[r(e)], t;
    }),
    (e.prototype.rawHeaders = function () {
      var e = {};
      for (var t in this._headersMap) {
        var r = this._headersMap[t];
        e[r.name.toLowerCase()] = r.value;
      }
      return e;
    }),
    (e.prototype.headersArray = function () {
      var e = [];
      for (var t in this._headersMap) e.push(this._headersMap[t]);
      return e;
    }),
    (e.prototype.headerNames = function () {
      for (var e = [], t = this.headersArray(), r = 0; r < t.length; ++r)
        e.push(t[r].name);
      return e;
    }),
    (e.prototype.headerValues = function () {
      for (var e = [], t = this.headersArray(), r = 0; r < t.length; ++r)
        e.push(t[r].value);
      return e;
    }),
    (e.prototype.toJson = function () {
      return this.rawHeaders();
    }),
    (e.prototype.toString = function () {
      return JSON.stringify(this.toJson());
    }),
    (e.prototype.clone = function () {
      return new e(this.rawHeaders());
    }),
    e);
  function e(e) {
    if (((this._headersMap = {}), e)) for (var t in e) this.set(t, e[t]);
  }
  function o(e) {
    for (var t = "", r = 0; r < e.length; r++) t += String.fromCharCode(e[r]);
    return btoa(t);
  }
  function n(e) {
    for (
      var t = atob(e), r = new Uint8Array(t.length), a = 0;
      a < t.length;
      a++
    )
      r[a] = t.charCodeAt(a);
    return r;
  }
  for (
    var t,
      s =
        ((function (e) {
          var t =
            ("undefined" != typeof crypto &&
              crypto.getRandomValues &&
              crypto.getRandomValues.bind(crypto)) ||
            ("undefined" != typeof msCrypto &&
              "function" == typeof window.msCrypto.getRandomValues &&
              msCrypto.getRandomValues.bind(msCrypto));
          if (t) {
            var r = new Uint8Array(16);
            e.exports = function () {
              return t(r), r;
            };
          } else {
            var a = new Array(16);
            e.exports = function () {
              for (var e, t = 0; t < 16; t++)
                0 == (3 & t) && (e = 4294967296 * Math.random()),
                  (a[t] = (e >>> ((3 & t) << 3)) & 255);
              return a;
            };
          }
        })((t = { exports: {} }), t.exports),
        t.exports),
      i = [],
      a = 0;
    a < 256;
    ++a
  )
    i[a] = (a + 256).toString(16).substr(1);
  var l = function (e, t) {
    var r = t || 0,
      a = i;
    return [
      a[e[r++]],
      a[e[r++]],
      a[e[r++]],
      a[e[r++]],
      "-",
      a[e[r++]],
      a[e[r++]],
      "-",
      a[e[r++]],
      a[e[r++]],
      "-",
      a[e[r++]],
      a[e[r++]],
      "-",
      a[e[r++]],
      a[e[r++]],
      a[e[r++]],
      a[e[r++]],
      a[e[r++]],
      a[e[r++]],
    ].join("");
  };
  var m = function (e, t, r) {
      var a = (t && r) || 0;
      "string" == typeof e &&
        ((t = "binary" === e ? new Array(16) : null), (e = null));
      var i = (e = e || {}).random || (e.rng || s)();
      if (((i[6] = (15 & i[6]) | 64), (i[8] = (63 & i[8]) | 128), t))
        for (var n = 0; n < 16; ++n) t[a + n] = i[n];
      return t || l(i);
    },
    p = {
      msRestVersion: "1.8.13",
      HTTP: "http:",
      HTTPS: "https:",
      HTTP_PROXY: "HTTP_PROXY",
      HTTPS_PROXY: "HTTPS_PROXY",
      HttpConstants: {
        HttpVerbs: {
          PUT: "PUT",
          GET: "GET",
          DELETE: "DELETE",
          POST: "POST",
          MERGE: "MERGE",
          HEAD: "HEAD",
          PATCH: "PATCH",
        },
        StatusCodes: { TooManyRequests: 429 },
      },
      HeaderConstants: {
        AUTHORIZATION: "authorization",
        AUTHORIZATION_SCHEME: "Bearer",
        RETRY_AFTER: "Retry-After",
        USER_AGENT: "User-Agent",
      },
    };
  "undefined" != typeof process &&
    process.version &&
    process.versions &&
    process.versions.node;
  function h(e) {
    var t = {};
    return (
      (t.body = e.bodyAsText), (t.headers = e.headers), (t.status = e.status), t
    );
  }
  function f(e) {
    var t = e.clone();
    return t.headers && t.headers.remove("authorization"), t;
  }
  function N() {
    return m();
  }
  function u(t, r) {
    return new Promise(function (e) {
      return setTimeout(function () {
        return e(r);
      }, t);
    });
  }
  var c =
    /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
  function g(e, t, r) {
    return e && t ? e.split(t).join(r || "") : e;
  }
  var S =
    ((R.prototype.validateConstraints = function (e, r, a) {
      function t(e, t) {
        throw new Error(
          '"' +
            a +
            '" with value "' +
            r +
            '" should satisfy the constraint "' +
            e +
            '": ' +
            t +
            "."
        );
      }
      if (e.constraints && null != r) {
        var i = e.constraints,
          n = i.ExclusiveMaximum,
          s = i.ExclusiveMinimum,
          o = i.InclusiveMaximum,
          l = i.InclusiveMinimum,
          m = i.MaxItems,
          p = i.MaxLength,
          u = i.MinItems,
          d = i.MinLength,
          y = i.MultipleOf,
          c = i.Pattern,
          h = i.UniqueItems;
        null != n && n <= r && t("ExclusiveMaximum", n),
          null != s && r <= s && t("ExclusiveMinimum", s),
          null != o && o < r && t("InclusiveMaximum", o),
          null != l && r < l && t("InclusiveMinimum", l),
          null != m && r.length > m && t("MaxItems", m),
          null != p && r.length > p && t("MaxLength", p),
          null != u && r.length < u && t("MinItems", u),
          null != d && r.length < d && t("MinLength", d),
          null != y && r % y != 0 && t("MultipleOf", y),
          c && null === r.match(c) && t("Pattern", c),
          h &&
            r.some(function (e, t, r) {
              return r.indexOf(e) !== t;
            }) &&
            t("UniqueItems", h);
      }
    }),
    (R.prototype.serialize = function (e, t, r) {
      var a = {},
        i = e.type.name;
      (r = r || e.serializedName),
        null !== i.match(/^Sequence$/gi) && (a = []),
        null != t ||
          (null == e.defaultValue && !e.isConstant) ||
          (t = e.defaultValue);
      var n = e.required,
        s = e.nullable;
      if (n && s && void 0 === t) throw new Error(r + " cannot be undefined.");
      if (n && !s && null == t)
        throw new Error(r + " cannot be null or undefined.");
      if (!n && !1 === s && null === t) throw new Error(r + " cannot be null.");
      return (
        null == t
          ? (a = t)
          : (this.validateConstraints(e, t, r),
            null !== i.match(/^any$/gi)
              ? (a = t)
              : null !==
                i.match(/^(Number|String|Boolean|Object|Stream|Uuid)$/gi)
              ? (a = (function (e, t, r) {
                  if (null != r)
                    if (null !== e.match(/^Number$/gi)) {
                      if ("number" != typeof r)
                        throw new Error(
                          t + " with value " + r + " must be of type number."
                        );
                    } else if (null !== e.match(/^String$/gi)) {
                      if ("string" != typeof r.valueOf())
                        throw new Error(
                          t + ' with value "' + r + '" must be of type string.'
                        );
                    } else if (null !== e.match(/^Uuid$/gi)) {
                      if (
                        "string" != typeof r.valueOf() ||
                        !(function (e) {
                          return new RegExp(
                            "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$",
                            "ig"
                          ).test(e);
                        })(r)
                      )
                        throw new Error(
                          t +
                            ' with value "' +
                            r +
                            '" must be of type string and a valid uuid.'
                        );
                    } else if (null !== e.match(/^Boolean$/gi)) {
                      if ("boolean" != typeof r)
                        throw new Error(
                          t + " with value " + r + " must be of type boolean."
                        );
                    } else if (null !== e.match(/^Stream$/gi)) {
                      var a = typeof r;
                      if (
                        !(
                          "string" == a ||
                          "function" == a ||
                          r instanceof ArrayBuffer ||
                          ArrayBuffer.isView(r) ||
                          ("function" == typeof Blob && r instanceof Blob)
                        )
                      )
                        throw new Error(
                          t +
                            " must be a string, Blob, ArrayBuffer, ArrayBufferView, or a function returning NodeJS.ReadableStream."
                        );
                    }
                  return r;
                })(i, r, t))
              : null !== i.match(/^Enum$/gi)
              ? (a = (function (e, t, r) {
                  if (!t)
                    throw new Error(
                      "Please provide a set of allowedValues to validate " +
                        e +
                        " as an Enum Type."
                    );
                  if (
                    t.some(function (e) {
                      return "string" == typeof e.valueOf()
                        ? e.toLowerCase() === r.toLowerCase()
                        : e === r;
                    })
                  )
                    return r;
                  throw new Error(
                    r +
                      " is not a valid value for " +
                      e +
                      ". The valid values are: " +
                      JSON.stringify(t) +
                      "."
                  );
                })(r, e.type.allowedValues, t))
              : null !==
                i.match(/^(Date|DateTime|TimeSpan|DateTimeRfc1123|UnixTime)$/gi)
              ? (a = (function (e, t, r) {
                  if (null != t)
                    if (null !== e.match(/^Date$/gi)) {
                      if (
                        !(
                          t instanceof Date ||
                          ("string" == typeof t.valueOf() &&
                            !isNaN(Date.parse(t)))
                        )
                      )
                        throw new Error(
                          r +
                            " must be an instanceof Date or a string in ISO8601 format."
                        );
                      t =
                        t instanceof Date
                          ? t.toISOString().substring(0, 10)
                          : new Date(t).toISOString().substring(0, 10);
                    } else if (null !== e.match(/^DateTime$/gi)) {
                      if (
                        !(
                          t instanceof Date ||
                          ("string" == typeof t.valueOf() &&
                            !isNaN(Date.parse(t)))
                        )
                      )
                        throw new Error(
                          r +
                            " must be an instanceof Date or a string in ISO8601 format."
                        );
                      t =
                        t instanceof Date
                          ? t.toISOString()
                          : new Date(t).toISOString();
                    } else if (null !== e.match(/^DateTimeRfc1123$/gi)) {
                      if (
                        !(
                          t instanceof Date ||
                          ("string" == typeof t.valueOf() &&
                            !isNaN(Date.parse(t)))
                        )
                      )
                        throw new Error(
                          r +
                            " must be an instanceof Date or a string in RFC-1123 format."
                        );
                      t =
                        t instanceof Date
                          ? t.toUTCString()
                          : new Date(t).toUTCString();
                    } else if (null !== e.match(/^UnixTime$/gi)) {
                      if (
                        !(
                          t instanceof Date ||
                          ("string" == typeof t.valueOf() &&
                            !isNaN(Date.parse(t)))
                        )
                      )
                        throw new Error(
                          r +
                            " must be an instanceof Date or a string in RFC-1123/ISO8601 format for it to be serialized in UnixTime/Epoch format."
                        );
                      t = (function (e) {
                        if (e)
                          return (
                            "string" == typeof e.valueOf() && (e = new Date(e)),
                            Math.floor(e.getTime() / 1e3)
                          );
                      })(t);
                    } else if (null !== e.match(/^TimeSpan$/gi)) {
                      if (
                        !(function (e) {
                          return c.test(e);
                        })(t)
                      )
                        throw new Error(
                          r +
                            ' must be a string in ISO 8601 format. Instead was "' +
                            t +
                            '".'
                        );
                      t = t;
                    }
                  return t;
                })(i, t, r))
              : null !== i.match(/^ByteArray$/gi)
              ? (a = (function (e, t) {
                  if (null != t) {
                    if (!(t instanceof Uint8Array))
                      throw new Error(e + " must be of type Uint8Array.");
                    t = o(t);
                  }
                  return t;
                })(r, t))
              : null !== i.match(/^Base64Url$/gi)
              ? (a = (function (e, t) {
                  if (null != t) {
                    if (!(t instanceof Uint8Array))
                      throw new Error(e + " must be of type Uint8Array.");
                    t = (function (e) {
                      if (e) {
                        if (e instanceof Uint8Array)
                          return (function (e, t) {
                            for (
                              var r = e.length;
                              0 <= r - 1 && e[r - 1] === t;

                            )
                              --r;
                            return e.substr(0, r);
                          })(o(e), "=")
                            .replace(/\+/g, "-")
                            .replace(/\//g, "_");
                        throw new Error(
                          "Please provide an input of type Uint8Array for converting to Base64Url."
                        );
                      }
                    })(t);
                  }
                  return t;
                })(r, t))
              : null !== i.match(/^Sequence$/gi)
              ? (a = (function (e, t, r, a) {
                  if (!Array.isArray(r))
                    throw new Error(a + " must be of type Array.");
                  var i = t.type.element;
                  if (!i || "object" != typeof i)
                    throw new Error(
                      'element" metadata for an Array must be defined in the mapper and it must of type "object" in ' +
                        a +
                        "."
                    );
                  for (var n = [], s = 0; s < r.length; s++)
                    n[s] = e.serialize(i, r[s], a);
                  return n;
                })(this, e, t, r))
              : null !== i.match(/^Dictionary$/gi)
              ? (a = (function (e, t, r, a) {
                  if ("object" != typeof r)
                    throw new Error(a + " must be of type object.");
                  var i = t.type.value;
                  if (!i || "object" != typeof i)
                    throw new Error(
                      '"value" metadata for a Dictionary must be defined in the mapper and it must of type "object" in ' +
                        a +
                        "."
                    );
                  for (
                    var n = {}, s = 0, o = Object.keys(r);
                    s < o.length;
                    s++
                  ) {
                    var l = o[s];
                    n[l] = e.serialize(i, r[l], a + "." + l);
                  }
                  return n;
                })(this, e, t, r))
              : null !== i.match(/^Composite$/gi) &&
                (a = (function (e, t, r, a) {
                  var i;
                  if ((D(e, t) && (t = L(e, t, r, "clientName")), null == r))
                    return r;
                  for (
                    var n = {}, s = x(e, t, a), o = 0, l = Object.keys(s);
                    o < l.length;
                    o++
                  ) {
                    var m = l[o],
                      p = s[m];
                    if (!p.readOnly) {
                      var u = void 0,
                        d = n;
                      if (e.isXML)
                        u = p.xmlIsWrapped
                          ? p.xmlName
                          : p.xmlElementName || p.xmlName;
                      else {
                        var y = _(p.serializedName);
                        u = y.pop();
                        for (var c = 0, h = y; c < h.length; c++) {
                          var f = h[c];
                          null == d[f] && null != r[m] && (d[f] = {}),
                            (d = d[f]);
                        }
                      }
                      if (null != d) {
                        var N =
                            "" !== p.serializedName
                              ? a + "." + p.serializedName
                              : a,
                          g = r[m],
                          S = D(e, t);
                        S &&
                          S.clientName === m &&
                          null == g &&
                          (g = t.serializedName);
                        var R = e.serialize(p, g, N);
                        void 0 !== R &&
                          null != u &&
                          (p.xmlIsAttribute
                            ? ((d.$ = d.$ || {}), (d.$[u] = R))
                            : p.xmlIsWrapped
                            ? (d[u] = (((i = {})[p.xmlElementName] = R), i))
                            : (d[u] = R));
                      }
                    }
                  }
                  var v = t.type.additionalProperties;
                  if (v) {
                    var P = Object.keys(s),
                      z = function (t) {
                        P.every(function (e) {
                          return e !== t;
                        }) &&
                          (n[t] = e.serialize(v, r[t], a + '["' + t + '"]'));
                      };
                    for (var b in r) z(b);
                  }
                  return n;
                })(this, e, t, r))),
        a
      );
    }),
    (R.prototype.deserialize = function (e, t, r) {
      if (null == t)
        return (
          this.isXML &&
            "Sequence" === e.type.name &&
            !e.xmlIsWrapped &&
            (t = []),
          t
        );
      var a,
        i = e.type.name;
      return (
        (r = r || e.serializedName),
        null !== i.match(/^Composite$/gi)
          ? (a = (function (e, t, r, a) {
              D(e, t) && (t = L(e, t, r, "serializedName"));
              for (
                var i = x(e, t, a), n = {}, s = [], o = 0, l = Object.keys(i);
                o < l.length;
                o++
              ) {
                var m = l[o],
                  p = i[m],
                  u = _(i[m].serializedName);
                s.push(u[0]);
                var d = p.serializedName,
                  y = p.xmlName,
                  c = p.xmlElementName,
                  h = a;
                "" !== d && void 0 !== d && (h = a + "." + d);
                var f = p.headerCollectionPrefix;
                if (f) {
                  for (
                    var N = {}, g = 0, S = Object.keys(r);
                    g < S.length;
                    g++
                  ) {
                    var R = S[g];
                    R.startsWith(f) &&
                      (N[R.substring(f.length)] = e.deserialize(
                        p.type.value,
                        r[R],
                        h
                      )),
                      s.push(R);
                  }
                  n[m] = N;
                } else if (e.isXML)
                  if (p.xmlIsAttribute && r.$)
                    n[m] = e.deserialize(p, r.$[y], h);
                  else {
                    var v = r[c || y || d];
                    p.xmlIsWrapped &&
                      void 0 === (v = (v = r[y]) && v[c]) &&
                      (v = []),
                      (n[m] = e.deserialize(p, v, h));
                  }
                else {
                  for (var P = void 0, z = r, b = 0, T = u; b < T.length; b++) {
                    var C = T[b];
                    if (!z) break;
                    z = z[C];
                  }
                  P = z;
                  var O = t.type.polymorphicDiscriminator;
                  O &&
                    p.serializedName === O.serializedName &&
                    null == P &&
                    (P = t.serializedName);
                  var w = void 0;
                  Array.isArray(r[m]) && "" === i[m].serializedName
                    ? ((P = r[m]), (n = e.deserialize(p, P, h)))
                    : void 0 !== P &&
                      ((w = e.deserialize(p, P, h)), (n[m] = w));
                }
              }
              var E = t.type.additionalProperties;
              if (E) {
                var I = function (e) {
                  for (var t in i)
                    if (_(i[t].serializedName)[0] === e) return !1;
                  return !0;
                };
                for (var q in r)
                  I(q) && (n[q] = e.deserialize(E, r[q], a + '["' + q + '"]'));
              } else if (r)
                for (var A = 0, M = Object.keys(r); A < M.length; A++)
                  (m = M[A]),
                    void 0 !== n[m] ||
                      s.includes(m) ||
                      ["$", "_"].includes(m) ||
                      (n[m] = r[m]);
              return n;
            })(this, e, t, r))
          : (this.isXML && null != t.$ && null != t._ && (t = t._),
            null !== i.match(/^Number$/gi)
              ? ((a = parseFloat(t)), isNaN(a) && (a = t))
              : null !== i.match(/^Boolean$/gi)
              ? (a = "true" === t || ("false" !== t && t))
              : null !==
                i.match(/^(String|Enum|Object|Stream|Uuid|TimeSpan|any)$/gi)
              ? (a = t)
              : null !== i.match(/^(Date|DateTime|DateTimeRfc1123)$/gi)
              ? (a = new Date(t))
              : null !== i.match(/^UnixTime$/gi)
              ? (a = (function (e) {
                  return e ? new Date(1e3 * e) : void 0;
                })(t))
              : null !== i.match(/^ByteArray$/gi)
              ? (a = n(t))
              : null !== i.match(/^Base64Url$/gi)
              ? (a = (function (e) {
                  if (e) {
                    if (e && "string" != typeof e.valueOf())
                      throw new Error(
                        "Please provide an input of type string for converting to Uint8Array"
                      );
                    return n((e = e.replace(/\-/g, "+").replace(/\_/g, "/")));
                  }
                })(t))
              : null !== i.match(/^Sequence$/gi)
              ? (a = (function (e, t, r, a) {
                  var i = t.type.element;
                  if (!i || "object" != typeof i)
                    throw new Error(
                      'element" metadata for an Array must be defined in the mapper and it must of type "object" in ' +
                        a
                    );
                  if (r) {
                    Array.isArray(r) || (r = [r]);
                    for (var n = [], s = 0; s < r.length; s++)
                      n[s] = e.deserialize(i, r[s], a + "[" + s + "]");
                    return n;
                  }
                  return r;
                })(this, e, t, r))
              : null !== i.match(/^Dictionary$/gi) &&
                (a = (function (e, t, r, a) {
                  var i = t.type.value;
                  if (!i || "object" != typeof i)
                    throw new Error(
                      '"value" metadata for a Dictionary must be defined in the mapper and it must of type "object" in ' +
                        a
                    );
                  if (r) {
                    for (
                      var n = {}, s = 0, o = Object.keys(r);
                      s < o.length;
                      s++
                    ) {
                      var l = o[s];
                      n[l] = e.deserialize(i, r[l], a);
                    }
                    return n;
                  }
                  return r;
                })(this, e, t, r))),
        e.isConstant && (a = e.defaultValue),
        a
      );
    }),
    R);
  function R(e, t) {
    void 0 === e && (e = {}), (this.modelMappers = e), (this.isXML = t);
  }
  function _(e) {
    var t = [],
      r = "";
    if (e)
      for (var a = 0, i = e.split("."); a < i.length; a++) {
        var n = i[a];
        "\\" === n.charAt(n.length - 1)
          ? (r += n.substr(0, n.length - 1) + ".")
          : ((r += n), t.push(r), (r = ""));
      }
    return t;
  }
  function x(e, t, r) {
    var a = t.type.modelProperties;
    if (!a) {
      var i = t.type.className;
      if (!i)
        throw new Error(
          'Class name for model "' +
            r +
            '" is not provided in the mapper "' +
            JSON.stringify(t, void 0, 2) +
            '".'
        );
      var n = e.modelMappers[i];
      if (!n)
        throw new Error(
          'mapper() cannot be null or undefined for model "' + i + '".'
        );
      if (!(a = n.type.modelProperties))
        throw new Error(
          'modelProperties cannot be null or undefined in the mapper "' +
            JSON.stringify(n) +
            '" of type "' +
            i +
            '" for object "' +
            r +
            '".'
        );
    }
    return a;
  }
  function L(e, t, r, a) {
    var i = D(e, t);
    if (i) {
      var n = i[a];
      if (null != n) {
        var s = r[n];
        if (null != s) {
          var o = t.type.uberParent || t.type.className,
            l = s === o ? s : o + "." + s,
            m = e.modelMappers.discriminators[l];
          m && (t = m);
        }
      }
    }
    return t;
  }
  function D(e, t) {
    return (
      t.type.polymorphicDiscriminator ||
      v(e, t.type.uberParent) ||
      v(e, t.type.className)
    );
  }
  function v(e, t) {
    return (
      t && e.modelMappers[t] && e.modelMappers[t].type.polymorphicDiscriminator
    );
  }
  var E = (function (e) {
      for (var t = {}, r = 0, a = e; r < a.length; r++) {
        var i = a[r];
        t[i] = i;
      }
      return t;
    })([
      "Base64Url",
      "Boolean",
      "ByteArray",
      "Composite",
      "Date",
      "DateTime",
      "DateTimeRfc1123",
      "Dictionary",
      "Enum",
      "Number",
      "Object",
      "Sequence",
      "String",
      "Stream",
      "TimeSpan",
      "UnixTime",
    ]),
    I =
      ((P.prototype.validateRequestProperties = function () {
        if (!this.method) throw new Error("WebResource.method is required.");
        if (!this.url) throw new Error("WebResource.url is required.");
      }),
      (P.prototype.prepare = function (e) {
        if (!e) throw new Error("options object is required");
        if (null == e.method || "string" != typeof e.method.valueOf())
          throw new Error("options.method must be a string.");
        if (e.url && e.pathTemplate)
          throw new Error(
            "options.url and options.pathTemplate are mutually exclusive. Please provide exactly one of them."
          );
        if (
          !(
            (null != e.pathTemplate &&
              "string" == typeof e.pathTemplate.valueOf()) ||
            (null != e.url && "string" == typeof e.url.valueOf())
          )
        )
          throw new Error(
            "Please provide exactly one of options.pathTemplate or options.url."
          );
        if (e.url) {
          if ("string" != typeof e.url)
            throw new Error('options.url must be of type "string".');
          this.url = e.url;
        }
        if (e.method) {
          var t = [
            "GET",
            "PUT",
            "HEAD",
            "DELETE",
            "OPTIONS",
            "POST",
            "PATCH",
            "TRACE",
          ];
          if (-1 === t.indexOf(e.method.toUpperCase()))
            throw new Error(
              'The provided method "' +
                e.method +
                '" is invalid. Supported HTTP methods are: ' +
                JSON.stringify(t)
            );
        }
        if (((this.method = e.method.toUpperCase()), e.pathTemplate)) {
          var a = e.pathTemplate,
            i = e.pathParameters;
          if ("string" != typeof a)
            throw new Error('options.pathTemplate must be of type "string".');
          e.baseUrl || (e.baseUrl = "https://management.azure.com");
          var r = e.baseUrl,
            n =
              r +
              (r.endsWith("/") ? "" : "/") +
              (a.startsWith("/") ? a.slice(1) : a),
            s = n.match(/({\w*\s*\w*})/gi);
          if (s && s.length) {
            if (!i)
              throw new Error(
                "pathTemplate: " +
                  a +
                  " has been provided. Hence, options.pathParameters must also be provided."
              );
            s.forEach(function (e) {
              var t = e.slice(1, -1),
                r = i[t];
              if (null == r || ("string" != typeof r && "object" != typeof r))
                throw new Error(
                  "pathTemplate: " +
                    a +
                    " contains the path parameter " +
                    t +
                    " however, it is not present in " +
                    i +
                    " - " +
                    JSON.stringify(i, void 0, 2) +
                    '.The value of the path parameter can either be a "string" of the form { ' +
                    t +
                    ': "some sample value" } or it can be an "object" of the form { "' +
                    t +
                    '": { value: "some sample value", skipUrlEncoding: true } }.'
                );
              if (
                ("string" == typeof r.valueOf() &&
                  (n = n.replace(e, encodeURIComponent(r))),
                "object" == typeof r.valueOf())
              ) {
                if (!r.value)
                  throw new Error(
                    "options.pathParameters[" +
                      t +
                      '] is of type "object" but it does not contain a "value" property.'
                  );
                n = r.skipUrlEncoding
                  ? n.replace(e, r.value)
                  : n.replace(e, encodeURIComponent(r.value));
              }
            });
          }
          this.url = n;
        }
        if (e.queryParameters) {
          var o = e.queryParameters;
          if ("object" != typeof o)
            throw new Error(
              'options.queryParameters must be of type object. It should be a JSON object of "query-parameter-name" as the key and the "query-parameter-value" as the value. The "query-parameter-value" may be fo type "string" or an "object" of the form { value: "query-parameter-value", skipUrlEncoding: true }.'
            );
          this.url && -1 === this.url.indexOf("?") && (this.url += "?");
          var l = [];
          for (var m in ((this.query = {}), o)) {
            var p = o[m];
            if (p)
              if ("string" == typeof p)
                l.push(m + "=" + encodeURIComponent(p)),
                  (this.query[m] = encodeURIComponent(p));
              else if ("object" == typeof p) {
                if (!p.value)
                  throw new Error(
                    "options.queryParameters[" +
                      m +
                      '] is of type "object" but it does not contain a "value" property.'
                  );
                p.skipUrlEncoding
                  ? (l.push(m + "=" + p.value), (this.query[m] = p.value))
                  : (l.push(m + "=" + encodeURIComponent(p.value)),
                    (this.query[m] = encodeURIComponent(p.value)));
              }
          }
          this.url += l.join("&");
        }
        if (e.headers)
          for (
            var u = e.headers, d = 0, y = Object.keys(e.headers);
            d < y.length;
            d++
          ) {
            var c = y[d];
            this.headers.set(c, u[c]);
          }
        return (
          this.headers.get("accept-language") ||
            this.headers.set("accept-language", "en-US"),
          this.headers.get("x-ms-client-request-id") ||
            e.disableClientRequestId ||
            this.headers.set("x-ms-client-request-id", N()),
          this.headers.get("Content-Type") ||
            this.headers.set("Content-Type", "application/json; charset=utf-8"),
          (this.body = e.body),
          null != e.body &&
            (e.bodyIsStream
              ? (this.headers.get("Transfer-Encoding") ||
                  this.headers.set("Transfer-Encoding", "chunked"),
                "application/octet-stream" !==
                  this.headers.get("Content-Type") &&
                  this.headers.set("Content-Type", "application/octet-stream"))
              : (e.serializationMapper &&
                  (this.body = new S(e.mappers).serialize(
                    e.serializationMapper,
                    e.body,
                    "requestBody"
                  )),
                e.disableJsonStringifyOnBody ||
                  (this.body = JSON.stringify(e.body)))),
          (this.abortSignal = e.abortSignal),
          (this.onDownloadProgress = e.onDownloadProgress),
          (this.onUploadProgress = e.onUploadProgress),
          this
        );
      }),
      (P.prototype.clone = function () {
        var e = new P(
          this.url,
          this.method,
          this.body,
          this.query,
          this.headers && this.headers.clone(),
          this.streamResponseBody,
          this.withCredentials,
          this.abortSignal,
          this.timeout,
          this.onUploadProgress,
          this.onDownloadProgress
        );
        return (
          this.formData && (e.formData = this.formData),
          this.operationSpec && (e.operationSpec = this.operationSpec),
          this.shouldDeserialize &&
            (e.shouldDeserialize = this.shouldDeserialize),
          this.operationResponseGetter &&
            (e.operationResponseGetter = this.operationResponseGetter),
          e
        );
      }),
      P);
  function P(e, t, r, a, i, n, s, o, l, m, p, u) {
    (this.streamResponseBody = n),
      (this.url = e || ""),
      (this.method = t || "GET"),
      (this.headers = i instanceof y ? i : new y(i)),
      (this.body = r),
      (this.query = a),
      (this.formData = void 0),
      (this.withCredentials = s || !1),
      (this.abortSignal = o),
      (this.timeout = l || 0),
      (this.onUploadProgress = m),
      (this.onDownloadProgress = p),
      (this.proxySettings = u);
  }
  var z = function (e, t) {
    return (z =
      Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array &&
        function (e, t) {
          e.__proto__ = t;
        }) ||
      function (e, t) {
        for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
      })(e, t);
  };
  function b(e, t) {
    function r() {
      this.constructor = e;
    }
    z(e, t),
      (e.prototype =
        null === t ? Object.create(t) : ((r.prototype = t.prototype), new r()));
  }
  var T = function () {
    return (T =
      Object.assign ||
      function (e) {
        for (var t, r = 1, a = arguments.length; r < a; r++)
          for (var i in (t = arguments[r]))
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e;
      }).apply(this, arguments);
  };
  function C(n, s, o, l) {
    return new (o = o || Promise)(function (e, t) {
      function r(e) {
        try {
          i(l.next(e));
        } catch (e) {
          t(e);
        }
      }
      function a(e) {
        try {
          i(l.throw(e));
        } catch (e) {
          t(e);
        }
      }
      function i(t) {
        t.done
          ? e(t.value)
          : new o(function (e) {
              e(t.value);
            }).then(r, a);
      }
      i((l = l.apply(n, s || [])).next());
    });
  }
  function O(r, a) {
    var i,
      n,
      s,
      e,
      o = {
        label: 0,
        sent: function () {
          if (1 & s[0]) throw s[1];
          return s[1];
        },
        trys: [],
        ops: [],
      };
    return (
      (e = { next: t(0), throw: t(1), return: t(2) }),
      "function" == typeof Symbol &&
        (e[Symbol.iterator] = function () {
          return this;
        }),
      e
    );
    function t(t) {
      return function (e) {
        return (function (t) {
          if (i) throw new TypeError("Generator is already executing.");
          for (; o; )
            try {
              if (
                ((i = 1),
                n &&
                  (s =
                    2 & t[0]
                      ? n.return
                      : t[0]
                      ? n.throw || ((s = n.return) && s.call(n), 0)
                      : n.next) &&
                  !(s = s.call(n, t[1])).done)
              )
                return s;
              switch (((n = 0), s && (t = [2 & t[0], s.value]), t[0])) {
                case 0:
                case 1:
                  s = t;
                  break;
                case 4:
                  return o.label++, { value: t[1], done: !1 };
                case 5:
                  o.label++, (n = t[1]), (t = [0]);
                  continue;
                case 7:
                  (t = o.ops.pop()), o.trys.pop();
                  continue;
                default:
                  if (
                    !(s = 0 < (s = o.trys).length && s[s.length - 1]) &&
                    (6 === t[0] || 2 === t[0])
                  ) {
                    o = 0;
                    continue;
                  }
                  if (3 === t[0] && (!s || (t[1] > s[0] && t[1] < s[3]))) {
                    o.label = t[1];
                    break;
                  }
                  if (6 === t[0] && o.label < s[1]) {
                    (o.label = s[1]), (s = t);
                    break;
                  }
                  if (s && o.label < s[2]) {
                    (o.label = s[2]), o.ops.push(t);
                    break;
                  }
                  s[2] && o.ops.pop(), o.trys.pop();
                  continue;
              }
              t = a.call(r, o);
            } catch (e) {
              (t = [6, e]), (n = 0);
            } finally {
              i = s = 0;
            }
          if (5 & t[0]) throw t[1];
          return { value: t[0] ? t[1] : void 0, done: !0 };
        })([t, e]);
      };
    }
  }
  var w,
    q =
      (b(A, (w = Error)),
      (A.REQUEST_SEND_ERROR = "REQUEST_SEND_ERROR"),
      (A.REQUEST_ABORTED_ERROR = "REQUEST_ABORTED_ERROR"),
      (A.PARSE_ERROR = "PARSE_ERROR"),
      A);
  function A(e, t, r, a, i, n) {
    var s = w.call(this, e) || this;
    return (
      (s.code = t),
      (s.statusCode = r),
      (s.request = a),
      (s.response = i),
      (s.body = n),
      Object.setPrototypeOf(s, A.prototype),
      s
    );
  }
  var M,
    B =
      ((G.prototype.sendRequest = function (r) {
        var a = new XMLHttpRequest();
        if (r.proxySettings)
          throw new Error("HTTP proxy is not supported in browser environment");
        var e = r.abortSignal;
        if (e) {
          var t = function () {
            a.abort();
          };
          e.addEventListener("abort", t),
            a.addEventListener("readystatechange", function () {
              a.readyState === XMLHttpRequest.DONE &&
                e.removeEventListener("abort", t);
            });
        }
        if (
          (F(a.upload, r.onUploadProgress),
          F(a, r.onDownloadProgress),
          r.formData)
        ) {
          for (
            var i = r.formData,
              n = new FormData(),
              s = function (e, t) {
                t && t.hasOwnProperty("value") && t.hasOwnProperty("options")
                  ? n.append(e, t.value, t.options)
                  : n.append(e, t);
              },
              o = 0,
              l = Object.keys(i);
            o < l.length;
            o++
          ) {
            var m = l[o],
              p = i[m];
            if (Array.isArray(p)) for (var u = 0; u < p.length; u++) s(m, p[u]);
            else s(m, p);
          }
          (r.body = n), (r.formData = void 0);
          var d = r.headers.get("Content-Type");
          d &&
            -1 !== d.indexOf("multipart/form-data") &&
            r.headers.remove("Content-Type");
        }
        a.open(r.method, r.url),
          (a.timeout = r.timeout),
          (a.withCredentials = r.withCredentials);
        for (var y = 0, c = r.headers.headersArray(); y < c.length; y++) {
          var h = c[y];
          a.setRequestHeader(h.name, h.value);
        }
        return (
          (a.responseType = r.streamResponseBody ? "blob" : "text"),
          a.send(void 0 === r.body ? null : r.body),
          r.streamResponseBody
            ? new Promise(function (t, e) {
                a.addEventListener("readystatechange", function () {
                  if (a.readyState === XMLHttpRequest.HEADERS_RECEIVED) {
                    var e = new Promise(function (e, t) {
                      a.addEventListener("load", function () {
                        e(a.response);
                      }),
                        U(r, a, t);
                    });
                    t({
                      request: r,
                      status: a.status,
                      headers: H(a),
                      blobBody: e,
                    });
                  }
                }),
                  U(r, a, e);
              })
            : new Promise(function (e, t) {
                a.addEventListener("load", function () {
                  return e({
                    request: r,
                    status: a.status,
                    headers: H(a),
                    bodyAsText: a.responseText,
                  });
                }),
                  U(r, a, t);
              })
        );
      }),
      G);
  function G() {}
  function F(e, t) {
    t &&
      e.addEventListener("progress", function (e) {
        return t({ loadedBytes: e.loaded });
      });
  }
  function H(e) {
    for (
      var t = new y(),
        r = 0,
        a = e
          .getAllResponseHeaders()
          .trim()
          .split(/[\r\n]+/);
      r < a.length;
      r++
    ) {
      var i = a[r],
        n = i.indexOf(":"),
        s = i.slice(0, n),
        o = i.slice(n + 2);
      t.set(s, o);
    }
    return t;
  }
  function U(e, t, r) {
    t.addEventListener("error", function () {
      return r(
        new q(
          "Failed to send request to " + e.url,
          q.REQUEST_SEND_ERROR,
          void 0,
          e
        )
      );
    }),
      t.addEventListener("abort", function () {
        return r(
          new q("The request was aborted", q.REQUEST_ABORTED_ERROR, void 0, e)
        );
      }),
      t.addEventListener("timeout", function () {
        return r(
          new q(
            "timeout of " + t.timeout + "ms exceeded",
            q.REQUEST_SEND_ERROR,
            void 0,
            e
          )
        );
      });
  }
  function k(e) {
    return V(e.parameterPath, e.mapper);
  }
  function V(e, t) {
    return "string" == typeof e
      ? e
      : Array.isArray(e)
      ? e.join(".")
      : t.serializedName;
  }
  function j(e) {
    var t = !1;
    for (var r in e.responses) {
      var a = e.responses[r];
      if (a.bodyMapper && a.bodyMapper.type.name === E.Stream) {
        t = !0;
        break;
      }
    }
    return t;
  }
  ((M = d.HttpPipelineLogLevel || (d.HttpPipelineLogLevel = {}))[(M.OFF = 0)] =
    "OFF"),
    (M[(M.ERROR = 1)] = "ERROR"),
    (M[(M.WARNING = 2)] = "WARNING"),
    (M[(M.INFO = 3)] = "INFO");
  var W = new DOMParser();
  function Y(e) {
    try {
      var t = W.parseFromString(e, "application/xml");
      !(function (e) {
        if (J) {
          var t = e.getElementsByTagNameNS(J, "parsererror");
          if (t.length) throw new Error(t.item(0).innerHTML);
        }
      })(t);
      var r = (function e(t) {
        var r = {};
        var a = t.childNodes.length;
        var i = t.childNodes[0];
        var n =
          (i && 1 === a && i.nodeType === Node.TEXT_NODE && i.nodeValue) ||
          void 0;
        var s =
          ((o = t),
          (function (e) {
            return !!e.attributes;
          })(o) && o.hasAttributes()
            ? o
            : void 0);
        var o;
        if (s) {
          r.$ = {};
          for (var l = 0; l < s.attributes.length; l++) {
            var m = s.attributes[l];
            r.$[m.nodeName] = m.nodeValue;
          }
          n && (r._ = n);
        } else 0 === a ? (r = "") : n && (r = n);
        if (!n)
          for (var l = 0; l < a; l++) {
            var p = t.childNodes[l];
            if (p.nodeType !== Node.TEXT_NODE) {
              var u = e(p);
              r[p.nodeName]
                ? Array.isArray(r[p.nodeName])
                  ? r[p.nodeName].push(u)
                  : (r[p.nodeName] = [r[p.nodeName], u])
                : (r[p.nodeName] = u);
            }
          }
        return r;
      })(t.childNodes[0]);
      return Promise.resolve(r);
    } catch (e) {
      return Promise.reject(e);
    }
  }
  var J = "";
  try {
    J = W.parseFromString("INVALID", "text/xml").getElementsByTagName(
      "parsererror"
    )[0].namespaceURI;
  } catch (e) {}
  var K = document.implementation.createDocument(null, null, null),
    X = new XMLSerializer();
  function $(e, t) {
    var r = (function e(t, r) {
      {
        if (
          "string" == typeof t ||
          "number" == typeof t ||
          "boolean" == typeof t
        ) {
          var a = K.createElement(r);
          return (a.textContent = t.toString()), [a];
        }
        if (Array.isArray(t)) {
          for (var i = [], n = 0, s = t; n < s.length; n++)
            for (var o = s[n], l = 0, m = e(o, r); l < m.length; l++) {
              var p = m[l];
              i.push(p);
            }
          return i;
        }
        if ("object" != typeof t)
          throw new Error("Illegal value passed to buildObject: " + t);
        for (
          var a = K.createElement(r), u = 0, d = Object.keys(t);
          u < d.length;
          u++
        ) {
          var y = d[u];
          if ("$" === y)
            for (var c = 0, h = Q(t[y]); c < h.length; c++) {
              var f = h[c];
              a.attributes.setNamedItem(f);
            }
          else
            for (var N = 0, g = e(t[y], y); N < g.length; N++) {
              var p = g[N];
              a.appendChild(p);
            }
        }
        return [a];
      }
    })(e, (t && t.rootName) || "root")[0];
    return (
      '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
      X.serializeToString(r)
    );
  }
  function Q(e) {
    for (var t = [], r = 0, a = Object.keys(e); r < a.length; r++) {
      var i = a[r],
        n = K.createAttribute(i);
      (n.value = e[i].toString()), t.push(n);
    }
    return t;
  }
  var Z =
    ((ee.prototype.shouldLog = function (e) {
      return this._options.shouldLog(e);
    }),
    (ee.prototype.log = function (e, t) {
      this._options.log(e, t);
    }),
    ee);
  function ee(e, t) {
    (this._nextPolicy = e), (this._options = t);
  }
  var te =
    ((re.prototype.shouldLog = function (e) {
      return (
        !!this._logger &&
        e !== d.HttpPipelineLogLevel.OFF &&
        e <= this._logger.minimumLogLevel
      );
    }),
    (re.prototype.log = function (e, t) {
      this._logger && this.shouldLog(e) && this._logger.log(e, t);
    }),
    re);
  function re(e) {
    this._logger = e;
  }
  function ae(r) {
    return {
      create: function (e, t) {
        return new oe(e, r, t);
      },
    };
  }
  var ie,
    ne = ["application/json", "text/json"],
    se = ["application/xml", "application/atom+xml"],
    oe =
      (b(le, (ie = Z)),
      (le.prototype.sendRequest = function (r) {
        return C(this, void 0, void 0, function () {
          var t = this;
          return O(this, function (e) {
            return [
              2,
              this._nextPolicy.sendRequest(r).then(function (e) {
                return (function (e, t, c) {
                  return (function (t, r, i) {
                    function e(e) {
                      var t =
                          'Error "' +
                          e +
                          '" occurred while parsing the response body - ' +
                          i.bodyAsText +
                          ".",
                        r = e.code || q.PARSE_ERROR,
                        a = new q(t, r, i.status, i.request, i, i.bodyAsText);
                      return Promise.reject(a);
                    }
                    if (!i.request.streamResponseBody && i.bodyAsText) {
                      var a = i.bodyAsText,
                        n = i.headers.get("Content-Type") || "",
                        s = n
                          ? n.split(";").map(function (e) {
                              return e.toLowerCase();
                            })
                          : [];
                      if (
                        0 === s.length ||
                        s.some(function (e) {
                          return -1 !== t.indexOf(e);
                        })
                      )
                        return new Promise(function (e) {
                          (i.parsedBody = JSON.parse(a)), e(i);
                        }).catch(e);
                      if (
                        s.some(function (e) {
                          return -1 !== r.indexOf(e);
                        })
                      )
                        return Y(a)
                          .then(function (e) {
                            return (i.parsedBody = e), i;
                          })
                          .catch(e);
                    }
                    return Promise.resolve(i);
                  })(e, t, c).then(function (t) {
                    if (
                      (function (e) {
                        var t = e.request.shouldDeserialize;
                        return (
                          void 0 === t || ("boolean" == typeof t ? t : t(e))
                        );
                      })(t)
                    ) {
                      var e = t.request.operationSpec;
                      if (e && e.responses) {
                        var r = t.status,
                          a = Object.keys(e.responses),
                          i =
                            0 === a.length ||
                            (1 === a.length && "default" === a[0]),
                          n = (function (e) {
                            var t,
                              r = e.request,
                              a = r.operationSpec;
                            if (a) {
                              var i = r.operationResponseGetter;
                              t = i ? i(a, e) : a.responses[e.status];
                            }
                            return t;
                          })(t);
                        if (i ? 200 <= r && r < 300 : n) {
                          if (n) {
                            if (n.bodyMapper) {
                              (y = t.parsedBody),
                                e.isXML &&
                                  n.bodyMapper.type.name === E.Sequence &&
                                  (y =
                                    "object" == typeof y
                                      ? y[n.bodyMapper.xmlElementName]
                                      : []);
                              try {
                                t.parsedBody = e.serializer.deserialize(
                                  n.bodyMapper,
                                  y,
                                  "operationRes.parsedBody"
                                );
                              } catch (m) {
                                var s = new q(
                                  "Error " +
                                    m +
                                    " occurred in deserializing the responseBody - " +
                                    t.bodyAsText
                                );
                                return (
                                  (s.request = f(t.request)),
                                  (s.response = h(t)),
                                  Promise.reject(s)
                                );
                              }
                            } else
                              "HEAD" === e.httpMethod &&
                                (t.parsedBody =
                                  200 <= c.status && c.status < 300);
                            n.headersMapper &&
                              (t.parsedHeaders = e.serializer.deserialize(
                                n.headersMapper,
                                t.headers.rawHeaders(),
                                "operationRes.parsedHeaders"
                              ));
                          }
                        } else {
                          var o = e.responses.default;
                          if (o) {
                            var l = j(e)
                                ? "Unexpected status code: " + r
                                : t.bodyAsText,
                              m = new q(l);
                            (m.statusCode = r),
                              (m.request = f(t.request)),
                              (m.response = h(t));
                            var p = t.parsedBody;
                            try {
                              if (p) {
                                var u = o.bodyMapper;
                                if (u && "CloudError" === u.serializedName)
                                  p.error && (p = p.error),
                                    p.code && (m.code = p.code),
                                    p.message && (m.message = p.message);
                                else {
                                  var d = p;
                                  p.error && (d = p.error),
                                    (m.code = d.code),
                                    d.message && (m.message = d.message);
                                }
                                if (u) {
                                  var y = p;
                                  e.isXML &&
                                    u.type.name === E.Sequence &&
                                    (y =
                                      "object" == typeof p
                                        ? p[u.xmlElementName]
                                        : []),
                                    (m.body = e.serializer.deserialize(
                                      u,
                                      y,
                                      "error.body"
                                    ));
                                }
                              }
                            } catch (e) {
                              m.message =
                                'Error "' +
                                e.message +
                                '" occurred in deserializing the responseBody - "' +
                                t.bodyAsText +
                                '" for the default response.';
                            }
                            return Promise.reject(m);
                          }
                        }
                      }
                    }
                    return Promise.resolve(t);
                  });
                })(t.jsonContentTypes, t.xmlContentTypes, e);
              }),
            ];
          });
        });
      }),
      le);
  function le(e, t, r) {
    var a = ie.call(this, e, r) || this;
    return (
      (a.jsonContentTypes = (t && t.json) || ne),
      (a.xmlContentTypes = (t && t.xml) || se),
      a
    );
  }
  var me,
    pe =
      (b(ue, (me = Z)),
      (ue.prototype.sendRequest = function (t) {
        var r = this;
        return this._nextPolicy
          .sendRequest(t.clone())
          .then(function (e) {
            return de(r, t, e);
          })
          .catch(function (e) {
            return de(r, t, e.response, void 0, e);
          });
      }),
      ue);
  function ue(e, t, r, a, i, n) {
    var s = me.call(this, e, t) || this;
    function o(e) {
      return "number" == typeof e;
    }
    return (
      (s.retryCount = o(r) ? r : 3),
      (s.retryInterval = o(a) ? a : 3e4),
      (s.minRetryInterval = o(i) ? i : 3e3),
      (s.maxRetryInterval = o(n) ? n : 9e4),
      s
    );
  }
  function de(t, r, a, i, e) {
    i = (function (e, t, r) {
      (t = t || { retryCount: 0, retryInterval: 0 }),
        r && (t.error && (r.innerError = t.error), (t.error = r)),
        t.retryCount++;
      var a = Math.pow(2, t.retryCount) - 1;
      return (
        (a *=
          0.8 * e.retryInterval +
          Math.floor(
            Math.random() * (1.2 * e.retryInterval - 0.8 * e.retryInterval)
          )),
        (t.retryInterval = Math.min(
          e.minRetryInterval + a,
          e.maxRetryInterval
        )),
        t
      );
    })(t, i, e);
    var n = r.abortSignal && r.abortSignal.aborted;
    if (
      !n &&
      (function (e, t, r) {
        if (null == t || (t < 500 && 408 !== t) || 501 === t || 505 === t)
          return !1;
        if (!r)
          throw new Error(
            "retryData for the ExponentialRetryPolicyFilter cannot be null."
          );
        return (r && r.retryCount) < e.retryCount;
      })(t, a && a.status, i)
    )
      return u(i.retryInterval)
        .then(function () {
          return t._nextPolicy.sendRequest(r.clone());
        })
        .then(function (e) {
          return de(t, r, e, i, void 0);
        })
        .catch(function (e) {
          return de(t, r, a, i, e);
        });
    if (n || e || !a) {
      var s =
        i.error ||
        new q(
          "Failed to send the request.",
          q.REQUEST_SEND_ERROR,
          a && a.status,
          a && a.request,
          a
        );
      return Promise.reject(s);
    }
    return Promise.resolve(a);
  }
  var ye,
    ce =
      (b(he, (ye = Z)),
      (he.prototype.sendRequest = function (e) {
        return (
          e.headers.contains(this._requestIdHeaderName) ||
            e.headers.set(this._requestIdHeaderName, N()),
          this._nextPolicy.sendRequest(e)
        );
      }),
      he);
  function he(e, t, r) {
    var a = ye.call(this, e, t) || this;
    return (a._requestIdHeaderName = r), a;
  }
  function fe() {
    return "x-ms-command-name";
  }
  var Ne = fe;
  function ge() {
    var e = [{ key: "ms-rest-js", value: p.msRestVersion }],
      t = (function () {
        var e = window.navigator;
        return [{ key: "OS", value: (e.oscpu || e.platform).replace(" ", "") }];
      })();
    return (function (e, t, r) {
      return (
        void 0 === t && (t = " "),
        void 0 === r && (r = "/"),
        e
          .map(function (e) {
            var t = e.value ? "" + r + e.value : "";
            return e.key + t;
          })
          .join(t)
      );
    })(e.concat(t));
  }
  var Se,
    Re =
      (b(ve, (Se = Z)),
      (ve.prototype.sendRequest = function (e) {
        return this.addUserAgentHeader(e), this._nextPolicy.sendRequest(e);
      }),
      (ve.prototype.addUserAgentHeader = function (e) {
        e.headers || (e.headers = new y()),
          !e.headers.get(this.headerKey) &&
            this.headerValue &&
            e.headers.set(this.headerKey, this.headerValue);
      }),
      ve);
  function ve(e, t, r, a) {
    var i = Se.call(this, e, t) || this;
    return (
      (i._nextPolicy = e),
      (i._options = t),
      (i.headerKey = r),
      (i.headerValue = a),
      i
    );
  }
  var Pe =
    ((ze.prototype.any = function () {
      return 0 < Object.keys(this._rawQuery).length;
    }),
    (ze.prototype.set = function (e, t) {
      if (e)
        if (null != t) {
          var r = Array.isArray(t) ? t : t.toString();
          this._rawQuery[e] = r;
        } else delete this._rawQuery[e];
    }),
    (ze.prototype.get = function (e) {
      return e ? this._rawQuery[e] : void 0;
    }),
    (ze.prototype.toString = function () {
      var e = "";
      for (var t in this._rawQuery) {
        e && (e += "&");
        var r = this._rawQuery[t];
        if (Array.isArray(r)) {
          for (var a = [], i = 0, n = r; i < n.length; i++) {
            var s = n[i];
            a.push(t + "=" + s);
          }
          e += a.join("&");
        } else e += t + "=" + r;
      }
      return e;
    }),
    (ze.parse = function (e) {
      var t = new ze();
      if (e) {
        e.startsWith("?") && (e = e.substring(1));
        for (
          var r = "ParameterName", a = "", i = "", n = 0;
          n < e.length;
          ++n
        ) {
          var s = e[n];
          switch (r) {
            case "ParameterName":
              switch (s) {
                case "=":
                  r = "ParameterValue";
                  break;
                case "&":
                  i = a = "";
                  break;
                default:
                  a += s;
              }
              break;
            case "ParameterValue":
              switch (s) {
                case "=":
                  (i = a = ""), (r = "Invalid");
                  break;
                case "&":
                  t.set(a, i), (i = a = ""), (r = "ParameterName");
                  break;
                default:
                  i += s;
              }
              break;
            case "Invalid":
              "&" === s && (r = "ParameterName");
              break;
            default:
              throw new Error("Unrecognized URLQuery parse state: " + r);
          }
        }
        "ParameterValue" === r && t.set(a, i);
      }
      return t;
    }),
    ze);
  function ze() {
    this._rawQuery = {};
  }
  var be =
    ((Te.prototype.setScheme = function (e) {
      e ? this.set(e, "SCHEME") : (this._scheme = void 0);
    }),
    (Te.prototype.getScheme = function () {
      return this._scheme;
    }),
    (Te.prototype.setHost = function (e) {
      e ? this.set(e, "SCHEME_OR_HOST") : (this._host = void 0);
    }),
    (Te.prototype.getHost = function () {
      return this._host;
    }),
    (Te.prototype.setPort = function (e) {
      null == e || "" === e
        ? (this._port = void 0)
        : this.set(e.toString(), "PORT");
    }),
    (Te.prototype.getPort = function () {
      return this._port;
    }),
    (Te.prototype.setPath = function (e) {
      e
        ? -1 !== e.indexOf("://")
          ? this.set(e, "SCHEME")
          : this.set(e, "PATH")
        : (this._path = void 0);
    }),
    (Te.prototype.appendPath = function (e) {
      if (e) {
        var t = this.getPath();
        t &&
          (t.endsWith("/") || (t += "/"),
          e.startsWith("/") && (e = e.substring(1)),
          (e = t + e)),
          this.set(e, "PATH");
      }
    }),
    (Te.prototype.getPath = function () {
      return this._path;
    }),
    (Te.prototype.setQuery = function (e) {
      this._query = e ? Pe.parse(e) : void 0;
    }),
    (Te.prototype.setQueryParameter = function (e, t) {
      e && (this._query || (this._query = new Pe()), this._query.set(e, t));
    }),
    (Te.prototype.getQueryParameterValue = function (e) {
      return this._query ? this._query.get(e) : void 0;
    }),
    (Te.prototype.getQuery = function () {
      return this._query ? this._query.toString() : void 0;
    }),
    (Te.prototype.set = function (e, t) {
      for (var r = new we(e, t); r.next(); ) {
        var a = r.current();
        if (a)
          switch (a.type) {
            case "SCHEME":
              this._scheme = a.text || void 0;
              break;
            case "HOST":
              this._host = a.text || void 0;
              break;
            case "PORT":
              this._port = a.text || void 0;
              break;
            case "PATH":
              var i = a.text || void 0;
              (this._path && "/" !== this._path && "/" === i) ||
                (this._path = i);
              break;
            case "QUERY":
              this._query = Pe.parse(a.text);
              break;
            default:
              throw new Error("Unrecognized URLTokenType: " + a.type);
          }
      }
    }),
    (Te.prototype.toString = function () {
      var e = "";
      return (
        this._scheme && (e += this._scheme + "://"),
        this._host && (e += this._host),
        this._port && (e += ":" + this._port),
        this._path &&
          (this._path.startsWith("/") || (e += "/"), (e += this._path)),
        this._query && this._query.any() && (e += "?" + this._query.toString()),
        e
      );
    }),
    (Te.prototype.replaceAll = function (e, t) {
      e &&
        (this.setScheme(g(this.getScheme(), e, t)),
        this.setHost(g(this.getHost(), e, t)),
        this.setPort(g(this.getPort(), e, t)),
        this.setPath(g(this.getPath(), e, t)),
        this.setQuery(g(this.getQuery(), e, t)));
    }),
    (Te.parse = function (e) {
      var t = new Te();
      return t.set(e, "SCHEME_OR_HOST"), t;
    }),
    Te);
  function Te() {}
  var Ce =
    ((Oe.scheme = function (e) {
      return new Oe(e, "SCHEME");
    }),
    (Oe.host = function (e) {
      return new Oe(e, "HOST");
    }),
    (Oe.port = function (e) {
      return new Oe(e, "PORT");
    }),
    (Oe.path = function (e) {
      return new Oe(e, "PATH");
    }),
    (Oe.query = function (e) {
      return new Oe(e, "QUERY");
    }),
    Oe);
  function Oe(e, t) {
    (this.text = e), (this.type = t);
  }
  var we =
    ((Ee.prototype.current = function () {
      return this._currentToken;
    }),
    (Ee.prototype.next = function () {
      if (Ie(this))
        switch (this._currentState) {
          case "SCHEME":
            !(function (e) {
              var t = (function (e) {
                return _e(e, function (e) {
                  return (function (e) {
                    var t = e.charCodeAt(0);
                    return (
                      (48 <= t && t <= 57) ||
                      (65 <= t && t <= 90) ||
                      (97 <= t && t <= 122)
                    );
                  })(e);
                });
              })(e);
              (e._currentToken = Ce.scheme(t)),
                Ie(e) ? (e._currentState = "HOST") : (e._currentState = "DONE");
            })(this);
            break;
          case "SCHEME_OR_HOST":
            !(function (e) {
              var t = xe(e, ":", "/", "?");
              Ie(e)
                ? ":" === qe(e)
                  ? "://" === Me(e, 3)
                    ? ((e._currentToken = Ce.scheme(t)),
                      (e._currentState = "HOST"))
                    : ((e._currentToken = Ce.host(t)),
                      (e._currentState = "PORT"))
                  : ((e._currentToken = Ce.host(t)),
                    "/" === qe(e)
                      ? (e._currentState = "PATH")
                      : (e._currentState = "QUERY"))
                : ((e._currentToken = Ce.host(t)), (e._currentState = "DONE"));
            })(this);
            break;
          case "HOST":
            !(function (e) {
              "://" === Me(e, 3) && Ae(e, 3);
              var t = xe(e, ":", "/", "?");
              (e._currentToken = Ce.host(t)),
                Ie(e)
                  ? ":" === qe(e)
                    ? (e._currentState = "PORT")
                    : "/" === qe(e)
                    ? (e._currentState = "PATH")
                    : (e._currentState = "QUERY")
                  : (e._currentState = "DONE");
            })(this);
            break;
          case "PORT":
            !(function (e) {
              ":" === qe(e) && Ae(e);
              var t = xe(e, "/", "?");
              (e._currentToken = Ce.port(t)),
                Ie(e)
                  ? "/" === qe(e)
                    ? (e._currentState = "PATH")
                    : (e._currentState = "QUERY")
                  : (e._currentState = "DONE");
            })(this);
            break;
          case "PATH":
            !(function (e) {
              var t = xe(e, "?");
              (e._currentToken = Ce.path(t)),
                Ie(e)
                  ? (e._currentState = "QUERY")
                  : (e._currentState = "DONE");
            })(this);
            break;
          case "QUERY":
            !(function (e) {
              "?" === qe(e) && Ae(e);
              var t = (function (e) {
                var t = "";
                return (
                  e._currentIndex < e._textLength &&
                    ((t = e._text.substring(e._currentIndex)),
                    (e._currentIndex = e._textLength)),
                  t
                );
              })(e);
              (e._currentToken = Ce.query(t)), (e._currentState = "DONE");
            })(this);
            break;
          default:
            throw new Error(
              "Unrecognized URLTokenizerState: " + this._currentState
            );
        }
      else this._currentToken = void 0;
      return !!this._currentToken;
    }),
    Ee);
  function Ee(e, t) {
    (this._text = e),
      (this._textLength = e ? e.length : 0),
      (this._currentState = null != t ? t : "SCHEME_OR_HOST"),
      (this._currentIndex = 0);
  }
  function Ie(e) {
    return e._currentIndex < e._textLength;
  }
  function qe(e) {
    return e._text[e._currentIndex];
  }
  function Ae(e, t) {
    Ie(e) && ((t = t || 1), (e._currentIndex += t));
  }
  function Me(e, t) {
    var r = e._currentIndex + t;
    return (
      e._textLength < r && (r = e._textLength),
      e._text.substring(e._currentIndex, r)
    );
  }
  function _e(e, t) {
    for (var r = ""; Ie(e); ) {
      var a = qe(e);
      if (!t(a)) break;
      (r += a), Ae(e);
    }
    return r;
  }
  function xe(e) {
    for (var t = [], r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
    return _e(e, function (e) {
      return -1 === t.indexOf(e);
    });
  }
  var Le,
    De =
      (b(Be, (Le = Z)),
      (Be.prototype.sendRequest = function (e) {
        var t = this;
        return this._nextPolicy.sendRequest(e).then(function (e) {
          return (function t(r, e, a) {
            var i = e.request,
              n = e.status,
              s = e.headers.get("location");
            if (
              s &&
              (300 === n || 307 === n || (303 === n && "POST" === i.method)) &&
              (!r.maxRetries || a < r.maxRetries)
            ) {
              var o = be.parse(i.url);
              return (
                o.setPath(s),
                (i.url = o.toString()),
                303 === n && (i.method = "GET"),
                r._nextPolicy.sendRequest(i).then(function (e) {
                  return t(r, e, a + 1);
                })
              );
            }
            return Promise.resolve(e);
          })(t, e, 0);
        });
      }),
      Be);
  function Be(e, t, r) {
    void 0 === r && (r = 20);
    var a = Le.call(this, e, t) || this;
    return (a.maxRetries = r), a;
  }
  var Ge,
    Fe =
      (b(He, (Ge = Z)),
      (He.prototype.sendRequest = function (t) {
        var r = this;
        return this._nextPolicy.sendRequest(t.clone()).then(function (e) {
          return (function (t, r, a) {
            if (409 === a.status) {
              var e = (function (e) {
                var t, r;
                if (e) {
                  try {
                    r = JSON.parse(e);
                  } catch (e) {}
                  if (
                    r &&
                    r.error &&
                    r.error.message &&
                    r.error.code &&
                    "MissingSubscriptionRegistration" === r.error.code
                  ) {
                    var a = r.error.message.match(/.*'(.*)'/i);
                    a && (t = a.pop());
                  }
                }
                return t;
              })(a.bodyAsText);
              if (e) {
                var i = (function (e) {
                  var t = e.match(/.*\/subscriptions\/[a-f0-9-]+\//gi);
                  if (!t || !t[0])
                    throw new Error(
                      "Unable to extract subscriptionId from the given url - " +
                        e +
                        "."
                    );
                  return t[0];
                })(r.url);
                return (function (t, e, r, a) {
                  var i =
                      e + "providers/" + r + "/register?api-version=2016-02-01",
                    n = e + "providers/" + r + "?api-version=2016-02-01",
                    s = Ue(a);
                  return (
                    (s.method = "POST"),
                    (s.url = i),
                    t._nextPolicy.sendRequest(s).then(function (e) {
                      if (200 !== e.status)
                        throw new Error(
                          "Autoregistration of " +
                            r +
                            " failed. Please try registering manually."
                        );
                      return (function r(a, i, n) {
                        var e = Ue(n);
                        return (
                          (e.url = i),
                          (e.method = "GET"),
                          a._nextPolicy.sendRequest(e).then(function (e) {
                            var t = e.parsedBody;
                            return (
                              !(
                                !e.parsedBody ||
                                !t.registrationState ||
                                "Registered" !== t.registrationState
                              ) ||
                              u(1e3 * a._retryTimeout).then(function () {
                                return r(a, i, n);
                              })
                            );
                          })
                        );
                      })(t, n, a);
                    })
                  );
                })(t, i, e, r)
                  .catch(function () {
                    return !1;
                  })
                  .then(function (e) {
                    return e
                      ? (r.headers.set("x-ms-client-request-id", N()),
                        t._nextPolicy.sendRequest(r.clone()))
                      : a;
                  });
              }
            }
            return Promise.resolve(a);
          })(r, t, e);
        });
      }),
      He);
  function He(e, t, r) {
    void 0 === r && (r = 30);
    var a = Ge.call(this, e, t) || this;
    return (a._retryTimeout = r), a;
  }
  function Ue(e, t) {
    void 0 === t && (t = !1);
    var r = e.clone();
    return (
      t && (r.url = e.url),
      r.headers.set("x-ms-client-request-id", N()),
      r.headers.set("Content-Type", "application/json; charset=utf-8"),
      r
    );
  }
  var ke,
    Ve =
      (b(je, (ke = Z)),
      (je.prototype.signRequest = function (e) {
        return this.authenticationProvider.signRequest(e);
      }),
      (je.prototype.sendRequest = function (e) {
        var t = this;
        return this.signRequest(e).then(function (e) {
          return t._nextPolicy.sendRequest(e);
        });
      }),
      je);
  function je(e, t, r) {
    var a = ke.call(this, e, t) || this;
    return (a.authenticationProvider = r), a;
  }
  var We,
    Ye,
    Je,
    Ke =
      (b(Xe, (We = Z)),
      (Xe.prototype.sendRequest = function (t) {
        var r = this;
        return this._nextPolicy.sendRequest(t.clone()).then(function (e) {
          return (function t(r, a, i, n, s) {
            return (
              (n = Qe(r, n, s)),
              s &&
              s.code &&
              $e(r, n) &&
              ("ETIMEDOUT" === s.code ||
                "ESOCKETTIMEDOUT" === s.code ||
                "ECONNREFUSED" === s.code ||
                "ECONNRESET" === s.code ||
                "ENOENT" === s.code)
                ? u(n.retryInterval)
                    .then(function () {
                      return r._nextPolicy.sendRequest(a.clone());
                    })
                    .then(function (e) {
                      return t(r, a, e, n, s);
                    })
                    .catch(function (e) {
                      return t(r, a, i, n, e);
                    })
                : null != s
                ? ((s = n.error), Promise.reject(s))
                : Promise.resolve(i)
            );
          })(r, t, e);
        });
      }),
      Xe);
  function Xe(e, t, r, a, i, n) {
    var s = We.call(this, e, t) || this;
    return (
      (s.DEFAULT_CLIENT_RETRY_INTERVAL = 3e4),
      (s.DEFAULT_CLIENT_RETRY_COUNT = 3),
      (s.DEFAULT_CLIENT_MAX_RETRY_INTERVAL = 9e4),
      (s.DEFAULT_CLIENT_MIN_RETRY_INTERVAL = 3e3),
      (s.retryCount = "number" == typeof r ? r : s.DEFAULT_CLIENT_RETRY_COUNT),
      (s.retryInterval =
        "number" == typeof a ? a : s.DEFAULT_CLIENT_RETRY_INTERVAL),
      (s.minRetryInterval =
        "number" == typeof i ? i : s.DEFAULT_CLIENT_MIN_RETRY_INTERVAL),
      (s.maxRetryInterval =
        "number" == typeof n ? n : s.DEFAULT_CLIENT_MAX_RETRY_INTERVAL),
      s
    );
  }
  function $e(e, t) {
    if (!t)
      throw new Error(
        "retryData for the SystemErrorRetryPolicyFilter cannot be null."
      );
    return (t && t.retryCount) < e.retryCount;
  }
  function Qe(e, t, r) {
    (t = t || { retryCount: 0, retryInterval: 0 }),
      r && (t.error && (r.innerError = t.error), (t.error = r)),
      t.retryCount++;
    var a = Math.pow(2, t.retryCount) - 1;
    return (
      (a *=
        0.8 * e.retryInterval +
        Math.floor(
          Math.random() * (1.2 * e.retryInterval - 0.8 * e.retryInterval)
        )),
      (t.retryInterval = Math.min(e.minRetryInterval + a, e.maxRetryInterval)),
      t
    );
  }
  function Ze(e) {
    if (
      (e =
        e ||
        (function () {
          if (process)
            return process.env[p.HTTPS_PROXY]
              ? process.env[p.HTTPS_PROXY]
              : process.env[p.HTTPS_PROXY.toLowerCase()]
              ? process.env[p.HTTPS_PROXY.toLowerCase()]
              : process.env[p.HTTP_PROXY]
              ? process.env[p.HTTP_PROXY]
              : process.env[p.HTTP_PROXY.toLowerCase()]
              ? process.env[p.HTTP_PROXY.toLowerCase()]
              : void 0;
        })())
    ) {
      var t = be.parse(e);
      return {
        host: t.getScheme() + "://" + t.getHost(),
        port: Number.parseInt(t.getPort() || "80"),
      };
    }
  }
  ((Je = Ye = Ye || {}).Csv = ","),
    (Je.Ssv = " "),
    (Je.Tsv = "\t"),
    (Je.Pipes = "|"),
    (Je.Multi = "Multi");
  var et,
    tt =
      (b(rt, (et = Z)),
      (rt.prototype.sendRequest = function (e) {
        return (
          e.proxySettings || (e.proxySettings = this.proxySettings),
          this._nextPolicy.sendRequest(e)
        );
      }),
      rt);
  function rt(e, t, r) {
    var a = et.call(this, e, t) || this;
    return (a.proxySettings = r), a;
  }
  var at = p.HttpConstants.StatusCodes;
  var it,
    nt =
      (b(st, (it = Z)),
      (st.prototype.sendRequest = function (r) {
        return C(this, void 0, void 0, function () {
          var t = this;
          return O(this, function (e) {
            return [
              2,
              this._nextPolicy.sendRequest(r.clone()).then(function (e) {
                return e.status !== at.TooManyRequests
                  ? e
                  : t._handleResponse(r, e);
              }),
            ];
          });
        });
      }),
      (st.prototype._defaultResponseHandler = function (i, n) {
        return C(this, void 0, void 0, function () {
          var t,
            r,
            a = this;
          return O(this, function (e) {
            return (t = n.headers.get(p.HeaderConstants.RETRY_AFTER)) &&
              (r = st.parseRetryAfterHeader(t))
              ? [
                  2,
                  u(r).then(function (e) {
                    return a._nextPolicy.sendRequest(i);
                  }),
                ]
              : [2, n];
          });
        });
      }),
      (st.parseRetryAfterHeader = function (e) {
        var t = Number(e);
        return Number.isNaN(t) ? st.parseDateRetryAfterHeader(e) : 1e3 * t;
      }),
      (st.parseDateRetryAfterHeader = function (e) {
        try {
          var t = Date.now(),
            r = Date.parse(e) - t;
          return Number.isNaN(r) ? void 0 : r;
        } catch (e) {
          return;
        }
      }),
      st);
  function st(e, t, r) {
    var a = it.call(this, e, t) || this;
    return (a._handleResponse = r || a._defaultResponseHandler), a;
  }
  var ot,
    lt,
    mt,
    pt,
    ut,
    dt,
    yt,
    ct,
    ht,
    ft,
    Nt,
    gt,
    St,
    Rt,
    vt,
    Pt,
    zt,
    bt,
    Tt,
    Ct,
    Ot,
    wt,
    Et,
    It,
    qt,
    At,
    Mt,
    _t,
    xt,
    Lt,
    Dt,
    Bt,
    Gt,
    Ft,
    Ht,
    Ut,
    kt,
    Vt,
    jt,
    Wt,
    Yt,
    Jt,
    Kt,
    Xt,
    $t,
    Qt,
    Zt,
    er,
    tr,
    rr,
    ar,
    ir,
    nr,
    sr,
    or,
    lr,
    mr,
    pr,
    ur,
    dr,
    yr,
    cr,
    hr,
    fr,
    Nr,
    gr,
    Sr,
    Rr,
    vr,
    Pr,
    zr,
    br,
    Tr,
    Cr,
    Or,
    wr,
    Er,
    Ir,
    qr,
    Ar,
    Mr,
    _r,
    xr,
    Lr,
    Dr,
    Br,
    Gr,
    Fr,
    Hr,
    Ur,
    kr,
    Vr,
    jr,
    Wr,
    Yr,
    Jr,
    Kr,
    Xr,
    $r,
    Qr,
    Zr,
    ea,
    ta,
    ra,
    aa =
      ((ia.prototype.sendRequest = function (e) {
        if (null == e || "object" != typeof e)
          throw new Error(
            "options cannot be null or undefined and it must be of type object."
          );
        var t;
        try {
          t =
            e instanceof I
              ? (e.validateRequestProperties(), e)
              : (t = new I()).prepare(e);
        } catch (e) {
          return Promise.reject(e);
        }
        var r = this._httpClient;
        if (
          this._requestPolicyFactories &&
          0 < this._requestPolicyFactories.length
        )
          for (var a = this._requestPolicyFactories.length - 1; 0 <= a; --a)
            r = this._requestPolicyFactories[a].create(
              r,
              this._requestPolicyOptions
            );
        return r.sendRequest(t);
      }),
      (ia.prototype.sendOperationRequest = function (e, t, r) {
        "function" == typeof e.options &&
          ((r = e.options), (e.options = void 0));
        var a,
          i = new I();
        try {
          var n = t.baseUrl || this.baseUri;
          if (!n)
            throw new Error(
              "If operationSpec.baseUrl is not specified, then the ServiceClient must have a baseUri string property that contains the base URL to use."
            );
          (i.method = t.httpMethod), (i.operationSpec = t);
          var s = be.parse(n);
          if (
            (t.path && s.appendPath(t.path),
            t.urlParameters && 0 < t.urlParameters.length)
          )
            for (var o = 0, l = t.urlParameters; o < l.length; o++) {
              var m = l[o],
                p = sa(this, e, m, t.serializer);
              (p = t.serializer.serialize(m.mapper, p, k(m))),
                m.skipEncoding || (p = encodeURIComponent(p)),
                s.replaceAll("{" + (m.mapper.serializedName || k(m)) + "}", p);
            }
          if (t.queryParameters && 0 < t.queryParameters.length)
            for (var u = 0, d = t.queryParameters; u < d.length; u++) {
              var y = d[u],
                c = sa(this, e, y, t.serializer);
              if (null != c) {
                if (
                  ((c = t.serializer.serialize(y.mapper, c, k(y))),
                  null != y.collectionFormat)
                )
                  if (y.collectionFormat === Ye.Multi)
                    if (0 === c.length) c = "";
                    else
                      for (var h in c) {
                        var f = c[h];
                        c[h] = null == f ? "" : f.toString();
                      }
                  else c = c.join(y.collectionFormat);
                if (!y.skipEncoding)
                  if (Array.isArray(c))
                    for (var h in c) c[h] = encodeURIComponent(c[h]);
                  else c = encodeURIComponent(c);
                s.setQueryParameter(y.mapper.serializedName || k(y), c);
              }
            }
          i.url = s.toString();
          var N = t.contentType || this.requestContentType;
          if ((N && i.headers.set("Content-Type", N), t.headerParameters))
            for (var g = 0, S = t.headerParameters; g < S.length; g++) {
              var R = S[g],
                v = sa(this, e, R, t.serializer);
              if (null != v) {
                v = t.serializer.serialize(R.mapper, v, k(R));
                var P = R.mapper.headerCollectionPrefix;
                if (P)
                  for (var z = 0, b = Object.keys(v); z < b.length; z++) {
                    var T = b[z];
                    i.headers.set(P + T, v[T]);
                  }
                else i.headers.set(R.mapper.serializedName || k(R), v);
              }
            }
          var C = e.options;
          if (C) {
            if (C.customHeaders)
              for (var O in C.customHeaders)
                i.headers.set(O, C.customHeaders[O]);
            C.abortSignal && (i.abortSignal = C.abortSignal),
              C.timeout && (i.timeout = C.timeout),
              C.onUploadProgress && (i.onUploadProgress = C.onUploadProgress),
              C.onDownloadProgress &&
                (i.onDownloadProgress = C.onDownloadProgress);
          }
          (i.withCredentials = this._withCredentials),
            (function (e, t, r, a) {
              if (a.requestBody && a.requestBody.mapper) {
                t.body = sa(e, r, a.requestBody, a.serializer);
                var i = a.requestBody.mapper,
                  n = i.required,
                  s = i.xmlName,
                  o = i.xmlElementName,
                  l = i.serializedName,
                  m = i.type.name;
                try {
                  if (null != t.body || n) {
                    var p = k(a.requestBody);
                    t.body = a.serializer.serialize(i, t.body, p);
                    var u = m === E.Stream;
                    a.isXML
                      ? m === E.Sequence
                        ? (t.body = $(
                            (function (e, t) {
                              var r;
                              return (
                                Array.isArray(e) || (e = [e]),
                                ((r = {})[t] = e),
                                r
                              );
                            })(t.body, o || s || l),
                            { rootName: s || l }
                          ))
                        : u || (t.body = $(t.body, { rootName: s || l }))
                      : u || (t.body = JSON.stringify(t.body));
                  }
                } catch (e) {
                  throw new Error(
                    'Error "' +
                      e.message +
                      '" occurred in serializing the payload - ' +
                      JSON.stringify(l, void 0, "  ") +
                      "."
                  );
                }
              } else if (
                a.formDataParameters &&
                0 < a.formDataParameters.length
              ) {
                t.formData = {};
                for (var d = 0, y = a.formDataParameters; d < y.length; d++) {
                  var c = y[d],
                    h = sa(e, r, c, a.serializer);
                  if (null != h) {
                    var f = c.mapper.serializedName || k(c);
                    t.formData[f] = a.serializer.serialize(c.mapper, h, k(c));
                  }
                }
              }
            })(this, i, e, t),
            null == i.streamResponseBody && (i.streamResponseBody = j(t)),
            (a = this.sendRequest(i).then(function (e) {
              return la(e, t.responses[e.status]);
            }));
        } catch (e) {
          a = Promise.reject(e);
        }
        var w = r;
        return (
          w &&
            a
              .then(function (e) {
                return w(
                  null,
                  e._response.parsedBody,
                  e._response.request,
                  e._response
                );
              })
              .catch(function (e) {
                return w(e);
              }),
          a
        );
      }),
      ia);
  function ia(e, t) {
    if (((t = t || {}), e && !e.signRequest))
      throw new Error(
        "credentials argument needs to implement signRequest method"
      );
    var r;
    if (
      ((this._withCredentials = t.withCredentials || !1),
      (this._httpClient = t.httpClient || new B()),
      (this._requestPolicyOptions = new te(t.httpPipelineLogger)),
      Array.isArray(t.requestPolicyFactories))
    )
      r = t.requestPolicyFactories;
    else if (
      ((r = (function (e, t) {
        var r = [];
        t.generateClientRequestIdHeader &&
          r.push(
            (function (r) {
              return (
                void 0 === r && (r = "x-ms-client-request-id"),
                {
                  create: function (e, t) {
                    return new ce(e, t, r);
                  },
                }
              );
            })(t.clientRequestIdHeaderName)
          );
        e &&
          (!(function (e) {
            return "function" == typeof e.create;
          })(e)
            ? r.push(
                (function (r) {
                  return {
                    create: function (e, t) {
                      return new Ve(e, t, r);
                    },
                  };
                })(e)
              )
            : r.push(e));
        var a = na(t.userAgentHeaderName, Ne),
          i = na(t.userAgent, ge);
        a &&
          i &&
          r.push(
            (function (e) {
              var r = e && null != e.key ? e.key : "x-ms-command-name",
                a = e && null != e.value ? e.value : ge();
              return {
                create: function (e, t) {
                  return new Re(e, t, r, a);
                },
              };
            })({ key: a, value: i })
          );
        r.push(
          (function (r) {
            return (
              void 0 === r && (r = 20),
              {
                create: function (e, t) {
                  return new De(e, t, r);
                },
              }
            );
          })()
        ),
          r.push(
            (function (r) {
              return (
                void 0 === r && (r = 30),
                {
                  create: function (e, t) {
                    return new Fe(e, t, r);
                  },
                }
              );
            })(t.rpRegistrationRetryTimeout)
          ),
          t.noRetryPolicy ||
            (r.push(
              (function (r, a, i, n) {
                return {
                  create: function (e, t) {
                    return new pe(e, t, r, a, i, n);
                  },
                };
              })()
            ),
            r.push(
              (function (r, a, i, n) {
                return {
                  create: function (e, t) {
                    return new Ke(e, t, r, a, i, n);
                  },
                };
              })()
            ),
            r.push({
              create: function (e, t) {
                return new nt(e, t);
              },
            }));
        r.push(ae(t.deserializationContentTypes));
        var n = t.proxySettings || Ze();
        n &&
          r.push(
            (function (r) {
              return {
                create: function (e, t) {
                  return new tt(e, t, r);
                },
              };
            })(n)
          );
        return r;
      })(e, t)),
      t.requestPolicyFactories)
    ) {
      var a = t.requestPolicyFactories(r);
      a && (r = a);
    }
    this._requestPolicyFactories = r;
  }
  function na(e, t) {
    var r;
    return (
      "string" == typeof e
        ? (r = e)
        : ((r = t()), "function" == typeof e && (r = e(r))),
      r
    );
  }
  function sa(e, t, r, a) {
    return (function e(t, r, a, i, n) {
      var s;
      "string" == typeof a && (a = [a]);
      if (Array.isArray(a)) {
        if (0 < a.length) {
          if (i.isConstant) s = i.defaultValue;
          else {
            var o = oa(r, a);
            o.propertyFound || (o = oa(t, a));
            var l = !1;
            o.propertyFound ||
              (l = i.required || ("options" === a[0] && 2 === a.length)),
              (s = l ? i.defaultValue : o.propertyValue);
          }
          var m = V(a, i);
          n.serialize(i, s, m);
        }
      } else
        for (var p in (i.required && (s = {}), a)) {
          var u = i.type.modelProperties[p],
            d = a[p],
            y = e(t, r, d, u, n),
            c = V(d, u);
          n.serialize(u, y, c), void 0 !== y && ((s = s || {})[p] = y);
        }
      return s;
    })(e, t, r.parameterPath, r.mapper, a);
  }
  function oa(e, t) {
    for (var r = { propertyFound: !1 }, a = 0; a < t.length; ++a) {
      var i = t[a];
      if (!(null != e && i in e)) break;
      e = e[i];
    }
    return a === t.length && ((r.propertyValue = e), (r.propertyFound = !0)), r;
  }
  function la(t, e) {
    function r(e) {
      return Object.defineProperty(e, "_response", { value: t });
    }
    var a = t.parsedHeaders,
      i = e && e.bodyMapper;
    if (i) {
      var n = i.type.name;
      if ("Stream" === n)
        return r(
          T({}, a, {
            blobBody: t.blobBody,
            readableStreamBody: t.readableStreamBody,
          })
        );
      var s = ("Composite" === n && i.type.modelProperties) || {},
        o = Object.keys(s).some(function (e) {
          return "" === s[e].serializedName;
        });
      if ("Sequence" === n || o) {
        for (
          var l = (t.parsedBody || []).slice(), m = 0, p = Object.keys(s);
          m < p.length;
          m++
        ) {
          var u = p[m];
          s[u].serializedName && (l[u] = t.parsedBody[u]);
        }
        if (a)
          for (var d = 0, y = Object.keys(a); d < y.length; d++) {
            l[(u = y[d])] = a[u];
          }
        return r(l), l;
      }
      if ("Composite" === n || "Dictionary" === n)
        return r(T({}, a, t.parsedBody));
    }
    return i || "HEAD" === t.request.method
      ? r(T({}, a, { body: t.parsedBody }))
      : r(T({}, a, t.parsedBody));
  }
  ((lt = ot = ot || {}).Country = "Country"),
    (lt.CountrySubdivision = "CountrySubdivision"),
    (lt.CountrySecondarySubdivision = "CountrySecondarySubdivision"),
    (lt.CountryTertiarySubdivision = "CountryTertiarySubdivision"),
    (lt.Municipality = "Municipality"),
    (lt.MunicipalitySubdivision = "MunicipalitySubdivision"),
    (lt.Neighbourhood = "Neighbourhood"),
    (lt.PostalCodeArea = "PostalCodeArea"),
    ((pt = mt = mt || {}).Zero = "0"),
    (pt.One = "1"),
    (pt.Two = "2"),
    (pt.Three = "3"),
    (pt.Four = "4"),
    ((dt = ut = ut || {}).TURN = "TURN"),
    (dt.ROADCHANGE = "ROAD_CHANGE"),
    (dt.LOCATIONDEPARTURE = "LOCATION_DEPARTURE"),
    (dt.LOCATIONARRIVAL = "LOCATION_ARRIVAL"),
    (dt.DIRECTIONINFO = "DIRECTION_INFO"),
    (dt.LOCATIONWAYPOINT = "LOCATION_WAYPOINT"),
    ((ct = yt = yt || {}).LEFT = "LEFT"),
    (ct.RIGHT = "RIGHT"),
    ((ft = ht = ht || {}).ARRIVE = "ARRIVE"),
    (ft.ARRIVELEFT = "ARRIVE_LEFT"),
    (ft.ARRIVERIGHT = "ARRIVE_RIGHT"),
    (ft.DEPART = "DEPART"),
    (ft.STRAIGHT = "STRAIGHT"),
    (ft.KEEPRIGHT = "KEEP_RIGHT"),
    (ft.BEARRIGHT = "BEAR_RIGHT"),
    (ft.TURNRIGHT = "TURN_RIGHT"),
    (ft.SHARPRIGHT = "SHARP_RIGHT"),
    (ft.KEEPLEFT = "KEEP_LEFT"),
    (ft.BEARLEFT = "BEAR_LEFT"),
    (ft.TURNLEFT = "TURN_LEFT"),
    (ft.SHARPLEFT = "SHARP_LEFT"),
    (ft.MAKEUTURN = "MAKE_UTURN"),
    (ft.ENTERMOTORWAY = "ENTER_MOTORWAY"),
    (ft.ENTERFREEWAY = "ENTER_FREEWAY"),
    (ft.ENTERHIGHWAY = "ENTER_HIGHWAY"),
    (ft.TAKEEXIT = "TAKE_EXIT"),
    (ft.MOTORWAYEXITLEFT = "MOTORWAY_EXIT_LEFT"),
    (ft.MOTORWAYEXITRIGHT = "MOTORWAY_EXIT_RIGHT"),
    (ft.TAKEFERRY = "TAKE_FERRY"),
    (ft.ROUNDABOUTCROSS = "ROUNDABOUT_CROSS"),
    (ft.ROUNDABOUTRIGHT = "ROUNDABOUT_RIGHT"),
    (ft.ROUNDABOUTLEFT = "ROUNDABOUT_LEFT"),
    (ft.ROUNDABOUTBACK = "ROUNDABOUT_BACK"),
    (ft.TRYMAKEUTURN = "TRY_MAKE_UTURN"),
    (ft.FOLLOW = "FOLLOW"),
    (ft.SWITCHPARALLELROAD = "SWITCH_PARALLEL_ROAD"),
    (ft.SWITCHMAINROAD = "SWITCH_MAIN_ROAD"),
    (ft.ENTRANCERAMP = "ENTRANCE_RAMP"),
    (ft.WAYPOINTLEFT = "WAYPOINT_LEFT"),
    (ft.WAYPOINTRIGHT = "WAYPOINT_RIGHT"),
    (ft.WAYPOINTREACHED = "WAYPOINT_REACHED"),
    ((gt = Nt = Nt || {}).Bus = "Bus"),
    (gt.CableCar = "CableCar"),
    (gt.Ferry = "Ferry"),
    (gt.Funicular = "Funicular"),
    (gt.Gondola = "Gondola"),
    (gt.Rail = "Rail"),
    (gt.Tram = "Tram"),
    (gt.Subway = "Subway"),
    ((Rt = St = St || {}).Walk = "Walk"),
    (Rt.Bicycle = "Bicycle"),
    (Rt.Tram = "Tram"),
    (Rt.Subway = "Subway"),
    (Rt.Rail = "Rail"),
    (Rt.Bus = "Bus"),
    (Rt.Ferry = "Ferry"),
    (Rt.Cable = "Cable"),
    (Rt.Gondola = "Gondola"),
    (Rt.Funicular = "Funicular"),
    (Rt.PathWayWalk = "PathWayWalk"),
    (Rt.Wait = "Wait"),
    (Rt.WaitOnVehicle = "WaitOnVehicle"),
    ((Pt = vt = vt || {}).Depart = "depart"),
    (Pt.HardLeft = "hardLeft"),
    (Pt.Left = "left"),
    (Pt.SlightlyLeft = "slightlyLeft"),
    (Pt.Continue = "continue"),
    (Pt.SlightlyRight = "slightlyRight"),
    (Pt.Right = "right"),
    (Pt.HardRight = "hardRight"),
    (Pt.CircleClockwise = "circleClockwise"),
    (Pt.CircleCounterclockwise = "circleCounterclockwise"),
    (Pt.Elevator = "elevator"),
    (Pt.UturnLeft = "uturnLeft"),
    (Pt.UturnRight = "uturnRight"),
    ((bt = zt = zt || {}).North = "north"),
    (bt.Northeast = "northeast"),
    (bt.East = "east"),
    (bt.Southeast = "southeast"),
    (bt.South = "south"),
    (bt.Southwest = "southwest"),
    (bt.West = "west"),
    (bt.Northwest = "northwest"),
    ((Ct = Tt = Tt || {}).ScheduledTime = "scheduledTime"),
    (Ct.RealTime = "realTime"),
    ((wt = Ot = Ot || {}).Addr = "Addr"),
    (wt.Geo = "Geo"),
    (wt.PAD = "PAD"),
    (wt.POI = "POI"),
    (wt.Str = "Str"),
    (wt.Xstr = "Xstr"),
    ((It = Et = Et || {}).StandardHouseholdCountrySpecific =
      "StandardHouseholdCountrySpecific"),
    (It.IEC62196Type1 = "IEC62196Type1"),
    (It.IEC62196Type1CCS = "IEC62196Type1CCS"),
    (It.IEC62196Type2CableAttached = "IEC62196Type2CableAttached"),
    (It.IEC62196Type2Outlet = "IEC62196Type2Outlet"),
    (It.IEC62196Type2CCS = "IEC62196Type2CCS"),
    (It.IEC62196Type3 = "IEC62196Type3"),
    (It.Chademo = "Chademo"),
    (It.IEC60309AC1PhaseBlue = "IEC60309AC1PhaseBlue"),
    (It.IEC60309DCWhite = "IEC60309DCWhite"),
    (It.Tesla = "Tesla"),
    ((qt = qt || {}).NextSevenDays = "nextSevenDays"),
    ((Mt = At = At || {}).USHazmatClass1 = "USHazmatClass1"),
    (Mt.USHazmatClass2 = "USHazmatClass2"),
    (Mt.USHazmatClass3 = "USHazmatClass3"),
    (Mt.USHazmatClass4 = "USHazmatClass4"),
    (Mt.USHazmatClass5 = "USHazmatClass5"),
    (Mt.USHazmatClass6 = "USHazmatClass6"),
    (Mt.USHazmatClass7 = "USHazmatClass7"),
    (Mt.USHazmatClass8 = "USHazmatClass8"),
    (Mt.USHazmatClass9 = "USHazmatClass9"),
    (Mt.OtherHazmatExplosive = "otherHazmatExplosive"),
    (Mt.OtherHazmatGeneral = "otherHazmatGeneral"),
    (Mt.OtherHazmatHarmfulToWater = "otherHazmatHarmfulToWater"),
    ((xt = _t = _t || {}).Fastest = "fastest"),
    (xt.Shortest = "shortest"),
    (xt.Eco = "eco"),
    (xt.Thrilling = "thrilling"),
    ((Dt = Lt = Lt || {}).Low = "low"),
    (Dt.Normal = "normal"),
    (Dt.High = "high"),
    ((Gt = Bt = Bt || {}).Low = "low"),
    (Gt.Normal = "normal"),
    (Gt.High = "high"),
    ((Ht = Ft = Ft || {}).Car = "car"),
    (Ht.Truck = "truck"),
    (Ht.Taxi = "taxi"),
    (Ht.Bus = "bus"),
    (Ht.Van = "van"),
    (Ht.Motorcycle = "motorcycle"),
    (Ht.Bicycle = "bicycle"),
    (Ht.Pedestrian = "pedestrian"),
    ((kt = Ut = Ut || {}).TollRoads = "tollRoads"),
    (kt.Motorways = "motorways"),
    (kt.Ferries = "ferries"),
    (kt.UnpavedRoads = "unpavedRoads"),
    (kt.Carpools = "carpools"),
    (kt.AlreadyUsedRoads = "alreadyUsedRoads"),
    (kt.BorderCrossings = "borderCrossings"),
    ((jt = Vt = Vt || {}).Combustion = "combustion"),
    (jt.Electric = "electric"),
    ((Yt = Wt = Wt || {}).CarTrain = "carTrain"),
    (Yt.Country = "country"),
    (Yt.Ferry = "ferry"),
    (Yt.Motorway = "motorway"),
    (Yt.Pedestrian = "pedestrian"),
    (Yt.TollRoad = "tollRoad"),
    (Yt.TollVignette = "tollVignette"),
    (Yt.Traffic = "traffic"),
    (Yt.TravelMode = "travelMode"),
    (Yt.Tunnel = "tunnel"),
    ((Kt = Jt = Jt || {}).Polyline = "polyline"),
    (Kt.SummaryOnly = "summaryOnly"),
    (Kt.None = "none"),
    (($t = Xt = Xt || {}).None = "none"),
    ($t.All = "all"),
    ((Zt = Qt = Qt || {}).AnyRoute = "anyRoute"),
    (Zt.BetterRoute = "betterRoute"),
    ((tr = er = er || {}).Coded = "coded"),
    (tr.Text = "text"),
    (tr.Tagged = "tagged"),
    ((ar = rr = rr || {}).None = "none"),
    (ar.ZoneInfo = "zoneInfo"),
    (ar.Transitions = "transitions"),
    (ar.All = "all"),
    ((nr = ir = ir || {}).Png = "png"),
    (nr.Pbf = "pbf"),
    ((or = sr = sr || {}).All = "All"),
    (or.EnterAndExit = "EnterAndExit"),
    ((mr = lr = lr || {}).Basic = "basic"),
    (mr.Hybrid = "hybrid"),
    (mr.Labels = "labels"),
    ((ur = pr = pr || {}).Basic = "basic"),
    (ur.Hybrid = "hybrid"),
    (ur.Labels = "labels"),
    (ur.Terra = "terra"),
    ((yr = dr = dr || {}).Main = "main"),
    (yr.ShadedRelief = "shaded_relief"),
    ((hr = cr = cr || {}).Position = "position"),
    (hr.CountryCode = "countryCode"),
    ((Nr = fr = fr || {}).Agencies = "agencies"),
    (Nr.Alerts = "alerts"),
    (Nr.AlertDetails = "alertDetails"),
    (Nr.TransitTypes = "transitTypes"),
    ((Sr = gr = gr || {}).Stop = "stop"),
    (Sr.DocklessBike = "docklessBike"),
    (Sr.DocklessElectricBike = "docklessElectricBike"),
    (Sr.DocklessElectricScooter = "docklessElectricScooter"),
    (Sr.DocklessScooter = "docklessScooter"),
    (Sr.DocklessMoped = "docklessMoped"),
    (Sr.CarShare = "carShare"),
    (Sr.DocklessVehicle = "docklessVehicle"),
    (Sr.BikeDock = "bikeDock"),
    ((vr = Rr = Rr || {}).Alerts = "alerts"),
    (vr.AlertDetails = "alertDetails"),
    (vr.Lines = "lines"),
    (vr.Stops = "stops"),
    (vr.Schedule = "schedule"),
    (vr.Patterns = "patterns"),
    ((zr = Pr = Pr || {}).StopId = "stopId"),
    (zr.StopKey = "stopKey"),
    ((Tr = br = br || {}).Alerts = "alerts"),
    (Tr.AlertDetails = "alertDetails"),
    (Tr.Lines = "lines"),
    (Tr.LineGroups = "lineGroups"),
    ((Or = Cr = Cr || {}).Position = "position"),
    (Or.StopId = "stopId"),
    (Or.StopKey = "stopKey"),
    ((Er = wr = wr || {}).Position = "position"),
    (Er.StopId = "stopId"),
    (Er.StopKey = "stopKey"),
    ((qr = Ir = Ir || {}).Walk = "walk"),
    (qr.Bike = "bike"),
    (qr.PublicTransit = "publicTransit"),
    ((Mr = Ar = Ar || {}).Bus = "bus"),
    (Mr.CableCar = "cableCar"),
    (Mr.Ferry = "ferry"),
    (Mr.Funicular = "funicular"),
    (Mr.Gondola = "gondola"),
    (Mr.Rail = "rail"),
    (Mr.Tram = "tram"),
    (Mr.Subway = "subway"),
    ((xr = _r = _r || {}).AgencyId = "agencyId"),
    (xr.AgencyKey = "agencyKey"),
    (xr.AgencyName = "agencyName"),
    ((Dr = Lr = Lr || {}).Arrival = "arrival"),
    (Dr.Departure = "departure"),
    (Dr.Last = "last"),
    ((Gr = Br = Br || {}).Optimal = "optimal"),
    (Gr.LeastWalk = "leastWalk"),
    (Gr.LeastTransfers = "leastTransfers"),
    ((Hr = Fr = Fr || {}).PrivateBike = "privateBike"),
    (Hr.DockedBike = "dockedBike"),
    ((kr = Ur = Ur || {}).Geometry = "geometry"),
    (kr.Schedule = "schedule"),
    ((jr = Vr = Vr || {}).Stops = "stops"),
    (jr.Line = "line"),
    (jr.LineAndStop = "lineAndStop"),
    (jr.Position = "position"),
    ((Yr = Wr = Wr || {}).StopId = "stopId"),
    (Yr.StopKey = "stopKey"),
    ((Kr = Jr = Jr || {}).Main = "main"),
    (Kr.Minor = "minor"),
    ((Xr = Xr || {}).Main = "main"),
    ((Qr = $r = $r || {}).Yes = "yes"),
    (Qr.No = "no"),
    ((ea = Zr = Zr || {}).Yes = "yes"),
    (ea.No = "no"),
    ((ra = ta = ta || {}).Yes = "yes"),
    (ra.No = "no");
  var ma = Object.freeze({
      get EntityType() {
        return ot;
      },
      get MagnitudeOfDelay() {
        return mt;
      },
      get GuidanceInstructionType() {
        return ut;
      },
      get DrivingSide() {
        return yt;
      },
      get GuidanceManeuver() {
        return ht;
      },
      get TransitType() {
        return Nt;
      },
      get LegType() {
        return St;
      },
      get RelativeDirection() {
        return vt;
      },
      get AbsoluteDirection() {
        return zt;
      },
      get ScheduleType() {
        return Tt;
      },
      get SearchIndexSet() {
        return Ot;
      },
      get ConnectorSet() {
        return Et;
      },
      get OpeningHours() {
        return qt;
      },
      get VehicleLoadType() {
        return At;
      },
      get RouteType() {
        return _t;
      },
      get Windingness() {
        return Lt;
      },
      get Hilliness() {
        return Bt;
      },
      get TravelMode() {
        return Ft;
      },
      get Avoid() {
        return Ut;
      },
      get VehicleEngineType() {
        return Vt;
      },
      get SectionType() {
        return Wt;
      },
      get RouteRepresentation() {
        return Jt;
      },
      get ComputeTravelTimeFor() {
        return Xt;
      },
      get AlternativeRouteType() {
        return Qt;
      },
      get RouteInstructionsType() {
        return er;
      },
      get TimezoneOptions() {
        return rr;
      },
      get TileFormat() {
        return ir;
      },
      get GeofenceMode() {
        return sr;
      },
      get StaticMapLayer() {
        return lr;
      },
      get MapTileLayer() {
        return pr;
      },
      get MapTileStyle() {
        return dr;
      },
      get MetroAreaQueryType() {
        return cr;
      },
      get MetroAreaDetailType() {
        return fr;
      },
      get ObjectType() {
        return gr;
      },
      get TransitLineDetailType() {
        return Rr;
      },
      get TransitStopQueryType() {
        return Pr;
      },
      get TransitStopDetailType() {
        return br;
      },
      get OriginType() {
        return Cr;
      },
      get DestinationType() {
        return wr;
      },
      get ModeType() {
        return Ir;
      },
      get TransitTypeFilter() {
        return Ar;
      },
      get AgencyType() {
        return _r;
      },
      get TimeType() {
        return Lr;
      },
      get TransitRouteType() {
        return Br;
      },
      get BikeType() {
        return Fr;
      },
      get TransitItineraryDetailType() {
        return Ur;
      },
      get RealTimeArrivalsQueryType() {
        return Vr;
      },
      get StopQueryType() {
        return Wr;
      },
      get Type() {
        return Jr;
      },
      get Style() {
        return Xr;
      },
      get Text() {
        return $r;
      },
      get Text1() {
        return Zr;
      },
      get Text2() {
        return ta;
      },
    }),
    pa =
      (Object.defineProperty(ua.prototype, "aborted", {
        get: function () {
          return this._aborted;
        },
        enumerable: !0,
        configurable: !0,
      }),
      Object.defineProperty(ua, "none", {
        get: function () {
          return new ua(void 0, 0);
        },
        enumerable: !0,
        configurable: !0,
      }),
      (ua.timeout = function (e) {
        return new ua(void 0, e);
      }),
      (ua.prototype.withTimeout = function (e) {
        var t = new ua(this, e);
        return this.children.push(t), t;
      }),
      (ua.prototype.withValue = function (e, t) {
        var r = new ua(this, 0, e, t);
        return this.children.push(r), r;
      }),
      (ua.prototype.getValue = function (e) {
        for (var t = this; t; t = t.parent) if (t.key === e) return t.value;
      }),
      (ua.prototype.abort = function () {
        var t = this;
        this.aborted ||
          (this.cancelTimer(),
          this.onabort && this.onabort.call(this),
          this.abortEventListeners.forEach(function (e) {
            e.call(t, void 0);
          }),
          this.children.forEach(function (e) {
            return e.cancelByParent();
          }),
          (this._aborted = !0));
      }),
      (ua.prototype.addEventListener = function (e, t) {
        this.abortEventListeners.push(t);
      }),
      (ua.prototype.removeEventListener = function (e, t) {
        var r = this.abortEventListeners.indexOf(t);
        -1 < r && this.abortEventListeners.splice(r, 1);
      }),
      (ua.prototype.cancelByParent = function () {
        this.abort();
      }),
      (ua.prototype.cancelTimer = function () {
        this.timer && clearTimeout(this.timer);
      }),
      ua);
  function ua(e, t, r, a) {
    var i = this;
    void 0 === t && (t = 0),
      (this._aborted = !1),
      (this.children = []),
      (this.abortEventListeners = []),
      (this.parent = e),
      (this.key = r),
      (this.value = a),
      0 < t &&
        ((this.timer = setTimeout(function () {
          i.abort.call(i);
        }, t)),
        this.timer &&
          "function" == typeof this.timer.unref &&
          this.timer.unref());
  }
  var da =
    ((ya.prototype.create = function (e, t) {
      throw new Error("Method should be implemented in children classes.");
    }),
    ya);
  function ya() {}
  var ca,
    ha =
      (b(fa, (ca = Z)),
      (fa.prototype.sendRequest = function (a) {
        return C(this, void 0, void 0, function () {
          var t, r;
          return O(this, function (e) {
            switch (e.label) {
              case 0:
                return (
                  (r = (t = this._nextPolicy).sendRequest),
                  [4, this.signRequest(a)]
                );
              case 1:
                return [2, r.apply(t, [e.sent()])];
            }
          });
        });
      }),
      (fa.prototype.signRequest = function (e) {
        return e;
      }),
      fa);
  function fa() {
    return (null !== ca && ca.apply(this, arguments)) || this;
  }
  var Na,
    ga =
      (b(Sa, (Na = ha)),
      (Sa.prototype.signRequest = function (n) {
        return C(this, void 0, void 0, function () {
          var t, r, a, i;
          return O(this, function (e) {
            switch (e.label) {
              case 0:
                return [4, this.map.authentication.initialize()];
              case 1:
                if (
                  (e.sent(),
                  (t = this.map.authentication.signRequest({ url: n.url }))
                    .headers)
                )
                  for (r = 0, a = Object.keys(t.headers); r < a.length; r++)
                    (i = a[r]), n.headers.set(i, t.headers[i]);
                return (n.url = t.url), [2, n];
            }
          });
        });
      }),
      Sa);
  function Sa(e, t, r) {
    var a = Na.call(this, e, t) || this;
    return (a.map = r), a;
  }
  var Ra,
    va =
      (b(Pa, (Ra = da)),
      (Pa.prototype.create = function (e, t) {
        return new ga(e, t, this.map);
      }),
      Pa);
  function Pa(e) {
    var t = Ra.call(this) || this;
    return (t.map = e), t;
  }
  function za(a) {
    return new Promise(function (e, t) {
      var r = [];
      a.on("error", function (e) {
        return t(e);
      }),
        a.on("data", function (e) {
          return r.push(e);
        }),
        a.on("end", function () {
          return e(Buffer.concat(r));
        });
    });
  }
  function ba(r) {
    return C(this, void 0, void 0, function () {
      var t;
      return O(this, function (e) {
        switch (e.label) {
          case 0:
            return (t = Uint8Array.bind), [4, new Response(r).arrayBuffer()];
          case 1:
            return [2, new (t.apply(Uint8Array, [void 0, e.sent()]))()];
        }
      });
    });
  }
  function Ta(e) {
    for (
      var t = [1 / 0, 1 / 0, -1 / 0, -1 / 0], r = 0, a = e;
      r < a.length;
      r++
    ) {
      var i = a[r];
      switch (i.geometry.type) {
        case "Point":
          Ca(t, i.geometry.coordinates);
          break;
        case "MultiPoint":
          i.geometry.coordinates.forEach(function (e) {
            return Ca(t, e);
          });
          break;
        case "LineString":
          Oa(t, i.geometry.coordinates);
          break;
        case "MultiLineString":
          i.geometry.coordinates.forEach(function (e) {
            return Oa(t, e);
          });
          break;
        case "Polygon":
          wa(t, i.geometry.coordinates);
          break;
        case "MultiPolygon":
          i.geometry.coordinates.forEach(function (e) {
            return wa(t, e);
          });
          break;
        default:
          throw new Error(
            "The geometry type " + i.geometry.type + " isn't supported"
          );
      }
    }
    return t;
  }
  function Ca(e, t) {
    (e[0] = Math.min(e[0], t[0])),
      (e[1] = Math.min(e[1], t[1])),
      (e[2] = Math.max(e[2], t[0])),
      (e[3] = Math.max(e[3], t[1]));
  }
  function Oa(e, t) {
    for (var r = 0, a = t; r < a.length; r++) {
      var i = a[r];
      (e[0] = Math.min(e[0], i[0])),
        (e[1] = Math.min(e[1], i[1])),
        (e[2] = Math.max(e[2], i[0])),
        (e[3] = Math.max(e[3], i[1]));
    }
  }
  function wa(e, t) {
    for (var r = 0, a = t; r < a.length; r++)
      for (var i = 0, n = a[r]; i < n.length; i++) {
        var s = n[i];
        (e[0] = Math.min(e[0], s[0])),
          (e[1] = Math.min(e[1], s[1])),
          (e[2] = Math.max(e[2], s[0])),
          (e[3] = Math.max(e[3], s[1]));
      }
  }
  var Ea,
    Ia =
      (b(qa, (Ea = ha)),
      (qa.prototype.signRequest = function (e) {
        return (
          (e.url = (function (e, t, r) {
            var a = new RegExp("([?&]+" + t + "=)[^&]*", "g"),
              i = !1;
            return (
              (e = e.replace(a, function (e, t) {
                return (i = !0), t + r;
              })),
              i ||
                (e.includes("?")
                  ? (e += "&" + t + "=" + r)
                  : (e += "?" + t + "=" + r)),
              e
            );
          })(e.url, "subscription-key", this.subscriptionKey)),
          e
        );
      }),
      qa);
  function qa(e, t, r) {
    var a = Ea.call(this, e, t) || this;
    return (a.subscriptionKey = r), a;
  }
  var Aa,
    Ma =
      (b(_a, (Aa = da)),
      (_a.prototype.create = function (e, t) {
        return new Ia(e, t, this.subscriptionKey);
      }),
      _a);
  function _a(e) {
    var t = Aa.call(this) || this;
    return (t.subscriptionKey = e), t;
  }
  var xa,
    La = 409,
    Da = 404,
    Ba = 412,
    Ga = 416,
    Fa = "authorization",
    Ha = "Bearer",
    Ua = "Map-Agent",
    ka = "Ms-Am-Request-Origin",
    Va = "ServiceModule",
    ja = "x-ms-client-id",
    Wa =
      (b(Ya, (xa = ha)),
      (Ya.prototype.signRequest = function (e) {
        return (
          e.headers || (e.headers = new y()),
          e.headers.set(
            Fa,
            this.authorizationScheme + " " + this.tokenCredential.token
          ),
          e.headers.set(ja, this.tokenCredential.clientId),
          e
        );
      }),
      Ya);
  function Ya(e, t, r) {
    var a = xa.call(this, e, t) || this;
    return (a.tokenCredential = r), (a.authorizationScheme = Ha), a;
  }
  var Ja,
    Ka =
      (b(Xa, (Ja = da)),
      (Xa.prototype.create = function (e, t) {
        return new Wa(e, t, this);
      }),
      Xa);
  function Xa(e, t) {
    var r = Ja.call(this) || this;
    return (r.clientId = e), (r.token = t), r;
  }
  var $a,
    Qa =
      ((Za.prototype.toServiceClientOptions = function () {
        return {
          httpClient: this.options.HTTPClient,
          httpPipelineLogger: this.options.logger,
          requestPolicyFactories: this.factories,
        };
      }),
      Za);
  function Za(e, t) {
    void 0 === t && (t = {}), (this.factories = e), (this.options = t);
  }
  (($a = d.RetryPolicyType || (d.RetryPolicyType = {})).EXPONENTIAL =
    "exponential"),
    ($a.FIXED = "fixed");
  var ei,
    ti = {
      maxRetryDelayInMs: 12e4,
      maxTries: 4,
      retryDelayInMs: 4e3,
      retryPolicyType: d.RetryPolicyType.EXPONENTIAL,
    },
    ri =
      (b(ai, (ei = Z)),
      (ai.prototype.sendRequest = function (t) {
        return C(this, void 0, void 0, function () {
          return O(this, function (e) {
            return [2, this.attemptSendRequest(t, 1)];
          });
        });
      }),
      (ai.prototype.attemptSendRequest = function (i, n) {
        return C(this, void 0, void 0, function () {
          var t, r, a;
          return O(this, function (e) {
            switch (e.label) {
              case 0:
                (t = i.clone()), (e.label = 1);
              case 1:
                return (
                  e.trys.push([1, 3, , 4]),
                  this.logf(
                    d.HttpPipelineLogLevel.INFO,
                    "RetryPolicy: =====> Try=" + n
                  ),
                  [4, this._nextPolicy.sendRequest(t)]
                );
              case 2:
                return (r = e.sent()), this.shouldRetry(n, r) ? [3, 4] : [2, r];
              case 3:
                if (
                  ((a = e.sent()),
                  this.logf(
                    d.HttpPipelineLogLevel.ERROR,
                    "RetryPolicy: Caught error, message: " +
                      a.message +
                      ", code: " +
                      a.code
                  ),
                  !this.shouldRetry(n, r, a))
                )
                  throw a;
                return [3, 4];
              case 4:
                return [4, this.delay(n)];
              case 5:
                return e.sent(), [4, this.attemptSendRequest(i, ++n)];
              case 6:
                return [2, e.sent()];
            }
          });
        });
      }),
      (ai.prototype.shouldRetry = function (e, t, r) {
        if (e >= this.retryOptions.maxTries)
          return (
            this.logf(
              d.HttpPipelineLogLevel.INFO,
              "RetryPolicy: Attempt(s) " +
                e +
                " >= maxTries " +
                this.retryOptions.maxTries +
                ", no further try."
            ),
            !1
          );
        if (r)
          for (
            var a = 0,
              i = [
                "ETIMEDOUT",
                "ESOCKETTIMEDOUT",
                "ECONNREFUSED",
                "ECONNRESET",
                "ENOENT",
                "ENOTFOUND",
                "TIMEOUT",
                "REQUEST_SEND_ERROR",
              ];
            a < i.length;
            a++
          ) {
            var n = i[a];
            if (
              r.name.toUpperCase().includes(n) ||
              r.message.toUpperCase().includes(n) ||
              (r.code && r.code.toUpperCase().includes(n))
            )
              return (
                this.logf(
                  d.HttpPipelineLogLevel.INFO,
                  "RetryPolicy: Network error " + n + " found, will retry."
                ),
                !0
              );
          }
        if (t || r) {
          var s = t ? t.status : r ? r.statusCode : 0;
          if (503 === s || 500 === s)
            return (
              this.logf(
                d.HttpPipelineLogLevel.INFO,
                "RetryPolicy: Will retry for status code " + s + "."
              ),
              !0
            );
        }
        return !1;
      }),
      (ai.prototype.logf = function (e, t) {}),
      (ai.prototype.delay = function (r) {
        return C(this, void 0, void 0, function () {
          var t;
          return O(this, function (e) {
            switch (((t = 0), this.retryOptions.retryPolicyType)) {
              case d.RetryPolicyType.EXPONENTIAL:
                t = Math.min(
                  (Math.pow(2, r) - 1) * this.retryOptions.retryDelayInMs,
                  this.retryOptions.maxRetryDelayInMs
                );
                break;
              case d.RetryPolicyType.FIXED:
                t = this.retryOptions.retryDelayInMs;
            }
            return (
              this.logf(
                d.HttpPipelineLogLevel.INFO,
                "RetryPolicy: Delay for " + t + "ms"
              ),
              [2, u(t)]
            );
          });
        });
      }),
      ai);
  function ai(e, t, r) {
    void 0 === r && (r = ti);
    var a = ei.call(this, e, t) || this;
    return (
      (a.retryOptions = {
        retryPolicyType:
          "string" == typeof r.retryPolicyType
            ? r.retryPolicyType
            : ti.retryPolicyType,
        maxTries:
          "number" == typeof r.maxTries && 1 <= r.maxTries
            ? Math.floor(r.maxTries)
            : ti.maxTries,
        retryDelayInMs:
          "number" == typeof r.retryDelayInMs && 0 <= r.retryDelayInMs
            ? Math.min(
                r.retryDelayInMs,
                "number" == typeof r.maxRetryDelayInMs
                  ? r.maxRetryDelayInMs
                  : ti.maxRetryDelayInMs
              )
            : ti.retryDelayInMs,
        maxRetryDelayInMs:
          "number" == typeof r.maxRetryDelayInMs && 0 <= r.maxRetryDelayInMs
            ? r.maxRetryDelayInMs
            : ti.maxRetryDelayInMs,
      }),
      a
    );
  }
  var ii =
    ((ni.prototype.create = function (e, t) {
      return new ri(e, t, this.retryOptions);
    }),
    ni);
  function ni(e) {
    this.retryOptions = e;
  }
  var si,
    oi = { logWarningIfTryOverThreshold: 3e3 },
    li =
      (b(mi, (si = Z)),
      (mi.prototype.sendRequest = function (u) {
        return C(this, void 0, void 0, function () {
          var t, r, a, i, n, s, o, l, m, p;
          return O(this, function (e) {
            switch (e.label) {
              case 0:
                this.tryCount++,
                  (this.requestStartTime = new Date()),
                  1 === this.tryCount &&
                    (this.operationStartTime = this.requestStartTime),
                  (t = u.url),
                  this.log(
                    d.HttpPipelineLogLevel.INFO,
                    "'" +
                      t +
                      "'==> OUTGOING REQUEST (Try number=" +
                      this.tryCount +
                      ")."
                  ),
                  (e.label = 1);
              case 1:
                return (
                  e.trys.push([1, 3, , 4]), [4, this._nextPolicy.sendRequest(u)]
                );
              case 2:
                return (
                  (r = e.sent()),
                  (a = new Date()),
                  (i = a.getTime() - this.requestStartTime.getTime()),
                  (n = a.getTime() - this.operationStartTime.getTime()),
                  (s = d.HttpPipelineLogLevel.INFO),
                  (o = ""),
                  this.shouldLog(d.HttpPipelineLogLevel.INFO) &&
                    (o = "Successfully Received Response. "),
                  i >= this.loggingOptions.logWarningIfTryOverThreshold &&
                    this.shouldLog(d.HttpPipelineLogLevel.WARNING) &&
                    ((s = d.HttpPipelineLogLevel.WARNING),
                    (o =
                      "SLOW OPERATION. Duration > " +
                      this.loggingOptions.logWarningIfTryOverThreshold +
                      " ms. ")),
                  ((400 <= r.status &&
                    r.status <= 499 &&
                    r.status !== Da &&
                    r.status !== La &&
                    r.status !== Ba &&
                    r.status !== Ga) ||
                    (500 <= r.status && r.status <= 509)) &&
                    ((l =
                      "REQUEST ERROR: HTTP request failed with status code: " +
                      r.status +
                      ". "),
                    (o = l),
                    (s = d.HttpPipelineLogLevel.ERROR)),
                  (m =
                    "Request try:" +
                    this.tryCount +
                    ", status:" +
                    r.status +
                    " request duration:" +
                    i +
                    " ms, operation duration:" +
                    n +
                    " ms\n"),
                  this.log(s, o + m),
                  [2, r]
                );
              case 3:
                throw (
                  ((p = e.sent()),
                  this.log(
                    d.HttpPipelineLogLevel.ERROR,
                    "Unexpected failure attempting to make request. Error message: " +
                      p.message
                  ),
                  p)
                );
              case 4:
                return [2];
            }
          });
        });
      }),
      mi);
  function mi(e, t, r) {
    void 0 === r && (r = oi);
    var a = si.call(this, e, t) || this;
    return (
      (a.tryCount = 0),
      (a.operationStartTime = new Date()),
      (a.requestStartTime = new Date()),
      (a.loggingOptions = r),
      a
    );
  }
  var pi =
    ((ui.prototype.create = function (e, t) {
      return new li(e, t, this.loggingOptions);
    }),
    ui);
  function ui(e) {
    this.loggingOptions = e;
  }
  var di =
    ((yi.prototype.getOperationStatus = function () {
      return this._pollState.state;
    }),
    (yi.prototype.isFinished = function () {
      return Si(this._pollState.state);
    }),
    (yi.prototype.pollUntilFinished = function () {
      return C(this, void 0, void 0, function () {
        return O(this, function (e) {
          switch (e.label) {
            case 0:
              return this.isFinished()
                ? [3, 3]
                : [
                    4,
                    u(
                      1e3 *
                        (function (e, t) {
                          var r = 30;
                          if (null != e.longRunningOperationRetryTimeout)
                            r = e.longRunningOperationRetryTimeout;
                          else {
                            var a = t.headers.get("retry-after");
                            if (a) {
                              var i = parseInt(a);
                              Number.isNaN(i) || (r = i);
                            }
                          }
                          return r;
                        })(
                          this._azureServiceClient,
                          this._pollState.mostRecentResponse
                        )
                    ),
                  ];
            case 1:
              return e.sent(), [4, this.sendPollRequest()];
            case 2:
              return e.sent(), [3, 0];
            case 3:
              return [2, this.isFinalStatusAcceptable()];
          }
        });
      });
    }),
    (yi.prototype.shouldDoFinalGetResourceRequest = function () {
      var e = this._pollState.initialResponse.request.method;
      return (
        !this._pollState.resource &&
        ("PUT" === e || "PATCH" === e || "POST" === e)
      );
    }),
    (yi.prototype.getMostRecentResponse = function () {
      return this._pollState.mostRecentResponse;
    }),
    (yi.prototype.getOperationResponse = function () {
      return C(this, void 0, void 0, function () {
        var t, r, a;
        return O(this, function (e) {
          switch (e.label) {
            case 0:
              return this.shouldDoFinalGetResourceRequest()
                ? [4, this.doFinalGetResourceRequest()]
                : [3, 2];
            case 1:
              e.sent(), (e.label = 2);
            case 2:
              return (
                (t = this._pollState.mostRecentResponse),
                (r = T({}, t, { headers: t.headers.clone() })),
                (a = this._pollState.resource)
                  ? "string" == typeof a.valueOf()
                    ? ((r.bodyAsText = a), (r.parsedBody = JSON.parse(a)))
                    : ((r.bodyAsText = JSON.stringify(a)), (r.parsedBody = a))
                  : ((r.bodyAsText = t.bodyAsText),
                    (r.parsedBody = t.parsedBody)),
                [2, r]
              );
          }
        });
      });
    }),
    (yi.prototype.getRestError = function () {
      var e = new q("");
      if (
        ((e.request = f(this._pollState.mostRecentRequest)),
        (e.response = this._pollState.mostRecentResponse),
        (e.message =
          'Long running operation failed with status: "' +
          this._pollState.state +
          '".'),
        (e.body = this._pollState.resource),
        e.body)
      ) {
        var t = e.body.error;
        t &&
          (t.message &&
            (e.message =
              'Long running operation failed with error: "' + t.message + '".'),
          t.code && (e.code = t.code));
      }
      return e;
    }),
    (yi.prototype.updateState = function (e, t) {
      var r = this;
      return this.updateOperationStatus(e, t)
        .then(function (e) {
          (r._pollState.state = hi(e.parsedBody) || "Succeeded"),
            (r._pollState.mostRecentResponse = e),
            (r._pollState.mostRecentRequest = e.request),
            (r._pollState.resource = fi(e));
        })
        .catch(function (e) {
          var t;
          if (!e.response || !e.response.status) throw e;
          if (
            ((t = e.response.status),
            "DELETE" !== r._pollState.initialResponse.request.method ||
              t < 400 ||
              499 < t)
          )
            throw e;
        });
    }),
    (yi.prototype.updateOperationStatus = function (e, t) {
      var r = e.replace(" ", "%20"),
        a = new I(r, "GET"),
        i = this._pollState;
      (a.operationSpec = i.mostRecentRequest.operationSpec),
        (a.shouldDeserialize = t),
        (a.operationResponseGetter = ci);
      var n = i.options;
      if (n && n.customHeaders)
        for (
          var s = n.customHeaders, o = 0, l = Object.keys(s);
          o < l.length;
          o++
        ) {
          var m = l[o];
          a.headers.set(m, s[m]);
        }
      return this._azureServiceClient.sendRequest(a);
    }),
    (yi.prototype.getPollState = function () {
      return this._pollState;
    }),
    yi);
  function yi(e, t) {
    (this._azureServiceClient = e), (this._pollState = t);
  }
  function ci(e, t) {
    var r = t.status,
      a = e.responses,
      i = a[r];
    return (
      i ||
        (200 === r ? (i = a[201] || a[202]) : 201 <= r && r <= 299 && (i = {})),
      i
    );
  }
  function hi(e) {
    var t;
    return (
      e &&
        (e.provisioningState
          ? (t = e.provisioningState)
          : e.properties && (t = e.properties.provisioningState)),
      t
    );
  }
  function fi(t) {
    var e;
    try {
      t.parsedBody
        ? (e = t.parsedBody)
        : t.bodyAsText &&
          0 < t.bodyAsText.length &&
          (e = JSON.parse(t.bodyAsText));
    } catch (e) {
      var r = new q(
        'Error "' +
          e +
          '" occurred in parsing the responseBody " +\n      "while creating the PollingState for Long Running Operation- "' +
          t.bodyAsText +
          '"'
      );
      throw ((r.request = t.request), (r.response = t), r);
    }
    return e;
  }
  function Ni(e, t) {
    var r;
    switch ((null == t && (t = fi(e)), e.status)) {
      case 202:
        r = "InProgress";
        break;
      case 204:
        r = "Succeeded";
        break;
      case 201:
        r = hi(t) || "InProgress";
        break;
      case 200:
        var a = hi(t);
        r = a || (Ci(e) || Pi(e) ? "InProgress" : "Succeeded");
        break;
      default:
        r = "Failed";
    }
    return r;
  }
  var gi = ["Succeeded", "Failed", "Canceled", "Cancelled"];
  function Si(e) {
    for (var t = !1, r = 0, a = gi; r < a.length; r++) {
      if (Ri(e, a[r])) {
        t = !0;
        break;
      }
    }
    return t;
  }
  function Ri(e, t) {
    return (e && e.toLowerCase()) === (t && t.toLowerCase());
  }
  function vi(e, t) {
    var r;
    switch (t.pollStrategyType) {
      case "AzureAsyncOperation":
        r = new wi(e, t);
        break;
      case "Location":
        r = new bi(e, t);
        break;
      case "GetResource":
        r = new qi(e, t);
        break;
      default:
        throw new Error(
          'Unrecognized LRO poll strategy type: "' + t.pollStrategyType + '"'
        );
    }
    return r;
  }
  function Pi(e) {
    return e.headers.get("location");
  }
  var zi,
    bi =
      (b(Ti, (zi = di)),
      (Ti.prototype.locationStrategyShouldDeserialize = function (e) {
        var t = !1,
          r = this._pollState.initialResponse.request.method,
          a = e.status;
        return (
          (200 !== a &&
            (201 !== a || ("PUT" !== r && "PATCH" !== r)) &&
            (204 !== a || ("DELETE" !== r && "POST" !== r))) ||
            (t = !0),
          t
        );
      }),
      (Ti.prototype.sendPollRequest = function () {
        var l = this._pollState;
        return this.updateOperationStatus(
          l.locationHeaderValue,
          this.locationStrategyShouldDeserialize.bind(this)
        ).then(function (e) {
          var t = Pi(e);
          t && (l.locationHeaderValue = t),
            (l.mostRecentResponse = e),
            (l.mostRecentRequest = e.request);
          var r = l.initialResponse,
            a = r.request.method,
            i = r.status,
            n = e.status;
          if (202 === n) l.state = "InProgress";
          else if (
            200 === n ||
            (201 === n && ("PUT" === a || "PATCH" === a)) ||
            (204 === n && ("DELETE" === a || "POST" === a))
          )
            (l.state = "Succeeded"), (l.resource = fi(e));
          else {
            if (
              404 !== n ||
              "POST" !== a ||
              (200 !== i && 201 !== i && 202 !== i)
            ) {
              if (400 <= n && n <= 499) {
                var s = e.bodyAsText,
                  o = s;
                try {
                  o = JSON.parse(s).message;
                } catch (e) {}
                throw new q(o, void 0, n, f(e.request), e, s);
              }
              throw new Error(
                "The response with status code " +
                  n +
                  ' from polling for long running operation url "' +
                  l.locationHeaderValue +
                  '" is not valid.'
              );
            }
            (l.state = "Failed"), (l.resource = fi(e));
          }
        });
      }),
      (Ti.prototype.isFinalStatusAcceptable = function () {
        var e = this._pollState,
          t = e.initialResponse,
          r = t.status;
        return (
          Ri(e.state, "Succeeded") ||
          ("POST" === t.request.method &&
            404 === e.mostRecentResponse.status &&
            (200 === r || 201 === r || 202 === r))
        );
      }),
      (Ti.prototype.shouldDoFinalGetResourceRequest = function () {
        var e = this._pollState,
          t = e.initialResponse,
          r = t.request.method,
          a = t.status;
        return (
          ("POST" !== r ||
            404 !== e.mostRecentResponse.status ||
            (200 !== a && 201 !== a && 202 !== a)) &&
          (zi.prototype.shouldDoFinalGetResourceRequest.call(this) ||
            ("POST" === r && 201 === a))
        );
      }),
      (Ti.prototype.doFinalGetResourceRequest = function () {
        var e,
          t = this._pollState,
          r = t.initialResponse,
          a = r.status,
          i = r.request;
        return (
          (e =
            "POST" !== i.method || (200 !== a && 201 !== a && 202 !== a)
              ? i.url
              : t.locationHeaderValue),
          this.updateState(e, !0)
        );
      }),
      Ti);
  function Ti() {
    return (null !== zi && zi.apply(this, arguments)) || this;
  }
  function Ci(e) {
    return e.headers.get("azure-asyncoperation");
  }
  var Oi,
    wi =
      (b(Ei, (Oi = di)),
      (Ei.prototype.sendPollRequest = function () {
        var n = this._pollState;
        return this.updateOperationStatus(
          n.azureAsyncOperationHeaderValue,
          !1
        ).then(function (e) {
          var t = e.status,
            r = e.parsedBody;
          if (200 !== t && 201 !== t && 202 !== t && 204 !== t) {
            var a = new q(
              "Invalid status code (" +
                t +
                ') with response body "' +
                e.bodyAsText +
                '" occurred when polling for operation status.'
            );
            throw (
              ((a.statusCode = t),
              (a.request = f(e.request)),
              (a.response = e),
              (a.body = r),
              a)
            );
          }
          if (!r)
            throw new Error(
              "The response from long running operation does not contain a body."
            );
          if (!r.status)
            throw new Error(
              'The response "' +
                e.bodyAsText +
                '" from long running operation does not contain the status property.'
            );
          var i = Ci(e);
          i && (n.azureAsyncOperationHeaderValue = i),
            (n.state = r.status),
            (n.mostRecentResponse = e),
            (n.mostRecentRequest = e.request),
            (n.resource = fi(e));
        });
      }),
      (Ei.prototype.shouldDoFinalGetResourceRequest = function () {
        var e = this._pollState,
          t = e.initialResponse,
          r = t.request.method,
          a = !1;
        if ("PUT" === r || "PATCH" === r) a = !0;
        else if (e.locationHeaderValue) {
          var i = t.status;
          "POST" === r
            ? (a = 200 === i || 201 === i)
            : "DELETE" === r && (a = 200 === i || 202 === i);
        }
        return a;
      }),
      (Ei.prototype.doFinalGetResourceRequest = function () {
        var e = this._pollState,
          t = e.locationHeaderValue,
          r = e.initialResponse,
          a = r.request,
          i = a.url;
        if (t) {
          var n = a.method,
            s = r.status;
          (("POST" !== n || (200 !== s && 201 !== s && 202 !== s)) &&
            ("DELETE" !== n || (200 !== s && 202 !== s))) ||
            (i = t);
        }
        return this.updateState(i, !0);
      }),
      (Ei.prototype.isFinalStatusAcceptable = function () {
        var e = this._pollState,
          t = e.initialResponse,
          r = t.status;
        return (
          Ri(e.state, "Succeeded") ||
          ("POST" === t.request.method && (200 === r || 201 === r))
        );
      }),
      Ei);
  function Ei() {
    return (null !== Oi && Oi.apply(this, arguments)) || this;
  }
  var Ii,
    qi =
      (b(Ai, (Ii = di)),
      (Ai.prototype.sendPollRequest = function () {
        var i = this._pollState;
        return this.updateOperationStatus(
          i.initialResponse.request.url,
          !1
        ).then(function (e) {
          var t = e.status,
            r = e.parsedBody;
          if (200 !== t && 201 !== t && 202 !== t && 204 !== t) {
            var a = new q(
              'Invalid status code with response body "' +
                e.bodyAsText +
                '" occurred when polling for operation status.'
            );
            throw (
              ((a.statusCode = t),
              (a.request = f(e.request)),
              (a.response = e),
              (a.body = r),
              a)
            );
          }
          if (!e.parsedBody)
            throw new Error(
              "The response from long running operation does not contain a body."
            );
          (i.state = hi(e.parsedBody) || "Succeeded"),
            (i.mostRecentResponse = e),
            (i.mostRecentRequest = e.request),
            (i.resource = fi(e));
        });
      }),
      (Ai.prototype.isFinalStatusAcceptable = function () {
        return Ri(this._pollState.state, "Succeeded");
      }),
      (Ai.prototype.doFinalGetResourceRequest = function () {
        return this.sendPollRequest();
      }),
      Ai);
  function Ai() {
    return (null !== Ii && Ii.apply(this, arguments)) || this;
  }
  var Mi =
    ((_i.prototype.getInitialResponse = function () {
      return this._initialResponse;
    }),
    (_i.prototype.getMostRecentResponse = function () {
      var e = this._lroPollStrategy;
      return e ? e.getMostRecentResponse() : this._initialResponse;
    }),
    (_i.prototype.isFinished = function () {
      var e = this._lroPollStrategy;
      return !e || e.isFinished();
    }),
    (_i.prototype.isFinalStatusAcceptable = function () {
      var e,
        t = this._lroPollStrategy;
      return (
        t ? t.isFinished() && (e = t.isFinalStatusAcceptable()) : (e = !0), e
      );
    }),
    (_i.prototype.getOperationStatus = function () {
      var e = this._lroPollStrategy;
      return e ? e.getOperationStatus() : "Succeeded";
    }),
    (_i.prototype.getOperationResponse = function () {
      var e,
        t = this._lroPollStrategy;
      if (t)
        if (t.isFinished()) {
          if (!t.isFinalStatusAcceptable()) throw t.getRestError();
          e = t.getOperationResponse();
        } else e = Promise.resolve(void 0);
      else e = Promise.resolve(this._initialResponse);
      return e;
    }),
    (_i.prototype.poll = function () {
      var e = this._lroPollStrategy;
      return e
        ? e.sendPollRequest().then(function () {
            return e.getOperationStatus();
          })
        : Promise.resolve("Succeeded");
    }),
    (_i.prototype.pollUntilFinished = function () {
      return C(this, void 0, void 0, function () {
        var t;
        return O(this, function (e) {
          return [
            2,
            (t = this._lroPollStrategy)
              ? t.pollUntilFinished().then(function (e) {
                  if (e) return t.getOperationResponse().then(Li);
                  throw t.getRestError();
                })
              : Promise.resolve(Li(this._initialResponse)),
          ];
        });
      });
    }),
    (_i.prototype.getPollState = function () {
      var e = this._lroPollStrategy;
      return e ? e.getPollState() : void 0;
    }),
    _i);
  function _i(e, t) {
    (this._lroPollStrategy = e), (this._initialResponse = t);
  }
  function xi(e, t, r) {
    var a = (function (e, t, r) {
      var a,
        i,
        n = e.request.method,
        s = e.status;
      if (Ci(e)) a = "AzureAsyncOperation";
      else if (Pi(e)) a = "Location";
      else if ("PUT" === n || "PATCH" === n) a = "GetResource";
      else if (201 !== s && 202 !== s && !Si(Ni(e)))
        throw new Error(
          "Can't determine long running operation polling strategy."
        );
      if (a) {
        var o = fi(e);
        i = vi(t, {
          pollStrategyType: a,
          options: r,
          initialResponse: e,
          mostRecentResponse: e,
          mostRecentRequest: e.request,
          azureAsyncOperationHeaderValue: Ci(e),
          locationHeaderValue: Pi(e),
          resource: o,
          state: Ni(e, o),
        });
      } else i = void 0;
      return i;
    })(t, e, r);
    return new Mi(a, t);
  }
  function Li(e) {
    var t = e.request,
      r = t.operationResponseGetter,
      a = t.operationSpec;
    return la(e, r && a && r(a, e));
  }
  var Di,
    Bi = "1.3.7",
    Gi =
      (b(Fi, (Di = aa)),
      (Fi.prototype.sendLRORequest = function (e, t, r) {
        var a = this;
        return this.sendOperationRequest(e, t).then(function (e) {
          return xi(a, e._response, r);
        });
      }),
      (Fi.prototype.sendLongRunningRequest = function (e, t) {
        return this.beginLongRunningRequest(e, t)
          .then(function (e) {
            return e.pollUntilFinished();
          })
          .then(function (e) {
            return e._response;
          });
      }),
      (Fi.prototype.beginLongRunningRequest = function (e, t) {
        var r = this;
        return this.sendRequest(e).then(function (e) {
          return xi(r, e, t);
        });
      }),
      (Fi.prototype.restoreLROPoller = function (e) {
        return (function (e, t) {
          var r = vi(e, t);
          return new Mi(r, t.initialResponse);
        })(this, e);
      }),
      Fi);
  function Fi(e, t) {
    var r =
      Di.call(
        this,
        e,
        (t = (function (e) {
          e = e || {};
          null == e.generateClientRequestIdHeader &&
            (e.generateClientRequestIdHeader = !0);
          e.userAgent || (e.userAgent = Hi());
          return e;
        })(t))
      ) || this;
    r.acceptLanguage = "en-us";
    var a = e.environment;
    return (
      a && !r.baseUri && (r.baseUri = a.resourceManagerEndpointUrl),
      null != t.acceptLanguage && (r.acceptLanguage = t.acceptLanguage),
      null != t.longRunningOperationRetryTimeout &&
        (r.longRunningOperationRetryTimeout =
          t.longRunningOperationRetryTimeout),
      r
    );
  }
  function Hi() {
    var e = ge();
    return "ms-rest-azure-js/" + Bi + " " + e;
  }
  var Ui = {
      serializedName: "CloudError",
      type: {
        name: "Composite",
        className: "CloudError",
        modelProperties: {
          code: {
            required: !0,
            serializedName: "code",
            type: { name: "String" },
          },
          message: {
            required: !0,
            serializedName: "message",
            type: { name: "String" },
          },
          target: { serializedName: "target", type: { name: "String" } },
          details: {
            serializedName: "details",
            type: {
              name: "Sequence",
              element: {
                serializedName: "CloudErrorElementType",
                type: { name: "Composite", className: "CloudError" },
              },
            },
          },
          innerError: {
            required: !1,
            serializedName: "innererror",
            type: { name: "Object" },
          },
          additionalInfo: {
            required: !1,
            serializedName: "additionalInfo",
            type: {
              name: "Composite",
              className: "AdditionalInfoElement",
              modelProperties: {
                type: {
                  required: !0,
                  serializedName: "type",
                  type: { name: "String" },
                },
                info: {
                  required: !1,
                  serializedName: "info",
                  type: { name: "Object" },
                },
              },
            },
          },
        },
      },
    },
    ki = {
      serializedName: "BatchResponse_summary",
      type: {
        name: "Composite",
        className: "BatchResponseSummary",
        modelProperties: {
          successfulRequests: {
            readOnly: !0,
            serializedName: "successfulRequests",
            type: { name: "Number" },
          },
          totalRequests: {
            readOnly: !0,
            serializedName: "totalRequests",
            type: { name: "Number" },
          },
        },
      },
    },
    Vi = {
      serializedName: "BatchResponse",
      type: {
        name: "Composite",
        className: "BatchResponse",
        modelProperties: {
          summary: {
            readOnly: !0,
            serializedName: "summary",
            type: { name: "Composite", className: "BatchResponseSummary" },
          },
          batchItems: {
            readOnly: !0,
            serializedName: "batchItems",
            type: { name: "Sequence", element: { type: { name: "Object" } } },
          },
        },
      },
    },
    ji = {
      serializedName: "BatchRequestBody_batchItemsItem",
      type: {
        name: "Composite",
        className: "BatchRequestBodyBatchItemsItem",
        modelProperties: {
          query: { serializedName: "query", type: { name: "String" } },
        },
      },
    },
    Wi = {
      serializedName: "BatchRequestBody",
      type: {
        name: "Composite",
        className: "BatchRequestBody",
        modelProperties: {
          batchItems: {
            serializedName: "batchItems",
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Composite",
                  className: "BatchRequestBodyBatchItemsItem",
                },
              },
            },
          },
        },
      },
    },
    Yi = {
      serializedName: "GeoJSONGeometry",
      type: {
        name: "Composite",
        polymorphicDiscriminator: {
          serializedName: "type",
          clientName: "type",
        },
        uberParent: "GeoJSONGeometry",
        className: "GeoJSONGeometry",
        modelProperties: {
          type: {
            required: !0,
            serializedName: "type",
            type: { name: "String" },
          },
        },
      },
    },
    Ji = {
      serializedName: "LineString",
      type: {
        name: "Composite",
        polymorphicDiscriminator: Yi.type.polymorphicDiscriminator,
        uberParent: "GeoJSONGeometry",
        className: "LineString",
        modelProperties: T(T({}, Yi.type.modelProperties), {
          coordinates: {
            required: !0,
            serializedName: "coordinates",
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Sequence",
                  element: { type: { name: "Number" } },
                },
              },
            },
          },
        }),
      },
    },
    Ki = {
      serializedName: "SearchPolygonResponse",
      type: {
        name: "Composite",
        className: "SearchPolygonResponse",
        modelProperties: {
          additionalData: {
            readOnly: !0,
            serializedName: "additionalData",
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "SearchPolygonResult" },
              },
            },
          },
        },
      },
    },
    Xi = {
      serializedName: "SearchFuzzyResponse",
      type: {
        name: "Composite",
        className: "SearchFuzzyResponse",
        modelProperties: {
          summary: {
            serializedName: "summary",
            type: { name: "Composite", className: "SearchFuzzySummary" },
          },
          results: {
            readOnly: !0,
            serializedName: "results",
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "SearchFuzzyResult" },
              },
            },
          },
        },
      },
    },
    $i = {
      serializedName: "SearchPoiResponse",
      type: {
        name: "Composite",
        className: "SearchPoiResponse",
        modelProperties: {
          summary: {
            serializedName: "summary",
            type: { name: "Composite", className: "SearchPoiSummary" },
          },
          results: {
            readOnly: !0,
            serializedName: "results",
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "SearchPoiResult" },
              },
            },
          },
        },
      },
    },
    Qi = {
      serializedName: "SearchNearbyResponse",
      type: {
        name: "Composite",
        className: "SearchNearbyResponse",
        modelProperties: {
          summary: {
            serializedName: "summary",
            type: { name: "Composite", className: "SearchNearbySummary" },
          },
          results: {
            readOnly: !0,
            serializedName: "results",
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "SearchNearbyResult" },
              },
            },
          },
        },
      },
    },
    Zi = {
      serializedName: "SearchPoiCategoryResponse",
      type: {
        name: "Composite",
        className: "SearchPoiCategoryResponse",
        modelProperties: {
          summary: {
            serializedName: "summary",
            type: { name: "Composite", className: "SearchPoiCategorySummary" },
          },
          results: {
            readOnly: !0,
            serializedName: "results",
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Composite",
                  className: "SearchPoiCategoryResult",
                },
              },
            },
          },
        },
      },
    },
    en = {
      serializedName: "SearchAddressResponse",
      type: {
        name: "Composite",
        className: "SearchAddressResponse",
        modelProperties: {
          summary: {
            serializedName: "summary",
            type: { name: "Composite", className: "SearchAddressSummary" },
          },
          results: {
            readOnly: !0,
            serializedName: "results",
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "SearchAddressResult" },
              },
            },
          },
        },
      },
    },
    tn = {
      serializedName: "SearchAddressReverseResponse",
      type: {
        name: "Composite",
        className: "SearchAddressReverseResponse",
        modelProperties: {
          summary: {
            serializedName: "summary",
            type: {
              name: "Composite",
              className: "SearchAddressReverseSummary",
            },
          },
          addresses: {
            readOnly: !0,
            serializedName: "addresses",
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Composite",
                  className: "SearchAddressReverseResult",
                },
              },
            },
          },
        },
      },
    },
    rn = {
      serializedName: "SearchAddressReverseCrossStreetResponse",
      type: {
        name: "Composite",
        className: "SearchAddressReverseCrossStreetResponse",
        modelProperties: {
          summary: {
            serializedName: "summary",
            type: {
              name: "Composite",
              className: "SearchAddressReverseCrossStreetSummary",
            },
          },
          addresses: {
            readOnly: !0,
            serializedName: "addresses",
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Composite",
                  className: "SearchAddressReverseCrossStreetResult",
                },
              },
            },
          },
        },
      },
    },
    an = {
      serializedName: "SearchAddressStructuredResponse",
      type: {
        name: "Composite",
        className: "SearchAddressStructuredResponse",
        modelProperties: {
          summary: {
            serializedName: "summary",
            type: {
              name: "Composite",
              className: "SearchAddressStructuredSummary",
            },
          },
          results: {
            readOnly: !0,
            serializedName: "results",
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Composite",
                  className: "SearchAddressStructuredResult",
                },
              },
            },
          },
        },
      },
    },
    nn = {
      serializedName: "SearchGeometryResponse",
      type: {
        name: "Composite",
        className: "SearchGeometryResponse",
        modelProperties: {
          summary: {
            serializedName: "summary",
            type: { name: "Composite", className: "SearchGeometrySummary" },
          },
          results: {
            readOnly: !0,
            serializedName: "results",
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "SearchGeometryResult" },
              },
            },
          },
        },
      },
    },
    sn = {
      serializedName: "SearchAlongRouteResponse",
      type: {
        name: "Composite",
        className: "SearchAlongRouteResponse",
        modelProperties: {
          summary: {
            serializedName: "summary",
            type: { name: "Composite", className: "SearchAlongRouteSummary" },
          },
          results: {
            readOnly: !0,
            serializedName: "results",
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Composite",
                  className: "SearchAlongRouteResult",
                },
              },
            },
          },
        },
      },
    },
    on = {
      serializedName: "SearchInsideGeometryRequestBody",
      type: {
        name: "Composite",
        className: "SearchInsideGeometryRequestBody",
        modelProperties: {
          geometry: { serializedName: "geometry", type: { name: "Object" } },
        },
      },
    },
    ln = {
      serializedName: "SearchAlongRouteRequestBody",
      type: {
        name: "Composite",
        className: "SearchAlongRouteRequestBody",
        modelProperties: {
          route: {
            serializedName: "route",
            type: { name: "Composite", className: "LineString" },
          },
        },
      },
    },
    mn = {
      serializedName: "MultiPoint",
      type: {
        name: "Composite",
        polymorphicDiscriminator: Yi.type.polymorphicDiscriminator,
        uberParent: "GeoJSONGeometry",
        className: "MultiPoint",
        modelProperties: T(T({}, Yi.type.modelProperties), {
          coordinates: {
            required: !0,
            serializedName: "coordinates",
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Sequence",
                  element: { type: { name: "Number" } },
                },
              },
            },
          },
        }),
      },
    },
    pn = {
      serializedName: "Point",
      type: {
        name: "Composite",
        polymorphicDiscriminator: Yi.type.polymorphicDiscriminator,
        uberParent: "GeoJSONGeometry",
        className: "Point",
        modelProperties: T(T({}, Yi.type.modelProperties), {
          coordinates: {
            required: !0,
            serializedName: "coordinates",
            type: { name: "Sequence", element: { type: { name: "Number" } } },
          },
        }),
      },
    },
    un = {
      serializedName: "MultiPolygon",
      type: {
        name: "Composite",
        polymorphicDiscriminator: Yi.type.polymorphicDiscriminator,
        uberParent: "GeoJSONGeometry",
        className: "MultiPolygon",
        modelProperties: T(T({}, Yi.type.modelProperties), {
          coordinates: {
            required: !0,
            serializedName: "coordinates",
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Sequence",
                  element: {
                    type: {
                      name: "Sequence",
                      element: {
                        type: {
                          name: "Sequence",
                          element: { type: { name: "Number" } },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        }),
      },
    },
    dn = {
      serializedName: "GeoJSONGeometryCollection",
      type: {
        name: "Composite",
        className: "GeoJSONGeometryCollection",
        modelProperties: {
          type: { serializedName: "type", type: { name: "String" } },
          geometries: {
            required: !0,
            serializedName: "geometries",
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "GeoJSONGeometry" },
              },
            },
          },
        },
      },
    },
    yn = {
      serializedName: "Coordinate",
      type: {
        name: "Composite",
        className: "Coordinate",
        modelProperties: {
          latitude: {
            readOnly: !0,
            serializedName: "latitude",
            type: { name: "Number" },
          },
          longitude: {
            readOnly: !0,
            serializedName: "longitude",
            type: { name: "Number" },
          },
        },
      },
    },
    cn = {
      serializedName: "RouteDirectionsRequestBody_supportingPoints",
      type: {
        name: "Composite",
        className: "RouteDirectionsRequestBodySupportingPoints",
        modelProperties: T({}, dn.type.modelProperties),
      },
    },
    hn = {
      serializedName: "RouteDirectionsRequestBody",
      type: {
        name: "Composite",
        className: "RouteDirectionsRequestBody",
        modelProperties: {
          supportingPoints: {
            serializedName: "supportingPoints",
            type: {
              name: "Composite",
              className: "RouteDirectionsRequestBodySupportingPoints",
            },
          },
          avoidVignette: {
            serializedName: "avoidVignette",
            type: { name: "Sequence", element: { type: { name: "String" } } },
          },
          allowVignette: {
            serializedName: "allowVignette",
            type: { name: "Sequence", element: { type: { name: "String" } } },
          },
          avoidAreas: {
            serializedName: "avoidAreas",
            type: { name: "Composite", className: "MultiPolygon" },
          },
        },
      },
    },
    fn = {
      serializedName: "RouteDirectionsResponse",
      type: {
        name: "Composite",
        className: "RouteDirectionsResponse",
        modelProperties: {
          formatVersion: {
            readOnly: !0,
            serializedName: "formatVersion",
            type: { name: "String" },
          },
          copyright: {
            readOnly: !0,
            serializedName: "copyright",
            type: { name: "String" },
          },
          privacy: {
            readOnly: !0,
            serializedName: "privacy",
            type: { name: "String" },
          },
          routes: {
            readOnly: !0,
            serializedName: "routes",
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "RouteDirectionsResult" },
              },
            },
          },
          optimizedWaypoints: {
            readOnly: !0,
            serializedName: "optimizedWaypoints",
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Composite",
                  className: "RouteOptimizedWaypoint",
                },
              },
            },
          },
          report: {
            serializedName: "report",
            type: { name: "Composite", className: "RouteResponseReport" },
          },
        },
      },
    },
    Nn = {
      serializedName: "RouteRangeResponse",
      type: {
        name: "Composite",
        className: "RouteRangeResponse",
        modelProperties: {
          formatVersion: {
            readOnly: !0,
            serializedName: "formatVersion",
            type: { name: "String" },
          },
          copyright: {
            readOnly: !0,
            serializedName: "copyright",
            type: { name: "String" },
          },
          privacy: {
            readOnly: !0,
            serializedName: "privacy",
            type: { name: "String" },
          },
          reachableRange: {
            serializedName: "reachableRange",
            type: { name: "Composite", className: "RouteRange" },
          },
          report: {
            serializedName: "report",
            type: { name: "Composite", className: "RouteResponseReport" },
          },
        },
      },
    },
    gn = {
      serializedName: "RouteMatrixResponse",
      type: {
        name: "Composite",
        className: "RouteMatrixResponse",
        modelProperties: {
          formatVersion: {
            readOnly: !0,
            serializedName: "formatVersion",
            type: { name: "String" },
          },
          matrix: {
            readOnly: !0,
            serializedName: "matrix",
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Sequence",
                  element: {
                    type: { name: "Composite", className: "RouteMatrixResult" },
                  },
                },
              },
            },
          },
          summary: {
            serializedName: "summary",
            type: { name: "Composite", className: "RouteMatrixSummary" },
          },
        },
      },
    },
    Sn = {
      serializedName: "RouteMatrixRequestBody",
      type: {
        name: "Composite",
        className: "RouteMatrixRequestBody",
        modelProperties: {
          origins: {
            serializedName: "origins",
            type: { name: "Composite", className: "MultiPoint" },
          },
          destinations: {
            serializedName: "destinations",
            type: { name: "Composite", className: "MultiPoint" },
          },
        },
      },
    },
    Rn = {
      serializedName: "TimezoneByIdResult",
      type: {
        name: "Composite",
        className: "TimezoneByIdResult",
        modelProperties: {
          version: {
            readOnly: !0,
            serializedName: "Version",
            type: { name: "String" },
          },
          referenceUtcTimestamp: {
            readOnly: !0,
            serializedName: "ReferenceUtcTimestamp",
            type: { name: "DateTime" },
          },
          timeZones: {
            serializedName: "TimeZones",
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "TimezoneById" },
              },
            },
          },
          count: {
            readOnly: !0,
            serializedName: "Count",
            type: { name: "Number" },
          },
        },
      },
    },
    vn = {
      serializedName: "TimezoneByCoordinatesResult",
      type: {
        name: "Composite",
        className: "TimezoneByCoordinatesResult",
        modelProperties: {
          version: {
            readOnly: !0,
            serializedName: "Version",
            type: { name: "String" },
          },
          referenceUtcTimestamp: {
            readOnly: !0,
            serializedName: "ReferenceUtcTimestamp",
            type: { name: "DateTime" },
          },
          timeZones: {
            serializedName: "TimeZones",
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "TimeZoneByCoordinates" },
              },
            },
          },
          count: {
            readOnly: !0,
            serializedName: "Count",
            type: { name: "Number" },
          },
        },
      },
    },
    Pn = {
      serializedName: "TimezoneIanaVersionResult",
      type: {
        name: "Composite",
        className: "TimezoneIanaVersionResult",
        modelProperties: {
          version: {
            readOnly: !0,
            serializedName: "version",
            type: { name: "String" },
          },
        },
      },
    },
    zn = {
      serializedName: "CopyrightBoundingResult",
      type: {
        name: "Composite",
        className: "CopyrightBoundingResult",
        modelProperties: {
          formatVersion: {
            readOnly: !0,
            serializedName: "formatVersion",
            type: { name: "String" },
          },
          generalCopyrights: {
            readOnly: !0,
            serializedName: "generalCopyrights",
            type: { name: "Sequence", element: { type: { name: "String" } } },
          },
          regions: {
            readOnly: !0,
            serializedName: "regions",
            type: {
              name: "Sequence",
              element: { type: { name: "Composite", className: "Region" } },
            },
          },
        },
      },
    },
    bn = {
      serializedName: "CopyrightCaptionResult",
      type: {
        name: "Composite",
        className: "CopyrightCaptionResult",
        modelProperties: {
          formatVersion: {
            readOnly: !0,
            serializedName: "formatVersion",
            type: { name: "String" },
          },
          copyrightsCaption: {
            readOnly: !0,
            serializedName: "copyrightsCaption",
            type: { name: "String" },
          },
        },
      },
    },
    Tn = {
      serializedName: "CopyrightWorldResult",
      type: {
        name: "Composite",
        className: "CopyrightWorldResult",
        modelProperties: {
          formatVersion: {
            readOnly: !0,
            serializedName: "formatVersion",
            type: { name: "String" },
          },
          generalCopyrights: {
            readOnly: !0,
            serializedName: "generalCopyrights",
            type: { name: "Sequence", element: { type: { name: "String" } } },
          },
          regions: {
            readOnly: !0,
            serializedName: "regions",
            type: {
              name: "Sequence",
              element: { type: { name: "Composite", className: "Region" } },
            },
          },
        },
      },
    },
    Cn = {
      serializedName: "CopyrightTileResult",
      type: {
        name: "Composite",
        className: "CopyrightTileResult",
        modelProperties: {
          formatVersion: {
            readOnly: !0,
            serializedName: "formatVersion",
            type: { name: "String" },
          },
          generalCopyrights: {
            readOnly: !0,
            serializedName: "generalCopyrights",
            type: { name: "Sequence", element: { type: { name: "String" } } },
          },
          regions: {
            readOnly: !0,
            serializedName: "regions",
            type: {
              name: "Sequence",
              element: { type: { name: "Composite", className: "Region" } },
            },
          },
        },
      },
    },
    On = {
      serializedName: "Polygon",
      type: {
        name: "Composite",
        polymorphicDiscriminator: Yi.type.polymorphicDiscriminator,
        uberParent: "GeoJSONGeometry",
        className: "Polygon",
        modelProperties: T(T({}, Yi.type.modelProperties), {
          coordinates: {
            required: !0,
            serializedName: "coordinates",
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Sequence",
                  element: {
                    type: {
                      name: "Sequence",
                      element: { type: { name: "Number" } },
                    },
                  },
                },
              },
            },
          },
        }),
      },
    },
    wn = {
      serializedName: "MetroAreaResponse",
      type: {
        name: "Composite",
        className: "MetroAreaResponse",
        modelProperties: {
          results: {
            serializedName: "results",
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "MetroAreaResult" },
              },
            },
          },
        },
      },
    },
    En = {
      serializedName: "MetroAreaInfoResponse",
      type: {
        name: "Composite",
        className: "MetroAreaInfoResponse",
        modelProperties: {
          metroName: { serializedName: "metroName", type: { name: "String" } },
          transitTypes: {
            serializedName: "transitTypes",
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "TransitTypeResult" },
              },
            },
          },
          agencies: {
            serializedName: "agencies",
            type: {
              name: "Sequence",
              element: { type: { name: "Composite", className: "Agency" } },
            },
          },
          alerts: {
            serializedName: "alerts",
            type: {
              name: "Sequence",
              element: { type: { name: "Composite", className: "Alert" } },
            },
          },
        },
      },
    },
    In = {
      serializedName: "NearbyTransitResponse",
      type: {
        name: "Composite",
        className: "NearbyTransitResponse",
        modelProperties: {
          results: {
            serializedName: "results",
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "TransitObjectResult" },
              },
            },
          },
        },
      },
    },
    qn = {
      serializedName: "TransitStopInfoResponse",
      type: {
        name: "Composite",
        className: "TransitStopInfoResponse",
        modelProperties: {
          stop: {
            serializedName: "stop",
            type: { name: "Composite", className: "Stop" },
          },
          lines: {
            serializedName: "lines",
            type: {
              name: "Sequence",
              element: { type: { name: "Composite", className: "Line" } },
            },
          },
          lineGroups: {
            serializedName: "lineGroups",
            type: {
              name: "Sequence",
              element: { type: { name: "Composite", className: "LineGroup" } },
            },
          },
          alerts: {
            serializedName: "alerts",
            type: {
              name: "Sequence",
              element: { type: { name: "Composite", className: "Alert" } },
            },
          },
        },
      },
    },
    An = {
      serializedName: "TransitRouteResponse",
      type: {
        name: "Composite",
        className: "TransitRouteResponse",
        modelProperties: {
          results: {
            serializedName: "results",
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "ItineraryResult" },
              },
            },
          },
        },
      },
    },
    Mn = {
      serializedName: "TransitItineraryResponse",
      type: {
        name: "Composite",
        className: "TransitItineraryResponse",
        modelProperties: {
          departureTime: {
            serializedName: "departureTime",
            type: { name: "String" },
          },
          arrivalTime: {
            serializedName: "arrivalTime",
            type: { name: "String" },
          },
          legs: {
            serializedName: "legs",
            type: {
              name: "Sequence",
              element: { type: { name: "Composite", className: "Leg" } },
            },
          },
        },
      },
    },
    _n = {
      serializedName: "CarShareResponse",
      type: {
        name: "Composite",
        className: "CarShareResponse",
        modelProperties: {
          name: { serializedName: "name", type: { name: "String" } },
          model: { serializedName: "model", type: { name: "String" } },
          seatCount: { serializedName: "seatCount", type: { name: "Number" } },
          fuelLevel: { serializedName: "fuelLevel", type: { name: "Number" } },
          batteryLevel: {
            serializedName: "batteryLevel",
            type: { name: "Number" },
          },
          pricing: {
            serializedName: "pricing",
            type: { name: "Composite", className: "Pricing" },
          },
          position: {
            serializedName: "position",
            type: { name: "Composite", className: "Coordinate" },
          },
          operatorInfo: {
            serializedName: "operatorInfo",
            type: { name: "Composite", className: "OperatorInfo" },
          },
        },
      },
    },
    xn = {
      serializedName: "TransitDockInfoResponse",
      type: {
        name: "Composite",
        className: "TransitDockInfoResponse",
        modelProperties: {
          availableVehicles: {
            serializedName: "availableVehicles",
            type: { name: "Number" },
          },
          vacantLocations: {
            serializedName: "vacantLocations",
            type: { name: "Number" },
          },
          position: {
            serializedName: "position",
            type: { name: "Composite", className: "Coordinate" },
          },
          lastUpdated: {
            serializedName: "lastUpdated",
            type: { name: "DateTime" },
          },
          operatorInfo: {
            serializedName: "operatorInfo",
            type: { name: "Composite", className: "OperatorInfo" },
          },
        },
      },
    },
    Ln = {
      serializedName: "TransitLineInfoResponse",
      type: {
        name: "Composite",
        className: "TransitLineInfoResponse",
        modelProperties: {
          lineGroup: {
            serializedName: "lineGroup",
            type: { name: "Composite", className: "LineGroup" },
          },
          lines: {
            serializedName: "lines",
            type: {
              name: "Sequence",
              element: { type: { name: "Composite", className: "Line" } },
            },
          },
          stops: {
            serializedName: "stops",
            type: {
              name: "Sequence",
              element: { type: { name: "Composite", className: "Stop" } },
            },
          },
          patterns: {
            serializedName: "patterns",
            type: {
              name: "Sequence",
              element: { type: { name: "Composite", className: "Pattern" } },
            },
          },
          schedule: {
            serializedName: "schedule",
            type: { name: "Composite", className: "LineArrival" },
          },
        },
      },
    },
    Dn = {
      serializedName: "RealTimeArrivalsResponse",
      type: {
        name: "Composite",
        className: "RealTimeArrivalsResponse",
        modelProperties: {
          results: {
            serializedName: "results",
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "RealTimeArrivalResult" },
              },
            },
          },
        },
      },
    },
    Bn = {
      serializedName: "GeoJSONFeatureCollection",
      type: {
        name: "Composite",
        className: "GeoJSONFeatureCollection",
        modelProperties: {
          type: {
            required: !0,
            serializedName: "type",
            type: { name: "String" },
          },
          features: {
            required: !0,
            serializedName: "features",
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Composite",
                  className: "GeoJSONFeatureCollectionFeaturesItem",
                },
              },
            },
          },
        },
      },
    },
    Gn = {
      serializedName: "MultiLineString",
      type: {
        name: "Composite",
        polymorphicDiscriminator: Yi.type.polymorphicDiscriminator,
        uberParent: "GeoJSONGeometry",
        className: "MultiLineString",
        modelProperties: T(T({}, Yi.type.modelProperties), {
          coordinates: {
            required: !0,
            serializedName: "coordinates",
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Sequence",
                  element: {
                    type: {
                      name: "Sequence",
                      element: { type: { name: "Number" } },
                    },
                  },
                },
              },
            },
          },
        }),
      },
    },
    Fn = {
      serializedName: "GeofenceResponse",
      type: {
        name: "Composite",
        className: "GeofenceResponse",
        modelProperties: {
          geometries: {
            readOnly: !0,
            serializedName: "geometries",
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "GeofenceGeometry" },
              },
            },
          },
          expiredGeofenceGeometryId: {
            readOnly: !0,
            serializedName: "expiredGeofenceGeometryId",
            type: { name: "Sequence", element: { type: { name: "String" } } },
          },
          invalidPeriodGeofenceGeometryId: {
            readOnly: !0,
            serializedName: "invalidPeriodGeofenceGeometryId",
            type: { name: "Sequence", element: { type: { name: "String" } } },
          },
          isEventPublished: {
            readOnly: !0,
            serializedName: "isEventPublished",
            type: { name: "Boolean" },
          },
        },
      },
    },
    Hn = {
      serializedName: "BufferRequestBody",
      type: {
        name: "Composite",
        className: "BufferRequestBody",
        modelProperties: {
          geometries: {
            serializedName: "geometries",
            type: { name: "Composite", className: "GeoJSONFeatureCollection" },
          },
          distances: {
            serializedName: "distances",
            type: { name: "Sequence", element: { type: { name: "Number" } } },
          },
        },
      },
    },
    Un = {
      serializedName: "BufferResponse",
      type: {
        name: "Composite",
        className: "BufferResponse",
        modelProperties: {
          summary: {
            readOnly: !0,
            serializedName: "summary",
            type: { name: "Composite", className: "BufferResponseSummary" },
          },
          result: {
            serializedName: "result",
            type: { name: "Composite", className: "GeoJSONFeatureCollection" },
          },
        },
      },
    },
    kn = {
      serializedName: "GetClosestPointResponse",
      type: {
        name: "Composite",
        className: "GetClosestPointResponse",
        modelProperties: {
          summary: {
            serializedName: "summary",
            type: { name: "Composite", className: "GetClosestPointSummary" },
          },
          result: {
            serializedName: "result",
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Composite",
                  className: "ClosestPointResultEntry",
                },
              },
            },
          },
        },
      },
    },
    Vn = {
      serializedName: "PostClosestPointResponse",
      type: {
        name: "Composite",
        className: "PostClosestPointResponse",
        modelProperties: {
          summary: {
            serializedName: "summary",
            type: { name: "Composite", className: "PostClosestPointSummary" },
          },
          result: {
            serializedName: "result",
            type: {
              name: "Sequence",
              element: {
                type: {
                  name: "Composite",
                  className: "ClosestPointResultEntry",
                },
              },
            },
          },
        },
      },
    },
    jn = {
      serializedName: "GetPointInPolygonResponse",
      type: {
        name: "Composite",
        className: "GetPointInPolygonResponse",
        modelProperties: {
          summary: {
            serializedName: "summary",
            type: { name: "Composite", className: "GetPointInPolygonSummary" },
          },
          result: {
            serializedName: "result",
            type: { name: "Composite", className: "PointInPolygonResult" },
          },
        },
      },
    },
    Wn = {
      serializedName: "PostPointInPolygonResponse",
      type: {
        name: "Composite",
        className: "PostPointInPolygonResponse",
        modelProperties: {
          summary: {
            serializedName: "summary",
            type: { name: "Composite", className: "PostPointInPolygonSummary" },
          },
          result: {
            serializedName: "result",
            type: { name: "Composite", className: "PointInPolygonResult" },
          },
        },
      },
    },
    Yn = {
      serializedName: "GreatCircleDistanceResponse",
      type: {
        name: "Composite",
        className: "GreatCircleDistanceResponse",
        modelProperties: {
          summary: {
            readOnly: !0,
            serializedName: "summary",
            type: {
              name: "Composite",
              className: "GreatCircleDistanceResponseSummary",
            },
          },
          result: {
            readOnly: !0,
            serializedName: "result",
            type: {
              name: "Composite",
              className: "GreatCircleDistanceResponseResult",
            },
          },
        },
      },
    },
    Jn = {
      serializedName: "search-postsearchfuzzybatchpreview-headers",
      type: {
        name: "Composite",
        className: "SearchPostSearchFuzzyBatchPreviewHeaders",
        modelProperties: {
          location: { serializedName: "location", type: { name: "String" } },
        },
      },
    },
    Kn = {
      serializedName: "search-postsearchaddressbatchpreview-headers",
      type: {
        name: "Composite",
        className: "SearchPostSearchAddressBatchPreviewHeaders",
        modelProperties: {
          location: { serializedName: "location", type: { name: "String" } },
        },
      },
    },
    Xn = {
      serializedName: "search-postsearchaddressreversebatchpreview-headers",
      type: {
        name: "Composite",
        className: "SearchPostSearchAddressReverseBatchPreviewHeaders",
        modelProperties: {
          location: { serializedName: "location", type: { name: "String" } },
        },
      },
    },
    $n = {
      serializedName: "route-postroutematrixpreview-headers",
      type: {
        name: "Composite",
        className: "RoutePostRouteMatrixPreviewHeaders",
        modelProperties: {
          location: { serializedName: "location", type: { name: "String" } },
        },
      },
    },
    Qn = {
      serializedName: "route-postroutedirectionsbatchpreview-headers",
      type: {
        name: "Composite",
        className: "RoutePostRouteDirectionsBatchPreviewHeaders",
        modelProperties: {
          location: { serializedName: "location", type: { name: "String" } },
        },
      },
    },
    Zn = {
      serializedName: "spatial-getgeofence-headers",
      type: {
        name: "Composite",
        className: "SpatialGetGeofenceHeaders",
        modelProperties: {
          xCorrelationId: {
            serializedName: "x-correlation-id",
            type: { name: "String" },
          },
        },
      },
    },
    es = {
      serializedName: "spatial-postgeofence-headers",
      type: {
        name: "Composite",
        className: "SpatialPostGeofenceHeaders",
        modelProperties: {
          xCorrelationId: {
            serializedName: "x-correlation-id",
            type: { name: "String" },
          },
        },
      },
    },
    ts = {
      GeoJSONGeometry: Yi,
      "GeoJSONGeometry.LineString": Ji,
      "GeoJSONGeometry.MultiPoint": mn,
      "GeoJSONGeometry.Point": pn,
      "GeoJSONGeometry.MultiPolygon": un,
      "GeoJSONGeometry.Polygon": On,
      "GeoJSONGeometry.MultiLineString": Gn,
    },
    rs = Object.freeze({
      discriminators: ts,
      BatchRequestBody: Wi,
      BatchRequestBodyBatchItemsItem: ji,
      BatchResponse: Vi,
      BatchResponseSummary: ki,
      CloudError: Ui,
      CoordinateAbbreviated: {
        serializedName: "CoordinateAbbreviated",
        type: {
          name: "Composite",
          className: "CoordinateAbbreviated",
          modelProperties: {
            lat: {
              readOnly: !0,
              serializedName: "lat",
              type: { name: "Number" },
            },
            lon: {
              readOnly: !0,
              serializedName: "lon",
              type: { name: "Number" },
            },
          },
        },
      },
      DataSources: {
        serializedName: "DataSources",
        type: {
          name: "Composite",
          className: "DataSources",
          modelProperties: {
            geometry: {
              serializedName: "geometry",
              type: { name: "Composite", className: "DataSourcesGeometry" },
            },
          },
        },
      },
      DataSourcesGeometry: {
        serializedName: "DataSourcesGeometry",
        type: {
          name: "Composite",
          className: "DataSourcesGeometry",
          modelProperties: {
            id: {
              readOnly: !0,
              serializedName: "id",
              type: { name: "String" },
            },
          },
        },
      },
      GeoJSONGeometry: Yi,
      LineString: Ji,
      MultiLineString: Gn,
      MultiPoint: mn,
      MultiPolygon: un,
      Point: pn,
      Polygon: On,
      SearchAddressResponse: en,
      SearchAddressResult: {
        serializedName: "SearchAddressResult",
        type: {
          name: "Composite",
          className: "SearchAddressResult",
          modelProperties: {
            type: {
              readOnly: !0,
              serializedName: "type",
              type: { name: "String" },
            },
            id: {
              readOnly: !0,
              serializedName: "id",
              type: { name: "String" },
            },
            score: { serializedName: "score", type: { name: "Number" } },
            address: {
              serializedName: "address",
              type: { name: "Composite", className: "SearchResultAddress" },
            },
            position: {
              serializedName: "position",
              type: { name: "Composite", className: "CoordinateAbbreviated" },
            },
            viewport: {
              serializedName: "viewport",
              type: { name: "Composite", className: "SearchResultViewport" },
            },
            entryPoints: {
              serializedName: "entryPoints",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Composite",
                    className: "SearchResultEntryPoint",
                  },
                },
              },
            },
            dataSources: {
              serializedName: "dataSources",
              type: { name: "Composite", className: "DataSources" },
            },
          },
        },
      },
      SearchAddressReverseCrossStreetResponse: rn,
      SearchAddressReverseCrossStreetResult: {
        serializedName: "SearchAddressReverseCrossStreetResult",
        type: {
          name: "Composite",
          className: "SearchAddressReverseCrossStreetResult",
          modelProperties: {
            address: {
              serializedName: "address",
              type: { name: "Composite", className: "SearchResultAddress" },
            },
            position: {
              readOnly: !0,
              serializedName: "position",
              type: { name: "String" },
            },
          },
        },
      },
      SearchAddressReverseCrossStreetSummary: {
        serializedName: "SearchAddressReverseCrossStreetSummary",
        type: {
          name: "Composite",
          className: "SearchAddressReverseCrossStreetSummary",
          modelProperties: {
            queryTime: {
              readOnly: !0,
              serializedName: "queryTime",
              type: { name: "Number" },
            },
            numResults: {
              readOnly: !0,
              serializedName: "numResults",
              type: { name: "Number" },
            },
          },
        },
      },
      SearchAddressReverseResponse: tn,
      SearchAddressReverseResult: {
        serializedName: "SearchAddressReverseResult",
        type: {
          name: "Composite",
          className: "SearchAddressReverseResult",
          modelProperties: {
            address: {
              serializedName: "address",
              type: { name: "Composite", className: "SearchResultAddress" },
            },
            position: {
              readOnly: !0,
              serializedName: "position",
              type: { name: "String" },
            },
            matchType: {
              readOnly: !0,
              serializedName: "matchType",
              type: { name: "String" },
            },
          },
        },
      },
      SearchAddressReverseSummary: {
        serializedName: "SearchAddressReverseSummary",
        type: {
          name: "Composite",
          className: "SearchAddressReverseSummary",
          modelProperties: {
            queryTime: {
              readOnly: !0,
              serializedName: "queryTime",
              type: { name: "Number" },
            },
            numResults: {
              readOnly: !0,
              serializedName: "numResults",
              type: { name: "Number" },
            },
          },
        },
      },
      SearchAddressStructuredResponse: an,
      SearchAddressStructuredResult: {
        serializedName: "SearchAddressStructuredResult",
        type: {
          name: "Composite",
          className: "SearchAddressStructuredResult",
          modelProperties: {
            type: {
              readOnly: !0,
              serializedName: "type",
              type: { name: "String" },
            },
            id: {
              readOnly: !0,
              serializedName: "id",
              type: { name: "String" },
            },
            score: { serializedName: "score", type: { name: "Number" } },
            dist: { serializedName: "dist", type: { name: "Number" } },
            address: {
              serializedName: "address",
              type: { name: "Composite", className: "SearchResultAddress" },
            },
            position: {
              serializedName: "position",
              type: { name: "Composite", className: "CoordinateAbbreviated" },
            },
            viewport: {
              serializedName: "viewport",
              type: { name: "Composite", className: "SearchResultViewport" },
            },
            entryPoints: {
              serializedName: "entryPoints",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Composite",
                    className: "SearchResultEntryPoint",
                  },
                },
              },
            },
            addressRanges: {
              serializedName: "addressRanges",
              type: {
                name: "Composite",
                className: "SearchResultAddressRanges",
              },
            },
          },
        },
      },
      SearchAddressStructuredSummary: {
        serializedName: "SearchAddressStructuredSummary",
        type: {
          name: "Composite",
          className: "SearchAddressStructuredSummary",
          modelProperties: {
            query: {
              readOnly: !0,
              serializedName: "query",
              type: { name: "String" },
            },
            queryType: {
              readOnly: !0,
              serializedName: "queryType",
              type: { name: "String" },
            },
            queryTime: {
              readOnly: !0,
              serializedName: "queryTime",
              type: { name: "Number" },
            },
            numResults: {
              readOnly: !0,
              serializedName: "numResults",
              type: { name: "Number" },
            },
            limit: {
              readOnly: !0,
              serializedName: "limit",
              type: { name: "Number" },
            },
            offset: {
              readOnly: !0,
              serializedName: "offset",
              type: { name: "Number" },
            },
            totalResults: {
              readOnly: !0,
              serializedName: "totalResults",
              type: { name: "Number" },
            },
            fuzzyLevel: {
              readOnly: !0,
              serializedName: "fuzzyLevel",
              type: { name: "Number" },
            },
            geoBias: {
              serializedName: "geoBias",
              type: { name: "Composite", className: "SearchSummaryGeoBias" },
            },
          },
        },
      },
      SearchAddressSummary: {
        serializedName: "SearchAddressSummary",
        type: {
          name: "Composite",
          className: "SearchAddressSummary",
          modelProperties: {
            query: {
              readOnly: !0,
              serializedName: "query",
              type: { name: "String" },
            },
            queryType: {
              readOnly: !0,
              serializedName: "queryType",
              type: { name: "String" },
            },
            queryTime: {
              readOnly: !0,
              serializedName: "queryTime",
              type: { name: "Number" },
            },
            numResults: {
              readOnly: !0,
              serializedName: "numResults",
              type: { name: "Number" },
            },
            offset: {
              readOnly: !0,
              serializedName: "offset",
              type: { name: "Number" },
            },
            totalResults: {
              readOnly: !0,
              serializedName: "totalResults",
              type: { name: "Number" },
            },
            fuzzyLevel: {
              readOnly: !0,
              serializedName: "fuzzyLevel",
              type: { name: "Number" },
            },
          },
        },
      },
      SearchAlongRouteRequestBody: ln,
      SearchAlongRouteResponse: sn,
      SearchAlongRouteResult: {
        serializedName: "SearchAlongRouteResult",
        type: {
          name: "Composite",
          className: "SearchAlongRouteResult",
          modelProperties: {
            type: {
              readOnly: !0,
              serializedName: "type",
              type: { name: "String" },
            },
            id: {
              readOnly: !0,
              serializedName: "id",
              type: { name: "String" },
            },
            score: { serializedName: "score", type: { name: "Number" } },
            info: {
              readOnly: !0,
              serializedName: "info",
              type: { name: "String" },
            },
            entityType: {
              serializedName: "entityType",
              type: {
                name: "Enum",
                allowedValues: [
                  "Country",
                  "CountrySubdivision",
                  "CountrySecondarySubdivision",
                  "CountryTertiarySubdivision",
                  "Municipality",
                  "MunicipalitySubdivision",
                  "Neighbourhood",
                  "PostalCodeArea",
                ],
              },
            },
            poi: {
              serializedName: "poi",
              type: { name: "Composite", className: "SearchResultPoi" },
            },
            address: {
              serializedName: "address",
              type: { name: "Composite", className: "SearchResultAddress" },
            },
            position: {
              serializedName: "position",
              type: { name: "Composite", className: "CoordinateAbbreviated" },
            },
            viewport: {
              serializedName: "viewport",
              type: { name: "Composite", className: "SearchResultViewport" },
            },
            entryPoints: {
              serializedName: "entryPoints",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Composite",
                    className: "SearchResultEntryPoint",
                  },
                },
              },
            },
            dist: { serializedName: "dist", type: { name: "Number" } },
            detourTime: {
              readOnly: !0,
              serializedName: "detourTime",
              type: { name: "Number" },
            },
          },
        },
      },
      SearchAlongRouteSummary: {
        serializedName: "SearchAlongRouteSummary",
        type: {
          name: "Composite",
          className: "SearchAlongRouteSummary",
          modelProperties: {
            query: {
              readOnly: !0,
              serializedName: "query",
              type: { name: "String" },
            },
            queryType: {
              readOnly: !0,
              serializedName: "queryType",
              type: { name: "String" },
            },
            queryTime: {
              readOnly: !0,
              serializedName: "queryTime",
              type: { name: "Number" },
            },
            numResults: {
              readOnly: !0,
              serializedName: "numResults",
              type: { name: "Number" },
            },
            offset: {
              readOnly: !0,
              serializedName: "offset",
              type: { name: "Number" },
            },
            totalResults: {
              readOnly: !0,
              serializedName: "totalResults",
              type: { name: "Number" },
            },
            fuzzyLevel: {
              readOnly: !0,
              serializedName: "fuzzyLevel",
              type: { name: "Number" },
            },
          },
        },
      },
      SearchFuzzyResponse: Xi,
      SearchFuzzyResult: {
        serializedName: "SearchFuzzyResult",
        type: {
          name: "Composite",
          className: "SearchFuzzyResult",
          modelProperties: {
            type: {
              readOnly: !0,
              serializedName: "type",
              type: { name: "String" },
            },
            id: {
              readOnly: !0,
              serializedName: "id",
              type: { name: "String" },
            },
            score: { serializedName: "score", type: { name: "Number" } },
            info: {
              readOnly: !0,
              serializedName: "info",
              type: { name: "String" },
            },
            entityType: {
              serializedName: "entityType",
              type: {
                name: "Enum",
                allowedValues: [
                  "Country",
                  "CountrySubdivision",
                  "CountrySecondarySubdivision",
                  "CountryTertiarySubdivision",
                  "Municipality",
                  "MunicipalitySubdivision",
                  "Neighbourhood",
                  "PostalCodeArea",
                ],
              },
            },
            poi: {
              serializedName: "poi",
              type: { name: "Composite", className: "SearchResultPoi" },
            },
            address: {
              serializedName: "address",
              type: { name: "Composite", className: "SearchResultAddress" },
            },
            position: {
              serializedName: "position",
              type: { name: "Composite", className: "CoordinateAbbreviated" },
            },
            viewport: {
              serializedName: "viewport",
              type: { name: "Composite", className: "SearchResultViewport" },
            },
            entryPoints: {
              serializedName: "entryPoints",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Composite",
                    className: "SearchResultEntryPoint",
                  },
                },
              },
            },
            addressRanges: {
              serializedName: "addressRanges",
              type: {
                name: "Composite",
                className: "SearchResultAddressRanges",
              },
            },
            dataSources: {
              serializedName: "dataSources",
              type: { name: "Composite", className: "DataSources" },
            },
          },
        },
      },
      SearchFuzzySummary: {
        serializedName: "SearchFuzzySummary",
        type: {
          name: "Composite",
          className: "SearchFuzzySummary",
          modelProperties: {
            query: {
              readOnly: !0,
              serializedName: "query",
              type: { name: "String" },
            },
            queryType: {
              readOnly: !0,
              serializedName: "queryType",
              type: { name: "String" },
            },
            queryTime: {
              readOnly: !0,
              serializedName: "queryTime",
              type: { name: "Number" },
            },
            numResults: {
              readOnly: !0,
              serializedName: "numResults",
              type: { name: "Number" },
            },
            offset: {
              readOnly: !0,
              serializedName: "offset",
              type: { name: "Number" },
            },
            totalResults: {
              readOnly: !0,
              serializedName: "totalResults",
              type: { name: "Number" },
            },
            fuzzyLevel: {
              readOnly: !0,
              serializedName: "fuzzyLevel",
              type: { name: "Number" },
            },
          },
        },
      },
      SearchGeometryResponse: nn,
      SearchGeometryResult: {
        serializedName: "SearchGeometryResult",
        type: {
          name: "Composite",
          className: "SearchGeometryResult",
          modelProperties: {
            type: {
              readOnly: !0,
              serializedName: "type",
              type: { name: "String" },
            },
            id: {
              readOnly: !0,
              serializedName: "id",
              type: { name: "String" },
            },
            score: { serializedName: "score", type: { name: "Number" } },
            info: {
              readOnly: !0,
              serializedName: "info",
              type: { name: "String" },
            },
            entityType: {
              serializedName: "entityType",
              type: {
                name: "Enum",
                allowedValues: [
                  "Country",
                  "CountrySubdivision",
                  "CountrySecondarySubdivision",
                  "CountryTertiarySubdivision",
                  "Municipality",
                  "MunicipalitySubdivision",
                  "Neighbourhood",
                  "PostalCodeArea",
                ],
              },
            },
            poi: {
              serializedName: "poi",
              type: { name: "Composite", className: "SearchResultPoi" },
            },
            address: {
              serializedName: "address",
              type: { name: "Composite", className: "SearchResultAddress" },
            },
            position: {
              serializedName: "position",
              type: { name: "Composite", className: "CoordinateAbbreviated" },
            },
            viewport: {
              serializedName: "viewport",
              type: { name: "Composite", className: "SearchResultViewport" },
            },
            entryPoints: {
              serializedName: "entryPoints",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Composite",
                    className: "SearchResultEntryPoint",
                  },
                },
              },
            },
          },
        },
      },
      SearchGeometrySummary: {
        serializedName: "SearchGeometrySummary",
        type: {
          name: "Composite",
          className: "SearchGeometrySummary",
          modelProperties: {
            query: {
              readOnly: !0,
              serializedName: "query",
              type: { name: "String" },
            },
            queryType: {
              readOnly: !0,
              serializedName: "queryType",
              type: { name: "String" },
            },
            queryTime: {
              readOnly: !0,
              serializedName: "queryTime",
              type: { name: "Number" },
            },
            numResults: {
              readOnly: !0,
              serializedName: "numResults",
              type: { name: "Number" },
            },
            offset: {
              readOnly: !0,
              serializedName: "offset",
              type: { name: "Number" },
            },
            totalResults: {
              readOnly: !0,
              serializedName: "totalResults",
              type: { name: "Number" },
            },
            fuzzyLevel: {
              readOnly: !0,
              serializedName: "fuzzyLevel",
              type: { name: "Number" },
            },
          },
        },
      },
      SearchInsideGeometryRequestBody: on,
      SearchNearbyResponse: Qi,
      SearchNearbyResult: {
        serializedName: "SearchNearbyResult",
        type: {
          name: "Composite",
          className: "SearchNearbyResult",
          modelProperties: {
            type: {
              readOnly: !0,
              serializedName: "type",
              type: { name: "String" },
            },
            id: {
              readOnly: !0,
              serializedName: "id",
              type: { name: "String" },
            },
            score: { serializedName: "score", type: { name: "Number" } },
            dist: { serializedName: "dist", type: { name: "Number" } },
            info: {
              readOnly: !0,
              serializedName: "info",
              type: { name: "String" },
            },
            poi: {
              serializedName: "poi",
              type: { name: "Composite", className: "SearchResultPoi" },
            },
            address: {
              serializedName: "address",
              type: { name: "Composite", className: "SearchResultAddress" },
            },
            position: {
              serializedName: "position",
              type: { name: "Composite", className: "CoordinateAbbreviated" },
            },
            viewport: {
              serializedName: "viewport",
              type: { name: "Composite", className: "SearchResultViewport" },
            },
            entryPoints: {
              serializedName: "entryPoints",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Composite",
                    className: "SearchResultEntryPoint",
                  },
                },
              },
            },
          },
        },
      },
      SearchNearbySummary: {
        serializedName: "SearchNearbySummary",
        type: {
          name: "Composite",
          className: "SearchNearbySummary",
          modelProperties: {
            queryType: {
              readOnly: !0,
              serializedName: "queryType",
              type: { name: "String" },
            },
            queryTime: {
              readOnly: !0,
              serializedName: "queryTime",
              type: { name: "Number" },
            },
            numResults: {
              readOnly: !0,
              serializedName: "numResults",
              type: { name: "Number" },
            },
            offset: {
              readOnly: !0,
              serializedName: "offset",
              type: { name: "Number" },
            },
            totalResults: {
              readOnly: !0,
              serializedName: "totalResults",
              type: { name: "Number" },
            },
            fuzzyLevel: {
              readOnly: !0,
              serializedName: "fuzzyLevel",
              type: { name: "Number" },
            },
            geoBias: {
              serializedName: "geoBias",
              type: { name: "Composite", className: "SearchSummaryGeoBias" },
            },
          },
        },
      },
      SearchPoiCategoryResponse: Zi,
      SearchPoiCategoryResult: {
        serializedName: "SearchPoiCategoryResult",
        type: {
          name: "Composite",
          className: "SearchPoiCategoryResult",
          modelProperties: {
            type: {
              readOnly: !0,
              serializedName: "type",
              type: { name: "String" },
            },
            id: {
              readOnly: !0,
              serializedName: "id",
              type: { name: "String" },
            },
            score: { serializedName: "score", type: { name: "Number" } },
            dist: { serializedName: "dist", type: { name: "Number" } },
            info: {
              readOnly: !0,
              serializedName: "info",
              type: { name: "String" },
            },
            entityType: {
              serializedName: "entityType",
              type: {
                name: "Enum",
                allowedValues: [
                  "Country",
                  "CountrySubdivision",
                  "CountrySecondarySubdivision",
                  "CountryTertiarySubdivision",
                  "Municipality",
                  "MunicipalitySubdivision",
                  "Neighbourhood",
                  "PostalCodeArea",
                ],
              },
            },
            poi: {
              serializedName: "poi",
              type: { name: "Composite", className: "SearchResultPoi" },
            },
            address: {
              serializedName: "address",
              type: { name: "Composite", className: "SearchResultAddress" },
            },
            position: {
              serializedName: "position",
              type: { name: "Composite", className: "CoordinateAbbreviated" },
            },
            viewport: {
              serializedName: "viewport",
              type: { name: "Composite", className: "SearchResultViewport" },
            },
            entryPoints: {
              serializedName: "entryPoints",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Composite",
                    className: "SearchResultEntryPoint",
                  },
                },
              },
            },
          },
        },
      },
      SearchPoiCategorySummary: {
        serializedName: "SearchPoiCategorySummary",
        type: {
          name: "Composite",
          className: "SearchPoiCategorySummary",
          modelProperties: {
            query: {
              readOnly: !0,
              serializedName: "query",
              type: { name: "String" },
            },
            queryType: {
              readOnly: !0,
              serializedName: "queryType",
              type: { name: "String" },
            },
            queryTime: {
              readOnly: !0,
              serializedName: "queryTime",
              type: { name: "Number" },
            },
            numResults: {
              readOnly: !0,
              serializedName: "numResults",
              type: { name: "Number" },
            },
            offset: {
              readOnly: !0,
              serializedName: "offset",
              type: { name: "Number" },
            },
            totalResults: {
              readOnly: !0,
              serializedName: "totalResults",
              type: { name: "Number" },
            },
            fuzzyLevel: {
              readOnly: !0,
              serializedName: "fuzzyLevel",
              type: { name: "Number" },
            },
            geoBias: {
              serializedName: "geoBias",
              type: { name: "Composite", className: "SearchSummaryGeoBias" },
            },
          },
        },
      },
      SearchPoiResponse: $i,
      SearchPoiResult: {
        serializedName: "SearchPoiResult",
        type: {
          name: "Composite",
          className: "SearchPoiResult",
          modelProperties: {
            type: {
              readOnly: !0,
              serializedName: "type",
              type: { name: "String" },
            },
            id: {
              readOnly: !0,
              serializedName: "id",
              type: { name: "String" },
            },
            score: { serializedName: "score", type: { name: "Number" } },
            dist: { serializedName: "dist", type: { name: "Number" } },
            info: {
              readOnly: !0,
              serializedName: "info",
              type: { name: "String" },
            },
            entityType: {
              serializedName: "entityType",
              type: {
                name: "Enum",
                allowedValues: [
                  "Country",
                  "CountrySubdivision",
                  "CountrySecondarySubdivision",
                  "CountryTertiarySubdivision",
                  "Municipality",
                  "MunicipalitySubdivision",
                  "Neighbourhood",
                  "PostalCodeArea",
                ],
              },
            },
            poi: {
              serializedName: "poi",
              type: { name: "Composite", className: "SearchResultPoi" },
            },
            address: {
              serializedName: "address",
              type: { name: "Composite", className: "SearchResultAddress" },
            },
            position: {
              serializedName: "position",
              type: { name: "Composite", className: "CoordinateAbbreviated" },
            },
            viewport: {
              serializedName: "viewport",
              type: { name: "Composite", className: "SearchResultViewport" },
            },
            entryPoints: {
              serializedName: "entryPoints",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Composite",
                    className: "SearchResultEntryPoint",
                  },
                },
              },
            },
          },
        },
      },
      SearchPoiSummary: {
        serializedName: "SearchPoiSummary",
        type: {
          name: "Composite",
          className: "SearchPoiSummary",
          modelProperties: {
            query: {
              readOnly: !0,
              serializedName: "query",
              type: { name: "String" },
            },
            queryType: {
              readOnly: !0,
              serializedName: "queryType",
              type: { name: "String" },
            },
            queryTime: {
              readOnly: !0,
              serializedName: "queryTime",
              type: { name: "Number" },
            },
            numResults: {
              readOnly: !0,
              serializedName: "numResults",
              type: { name: "Number" },
            },
            offset: {
              readOnly: !0,
              serializedName: "offset",
              type: { name: "Number" },
            },
            totalResults: {
              readOnly: !0,
              serializedName: "totalResults",
              type: { name: "Number" },
            },
            fuzzyLevel: {
              readOnly: !0,
              serializedName: "fuzzyLevel",
              type: { name: "Number" },
            },
            geoBias: {
              serializedName: "geoBias",
              type: { name: "Composite", className: "SearchSummaryGeoBias" },
            },
          },
        },
      },
      SearchPolygonResponse: Ki,
      SearchPolygonResult: {
        serializedName: "SearchPolygonResult",
        type: {
          name: "Composite",
          className: "SearchPolygonResult",
          modelProperties: {
            providerID: {
              readOnly: !0,
              serializedName: "providerID",
              type: { name: "String" },
            },
            error: {
              readOnly: !0,
              serializedName: "error",
              type: { name: "String" },
            },
            geometryData: {
              serializedName: "geometryData",
              type: { name: "Object" },
            },
          },
        },
      },
      SearchPostSearchAddressBatchPreviewHeaders: Kn,
      SearchPostSearchAddressReverseBatchPreviewHeaders: Xn,
      SearchPostSearchFuzzyBatchPreviewHeaders: Jn,
      SearchResultAddress: {
        serializedName: "SearchResultAddress",
        type: {
          name: "Composite",
          className: "SearchResultAddress",
          modelProperties: {
            buildingNumber: {
              readOnly: !0,
              serializedName: "buildingNumber",
              type: { name: "String" },
            },
            street: {
              readOnly: !0,
              serializedName: "street",
              type: { name: "String" },
            },
            crossStreet: {
              readOnly: !0,
              serializedName: "crossStreet",
              type: { name: "String" },
            },
            streetNumber: {
              readOnly: !0,
              serializedName: "streetNumber",
              type: { name: "String" },
            },
            routeNumbers: {
              readOnly: !0,
              serializedName: "routeNumbers",
              type: { name: "Sequence", element: { type: { name: "Number" } } },
            },
            streetName: {
              readOnly: !0,
              serializedName: "streetName",
              type: { name: "String" },
            },
            streetNameAndNumber: {
              readOnly: !0,
              serializedName: "streetNameAndNumber",
              type: { name: "String" },
            },
            municipality: {
              readOnly: !0,
              serializedName: "municipality",
              type: { name: "String" },
            },
            municipalitySubdivision: {
              readOnly: !0,
              serializedName: "municipalitySubdivision",
              type: { name: "String" },
            },
            countryTertiarySubdivision: {
              readOnly: !0,
              serializedName: "countryTertiarySubdivision",
              type: { name: "String" },
            },
            countrySecondarySubdivision: {
              readOnly: !0,
              serializedName: "countrySecondarySubdivision",
              type: { name: "String" },
            },
            countrySubdivision: {
              readOnly: !0,
              serializedName: "countrySubdivision",
              type: { name: "String" },
            },
            postalCode: {
              readOnly: !0,
              serializedName: "postalCode",
              type: { name: "String" },
            },
            extendedPostalCode: {
              readOnly: !0,
              serializedName: "extendedPostalCode",
              type: { name: "String" },
            },
            countryCode: {
              readOnly: !0,
              serializedName: "countryCode",
              type: { name: "String" },
            },
            country: {
              readOnly: !0,
              serializedName: "country",
              type: { name: "String" },
            },
            countryCodeISO3: {
              readOnly: !0,
              serializedName: "countryCodeISO3",
              type: { name: "String" },
            },
            freeformAddress: {
              readOnly: !0,
              serializedName: "freeformAddress",
              type: { name: "String" },
            },
            countrySubdivisionName: {
              readOnly: !0,
              serializedName: "countrySubdivisionName",
              type: { name: "String" },
            },
            localName: {
              readOnly: !0,
              serializedName: "localName",
              type: { name: "String" },
            },
          },
        },
      },
      SearchResultAddressRanges: {
        serializedName: "SearchResultAddressRanges",
        type: {
          name: "Composite",
          className: "SearchResultAddressRanges",
          modelProperties: {
            rangeLeft: {
              serializedName: "rangeLeft",
              type: { name: "String" },
            },
            rangeRight: {
              serializedName: "rangeRight",
              type: { name: "String" },
            },
            from: {
              serializedName: "from",
              type: { name: "Composite", className: "CoordinateAbbreviated" },
            },
            to: {
              serializedName: "to",
              type: { name: "Composite", className: "CoordinateAbbreviated" },
            },
          },
        },
      },
      SearchResultEntryPoint: {
        serializedName: "SearchResultEntryPoint",
        type: {
          name: "Composite",
          className: "SearchResultEntryPoint",
          modelProperties: {
            type: {
              readOnly: !0,
              serializedName: "type",
              type: { name: "String" },
            },
            position: {
              serializedName: "position",
              type: { name: "Composite", className: "CoordinateAbbreviated" },
            },
          },
        },
      },
      SearchResultPoi: {
        serializedName: "SearchResultPoi",
        type: {
          name: "Composite",
          className: "SearchResultPoi",
          modelProperties: {
            name: {
              readOnly: !0,
              serializedName: "name",
              type: { name: "String" },
            },
            phone: {
              readOnly: !0,
              serializedName: "phone",
              type: { name: "String" },
            },
            url: {
              readOnly: !0,
              serializedName: "url",
              type: { name: "String" },
            },
            categories: {
              readOnly: !0,
              serializedName: "categories",
              type: { name: "Sequence", element: { type: { name: "String" } } },
            },
            classifications: {
              readOnly: !0,
              serializedName: "classifications",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Composite",
                    className: "SearchResultPoiClassification",
                  },
                },
              },
            },
            brands: {
              readOnly: !0,
              serializedName: "brands",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Composite",
                    className: "SearchResultPoiBrand",
                  },
                },
              },
            },
          },
        },
      },
      SearchResultPoiBrand: {
        serializedName: "SearchResultPoiBrand",
        type: {
          name: "Composite",
          className: "SearchResultPoiBrand",
          modelProperties: {
            name: {
              readOnly: !0,
              serializedName: "name",
              type: { name: "String" },
            },
          },
        },
      },
      SearchResultPoiClassification: {
        serializedName: "SearchResultPoiClassification",
        type: {
          name: "Composite",
          className: "SearchResultPoiClassification",
          modelProperties: {
            code: {
              readOnly: !0,
              serializedName: "code",
              type: { name: "String" },
            },
            names: {
              readOnly: !0,
              serializedName: "names",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Composite",
                    className: "SearchResultPoiClassificationName",
                  },
                },
              },
            },
          },
        },
      },
      SearchResultPoiClassificationName: {
        serializedName: "SearchResultPoiClassificationName",
        type: {
          name: "Composite",
          className: "SearchResultPoiClassificationName",
          modelProperties: {
            nameLocale: {
              readOnly: !0,
              serializedName: "nameLocale",
              type: { name: "String" },
            },
            name: {
              readOnly: !0,
              serializedName: "name",
              type: { name: "String" },
            },
          },
        },
      },
      SearchResultViewport: {
        serializedName: "SearchResultViewport",
        type: {
          name: "Composite",
          className: "SearchResultViewport",
          modelProperties: {
            topLeftPoint: {
              serializedName: "topLeftPoint",
              type: { name: "Composite", className: "CoordinateAbbreviated" },
            },
            btmRightPoint: {
              serializedName: "btmRightPoint",
              type: { name: "Composite", className: "CoordinateAbbreviated" },
            },
          },
        },
      },
      SearchSummaryGeoBias: {
        serializedName: "SearchSummaryGeoBias",
        type: {
          name: "Composite",
          className: "SearchSummaryGeoBias",
          modelProperties: {
            lat: {
              readOnly: !0,
              serializedName: "lat",
              type: { name: "Number" },
            },
            lon: {
              readOnly: !0,
              serializedName: "lon",
              type: { name: "Number" },
            },
          },
        },
      },
    }),
    as = {
      parameterPath: ["options", "accelerationEfficiency"],
      mapper: {
        serializedName: "accelerationEfficiency",
        type: { name: "Number" },
      },
    },
    is = {
      parameterPath: "acceptLanguage",
      mapper: {
        serializedName: "accept-language",
        defaultValue: "en-US",
        type: { name: "String" },
      },
    },
    ns = {
      parameterPath: ["options", "acceptLanguage"],
      mapper: { serializedName: "Accept-Language", type: { name: "String" } },
    },
    ss = {
      parameterPath: ["options", "agency"],
      mapper: {
        serializedName: "agency",
        type: { name: "Sequence", element: { type: { name: "String" } } },
      },
      collectionFormat: Ye.Csv,
    },
    os = {
      parameterPath: ["options", "agencyType"],
      mapper: {
        serializedName: "agencyType",
        type: {
          name: "Enum",
          allowedValues: ["agencyId", "agencyKey", "agencyName"],
        },
      },
    },
    ls = {
      parameterPath: ["options", "alternativeType"],
      mapper: {
        serializedName: "alternativeType",
        type: { name: "Enum", allowedValues: ["anyRoute", "betterRoute"] },
      },
    },
    ms = {
      parameterPath: "apiVersion",
      mapper: {
        required: !0,
        serializedName: "api-version",
        type: { name: "String" },
      },
    },
    ps = {
      parameterPath: ["options", "arriveAt"],
      mapper: { serializedName: "arriveAt", type: { name: "DateTime" } },
    },
    us = {
      parameterPath: ["options", "auxiliaryPowerInkW"],
      mapper: {
        serializedName: "auxiliaryPowerInkW",
        type: { name: "String" },
      },
    },
    ds = {
      parameterPath: ["options", "auxiliaryPowerInLitersPerHour"],
      mapper: {
        serializedName: "auxiliaryPowerInLitersPerHour",
        type: { name: "Number" },
      },
    },
    ys = {
      parameterPath: ["options", "avoid"],
      mapper: {
        serializedName: "avoid",
        type: {
          name: "Enum",
          allowedValues: [
            "tollRoads",
            "motorways",
            "ferries",
            "unpavedRoads",
            "carpools",
            "alreadyUsedRoads",
            "borderCrossings",
          ],
        },
      },
    },
    cs = {
      parameterPath: ["options", "brandSet"],
      mapper: {
        serializedName: "brandSet",
        type: { name: "Sequence", element: { type: { name: "String" } } },
      },
      collectionFormat: Ye.Csv,
    },
    hs = {
      parameterPath: ["options", "btmRight"],
      mapper: { serializedName: "btmRight", type: { name: "String" } },
    },
    fs = {
      parameterPath: ["options", "computeBestOrder"],
      mapper: { serializedName: "computeBestOrder", type: { name: "Boolean" } },
    },
    Ns = {
      parameterPath: ["options", "computeTravelTimeFor"],
      mapper: {
        serializedName: "computeTravelTimeFor",
        type: { name: "Enum", allowedValues: ["none", "all"] },
      },
    },
    gs = {
      parameterPath: ["options", "connectorSet"],
      mapper: {
        serializedName: "connectorSet",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Enum",
              allowedValues: [
                "StandardHouseholdCountrySpecific",
                "IEC62196Type1",
                "IEC62196Type1CCS",
                "IEC62196Type2CableAttached",
                "IEC62196Type2Outlet",
                "IEC62196Type2CCS",
                "IEC62196Type3",
                "Chademo",
                "IEC60309AC1PhaseBlue",
                "IEC60309DCWhite",
                "Tesla",
              ],
            },
          },
        },
      },
      collectionFormat: Ye.Csv,
    },
    Ss = {
      parameterPath: ["options", "constantSpeedConsumptionInkWhPerHundredkm"],
      mapper: {
        serializedName: "constantSpeedConsumptionInkWhPerHundredkm",
        type: { name: "String" },
      },
    },
    Rs = {
      parameterPath: [
        "options",
        "constantSpeedConsumptionInLitersPerHundredkm",
      ],
      mapper: {
        serializedName: "constantSpeedConsumptionInLitersPerHundredkm",
        type: { name: "Number" },
      },
    },
    vs = {
      parameterPath: ["options", "countrySet"],
      mapper: {
        serializedName: "countrySet",
        type: { name: "Sequence", element: { type: { name: "String" } } },
      },
      collectionFormat: Ye.Csv,
    },
    Ps = {
      parameterPath: ["options", "currentChargeInkWh"],
      mapper: {
        serializedName: "currentChargeInkWh",
        type: { name: "String" },
      },
    },
    zs = {
      parameterPath: ["options", "currentFuelInLiters"],
      mapper: {
        serializedName: "currentFuelInLiters",
        type: { name: "Number" },
      },
    },
    bs = {
      parameterPath: ["options", "decelerationEfficiency"],
      mapper: {
        serializedName: "decelerationEfficiency",
        type: { name: "Number" },
      },
    },
    Ts = {
      parameterPath: ["options", "departAt"],
      mapper: { serializedName: "departAt", type: { name: "DateTime" } },
    },
    Cs = {
      parameterPath: "detailType",
      mapper: {
        required: !0,
        serializedName: "detailType",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Enum",
              allowedValues: [
                "agencies",
                "alerts",
                "alertDetails",
                "transitTypes",
              ],
            },
          },
        },
      },
      collectionFormat: Ye.Csv,
    },
    Os = {
      parameterPath: ["options", "detailType"],
      mapper: {
        serializedName: "detailType",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Enum",
              allowedValues: [
                "alerts",
                "alertDetails",
                "lines",
                "stops",
                "schedule",
                "patterns",
              ],
            },
          },
        },
      },
      collectionFormat: Ye.Csv,
    },
    ws = {
      parameterPath: ["options", "detailType"],
      mapper: {
        serializedName: "detailType",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Enum",
              allowedValues: ["alerts", "alertDetails", "lines", "lineGroups"],
            },
          },
        },
      },
      collectionFormat: Ye.Csv,
    },
    Es = {
      parameterPath: ["options", "detailType"],
      mapper: {
        serializedName: "detailType",
        type: {
          name: "Sequence",
          element: {
            type: { name: "Enum", allowedValues: ["geometry", "schedule"] },
          },
        },
      },
      collectionFormat: Ye.Csv,
    },
    Is = {
      parameterPath: "deviceId",
      mapper: {
        required: !0,
        serializedName: "deviceId",
        type: { name: "String" },
      },
    },
    qs = {
      parameterPath: ["options", "downhillEfficiency"],
      mapper: {
        serializedName: "downhillEfficiency",
        type: { name: "Number" },
      },
    },
    As = {
      parameterPath: ["options", "extendedPostalCodesFor"],
      mapper: {
        serializedName: "extendedPostalCodesFor",
        type: { name: "String" },
      },
    },
    Ms = {
      parameterPath: "format",
      mapper: {
        required: !0,
        isConstant: !0,
        serializedName: "format",
        defaultValue: "json",
        type: { name: "String" },
      },
    },
    _s = {
      parameterPath: "format",
      mapper: {
        required: !0,
        isConstant: !0,
        serializedName: "format",
        defaultValue: "png",
        type: { name: "String" },
      },
    },
    xs = {
      parameterPath: ["options", "fuelEnergyDensityInMJoulesPerLiter"],
      mapper: {
        serializedName: "fuelEnergyDensityInMJoulesPerLiter",
        type: { name: "Number" },
      },
    },
    Ls = {
      parameterPath: ["options", "heading"],
      mapper: {
        serializedName: "heading",
        constraints: { InclusiveMaximum: 360, InclusiveMinimum: -360 },
        type: { name: "Number" },
      },
    },
    Ds = {
      parameterPath: ["options", "hilliness"],
      mapper: {
        serializedName: "hilliness",
        type: { name: "Enum", allowedValues: ["low", "normal", "high"] },
      },
    },
    Bs = {
      parameterPath: ["options", "idxSet"],
      mapper: {
        serializedName: "idxSet",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Enum",
              allowedValues: ["Addr", "Geo", "PAD", "POI", "Str", "Xstr"],
            },
          },
        },
      },
      collectionFormat: Ye.Csv,
    },
    Gs = {
      parameterPath: ["options", "instructionsType"],
      mapper: {
        serializedName: "instructionsType",
        type: { name: "Enum", allowedValues: ["coded", "text", "tagged"] },
      },
    },
    Fs = {
      parameterPath: ["options", "isAsync"],
      mapper: { serializedName: "isAsync", type: { name: "Boolean" } },
    },
    Hs = {
      parameterPath: ["options", "language"],
      mapper: { serializedName: "language", type: { name: "String" } },
    },
    Us = {
      parameterPath: ["options", "lat"],
      mapper: { serializedName: "lat", type: { name: "Number" } },
    },
    ks = {
      parameterPath: "lat",
      mapper: { required: !0, serializedName: "lat", type: { name: "Number" } },
    },
    Vs = {
      parameterPath: ["options", "limit"],
      mapper: {
        serializedName: "limit",
        constraints: { InclusiveMaximum: 100, InclusiveMinimum: 1 },
        type: { name: "Number" },
      },
    },
    js = {
      parameterPath: ["options", "limit"],
      mapper: { serializedName: "limit", type: { name: "Number" } },
    },
    Ws = {
      parameterPath: ["options", "lon"],
      mapper: { serializedName: "lon", type: { name: "Number" } },
    },
    Ys = {
      parameterPath: "lon",
      mapper: { required: !0, serializedName: "lon", type: { name: "Number" } },
    },
    Js = {
      parameterPath: ["options", "maxAlternatives"],
      mapper: {
        serializedName: "maxAlternatives",
        constraints: { InclusiveMaximum: 5, InclusiveMinimum: 0 },
        type: { name: "Number" },
      },
    },
    Ks = {
      parameterPath: ["options", "maxChargeInkWh"],
      mapper: { serializedName: "maxChargeInkWh", type: { name: "String" } },
    },
    Xs = {
      parameterPath: "metroId",
      mapper: {
        required: !0,
        serializedName: "metroId",
        type: { name: "Number" },
      },
    },
    $s = {
      parameterPath: ["options", "minDeviationDistance"],
      mapper: {
        serializedName: "minDeviationDistance",
        type: { name: "Number" },
      },
    },
    Qs = {
      parameterPath: ["options", "minDeviationTime"],
      mapper: { serializedName: "minDeviationTime", type: { name: "Number" } },
    },
    Zs = {
      parameterPath: ["options", "mode"],
      mapper: {
        serializedName: "mode",
        type: { name: "Enum", allowedValues: ["All", "EnterAndExit"] },
      },
    },
    eo = {
      parameterPath: ["options", "modeType"],
      mapper: {
        serializedName: "modeType",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Enum",
              allowedValues: ["walk", "bike", "publicTransit"],
            },
          },
        },
      },
      collectionFormat: Ye.Csv,
    },
    to = {
      parameterPath: ["options", "numberOfClosestPoints"],
      mapper: {
        serializedName: "numberOfClosestPoints",
        type: { name: "Number" },
      },
    },
    ro = {
      parameterPath: ["options", "objectType"],
      mapper: {
        serializedName: "objectType",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Enum",
              allowedValues: [
                "stop",
                "docklessBike",
                "docklessElectricBike",
                "docklessElectricScooter",
                "docklessScooter",
                "docklessMoped",
                "carShare",
                "docklessVehicle",
                "bikeDock",
              ],
            },
          },
        },
      },
      collectionFormat: Ye.Csv,
    },
    ao = {
      parameterPath: ["options", "ofs"],
      mapper: {
        serializedName: "ofs",
        constraints: { InclusiveMaximum: 1900, InclusiveMinimum: 0 },
        type: { name: "Number" },
      },
    },
    io = {
      parameterPath: ["options", "openingHours"],
      mapper: {
        serializedName: "openingHours",
        type: { name: "Enum", allowedValues: ["nextSevenDays"] },
      },
    },
    no = {
      parameterPath: ["options", "options"],
      mapper: {
        serializedName: "options",
        type: {
          name: "Enum",
          allowedValues: ["none", "zoneInfo", "transitions", "all"],
        },
      },
    },
    so = {
      parameterPath: ["options", "path"],
      mapper: {
        serializedName: "path",
        type: { name: "Sequence", element: { type: { name: "String" } } },
      },
      collectionFormat: Ye.Multi,
    },
    oo = {
      parameterPath: ["options", "pins"],
      mapper: {
        serializedName: "pins",
        type: { name: "Sequence", element: { type: { name: "String" } } },
      },
      collectionFormat: Ye.Multi,
    },
    lo = {
      parameterPath: "query",
      mapper: {
        required: !0,
        serializedName: "query",
        type: { name: "String" },
      },
    },
    mo = {
      parameterPath: ["options", "radius"],
      mapper: { serializedName: "radius", type: { name: "Number" } },
    },
    po = {
      parameterPath: ["options", "report"],
      mapper: { serializedName: "report", type: { name: "String" } },
    },
    uo = {
      parameterPath: ["options", "routeRepresentation"],
      mapper: {
        serializedName: "routeRepresentation",
        type: {
          name: "Enum",
          allowedValues: ["polyline", "summaryOnly", "none"],
        },
      },
    },
    yo = {
      parameterPath: ["options", "routeType"],
      mapper: {
        serializedName: "routeType",
        type: {
          name: "Enum",
          allowedValues: ["fastest", "shortest", "eco", "thrilling"],
        },
      },
    },
    co = {
      parameterPath: ["options", "searchBuffer"],
      mapper: {
        serializedName: "searchBuffer",
        constraints: { InclusiveMaximum: 500, InclusiveMinimum: 0 },
        type: { name: "Number" },
      },
    },
    ho = {
      parameterPath: ["options", "sectionType"],
      mapper: {
        serializedName: "sectionType",
        type: {
          name: "Enum",
          allowedValues: [
            "carTrain",
            "country",
            "ferry",
            "motorway",
            "pedestrian",
            "tollRoad",
            "tollVignette",
            "traffic",
            "travelMode",
            "tunnel",
          ],
        },
      },
    },
    fo = {
      parameterPath: ["options", "text"],
      mapper: { serializedName: "text", type: { name: "String" } },
    },
    No = {
      parameterPath: ["options", "timeStamp"],
      mapper: { serializedName: "timeStamp", type: { name: "DateTime" } },
    },
    go = {
      parameterPath: ["options", "topLeft"],
      mapper: { serializedName: "topLeft", type: { name: "String" } },
    },
    So = {
      parameterPath: ["options", "traffic"],
      mapper: { serializedName: "traffic", type: { name: "Boolean" } },
    },
    Ro = {
      parameterPath: ["options", "transitionsFrom"],
      mapper: { serializedName: "transitionsFrom", type: { name: "DateTime" } },
    },
    vo = {
      parameterPath: ["options", "transitionsYears"],
      mapper: { serializedName: "transitionsYears", type: { name: "Number" } },
    },
    Po = {
      parameterPath: ["options", "transitType"],
      mapper: {
        serializedName: "transitType",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Enum",
              allowedValues: [
                "bus",
                "cableCar",
                "ferry",
                "funicular",
                "gondola",
                "rail",
                "tram",
                "subway",
              ],
            },
          },
        },
      },
      collectionFormat: Ye.Csv,
    },
    zo = {
      parameterPath: ["options", "travelMode"],
      mapper: {
        serializedName: "travelMode",
        type: {
          name: "Enum",
          allowedValues: [
            "car",
            "truck",
            "taxi",
            "bus",
            "van",
            "motorcycle",
            "bicycle",
            "pedestrian",
          ],
        },
      },
    },
    bo = {
      parameterPath: ["options", "typeahead"],
      mapper: { serializedName: "typeahead", type: { name: "Boolean" } },
    },
    To = {
      parameterPath: "udid",
      mapper: {
        required: !0,
        serializedName: "udid",
        type: { name: "String" },
      },
    },
    Co = {
      parameterPath: ["options", "uphillEfficiency"],
      mapper: { serializedName: "uphillEfficiency", type: { name: "Number" } },
    },
    Oo = {
      parameterPath: ["options", "userTime"],
      mapper: { serializedName: "userTime", type: { name: "String" } },
    },
    wo = {
      parameterPath: ["options", "vehicleAxleWeight"],
      mapper: { serializedName: "vehicleAxleWeight", type: { name: "Number" } },
    },
    Eo = {
      parameterPath: ["options", "vehicleCommercial"],
      mapper: {
        serializedName: "vehicleCommercial",
        type: { name: "Boolean" },
      },
    },
    Io = {
      parameterPath: ["options", "vehicleEngineType"],
      mapper: {
        serializedName: "vehicleEngineType",
        type: { name: "Enum", allowedValues: ["combustion", "electric"] },
      },
    },
    qo = {
      parameterPath: ["options", "vehicleHeading"],
      mapper: {
        serializedName: "vehicleHeading",
        constraints: { InclusiveMaximum: 359, InclusiveMinimum: 0 },
        type: { name: "Number" },
      },
    },
    Ao = {
      parameterPath: ["options", "vehicleHeight"],
      mapper: { serializedName: "vehicleHeight", type: { name: "Number" } },
    },
    Mo = {
      parameterPath: ["options", "vehicleLength"],
      mapper: { serializedName: "vehicleLength", type: { name: "Number" } },
    },
    _o = {
      parameterPath: ["options", "vehicleLoadType"],
      mapper: {
        serializedName: "vehicleLoadType",
        type: {
          name: "Enum",
          allowedValues: [
            "USHazmatClass1",
            "USHazmatClass2",
            "USHazmatClass3",
            "USHazmatClass4",
            "USHazmatClass5",
            "USHazmatClass6",
            "USHazmatClass7",
            "USHazmatClass8",
            "USHazmatClass9",
            "otherHazmatExplosive",
            "otherHazmatGeneral",
            "otherHazmatHarmfulToWater",
          ],
        },
      },
    },
    xo = {
      parameterPath: ["options", "vehicleMaxSpeed"],
      mapper: { serializedName: "vehicleMaxSpeed", type: { name: "Number" } },
    },
    Lo = {
      parameterPath: ["options", "vehicleWeight"],
      mapper: { serializedName: "vehicleWeight", type: { name: "Number" } },
    },
    Do = {
      parameterPath: ["options", "vehicleWidth"],
      mapper: { serializedName: "vehicleWidth", type: { name: "Number" } },
    },
    Bo = {
      parameterPath: ["options", "view"],
      mapper: { serializedName: "view", type: { name: "String" } },
    },
    Go = {
      parameterPath: ["options", "windingness"],
      mapper: {
        serializedName: "windingness",
        type: { name: "Enum", allowedValues: ["low", "normal", "high"] },
      },
    },
    Fo = {
      parameterPath: "xTileIndex",
      mapper: { required: !0, serializedName: "x", type: { name: "Number" } },
    },
    Ho = {
      parameterPath: "yTileIndex",
      mapper: { required: !0, serializedName: "y", type: { name: "Number" } },
    },
    Uo = {
      parameterPath: "zoom",
      mapper: {
        required: !0,
        serializedName: "zoom",
        type: { name: "Number" },
      },
    },
    ko =
      ((Vo.prototype.getSearchPolygon = function (e, t, r) {
        return this.client.sendOperationRequest(
          { geometries: e, options: t },
          Wo,
          r
        );
      }),
      (Vo.prototype.getSearchFuzzy = function (e, t, r) {
        return this.client.sendOperationRequest(
          { query: e, options: t },
          Yo,
          r
        );
      }),
      (Vo.prototype.getSearchPOI = function (e, t, r) {
        return this.client.sendOperationRequest(
          { query: e, options: t },
          Jo,
          r
        );
      }),
      (Vo.prototype.getSearchNearby = function (e, t, r, a) {
        return this.client.sendOperationRequest(
          { lat: e, lon: t, options: r },
          Ko,
          a
        );
      }),
      (Vo.prototype.getSearchPOICategory = function (e, t, r) {
        return this.client.sendOperationRequest(
          { query: e, options: t },
          Xo,
          r
        );
      }),
      (Vo.prototype.getSearchAddress = function (e, t, r) {
        return this.client.sendOperationRequest(
          { query: e, options: t },
          $o,
          r
        );
      }),
      (Vo.prototype.getSearchAddressReverse = function (e, t, r) {
        return this.client.sendOperationRequest(
          { query: e, options: t },
          Qo,
          r
        );
      }),
      (Vo.prototype.getSearchAddressReverseCrossStreet = function (e, t, r) {
        return this.client.sendOperationRequest(
          { query: e, options: t },
          Zo,
          r
        );
      }),
      (Vo.prototype.getSearchAddressStructured = function (e, t, r) {
        return this.client.sendOperationRequest(
          { countryCode: e, options: t },
          el,
          r
        );
      }),
      (Vo.prototype.postSearchInsideGeometry = function (e, t, r, a) {
        return this.client.sendOperationRequest(
          { query: e, searchInsideGeometryRequestBody: t, options: r },
          tl,
          a
        );
      }),
      (Vo.prototype.postSearchAlongRoute = function (e, t, r, a, i) {
        return this.client.sendOperationRequest(
          {
            query: e,
            maxDetourTime: t,
            searchAlongRouteRequestBody: r,
            options: a,
          },
          rl,
          i
        );
      }),
      (Vo.prototype.postSearchFuzzyBatchPreview = function (e, t) {
        return this.beginPostSearchFuzzyBatchPreview(e, t).then(function (e) {
          return e.pollUntilFinished();
        });
      }),
      (Vo.prototype.postSearchAddressBatchPreview = function (e, t) {
        return this.beginPostSearchAddressBatchPreview(e, t).then(function (e) {
          return e.pollUntilFinished();
        });
      }),
      (Vo.prototype.postSearchAddressReverseBatchPreview = function (e, t) {
        return this.beginPostSearchAddressReverseBatchPreview(e, t).then(
          function (e) {
            return e.pollUntilFinished();
          }
        );
      }),
      (Vo.prototype.beginPostSearchFuzzyBatchPreview = function (e, t) {
        return this.client.sendLRORequest(
          { searchFuzzyBatchRequestBody: e, options: t },
          al,
          t
        );
      }),
      (Vo.prototype.beginPostSearchAddressBatchPreview = function (e, t) {
        return this.client.sendLRORequest(
          { searchAddressBatchRequestBody: e, options: t },
          il,
          t
        );
      }),
      (Vo.prototype.beginPostSearchAddressReverseBatchPreview = function (
        e,
        t
      ) {
        return this.client.sendLRORequest(
          { searchAddressReverseBatchRequestBody: e, options: t },
          nl,
          t
        );
      }),
      Vo);
  function Vo(e) {
    this.client = e;
  }
  var jo = new S(rs),
    Wo = {
      httpMethod: "GET",
      path: "search/polygon/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        {
          parameterPath: "geometries",
          mapper: {
            required: !0,
            serializedName: "geometries",
            type: { name: "String" },
          },
        },
      ],
      headerParameters: [is],
      responses: { 200: { bodyMapper: Ki }, default: { bodyMapper: Ui } },
      serializer: jo,
    },
    Yo = {
      httpMethod: "GET",
      path: "search/fuzzy/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        lo,
        bo,
        Vs,
        ao,
        vs,
        Us,
        Ws,
        mo,
        go,
        hs,
        Hs,
        As,
        {
          parameterPath: ["options", "minFuzzyLevel"],
          mapper: {
            serializedName: "minFuzzyLevel",
            constraints: { InclusiveMaximum: 4, InclusiveMinimum: 1 },
            type: { name: "Number" },
          },
        },
        {
          parameterPath: ["options", "maxFuzzyLevel"],
          mapper: {
            serializedName: "maxFuzzyLevel",
            constraints: { InclusiveMaximum: 4, InclusiveMinimum: 1 },
            type: { name: "Number" },
          },
        },
        Bs,
        cs,
        gs,
        Bo,
        io,
      ],
      headerParameters: [is],
      responses: { 200: { bodyMapper: Xi }, default: { bodyMapper: Ui } },
      serializer: jo,
    },
    Jo = {
      httpMethod: "GET",
      path: "search/poi/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        lo,
        bo,
        Vs,
        ao,
        vs,
        Us,
        Ws,
        mo,
        go,
        hs,
        Hs,
        As,
        cs,
        gs,
        Bo,
        io,
      ],
      headerParameters: [is],
      responses: { 200: { bodyMapper: $i }, default: { bodyMapper: Ui } },
      serializer: jo,
    },
    Ko = {
      httpMethod: "GET",
      path: "search/nearby/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, ks, Ys, Vs, ao, vs, mo, Hs, As, cs, gs, Bo],
      headerParameters: [is],
      responses: { 200: { bodyMapper: Qi }, default: { bodyMapper: Ui } },
      serializer: jo,
    },
    Xo = {
      httpMethod: "GET",
      path: "search/poi/category/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        lo,
        bo,
        Vs,
        vs,
        Us,
        Ws,
        mo,
        go,
        hs,
        Hs,
        As,
        cs,
        gs,
        Bo,
        io,
      ],
      headerParameters: [is],
      responses: { 200: { bodyMapper: Zi }, default: { bodyMapper: Ui } },
      serializer: jo,
    },
    $o = {
      httpMethod: "GET",
      path: "search/address/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        lo,
        bo,
        Vs,
        {
          parameterPath: ["options", "ofs"],
          mapper: {
            serializedName: "ofs",
            constraints: { InclusiveMinimum: 0 },
            type: { name: "Number" },
          },
        },
        vs,
        Us,
        Ws,
        mo,
        go,
        hs,
        Hs,
        As,
        Bo,
      ],
      headerParameters: [is],
      responses: { 200: { bodyMapper: en }, default: { bodyMapper: Ui } },
      serializer: jo,
    },
    Qo = {
      httpMethod: "GET",
      path: "search/address/reverse/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        lo,
        Hs,
        {
          parameterPath: ["options", "returnSpeedLimit"],
          mapper: {
            serializedName: "returnSpeedLimit",
            type: { name: "Boolean" },
          },
        },
        Ls,
        mo,
        {
          parameterPath: ["options", "number"],
          mapper: { serializedName: "number", type: { name: "String" } },
        },
        {
          parameterPath: ["options", "returnRoadUse"],
          mapper: {
            serializedName: "returnRoadUse",
            type: { name: "Boolean" },
          },
        },
        {
          parameterPath: ["options", "roadUse"],
          mapper: { serializedName: "roadUse", type: { name: "String" } },
        },
        {
          parameterPath: ["options", "allowFreeformNewline"],
          mapper: {
            serializedName: "allowFreeformNewline",
            type: { name: "Boolean" },
          },
        },
        {
          parameterPath: ["options", "returnMatchType"],
          mapper: {
            serializedName: "returnMatchType",
            type: { name: "Boolean" },
          },
        },
        {
          parameterPath: ["options", "entityType"],
          mapper: {
            serializedName: "entityType",
            type: {
              name: "Enum",
              allowedValues: [
                "Country",
                "CountrySubdivision",
                "CountrySecondarySubdivision",
                "CountryTertiarySubdivision",
                "Municipality",
                "MunicipalitySubdivision",
                "Neighbourhood",
                "PostalCodeArea",
              ],
            },
          },
        },
        Bo,
      ],
      headerParameters: [is],
      responses: { 200: { bodyMapper: tn }, default: { bodyMapper: Ui } },
      serializer: jo,
    },
    Zo = {
      httpMethod: "GET",
      path: "search/address/reverse/crossStreet/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, lo, Ls, mo, Hs, Bo],
      headerParameters: [is],
      responses: { 200: { bodyMapper: rn }, default: { bodyMapper: Ui } },
      serializer: jo,
    },
    el = {
      httpMethod: "GET",
      path: "search/address/structured/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        Hs,
        {
          parameterPath: "countryCode",
          mapper: {
            required: !0,
            serializedName: "countryCode",
            type: { name: "String" },
          },
        },
        js,
        {
          parameterPath: ["options", "ofs"],
          mapper: { serializedName: "ofs", type: { name: "Number" } },
        },
        {
          parameterPath: ["options", "streetNumber"],
          mapper: { serializedName: "streetNumber", type: { name: "String" } },
        },
        {
          parameterPath: ["options", "streetName"],
          mapper: { serializedName: "streetName", type: { name: "String" } },
        },
        {
          parameterPath: ["options", "crossStreet"],
          mapper: { serializedName: "crossStreet", type: { name: "String" } },
        },
        {
          parameterPath: ["options", "municipality"],
          mapper: { serializedName: "municipality", type: { name: "String" } },
        },
        {
          parameterPath: ["options", "municipalitySubdivision"],
          mapper: {
            serializedName: "municipalitySubdivision",
            type: { name: "String" },
          },
        },
        {
          parameterPath: ["options", "countryTertiarySubdivision"],
          mapper: {
            serializedName: "countryTertiarySubdivision",
            type: { name: "String" },
          },
        },
        {
          parameterPath: ["options", "countrySecondarySubdivision"],
          mapper: {
            serializedName: "countrySecondarySubdivision",
            type: { name: "String" },
          },
        },
        {
          parameterPath: ["options", "countrySubdivision"],
          mapper: {
            serializedName: "countrySubdivision",
            type: { name: "String" },
          },
        },
        {
          parameterPath: ["options", "postalCode"],
          mapper: { serializedName: "postalCode", type: { name: "String" } },
        },
        As,
        Bo,
      ],
      headerParameters: [is],
      responses: { 200: { bodyMapper: an }, default: { bodyMapper: Ui } },
      serializer: jo,
    },
    tl = {
      httpMethod: "POST",
      path: "search/geometry/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, lo, Vs, Hs, As, Bs, Bo, io],
      headerParameters: [is],
      requestBody: {
        parameterPath: "searchInsideGeometryRequestBody",
        mapper: T(T({}, on), { required: !0 }),
      },
      responses: { 200: { bodyMapper: nn }, default: { bodyMapper: Ui } },
      serializer: jo,
    },
    rl = {
      httpMethod: "POST",
      path: "search/alongRoute/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        lo,
        {
          parameterPath: "maxDetourTime",
          mapper: {
            required: !0,
            serializedName: "maxDetourTime",
            constraints: { InclusiveMaximum: 3600 },
            type: { name: "Number" },
          },
        },
        {
          parameterPath: ["options", "limit"],
          mapper: {
            serializedName: "limit",
            constraints: { InclusiveMaximum: 20 },
            type: { name: "Number" },
          },
        },
        cs,
        gs,
        Bo,
        io,
      ],
      headerParameters: [is],
      requestBody: {
        parameterPath: "searchAlongRouteRequestBody",
        mapper: T(T({}, ln), { required: !0 }),
      },
      responses: { 200: { bodyMapper: sn }, default: { bodyMapper: Ui } },
      serializer: jo,
    },
    al = {
      httpMethod: "POST",
      path: "search/fuzzy/batch/{format}",
      urlParameters: [Ms],
      queryParameters: [ms],
      headerParameters: [is],
      requestBody: {
        parameterPath: "searchFuzzyBatchRequestBody",
        mapper: T(T({}, Wi), { required: !0 }),
      },
      responses: {
        200: { bodyMapper: Vi, headersMapper: Jn },
        202: { headersMapper: Jn },
        default: { bodyMapper: Ui },
      },
      serializer: jo,
    },
    il = {
      httpMethod: "POST",
      path: "search/address/batch/{format}",
      urlParameters: [Ms],
      queryParameters: [ms],
      headerParameters: [is],
      requestBody: {
        parameterPath: "searchAddressBatchRequestBody",
        mapper: T(T({}, Wi), { required: !0 }),
      },
      responses: {
        200: { bodyMapper: Vi, headersMapper: Kn },
        202: { headersMapper: Kn },
        default: { bodyMapper: Ui },
      },
      serializer: jo,
    },
    nl = {
      httpMethod: "POST",
      path: "search/address/reverse/batch/{format}",
      urlParameters: [Ms],
      queryParameters: [ms],
      headerParameters: [is],
      requestBody: {
        parameterPath: "searchAddressReverseBatchRequestBody",
        mapper: T(T({}, Wi), { required: !0 }),
      },
      responses: {
        200: { bodyMapper: Vi, headersMapper: Xn },
        202: { headersMapper: Xn },
        default: { bodyMapper: Ui },
      },
      serializer: jo,
    },
    sl = Object.freeze({
      discriminators: ts,
      BatchRequestBody: Wi,
      BatchRequestBodyBatchItemsItem: ji,
      BatchResponse: Vi,
      BatchResponseSummary: ki,
      CloudError: Ui,
      Coordinate: yn,
      GeoJSONGeometry: Yi,
      GeoJSONGeometryCollection: dn,
      LineString: Ji,
      MultiLineString: Gn,
      MultiPoint: mn,
      MultiPolygon: un,
      Point: pn,
      Polygon: On,
      RouteDirectionsRequestBody: hn,
      RouteDirectionsRequestBodySupportingPoints: cn,
      RouteDirectionsResponse: fn,
      RouteDirectionsResult: {
        serializedName: "RouteDirectionsResult",
        type: {
          name: "Composite",
          className: "RouteDirectionsResult",
          modelProperties: {
            summary: {
              serializedName: "summary",
              type: { name: "Composite", className: "RouteDirectionsSummary" },
            },
            legs: {
              readOnly: !0,
              serializedName: "legs",
              type: {
                name: "Sequence",
                element: {
                  type: { name: "Composite", className: "RouteResultLeg" },
                },
              },
            },
            sections: {
              readOnly: !0,
              serializedName: "sections",
              type: {
                name: "Sequence",
                element: {
                  type: { name: "Composite", className: "RouteResultSection" },
                },
              },
            },
            guidance: {
              serializedName: "guidance",
              type: { name: "Composite", className: "RouteResultGuidance" },
            },
          },
        },
      },
      RouteDirectionsSummary: {
        serializedName: "RouteDirectionsSummary",
        type: {
          name: "Composite",
          className: "RouteDirectionsSummary",
          modelProperties: {
            lengthInMeters: {
              readOnly: !0,
              serializedName: "lengthInMeters",
              type: { name: "Number" },
            },
            travelTimeInSeconds: {
              readOnly: !0,
              serializedName: "travelTimeInSeconds",
              type: { name: "Number" },
            },
            trafficDelayInSeconds: {
              readOnly: !0,
              serializedName: "trafficDelayInSeconds",
              type: { name: "Number" },
            },
            departureTime: {
              readOnly: !0,
              serializedName: "departureTime",
              type: { name: "String" },
            },
            arrivalTime: {
              readOnly: !0,
              serializedName: "arrivalTime",
              type: { name: "String" },
            },
          },
        },
      },
      RouteMatrixRequestBody: Sn,
      RouteMatrixResponse: gn,
      RouteMatrixResult: {
        serializedName: "RouteMatrixResult",
        type: {
          name: "Composite",
          className: "RouteMatrixResult",
          modelProperties: {
            statusCode: {
              readOnly: !0,
              serializedName: "statusCode",
              type: { name: "Number" },
            },
            response: {
              serializedName: "response",
              type: {
                name: "Composite",
                className: "RouteMatrixResultResponse",
              },
            },
          },
        },
      },
      RouteMatrixResultResponse: {
        serializedName: "RouteMatrixResultResponse",
        type: {
          name: "Composite",
          className: "RouteMatrixResultResponse",
          modelProperties: {
            routeSummary: {
              serializedName: "routeSummary",
              type: { name: "Composite", className: "RouteResultLegSummary" },
            },
          },
        },
      },
      RouteMatrixSummary: {
        serializedName: "RouteMatrixSummary",
        type: {
          name: "Composite",
          className: "RouteMatrixSummary",
          modelProperties: {
            successfulRoutes: {
              readOnly: !0,
              serializedName: "successfulRoutes",
              type: { name: "Number" },
            },
            totalRoutes: {
              readOnly: !0,
              serializedName: "totalRoutes",
              type: { name: "Number" },
            },
          },
        },
      },
      RouteOptimizedWaypoint: {
        serializedName: "RouteOptimizedWaypoint",
        type: {
          name: "Composite",
          className: "RouteOptimizedWaypoint",
          modelProperties: {
            providedIndex: {
              readOnly: !0,
              serializedName: "providedIndex",
              type: { name: "Number" },
            },
            optimizedIndex: {
              readOnly: !0,
              serializedName: "optimizedIndex",
              type: { name: "Number" },
            },
          },
        },
      },
      RoutePostRouteDirectionsBatchPreviewHeaders: Qn,
      RoutePostRouteMatrixPreviewHeaders: $n,
      RouteRange: {
        serializedName: "RouteRange",
        type: {
          name: "Composite",
          className: "RouteRange",
          modelProperties: {
            center: {
              serializedName: "center",
              type: { name: "Composite", className: "Coordinate" },
            },
            boundary: {
              readOnly: !0,
              serializedName: "boundary",
              type: {
                name: "Sequence",
                element: {
                  type: { name: "Composite", className: "Coordinate" },
                },
              },
            },
          },
        },
      },
      RouteRangeResponse: Nn,
      RouteResponseReport: {
        serializedName: "RouteResponseReport",
        type: {
          name: "Composite",
          className: "RouteResponseReport",
          modelProperties: {
            effectiveSettings: {
              readOnly: !0,
              serializedName: "effectiveSettings",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Composite",
                    className: "RouteResponseReportEffectiveSetting",
                  },
                },
              },
            },
          },
        },
      },
      RouteResponseReportEffectiveSetting: {
        serializedName: "RouteResponseReportEffectiveSetting",
        type: {
          name: "Composite",
          className: "RouteResponseReportEffectiveSetting",
          modelProperties: {
            key: {
              readOnly: !0,
              serializedName: "key",
              type: { name: "String" },
            },
            value: {
              readOnly: !0,
              serializedName: "value",
              type: { name: "String" },
            },
          },
        },
      },
      RouteResultGuidance: {
        serializedName: "RouteResultGuidance",
        type: {
          name: "Composite",
          className: "RouteResultGuidance",
          modelProperties: {
            instructions: {
              readOnly: !0,
              serializedName: "instructions",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Composite",
                    className: "RouteResultInstruction",
                  },
                },
              },
            },
            instructionGroups: {
              readOnly: !0,
              serializedName: "instructionGroups",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Composite",
                    className: "RouteResultInstructionGroup",
                  },
                },
              },
            },
          },
        },
      },
      RouteResultInstruction: {
        serializedName: "RouteResultInstruction",
        type: {
          name: "Composite",
          className: "RouteResultInstruction",
          modelProperties: {
            routeOffsetInMeters: {
              readOnly: !0,
              serializedName: "routeOffsetInMeters",
              type: { name: "Number" },
            },
            travelTimeInSeconds: {
              readOnly: !0,
              serializedName: "travelTimeInSeconds",
              type: { name: "Number" },
            },
            point: {
              serializedName: "point",
              type: { name: "Composite", className: "Coordinate" },
            },
            instructionType: {
              serializedName: "instructionType",
              type: {
                name: "Enum",
                allowedValues: [
                  "TURN",
                  "ROAD_CHANGE",
                  "LOCATION_DEPARTURE",
                  "LOCATION_ARRIVAL",
                  "DIRECTION_INFO",
                  "LOCATION_WAYPOINT",
                ],
              },
            },
            street: {
              readOnly: !0,
              serializedName: "street",
              type: { name: "String" },
            },
            countryCode: {
              readOnly: !0,
              serializedName: "countryCode",
              type: { name: "String" },
            },
            possibleCombineWithNext: {
              readOnly: !0,
              serializedName: "possibleCombineWithNext",
              type: { name: "Boolean" },
            },
            drivingSide: {
              readOnly: !0,
              serializedName: "drivingSide",
              type: { name: "Enum", allowedValues: ["LEFT", "RIGHT"] },
            },
            maneuver: {
              readOnly: !0,
              serializedName: "maneuver",
              type: {
                name: "Enum",
                allowedValues: [
                  "ARRIVE",
                  "ARRIVE_LEFT",
                  "ARRIVE_RIGHT",
                  "DEPART",
                  "STRAIGHT",
                  "KEEP_RIGHT",
                  "BEAR_RIGHT",
                  "TURN_RIGHT",
                  "SHARP_RIGHT",
                  "KEEP_LEFT",
                  "BEAR_LEFT",
                  "TURN_LEFT",
                  "SHARP_LEFT",
                  "MAKE_UTURN",
                  "ENTER_MOTORWAY",
                  "ENTER_FREEWAY",
                  "ENTER_HIGHWAY",
                  "TAKE_EXIT",
                  "MOTORWAY_EXIT_LEFT",
                  "MOTORWAY_EXIT_RIGHT",
                  "TAKE_FERRY",
                  "ROUNDABOUT_CROSS",
                  "ROUNDABOUT_RIGHT",
                  "ROUNDABOUT_LEFT",
                  "ROUNDABOUT_BACK",
                  "TRY_MAKE_UTURN",
                  "FOLLOW",
                  "SWITCH_PARALLEL_ROAD",
                  "SWITCH_MAIN_ROAD",
                  "ENTRANCE_RAMP",
                  "WAYPOINT_LEFT",
                  "WAYPOINT_RIGHT",
                  "WAYPOINT_REACHED",
                ],
              },
            },
            message: {
              readOnly: !0,
              serializedName: "message",
              type: { name: "String" },
            },
          },
        },
      },
      RouteResultInstructionGroup: {
        serializedName: "RouteResultInstructionGroup",
        type: {
          name: "Composite",
          className: "RouteResultInstructionGroup",
          modelProperties: {
            firstInstructionIndex: {
              readOnly: !0,
              serializedName: "firstInstructionIndex",
              type: { name: "Number" },
            },
            lastInstructionIndex: {
              readOnly: !0,
              serializedName: "lastInstructionIndex",
              type: { name: "Number" },
            },
            groupLengthInMeters: {
              readOnly: !0,
              serializedName: "groupLengthInMeters",
              type: { name: "Number" },
            },
            groupMessage: {
              readOnly: !0,
              serializedName: "groupMessage",
              type: { name: "String" },
            },
          },
        },
      },
      RouteResultLeg: {
        serializedName: "RouteResultLeg",
        type: {
          name: "Composite",
          className: "RouteResultLeg",
          modelProperties: {
            summary: {
              serializedName: "summary",
              type: { name: "Composite", className: "RouteResultLegSummary" },
            },
            points: {
              readOnly: !0,
              serializedName: "points",
              type: {
                name: "Sequence",
                element: {
                  type: { name: "Composite", className: "Coordinate" },
                },
              },
            },
          },
        },
      },
      RouteResultLegSummary: {
        serializedName: "RouteResultLegSummary",
        type: {
          name: "Composite",
          className: "RouteResultLegSummary",
          modelProperties: {
            lengthInMeters: {
              readOnly: !0,
              serializedName: "lengthInMeters",
              type: { name: "Number" },
            },
            travelTimeInSeconds: {
              readOnly: !0,
              serializedName: "travelTimeInSeconds",
              type: { name: "Number" },
            },
            trafficDelayInSeconds: {
              readOnly: !0,
              serializedName: "trafficDelayInSeconds",
              type: { name: "Number" },
            },
            departureTime: {
              readOnly: !0,
              serializedName: "departureTime",
              type: { name: "String" },
            },
            arrivalTime: {
              readOnly: !0,
              serializedName: "arrivalTime",
              type: { name: "String" },
            },
            noTrafficTravelTimeInSeconds: {
              readOnly: !0,
              serializedName: "noTrafficTravelTimeInSeconds",
              type: { name: "Number" },
            },
            historicTrafficTravelTimeInSeconds: {
              readOnly: !0,
              serializedName: "historicTrafficTravelTimeInSeconds",
              type: { name: "Number" },
            },
            liveTrafficIncidentsTravelTimeInSeconds: {
              readOnly: !0,
              serializedName: "liveTrafficIncidentsTravelTimeInSeconds",
              type: { name: "Number" },
            },
            fuelConsumptionInLiters: {
              readOnly: !0,
              serializedName: "fuelConsumptionInLiters",
              type: { name: "Number" },
            },
            batteryConsumptionInkWh: {
              readOnly: !0,
              serializedName: "batteryConsumptionInkWh",
              type: { name: "Number" },
            },
          },
        },
      },
      RouteResultSection: {
        serializedName: "RouteResultSection",
        type: {
          name: "Composite",
          className: "RouteResultSection",
          modelProperties: {
            startPointIndex: {
              readOnly: !0,
              serializedName: "startPointIndex",
              type: { name: "Number" },
            },
            endPointIndex: {
              readOnly: !0,
              serializedName: "endPointIndex",
              type: { name: "Number" },
            },
            sectionType: {
              readOnly: !0,
              serializedName: "sectionType",
              type: { name: "String" },
            },
            travelMode: {
              readOnly: !0,
              serializedName: "travelMode",
              type: { name: "String" },
            },
            simpleCategory: {
              readOnly: !0,
              serializedName: "simpleCategory",
              type: { name: "String" },
            },
            effectiveSpeedInKmh: {
              readOnly: !0,
              serializedName: "effectiveSpeedInKmh",
              type: { name: "Number" },
            },
            delayInSeconds: {
              readOnly: !0,
              serializedName: "delayInSeconds",
              type: { name: "Number" },
            },
            magnitudeOfDelay: {
              readOnly: !0,
              serializedName: "magnitudeOfDelay",
              type: { name: "Enum", allowedValues: ["0", "1", "2", "3", "4"] },
            },
            tec: {
              serializedName: "tec",
              type: { name: "Composite", className: "RouteResultSectionTec" },
            },
          },
        },
      },
      RouteResultSectionTec: {
        serializedName: "RouteResultSectionTec",
        type: {
          name: "Composite",
          className: "RouteResultSectionTec",
          modelProperties: {
            effectCode: {
              readOnly: !0,
              serializedName: "effectCode",
              type: { name: "Number" },
            },
            causes: {
              serializedName: "causes",
              type: {
                name: "Sequence",
                element: {
                  type: {
                    name: "Composite",
                    className: "RouteResultSectionTecCause",
                  },
                },
              },
            },
          },
        },
      },
      RouteResultSectionTecCause: {
        serializedName: "RouteResultSectionTecCause",
        type: {
          name: "Composite",
          className: "RouteResultSectionTecCause",
          modelProperties: {
            mainCauseCode: {
              readOnly: !0,
              serializedName: "mainCauseCode",
              type: { name: "Number" },
            },
            subCauseCode: {
              readOnly: !0,
              serializedName: "subCauseCode",
              type: { name: "Number" },
            },
          },
        },
      },
    }),
    ol =
      ((ll.prototype.postRouteMatrixPreview = function (e, t) {
        return this.beginPostRouteMatrixPreview(e, t).then(function (e) {
          return e.pollUntilFinished();
        });
      }),
      (ll.prototype.getRouteDirections = function (e, t, r) {
        return this.client.sendOperationRequest(
          { query: e, options: t },
          pl,
          r
        );
      }),
      (ll.prototype.postRouteDirections = function (e, t, r, a) {
        return this.client.sendOperationRequest(
          { query: e, routeDirectionsRequestBody: t, options: r },
          ul,
          a
        );
      }),
      (ll.prototype.getRouteRange = function (e, t, r) {
        return this.client.sendOperationRequest(
          { query: e, options: t },
          dl,
          r
        );
      }),
      (ll.prototype.postRouteDirectionsBatchPreview = function (e, t) {
        return this.beginPostRouteDirectionsBatchPreview(e, t).then(function (
          e
        ) {
          return e.pollUntilFinished();
        });
      }),
      (ll.prototype.beginPostRouteMatrixPreview = function (e, t) {
        return this.client.sendLRORequest(
          { routeMatrixBody: e, options: t },
          yl,
          t
        );
      }),
      (ll.prototype.beginPostRouteDirectionsBatchPreview = function (e, t) {
        return this.client.sendLRORequest(
          { routeDirectionsBatchRequestBody: e, options: t },
          cl,
          t
        );
      }),
      ll);
  function ll(e) {
    this.client = e;
  }
  var ml = new S(sl),
    pl = {
      httpMethod: "GET",
      path: "route/directions/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        lo,
        Js,
        ls,
        $s,
        ps,
        Ts,
        Qs,
        Gs,
        Hs,
        fs,
        uo,
        Ns,
        qo,
        po,
        ho,
        wo,
        Do,
        Ao,
        Mo,
        xo,
        Lo,
        Eo,
        Go,
        Ds,
        zo,
        ys,
        So,
        yo,
        _o,
        Io,
        Rs,
        zs,
        ds,
        xs,
        as,
        bs,
        Co,
        qs,
        Ss,
        Ps,
        Ks,
        us,
      ],
      headerParameters: [is],
      responses: { 200: { bodyMapper: fn }, default: { bodyMapper: Ui } },
      serializer: ml,
    },
    ul = {
      httpMethod: "POST",
      path: "route/directions/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        lo,
        Js,
        ls,
        $s,
        Qs,
        Gs,
        Hs,
        fs,
        uo,
        Ns,
        qo,
        po,
        ho,
        ps,
        Ts,
        wo,
        Mo,
        Ao,
        Do,
        xo,
        Lo,
        Eo,
        Go,
        Ds,
        zo,
        ys,
        So,
        yo,
        _o,
        Io,
        Rs,
        zs,
        ds,
        xs,
        as,
        bs,
        Co,
        qs,
        Ss,
        Ps,
        Ks,
        us,
      ],
      headerParameters: [is],
      requestBody: {
        parameterPath: "routeDirectionsRequestBody",
        mapper: T(T({}, hn), { required: !0 }),
      },
      responses: { 200: { bodyMapper: fn }, default: { bodyMapper: Ui } },
      serializer: ml,
    },
    dl = {
      httpMethod: "GET",
      path: "route/range/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        lo,
        {
          parameterPath: ["options", "fuelBudgetInLiters"],
          mapper: {
            serializedName: "fuelBudgetInLiters",
            type: { name: "Number" },
          },
        },
        {
          parameterPath: ["options", "energyBudgetInkWh"],
          mapper: {
            serializedName: "energyBudgetInkWh",
            type: { name: "Number" },
          },
        },
        {
          parameterPath: ["options", "timeBudgetInSec"],
          mapper: {
            serializedName: "timeBudgetInSec",
            type: { name: "Number" },
          },
        },
        Ts,
        yo,
        So,
        ys,
        zo,
        Ds,
        Go,
        wo,
        Do,
        Ao,
        Mo,
        xo,
        Lo,
        Eo,
        _o,
        Io,
        Rs,
        zs,
        ds,
        xs,
        as,
        bs,
        Co,
        qs,
        Ss,
        Ps,
        Ks,
        us,
      ],
      headerParameters: [is],
      responses: { 200: { bodyMapper: Nn }, default: { bodyMapper: Ui } },
      serializer: ml,
    },
    yl = {
      httpMethod: "POST",
      path: "route/matrix/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        {
          parameterPath: ["options", "waitForResults"],
          mapper: {
            serializedName: "waitForResults",
            type: { name: "Boolean" },
          },
        },
        Ns,
        ho,
        ps,
        Ts,
        wo,
        Mo,
        Ao,
        Do,
        xo,
        Lo,
        Go,
        Ds,
        zo,
        ys,
        So,
        yo,
        _o,
      ],
      headerParameters: [is],
      requestBody: {
        parameterPath: "routeMatrixBody",
        mapper: T(T({}, Sn), { required: !0 }),
      },
      responses: {
        200: { bodyMapper: gn, headersMapper: $n },
        202: { headersMapper: $n },
        default: { bodyMapper: Ui },
      },
      serializer: ml,
    },
    cl = {
      httpMethod: "POST",
      path: "route/directions/batch/{format}",
      urlParameters: [Ms],
      queryParameters: [ms],
      headerParameters: [is],
      requestBody: {
        parameterPath: "routeDirectionsBatchRequestBody",
        mapper: T(T({}, Wi), { required: !0 }),
      },
      responses: {
        200: { bodyMapper: Vi, headersMapper: Qn },
        202: { headersMapper: Qn },
        default: { bodyMapper: Ui },
      },
      serializer: ml,
    },
    hl = Object.freeze({
      discriminators: ts,
      CloudError: Ui,
      Country: {
        serializedName: "Country",
        type: {
          name: "Composite",
          className: "Country",
          modelProperties: {
            name: {
              readOnly: !0,
              serializedName: "Name",
              type: { name: "String" },
            },
            code: {
              readOnly: !0,
              serializedName: "Code",
              type: { name: "String" },
            },
          },
        },
      },
      IanaId: {
        serializedName: "IanaId",
        type: {
          name: "Composite",
          className: "IanaId",
          modelProperties: {
            id: {
              readOnly: !0,
              serializedName: "id",
              type: { name: "String" },
            },
            isAlias: {
              readOnly: !0,
              serializedName: "isAlias",
              type: { name: "Boolean" },
            },
            aliasOf: {
              readOnly: !0,
              serializedName: "aliasOf",
              type: { name: "String" },
            },
            hasZone1970Location: {
              readOnly: !0,
              serializedName: "hasZone1970Location",
              type: { name: "Boolean" },
            },
          },
        },
      },
      Names: {
        serializedName: "Names",
        type: {
          name: "Composite",
          className: "Names",
          modelProperties: {
            iSO6391LanguageCode: {
              readOnly: !0,
              serializedName: "ISO6391LanguageCode",
              type: { name: "String" },
            },
            generic: {
              readOnly: !0,
              serializedName: "Generic",
              type: { name: "String" },
            },
            standard: {
              readOnly: !0,
              serializedName: "Standard",
              type: { name: "String" },
            },
            daylight: {
              readOnly: !0,
              serializedName: "Daylight",
              type: { name: "String" },
            },
          },
        },
      },
      ReferenceTimeByCoordinates: {
        serializedName: "ReferenceTimeByCoordinates",
        type: {
          name: "Composite",
          className: "ReferenceTimeByCoordinates",
          modelProperties: {
            tag: {
              readOnly: !0,
              serializedName: "Tag",
              type: { name: "String" },
            },
            standardOffset: {
              readOnly: !0,
              serializedName: "StandardOffset",
              type: { name: "String" },
            },
            daylightSavings: {
              readOnly: !0,
              serializedName: "DaylightSavings",
              type: { name: "String" },
            },
            wallTime: {
              readOnly: !0,
              serializedName: "WallTime",
              type: { name: "String" },
            },
            posixTzValidYear: {
              readOnly: !0,
              serializedName: "PosixTzValidYear",
              type: { name: "Number" },
            },
            posixTz: {
              readOnly: !0,
              serializedName: "PosixTz",
              type: { name: "String" },
            },
            sunrise: {
              readOnly: !0,
              serializedName: "Sunrise",
              type: { name: "String" },
            },
            sunset: {
              readOnly: !0,
              serializedName: "Sunset",
              type: { name: "String" },
            },
          },
        },
      },
      ReferenceTimeById: {
        serializedName: "ReferenceTimeById",
        type: {
          name: "Composite",
          className: "ReferenceTimeById",
          modelProperties: {
            tag: {
              readOnly: !0,
              serializedName: "Tag",
              type: { name: "String" },
            },
            standardOffset: {
              readOnly: !0,
              serializedName: "StandardOffset",
              type: { name: "String" },
            },
            daylightSavings: {
              readOnly: !0,
              serializedName: "DaylightSavings",
              type: { name: "String" },
            },
            wallTime: {
              readOnly: !0,
              serializedName: "WallTime",
              type: { name: "String" },
            },
            posixTzValidYear: {
              readOnly: !0,
              serializedName: "PosixTzValidYear",
              type: { name: "Number" },
            },
            posixTz: {
              readOnly: !0,
              serializedName: "PosixTz",
              type: { name: "String" },
            },
          },
        },
      },
      RepresentativePoint: {
        serializedName: "RepresentativePoint",
        type: {
          name: "Composite",
          className: "RepresentativePoint",
          modelProperties: {
            latitude: {
              readOnly: !0,
              serializedName: "Latitude",
              type: { name: "Number" },
            },
            longitude: {
              readOnly: !0,
              serializedName: "Longitude",
              type: { name: "Number" },
            },
          },
        },
      },
      TimeTransition: {
        serializedName: "TimeTransition",
        type: {
          name: "Composite",
          className: "TimeTransition",
          modelProperties: {
            tag: {
              readOnly: !0,
              serializedName: "Tag",
              type: { name: "String" },
            },
            standardOffset: {
              readOnly: !0,
              serializedName: "StandardOffset",
              type: { name: "String" },
            },
            daylightSavings: {
              readOnly: !0,
              serializedName: "DaylightSavings",
              type: { name: "String" },
            },
            utcStart: {
              readOnly: !0,
              serializedName: "UtcStart",
              type: { name: "DateTime" },
            },
            utcEnd: {
              readOnly: !0,
              serializedName: "UtcEnd",
              type: { name: "DateTime" },
            },
          },
        },
      },
      TimeZoneByCoordinates: {
        serializedName: "TimeZoneByCoordinates",
        type: {
          name: "Composite",
          className: "TimeZoneByCoordinates",
          modelProperties: {
            id: {
              readOnly: !0,
              serializedName: "Id",
              type: { name: "String" },
            },
            aliases: {
              readOnly: !0,
              serializedName: "Aliases",
              type: { name: "Sequence", element: { type: { name: "String" } } },
            },
            countries: {
              readOnly: !0,
              serializedName: "Countries",
              type: {
                name: "Sequence",
                element: { type: { name: "Composite", className: "Country" } },
              },
            },
            names: {
              serializedName: "Names",
              type: { name: "Composite", className: "Names" },
            },
            referenceTime: {
              serializedName: "ReferenceTime",
              type: {
                name: "Composite",
                className: "ReferenceTimeByCoordinates",
              },
            },
            representativePoint: {
              serializedName: "RepresentativePoint",
              type: { name: "Composite", className: "RepresentativePoint" },
            },
            timeTransitions: {
              readOnly: !0,
              serializedName: "TimeTransitions",
              type: {
                name: "Sequence",
                element: {
                  type: { name: "Composite", className: "TimeTransition" },
                },
              },
            },
          },
        },
      },
      TimezoneByCoordinatesResult: vn,
      TimezoneById: {
        serializedName: "TimezoneById",
        type: {
          name: "Composite",
          className: "TimezoneById",
          modelProperties: {
            id: {
              readOnly: !0,
              serializedName: "Id",
              type: { name: "String" },
            },
            aliases: {
              readOnly: !0,
              serializedName: "Aliases",
              type: { name: "Sequence", element: { type: { name: "String" } } },
            },
            countries: {
              readOnly: !0,
              serializedName: "Countries",
              type: {
                name: "Sequence",
                element: { type: { name: "Composite", className: "Country" } },
              },
            },
            names: {
              serializedName: "Names",
              type: { name: "Composite", className: "Names" },
            },
            referenceTime: {
              serializedName: "ReferenceTime",
              type: { name: "Composite", className: "ReferenceTimeById" },
            },
            representativePoint: {
              serializedName: "RepresentativePoint",
              type: { name: "Composite", className: "RepresentativePoint" },
            },
            timeTransitions: {
              readOnly: !0,
              serializedName: "TimeTransitions",
              type: {
                name: "Sequence",
                element: {
                  type: { name: "Composite", className: "TimeTransition" },
                },
              },
            },
          },
        },
      },
      TimezoneByIdResult: Rn,
      TimezoneEnumWindow: {
        serializedName: "TimezoneEnumWindow",
        type: {
          name: "Composite",
          className: "TimezoneEnumWindow",
          modelProperties: {
            windowsId: {
              readOnly: !0,
              serializedName: "WindowsId",
              type: { name: "String" },
            },
            territory: {
              readOnly: !0,
              serializedName: "Territory",
              type: { name: "String" },
            },
            ianaIds: {
              serializedName: "IanaIds",
              type: { name: "Sequence", element: { type: { name: "String" } } },
            },
          },
        },
      },
      TimezoneIanaVersionResult: Pn,
    }),
    fl =
      ((Nl.prototype.getTimezoneByID = function (e, t, r) {
        return this.client.sendOperationRequest(
          { query: e, options: t },
          Sl,
          r
        );
      }),
      (Nl.prototype.getTimezoneByCoordinates = function (e, t, r) {
        return this.client.sendOperationRequest(
          { query: e, options: t },
          Rl,
          r
        );
      }),
      (Nl.prototype.getTimezoneEnumWindows = function (e, t) {
        return this.client.sendOperationRequest({ options: e }, vl, t);
      }),
      (Nl.prototype.getTimezoneEnumIANA = function (e, t) {
        return this.client.sendOperationRequest({ options: e }, Pl, t);
      }),
      (Nl.prototype.getTimezoneIANAVersion = function (e, t) {
        return this.client.sendOperationRequest({ options: e }, zl, t);
      }),
      (Nl.prototype.getTimezoneWindowsToIANA = function (e, t, r) {
        return this.client.sendOperationRequest(
          { query: e, options: t },
          bl,
          r
        );
      }),
      Nl);
  function Nl(e) {
    this.client = e;
  }
  var gl = new S(hl),
    Sl = {
      httpMethod: "GET",
      path: "timezone/byId/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, no, No, Ro, vo, lo],
      headerParameters: [ns],
      responses: { 200: { bodyMapper: Rn }, default: { bodyMapper: Ui } },
      serializer: gl,
    },
    Rl = {
      httpMethod: "GET",
      path: "timezone/byCoordinates/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, no, No, Ro, vo, lo],
      headerParameters: [ns],
      responses: { 200: { bodyMapper: vn }, default: { bodyMapper: Ui } },
      serializer: gl,
    },
    vl = {
      httpMethod: "GET",
      path: "timezone/enumWindows/{format}",
      urlParameters: [Ms],
      queryParameters: [ms],
      headerParameters: [is],
      responses: {
        200: {
          bodyMapper: {
            serializedName: "parsedResponse",
            type: {
              name: "Sequence",
              element: {
                type: { name: "Composite", className: "TimezoneEnumWindow" },
              },
            },
          },
        },
        default: { bodyMapper: Ui },
      },
      serializer: gl,
    },
    Pl = {
      httpMethod: "GET",
      path: "timezone/enumIana/{format}",
      urlParameters: [Ms],
      queryParameters: [ms],
      headerParameters: [is],
      responses: {
        200: {
          bodyMapper: {
            serializedName: "parsedResponse",
            type: {
              name: "Sequence",
              element: { type: { name: "Composite", className: "IanaId" } },
            },
          },
        },
        default: { bodyMapper: Ui },
      },
      serializer: gl,
    },
    zl = {
      httpMethod: "GET",
      path: "timezone/ianaVersion/{format}",
      urlParameters: [Ms],
      queryParameters: [ms],
      headerParameters: [is],
      responses: { 200: { bodyMapper: Pn }, default: { bodyMapper: Ui } },
      serializer: gl,
    },
    bl = {
      httpMethod: "GET",
      path: "timezone/windowsToIana/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        lo,
        {
          parameterPath: ["options", "territory"],
          mapper: { serializedName: "territory", type: { name: "String" } },
        },
      ],
      headerParameters: [is],
      responses: {
        200: {
          bodyMapper: {
            serializedName: "parsedResponse",
            type: {
              name: "Sequence",
              element: { type: { name: "Composite", className: "IanaId" } },
            },
          },
        },
        default: { bodyMapper: Ui },
      },
      serializer: gl,
    },
    Tl = Object.freeze({
      discriminators: ts,
      CloudError: Ui,
      CopyrightBoundingResult: zn,
      CopyrightCaptionResult: bn,
      CopyrightTileResult: Cn,
      CopyrightWorldResult: Tn,
      Region: {
        serializedName: "Region",
        type: {
          name: "Composite",
          className: "Region",
          modelProperties: {
            copyrights: {
              readOnly: !0,
              serializedName: "copyrights",
              type: { name: "Sequence", element: { type: { name: "String" } } },
            },
            country: {
              readOnly: !0,
              serializedName: "country",
              type: { name: "Composite", className: "RegionCountry" },
            },
          },
        },
      },
      RegionCountry: {
        serializedName: "Region_country",
        type: {
          name: "Composite",
          className: "RegionCountry",
          modelProperties: {
            iSO3: {
              readOnly: !0,
              serializedName: "ISO3",
              type: { name: "String" },
            },
            label: {
              readOnly: !0,
              serializedName: "label",
              type: { name: "String" },
            },
          },
        },
      },
    }),
    Cl =
      ((Ol.prototype.getMapImage = function (e, t) {
        return this.client.sendOperationRequest({ options: e }, El, t);
      }),
      (Ol.prototype.getMapTile = function (e, t, r, a, i, n, s, o) {
        return this.client.sendOperationRequest(
          {
            format: e,
            layer: t,
            style: r,
            zoom: a,
            xTileIndex: i,
            yTileIndex: n,
            options: s,
          },
          Il,
          o
        );
      }),
      (Ol.prototype.getCopyrightCaption = function (e, t) {
        return this.client.sendOperationRequest({ options: e }, ql, t);
      }),
      (Ol.prototype.getMapImageryTile = function (e, t, r, a, i) {
        return this.client.sendOperationRequest(
          { zoom: e, xTileIndex: t, yTileIndex: r, options: a },
          Al,
          i
        );
      }),
      (Ol.prototype.getCopyrightFromBoundingBox = function (e, t, r, a) {
        return this.client.sendOperationRequest(
          { mincoordinates: e, maxcoordinates: t, options: r },
          Ml,
          a
        );
      }),
      (Ol.prototype.getCopyrightForTile = function (e, t, r, a, i) {
        return this.client.sendOperationRequest(
          { zoom: e, xTileIndex: t, yTileIndex: r, options: a },
          _l,
          i
        );
      }),
      (Ol.prototype.getCopyrightForWorld = function (e, t) {
        return this.client.sendOperationRequest({ options: e }, xl, t);
      }),
      Ol);
  function Ol(e) {
    this.client = e;
  }
  var wl = new S(Tl),
    El = {
      httpMethod: "GET",
      path: "map/static/{format}",
      urlParameters: [_s],
      queryParameters: [
        ms,
        oo,
        so,
        {
          parameterPath: ["options", "layer"],
          mapper: {
            serializedName: "layer",
            type: {
              name: "Enum",
              allowedValues: ["basic", "hybrid", "labels"],
            },
          },
        },
        {
          parameterPath: ["options", "style"],
          mapper: { serializedName: "style", type: { name: "String" } },
        },
        {
          parameterPath: ["options", "zoom"],
          mapper: {
            serializedName: "zoom",
            constraints: { InclusiveMaximum: 20, InclusiveMinimum: 0 },
            type: { name: "Number" },
          },
        },
        {
          parameterPath: ["options", "center"],
          mapper: { serializedName: "center", type: { name: "String" } },
        },
        {
          parameterPath: ["options", "bbox"],
          mapper: { serializedName: "bbox", type: { name: "String" } },
        },
        {
          parameterPath: ["options", "height"],
          mapper: {
            serializedName: "height",
            constraints: { InclusiveMaximum: 8192, InclusiveMinimum: 1 },
            type: { name: "Number" },
          },
        },
        {
          parameterPath: ["options", "width"],
          mapper: {
            serializedName: "width",
            constraints: { InclusiveMaximum: 8192, InclusiveMinimum: 1 },
            type: { name: "Number" },
          },
        },
        Hs,
        Bo,
      ],
      headerParameters: [is],
      responses: {
        200: {
          bodyMapper: {
            serializedName: "parsedResponse",
            type: { name: "Stream" },
          },
        },
        default: { bodyMapper: Ui },
      },
      serializer: wl,
    },
    Il = {
      httpMethod: "GET",
      path: "map/tile/{format}",
      urlParameters: [
        {
          parameterPath: "format",
          mapper: {
            required: !0,
            serializedName: "format",
            type: { name: "Enum", allowedValues: ["png", "pbf"] },
          },
        },
      ],
      queryParameters: [
        ms,
        {
          parameterPath: "layer",
          mapper: {
            required: !0,
            serializedName: "layer",
            type: {
              name: "Enum",
              allowedValues: ["basic", "hybrid", "labels", "terra"],
            },
          },
        },
        {
          parameterPath: "style",
          mapper: {
            required: !0,
            serializedName: "style",
            type: { name: "Enum", allowedValues: ["main", "shaded_relief"] },
          },
        },
        Uo,
        Fo,
        Ho,
        {
          parameterPath: ["options", "tileSize"],
          mapper: { serializedName: "tileSize", type: { name: "Number" } },
        },
        Hs,
        Bo,
      ],
      headerParameters: [is],
      responses: {
        200: {
          bodyMapper: {
            serializedName: "parsedResponse",
            type: { name: "Stream" },
          },
        },
        default: { bodyMapper: Ui },
      },
      serializer: wl,
    },
    ql = {
      httpMethod: "GET",
      path: "map/copyright/caption/{format}",
      urlParameters: [Ms],
      queryParameters: [ms],
      headerParameters: [is],
      responses: { 200: { bodyMapper: bn }, default: { bodyMapper: Ui } },
      serializer: wl,
    },
    Al = {
      httpMethod: "GET",
      path: "map/imagery/{format}",
      urlParameters: [_s],
      queryParameters: [
        ms,
        {
          parameterPath: "style",
          mapper: {
            required: !0,
            isConstant: !0,
            serializedName: "style",
            defaultValue: "satellite",
            type: { name: "String" },
          },
        },
        Uo,
        Fo,
        Ho,
      ],
      headerParameters: [is],
      responses: {
        200: {
          bodyMapper: {
            serializedName: "parsedResponse",
            type: { name: "Stream" },
          },
        },
        default: { bodyMapper: Ui },
      },
      serializer: wl,
    },
    Ml = {
      httpMethod: "GET",
      path: "map/copyright/bounding/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        {
          parameterPath: "mincoordinates",
          mapper: {
            required: !0,
            serializedName: "mincoordinates",
            type: { name: "String" },
          },
        },
        {
          parameterPath: "maxcoordinates",
          mapper: {
            required: !0,
            serializedName: "maxcoordinates",
            type: { name: "String" },
          },
        },
        fo,
      ],
      headerParameters: [is],
      responses: { 200: { bodyMapper: zn }, default: { bodyMapper: Ui } },
      serializer: wl,
    },
    _l = {
      httpMethod: "GET",
      path: "map/copyright/tile/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, Uo, Fo, Ho, fo],
      headerParameters: [is],
      responses: { 200: { bodyMapper: Cn }, default: { bodyMapper: Ui } },
      serializer: wl,
    },
    xl = {
      httpMethod: "GET",
      path: "map/copyright/world/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, fo],
      headerParameters: [is],
      responses: { 200: { bodyMapper: Tn }, default: { bodyMapper: Ui } },
      serializer: wl,
    },
    Ll = Object.freeze({
      discriminators: ts,
      Agency: {
        serializedName: "Agency",
        type: {
          name: "Composite",
          className: "Agency",
          modelProperties: {
            agencyId: { serializedName: "agencyId", type: { name: "String" } },
            agencyKey: {
              serializedName: "agencyKey",
              type: { name: "String" },
            },
            agencyName: {
              serializedName: "agencyName",
              type: { name: "String" },
            },
            transitType: {
              serializedName: "transitType",
              type: { name: "Composite", className: "TransitTypeResult" },
            },
          },
        },
      },
      Alert: {
        serializedName: "Alert",
        type: {
          name: "Composite",
          className: "Alert",
          modelProperties: {
            alertSummary: {
              serializedName: "alertSummary",
              type: { name: "String" },
            },
            publicationDate: {
              serializedName: "publicationDate",
              type: { name: "DateTime" },
            },
            category: { serializedName: "category", type: { name: "String" } },
            alertLevel: {
              serializedName: "alertLevel",
              type: { name: "String" },
            },
            details: {
              serializedName: "details",
              type: { name: "Composite", className: "AlertDetail" },
            },
          },
        },
      },
      AlertDescription: {
        serializedName: "AlertDescription",
        type: {
          name: "Composite",
          className: "AlertDescription",
          modelProperties: {
            data: { serializedName: "data", type: { name: "String" } },
            format: { serializedName: "format", type: { name: "String" } },
            sourceUrl: {
              serializedName: "sourceUrl",
              type: { name: "String" },
            },
          },
        },
      },
      AlertDetail: {
        serializedName: "AlertDetail",
        type: {
          name: "Composite",
          className: "AlertDetail",
          modelProperties: {
            agencyId: { serializedName: "agencyId", type: { name: "String" } },
            agencyName: {
              serializedName: "agencyName",
              type: { name: "String" },
            },
            title: { serializedName: "title", type: { name: "String" } },
            description: {
              serializedName: "description",
              type: { name: "Composite", className: "AlertDescription" },
            },
            activeFrom: {
              serializedName: "activeFrom",
              type: { name: "DateTime" },
            },
            activeTo: {
              serializedName: "activeTo",
              type: { name: "DateTime" },
            },
            effect: { serializedName: "effect", type: { name: "String" } },
          },
        },
      },
      CarShareResponse: _n,
      CloudError: Ui,
      Coordinate: yn,
      Direction: {
        serializedName: "Direction",
        type: {
          name: "Composite",
          className: "Direction",
          modelProperties: {
            relativeDirection: {
              serializedName: "relativeDirection",
              type: {
                name: "Enum",
                allowedValues: [
                  "depart",
                  "hardLeft",
                  "left",
                  "slightlyLeft",
                  "continue",
                  "slightlyRight",
                  "right",
                  "hardRight",
                  "circleClockwise",
                  "circleCounterclockwise",
                  "elevator",
                  "uturnLeft",
                  "uturnRight",
                ],
              },
            },
            absoluteDirection: {
              serializedName: "absoluteDirection",
              type: {
                name: "Enum",
                allowedValues: [
                  "north",
                  "northeast",
                  "east",
                  "southeast",
                  "south",
                  "southwest",
                  "west",
                  "northwest",
                ],
              },
            },
          },
        },
      },
      GeoJSONGeometry: Yi,
      ItineraryResult: {
        serializedName: "ItineraryResult",
        type: {
          name: "Composite",
          className: "ItineraryResult",
          modelProperties: {
            itineraryId: {
              serializedName: "itineraryId",
              type: { name: "String" },
            },
            departureTime: {
              serializedName: "departureTime",
              type: { name: "DateTime" },
            },
            arrivalTime: {
              serializedName: "arrivalTime",
              type: { name: "DateTime" },
            },
            travelTimeInSeconds: {
              serializedName: "travelTimeInSeconds",
              type: { name: "Number" },
            },
            numberOfLegs: {
              serializedName: "numberOfLegs",
              type: { name: "Number" },
            },
            legs: {
              serializedName: "legs",
              type: {
                name: "Sequence",
                element: {
                  type: { name: "Composite", className: "RouteItineraryLeg" },
                },
              },
            },
          },
        },
      },
      Leg: {
        serializedName: "Leg",
        type: {
          name: "Composite",
          className: "Leg",
          modelProperties: {
            legType: {
              serializedName: "legType",
              type: {
                name: "Enum",
                allowedValues: [
                  "Walk",
                  "Bicycle",
                  "Tram",
                  "Subway",
                  "Rail",
                  "Bus",
                  "Ferry",
                  "Cable",
                  "Gondola",
                  "Funicular",
                  "PathWayWalk",
                  "Wait",
                  "WaitOnVehicle",
                ],
              },
            },
            legStartTime: {
              serializedName: "legStartTime",
              type: { name: "String" },
            },
            legEndTime: {
              serializedName: "legEndTime",
              type: { name: "String" },
            },
            steps: {
              serializedName: "steps",
              type: {
                name: "Sequence",
                element: { type: { name: "Composite", className: "Step" } },
              },
            },
            origin: {
              serializedName: "origin",
              type: { name: "Composite", className: "LegPoint" },
            },
            destination: {
              serializedName: "destination",
              type: { name: "Composite", className: "LegPoint" },
            },
            geometry: {
              serializedName: "geometry",
              type: { name: "Composite", className: "LineString" },
            },
            lineGroup: {
              serializedName: "lineGroup",
              type: { name: "Composite", className: "LineGroup" },
            },
            line: {
              serializedName: "line",
              type: { name: "Composite", className: "Line" },
            },
            stops: {
              serializedName: "stops",
              type: {
                name: "Sequence",
                element: { type: { name: "Composite", className: "Stop" } },
              },
            },
            departures: {
              serializedName: "departures",
              type: {
                name: "Sequence",
                element: {
                  type: { name: "Composite", className: "LineArrival" },
                },
              },
            },
            waitOnVehicle: {
              serializedName: "waitOnVehicle",
              type: { name: "String" },
            },
          },
        },
      },
      LegPoint: {
        serializedName: "LegPoint",
        type: {
          name: "Composite",
          className: "LegPoint",
          modelProperties: {
            position: {
              serializedName: "position",
              type: { name: "Composite", className: "Coordinate" },
            },
          },
        },
      },
      Line: {
        serializedName: "Line",
        type: {
          name: "Composite",
          className: "Line",
          modelProperties: {
            lineId: { serializedName: "lineId", type: { name: "String" } },
            lineGroupId: {
              serializedName: "lineGroupId",
              type: { name: "String" },
            },
            direction: {
              serializedName: "direction",
              type: { name: "String" },
            },
            agencyId: { serializedName: "agencyId", type: { name: "String" } },
            agencyName: {
              serializedName: "agencyName",
              type: { name: "String" },
            },
            lineNumber: {
              serializedName: "lineNumber",
              type: { name: "String" },
            },
            origin: { serializedName: "origin", type: { name: "String" } },
            lineDestination: {
              serializedName: "lineDestination",
              type: { name: "String" },
            },
            mostFrequentPatternId: {
              serializedName: "mostFrequentPatternId",
              type: { name: "String" },
            },
            transitType: {
              serializedName: "transitType",
              type: {
                name: "Enum",
                allowedValues: [
                  "Bus",
                  "CableCar",
                  "Ferry",
                  "Funicular",
                  "Gondola",
                  "Rail",
                  "Tram",
                  "Subway",
                ],
              },
            },
          },
        },
      },
      LineArrival: {
        serializedName: "LineArrival",
        type: {
          name: "Composite",
          className: "LineArrival",
          modelProperties: {
            lineId: { serializedName: "lineId", type: { name: "String" } },
            stopId: { serializedName: "stopId", type: { name: "String" } },
            scheduleTime: {
              serializedName: "scheduleTime",
              type: { name: "DateTime" },
            },
            scheduleType: {
              serializedName: "scheduleType",
              type: {
                name: "Enum",
                allowedValues: ["scheduledTime", "realTime"],
              },
            },
          },
        },
      },
      LineGroup: {
        serializedName: "LineGroup",
        type: {
          name: "Composite",
          className: "LineGroup",
          modelProperties: {
            lineGroupId: {
              serializedName: "lineGroupId",
              type: { name: "String" },
            },
            agencyId: { serializedName: "agencyId", type: { name: "String" } },
            agencyName: {
              serializedName: "agencyName",
              type: { name: "String" },
            },
            lineNumber: {
              serializedName: "lineNumber",
              type: { name: "String" },
            },
            caption1: { serializedName: "caption1", type: { name: "String" } },
            caption2: { serializedName: "caption2", type: { name: "String" } },
            color: { serializedName: "color", type: { name: "String" } },
            transitType: {
              serializedName: "transitType",
              type: {
                name: "Enum",
                allowedValues: [
                  "Bus",
                  "CableCar",
                  "Ferry",
                  "Funicular",
                  "Gondola",
                  "Rail",
                  "Tram",
                  "Subway",
                ],
              },
            },
          },
        },
      },
      LineString: Ji,
      MetroAreaInfoResponse: En,
      MetroAreaResponse: wn,
      MetroAreaResult: {
        serializedName: "MetroAreaResult",
        type: {
          name: "Composite",
          className: "MetroAreaResult",
          modelProperties: {
            metroId: { serializedName: "metroId", type: { name: "Number" } },
            metroName: {
              serializedName: "metroName",
              type: { name: "String" },
            },
            geometry: {
              serializedName: "geometry",
              type: { name: "Composite", className: "Polygon" },
            },
            viewport: {
              serializedName: "viewport",
              type: { name: "Composite", className: "ResultViewport" },
            },
          },
        },
      },
      MultiLineString: Gn,
      MultiPoint: mn,
      MultiPolygon: un,
      NearbyTransitResponse: In,
      OperatorInfo: {
        serializedName: "OperatorInfo",
        type: {
          name: "Composite",
          className: "OperatorInfo",
          modelProperties: {
            id: { serializedName: "id", type: { name: "String" } },
            name: { serializedName: "name", type: { name: "String" } },
            description: {
              serializedName: "description",
              type: { name: "String" },
            },
            siteUrl: { serializedName: "siteUrl", type: { name: "String" } },
          },
        },
      },
      Pattern: {
        serializedName: "Pattern",
        type: {
          name: "Composite",
          className: "Pattern",
          modelProperties: {
            patternId: {
              serializedName: "patternId",
              type: { name: "String" },
            },
            lineId: { serializedName: "lineId", type: { name: "String" } },
            stopIds: {
              serializedName: "stopIds",
              type: { name: "Sequence", element: { type: { name: "String" } } },
            },
            geometry: {
              serializedName: "geometry",
              type: { name: "Composite", className: "LineString" },
            },
          },
        },
      },
      Point: pn,
      Polygon: On,
      Pricing: {
        serializedName: "Pricing",
        type: {
          name: "Composite",
          className: "Pricing",
          modelProperties: {
            currency: { serializedName: "currency", type: { name: "String" } },
            usagePrice: {
              serializedName: "usagePrice",
              type: { name: "String" },
            },
            reservationPrice: {
              serializedName: "reservationPrice",
              type: { name: "String" },
            },
          },
        },
      },
      RealTimeArrivalResult: {
        serializedName: "RealTimeArrivalResult",
        type: {
          name: "Composite",
          className: "RealTimeArrivalResult",
          modelProperties: {
            arrivalMinutes: {
              serializedName: "arrivalMinutes",
              type: { name: "Number" },
            },
            scheduleType: {
              serializedName: "scheduleType",
              type: {
                name: "Enum",
                allowedValues: ["scheduledTime", "realTime"],
              },
            },
            patternId: {
              serializedName: "patternId",
              type: { name: "String" },
            },
            line: {
              serializedName: "line",
              type: { name: "Composite", className: "Line" },
            },
            stop: {
              serializedName: "stop",
              type: { name: "Composite", className: "Stop" },
            },
          },
        },
      },
      RealTimeArrivalsResponse: Dn,
      ResultViewport: {
        serializedName: "ResultViewport",
        type: {
          name: "Composite",
          className: "ResultViewport",
          modelProperties: {
            topLeftPoint: {
              serializedName: "topLeftPoint",
              type: { name: "Composite", className: "Coordinate" },
            },
            btmRightPoint: {
              serializedName: "btmRightPoint",
              type: { name: "Composite", className: "Coordinate" },
            },
          },
        },
      },
      RouteItineraryLeg: {
        serializedName: "RouteItineraryLeg",
        type: {
          name: "Composite",
          className: "RouteItineraryLeg",
          modelProperties: {
            legType: {
              serializedName: "legType",
              type: {
                name: "Enum",
                allowedValues: [
                  "Walk",
                  "Bicycle",
                  "Tram",
                  "Subway",
                  "Rail",
                  "Bus",
                  "Ferry",
                  "Cable",
                  "Gondola",
                  "Funicular",
                  "PathWayWalk",
                  "Wait",
                  "WaitOnVehicle",
                ],
              },
            },
            legStartTime: {
              serializedName: "legStartTime",
              type: { name: "String" },
            },
            legEndTime: {
              serializedName: "legEndTime",
              type: { name: "String" },
            },
            caption: { serializedName: "caption", type: { name: "String" } },
            lengthInMeters: {
              serializedName: "lengthInMeters",
              type: { name: "Number" },
            },
          },
        },
      },
      Step: {
        serializedName: "Step",
        type: {
          name: "Composite",
          className: "Step",
          modelProperties: {
            direction: {
              serializedName: "direction",
              type: { name: "Composite", className: "Direction" },
            },
            streetName: {
              serializedName: "streetName",
              type: { name: "String" },
            },
          },
        },
      },
      Stop: {
        serializedName: "Stop",
        type: {
          name: "Composite",
          className: "Stop",
          modelProperties: {
            stopId: { serializedName: "stopId", type: { name: "String" } },
            stopKey: { serializedName: "stopKey", type: { name: "String" } },
            stopName: { serializedName: "stopName", type: { name: "String" } },
            stopCode: { serializedName: "stopCode", type: { name: "String" } },
            position: {
              serializedName: "position",
              type: { name: "Composite", className: "Coordinate" },
            },
            mainTransitType: {
              serializedName: "mainTransitType",
              type: { name: "String" },
            },
            mainAgencyId: {
              serializedName: "mainAgencyId",
              type: { name: "String" },
            },
            mainAgencyName: {
              serializedName: "mainAgencyName",
              type: { name: "String" },
            },
          },
        },
      },
      TransitDockInfoResponse: xn,
      TransitItineraryResponse: Mn,
      TransitLineInfoResponse: Ln,
      TransitObjectResult: {
        serializedName: "TransitObjectResult",
        type: {
          name: "Composite",
          className: "TransitObjectResult",
          modelProperties: {
            id: { serializedName: "id", type: { name: "String" } },
            type: { serializedName: "type", type: { name: "String" } },
            objectDetails: {
              serializedName: "objectDetails",
              type: { name: "Object" },
            },
            position: {
              serializedName: "position",
              type: { name: "Composite", className: "Coordinate" },
            },
            viewport: {
              serializedName: "viewport",
              type: { name: "Composite", className: "ResultViewport" },
            },
          },
        },
      },
      TransitRouteResponse: An,
      TransitStopInfoResponse: qn,
      TransitTypeResult: {
        serializedName: "TransitTypeResult",
        type: {
          name: "Composite",
          className: "TransitTypeResult",
          modelProperties: {
            transitType: {
              serializedName: "transitType",
              type: {
                name: "Enum",
                allowedValues: [
                  "Bus",
                  "CableCar",
                  "Ferry",
                  "Funicular",
                  "Gondola",
                  "Rail",
                  "Tram",
                  "Subway",
                ],
              },
            },
            captionOverride: {
              serializedName: "captionOverride",
              type: { name: "String" },
            },
          },
        },
      },
    }),
    Dl =
      ((Bl.prototype.getMetroAreaPreview = function (e, t, r) {
        return this.client.sendOperationRequest(
          { query: e, options: t },
          Fl,
          r
        );
      }),
      (Bl.prototype.getMetroAreaInfoPreview = function (e, t, r, a) {
        return this.client.sendOperationRequest(
          { query: e, detailType: t, options: r },
          Hl,
          a
        );
      }),
      (Bl.prototype.getNearbyTransitPreview = function (e, t, r, a) {
        return this.client.sendOperationRequest(
          { metroId: e, query: t, options: r },
          Ul,
          a
        );
      }),
      (Bl.prototype.getTransitDockInfoPreview = function (e, t, r) {
        return this.client.sendOperationRequest(
          { query: e, options: t },
          kl,
          r
        );
      }),
      (Bl.prototype.getCarShareInfoPreview = function (e, t, r) {
        return this.client.sendOperationRequest(
          { query: e, options: t },
          Vl,
          r
        );
      }),
      (Bl.prototype.getTransitLineInfoPreview = function (e, t, r, a) {
        return this.client.sendOperationRequest(
          { metroId: e, query: t, options: r },
          jl,
          a
        );
      }),
      (Bl.prototype.getTransitStopInfoPreview = function (e, t, r, a) {
        return this.client.sendOperationRequest(
          { metroId: e, query: t, options: r },
          Wl,
          a
        );
      }),
      (Bl.prototype.getTransitRoutePreview = function (e, t, r, a, i) {
        return this.client.sendOperationRequest(
          { metroId: e, origin: t, destination: r, options: a },
          Yl,
          i
        );
      }),
      (Bl.prototype.getTransitItineraryPreview = function (e, t, r) {
        return this.client.sendOperationRequest(
          { query: e, options: t },
          Jl,
          r
        );
      }),
      (Bl.prototype.getRealTimeArrivalsPreview = function (e, t, r, a) {
        return this.client.sendOperationRequest(
          { metroId: e, query: t, options: r },
          Kl,
          a
        );
      }),
      Bl);
  function Bl(e) {
    this.client = e;
  }
  var Gl = new S(Ll),
    Fl = {
      httpMethod: "GET",
      path: "mobility/metroArea/id/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        lo,
        {
          parameterPath: ["options", "queryType"],
          mapper: {
            serializedName: "queryType",
            type: { name: "Enum", allowedValues: ["position", "countryCode"] },
          },
        },
        Hs,
      ],
      headerParameters: [is],
      responses: { 200: { bodyMapper: wn }, default: { bodyMapper: Ui } },
      serializer: Gl,
    },
    Hl = {
      httpMethod: "GET",
      path: "mobility/metroArea/info/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        {
          parameterPath: "query",
          mapper: {
            required: !0,
            serializedName: "query",
            type: { name: "Number" },
          },
        },
        Cs,
        Hs,
      ],
      headerParameters: [is],
      responses: { 200: { bodyMapper: En }, default: { bodyMapper: Ui } },
      serializer: Gl,
    },
    Ul = {
      httpMethod: "GET",
      path: "mobility/transit/nearby/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, Xs, lo, js, mo, ro, Hs],
      headerParameters: [is],
      responses: { 200: { bodyMapper: In }, default: { bodyMapper: Ui } },
      serializer: Gl,
    },
    kl = {
      httpMethod: "GET",
      path: "mobility/transit/dock/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, lo, Hs],
      headerParameters: [is],
      responses: { 200: { bodyMapper: xn }, default: { bodyMapper: Ui } },
      serializer: Gl,
    },
    Vl = {
      httpMethod: "GET",
      path: "mobility/transit/carShare/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, lo, Hs],
      headerParameters: [is],
      responses: { 200: { bodyMapper: _n }, default: { bodyMapper: Ui } },
      serializer: Gl,
    },
    jl = {
      httpMethod: "GET",
      path: "mobility/transit/line/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, Xs, lo, Os, Hs],
      headerParameters: [is],
      responses: { 200: { bodyMapper: Ln }, default: { bodyMapper: Ui } },
      serializer: Gl,
    },
    Wl = {
      httpMethod: "GET",
      path: "mobility/transit/stop/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        Xs,
        lo,
        {
          parameterPath: ["options", "queryType"],
          mapper: {
            serializedName: "queryType",
            type: { name: "Enum", allowedValues: ["stopId", "stopKey"] },
          },
        },
        ws,
        Hs,
      ],
      headerParameters: [is],
      responses: { 200: { bodyMapper: qn }, default: { bodyMapper: Ui } },
      serializer: Gl,
    },
    Yl = {
      httpMethod: "GET",
      path: "mobility/transit/route/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        Xs,
        {
          parameterPath: "origin",
          mapper: {
            required: !0,
            serializedName: "origin",
            type: { name: "String" },
          },
        },
        {
          parameterPath: ["options", "originType"],
          mapper: {
            serializedName: "originType",
            type: {
              name: "Enum",
              allowedValues: ["position", "stopId", "stopKey"],
            },
          },
        },
        {
          parameterPath: "destination",
          mapper: {
            required: !0,
            serializedName: "destination",
            type: { name: "String" },
          },
        },
        {
          parameterPath: ["options", "destinationType"],
          mapper: {
            serializedName: "destinationType",
            type: {
              name: "Enum",
              allowedValues: ["position", "stopId", "stopKey"],
            },
          },
        },
        eo,
        Po,
        ss,
        os,
        {
          parameterPath: ["options", "time"],
          mapper: { serializedName: "time", type: { name: "String" } },
        },
        {
          parameterPath: ["options", "timeType"],
          mapper: {
            serializedName: "timeType",
            type: {
              name: "Enum",
              allowedValues: ["arrival", "departure", "last"],
            },
          },
        },
        {
          parameterPath: ["options", "routeType"],
          mapper: {
            serializedName: "routeType",
            type: {
              name: "Enum",
              allowedValues: ["optimal", "leastWalk", "leastTransfers"],
            },
          },
        },
        {
          parameterPath: ["options", "bikeType"],
          mapper: {
            serializedName: "bikeType",
            type: {
              name: "Enum",
              allowedValues: ["privateBike", "dockedBike"],
            },
          },
        },
        Hs,
      ],
      headerParameters: [is],
      responses: { 200: { bodyMapper: An }, default: { bodyMapper: Ui } },
      serializer: Gl,
    },
    Jl = {
      httpMethod: "GET",
      path: "mobility/transit/itinerary/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, lo, Es, Hs],
      headerParameters: [is],
      responses: { 200: { bodyMapper: Mn }, default: { bodyMapper: Ui } },
      serializer: Gl,
    },
    Kl = {
      httpMethod: "GET",
      path: "mobility/realtime/arrivals/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        Xs,
        lo,
        {
          parameterPath: ["options", "queryType"],
          mapper: {
            serializedName: "queryType",
            type: {
              name: "Enum",
              allowedValues: ["stops", "line", "lineAndStop", "position"],
            },
          },
        },
        {
          parameterPath: ["options", "stopQueryType"],
          mapper: {
            serializedName: "stopQueryType",
            type: { name: "Enum", allowedValues: ["stopId", "stopKey"] },
          },
        },
        js,
        {
          parameterPath: ["options", "maxMinutesInFuture"],
          mapper: {
            serializedName: "maxMinutesInFuture",
            type: { name: "Number" },
          },
        },
        Po,
        ss,
        os,
        {
          parameterPath: ["options", "timeoutInSeconds"],
          mapper: {
            serializedName: "timeoutInSeconds",
            type: { name: "Number" },
          },
        },
        Hs,
      ],
      headerParameters: [is],
      responses: { 200: { bodyMapper: Dn }, default: { bodyMapper: Ui } },
      serializer: Gl,
    },
    Xl = Object.freeze({
      discriminators: ts,
      BufferRequestBody: Hn,
      BufferResponse: Un,
      BufferResponseSummary: {
        serializedName: "BufferResponse_summary",
        type: {
          name: "Composite",
          className: "BufferResponseSummary",
          modelProperties: {
            udid: {
              readOnly: !0,
              serializedName: "udid",
              type: { name: "String" },
            },
            information: {
              readOnly: !0,
              serializedName: "information",
              type: { name: "String" },
            },
          },
        },
      },
      ClosestPointResultEntry: {
        serializedName: "ClosestPointResultEntry",
        type: {
          name: "Composite",
          className: "ClosestPointResultEntry",
          modelProperties: {
            distanceInMeters: {
              readOnly: !0,
              serializedName: "distanceInMeters",
              type: { name: "Number" },
            },
            position: {
              serializedName: "position",
              type: { name: "Composite", className: "SpatialCoordinate" },
            },
            geometryId: {
              readOnly: !0,
              serializedName: "geometryId",
              type: { name: "String" },
            },
          },
        },
      },
      CloudError: Ui,
      GeofenceGeometry: {
        serializedName: "GeofenceGeometry",
        type: {
          name: "Composite",
          className: "GeofenceGeometry",
          modelProperties: {
            deviceId: {
              readOnly: !0,
              serializedName: "deviceId",
              type: { name: "String" },
            },
            udId: {
              readOnly: !0,
              serializedName: "udId",
              type: { name: "String" },
            },
            geometryId: {
              readOnly: !0,
              serializedName: "geometryId",
              type: { name: "String" },
            },
            distance: {
              readOnly: !0,
              serializedName: "distance",
              type: { name: "Number" },
            },
            nearestLat: {
              readOnly: !0,
              serializedName: "nearestLat",
              type: { name: "Number" },
            },
            nearestLon: {
              readOnly: !0,
              serializedName: "nearestLon",
              type: { name: "Number" },
            },
          },
        },
      },
      GeofenceResponse: Fn,
      GeoJSONFeatureCollection: Bn,
      GeoJSONFeatureCollectionFeaturesItem: {
        serializedName: "GeoJSONFeatureCollection_featuresItem",
        type: {
          name: "Composite",
          className: "GeoJSONFeatureCollectionFeaturesItem",
          modelProperties: {
            type: { serializedName: "type", type: { name: "String" } },
            geometry: {
              serializedName: "geometry",
              type: { name: "Composite", className: "GeoJSONGeometry" },
            },
            properties: {
              serializedName: "properties",
              type: { name: "Object" },
            },
          },
        },
      },
      GeoJSONGeometry: Yi,
      GetClosestPointResponse: kn,
      GetClosestPointSummary: {
        serializedName: "GetClosestPointSummary",
        type: {
          name: "Composite",
          className: "GetClosestPointSummary",
          modelProperties: {
            sourcePoint: {
              serializedName: "sourcePoint",
              type: { name: "Composite", className: "SpatialCoordinate" },
            },
            udid: {
              readOnly: !0,
              serializedName: "udid",
              type: { name: "String" },
            },
            information: {
              readOnly: !0,
              serializedName: "information",
              type: { name: "String" },
            },
          },
        },
      },
      GetPointInPolygonResponse: jn,
      GetPointInPolygonSummary: {
        serializedName: "GetPointInPolygonSummary",
        type: {
          name: "Composite",
          className: "GetPointInPolygonSummary",
          modelProperties: {
            sourcePoint: {
              serializedName: "sourcePoint",
              type: { name: "Composite", className: "SpatialCoordinate" },
            },
            udid: {
              readOnly: !0,
              serializedName: "udid",
              type: { name: "String" },
            },
            information: {
              readOnly: !0,
              serializedName: "information",
              type: { name: "String" },
            },
          },
        },
      },
      GreatCircleDistanceResponse: Yn,
      GreatCircleDistanceResponseResult: {
        serializedName: "GreatCircleDistanceResponse_result",
        type: {
          name: "Composite",
          className: "GreatCircleDistanceResponseResult",
          modelProperties: {
            distanceInMeters: {
              readOnly: !0,
              serializedName: "distanceInMeters",
              type: { name: "Number" },
            },
          },
        },
      },
      GreatCircleDistanceResponseSummary: {
        serializedName: "GreatCircleDistanceResponse_summary",
        type: {
          name: "Composite",
          className: "GreatCircleDistanceResponseSummary",
          modelProperties: {
            sourcePoint: {
              serializedName: "sourcePoint",
              type: { name: "Composite", className: "SpatialCoordinate" },
            },
            targetPoint: {
              serializedName: "targetPoint",
              type: { name: "Composite", className: "SpatialCoordinate" },
            },
          },
        },
      },
      LineString: Ji,
      MultiLineString: Gn,
      MultiPoint: mn,
      MultiPolygon: un,
      Point: pn,
      PointInPolygonResult: {
        serializedName: "PointInPolygonResult",
        type: {
          name: "Composite",
          className: "PointInPolygonResult",
          modelProperties: {
            pointInPolygons: {
              readOnly: !0,
              serializedName: "pointInPolygons",
              type: { name: "Boolean" },
            },
            intersectingGeometries: {
              readOnly: !0,
              serializedName: "intersectingGeometries",
              type: { name: "Sequence", element: { type: { name: "String" } } },
            },
          },
        },
      },
      Polygon: On,
      PostClosestPointResponse: Vn,
      PostClosestPointSummary: {
        serializedName: "PostClosestPointSummary",
        type: {
          name: "Composite",
          className: "PostClosestPointSummary",
          modelProperties: {
            sourcePoint: {
              serializedName: "sourcePoint",
              type: { name: "Composite", className: "SpatialCoordinate" },
            },
            udid: {
              readOnly: !0,
              serializedName: "udid",
              type: { name: "String" },
            },
            information: {
              readOnly: !0,
              serializedName: "information",
              type: { name: "String" },
            },
          },
        },
      },
      PostPointInPolygonResponse: Wn,
      PostPointInPolygonSummary: {
        serializedName: "PostPointInPolygonSummary",
        type: {
          name: "Composite",
          className: "PostPointInPolygonSummary",
          modelProperties: {
            sourcePoint: {
              serializedName: "sourcePoint",
              type: { name: "Composite", className: "SpatialCoordinate" },
            },
            udid: {
              readOnly: !0,
              serializedName: "udid",
              type: { name: "String" },
            },
            information: {
              readOnly: !0,
              serializedName: "information",
              type: { name: "String" },
            },
          },
        },
      },
      SpatialCoordinate: {
        serializedName: "SpatialCoordinate",
        type: {
          name: "Composite",
          className: "SpatialCoordinate",
          modelProperties: {
            lat: {
              readOnly: !0,
              serializedName: "lat",
              type: { name: "Number" },
            },
            lon: {
              readOnly: !0,
              serializedName: "lon",
              type: { name: "Number" },
            },
          },
        },
      },
      SpatialGetGeofenceHeaders: Zn,
      SpatialPostGeofenceHeaders: es,
    }),
    $l =
      ((Ql.prototype.getGeofence = function (e, t, r, a, i, n) {
        return this.client.sendOperationRequest(
          { deviceId: e, udId: t, lat: r, lon: a, options: i },
          tm,
          n
        );
      }),
      (Ql.prototype.postGeofence = function (e, t, r, a, i, n) {
        return this.client.sendOperationRequest(
          {
            deviceId: e,
            lat: t,
            lon: r,
            searchGeofenceRequestBody: a,
            options: i,
          },
          rm,
          n
        );
      }),
      (Ql.prototype.postBuffer = function (e, t, r) {
        return this.client.sendOperationRequest(
          { bufferRequestBody: e, options: t },
          am,
          r
        );
      }),
      (Ql.prototype.getBuffer = function (e, t, r, a) {
        return this.client.sendOperationRequest(
          { udid: e, distances: t, options: r },
          im,
          a
        );
      }),
      (Ql.prototype.postClosestPoint = function (e, t, r, a, i) {
        return this.client.sendOperationRequest(
          { lat: e, lon: t, closestPointRequestBody: r, options: a },
          nm,
          i
        );
      }),
      (Ql.prototype.getClosestPoint = function (e, t, r, a, i) {
        return this.client.sendOperationRequest(
          { udid: e, lat: t, lon: r, options: a },
          sm,
          i
        );
      }),
      (Ql.prototype.postPointInPolygon = function (e, t, r, a, i) {
        return this.client.sendOperationRequest(
          { lat: e, lon: t, pointInPolygonRequestBody: r, options: a },
          om,
          i
        );
      }),
      (Ql.prototype.getPointInPolygon = function (e, t, r, a, i) {
        return this.client.sendOperationRequest(
          { udid: e, lat: t, lon: r, options: a },
          lm,
          i
        );
      }),
      (Ql.prototype.getGreatCircleDistance = function (e, t, r) {
        return this.client.sendOperationRequest(
          { query: e, options: t },
          mm,
          r
        );
      }),
      Ql);
  function Ql(e) {
    this.client = e;
  }
  var Zl,
    em = new S(Xl),
    tm = {
      httpMethod: "GET",
      path: "spatial/geofence/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        Is,
        {
          parameterPath: "udId",
          mapper: {
            required: !0,
            serializedName: "udId",
            type: { name: "String" },
          },
        },
        ks,
        Ys,
        Oo,
        co,
        Fs,
        Zs,
      ],
      headerParameters: [is],
      responses: {
        200: { bodyMapper: Fn, headersMapper: Zn },
        default: { bodyMapper: Ui },
      },
      serializer: em,
    },
    rm = {
      httpMethod: "POST",
      path: "spatial/geofence/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, Is, ks, Ys, Oo, co, Fs, Zs],
      headerParameters: [is],
      requestBody: {
        parameterPath: "searchGeofenceRequestBody",
        mapper: T(T({}, Bn), { required: !0 }),
      },
      responses: {
        200: { bodyMapper: Fn, headersMapper: es },
        default: { bodyMapper: Ui },
      },
      serializer: em,
    },
    am = {
      httpMethod: "POST",
      path: "spatial/buffer/{format}",
      urlParameters: [Ms],
      queryParameters: [ms],
      headerParameters: [is],
      requestBody: {
        parameterPath: "bufferRequestBody",
        mapper: T(T({}, Hn), { required: !0 }),
      },
      responses: { 200: { bodyMapper: Un }, default: { bodyMapper: Ui } },
      serializer: em,
    },
    im = {
      httpMethod: "GET",
      path: "spatial/buffer/{format}",
      urlParameters: [Ms],
      queryParameters: [
        ms,
        To,
        {
          parameterPath: "distances",
          mapper: {
            required: !0,
            serializedName: "distances",
            type: { name: "String" },
          },
        },
      ],
      headerParameters: [is],
      responses: { 200: { bodyMapper: Un }, default: { bodyMapper: Ui } },
      serializer: em,
    },
    nm = {
      httpMethod: "POST",
      path: "spatial/closestPoint/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, ks, Ys, to],
      headerParameters: [is],
      requestBody: {
        parameterPath: "closestPointRequestBody",
        mapper: T(T({}, Bn), { required: !0 }),
      },
      responses: { 200: { bodyMapper: Vn }, default: { bodyMapper: Ui } },
      serializer: em,
    },
    sm = {
      httpMethod: "GET",
      path: "spatial/closestPoint/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, To, ks, Ys, to],
      headerParameters: [is],
      responses: { 200: { bodyMapper: kn }, default: { bodyMapper: Ui } },
      serializer: em,
    },
    om = {
      httpMethod: "POST",
      path: "spatial/pointInPolygon/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, ks, Ys],
      headerParameters: [is],
      requestBody: {
        parameterPath: "pointInPolygonRequestBody",
        mapper: T(T({}, Bn), { required: !0 }),
      },
      responses: { 200: { bodyMapper: Wn }, default: { bodyMapper: Ui } },
      serializer: em,
    },
    lm = {
      httpMethod: "GET",
      path: "spatial/pointInPolygon/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, To, ks, Ys],
      headerParameters: [is],
      responses: { 200: { bodyMapper: jn }, default: { bodyMapper: Ui } },
      serializer: em,
    },
    mm = {
      httpMethod: "GET",
      path: "spatial/greatCircleDistance/{format}",
      urlParameters: [Ms],
      queryParameters: [ms, lo],
      headerParameters: [is],
      responses: { 200: { bodyMapper: Yn }, default: { bodyMapper: Ui } },
      serializer: em,
    },
    pm =
      (b(um, (Zl = Z)),
      (um.prototype.sendRequest = function (t) {
        return C(this, void 0, void 0, function () {
          return O(this, function (e) {
            return (
              t.headers || (t.headers = new y()),
              t.headers.set(ka, Va),
              t.headers.set(Ua, Va + "/2.0.5 (Web)"),
              [2, this._nextPolicy.sendRequest(t)]
            );
          });
        });
      }),
      um);
  function um(e, t) {
    return Zl.call(this, e, t) || this;
  }
  var dm =
    ((ym.prototype.create = function (e, t) {
      return new pm(e, t);
    }),
    ym);
  function ym() {}
  var cm,
    hm = (b(fm, (cm = Gi)), fm);
  function fm(e, t) {
    var r = this;
    if (null == e) throw new Error("'credentials' cannot be null.");
    if (!(t = t || {}).userAgent) {
      var a = Hi();
      t.userAgent = "/ " + a;
    }
    return (
      ((r = cm.call(this, e, t) || this).apiVersion = "1.0"),
      (r.acceptLanguage = "en-US"),
      (r.longRunningOperationRetryTimeout = 30),
      (r.baseUri = t.baseUri || r.baseUri || "https://atlas.microsoft.com"),
      (r.requestContentType = "application/json; charset=utf-8"),
      (r.credentials = e),
      null !== t.acceptLanguage &&
        void 0 !== t.acceptLanguage &&
        (r.acceptLanguage = t.acceptLanguage),
      null !== t.longRunningOperationRetryTimeout &&
        void 0 !== t.longRunningOperationRetryTimeout &&
        (r.longRunningOperationRetryTimeout =
          t.longRunningOperationRetryTimeout),
      r
    );
  }
  var Nm =
    ((gm.newPipeline = function (e, t) {
      void 0 === t && (t = {});
      var r = [ae(), new ii(t.retryOptions), new pi(), e];
      return new Qa(r, { HTTPClient: t.httpClient, logger: t.logger });
    }),
    gm);
  function gm(e, t) {
    (this.pipeline = e),
      /^\w+:\/\//.test(t)
        ? (this.mapsUrl = t)
        : (this.mapsUrl = "https://" + t);
    var r = this.pipeline.toServiceClientOptions();
    r.requestPolicyFactories.push(new dm()),
      (this.mapsClientContext = new hm(
        { signRequest: Promise.resolve },
        T(T({}, r), { baseUri: this.mapsUrl })
      )),
      (this.mapsClientContext.apiVersion = "1.0"),
      (this.mapsClientContext.longRunningOperationRetryTimeout = 5);
  }
  var Sm,
    Rm =
      (b(vm, (Sm = Nm)),
      (vm.prototype.getMapImageryTile = function (o, l, m, p) {
        return C(this, void 0, void 0, function () {
          var t, r, a, i, n, s;
          return O(this, function (e) {
            switch (e.label) {
              case 0:
                return [
                  4,
                  this.renderContext.getMapImageryTile(l, m, p, {
                    abortSignal: o,
                  }),
                ];
              case 1:
                return (t = e.sent()).readableStreamBody
                  ? ((a = (r = Object).assign), [4, za(t.readableStreamBody)])
                  : [3, 3];
              case 2:
                return [
                  2,
                  a.apply(r, [e.sent(), { rawResponse: t._response }]),
                ];
              case 3:
                return t.blobBody
                  ? ((n = (i = Object).assign), (s = ba), [4, t.blobBody])
                  : [3, 6];
              case 4:
                return [4, s.apply(void 0, [e.sent()])];
              case 5:
                return [
                  2,
                  n.apply(i, [e.sent(), { rawResponse: t._response }]),
                ];
              case 6:
                return [2];
            }
          });
        });
      }),
      (vm.prototype.getMapTile = function (o, l, m, p, u, d, y, c) {
        return (
          void 0 === c && (c = {}),
          C(this, void 0, void 0, function () {
            var t, r, a, i, n, s;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  return [
                    4,
                    this.renderContext.getMapTile(
                      l,
                      m,
                      p,
                      u,
                      d,
                      y,
                      T(T({}, c), { abortSignal: o })
                    ),
                  ];
                case 1:
                  return (t = e.sent()).readableStreamBody
                    ? ((a = (r = Object).assign), [4, za(t.readableStreamBody)])
                    : [3, 3];
                case 2:
                  return [
                    2,
                    a.apply(r, [e.sent(), { rawResponse: t._response }]),
                  ];
                case 3:
                  return t.blobBody
                    ? ((n = (i = Object).assign), (s = ba), [4, t.blobBody])
                    : [3, 6];
                case 4:
                  return [4, s.apply(void 0, [e.sent()])];
                case 5:
                  return [
                    2,
                    n.apply(i, [e.sent(), { rawResponse: t._response }]),
                  ];
                case 6:
                  return [2];
              }
            });
          })
        );
      }),
      (vm.prototype.getMapImage = function (o, l) {
        return C(this, void 0, void 0, function () {
          var t, r, a, i, n, s;
          return O(this, function (e) {
            switch (e.label) {
              case 0:
                return [
                  4,
                  this.renderContext.getMapImage(
                    T(
                      T(
                        T(
                          T({}, l),
                          l.center && { center: this.centerToString(l.center) }
                        ),
                        l.bbox && { bbox: this.bboxToString(l.bbox) }
                      ),
                      { abortSignal: o }
                    )
                  ),
                ];
              case 1:
                return (t = e.sent()).readableStreamBody
                  ? ((a = (r = Object).assign), [4, za(t.readableStreamBody)])
                  : [3, 3];
              case 2:
                return [
                  2,
                  a.apply(r, [e.sent(), { rawResponse: t._response }]),
                ];
              case 3:
                return t.blobBody
                  ? ((n = (i = Object).assign), (s = ba), [4, t.blobBody])
                  : [3, 6];
              case 4:
                return [4, s.apply(void 0, [e.sent()])];
              case 5:
                return [
                  2,
                  n.apply(i, [e.sent(), { rawResponse: t._response }]),
                ];
              case 6:
                return [2];
            }
          });
        });
      }),
      (vm.prototype.centerToString = function (e) {
        if (e.length < 2)
          throw new Error(
            "The center must contain both longitude and latitude, e.g. [longitude, latitude]"
          );
        return e[0] + "," + e[1];
      }),
      (vm.prototype.bboxToString = function (e) {
        if (e.length < 4)
          throw new Error(
            "The bbox must contain at least four values, e.g. [south lon, west lat, north lon, east lat]"
          );
        return e.length < 6
          ? e[0] + "," + e[1] + "," + e[2] + "," + e[3]
          : e[0] + "," + e[1] + "," + e[3] + "," + e[4];
      }),
      vm);
  function vm(e, t) {
    void 0 === t && (t = "https://atlas.microsoft.com");
    var r = Sm.call(this, e, t) || this;
    return (r.renderContext = new Cl(r.mapsClientContext)), r;
  }
  var Pm =
    ((zm.prototype.getFeatures = function () {
      var e = this.response.routes.map(function (e, t) {
        var r = e.legs.map(function (e) {
            return e.points.map(function (e) {
              return [e.longitude, e.latitude];
            });
          }),
          a = T(T({}, e), {
            legSummaries: e.legs.map(function (e) {
              return e.summary;
            }),
            resultIndex: t,
          });
        return (
          delete a.legs,
          {
            type: "Feature",
            geometry: { type: "MultiLineString", coordinates: r },
            properties: a,
          }
        );
      });
      return { type: "FeatureCollection", features: e, bbox: Ta(e) };
    }),
    zm);
  function zm(e) {
    this.response = e;
  }
  var bm =
    ((Tm.prototype.getFeatures = function () {
      var e = {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            this.response.reachableRange.boundary.map(function (e) {
              return [e.longitude, e.latitude];
            }),
          ],
        },
        properties: {},
      };
      return {
        type: "FeatureCollection",
        features: [
          e,
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                this.response.reachableRange.center.longitude,
                this.response.reachableRange.center.latitude,
              ],
            },
            properties: {},
          },
        ],
        bbox: Ta([e]),
      };
    }),
    Tm);
  function Tm(e) {
    this.response = e;
  }
  var Cm,
    Om =
      (b(wm, (Cm = Nm)),
      (wm.prototype.calculateRouteDirections = function (i, n, s) {
        return (
          void 0 === s && (s = {}),
          C(this, void 0, void 0, function () {
            var t, r, a;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  if (n.length < 2)
                    throw new Error(
                      "The coordinates must contain at least two positions"
                    );
                  return (
                    (t = n
                      .map(function (e) {
                        if (e.length < 2)
                          throw new Error(
                            "The coordinate must contain both longitude and latitude, e.g. [longitude, latitude]"
                          );
                        return e[1] + "," + e[0];
                      })
                      .join(":")),
                    s.postBody
                      ? [
                          4,
                          this.routeContext.postRouteDirections(
                            t,
                            s.postBody,
                            T(T({}, s), { abortSignal: i })
                          ),
                        ]
                      : [3, 2]
                  );
                case 1:
                  return (a = e.sent()), [3, 4];
                case 2:
                  return [
                    4,
                    this.routeContext.getRouteDirections(
                      t,
                      T(T({}, s), { abortSignal: i })
                    ),
                  ];
                case 3:
                  (a = e.sent()), (e.label = 4);
                case 4:
                  return [
                    2,
                    T(T({}, (r = a)), {
                      rawResponse: r._response,
                      geojson: new Pm(r),
                    }),
                  ];
              }
            });
          })
        );
      }),
      (wm.prototype.calculateRouteRange = function (a, i, n) {
        return (
          void 0 === n && (n = {}),
          C(this, void 0, void 0, function () {
            var t, r;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  if (i.length < 2)
                    throw new Error(
                      "The center must contain both longitude and latitude, e.g. [longitude, latitude]"
                    );
                  return (
                    (t = i[1] + "," + i[0]),
                    [
                      4,
                      this.routeContext.getRouteRange(
                        t,
                        T(T({}, n), { abortSignal: a })
                      ),
                    ]
                  );
                case 1:
                  return (
                    (r = e.sent()),
                    [
                      2,
                      T(T({}, r), {
                        rawResponse: r._response,
                        geojson: new bm(r),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (wm.prototype.calculateRouteMatrix = function (r, a, i) {
        return (
          void 0 === i && (i = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  return [
                    4,
                    this.routeContext.postRouteMatrixPreview(
                      a,
                      T(T({}, i), { abortSignal: r })
                    ),
                  ];
                case 1:
                  return (
                    (t = e.sent()),
                    [2, T(T({}, t), { rawResponse: t._response })]
                  );
              }
            });
          })
        );
      }),
      wm);
  function wm(e, t) {
    void 0 === t && (t = "https://atlas.microsoft.com");
    var r = Cm.call(this, e, t) || this;
    return (r.routeContext = new ol(r.mapsClientContext)), r;
  }
  var Em =
    ((Im.prototype.getFeatures = function () {
      for (var e = [], t = 0; t < this.response.results.length; t++) {
        var r = this.response.results[t],
          a = T(T({}, r), { resultIndex: t });
        delete a.position;
        var i = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [r.position.lon, r.position.lat],
          },
          properties: a,
        };
        r.id && (i.id = r.id),
          r.viewport &&
            (i.bbox = [
              r.viewport.topLeftPoint.lon,
              r.viewport.btmRightPoint.lat,
              r.viewport.btmRightPoint.lon,
              r.viewport.topLeftPoint.lat,
            ]),
          e.push(i);
      }
      return { type: "FeatureCollection", features: e, bbox: Ta(e) };
    }),
    Im);
  function Im(e) {
    this.response = e;
  }
  var qm =
    ((Am.prototype.getFeatures = function () {
      for (
        var e = [], t = 0, r = this.response.additionalData;
        t < r.length;
        t++
      )
        for (
          var a = r[t], i = 0, n = a.geometryData.features;
          i < n.length;
          i++
        ) {
          var s = n[i],
            o = T(T({}, s.properties), a);
          delete o.geometryData,
            e.push({ type: "Feature", geometry: s.geometry, properties: o });
        }
      return { type: "FeatureCollection", features: e, bbox: Ta(e) };
    }),
    Am);
  function Am(e) {
    this.response = e;
  }
  var Mm =
    ((_m.prototype.getFeatures = function () {
      for (var e = [], t = 0; t < this.response.addresses.length; t++) {
        var r = this.response.addresses[t],
          a = T(T({}, r), { resultIndex: t });
        delete a.position;
        var i = r.position.split(",").map(Number.parseFloat),
          n = i[0],
          s = {
            type: "Feature",
            geometry: { type: "Point", coordinates: [i[1], n] },
            properties: a,
          };
        e.push(s);
      }
      return { type: "FeatureCollection", features: e, bbox: Ta(e) };
    }),
    _m);
  function _m(e) {
    this.response = e;
  }
  var xm,
    Lm =
      (b(Dm, (xm = Nm)),
      (Dm.prototype.searchFuzzy = function (r, a, i) {
        return (
          void 0 === i && (i = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  if (Array.isArray(a)) {
                    if (!(1 < a.length))
                      throw new Error(
                        "The query must contain both longitude and latitude, e.g. [longitude, latitude]"
                      );
                    a = a[1] + "," + a[0];
                  }
                  return [
                    4,
                    this.searchContext.getSearchFuzzy(
                      a,
                      T(T({}, i), { abortSignal: r })
                    ),
                  ];
                case 1:
                  return (
                    (t = e.sent()),
                    [
                      2,
                      T(T({}, t), {
                        rawResponse: t._response,
                        geojson: new Em(t),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (Dm.prototype.searchPOI = function (r, a, i) {
        return (
          void 0 === i && (i = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  return [
                    4,
                    this.searchContext.getSearchPOI(
                      a,
                      T(T({}, i), { abortSignal: r })
                    ),
                  ];
                case 1:
                  return (
                    (t = e.sent()),
                    [
                      2,
                      T(T({}, t), {
                        rawResponse: t._response,
                        geojson: new Em(t),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (Dm.prototype.searchNearby = function (i, n, s) {
        return (
          void 0 === s && (s = {}),
          C(this, void 0, void 0, function () {
            var t, r, a;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  if (n.length < 2)
                    throw new Error(
                      "The query must contain both longitude and latitude, e.g. [longitude, latitude]"
                    );
                  return (
                    (t = n[0]),
                    (r = n[1]),
                    [
                      4,
                      this.searchContext.getSearchNearby(
                        r,
                        t,
                        T(T({}, s), { abortSignal: i })
                      ),
                    ]
                  );
                case 1:
                  return (
                    (a = e.sent()),
                    [
                      2,
                      T(T({}, a), {
                        rawResponse: a._response,
                        geojson: new Em(a),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (Dm.prototype.searchPOICategory = function (r, a, i) {
        return (
          void 0 === i && (i = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  return [
                    4,
                    this.searchContext.getSearchPOICategory(
                      a,
                      T(T({}, i), { abortSignal: r })
                    ),
                  ];
                case 1:
                  return (
                    (t = e.sent()),
                    [
                      2,
                      T(T({}, t), {
                        rawResponse: t._response,
                        geojson: new Em(t),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (Dm.prototype.searchAddress = function (r, a, i) {
        return (
          void 0 === i && (i = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  return [
                    4,
                    this.searchContext.getSearchAddress(
                      a,
                      T(T({}, i), { abortSignal: r })
                    ),
                  ];
                case 1:
                  return (
                    (t = e.sent()),
                    [
                      2,
                      T(T({}, t), {
                        rawResponse: t._response,
                        geojson: new Em(t),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (Dm.prototype.searchAddressReverse = function (a, i, n) {
        return (
          void 0 === n && (n = {}),
          C(this, void 0, void 0, function () {
            var t, r;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  if (i.length < 2)
                    throw new Error(
                      "The position must contain both longitude and latitude, e.g. [longitude, latitude]"
                    );
                  return (
                    (t = i[1] + "," + i[0]),
                    [
                      4,
                      this.searchContext.getSearchAddressReverse(
                        t,
                        T(T({}, n), { abortSignal: a })
                      ),
                    ]
                  );
                case 1:
                  return (
                    (r = e.sent()),
                    [
                      2,
                      T(T({}, r), {
                        rawResponse: r._response,
                        geojson: new Mm(r),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (Dm.prototype.searchAddressReverseCrossStreet = function (a, i, n) {
        return (
          void 0 === n && (n = {}),
          C(this, void 0, void 0, function () {
            var t, r;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  if (i.length < 2)
                    throw new Error(
                      "The position must contain both longitude and latitude, e.g. [longitude, latitude]"
                    );
                  return (
                    (t = i[1] + "," + i[0]),
                    [
                      4,
                      this.searchContext.getSearchAddressReverseCrossStreet(
                        t,
                        T(T({}, n), { abortSignal: a })
                      ),
                    ]
                  );
                case 1:
                  return (
                    (r = e.sent()),
                    [
                      2,
                      T(T({}, r), {
                        rawResponse: r._response,
                        geojson: new Mm(r),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (Dm.prototype.searchAddressStructured = function (r, a, i) {
        return (
          void 0 === i && (i = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  return [
                    4,
                    this.searchContext.getSearchAddressStructured(
                      a,
                      T(T({}, i), { abortSignal: r })
                    ),
                  ];
                case 1:
                  return (
                    (t = e.sent()),
                    [
                      2,
                      T(T({}, t), {
                        rawResponse: t._response,
                        geojson: new Em(t),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (Dm.prototype.searchInsideGeometry = function (r, a, i, n) {
        return (
          void 0 === n && (n = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  return [
                    4,
                    this.searchContext.postSearchInsideGeometry(
                      a,
                      i,
                      T(T({}, n), { abortSignal: r })
                    ),
                  ];
                case 1:
                  return (
                    (t = e.sent()),
                    [
                      2,
                      T(T({}, t), {
                        rawResponse: t._response,
                        geojson: new Em(t),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (Dm.prototype.searchAlongRoute = function (r, a, i, n, s) {
        return (
          void 0 === s && (s = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  return [
                    4,
                    this.searchContext.postSearchAlongRoute(
                      a,
                      i,
                      n,
                      T(T({}, s), { abortSignal: r })
                    ),
                  ];
                case 1:
                  return (
                    (t = e.sent()),
                    [
                      2,
                      T(T({}, t), {
                        rawResponse: t._response,
                        geojson: new Em(t),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (Dm.prototype.searchPolygon = function (a, i) {
        return C(this, void 0, void 0, function () {
          var t, r;
          return O(this, function (e) {
            switch (e.label) {
              case 0:
                if (i.length < 1)
                  throw new Error(
                    "At least one geometry UUID must be specified"
                  );
                return (
                  (t = i.join(",")),
                  [
                    4,
                    this.searchContext.getSearchPolygon(t, { abortSignal: a }),
                  ]
                );
              case 1:
                return (
                  (r = e.sent()),
                  [
                    2,
                    T(T({}, r), {
                      rawResponse: r._response,
                      geojson: new qm(r),
                    }),
                  ]
                );
            }
          });
        });
      }),
      Dm);
  function Dm(e, t) {
    void 0 === t && (t = "https://atlas.microsoft.com");
    var r = xm.call(this, e, t) || this;
    return (r.searchContext = new ko(r.mapsClientContext)), r;
  }
  var Bm =
    ((Gm.prototype.getFeatures = function () {
      var e = this.response.result.map(function (e) {
        var t = T({}, e);
        return (
          delete t.position,
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [e.position.lon, e.position.lat],
            },
            properties: t,
          }
        );
      });
      return { type: "FeatureCollection", bbox: Ta(e), features: e };
    }),
    Gm);
  function Gm(e) {
    this.response = e;
  }
  var Fm =
    ((Hm.prototype.getFeatures = function () {
      var e = this.response.geometries.map(function (e) {
        var t = T({}, e);
        return (
          delete t.nearestLat,
          delete t.nearestLon,
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [e.nearestLon, e.nearestLat],
            },
            properties: t,
          }
        );
      });
      return { type: "FeatureCollection", bbox: Ta(e), features: e };
    }),
    Hm);
  function Hm(e) {
    this.response = e;
  }
  var Um =
    ((km.prototype.getFeatures = function () {
      var e = T(T({}, this.response.result), this.response.summary);
      delete e.sourcePoint;
      var t = [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              this.response.summary.sourcePoint.lon,
              this.response.summary.sourcePoint.lat,
            ],
          },
          properties: e,
        },
      ];
      return { type: "FeatureCollection", bbox: Ta(t), features: t };
    }),
    km);
  function km(e) {
    this.response = e;
  }
  var Vm,
    jm =
      (b(Wm, (Vm = Nm)),
      (Wm.prototype.getBuffer = function (i, n, s) {
        return C(this, void 0, void 0, function () {
          var t, r, a;
          return O(this, function (e) {
            switch (e.label) {
              case 0:
                if (s.length < 1)
                  throw new Error("At least one distance must be specified");
                return "string" != typeof n
                  ? [3, 2]
                  : [
                      4,
                      this.spatialContext.getBuffer(n, s.join(";"), {
                        abortSignal: i,
                      }),
                    ];
              case 1:
                return (r = e.sent()), [3, 4];
              case 2:
                return [
                  4,
                  this.spatialContext.postBuffer(
                    { geometries: n, distances: s },
                    { abortSignal: i }
                  ),
                ];
              case 3:
                (r = e.sent()), (e.label = 4);
              case 4:
                return (
                  (t = r).result &&
                    t.result.features &&
                    ((a = t.result).bbox = Ta(a.features)),
                  [2, T(T({}, t), { rawResponse: t._response })]
                );
            }
          });
        });
      }),
      (Wm.prototype.getClosestPoint = function (n, s, o, l) {
        return (
          void 0 === l && (l = {}),
          C(this, void 0, void 0, function () {
            var t, r, a, i;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  if (s.length < 2)
                    throw new Error(
                      "The position must contain both longitude and latitude, e.g. [longitude, latitude]"
                    );
                  return (
                    (t = s[0]),
                    (r = s[1]),
                    "string" != typeof o
                      ? [3, 2]
                      : [
                          4,
                          this.spatialContext.getClosestPoint(
                            o,
                            r,
                            t,
                            T(T({}, l), { abortSignal: n })
                          ),
                        ]
                  );
                case 1:
                  return (i = e.sent()), [3, 4];
                case 2:
                  return [
                    4,
                    this.spatialContext.postClosestPoint(
                      r,
                      t,
                      o,
                      T(T({}, l), { abortSignal: n })
                    ),
                  ];
                case 3:
                  (i = e.sent()), (e.label = 4);
                case 4:
                  return [
                    2,
                    T(T({}, (a = i)), {
                      rawResponse: a._response,
                      geojson: new Bm(a),
                    }),
                  ];
              }
            });
          })
        );
      }),
      (Wm.prototype.getGeofence = function (n, s, o, l, m) {
        return (
          void 0 === m && (m = {}),
          C(this, void 0, void 0, function () {
            var t, r, a, i;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  if (l.length < 2)
                    throw new Error(
                      "The position must contain both longitude and latitude, e.g. [longitude, latitude]"
                    );
                  return (
                    (t = l[0]),
                    (r = l[1]),
                    "string" != typeof o
                      ? [3, 2]
                      : [
                          4,
                          this.spatialContext.getGeofence(
                            s,
                            o,
                            r,
                            t,
                            T(T({}, m), { abortSignal: n })
                          ),
                        ]
                  );
                case 1:
                  return (i = e.sent()), [3, 4];
                case 2:
                  return [
                    4,
                    this.spatialContext.postGeofence(
                      s,
                      r,
                      t,
                      o,
                      T(T({}, m), { abortSignal: n })
                    ),
                  ];
                case 3:
                  (i = e.sent()), (e.label = 4);
                case 4:
                  return [
                    2,
                    T(T({}, (a = i)), {
                      rawResponse: a._response,
                      geojson: new Fm(a),
                    }),
                  ];
              }
            });
          })
        );
      }),
      (Wm.prototype.getGreatCircleDistance = function (a, i) {
        return C(this, void 0, void 0, function () {
          var t, r;
          return O(this, function (e) {
            switch (e.label) {
              case 0:
                if (i.length < 2)
                  throw new Error(
                    "The coordinates must contain at least two positions"
                  );
                return (
                  (t = i
                    .map(function (e) {
                      if (e.length < 2)
                        throw new Error(
                          "The coordinate must contain both longitude and latitude, e.g. [longitude, latitude]"
                        );
                      return e[1] + "," + e[0];
                    })
                    .join(":")),
                  [
                    4,
                    this.spatialContext.getGreatCircleDistance(t, {
                      abortSignal: a,
                    }),
                  ]
                );
              case 1:
                return (
                  (r = e.sent()), [2, T(T({}, r), { rawResponse: r._response })]
                );
            }
          });
        });
      }),
      (Wm.prototype.getPointInPolygon = function (n, s, o) {
        return C(this, void 0, void 0, function () {
          var t, r, a, i;
          return O(this, function (e) {
            switch (e.label) {
              case 0:
                if (o.length < 2)
                  throw new Error(
                    "The position must contain both longitude and latitude, e.g. [longitude, latitude]"
                  );
                return (
                  (t = o[0]),
                  (r = o[1]),
                  "string" != typeof s
                    ? [3, 2]
                    : [
                        4,
                        this.spatialContext.getPointInPolygon(s, r, t, {
                          abortSignal: n,
                        }),
                      ]
                );
              case 1:
                return (i = e.sent()), [3, 4];
              case 2:
                return [
                  4,
                  this.spatialContext.postPointInPolygon(r, t, s, {
                    abortSignal: n,
                  }),
                ];
              case 3:
                (i = e.sent()), (e.label = 4);
              case 4:
                return [
                  2,
                  T(T({}, (a = i)), {
                    rawResponse: a._response,
                    geojson: new Um(a),
                  }),
                ];
            }
          });
        });
      }),
      Wm);
  function Wm(e, t) {
    void 0 === t && (t = "https://atlas.microsoft.com");
    var r = Vm.call(this, e, t) || this;
    return (r.spatialContext = new $l(r.mapsClientContext)), r;
  }
  var Ym,
    Jm =
      (b(Km, (Ym = Nm)),
      (Km.prototype.getTimezoneByCoordinates = function (a, i, n) {
        return (
          void 0 === n && (n = {}),
          C(this, void 0, void 0, function () {
            var t, r;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  if (i.length < 2)
                    throw new Error(
                      "The coordinate must contain both longitude and latitude, e.g. [longitude, latitude]"
                    );
                  return (
                    (t = i[1] + "," + i[0]),
                    [
                      4,
                      this.timezoneContext.getTimezoneByCoordinates(
                        t,
                        T(T({}, n), { abortSignal: a })
                      ),
                    ]
                  );
                case 1:
                  return (
                    (r = e.sent()),
                    [2, T(T({}, r), { rawResponse: r._response })]
                  );
              }
            });
          })
        );
      }),
      (Km.prototype.getTimezoneById = function (r, a, i) {
        return (
          void 0 === i && (i = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  return [
                    4,
                    this.timezoneContext.getTimezoneByID(
                      a,
                      T(T({}, i), { abortSignal: r })
                    ),
                  ];
                case 1:
                  return (
                    (t = e.sent()),
                    [2, T(T({}, t), { rawResponse: t._response })]
                  );
              }
            });
          })
        );
      }),
      Km);
  function Km(e, t) {
    void 0 === t && (t = "https://atlas.microsoft.com");
    var r = Ym.call(this, e, t) || this;
    return (r.timezoneContext = new fl(r.mapsClientContext)), r;
  }
  var Xm =
    (($m.prototype.getFeatures = function () {
      var e = T({}, this.response);
      delete e.position, delete e._response;
      var t = [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              this.response.position.longitude,
              this.response.position.latitude,
            ],
          },
          properties: e,
        },
      ];
      return { type: "FeatureCollection", features: t, bbox: Ta(t) };
    }),
    $m);
  function $m(e) {
    this.response = e;
  }
  var Qm =
    ((Zm.prototype.getFeatures = function () {
      var e = this.response.results.map(function (e) {
        var t = T({}, e);
        return (
          delete t.geometry,
          { type: "Feature", geometry: e.geometry, properties: t }
        );
      });
      return { type: "FeatureCollection", features: e, bbox: Ta(e) };
    }),
    Zm);
  function Zm(e) {
    this.response = e;
  }
  var ep =
    ((tp.prototype.getFeatures = function () {
      var e = this.response.results.map(function (e) {
        var t = T({}, e);
        return (
          delete t.position,
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [e.position.longitude, e.position.latitude],
            },
            properties: t,
          }
        );
      });
      return { type: "FeatureCollection", features: e, bbox: Ta(e) };
    }),
    tp);
  function tp(e) {
    this.response = e;
  }
  var rp =
    ((ap.prototype.getFeatures = function () {
      var e = this.response.results.map(function (e) {
        var t = T(T({}, e), { stop: T({}, e.stop) });
        return (
          delete t.stop.position,
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                e.stop.position.longitude,
                e.stop.position.latitude,
              ],
            },
            properties: t,
          }
        );
      });
      return { type: "FeatureCollection", features: e, bbox: Ta(e) };
    }),
    ap);
  function ap(e) {
    this.response = e;
  }
  var ip =
    ((np.prototype.getFeatures = function () {
      var e = T({}, this.response);
      delete e.position, delete e._response;
      var t = [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              this.response.position.longitude,
              this.response.position.latitude,
            ],
          },
          properties: e,
        },
      ];
      return { type: "FeatureCollection", features: t, bbox: Ta(t) };
    }),
    np);
  function np(e) {
    this.response = e;
  }
  var sp =
    ((op.prototype.getFeatures = function () {
      var e = this.response.legs
        .filter(function (e) {
          return e.legType !== St.Wait;
        })
        .filter(function (e) {
          return e.geometry || (e.origin && e.destination) || e.stops;
        })
        .map(function (e) {
          var t;
          if (e.geometry) t = e.geometry.coordinates;
          else if (e.origin && e.destination)
            t = [
              [e.origin.position.longitude, e.origin.position.latitude],
              [
                e.destination.position.longitude,
                e.destination.position.latitude,
              ],
            ];
          else if (e.stops) {
            var r = e.stops[0],
              a = e.stops[e.stops.length - 1];
            t = [
              [r.position.longitude, r.position.latitude],
              [a.position.longitude, a.position.latitude],
            ];
          }
          var i = T({}, e);
          return (
            delete i.geometry,
            delete i.origin,
            delete i.destination,
            {
              type: "Feature",
              geometry: { type: "LineString", coordinates: t },
              properties: i,
            }
          );
        });
      return { type: "FeatureCollection", features: e, bbox: Ta(e) };
    }),
    op);
  function op(e) {
    this.response = e;
  }
  var lp =
    ((mp.prototype.getFeatures = function () {
      var e = [];
      if (this.response.patterns)
        for (var t = 0, r = this.response.patterns; t < r.length; t++) {
          var a = r[t];
          delete (s = T({}, a)).geometry,
            e.push({ type: "Feature", geometry: a.geometry, properties: s });
        }
      if (this.response.stops)
        for (var i = 0, n = this.response.stops; i < n.length; i++) {
          var s,
            o = n[i];
          delete (s = T({}, o)).position,
            e.push({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [o.position.longitude, o.position.latitude],
              },
              properties: s,
            });
        }
      return { type: "FeatureCollection", features: e, bbox: Ta(e) };
    }),
    mp);
  function mp(e) {
    this.response = e;
  }
  var pp =
    ((up.prototype.getFeatures = function () {
      var e = T(T({}, this.response), { stop: T({}, this.response.stop) });
      delete e.stop.position, delete e._response;
      var t = [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              this.response.stop.position.longitude,
              this.response.stop.position.latitude,
            ],
          },
          properties: e,
        },
      ];
      return { type: "FeatureCollection", features: t, bbox: Ta(t) };
    }),
    up);
  function up(e) {
    this.response = e;
  }
  var dp,
    yp =
      (b(cp, (dp = Nm)),
      (cp.prototype.getCarShareInfo = function (r, a, i) {
        return (
          void 0 === i && (i = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  return (
                    (a = decodeURIComponent(a)),
                    [
                      4,
                      this.mobilityContext.getCarShareInfoPreview(
                        a,
                        T(T({}, i), { abortSignal: r })
                      ),
                    ]
                  );
                case 1:
                  return (
                    (t = e.sent()),
                    [
                      2,
                      T(T({}, t), {
                        rawResponse: t._response,
                        geojson: new Xm(t),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (cp.prototype.getMetroArea = function (r, a, i) {
        return (
          void 0 === i && (i = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  if (Array.isArray(a) && a.length < 2)
                    throw new Error(
                      "The query must contain both longitude and latitude, e.g. [longitude, latitude]"
                    );
                  return (
                    (a = "string" == typeof a ? a : a[1] + "," + a[0]),
                    [
                      4,
                      this.mobilityContext.getMetroAreaPreview(
                        a,
                        T(T({}, i), { abortSignal: r })
                      ),
                    ]
                  );
                case 1:
                  return (
                    (t = e.sent()),
                    [
                      2,
                      T(T({}, t), {
                        rawResponse: t._response,
                        geojson: new Qm(t),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (cp.prototype.getMetroAreaInfo = function (r, a, i, n) {
        return (
          void 0 === n && (n = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  return [
                    4,
                    this.mobilityContext.getMetroAreaInfoPreview(
                      a,
                      i,
                      T(T({}, n), { abortSignal: r })
                    ),
                  ];
                case 1:
                  return (
                    (t = e.sent()),
                    [2, T(T({}, t), { rawResponse: t._response })]
                  );
              }
            });
          })
        );
      }),
      (cp.prototype.getNearbyTransit = function (a, i, n, s) {
        return (
          void 0 === s && (s = {}),
          C(this, void 0, void 0, function () {
            var t, r;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  if (n.length < 2)
                    throw new Error(
                      "The location must contain both longitude and latitude, e.g. [longitude, latitude]"
                    );
                  return (
                    (t = n[1] + "," + n[0]),
                    [
                      4,
                      this.mobilityContext.getNearbyTransitPreview(
                        i,
                        t,
                        T(T({}, s), { abortSignal: a })
                      ),
                    ]
                  );
                case 1:
                  return (
                    (r = e.sent()),
                    [
                      2,
                      T(T({}, r), {
                        rawResponse: r._response,
                        geojson: new ep(r),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (cp.prototype.getRealTimeArrivals = function (r, a, i, n) {
        return (
          void 0 === n && (n = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  if (Array.isArray(i)) {
                    if (0 === i.length)
                      throw new Error(
                        "The specified query array must contain at least one element"
                      );
                    i =
                      "number" == typeof i[0] ? i[1] + "," + i[0] : i.join(",");
                  }
                  return (
                    (i = decodeURIComponent(i)),
                    [
                      4,
                      this.mobilityContext.getRealTimeArrivalsPreview(
                        a,
                        i,
                        T(T({}, n), { abortSignal: r })
                      ),
                    ]
                  );
                case 1:
                  return (
                    (t = e.sent()),
                    [
                      2,
                      T(T({}, t), {
                        rawResponse: t._response,
                        geojson: new rp(t),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (cp.prototype.getTransitDockInfo = function (r, a, i) {
        return (
          void 0 === i && (i = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  return (
                    (a = decodeURIComponent(a)),
                    [
                      4,
                      this.mobilityContext.getTransitDockInfoPreview(
                        a,
                        T(T({}, i), { abortSignal: r })
                      ),
                    ]
                  );
                case 1:
                  return (
                    (t = e.sent()),
                    [
                      2,
                      T(T({}, t), {
                        rawResponse: t._response,
                        geojson: new ip(t),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (cp.prototype.getTransitItinerary = function (r, a, i) {
        return (
          void 0 === i && (i = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  return (
                    (a = decodeURIComponent(a)),
                    [
                      4,
                      this.mobilityContext.getTransitItineraryPreview(
                        a,
                        T(T({}, i), { abortSignal: r })
                      ),
                    ]
                  );
                case 1:
                  return (
                    (t = e.sent()),
                    [
                      2,
                      T(T({}, t), {
                        rawResponse: t._response,
                        geojson: new sp(t),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (cp.prototype.getTransitLineInfo = function (r, a, i, n) {
        return (
          void 0 === n && (n = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  return (
                    (i = decodeURIComponent(i)),
                    [
                      4,
                      this.mobilityContext.getTransitLineInfoPreview(
                        a,
                        i,
                        T(T({}, n), { abortSignal: r })
                      ),
                    ]
                  );
                case 1:
                  return (
                    (t = e.sent()),
                    [
                      2,
                      T(T({}, t), {
                        rawResponse: t._response,
                        geojson: new lp(t),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      (cp.prototype.getTransitRoute = function (r, a, i, n, s) {
        return (
          void 0 === s && (s = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  if (Array.isArray(i)) {
                    if (i.length < 2)
                      throw new Error(
                        "The origin must contain both longitude and latitude, e.g. [longitude, latitude]"
                      );
                    i = i[1] + "," + i[0];
                  }
                  if (Array.isArray(n)) {
                    if (n.length < 2)
                      throw new Error(
                        "The destination must contain both longitude and latitude, e.g. [longitude, latitude]"
                      );
                    n = n[1] + "," + n[0];
                  }
                  return (
                    (i = decodeURIComponent(i)),
                    (n = decodeURIComponent(n)),
                    [
                      4,
                      this.mobilityContext.getTransitRoutePreview(
                        a,
                        i,
                        n,
                        T(T({}, s), { abortSignal: r })
                      ),
                    ]
                  );
                case 1:
                  return (
                    (t = e.sent()),
                    [2, T(T({}, t), { rawResponse: t._response })]
                  );
              }
            });
          })
        );
      }),
      (cp.prototype.getTransitStopInfo = function (r, a, i, n) {
        return (
          void 0 === n && (n = {}),
          C(this, void 0, void 0, function () {
            var t;
            return O(this, function (e) {
              switch (e.label) {
                case 0:
                  return (
                    (i = decodeURIComponent(i)),
                    [
                      4,
                      this.mobilityContext.getTransitStopInfoPreview(
                        a,
                        i,
                        T(T({}, n), { abortSignal: r })
                      ),
                    ]
                  );
                case 1:
                  return (
                    (t = e.sent()),
                    [
                      2,
                      T(T({}, t), {
                        rawResponse: t._response,
                        geojson: new pp(t),
                      }),
                    ]
                  );
              }
            });
          })
        );
      }),
      cp);
  function cp(e, t) {
    void 0 === t && (t = "https://atlas.microsoft.com");
    var r = dp.call(this, e, t) || this;
    return (r.mobilityContext = new Dl(r.mapsClientContext)), r;
  }
  String.prototype.startsWith ||
    Object.defineProperty(String.prototype, "startsWith", {
      value: function (e, t) {
        return this.substring(!t || t < 0 ? 0 : +t, e.length) === e;
      },
    }),
    (d.Aborter = pa),
    (d.BaseRequestPolicy = Z),
    (d.Credential = da),
    (d.CredentialPolicy = ha),
    (d.HttpHeaders = y),
    (d.LoggingPolicyFactory = pi),
    (d.MapControlCredential = va),
    (d.MapControlCredentialPolicy = ga),
    (d.MapsURL = Nm),
    (d.MobilityURL = yp),
    (d.Models = ma),
    (d.Pipeline = Qa),
    (d.RenderURL = Rm),
    (d.RequestPolicyOptions = te),
    (d.RestError = q),
    (d.RetryPolicyFactory = ii),
    (d.RouteURL = Om),
    (d.SearchURL = Lm),
    (d.SpatialURL = jm),
    (d.SubscriptionKeyCredential = Ma),
    (d.SubscriptionKeyCredentialPolicy = Ia),
    (d.TimezoneURL = Jm),
    (d.TokenCredential = Ka),
    (d.TokenCredentialPolicy = Wa),
    (d.WebResource = I),
    (d.deserializationPolicy = ae),
    Object.defineProperty(d, "__esModule", { value: !0 });
});
