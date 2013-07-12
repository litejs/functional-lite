
	//** Fn.Events
	Fn.Events = {
		on: function(ev, fn, scope) {
			var t = this
			, e = t._e || (t._e = {})
			;(e[ev] || (e[ev] = [])).push([fn, scope])
			return t
		}.byWords(),
		non: function(ev, fn) {
			var t = this
			if (ev) {
				if (t._e && t._e[ev]) {
					if (fn) for (var a = t._e[ev], l = a.length; l--;) if (a[l][0] == fn) a.splice(l, 1)
					else delete t._e[ev]
				}
			} else delete t._e
			return t
		}.byWords(),
		once: function(ev, fn, scope) {
			return this.on(ev, fn, scope).on(ev, this.non.partial(ev, fn))
		},
		emit: function(ev) {
			var t = this
			if (t._e && t._e[ev]) {
				for (var i=0, e=t._e[ev], a=e.slice.call(arguments, 1); ev=e[i++];) ev[0].apply(ev[1]||t, a)
			}
			return t
		}
	}
	//*/
