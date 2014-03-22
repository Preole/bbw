

var obj_ = (function ()
{
 var hasOwn = Object.prototype.hasOwnProperty;
 
 function obj_keys(obj)
 {
  var keys = [];
  for (var each in obj)
  {
   if (hasOwn.call(obj, each)) {keys.push(each);}
  }
  return keys;
 }

 return {
  keys : obj_keys
 };
}());





/* requires obj_.js */

var str_ = (function()
{
 var WS =
   "[ \\u2000-\\u200d\\t\\u202f\\u205f\\u3000\\u1680" +
   "\\u180e\\u00a0\\u00b7\\u237d\\u2420\\u2422\\u2423]",
  NL = "[\\v\\f\\r\\n\\u0085\\u2028\\u2029]",
  REGEX_NL_G = new RegExp(NL, "g"),
  REGEX_WS_WS_G = new RegExp(WS + WS + "+", "g");

 //String tokenization by line. Returns an unsorted array of string values.
 function str_lines(str, titleize, ignoreBlanks, unique)
 {
  REGEX_NL_G.lastIndex = 0;
  var lines = str.split(REGEX_NL_G), obj = {}, arr = [], i = 0, ii = 0;


  for (i = 0, ii = lines.length; i < ii && titleize; i += 1)
  {
   lines[i] = str_titleize(lines[i]); //forEach
  }
  if (ignoreBlanks)
  {
   for (i = 0, ii = lines.length; i < ii; i += 1)
   {
    if (!/^\s*$/.test(lines[i])) {arr.push(lines[i]);} //Filter
   }
   lines = arr;
  }
  if (unique)
  {
   for (i = 0, ii = lines.length; i < ii; i += 1)
   {
    obj[lines[i]] = 1;
   }
   lines = obj_.keys(obj);
  }
  return lines;
 }

 function str_hasSubstr(str, substr, caseSense)
 {
  if (caseSense) {return str.indexOf(substr) >= 0;}
  return str.toLocaleLowerCase().indexOf(substr.toLocaleLowerCase()) >= 0;
 }

 function str_hasSubstrArray(arr, substr, caseSense)
 {
  for (var i = 0, ii = arr.length; i < ii; i += 1)
  {
   if (str_hasSubstr(arr[i], substr, caseSense)) {return true;}
  }
  return false;
 }

 function str_trim(str)
 {
  return str.replace(/(^\s+)|(\s+$)/g, "");
 }

 //Trims, turns double spaces into one ASCII space, removes all line breaks.
 function str_titleize(str)
 {
  REGEX_WS_WS_G.lastIndex = 0;
  REGEX_NL_G.lastIndex = 0;
  return str_trim(str.replace(REGEX_WS_WS_G, " ").replace(REGEX_NL_G, ""));
 }

 function str_words(str)
 {
  return str.split(/\s+/g);
 }

 return {
  hasSubstr : str_hasSubstr,
  hasSubstrArray : str_hasSubstrArray,
  trim : str_trim,
  lines : str_lines,
  titleize : str_titleize,
  words : str_words
 };
}());




