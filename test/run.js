

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





function Fn1(){
	var t = this;
	t.a = 1;
	"init" in t && t.init.apply(t,arguments);
	return t;
}
Fn1.prototype = {
	init: function(){
		this.b = 1;
	},
	c:1
}

var Fn2 = Fn1.extend({d:1})
, Fn3 = Fn2.extend({init:function(){},e:1})
, Fn4 = Fn3.extend({init:function(){Fn2.prototype.init.call(this);},f:1})
, f1 = new Fn1()
, f2 = new Fn2()
, f3 = new Fn3()
, f4 = new Fn4()
, run = 0
, actual = 0
, fn = function(i) {
	actual++;
	return i*i;
}.cache()
, fn2 = fn.origin.cache(true);





var found = 0
, arr = [1,2,3,4,2,5]
, res
, failed = []
, out = 
	[ JSON.stringify(Object.zip(["a","b"], [1, 2])),
	  '{"a":1,"b":2}',
		'->1'.fn()(), 1,
		'x -> x + 1'.fn()(1), 2,
		'x y -> x + 2*y'.fn()(1, 2), 5,
		'x, y -> x + 2*y'.fn()(1, 2), 5,
		'_ + 1'.fn()(1), 2,
		'x -> y -> x + 2*y'.fn()(1)(2), 5,
		'x -> y -> z -> x + 2*y+3*z'.fn()(1)(2)(3), 14,

		'1+_'.map([1,2,3]).join(), [2, 3, 4].join(),
		'x y -> 2*x+y'.fold([1,0,1,0], 0), 10,
		'_%2'.filter([1,2,3,4]).join(), [1, 3].join(),

		'_>2'.some([1,2,3]), true,
		'_>10'.some([1,2,3]), false,


		[1,2,3,2,1].remove(2).join(), "1,3,1",
		['1',2,3,2,1].remove(2,1).join(), "1,3",

		"a" in f1, true,
		"b" in f1, true,
		"c" in f1, true,
		"d" in f1, false,
		"e" in f1, false,
		"f" in f1, false,

		"a" in f2, true,
		"b" in f2, true,
		"c" in f2, true,
		"d" in f2, true,
		"e" in f2, false,
		"f" in f2, false,

		"a" in f3, true,
		"b" in f3, false,
		"c" in f3, true,
		"d" in f3, true,
		"e" in f3, true,
		"f" in f3, false,

		"a" in f4, true,
		"b" in f4, true,
		"c" in f4, true,
		"d" in f4, true,
		"e" in f4, true,
		"f" in f4, true,

		f1 instanceof Fn1, true,
		f1 instanceof Fn2, false,
		f1 instanceof Fn3, false,
		f1 instanceof Fn4, false,
		f2 instanceof Fn1, true,
		f2 instanceof Fn2, true,
		f2 instanceof Fn3, false,
		f2 instanceof Fn4, false,
		f3 instanceof Fn1, true,
		f3 instanceof Fn2, true,
		f3 instanceof Fn3, true,
		f3 instanceof Fn4, false,
		f4 instanceof Fn1, true,
		f4 instanceof Fn2, true,
		f4 instanceof Fn3, true,
		f4 instanceof Fn4, true,


		fn(2), 4, ++run, actual,
		fn(2), 4, run, actual,
		fn(3), 9, ++run, actual,
		fn(3), 9, run, actual,
		fn(3,1), 9, ++run, actual,
		fn(3,1), 9, run, actual,

		new fn(), new fn(), ++run, actual,
		new fn(1, 2), new fn(1, 2), ++run, actual,
		fn2(), new fn2(), ++run, actual,
		new fn2(1, 2), fn2(1, 2), ++run, actual,


		"", "" ]


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



