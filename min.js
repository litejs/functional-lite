!function(r){function n(a){var b="_",c=a;for(a=a.split("->");1<a.length;)c=a.pop(),b=a.pop().match(/\w+/g)||"",a.length&&a.push("(function("+b+"){return("+c+")})");return new Function(b,"return("+c+")")}var h=Array.prototype,k=Function.prototype,p=String.prototype,f=Object,m=f.prototype.hasOwnProperty,l=k.call.bind(h.slice),q=[];k.construct=function(a){var b=a.length;return b?(q[b]||(q[b]=n("t a->new t(a["+f.keys(l(a)).join("],a[")+"])")))(this,a):new this};k.partial=function(){var a=this,b=l(arguments);
return function(){return a.apply(this,b.concat.apply(b,arguments))}};k.byWords=function(a,b){var c=this;return function(){var d=this,e=d,g=arguments;(g[a|=0]||"").replace(b||/\S+/g,function(b){g[a]=b;e=c.apply(d,g)});return e}};k.byKeyVal=function(){var a=this;return function(b){var c,d=l(arguments);if("object"==typeof b)for(c in b)d[0]=c,d[1]=b[c],c=a.apply(this,d);else c=a.apply(this,d);return c}};k.cache=function(a,b,c){var d=this,e=c||{},g=function(){var c=arguments,f=!!a||this instanceof g,h=
b?b.apply(d,c):f+":"+c.length+":"+l(c);return h in e?e[h]:e[h]=f?d.construct(c):d.apply(this,c)};g.origin=d;g.cached=e;g.extend=function(){return d.extend.apply(d,arguments).cache(a,b,c)};g.prototype=d.prototype;return g};k.extend=function(){function a(){return c.apply(this,arguments)}var b,c=this,d=0;for(a.prototype=f.create(c.prototype);b=arguments[d++];)f.merge(a.prototype,b);return a.prototype.constructor=a};k.ttl=function(a,b){var c=this,d=setTimeout(function(){a=0;b&&b()},a);return function(){clearTimeout(d);
a&&c.apply(null,arguments)}};k.once=function(a){var b,c,d=this;return function(){clearTimeout(b);c=arguments;b=setTimeout(function(){d.apply(null,c)},a)}};k.rate=function(a,b){var c,d,e=this,g=0;return function(){var f=+new Date;clearTimeout(c);f>g?(g=f+a,e.apply(null,arguments)):b&&(d=arguments,c=setTimeout(function(){e.apply(null,d)},g-f))}};f.each=function(a,b,c,d){if(a)for(d in a)m.call(a,d)&&b.call(c,a[d],d,a)};f.merge=function(a,b){for(var c,d=1;b=arguments[d++];)for(c in b)m.call(b,c)&&(a[c]=
b[c]);return a};f.clone=function(a,b,c){if(a&&a.constructor===f){b={};for(c in a)m.call(a,c)&&(b[c]=f.clone(a[c]));a=b}return a};f.deepMerge=f.deepCopy=function(a,b,c,d,e,g){c=c||"";d=d||[];for(e in b)if(m.call(b,e)&&a[e]!==b[e])if(g=b[e],d.push(c+e),null===g)delete a[e];else if(g&&g.constructor===f){var h=a[e];h&&h.constructor===f||(a[e]={});f.deepMerge(a[e],g,c+e+".",d)}else a[e]=g;return d};f.zip=function(a,b){return a.fold(function(a,d,e){a[d]=b[e];return a},{})};h.remove=function(){for(var a=
this.length,b=l(arguments),c=-1;a--;)~b.indexOf(this[a])&&this.splice(c=a,1);return c};h.each=h.forEach;h.fold=h.reduce;h.foldr=h.reduceRight;h.uniq=h.filter.partial(function(a,b,c){return b==c.lastIndexOf(a)});h.pushUniq=function(a){return-1==this.indexOf(a)?this.push(a):!1};!function(a){k[a]=p[a]=function(){var b=arguments,c=b[0];b[0]=this.fn();return h[a].apply(c,b)}}.byWords()("every filter each map fold foldr some");k.fn=function(){return this};p.fn=function(){return n(this)};r.Fn=n.cache()}(this);