/*! jQuery v1.11.0 -deferred,-ajax,-ajax/jsonp,-ajax/load,-ajax/parseJSON,-ajax/parseXML,-ajax/script,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-effects,-effects/animatedSelector,-effects/support,-effects/Tween,-core/ready,-serialize,-event-alias,-callbacks,-queue,-queue/delay,-forms,-deprecated,-exports/amd,-css,-css/addGetHookIf,-css/curCSS,-css/defaultDisplay,-css/hiddenVisibleSelectors,-css/support,-css/swap,-css/var/cssExpand,-css/var/isHidden,-css/var/rmargin,-css/var/rnumnonpx,-dimensions,-offset | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m="1.11.0 -deferred,-ajax,-ajax/jsonp,-ajax/load,-ajax/parseJSON,-ajax/parseXML,-ajax/script,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-effects,-effects/animatedSelector,-effects/support,-effects/Tween,-core/ready,-serialize,-event-alias,-callbacks,-queue,-queue/delay,-forms,-deprecated,-exports/amd,-css,-css/addGetHookIf,-css/curCSS,-css/defaultDisplay,-css/hiddenVisibleSelectors,-css/support,-css/swap,-css/var/cssExpand,-css/var/isHidden,-css/var/rmargin,-css/var/rnumnonpx,-dimensions,-offset",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(n.isPlainObject(c)||(b=n.isArray(c)))?(b?(b=!1,f=a&&n.isArray(a)?a:[]):f=a&&n.isPlainObject(a)?a:{},g[d]=n.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray||function(a){return"array"===n.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(l.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&n.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:k&&!k.call("\ufeff\xa0")?function(a){return null==a?"":k.call(a)}:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),n.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||n.guid++,e):void 0},now:function(){return+new Date},support:l}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return n.inArray(a,b)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;e>b;b++)if(n.contains(d[b],this))return!0}));for(b=0;e>b;b++)n.find(a,d[b],c);return c=this.pushStack(e>1?n.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=a.document,A=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,B=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:A.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:z,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=z.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return y.find(a);this.length=1,this[0]=d}return this.context=z,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};B.prototype=n.fn,y=n(z);var C=/^(?:parents|prev(?:Until|All))/,D={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!n(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b,c=n(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(n.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?n.inArray(this[0],n(a)):n.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function E(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return E(a,"nextSibling")},prev:function(a){return E(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return n.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(D[a]||(e=n.unique(e)),C.test(a)&&(e=e.reverse())),this.pushStack(e)}});var F=/\S+/g,G="undefined",H;for(H in n(l))break;l.ownLast="0"!==H,l.inlineBlockNeedsLayout=!1,n(function(){var a,b,c=z.getElementsByTagName("body")[0];c&&(a=z.createElement("div"),a.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",b=z.createElement("div"),c.appendChild(a).appendChild(b),typeof b.style.zoom!==G&&(b.style.cssText="border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1",(l.inlineBlockNeedsLayout=3===b.offsetWidth)&&(c.style.zoom=1)),c.removeChild(a),a=b=null)}),function(){var a=z.createElement("div");if(null==l.deleteExpando){l.deleteExpando=!0;try{delete a.test}catch(b){l.deleteExpando=!1}}a=null}(),n.acceptData=function(a){var b=n.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var I=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,J=/([A-Z])/g;function K(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(J,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:I.test(c)?n.parseJSON(c):c}catch(e){}n.data(a,b,c)}else c=void 0}return c}function L(a){var b;for(b in a)if(("data"!==b||!n.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function M(a,b,d,e){if(n.acceptData(a)){var f,g,h=n.expando,i=a.nodeType,j=i?n.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||n.guid++:h),j[k]||(j[k]=i?{}:{toJSON:n.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=n.extend(j[k],b):j[k].data=n.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[n.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[n.camelCase(b)])):f=g,f}}function N(a,b,c){if(n.acceptData(a)){var d,e,f=a.nodeType,g=f?n.cache:a,h=f?a[n.expando]:n.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){n.isArray(b)?b=b.concat(n.map(b,n.camelCase)):b in d?b=[b]:(b=n.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!L(d):!n.isEmptyObject(d))return}(c||(delete g[h].data,L(g[h])))&&(f?n.cleanData([a],!0):l.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}n.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?n.cache[a[n.expando]]:a[n.expando],!!a&&!L(a)},data:function(a,b,c){return M(a,b,c)},removeData:function(a,b){return N(a,b)},_data:function(a,b,c){return M(a,b,c,!0)},_removeData:function(a,b){return N(a,b,!0)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=n.data(f),1===f.nodeType&&!n._data(f,"parsedAttrs"))){c=g.length;while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),K(f,d,e[d]));n._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){n.data(this,a)}):arguments.length>1?this.each(function(){n.data(this,a,b)}):f?K(f,a,n.data(f,a)):void 0},removeData:function(a){return this.each(function(){n.removeData(this,a)})}});var O=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,P=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},Q=/^(?:checkbox|radio)$/i;!function(){var a=z.createDocumentFragment(),b=z.createElement("div"),c=z.createElement("input");if(b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a>",l.leadingWhitespace=3===b.firstChild.nodeType,l.tbody=!b.getElementsByTagName("tbody").length,l.htmlSerialize=!!b.getElementsByTagName("link").length,l.html5Clone="<:nav></:nav>"!==z.createElement("nav").cloneNode(!0).outerHTML,c.type="checkbox",c.checked=!0,a.appendChild(c),l.appendChecked=c.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,a.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,l.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){l.noCloneEvent=!1}),b.cloneNode(!0).click()),null==l.deleteExpando){l.deleteExpando=!0;try{delete b.test}catch(d){l.deleteExpando=!1}}a=b=c=null}(),function(){var b,c,d=z.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(l[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),l[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var R=/^(?:input|select|textarea)$/i,S=/^key/,T=/^(?:mouse|contextmenu)|click/,U=/^(?:focusinfocus|focusoutblur)$/,V=/^([^.]*)(?:\.(.+)|)$/;
function W(){return!0}function X(){return!1}function Y(){try{return z.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=n.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof n===G||a&&n.event.triggered===a.type?void 0:n.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(F)||[""],h=b.length;while(h--)f=V.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=n.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=n.event.special[o]||{},l=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},i),(m=g[o])||(m=g[o]=[],m.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,l):m.push(l),n.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n.hasData(a)&&n._data(a);if(r&&(k=r.events)){b=(b||"").match(F)||[""],j=b.length;while(j--)if(h=V.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=m.length;while(f--)g=m[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g));i&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(k)&&(delete r.handle,n._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,m,o=[d||z],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||z,3!==d.nodeType&&8!==d.nodeType&&!U.test(p+n.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[n.expando]?b:new n.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),k=n.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!n.isWindow(d)){for(i=k.delegateType||p,U.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||z)&&o.push(l.defaultView||l.parentWindow||a)}m=0;while((h=o[m++])&&!b.isPropagationStopped())b.type=m>1?i:k.bindType||p,f=(n._data(h,"events")||{})[b.type]&&n._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&n.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&n.acceptData(d)&&g&&d[p]&&!n.isWindow(d)){l=d[g],l&&(d[g]=null),n.event.triggered=p;try{d[p]()}catch(r){}n.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(n._data(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((n.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?n(c,this).index(i)>=0:n.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=T.test(e)?this.mouseHooks:S.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||z),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||z,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==Y()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===Y()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=z.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===G&&(a[d]=null),a.detachEvent(d,c))},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&(a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault())?W:X):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:X,isPropagationStopped:X,isImmediatePropagationStopped:X,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=W,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=W,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=W,this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.submitBubbles||(n.event.special.submit={setup:function(){return n.nodeName(this,"form")?!1:void n.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=n.nodeName(b,"input")||n.nodeName(b,"button")?b.form:void 0;c&&!n._data(c,"submitBubbles")&&(n.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),n._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&n.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return n.nodeName(this,"form")?!1:void n.event.remove(this,"._submit")}}),l.changeBubbles||(n.event.special.change={setup:function(){return R.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(n.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),n.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),n.event.simulate("change",this,a,!0)})),!1):void n.event.add(this,"beforeactivate._change",function(a){var b=a.target;R.test(b.nodeName)&&!n._data(b,"changeBubbles")&&(n.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||n.event.simulate("change",this.parentNode,a,!0)}),n._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return n.event.remove(this,"._change"),!R.test(this.nodeName)}}),l.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=n._data(d,b);e||d.addEventListener(a,c,!0),n._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=n._data(d,b)-1;e?n._data(d,b,e):(d.removeEventListener(a,c,!0),n._removeData(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=X;else if(!d)return this;return 1===e&&(g=d,d=function(a){return n().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=X),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});function Z(a){var b=$.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var $="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",_=/ jQuery\d+="(?:null|\d+)"/g,ab=new RegExp("<(?:"+$+")[\\s/>]","i"),bb=/^\s+/,cb=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,db=/<([\w:]+)/,eb=/<tbody/i,fb=/<|&#?\w+;/,gb=/<(?:script|style|link)/i,hb=/checked\s*(?:[^=]|=\s*.checked.)/i,ib=/^$|\/(?:java|ecma)script/i,jb=/^true\/(.*)/,kb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,lb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:l.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},mb=Z(z),nb=mb.appendChild(z.createElement("div"));lb.optgroup=lb.option,lb.tbody=lb.tfoot=lb.colgroup=lb.caption=lb.thead,lb.th=lb.td;function ob(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==G?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==G?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||n.nodeName(d,b)?f.push(d):n.merge(f,ob(d,b));return void 0===b||b&&n.nodeName(a,b)?n.merge([a],f):f}function pb(a){Q.test(a.type)&&(a.defaultChecked=a.checked)}function qb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function rb(a){return a.type=(null!==n.find.attr(a,"type"))+"/"+a.type,a}function sb(a){var b=jb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function tb(a,b){for(var c,d=0;null!=(c=a[d]);d++)n._data(c,"globalEval",!b||n._data(b[d],"globalEval"))}function ub(a,b){if(1===b.nodeType&&n.hasData(a)){var c,d,e,f=n._data(a),g=n._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)n.event.add(b,c,h[c][d])}g.data&&(g.data=n.extend({},g.data))}}function vb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!l.noCloneEvent&&b[n.expando]){e=n._data(b);for(d in e.events)n.removeEvent(b,d,e.handle);b.removeAttribute(n.expando)}"script"===c&&b.text!==a.text?(rb(b).text=a.text,sb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),l.html5Clone&&a.innerHTML&&!n.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&Q.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}n.extend({clone:function(a,b,c){var d,e,f,g,h,i=n.contains(a.ownerDocument,a);if(l.html5Clone||n.isXMLDoc(a)||!ab.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(nb.innerHTML=a.outerHTML,nb.removeChild(f=nb.firstChild)),!(l.noCloneEvent&&l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(d=ob(f),h=ob(a),g=0;null!=(e=h[g]);++g)d[g]&&vb(e,d[g]);if(b)if(c)for(h=h||ob(a),d=d||ob(f),g=0;null!=(e=h[g]);g++)ub(e,d[g]);else ub(a,f);return d=ob(f,"script"),d.length>0&&tb(d,!i&&ob(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k,m=a.length,o=Z(b),p=[],q=0;m>q;q++)if(f=a[q],f||0===f)if("object"===n.type(f))n.merge(p,f.nodeType?[f]:f);else if(fb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(db.exec(f)||["",""])[1].toLowerCase(),k=lb[i]||lb._default,h.innerHTML=k[1]+f.replace(cb,"<$1></$2>")+k[2],e=k[0];while(e--)h=h.lastChild;if(!l.leadingWhitespace&&bb.test(f)&&p.push(b.createTextNode(bb.exec(f)[0])),!l.tbody){f="table"!==i||eb.test(f)?"<table>"!==k[1]||eb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)n.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}n.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),l.appendChecked||n.grep(ob(p,"input"),pb),q=0;while(f=p[q++])if((!d||-1===n.inArray(f,d))&&(g=n.contains(f.ownerDocument,f),h=ob(o.appendChild(f),"script"),g&&tb(h),c)){e=0;while(f=h[e++])ib.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=n.expando,j=n.cache,k=l.deleteExpando,m=n.event.special;null!=(d=a[h]);h++)if((b||n.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)m[e]?n.event.remove(d,e):n.removeEvent(d,e,g.handle);j[f]&&(delete j[f],k?delete d[i]:typeof d.removeAttribute!==G?d.removeAttribute(i):d[i]=null,c.push(f))}}}),n.fn.extend({text:function(a){return P(this,function(a){return void 0===a?n.text(this):this.empty().append((this[0]&&this[0].ownerDocument||z).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=qb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=qb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(ob(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&tb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&n.cleanData(ob(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&n.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return P(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(_,""):void 0;if(!("string"!=typeof a||gb.test(a)||!l.htmlSerialize&&ab.test(a)||!l.leadingWhitespace&&bb.test(a)||lb[(db.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(cb,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,o=k-1,p=a[0],q=n.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&hb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(i=n.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=n.map(ob(i,"script"),rb),f=g.length;k>j;j++)d=i,j!==o&&(d=n.clone(d,!0,!0),f&&n.merge(g,ob(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,n.map(g,sb),j=0;f>j;j++)d=g[j],ib.test(d.type||"")&&!n._data(d,"globalEval")&&n.contains(h,d)&&(d.src?n._evalUrl&&n._evalUrl(d.src):n.globalEval((d.text||d.textContent||d.innerHTML||"").replace(kb,"")));i=c=null}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=0,e=[],g=n(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),n(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}}),function(){var a,b,c,d,e=z.createElement("div");e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=e.getElementsByTagName("a")[0],c=z.createElement("select"),d=c.appendChild(z.createElement("option")),b=e.getElementsByTagName("input")[0],a.style.cssText="top:1px",l.getSetAttribute="t"!==e.className,l.style=/top/.test(a.getAttribute("style")),l.hrefNormalized="/a"===a.getAttribute("href"),l.checkOn=!!b.value,l.optSelected=d.selected,l.enctype=!!z.createElement("form").enctype,c.disabled=!0,l.optDisabled=!d.disabled,b=z.createElement("input"),b.setAttribute("value",""),l.input=""===b.getAttribute("value"),b.value="t",b.setAttribute("type","radio"),l.radioValue="t"===b.value,a=b=c=d=e=null}();var wb=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(wb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.text(a)}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)if(d=e[g],n.inArray(n.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var xb,yb,zb=n.expr.attrHandle,Ab=/^(?:checked|selected)$/i,Bb=l.getSetAttribute,Cb=l.input;n.fn.extend({attr:function(a,b){return P(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===G?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?yb:xb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(F);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)?Cb&&Bb||!Ab.test(c)?a[d]=!1:a[n.camelCase("default-"+c)]=a[d]=!1:n.attr(a,c,""),a.removeAttribute(Bb?c:d)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),yb={set:function(a,b,c){return b===!1?n.removeAttr(a,c):Cb&&Bb||!Ab.test(c)?a.setAttribute(!Bb&&n.propFix[c]||c,c):a[n.camelCase("default-"+c)]=a[c]=!0,c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=zb[b]||n.find.attr;zb[b]=Cb&&Bb||!Ab.test(b)?function(a,b,d){var e,f;return d||(f=zb[b],zb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,zb[b]=f),e}:function(a,b,c){return c?void 0:a[n.camelCase("default-"+b)]?b.toLowerCase():null}}),Cb&&Bb||(n.attrHooks.value={set:function(a,b,c){return n.nodeName(a,"input")?void(a.defaultValue=b):xb&&xb.set(a,b,c)}}),Bb||(xb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},zb.id=zb.name=zb.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},n.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:xb.set},n.attrHooks.contenteditable={set:function(a,b,c){xb.set(a,""===b?!1:b,c)}},n.each(["width","height"],function(a,b){n.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),l.style||(n.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var Db=/^(?:input|select|textarea|button|object)$/i,Eb=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return P(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return a=n.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):Db.test(a.nodeName)||Eb.test(a.nodeName)&&a.href?0:-1}}}}),l.hrefNormalized||n.each(["href","src"],function(a,b){n.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this}),l.enctype||(n.propFix.enctype="encoding");var Fb=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(F)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(Fb," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(F)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(Fb," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(F)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===G||"boolean"===c)&&(this.className&&n._data(this,"__className__",this.className),this.className=this.className||a===!1?"":n._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(Fb," ").indexOf(b)>=0)return!0;return!1}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),n.fn.extend({wrapAll:function(a){if(n.isFunction(a))return this.each(function(b){n(this).wrapAll(a.call(this,b))});if(this[0]){var b=n(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||z;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Gb=a.jQuery,Hb=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Hb),b&&a.jQuery===n&&(a.jQuery=Gb),n},typeof b===G&&(a.jQuery=a.$=n),n});
//# sourceMappingURL=jquery.min.map



/* requires ./lib/str_.js */
/* requires ./lib/obj_.js */
/* requires ./lib/jquery.min.js */

