

!function(S){
	//** IP helpers
	S.ip2int = function() {
		var t = (this+".0.0.0").split(".")
		return ((t[0] << 24) | (t[1] << 16) | (t[2] << 8 ) | (t[3]))>>>0
	}

	S.int2ip = N.int2ip = function() {
		var t = +this
		return [t>>>24, (t>>>16)&0xFF, (t>>>8)&0xFF, t&0xFF].join(".")
	}
	//*/
}(String.prototype)

