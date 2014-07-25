


/*
* @version    0.2.7
* @date       2014-07-25
* @stability  2 - Unstable
* @author     Lauri Rooden <lauri@rooden.ee>
* @license    MIT License
*/



!function(root) {
	var P = "prototype"
	, A = Array[P], F = Function[P], S = String[P]
	, O = Object
	, hasOwn = O[P].hasOwnProperty
	, slice = F.call.bind(A.slice)
	, constructFns = []



	// Function extensions
	// -------------------


	F.construct = function(a) {
		// bind version have bad performance and memory consumption
		// return new(F.bind.apply(this, A.concat.apply([null], a)))
		var len = a.length
		return len ?
			(constructFns[len] || (constructFns[len] = Fn("t a->new t(a["+O.keys(slice(a)).join("],a[")+"])")))(this, a) :
			new this
	}

	F.partial = function() {
		var self = this
		, a = slice(arguments)
		return function() {
			return self.apply(this, a.concat.apply(a, arguments))
		}
	}

	/*
	* **argi** - index of argument, which will be split
	* **re**   - optional RegExp for matching words
	*/

	F.byWords = function(argi, re) {
		var self = this
		return function() {
			var s = this
			, r = s
			, a = arguments
			;(a[argi |= 0]||"").replace(re || /\S+/g, function(w) {
				a[argi] = w
				r = self.apply(s, a)
			})
			return r
		}
	}

	F.byKeyVal = function() {
		var self = this
		return function(o) {
			var r
			, s = this
			, a = slice(arguments)
			if (typeof o == "object") for (r in o) {
				a[0] = r
				a[1] = o[r]
				r = self.apply(s, a)
			} else r = self.apply(s, a)
			return r
		}
	}

	// Run function once and return cached value or cached instance
	F.cache = function(instance, keyFn, cache) {
		var self = this
		, c = cache || {}
		, f = function() {
			var a = arguments
			, i = !!instance || this instanceof f
			, k = keyFn ? keyFn.apply(self, a) : i + ":" + a.length + ":" + slice(a)

			return k in c ? c[k] : (c[k] = i ? self.construct(a) : self.apply(this, a))
		}

		f.origin = self
		f.cached = c
		f.extend = function() {
			return self.extend.apply(self, arguments).cache(instance, keyFn, cache)
		}
		f[P] = self[P] // prototype for better access on extending 
		return f
	}

	F.extend = function() {
		var a
		, self = this
		, i = 0

		function f() {
			return self.apply(this, arguments)
		}

		for (f[P] = O.create(self[P]); a = arguments[i++];) O.merge(f[P], a)
		f[P].constructor = f
		return f
	}

	// Time to live - Run *onTimeout* if Function not called on time
	F.ttl = function(ms, onTimeout) {
		var self = this
		, tick = setTimeout(function(){ms=0;onTimeout&&onTimeout()}, ms)

		return function() {
			clearTimeout(tick)
			ms && self.apply(null, arguments)
		}
	}

	// Run Function one time after last call
	F.once = function(ms) {
		var tick, args
		, self = this
		return function() {
			clearTimeout(tick)
			args = arguments
			tick = setTimeout(function(){self.apply(null, args)}, ms)
		}
	}

	// Maximum call rate for Function
	F.rate = function(ms, last_call) {
		var tick, args
		, self = this, next = 0
		return function() {
			var now = +new Date()
			clearTimeout(tick)
			if (now > next) {
				next = now + ms
				self.apply(null, arguments)
			} else if (last_call) {
				args = arguments
				tick = setTimeout(function(){self.apply(null, args)}, next-now)
			}
		}
	}


	// Non-standard
	O.each = function(obj, fn, scope, key) {
		if (obj) for (key in obj) hasOwn.call(obj, key) && fn.call(scope, obj[key], key, obj)
	}

	// Object.assign ( target, source ) in ECMAScript 6

	O.merge = function(target, source) {
		for (var key, i = 1; source = arguments[i++];)
			for (key in source) if (hasOwn.call(source, key)) target[key] = source[key]
		return target
	}

	// Note: use for Object literals only,
	// as it returns false for custom objects,
	// like new Date or new YourObject.

	function isObject(obj) {
		return obj && obj.constructor === O
	}

	O.clone = function(source, temp, key) {
		if (isObject(source)) {
			temp = {}
			for (key in source) if (hasOwn.call(source, key))
				temp[key] = O.clone(source[key])
			source = temp
		}
		return source
	}

	O.deepMerge = O.deepCopy = function(target, source, path, changed, key, val) {
		path = path || ""
		changed = changed || []

		for (key in source) if (hasOwn.call(source, key) && target[key] !== source[key]) {
			val = source[key]
			changed.push(path + key)
			if (val === null) delete target[key]
			else if (isObject(val)) {
				if (!isObject(target[key])) target[key] = {}
				O.deepMerge(target[key], val, path + key + ".", changed)
			}
			else target[key] = val
		}
		return changed
	}

	O.zip = function(keys, vals) {
		return keys.fold(function(_, key, i) {
			_[key] = vals[i]
			return _
		}, {})
	}

	/*
	Array.flatten = function(arr) {
	for(var i=arr.length;i--;)
	0 in arr[i] && A.splice.apply(arr, [i, 1].concat(Array.flatten(arr[i])))
	return arr
	}
	flat([1,2,[3,4,[5,6]],7])
	*/
	// Non-standard
	// // IE < 9 bug: [1,2].splice(0).join("") == "" but should be "12"
	A.remove = function() {
		var arr = this
		, len = arr.length
		, o = slice(arguments)
		, lastId = -1

		for (;len--;) if (~o.indexOf(arr[len])) arr.splice(lastId = len, 1)
		return lastId
	}

	A.each = A.forEach
	A.fold = A.reduce
	A.foldr = A.reduceRight
	// uniq
	// last item preserved
	A.uniq = A.filter.partial(function(s,i,a){return i == a.lastIndexOf(s)})

	A.pushUniq = function(item) {
		return this.indexOf(item) == -1 ? this.push(item) : false
	}

	!function(n) {
		F[n] = S[n] = function() {
			var a = arguments, l = a[0]
			a[0] = this.fn()
			return A[n].apply(l, a)
		}
	}.byWords()("every filter each map fold foldr some")


	F.fn = function() {
		return this
	}

	S.fn = function(scope) {
		return Fn(this, scope)
	}

	// THANKS: Oliver Steele http://www.osteele.com/sources/javascript/functional/
	function Fn(expr, scope) {
		for (var args = "_", body = expr, arr = expr.split("->"); arr.length > 1; ) {
			body = arr.pop()
			args = arr.pop().match(/\w+/g) || ""
			if (arr.length) arr.push("(function("+args+"){return("+body+")})")
		}
		return new Function(args, (scope ? "with(" + scope + "||{})" : "") + "return(" + body + ")")
	}

	root.Fn = Fn.cache()

}(this)



