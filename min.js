function Nop(){}function True(){return!0}function False(){return!1}function This(){return this}function Init(){return this.init&&this.init.apply(this,arguments)||this}
!function(q){function k(a){if(k[a])return k[a];for(var d="_",c=a,b=a.split("->");1<b.length;)c=b.pop(),d=b.pop().match(/\w+/g)||"",b.length&&b.push("(function("+d+"){return("+c+")})");return k[a]=new Function(d,"return("+c+")")}var g=Array.prototype,f=Function.prototype,n=String.prototype,l=Object,m=f.call.bind(g.slice),p=[];f.construct=function(a){var d=a.length;return d?(p[d]||(p[d]=k("t a->new t(a["+Object.keys(m(a)).join("],a[")+"])")))(this,a):new this};f.partial=function(){var a=this,d=m(arguments);
return function(){return a.apply(this,d.concat.apply(d,arguments))}};f.byWords=function(a){var d=this;a|=0;return function(){var c=this,b=c,e=arguments;(e[a]||"").replace(/[-\w]+/g,function(h){e[a]=h;b=d.apply(c,e)});return b}};f.byKeyVal=function(){var a=this;return function(d){var c,b=m(arguments);if("object"==typeof d)for(c in d)b[0]=c,b[1]=d[c],c=a.apply(this,b);else c=a.apply(this,b);return c}};f.cache=function(a,d,c){var b=this,e=c||{},h=function(){var c=arguments,f=!!a||this instanceof h,k=
d?d(c,b):f+":"+c.length+":"+g.join.call(c);return k in e?e[k]:e[k]=f?b.construct(c):b.apply(this,c)};h.origin=b;h.cached=e;h.extend=function(){return b.extend.apply(b,arguments).cache(a,d,c)};h.prototype=b.prototype;return h};f.extend=function(){var a,d=this,c=0,b=function(){return d.apply(this,arguments)};b.prototype=Object.create(d.prototype);for(b.prototype.constructor=b;a=arguments[c++];)Object.merge(b.prototype,a);return b};f.ttl=function(a,d){var c=this,b=setTimeout(function(){a=0;d&&d()},a);
return function(){clearTimeout(b);a&&c.apply(null,arguments)}};f.once=function(a){var d,c,b=this;return function(){clearTimeout(d);c=arguments;d=setTimeout(function(){b.apply(null,c)},a)}};f.rate=function(a,d){var c,b,e=this,h=0;return function(){var f=+new Date;clearTimeout(c);f>h?(h=f+a,e.apply(null,arguments)):d&&(b=arguments,c=setTimeout(function(){e.apply(null,b)},h-f))}};l.each=function(a,d,c,b){if(a)for(b in a)a.hasOwnProperty(b)&&d.call(c,a[b],b,a)};l.merge=function(a,d){for(var c,b,e=1;b=
arguments[e++];)for(c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return a};l.deepMerge=function(a,d,c,b,e,f){c=c||"";b=b||[];for(e in d)d.hasOwnProperty(e)&&a[e]!==d[e]&&(f=d[e],b.push(c+e),null===f?delete a[e]:"object"==typeof f&&a[e]&&"object"==typeof a[e]?l.deepMerge(a[e],f,c+e+".",b):a[e]=f);return b};l.zip=function(a,d){return a.fold(function(a,b,e){a[b]=d[e];return a},{})};g.remove=function(){for(var a=this.length,d=m(arguments),c=-1;a--;)~d.indexOf(this[a])&&this.splice(c=a,1);return c};g.each=
g.forEach;g.fold=g.reduce;g.foldr=g.reduceRight;g.unique=g.filter.partial(function(a,d,c){return d==c.lastIndexOf(a)});!function(a){f[a]=n[a]=function(){var d=arguments,c=d[0];d[0]=this.fn();return g[a].apply(c,d)}}.byWords()("every filter each map fold foldr some");f.fn=This;n.fn=function(){return k(this)};q.Fn=k}(this);