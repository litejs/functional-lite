/*! litejs.com/MIT-LICENSE.txt */
!function(t,h){function u(a,c,b){if(a&&a.constructor===h){c={};for(b in a)n.call(a,b)&&(c[b]=u(a[b]));a=c}return a}function v(){for(var a=this.length,c=p(arguments),b=-1;a--;)~c.indexOf(this[a])&&this.splice(b=a,1);return b}function q(a){var c=[],b=a.match(/[^"']+?->|.+$/g),d=p(arguments,1),f=d.length+":"+a,e=r[f];if(!e){for(e=a.replace(x,"").match(/\b[a-z_$][\w$]*/ig)||[];1<b.length;)a=b.pop(),c=b.pop().match(/\w+/g)||[],v.apply(e,c),b.length&&b.push("function("+c+"){return("+a+")}"+(d[0]?".bind(this)":
""));a="return("+a+")";d[1]&&(b=h.keys(d.slice(1)).map(q("a->'\ua66c'+a")),c.unshift.apply(c,b),a="with("+b.join(")with(")+"){"+a+"}");d[0]&&(a="with(this){"+a+"}",e[0]&&(a="var "+e.uniq().join("='',")+"='';"+a));e=r[f]=Function(c,a)}return d.length?e.bind.apply(e,d):e}function w(a){function c(){!--b&&a&&a.call(this)}var b=1;c.wait=function(){b++;return c};return c}function y(){return!0}function z(){return!1}var g=Array.prototype,k=Function.prototype,A=String.prototype,n=h.prototype.hasOwnProperty,
p=k.call.bind(g.slice),r={},x=/(['\/"])(?:\\?.)*?\1|\b(?:false|in|new|null|this|true|void)\b|\.\w+|\w+:/g;k.partial=function(){var a=this,c=p(arguments);return function(){return a.apply(this,c.concat.apply(c,arguments))}};k.cache=function(a,c,b){function d(){var b=arguments,l=!!a||this instanceof d,m=c?c.apply(f,b):l+":"+b.length+":"+p(b);if(m in e)m=e[m];else{var g=e;if(l)var l=f,k=void 0,l=(k=b.length)?(r[k]||(r[k]=q("t a->new t(a["+h.keys(b).join("],a[")+"])")))(l,b):new l;else l=f.apply(this,
b);m=g[m]=l}return m}var f=d.origin=this,e=d.cached=b||{};d.extend=function(){return f.extend.apply(f,arguments).cache(a,c,b)};d.prototype=f.prototype;return d};k.extend=function(){function a(){return b.apply(this,arguments)}var c,b=this,d=0;for(a.prototype=h.create(b.prototype);c=arguments[d++];)h.merge(a.prototype,c);return a.prototype.constructor=a};h.each=function(a,c,b,d){if(a)for(d in a)n.call(a,d)&&c.call(b,a[d],d,a)};h.merge=function(a,c){for(var b,d=1;c=arguments[d++];)for(b in c)n.call(c,
b)&&(a[b]=c[b]);return a};h.values=function(a){return h.keys(a||{}).map(function(c){return a[c]})};h.clone=u;g.remove=v;g.each=g.forEach;g.fold=g.reduce;g.foldr=g.reduceRight;g.uniq=g.filter.partial(function(a,c,b){return c==b.indexOf(a)});g.pushUniq=function(a){return-1==this.indexOf(a)?this.push(a):!1};k.fn=function(){return this};A.fn=function(a){return q(this,a)};Boolean.prototype.fn=function(){return this.valueOf()?y:z};t.Fn=q;t.Fn.wait=w;t.Fn.hold=function(a){var c,b=this,d=[],f=[],e=w(function(){for(var a,
c=b,e=f.length;e--;e--)f[e]?b[f[e-1]]=f[e]:delete b[f[e-1]];for(;a=d[++e];)c=c[a].apply(c,d[++e])||c;d=f=null});a=a||b.syncMethods||[];for(c in b)"function"==typeof b[c]&&-1==a.indexOf(c)&&!function(a){f.push(a,n.call(b,a)&&b[a]);b[a]=function(){d.push(a,arguments);return b}}(c);b.wait=e.wait;return e}}(this,Object);
