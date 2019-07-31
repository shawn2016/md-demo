!
function(e) {
	"function" == typeof define && "object" == typeof define.amd && define.amd && define(e)
}(function() {
	try {
		"object" != typeof JSON && (JSON = {}), function() {
			"use strict";

			function f(e) {
				return e < 10 ? "0" + e : e
			}
			function this_value() {
				return this.valueOf()
			}
			function quote(e) {
				return rx_escapable.lastIndex = 0, rx_escapable.test(e) ? '"' + e.replace(rx_escapable, function(e) {
					var t = meta[e];
					return "string" == typeof t ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
				}) + '"' : '"' + e + '"'
			}
			function str(e, t) {
				var r, s, n, a, i, o = gap,
					c = t[e];
				switch (c && "object" == typeof c && "function" == typeof c.toJSON && (c = c.toJSON(e)), "function" == typeof rep && (c = rep.call(t, e, c)), typeof c) {
				case "string":
					return quote(c);
				case "number":
					return isFinite(c) ? String(c) : "null";
				case "boolean":
				case "null":
					return String(c);
				case "object":
					if (!c) return "null";
					if (gap += indent, i = [], "[object Array]" === Object.prototype.toString.apply(c)) {
						for (a = c.length, r = 0; r < a; r += 1) i[r] = str(r, c) || "null";
						return n = 0 === i.length ? "[]" : gap ? "[\n" + gap + i.join(",\n" + gap) + "\n" + o + "]" : "[" + i.join(",") + "]", gap = o, n
					}
					if (rep && "object" == typeof rep) for (a = rep.length, r = 0; r < a; r += 1)"string" == typeof rep[r] && (s = rep[r], n = str(s, c), n && i.push(quote(s) + (gap ? ": " : ":") + n));
					else for (s in c) Object.prototype.hasOwnProperty.call(c, s) && (n = str(s, c), n && i.push(quote(s) + (gap ? ": " : ":") + n));
					return n = 0 === i.length ? "{}" : gap ? "{\n" + gap + i.join(",\n" + gap) + "\n" + o + "}" : "{" + i.join(",") + "}", gap = o, n
				}
			}
			var rx_one = /^[\],:{}\s]*$/,
				rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
				rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
				rx_four = /(?:^|:|,)(?:\s*\[)+/g,
				rx_escapable = /[\\\"--­؀-؄܏឴឵‌-‏ - ⁠-⁯﻿￰-￿]/g,
				rx_dangerous = /[­؀-؄܏឴឵‌-‏ - ⁠-⁯﻿￰-￿]/g;
			"function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
				return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
			}, Boolean.prototype.toJSON = this_value, Number.prototype.toJSON = this_value, String.prototype.toJSON = this_value);
			var gap, indent, meta, rep;
			"function" != typeof JSON.stringify && (meta = {
				"\b": "\\b",
				"\t": "\\t",
				"\n": "\\n",
				"\f": "\\f",
				"\r": "\\r",
				'"': '\\"',
				"\\": "\\\\"
			}, JSON.stringify = function(e, t, r) {
				var s;
				if (gap = "", indent = "", "number" == typeof r) for (s = 0; s < r; s += 1) indent += " ";
				else "string" == typeof r && (indent = r);
				if (rep = t, t && "function" != typeof t && ("object" != typeof t || "number" != typeof t.length)) throw new Error("JSON.stringify");
				return str("", {
					"": e
				})
			}), "function" != typeof JSON.parse && (JSON.parse = function(text, reviver) {
				function walk(e, t) {
					var r, s, n = e[t];
					if (n && "object" == typeof n) for (r in n) Object.prototype.hasOwnProperty.call(n, r) && (s = walk(n, r), void 0 !== s ? n[r] = s : delete n[r]);
					return reviver.call(e, t, n)
				}
				var j;
				if (text = String(text), rx_dangerous.lastIndex = 0, rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function(e) {
					return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
				})), rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""))) return j = eval("(" + text + ")"), "function" == typeof reviver ? walk({
					"": j
				}, "") : j;
				throw new SyntaxError("JSON.parse")
			})
		}();
		var sd = {},
			_ = sd._ = {};
		!
		function() {
			var e = Array.prototype,
				t = Function.prototype,
				r = Object.prototype,
				s = e.slice,
				n = r.toString,
				a = r.hasOwnProperty,
				i = (t.bind, e.forEach),
				o = (e.indexOf, Array.isArray),
				c = {},
				u = _.each = function(e, t, r) {
					if (null == e) return !1;
					if (i && e.forEach === i) e.forEach(t, r);
					else if (e.length === +e.length) {
						for (var s = 0, n = e.length; s < n; s++) if (s in e && t.call(r, e[s], s, e) === c) return !1
					} else for (var o in e) if (a.call(e, o) && t.call(r, e[o], o, e) === c) return !1
				};
			_.extend = function(e) {
				return u(s.call(arguments, 1), function(t) {
					for (var r in t) void 0 !== t[r] && (e[r] = t[r])
				}), e
			}, _.extend2Lev = function(e) {
				return u(s.call(arguments, 1), function(t) {
					for (var r in t) void 0 !== t[r] && (_.isObject(t[r]) && _.isObject(e[r]) ? _.extend(e[r], t[r]) : e[r] = t[r])
				}), e
			}, _.coverExtend = function(e) {
				return u(s.call(arguments, 1), function(t) {
					for (var r in t) void 0 !== t[r] && void 0 === e[r] && (e[r] = t[r])
				}), e
			}, _.isArray = o ||
			function(e) {
				return "[object Array]" === n.call(e)
			}, _.isFunction = function(e) {
				if (!e) return !1;
				try {
					return /^\s*\bfunction\b/.test(e)
				} catch (t) {
					return !1
				}
			}, _.isArguments = function(e) {
				return !(!e || !a.call(e, "callee"))
			}, _.toArray = function(e) {
				return e ? e.toArray ? e.toArray() : _.isArray(e) ? s.call(e) : _.isArguments(e) ? s.call(e) : _.values(e) : []
			}, _.values = function(e) {
				var t = [];
				return null == e ? t : (u(e, function(e) {
					t[t.length] = e
				}), t)
			}, _.indexOf = function(e, t) {
				var r = e.indexOf;
				if (r) return r.call(e, t);
				for (var s = 0; s < e.length; s++) if (t === e[s]) return s;
				return -1
			}, _.filter = function(e, t, r) {
				var s = Object.prototype.hasOwnProperty;
				if (e.filter) return e.filter(t);
				for (var n = [], a = 0; a < e.length; a++) if (s.call(e, a)) {
					var i = e[a];
					t.call(r, i, a, e) && n.push(i)
				}
				return n
			}, _.inherit = function(e, t) {
				return e.prototype = new t, e.prototype.constructor = e, e.superclass = t.prototype, e
			}, _.trim = function(e) {
				return e.replace(/^[\s﻿ ]+|[\s﻿ ]+$/g, "")
			}, _.isObject = function(e) {
				return null != e && "[object Object]" == n.call(e)
			}, _.isEmptyObject = function(e) {
				if (_.isObject(e)) {
					for (var t in e) if (a.call(e, t)) return !1;
					return !0
				}
				return !1
			}, _.isUndefined = function(e) {
				return void 0 === e
			}, _.isString = function(e) {
				return "[object String]" == n.call(e)
			}, _.isDate = function(e) {
				return "[object Date]" == n.call(e)
			}, _.isBoolean = function(e) {
				return "[object Boolean]" == n.call(e)
			}, _.isNumber = function(e) {
				return "[object Number]" == n.call(e) && /[\d\.]+/.test(String(e))
			}, _.isElement = function(e) {
				return !(!e || 1 !== e.nodeType)
			}, _.isJSONString = function(e) {
				try {
					JSON.parse(e)
				} catch (t) {
					return !1
				}
				return !0
			}, _.decodeURIComponent = function(e) {
				var t = e;
				try {
					t = decodeURIComponent(e)
				} catch (r) {
					t = e
				}
				return t
			}, _.encodeDates = function(e) {
				return _.each(e, function(t, r) {
					_.isDate(t) ? e[r] = _.formatDate(t) : _.isObject(t) && (e[r] = _.encodeDates(t))
				}), e
			}, _.mediaQueriesSupported = function() {
				return "undefined" != typeof window.matchMedia || "undefined" != typeof window.msMatchMedia
			}, _.getScreenOrientation = function() {
				var e = screen.msOrientation || screen.mozOrientation || (screen.orientation || {}).type,
					t = "未取到值";
				if (e) t = e.indexOf("landscape") > -1 ? "landscape" : "portrait";
				else if (_.mediaQueriesSupported()) {
					var r = window.matchMedia || window.msMatchMedia;
					r("(orientation: landscape)").matches ? t = "landscape" : r("(orientation: portrait)").matches && (t = "portrait")
				}
				return t
			}, _.hashCode = function(e) {
				if ("string" != typeof e) return 0;
				var t = 0,
					r = null;
				if (0 == e.length) return t;
				for (var s = 0; s < e.length; s++) r = e.charCodeAt(s), t = (t << 5) - t + r, t &= t;
				return t
			}, _.formatDate = function(e) {
				function t(e) {
					return e < 10 ? "0" + e : e
				}
				return e.getFullYear() + "-" + t(e.getMonth() + 1) + "-" + t(e.getDate()) + " " + t(e.getHours()) + ":" + t(e.getMinutes()) + ":" + t(e.getSeconds()) + "." + t(e.getMilliseconds())
			}, _.searchObjDate = function(e) {
				_.isObject(e) && _.each(e, function(t, r) {
					_.isObject(t) ? _.searchObjDate(e[r]) : _.isDate(t) && (e[r] = _.formatDate(t))
				})
			}, _.searchZZAppStyle = function(e) {
				"undefined" != typeof e.properties.$project && (e.project = e.properties.$project, delete e.properties.$project), "undefined" != typeof e.properties.$token && (e.token = e.properties.$token, delete e.properties.$token)
			}, _.formatJsonString = function(e) {
				try {
					return JSON.stringify(e, null, "  ")
				} catch (t) {
					return JSON.stringify(e)
				}
			}, _.formatString = function(e) {
				return e.length > sd.para.max_string_length ? (sd.log("字符串长度超过限制，已经做截取--" + e), e.slice(0, sd.para.max_string_length)) : e
			}, _.searchObjString = function(e) {
				_.isObject(e) && _.each(e, function(t, r) {
					_.isObject(t) ? _.searchObjString(e[r]) : _.isString(t) && (e[r] = _.formatString(t))
				})
			}, _.searchConfigData = function(e) {
				if ("object" == typeof e && e.$option) {
					var t = e.$option;
					return delete e.$option, t
				}
				return {}
			}, _.unique = function(e) {
				for (var t, r = [], s = {}, n = 0; n < e.length; n++) t = e[n], t in s || (s[t] = !0, r.push(t));
				return r
			}, _.strip_sa_properties = function(e) {
				return _.isObject(e) ? (_.each(e, function(t, r) {
					if (_.isArray(t)) {
						var s = [];
						_.each(t, function(e) {
							_.isString(e) ? s.push(e) : sd.log("您的数据-", r, t, "的数组里的值必须是字符串,已经将其删除")
						}), 0 !== s.length ? e[r] = s : (delete e[r], sd.log("已经删除空的数组"))
					}
					_.isString(t) || _.isNumber(t) || _.isDate(t) || _.isBoolean(t) || _.isArray(t) || "$option" === r || (sd.log("您的数据-", r, t, "-格式不满足要求，我们已经将其删除"), delete e[r])
				}), e) : e
			}, _.strip_empty_properties = function(e) {
				var t = {};
				return _.each(e, function(e, r) {
					null != e && (t[r] = e)
				}), t
			}, _.utf8Encode = function(e) {
				e = (e + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
				var t, r, s, n = "",
					a = 0;
				for (t = r = 0, a = e.length, s = 0; s < a; s++) {
					var i = e.charCodeAt(s),
						o = null;
					i < 128 ? r++ : o = i > 127 && i < 2048 ? String.fromCharCode(i >> 6 | 192, 63 & i | 128) : String.fromCharCode(i >> 12 | 224, i >> 6 & 63 | 128, 63 & i | 128), null !== o && (r > t && (n += e.substring(t, r)), n += o, t = r = s + 1)
				}
				return r > t && (n += e.substring(t, e.length)), n
			}, _.base64Encode = function(e) {
				if ("function" == typeof btoa) return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(e, t) {
					return String.fromCharCode("0x" + t)
				}));
				e = String(e);
				var t, r, s, n, a, i, o, c, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
					d = 0,
					p = 0,
					l = "",
					f = [];
				if (!e) return e;
				e = _.utf8Encode(e);
				do t = e.charCodeAt(d++), r = e.charCodeAt(d++), s = e.charCodeAt(d++), c = t << 16 | r << 8 | s, n = c >> 18 & 63, a = c >> 12 & 63, i = c >> 6 & 63, o = 63 & c, f[p++] = u.charAt(n) + u.charAt(a) + u.charAt(i) + u.charAt(o);
				while (d < e.length);
				switch (l = f.join(""), e.length % 3) {
				case 1:
					l = l.slice(0, -2) + "==";
					break;
				case 2:
					l = l.slice(0, -1) + "="
				}
				return l
			}, _.UUID = function() {
				var e = function() {
						for (var e = 1 * new Date, t = 0; e == 1 * new Date;) t++;
						return e.toString(16) + t.toString(16)
					},
					t = function() {
						return Math.random().toString(16).replace(".", "")
					},
					r = function(e) {
						function t(e, t) {
							var r, s = 0;
							for (r = 0; r < t.length; r++) s |= a[r] << 8 * r;
							return e ^ s
						}
						var r, s, n = navigator.userAgent,
							a = [],
							i = 0;
						for (r = 0; r < n.length; r++) s = n.charCodeAt(r), a.unshift(255 & s), a.length >= 4 && (i = t(i, a), a = []);
						return a.length > 0 && (i = t(i, a)), i.toString(16)
					};
				return function() {
					var s = String(screen.height * screen.width);
					s = s && /\d{5,}/.test(s) ? s.toString(16) : String(31242 * Math.random()).replace(".", "").slice(0, 8);
					var n = e() + "-" + t() + "-" + r() + "-" + s + "-" + e();
					return n ? n : (String(Math.random()) + String(Math.random()) + String(Math.random())).slice(2, 15)
				}
			}(), _.getQueryParam = function(e, t) {
				t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]"), e = _.decodeURIComponent(e);
				var r = "[\\?&]" + t + "=([^&#]*)",
					s = new RegExp(r),
					n = s.exec(e);
				return null === n || n && "string" != typeof n[1] && n[1].length ? "" : _.decodeURIComponent(n[1]).replace(/\+/g, " ")
			}, _.urlParse = function(e) {
				var t = function(e) {
						this._fields = {
							Username: 4,
							Password: 5,
							Port: 7,
							Protocol: 2,
							Host: 6,
							Path: 8,
							URL: 0,
							QueryString: 9,
							Fragment: 10
						}, this._values = {}, this._regex = null, this._regex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/, "undefined" != typeof e && this._parse(e)
					};
				return t.prototype.setUrl = function(e) {
					this._parse(e)
				}, t.prototype._initValues = function() {
					for (var e in this._fields) this._values[e] = ""
				}, t.prototype.addQueryString = function(e) {
					if ("object" != typeof e) return !1;
					var t = this._values.QueryString || "";
					for (var r in e) t = new RegExp(r + "[^&]+").test(t) ? t.replace(new RegExp(r + "[^&]+"), r + "=" + e[r]) : "&" === t.slice(-1) ? t + r + "=" + e[r] : "" === t ? r + "=" + e[r] : t + "&" + r + "=" + e[r];
					this._values.QueryString = t
				}, t.prototype.getUrl = function() {
					var e = "";
					return e += this._values.Origin, e += this._values.Port ? ":" + this._values.Port : "", e += this._values.Path, e += this._values.QueryString ? "?" + this._values.QueryString : "", e += this._values.Fragment ? "#" + this._values.Fragment : ""
				}, t.prototype.getUrl = function() {
					var e = "";
					return e += this._values.Origin, e += this._values.Port ? ":" + this._values.Port : "", e += this._values.Path, e += this._values.QueryString ? "?" + this._values.QueryString : ""
				}, t.prototype._parse = function(e) {
					this._initValues();
					var t = this._regex.exec(e);
					if (!t) throw "DPURLParser::_parse -> Invalid URL";
					for (var r in this._fields)"undefined" != typeof t[this._fields[r]] && (this._values[r] = t[this._fields[r]]);
					this._values.Hostname = this._values.Host.replace(/:\d+$/, ""), this._values.Origin = this._values.Protocol + "://" + this._values.Hostname
				}, new t(e)
			}, _.addEvent = function() {
				function e(t) {
					return t && (t.preventDefault = e.preventDefault, t.stopPropagation = e.stopPropagation, t._getPath = e._getPath), t
				}
				function t(t, r, s) {
					var n = function(n) {
							if (n = n || e(window.event)) {
								n.target = n.srcElement;
								var a, i, o = !0;
								return "function" == typeof s && (a = s(n)), i = r.call(t, n), !1 !== a && !1 !== i || (o = !1), o
							}
						};
					return n
				}
				e._getPath = function() {
					var e = this,
						t = function() {
							try {
								var t = e.target,
									r = [t];
								if (null === t || null === t.parentElement) return [];
								for (; null !== t.parentElement;) t = t.parentElement, r.unshift(t);
								return r
							} catch (s) {
								return []
							}
						};
					return this.path || this.composedPath && this.composedPath() || t()
				}, e.preventDefault = function() {
					this.returnValue = !1
				}, e.stopPropagation = function() {
					this.cancelBubble = !0
				};
				var r = function(r, s, n) {
						var a = !(!_.isObject(sd.para.heatmap) || !sd.para.heatmap.useCapture);
						if (r && r.addEventListener) r.addEventListener(s, function(t) {
							t._getPath = e._getPath, n.call(this, t)
						}, a);
						else {
							var i = "on" + s,
								o = r[i];
							r[i] = t(r, n, o)
						}
					};
				r.apply(null, arguments)
			}, _.addHashEvent = function(e) {
				var t = "pushState" in window.history ? "popstate" : "hashchange";
				_.addEvent(window, t, e)
			}, _.addSinglePageEvent = function(e) {
				var t = location.href,
					r = window.history.pushState,
					s = window.history.replaceState;
				window.history.pushState = function() {
					r.apply(window.history, arguments), e(t), t = location.href
				}, window.history.replaceState = function() {
					s.apply(window.history, arguments), e(t), t = location.href
				};
				var n = "pushState" in window.history ? "popstate" : "hashchange";
				_.addEvent(window, n, function() {
					e(t), t = location.href
				})
			}, _.cookie = {
				get: function(e) {
					for (var t = e + "=", r = document.cookie.split(";"), s = 0; s < r.length; s++) {
						for (var n = r[s];
						" " == n.charAt(0);) n = n.substring(1, n.length);
						if (0 == n.indexOf(t)) return _.decodeURIComponent(n.substring(t.length, n.length))
					}
					return null
				},
				set: function(e, t, r, s, n) {
					s = "undefined" == typeof s ? sd.para.cross_subdomain : s;
					var a = "",
						i = "",
						o = "";
					if (r = null == r ? 73e3 : r, s) {
						var c = _.getCurrentDomain(location.href);
						"url解析失败" === c && (c = ""), a = c ? "; domain=" + c : ""
					}
					if (0 !== r) {
						var u = new Date;
						"s" === String(r).slice(-1) ? u.setTime(u.getTime() + 1e3 * Number(String(r).slice(0, -1))) : u.setTime(u.getTime() + 24 * r * 60 * 60 * 1e3), i = "; expires=" + u.toGMTString()
					}
					n && (o = "; secure"), document.cookie = e + "=" + encodeURIComponent(t) + i + "; path=/" + a + o
				},
				remove: function(e, t) {
					t = "undefined" == typeof t ? sd.para.cross_subdomain : t, _.cookie.set(e, "", -1, t)
				},
				getCookieName: function(e, t) {
					var r = "";
					return t = t || location.href, sd.para.cross_subdomain === !1 ? (r = _.url("sub", t), r = "string" == typeof r && "" !== r ? "sajssdk_2015_" + e + "_" + r : "sajssdk_2015_root_" + e) : r = "sajssdk_2015_cross_" + e, r
				},
				getNewUser: function() {
					var e = "new_user";
					return null !== this.get("sensorsdata_is_new_user") || null !== this.get(this.getCookieName(e))
				}
			}, _.getEleInfo = function(e) {
				if (!e.target) return !1;
				var t = e.target,
					r = t.tagName.toLowerCase(),
					s = {};
				s.$element_type = r, s.$element_name = t.getAttribute("name"), s.$element_id = t.getAttribute("id"), s.$element_class_name = "string" == typeof t.className ? t.className : null, s.$element_target_url = t.getAttribute("href");
				var n = "";
				return t.textContent ? n = _.trim(t.textContent) : t.innerText && (n = _.trim(t.innerText)), n && (n = n.replace(/[\r\n]/g, " ").replace(/[ ]+/g, " ").substring(0, 255)), s.$element_content = n || "", "input" === r && ("button" === t.type || "submit" === t.type ? s.$element_content = t.value || "" : sd.para.heatmap && "function" == typeof sd.para.heatmap.collect_input && sd.para.heatmap.collect_input(t) && (s.$element_content = t.value || "")), s = _.strip_empty_properties(s), s.$url = location.href, s.$url_path = location.pathname, s.$title = document.title, s.$viewport_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0, s
			}, _.localStorage = {
				get: function(e) {
					return window.localStorage.getItem(e)
				},
				parse: function(e) {
					var t;
					try {
						t = JSON.parse(_.localStorage.get(e)) || null
					} catch (r) {}
					return t
				},
				set: function(e, t) {
					window.localStorage.setItem(e, t)
				},
				remove: function(e) {
					window.localStorage.removeItem(e)
				},
				isSupport: function() {
					var e = !0;
					try {
						var t = "__sensorsdatasupport__",
							r = "testIsSupportStorage";
						_.localStorage.set(t, r), _.localStorage.get(t) !== r && (e = !1), _.localStorage.remove(t)
					} catch (s) {
						e = !1
					}
					return e
				}
			}, _.sessionStorage = {
				isSupport: function() {
					var e = !0,
						t = "__sensorsdatasupport__",
						r = "testIsSupportStorage";
					try {
						sessionStorage && sessionStorage.setItem ? (sessionStorage.setItem(t, r), sessionStorage.removeItem(t, r), e = !0) : e = !1
					} catch (s) {
						e = !1
					}
					return e
				}
			}, _.isSupportCors = function() {
				return "undefined" != typeof window.XMLHttpRequest && ("withCredentials" in new XMLHttpRequest || "undefined" != typeof XDomainRequest)
			}, _.xhr = function(e) {
				if (e) return "undefined" != typeof window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest ? new XMLHttpRequest : "undefined" != typeof XDomainRequest ? new XDomainRequest : null;
				if ("undefined" != typeof window.XMLHttpRequest) return new XMLHttpRequest;
				if (window.ActiveXObject) try {
					return new ActiveXObject("Msxml2.XMLHTTP")
				} catch (t) {
					try {
						return new ActiveXObject("Microsoft.XMLHTTP")
					} catch (t) {}
				}
			}, _.ajax = function(e) {
				function t(e) {
					if (!e) return "";
					try {
						return JSON.parse(e)
					} catch (t) {
						return {}
					}
				}
				e.timeout = e.timeout || 2e4, e.credentials = "undefined" == typeof e.credentials || e.credentials;
				var r = _.xhr(e.cors);
				if (!r) return !1;
				e.type || (e.type = e.data ? "POST" : "GET"), e = _.extend({
					success: function() {},
					error: function() {}
				}, e);
				try {
					"object" == typeof r && "timeout" in r ? r.timeout = e.timeout : setTimeout(function() {
						r.abort()
					}, e.timeout + 500)
				} catch (s) {
					try {
						setTimeout(function() {
							r.abort()
						}, e.timeout + 500)
					} catch (n) {}
				}
				r.onreadystatechange = function() {
					try {
						4 == r.readyState && (r.status >= 200 && r.status < 300 || 304 == r.status ? e.success(t(r.responseText)) : e.error(t(r.responseText), r.status), r.onreadystatechange = null, r.onload = null)
					} catch (s) {
						r.onreadystatechange = null, r.onload = null
					}
				}, r.open(e.type, e.url, !0);
				try {
					if (e.credentials && (r.withCredentials = !0), _.isObject(e.header)) for (var a in e.header) r.setRequestHeader(a, e.header[a]);
					e.data && (e.cors || r.setRequestHeader("X-Requested-With", "XMLHttpRequest"), "application/json" === e.contentType ? r.setRequestHeader("Content-type", "application/json; charset=UTF-8") : r.setRequestHeader("Content-type", "application/x-www-form-urlencoded"))
				} catch (s) {}
				r.send(e.data || null)
			}, _.loadScript = function(e) {
				e = _.extend({
					success: function() {},
					error: function() {},
					appendCall: function(e) {
						document.getElementsByTagName("head")[0].appendChild(e)
					}
				}, e);
				var t = null;
				"css" === e.type && (t = document.createElement("link"), t.rel = "stylesheet", t.href = e.url), "js" === e.type && (t = document.createElement("script"), t.async = "async", t.setAttribute("charset", "UTF-8"), t.src = e.url, t.type = "text/javascript"), t.onload = t.onreadystatechange = function() {
					this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (e.success(), t.onload = t.onreadystatechange = null)
				}, t.onerror = function() {
					e.error(), t.onerror = null
				}, e.appendCall(t)
			}, _.url = function() {
				function e(e) {
					return _.decodeURIComponent(e.replace(/\+/g, " "))
				}
				function t(e, t) {
					var r = e.charAt(0),
						s = t.split(r);
					return r === e ? s : (e = parseInt(e.substring(1), 10), s[e < 0 ? s.length + e : e - 1])
				}
				function r(t, r) {
					for (var s = t.charAt(0), n = r.split("&"), a = [], i = {}, o = [], c = t.substring(1), u = 0, d = n.length; u < d; u++) if (a = n[u].match(/(.*?)=(.*)/), a || (a = [n[u], n[u], ""]), "" !== a[1].replace(/\s/g, "")) {
						if (a[2] = e(a[2] || ""), c === a[1]) return a[2];
						o = a[1].match(/(.*)\[([0-9]+)\]/), o ? (i[o[1]] = i[o[1]] || [], i[o[1]][o[2]] = a[2]) : i[a[1]] = a[2]
					}
					return s === t ? i : i[c]
				}
				return function(e, s) {
					var n, a = {};
					if (s = s || window.location.toString(), !e) return s;
					if (e = e.toString(), n = s.match(/^mailto:([^\/].+)/)) a.protocol = "mailto", a.email = n[1];
					else {
						if ((n = s.match(/(.*?)\/#\!(.*)/)) && (s = n[1] + n[2]), (n = s.match(/(.*?)#(.*)/)) && (a.hash = n[2], s = n[1]), a.hash && e.match(/^#/)) return r(e, a.hash);
						if ((n = s.match(/(.*?)\?(.*)/)) && (a.query = n[2], s = n[1]), a.query && e.match(/^\?/)) return r(e, a.query);
						if ((n = s.match(/(.*?)\:?\/\/(.*)/)) && (a.protocol = n[1].toLowerCase(), s = n[2]), (n = s.match(/(.*?)(\/.*)/)) && (a.path = n[2], s = n[1]), a.path = (a.path || "").replace(/^([^\/])/, "/$1").replace(/\/$/, ""), e.match(/^[\-0-9]+$/) && (e = e.replace(/^([^\/])/, "/$1")), e.match(/^\//)) return t(e, a.path.substring(1));
						if (n = t("/-1", a.path.substring(1)), n && (n = n.match(/(.*?)\.(.*)/)) && (a.file = n[0], a.filename = n[1], a.fileext = n[2]), (n = s.match(/(.*)\:([0-9]+)$/)) && (a.port = n[2], s = n[1]), (n = s.match(/(.*?)@(.*)/)) && (a.auth = n[1], s = n[2]), a.auth && (n = a.auth.match(/(.*)\:(.*)/), a.user = n ? n[1] : a.auth, a.pass = n ? n[2] : void 0), a.hostname = s.toLowerCase(), "." === e.charAt(0)) return t(e, a.hostname);
						a.sub = a.hostname.split(".")[0];
						var i = a.hostname.split(".");
						if (_.isArray(i) && i.length >= 2 && !/^(\d+\.)+\d+$/.test(a.hostname)) for (var o = "." + i.splice(i.length - 1, 1); i.length > 0;) if (o = "." + i.splice(i.length - 1, 1) + o, document.cookie = "sensorsdata_domain_test=true; path=/; domain=" + o, document.cookie.indexOf("sensorsdata_domain_test=true") !== -1) {
							a.domain = o;
							var c = new Date;
							c.setTime(c.getTime() - 1e3), document.cookie = "sensorsdata_domain_test=true; expires=" + c.toGMTString() + "; path=/; domain=" + o, i = []
						}
						a.port = a.port || ("https" === a.protocol ? "443" : "80"), a.protocol = a.protocol || ("443" === a.port ? "https" : "http")
					}
					return e in a ? a[e] : "{}" === e ? a : ""
				}
			}(), _.getCurrentDomain = function(e) {
				var t = sd.para.current_domain;
				switch (typeof t) {
				case "function":
					var r = t();
					return "" === r || "" === _.trim(r) ? "url解析失败" : r.indexOf(".") !== -1 ? r : "url解析失败";
				case "string":
					return "" === t || "" === _.trim(t) ? "url解析失败" : t.indexOf(".") !== -1 ? t : "url解析失败";
				default:
					return "" === e ? "url解析失败" : "" === _.url("domain", e) ? "url解析失败" : _.url("domain", e)
				}
			}, _.getReferrerDomain = function(e) {
				var t = sd.para.referrer_domain;
				switch (typeof t) {
				case "function":
					var r = t();
					return r ? r.indexOf(".") !== -1 ? r : "referrer解析失败" : _.url("domain", e);
				case "string":
					return "" === t || "" === _.trim(t) ? "referrer解析失败" : t.indexOf(".") !== -1 ? t : "referrer解析失败";
				default:
					if ("" === e) return "";
					if ("" === _.url("domain", location.href)) return "referrer解析失败";
					var s = _.url("domain", location.href);
					return _.url("hostname", e).slice(-1 * s.length)
				}
			}, _.ry = function(e) {
				return new _.ry.init(e)
			}, _.ry.init = function(e) {
				this.ele = e
			}, _.ry.init.prototype = {
				addClass: function(e) {
					var t = " " + this.ele.className + " ";
					return t.indexOf(" " + e + " ") === -1 && (this.ele.className = this.ele.className + ("" === this.ele.className ? "" : " ") + e), this
				},
				removeClass: function(e) {
					var t = " " + this.ele.className + " ";
					return t.indexOf(" " + e + " ") !== -1 && (this.ele.className = t.replace(" " + e + " ", " ").slice(1, -1)), this
				},
				hasClass: function(e) {
					var t = " " + this.ele.className + " ";
					return t.indexOf(" " + e + " ") !== -1
				},
				attr: function(e, t) {
					return "string" == typeof e && _.isUndefined(t) ? this.ele.getAttribute(e) : ("string" == typeof e && (t = String(t), this.ele.setAttribute(e, t)), this)
				},
				offset: function() {
					var e = this.ele.getBoundingClientRect();
					if (e.width || e.height) {
						var t = this.ele.ownerDocument,
							r = t.documentElement;
						return {
							top: e.top + window.pageYOffset - r.clientTop,
							left: e.left + window.pageXOffset - r.clientLeft
						}
					}
					return {
						top: 0,
						left: 0
					}
				},
				getSize: function() {
					if (!window.getComputedStyle) return {
						width: this.ele.offsetWidth,
						height: this.ele.offsetHeight
					};
					try {
						var e = this.ele.getBoundingClientRect();
						return {
							width: e.width,
							height: e.height
						}
					} catch (t) {
						return {
							width: 0,
							height: 0
						}
					}
				},
				getStyle: function(e) {
					return this.ele.currentStyle ? this.ele.currentStyle[e] : this.ele.ownerDocument.defaultView.getComputedStyle(this.ele, null).getPropertyValue(e)
				},
				wrap: function(e) {
					var t = document.createElement(e);
					return this.ele.parentNode.insertBefore(t, this.ele), t.appendChild(this.ele), _.ry(t)
				},
				getCssStyle: function(e) {
					var t = this.ele.style.getPropertyValue(e);
					if (t) return t;
					var r = null;
					if ("function" == typeof window.getMatchedCSSRules && (r = getMatchedCSSRules(this.ele)), !r || !_.isArray(r)) return null;
					for (var s = r.length - 1; s >= 0; s--) {
						var n = r[s];
						if (t = n.style.getPropertyValue(e)) return t
					}
				},
				sibling: function(e, t) {
					for (;
					(e = e[t]) && 1 !== e.nodeType;);
					return e
				},
				next: function() {
					return this.sibling(this.ele, "nextSibling")
				},
				prev: function(e) {
					return this.sibling(this.ele, "previousSibling")
				},
				siblings: function(e) {
					return this.siblings((this.ele.parentNode || {}).firstChild, this.ele)
				},
				children: function(e) {
					return this.siblings(this.ele.firstChild)
				},
				parent: function() {
					var e = this.ele.parentNode;
					return e = e && 11 !== e.nodeType ? e : null, _.ry(e)
				}
			}, _.strToUnicode = function(e) {
				if ("string" != typeof e) return sd.log("转换unicode错误", e), e;
				for (var t = "", r = 0; r < e.length; r++) t += "\\" + e.charCodeAt(r).toString(16);
				return t
			}, _.getReferrer = function(e) {
				var e = e || document.referrer;
				return "string" != typeof e ? "取值异常_referrer异常_" + String(e) : (0 === e.indexOf("https://www.baidu.com/") && (e = e.split("?")[0]), e = e.slice(0, sd.para.max_referrer_string_length), "string" == typeof e ? e : "")
			}, _.getKeywordFromReferrer = function(e) {
				e = e || document.referrer;
				var t = sd.para.source_type.keyword;
				if (document && "string" == typeof e) {
					if (0 === e.indexOf("http")) {
						var r = _.getReferSearchEngine(e),
							s = _.url("?", e),
							n = null;
						for (var a in t) if (r === a && "object" == typeof s) if (n = t[a], _.isArray(n)) {
							for (var a = 0; a < n.length; a++) if (s[n[a]]) return s[n[a]]
						} else if (s[n]) return s[n];
						return "未取到值"
					}
					return "" === e ? "未取到值_直接打开" : "未取到值_非http的url"
				}
				return "取值异常_referrer异常_" + String(e)
			}, _.getReferSearchEngine = function(e) {
				var t = _.url("hostname", e);
				if (!t) return "";
				var r = (sd.para.source_type.keyword, {
					baidu: [/^.*\.baidu\.com$/],
					bing: [/^.*\.bing\.com$/],
					google: [/^www.google.com$/, /^www\.google\.com\.[a-z]{2}$/, /^www\.google\.[a-z]{2}$/],
					sm: [/^m.sm.cn$/],
					so: [/^.+\.so\.com$/],
					sogou: [/^.*\.sogou\.com$/],
					yahoo: [/^.*\.yahoo\.com$/]
				});
				for (var s in r) for (var n = r[s], a = 0, i = n.length; a < i; a++) if (n[a].test(t)) return s;
				return "未知搜索引擎"
			}, _.getSourceFromReferrer = function() {
				function e(e, t) {
					for (var r = 0; r < e.length; r++) if (t.split("?")[0].indexOf(e[r]) !== -1) return !0
				}
				var t = "(" + sd.para.source_type.utm.join("|") + ")\\=[^&]+",
					r = sd.para.source_type.search,
					s = sd.para.source_type.social,
					n = document.referrer || "",
					a = _.info.pageProp.url;
				if (a) {
					var i = a.match(new RegExp(t));
					return i && i[0] ? "付费广告流量" : e(r, n) ? "自然搜索流量" : e(s, n) ? "社交网站流量" : "" === n ? "直接流量" : "引荐流量"
				}
				return "获取url异常"
			}, _.info = {
				initPage: function() {
					var e = _.getReferrer(),
						t = e ? _.url("hostname", e) : e,
						r = _.getReferrerDomain(e),
						s = location.href,
						n = s ? _.url("hostname", s) : s,
						a = _.getCurrentDomain(s);
					e && !r && sd.debug.jssdkDebug("referrer_domain异常_" + e + "_" + r), a || sd.debug.jssdkDebug("url_domain异常_" + s + "_" + a), this.pageProp = {
						referrer: e,
						referrer_host: t,
						referrer_domain: r,
						url: s,
						url_host: n,
						url_domain: a
					}
				},
				pageProp: {},
				campaignParams: function() {
					var e = sd.source_channel_standard.split(" "),
						t = "",
						r = {};
					return _.isArray(sd.para.source_channel) && sd.para.source_channel.length > 0 && (e = e.concat(sd.para.source_channel), e = _.unique(e)), _.each(e, function(e) {
						t = _.getQueryParam(location.href, e), t.length && (r[e] = t)
					}), r
				},
				campaignParamsStandard: function(e, t) {
					e = e || "", t = t || "";
					var r = _.info.campaignParams(),
						s = {},
						n = {};
					for (var a in r)(" " + sd.source_channel_standard + " ").indexOf(" " + a + " ") !== -1 ? s[e + a] = r[a] : n[t + a] = r[a];
					return {
						$utms: s,
						otherUtms: n
					}
				},
				properties: function() {
					return {
						$screen_height: Number(screen.height) || 0,
						$screen_width: Number(screen.width) || 0,
						$lib: "js",
						$lib_version: String(sd.lib_version)
					}
				},
				currentProps: {},
				register: function(e) {
					_.extend(_.info.currentProps, e)
				}
			}, _.autoExeQueue = function() {
				var e = {
					items: [],
					enqueue: function(e) {
						this.items.push(e), this.start()
					},
					dequeue: function() {
						return this.items.shift()
					},
					getCurrentItem: function() {
						return this.items[0]
					},
					isRun: !1,
					start: function() {
						this.items.length > 0 && !this.isRun && (this.isRun = !0, this.getCurrentItem().start())
					},
					close: function() {
						this.dequeue(), this.isRun = !1, this.start()
					}
				};
				return e
			}, _.trackLink = function(e, t, r) {
				function s(e) {
					function s() {
						a || (a = !0, location.href = n.href)
					}
					e.stopPropagation(), e.preventDefault();
					var a = !1;
					setTimeout(s, 1e3), sd.track(t, r, s)
				}
				e = e || {};
				var n = null;
				return e.ele && (n = e.ele), e.event && (n = e.target ? e.target : e.event.target), r = r || {}, !(!n || "object" != typeof n) && (!n.href || /^javascript/.test(n.href) || n.target || n.download || n.onclick ? (sd.track(t, r), !1) : (e.event && s(e.event), void(e.ele && _.addEvent(e.ele, "click", function(e) {
					s(e)
				}))))
			}
		}(), sd.para_default = {
			img_use_crossorigin: !1,
			name: "sa",
			max_referrer_string_length: 200,
			max_string_length: 500,
			cross_subdomain: !0,
			show_log: !0,
			is_debug: !1,
			debug_mode: !1,
			debug_mode_upload: !1,
			session_time: 0,
			use_client_time: !1,
			source_channel: [],
			send_type: "image",
			vtrack_ignore: {},
			auto_init: !0,
			is_track_single_page: !1,
			is_single_page: !1,
			is_track_latest: {
				utm: !0,
				referrer: !0,
				referrer_host: !0,
				traffic_source_type: !0,
				search_keyword: !0,
				landing_page: !1
			},
			source_type: {},
			callback_timeout: 200,
			datasend_timeout: 3e3,
			queue_timeout: 300,
			is_track_device_id: !1,
			use_app_track: !1,
			ignore_oom: !0
		}, sd.initPara = function(e) {
			sd.para = e || sd.para || {};
			var t;
			for (t in sd.para_default) void 0 === sd.para[t] && (sd.para[t] = sd.para_default[t]);
			"string" == typeof sd.para.server_url && "://" === sd.para.server_url.slice(0, 3) && (sd.para.server_url = location.protocol + sd.para.server_url), "string" == typeof sd.para.web_url && "://" === sd.para.web_url.slice(0, 3) && (sd.para.web_url = location.protocol + sd.para.web_url), "image" !== sd.para.send_type && "ajax" !== sd.para.send_type && "beacon" !== sd.para.send_type && (sd.para.send_type = "image");
			var r = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"],
				s = ["www.baidu.", "m.baidu.", "m.sm.cn", "so.com", "sogou.com", "youdao.com", "google.", "yahoo.com/", "bing.com/", "ask.com/"],
				n = ["weibo.com", "renren.com", "kaixin001.com", "douban.com", "qzone.qq.com", "zhihu.com", "tieba.baidu.com", "weixin.qq.com"],
				a = {
					baidu: ["wd", "word", "kw", "keyword"],
					google: "q",
					bing: "q",
					yahoo: "p",
					sogou: ["query", "keyword"],
					so: "q",
					sm: "q"
				};
			if ("object" == typeof sd.para.source_type && (sd.para.source_type.utm = _.isArray(sd.para.source_type.utm) ? sd.para.source_type.utm.concat(r) : r, sd.para.source_type.search = _.isArray(sd.para.source_type.search) ? sd.para.source_type.search.concat(s) : s, sd.para.source_type.social = _.isArray(sd.para.source_type.social) ? sd.para.source_type.social.concat(n) : n, sd.para.source_type.keyword = _.isObject(sd.para.source_type.keyword) ? _.extend(a, sd.para.source_type.keyword) : a), _.isObject(sd.para.heatmap) && (sd.para.heatmap.clickmap = sd.para.heatmap.clickmap || "default", sd.para.heatmap.scroll_notice_map = sd.para.heatmap.scroll_notice_map || "default", sd.para.heatmap.scroll_delay_time = sd.para.heatmap.scroll_delay_time || 4e3, sd.para.heatmap.renderRefreshTime = sd.para.heatmap.renderRefreshTime || 1e3, sd.para.heatmap.loadTimeout = sd.para.heatmap.loadTimeout || 1e3), "object" == typeof sd.para.server_url && sd.para.server_url.length) for (t = 0; t < sd.para.server_url.length; t++) / sa\.gif[ ^ \ / ] * $ / .test(sd.para.server_url[t]) || (sd.para.server_url[t] = sd.para.server_url[t].replace(/\/sa$/, "/sa.gif").replace(/(\/sa)(\?[^\/]+)$/, "/sa.gif$2"));
			else / sa\.gif[ ^ \ / ] * $ / .test(sd.para.server_url) || (sd.para.server_url = sd.para.server_url.replace(/\/sa$/, "/sa.gif").replace(/(\/sa)(\?[^\/]+)$/, "/sa.gif$2"));
			"string" == typeof sd.para.server_url && (sd.para.debug_mode_url = sd.para.debug_mode_url || sd.para.server_url.replace("sa.gif", "debug")), sd.para.noCache === !0 ? sd.para.noCache = "?" + (new Date).getTime() : sd.para.noCache = "", sd.para.callback_timeout > sd.para.datasend_timeout && (sd.para.datasend_timeout = sd.para.callback_timeout), sd.para.callback_timeout > sd.para.queue_timeout && (sd.para.queue_timeout = sd.para.callback_timeout), sd.para.queue_timeout > sd.para.datasend_timeout && (sd.para.datasend_timeout = sd.para.queue_timeout), _.isObject(sd.para.is_track_latest) ? sd.para.is_track_latest = _.extend(sd.para_default.is_track_latest, sd.para.is_track_latest) : sd.para.is_track_latest = sd.para_default.is_track_latest
		}, sd.readyState = {
			state: 0,
			historyState: [],
			stateType: {
				1: "1-init未开始",
				2: "2-init开始",
				3: "3-store完成"
			},
			getState: function() {
				return this.historyState.join("\n")
			},
			setState: function(e) {
				String(e) in this.stateType && (this.state = e), this.historyState.push(this.stateType[e])
			}
		}, sd.setPreConfig = function(e) {
			sd.para = e.para, sd._q = e._q
		}, sd.setInitVar = function() {
			sd._t = sd._t || 1 * new Date, sd.lib_version = "1.14.3", sd.is_first_visitor = !1, sd.source_channel_standard = "utm_source utm_medium utm_campaign utm_content utm_term"
		}, sd.log = function() {
			if ((_.sessionStorage.isSupport() && "true" === sessionStorage.getItem("sensorsdata_jssdk_debug") || sd.para.show_log) && (sd.para.show_log !== !0 && "string" !== sd.para.show_log && sd.para.show_log !== !1 || (arguments[0] = _.formatJsonString(arguments[0])), "object" == typeof console && console.log)) try {
				return console.log.apply(console, arguments)
			} catch (e) {
				console.log(arguments[0])
			}
		}, sd.debug = {
			distinct_id: function() {},
			jssdkDebug: function() {},
			_sendDebug: function(e) {
				sd.track("_sensorsdata2019_debug", {
					_jssdk_debug_info: e
				})
			},
			apph5: function(e) {
				var t = "app_h5打通失败-",
					r = {
						1: t + "use_app_track为false",
						2: t + "Android或者iOS，没有暴露相应方法",
						3.1: t + "Android校验server_url失败",
						3.2: t + "iOS校验server_url失败"
					},
					s = e.output,
					n = e.step,
					a = e.data;
				"all" !== s && "console" !== s || sd.log(r[n]), ("all" === s || "code" === s) && _.isObject(sd.para.is_debug) && sd.para.is_debug.apph5 && (a.type && "profile" === a.type.slice(0, 7) || (a.properties._jssdk_debug_info = "apph5-" + String(n)))
			}
		};
		var commonWays = {
			setOnlineState: function(e) {
				if (e === !0 && _.isObject(sd.para.jsapp) && "function" == typeof sd.para.jsapp.getData) {
					sd.para.jsapp.isOnline = !0;
					var t = sd.para.jsapp.getData();
					_.isArray(t) && t.length > 0 && _.each(t, function(e) {
						_.isJSONString(e) && sd.sendState.pushSend(JSON.parse(e))
					})
				} else sd.para.jsapp.isOnline = !1
			},
			autoTrackIsUsed: !1,
			isReady: function(e) {
				e()
			},
			getUtm: function() {
				return _.info.campaignParams()
			},
			getStayTime: function() {
				return (new Date - sd._t) / 1e3
			},
			setProfileLocal: function(e) {
				if (!_.localStorage.isSupport()) return sd.setProfile(e), !1;
				if (!_.isObject(e) || _.isEmptyObject(e)) return !1;
				var t = _.localStorage.parse("sensorsdata_2015_jssdk_profile"),
					r = !1;
				if (_.isObject(t) && !_.isEmptyObject(t)) {
					for (var s in e)!(s in t && t[s] !== e[s]) && s in t || (t[s] = e[s], r = !0);
					r && (_.localStorage.set("sensorsdata_2015_jssdk_profile", JSON.stringify(t)), sd.setProfile(e))
				} else _.localStorage.set("sensorsdata_2015_jssdk_profile", JSON.stringify(e)), sd.setProfile(e)
			},
			setInitReferrer: function() {
				var e = _.getReferrer();
				sd.setOnceProfile({
					_init_referrer: e,
					_init_referrer_host: _.info.pageProp.referrer_host
				})
			},
			setSessionReferrer: function() {
				var e = _.getReferrer();
				store.setSessionPropsOnce({
					_session_referrer: e,
					_session_referrer_host: _.info.pageProp.referrer_host
				})
			},
			setDefaultAttr: function() {
				_.info.register({
					_current_url: location.href,
					_referrer: _.getReferrer(),
					_referring_host: _.info.pageProp.referrer_host
				})
			},
			trackHeatMap: function(e, t, r) {
				if ("object" == typeof e && e.tagName) {
					var s = e.tagName.toLowerCase(),
						n = e.parentNode.tagName.toLowerCase();
					"button" !== s && "a" !== s && "a" !== n && "button" !== n && "input" !== s && "textarea" !== s && heatmap.start(null, e, s, t, r)
				}
			},
			trackAllHeatMap: function(e, t, r) {
				if ("object" == typeof e && e.tagName) {
					var s = e.tagName.toLowerCase();
					heatmap.start(null, e, s, t, r)
				}
			},
			autoTrackSinglePage: function(e, t) {
				function r() {
					var e = _.info.campaignParams(),
						t = {};
					for (var r in e)(" " + sd.source_channel_standard + " ").indexOf(" " + r + " ") !== -1 ? t["$" + r] = e[r] : t[r] = e[r];
					return t
				}
				function s(e, t) {
					sd.track("$pageview", _.extend({
						$referrer: n,
						$referrer_host: n ? _.url("hostname", n) : n,
						$url: location.href,
						$url_path: location.pathname,
						$title: document.title
					}, e, r()), t), n = location.href
				}
				if (this.autoTrackIsUsed) var n = _.info.pageProp.url;
				else var n = _.info.pageProp.referrer;
				e = _.isObject(e) ? e : {}, e = _.isObject(e) ? e : {}, sd.is_first_visitor && !e.not_set_profile && (sd.setOnceProfile(_.extend({
					$first_visit_time: new Date,
					$first_referrer: _.getReferrer(),
					$first_browser_language: navigator.language || "取值异常",
					$first_browser_charset: "string" == typeof document.charset ? document.charset.toUpperCase() : "取值异常",
					$first_referrer_host: _.info.pageProp.referrer_host,
					$first_traffic_source_type: _.getSourceFromReferrer(),
					$first_search_keyword: _.getKeywordFromReferrer()
				}, r())), sd.is_first_visitor = !1), e.not_set_profile && delete e.not_set_profile, sd.is_first_visitor && !e.not_set_profile && (sd.setOnceProfile(_.extend({
					$first_visit_time: new Date,
					$first_referrer: _.getReferrer(),
					$first_browser_language: navigator.language || "取值异常",
					$first_browser_charset: "string" == typeof document.charset ? document.charset.toUpperCase() : "取值异常",
					$first_referrer_host: _.info.pageProp.referrer_host,
					$first_traffic_source_type: _.getSourceFromReferrer(),
					$first_search_keyword: _.getKeywordFromReferrer()
				}, r())), sd.is_first_visitor = !1), e.not_set_profile && delete e.not_set_profile, s(e, t), this.autoTrackSinglePage = s
			},
			autoTrackWithoutProfile: function(e, t) {
				e = _.isObject(e) ? e : {}, this.autoTrack(_.extend(e, {
					not_set_profile: !0
				}), t)
			},
			autoTrack: function(e, t) {
				e = _.isObject(e) ? e : {};
				var r = _.info.campaignParams(),
					s = {};
				for (var n in r)(" " + sd.source_channel_standard + " ").indexOf(" " + n + " ") !== -1 ? s["$" + n] = r[n] : s[n] = r[n];
				sd.is_first_visitor && !e.not_set_profile && (sd.setOnceProfile(_.extend({
					$first_visit_time: new Date,
					$first_referrer: _.getReferrer(),
					$first_browser_language: navigator.language || "取值异常",
					$first_browser_charset: "string" == typeof document.charset ? document.charset.toUpperCase() : "取值异常",
					$first_referrer_host: _.info.pageProp.referrer_host,
					$first_traffic_source_type: _.getSourceFromReferrer(),
					$first_search_keyword: _.getKeywordFromReferrer()
				}, s)), sd.is_first_visitor = !1), e.not_set_profile && delete e.not_set_profile;
				var a = location.href;
				sd.para.is_single_page && _.addHashEvent(function() {
					var r = _.getReferrer(a);
					sd.track("$pageview", _.extend({
						$referrer: r,
						$referrer_host: _.url("hostname", r) || "",
						$url: location.href,
						$url_path: location.pathname,
						$title: document.title
					}, s, e), t), a = location.href
				}), sd.track("$pageview", _.extend({
					$referrer: _.getReferrer(),
					$referrer_host: _.info.pageProp.referrer_host,
					$url: location.href,
					$url_path: location.pathname,
					$title: document.title
				}, s, e), t), this.autoTrackIsUsed = !0
			},
			getAnonymousID: function() {
				return _.isEmptyObject(sd.store._state) ? "请先初始化SDK" : sd.store._state.first_id ? sd.store._state.first_id : sd.store._state.distinct_id
			}
		};
		sd.quick = function() {
			var e = Array.prototype.slice.call(arguments),
				t = e[0],
				r = e.slice(1);
			return "string" == typeof t && commonWays[t] ? commonWays[t].apply(commonWays, r) : void("function" == typeof t ? t.apply(sd, r) : sd.log("quick方法中没有这个功能" + e[0]))
		}, sd.track = function(e, t, r) {
			saEvent.check({
				event: e,
				properties: t
			}) && saEvent.send({
				type: "track",
				event: e,
				properties: t
			}, r)
		}, sd.trackLink = function(e, t, r) {
			"object" == typeof e && e.tagName ? _.trackLink({
				ele: e
			}, t, r) : "object" == typeof e && e.target && e.event && _.trackLink(e, t, r)
		}, sd.trackLinks = function(e, t, r) {
			return r = r || {}, !(!e || "object" != typeof e) && (!(!e.href || /^javascript/.test(e.href) || e.target) && void _.addEvent(e, "click", function(s) {
				function n() {
					a || (a = !0, location.href = e.href)
				}
				s.preventDefault();
				var a = !1;
				setTimeout(n, 1e3), sd.track(t, r, n)
			}))
		}, sd.setProfile = function(e, t) {
			saEvent.check({
				propertiesMust: e
			}) && saEvent.send({
				type: "profile_set",
				properties: e
			}, t)
		}, sd.setOnceProfile = function(e, t) {
			saEvent.check({
				propertiesMust: e
			}) && saEvent.send({
				type: "profile_set_once",
				properties: e
			}, t)
		}, sd.appendProfile = function(e, t) {
			saEvent.check({
				propertiesMust: e
			}) && (_.each(e, function(t, r) {
				_.isString(t) ? e[r] = [t] : _.isArray(t) || (delete e[r], sd.log("appendProfile属性的值必须是字符串或者数组"))
			}), _.isEmptyObject(e) || saEvent.send({
				type: "profile_append",
				properties: e
			}, t))
		}, sd.incrementProfile = function(e, t) {
			function r(e) {
				for (var t in e) if (!/-*\d+/.test(String(e[t]))) return !1;
				return !0
			}
			var s = e;
			_.isString(e) && (e = {}, e[s] = 1), saEvent.check({
				propertiesMust: e
			}) && (r(e) ? saEvent.send({
				type: "profile_increment",
				properties: e
			}, t) : sd.log("profile_increment的值只能是数字"))
		}, sd.deleteProfile = function(e) {
			saEvent.send({
				type: "profile_delete"
			}, e), store.set("distinct_id", _.UUID())
		}, sd.unsetProfile = function(e, t) {
			var r = e,
				s = {};
			_.isString(e) && (e = [], e.push(r)), _.isArray(e) ? (_.each(e, function(e) {
				_.isString(e) ? s[e] = !0 : sd.log("profile_unset给的数组里面的值必须时string,已经过滤掉", e)
			}), saEvent.send({
				type: "profile_unset",
				properties: s
			}, t)) : sd.log("profile_unset的参数是数组")
		}, sd.identify = function(e, t) {
			"number" == typeof e && (e = String(e));
			var r = store.getFirstId();
			"undefined" == typeof e ? r ? store.set("first_id", _.UUID()) : store.set("distinct_id", _.UUID()) : saEvent.check({
				distinct_id: e
			}) ? t === !0 ? r ? store.set("first_id", e) : store.set("distinct_id", e) : r ? store.change("first_id", e) : store.change("distinct_id", e) : sd.log("identify的参数必须是字符串")
		}, sd.trackSignup = function(e, t, r, s) {
			saEvent.check({
				distinct_id: e,
				event: t,
				properties: r
			}) && (saEvent.send({
				original_id: store.getFirstId() || store.getDistinctId(),
				distinct_id: e,
				type: "track_signup",
				event: t,
				properties: r
			}, s), store.set("distinct_id", e))
		}, sd.trackAbtest = function(e, t) {}, sd.registerPage = function(e) {
			saEvent.check({
				properties: e
			}) ? _.extend(_.info.currentProps, e) : sd.log("register输入的参数有误")
		}, sd.clearAllRegister = function(e) {
			store.clearAllProps(e)
		}, sd.register = function(e) {
			saEvent.check({
				properties: e
			}) ? store.setProps(e) : sd.log("register输入的参数有误")
		}, sd.registerOnce = function(e) {
			saEvent.check({
				properties: e
			}) ? store.setPropsOnce(e) : sd.log("registerOnce输入的参数有误")
		}, sd.registerSession = function(e) {
			saEvent.check({
				properties: e
			}) ? store.setSessionProps(e) : sd.log("registerSession输入的参数有误")
		}, sd.registerSessionOnce = function(e) {
			saEvent.check({
				properties: e
			}) ? store.setSessionPropsOnce(e) : sd.log("registerSessionOnce输入的参数有误")
		}, sd.login = function(e) {
			if ("number" == typeof e && (e = String(e)), saEvent.check({
				distinct_id: e
			})) {
				var t = store.getFirstId(),
					r = store.getDistinctId();
				e !== r && (t ? sd.trackSignup(e, "$SignUp") : (store.set("first_id", r), sd.trackSignup(e, "$SignUp")))
			} else sd.log("login的参数必须是字符串")
		}, sd.logout = function(e) {
			var t = store.getFirstId();
			t ? (store.set("first_id", ""), e === !0 ? store.set("distinct_id", _.UUID()) : store.set("distinct_id", t)) : sd.log("没有first_id，logout失败")
		}, sd.getPresetProperties = function() {
			function e() {
				var e = _.info.campaignParams(),
					t = {};
				for (var r in e)(" " + sd.source_channel_standard + " ").indexOf(" " + r + " ") !== -1 ? t["$" + r] = e[r] : t[r] = e[r];
				return t
			}
			var t = {
				$referrer: "string" == typeof document.referrer ? document.referrer.slice(0, 100) : "",
				$referrer_host: _.url("hostname", document.referrer) || "",
				$url: location.href,
				$url_path: location.pathname,
				$title: document.title || "",
				_distinct_id: store.getDistinctId()
			};
			return _.extend({}, _.info.properties(), sd.store.getProps(), e(), t)
		};
		var dataSend = {};
		dataSend.getSendUrl = function(e, t) {
			var r = _.base64Encode(t),
				s = "crc=" + _.hashCode(r);
			return e.indexOf("?") !== -1 ? e + "&data=" + encodeURIComponent(r) + "&ext=" + encodeURIComponent(s) : e + "?data=" + encodeURIComponent(r) + "&ext=" + encodeURIComponent(s)
		}, dataSend.getSendData = function(e) {
			var t = _.base64Encode(e),
				r = "crc=" + _.hashCode(t);
			return "data=" + encodeURIComponent(t) + "&ext=" + encodeURIComponent(r)
		}, dataSend.getInstance = function(e) {
			var t = this.getSendType(e),
				r = new this[t](e),
				s = r.start;
			return r.start = function() {
				_.isObject(sd.para.is_debug) && sd.para.is_debug.storage && sd.store.requests && sd.store.requests.push({
					name: this.server_url,
					initiatorType: this.img ? "img" : "xmlhttprequest",
					entryType: "resource",
					requestData: this.data
				});
				var e = this;
				s.apply(this, arguments), setTimeout(function() {
					e.isEnd(!0)
				}, sd.para.callback_timeout)
			}, r.end = function() {
				this.callback && this.callback();
				var e = this;
				setTimeout(function() {
					e.lastClear && e.lastClear()
				}, sd.para.datasend_timeout - sd.para.callback_timeout)
			}, r.isEnd = function(e) {
				if (!this.received) {
					this.received = !0, this.end();
					var t = this;
					e ? sd.para.queue_timeout - sd.para.callback_timeout <= 0 ? t.close() : setTimeout(function() {
						t.close()
					}, sd.para.queue_timeout - sd.para.callback_timeout) : t.close()
				}
			}, r
		}, dataSend.getSendType = function(e) {
			var t = ["image", "ajax", "beacon"],
				r = t[0];
			return r = e.config && _.indexOf(t, e.config.send_type) > -1 ? e.config.send_type : sd.para.send_type, "beacon" === r && "function" != typeof navigator.sendBeacon && (r = "image"), "ajax" === r && _.isSupportCors() === !1 && (r = "image"), r
		}, dataSend.image = function(e) {
			this.callback = e.callback, this.img = document.createElement("img"), this.img.width = 1, this.img.height = 1, sd.para.img_use_crossorigin && (this.img.crossOrigin = "anonymous"), this.data = e.data, this.server_url = dataSend.getSendUrl(e.server_url, e.data)
		}, dataSend.image.prototype.start = function() {
			var e = this;
			sd.para.ignore_oom && (this.img.onload = function() {
				this.onload = null, this.onerror = null, this.onabort = null, e.isEnd()
			}, this.img.onerror = function() {
				this.onload = null, this.onerror = null, this.onabort = null, e.isEnd()
			}, this.img.onabort = function() {
				this.onload = null, this.onerror = null, this.onabort = null, e.isEnd()
			}), this.img.src = this.server_url
		}, dataSend.image.prototype.lastClear = function() {
			this.img.src = ""
		}, dataSend.ajax = function(e) {
			this.callback = e.callback, this.server_url = e.server_url, this.data = dataSend.getSendData(e.data)
		}, dataSend.ajax.prototype.start = function() {
			var e = this;
			_.ajax({
				url: this.server_url,
				type: "POST",
				data: this.data,
				credentials: !1,
				timeout: sd.para.datasend_timeout,
				cors: !0,
				success: function() {
					e.isEnd()
				},
				error: function() {
					e.isEnd()
				}
			})
		}, dataSend.beacon = function(e) {
			this.callback = e.callback, this.server_url = e.server_url, this.data = dataSend.getSendData(e.data)
		}, dataSend.beacon.prototype.start = function() {
			var e = this;
			"object" == typeof navigator && "function" == typeof navigator.sendBeacon && navigator.sendBeacon(this.server_url, this.data), setTimeout(function() {
				e.isEnd()
			}, 40)
		};
		var sendState = {};
		sd.sendState = sendState, sendState.queue = _.autoExeQueue(), sendState.requestData = null, sendState.getSendCall = function(e, t, r) {
			if (sd.is_heatmap_render_mode) return !1;
			e._track_id = Number(String(Math.random()).slice(2, 5) + String(Math.random()).slice(2, 4) + String((new Date).getTime()).slice(-4)), sd.para.use_client_time && (e._flush_time = (new Date).getTime());
			var s = e;
			if (e = JSON.stringify(e), this.requestData = {
				data: s,
				config: t,
				callback: r
			}, sd.para.use_app_track === !0 || "only" === sd.para.use_app_track) if ("object" == typeof SensorsData_APP_JS_Bridge && (SensorsData_APP_JS_Bridge.sensorsdata_verify || SensorsData_APP_JS_Bridge.sensorsdata_track)) SensorsData_APP_JS_Bridge.sensorsdata_verify ? SensorsData_APP_JS_Bridge.sensorsdata_verify(JSON.stringify(_.extend({
				server_url: sd.para.server_url
			}, s))) ? "function" == typeof r && r() : (sd.debug.apph5({
				data: s,
				step: "3.1",
				output: "all"
			}), this.prepareServerUrl()) : (SensorsData_APP_JS_Bridge.sensorsdata_track(JSON.stringify(_.extend({
				server_url: sd.para.server_url
			}, s))), "function" == typeof r && r());
			else if (!/sensors-verify/.test(navigator.userAgent) && !/sa-sdk-ios/.test(navigator.userAgent) || window.MSStream) sd.para.use_app_track === !0 && (sd.debug.apph5({
				data: s,
				step: "2",
				output: "all"
			}), this.prepareServerUrl());
			else {
				var n = null;
				if (/sensors-verify/.test(navigator.userAgent)) {
					var a = navigator.userAgent.match(/sensors-verify\/([^\s]+)/);
					if (a && a[0] && "string" == typeof a[1] && 2 === a[1].split("?").length) {
						a = a[1].split("?");
						var i = null,
							o = null;
						try {
							i = _.url("hostname", sd.para.server_url), o = _.url("?project", sd.para.server_url) || "default"
						} catch (c) {}
						i && i === a[0] && o && o === a[1] ? (n = document.createElement("iframe"), n.setAttribute("src", "sensorsanalytics://trackEvent?event=" + encodeURIComponent(JSON.stringify(_.extend({
							server_url: sd.para.server_url
						}, s)))), document.documentElement.appendChild(n), n.parentNode.removeChild(n), n = null, "function" == typeof r && r()) : (sd.debug.apph5({
							data: s,
							step: "3.2",
							output: "all"
						}), this.prepareServerUrl())
					}
				} else n = document.createElement("iframe"), n.setAttribute("src", "sensorsanalytics://trackEvent?event=" + encodeURIComponent(JSON.stringify(_.extend({
					server_url: sd.para.server_url
				}, s)))), document.documentElement.appendChild(n), n.parentNode.removeChild(n), n = null, "function" == typeof r && r()
			} else "mui" === sd.para.use_app_track ? _.isObject(window.plus) && window.plus.SDAnalytics && window.plus.SDAnalytics.trackH5Event && window.plus.SDAnalytics.trackH5Event(e) : (sd.debug.apph5({
				data: s,
				step: "1",
				output: "code"
			}), this.prepareServerUrl());
			sd.log(s)
		}, sendState.prepareServerUrl = function() {
			if ("object" == typeof this.requestData.config && this.requestData.config.server_url) this.sendCall(this.requestData.config.server_url, this.requestData.callback);
			else if (_.isArray(sd.para.server_url)) for (var e = 0; e < sd.para.server_url.length; e++) this.sendCall(sd.para.server_url[e]);
			else this.sendCall(sd.para.server_url, this.requestData.callback)
		}, sendState.sendCall = function(e, t) {
			var r = {
				server_url: e,
				data: JSON.stringify(this.requestData.data),
				callback: t,
				config: this.requestData.config
			};
			_.isObject(sd.para.jsapp) && !sd.para.jsapp.isOnline && "function" == typeof sd.para.jsapp.setData ? (delete r.callback, r = JSON.stringify(r), sd.para.jsapp.setData(r)) : this.pushSend(r)
		}, sendState.pushSend = function(e) {
			var t = dataSend.getInstance(e),
				r = this;
			t.close = function() {
				r.queue.close()
			}, this.queue.enqueue(t)
		};
		var saEvent = {};
		saEvent.checkOption = {
			regChecks: {
				regName: /^((?!^distinct_id$|^original_id$|^time$|^properties$|^id$|^first_id$|^second_id$|^users$|^events$|^event$|^user_id$|^date$|^datetime$)[a-zA-Z_$][a-zA-Z\d_$]{0,99})$/i
			},
			checkPropertiesKey: function(e) {
				var t = this,
					r = !0;
				return _.each(e, function(e, s) {
					t.regChecks.regName.test(s) || (r = !1)
				}), r
			},
			check: function(e, t) {
				return "string" == typeof this[e] ? this[this[e]](t) : this[e](t)
			},
			str: function(e) {
				return !!_.isString(e) || (sd.log("请检查参数格式,必须是字符串"), !0)
			},
			properties: function(e) {
				return _.strip_sa_properties(e), !e || (_.isObject(e) ? !! this.checkPropertiesKey(e) || (sd.log("properties 里的自定义属性名需要是合法的变量名，不能以数字开头，且只包含：大小写字母、数字、下划线，自定义属性不能以 $ 开头"), !0) : (sd.log("properties可以没有，但有的话必须是对象"), !0))
			},
			propertiesMust: function(e) {
				return _.strip_sa_properties(e), void 0 === e || !_.isObject(e) || _.isEmptyObject(e) ? (sd.log("properties必须是对象且有值"), !0) : !! this.checkPropertiesKey(e) || (sd.log("properties 里的自定义属性名需要是合法的变量名，不能以数字开头，且只包含：大小写字母、数字、下划线，自定义属性不能以 $ 开头"), !0)
			},
			event: function(e) {
				return !(!_.isString(e) || !this.regChecks.regName.test(e)) || (sd.log("请检查参数格式，eventName 必须是字符串，且需是合法的变量名，即不能以数字开头，且只包含：大小写字母、数字、下划线和 $,其中以 $ 开头的表明是系统的保留字段，自定义事件名请不要以 $ 开头"), !0)
			},
			test_id: "str",
			group_id: "str",
			distinct_id: function(e) {
				return !(!_.isString(e) || !/^.{1,255}$/.test(e)) || (sd.log("distinct_id必须是不能为空，且小于255位的字符串"), !1)
			}
		}, saEvent.check = function(e) {
			var t = !0;
			for (var r in e) if (!this.checkOption.check(r, e[r])) return !1;
			return t
		}, saEvent.send = function(e, t) {
			var r = {
				distinct_id: store.getDistinctId(),
				lib: {
					$lib: "js",
					$lib_method: "code",
					$lib_version: String(sd.lib_version)
				},
				properties: {}
			};
			_.isObject(e) && _.isObject(e.properties) && !_.isEmptyObject(e.properties) && e.properties.$lib_detail && (r.lib.$lib_detail = e.properties.$lib_detail, delete e.properties.$lib_detail), _.extend(r, e), _.isObject(e.properties) && !_.isEmptyObject(e.properties) && _.extend(r.properties, e.properties), e.type && "profile" === e.type.slice(0, 7) || (r.properties = _.extend({}, _.info.properties(), store.getProps(), store.getSessionProps(), _.info.currentProps, r.properties), sd.para.is_track_latest.referrer && !_.isString(r.properties.$latest_referrer) && (r.properties.$latest_referrer = "取值异常"), sd.para.is_track_latest.referrer_host && !_.isString(r.properties.$latest_referrer_host) && (r.properties.$latest_referrer_host = "取值异常"), sd.para.is_track_latest.search_keyword && !_.isString(r.properties.$latest_search_keyword) && (r.properties.$latest_search_keyword = "取值异常"), sd.para.is_track_latest.traffic_source_type && !_.isString(r.properties.$latest_traffic_source_type) && (r.properties.$latest_traffic_source_type = "取值异常"), sd.para.is_track_latest.landing_page && !_.isString(r.properties.$latest_landing_page) && (r.properties.$latest_landing_page = "取值异常")), r.properties.$time && _.isDate(r.properties.$time) ? (r.time = 1 * r.properties.$time, delete r.properties.$time) : sd.para.use_client_time && (r.time = 1 * new Date), _.searchObjDate(r), _.searchObjString(r), _.searchZZAppStyle(r);
			var s = _.searchConfigData(r.properties);
			saNewUser.checkIsAddSign(r), saNewUser.checkIsFirstTime(r), sd.para.debug_mode === !0 ? (sd.log(r), this.debugPath(JSON.stringify(r), t)) : sd.sendState.getSendCall(r, s, t)
		}, saEvent.debugPath = function(e, t) {
			var r = e,
				s = "";
			s = sd.para.debug_mode_url.indexOf("?") !== -1 ? sd.para.debug_mode_url + "&data=" + encodeURIComponent(_.base64Encode(e)) : sd.para.debug_mode_url + "?data=" + encodeURIComponent(_.base64Encode(e)), _.ajax({
				url: s,
				type: "GET",
				cors: !0,
				header: {
					"Dry-Run": String(sd.para.debug_mode_upload)
				},
				success: function(e) {
					_.isEmptyObject(e) === !0 ? alert("debug数据发送成功" + r) : alert("debug失败 错误原因" + JSON.stringify(e))
				}
			})
		};
		var store = sd.store = {
			requests: [],
			_sessionState: {},
			_state: {},
			getProps: function() {
				return this._state.props || {}
			},
			getSessionProps: function() {
				return this._sessionState
			},
			getDistinctId: function() {
				return this._state.distinct_id
			},
			getFirstId: function() {
				return this._state.first_id
			},
			toState: function(e) {
				var t = null;
				if (null != e && _.isJSONString(e)) if (t = JSON.parse(e), this._state = _.extend(t), t.distinct_id) {
					if ("object" == typeof t.props) {
						for (var r in t.props)"string" == typeof t.props[r] && (t.props[r] = t.props[r].slice(0, sd.para.max_referrer_string_length));
						this.save()
					}
				} else this.set("distinct_id", _.UUID()), sd.debug.distinct_id("1", e);
				else this.set("distinct_id", _.UUID()), sd.debug.distinct_id("2", e)
			},
			initSessionState: function() {
				var e = _.cookie.get("sensorsdata2015session"),
					t = null;
				null !== e && "object" == typeof(t = JSON.parse(e)) && (this._sessionState = t || {})
			},
			setOnce: function(e, t) {
				e in this._state || this.set(e, t)
			},
			set: function(e, t) {
				this._state = this._state || {}, this._state[e] = t, this.save()
			},
			change: function(e, t) {
				this._state[e] = t
			},
			setSessionProps: function(e) {
				var t = this._sessionState;
				_.extend(t, e), this.sessionSave(t)
			},
			setSessionPropsOnce: function(e) {
				var t = this._sessionState;
				_.coverExtend(t, e), this.sessionSave(t)
			},
			setProps: function(e, t) {
				var r = {};
				r = t ? e : _.extend(this._state.props || {}, e);
				for (var s in r)"string" == typeof r[s] && (r[s] = r[s].slice(0, sd.para.max_referrer_string_length));
				this.set("props", r)
			},
			setPropsOnce: function(e) {
				var t = this._state.props || {};
				_.coverExtend(t, e), this.set("props", t)
			},
			clearAllProps: function(e) {
				if (this._sessionState = {}, _.isArray(e) && e.length > 0) for (var t = 0; t < e.length; t++) _.isString(e[t]) && e[t].indexOf("latest_") === -1 && e[t] in this._state.props && delete this._state.props[e[t]];
				else for (var t in this._state.props) 1 !== t.indexOf("latest_") && delete this._state.props[t];
				this.sessionSave({}), this.save()
			},
			sessionSave: function(e) {
				this._sessionState = e, _.cookie.set("sensorsdata2015session", JSON.stringify(this._sessionState), 0)
			},
			save: function() {
				_.cookie.set(this.getCookieName(), JSON.stringify(this._state), 73e3, sd.para.cross_subdomain)
			},
			getCookieName: function() {
				var e = "";
				return sd.para.cross_subdomain === !1 ? (e = _.url("sub", location.href), e = "string" == typeof e && "" !== e ? "sa_jssdk_2015_" + e : "sa_jssdk_2015_root") : e = "sensorsdata2015jssdkcross", e
			},
			init: function() {
				this.initSessionState();
				var e = _.UUID(),
					t = _.cookie.get(this.getCookieName());
				null === t ? (sd.is_first_visitor = !0, this.set("distinct_id", e)) : (_.isJSONString(t) && JSON.parse(t).distinct_id || (sd.is_first_visitor = !0), this.toState(t)), saNewUser.setDeviceId(e), saNewUser.storeInitCheck(), saNewUser.checkIsFirstLatest()
			}
		},
			saNewUser = {
				checkIsAddSign: function(e) {
					"track" === e.type && (_.cookie.getNewUser() ? e.properties.$is_first_day = !0 : e.properties.$is_first_day = !1)
				},
				is_first_visit_time: !1,
				checkIsFirstTime: function(e) {
					"track" === e.type && "$pageview" === e.event && (this.is_first_visit_time ? (e.properties.$is_first_time = !0, this.is_first_visit_time = !1) : e.properties.$is_first_time = !1)
				},
				setDeviceId: function(e) {
					var t = null,
						r = _.cookie.get("sensorsdata2015jssdkcross"),
						s = {};
					null != r && _.isJSONString(r) && (s = JSON.parse(r), s.$device_id && (t = s.$device_id)), t = t || e, sd.para.cross_subdomain === !0 ? store.set("$device_id", t) : (s.$device_id = t, _.cookie.set("sensorsdata2015jssdkcross", JSON.stringify(s), null, !0)), sd.para.is_track_device_id && (_.info.currentProps.$device_id = t)
				},
				storeInitCheck: function() {
					if (sd.is_first_visitor) {
						var e = new Date,
							t = {
								h: 23 - e.getHours(),
								m: 59 - e.getMinutes(),
								s: 59 - e.getSeconds()
							};
						_.cookie.set(_.cookie.getCookieName("new_user"), "1", 3600 * t.h + 60 * t.m + t.s + "s"), this.is_first_visit_time = !0
					} else _.cookie.getNewUser() || (this.checkIsAddSign = function(e) {
						"track" === e.type && (e.properties.$is_first_day = !1)
					}), this.checkIsFirstTime = function(e) {
						"track" === e.type && "$pageview" === e.event && (e.properties.$is_first_time = !1)
					}
				},
				checkIsFirstLatest: function() {
					for (var e = _.info.pageProp.url_domain, t = _.info.pageProp.referrer_domain, r = ["$utm_source", "$utm_medium", "$utm_campaign", "$utm_content", "$utm_term"], s = store.getProps(), n = 0; n < r.length; n++) r[n] in s && delete s[r[n]];
					store.setProps(s, !0);
					var a = {};
					if ("" === e && (e = "url解析失败"), _.each(sd.para.is_track_latest, function(r, s) {
						if (r) {
							if ("utm" !== s && "url解析失败" === e) a["$latest_" + s] = "url的domain解析失败";
							else if ("utm" !== s && "referrer解析失败" === t) a["$latest_" + s] = "referrer的domain解析失败";
							else if (e !== t) switch (s) {
							case "traffic_source_type":
								a.$latest_traffic_source_type = _.getSourceFromReferrer();
								break;
							case "referrer":
								a.$latest_referrer = _.info.pageProp.referrer;
								break;
							case "referrer_host":
								a.$latest_referrer_host = _.info.pageProp.referrer_host;
								break;
							case "search_keyword":
								a.$latest_search_keyword = _.getKeywordFromReferrer();
								break;
							case "landing_page":
								a.$latest_landing_page = location.href
							}
						} else if ("utm" === s && sd.store._state.props) for (var n in sd.store._state.props) 0 === n.indexOf("$latest_utm") && 0 === n.indexOf("_latest_") || delete sd.store._state.props[n];
						else sd.store._state.props && "$latest_" + s in sd.store._state.props && delete sd.store._state.props["$latest_" + s]
					}), sd.register(a), sd.para.is_track_latest.utm) {
						var i = _.info.campaignParamsStandard("$latest_", "_latest_"),
							o = i.$utms,
							c = i.otherUtms;
						_.isEmptyObject(o) || sd.register(o), _.isEmptyObject(c) || sd.register(c)
					}
				}
			},
			heatmap = sd.heatmap = {
				setNotice: function(e) {
					sd.is_heatmap_render_mode = !0, sd.para.heatmap || (sd.errorMsg = "您SDK没有配置开启点击图，可能没有数据！"), e && e[0] && e[1] && "http:" === e[1].slice(0, 5) && "https" === location.protocol && (sd.errorMsg = "您的当前页面是https的地址，神策分析环境也必须是https！"), sd.para.heatmap_url || (sd.para.heatmap_url = location.protocol + "//static.sensorsdata.cn/sdk/" + sd.lib_version + "/heatmap.min.js")
				},
				getDomIndex: function(e) {
					if (!e.parentNode) return -1;
					for (var t = 0, r = e.tagName, s = e.parentNode.children, n = 0; n < s.length; n++) if (s[n].tagName === r) {
						if (e === s[n]) return t;
						t++
					}
					return -1
				},
				selector: function(e) {
					var t = e.parentNode && 9 == e.parentNode.nodeType ? -1 : this.getDomIndex(e);
					return e.getAttribute && e.getAttribute("id") && (!sd.para.heatmap || sd.para.heatmap && "not_use_id" !== sd.para.heatmap.element_selector) ? "#" + e.getAttribute("id") : e.tagName.toLowerCase() + (~t ? ":nth-of-type(" + (t + 1) + ")" : "")
				},
				getDomSelector: function(e, t) {
					if (!e || !e.parentNode || !e.parentNode.children) return !1;
					t = t && t.join ? t : [];
					var r = e.nodeName.toLowerCase();
					return e && "body" !== r && 1 == e.nodeType ? (t.unshift(this.selector(e)), e.getAttribute && e.getAttribute("id") ? t.join(" > ") : this.getDomSelector(e.parentNode, t)) : (t.unshift("body"), t.join(" > "))
				},
				na: function() {
					var e = document.documentElement.scrollLeft || window.pageXOffset;
					return parseInt(isNaN(e) ? 0 : e, 10)
				},
				i: function() {
					var e = 0;
					try {
						e = o.documentElement && o.documentElement.scrollTop || m.pageYOffset, e = isNaN(e) ? 0 : e
					} catch (t) {
						e = 0
					}
					return parseInt(e, 10)
				},
				getBrowserWidth: function() {
					var e = window.innerWidth || document.body.clientWidth;
					return isNaN(e) ? 0 : parseInt(e, 10)
				},
				getBrowserHeight: function() {
					var e = window.innerHeight || document.body.clientHeight;
					return isNaN(e) ? 0 : parseInt(e, 10)
				},
				getScrollWidth: function() {
					var e = parseInt(document.body.scrollWidth, 10);
					return isNaN(e) ? 0 : e
				},
				W: function(e) {
					var t = parseInt(+e.clientX + +this.na(), 10),
						e = parseInt(+e.clientY + +this.i(), 10);
					return {
						x: isNaN(t) ? 0 : t,
						y: isNaN(e) ? 0 : e
					}
				},
				start: function(e, t, r, s, n) {
					var a = _.isObject(s) ? s : {},
						i = _.isFunction(n) ? n : _.isFunction(s) ? s : void 0;
					if (sd.para.heatmap && sd.para.heatmap.collect_element && !sd.para.heatmap.collect_element(t)) return !1;
					var o = this.getDomSelector(t),
						c = _.getEleInfo({
							target: t
						});
					if (c.$element_selector = o ? o : "", sd.para.heatmap && sd.para.heatmap.custom_property) {
						var u = sd.para.heatmap.custom_property(t);
						_.isObject(u) && (c = _.extend(c, u))
					}
					c = _.extend(c, a), "a" === r && sd.para.heatmap && sd.para.heatmap.isTrackLink === !0 ? _.trackLink({
						event: e,
						target: t
					}, "$WebClick", c) : sd.track("$WebClick", c, i)
				},
				hasElement: function(e) {
					var t = e._getPath();
					if (_.isArray(t) && t.length > 0) for (var r = 0; r < t.length; r++) if (t[r] && t[r].tagName && "a" === t[r].tagName.toLowerCase()) return t[r];
					return !1
				},
				initScrollmap: function() {
					if (!_.isObject(sd.para.heatmap) || "default" !== sd.para.heatmap.scroll_notice_map) return !1;
					if (sd.para.scrollmap && _.isFunction(sd.para.scrollmap.collect_url) && !sd.para.scrollmap.collect_url()) return !1;
					var e = function(e) {
							var t = {};
							return t.timeout = e.timeout || 1e3, t.func = e.func, t.hasInit = !1, t.inter = null, t.main = function(e, t) {
								this.func(e, t), this.inter = null
							}, t.go = function(e) {
								var r = {};
								this.inter || (r.$viewport_position = document.documentElement && document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0, r.$viewport_position = Math.round(r.$viewport_position) || 0, r.$viewport_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0, r.$viewport_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0, e ? t.main(r, !0) : this.inter = setTimeout(function() {
									t.main(r)
								}, this.timeout))
							}, t
						},
						t = e({
							timeout: 1e3,
							func: function(e, t) {
								var r = document.documentElement && document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0,
									s = new Date,
									n = s - this.current_time;
								(n > sd.para.heatmap.scroll_delay_time && r - e.$viewport_position !== 0 || t) && (e.$url = location.href, e.$title = document.title, e.$url_path = location.pathname, e.event_duration = parseInt(n) / 1e3, sd.track("$WebStay", e)), this.current_time = s
							}
						});
					t.current_time = new Date, _.addEvent(window, "scroll", function() {
						t.go()
					}), _.addEvent(window, "unload", function() {
						t.go("notime")
					})
				},
				initHeatmap: function() {
					var e = this;
					return !(!_.isObject(sd.para.heatmap) || "default" !== sd.para.heatmap.clickmap) && (!(_.isFunction(sd.para.heatmap.collect_url) && !sd.para.heatmap.collect_url()) && ("all" === sd.para.heatmap.collect_elements ? sd.para.heatmap.collect_elements = "all" : sd.para.heatmap.collect_elements = "interact", void("all" === sd.para.heatmap.collect_elements ? _.addEvent(document, "click", function(t) {
						var r = t || window.event;
						if (!r) return !1;
						var s = r.target || r.srcElement;
						if ("object" != typeof s) return !1;
						if ("string" != typeof s.tagName) return !1;
						var n = s.tagName.toLowerCase();
						if ("body" === n || "html" === n) return !1;
						if (!s || !s.parentNode || !s.parentNode.children) return !1;
						var a = s.parentNode.tagName.toLowerCase();
						"a" === a || "button" === a ? e.start(r, s.parentNode, a) : e.start(r, s, n)
					}) : _.addEvent(document, "click", function(t) {
						var r = t || window.event;
						if (!r) return !1;
						var s = r.target || r.srcElement;
						if ("object" != typeof s) return !1;
						if ("string" != typeof s.tagName) return !1;
						var n = s.tagName.toLowerCase();
						if ("body" === n.toLowerCase() || "html" === n.toLowerCase()) return !1;
						if (!s || !s.parentNode || !s.parentNode.children) return !1;
						var a = s.parentNode;
						if ("a" === n || "button" === n || "input" === n || "textarea" === n) e.start(r, s, n);
						else if ("button" === a.tagName.toLowerCase() || "a" === a.tagName.toLowerCase()) e.start(r, a, s.parentNode.tagName.toLowerCase());
						else if ("area" === n && "map" === a.tagName.toLowerCase() && _.ry(a).prev().tagName && "img" === _.ry(a).prev().tagName.toLowerCase()) e.start(r, _.ry(a).prev(), _.ry(a).prev().tagName.toLowerCase());
						else {
							var i = e.hasElement(t);
							i && e.start(r, i, i.tagName.toLowerCase())
						}
					}))))
				},
				prepare: function(e) {
					function t(e, t, r) {
						sd.para.heatmap_url ? _.loadScript({
							success: function() {
								setTimeout(function() {
									"undefined" != typeof sa_jssdk_heatmap_render && (sa_jssdk_heatmap_render(sd, e, t, r), "object" == typeof console && "function" == typeof console.log && (sd.heatmap_version && sd.heatmap_version === sd.lib_version || console.log("heatmap.js与sensorsdata.js版本号不一致，可能存在风险!")))
								}, 0)
							},
							error: function() {},
							type: "js",
							url: sd.para.heatmap_url
						}) : sd.log("没有指定heatmap_url的路径")
					}
					var r = location.search.match(/sa-request-id=([^&#]+)/),
						s = location.search.match(/sa-request-type=([^&#]+)/),
						n = location.search.match(/sa-request-url=([^&#]+)/);
					r && r[0] && r[1] ? (heatmap.setNotice(n), _.sessionStorage.isSupport() && (n && n[0] && n[1] && sessionStorage.setItem("sensors_heatmap_url", decodeURIComponent(n[1])), sessionStorage.setItem("sensors_heatmap_id", r[1]), s && s[0] && s[1] ? "1" === s[1] || "2" === s[1] || "3" === s[1] ? (s = s[1], sessionStorage.setItem("sensors_heatmap_type", s)) : s = null : s = null !== sessionStorage.getItem("sensors_heatmap_type") ? sessionStorage.getItem("sensors_heatmap_type") : null), t(r[1], s)) : _.sessionStorage.isSupport() && "string" == typeof sessionStorage.getItem("sensors_heatmap_id") ? (heatmap.setNotice(), t(sessionStorage.getItem("sensors_heatmap_id"), sessionStorage.getItem("sensors_heatmap_type"), location.href)) : (e(), _.isObject(sd.para.heatmap) && (this.initHeatmap(), this.initScrollmap()))
				}
			};
		if (sd.init = function(e) {
			function t() {
				function e(e) {
					s = e, _.isJSONString(s) && (s = JSON.parse(s)), n && (n(s), n = null, s = null)
				}
				function t() {
					"object" == typeof window.SensorsData_APP_JS_Bridge && window.SensorsData_APP_JS_Bridge.sensorsdata_call_app && (s = SensorsData_APP_JS_Bridge.sensorsdata_call_app(), _.isJSONString(s) && (s = JSON.parse(s)))
				}
				function r() {
					if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
						var e = document.createElement("iframe");
						e.setAttribute("src", "sensorsanalytics://getAppInfo"), document.documentElement.appendChild(e), e.parentNode.removeChild(e), e = null
					}
				}
				var s = null,
					n = null;
				window.sensorsdata_app_js_bridge_call_js = function(t) {
					e(t)
				}, sd.getAppStatus = function(e) {
					return r(), t(), e ? void(null === s ? n = e : (e(s), s = null)) : s
				}
			}
			return !(sd.readyState && sd.readyState.state && sd.readyState.state >= 2) && (sd.setInitVar(), sd.readyState.setState(2), sd.initPara(e), void heatmap.prepare(function() {
				t(), _.info.initPage(), sd.para.is_track_single_page && _.addSinglePageEvent(function(e) {
					var t = function(t) {
							t = t || {}, e !== location.href && sd.quick("autoTrack", _.extend({
								$url: location.href,
								$referrer: e
							}, t))
						};
					if ("boolean" == typeof sd.para.is_track_single_page) t();
					else if ("function" == typeof sd.para.is_track_single_page) {
						var r = sd.para.is_track_single_page();
						_.isObject(r) ? t(r) : r === !0 && t()
					}
				}), store.init(), sd.readyState.setState(3), sd._q && _.isArray(sd._q) && sd._q.length > 0 && _.each(sd._q, function(e) {
					sd[e[0]].apply(sd, Array.prototype.slice.call(e[1]))
				})
			}))
		}, "string" != typeof window.sensorsDataAnalytic201505) return "undefined" == typeof window.sensorsDataAnalytic201505 ? (window.sensorsDataAnalytic201505 = sd, sd) : window.sensorsDataAnalytic201505;
		sd.setPreConfig(window[sensorsDataAnalytic201505]), window[sensorsDataAnalytic201505] = sd, sd.init(), window.sensorsDataAnalytic201505 = sd
	} catch (err) {
		if ("object" == typeof console && console.log) try {
			console.log(err)
		} catch (e) {}
	}
});