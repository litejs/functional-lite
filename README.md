[GitHub repo]: https://github.com/litejs/functional-lite
[npm module]: https://npmjs.org/package/functional-lite

[Build]:    https://img.shields.io/travis/litejs/functional-lite.png
[Coverage]: https://img.shields.io/coveralls/litejs/functional-lite.png
[Gittip]:   https://img.shields.io/gittip/lauriro.png

[1]: https://travis-ci.org/litejs/functional-lite
[2]: https://coveralls.io/r/litejs/functional-lite



    @version    0.3.4
    @date       2015-05-19
    @stability  2 - Unstable



Functional &ndash; [![Build][]][1] [![Coverage][]][2]
==========

Experimental Functional stuff.



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

### Browser Support

It should work IE6 and up but automated testing is currently broken.


External links
--------------

-   [GitHub repo][]
-   [npm module][]


### Licence

Copyright (c) 2013-2014 Lauri Rooden &lt;lauri@rooden.ee&gt;  
[The MIT License](http://lauri.rooden.ee/mit-license.txt)


