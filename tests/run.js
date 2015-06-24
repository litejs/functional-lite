

var undef
, Fn = require("../").Fn

require("../timing.js")


function sum(a, b) {
	return a + b
}
var sum5 = sum.partial(5)

var waitSum = 0

function waitAdd(i) {
	waitSum += i
	return this
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
	add1: waitAdd,
	c:1
}

var Fn2 = Fn1.extend({d:1, add2: waitAdd, wait: Fn.hold})
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
, fn2 = fn.origin.cache(true)
, fn3 = fn2.extend({"Fn3": true})



var a,b,c
, found = 0
, arr = [1,2,3,4,2,5]
, res
, temp
, failed = []

require("testman").
describe ( "Object" ).
	it ( "should have clone" ).
		ok("clone" in Object).
	it ( "should not clone Dates" ).
		ok(function(){
			var d1 = new Date()
			d1.setDate(1)
			var d2 = Object.clone(d1)
			return d1 === d2
		}).
	it ( "should have Object.values" ).
		equal(""+Object.values({1:"a",2:"b"}), "a,b").
	it ( "shold wait object resume" ).
		ok(f2.add1 === waitAdd).
		run(function() {
			this.bla = f2.wait()
		}).
		ok(f2.add1 !== waitAdd).
		equal(f2, f2.add1(1)).
		equal(waitSum, 0).
		equal(f2, f2.add2(2)).
		equal(waitSum, 0).
		run(function() {
			this.bla = f2.wait()
		}).
		ok(f2.add1 !== waitAdd).
		equal(f2, f2.add1(1)).
		equal(waitSum, 0).
		equal(f2, f2.add2(2)).
		equal(waitSum, 0).
		run(function() {
			this.bla()
		}).
		ok(f2.add1 !== waitAdd).
		equal(waitSum, 0).
		run(function() {
			this.bla()
		}).
		ok(f2.add1 === waitAdd).
		equal(waitSum, 6).

describe ("Functional").
	it ("should have Object.zip").
		equal(JSON.stringify(Object.zip(["a","b"], [1, 2])), '{"a":1,"b":2}').
	it ("should have Object.clone").
		ok(function() {
			var obj = { hasOwnProperty:"prop", b:2 }
			, clone = Object.clone(obj)

			return obj !== clone && JSON.stringify(obj) == JSON.stringify(clone)
		}).
	it ("should have Object.each").
		ok(function() {
			var obj = { hasOwnProperty:"prop", b:2 }
			, out = ""

			Object.each(obj, function(val, key){
				out += key + val
			})
			return out == "hasOwnPropertypropb2"
		}).
	it ("should eval stings").
		equal(' -> 3'.fn()(), 3).
		equal('-> 3'.fn()(), 3).
		equal(' ->3'.fn()(), 3).
		equal('->3'.fn()(), 3).
		equal('x -> x + 5'.fn()(3), 8).
		equal('x-> x + 5'.fn()(3), 8).
		equal('x ->x + 5'.fn()(3), 8).
		equal('x->x + 5'.fn()(3), 8).
		equal(' x y -> x + 2*y'.fn()(3, 2), 7).
		equal('x y -> x + 2*y'.fn()(3, 2), 7).
		equal('x , y -> x + 2*y'.fn()(3, 2), 7).
		equal('x, y -> x + 2*y'.fn()(3, 2), 7).
		equal('x ,y -> x + 2*y'.fn()(3, 2), 7).
		equal('x,y -> x + 2*y'.fn()(3, 2), 7).
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


		equal(fn(2), 4).
		equal(++run, actual).
		equal(fn(2), 4).
		equal(run, actual).
		equal(fn(3), 9).
		equal(++run, actual).
		equal(fn(3), 9).
		equal(run, actual).
		equal(fn(3,1), 9).
		equal(++run, actual).
		equal(fn(3,1), 9).
		equal(run, actual).

		equal(new fn(), new fn()).
		equal(++run, actual).
		equal(new fn(1, 2), new fn(1, 2)).
		equal(++run, actual).
		equal(fn2(), new fn2()).
		equal(++run, actual).
		equal(new fn2(1, 2), fn2(1, 2)).
		equal(++run, actual).

		ok(function(){
			return sum.fn() === sum
		}).
		equal(fn().Fn3, undef).
		equal(fn2().Fn3, undef).
		equal(fn3().Fn3, true).


	it ("should have Function.rate()").
		run(function(){
			var t = this
			, add1 = function(){ t.count1++ }.rate(250)
			, add2 = function(){ t.count2++ }.rate(250, 1)

			t.count1 = 0
			t.count2 = 0

			function call(cb, i) {
				add1()
				add2()
				setTimeout( i ? function(){call(cb, i-1)} : cb, 100)
			}

			call(t.wait(), 3)
		}).
		ok(Fn("this.count1==2")).
		ok(Fn("this.count2==3")).
	it ("should have Function.once()").
		run(function(){
			var t = this
			, cb = t.wait()
			, add = function(){ t.count3++ }.once(10)
			t.count3 = 0

			add()
			add()

			setTimeout(function(){
				add()
				add()
				cb()
			}, 20)
		}).
		ok(Fn("this.count3==1")).

	it ("should have Function.ttl()").
		run(function(){
			var t = this
			, cb = t.wait()
			, add4 = function(){ t.count4++ }
			, add5 = function(){ t.count5++ }.ttl(10, add4)

			t.count4 = 0
			t.count5 = 0

			add5()

			setTimeout(cb, 20)
		}).
		ok(Fn("this.count4==0")).
		ok(Fn("this.count5==1")).

	it ( "should have partial" ).
		equal(sum5(1), 6).
		equal(sum5(13), 18).

describe ( "Array" ).
	it ( "should have remove" ).
		equal([1,2,3].remove(1), 0).
		equal([1,2,3].remove(2), 1).
		equal([1,2,3].remove(3), 2).
		equal([1,2,3].remove(4), -1).
	it ( "should have uniq" ).
		equal(""+[1,2,3,4,5].uniq(), "1,2,3,4,5").
		equal(""+[1,2,4,3,4,5].uniq(), "1,2,4,3,5").
		equal(""+[1,2,4,3,4,5,4].uniq(), "1,2,4,3,5").
	it ( "should have pushUniq" ).
		equal([1,2,3].pushUniq(1), false).
		equal([1,2,3].pushUniq(5), 4).

done()


