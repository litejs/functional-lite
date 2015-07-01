


/*
 * @version    0.4.1
 * @date       2015-07-01
 * @stability  2 - Unstable
 * @author     Lauri Rooden <lauri@rooden.ee>
 * @license    MIT License
 */



!function(exports, Object) {
	var P = "prototype"
	, A = Array[P], F = Function[P], S = String[P]
	, hasOwn = Object.prototype.hasOwnProperty
	, slice = F.call.bind(A.slice)
	, fns = {}
	, fnRe = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|arguments|false|function|new|this|true|window|\.\w+|\w+:/g



	// Function extensions
	// -------------------


	function construct(fn, args, len) {
		// bind version have bad performance and memory consumption
		// return new(F.bind.apply(this, A.concat.apply([null], args)))
		len = args.length
		return len ?
		(fns[len] || (fns[len] = Fn("t a->new t(a[" + Object.keys(args).join("],a[") + "])")))(fn, args) :
		new fn
	}

	F.partial = function() {
		var fn = this
		, args = slice(arguments)
		return function() {
			return fn.apply(this, args.concat.apply(args, arguments))
		}
	}

	/*
	 * **argi** - index of argument, which will be split
	 * **re**   - optional RegExp for matching words
	 */

	F.byWords = function(argi, re) {
		var fn = this
		return function() {
			var s = this
			, res = s
			, args = arguments
			;(args[argi |= 0]||"").replace(re || /\S+/g, function(w) {
				args[argi] = w
				res = fn.apply(s, args)
			})
			return res
		}
	}

	F.byKeyVal = function() {
		var fn = this
		return function(o) {
			var res
			, s = this
			, args = slice(arguments)
			if (typeof o == "object") for (res in o) {
				args[0] = res
				args[1] = o[res]
				res = fn.apply(s, args)
			} else res = fn.apply(s, args)
			return res
		}
	}

	// Run function once and return cached value or cached instance
	F.cache = function(instance, keyFn, cache) {
		var fn = wrapper.origin = this
		, c = wrapper.cached = cache || {}

		function wrapper() {
			var args = arguments
			, i = !!instance || this instanceof wrapper
			, k = keyFn ? keyFn.apply(fn, args) : i + ":" + args.length + ":" + slice(args)

			return k in c ? c[k] : (c[k] = i ? construct(fn, args) : fn.apply(this, args))
		}

		wrapper.extend = function() {
			return fn.extend.apply(fn, arguments).cache(instance, keyFn, cache)
		}
		wrapper[P] = fn[P] // prototype for better access on extending
		return wrapper
	}

	F.extend = function() {
		var arg
		, fn = this
		, i = 0

		function wrapper() {
			return fn.apply(this, arguments)
		}

		for (wrapper[P] = Object.create(fn[P]); arg = arguments[i++];) Object.merge(wrapper[P], arg)
		wrapper[P].constructor = wrapper
		return wrapper
	}


	// Non-standard
	Object.each = function(obj, fn, scope, key) {
		if (obj) for (key in obj) hasOwn.call(obj, key) && fn.call(scope, obj[key], key, obj)
	}

	// Object.assign ( target, source ) in ECMAScript 6

	Object.merge = function(target, source) {
		for (var key, i = 1; source = arguments[i++];)
			for (key in source) if (hasOwn.call(source, key)) target[key] = source[key]
		return target
	}

	Object.values = function(obj) {
		return Object.keys(obj||{}).map(function(e) {
			return obj[e]
		})
	}

	/*
	if (!Array.from) Array.from = arrayFrom

	function arrayFrom(obj) {
		for (var arr = [], i = 0, len = obj.length; i < len; ) {
			arr[i] = obj[i++]
		}
		return arr
	}

	Array.prototype.flatten = function(){
		var arr = this, i = arr.length;
		while (i--) if (arr[i] instanceof Array)
			arr[i].unshift(i,1) && arr.splice.apply(arr,arr[i].flatten() )
		return arr
	}
	function argsToArray(){
		return Array.apply(null, arguments).flatten()
	}
	argsToArray([[1],3,[4,5]],2)

	Array.flatten = function(arr) {
	for(var i=arr.length;i--;)
	0 in arr[i] && A.splice.apply(arr, [i, 1].concat(Array.flatten(arr[i])))
	return arr
	}
	flat([1,2,[3,4,[5,6]],7])
	*/

	// Note: use for Object literals only,
	// as it returns false for custom objects,
	// like new Date or new YourObject.

	function isObject(obj) {
		return obj && obj.constructor === Object
	}

	function clone(source, temp, key) {
		if (isObject(source)) {
			temp = {}
			for (key in source) if (hasOwn.call(source, key))
				temp[key] = clone(source[key])
			source = temp
		}
		return source
	}
	Object.clone = clone

	Object.zip = function(keys, vals) {
		return keys.fold(function(_, key, i) {
			_[key] = vals[i]
			return _
		}, {})
	}

	// Non-standard
	// IE<9 bug: [1,2].splice(0).join("") == "" but should be "12"
	A.remove = arrayRemove
	function arrayRemove() {
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
	// first item preserved
	A.uniq = A.filter.partial(function(elem, i, arr) {
		return i == arr.indexOf(elem)
	})

	A.pushUniq = function(item) {
		return this.indexOf(item) == -1 ? this.push(item) : false
	}

	!function(n) {
		F[n] = S[n] = function() {
			var args = arguments, l = args[0]
			args[0] = this.fn()
			return A[n].apply(l, args)
		}
	}.byWords()("every filter each map fold foldr some")


	F.fn = function() {
		return this
	}

	S.fn = function(scope) {
		return Fn(this, scope)
	}

	Boolean.prototype.fn = function() {
		return this.valueOf() ? True : False
	}

	// THANKS: Oliver Steele http://www.osteele.com/sources/javascript/functional/
	function Fn(expr, scope) {
		for (var args = ["_"], body = expr, arr = expr.split("->"); arr.length > 1; ) {
			body = arr.pop()
			args = arr.pop().match(/\w+/g) || []
			if (arr.length) arr.push("(function(" + args + "){return(" + body + ")})")
		}
		// `replace` removes symbols that follow '.',
		//  precede ':', are 'this' or 'arguments'; and also the insides of
		//  strings (by a crude test).  `match` extracts the remaining
		//  symbols.
		return new Function(args, (scope && (expr = expr.replace(fnRe, "").match(/\b[a-z]\w*|\b_\w+/g)) ?
			(
				arrayRemove.apply(expr, args),
				expr[0] ? "var " + expr.uniq().join("='',") + "='';" : ""
			) + "with(" + scope + "||{})" : "")
			+ "return(" + body + ")"
		)
	}

	exports.Fn = Fn.cache()



	function wait(fn) {
		var pending = 1
		, lastArgs = []
		function resume() {
			var args = arguments
			if (args.length) lastArgs = args
			if (!--pending && fn) fn.apply(this, lastArgs)
		}
		resume.wait = function() {
			pending++
			return resume
		}
		return resume
	}
	exports.Fn.wait = wait



	function hold(ignore) {
		var k
		, obj = this
		, hooks = []
		, hooked = []
		, _resume = wait(resume)
		ignore = ignore || obj.syncMethods || []

		for (k in obj) if (typeof obj[k] == "function" && ignore.indexOf(k) == -1) !function(k) {
			hooked.push(k, hasOwn.call(obj, k) && obj[k])
			obj[k] = function() {
				hooks.push(k, arguments)
				return obj
			}
		}(k)

		obj.wait = _resume.wait
		return _resume

		function resume() {
			for (var v, scope = obj, i = hooked.length; i--; i--) {
				if (hooked[i]) obj[hooked[i-1]] = hooked[i]
				else delete obj[hooked[i-1]]
			}
			// i == -1 from previous loop
			for (; v = hooks[++i]; ) {
				scope = scope[v].apply(scope, hooks[++i]) || scope
			}
			hooks = hooked = null
		}
	}
	exports.Fn.hold = hold

	function True() {
		return true
	}

	function False() {
		return false
	}

}(this, Object)