var DB = (function ()
{
 var utc =
 {
  ms : 1,
  sec : 1000,
  min : 1000 * 60,
  hour : 1000 * 60 * 60,
  day : 1000 * 60 * 60 * 24,
  month : 1000 * 60 * 60 * 24 * 31,
  year : 1000 * 60 * 60 * 24 * 31 * 12,
  now : function() {return Date.now() || (new Date()).getTime();}
 },
 
 hasOwn = Object.prototype.hasOwnProperty,
 defCfg =
 {
  "title": "BareBonesWiki",
  "startup": [
   "BareBonesWiki"
  ],
  "cfmDel": false,
  "cfmNav": false,
  "searchCase": false
 },

 //Persistent models.
 NODES = null,
 EDGES = null,
 CONFIG = null,

 //Indices
 TAGTITLE = null,
 TITLES = null,
 EDITED = null,
 CREATED = null,
 ORPHAN = null,
 MIME = null,
 BACKLINKS = null,
 HAS_EDITED = false,
 d = new Date(),
 newName = (function (){
  var i = 0;
  
  function iterate()
  {
   return "New Entry " + (i += 1);
  }
  
  return function ()
  {
   var defTitle = iterate();
   while (NODES[defTitle])
   {
    defTitle = iterate();
   }
   return defTitle;
  };
 }());

 function truncate(num, unit) {return (num - (num % unit));}
 function remainder(num, unit) {return (num % unit);}

 //String x4
 function WikiNode(title, src, tags, mime)
 {
  var obj = {}, now = utc.now();
 
  obj.title = str_.titleize(title);
  obj.src = src;
  obj.tags = str_.lines(tags, 1, 1, 1);
  obj.mime = str_.titleize(mime.toLocaleLowerCase());
  obj.created = now;
  obj.edited = now;
 
  if (obj.title.length <= 0) 
  {
   obj.title = newName();
  }
  if (obj.tags.length <= 0) 
  {
   obj.tags = ["Uncategorized"];
  }
  if (obj.mime.length <= 0) 
  {
   obj.mime = "text/x-bbm";
  }
  return obj;
 }

 /*
 [
  {
   key : "Tag1",
   vals : ["t1", "t2"]...
  },
  {
   key : "Tag2",
   vals : ["t1", "t2"]...
  }
 ]
 */
 function buildTagTitle()
 {
  var tagTitleMap = {};
  for (var title in NODES)
  {
   for (var i = 0, ii = NODES[title].tags.length; i < ii; i += 1)
   {
    var tag = NODES[title].tags[i];
    if (!hasOwn.call(tagTitleMap, tag)) {tagTitleMap[tag] = [];}
    tagTitleMap[tag].push(title);
   }
  }

  var keyList = obj_.keys(tagTitleMap).sort();
  TAGTITLE = [];
  for (var j = 0, jj = keyList.length; j < jj; j += 1)
  {
   TAGTITLE.push({
    key : keyList[j],
    vals : tagTitleMap[keyList[j]].sort()
   });
  }
 }

 function buildTitleList()
 {
  TITLES = obj_.keys(NODES).sort();
 }

 function buildOrphanList()
 {
  var nodes = {};
  for (var title in NODES) {nodes[title] = 1;}
  for (var src in EDGES)
  {
   var dests = EDGES[src];
   for (var dest in dests) {delete nodes[dest];}
  }
  ORPHAN = obj_.keys(nodes).sort();
 }

 /*
 [
  {
   key : "SourceTitle",
   vals : ["t1", "t2"]...
  }
 ]
 */
 function buildBackLinks()
 {
  var back = {};
  for (var src in EDGES)
  {
   var dests = EDGES[src];
   for (var dest in dests)
   {
    if (!hasOwn.call(back, dest)) {back[dest] = [];}
    back[dest].push(src);
   }
  }
 
  BACKLINKS = [];
  var destList = obj_.keys(back).sort();
  for (var i = 0, ii = destList.length; i < ii; i += 1)
  {
   BACKLINKS.push({
    key : destList[i],
    vals : back[destList[i]].sort()
   });
  }
 }

 /*
 [
  {
   key : "text/plain",
   vals : ["t1", "t2"]...
  }
 ]
 */
 function buildMime()
 {
  var mimeMap = {};
  for (var title in NODES)
  {
   var mimeStr = NODES[title].mime || "text/plain";
   if (!hasOwn.call(mimeMap, title)) {mimeMap[mimeStr] = [];}
   mimeMap[mimeStr].push(title);
  }
  
  MIME = [];
  var mimeList = obj_.keys(mimeMap).sort();
  for (var i = 0, ii = mimeList.length; i < ii; i += 1)
  {
   MIME.push({
    key : mimeList[i],
    vals : mimeMap[mimeList[i]].sort()
   });
  }
 }

 /*
 [
  {
   key : "October 21st, 2011",
   vals : ["Title", "Title2"]...
  }
 ]

 If edited = true, sort by last-edited date; creation date O/W.
 */
 function buildCreated(edited)
 {
  var propStr = edited ? "edited" : "created",
   wNodes = [];

  for (var title in NODES) {wNodes.push(NODES[title]);}
  wNodes.sort(
   function(t1, t2) {return (t2[propStr] - t1[propStr]);}
  );
  
  var outList = [];
  var ms = 0;
  for (var i = 0, ii = wNodes.length; i < ii; i += 1)
  {
   var ms_day = truncate(wNodes[i][propStr], utc.day);
   var ms_day_r = remainder(wNodes[i][propStr], utc.day);
   if (ms !== ms_day)
   {
    ms = ms_day;
    d.setTime(ms_day + ms_day_r);
    outList.push({
     key : d.toLocaleDateString(),
     vals : [wNodes[i].title]
    });
   }
   else {outList[outList.length - 1].vals.push(wNodes[i].title);}
  }
  if (edited) {EDITED = outList;}
  else {CREATED = outList;}
 }

 //On (C), R, (U), (D) operations, invalidate indices.
 function nullifyCache(isEdit)
 {
  TAGTITLE = null;
  TITLES = null;
  EDITED = null;
  CREATED = null;
  ORPHAN = null;
  BACKLINKS = null;
  MIME = null;
  HAS_EDITED = HAS_EDITED || !isEdit;
 }

 /*
 Establishes outgoing edges from one node onto a set of other nodes.

 Param:
  srcTitle (String) //The source node by title.
  destTitles ({String : 1}) //A set of destinations nodes by title.
 */
 function setEdge(srcTitle, destTitles)
 {
  if (!hasOwn.call(NODES, srcTitle)) {return;}
  
  var edgeSet = destTitles || {};
  delete EDGES[srcTitle];
  delete edgeSet[srcTitle];
  
  for (var key in edgeSet)
  {
   delete edgeSet[key];
   edgeSet[str_.titleize(key)] = 1;
  }

  if (!$.isEmptyObject(edgeSet))
  {
   EDGES[srcTitle] = edgeSet;
  }
 }

 function setNode(wNode)
 {
  NODES[wNode.title] = wNode;
 }

 function api_rm(title)
 {
  delete EDGES[title];
  delete NODES[title];
  nullifyCache();
 }
 
 function api_getNull(title)
 {
  return NODES[title] ||
  WikiNode(title, "\"" + title + "\" does not exist.", "", "");
 }
 
 
 return {
  WikiNode : WikiNode,
  toJSON : function()
  {
   var jsonObj =
   {
    NODES : NODES,
    EDGES : EDGES,
    CONFIG : CONFIG
   };
   return JSON.stringify(jsonObj, null, " ");
  },
  config : function(cfgJSON)
  {
   $.extend(CONFIG, cfgJSON);
   if (typeof CONFIG.title !== "string" || CONFIG.title.length <= 0)
   {
    CONFIG.title = "BareBonesWiki";
   }
   if (cfgJSON)
   {
    HAS_EDITED = true;
   }
   
   return CONFIG;
  },
  newName : function()
  {
   return newName();
  },
  edit : function(wNode, edgeSet, oldTitle)
  {
   if (NODES[oldTitle]) {wNode.created = NODES[oldTitle].created;}
   else {wNode.created = utc.now();}
   
   api_rm(oldTitle);
   setNode(wNode);
   setEdge(wNode.title, edgeSet);
  },
  rm : function(title)
  {
   api_rm(title);
  },
  get : function(title)
  {
   if (hasOwn.call(NODES, title)) {return NODES[title];}
  },
  getNull : function(title)
  {
   return api_getNull(title);
  },
  getOrphans : function()
  {
   if (!ORPHAN) {buildOrphanList();}
   return ORPHAN;
  },
  getTagMap : function()
  {
   if (!TAGTITLE) {buildTagTitle();}
   return TAGTITLE;
  },
  getTitlesInTag : function(tagName)
  {
   if (!TAGTITLE) {buildTagTitle();}
   for (var i = 0, ii = TAGTITLE.length; i < ii; i += 1)
   {
    if (TAGTITLE[i].key === tagName) {return TAGTITLE[i].vals;}
   }
   return [];
  },
  getRecent : function()
  {
   if (!EDITED) {buildCreated(true);}
   return EDITED;
  },
  getCreated : function()
  {
   if (!CREATED) {buildCreated(false);}
   return CREATED;
  },
  getTitles : function()
  {
   if (!TITLES) {buildTitleList();}
   return TITLES;
  },
  getBackLinks : function()
  {
   if (!BACKLINKS) {buildBackLinks();}
   return BACKLINKS;
  },
  getMimeMap : function()
  {
   if (!MIME) {buildMime();}
   return MIME;
  },
  getMimeList : function()
  {
   if (!MIME) {buildMime();}
   var mimeSet = {"text/x-bbm" : 1, "text/plain" : 1, "text/html" : 1};
   for (var i = 0, ii = MIME.length; i < ii; i += 1)
   {
    mimeSet[MIME[i].key] = 1;
   }
   return  obj_.keys(mimeSet).sort();
  },
  search : function(wordList)
  {
   var caseSense = CONFIG.searchCase, i = 0, ii = wordList.length, res = {};
   
   for (var title in NODES)
   {
    var node = NODES[title], repeat = {};
    for (i = 0; i < ii; i += 1)
    {
     var word = wordList[i];
     if (typeof word !== "string") {continue;}
     if (hasOwn.call(repeat, repeat[word])) {continue;}
     
     repeat[word] = 1;

     if (str_.hasSubstr(title, word, caseSense)) {continue;}
     if (str_.hasSubstrArray(node.tags, word, caseSense)) {continue;}
     if (str_.hasSubstr(node.src, word, caseSense)) {continue;}
     break;
    }
    if (i >= ii) {res[title] = 1;}
   }
   return obj_.keys(res).sort();
  },
  hasEdited : function()
  {
   return HAS_EDITED;
  },
  init : function(jsonStr)
  {
   var dStore = jsonStr;
   if (typeof dStore === "string") {dStore = JSON.parse(dStore);}
   
   NODES = $.extend(NODES, dStore.NODES);
   EDGES = $.extend(EDGES, dStore.EDGES);
   CONFIG = $.extend(CONFIG, defCfg, dStore.CONFIG);
   
   for (var title in NODES)
   {
    NODES[title].mime = NODES[title].mime || "text/x-bbm";
   }
   
   nullifyCache(true);
  }
 };
}());






