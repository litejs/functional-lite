/*! litejs.com/MIT-LICENSE.txt */
!function(t,f){function n(a,b,c){if(a&&a.constructor===f){b={};for(c in a)k.call(a,c)&&(b[c]=n(a[c]));a=b}return a}function p(){for(var a=this.length,b=l(arguments),c=-1;a--;)~b.indexOf(this[a])&&this.splice(c=a,1);return c}function m(a,b){for(var c=["_"],d=a,h=a.split("->");1<h.length;)d=h.pop(),c=h.pop().match(/\w+/g)||[],h.length&&h.push("(function("+c+"){return("+d+")})");return new Function(c,(b&&(a=a.replace(u,"").match(/\b[a-z]\w*|\b_\w+/g))?(p.apply(a,c),a[0]?"var "+a.uniq().join("='',")+
"='';":"")+"with("+b+"||{})":"")+"return("+d+")")}function v(){return!0}function w(){return!1}var e=Array.prototype,g=Function.prototype,q=String.prototype,k=f.prototype.hasOwnProperty,l=g.call.bind(e.slice),r={},u=/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|this|arguments|window|\.\w+|\w+:/g;g.construct=function(a,b){return(b=a.length)?(r[b]||(r[b]=m("t a->new t(a["+f.keys(a).join("],a[")+"])")))(this,a):new this};g.partial=function(){var a=this,b=l(arguments);return function(){return a.apply(this,b.concat.apply(b,
arguments))}};g.byWords=function(a,b){var c=this;return function(){var d=this,h=d,e=arguments;(e[a|=0]||"").replace(b||/\S+/g,function(b){e[a]=b;h=c.apply(d,e)});return h}};g.byKeyVal=function(){var a=this;return function(b){var c,d=l(arguments);if("object"==typeof b)for(c in b)d[0]=c,d[1]=b[c],c=a.apply(this,d);else c=a.apply(this,d);return c}};g.cache=function(a,b,c){var d=this,e=c||{},f=function(){var c=arguments,g=!!a||this instanceof f,k=b?b.apply(d,c):g+":"+c.length+":"+l(c);return k in e?e[k]:
e[k]=g?d.construct(c):d.apply(this,c)};f.origin=d;f.cached=e;f.extend=function(){return d.extend.apply(d,arguments).cache(a,b,c)};f.prototype=d.prototype;return f};g.extend=function(){function a(){return c.apply(this,arguments)}var b,c=this,d=0;for(a.prototype=f.create(c.prototype);b=arguments[d++];)f.merge(a.prototype,b);return a.prototype.constructor=a};f.each=function(a,b,c,d){if(a)for(d in a)k.call(a,d)&&b.call(c,a[d],d,a)};f.merge=function(a,b){for(var c,d=1;b=arguments[d++];)for(c in b)k.call(b,
c)&&(a[c]=b[c]);return a};f.clone=n;f.zip=function(a,b){return a.fold(function(a,d,e){a[d]=b[e];return a},{})};e.remove=p;e.each=e.forEach;e.fold=e.reduce;e.foldr=e.reduceRight;e.uniq=e.filter.partial(function(a,b,c){return b==c.indexOf(a)});e.pushUniq=function(a){return-1==this.indexOf(a)?this.push(a):!1};!function(a){g[a]=q[a]=function(){var b=arguments,c=b[0];b[0]=this.fn();return e[a].apply(c,b)}}.byWords()("every filter each map fold foldr some");g.fn=function(){return this};q.fn=function(a){return m(this,
a)};Boolean.prototype.fn=function(){return this.valueOf()?v:w};t.Fn=m.cache()}(this,Object);
