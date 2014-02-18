


/*
* @version    0.2.1
* @date       2014-02-18
* @stability  2 - Unstable
* @author     Lauri Rooden <lauri@rooden.ee>
* @license    MIT License
*/



function Nop()   {}
function True()  { return true  }
function False() { return false }
function This()  { return this  }
function Init()  {
	var self = this
	return self.init && self.init.apply(self, arguments) || self
}

!function(root) {
	var P = "prototype"
	, A = Array[P], F = Function[P], S = String[P]
	, O = Object
	, sl = F.call.bind(A.slice)
	, cs = []




	// Function extensions
	// -------------------


	F.construct = function(a) {
		/*
		* bind version have bad performance and memory consumption
		* return new(F.bind.apply(this, A.concat.apply([null], a)))
		*/
		var l = a.length
		return l ? (cs[l] || (cs[l] = Fn("t a->new t(a["+O.keys(sl(a)).join("],a[")+"])")))(this, a) : new this
	}

	F.partial = function() {
		var self = this, a = sl(arguments)
		return function() {return self.apply(this, a.concat.apply(a, arguments))}
	}

	F.byWords = function(i) {
		var self = this
		i |= 0
		return function() {
			var s = this, r = s, a = arguments
			;(a[i]||"").replace(/[-\w]+/g, function(w){a[i]=w;r=self.apply(s, a)})
			return r
		}
	}

	F.byKeyVal = function() {
		var self = this
		return function(o) {
			var r, s = this, a = sl(arguments)
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
			, k = keyFn ? keyFn.apply(self, a) : i + ":" + a.length + ":" + sl(a)

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
		, f = function() {
			return self.apply(this, arguments)
		}
		f[P] = O.create(self[P])
		f[P].constructor = f
		while (a = arguments[i++]) O.merge(f[P], a)
		return f
	}

	// Time to live - Run *fun* if Function not called on time
	F.ttl = function(ms, fun) {
		var self = this
		, tick = setTimeout(function(){ms=0;fun&&fun()}, ms)
		return function() {
			clearTimeout(tick)
			ms && self.apply(null, arguments)
		}
	}

	// Run Function one time after last call
	F.once = function(ms) {
		var tick, args, self = this
		return function() {
			clearTimeout(tick)
			args = arguments
			tick = setTimeout(function(){self.apply(null, args)}, ms)
		}
	}

	// Maximum call rate for Function
	F.rate = function(ms, last_call) {
		var tick, args, self = this, next = 0
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
		if (obj) for (key in obj) obj.hasOwnProperty(key) && fn.call(scope, obj[key], key, obj)
	}

	// Object.assign ( target, source ) in ECMAScript 6

	O.merge = function(target, source) {
		for (var k, i = 1; source = arguments[i++];)
			for (k in source) if (source.hasOwnProperty(k)) target[k] = source[k]
		return target
	}

	// Note: use for Object literals only,
	// as it returns false for custom objects,
	// like new Date or new YourCustomObject.

	function isObject(obj) {
		return obj && obj.constructor === O
	}

	O.clone = function(source, temp, key) {
		if (isObject(source)) {
			temp = {}
			for (key in source) if (source.hasOwnProperty(key))
				temp[key] = O.clone(source[key])
			source = temp
		}
		return source
	}

	O.deepMerge = O.deepCopy = function(target, source, path, changed, key, val) {
		path = path || ""
		changed = changed || []

		for (key in source) if (source.hasOwnProperty(key) && target[key] !== source[key]) {
			val = source[key]
			changed.push(path+key)
			if (val === null) delete target[key]
			else if (isObject(val) && isObject(target[key]))
				O.deepMerge(target[key], val, path+key+".", changed)
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
		var self = this
		, l = self.length
		, o = sl(arguments)
		, last_id = -1

		while (l--) if (~o.indexOf(self[l])) self.splice(last_id = l, 1)
		return last_id
	}

	A.each = A.forEach
	A.fold = A.reduce
	A.foldr = A.reduceRight
	A.unique = A.filter.partial(function(s,i,a){return i == a.lastIndexOf(s)})

	!function(n) {
		F[n] = S[n] = function() {
			var a = arguments, l = a[0]
			a[0] = this.fn()
			return A[n].apply(l, a)
		}
	}.byWords()("every filter each map fold foldr some")


	F.fn = This

	S.fn = function() {
		return Fn(this)
	}

	/*
	* Copyright 2007 by Oliver Steele. MIT License
	* http://osteele.com/javascripts/functional
	* Modifyed by Lauri Rooden
	*/
	function Fn(expr) {
		if (Fn[expr]) return Fn[expr]
		var args = "_"
		, body = expr
		, arr = expr.split("->")

		while (arr.length > 1) {
			body = arr.pop()
			args = arr.pop().match(/\w+/g)||""
			arr.length && arr.push("(function("+args+"){return("+body+")})")
		}
		return Fn[expr] = new Function(args, "return(" + body + ")")
	}

	root.Fn = Fn

}(this)



