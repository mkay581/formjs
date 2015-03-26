/** 
* formjs - v1.0.0.
* https://github.com/mkay581/formjs.git
* Copyright 2015 Mark Kennedy. Licensed MIT.
*/

!function t(n,e,r){function i(o,s){if(!e[o]){if(!n[o]){var a="function"==typeof require&&require;if(!s&&a)return a(o,!0);if(u)return u(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var l=e[o]={exports:{}};n[o][0].call(l.exports,function(t){var e=n[o][1][t];return i(e?e:t)},l,l.exports,t,n,e,r)}return e[o].exports}for(var u="function"==typeof require&&require,o=0;o<r.length;o++)i(r[o]);return i}({1:[function(t,n){"use strict";var e,r=t("./element"),i=t("./image-element"),u=0,o={};n.exports=function(){var t=function(t){this.initialize(t)};return t.prototype={initialize:function(){var t=this;e||document.body.kit||(e=Object.defineProperty(window.Element.prototype,"kit",{get:function(){return t.setup(this)}}))},setup:function(t){var n;return o[t._kitId]||(n=t instanceof window.HTMLImageElement?i:r,u++,t._kitId=u,o[t._kitId]=new n(t)),o[t._kitId]},destroy:function(){}},new t}()},{"./element":2,"./image-element":3}],2:[function(t,n){"use strict";var e=t("./utils"),r=(t("./element-kit"),function(t){this.initialize(t)});r.prototype={initialize:function(t){this.el=t,this.classList=this._getClassList(),this._eventListenerMap=this._eventListenerMap||[],Object.defineProperty(this,"dataset",{get:function(){return this.getData()}.bind(this)})},_traverseEachParent:function(t,n){for(var e,r=n||this.el;r&&"string"==typeof r.className&&(e=t(r),void 0===e||e);)r=r.parentNode},appendOuterHtml:function(t){var n=this.el.parentNode,r=e.createHtmlElement(t);return n?n.replaceChild(r,this.el):(n=document.createDocumentFragment(),n.appendChild(r)),r.appendChild(this.el),r},getUniqueId:function(){return this.el._kitId},getClosestAncestorElementByClassName:function(t){var n;return this._traverseEachParent(function(e){return e.kit._hasClass(t)?(n=e,!1):void 0},this.el.parentNode),n},addEventListener:function(t,n,e,r){var i=n;r=r||{},"function"!=typeof i&&(i=this._createEventListener(e[n],e)),this.el.addEventListener(t,i,r.useCapture),this._eventListenerMap.push({event:t,listener:i,listenerId:n,context:e})},_createEventListener:function(t,n){return function(){n=n||this,t.apply(n,arguments)}},removeEventListener:function(t,n,e){var r,i,u=this._eventListenerMap||[];if(u.length)for(r=0;r<u.length;r++)if(i=u[r],i&&i.event===t&&i.listenerId===n&&i.context===e){this.el.removeEventListener(t,i.listener),this._eventListenerMap[r]=null;break}},waitForTransition:function(t){var n=this.getTransitionDuration();t&&(n>0?setTimeout(t.bind(this,this.el),n):t(this.el))},getTransitionDuration:function(){var t,n=this.getCssComputedProperty("transition-delay")||"0ms",e=this.getCssComputedProperty("transition-duration")||"0ms",r=Array.isArray(e)?e:[e],i=Array.isArray(n)?n:[n],u=0;return r.push.apply(r,i),r.forEach(function(n){n.split(",").forEach(function(n){n=this._convertCssTimeValueToMilliseconds(n),t=this._getCssPropUnitMap(n),t.num>u&&(u=t.num)}.bind(this))}.bind(this)),u},getCssComputedProperty:function(t){var n=window.getComputedStyle(this.el);return n.getPropertyValue(t)||this.el.style[this._getJsPropName(t)]},_getCssPropUnitMap:function(t){t.trim();var n=t.match("[0-9.]+"),e="ms";return n=n?n[0]:"",n&&(e=t.split(n)[1],n=Number(n)),{num:n,unit:e}},_convertCssTimeValueToMilliseconds:function(t){var n=this._getCssPropUnitMap(t).num,e=t.replace(n,"");return t="s"===e?1e3*n:n,t+"ms"},_getClassList:function(){return{add:this._addClass.bind(this),remove:this._removeClass.bind(this),contains:this._hasClass.bind(this),toggle:this._toggleClass.bind(this)}},_getCssClasses:function(){return this.el.className.split(" ")},_toggleClass:function(t){this._hasClass(t)?this._removeClass(t):this._addClass(t)},_addClass:function(){"classList"in document.createElement("_")?this._each(arguments,function(t){this.el.classList.add(t)}.bind(this)):this._each(arguments,function(t){this._hasClass(t)||(this.el.className=this.el.className?this.el.className+" "+t:t)}.bind(this))},_each:function(t,n){var e,r=t.length;for(e=0;r>e;e++)n(t[e])},_removeClass:function(){var t;"classList"in document.createElement("_")?this._each(arguments,function(t){this.el.classList.remove(t)}.bind(this)):this._each(arguments,function(n){this.el.className===n?this.el.className="":(t="[\\s]*"+n,t=new RegExp(t,"i"),this.el.className=this.el.className.replace(t,""))}.bind(this))},_hasClass:function(t){var n=this._getCssClasses();return-1!==n.indexOf(t)},_getJsPropName:function(t){return t=t.replace(/-([a-z])/g,function(t){return t[1].toUpperCase()})},getAttributes:function(){var t=this.el.attributes,n={};if(t.length)for(var e=0;e<t.length;e++)n[t[e].name]=t[e].value;return n},_getDomData:function(){var t,n,e=this.getAttributes(),r={};for(t in e)e.hasOwnProperty(t)&&(n=e[t],0===t.indexOf("data-")&&(t=t.substr(5),r[t]=n));return r},getData:function(){var t;this._data=e.extend({},this._data,this._getDomData());for(t in this._data)if(this._data.hasOwnProperty(t)){var n=this._data[t];Object.defineProperty(this._data,t,{writeable:!0,get:function(){return n}.bind(this),set:function(n){this.setData.bind(this,t,n)}.bind(this)})}return this._data},setData:function(t,n){this.el.setAttribute("data-"+t,n),this._data[t]=n},destroy:function(){}},n.exports=r},{"./element-kit":1,"./utils":4}],3:[function(t,n){"use strict";var e=t("./utils"),r=t("./element"),i=function(t){r.prototype.initialize.call(this,t)};i.prototype=e.extend({},r.prototype,{load:function(t,n){var e=this.el,r=e.getAttribute(t)||t;return r||console.warn('ElementKit error: ImageElement has no "'+t+'" attribute to load'),-1!==r.indexOf(",")&&(r=this._getImageSourceSetPath(r)),this._loadImage(r,n),this},_loadImage:function(t,n){var e=this.el;e.onload=function(){n?n(e):null},e.src=t},_getImageSourceSetPath:function(t){var n,e,r,i,u,o=window.innerWidth,s=window.innerHeight;return t.split(",").forEach(function(t){e=this._buildSourceMapWidthHeight(t),r=e.width||0,i=e.height||0,!u&&o>=r&&s>=i&&(n=t.split(" ")[0],u=!0)}.bind(this)),n},_buildSourceMapWidthHeight:function(t,n){var e,r=t.split(" "),i=function(t){return Number(t.substr(0,t.length-1))};return n=n||{},r.shift(),r.forEach(function(t){e=t.charAt(t.length-1),"w"===e?n.width=i(t):"h"===e&&(n.height=i(t))}),n}}),n.exports=i},{"./element":2,"./utils":4}],4:[function(t,n){n.exports={createHtmlElement:function(t){var n,e;return t?(t=t.trim(t),n=document.createElement("div"),n.innerHTML=t,e=n.childNodes[0],n.removeChild(e)):void 0},extend:function(t){var n,e,r=t;for(e=1;e<arguments.length;e++){n=arguments[e];for(var i in n)n.hasOwnProperty(i)&&(r[i]=n[i])}return r}}},{}],5:[function(t,n,e){(function(){function t(t){function n(n,e,r,i,u,o){for(;u>=0&&o>u;u+=t){var s=i?i[u]:u;r=e(r,n[s],s,n)}return r}return function(e,r,i,u){r=_(r,u,4);var o=!w(e)&&b.keys(e),s=(o||e).length,a=t>0?0:s-1;return arguments.length<3&&(i=e[o?o[a]:a],a+=t),n(e,r,i,o,a,s)}}function r(t){return function(n,e,r){e=k(e,r);for(var i=null!=n&&n.length,u=t>0?0:i-1;u>=0&&i>u;u+=t)if(e(n[u],u,n))return u;return-1}}function i(t,n){var e=N.length,r=t.constructor,i=b.isFunction(r)&&r.prototype||a,u="constructor";for(b.has(t,u)&&!b.contains(n,u)&&n.push(u);e--;)u=N[e],u in t&&t[u]!==i[u]&&!b.contains(n,u)&&n.push(u)}var u=this,o=u._,s=Array.prototype,a=Object.prototype,c=Function.prototype,l=s.push,f=s.slice,h=a.toString,p=a.hasOwnProperty,d=Array.isArray,m=Object.keys,v=c.bind,g=Object.create,y=function(){},b=function(t){return t instanceof b?t:this instanceof b?void(this._wrapped=t):new b(t)};"undefined"!=typeof e?("undefined"!=typeof n&&n.exports&&(e=n.exports=b),e._=b):u._=b,b.VERSION="1.8.2";var _=function(t,n,e){if(void 0===n)return t;switch(null==e?3:e){case 1:return function(e){return t.call(n,e)};case 2:return function(e,r){return t.call(n,e,r)};case 3:return function(e,r,i){return t.call(n,e,r,i)};case 4:return function(e,r,i,u){return t.call(n,e,r,i,u)}}return function(){return t.apply(n,arguments)}},k=function(t,n,e){return null==t?b.identity:b.isFunction(t)?_(t,n,e):b.isObject(t)?b.matcher(t):b.property(t)};b.iteratee=function(t,n){return k(t,n,1/0)};var E=function(t,n){return function(e){var r=arguments.length;if(2>r||null==e)return e;for(var i=1;r>i;i++)for(var u=arguments[i],o=t(u),s=o.length,a=0;s>a;a++){var c=o[a];n&&void 0!==e[c]||(e[c]=u[c])}return e}},C=function(t){if(!b.isObject(t))return{};if(g)return g(t);y.prototype=t;var n=new y;return y.prototype=null,n},x=Math.pow(2,53)-1,w=function(t){var n=t&&t.length;return"number"==typeof n&&n>=0&&x>=n};b.each=b.forEach=function(t,n,e){n=_(n,e);var r,i;if(w(t))for(r=0,i=t.length;i>r;r++)n(t[r],r,t);else{var u=b.keys(t);for(r=0,i=u.length;i>r;r++)n(t[u[r]],u[r],t)}return t},b.map=b.collect=function(t,n,e){n=k(n,e);for(var r=!w(t)&&b.keys(t),i=(r||t).length,u=Array(i),o=0;i>o;o++){var s=r?r[o]:o;u[o]=n(t[s],s,t)}return u},b.reduce=b.foldl=b.inject=t(1),b.reduceRight=b.foldr=t(-1),b.find=b.detect=function(t,n,e){var r;return r=w(t)?b.findIndex(t,n,e):b.findKey(t,n,e),void 0!==r&&-1!==r?t[r]:void 0},b.filter=b.select=function(t,n,e){var r=[];return n=k(n,e),b.each(t,function(t,e,i){n(t,e,i)&&r.push(t)}),r},b.reject=function(t,n,e){return b.filter(t,b.negate(k(n)),e)},b.every=b.all=function(t,n,e){n=k(n,e);for(var r=!w(t)&&b.keys(t),i=(r||t).length,u=0;i>u;u++){var o=r?r[u]:u;if(!n(t[o],o,t))return!1}return!0},b.some=b.any=function(t,n,e){n=k(n,e);for(var r=!w(t)&&b.keys(t),i=(r||t).length,u=0;i>u;u++){var o=r?r[u]:u;if(n(t[o],o,t))return!0}return!1},b.contains=b.includes=b.include=function(t,n,e){return w(t)||(t=b.values(t)),b.indexOf(t,n,"number"==typeof e&&e)>=0},b.invoke=function(t,n){var e=f.call(arguments,2),r=b.isFunction(n);return b.map(t,function(t){var i=r?n:t[n];return null==i?i:i.apply(t,e)})},b.pluck=function(t,n){return b.map(t,b.property(n))},b.where=function(t,n){return b.filter(t,b.matcher(n))},b.findWhere=function(t,n){return b.find(t,b.matcher(n))},b.max=function(t,n,e){var r,i,u=-(1/0),o=-(1/0);if(null==n&&null!=t){t=w(t)?t:b.values(t);for(var s=0,a=t.length;a>s;s++)r=t[s],r>u&&(u=r)}else n=k(n,e),b.each(t,function(t,e,r){i=n(t,e,r),(i>o||i===-(1/0)&&u===-(1/0))&&(u=t,o=i)});return u},b.min=function(t,n,e){var r,i,u=1/0,o=1/0;if(null==n&&null!=t){t=w(t)?t:b.values(t);for(var s=0,a=t.length;a>s;s++)r=t[s],u>r&&(u=r)}else n=k(n,e),b.each(t,function(t,e,r){i=n(t,e,r),(o>i||i===1/0&&u===1/0)&&(u=t,o=i)});return u},b.shuffle=function(t){for(var n,e=w(t)?t:b.values(t),r=e.length,i=Array(r),u=0;r>u;u++)n=b.random(0,u),n!==u&&(i[u]=i[n]),i[n]=e[u];return i},b.sample=function(t,n,e){return null==n||e?(w(t)||(t=b.values(t)),t[b.random(t.length-1)]):b.shuffle(t).slice(0,Math.max(0,n))},b.sortBy=function(t,n,e){return n=k(n,e),b.pluck(b.map(t,function(t,e,r){return{value:t,index:e,criteria:n(t,e,r)}}).sort(function(t,n){var e=t.criteria,r=n.criteria;if(e!==r){if(e>r||void 0===e)return 1;if(r>e||void 0===r)return-1}return t.index-n.index}),"value")};var I=function(t){return function(n,e,r){var i={};return e=k(e,r),b.each(n,function(r,u){var o=e(r,u,n);t(i,r,o)}),i}};b.groupBy=I(function(t,n,e){b.has(t,e)?t[e].push(n):t[e]=[n]}),b.indexBy=I(function(t,n,e){t[e]=n}),b.countBy=I(function(t,n,e){b.has(t,e)?t[e]++:t[e]=1}),b.toArray=function(t){return t?b.isArray(t)?f.call(t):w(t)?b.map(t,b.identity):b.values(t):[]},b.size=function(t){return null==t?0:w(t)?t.length:b.keys(t).length},b.partition=function(t,n,e){n=k(n,e);var r=[],i=[];return b.each(t,function(t,e,u){(n(t,e,u)?r:i).push(t)}),[r,i]},b.first=b.head=b.take=function(t,n,e){return null==t?void 0:null==n||e?t[0]:b.initial(t,t.length-n)},b.initial=function(t,n,e){return f.call(t,0,Math.max(0,t.length-(null==n||e?1:n)))},b.last=function(t,n,e){return null==t?void 0:null==n||e?t[t.length-1]:b.rest(t,Math.max(0,t.length-n))},b.rest=b.tail=b.drop=function(t,n,e){return f.call(t,null==n||e?1:n)},b.compact=function(t){return b.filter(t,b.identity)};var j=function(t,n,e,r){for(var i=[],u=0,o=r||0,s=t&&t.length;s>o;o++){var a=t[o];if(w(a)&&(b.isArray(a)||b.isArguments(a))){n||(a=j(a,n,e));var c=0,l=a.length;for(i.length+=l;l>c;)i[u++]=a[c++]}else e||(i[u++]=a)}return i};b.flatten=function(t,n){return j(t,n,!1)},b.without=function(t){return b.difference(t,f.call(arguments,1))},b.uniq=b.unique=function(t,n,e,r){if(null==t)return[];b.isBoolean(n)||(r=e,e=n,n=!1),null!=e&&(e=k(e,r));for(var i=[],u=[],o=0,s=t.length;s>o;o++){var a=t[o],c=e?e(a,o,t):a;n?(o&&u===c||i.push(a),u=c):e?b.contains(u,c)||(u.push(c),i.push(a)):b.contains(i,a)||i.push(a)}return i},b.union=function(){return b.uniq(j(arguments,!0,!0))},b.intersection=function(t){if(null==t)return[];for(var n=[],e=arguments.length,r=0,i=t.length;i>r;r++){var u=t[r];if(!b.contains(n,u)){for(var o=1;e>o&&b.contains(arguments[o],u);o++);o===e&&n.push(u)}}return n},b.difference=function(t){var n=j(arguments,!0,!0,1);return b.filter(t,function(t){return!b.contains(n,t)})},b.zip=function(){return b.unzip(arguments)},b.unzip=function(t){for(var n=t&&b.max(t,"length").length||0,e=Array(n),r=0;n>r;r++)e[r]=b.pluck(t,r);return e},b.object=function(t,n){for(var e={},r=0,i=t&&t.length;i>r;r++)n?e[t[r]]=n[r]:e[t[r][0]]=t[r][1];return e},b.indexOf=function(t,n,e){var r=0,i=t&&t.length;if("number"==typeof e)r=0>e?Math.max(0,i+e):e;else if(e&&i)return r=b.sortedIndex(t,n),t[r]===n?r:-1;if(n!==n)return b.findIndex(f.call(t,r),b.isNaN);for(;i>r;r++)if(t[r]===n)return r;return-1},b.lastIndexOf=function(t,n,e){var r=t?t.length:0;if("number"==typeof e&&(r=0>e?r+e+1:Math.min(r,e+1)),n!==n)return b.findLastIndex(f.call(t,0,r),b.isNaN);for(;--r>=0;)if(t[r]===n)return r;return-1},b.findIndex=r(1),b.findLastIndex=r(-1),b.sortedIndex=function(t,n,e,r){e=k(e,r,1);for(var i=e(n),u=0,o=t.length;o>u;){var s=Math.floor((u+o)/2);e(t[s])<i?u=s+1:o=s}return u},b.range=function(t,n,e){arguments.length<=1&&(n=t||0,t=0),e=e||1;for(var r=Math.max(Math.ceil((n-t)/e),0),i=Array(r),u=0;r>u;u++,t+=e)i[u]=t;return i};var O=function(t,n,e,r,i){if(!(r instanceof n))return t.apply(e,i);var u=C(t.prototype),o=t.apply(u,i);return b.isObject(o)?o:u};b.bind=function(t,n){if(v&&t.bind===v)return v.apply(t,f.call(arguments,1));if(!b.isFunction(t))throw new TypeError("Bind must be called on a function");var e=f.call(arguments,2),r=function(){return O(t,r,n,this,e.concat(f.call(arguments)))};return r},b.partial=function(t){var n=f.call(arguments,1),e=function(){for(var r=0,i=n.length,u=Array(i),o=0;i>o;o++)u[o]=n[o]===b?arguments[r++]:n[o];for(;r<arguments.length;)u.push(arguments[r++]);return O(t,e,this,this,u)};return e},b.bindAll=function(t){var n,e,r=arguments.length;if(1>=r)throw new Error("bindAll must be passed function names");for(n=1;r>n;n++)e=arguments[n],t[e]=b.bind(t[e],t);return t},b.memoize=function(t,n){var e=function(r){var i=e.cache,u=""+(n?n.apply(this,arguments):r);return b.has(i,u)||(i[u]=t.apply(this,arguments)),i[u]};return e.cache={},e},b.delay=function(t,n){var e=f.call(arguments,2);return setTimeout(function(){return t.apply(null,e)},n)},b.defer=b.partial(b.delay,b,1),b.throttle=function(t,n,e){var r,i,u,o=null,s=0;e||(e={});var a=function(){s=e.leading===!1?0:b.now(),o=null,u=t.apply(r,i),o||(r=i=null)};return function(){var c=b.now();s||e.leading!==!1||(s=c);var l=n-(c-s);return r=this,i=arguments,0>=l||l>n?(o&&(clearTimeout(o),o=null),s=c,u=t.apply(r,i),o||(r=i=null)):o||e.trailing===!1||(o=setTimeout(a,l)),u}},b.debounce=function(t,n,e){var r,i,u,o,s,a=function(){var c=b.now()-o;n>c&&c>=0?r=setTimeout(a,n-c):(r=null,e||(s=t.apply(u,i),r||(u=i=null)))};return function(){u=this,i=arguments,o=b.now();var c=e&&!r;return r||(r=setTimeout(a,n)),c&&(s=t.apply(u,i),u=i=null),s}},b.wrap=function(t,n){return b.partial(n,t)},b.negate=function(t){return function(){return!t.apply(this,arguments)}},b.compose=function(){var t=arguments,n=t.length-1;return function(){for(var e=n,r=t[n].apply(this,arguments);e--;)r=t[e].call(this,r);return r}},b.after=function(t,n){return function(){return--t<1?n.apply(this,arguments):void 0}},b.before=function(t,n){var e;return function(){return--t>0&&(e=n.apply(this,arguments)),1>=t&&(n=null),e}},b.once=b.partial(b.before,2);var A=!{toString:null}.propertyIsEnumerable("toString"),N=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];b.keys=function(t){if(!b.isObject(t))return[];if(m)return m(t);var n=[];for(var e in t)b.has(t,e)&&n.push(e);return A&&i(t,n),n},b.allKeys=function(t){if(!b.isObject(t))return[];var n=[];for(var e in t)n.push(e);return A&&i(t,n),n},b.values=function(t){for(var n=b.keys(t),e=n.length,r=Array(e),i=0;e>i;i++)r[i]=t[n[i]];return r},b.mapObject=function(t,n,e){n=k(n,e);for(var r,i=b.keys(t),u=i.length,o={},s=0;u>s;s++)r=i[s],o[r]=n(t[r],r,t);return o},b.pairs=function(t){for(var n=b.keys(t),e=n.length,r=Array(e),i=0;e>i;i++)r[i]=[n[i],t[n[i]]];return r},b.invert=function(t){for(var n={},e=b.keys(t),r=0,i=e.length;i>r;r++)n[t[e[r]]]=e[r];return n},b.functions=b.methods=function(t){var n=[];for(var e in t)b.isFunction(t[e])&&n.push(e);return n.sort()},b.extend=E(b.allKeys),b.extendOwn=b.assign=E(b.keys),b.findKey=function(t,n,e){n=k(n,e);for(var r,i=b.keys(t),u=0,o=i.length;o>u;u++)if(r=i[u],n(t[r],r,t))return r},b.pick=function(t,n,e){var r,i,u={},o=t;if(null==o)return u;b.isFunction(n)?(i=b.allKeys(o),r=_(n,e)):(i=j(arguments,!1,!1,1),r=function(t,n,e){return n in e},o=Object(o));for(var s=0,a=i.length;a>s;s++){var c=i[s],l=o[c];r(l,c,o)&&(u[c]=l)}return u},b.omit=function(t,n,e){if(b.isFunction(n))n=b.negate(n);else{var r=b.map(j(arguments,!1,!1,1),String);n=function(t,n){return!b.contains(r,n)}}return b.pick(t,n,e)},b.defaults=E(b.allKeys,!0),b.clone=function(t){return b.isObject(t)?b.isArray(t)?t.slice():b.extend({},t):t},b.tap=function(t,n){return n(t),t},b.isMatch=function(t,n){var e=b.keys(n),r=e.length;if(null==t)return!r;for(var i=Object(t),u=0;r>u;u++){var o=e[u];if(n[o]!==i[o]||!(o in i))return!1}return!0};var F=function(t,n,e,r){if(t===n)return 0!==t||1/t===1/n;if(null==t||null==n)return t===n;t instanceof b&&(t=t._wrapped),n instanceof b&&(n=n._wrapped);var i=h.call(t);if(i!==h.call(n))return!1;switch(i){case"[object RegExp]":case"[object String]":return""+t==""+n;case"[object Number]":return+t!==+t?+n!==+n:0===+t?1/+t===1/n:+t===+n;case"[object Date]":case"[object Boolean]":return+t===+n}var u="[object Array]"===i;if(!u){if("object"!=typeof t||"object"!=typeof n)return!1;var o=t.constructor,s=n.constructor;if(o!==s&&!(b.isFunction(o)&&o instanceof o&&b.isFunction(s)&&s instanceof s)&&"constructor"in t&&"constructor"in n)return!1}e=e||[],r=r||[];for(var a=e.length;a--;)if(e[a]===t)return r[a]===n;if(e.push(t),r.push(n),u){if(a=t.length,a!==n.length)return!1;for(;a--;)if(!F(t[a],n[a],e,r))return!1}else{var c,l=b.keys(t);if(a=l.length,b.keys(n).length!==a)return!1;for(;a--;)if(c=l[a],!b.has(n,c)||!F(t[c],n[c],e,r))return!1}return e.pop(),r.pop(),!0};b.isEqual=function(t,n){return F(t,n)},b.isEmpty=function(t){return null==t?!0:w(t)&&(b.isArray(t)||b.isString(t)||b.isArguments(t))?0===t.length:0===b.keys(t).length},b.isElement=function(t){return!(!t||1!==t.nodeType)},b.isArray=d||function(t){return"[object Array]"===h.call(t)},b.isObject=function(t){var n=typeof t;return"function"===n||"object"===n&&!!t},b.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(t){b["is"+t]=function(n){return h.call(n)==="[object "+t+"]"}}),b.isArguments(arguments)||(b.isArguments=function(t){return b.has(t,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(b.isFunction=function(t){return"function"==typeof t||!1}),b.isFinite=function(t){return isFinite(t)&&!isNaN(parseFloat(t))},b.isNaN=function(t){return b.isNumber(t)&&t!==+t},b.isBoolean=function(t){return t===!0||t===!1||"[object Boolean]"===h.call(t)},b.isNull=function(t){return null===t},b.isUndefined=function(t){return void 0===t},b.has=function(t,n){return null!=t&&p.call(t,n)},b.noConflict=function(){return u._=o,this},b.identity=function(t){return t},b.constant=function(t){return function(){return t}},b.noop=function(){},b.property=function(t){return function(n){return null==n?void 0:n[t]}},b.propertyOf=function(t){return null==t?function(){}:function(n){return t[n]}},b.matcher=b.matches=function(t){return t=b.extendOwn({},t),function(n){return b.isMatch(n,t)}},b.times=function(t,n,e){var r=Array(Math.max(0,t));n=_(n,e,1);for(var i=0;t>i;i++)r[i]=n(i);return r},b.random=function(t,n){return null==n&&(n=t,t=0),t+Math.floor(Math.random()*(n-t+1))},b.now=Date.now||function(){return(new Date).getTime()};var L={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},M=b.invert(L),S=function(t){var n=function(n){return t[n]},e="(?:"+b.keys(t).join("|")+")",r=RegExp(e),i=RegExp(e,"g");return function(t){return t=null==t?"":""+t,r.test(t)?t.replace(i,n):t}};b.escape=S(L),b.unescape=S(M),b.result=function(t,n,e){var r=null==t?void 0:t[n];return void 0===r&&(r=e),b.isFunction(r)?r.call(t):r};var U=0;b.uniqueId=function(t){var n=++U+"";return t?t+n:n},b.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var P=/(.)^/,D={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},T=/\\|'|\r|\n|\u2028|\u2029/g,z=function(t){return"\\"+D[t]};b.template=function(t,n,e){!n&&e&&(n=e),n=b.defaults({},n,b.templateSettings);var r=RegExp([(n.escape||P).source,(n.interpolate||P).source,(n.evaluate||P).source].join("|")+"|$","g"),i=0,u="__p+='";t.replace(r,function(n,e,r,o,s){return u+=t.slice(i,s).replace(T,z),i=s+n.length,e?u+="'+\n((__t=("+e+"))==null?'':_.escape(__t))+\n'":r?u+="'+\n((__t=("+r+"))==null?'':__t)+\n'":o&&(u+="';\n"+o+"\n__p+='"),n}),u+="';\n",n.variable||(u="with(obj||{}){\n"+u+"}\n"),u="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+u+"return __p;\n";try{var o=new Function(n.variable||"obj","_",u)}catch(s){throw s.source=u,s}var a=function(t){return o.call(this,t,b)},c=n.variable||"obj";return a.source="function("+c+"){\n"+u+"}",a},b.chain=function(t){var n=b(t);return n._chain=!0,n};var q=function(t,n){return t._chain?b(n).chain():n};b.mixin=function(t){b.each(b.functions(t),function(n){var e=b[n]=t[n];b.prototype[n]=function(){var t=[this._wrapped];return l.apply(t,arguments),q(this,e.apply(b,t))}})},b.mixin(b),b.each(["pop","push","reverse","shift","sort","splice","unshift"],function(t){var n=s[t];b.prototype[t]=function(){var e=this._wrapped;return n.apply(e,arguments),"shift"!==t&&"splice"!==t||0!==e.length||delete e[0],q(this,e)}}),b.each(["concat","join","slice"],function(t){var n=s[t];b.prototype[t]=function(){return q(this,n.apply(this._wrapped,arguments))}}),b.prototype.value=function(){return this._wrapped},b.prototype.valueOf=b.prototype.toJSON=b.prototype.value,b.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return b})}).call(this)},{}],6:[function(t,n){"use strict";var e=t("underscore"),r=t("./form-element");t("element-kit");var i=function(t){this.initialize(t)};i.prototype=e.extend({},r.prototype,{initialize:function(t){this.options=e.extend({el:null,onChecked:null,onUnchecked:null,containerClass:"ui-checkbox",inputClass:"ui-checkbox-input",checkedClass:"ui-checkbox-checked",disabledClass:"ui-checkbox-disabled"},t),this.el=this.options.el,"input"!==this.el.tagName.toLowerCase()&&console.warn("checkbox error: element passed in instantiation was not an input element"),r.prototype.initialize.call(this,this.options),this.setup()},setup:function(){var t=this.getFormElement();t.kit.classList.add(this.options.inputClass),this._container=this._buildUIElement(this.el),this.isInitChecked=t.checked,this.isInitChecked&&this._container.kit.classList.add(this.options.checkedClass),this.isInitDisabled=t.disabled,this.isInitDisabled&&this._container.kit.classList.add(this.options.disabledClass),this.getUIElement().kit.addEventListener("click","_onClick",this)},_onClick:function(){var t=this.getFormElement();t.disabled||(this.getUIElement().kit.classList.contains(this.options.checkedClass)?this.uncheck():this.check())},_buildUIElement:function(t){return t.kit.appendOuterHtml('<div class="'+this.options.containerClass+'"></div>')},check:function(){var t=this.getFormElement(),n=this.getUIElement();t.checked||(t.checked=!0),n.kit.classList.add(this.options.checkedClass),this.options.onChecked&&this.options.onChecked(t.value,t,n)},uncheck:function(){var t=this.getFormElement(),n=this.getUIElement();t.checked&&(t.checked=!1),n.kit.classList.remove(this.options.checkedClass),this.options.onUnchecked&&this.options.onUnchecked(t.value,t,n)},enable:function(){this.getFormElement().disabled=!1,this.getUIElement().kit.classList.remove(this.options.disabledClass)},disable:function(){this.getFormElement().disabled=!0,this.getUIElement().kit.classList.add(this.options.disabledClass)},getFormElement:function(){return this.el},getUIElement:function(){return this._container},getElementKey:function(){return"checkbox"},destroy:function(){var t=this.getUIElement(),n=this.getFormElement();t.kit.removeEventListener("click","_onClick",this),t.parentNode.replaceChild(n,t),this.isInitChecked&&(n.checked=!0),this.isInitDisabled&&(n.disabled=!0),r.prototype.destroy.call(this)}}),n.exports=i},{"./form-element":7,"element-kit":1,underscore:5}],7:[function(t,n){"use strict";t("underscore");t("element-kit");var e=function(t){this.initialize(t)};e.prototype={initialize:function(t){this.options=t||{}},getFormElement:function(){return this.options.el},getUIElement:function(){return this.getFormElement()},getFormElements:function(){return[this.getFormElement()]},getValue:function(){return this.getFormElement().value},getUIElements:function(){return[this.getUIElement()]},enable:function(){this.getFormElement().disabled=!1},disable:function(){this.getFormElement().disabled=!0},getElementKey:function(){return"element"},destroy:function(){}},n.exports=e},{"element-kit":1,underscore:5}]},{},[6]);