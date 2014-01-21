
!function(root) {
	var P = "prototype"
	, A = Array[P], D = Date[P], F = Function[P], N = Number[P], S = String[P]
	, O = Object
	, sl = F.call.bind(A.slice)
	, cs = []

	/*

	F.chain = function(a) {
		return "a b->->b.call(this,a.apply(this,arguments))".fold(Array.isArray(a) ? a : sl(arguments), this)
	}

	F.compose = function() {
		var a = [this].concat(sl(arguments)), t = a.pop()
		return t.chain(a)
	}

	F.guard = function(test, or) {
		var self = this
		, f = test.fn()
		, o = (or||Nop).fn()

		return function() {
			return (f.apply(this, arguments) ? self : o).apply(this, arguments)
		}
	}
	*/


	/**
	 * Returns a function identical to this function except that
	 * it prints its arguments on entry and its return value on exit.
	 * This is useful for debugging function-level programs.
	 */

	/** debug.trace
	F.trace = function(n) {
		var self = this
		n = n || self
		return "console" in w ?
			function() {
			console.info('[', n, 'apply(', this!=w && this, ',', arguments, ')')
				var result = self.apply(this, arguments)
				console.info(']', n, ' -> ', result)
				return result
		} :
		self
	}
	//*/


	

