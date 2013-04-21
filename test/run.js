

process.chdir( process.argv[1].replace(/[^/]+$/, "") )

require("../functional-lite.js")

function async(fn) {
	var t = this
	t.pending = 0
	t.cb = function() {
		process.nextTick(function(){--t.pending==0&&fn()})
	}
}

async.prototype.wait = function() {
	this.pending++
	return this.cb
}


var found = 0
, failed = []
, out = 
	[ 
	]


var tests = new async(tests_done)

function test_static(cb) {
	for (var i = 0, len = out.length; i < len; ) {
		found++
		if (out[i++] != out[i++]) failed.push(out[i-2] + " != " + out[i-1])
	}
	cb()
}

test_static( tests.wait() )


!function(cb){
	var count1 = 0, count2 = 0
	, add1 = function(){ count1++ }.rate(100)
	, add2 = function(){ count2++ }.rate(100, 1)

	found++
	found++

	function call(cb, i) {
		add1()
		add2()
		setTimeout( i ? function(){call(cb, i-1)} : cb, 40)
	}

	call(function(){
		if (count1 != 2) failed.push("Function.rate(100) = "+count1)
		if (count2 != 3) failed.push("Function.rate(100, 1) = "+count2)
		cb()
	}, 3)


}(tests.wait())

function tests_done() {
	console.log(found + " tests found, " + failed.length + " failed.")
	if (failed.length) throw failed.join("\n")
}



