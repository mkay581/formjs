/** 
* formjs - v1.0.0.
* https://github.com/mkay581/formjs.git
* Copyright 2015 Mark Kennedy. Licensed MIT.
*/

!function t(e,n,i){function s(o,a){if(!n[o]){if(!e[o]){var l="function"==typeof require&&require;if(!a&&l)return l(o,!0);if(r)return r(o,!0);var u=new Error("Cannot find module '"+o+"'");throw u.code="MODULE_NOT_FOUND",u}var c=n[o]={exports:{}};e[o][0].call(c.exports,function(t){var n=e[o][1][t];return s(n?n:t)},c,c.exports,t,e,n,i)}return n[o].exports}for(var r="function"==typeof require&&require,o=0;o<i.length;o++)s(i[o]);return s}({1:[function(t,e){"use strict";var n,i=t("./element"),s=t("./image-element"),r=0,o={};e.exports=function(){var t=function(t){this.initialize(t)};return t.prototype={initialize:function(){var t=this;n||document.body.kit||(n=Object.defineProperty(window.Element.prototype,"kit",{get:function(){return t.setup(this)}}))},setup:function(t){var e;return o[t._kitId]||(e=t instanceof window.HTMLImageElement?s:i,r++,t._kitId=r,o[t._kitId]=new e(t)),o[t._kitId]},destroy:function(){}},new t}()},{"./element":2,"./image-element":3}],2:[function(t,e){"use strict";var n=t("./utils"),i=(t("./element-kit"),function(t){this.initialize(t)});i.prototype={initialize:function(t){this.el=t,this.classList=this._getClassList(),this._eventListenerMap=this._eventListenerMap||[],Object.defineProperty(this,"dataset",{get:function(){return this.getData()}.bind(this)})},_traverseEachParent:function(t,e){for(var n,i=e||this.el;i&&"string"==typeof i.className&&(n=t(i),void 0===n||n);)i=i.parentNode},appendOuterHtml:function(t){var e=this.el.parentNode,i=n.createHtmlElement(t);return e?e.replaceChild(i,this.el):(e=document.createDocumentFragment(),e.appendChild(i)),i.appendChild(this.el),i},getUniqueId:function(){return this.el._kitId},getClosestAncestorElementByClassName:function(t){var e;return this._traverseEachParent(function(n){return n.kit._hasClass(t)?(e=n,!1):void 0},this.el.parentNode),e},addEventListener:function(t,e,n,i){var s=e;i=i||{},"function"!=typeof s&&(s=this._createEventListener(n[e],n)),this.el.addEventListener(t,s,i.useCapture),this._eventListenerMap.push({event:t,listener:s,listenerId:e,context:n})},_createEventListener:function(t,e){return function(){e=e||this,t.apply(e,arguments)}},removeEventListener:function(t,e,n){var i,s,r=this._eventListenerMap||[];if(r.length)for(i=0;i<r.length;i++)if(s=r[i],s&&s.event===t&&s.listenerId===e&&s.context===n){this.el.removeEventListener(t,s.listener),this._eventListenerMap[i]=null;break}},waitForTransition:function(t){var e=this.getTransitionDuration();t&&(e>0?setTimeout(t.bind(this,this.el),e):t(this.el))},getTransitionDuration:function(){var t,e=this.getCssComputedProperty("transition-delay")||"0ms",n=this.getCssComputedProperty("transition-duration")||"0ms",i=Array.isArray(n)?n:[n],s=Array.isArray(e)?e:[e],r=0;return i.push.apply(i,s),i.forEach(function(e){e.split(",").forEach(function(e){e=this._convertCssTimeValueToMilliseconds(e),t=this._getCssPropUnitMap(e),t.num>r&&(r=t.num)}.bind(this))}.bind(this)),r},getCssComputedProperty:function(t){var e=window.getComputedStyle(this.el);return e.getPropertyValue(t)||this.el.style[this._getJsPropName(t)]},_getCssPropUnitMap:function(t){t.trim();var e=t.match("[0-9.]+"),n="ms";return e=e?e[0]:"",e&&(n=t.split(e)[1],e=Number(e)),{num:e,unit:n}},_convertCssTimeValueToMilliseconds:function(t){var e=this._getCssPropUnitMap(t).num,n=t.replace(e,"");return t="s"===n?1e3*e:e,t+"ms"},_getClassList:function(){return{add:this._addClass.bind(this),remove:this._removeClass.bind(this),contains:this._hasClass.bind(this),toggle:this._toggleClass.bind(this)}},_getCssClasses:function(){return this.el.className.split(" ")},_toggleClass:function(t){this._hasClass(t)?this._removeClass(t):this._addClass(t)},_addClass:function(){"classList"in document.createElement("_")?this._each(arguments,function(t){this.el.classList.add(t)}.bind(this)):this._each(arguments,function(t){this._hasClass(t)||(this.el.className=this.el.className?this.el.className+" "+t:t)}.bind(this))},_each:function(t,e){var n,i=t.length;for(n=0;i>n;n++)e(t[n])},_removeClass:function(){var t;"classList"in document.createElement("_")?this._each(arguments,function(t){this.el.classList.remove(t)}.bind(this)):this._each(arguments,function(e){this.el.className===e?this.el.className="":(t="[\\s]*"+e,t=new RegExp(t,"i"),this.el.className=this.el.className.replace(t,""))}.bind(this))},_hasClass:function(t){var e=this._getCssClasses();return-1!==e.indexOf(t)},_getJsPropName:function(t){return t=t.replace(/-([a-z])/g,function(t){return t[1].toUpperCase()})},getAttributes:function(){var t=this.el.attributes,e={};if(t.length)for(var n=0;n<t.length;n++)e[t[n].name]=t[n].value;return e},_getDomData:function(){var t,e,n=this.getAttributes(),i={};for(t in n)n.hasOwnProperty(t)&&(e=n[t],0===t.indexOf("data-")&&(t=t.substr(5),i[t]=e));return i},getData:function(){var t;this._data=n.extend({},this._data,this._getDomData());for(t in this._data)if(this._data.hasOwnProperty(t)){var e=this._data[t];Object.defineProperty(this._data,t,{writeable:!0,get:function(){return e}.bind(this),set:function(e){this.setData.bind(this,t,e)}.bind(this)})}return this._data},setData:function(t,e){this.el.setAttribute("data-"+t,e),this._data[t]=e},destroy:function(){}},e.exports=i},{"./element-kit":1,"./utils":4}],3:[function(t,e){"use strict";var n=t("./utils"),i=t("./element"),s=function(t){i.prototype.initialize.call(this,t)};s.prototype=n.extend({},i.prototype,{load:function(t,e){var n=this.el,i=n.getAttribute(t)||t;return i||console.warn('ElementKit error: ImageElement has no "'+t+'" attribute to load'),-1!==i.indexOf(",")&&(i=this._getImageSourceSetPath(i)),this._loadImage(i,e),this},_loadImage:function(t,e){var n=this.el;n.onload=function(){e?e(n):null},n.src=t},_getImageSourceSetPath:function(t){var e,n,i,s,r,o=window.innerWidth,a=window.innerHeight;return t.split(",").forEach(function(t){n=this._buildSourceMapWidthHeight(t),i=n.width||0,s=n.height||0,!r&&o>=i&&a>=s&&(e=t.split(" ")[0],r=!0)}.bind(this)),e},_buildSourceMapWidthHeight:function(t,e){var n,i=t.split(" "),s=function(t){return Number(t.substr(0,t.length-1))};return e=e||{},i.shift(),i.forEach(function(t){n=t.charAt(t.length-1),"w"===n?e.width=s(t):"h"===n&&(e.height=s(t))}),e}}),e.exports=s},{"./element":2,"./utils":4}],4:[function(t,e){e.exports={createHtmlElement:function(t){var e,n;return t?(t=t.trim(t),e=document.createElement("div"),e.innerHTML=t,n=e.childNodes[0],e.removeChild(n)):void 0},extend:function(t){var e,n,i=t;for(n=1;n<arguments.length;n++){e=arguments[n];for(var s in e)e.hasOwnProperty(s)&&(i[s]=e[s])}return i}}},{}],5:[function(t,e,n){(function(){function t(t){function e(e,n,i,s,r,o){for(;r>=0&&o>r;r+=t){var a=s?s[r]:r;i=n(i,e[a],a,e)}return i}return function(n,i,s,r){i=C(i,r,4);var o=!x(n)&&_.keys(n),a=(o||n).length,l=t>0?0:a-1;return arguments.length<3&&(s=n[o?o[l]:l],l+=t),e(n,i,s,o,l,a)}}function i(t){return function(e,n,i){n=b(n,i);for(var s=null!=e&&e.length,r=t>0?0:s-1;r>=0&&s>r;r+=t)if(n(e[r],r,e))return r;return-1}}function s(t,e){var n=U.length,i=t.constructor,s=_.isFunction(i)&&i.prototype||l,r="constructor";for(_.has(t,r)&&!_.contains(e,r)&&e.push(r);n--;)r=U[n],r in t&&t[r]!==s[r]&&!_.contains(e,r)&&e.push(r)}var r=this,o=r._,a=Array.prototype,l=Object.prototype,u=Function.prototype,c=a.push,h=a.slice,f=l.toString,d=l.hasOwnProperty,p=Array.isArray,g=Object.keys,m=u.bind,v=Object.create,y=function(){},_=function(t){return t instanceof _?t:this instanceof _?void(this._wrapped=t):new _(t)};"undefined"!=typeof n?("undefined"!=typeof e&&e.exports&&(n=e.exports=_),n._=_):r._=_,_.VERSION="1.8.2";var C=function(t,e,n){if(void 0===e)return t;switch(null==n?3:n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,s){return t.call(e,n,i,s)};case 4:return function(n,i,s,r){return t.call(e,n,i,s,r)}}return function(){return t.apply(e,arguments)}},b=function(t,e,n){return null==t?_.identity:_.isFunction(t)?C(t,e,n):_.isObject(t)?_.matcher(t):_.property(t)};_.iteratee=function(t,e){return b(t,e,1/0)};var E=function(t,e){return function(n){var i=arguments.length;if(2>i||null==n)return n;for(var s=1;i>s;s++)for(var r=arguments[s],o=t(r),a=o.length,l=0;a>l;l++){var u=o[l];e&&void 0!==n[u]||(n[u]=r[u])}return n}},k=function(t){if(!_.isObject(t))return{};if(v)return v(t);y.prototype=t;var e=new y;return y.prototype=null,e},I=Math.pow(2,53)-1,x=function(t){var e=t&&t.length;return"number"==typeof e&&e>=0&&I>=e};_.each=_.forEach=function(t,e,n){e=C(e,n);var i,s;if(x(t))for(i=0,s=t.length;s>i;i++)e(t[i],i,t);else{var r=_.keys(t);for(i=0,s=r.length;s>i;i++)e(t[r[i]],r[i],t)}return t},_.map=_.collect=function(t,e,n){e=b(e,n);for(var i=!x(t)&&_.keys(t),s=(i||t).length,r=Array(s),o=0;s>o;o++){var a=i?i[o]:o;r[o]=e(t[a],a,t)}return r},_.reduce=_.foldl=_.inject=t(1),_.reduceRight=_.foldr=t(-1),_.find=_.detect=function(t,e,n){var i;return i=x(t)?_.findIndex(t,e,n):_.findKey(t,e,n),void 0!==i&&-1!==i?t[i]:void 0},_.filter=_.select=function(t,e,n){var i=[];return e=b(e,n),_.each(t,function(t,n,s){e(t,n,s)&&i.push(t)}),i},_.reject=function(t,e,n){return _.filter(t,_.negate(b(e)),n)},_.every=_.all=function(t,e,n){e=b(e,n);for(var i=!x(t)&&_.keys(t),s=(i||t).length,r=0;s>r;r++){var o=i?i[r]:r;if(!e(t[o],o,t))return!1}return!0},_.some=_.any=function(t,e,n){e=b(e,n);for(var i=!x(t)&&_.keys(t),s=(i||t).length,r=0;s>r;r++){var o=i?i[r]:r;if(e(t[o],o,t))return!0}return!1},_.contains=_.includes=_.include=function(t,e,n){return x(t)||(t=_.values(t)),_.indexOf(t,e,"number"==typeof n&&n)>=0},_.invoke=function(t,e){var n=h.call(arguments,2),i=_.isFunction(e);return _.map(t,function(t){var s=i?e:t[e];return null==s?s:s.apply(t,n)})},_.pluck=function(t,e){return _.map(t,_.property(e))},_.where=function(t,e){return _.filter(t,_.matcher(e))},_.findWhere=function(t,e){return _.find(t,_.matcher(e))},_.max=function(t,e,n){var i,s,r=-(1/0),o=-(1/0);if(null==e&&null!=t){t=x(t)?t:_.values(t);for(var a=0,l=t.length;l>a;a++)i=t[a],i>r&&(r=i)}else e=b(e,n),_.each(t,function(t,n,i){s=e(t,n,i),(s>o||s===-(1/0)&&r===-(1/0))&&(r=t,o=s)});return r},_.min=function(t,e,n){var i,s,r=1/0,o=1/0;if(null==e&&null!=t){t=x(t)?t:_.values(t);for(var a=0,l=t.length;l>a;a++)i=t[a],r>i&&(r=i)}else e=b(e,n),_.each(t,function(t,n,i){s=e(t,n,i),(o>s||s===1/0&&r===1/0)&&(r=t,o=s)});return r},_.shuffle=function(t){for(var e,n=x(t)?t:_.values(t),i=n.length,s=Array(i),r=0;i>r;r++)e=_.random(0,r),e!==r&&(s[r]=s[e]),s[e]=n[r];return s},_.sample=function(t,e,n){return null==e||n?(x(t)||(t=_.values(t)),t[_.random(t.length-1)]):_.shuffle(t).slice(0,Math.max(0,e))},_.sortBy=function(t,e,n){return e=b(e,n),_.pluck(_.map(t,function(t,n,i){return{value:t,index:n,criteria:e(t,n,i)}}).sort(function(t,e){var n=t.criteria,i=e.criteria;if(n!==i){if(n>i||void 0===n)return 1;if(i>n||void 0===i)return-1}return t.index-e.index}),"value")};var w=function(t){return function(e,n,i){var s={};return n=b(n,i),_.each(e,function(i,r){var o=n(i,r,e);t(s,i,o)}),s}};_.groupBy=w(function(t,e,n){_.has(t,n)?t[n].push(e):t[n]=[e]}),_.indexBy=w(function(t,e,n){t[n]=e}),_.countBy=w(function(t,e,n){_.has(t,n)?t[n]++:t[n]=1}),_.toArray=function(t){return t?_.isArray(t)?h.call(t):x(t)?_.map(t,_.identity):_.values(t):[]},_.size=function(t){return null==t?0:x(t)?t.length:_.keys(t).length},_.partition=function(t,e,n){e=b(e,n);var i=[],s=[];return _.each(t,function(t,n,r){(e(t,n,r)?i:s).push(t)}),[i,s]},_.first=_.head=_.take=function(t,e,n){return null==t?void 0:null==e||n?t[0]:_.initial(t,t.length-e)},_.initial=function(t,e,n){return h.call(t,0,Math.max(0,t.length-(null==e||n?1:e)))},_.last=function(t,e,n){return null==t?void 0:null==e||n?t[t.length-1]:_.rest(t,Math.max(0,t.length-e))},_.rest=_.tail=_.drop=function(t,e,n){return h.call(t,null==e||n?1:e)},_.compact=function(t){return _.filter(t,_.identity)};var L=function(t,e,n,i){for(var s=[],r=0,o=i||0,a=t&&t.length;a>o;o++){var l=t[o];if(x(l)&&(_.isArray(l)||_.isArguments(l))){e||(l=L(l,e,n));var u=0,c=l.length;for(s.length+=c;c>u;)s[r++]=l[u++]}else n||(s[r++]=l)}return s};_.flatten=function(t,e){return L(t,e,!1)},_.without=function(t){return _.difference(t,h.call(arguments,1))},_.uniq=_.unique=function(t,e,n,i){if(null==t)return[];_.isBoolean(e)||(i=n,n=e,e=!1),null!=n&&(n=b(n,i));for(var s=[],r=[],o=0,a=t.length;a>o;o++){var l=t[o],u=n?n(l,o,t):l;e?(o&&r===u||s.push(l),r=u):n?_.contains(r,u)||(r.push(u),s.push(l)):_.contains(s,l)||s.push(l)}return s},_.union=function(){return _.uniq(L(arguments,!0,!0))},_.intersection=function(t){if(null==t)return[];for(var e=[],n=arguments.length,i=0,s=t.length;s>i;i++){var r=t[i];if(!_.contains(e,r)){for(var o=1;n>o&&_.contains(arguments[o],r);o++);o===n&&e.push(r)}}return e},_.difference=function(t){var e=L(arguments,!0,!0,1);return _.filter(t,function(t){return!_.contains(e,t)})},_.zip=function(){return _.unzip(arguments)},_.unzip=function(t){for(var e=t&&_.max(t,"length").length||0,n=Array(e),i=0;e>i;i++)n[i]=_.pluck(t,i);return n},_.object=function(t,e){for(var n={},i=0,s=t&&t.length;s>i;i++)e?n[t[i]]=e[i]:n[t[i][0]]=t[i][1];return n},_.indexOf=function(t,e,n){var i=0,s=t&&t.length;if("number"==typeof n)i=0>n?Math.max(0,s+n):n;else if(n&&s)return i=_.sortedIndex(t,e),t[i]===e?i:-1;if(e!==e)return _.findIndex(h.call(t,i),_.isNaN);for(;s>i;i++)if(t[i]===e)return i;return-1},_.lastIndexOf=function(t,e,n){var i=t?t.length:0;if("number"==typeof n&&(i=0>n?i+n+1:Math.min(i,n+1)),e!==e)return _.findLastIndex(h.call(t,0,i),_.isNaN);for(;--i>=0;)if(t[i]===e)return i;return-1},_.findIndex=i(1),_.findLastIndex=i(-1),_.sortedIndex=function(t,e,n,i){n=b(n,i,1);for(var s=n(e),r=0,o=t.length;o>r;){var a=Math.floor((r+o)/2);n(t[a])<s?r=a+1:o=a}return r},_.range=function(t,e,n){arguments.length<=1&&(e=t||0,t=0),n=n||1;for(var i=Math.max(Math.ceil((e-t)/n),0),s=Array(i),r=0;i>r;r++,t+=n)s[r]=t;return s};var F=function(t,e,n,i,s){if(!(i instanceof e))return t.apply(n,s);var r=k(t.prototype),o=t.apply(r,s);return _.isObject(o)?o:r};_.bind=function(t,e){if(m&&t.bind===m)return m.apply(t,h.call(arguments,1));if(!_.isFunction(t))throw new TypeError("Bind must be called on a function");var n=h.call(arguments,2),i=function(){return F(t,i,e,this,n.concat(h.call(arguments)))};return i},_.partial=function(t){var e=h.call(arguments,1),n=function(){for(var i=0,s=e.length,r=Array(s),o=0;s>o;o++)r[o]=e[o]===_?arguments[i++]:e[o];for(;i<arguments.length;)r.push(arguments[i++]);return F(t,n,this,this,r)};return n},_.bindAll=function(t){var e,n,i=arguments.length;if(1>=i)throw new Error("bindAll must be passed function names");for(e=1;i>e;e++)n=arguments[e],t[n]=_.bind(t[n],t);return t},_.memoize=function(t,e){var n=function(i){var s=n.cache,r=""+(e?e.apply(this,arguments):i);return _.has(s,r)||(s[r]=t.apply(this,arguments)),s[r]};return n.cache={},n},_.delay=function(t,e){var n=h.call(arguments,2);return setTimeout(function(){return t.apply(null,n)},e)},_.defer=_.partial(_.delay,_,1),_.throttle=function(t,e,n){var i,s,r,o=null,a=0;n||(n={});var l=function(){a=n.leading===!1?0:_.now(),o=null,r=t.apply(i,s),o||(i=s=null)};return function(){var u=_.now();a||n.leading!==!1||(a=u);var c=e-(u-a);return i=this,s=arguments,0>=c||c>e?(o&&(clearTimeout(o),o=null),a=u,r=t.apply(i,s),o||(i=s=null)):o||n.trailing===!1||(o=setTimeout(l,c)),r}},_.debounce=function(t,e,n){var i,s,r,o,a,l=function(){var u=_.now()-o;e>u&&u>=0?i=setTimeout(l,e-u):(i=null,n||(a=t.apply(r,s),i||(r=s=null)))};return function(){r=this,s=arguments,o=_.now();var u=n&&!i;return i||(i=setTimeout(l,e)),u&&(a=t.apply(r,s),r=s=null),a}},_.wrap=function(t,e){return _.partial(e,t)},_.negate=function(t){return function(){return!t.apply(this,arguments)}},_.compose=function(){var t=arguments,e=t.length-1;return function(){for(var n=e,i=t[e].apply(this,arguments);n--;)i=t[n].call(this,i);return i}},_.after=function(t,e){return function(){return--t<1?e.apply(this,arguments):void 0}},_.before=function(t,e){var n;return function(){return--t>0&&(n=e.apply(this,arguments)),1>=t&&(e=null),n}},_.once=_.partial(_.before,2);var A=!{toString:null}.propertyIsEnumerable("toString"),U=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];_.keys=function(t){if(!_.isObject(t))return[];if(g)return g(t);var e=[];for(var n in t)_.has(t,n)&&e.push(n);return A&&s(t,e),e},_.allKeys=function(t){if(!_.isObject(t))return[];var e=[];for(var n in t)e.push(n);return A&&s(t,e),e},_.values=function(t){for(var e=_.keys(t),n=e.length,i=Array(n),s=0;n>s;s++)i[s]=t[e[s]];return i},_.mapObject=function(t,e,n){e=b(e,n);for(var i,s=_.keys(t),r=s.length,o={},a=0;r>a;a++)i=s[a],o[i]=e(t[i],i,t);return o},_.pairs=function(t){for(var e=_.keys(t),n=e.length,i=Array(n),s=0;n>s;s++)i[s]=[e[s],t[e[s]]];return i},_.invert=function(t){for(var e={},n=_.keys(t),i=0,s=n.length;s>i;i++)e[t[n[i]]]=n[i];return e},_.functions=_.methods=function(t){var e=[];for(var n in t)_.isFunction(t[n])&&e.push(n);return e.sort()},_.extend=E(_.allKeys),_.extendOwn=_.assign=E(_.keys),_.findKey=function(t,e,n){e=b(e,n);for(var i,s=_.keys(t),r=0,o=s.length;o>r;r++)if(i=s[r],e(t[i],i,t))return i},_.pick=function(t,e,n){var i,s,r={},o=t;if(null==o)return r;_.isFunction(e)?(s=_.allKeys(o),i=C(e,n)):(s=L(arguments,!1,!1,1),i=function(t,e,n){return e in n},o=Object(o));for(var a=0,l=s.length;l>a;a++){var u=s[a],c=o[u];i(c,u,o)&&(r[u]=c)}return r},_.omit=function(t,e,n){if(_.isFunction(e))e=_.negate(e);else{var i=_.map(L(arguments,!1,!1,1),String);e=function(t,e){return!_.contains(i,e)}}return _.pick(t,e,n)},_.defaults=E(_.allKeys,!0),_.clone=function(t){return _.isObject(t)?_.isArray(t)?t.slice():_.extend({},t):t},_.tap=function(t,e){return e(t),t},_.isMatch=function(t,e){var n=_.keys(e),i=n.length;if(null==t)return!i;for(var s=Object(t),r=0;i>r;r++){var o=n[r];if(e[o]!==s[o]||!(o in s))return!1}return!0};var O=function(t,e,n,i){if(t===e)return 0!==t||1/t===1/e;if(null==t||null==e)return t===e;t instanceof _&&(t=t._wrapped),e instanceof _&&(e=e._wrapped);var s=f.call(t);if(s!==f.call(e))return!1;switch(s){case"[object RegExp]":case"[object String]":return""+t==""+e;case"[object Number]":return+t!==+t?+e!==+e:0===+t?1/+t===1/e:+t===+e;case"[object Date]":case"[object Boolean]":return+t===+e}var r="[object Array]"===s;if(!r){if("object"!=typeof t||"object"!=typeof e)return!1;var o=t.constructor,a=e.constructor;if(o!==a&&!(_.isFunction(o)&&o instanceof o&&_.isFunction(a)&&a instanceof a)&&"constructor"in t&&"constructor"in e)return!1}n=n||[],i=i||[];for(var l=n.length;l--;)if(n[l]===t)return i[l]===e;if(n.push(t),i.push(e),r){if(l=t.length,l!==e.length)return!1;for(;l--;)if(!O(t[l],e[l],n,i))return!1}else{var u,c=_.keys(t);if(l=c.length,_.keys(e).length!==l)return!1;for(;l--;)if(u=c[l],!_.has(e,u)||!O(t[u],e[u],n,i))return!1}return n.pop(),i.pop(),!0};_.isEqual=function(t,e){return O(t,e)},_.isEmpty=function(t){return null==t?!0:x(t)&&(_.isArray(t)||_.isString(t)||_.isArguments(t))?0===t.length:0===_.keys(t).length},_.isElement=function(t){return!(!t||1!==t.nodeType)},_.isArray=p||function(t){return"[object Array]"===f.call(t)},_.isObject=function(t){var e=typeof t;return"function"===e||"object"===e&&!!t},_.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(t){_["is"+t]=function(e){return f.call(e)==="[object "+t+"]"}}),_.isArguments(arguments)||(_.isArguments=function(t){return _.has(t,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(_.isFunction=function(t){return"function"==typeof t||!1}),_.isFinite=function(t){return isFinite(t)&&!isNaN(parseFloat(t))},_.isNaN=function(t){return _.isNumber(t)&&t!==+t},_.isBoolean=function(t){return t===!0||t===!1||"[object Boolean]"===f.call(t)},_.isNull=function(t){return null===t},_.isUndefined=function(t){return void 0===t},_.has=function(t,e){return null!=t&&d.call(t,e)},_.noConflict=function(){return r._=o,this},_.identity=function(t){return t},_.constant=function(t){return function(){return t}},_.noop=function(){},_.property=function(t){return function(e){return null==e?void 0:e[t]}},_.propertyOf=function(t){return null==t?function(){}:function(e){return t[e]}},_.matcher=_.matches=function(t){return t=_.extendOwn({},t),function(e){return _.isMatch(e,t)}},_.times=function(t,e,n){var i=Array(Math.max(0,t));e=C(e,n,1);for(var s=0;t>s;s++)i[s]=e(s);return i},_.random=function(t,e){return null==e&&(e=t,t=0),t+Math.floor(Math.random()*(e-t+1))},_.now=Date.now||function(){return(new Date).getTime()};var S={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},N=_.invert(S),V=function(t){var e=function(e){return t[e]},n="(?:"+_.keys(t).join("|")+")",i=RegExp(n),s=RegExp(n,"g");return function(t){return t=null==t?"":""+t,i.test(t)?t.replace(s,e):t}};_.escape=V(S),_.unescape=V(N),_.result=function(t,e,n){var i=null==t?void 0:t[e];return void 0===i&&(i=n),_.isFunction(i)?i.call(t):i};var D=0;_.uniqueId=function(t){var e=++D+"";return t?t+e:e},_.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var j=/(.)^/,T={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},M=/\\|'|\r|\n|\u2028|\u2029/g,B=function(t){return"\\"+T[t]};_.template=function(t,e,n){!e&&n&&(e=n),e=_.defaults({},e,_.templateSettings);var i=RegExp([(e.escape||j).source,(e.interpolate||j).source,(e.evaluate||j).source].join("|")+"|$","g"),s=0,r="__p+='";t.replace(i,function(e,n,i,o,a){return r+=t.slice(s,a).replace(M,B),s=a+e.length,n?r+="'+\n((__t=("+n+"))==null?'':_.escape(__t))+\n'":i?r+="'+\n((__t=("+i+"))==null?'':__t)+\n'":o&&(r+="';\n"+o+"\n__p+='"),e}),r+="';\n",e.variable||(r="with(obj||{}){\n"+r+"}\n"),r="var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n"+r+"return __p;\n";try{var o=new Function(e.variable||"obj","_",r)}catch(a){throw a.source=r,a}var l=function(t){return o.call(this,t,_)},u=e.variable||"obj";return l.source="function("+u+"){\n"+r+"}",l},_.chain=function(t){var e=_(t);return e._chain=!0,e};var z=function(t,e){return t._chain?_(e).chain():e};_.mixin=function(t){_.each(_.functions(t),function(e){var n=_[e]=t[e];_.prototype[e]=function(){var t=[this._wrapped];return c.apply(t,arguments),z(this,n.apply(_,t))}})},_.mixin(_),_.each(["pop","push","reverse","shift","sort","splice","unshift"],function(t){var e=a[t];_.prototype[t]=function(){var n=this._wrapped;return e.apply(n,arguments),"shift"!==t&&"splice"!==t||0!==n.length||delete n[0],z(this,n)}}),_.each(["concat","join","slice"],function(t){var e=a[t];_.prototype[t]=function(){return z(this,e.apply(this._wrapped,arguments))}}),_.prototype.value=function(){return this._wrapped},_.prototype.valueOf=_.prototype.toJSON=_.prototype.value,_.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return _})}).call(this)},{}],6:[function(t,e){"use strict";var n=t("underscore"),i=t("./form-element");t("element-kit");var s=function(t){this.initialize(t)};s.prototype=n.extend({},i.prototype,{initialize:function(t){this.options=n.extend({inputs:[],onChange:null,containerClass:"ui-button-toggle",inputClass:"ui-button-toggle-input",selectedClass:"ui-button-toggle-selected",disabledClass:"ui-button-toggle-disabled"},t),i.prototype.initialize.call(this,this.options),this._container=this.options.container,!this.options.inputs.length&&this._container&&(this.options.inputs=this._container.querySelectorAll("input")),this.options.inputs.length?(this._formElements=Array.prototype.slice.call(this.options.inputs),this._UIElements=this._buildUIElements(this._formElements)):console.error("could not build toggle items: no toggle input items were passed"),this.setup()},setup:function(){this._triggerAll(function(t){t.kit.classList.add(this.options.inputClass)}.bind(this)),this._setupEvents()},_setupEvents:function(){this._triggerAll(function(t){t.kit.addEventListener("click","_onFormElementClick",this)}.bind(this))},getFormElements:function(){return this._formElements},getUIElements:function(){return this._UIElements},_triggerAll:function(t){var e,n=this.getFormElements(),i=this.getUIElements();for(e=0;e<n.length;e++)t(n[e],i[e],e)},_onFormElementClick:function(t){var e=t.currentTarget.getElementsByClassName(this.options.inputClass)[0],n=t.currentTarget.getElementsByClassName(this.options.containerClass)[0];t.currentTarget===t.target&&(e=t.target,n=t.target.parentElement,this._delegateClick(e,n))},_delegateClick:function(t,e){this.isRadio()?this._processRadioClick(t,e):this._processCheckboxClick(t,e)},_processRadioClick:function(t,e){this._lastRadioClicked!==t&&(this._triggerAll(function(t,e){e.kit.classList.remove(this.options.selectedClass),t.checked=!1}.bind(this)),this._onToggleSelect(t,e),this._lastRadioClicked=t)},_processCheckboxClick:function(t,e){e.kit.classList.contains(this.options.selectedClass)?this._onToggleDeselect(t,e):this._onToggleSelect(t,e)},_onToggleSelect:function(t,e){t.checked=!0,e.kit.classList.add(this.options.selectedClass),this._triggerChange(t,e)},_onToggleDeselect:function(t,e){t.checked=!1,e.kit.classList.remove(this.options.selectedClass),this._triggerChange(t,e)},_buildUIElements:function(t){var e,n,i,s=t.length,r=[];for(e=0;s>e;e++)n=t[e],i=n.kit.appendOuterHtml('<div class="'+this.options.containerClass+'"></div>'),n.checked&&i.kit.classList.add(this.options.selectedClass),n.disabled&&i.kit.classList.add(this.options.disabledClass),r.push(i);return r},isRadio:function(){return"radio"===this.getFormElements()[0].getAttribute("type")},_triggerChange:function(t,e){this.options.onChange&&this.options.onChange(t.value,t,e)},select:function(t){var e=this.getFormElement(t),n=this.getUIElement(t);e.checked||(e.checked=!0,n.kit.classList.add(this.options.selectedClass),this._triggerChange(e,n)),this.isRadio()&&this._triggerAll(function(t,e,n){t.checked||this.deselect(n)}.bind(this))},getValue:function(){var t=this.getFormElements().filter(function(t){return t.checked},this);return t.length?t[0].value:""},deselect:function(t){var e=this.getFormElement(t),n=this.getUIElement(t);n.kit.classList.remove(this.options.selectedClass),e.checked&&(e.checked=!1,this._triggerChange(e,n))},getFormElement:function(t){return this.getFormElements()[t||0]},getUIElement:function(t){return this.getUIElements()[t||0]},enable:function(){this._triggerAll(function(t,e){t.disabled=!1,e.kit.classList.remove(this.options.disabledClass)}.bind(this))},disable:function(){this._triggerAll(function(t,e){t.disabled=!0,e.kit.classList.add(this.options.disabledClass)}.bind(this))},getElementKey:function(){return this.isRadio()?"buttonToggleRadio":"buttonToggleCheckbox"},destroy:function(){this._triggerAll(function(t,e){e.parentNode.replaceChild(t,e),t.addEventListener("click","_onFormElementClick",this)}.bind(this)),i.prototype.destroy.call(this)}}),e.exports=s},{"./form-element":9,"element-kit":1,underscore:5}],7:[function(t,e){"use strict";var n=t("underscore"),i=t("./form-element");t("element-kit");var s=function(t){this.initialize(t)};s.prototype=n.extend({},i.prototype,{initialize:function(t){this.options=n.extend({el:null,onChecked:null,onUnchecked:null,containerClass:"ui-checkbox",inputClass:"ui-checkbox-input",checkedClass:"ui-checkbox-checked",disabledClass:"ui-checkbox-disabled"},t),this.el=this.options.el,"input"!==this.el.tagName.toLowerCase()&&console.warn("checkbox error: element passed in instantiation was not an input element"),i.prototype.initialize.call(this,this.options),this.setup()},setup:function(){var t=this.getFormElement();t.kit.classList.add(this.options.inputClass),this._container=this._buildUIElement(this.el),this.isInitChecked=t.checked,this.isInitChecked&&this._container.kit.classList.add(this.options.checkedClass),this.isInitDisabled=t.disabled,this.isInitDisabled&&this._container.kit.classList.add(this.options.disabledClass),this.getUIElement().kit.addEventListener("click","_onClick",this)},_onClick:function(){var t=this.getFormElement();t.disabled||(this.getUIElement().kit.classList.contains(this.options.checkedClass)?this.uncheck():this.check())},_buildUIElement:function(t){return t.kit.appendOuterHtml('<div class="'+this.options.containerClass+'"></div>')},check:function(){var t=this.getFormElement(),e=this.getUIElement();t.checked||(t.checked=!0),e.kit.classList.add(this.options.checkedClass),this.options.onChecked&&this.options.onChecked(t.value,t,e)},uncheck:function(){var t=this.getFormElement(),e=this.getUIElement();t.checked&&(t.checked=!1),e.kit.classList.remove(this.options.checkedClass),this.options.onUnchecked&&this.options.onUnchecked(t.value,t,e)},enable:function(){this.getFormElement().disabled=!1,this.getUIElement().kit.classList.remove(this.options.disabledClass)},disable:function(){this.getFormElement().disabled=!0,this.getUIElement().kit.classList.add(this.options.disabledClass)},getFormElement:function(){return this.el},getUIElement:function(){return this._container},getElementKey:function(){return"checkbox"},destroy:function(){var t=this.getUIElement(),e=this.getFormElement();t.kit.removeEventListener("click","_onClick",this),t.parentNode.replaceChild(e,t),this.isInitChecked&&(e.checked=!0),this.isInitDisabled&&(e.disabled=!0),i.prototype.destroy.call(this)}}),e.exports=s},{"./form-element":9,"element-kit":1,underscore:5}],8:[function(t,e){"use strict";var n=t("underscore"),i=t("./form-element");t("element-kit");var s=function(t){this.initialize(t)};s.prototype=n.extend({},i.prototype,{initialize:function(t){this.options=n.extend({el:null,onChange:null,autoSetup:!0,containerClass:"dropdown-container",optionsContainerClass:"dropdown-option-container",optionsContainerActiveClass:"dropdown-option-container-active",optionsClass:"dropdown-option",optionsSelectedClass:"dropdown-option-selected",selectedValueContainerClass:"dropdown-value-container",selectedValueContainerActiveClass:"dropdown-value-container-active",disabledClass:"dropdown-disabled"},t),i.prototype.initialize.call(this,this.options),this.options.autoSetup&&this.setup()},setup:function(){var t=this.options.el,e=t.querySelectorAll("option[selected]")[0];t.kit.addEventListener("change","_onSelectChange",this),t.insertAdjacentHTML("afterend",'<div class="'+this.options.containerClass+'">'+this._buildSelectedValueHtml()+this._buildOptionsHtml()+"</div>"),this._setupEvents(),e&&this._setUISelectedValue(e.value),this.getFormElement().disabled&&this.disable()},_setUISelectedValue:function(t){var e=this.getUIElement().getElementsByClassName(this.options.optionsContainerClass)[0],n=e.getElementsByClassName(this.options.optionsSelectedClass)[0],i=e.querySelectorAll("."+this.options.optionsClass+'[data-value="'+t+'"]')[0],s=this.options.optionsSelectedClass,r=this.getUIElement().getElementsByClassName(this.options.selectedValueContainerClass)[0];this.getFormElement().disabled||(r.setAttribute("data-value",t),r.innerHTML=i.textContent,n&&n.kit.classList.remove(s),i.kit.classList.add(s))},_setupEvents:function(){var t,e=this.getUIElement(),n=e.getElementsByClassName(this.options.selectedValueContainerClass)[0],i=e.getElementsByClassName(this.options.optionsClass),s=i.length;for(n.kit.addEventListener("click","_onClickUIValueContainer",this),t=0;s>t;t++)i[t].kit.addEventListener("click","_onClickUIOption",this)},_onClickUIValueContainer:function(){this.getUIElement().kit.classList.toggle(this.options.optionsContainerActiveClass)},_onClickUIOption:function(t){{var e=t.currentTarget,n=e.kit.dataset.value;e.textContent}this.getValue()!==n&&(this.setValue(n),this._setUISelectedValue(n))},_buildSelectedValueHtml:function(){return'<div class="'+this.options.selectedValueContainerClass+'" data-value=""></div>'},_buildOptionsHtml:function(){var t,e,n=this.options,i=document.createElement("div"),s='<div class="'+n.optionsContainerClass+'">',r=n.el.getElementsByTagName("option"),o=r.length,a="";for(i.kit.classList.add(n.optionsContainerClass),t=0;o>t;t++)e=r[t],a=e.hasAttribute("selected")?n.optionsSelectedClass:"",s+='<div class="'+n.optionsClass+" "+a+'" data-value="'+e.value+'">'+e.textContent+"</div>";

return s+="</div>"},_onSelectChange:function(t){var e=this.getValue();this._setUISelectedValue(e),this.options.onChange&&this.options.onChange(e,this.getFormElement(),this.getUIElement(),t)},getUIElement:function(){return this.getFormElement().nextSibling||this.getFormElement()},getOptionByDataValue:function(t){return this.options.el.querySelectorAll('option[value="'+t+'"]')[0]},getOptionByDisplayValue:function(t){var e,n,i=this.options.el.querySelectorAll("option"),s=i.length;for(e=0;s>e&&(n=i[e],n.textContent!==t);e++);return n},setValue:function(t){var e=this.getOptionByDataValue(this.getValue()),n=this.getOptionByDataValue(t),i=document.createEvent("HTMLEvents"),s=this.getFormElement();s.disabled||(i.initEvent("change",!1,!0),e&&e.removeAttribute("selected"),n?(n.setAttribute("selected","selected"),s.value=t,s.dispatchEvent(i)):console.warn("Form Dropdown Error: Cannot call setValue(), dropdown has no option element with a value attribute of "+t+"."),this._setUISelectedValue(t))},disable:function(){this.getUIElement().kit.classList.add(this.options.disabledClass),this.getFormElement().disabled=!0},enable:function(){this.getUIElement().kit.classList.remove(this.options.disabledClass),this.getFormElement().disabled=!1},getDisplayValue:function(){return this.getOptionByDataValue(this.getValue()).textContent},destroy:function(){var t=this.options.el;t.kit.removeEventListener("change","_onSelectChange",this),t.style.display=this._origDisplayValue}}),e.exports=s},{"./form-element":9,"element-kit":1,underscore:5}],9:[function(t,e){"use strict";t("underscore");t("element-kit");var n=function(t){this.initialize(t)};n.prototype={initialize:function(t){this.options=t||{}},getFormElement:function(){return this.options.el},getUIElement:function(){return this.getFormElement()},getFormElements:function(){return[this.getFormElement()]},getValue:function(){return this.getFormElement().value},getUIElements:function(){return[this.getUIElement()]},enable:function(){this.getFormElement().disabled=!1},disable:function(){this.getFormElement().disabled=!0},getElementKey:function(){return"element"},destroy:function(){}},e.exports=n},{"element-kit":1,underscore:5}],10:[function(t,e){"use strict";{var n=t("underscore"),i=t("./dropdown"),s=t("./input-field"),r=t("./checkbox");t("./button-toggle")}t("element-kit");var o=function(t){this.initialize(t)};o.prototype={initialize:function(t){this.options=n.extend({el:null,onValueChange:null,onGetOptions:null,dropdownClass:null,checkboxClass:null,inputFieldClass:null},t),this.options=t,this.formEls=this.options.el.elements,this._formInstances=[]},setup:function(){this._setupInstances(this.options.dropdownClass,i),this._setupInstances(this.options.checkboxClass,r),this._setupInstances(this.options.inputFieldClass,s)},_setupInstances:function(t,e,n,i){var s,r,o,a=this.options.el.getElementsByClassName(t),l=a.length,u={};if(l)for(i=i||"el",s=0;l>s;s++)o=a[s],u=this._buildOptions(o,n),u[i]=o,r=new e(u),this._formInstances.push(r)},getInstanceByName:function(t){var e,n;for(e=0;e<this._formInstances.length&&(n=this._formInstances[e],n.getFormElement().name!==t);e++);return n},_buildOptions:function(t,e){return e=e||{},this.options.onGetOptions&&(e=n.extend({},e,this.options.onGetOptions(t))),e.onChange=function(t,e,n){this._onValueChange(t,e,n)}.bind(this),e},_onValueChange:function(t,e,n){this.options.onValueChange&&this.options.onValueChange(t,e,n),this.options.onChange&&this.options.onChange(t,e,n)},disable:function(){var t,e=this.formEls;for(this.setPropertyAll("disabled",!0),t=0;t<e.length;t++)e[t].kit.classList.add("disabled")},enable:function(){var t,e=this.formEls;for(this.setPropertyAll("disabled",!1),t=0;t<e.length;t++)e[t].kit.classList.remove("disabled")},setPropertyAll:function(t,e){var n,i=this.formEls;for(n=0;n<i.length;n++)i[n][t]=e},getCurrentValues:function(){var t,e,n,i=[],s=this.options.el.querySelectorAll("[name]"),r=s.length;for(t=0;r>t;t++)e=s[t],e.name&&(n={name:e.name,value:e.value},i.push(n));return i},destroy:function(){var t,e=this._formInstances,n=e.length;for(t=0;n>t;t++)this._formInstances[t].destroy()}},e.exports=o},{"./button-toggle":6,"./checkbox":7,"./dropdown":8,"./input-field":11,"element-kit":1,underscore:5}],11:[function(t,e){"use strict";var n=t("underscore"),i=t("./form-element");t("element-kit");var s=function(t){this.initialize(t)};s.prototype=n.extend({},i.prototype,{initialize:function(t){this.options=n.extend({el:null,onChange:null,onKeyDownChange:null,containerClass:"ui-input-text",inputClass:"ui-input-text-input",disabledClass:"ui-input-text-disabled",activeClass:"ui-input-text-active"},t),i.prototype.initialize.call(this,this.options),this.setup()},setup:function(){var t=this.options.el;t.kit.classList.add(this.options.inputClass),this._container=this._buildUIElement(t),this._inputEl=this._container.getElementsByClassName(this.options.inputClass)[0],this.origInputValue=t.value,this.isInitDisabled=t.disabled,this.isInitDisabled&&this._container.kit.classList.add(this.options.disabledClass),this._bindEvents()},_bindEvents:function(){var t=this.getFormElement();t.kit.addEventListener("focus","_onInputFocus",this),t.kit.addEventListener("blur","_onInputBlur",this),t.kit.addEventListener("change","_onInputValueChange",this),t.kit.addEventListener("keydown","_onInputKeyDown",this)},_unbindEvents:function(){var t=this.getFormElement();t.kit.removeEventListener("focus","_onInputFocus",this),t.kit.removeEventListener("blur","_onInputBlur",this),t.kit.removeEventListener("change","_onInputValueChange",this),t.kit.removeEventListener("keydown","_onInputKeyDown",this)},_onInputKeyDown:function(t){this.keyDownTimeoutId&&clearTimeout(this.keyDownTimeoutId),this.keyDownTimeoutId=setTimeout(this._triggerKeyDownChange.bind(this,t),1)},_triggerKeyDownChange:function(t){this.options.onKeyDownChange&&this.options.onKeyDownChange(this.getFormElement(),this.getUIElement(),t)},setValue:function(t){var e=this.getFormElement(),n=e.value;t!==n&&(this.getFormElement().value=t,this._triggerChange())},getValue:function(){return this.getFormElement().value},_buildUIElement:function(t){return t.kit.appendOuterHtml('<div class="'+this.options.containerClass+'"></div>')},_onInputFocus:function(){this.getUIElement().kit.classList.add(this.options.activeClass)},_onInputBlur:function(){this.getUIElement().kit.classList.remove(this.options.activeClass)},_triggerChange:function(t){var e=[this.getValue(),this.getFormElement(),this.getUIElement()];t&&e.push(t),this.options.onChange&&this.options.onChange.apply(this,e)},_onInputValueChange:function(t){this._triggerChange(t)},getFormElement:function(){return this._inputEl},getUIElement:function(){return this._container},enable:function(){this.getFormElement().removeAttribute("disabled"),this.getUIElement().kit.classList.remove(this.options.disabledClass)},disable:function(){this.getFormElement().setAttribute("disabled","true"),this.getUIElement().kit.classList.add(this.options.disabledClass)},getElementKey:function(){return"inputText"},destroy:function(){var t=this.getUIElement(),e=this.getFormElement();this._unbindEvents(),t.parentNode.replaceChild(e,t),this.isInitDisabled&&e.setAttribute("disabled","true"),this.setValue(this.origInputValue),i.prototype.destroy.call(this)}}),e.exports=s},{"./form-element":9,"element-kit":1,underscore:5}]},{},[10]);