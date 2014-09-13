!function(F) {
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
}(Function.prototype)

