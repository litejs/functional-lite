
[1]: https://raw.github.com/litejs/fn-lite/master/min.js
[2]: https://raw.github.com/litejs/fn-lite/master/fn-lite.js


Functional
==========

Experimental Functional stuff.
Download [compressed][1] 
(2781 bytes, 1196 bytes gzipped)
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

### Licence

Copyright (c) 2012 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


