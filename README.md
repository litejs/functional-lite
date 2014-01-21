
[1]: https://raw.github.com/litejs/fn-lite/master/min.js
[2]: https://raw.github.com/litejs/fn-lite/master/index.js
[npm-package]: https://npmjs.org/package/functional-lite



    @version    0.1.2
    @date       2014-01-21
    @stability  2 - Unstable



Functional
==========

Experimental Functional stuff.
Download [compressed][1] 
or [uncompressed][2] source.


[![Build Status](https://travis-ci.org/litejs/functional-lite.png?branch=master)](https://travis-ci.org/litejs/functional-lite)


Examples
--------

Extends String and Function with "every filter each map fold foldr some"

```javascript
// _ is default first argument name when no arguments defined

"_ + 1".map([1, 2, 3])
// is equal to
"_ -> _ + 1".map([1, 2, 3])
// is equal to
[1, 2, 3].map(Fn("_ + 1"))
// [2, 3, 4]
```


External links
--------------

-   [npm-package][]
-   [rfc-6570][]


### Licence

Copyright (c) 2012 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


