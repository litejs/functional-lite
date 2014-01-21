


require("../")

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

function sum(a, b) {
	return a + b
}
var sum5 = sum.partial(5)



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





var a,b,c
, found = 0
, arr = [1,2,3,4,2,5]
, res
, temp
, failed = []

require("testman").
describe ("Functional").
	it ("should have Object.zip").
		equal(JSON.stringify(Object.zip(["a","b"], [1, 2])), '{"a":1,"b":2}').
	it ("should have Object.deepMerge").
		run(function(){
			a = {a:"A"}
			b = {b:"B"}
			c = Object.deepMerge(a, b)
		}).
		equal(JSON.stringify(a), '{"a":"A","b":"B"}').
		equal(JSON.stringify(b), '{"b":"B"}').
		equal(JSON.stringify(c), '["b"]').
	it ("should eval stings").
		equal('->1'.fn()(), 1).
		equal('x -> x + 1'.fn()(1), 2).
		equal('x y -> x + 2*y'.fn()(1, 2), 5).
		equal('x, y -> x + 2*y'.fn()(1, 2), 5).
		equal('_ + 1'.fn()(1), 2).
		equal('x -> y -> x + 2*y'.fn()(1)(2), 5).
		equal('x -> y -> z -> x + 2*y+3*z'.fn()(1)(2)(3), 14).

		equal('1+_'.map([1,2,3]).join(), [2, 3, 4].join()).
		equal('x y -> 2*x+y'.fold([1,0,1,0], 0), 10).
		equal('_%2'.filter([1,2,3,4]).join(), [1, 3].join()).

		equal('_>2'.some([1,2,3]), true).
		equal('_>10'.some([1,2,3]), false).
	it ("should pass function scope tests").


		equal((temp = [1,2,3,2,1], temp.remove(2), temp.join()), "1,3,1").
		equal((temp = ['1',2,3,2,1], temp.remove(2,1), temp.join()), "1,3").

		equal("a" in f1, true).
		equal("b" in f1, true).
		equal("c" in f1, true).
		equal("d" in f1, false).
		equal("e" in f1, false).
		equal("f" in f1, false).

		equal("a" in f2, true).
		equal("b" in f2, true).
		equal("c" in f2, true).
		equal("d" in f2, true).
		equal("e" in f2, false).
		equal("f" in f2, false).

		equal("a" in f3, true).
		equal("b" in f3, false).
		equal("c" in f3, true).
		equal("d" in f3, true).
		equal("e" in f3, true).
		equal("f" in f3, false).

		equal("a" in f4, true).
		equal("b" in f4, true).
		equal("c" in f4, true).
		equal("d" in f4, true).
		equal("e" in f4, true).
		equal("f" in f4, true).

		equal(f1 instanceof Fn1, true).
		equal(f1 instanceof Fn2, false).
		equal(f1 instanceof Fn3, false).
		equal(f1 instanceof Fn4, false).
		equal(f2 instanceof Fn1, true).
		equal(f2 instanceof Fn2, true).
		equal(f2 instanceof Fn3, false).
		equal(f2 instanceof Fn4, false).
		equal(f3 instanceof Fn1, true).
		equal(f3 instanceof Fn2, true).
		equal(f3 instanceof Fn3, true).
		equal(f3 instanceof Fn4, false).
		equal(f4 instanceof Fn1, true).
		equal(f4 instanceof Fn2, true).
		equal(f4 instanceof Fn3, true).
		equal(f4 instanceof Fn4, true).


		equal(fn(2), 4, ++run, actual).
		equal(fn(2), 4, run, actual).
		equal(fn(3), 9, ++run, actual).
		equal(fn(3), 9, run, actual).
		equal(fn(3,1), 9, ++run, actual).
		equal(fn(3,1), 9, run, actual).

		equal(new fn(), new fn(), ++run, actual).
		equal(new fn(1, 2), new fn(1, 2), ++run, actual).
		equal(fn2(), new fn2(), ++run, actual).
		equal(new fn2(1, 2), fn2(1, 2), ++run, actual).


	it ("should pass async tests").
		run(function(){
			var cb = this.wait()
			, count1 = 0, count2 = 0
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
		}).
	it ( "should have partial" ).
		equal(sum5(1), 6).
		equal(sum5(13), 18).
done()


