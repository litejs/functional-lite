function Nop(){}
!function(p){function g(a){if(k[a])return k[a];for(var b="_",d=a,c=a.split("->");1<c.length;)d=c.pop(),b=c.pop().match(/\w+/g)||"",c.length&&c.push("(function("+b+"){return("+d+")})");return k[a]=new Function(b,"return("+d+")")}var k={},f=Array.prototype,e=Function.prototype,m=String.prototype,l=Object,j=e.call.bind(f.slice),n=[];e.construct=function(a){var b=a.length;return b?(n[b]||(n[b]=g("t a->new t(a["+Object.keys(j(a)).join("],a[")+"])")))(this,a):new this};e.partial=function(){var a=this,b=
j(arguments);return function(){return a.apply(this,f.concat.apply(b,arguments))}};e.byWords=function(a){var b=this;a|=0;return function(){var d=this,c=d,h=arguments;(h[a]||"").replace(/[-\w]+/g,function(f){h[a]=f;c=b.apply(d,h)});return c}};e.byKeyVal=function(){var a=this;return function(b){var d,c=j(arguments);if("object"==typeof b)for(d in b)c[0]=d,c[1]=b[d],d=a.apply(this,c);else d=a.apply(this,c);return d}};e.cache=function(a,b,d){var c=this,h=d||{},e=function(){var d=arguments,g=!!a||this instanceof
e,j=b?b(d,c):g+":"+d.length+":"+f.join.call(d);return j in h?h[j]:h[j]=g?c.construct(d):c.apply(this,d)};e.origin=c;e.cached=h;e.extend=function(){return c.extend.apply(c,arguments).cache(a,b,h)};e.prototype=c.prototype;return e};e.extend=function(){var a,b=this,d=0,c=function(){return b.apply(this,arguments)};c.prototype=Object.create(b.prototype);for(c.prototype.constructor=c;a=arguments[d++];)Object.merge(c.prototype,a);return c};e.ttl=function(a,b){var d=this,c=setTimeout(function(){a=0;b&&b()},
a);return function(){clearTimeout(c);a&&d.apply(null,arguments)}};e.once=function(a){var b,d,c=this;return function(){clearTimeout(b);d=arguments;b=setTimeout(function(){c.apply(null,d)},a)}};e.rate=function(a,b){var d,c,e=this,f=0;return function(){var g=+new Date;clearTimeout(d);g>f?(f=g+a,e.apply(null,arguments)):b&&(c=arguments,d=setTimeout(function(){e.apply(null,c)},f-g))}};l.each=function(a,b,d,c){if(a)for(c in a)a.hasOwnProperty(c)&&b.call(d,a[c],c,a)};l.merge=function(a){for(var b,d,c=1;d=
arguments[c++];)for(b in d)d.hasOwnProperty(b)&&(a[b]=d[b]);return a};l.zip=function(a,b){return a.fold(function(a,c,e){a[c]=b[e];return a},{})};f.remove=function(){for(var a=this.length,b=j(arguments);a--;)~b.indexOf(this[a])&&this.splice(a,1);return this};f.each=f.forEach;f.fold=f.reduce;f.foldr=f.reduceRight;f.unique=f.filter.partial(function(a,b,d){return b==d.lastIndexOf(a)});!function(a){e[a]=m[a]=function(){var b=arguments,d=b[0];b[0]=this.fn();return f[a].apply(d,b)}}.byWords()("every filter each map fold foldr some");
p.Fn=g;g.True=function(){return!0};g.False=function(){return!1};g.Init=function(){return this.init&&this.init.apply(this,arguments)||this};g.This=e.fn=function(){return this};m.fn=function(){return g(this)}}(this);