/*!
 * @desc BakaBakaMark: An Extensible LML-HTML Compiler
 * @version 1.0.0
 * @license BSD-2-Clause; Copyright (c) 2014 Preole, All rights reserved.
*/
var BBM=function(){"use strict";function a(a){for(var b=[],c=0,d=a.length;d>c;c+=1)b.push(A.CSS_PRE+i(a[c]));return b.join(M)}function b(a,b){return A.CSS_PRE_ID+(b?i(a):a)}function c(a){return F.lastIndex=0,a.replace(F,"")}function d(a){return I.lastIndex=0,a.replace(I,"")}function e(a){return H.lastIndex=0,a.replace(H,"")}function f(a){return a.replace(/(^\s+)|(\s+$)/g,"")}function g(a){return a.replace(/\s+$/g,"")}function h(a){return m(f(d(a)))}function i(a){return c(d(a))}function j(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")}function k(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function l(a){return j(f(d(a))).replace(/`/g,"&#x60;")}function m(a){return a.replace(/^javascript:/i,"javascript;").replace(/^data:/i,"data;")}function n(a,b){var c="";if(0>=b)return c;for(;1&b&&(c+=a),b>>=1,b;)a+=a;return c}function o(a,b,c){var d=(a.length>>>0)-1,e=c?c:d;if(0>e)return-1;for(e>a.length-1&&(e=d),e;e>=0&&a[e]!==b;e-=1);return e}function p(a,b,c){for(var d=[],e=0,f=a.length>>>0;f>e;e+=1){var g=a[e];b.call(c,g,e,a)&&d.push(g)}return d}function q(){var a=Array.prototype.slice.call(arguments,0),b=0,c=a.length,d=Object.prototype.hasOwnProperty,e=null;for(b=0;c>b&&(e=a[b],!(e instanceof Object));b+=1);for(b+=1;c>b;b+=1)if("object"==typeof a[b]||"function"==typeof a[b])for(var f in a[b])d.call(a[b],f)&&(e[f]=a[b][f]);return e}function r(a,b,c){this.col=c,this.lexeme=b,this.type=a}function s(a,b){this.children=[],this.type=a,this.err=!1,this.meta=b||{},this.parent=null,this.isDeleted=!1}function t(a){function b(b){return a.charAt(Y+(b||0))}function c(b){var c=a.substring(Y+1,b.length+Y+1);return c===b}function d(a){return E.test(b(a))}function e(a){return G.test(b(a))||""===b(a)}function f(a){return e(a)||d(a)}function g(b){b=Math.abs(b||1),Y+=b,X+=b,Z=a.charAt(Y)}function h(b){b=Math.abs(b||1),W+=b,Y+=b,Z=a.charAt(Y)}function i(){return""!==Z}function j(b){var c=a.substring(W,Y),d=U[U.length-1];d&&d.isType(N.TEXT)&&b===N.TEXT?($=d,d.lexeme+=c):($=new r(b,c,V),U.push($))}function k(){d(1)&&(g(2),j(N.UL_ITEM))}function l(){if(c("-}"))g(3),j(N.DEL_END);else if(c("---")){for(;"-"===Z;)g();e()&&j(N.DIV_LINE)}else"["===b(1)?(g(2),j(N.LINK_CONT)):d(1)&&(g(2),j(N.UL_ITEM))}function m(){for(;"="===Z;)g();j(e()?N.ATX_END:N.ATX)}function n(){d(1)?(g(2),j(N.UL_ITEM)):c("+}")&&(g(3),j(N.INS_END))}function o(){if(d(1))g(2),j(N.UL_ITEM);else if("*"!==b(1)||c("***")){if(c("***")){for(;"*"===Z;)g();e()&&j(N.ASIDE_DELIM)}}else g(2),j(N.BOLD)}function p(){"!"===b(1)?(g(2),j(N.TH)):"<"===b(1)&&A.ALLOW_IMG&&(g(2),j(N.LINK_IMG))}function q(){if("|"===b(1))g(2),j(N.TD);else if("="===b(1)){for(g();"="===Z;)g();e()&&j(N.TR_DELIM)}}function s(){if(c('""')){for(;'"'===Z;)g();j(N.CODE)}}function t(){"."===b(1)&&d(2)?(g(3),j(N.OL_ITEM)):"<"===b(1)&&A.ALLOW_LINK?(g(2),j(N.LINK_WIKI)):"["===b(1)&&A.ALLOW_LINK&&(g(2),j(N.LINK_INT))}function u(){for(;K.test(Z);)g();"."===b()&&d(1)&&(g(2),j(N.OL_ITEM))}function v(){"^"===b(1)&&(g(2),j(N.SUP))}function w(){","===b(1)&&(g(2),j(N.SUB))}function x(){"_"===b(1)&&(g(2),j(N.UNDER))}function y(){"<"===b(1)&&A.ALLOW_LINK&&(g(2),j(N.LINK_EXT))}function z(){g(),j(N.BRACKET_L)}function B(){g(),j(N.BRACKET_R)}function C(){c("--")?(g(3),j(N.DEL)):c("++")&&(g(3),j(N.INS))}function D(){":"===b(1)&&(g(2),j(N.LINK_REF_END))}function F(){g(),j(N.GT_THAN)}function H(){e(1)?(g(),j(N.LABEL_STOP)):A.ALLOW_ID&&d(1)?(g(2),j(N.LABEL_ID)):A.ALLOW_CLASS&&"."===b(1)&&d(2)&&(g(3),j(N.LABEL_CLASS))}function I(){"'"===b(1)&&(g(2),j(N.ITAL))}function J(){if(c("///")){for(;"/"===Z;)g();e()&&j(N.COMMENT_DELIM)}}function M(){d(1)&&(g(2),j(N.DT_MARK))}function O(){d(1)?(g(2),j(N.DD_MARK)):"{"===b(1)&&(g(2),j(N.LINK_REF))}function P(){for(;!ab[Z]&&!f()&&i();)g();j(N.TEXT)}function Q(){for(;E.test(Z);)g();j(N.SPACES)}function R(){"\r"===Z&&"\n"===b(1)?(g(2),_["\r\n"]=(_[Z]||0)+1):(g(1),_[Z]=(_[Z]||0)+1),j(N.NL),X=1}function S(){h(),f()?d()?Q():R():(g(),P(N.TEXT))}for(var T=null,U=[],V=1,W=0,X=1,Y=0,Z=a.charAt(Y),$=null,_={"\r\n":0,"\n":0,"\r":0},ab={"[":z,"]":B,"{":C,"}":D,":":O,";":M,"-":l,"=":m,"|":q,"!":p,"#":t,"+":n,"*":o,"^":v,",":w,_:x,"'":I,">":F,"?":y,".":H,"/":J,'"':s,"\\":S,"•":k,"⁃":k};i();)ab[Z]?ab[Z]():E.test(Z)?Q():G.test(Z)?R():K.test(Z)?u():P(),Y===W&&g(),$===T&&P(),Z=a.charAt(Y),$=T,V=X,W=Y;j(N.EOF);var bb=0;for(var cb in _)_[cb]>bb&&(bb=_[cb],L=cb);return"\r\n"!==L&&"\r"!==L&&"\n"!==L&&(L="\n"),U}function u(a){function b(){return a[cb+1]&&(cb+=1,db=a[cb]),cb}function c(b){return a[b]&&(cb=b,db=a[cb]),cb}function d(b,c){var d=c?c+cb:cb;return a[d]?a[d].isType(b):!1}function e(a){var b=a||0;return d(N.NL,b)||d(N.EOF,b)}function g(){return db instanceof r&&!d(N.EOF)}function j(a){var b=d(N.SPACES);return b&&l()&&(db.lexeme=db.substring(a-1,db.getLength())),b}function k(a){if(!g()||m())return!0;if(db.col<a&&!d(N.SPACES)&&!e())return!0;var b=T[db.type],c=l()&&p();return b&&c}function l(){return e(-1)||d(N.SPACES,-1)&&e(-2)}function m(){var a=0;return e(a)?e(a+1)?!0:d(N.SPACES,a+1)&&e(a+2):!1}function n(a){return l()&&db.col===a?d(N.DIV_LINE)||d(N.ATX_END):!1}function p(){return e(1)||d(N.SPACES,1)&&e(2)}function q(a,b){var c=b?b:db;return a?(X[c.type]?a.push(0):Y[c.type]&&a.pop(),a.length<=0):!1}function t(a){return d(N.GT_THAN)&&U[a.type]}function u(a){return l()&&db.col===a.col&&p()?db.isSameType(a)&&db.lexeme===a.lexeme:!1}function v(a){return db!==a&&db.isSameType(a)?d(N.CODE)&&db.lexeme==a.lexeme:!1}function w(){var a=0;return d(N.SPACES,a)&&(a+=1),d(N.NL,a)&&(a+=1),d(N.SPACES,a)&&(a+=1),d(N.LINK_CONT,a)}function x(b,c){for(var d="",e=b;c>e&&a[e]instanceof r;e+=1)d+=a[e].lexeme;return d}function y(a,c){for(var d=cb;g()&&!a[db.type];)b();return c?x(d,cb):void 0}function z(a,c){for(var d=cb;!e();)b();return c&&b(),a?x(d,cb):void 0}function B(){for(;d(N.SPACES)||d(N.NL);)b()}function C(){var a=db,b=new s(O.ASIDE);for(z(!1,!0),B();g()&&db.col>=a.col;){if(u(a)){z();break}b.addNode(E()),B()}return b}function D(){var a=db.lexeme.length,d=cb;b();var e=f(y(V,!0));if(z(),0===e.length)return c(d),db.type=N.TEXT,null;var g=new s(O.HEADER);return g.addText(e),g.meta.HEADERLVL=a,g}function E(){var a=null,b=eb<A.MAX_BLOCKS;if(B(),P[db.type]&&b)eb+=1,a=I(),eb-=1;else{if(d(N.LABEL_ID)||d(N.LABEL_CLASS))return H();if(d(N.CODE)&&d(N.NL,1))a=F();else if(d(N.ASIDE_DELIM)&&b)eb+=1,a=C(),eb-=1;else if(d(N.ATX))a=D();else if(d(N.LINK_REF))a=J();else{if(d(N.COMMENT_DELIM))return G(),a;d(N.TR_DELIM)?(z(),a=new s(O.TR)):d(N.LABEL_STOP)?(z(),a=new s(O.STOP)):d(N.DIV_LINE)?(z(),a=new s(O.DIV_LINE)):d(N.ATX_END)&&(db.type=N.TEXT)}}return!a&&g()&&(B(),a=K()),a}function F(){var a=new s(O.CODE_BLOCK),c=db;z(!1,!0);for(var e=cb,f=cb;g()&&(j(c.col),!u(c));)f=b();return d(N.SPACES,-1)&&(f-=1),a.addText(x(e,f)),e>=f&&a.addText(L),z(),a}function G(){for(var a=db;g();)if(z(),B(),u(a)){z();break}}function H(){var a=db.isType(N.LABEL_ID);b();var c=i(z(!0,!1));return 0===c.length||a&&fb[c]?null:(a&&(fb[c]=c),new s(a?O.ID:O.CLASS,{ID:c}))}function I(){var a=new s(P[db.type]);if(b(),d(N.SPACES)&&b(),e())return a;if(a.isType(O.DT))return a.addNodes(K()),a;for(var c=db.col;g()&&db.col>=c;)a.addNode(E()),B();return a}function J(){var a=cb,e="",f="";return b(),e=h(y(W,!0)),d(N.LINK_REF_END)?(b(),f=h(z(!0)),0===e.length||0===f.length?(c(a),K()):new s(O.LINK_REF,{REF_ID:e,URL:f})):(c(a),K())}function K(a,c,e,f){for(var g=c?c:[],h=a||db.col,i=new s(O.PARA),l=cb,m=cb,p=db,r=!1,t=null;!k(h)&&(j(h),r||!q(e,p));){if(R[p.type]){var u=o(g,p.type);if(u>=0){u===g.length-1&&(i.type=R[p.type]);break}var v=S[p.type],y=g.length>=A.MAX_SPANS;v&&!y&&(b(),g.push(v),t=K(h,g,e,f),g.pop(),t.err=t.isType(O.PARA))}else if(Q[p.type])t=_(h,f);else if(p.isType(N.CODE))t=$(h);else if(r&&p.isType(N.LINK_CONT)){var z=M(h,i.getLast());z===i.getLast()?l=cb+1:t=z,r=!1}t instanceof s?(t.err?m+=1:k(h)||(b(),r=Z[t.type]&&w()),i.addText(x(l,m)),i.addNode(t),l=cb):b(),m=cb,p=db,t=null}return!c&&n(h)&&(i.type=O.HEADER,i.meta.HEADERLVL=d(N.ATX_END)?1:2,b()),i.addText(x(l,m)),i}function M(a,c){if(!(c instanceof s&&Z[c.type]))return null;var d=null;if(c.isType(O.LINK_IMG)){if(d=ab(a),d.err)return d;c.meta.ALT=d.meta.TEXT}else{var e=[0];if(b(),d=K(a,[],e,!0),0!==e.length)return d.err=!0,d;c.addNodes(d)}return c}function $(a){var b=ab(a);if(b.err)return b;var c=new s(O.CODE);return c.addNode(b),c}function _(a,b){var c=db,d=c.isType(N.LINK_IMG);if(b&&!d)return null;var e=ab(a);return e.err||(e.type=Q[c.type],e.meta.URL=h(e.meta.TEXT),e.err=0===e.meta.URL.length,e.err?(e.type=O.TEXT,delete e.meta.URL):(delete e.meta.TEXT,d&&(e.meta.ALT=""))),e}function ab(a){var c=new s(O.TEXT),d=db,e=cb+1,f=X[d.type]?[0]:null;for(c.err=!0,b();!k(a);){if(j(a),q(f)||v(d)||t(d)){c.err=!1;break}b()}return c.meta.TEXT=x(e,cb),c}for(var bb=new s(O.ROOT),cb=0,db=a[cb],eb=0,fb=Object.create(null);g();)bb.addNode(E());return bb}function v(a){function b(a){for(var b=a.getLast();b&&b.isType(O.TR)&&0===b.getLength();)a.pop(),b=a.getLast();for(var c=a.getFirst().getLength(),d=0,e=a.getLength();e>d;d+=1){for(var f=a.children[d];f.getLength()>c;)f.pop();for(;f.getLength()<c&&f.getLength()>0;)f.addNode_simple(new s(O.TD));f.isDeleted=f.getLength()<=0}}function c(a){for(var b=a.getLast();b&&b.isType(O.DT);)a.pop(),b=a.getLast();for(var c=a.getFirst();c&&c.isType(O.DD);)a.popFirst(),c=a.getFirst();a.isDeleted=0===a.getLength()}function d(a){var b=0,c=0,f=null;for(b=0,c=a.getLength();c>b&&(f=a.children[b],!f.isType(O.TEXT)||J.test(f.meta.TEXT))&&(!(f.getLength()>0||Z[f.type])||(d(f),f.isDeleted));b+=1);if(a.isDeleted=b>=c&&!Z[a.type],!a.isDeleted&&(Z[a.type]&&1===a.getLength()&&(f=a.getLast(),f.isType(O.TEXT)&&J.test(f.meta.TEXT)&&a.pop()),A.RM_EOL))for(b=0,c=a.getLength();c>b;b+=1)f=a.children[b],f.isType(N.TEXT)&&(f.meta.TEXT=e(f.meta.TEXT))}function f(a){for(var e=0,i=a.getLength();i>e;e+=1){var j=a.children[e];if(j.isType(O.TABLE)&&b(j),j.isType(O.DL)&&c(j),j.isType(O.TEXT)||$[j.type]||Z[j.type]){if(d(a),!a.isDeleted){var k=a.getLast();k.isType(O.TEXT)&&(k.meta.TEXT=g(k.meta.TEXT))}return}j.getLength()>0&&!j.isType(O.CODE_BLOCK)&&f(j),j.isDeleted=_[j.type]&&j.getLength()<=0}h(a)}function h(a){var b=a.getLength()-1;for(b;b>=0;b-=1){var c=a.children[b];if(!c.isDeleted&&!ab[c.type])break;a.pop()}a.isDeleted=0>b&&!Z[a.type]}function i(a){return a.isDeleted?!1:(a.children=p(a.children,i),(_[a.type]||$[a.type])&&(a.isDeleted=a.getLength()<=0),!a.isDeleted)}return f(a),a.children=p(a.children,i),a}function w(a){return v(u(t(a)))}function x(c){function d(a,b){if(!bb[a.type])return"";var c=bb[a.type],d="<"+c;if(a.isType(O.HEADER)&&a.meta.HEADERLVL){var e=a.meta.HEADERLVL+A.MIN_HEADER;d+=e>6?"6":e+""}if(b)for(var f in b)b[f]=b[f].substring(0,A.MAX_ATTR_CHARS),d+=" "+f+'="'+l(b[f])+'"';return cb[a.type]&&A.XHTML&&(d+="/"),d+=">",a.isType(O.CODE_BLOCK)&&(d+="<code>"),d}function e(a){if(!bb[a.type])return"";var b=bb[a.type];if(a.isType(O.HEADER)&&a.meta.HEADERLVL){var c=a.meta.HEADERLVL+A.MIN_HEADER;b+=c>6?"6":c+""}return a.isType(O.CODE_BLOCK)?"</code></"+b+">":"</"+b+">"}function f(a){return a instanceof s&&a.meta.TEXT?A.XHTML?j(a.meta.TEXT):k(a.meta.TEXT):""}function g(a){for(var c=a.meta.URL,f=a.isType(O.LINK_IMG),g=a.meta.ALT,j=a.parent,l=!1;j;){if(Z[j.type]&&(l=!0),j.meta.SYM_TABLE&&j.meta.SYM_TABLE[c]){c=j.meta.SYM_TABLE[c];break}j=j.parent}a.isType(O.LINK_INT)&&(c="#"+b(c,!0)),f&&J.test(g)&&l&&(g=c);var m=f?{src:c,alt:g}:{href:c};return f?d(a,m):(a.isType(O.LINK_WIKI)&&(m["class"]=i(A.CSS_WIKI)),a.getLength()>0?d(a,m)+h(a,m)+e(a):d(a,m)+k(a.meta.URL)+e(a))}function h(a){var b=a.getLength(),c=0,i="";for(c=0;b>c;c+=1){var j=a.children[c];i+=Z[j.type]?g(j):$[j.type]?d(j)+h(j)+e(j):f(j)}return i}function m(a,b,c){return n(M,c)+d(a,b)+L}function o(c,f,g,i){var j=c.getLength(),k=0,l=null,p="",q=null,r=null,s=null,t="",u=d(c,f),v=e(c,f),w=n(M,g);for(k=0;j>k;k+=1)if(l=c.children[k],l.isType(O.ID))s=b(l.meta.ID);else if(l.isType(O.CLASS))q=q?q:[],q.push(l.meta.ID);else{if((s||q)&&(r=Object.create(null),s&&(r.id=s),q&&(r["class"]=a(q,!0))),s=null,q=null,l.isType(O.DIV_LINE))p+=m(l,f,g);else{if(l.isType(O.TEXT)||$[l.type]||Z[l.type]){p+=h(c);break}p+=o(l,r,g+1,k===j-1)}r=null}if(c.isType(O.CODE_BLOCK))t=u+p+v;else{if(c.isType(O.ROOT))return p;t=w+u+L+p+L+w+v}return i||(t+=L),t}return o(c,null,-1,!1)}function y(a){return q(A,a)}function z(a,b){var c=q(Object.create(null),A);y(b);var d=x(w(a));return A=c,d}var A={RM_EOL:0,MAX_ATTR_CHARS:2048,MAX_BLOCKS:8,MAX_SPANS:10,ALLOW_IMG:1,ALLOW_LINK:1,ALLOW_CLASS:1,ALLOW_ID:1,CSS_PRE_ID:"bbm-",CSS_PRE:"bbm-",CSS_WIKI:"w-bbm",MIN_HEADER:0,XHTML:0},B="[ \\u2000-\\u200d\\t\\u202f\\u205f\\u3000\\u1680\\u180e\\u00a0\\u00b7\\u237d\\u2420\\u2422\\u2423]+",C="[\\v\\f\\r\\n\\u0085\\u2028\\u2029]+",D="[\\u0000-\\u001f\\u007f-\\u009f\\u2028\\u2029]+",E=new RegExp(B),F=new RegExp(B,"g"),G=new RegExp(C),H=new RegExp(C,"g"),I=new RegExp(D,"g"),J=/^\s*$/,K=/[0-9]+/,L="\n",M=" ",N={SPACES:"SPACES",NL:"NL",TEXT:"TEXT",UNDER:"UNDER",SUB:"SUB",SUP:"SUP",CODE:"CODE",ITAL:"ITAL",BOLD:"BOLD",INS:"INS",INS_END:"INS_END",DEL:"DEL",DEL_END:"DEL_END",DIV_LINE:"DIV_LINE",COMMENT_DELIM:"COMMENT_DELIM",ASIDE_DELIM:"ASIDE_DELIM",TH:"TH",TD:"TD",TR_DELIM:"TR_DELIM",ATX:"ATX",ATX_END:"ATX_END",OL_ITEM:"OL_ITEM",UL_ITEM:"UL_ITEM",DT_MARK:"DT_MARK",DD_MARK:"DD_MARK",LABEL_CLASS:"LABEL_CLASS",LABEL_ID:"LABEL_ID",LABEL_STOP:"LABEL_STOP",LINK_REF_END:"LINK_REF_END",LINK_REF:"LINK_REF",LINK_CONT:"LINK_CONT",LINK_INT:"LINK_INT",LINK_WIKI:"LINK_WIKI",LINK_EXT:"LINK_EXT",LINK_IMG:"LINK_IMG",GT_THAN:"GT_THAN",BRACKET_L:"BRACKET_L",BRACKET_R:"BRACKET_R",EOF:"EOF"},O={ROOT:"ROOT",PARA:"PARA",STOP:"STOP",BLOCKQUOTE:"BLOCKQUOTE",CODE_BLOCK:"CODE_BLOCK",ASIDE:"ASIDE",ID:"ID",CLASS:"CLASS",UL:"UL",OL:"OL",UL_LI:"UL_LI",OL_LI:"OL_LI",HEADER:"HEADER",DIV_LINE:"DIV_LINE",DT:"DT",DD:"DD",DL:"DL",TH:"TH",TD:"TD",TR:"TR",TABLE:"TABLE",LINK_REF:"LINK_REF",LINK_INT:"LINK_INT",LINK_EXT:"LINK_EXT",LINK_IMG:"LINK_IMG",LINK_WIKI:"LINK_WIKI",TEXT:"TEXT",DEL:"DEL",INS:"INS",UNDER:"UNDER",SUB:"SUB",SUP:"SUP",ITAL:"ITAL",BOLD:"BOLD",CODE:"CODE"},P={GT_THAN:O.BLOCKQUOTE,UL_ITEM:O.UL_LI,OL_ITEM:O.OL_LI,DT_MARK:O.DT,DD_MARK:O.DD,TH:O.TH,TD:O.TD},Q={LINK_INT:O.LINK_INT,LINK_EXT:O.LINK_EXT,LINK_IMG:O.LINK_IMG,LINK_WIKI:O.LINK_WIKI},R={INS:O.INS,DEL:O.DEL,INS_END:O.INS,DEL_END:O.DEL,BOLD:O.BOLD,ITAL:O.ITAL,SUP:O.SUP,SUB:O.SUB,UNDER:O.UNDER},S={INS:N.INS_END,DEL:N.DEL_END,BOLD:N.BOLD,ITAL:N.ITAL,SUP:N.SUP,SUB:N.SUB,UNDER:N.UNDER},T={ASIDE_DELIM:1,ATX_END:1,DIV_LINE:1},U={LINK_EXT:1,LINK_IMG:1,LINK_WIKI:1},V={ATX_END:1,NL:1},W={LINK_REF_END:1,NL:1},X={BRACKET_L:1,LINK_INT:1,LINK_CONT:1},Y={BRACKET_R:1},Z={LINK_IMG:1,LINK_EXT:1,LINK_INT:1,LINK_WIKI:1},$={SUB:1,SUP:1,ITAL:1,BOLD:1,DEL:1,INS:1,UNDER:1,CODE:1},_={STOP:1,PARA:1,BLOCKQUOTE:1,ASIDE:1,UL_LI:1,OL_LI:1,HEADER:1,OL:1,UL:1,DL:1,DD:1,DT:1,TR:1},ab={ID:1,CLASS:1,STOP:1},bb={PARA:"p",BLOCKQUOTE:"blockquote",CODE_BLOCK:"pre",ASIDE:"div",UL_LI:"li",OL_LI:"li",OL:"ol",UL:"ul",DL:"dl",DD:"dd",DT:"dt",DIV_LINE:"hr",TH:"th",TD:"td",TR:"tr",TABLE:"table",LINK_INT:"a",LINK_EXT:"a",LINK_WIKI:"a",LINK_IMG:"img",SUB:"sub",SUP:"sup",ITAL:"em",BOLD:"strong",DEL:"del",INS:"ins",UNDER:"u",CODE:"code",HEADER:"h"},cb={LINK_IMG:1,DIV_LINE:1};return function(){var a=function(){};Object.create=Object.create||function(b){if(arguments.length>1)throw Error("Second argument not supported");if("object"!=typeof b)throw TypeError("Argument must be an object");return a.prototype=b,new a}}(),r.prototype={isType:function(a){return this.type===a},isSameType:function(a){return this.type===a.type},substring:function(a,b){return this.lexeme.substring(a,b)},getLength:function(){return this.lexeme.length}},s.prototype={getLast:function(){return this.children[this.children.length-1]},getFirst:function(){return this.children[0]},getLength:function(){return this.children.length},isType:function(a){return this.type===a},isSameType:function(a){return this.type===a.type},pop:function(){this.children.pop()},popFirst:function(){this.children.shift()},addNode_simple:function(a){var b=this.getLast();return b&&b.isType(O.TEXT)&&b.isSameType(a)?void(b.meta.TEXT+=a.meta.TEXT):(a.parent=this,void this.children.push(a))},addNode_table:function(a){var b=this.getLast();if(!b||!b.isType(O.TABLE)){if(a.isType(O.TR))return;b=new s(O.TABLE),this.addNode_simple(b)}b.getLength()<=0&&b.addNode_simple(new s(O.TR));var c=b.getLast();a.isType(O.TH)||a.isType(O.TD)?c.addNode_simple(a):a.isType(O.TR)&&c.getLength()>0&&b.addNode_simple(a)},addNode_ul_ol:function(a){var b=a.isType(O.UL_LI)?O.UL:O.OL,c=this.getLast();c&&c.isType(b)||(c=new s(b),this.addNode_simple(c)),c.addNode_simple(a)},addNode_dl:function(a){var b=this.getLast();b&&b.isType(O.DL)||(b=new s(O.DL),this.addNode_simple(b)),b.addNode_simple(a)},addNode:function(a){a instanceof s&&a!==this&&(a.isType(O.LINK_REF)?(this.meta.SYM_TABLE=this.meta.SYM_TABLE||Object.create(null),this.meta.SYM_TABLE[a.meta.REF_ID]=a.meta.URL):this.isType(O.PARA)&&this.isSameType(a)?this.addNodes(a):a.isType(O.UL_LI)||a.isType(O.OL_LI)?this.addNode_ul_ol(a):a.isType(O.TR)||a.isType(O.TH)||a.isType(O.TD)?this.addNode_table(a):a.isType(O.DD)||a.isType(O.DT)?this.addNode_dl(a):this.addNode_simple(a))},addText:function(a){a&&a.length>0&&this.addNode_simple(new s(O.TEXT,{TEXT:a}))},addNodes:function(a){if(a instanceof s&&a!==this)for(var b=0,c=a.children.length;c>b;b+=1)this.addNode_simple(a.children[b])}},{lexer:t,parser:u,filter:v,frontEnd:w,compile:z,setOptions:y,AST_ENUM:O,LEX_ENUM:N,ASTNode:function(a,b){return new s(a,b)},LexToken:function(a,b,c){return new r(a,b,c)}}}();"undefined"!=typeof module&&(module.exports=BBM);



/* requires ./lib/jquery.min.js */
/* requires ./lib/bbm.min.js*/
/* requires DB.js */

/*
A few jQuery plugin for better integration with the wikitext parser and 
the database object.
*/
(function ($){

 var prefix = "bbm-",
  htmlOpt = BBM.setOptions({CSS_PRE_ID : prefix, CSS_WIKI : "js-wlink"}),
  maxVal = Math.pow(2, 20) - 1,
  maxDepth = 10;
 
 
 
 function randInt(min, max)
 {
  return Math.floor(min + Math.random() * (max + 1));
 }
 
 function newSeed(preStr)
 {
  var seed = preStr + randInt(0, maxVal);
  while (document.getElementById(seed))
  {
   seed = preStr + randInt(0, maxVal);
  }
  return seed;
 }

 


 $.parseBBM = function (text, mime){
 
  if (text instanceof jQuery) {return text;}
  if (typeof text !== "string" || typeof mime !== "string")
  {
   throw new TypeError("Missing mime type or input string to parse.");
  }
  if (/^text\/x-bbm$/i.test(mime))
  {
   htmlOpt.CSS_PRE_ID = newSeed(prefix);
   return $($.parseHTML(BBM.compile(text)));
  }
  if (/^text\/html$/i.test(mime))
  {
   return $($.parseHTML(text));
  }
  return $("<pre></pre>").text(text);
 };
 
 $.fn.linkify = function (){
  this.find(".js-wlink").each(function (){
   var $e = $(this);
   var title = $e.attr("href");
   if (title)
   {
    $e.data({title : title});
    if (!DB.get(title)) {$e.toggleClass("js-css-rlink", true);}
   }
   $e.toggleClass("css-wlink", true);
  });
  
  this.find("a").attr("tabindex", 0);
  
  return this;
 };

 $.fn.transclude = function (cycleStack){
  var cStack = cycleStack instanceof Array ? cycleStack : [];
  if (cStack.length > maxDepth)
  {
   return $("Maximum transclusion depth (" + maxDepth + ") reached.");
  }
  var $div = $("<div></div>");
  
  $div.append(this).find("p > img:only-child[alt='.']").each(function (){
   var $e = $(this),
    errMsg = "",
    url = str_.titleize($e.attr("src") || $e.data().title),
    wNode = DB.getNull(url);
   
   if (cStack.indexOf(url) !== -1)
   {
    errMsg = "Transclusion stopped by cycle: " + cStack.join(" ") + " " + url;
   }
   if (url.length <= 0)
   {
    errMsg = "Invalid transclusion target: Blank titles.";
   }
   if (errMsg.length > 0)
   {
    return $("<p></p>").text(errMsg).replaceAll($e.parent());
   }
   
   cStack.push(url);
   $.parseBBM(wNode.src, wNode.mime)
    .linkify()
    .transclude(cStack)
    .replaceAll($e.parent());
   cStack.pop(url);
  });
  
  return $div.children().unwrap();
 };

 
 //Two kinds of edges: Hyperlinks with classes, and images
 //that are alone in a paragraph with a special alt text.
 $.fn.getEdges = function (){
  var edges = {};
  this.find(".js-wlink, p > img:only-child[alt='.']").each(function (){
   var $e = $(this);
   var title = $e.attr("href") || $e.attr("src") || $e.data().title;
   if (title) {edges[title] = 1;}
  });
  
  return edges;
 };
 
 $.fn.log = function (text){
  this.val(this.val() + text + "\n");
  return this;
 };
 
 $.fn.unlog = function (){
  this.val("");
  return this;
 };

}(jQuery));





/* requires $plugins.js */

var $t = (function ()
{
 var d = new Date(),
 $tEdit = $($("#js-t-edit").html()),
 $tView = $($("#js-t-view").html()),
 $tPopup = $($("#js-t-popup").html()),
 $tDL = $($("#js-t-dl").html()),
 $tDT = $($("#js-t-dt").html()),
 $tDD = $($("#js-t-dd").html()),
 $tPara = $($("#js-t-para").html()),
 $tButton = $($("#js-t-button").html()),
 $tLinkW = $($("#js-t-wlink").html());
 
 function sigStr(msEdited, msCreated)
 {
  if (typeof msEdited !== "number" || typeof msCreated !== "number")
  {
   return "Invalid date.";
  }

  d.setTime(msEdited);
  var edited = d.toLocaleString();
  d.setTime(msCreated);
  var created = d.toLocaleString();
  return ("Last edited: " + edited + " (Created on: " + created + ")");
 }

 function t_edit(wNode)
 {
  var $edit = $tEdit.clone();
  $edit.find(".js-i-old-title").text("Editing \"" + wNode.title + "\"");
  $edit.find(".js-i-title").val(wNode.title);
  $edit.find(".js-i-src").val(wNode.src);
  $edit.find(".js-i-tags").val(wNode.tags.join("\n"));
  $edit.find(".js-i-mime").val(wNode.mime);
  $edit.data("title", wNode.title);
  return $edit;
 }

 function t_view(wNode, frag)
 {
  var $view = $tView.clone();
  var $frag = (frag || $.parseBBM(wNode.src, wNode.mime))
   .linkify()
   .transclude();
  
  $view.find(".js-title").text(wNode.title);
  $view.find(".js-subtitle").text(sigStr(wNode.edited, wNode.created));
  $view.find(".js-tags").append(t_links(wNode.tags));
  $view.find(".js-content").append($frag);
  $view.data("title", wNode.title);
  return $view;
 }

 function t_popup(displayTitle, content)
 {
  var $p = $tPopup.clone();
  $p.find(".js-title").text(displayTitle);
  $p.find(".js-p-content").append(content);
  $p.data().clicks = 2;
  return $p;
 }

 function t_dl(labelStr, $frag)
 {
  return $tDL.clone()
  .append($tDT.clone().text(labelStr))
  .append($tDD.clone().append($frag));
 }
 
 function t_button(displayText)
 {
  return $tButton.clone().text(displayText);
 }

 function t_link(displayText)
 {
  return $tLinkW.clone()
   .text(displayText)
   .data("title", displayText)
   .attr("href", displayText);
 }
 
 function t_links(strList)
 {
  var $frag = $();
  for (var i = 0, ii = strList.length; i < ii; i += 1)
  {
   $frag = $frag.add(t_link(strList[i]));
  }
  return $frag;
 }
 
 function t_linksDD(strList)
 {
  return t_links(strList).wrap($tDD).parent();
 }
 
 function t_linksPara(strList)
 {
  return t_links(strList).wrap($tPara).parent();
 }

 /*
 Take an array of objects, which contains a display key and an array of
 strings to produce grouped lists of hyperlinks:
 [
  {
   key : "DisplayText"
   vals : ["Text1", "Text2", "Text3"]
  }, //[...]
 ]
 */
 function t_linksDL(objList, linkDT)
 {
  var $dl = $tDL.clone();
  for (var i = 0, ii = objList.length; i < ii; i += 1)
  {
   var $label = $tDT.clone(),
    vals = objList[i].vals,
    key = objList[i].key;
   
   if (linkDT) {$label.append(t_link(key));}
   else {$label.text(key);}
  
   $dl.append($label).append(t_linksDD(vals));
  }
  return $dl;
 }
 
 
 
 return {
  edit : t_edit,
  view : t_view,
  popup : t_popup,
  dl : t_dl,
  button : t_button,
  link : t_link,
  links : t_links,
  linksPara : t_linksPara,
  linksDL : t_linksDL
 };
}());




/* requires ./lib/jquery.min.js */

var EVT =
{
 //Events for content view area.
 OPEN : "open",
 EDIT : "edit",
 CLOSEO : "closeO",
 CLOSE : "close",
 DELETE : "delete",
 CANCEL : "cancel",
 COMMIT : "finish",
 
 //Indexing & searching + search result view area.
 INDEX : "index",
 SEARCH : "search",
 POST : "post",
 SAVE : "save",
 LOAD : "load",
 EXPORT : "export",
 IMPORT : "import"
};

//Native GUI events
var EV =
{
 CLICK : "click",
 KEYDOWN : "keydown",
 CHANGE : "change"
};

//Re-usable event handling functions.
var FUNC = (function (){

 function closeEle(evt)
 {
  var $e = $(this);
  
  $e.toggleClass("js-css-invis", true);
  $e.find("input[type='text'], textarea").val("");
  $e.find("a").attr("href", "");
 }

 return {CLOSE : closeEle};
}());





/* requires ./lib/jquery.min.js */
/* requires DB.js */
/* requires $plugins.js */
/* requires $eConsts.js */
/* requires $t.js */


var $CONTENT = (function ($baseEle){

 var $oMap = (function (){
  var $rootEle = $baseEle;
  var $activeTitles = {};
 
  function get(key)
  {
   if (Object.prototype.hasOwnProperty.call($activeTitles, key))
   {
    return $activeTitles[key];
   }
  }

  function add(key, $e)
  {
   var $oldEle = get(key);
   if ($oldEle)
   {
    $e.replaceAll($oldEle);
    $activeTitles[key] = $e;
    $oldEle.remove();
   }
   else
   {
    $e.prependTo($rootEle);
    $activeTitles[key] = $e;
   }
   $e.focus();
   return $e;
  }

  function detach(key)
  {
   var $e = get(key);
   if ($e)
   {
    $e.detach();
    delete $activeTitles[key];
   }
   return $e;
  }

  function replace(key, $e, oldKey)
  {
   add(key, $e);
   if (key !== oldKey) {remove(oldKey);}
   $e.focus();
   return $e;
  }

  function remove(key)
  {
   var $e = get(key);
   if ($e) {$e.remove();}
   delete $activeTitles[key];
  }

  function clear()
  {
   $activeTitles = {};
   $rootEle.empty();
  }
  
  return {
   get : get,
   add : add,
   detach : detach,
   replace : replace,
   remove : remove,
   clear : clear
  };
 }());
 
 function open(evt, title, isEdit)
 {
  if ($oMap.get(title) && !isEdit)
  {
   return $oMap.get(title).focus();
  }
  if (isEdit)
  {
   $oMap.add(title, $t.edit(DB.getNull(title)));
  }
  else
  {
   $oMap.add(title, $t.view(DB.getNull(title)));
  }
 }
 
 function edit(evt, title)
 {
  open(evt, title, true);
 }
 
 function close(evt, title)
 {
  if (typeof title === "string") {$oMap.remove(title);}
  else {$oMap.clear();}
 }
 
 function closeO(evt, title)
 {
  var $form = $oMap.detach(title);
  $oMap.clear();
  $oMap.add(title, $form);
 }
 
 function commit(evt, title, $edit)
 {
  var nTitle = str_.titleize($edit.find(".js-i-title").val());
  if (nTitle === "") {return;}
  if (nTitle !== title && DB.get(nTitle))
  {
   if (!window.confirm("Overwrite \"" + nTitle + "\"?")) {return;}
   $oMap.remove(nTitle);
  }
  
  var wNode = DB.WikiNode(
   nTitle,
   $edit.find(".js-i-src").val(),
   $edit.find(".js-i-tags").val(),
   $edit.find(".js-i-mime").val()
  );
  
  var $frag = $.parseBBM(wNode.src, wNode.mime);
  DB.edit(wNode, $frag.getEdges(), title);
  $oMap.replace(nTitle, $t.view(wNode, $frag), title);
 }
 
 function cancel(evt, title)
 {
  $oMap.add(title, $t.view(DB.getNull(title)));
 }
 
 function remove(evt, title)
 {
  if (!DB.config().cfmDel || window.confirm("Delete \"" + title + "\"?"))
  {
   DB.rm(title);
   $oMap.remove(title);
  }
 }
 
 function dispatch(evt)
 {
  var $e = $(this),
   $form = $e.parents(".js-form").first(),
   title = $form.data().title,
   op = evt.data;
  
  if (op === EVT.COMMIT)
  {
   $baseEle.trigger(op, [title, $form]);
  }
  else
  {
   $baseEle.trigger(op, [title]);
  }
 }
 

 return $baseEle.on(EVT.OPEN, open)
 .on(EVT.EDIT, edit)
 .on(EVT.CLOSE, close)
 .on(EVT.CLOSEO, closeO)
 .on(EVT.DELETE, remove)
 .on(EVT.COMMIT, commit)
 .on(EVT.CANCEL, cancel)
 .on(EV.CLICK, ".js-ctrl > .js-b-close", EVT.CLOSE, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-close-o", EVT.CLOSEO, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-edit", EVT.EDIT, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-finish", EVT.COMMIT, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-cancel", EVT.CANCEL, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-delete", EVT.DELETE, dispatch)
 
}($("#js-area-content")));





/* requires $plugins.js */
/* requires $eConsts.js */
/* requires DB.js */


var $INDEXVIEW = (function ($dest, $text){
 
 $dest.data({
  Title : function (){return $t.linksPara(DB.getTitles());},
  Tags : function (){return $t.linksDL(DB.getTagMap());},
  Created : function (){return $t.linksDL(DB.getCreated());},
  Recent : function (){return $t.linksDL(DB.getRecent());},
  Orphan : function (){return $t.linksPara(DB.getOrphans());},
  Backlink : function (){return $t.linksDL(DB.getBackLinks(), true);},
  Mime : function (){return $t.linksDL(DB.getMimeMap());}
 });
 
 function post(evt, $frag)
 {
  $dest.empty();
  if ($frag) 
  {
   $frag.linkify();
   $dest.append($frag);
  }
 }
 
 function search(evt)
 {
  $dest.trigger(EVT.POST);
  
  var query = str_.trim($text.val());
  if (query.length <= 0) {return;}
  
  var titles = DB.search(str_.words(query));
  var frag =
  [
   {
    key : "Found " + titles.length + " match(es).",
    vals : titles
   }
  ];
  
  $dest.trigger(EVT.POST, [$t.linksDL(frag)]);
 }
 
 function index(evt, indexType)
 {
  var $resFrag = $dest.data()[indexType]();
  var $resView = $t.dl("Indexing " + indexType, $resFrag);
  $dest.trigger(EVT.POST, [$resView]);
 }
 
 function empty(evt) {$dest.empty();}
 
 return $dest.on(EVT.POST, post)
 .on(EVT.SEARCH, search)
 .on(EVT.INDEX, index)
 .on(EVT.CLOSE, empty);
 
}($("#js-area-index"), $("#js-txt-search")));





/*
https://github.com/davidchambers/Base64.js/blob/master/base64.js

By David Chambers, licensed under WTFPL.
Comments removed to preserve space.
*/

/*jshint boss:true*/
var base64 = (function()
{
 //http://tools.ietf.org/rfc/rfc4648.txt @ page 5
 var chars = 
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

 //[https://gist.github.com/999166] by [https://github.com/nignag]
 function encode(input) {
  for (
   var block, charCode, idx = 0, map = chars, output = "";
   input.charAt(idx | 0) || (map = "=", idx % 1);
   output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
   charCode = input.charCodeAt(idx += 3/4);
   if (charCode > 0xFF) {
    throw new Error("base64 encode failure: Found non-Latin1 characters.");
   }
   block = block << 8 | charCode;
  }
  return output;
 }

 //[https://gist.github.com/1020396] by [https://github.com/atk]
 function decode(input) {
  input = input.replace(/=+$/, "");
  if (input.length % 4 == 1) {
   throw new Error("base64 decode failure: Found non-base64 characters.");
  }
  for (
   var bc = 0, bs, buffer, idx = 0, output = "";
   buffer = input.charAt(idx++);
   ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
     bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
  ) {
   buffer = chars.indexOf(buffer);
  }
  return output;
 }


 return {
  encode : encode,
  decode : decode
 };
}());



/* requires base64.js */
var dataURI = (function()
{
 function utfBase64(str) {return base64.encode(encodeURIComponent(data));}
 function startsWith(str) {return /^utf/i.test(str);}

 return function(dataStr, mimeStr, charsetStr, base64Flag)
 {
  var res = null,
  mime = mimeStr ? ";" + mimeStr : "",
  charset = charsetStr ? ";" + charsetStr : "",
  base64 = base64Flag ? ";base64" : "",
  func = encodeURIComponent;
 
  if (base64Flag) {func = startsWith(base64Flag) ? utfBase64 : base64.encode;}
 
  return "data:" + mime + charset + base64 + "," + func(dataStr);
 };
}());



/* requires dataURI.js */
/*
A browser module performing client-side automatic data download:

- IE10+
- <a download="...">

Parameters:
 string dataStr: The text data to save.
 [string] mimeStr: Data mime type. Default: "text/html"
 [string] charsetStr: Data charset. Default: "utf-8"
 [string] fileName: Suggested file name. Default: "default"

returns: true if automatic download; false o/w
*/
var autosave = (function()
{
 var a = document.createElement("a"),
 data = "",
 mime = "",
 fName = "",
 charset = "",
 failsave = function() {return false;},
 msieDL = (!!navigator.msSaveBlob) ? function()
 {
  var blob = new Blob([data], {type: mime});
  window.navigator.msSaveBlob(blob, fName);
  return true;
 } : failsave,

 autoDL = (typeof a.download !== "undefined") ? function()
 {
  a.target = "_blank";
  a.download = fName;
  a.href = dataURI(data, mime, charset);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  a.href = "";
  return true;
 } : failsave;
 a.style.display = "none";
 
 
 
 return function(dataStr, mimeStr, charsetStr, fileName)
 {
  var res = false;
 
  data = dataStr;
  mime = mimeStr || "text/plain";
  fName = fileName || "default";
  charset = charsetStr || "utf-8";
  res = msieDL() || autoDL();
  data = "";
  mime = "";
  fName = "";
  charset = "";
  return res;
 };
}());



/* requires $eConsts.js */


var $EXPORTWIZ = (function (){
 var $wiz = $("#js-export-wiz");
 var $saveLink = $wiz.find(".js-save-link");
 
 $wiz.on(EVT.CLOSE, FUNC.CLOSE);
 $wiz.on(EVT.LOAD, function (evt, uri){
  $wiz.find(".js-save-link").attr("href", uri);
  $wiz.toggleClass("js-css-invis", false).focus();
 });
 
 return $wiz;
}());






/* requires ./saver/autosave.js */
/* requires $eConsts.js */
/* requires $eContent.js */
/* requires $eSearch.js */
/* requires $eExportWiz.js */



var $SAVER = (function ($detachList){
 var $obj = $({});

 function uOuterHTML($ele)
 {
  return $("<div></div>").append($ele.clone()).html();
 }
 
 function uExportWhole()
 {
  return "<!DOCTYPE HTML>\n" + uOuterHTML($(document.documentElement));
 }
 
 function save(evt, text, mime, charset, fname)
 {
  if (autosave(text, mime, charset, fname)) {return;}
  $EXPORTWIZ.trigger(EVT.LOAD, [dataURI(text, mime, charset)]);
 }
 
 
 
 function saveJson(evt, jsonStr, fname)
 {
  save(evt, jsonStr, "application/json", "utf-8", fname);
 }
 
 
 function saveDoc(evt, fname)
 {
  var cList = [];
  var text = "";
  
  $detachList.each(function (){
   cList.push($(this).contents().detach());
  });
  
  text = uExportWhole();
  
  cList = cList.reverse();
  $detachList.each(function (){
   cList.pop().appendTo($(this));
  });
  
  save(evt, text, "text/html", "utf-8", fname);
 }
 
 
 $obj.on(EVT.SAVE, saveDoc);
 $obj.on(EVT.EXPORT, saveJson);
 
 return $obj;
}( $().add($INDEXVIEW).add($CONTENT) ));





/* requires ./lib/jquery.min.js */
/* requires $eConsts.js */

var $CONFIGWIZ = (function (){
 var $pgTitle = $("#js-pg-title");
 var $cfg = $("#js-cfg-wiz");
 
 $cfg.on(EVT.CLOSE, FUNC.CLOSE);
 
 $cfg.on(EVT.SAVE, function (evt){
  var newCfg = DB.config({
   title : str_.titleize($cfg.find(".js-i-title").val()),
   startup : str_.lines($cfg.find(".js-i-startup").val(), 1, 1, 1),
   cfmDel : $cfg.find(".js-c-cfm-del").prop("checked"),
   cfmNav : $cfg.find(".js-c-cfm-nav").prop("checked"),
   searchCase : $cfg.find(".js-c-search-case").prop("checked")
  });
  
  $cfg.trigger(EVT.LOAD, [newCfg]);
  $cfg.trigger(EVT.CLOSE);
 });
 
 $cfg.on(EVT.LOAD, function (evt, cfgObj){
  var cfg = cfgObj || DB.config();
 
  document.title = cfg.title;
  $pgTitle.text(cfg.title);
  
  $cfg.find(".js-i-title").val(cfg.title);
  $cfg.find(".js-i-startup").val(cfg.startup.join("\n"));
  $cfg.find(".js-c-cfm-del").prop("checked", cfg.cfmDel);
  $cfg.find(".js-c-cfm-nav").prop("checked", cfg.cfmNav);
  $cfg.find(".js-c-search-case").prop("checked", cfg.searchCase);
  $cfg.toggleClass("js-css-invis", false).focus();
 });
 
 
 
 return $cfg;
}());





/* requires $eConsts.js */
/* requires $eContent.js */

var $IMPORTWIZ = (function (){
 var $wiz = $("#js-import-wiz"),
  $radios = $wiz.find("input[type='radio'][name='js-import-type']"),
  $fileEle = $wiz.find("#js-i-import"),
  $log = $wiz.find("textarea").first(),
  MSIZE = Math.pow(2, 20) * 10;
 
 function importDelegate(evt)
 {
  if (!(File && FileReader)) {return;}
  
  var files = this.files;
  for (var i = 0, ii = files.length; i < ii; i += 1)
  {
   var file = files[i],
    fReader = null,
    fSize = file.size || file.fileSize,
    fName = file.name;
   
   if (fSize <= MSIZE)
   {
    fReader = new FileReader();
    fReader.onload = onLoad;
    fReader.onerror = onError;
    fReader.readAsText(files[i], "utf-8");
   }
   else {$log.log(sizeErrMsg(fName, MSIZE, fSize));}
  }
 }
 
 function onLoad(evt)
 {
  var text = evt.target.result,
   type = $radios.filter(":checked").val() || "text/plain";
   
  if (type === "application/json")
  {
   try
   {
    DB.init(text);
    $log.log("Successfully imported JSON dataset");
   }
   catch (err)
   {
    $log.log("Failed to import JSON dataset : " + err.toString());
   }
   return;
  }
  $log.log("Data entry import success.");
  
  var wNode = DB.WikiNode("", text, "", type);
  DB.edit(wNode, $.parseBBM(text, type).getEdges(), "");
  $CONTENT.trigger(EVT.OPEN, [wNode.title]);
 }
 
 function onError(evt)
 {
  $log.log(evt.target.error);
 }
 
 function sizeErrMsg(fName, max, real)
 {
  return fName + " is too large. (" + maxSize + " >= max " + real + " bytes)";
 }
 
 $wiz.on(EVT.CLOSE, FUNC.CLOSE);
 $wiz.on(EVT.LOAD, function (evt){
  $wiz.toggleClass("js-css-invis", false).focus();
  $log.unlog();
 });
 
 $fileEle.on(EV.CLICK, function (evt){
  $wiz.get(0).reset();
 });
 
 $fileEle.on(EV.CHANGE, importDelegate);

 
 return $wiz;
}());





/* requires DB.js */
/* requires $t.js */
/* requires $eConsts.js */
/* requires $eContent.js */
/* requires $eSearch.js */
/* requires $eSave.js */
/* requires $eConfigWiz.js */
/* requires $eImportWiz.js */


(function ($body){
 var $DS = $("#js-db");
 
 function placeAfter($ele, $target)
 {
  var modal = $ele[0];
  var target = $target[0];
  var rect = target.getBoundingClientRect();
  
  $target.parent().append($ele.focus());
  
  modal.style.left = rect.left + "px";
  modal.style.top = rect.top + rect.height + "px";
  
  return $ele;
 }
 
 function indexPopup()
 {
  var $links = $t.linksPara(obj_.keys($INDEXVIEW.data()));
  var $p = $t.popup("Choose an index type...", $links);
  return $p.toggleClass("js-index", true);
 }

 function tagPopup(tagName)
 {
  var $links = $t.linksPara(DB.getTitlesInTag(tagName));
  var $p = $t.popup(tagName, $links);
  return $p.toggleClass("js-content", true);
 }
 
 function init()
 {
  $(".js-popup").remove();
  DB.init($DS.text());
  
  var startups = DB.config().startup, i, ii, j, jj;
  for (i = 0, ii = startups.length; i < ii && i < 20; i += 1)
  {
   $CONTENT.trigger(EVT.OPEN, startups[i]);
  }
  startups = null;
  if (i > 0) {return;}

  var editList = DB.getRecent();
  for (i = 0, ii = editList.length; i < ii && i < 5; i += 1)
  {
   var titles = editList[i].vals;
   for (j = 0, jj = titles.length; j < jj && i < 5; j += 1, i += 1)
   {
    $CONTENT.trigger(EVT.OPEN, [titles[j]]);
   }
  }
 }
 
 
 
 $body.on(EV.CLICK, function (evt){
  $(".js-popup").each(function (){
   var $popup = $(this);
   var clicksLeft = $popup.data().clicks -= 1;
   if (!clicksLeft || clicksLeft <= 0) {$popup.remove();}
  });
 });
 
 $body.on(EV.CLICK, ".js-wlink", function (evt){
  var $src = $(evt.target);
  var title = $src.data().title;
  var $parent = $src.parents(".js-content, .js-tags, .js-index").first();
  evt.preventDefault();
  
  if ($parent.hasClass("js-index"))
  {
   $INDEXVIEW.trigger(EVT.INDEX, [title]);
  }
  else if ($parent.hasClass("js-tags"))
  {
   placeAfter(tagPopup(title), $src);
  }
  else
  {
   $CONTENT.trigger(EVT.OPEN, [title]);
  }
 });

 $body.on(EV.CLICK, ".js-popup", function (evt){
  if ($(evt.target).hasClass("js-b-close")) {$(this).remove();}
  evt.stopPropagation();
 });
 
 $body.on(EV.CLICK, ".js-modal", function (evt){
  var $src = $(evt.target);
  if ($src.hasClass("js-b-close")) {$(this).trigger(EVT.CLOSE);}
  else if ($src.hasClass("js-b-save")) {$(this).trigger(EVT.SAVE);}
 });
 
 $("#js-txt-search").on(EV.KEYDOWN, function (evt){
  if (evt.which === 13) {$INDEXVIEW.trigger(EVT.SEARCH);}
 });
 
 $("#js-b-search").on(EV.CLICK, function (evt){
  $INDEXVIEW.trigger(EVT.SEARCH);
 });
 
 $("#js-b-new").on(EV.CLICK, function (evt){
  $CONTENT.trigger(EVT.EDIT, [DB.newName()]);
 });
 
 $("#js-b-top").on(EV.CLICK, function (evt){
  window.scrollTo(0, 0);
 });
 
 $("#js-b-index").on(EV.CLICK, function (evt){
  placeAfter(indexPopup(), $(this));
 });
 
 $("#js-b-cfg").on(EV.CLICK, function (evt){
  $CONFIGWIZ.trigger(EVT.LOAD);
 });
 
 $("#js-b-save").on(EV.CLICK, function (evt){
  $DS.text(DB.toJSON());
  $SAVER.trigger(EVT.SAVE, [document.title + ".html"]);
 });
 
 $("#js-b-export").on(EV.CLICK, function (evt){
  var jsonStr = DB.toJSON();
  $DS.text(jsonStr);
  $SAVER.trigger(EVT.EXPORT, [jsonStr, document.title + ".json"]);
 });
 
 $("#js-b-import").on(EV.CLICK, function (evt){
  $IMPORTWIZ.trigger(EVT.LOAD);
 });
 
 init();
 
 $(window).on("beforeunload", function (evt){
  var cfmNav = DB.config().cfmNav;
  var hasEdited = DB.hasEdited();
  
  if (cfmNav && hasEdited)
  {
   return "You will lose unsaved changes; Navigate away anyway?";
  }
  
 });
 
}($(document.body)));

