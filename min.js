!function(r){function j(a){if(n[a])return n[a];for(var b="_",d=a,c=a.split("->");1<c.length;)d=c.pop(),b=c.pop().match(/\w+/g)||"",c.length&&c.push("(function("+b+"){return("+d+")})");return n[a]=new Function(b,"return("+d+")")}var n={},h=Array.prototype,g=Function.prototype,l=Number.prototype,k=String.prototype,p=Object,m=g.call.bind(h.slice),q=[];g.construct=function(a){var b=a.length;return b?(q[b]||(q[b]=j("t a->new t(a["+Object.keys(m(a)).join("],a[")+"])")))(this,a):new this};g.partial=function(){var a=
this,b=m(arguments);return function(){return a.apply(this,h.concat.apply(b,arguments))}};g.byWords=function(a){var b=this;a|=0;return function(){var d=this,c=d,e=arguments;(e[a]||"").replace(/[-\w]+/g,function(f){e[a]=f;c=b.apply(d,e)});return c}};g.byKeyVal=function(){var a=this;return function(b){var d,c=m(arguments);if("object"==typeof b)for(d in b)c[0]=d,c[1]=b[d],d=a.apply(this,c);else d=a.apply(this,c);return d}};g.cache=function(a,b,d){var c=this,e=d||{},f=function(){var d=arguments,g=!!a||
this instanceof f,j=b?b(d,c):g+":"+d.length+":"+h.join.call(d);return j in e?e[j]:e[j]=g?c.construct(d):c.apply(this,d)};f.origin=c;f.cached=e;f.extend=function(){return c.extend.apply(c,arguments).cache(a,b,e)};f.prototype=c.prototype;return f};g.extend=function(){var a,b=this,d=0,c=function(){return b.apply(this,arguments)};c.prototype=Object.create(b.prototype);for(c.prototype.constructor=c;a=arguments[d++];)Object.merge(c.prototype,a);return c};g.ttl=function(a,b){var d=this,c=setTimeout(function(){a=
0;b&&b()},a);return function(){clearTimeout(c);a&&d.apply(null,arguments)}};g.once=function(a){var b,d,c=this;return function(){clearTimeout(b);d=arguments;b=setTimeout(function(){c.apply(null,d)},a)}};g.rate=function(a,b){var d,c,e=this,f=0;return function(){var g=+new Date;clearTimeout(d);g>f?(f=g+a,e.apply(null,arguments)):b&&(c=arguments,d=setTimeout(function(){e.apply(null,c)},f-g))}};p.each=function(a,b,d,c){if(a)for(c in a)a.hasOwnProperty(c)&&b.call(d,a[c],c,a)};p.merge=function(a){for(var b,
d,c=1;d=arguments[c++];)for(b in d)d.hasOwnProperty(b)&&(a[b]=d[b]);return a};p.zip=function(a,b){return a.fold(function(a,c,e){a[c]=b[e];return a},{})};h.remove=function(){for(var a=this.length,b=m(arguments);a--;)~b.indexOf(this[a])&&this.splice(a,1);return this};h.each=h.forEach;h.fold=h.reduce;h.foldr=h.reduceRight;h.unique=h.filter.partial(function(a,b,d){return b==d.lastIndexOf(a)});!function(a){g[a]=k[a]=function(){var b=arguments,d=b[0];b[0]=this.fn();return h[a].apply(d,b)}}.byWords()("every filter each map fold foldr some");
r.Fn=j;j.Nop=function(){};j.This=g.fn=function(){return this};j.True=function(){return!0};j.False=function(){return!1};j.Init=function(){return this.init&&this.init.apply(this,arguments)||this};k.fn=function(){return j(this)};k.format=function(a){var b="object"==typeof a?a:arguments;return this.replace(/\{(\w+)\}/g,function(a,c){return b[c]})};k.safe=function(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;")};k.toAccuracy=l.toAccuracy=function(a){var b=
(""+a).split(".");a*=~~(this/a+0.5);return""+(1 in b?a.toFixed(b[1].length):a)};l.words=k.words=function(a,b,d,c){var e=+this,f=0;for(d=d||{"default":"{0} {1}{2}"};e>a[f];)e/=a[f++];if(f==a.length&&c)return c(this);f=b[f];e=e+0.5|0;return(d[2>e?f:f+"s"]||d["default"]).format(e,f,2>e?"":"s")};k.humanSize=l.humanSize=l.words.partial([1024,1024,1024],["byte","KB","MB","GB"]);k.humanTime=l.humanTime=l.words.partial([60,60,24,7,30],"second minute hour day week month".split(" "))}(this);
