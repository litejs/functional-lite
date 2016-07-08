


/*
 * @version    0.6.0
 * @date       2016-07-08
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
	, fnRe = /(['\/"])(?:\\?.)*?\1|\b(?:false|in|new|null|this|true|typeof|void)\b|\.\w+|\w+:/g



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

		for (wrapper[P] = Object.create(fn[P]); arg = arguments[i++]; ) {
			Object.assign(wrapper[P], arg)
		}
		wrapper[P].constructor = wrapper
		return wrapper
	}


	// Non-standard
	Object.each = function(obj, fn, scope, key) {
		if (obj) for (key in obj) {
			hasOwn.call(obj, key) && fn.call(scope, obj[key], key, obj)
		}
	}

	Object.values = function(obj) {
		return Object.keys(obj || {}).map(function(e) {
			return obj[e]
		})
	}

	// Non-standard
	// IE<9 bug: [1,2].splice(0).join("") == "" but should be "12"
	A.remove = arrayRemove
	function arrayRemove() {
		var arr = this
		, len = arr.length
		, o = slice(arguments)
		, lastId = -1

		for (; len--; ) if (~o.indexOf(arr[len])) {
			arr.splice(lastId = len, 1)
		}
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
	function Fn(expr /*, scope, mask1, ..maskN */) {
		var args = []
		, arr = expr.match(/[^"']+?->|.+$/g)
		, scope = slice(arguments, 1)
		, key = scope.length + ":" + expr
		, fn = fns[key]

		if (!fn) {
			fn = expr.replace(fnRe, "").match(/\b[a-z_$][\w$]*/ig) || []
			for (; arr.length > 1; ) {
				expr = arr.pop()
				args = arr.pop().match(/\w+/g) || []
				arrayRemove.apply(fn, args)
				if (arr.length) {
					arr.push("function(" + args + "){return(" + expr + ")}" + (scope[0] ? ".bind(this)" : ""))
				}
			}
			expr = "return(" + expr + ")"

			if (scope[1]) {
				arr = Object.keys(scope.slice(1)).map(Fn("a->'__'+a"))
				args.unshift.apply(args, arr)
				expr = "with(" + arr.join(")with(") + "){" + expr + "}"
			}

			if (scope[0]) {
				expr = "with(this){" + expr + "}"
				if (fn[0]) expr = "var " + fn.uniq().join("='',") + "='';" + expr
			}

			fn = fns[key] = Function(args, expr)
		}

		return scope.length ? fn.bind.apply(fn, scope) : fn
	}

	exports.Fn = Fn



	function wait(fn) {
		var pending = 1
		function resume() {
			if (!--pending && fn) fn.call(this)
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

		/**
		 * `wait` is already in hooked array,
		 * so override hooked method
		 * that will be cleared on resume.
		 */
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



