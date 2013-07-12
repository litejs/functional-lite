
	//** Fn.Lazy
	Fn.Lazy = {
		wait: function(ignore) {
			var k
			, t = this
			, hooks = []
			, hooked = []
			ignore = ignore || []

			for (k in t) if (typeof t[k] == "function" && ignore.indexOf(k) == -1) !function(k) {
				hooked.push(k)
				t[k] = function(){hooks.push([k, arguments]);return t}
			}(k)

			t.resume = function() {
				delete t.resume
				var v
				, i = hooked.length

				while (i--) delete t[hooked[i]]
				// i == -1 from previous loop
				while (v=hooks[++i]) t[v[0]].apply(t, v[1])
				t = hooks = hooked = null
			}
			return t
		}
	}
	//*/
