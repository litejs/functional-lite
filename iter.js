
	//** Fn.Iter
	Fn.Iter = Fn.Items = {
		each: function(fn) {
			var t = this
			t.items.forEach(fn, t)
			return t
		},
		map: function(fn) {
			return this.items.map(fn, this)
		},
		pluck: function(name) {
			return this.items.map(function(item){return item.get(name)}, this)
		},
		at: function(index, fn) {
			var t = this
			, item = t.items[index]
			//return fn ? (item && fn.call(t, item), t) : item
			return fn ? (fn.call(t, item ? null:"Item not found", item), t) : item
		},
		first: function(fn) {
			return this.at(0, fn)
		},
		on_empty: function(fn) {
			0 in this.items || fn()
			return this
		}
	}
	//*/
