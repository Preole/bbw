/*! jQuery v1.11.0 -deferred,-ajax,-ajax/jsonp,-ajax/load,-ajax/parseJSON,-ajax/parseXML,-ajax/script,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-effects,-effects/animatedSelector,-effects/support,-effects/Tween,-core/ready,-serialize,-event-alias,-callbacks,-queue,-queue/delay,-forms,-deprecated,-exports/amd,-css,-css/addGetHookIf,-css/curCSS,-css/defaultDisplay,-css/hiddenVisibleSelectors,-css/support,-css/swap,-css/var/cssExpand,-css/var/isHidden,-css/var/rmargin,-css/var/rnumnonpx,-dimensions,-offset | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k="".trim,l={},m="1.11.0 -deferred,-ajax,-ajax/jsonp,-ajax/load,-ajax/parseJSON,-ajax/parseXML,-ajax/script,-ajax/var/nonce,-ajax/var/rquery,-ajax/xhr,-manipulation/_evalUrl,-effects,-effects/animatedSelector,-effects/support,-effects/Tween,-core/ready,-serialize,-event-alias,-callbacks,-queue,-queue/delay,-forms,-deprecated,-exports/amd,-css,-css/addGetHookIf,-css/curCSS,-css/defaultDisplay,-css/hiddenVisibleSelectors,-css/support,-css/swap,-css/var/cssExpand,-css/var/isHidden,-css/var/rmargin,-css/var/rnumnonpx,-dimensions,-offset",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(e=arguments[h]))for(d in e)a=g[d],c=e[d],g!==c&&(j&&c&&(n.isPlainObject(c)||(b=n.isArray(c)))?(b?(b=!1,f=a&&n.isArray(a)?a:[]):f=a&&n.isPlainObject(a)?a:{},g[d]=n.extend(j,f,c)):void 0!==c&&(g[d]=c));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray||function(a){return"array"===n.type(a)},isWindow:function(a){return null!=a&&a==a.window},isNumeric:function(a){return a-parseFloat(a)>=0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},isPlainObject:function(a){var b;if(!a||"object"!==n.type(a)||a.nodeType||n.isWindow(a))return!1;try{if(a.constructor&&!j.call(a,"constructor")&&!j.call(a.constructor.prototype,"isPrototypeOf"))return!1}catch(c){return!1}if(l.ownLast)for(b in a)return j.call(a,b);for(b in a);return void 0===b||j.call(a,b)},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(b){b&&n.trim(b)&&(a.execScript||function(b){a.eval.call(a,b)})(b)},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:k&&!k.call("\ufeff\xa0")?function(a){return null==a?"":k.call(a)}:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){var d;if(b){if(g)return g.call(b,a,c);for(d=b.length,c=c?0>c?Math.max(0,d+c):c:0;d>c;c++)if(c in b&&b[c]===a)return c}return-1},merge:function(a,b){var c=+b.length,d=0,e=a.length;while(c>d)a[e++]=b[d++];if(c!==c)while(void 0!==b[d])a[e++]=b[d++];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(f=a[b],b=a,a=f),n.isFunction(a)?(c=d.call(arguments,2),e=function(){return a.apply(b||this,c.concat(d.call(arguments)))},e.guid=a.guid=a.guid||n.guid++,e):void 0},now:function(){return+new Date},support:l}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b=a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s="sizzle"+-new Date,t=a.document,u=0,v=0,w=eb(),x=eb(),y=eb(),z=function(a,b){return a===b&&(j=!0),0},A="undefined",B=1<<31,C={}.hasOwnProperty,D=[],E=D.pop,F=D.push,G=D.push,H=D.slice,I=D.indexOf||function(a){for(var b=0,c=this.length;c>b;b++)if(this[b]===a)return b;return-1},J="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",K="[\\x20\\t\\r\\n\\f]",L="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",M=L.replace("w","w#"),N="\\["+K+"*("+L+")"+K+"*(?:([*^$|!~]?=)"+K+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+M+")|)|)"+K+"*\\]",O=":("+L+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+N.replace(3,8)+")*)|.*)\\)|)",P=new RegExp("^"+K+"+|((?:^|[^\\\\])(?:\\\\.)*)"+K+"+$","g"),Q=new RegExp("^"+K+"*,"+K+"*"),R=new RegExp("^"+K+"*([>+~]|"+K+")"+K+"*"),S=new RegExp("="+K+"*([^\\]'\"]*?)"+K+"*\\]","g"),T=new RegExp(O),U=new RegExp("^"+M+"$"),V={ID:new RegExp("^#("+L+")"),CLASS:new RegExp("^\\.("+L+")"),TAG:new RegExp("^("+L.replace("w","w*")+")"),ATTR:new RegExp("^"+N),PSEUDO:new RegExp("^"+O),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+K+"*(even|odd|(([+-]|)(\\d*)n|)"+K+"*(?:([+-]|)"+K+"*(\\d+)|))"+K+"*\\)|)","i"),bool:new RegExp("^(?:"+J+")$","i"),needsContext:new RegExp("^"+K+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+K+"*((?:-\\d)?\\d*)"+K+"*\\)|)(?=[^-]|$)","i")},W=/^(?:input|select|textarea|button)$/i,X=/^h\d$/i,Y=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,$=/[+~]/,_=/'|\\/g,ab=new RegExp("\\\\([\\da-f]{1,6}"+K+"?|("+K+")|.)","ig"),bb=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{G.apply(D=H.call(t.childNodes),t.childNodes),D[t.childNodes.length].nodeType}catch(cb){G={apply:D.length?function(a,b){F.apply(a,H.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function db(a,b,d,e){var f,g,h,i,j,m,p,q,u,v;if((b?b.ownerDocument||b:t)!==l&&k(b),b=b||l,d=d||[],!a||"string"!=typeof a)return d;if(1!==(i=b.nodeType)&&9!==i)return[];if(n&&!e){if(f=Z.exec(a))if(h=f[1]){if(9===i){if(g=b.getElementById(h),!g||!g.parentNode)return d;if(g.id===h)return d.push(g),d}else if(b.ownerDocument&&(g=b.ownerDocument.getElementById(h))&&r(b,g)&&g.id===h)return d.push(g),d}else{if(f[2])return G.apply(d,b.getElementsByTagName(a)),d;if((h=f[3])&&c.getElementsByClassName&&b.getElementsByClassName)return G.apply(d,b.getElementsByClassName(h)),d}if(c.qsa&&(!o||!o.test(a))){if(q=p=s,u=b,v=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){m=ob(a),(p=b.getAttribute("id"))?q=p.replace(_,"\\$&"):b.setAttribute("id",q),q="[id='"+q+"'] ",j=m.length;while(j--)m[j]=q+pb(m[j]);u=$.test(a)&&mb(b.parentNode)||b,v=m.join(",")}if(v)try{return G.apply(d,u.querySelectorAll(v)),d}catch(w){}finally{p||b.removeAttribute("id")}}}return xb(a.replace(P,"$1"),b,d,e)}function eb(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function fb(a){return a[s]=!0,a}function gb(a){var b=l.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function hb(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function ib(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||B)-(~a.sourceIndex||B);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function jb(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function kb(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function lb(a){return fb(function(b){return b=+b,fb(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function mb(a){return a&&typeof a.getElementsByTagName!==A&&a}c=db.support={},f=db.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},k=db.setDocument=function(a){var b,e=a?a.ownerDocument||a:t,g=e.defaultView;return e!==l&&9===e.nodeType&&e.documentElement?(l=e,m=e.documentElement,n=!f(e),g&&g!==g.top&&(g.addEventListener?g.addEventListener("unload",function(){k()},!1):g.attachEvent&&g.attachEvent("onunload",function(){k()})),c.attributes=gb(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=gb(function(a){return a.appendChild(e.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=Y.test(e.getElementsByClassName)&&gb(function(a){return a.innerHTML="<div class='a'></div><div class='a i'></div>",a.firstChild.className="i",2===a.getElementsByClassName("i").length}),c.getById=gb(function(a){return m.appendChild(a).id=s,!e.getElementsByName||!e.getElementsByName(s).length}),c.getById?(d.find.ID=function(a,b){if(typeof b.getElementById!==A&&n){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ab,bb);return function(a){var c=typeof a.getAttributeNode!==A&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return typeof b.getElementsByTagName!==A?b.getElementsByTagName(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return typeof b.getElementsByClassName!==A&&n?b.getElementsByClassName(a):void 0},p=[],o=[],(c.qsa=Y.test(e.querySelectorAll))&&(gb(function(a){a.innerHTML="<select t=''><option selected=''></option></select>",a.querySelectorAll("[t^='']").length&&o.push("[*^$]="+K+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||o.push("\\["+K+"*(?:value|"+J+")"),a.querySelectorAll(":checked").length||o.push(":checked")}),gb(function(a){var b=e.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&o.push("name"+K+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||o.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),o.push(",.*:")})),(c.matchesSelector=Y.test(q=m.webkitMatchesSelector||m.mozMatchesSelector||m.oMatchesSelector||m.msMatchesSelector))&&gb(function(a){c.disconnectedMatch=q.call(a,"div"),q.call(a,"[s!='']:x"),p.push("!=",O)}),o=o.length&&new RegExp(o.join("|")),p=p.length&&new RegExp(p.join("|")),b=Y.test(m.compareDocumentPosition),r=b||Y.test(m.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},z=b?function(a,b){if(a===b)return j=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===e||a.ownerDocument===t&&r(t,a)?-1:b===e||b.ownerDocument===t&&r(t,b)?1:i?I.call(i,a)-I.call(i,b):0:4&d?-1:1)}:function(a,b){if(a===b)return j=!0,0;var c,d=0,f=a.parentNode,g=b.parentNode,h=[a],k=[b];if(!f||!g)return a===e?-1:b===e?1:f?-1:g?1:i?I.call(i,a)-I.call(i,b):0;if(f===g)return ib(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)k.unshift(c);while(h[d]===k[d])d++;return d?ib(h[d],k[d]):h[d]===t?-1:k[d]===t?1:0},e):l},db.matches=function(a,b){return db(a,null,null,b)},db.matchesSelector=function(a,b){if((a.ownerDocument||a)!==l&&k(a),b=b.replace(S,"='$1']"),!(!c.matchesSelector||!n||p&&p.test(b)||o&&o.test(b)))try{var d=q.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return db(b,l,null,[a]).length>0},db.contains=function(a,b){return(a.ownerDocument||a)!==l&&k(a),r(a,b)},db.attr=function(a,b){(a.ownerDocument||a)!==l&&k(a);var e=d.attrHandle[b.toLowerCase()],f=e&&C.call(d.attrHandle,b.toLowerCase())?e(a,b,!n):void 0;return void 0!==f?f:c.attributes||!n?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},db.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},db.uniqueSort=function(a){var b,d=[],e=0,f=0;if(j=!c.detectDuplicates,i=!c.sortStable&&a.slice(0),a.sort(z),j){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return i=null,a},e=db.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=db.selectors={cacheLength:50,createPseudo:fb,match:V,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ab,bb),a[3]=(a[4]||a[5]||"").replace(ab,bb),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||db.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&db.error(a[0]),a},PSEUDO:function(a){var b,c=!a[5]&&a[2];return V.CHILD.test(a[0])?null:(a[3]&&void 0!==a[4]?a[2]=a[4]:c&&T.test(c)&&(b=ob(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ab,bb).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=w[a+" "];return b||(b=new RegExp("(^|"+K+")"+a+"("+K+"|$)"))&&w(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==A&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=db.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),t=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&t){k=q[s]||(q[s]={}),j=k[a]||[],n=j[0]===u&&j[1],m=j[0]===u&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[u,n,m];break}}else if(t&&(j=(b[s]||(b[s]={}))[a])&&j[0]===u)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(t&&((l[s]||(l[s]={}))[a]=[u,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||db.error("unsupported pseudo: "+a);return e[s]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?fb(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=I.call(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:fb(function(a){var b=[],c=[],d=g(a.replace(P,"$1"));return d[s]?fb(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),!c.pop()}}),has:fb(function(a){return function(b){return db(a,b).length>0}}),contains:fb(function(a){return function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:fb(function(a){return U.test(a||"")||db.error("unsupported lang: "+a),a=a.replace(ab,bb).toLowerCase(),function(b){var c;do if(c=n?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===m},focus:function(a){return a===l.activeElement&&(!l.hasFocus||l.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return X.test(a.nodeName)},input:function(a){return W.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:lb(function(){return[0]}),last:lb(function(a,b){return[b-1]}),eq:lb(function(a,b,c){return[0>c?c+b:c]}),even:lb(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:lb(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:lb(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:lb(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=jb(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=kb(b);function nb(){}nb.prototype=d.filters=d.pseudos,d.setFilters=new nb;function ob(a,b){var c,e,f,g,h,i,j,k=x[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=Q.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=R.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(P," ")}),h=h.slice(c.length));for(g in d.filter)!(e=V[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?db.error(a):x(a,i).slice(0)}function pb(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function qb(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=v++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[u,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[s]||(b[s]={}),(h=i[d])&&h[0]===u&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function rb(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function sb(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function tb(a,b,c,d,e,f){return d&&!d[s]&&(d=tb(d)),e&&!e[s]&&(e=tb(e,f)),fb(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||wb(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:sb(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=sb(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?I.call(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=sb(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):G.apply(g,r)})}function ub(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],i=g||d.relative[" "],j=g?1:0,k=qb(function(a){return a===b},i,!0),l=qb(function(a){return I.call(b,a)>-1},i,!0),m=[function(a,c,d){return!g&&(d||c!==h)||((b=c).nodeType?k(a,c,d):l(a,c,d))}];f>j;j++)if(c=d.relative[a[j].type])m=[qb(rb(m),c)];else{if(c=d.filter[a[j].type].apply(null,a[j].matches),c[s]){for(e=++j;f>e;e++)if(d.relative[a[e].type])break;return tb(j>1&&rb(m),j>1&&pb(a.slice(0,j-1).concat({value:" "===a[j-2].type?"*":""})).replace(P,"$1"),c,e>j&&ub(a.slice(j,e)),f>e&&ub(a=a.slice(e)),f>e&&pb(a))}m.push(c)}return rb(m)}function vb(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,i,j,k){var m,n,o,p=0,q="0",r=f&&[],s=[],t=h,v=f||e&&d.find.TAG("*",k),w=u+=null==t?1:Math.random()||.1,x=v.length;for(k&&(h=g!==l&&g);q!==x&&null!=(m=v[q]);q++){if(e&&m){n=0;while(o=a[n++])if(o(m,g,i)){j.push(m);break}k&&(u=w)}c&&((m=!o&&m)&&p--,f&&r.push(m))}if(p+=q,c&&q!==p){n=0;while(o=b[n++])o(r,s,g,i);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=E.call(j));s=sb(s)}G.apply(j,s),k&&!f&&s.length>0&&p+b.length>1&&db.uniqueSort(j)}return k&&(u=w,h=t),r};return c?fb(f):f}g=db.compile=function(a,b){var c,d=[],e=[],f=y[a+" "];if(!f){b||(b=ob(a)),c=b.length;while(c--)f=ub(b[c]),f[s]?d.push(f):e.push(f);f=y(a,vb(e,d))}return f};function wb(a,b,c){for(var d=0,e=b.length;e>d;d++)db(a,b[d],c);return c}function xb(a,b,e,f){var h,i,j,k,l,m=ob(a);if(!f&&1===m.length){if(i=m[0]=m[0].slice(0),i.length>2&&"ID"===(j=i[0]).type&&c.getById&&9===b.nodeType&&n&&d.relative[i[1].type]){if(b=(d.find.ID(j.matches[0].replace(ab,bb),b)||[])[0],!b)return e;a=a.slice(i.shift().value.length)}h=V.needsContext.test(a)?0:i.length;while(h--){if(j=i[h],d.relative[k=j.type])break;if((l=d.find[k])&&(f=l(j.matches[0].replace(ab,bb),$.test(i[0].type)&&mb(b.parentNode)||b))){if(i.splice(h,1),a=f.length&&pb(i),!a)return G.apply(e,f),e;break}}}return g(a,m)(f,b,!n,e,$.test(a)&&mb(b.parentNode)||b),e}return c.sortStable=s.split("").sort(z).join("")===s,c.detectDuplicates=!!j,k(),c.sortDetached=gb(function(a){return 1&a.compareDocumentPosition(l.createElement("div"))}),gb(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||hb("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&gb(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||hb("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),gb(function(a){return null==a.getAttribute("disabled")})||hb(J,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),db}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return n.inArray(a,b)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=[],d=this,e=d.length;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;e>b;b++)if(n.contains(d[b],this))return!0}));for(b=0;e>b;b++)n.find(a,d[b],c);return c=this.pushStack(e>1?n.unique(c):c),c.selector=this.selector?this.selector+" "+a:a,c},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=a.document,A=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,B=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a.charAt(0)&&">"===a.charAt(a.length-1)&&a.length>=3?[null,a,null]:A.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:z,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}if(d=z.getElementById(c[2]),d&&d.parentNode){if(d.id!==c[2])return y.find(a);this.length=1,this[0]=d}return this.context=z,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};B.prototype=n.fn,y=n(z);var C=/^(?:parents|prev(?:Until|All))/,D={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=a[b];while(e&&9!==e.nodeType&&(void 0===c||1!==e.nodeType||!n(e).is(c)))1===e.nodeType&&d.push(e),e=e[b];return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b,c=n(a,this),d=c.length;return this.filter(function(){for(b=0;d>b;b++)if(n.contains(this,c[b]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?n.inArray(this[0],n(a)):n.inArray(a.jquery?a[0]:a,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function E(a,b){do a=a[b];while(a&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return E(a,"nextSibling")},prev:function(a){return E(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return n.nodeName(a,"iframe")?a.contentDocument||a.contentWindow.document:n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(D[a]||(e=n.unique(e)),C.test(a)&&(e=e.reverse())),this.pushStack(e)}});var F=/\S+/g,G="undefined",H;for(H in n(l))break;l.ownLast="0"!==H,l.inlineBlockNeedsLayout=!1,n(function(){var a,b,c=z.getElementsByTagName("body")[0];c&&(a=z.createElement("div"),a.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",b=z.createElement("div"),c.appendChild(a).appendChild(b),typeof b.style.zoom!==G&&(b.style.cssText="border:0;margin:0;width:1px;padding:1px;display:inline;zoom:1",(l.inlineBlockNeedsLayout=3===b.offsetWidth)&&(c.style.zoom=1)),c.removeChild(a),a=b=null)}),function(){var a=z.createElement("div");if(null==l.deleteExpando){l.deleteExpando=!0;try{delete a.test}catch(b){l.deleteExpando=!1}}a=null}(),n.acceptData=function(a){var b=n.noData[(a.nodeName+" ").toLowerCase()],c=+a.nodeType||1;return 1!==c&&9!==c?!1:!b||b!==!0&&a.getAttribute("classid")===b};var I=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,J=/([A-Z])/g;function K(a,b,c){if(void 0===c&&1===a.nodeType){var d="data-"+b.replace(J,"-$1").toLowerCase();if(c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:I.test(c)?n.parseJSON(c):c}catch(e){}n.data(a,b,c)}else c=void 0}return c}function L(a){var b;for(b in a)if(("data"!==b||!n.isEmptyObject(a[b]))&&"toJSON"!==b)return!1;return!0}function M(a,b,d,e){if(n.acceptData(a)){var f,g,h=n.expando,i=a.nodeType,j=i?n.cache:a,k=i?a[h]:a[h]&&h;if(k&&j[k]&&(e||j[k].data)||void 0!==d||"string"!=typeof b)return k||(k=i?a[h]=c.pop()||n.guid++:h),j[k]||(j[k]=i?{}:{toJSON:n.noop}),("object"==typeof b||"function"==typeof b)&&(e?j[k]=n.extend(j[k],b):j[k].data=n.extend(j[k].data,b)),g=j[k],e||(g.data||(g.data={}),g=g.data),void 0!==d&&(g[n.camelCase(b)]=d),"string"==typeof b?(f=g[b],null==f&&(f=g[n.camelCase(b)])):f=g,f}}function N(a,b,c){if(n.acceptData(a)){var d,e,f=a.nodeType,g=f?n.cache:a,h=f?a[n.expando]:n.expando;if(g[h]){if(b&&(d=c?g[h]:g[h].data)){n.isArray(b)?b=b.concat(n.map(b,n.camelCase)):b in d?b=[b]:(b=n.camelCase(b),b=b in d?[b]:b.split(" ")),e=b.length;while(e--)delete d[b[e]];if(c?!L(d):!n.isEmptyObject(d))return}(c||(delete g[h].data,L(g[h])))&&(f?n.cleanData([a],!0):l.deleteExpando||g!=g.window?delete g[h]:g[h]=null)}}}n.extend({cache:{},noData:{"applet ":!0,"embed ":!0,"object ":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(a){return a=a.nodeType?n.cache[a[n.expando]]:a[n.expando],!!a&&!L(a)},data:function(a,b,c){return M(a,b,c)},removeData:function(a,b){return N(a,b)},_data:function(a,b,c){return M(a,b,c,!0)},_removeData:function(a,b){return N(a,b,!0)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=n.data(f),1===f.nodeType&&!n._data(f,"parsedAttrs"))){c=g.length;while(c--)d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),K(f,d,e[d]));n._data(f,"parsedAttrs",!0)}return e}return"object"==typeof a?this.each(function(){n.data(this,a)}):arguments.length>1?this.each(function(){n.data(this,a,b)}):f?K(f,a,n.data(f,a)):void 0},removeData:function(a){return this.each(function(){n.removeData(this,a)})}});var O=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,P=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f},Q=/^(?:checkbox|radio)$/i;!function(){var a=z.createDocumentFragment(),b=z.createElement("div"),c=z.createElement("input");if(b.setAttribute("className","t"),b.innerHTML="  <link/><table></table><a href='/a'>a</a>",l.leadingWhitespace=3===b.firstChild.nodeType,l.tbody=!b.getElementsByTagName("tbody").length,l.htmlSerialize=!!b.getElementsByTagName("link").length,l.html5Clone="<:nav></:nav>"!==z.createElement("nav").cloneNode(!0).outerHTML,c.type="checkbox",c.checked=!0,a.appendChild(c),l.appendChecked=c.checked,b.innerHTML="<textarea>x</textarea>",l.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue,a.appendChild(b),b.innerHTML="<input type='radio' checked='checked' name='t'/>",l.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,l.noCloneEvent=!0,b.attachEvent&&(b.attachEvent("onclick",function(){l.noCloneEvent=!1}),b.cloneNode(!0).click()),null==l.deleteExpando){l.deleteExpando=!0;try{delete b.test}catch(d){l.deleteExpando=!1}}a=b=c=null}(),function(){var b,c,d=z.createElement("div");for(b in{submit:!0,change:!0,focusin:!0})c="on"+b,(l[b+"Bubbles"]=c in a)||(d.setAttribute(c,"t"),l[b+"Bubbles"]=d.attributes[c].expando===!1);d=null}();var R=/^(?:input|select|textarea)$/i,S=/^key/,T=/^(?:mouse|contextmenu)|click/,U=/^(?:focusinfocus|focusoutblur)$/,V=/^([^.]*)(?:\.(.+)|)$/;
function W(){return!0}function X(){return!1}function Y(){try{return z.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n._data(a);if(r){c.handler&&(i=c,c=i.handler,e=i.selector),c.guid||(c.guid=n.guid++),(g=r.events)||(g=r.events={}),(k=r.handle)||(k=r.handle=function(a){return typeof n===G||a&&n.event.triggered===a.type?void 0:n.event.dispatch.apply(k.elem,arguments)},k.elem=a),b=(b||"").match(F)||[""],h=b.length;while(h--)f=V.exec(b[h])||[],o=q=f[1],p=(f[2]||"").split(".").sort(),o&&(j=n.event.special[o]||{},o=(e?j.delegateType:j.bindType)||o,j=n.event.special[o]||{},l=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},i),(m=g[o])||(m=g[o]=[],m.delegateCount=0,j.setup&&j.setup.call(a,d,p,k)!==!1||(a.addEventListener?a.addEventListener(o,k,!1):a.attachEvent&&a.attachEvent("on"+o,k))),j.add&&(j.add.call(a,l),l.handler.guid||(l.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,l):m.push(l),n.event.global[o]=!0);a=null}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=n.hasData(a)&&n._data(a);if(r&&(k=r.events)){b=(b||"").match(F)||[""],j=b.length;while(j--)if(h=V.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=k[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),i=f=m.length;while(f--)g=m[f],!e&&q!==g.origType||c&&c.guid!==g.guid||h&&!h.test(g.namespace)||d&&d!==g.selector&&("**"!==d||!g.selector)||(m.splice(f,1),g.selector&&m.delegateCount--,l.remove&&l.remove.call(a,g));i&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete k[o])}else for(o in k)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(k)&&(delete r.handle,n._removeData(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,l,m,o=[d||z],p=j.call(b,"type")?b.type:b,q=j.call(b,"namespace")?b.namespace.split("."):[];if(h=l=d=d||z,3!==d.nodeType&&8!==d.nodeType&&!U.test(p+n.event.triggered)&&(p.indexOf(".")>=0&&(q=p.split("."),p=q.shift(),q.sort()),g=p.indexOf(":")<0&&"on"+p,b=b[n.expando]?b:new n.Event(p,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=q.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+q.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),k=n.event.special[p]||{},e||!k.trigger||k.trigger.apply(d,c)!==!1)){if(!e&&!k.noBubble&&!n.isWindow(d)){for(i=k.delegateType||p,U.test(i+p)||(h=h.parentNode);h;h=h.parentNode)o.push(h),l=h;l===(d.ownerDocument||z)&&o.push(l.defaultView||l.parentWindow||a)}m=0;while((h=o[m++])&&!b.isPropagationStopped())b.type=m>1?i:k.bindType||p,f=(n._data(h,"events")||{})[b.type]&&n._data(h,"handle"),f&&f.apply(h,c),f=g&&h[g],f&&f.apply&&n.acceptData(h)&&(b.result=f.apply(h,c),b.result===!1&&b.preventDefault());if(b.type=p,!e&&!b.isDefaultPrevented()&&(!k._default||k._default.apply(o.pop(),c)===!1)&&n.acceptData(d)&&g&&d[p]&&!n.isWindow(d)){l=d[g],l&&(d[g]=null),n.event.triggered=p;try{d[p]()}catch(r){}n.event.triggered=void 0,l&&(d[g]=l)}return b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(n._data(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,g=0;while((e=f.handlers[g++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(e.namespace))&&(a.handleObj=e,a.data=e.data,c=((n.event.special[e.origType]||{}).handle||e.handler).apply(f.elem,i),void 0!==c&&(a.result=c)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!=this;i=i.parentNode||this)if(1===i.nodeType&&(i.disabled!==!0||"click"!==a.type)){for(e=[],f=0;h>f;f++)d=b[f],c=d.selector+" ",void 0===e[c]&&(e[c]=d.needsContext?n(c,this).index(i)>=0:n.find(c,this,null,[i]).length),e[c]&&e.push(d);e.length&&g.push({elem:i,handlers:e})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=T.test(e)?this.mouseHooks:S.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=f.srcElement||z),3===a.target.nodeType&&(a.target=a.target.parentNode),a.metaKey=!!a.metaKey,g.filter?g.filter(a,f):a},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button,g=b.fromElement;return null==a.pageX&&null!=b.clientX&&(d=a.target.ownerDocument||z,e=d.documentElement,c=d.body,a.pageX=b.clientX+(e&&e.scrollLeft||c&&c.scrollLeft||0)-(e&&e.clientLeft||c&&c.clientLeft||0),a.pageY=b.clientY+(e&&e.scrollTop||c&&c.scrollTop||0)-(e&&e.clientTop||c&&c.clientTop||0)),!a.relatedTarget&&g&&(a.relatedTarget=g===a.target?b.toElement:g),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==Y()&&this.focus)try{return this.focus(),!1}catch(a){}},delegateType:"focusin"},blur:{trigger:function(){return this===Y()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return n.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=z.removeEventListener?function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)}:function(a,b,c){var d="on"+b;a.detachEvent&&(typeof a[d]===G&&(a[d]=null),a.detachEvent(d,c))},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&(a.returnValue===!1||a.getPreventDefault&&a.getPreventDefault())?W:X):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:X,isPropagationStopped:X,isImmediatePropagationStopped:X,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=W,a&&(a.preventDefault?a.preventDefault():a.returnValue=!1)},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=W,a&&(a.stopPropagation&&a.stopPropagation(),a.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=W,this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),l.submitBubbles||(n.event.special.submit={setup:function(){return n.nodeName(this,"form")?!1:void n.event.add(this,"click._submit keypress._submit",function(a){var b=a.target,c=n.nodeName(b,"input")||n.nodeName(b,"button")?b.form:void 0;c&&!n._data(c,"submitBubbles")&&(n.event.add(c,"submit._submit",function(a){a._submit_bubble=!0}),n._data(c,"submitBubbles",!0))})},postDispatch:function(a){a._submit_bubble&&(delete a._submit_bubble,this.parentNode&&!a.isTrigger&&n.event.simulate("submit",this.parentNode,a,!0))},teardown:function(){return n.nodeName(this,"form")?!1:void n.event.remove(this,"._submit")}}),l.changeBubbles||(n.event.special.change={setup:function(){return R.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(n.event.add(this,"propertychange._change",function(a){"checked"===a.originalEvent.propertyName&&(this._just_changed=!0)}),n.event.add(this,"click._change",function(a){this._just_changed&&!a.isTrigger&&(this._just_changed=!1),n.event.simulate("change",this,a,!0)})),!1):void n.event.add(this,"beforeactivate._change",function(a){var b=a.target;R.test(b.nodeName)&&!n._data(b,"changeBubbles")&&(n.event.add(b,"change._change",function(a){!this.parentNode||a.isSimulated||a.isTrigger||n.event.simulate("change",this.parentNode,a,!0)}),n._data(b,"changeBubbles",!0))})},handle:function(a){var b=a.target;return this!==b||a.isSimulated||a.isTrigger||"radio"!==b.type&&"checkbox"!==b.type?a.handleObj.handler.apply(this,arguments):void 0},teardown:function(){return n.event.remove(this,"._change"),!R.test(this.nodeName)}}),l.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=n._data(d,b);e||d.addEventListener(a,c,!0),n._data(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=n._data(d,b)-1;e?n._data(d,b,e):(d.removeEventListener(a,c,!0),n._removeData(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(f in a)this.on(f,b,c,a[f],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=X;else if(!d)return this;return 1===e&&(g=d,d=function(a){return n().off(a),g.apply(this,arguments)},d.guid=g.guid||(g.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=X),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});function Z(a){var b=$.split("|"),c=a.createDocumentFragment();if(c.createElement)while(b.length)c.createElement(b.pop());return c}var $="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",_=/ jQuery\d+="(?:null|\d+)"/g,ab=new RegExp("<(?:"+$+")[\\s/>]","i"),bb=/^\s+/,cb=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,db=/<([\w:]+)/,eb=/<tbody/i,fb=/<|&#?\w+;/,gb=/<(?:script|style|link)/i,hb=/checked\s*(?:[^=]|=\s*.checked.)/i,ib=/^$|\/(?:java|ecma)script/i,jb=/^true\/(.*)/,kb=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,lb={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:l.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},mb=Z(z),nb=mb.appendChild(z.createElement("div"));lb.optgroup=lb.option,lb.tbody=lb.tfoot=lb.colgroup=lb.caption=lb.thead,lb.th=lb.td;function ob(a,b){var c,d,e=0,f=typeof a.getElementsByTagName!==G?a.getElementsByTagName(b||"*"):typeof a.querySelectorAll!==G?a.querySelectorAll(b||"*"):void 0;if(!f)for(f=[],c=a.childNodes||a;null!=(d=c[e]);e++)!b||n.nodeName(d,b)?f.push(d):n.merge(f,ob(d,b));return void 0===b||b&&n.nodeName(a,b)?n.merge([a],f):f}function pb(a){Q.test(a.type)&&(a.defaultChecked=a.checked)}function qb(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function rb(a){return a.type=(null!==n.find.attr(a,"type"))+"/"+a.type,a}function sb(a){var b=jb.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function tb(a,b){for(var c,d=0;null!=(c=a[d]);d++)n._data(c,"globalEval",!b||n._data(b[d],"globalEval"))}function ub(a,b){if(1===b.nodeType&&n.hasData(a)){var c,d,e,f=n._data(a),g=n._data(b,f),h=f.events;if(h){delete g.handle,g.events={};for(c in h)for(d=0,e=h[c].length;e>d;d++)n.event.add(b,c,h[c][d])}g.data&&(g.data=n.extend({},g.data))}}function vb(a,b){var c,d,e;if(1===b.nodeType){if(c=b.nodeName.toLowerCase(),!l.noCloneEvent&&b[n.expando]){e=n._data(b);for(d in e.events)n.removeEvent(b,d,e.handle);b.removeAttribute(n.expando)}"script"===c&&b.text!==a.text?(rb(b).text=a.text,sb(b)):"object"===c?(b.parentNode&&(b.outerHTML=a.outerHTML),l.html5Clone&&a.innerHTML&&!n.trim(b.innerHTML)&&(b.innerHTML=a.innerHTML)):"input"===c&&Q.test(a.type)?(b.defaultChecked=b.checked=a.checked,b.value!==a.value&&(b.value=a.value)):"option"===c?b.defaultSelected=b.selected=a.defaultSelected:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}}n.extend({clone:function(a,b,c){var d,e,f,g,h,i=n.contains(a.ownerDocument,a);if(l.html5Clone||n.isXMLDoc(a)||!ab.test("<"+a.nodeName+">")?f=a.cloneNode(!0):(nb.innerHTML=a.outerHTML,nb.removeChild(f=nb.firstChild)),!(l.noCloneEvent&&l.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(d=ob(f),h=ob(a),g=0;null!=(e=h[g]);++g)d[g]&&vb(e,d[g]);if(b)if(c)for(h=h||ob(a),d=d||ob(f),g=0;null!=(e=h[g]);g++)ub(e,d[g]);else ub(a,f);return d=ob(f,"script"),d.length>0&&tb(d,!i&&ob(a,"script")),d=h=e=null,f},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k,m=a.length,o=Z(b),p=[],q=0;m>q;q++)if(f=a[q],f||0===f)if("object"===n.type(f))n.merge(p,f.nodeType?[f]:f);else if(fb.test(f)){h=h||o.appendChild(b.createElement("div")),i=(db.exec(f)||["",""])[1].toLowerCase(),k=lb[i]||lb._default,h.innerHTML=k[1]+f.replace(cb,"<$1></$2>")+k[2],e=k[0];while(e--)h=h.lastChild;if(!l.leadingWhitespace&&bb.test(f)&&p.push(b.createTextNode(bb.exec(f)[0])),!l.tbody){f="table"!==i||eb.test(f)?"<table>"!==k[1]||eb.test(f)?0:h:h.firstChild,e=f&&f.childNodes.length;while(e--)n.nodeName(j=f.childNodes[e],"tbody")&&!j.childNodes.length&&f.removeChild(j)}n.merge(p,h.childNodes),h.textContent="";while(h.firstChild)h.removeChild(h.firstChild);h=o.lastChild}else p.push(b.createTextNode(f));h&&o.removeChild(h),l.appendChecked||n.grep(ob(p,"input"),pb),q=0;while(f=p[q++])if((!d||-1===n.inArray(f,d))&&(g=n.contains(f.ownerDocument,f),h=ob(o.appendChild(f),"script"),g&&tb(h),c)){e=0;while(f=h[e++])ib.test(f.type||"")&&c.push(f)}return h=null,o},cleanData:function(a,b){for(var d,e,f,g,h=0,i=n.expando,j=n.cache,k=l.deleteExpando,m=n.event.special;null!=(d=a[h]);h++)if((b||n.acceptData(d))&&(f=d[i],g=f&&j[f])){if(g.events)for(e in g.events)m[e]?n.event.remove(d,e):n.removeEvent(d,e,g.handle);j[f]&&(delete j[f],k?delete d[i]:typeof d.removeAttribute!==G?d.removeAttribute(i):d[i]=null,c.push(f))}}}),n.fn.extend({text:function(a){return P(this,function(a){return void 0===a?n.text(this):this.empty().append((this[0]&&this[0].ownerDocument||z).createTextNode(a))},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=qb(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=qb(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(ob(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&tb(ob(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++){1===a.nodeType&&n.cleanData(ob(a,!1));while(a.firstChild)a.removeChild(a.firstChild);a.options&&n.nodeName(a,"select")&&(a.options.length=0)}return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return P(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a)return 1===b.nodeType?b.innerHTML.replace(_,""):void 0;if(!("string"!=typeof a||gb.test(a)||!l.htmlSerialize&&ab.test(a)||!l.leadingWhitespace&&bb.test(a)||lb[(db.exec(a)||["",""])[1].toLowerCase()])){a=a.replace(cb,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(ob(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(ob(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,k=this.length,m=this,o=k-1,p=a[0],q=n.isFunction(p);if(q||k>1&&"string"==typeof p&&!l.checkClone&&hb.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(k&&(i=n.buildFragment(a,this[0].ownerDocument,!1,this),c=i.firstChild,1===i.childNodes.length&&(i=c),c)){for(g=n.map(ob(i,"script"),rb),f=g.length;k>j;j++)d=i,j!==o&&(d=n.clone(d,!0,!0),f&&n.merge(g,ob(d,"script"))),b.call(this[j],d,j);if(f)for(h=g[g.length-1].ownerDocument,n.map(g,sb),j=0;f>j;j++)d=g[j],ib.test(d.type||"")&&!n._data(d,"globalEval")&&n.contains(h,d)&&(d.src?n._evalUrl&&n._evalUrl(d.src):n.globalEval((d.text||d.textContent||d.innerHTML||"").replace(kb,"")));i=c=null}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=0,e=[],g=n(a),h=g.length-1;h>=d;d++)c=d===h?this:this.clone(!0),n(g[d])[b](c),f.apply(e,c.get());return this.pushStack(e)}}),function(){var a,b,c,d,e=z.createElement("div");e.setAttribute("className","t"),e.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",a=e.getElementsByTagName("a")[0],c=z.createElement("select"),d=c.appendChild(z.createElement("option")),b=e.getElementsByTagName("input")[0],a.style.cssText="top:1px",l.getSetAttribute="t"!==e.className,l.style=/top/.test(a.getAttribute("style")),l.hrefNormalized="/a"===a.getAttribute("href"),l.checkOn=!!b.value,l.optSelected=d.selected,l.enctype=!!z.createElement("form").enctype,c.disabled=!0,l.optDisabled=!d.disabled,b=z.createElement("input"),b.setAttribute("value",""),l.input=""===b.getAttribute("value"),b.value="t",b.setAttribute("type","radio"),l.radioValue="t"===b.value,a=b=c=d=e=null}();var wb=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(wb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.text(a)}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(l.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)if(d=e[g],n.inArray(n.valHooks.option.get(d),f)>=0)try{d.selected=c=!0}catch(h){d.scrollHeight}else d.selected=!1;return c||(a.selectedIndex=-1),e}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},l.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})});var xb,yb,zb=n.expr.attrHandle,Ab=/^(?:checked|selected)$/i,Bb=l.getSetAttribute,Cb=l.input;n.fn.extend({attr:function(a,b){return P(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===G?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?yb:xb)),void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(F);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)?Cb&&Bb||!Ab.test(c)?a[d]=!1:a[n.camelCase("default-"+c)]=a[d]=!1:n.attr(a,c,""),a.removeAttribute(Bb?c:d)},attrHooks:{type:{set:function(a,b){if(!l.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),yb={set:function(a,b,c){return b===!1?n.removeAttr(a,c):Cb&&Bb||!Ab.test(c)?a.setAttribute(!Bb&&n.propFix[c]||c,c):a[n.camelCase("default-"+c)]=a[c]=!0,c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=zb[b]||n.find.attr;zb[b]=Cb&&Bb||!Ab.test(b)?function(a,b,d){var e,f;return d||(f=zb[b],zb[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,zb[b]=f),e}:function(a,b,c){return c?void 0:a[n.camelCase("default-"+b)]?b.toLowerCase():null}}),Cb&&Bb||(n.attrHooks.value={set:function(a,b,c){return n.nodeName(a,"input")?void(a.defaultValue=b):xb&&xb.set(a,b,c)}}),Bb||(xb={set:function(a,b,c){var d=a.getAttributeNode(c);return d||a.setAttributeNode(d=a.ownerDocument.createAttribute(c)),d.value=b+="","value"===c||b===a.getAttribute(c)?b:void 0}},zb.id=zb.name=zb.coords=function(a,b,c){var d;return c?void 0:(d=a.getAttributeNode(b))&&""!==d.value?d.value:null},n.valHooks.button={get:function(a,b){var c=a.getAttributeNode(b);return c&&c.specified?c.value:void 0},set:xb.set},n.attrHooks.contenteditable={set:function(a,b,c){xb.set(a,""===b?!1:b,c)}},n.each(["width","height"],function(a,b){n.attrHooks[b]={set:function(a,c){return""===c?(a.setAttribute(b,"auto"),c):void 0}}})),l.style||(n.attrHooks.style={get:function(a){return a.style.cssText||void 0},set:function(a,b){return a.style.cssText=b+""}});var Db=/^(?:input|select|textarea|button|object)$/i,Eb=/^(?:a|area)$/i;n.fn.extend({prop:function(a,b){return P(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return a=n.propFix[a]||a,this.each(function(){try{this[a]=void 0,delete this[a]}catch(b){}})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){var b=n.find.attr(a,"tabindex");return b?parseInt(b,10):Db.test(a.nodeName)||Eb.test(a.nodeName)&&a.href?0:-1}}}}),l.hrefNormalized||n.each(["href","src"],function(a,b){n.propHooks[b]={get:function(a){return a.getAttribute(b,4)}}}),l.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&(b.selectedIndex,b.parentNode&&b.parentNode.selectedIndex),null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this}),l.enctype||(n.propFix.enctype="encoding");var Fb=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j="string"==typeof a&&a;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(F)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(Fb," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0,i=this.length,j=0===arguments.length||"string"==typeof a&&a;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(j)for(b=(a||"").match(F)||[];i>h;h++)if(c=this[h],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(Fb," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(F)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===G||"boolean"===c)&&(this.className&&n._data(this,"__className__",this.className),this.className=this.className||a===!1?"":n._data(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(Fb," ").indexOf(b)>=0)return!0;return!1}}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}}),n.fn.extend({wrapAll:function(a){if(n.isFunction(a))return this.each(function(b){n(this).wrapAll(a.call(this,b))});if(this[0]){var b=n(a,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstChild&&1===a.firstChild.nodeType)a=a.firstChild;return a}).append(this)}return this},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||z;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Gb=a.jQuery,Hb=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Hb),b&&a.jQuery===n&&(a.jQuery=Gb),n},typeof b===G&&(a.jQuery=a.$=n),n});
//# sourceMappingURL=jquery.min.map



/*!
 * @desc BakaBakaMark: An Extensible LML-HTML Compiler
 * @version 1.0.0
 * @license BSD-2-Clause; Copyright (c) 2014 Preole, All rights reserved.
*/
var BBM=function(){"use strict";function a(a){for(var b=[],c=0,d=a.length;d>c;c+=1)b.push(A.CSS_PRE+i(a[c]));return b.join(M)}function b(a,b){return A.CSS_PRE_ID+(b?i(a):a)}function c(a){return F.lastIndex=0,a.replace(F,"")}function d(a){return I.lastIndex=0,a.replace(I,"")}function e(a){return H.lastIndex=0,a.replace(H,"")}function f(a){return a.replace(/(^\s+)|(\s+$)/g,"")}function g(a){return a.replace(/\s+$/g,"")}function h(a){return m(f(d(a)))}function i(a){return c(d(a))}function j(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")}function k(a){return a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function l(a){return j(f(d(a))).replace(/`/g,"&#x60;")}function m(a){return a.replace(/^javascript:/i,"javascript;").replace(/^data:/i,"data;")}function n(a,b){var c="";if(0>=b)return c;for(;1&b&&(c+=a),b>>=1,b;)a+=a;return c}function o(a,b,c){var d=(a.length>>>0)-1,e=c?c:d;if(0>e)return-1;for(e>a.length-1&&(e=d),e;e>=0&&a[e]!==b;e-=1);return e}function p(a,b,c){for(var d=[],e=0,f=a.length>>>0;f>e;e+=1){var g=a[e];b.call(c,g,e,a)&&d.push(g)}return d}function q(){var a=Array.prototype.slice.call(arguments,0),b=0,c=a.length,d=Object.prototype.hasOwnProperty,e=null;for(b=0;c>b&&(e=a[b],!(e instanceof Object));b+=1);for(b+=1;c>b;b+=1)if("object"==typeof a[b]||"function"==typeof a[b])for(var f in a[b])d.call(a[b],f)&&(e[f]=a[b][f]);return e}function r(a,b,c){this.col=c,this.lexeme=b,this.type=a}function s(a,b){this.children=[],this.type=a,this.err=!1,this.meta=b||{},this.parent=null,this.isDeleted=!1}function t(a){function b(b){return a.charAt(Y+(b||0))}function c(b){var c=a.substring(Y+1,b.length+Y+1);return c===b}function d(a){return E.test(b(a))}function e(a){return G.test(b(a))||""===b(a)}function f(a){return e(a)||d(a)}function g(b){b=Math.abs(b||1),Y+=b,X+=b,Z=a.charAt(Y)}function h(b){b=Math.abs(b||1),W+=b,Y+=b,Z=a.charAt(Y)}function i(){return""!==Z}function j(b){var c=a.substring(W,Y),d=U[U.length-1];d&&d.isType(N.TEXT)&&b===N.TEXT?($=d,d.lexeme+=c):($=new r(b,c,V),U.push($))}function k(){d(1)&&(g(2),j(N.UL_ITEM))}function l(){if(c("-}"))g(3),j(N.DEL_END);else if(c("---")){for(;"-"===Z;)g();e()&&j(N.DIV_LINE)}else"["===b(1)?(g(2),j(N.LINK_CONT)):d(1)&&(g(2),j(N.UL_ITEM))}function m(){for(;"="===Z;)g();j(e()?N.ATX_END:N.ATX)}function n(){d(1)?(g(2),j(N.UL_ITEM)):c("+}")&&(g(3),j(N.INS_END))}function o(){if(d(1))g(2),j(N.UL_ITEM);else if("*"!==b(1)||c("***")){if(c("***")){for(;"*"===Z;)g();e()&&j(N.ASIDE_DELIM)}}else g(2),j(N.BOLD)}function p(){"!"===b(1)?(g(2),j(N.TH)):"<"===b(1)&&A.ALLOW_IMG&&(g(2),j(N.LINK_IMG))}function q(){if("|"===b(1))g(2),j(N.TD);else if("="===b(1)){for(g();"="===Z;)g();e()&&j(N.TR_DELIM)}}function s(){if(c('""')){for(;'"'===Z;)g();j(N.CODE)}}function t(){"."===b(1)&&d(2)?(g(3),j(N.OL_ITEM)):"<"===b(1)&&A.ALLOW_LINK?(g(2),j(N.LINK_WIKI)):"["===b(1)&&A.ALLOW_LINK&&(g(2),j(N.LINK_INT))}function u(){for(;K.test(Z);)g();"."===b()&&d(1)&&(g(2),j(N.OL_ITEM))}function v(){"^"===b(1)&&(g(2),j(N.SUP))}function w(){","===b(1)&&(g(2),j(N.SUB))}function x(){"_"===b(1)&&(g(2),j(N.UNDER))}function y(){"<"===b(1)&&A.ALLOW_LINK&&(g(2),j(N.LINK_EXT))}function z(){g(),j(N.BRACKET_L)}function B(){g(),j(N.BRACKET_R)}function C(){c("--")?(g(3),j(N.DEL)):c("++")&&(g(3),j(N.INS))}function D(){":"===b(1)&&(g(2),j(N.LINK_REF_END))}function F(){g(),j(N.GT_THAN)}function H(){e(1)?(g(),j(N.LABEL_STOP)):A.ALLOW_ID&&d(1)?(g(2),j(N.LABEL_ID)):A.ALLOW_CLASS&&"."===b(1)&&d(2)&&(g(3),j(N.LABEL_CLASS))}function I(){"'"===b(1)&&(g(2),j(N.ITAL))}function J(){if(c("///")){for(;"/"===Z;)g();e()&&j(N.COMMENT_DELIM)}}function M(){d(1)&&(g(2),j(N.DT_MARK))}function O(){d(1)?(g(2),j(N.DD_MARK)):"{"===b(1)&&(g(2),j(N.LINK_REF))}function P(){for(;!ab[Z]&&!f()&&i();)g();j(N.TEXT)}function Q(){for(;E.test(Z);)g();j(N.SPACES)}function R(){"\r"===Z&&"\n"===b(1)?(g(2),_["\r\n"]=(_[Z]||0)+1):(g(1),_[Z]=(_[Z]||0)+1),j(N.NL),X=1}function S(){h(),f()?d()?Q():R():(g(),P(N.TEXT))}for(var T=null,U=[],V=1,W=0,X=1,Y=0,Z=a.charAt(Y),$=null,_={"\r\n":0,"\n":0,"\r":0},ab={"[":z,"]":B,"{":C,"}":D,":":O,";":M,"-":l,"=":m,"|":q,"!":p,"#":t,"+":n,"*":o,"^":v,",":w,_:x,"'":I,">":F,"?":y,".":H,"/":J,'"':s,"\\":S,"•":k,"⁃":k};i();)ab[Z]?ab[Z]():E.test(Z)?Q():G.test(Z)?R():K.test(Z)?u():P(),Y===W&&g(),$===T&&P(),Z=a.charAt(Y),$=T,V=X,W=Y;j(N.EOF);var bb=0;for(var cb in _)_[cb]>bb&&(bb=_[cb],L=cb);return"\r\n"!==L&&"\r"!==L&&"\n"!==L&&(L="\n"),U}function u(a){function b(){return a[cb+1]&&(cb+=1,db=a[cb]),cb}function c(b){return a[b]&&(cb=b,db=a[cb]),cb}function d(b,c){var d=c?c+cb:cb;return a[d]?a[d].isType(b):!1}function e(a){var b=a||0;return d(N.NL,b)||d(N.EOF,b)}function g(){return db instanceof r&&!d(N.EOF)}function j(a){var b=d(N.SPACES);return b&&l()&&(db.lexeme=db.substring(a-1,db.getLength())),b}function k(a){if(!g()||m())return!0;if(db.col<a&&!d(N.SPACES)&&!e())return!0;var b=T[db.type],c=l()&&p();return b&&c}function l(){return e(-1)||d(N.SPACES,-1)&&e(-2)}function m(){var a=0;return e(a)?e(a+1)?!0:d(N.SPACES,a+1)&&e(a+2):!1}function n(a){return l()&&db.col===a?d(N.DIV_LINE)||d(N.ATX_END):!1}function p(){return e(1)||d(N.SPACES,1)&&e(2)}function q(a,b){var c=b?b:db;return a?(X[c.type]?a.push(0):Y[c.type]&&a.pop(),a.length<=0):!1}function t(a){return d(N.GT_THAN)&&U[a.type]}function u(a){return l()&&db.col===a.col&&p()?db.isSameType(a)&&db.lexeme===a.lexeme:!1}function v(a){return db!==a&&db.isSameType(a)?d(N.CODE)&&db.lexeme==a.lexeme:!1}function w(){var a=0;return d(N.SPACES,a)&&(a+=1),d(N.NL,a)&&(a+=1),d(N.SPACES,a)&&(a+=1),d(N.LINK_CONT,a)}function x(b,c){for(var d="",e=b;c>e&&a[e]instanceof r;e+=1)d+=a[e].lexeme;return d}function y(a,c){for(var d=cb;g()&&!a[db.type];)b();return c?x(d,cb):void 0}function z(a,c){for(var d=cb;!e();)b();return c&&b(),a?x(d,cb):void 0}function B(){for(;d(N.SPACES)||d(N.NL);)b()}function C(){var a=db,b=new s(O.ASIDE);for(z(!1,!0),B();g()&&db.col>=a.col;){if(u(a)){z();break}b.addNode(E()),B()}return b}function D(){var a=db.lexeme.length,d=cb;b();var e=f(y(V,!0));if(z(),0===e.length)return c(d),db.type=N.TEXT,null;var g=new s(O.HEADER);return g.addText(e),g.meta.HEADERLVL=a,g}function E(){var a=null,b=eb<A.MAX_BLOCKS;if(B(),P[db.type]&&b)eb+=1,a=I(),eb-=1;else{if(d(N.LABEL_ID)||d(N.LABEL_CLASS))return H();if(d(N.CODE)&&d(N.NL,1))a=F();else if(d(N.ASIDE_DELIM)&&b)eb+=1,a=C(),eb-=1;else if(d(N.ATX))a=D();else if(d(N.LINK_REF))a=J();else{if(d(N.COMMENT_DELIM))return G(),a;d(N.TR_DELIM)?(z(),a=new s(O.TR)):d(N.LABEL_STOP)?(z(),a=new s(O.STOP)):d(N.DIV_LINE)?(z(),a=new s(O.DIV_LINE)):d(N.ATX_END)&&(db.type=N.TEXT)}}return!a&&g()&&(B(),a=K()),a}function F(){var a=new s(O.CODE_BLOCK),c=db;z(!1,!0);for(var e=cb,f=cb;g()&&(j(c.col),!u(c));)f=b();return d(N.SPACES,-1)&&(f-=1),a.addText(x(e,f)),e>=f&&a.addText(L),z(),a}function G(){for(var a=db;g();)if(z(),B(),u(a)){z();break}}function H(){var a=db.isType(N.LABEL_ID);b();var c=i(z(!0,!1));return 0===c.length||a&&fb[c]?null:(a&&(fb[c]=c),new s(a?O.ID:O.CLASS,{ID:c}))}function I(){var a=new s(P[db.type]);if(b(),d(N.SPACES)&&b(),e())return a;if(a.isType(O.DT))return a.addNodes(K()),a;for(var c=db.col;g()&&db.col>=c;)a.addNode(E()),B();return a}function J(){var a=cb,e="",f="";return b(),e=h(y(W,!0)),d(N.LINK_REF_END)?(b(),f=h(z(!0)),0===e.length||0===f.length?(c(a),K()):new s(O.LINK_REF,{REF_ID:e,URL:f})):(c(a),K())}function K(a,c,e,f){for(var g=c?c:[],h=a||db.col,i=new s(O.PARA),l=cb,m=cb,p=db,r=!1,t=null;!k(h)&&(j(h),r||!q(e,p));){if(R[p.type]){var u=o(g,p.type);if(u>=0){u===g.length-1&&(i.type=R[p.type]);break}var v=S[p.type],y=g.length>=A.MAX_SPANS;v&&!y&&(b(),g.push(v),t=K(h,g,e,f),g.pop(),t.err=t.isType(O.PARA))}else if(Q[p.type])t=_(h,f);else if(p.isType(N.CODE))t=$(h);else if(r&&p.isType(N.LINK_CONT)){var z=M(h,i.getLast());z===i.getLast()?l=cb+1:t=z,r=!1}t instanceof s?(t.err?m+=1:k(h)||(b(),r=Z[t.type]&&w()),i.addText(x(l,m)),i.addNode(t),l=cb):b(),m=cb,p=db,t=null}return!c&&n(h)&&(i.type=O.HEADER,i.meta.HEADERLVL=d(N.ATX_END)?1:2,b()),i.addText(x(l,m)),i}function M(a,c){if(!(c instanceof s&&Z[c.type]))return null;var d=null;if(c.isType(O.LINK_IMG)){if(d=ab(a),d.err)return d;c.meta.ALT=d.meta.TEXT}else{var e=[0];if(b(),d=K(a,[],e,!0),0!==e.length)return d.err=!0,d;c.addNodes(d)}return c}function $(a){var b=ab(a);if(b.err)return b;var c=new s(O.CODE);return c.addNode(b),c}function _(a,b){var c=db,d=c.isType(N.LINK_IMG);if(b&&!d)return null;var e=ab(a);return e.err||(e.type=Q[c.type],e.meta.URL=h(e.meta.TEXT),e.err=0===e.meta.URL.length,e.err?(e.type=O.TEXT,delete e.meta.URL):(delete e.meta.TEXT,d&&(e.meta.ALT=""))),e}function ab(a){var c=new s(O.TEXT),d=db,e=cb+1,f=X[d.type]?[0]:null;for(c.err=!0,b();!k(a);){if(j(a),q(f)||v(d)||t(d)){c.err=!1;break}b()}return c.meta.TEXT=x(e,cb),c}for(var bb=new s(O.ROOT),cb=0,db=a[cb],eb=0,fb=Object.create(null);g();)bb.addNode(E());return bb}function v(a){function b(a){for(var b=a.getLast();b&&b.isType(O.TR)&&0===b.getLength();)a.pop(),b=a.getLast();for(var c=a.getFirst().getLength(),d=0,e=a.getLength();e>d;d+=1){for(var f=a.children[d];f.getLength()>c;)f.pop();for(;f.getLength()<c&&f.getLength()>0;)f.addNode_simple(new s(O.TD));f.isDeleted=f.getLength()<=0}}function c(a){for(var b=a.getLast();b&&b.isType(O.DT);)a.pop(),b=a.getLast();for(var c=a.getFirst();c&&c.isType(O.DD);)a.popFirst(),c=a.getFirst();a.isDeleted=0===a.getLength()}function d(a){var b=0,c=0,f=null;for(b=0,c=a.getLength();c>b&&(f=a.children[b],!f.isType(O.TEXT)||J.test(f.meta.TEXT))&&(!(f.getLength()>0||Z[f.type])||(d(f),f.isDeleted));b+=1);if(a.isDeleted=b>=c&&!Z[a.type],!a.isDeleted&&(Z[a.type]&&1===a.getLength()&&(f=a.getLast(),f.isType(O.TEXT)&&J.test(f.meta.TEXT)&&a.pop()),A.RM_EOL))for(b=0,c=a.getLength();c>b;b+=1)f=a.children[b],f.isType(N.TEXT)&&(f.meta.TEXT=e(f.meta.TEXT))}function f(a){for(var e=0,i=a.getLength();i>e;e+=1){var j=a.children[e];if(j.isType(O.TABLE)&&b(j),j.isType(O.DL)&&c(j),j.isType(O.TEXT)||$[j.type]||Z[j.type]){if(d(a),!a.isDeleted){var k=a.getLast();k.isType(O.TEXT)&&(k.meta.TEXT=g(k.meta.TEXT))}return}j.getLength()>0&&!j.isType(O.CODE_BLOCK)&&f(j),j.isDeleted=_[j.type]&&j.getLength()<=0}h(a)}function h(a){var b=a.getLength()-1;for(b;b>=0;b-=1){var c=a.children[b];if(!c.isDeleted&&!ab[c.type])break;a.pop()}a.isDeleted=0>b&&!Z[a.type]}function i(a){return a.isDeleted?!1:(a.children=p(a.children,i),(_[a.type]||$[a.type])&&(a.isDeleted=a.getLength()<=0),!a.isDeleted)}return f(a),a.children=p(a.children,i),a}function w(a){return v(u(t(a)))}function x(c){function d(a,b){if(!bb[a.type])return"";var c=bb[a.type],d="<"+c;if(a.isType(O.HEADER)&&a.meta.HEADERLVL){var e=a.meta.HEADERLVL+A.MIN_HEADER;d+=e>6?"6":e+""}if(b)for(var f in b)b[f]=b[f].substring(0,A.MAX_ATTR_CHARS),d+=" "+f+'="'+l(b[f])+'"';return cb[a.type]&&A.XHTML&&(d+="/"),d+=">",a.isType(O.CODE_BLOCK)&&(d+="<code>"),d}function e(a){if(!bb[a.type])return"";var b=bb[a.type];if(a.isType(O.HEADER)&&a.meta.HEADERLVL){var c=a.meta.HEADERLVL+A.MIN_HEADER;b+=c>6?"6":c+""}return a.isType(O.CODE_BLOCK)?"</code></"+b+">":"</"+b+">"}function f(a){return a instanceof s&&a.meta.TEXT?A.XHTML?j(a.meta.TEXT):k(a.meta.TEXT):""}function g(a){for(var c=a.meta.URL,f=a.isType(O.LINK_IMG),g=a.meta.ALT,j=a.parent,l=!1;j;){if(Z[j.type]&&(l=!0),j.meta.SYM_TABLE&&j.meta.SYM_TABLE[c]){c=j.meta.SYM_TABLE[c];break}j=j.parent}a.isType(O.LINK_INT)&&(c="#"+b(c,!0)),f&&J.test(g)&&l&&(g=c);var m=f?{src:c,alt:g}:{href:c};return f?d(a,m):(a.isType(O.LINK_WIKI)&&(m["class"]=i(A.CSS_WIKI)),a.getLength()>0?d(a,m)+h(a,m)+e(a):d(a,m)+k(a.meta.URL)+e(a))}function h(a){var b=a.getLength(),c=0,i="";for(c=0;b>c;c+=1){var j=a.children[c];i+=Z[j.type]?g(j):$[j.type]?d(j)+h(j)+e(j):f(j)}return i}function m(a,b,c){return n(M,c)+d(a,b)+L}function o(c,f,g,i){var j=c.getLength(),k=0,l=null,p="",q=null,r=null,s=null,t="",u=d(c,f),v=e(c,f),w=n(M,g);for(k=0;j>k;k+=1)if(l=c.children[k],l.isType(O.ID))s=b(l.meta.ID);else if(l.isType(O.CLASS))q=q?q:[],q.push(l.meta.ID);else{if((s||q)&&(r=Object.create(null),s&&(r.id=s),q&&(r["class"]=a(q,!0))),s=null,q=null,l.isType(O.DIV_LINE))p+=m(l,f,g);else{if(l.isType(O.TEXT)||$[l.type]||Z[l.type]){p+=h(c);break}p+=o(l,r,g+1,k===j-1)}r=null}if(c.isType(O.CODE_BLOCK))t=u+p+v;else{if(c.isType(O.ROOT))return p;t=w+u+L+p+L+w+v}return i||(t+=L),t}return o(c,null,-1,!1)}function y(a){return q(A,a)}function z(a,b){var c=q(Object.create(null),A);y(b);var d=x(w(a));return A=c,d}var A={RM_EOL:0,MAX_ATTR_CHARS:2048,MAX_BLOCKS:8,MAX_SPANS:10,ALLOW_IMG:1,ALLOW_LINK:1,ALLOW_CLASS:1,ALLOW_ID:1,CSS_PRE_ID:"bbm-",CSS_PRE:"bbm-",CSS_WIKI:"w-bbm",MIN_HEADER:0,XHTML:0},B="[ \\u2000-\\u200d\\t\\u202f\\u205f\\u3000\\u1680\\u180e\\u00a0\\u00b7\\u237d\\u2420\\u2422\\u2423]+",C="[\\v\\f\\r\\n\\u0085\\u2028\\u2029]+",D="[\\u0000-\\u001f\\u007f-\\u009f\\u2028\\u2029]+",E=new RegExp(B),F=new RegExp(B,"g"),G=new RegExp(C),H=new RegExp(C,"g"),I=new RegExp(D,"g"),J=/^\s*$/,K=/[0-9]+/,L="\n",M=" ",N={SPACES:"SPACES",NL:"NL",TEXT:"TEXT",UNDER:"UNDER",SUB:"SUB",SUP:"SUP",CODE:"CODE",ITAL:"ITAL",BOLD:"BOLD",INS:"INS",INS_END:"INS_END",DEL:"DEL",DEL_END:"DEL_END",DIV_LINE:"DIV_LINE",COMMENT_DELIM:"COMMENT_DELIM",ASIDE_DELIM:"ASIDE_DELIM",TH:"TH",TD:"TD",TR_DELIM:"TR_DELIM",ATX:"ATX",ATX_END:"ATX_END",OL_ITEM:"OL_ITEM",UL_ITEM:"UL_ITEM",DT_MARK:"DT_MARK",DD_MARK:"DD_MARK",LABEL_CLASS:"LABEL_CLASS",LABEL_ID:"LABEL_ID",LABEL_STOP:"LABEL_STOP",LINK_REF_END:"LINK_REF_END",LINK_REF:"LINK_REF",LINK_CONT:"LINK_CONT",LINK_INT:"LINK_INT",LINK_WIKI:"LINK_WIKI",LINK_EXT:"LINK_EXT",LINK_IMG:"LINK_IMG",GT_THAN:"GT_THAN",BRACKET_L:"BRACKET_L",BRACKET_R:"BRACKET_R",EOF:"EOF"},O={ROOT:"ROOT",PARA:"PARA",STOP:"STOP",BLOCKQUOTE:"BLOCKQUOTE",CODE_BLOCK:"CODE_BLOCK",ASIDE:"ASIDE",ID:"ID",CLASS:"CLASS",UL:"UL",OL:"OL",UL_LI:"UL_LI",OL_LI:"OL_LI",HEADER:"HEADER",DIV_LINE:"DIV_LINE",DT:"DT",DD:"DD",DL:"DL",TH:"TH",TD:"TD",TR:"TR",TABLE:"TABLE",LINK_REF:"LINK_REF",LINK_INT:"LINK_INT",LINK_EXT:"LINK_EXT",LINK_IMG:"LINK_IMG",LINK_WIKI:"LINK_WIKI",TEXT:"TEXT",DEL:"DEL",INS:"INS",UNDER:"UNDER",SUB:"SUB",SUP:"SUP",ITAL:"ITAL",BOLD:"BOLD",CODE:"CODE"},P={GT_THAN:O.BLOCKQUOTE,UL_ITEM:O.UL_LI,OL_ITEM:O.OL_LI,DT_MARK:O.DT,DD_MARK:O.DD,TH:O.TH,TD:O.TD},Q={LINK_INT:O.LINK_INT,LINK_EXT:O.LINK_EXT,LINK_IMG:O.LINK_IMG,LINK_WIKI:O.LINK_WIKI},R={INS:O.INS,DEL:O.DEL,INS_END:O.INS,DEL_END:O.DEL,BOLD:O.BOLD,ITAL:O.ITAL,SUP:O.SUP,SUB:O.SUB,UNDER:O.UNDER},S={INS:N.INS_END,DEL:N.DEL_END,BOLD:N.BOLD,ITAL:N.ITAL,SUP:N.SUP,SUB:N.SUB,UNDER:N.UNDER},T={ASIDE_DELIM:1,ATX_END:1,DIV_LINE:1},U={LINK_EXT:1,LINK_IMG:1,LINK_WIKI:1},V={ATX_END:1,NL:1},W={LINK_REF_END:1,NL:1},X={BRACKET_L:1,LINK_INT:1,LINK_CONT:1},Y={BRACKET_R:1},Z={LINK_IMG:1,LINK_EXT:1,LINK_INT:1,LINK_WIKI:1},$={SUB:1,SUP:1,ITAL:1,BOLD:1,DEL:1,INS:1,UNDER:1,CODE:1},_={STOP:1,PARA:1,BLOCKQUOTE:1,ASIDE:1,UL_LI:1,OL_LI:1,HEADER:1,OL:1,UL:1,DL:1,DD:1,DT:1,TR:1},ab={ID:1,CLASS:1,STOP:1},bb={PARA:"p",BLOCKQUOTE:"blockquote",CODE_BLOCK:"pre",ASIDE:"div",UL_LI:"li",OL_LI:"li",OL:"ol",UL:"ul",DL:"dl",DD:"dd",DT:"dt",DIV_LINE:"hr",TH:"th",TD:"td",TR:"tr",TABLE:"table",LINK_INT:"a",LINK_EXT:"a",LINK_WIKI:"a",LINK_IMG:"img",SUB:"sub",SUP:"sup",ITAL:"em",BOLD:"strong",DEL:"del",INS:"ins",UNDER:"u",CODE:"code",HEADER:"h"},cb={LINK_IMG:1,DIV_LINE:1};return function(){var a=function(){};Object.create=Object.create||function(b){if(arguments.length>1)throw Error("Second argument not supported");if("object"!=typeof b)throw TypeError("Argument must be an object");return a.prototype=b,new a}}(),r.prototype={isType:function(a){return this.type===a},isSameType:function(a){return this.type===a.type},substring:function(a,b){return this.lexeme.substring(a,b)},getLength:function(){return this.lexeme.length}},s.prototype={getLast:function(){return this.children[this.children.length-1]},getFirst:function(){return this.children[0]},getLength:function(){return this.children.length},isType:function(a){return this.type===a},isSameType:function(a){return this.type===a.type},pop:function(){this.children.pop()},popFirst:function(){this.children.shift()},addNode_simple:function(a){var b=this.getLast();return b&&b.isType(O.TEXT)&&b.isSameType(a)?void(b.meta.TEXT+=a.meta.TEXT):(a.parent=this,void this.children.push(a))},addNode_table:function(a){var b=this.getLast();if(!b||!b.isType(O.TABLE)){if(a.isType(O.TR))return;b=new s(O.TABLE),this.addNode_simple(b)}b.getLength()<=0&&b.addNode_simple(new s(O.TR));var c=b.getLast();a.isType(O.TH)||a.isType(O.TD)?c.addNode_simple(a):a.isType(O.TR)&&c.getLength()>0&&b.addNode_simple(a)},addNode_ul_ol:function(a){var b=a.isType(O.UL_LI)?O.UL:O.OL,c=this.getLast();c&&c.isType(b)||(c=new s(b),this.addNode_simple(c)),c.addNode_simple(a)},addNode_dl:function(a){var b=this.getLast();b&&b.isType(O.DL)||(b=new s(O.DL),this.addNode_simple(b)),b.addNode_simple(a)},addNode:function(a){a instanceof s&&a!==this&&(a.isType(O.LINK_REF)?(this.meta.SYM_TABLE=this.meta.SYM_TABLE||Object.create(null),this.meta.SYM_TABLE[a.meta.REF_ID]=a.meta.URL):this.isType(O.PARA)&&this.isSameType(a)?this.addNodes(a):a.isType(O.UL_LI)||a.isType(O.OL_LI)?this.addNode_ul_ol(a):a.isType(O.TR)||a.isType(O.TH)||a.isType(O.TD)?this.addNode_table(a):a.isType(O.DD)||a.isType(O.DT)?this.addNode_dl(a):this.addNode_simple(a))},addText:function(a){a&&a.length>0&&this.addNode_simple(new s(O.TEXT,{TEXT:a}))},addNodes:function(a){if(a instanceof s&&a!==this)for(var b=0,c=a.children.length;c>b;b+=1)this.addNode_simple(a.children[b])}},{lexer:t,parser:u,filter:v,frontEnd:w,compile:z,setOptions:y,AST_ENUM:O,LEX_ENUM:N,ASTNode:function(a,b){return new s(a,b)},LexToken:function(a,b,c){return new r(a,b,c)}}}();"undefined"!=typeof module&&(module.exports=BBM);



/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) lodash.com/license | Underscore.js 1.5.2 underscorejs.org/LICENSE
 * Build: `lodash compat category="collections,objects" exports="global" include="difference,uniq,union,identity,flatten"`
 */
;(function(){function aa(a,b,c){c=(c||0)-1;for(var d=a?a.length:0;++c<d;)if(a[c]===b)return c;return-1}function Ha(a,b){var c=typeof b;a=a.l;if("boolean"==c||null==b)return a[b]?0:-1;"number"!=c&&"string"!=c&&(c="object");var d="number"==c?b:Ia+b;a=(a=a[c])&&a[d];return"object"==c?a&&-1<aa(a,b)?0:-1:a?0:-1}function nb(a){var b=this.l,c=typeof a;if("boolean"==c||null==a)b[a]=true;else{"number"!=c&&"string"!=c&&(c="object");var d="number"==c?a:Ia+a,b=b[c]||(b[c]={});"object"==c?(b[d]||(b[d]=[])).push(a):
b[d]=true}}function Ja(a){return a.charCodeAt(0)}function ob(a,b){for(var c=a.m,d=b.m,f=-1,g=c.length;++f<g;){var h=c[f],e=d[f];if(h!==e){if(h>e||typeof h=="undefined")return 1;if(h<e||typeof e=="undefined")return-1}}return a.n-b.n}function Ka(a){var b=-1,c=a.length,d=a[0],f=a[c/2|0],g=a[c-1];if(d&&typeof d=="object"&&f&&typeof f=="object"&&g&&typeof g=="object")return false;d=oa();d["false"]=d["null"]=d["true"]=d.undefined=false;f=oa();f.k=a;f.l=d;for(f.push=nb;++b<c;)f.push(a[b]);return f}function J(){return pa.pop()||
[]}function oa(){return qa.pop()||{k:null,l:null,m:null,"false":false,n:0,"null":false,number:null,object:null,push:null,string:null,"true":false,undefined:false,o:null}}function da(a){return typeof a.toString!="function"&&typeof(a+"")=="string"}function D(a){a.length=0;pa.length<La&&pa.push(a)}function ea(a){var b=a.l;b&&ea(b);a.k=a.l=a.m=a.object=a.number=a.string=a.o=null;qa.length<La&&qa.push(a)}function x(a,b,c){b||(b=0);typeof c=="undefined"&&(c=a?a.length:0);var d=-1;c=c-b||0;for(var f=Array(0>c?0:c);++d<
c;)f[d]=a[b+d];return f}function e(){}function pb(a){function b(){if(d){var a=x(d);fa.apply(a,arguments)}if(this instanceof b){var h=ba(c.prototype),a=c.apply(h,a||arguments);return y(a)?a:h}return c.apply(f,a||arguments)}var c=a[0],d=a[2],f=a[4];ra(b,a);return b}function sa(a,b,c,d,f){if(c){var g=c(a);if(typeof g!="undefined")return g}if(y(a)){var h=r.call(a);if(!E[h]||!n.nodeClass&&da(a))return a;var e=F[h];switch(h){case P:case Q:return new e(+a);case R:case K:return new e(a);case S:return g=e(a.source,
qb.exec(a)),g.lastIndex=a.lastIndex,g}}else return a;h=s(a);if(b){var q=!d;d||(d=J());f||(f=J());for(var p=d.length;p--;)if(d[p]==a)return f[p];g=h?e(a.length):{}}else g=h?x(a):ga({},a);h&&(t.call(a,"index")&&(g.index=a.index),t.call(a,"input")&&(g.input=a.input));if(!b)return g;d.push(a);f.push(g);(h?u:L)(a,function(a,h){g[h]=sa(a,b,c,d,f)});q&&(D(d),D(f));return g}function ba(a){return y(a)?ha(a):{}}function G(a,b,c){if(typeof a!="function")return ta;if(typeof b=="undefined"||!("prototype"in a))return a;
var d=a.__bindData__;if(typeof d=="undefined"&&(n.funcNames&&(d=!a.name),d=d||!n.funcDecomp,!d)){var f=rb.call(a);n.funcNames||(d=!sb.test(f));d||(d=Ma.test(f),ra(a,d))}if(false===d||true!==d&&d[1]&1)return a;switch(c){case 1:return function(c){return a.call(b,c)};case 2:return function(c,d){return a.call(b,c,d)};case 3:return function(c,d,f){return a.call(b,c,d,f)};case 4:return function(c,d,f,e){return a.call(b,c,d,f,e)}}return Na(a,b)}function Oa(a){function b(){var a=q?e:this;if(f){var r=x(f);fa.apply(r,
arguments)}if(g||l)if(r||(r=x(arguments)),g&&fa.apply(r,g),l&&r.length<m)return d|=16,Oa([c,n?d:d&-4,r,null,e,m]);r||(r=arguments);p&&(c=a[s]);return this instanceof b?(a=ba(c.prototype),r=c.apply(a,r),y(r)?r:a):c.apply(a,r)}var c=a[0],d=a[1],f=a[2],g=a[3],e=a[4],m=a[5],q=d&1,p=d&2,l=d&4,n=d&8,s=c;ra(b,a);return b}function Pa(a,b){var c=-1,d=ua(),f=a?a.length:0,g=f>=Qa&&d===aa,e=[];if(g){var m=Ka(b);m?(d=Ha,b=m):g=false}for(;++c<f;)m=a[c],0>d(b,m)&&e.push(m);g&&ea(b);return e}function M(a,b,c,d){d=(d||
0)-1;for(var f=a?a.length:0,g=[];++d<f;){var e=a[d];if(e&&typeof e=="object"&&typeof e.length=="number"&&(s(e)||z(e))){b||(e=M(e,b,c));var m=-1,q=e.length,p=g.length;for(g.length+=q;++m<q;)g[p++]=e[m]}else c||g.push(e)}return g}function T(a,b,c,d,f,g){if(c){var e=c(a,b);if(typeof e!="undefined")return!!e}if(a===b)return 0!==a||1/a==1/b;if(a===a&&!(a&&N[typeof a]||b&&N[typeof b]))return false;if(null==a||null==b)return a===b;var m=r.call(a),q=r.call(b);m==U&&(m=A);q==U&&(q=A);if(m!=q)return false;switch(m){case P:case Q:return+a==
+b;case R:return a!=+a?b!=+b:0==a?1/a==1/b:a==+b;case S:case K:return a==String(b)}q=m==V;if(!q){var p=t.call(a,"__wrapped__"),l=t.call(b,"__wrapped__");if(p||l)return T(p?a.__wrapped__:a,l?b.__wrapped__:b,c,d,f,g);if(m!=A||!n.nodeClass&&(da(a)||da(b)))return false;m=!n.argsObject&&z(a)?Object:a.constructor;p=!n.argsObject&&z(b)?Object:b.constructor;if(m!=p&&!(H(m)&&m instanceof m&&H(p)&&p instanceof p)&&"constructor"in a&&"constructor"in b)return false}m=!f;f||(f=J());g||(g=J());for(p=f.length;p--;)if(f[p]==
a)return g[p]==b;var s=0,e=true;f.push(a);g.push(b);if(q){if(p=a.length,s=b.length,(e=s==p)||d)for(;s--;)if(q=p,l=b[s],d)for(;q--&&!(e=T(a[q],l,c,d,f,g)););else if(!(e=T(a[s],l,c,d,f,g)))break}else B(b,function(b,m,q){if(t.call(q,m))return s++,e=t.call(a,m)&&T(a[m],b,c,d,f,g)}),e&&!d&&B(a,function(a,b,c){if(t.call(c,b))return e=-1<--s});f.pop();g.pop();m&&(D(f),D(g));return e}function Ra(a,b,c,d,f){(s(b)?W:L)(b,function(b,e){var m,q,p=b,l=a[e];if(b&&((q=s(b))||va(b))){for(p=d.length;p--;)if(m=d[p]==
b){l=f[p];break}if(!m){var n;c&&(p=c(l,b),n=typeof p!="undefined")&&(l=p);n||(l=q?s(l)?l:[]:va(l)?l:{});d.push(b);f.push(l);n||Ra(l,b,c,d,f)}}else c&&(p=c(l,b),typeof p=="undefined"&&(p=b)),typeof p!="undefined"&&(l=p);a[e]=l})}function Sa(a,b,c){var d=-1,f=ua(),e=a?a.length:0,h=[],m=!b&&e>=Qa&&f===aa,q=c||m?J():h;m&&(q=Ka(q),f=Ha);for(;++d<e;){var p=a[d],l=c?c(p,d,a):p;if(b?!d||q[q.length-1]!==l:0>f(q,l))(c||m)&&q.push(l),h.push(p)}m?(D(q.k),ea(q)):c&&D(q);return h}function wa(a){return function(b,
c,d){var f={};c=e.createCallback(c,d,3);if(s(b)){d=-1;for(var g=b.length;++d<g;){var h=b[d];a(f,h,c(h,d,b),b)}}else u(b,function(b,d,e){a(f,b,c(b,d,e),e)});return f}}function xa(a,b,c,d,f,e){var h=b&1,m=b&4,q=b&16,p=b&32;if(!(b&2||H(a)))throw new TypeError;q&&!c.length&&(b&=-17,q=c=false);p&&!d.length&&(b&=-33,p=d=false);var l=a&&a.__bindData__;return l&&true!==l?(l=x(l),l[2]&&(l[2]=x(l[2])),l[3]&&(l[3]=x(l[3])),!h||l[1]&1||(l[4]=f),!h&&l[1]&1&&(b|=8),!m||l[1]&4||(l[5]=e),q&&fa.apply(l[2]||(l[2]=[]),c),p&&
tb.apply(l[3]||(l[3]=[]),d),l[1]|=b,xa.apply(null,l)):(1==b||17===b?pb:Oa)([a,b,c,d,f,e])}function X(){w.h=ya;w.b=w.c=w.g=w.i="";w.e="t";w.j=true;for(var a,b=0;a=arguments[b];b++)for(var c in a)w[c]=a[c];b=w.a;w.d=/^[^,]+/.exec(b)[0];a=Function;b="return function("+b+"){";c=w;var d="var n,t="+c.d+",E="+c.e+";if(!t)return E;"+c.i+";";c.b?(d+="var u=t.length;n=-1;if("+c.b+"){",n.unindexedChars&&(d+="if(s(t)){t=t.split('')}"),d+="while(++n<u){"+c.g+";}}else{"):n.nonEnumArgs&&(d+="var u=t.length;n=-1;if(u&&p(t)){while(++n<u){n+='';"+
c.g+";}}else{");n.enumPrototypes&&(d+="var G=typeof t=='function';");n.enumErrorProps&&(d+="var F=t===k||t instanceof Error;");var f=[];n.enumPrototypes&&f.push('!(G&&n=="prototype")');n.enumErrorProps&&f.push('!(F&&(n=="message"||n=="name"))');if(c.j&&c.f)d+="var C=-1,D=B[typeof t]&&v(t),u=D?D.length:0;while(++C<u){n=D[C];",f.length&&(d+="if("+f.join("&&")+"){"),d+=c.g+";",f.length&&(d+="}"),d+="}";else if(d+="for(n in t){",c.j&&f.push("m.call(t, n)"),f.length&&(d+="if("+f.join("&&")+"){"),d+=c.g+
";",f.length&&(d+="}"),d+="}",n.nonEnumShadows){d+="if(t!==A){var i=t.constructor,r=t===(i&&i.prototype),f=t===J?I:t===k?j:L.call(t),x=y[f];";for(k=0;7>k;k++)d+="n='"+c.h[k]+"';if((!(r&&x[n])&&m.call(t,n))",c.j||(d+="||(!x[n]&&t[n]!==A[n])"),d+="){"+c.g+"}";d+="}"}if(c.b||n.nonEnumArgs)d+="}";d+=c.c+";return E";return a("d,j,k,m,o,p,q,s,v,A,B,y,I,J,L",b+d+"}")(G,Ta,za,t,ub,z,s,I,w.f,ia,N,v,K,vb,r)}function ua(){var a=(a=e.indexOf)===Ua?aa:a;return a}function O(a){return typeof a=="function"&&wb.test(a)}
function Va(a){var b,c;if(!a||r.call(a)!=A||(b=a.constructor,H(b)&&!(b instanceof b))||!n.argsClass&&z(a)||!n.nodeClass&&da(a))return false;if(n.ownLast)return B(a,function(a,b,e){c=t.call(e,b);return false}),false!==c;B(a,function(a,b){c=b});return typeof c=="undefined"||t.call(a,c)}function z(a){return a&&typeof a=="object"&&typeof a.length=="number"&&r.call(a)==U||false}function Wa(a,b,c){var d=C(a),f=d.length;for(b=G(b,c,3);f--&&(c=d[f],false!==b(a[c],c,a)););return a}function Xa(a){var b=[];B(a,function(a,d){H(a)&&
b.push(d)});return b.sort()}function H(a){return typeof a=="function"}function y(a){return!(!a||!N[typeof a])}function Ya(a){return typeof a=="number"||a&&typeof a=="object"&&r.call(a)==R||false}function I(a){return typeof a=="string"||a&&typeof a=="object"&&r.call(a)==K||false}function Aa(a){for(var b=-1,c=C(a),d=c.length,f=Array(d);++b<d;)f[b]=a[c[b]];return f}function Za(a,b,c){var d=-1,f=ua(),e=a?a.length:0,h=false;c=(0>c?Ba(0,e+c):c)||0;s(a)?h=-1<f(a,b,c):typeof e=="number"?h=-1<(I(a)?a.indexOf(b,c):f(a,
b,c)):u(a,function(a){if(++d>=c)return!(h=a===b)});return h}function $a(a,b,c){var d=true;b=e.createCallback(b,c,3);if(s(a)){c=-1;for(var f=a.length;++c<f&&(d=!!b(a[c],c,a)););}else u(a,function(a,c,f){return d=!!b(a,c,f)});return d}function ja(a,b,c){var d=[];b=e.createCallback(b,c,3);if(s(a)){c=-1;for(var f=a.length;++c<f;){var g=a[c];b(g,c,a)&&d.push(g)}}else u(a,function(a,c,f){b(a,c,f)&&d.push(a)});return d}function Ca(a,b,c){b=e.createCallback(b,c,3);if(s(a)){c=-1;for(var d=a.length;++c<d;){var f=
a[c];if(b(f,c,a))return f}}else{var g;u(a,function(a,c,d){if(b(a,c,d))return g=a,false});return g}}function W(a,b,c){if(b&&typeof c=="undefined"&&s(a)){c=-1;for(var d=a.length;++c<d&&false!==b(a[c],c,a););}else u(a,b,c);return a}function ka(a,b,c){var d=a,f=a?a.length:0;b=b&&typeof c=="undefined"?b:G(b,c,3);if(s(a))for(;f--&&false!==b(a[f],f,a););else{if(typeof f!="number")var e=C(a),f=e.length;else n.unindexedChars&&I(a)&&(d=a.split(""));u(a,function(a,c,q){c=e?e[--f]:--f;return b(d[c],c,q)})}return a}function ca(a,
b,c){var d=-1,f=a?a.length:0,g=Array(typeof f=="number"?f:0);b=e.createCallback(b,c,3);if(s(a))for(;++d<f;)g[d]=b(a[d],d,a);else u(a,function(a,c,f){g[++d]=b(a,c,f)});return g}function Da(a,b,c,d){var f=3>arguments.length;b=e.createCallback(b,d,4);if(s(a)){var g=-1,h=a.length;for(f&&(c=a[++g]);++g<h;)c=b(c,a[g],g,a)}else u(a,function(a,d,e){c=f?(f=false,a):b(c,a,d,e)});return c}function ab(a,b,c,d){var f=3>arguments.length;b=e.createCallback(b,d,4);ka(a,function(a,d,e){c=f?(f=false,a):b(c,a,d,e)});return c}
function bb(a){var b=-1,c=a?a.length:0,d=Array(typeof c=="number"?c:0);W(a,function(a){var c;c=++b;c=0+cb(db()*(c-0+1));d[b]=d[c];d[c]=a});return d}function eb(a,b,c){var d;b=e.createCallback(b,c,3);if(s(a)){c=-1;for(var f=a.length;++c<f&&!(d=b(a[c],c,a)););}else u(a,function(a,c,f){return!(d=b(a,c,f))});return!!d}function Ua(a,b,c){if(typeof c=="number"){var d=a?a.length:0;c=0>c?Ba(0,d+c):c||0}else if(c)return c=fb(a,b),a[c]===b?c:-1;return aa(a,b,c)}function fb(a,b,c,d){var f=0,g=a?a.length:f;c=
c?e.createCallback(c,d,1):ta;for(b=c(b);f<g;)d=f+g>>>1,c(a[d])<b?f=d+1:g=d;return f}function gb(a,b,c,d){typeof b!="boolean"&&null!=b&&(d=c,c=typeof b!="function"&&d&&d[b]===a?null:b,b=false);null!=c&&(c=e.createCallback(c,d,3));return Sa(a,b,c)}function Na(a,b){return 2<arguments.length?xa(a,17,x(arguments,2),null,b):xa(a,1,null,null,b)}function ta(a){return a}function hb(){}function ib(a){return function(b){return b[a]}}var pa=[],qa=[],ub={},Ia=+new Date+"",Qa=75,La=40,qb=/\w*$/,sb=/^\s*function[ \n\r\t]+\w/,
Ma=/\bthis\b/,ya="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),U="[object Arguments]",V="[object Array]",P="[object Boolean]",Q="[object Date]",Ta="[object Error]",R="[object Number]",A="[object Object]",S="[object RegExp]",K="[object String]",E={"[object Function]":false};E[U]=E[V]=E[P]=E[Q]=E[R]=E[A]=E[S]=E[K]=true;var jb={configurable:false,enumerable:false,value:null,writable:false},w={a:"",b:null,c:"",d:"",e:"",v:null,g:"",h:null,support:null,i:"",
j:false},N={"boolean":false,"function":true,object:true,number:false,string:false,undefined:false},Y=N[typeof window]&&window||this,Z=N[typeof global]&&global;!Z||Z.global!==Z&&Z.window!==Z||(Y=Z);var Ea=[],za=Error.prototype,ia=Object.prototype,vb=String.prototype,r=ia.toString,wb=RegExp("^"+String(r).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/toString| for [^\]]+/g,".*?")+"$"),cb=Math.floor,rb=Function.prototype.toString,$=O($=Object.getPrototypeOf)&&$,t=ia.hasOwnProperty,fa=Ea.push,la=ia.propertyIsEnumerable,
tb=Ea.unshift,kb=function(){try{var a={},b=O(b=Object.defineProperty)&&b,c=b(a,a,a)&&b}catch(d){}return c}(),ha=O(ha=Object.create)&&ha,Fa=O(Fa=Array.isArray)&&Fa,xb=Y.isFinite,yb=Y.isNaN,ma=O(ma=Object.keys)&&ma,Ba=Math.max,zb=Math.min,db=Math.random,F={};F[V]=Array;F[P]=Boolean;F[Q]=Date;F["[object Function]"]=Function;F[A]=Object;F[R]=Number;F[S]=RegExp;F[K]=String;var v={};v[V]=v[Q]=v[R]={constructor:true,toLocaleString:true,toString:true,valueOf:true};v[P]=v[K]={constructor:true,toString:true,valueOf:true};
v[Ta]=v["[object Function]"]=v[S]={constructor:true,toString:true};v[A]={constructor:true};(function(){for(var a=ya.length;a--;){var b=ya[a],c;for(c in v)t.call(v,c)&&!t.call(v[c],b)&&(v[c][b]=false)}})();var n=e.support={};(function(){function a(){this.x=1}var b={0:1,length:1},c=[];a.prototype={valueOf:1,y:1};for(var d in new a)c.push(d);for(d in arguments);n.argsClass=r.call(arguments)==U;n.argsObject=arguments.constructor==Object&&!(arguments instanceof Array);n.enumErrorProps=la.call(za,"message")||la.call(za,
"name");n.enumPrototypes=la.call(a,"prototype");n.funcDecomp=!O(Y.p)&&Ma.test(function(){return this});n.funcNames=typeof Function.name=="string";n.nonEnumArgs=0!=d;n.nonEnumShadows=!/valueOf/.test(c);n.ownLast="x"!=c[0];n.spliceObjects=(Ea.splice.call(b,0,1),!b[0]);n.unindexedChars="xx"!="x"[0]+Object("x")[0];try{n.nodeClass=!(r.call(document)==A&&!({toString:0}+""))}catch(f){n.nodeClass=true}})(1);ha||(ba=function(){function a(){}return function(b){if(y(b)){a.prototype=b;var c=new a;a.prototype=null}return c||Y.Object()}}());
var ra=kb?function(a,b){jb.value=b;kb(a,"__bindData__",jb)}:hb;n.argsClass||(z=function(a){return a&&typeof a=="object"&&typeof a.length=="number"&&t.call(a,"callee")&&!la.call(a,"callee")||false});var s=Fa||function(a){return a&&typeof a=="object"&&typeof a.length=="number"&&r.call(a)==V||false},lb=X({a:"z",e:"[]",i:"if(!(B[typeof z]))return E",g:"E.push(n)"}),C=ma?function(a){return y(a)?n.enumPrototypes&&typeof a=="function"||n.nonEnumArgs&&a.length&&z(a)?lb(a):ma(a):[]}:lb,na={a:"g,e,K",i:"e=e&&typeof K=='undefined'?e:d(e,K,3)",
b:"typeof u=='number'",v:C,g:"if(e(t[n],n,g)===false)return E"},Ga={a:"z,H,l",i:"var a=arguments,b=0,c=typeof l=='number'?2:a.length;while(++b<c){t=a[b];if(t&&B[typeof t]){",v:C,g:"if(typeof E[n]=='undefined')E[n]=t[n]",c:"}}"},mb={i:"if(!B[typeof t])return E;"+na.i,b:false},u=X(na),ga=X(Ga,{i:Ga.i.replace(";",";if(c>3&&typeof a[c-2]=='function'){var e=d(a[--c-1],a[c--],2)}else if(c>2&&typeof a[c-1]=='function'){e=a[--c]}"),g:"E[n]=e?e(E[n],t[n]):t[n]"}),Ab=X(Ga),B=X(na,mb,{j:false}),L=X(na,mb);H(/x/)&&
(H=function(a){return typeof a=="function"&&"[object Function]"==r.call(a)});var va=$?function(a){if(!a||r.call(a)!=A||!n.argsClass&&z(a))return false;var b=a.valueOf,c=O(b)&&(c=$(b))&&$(c);return c?a==c||$(a)==c:Va(a)}:Va,Bb=wa(function(a,b,c){t.call(a,c)?a[c]++:a[c]=1}),Cb=wa(function(a,b,c){(t.call(a,c)?a[c]:a[c]=[]).push(b)}),Db=wa(function(a,b,c){a[c]=b});e.assign=ga;e.at=function(a){var b=arguments,c=-1,d=M(b,true,false,1),b=b[2]&&b[2][b[1]]===a?1:d.length,f=Array(b);for(n.unindexedChars&&I(a)&&(a=a.split(""));++c<
b;)f[c]=a[d[c]];return f};e.bind=Na;e.countBy=Bb;e.create=function(a,b){var c=ba(a);return b?ga(c,b):c};e.createCallback=function(a,b,c){var d=typeof a;if(null==a||"function"==d)return G(a,b,c);if("object"!=d)return ib(a);var f=C(a),e=f[0],h=a[e];return 1!=f.length||h!==h||y(h)?function(b){for(var c=f.length,d=false;c--&&(d=T(b[f[c]],a[f[c]],null,true)););return d}:function(a){a=a[e];return h===a&&(0!==h||1/h==1/a)}};e.defaults=Ab;e.difference=function(a){return Pa(a,M(arguments,true,true,1))};e.filter=ja;
e.flatten=function(a,b,c,d){typeof b!="boolean"&&null!=b&&(d=c,c=typeof b!="function"&&d&&d[b]===a?null:b,b=false);null!=c&&(a=ca(a,c,d));return M(a,b)};e.forEach=W;e.forEachRight=ka;e.forIn=B;e.forInRight=function(a,b,c){var d=[];B(a,function(a,b){d.push(b,a)});var f=d.length;for(b=G(b,c,3);f--&&false!==b(d[f--],d[f],a););return a};e.forOwn=L;e.forOwnRight=Wa;e.functions=Xa;e.groupBy=Cb;e.indexBy=Db;e.invert=function(a){for(var b=-1,c=C(a),d=c.length,f={};++b<d;){var e=c[b];f[a[e]]=e}return f};e.invoke=
function(a,b){var c=x(arguments,2),d=-1,f=typeof b=="function",e=a?a.length:0,h=Array(typeof e=="number"?e:0);W(a,function(a){h[++d]=(f?b:a[b]).apply(a,c)});return h};e.keys=C;e.map=ca;e.mapValues=function(a,b,c){var d={};b=e.createCallback(b,c,3);L(a,function(a,c,e){d[c]=b(a,c,e)});return d};e.max=function(a,b,c){var d=-Infinity,f=d;typeof b!="function"&&c&&c[b]===a&&(b=null);if(null==b&&s(a)){c=-1;for(var g=a.length;++c<g;){var h=a[c];h>f&&(f=h)}}else b=null==b&&I(a)?Ja:e.createCallback(b,c,3),
u(a,function(a,c,e){c=b(a,c,e);c>d&&(d=c,f=a)});return f};e.merge=function(a){var b=arguments,c=2;if(!y(a))return a;"number"!=typeof b[2]&&(c=b.length);if(3<c&&"function"==typeof b[c-2])var d=G(b[--c-1],b[c--],2);else 2<c&&"function"==typeof b[c-1]&&(d=b[--c]);for(var b=x(arguments,1,c),e=-1,g=J(),h=J();++e<c;)Ra(a,b[e],d,g,h);D(g);D(h);return a};e.min=function(a,b,c){var d=Infinity,f=d;typeof b!="function"&&c&&c[b]===a&&(b=null);if(null==b&&s(a)){c=-1;for(var g=a.length;++c<g;){var h=a[c];h<f&&(f=
h)}}else b=null==b&&I(a)?Ja:e.createCallback(b,c,3),u(a,function(a,c,e){c=b(a,c,e);c<d&&(d=c,f=a)});return f};e.omit=function(a,b,c){var d={};if(typeof b!="function"){var f=[];B(a,function(a,b){f.push(b)});for(var f=Pa(f,M(arguments,true,false,1)),g=-1,h=f.length;++g<h;){var m=f[g];d[m]=a[m]}}else b=e.createCallback(b,c,3),B(a,function(a,c,e){b(a,c,e)||(d[c]=a)});return d};e.pairs=function(a){for(var b=-1,c=C(a),d=c.length,e=Array(d);++b<d;){var g=c[b];e[b]=[g,a[g]]}return e};e.pick=function(a,b,c){var d=
{};if(typeof b!="function")for(var f=-1,g=M(arguments,true,false,1),h=y(a)?g.length:0;++f<h;){var m=g[f];m in a&&(d[m]=a[m])}else b=e.createCallback(b,c,3),B(a,function(a,c,e){b(a,c,e)&&(d[c]=a)});return d};e.pluck=ca;e.property=ib;e.reject=function(a,b,c){b=e.createCallback(b,c,3);return ja(a,function(a,c,e){return!b(a,c,e)})};e.shuffle=bb;e.sortBy=function(a,b,c){var d=-1,f=s(b),g=a?a.length:0,h=Array(typeof g=="number"?g:0);f||(b=e.createCallback(b,c,3));W(a,function(a,c,e){var g=h[++d]=oa();f?g.m=
ca(b,function(b){return a[b]}):(g.m=J())[0]=b(a,c,e);g.n=d;g.o=a});g=h.length;for(h.sort(ob);g--;)a=h[g],h[g]=a.o,f||D(a.m),ea(a);return h};e.toArray=function(a){return a&&typeof a.length=="number"?n.unindexedChars&&I(a)?a.split(""):x(a):Aa(a)};e.transform=function(a,b,c,d){var f=s(a);if(null==c)if(f)c=[];else{var g=a&&a.constructor;c=ba(g&&g.prototype)}b&&(b=e.createCallback(b,d,4),(f?u:L)(a,function(a,d,e){return b(c,a,d,e)}));return c};e.union=function(){return Sa(M(arguments,true,true))};e.uniq=gb;
e.values=Aa;e.where=ja;e.collect=ca;e.each=W;e.eachRight=ka;e.extend=ga;e.methods=Xa;e.select=ja;e.unique=gb;e.clone=function(a,b,c,d){typeof b!="boolean"&&null!=b&&(d=c,c=b,b=false);return sa(a,b,typeof c=="function"&&G(c,d,1))};e.cloneDeep=function(a,b,c){return sa(a,true,typeof b=="function"&&G(b,c,1))};e.contains=Za;e.every=$a;e.find=Ca;e.findKey=function(a,b,c){var d;b=e.createCallback(b,c,3);L(a,function(a,c,e){if(b(a,c,e))return d=c,false});return d};e.findLast=function(a,b,c){var d;b=e.createCallback(b,
c,3);ka(a,function(a,c,e){if(b(a,c,e))return d=a,false});return d};e.findLastKey=function(a,b,c){var d;b=e.createCallback(b,c,3);Wa(a,function(a,c,e){if(b(a,c,e))return d=c,false});return d};e.has=function(a,b){return a?t.call(a,b):false};e.identity=ta;e.indexOf=Ua;e.isArguments=z;e.isArray=s;e.isBoolean=function(a){return true===a||false===a||a&&typeof a=="object"&&r.call(a)==P||false};e.isDate=function(a){return a&&typeof a=="object"&&r.call(a)==Q||false};e.isElement=function(a){return a&&1===a.nodeType||false};e.isEmpty=
function(a){var b=true;if(!a)return b;var c=r.call(a),d=a.length;if(c==V||c==K||(n.argsClass?c==U:z(a))||c==A&&typeof d=="number"&&H(a.splice))return!d;L(a,function(){return b=false});return b};e.isEqual=function(a,b,c,d){return T(a,b,typeof c=="function"&&G(c,d,2))};e.isFinite=function(a){return xb(a)&&!yb(parseFloat(a))};e.isFunction=H;e.isNaN=function(a){return Ya(a)&&a!=+a};e.isNull=function(a){return null===a};e.isNumber=Ya;e.isObject=y;e.isPlainObject=va;e.isRegExp=function(a){return a&&N[typeof a]&&
r.call(a)==S||false};e.isString=I;e.isUndefined=function(a){return typeof a=="undefined"};e.noop=hb;e.reduce=Da;e.reduceRight=ab;e.size=function(a){var b=a?a.length:0;return typeof b=="number"?b:C(a).length};e.some=eb;e.sortedIndex=fb;e.all=$a;e.any=eb;e.detect=Ca;e.findWhere=Ca;e.foldl=Da;e.foldr=ab;e.include=Za;e.inject=Da;e.sample=function(a,b,c){a&&typeof a.length!="number"?a=Aa(a):n.unindexedChars&&I(a)&&(a=a.split(""));if(null==b||c)return a?a[0+cb(db()*(a.length-1-0+1))]:void 0;a=bb(a);a.length=
zb(Ba(0,b),a.length);return a};e.VERSION="2.4.1";Y._=e}.call(this));



/* requires lodash.min.js */


/**
 * String manipulation and checking library, which operates on Javascript's 
 * native String literals and classes. Contains a selection of static methods
 * that are needed by the BareBonesWiki project.
 *
 * Sample invocation:
 *
 * STR.words("Some\nStr\n").filter(STR.isBlank).map(STR.titleize);
 *
 * @module STR
 * @main STR
 * @requires lodash
 */
var STR = (function()
{
 var WS =
   "[ \\u2000-\\u200d\\t\\u202f\\u205f\\u3000\\u1680" +
   "\\u180e\\u00a0\\u00b7\\u237d\\u2420\\u2422\\u2423]",
  NL = "[\\v\\f\\r\\n\\u0085\\u2028\\u2029]",
  REGEX_NL_G = new RegExp(NL, "g"),
  REGEX_WS_WS_G = new RegExp(WS + WS + "+", "g"),
  REGEX_BLANK = /^\s*$/,
  REGEX_QUOTE_G = /"[^"]+"|[^"]+/g,
  REGEX_QUOTE_HT = /^"[^"]+"$/,
  REGEX_PIPES_G = /[^|\r\n\v\f\u0085\u0028\u0029]+(\|\|)?/g;
  
 /**
  * Tests if the given input is a string consisting of solely control
  * characters and white space.
  * @method isBlankString
  * @param str {string} The input string to test for.
  * @return {boolean} true if the input is a blank string; false otherwise.
  */
 function isBlank(str)
 {
  return REGEX_BLANK.test(str);
 }
 
 /**
  * The opposite of `isBlank()`, for use with array comprehension methods
  * such as `filter()`.
  * @method isNotBlank
  * @param str {string} The input string to test for.
  * @return {boolean} true if the input is a not blank string.
  */
 function isNotBlank(str)
 {
  return !isBlank(str);
 }
 
 /**
  * Normalizes consecutive white spaces into a single ASCII space, and 
  * removes all control characters from the given string. Use this method
  * if 
  *
  * Single non-ASCII white space, such as Asian full-width spaces are
  * preserved. (e.g: U+3000)
  *
  * @method titleize
  * @param str {string} The input string to transform.
  * @return {string} The transformed string.
  */
 function titleize(str)
 {
  REGEX_WS_WS_G.lastIndex = 0;
  REGEX_NL_G.lastIndex = 0;
  return trim(str.replace(REGEX_WS_WS_G, " ").replace(REGEX_NL_G, ""));
 }
 
 /**
  * Strips leading and trailing spaces and control characters in the string.
  *
  * @method trim
  * @param str {string} The input string to transform.
  * @return {string} The transformed string.
  */
 function trim(str)
 {
  return str.replace(/(^\s+)|(\s+$)/g, "");
 }
 
 //Strips leading and trailing double quotes.
 function trimQuotes(str)
 {
  return str.replace(/(^"+)|("+$)/g, "");
 }
 
 //Strips leading and trailing pipes (At least two)
 function trimPipes(str)
 {
  return str.replace(/(^\|\|+)|(\|\|+$)/g, "");
 }

 /**
  * Tokenizes the string by double pipes, splitting it into an array.
  *
  * @method wordsByPipes
  * @param str {string} The input string to transform.
  * @return {Array of string} 
  * The original string, with each word or phrase delimited by two or more
  * consecutive ASCII pipe characters: "||"
  */
 function wordsByPipes(str)
 {
  return (str.match(REGEX_PIPES_G) || [])
   .map(trimPipes)
   .map(titleize);
 }

 /**
  * Tokenizes the string by words, splitting it into an array;
  *
  * @method words
  * @param str {string} The input string to transform.
  * @return {Array of string} 
  * The original string delimited by space or ASCII double quote characters,
  * ignoring blanks. Line breaks in the string are considered white space
  * for the purpose of delimiting words.
  */
 function words(str)
 {
  return _.flatten((str.match(REGEX_QUOTE_G) || [])
   .map(titleize)
   .reduce(wordsUnquotedSplit, [])).map(trimQuotes);
 }
 
 function wordsUnquotedSplit(prev, currStr)
 {
  if (REGEX_QUOTE_HT.test(currStr))
  {
   prev.push(currStr);
  }
  else
  {
   prev.push(currStr.split(/\s+/g));
  }
  return prev;
 }
 
 /**
  * Tests if a given string contains a given substring, with case
  * sensitivity support.
  *
  * @method hasSubstring
  * @param str {string} The source string to look into.
  * @param substr {string} The substring to look for in the source string.
  * @param [caseSense] {boolean} If true, considers case sensitivity.
  * @return {boolean}
  * false if either `str` or `substr` is not a string, or if `substr` is 
  * not in `str`; True otherwise.
  */
 function hasSubstring(str, substr, caseSense)
 {
  if (caseSense)
  {
   return str.indexOf(substr) >= 0;
  }
  return str.toLocaleLowerCase().indexOf(substr.toLocaleLowerCase()) >= 0;
 }

 /**
  * Tests if at least one member of an array of string contains a given 
  * substring, with case sensitivity support. Array elements that are not
  * of type string are ignored in the search.
  *
  * @method hasSubstringArray
  * @param arr {Array} An array of string to look into.
  * @param substr {string} The substring to look for in the source.
  * @param [caseSense] {boolean} If true, considers case sensitivity.
  * @return {boolean}
  * false if none of the string in the array contains the substring,
  * true otherwise.
  */
 function hasSubstringArray(arr, substr, caseSense)
 {
  return arr.filter(_.isString).some(function (str){
   return hasSubstring(str, substr, caseSense);
  });
 }
 
 function encodeHTMLBody(str)
 {
  return str.replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");
 }
 
 function decodeHTMLBody(str)
 {
  return str.replace(/&amp;/g, "&")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">");
 }

 return {
  hasSubstring : hasSubstring,
  hasSubstringArray : hasSubstringArray,
  trim : trim,
  titleize : titleize,
  words : words,
  wordsByPipes : wordsByPipes,
  isBlank : isBlank,
  isNotBlank : isNotBlank,
  encodeHTMLBody : encodeHTMLBody,
  decodeHTMLBody : decodeHTMLBody
 };
}());






/* requires lodash.min.js */



/**
 * A simple implementation of the Directed Graph data structure used to 
 * represent directionality between data nodes.
 *
 * This module shall be expanded as needed by the BareBonesWiki project.
 * 
 * @module LooseEdge
 * @main LooseEdge
 * @requires lodash
 */
var LooseEdge = (function (){

 /**
  * Creates a new LooseEdge instance, which is a directed graph that 
  * permits dangling endpoints.
  *
  * @class LooseEdge
  * @constructor
  * @param [json] {string|object}
    If not omitted, attempts to import LooseEdge data with an existing object
    or a JSON string.
  * @param [selfLoop] {boolean}
    If true, this collection of LooseEdge permits self-loops, rather than 
    failing silently when they're added.
  */
 function LooseEdge(json, selfLoop)
 {
  if (!(this instanceof LooseEdge))
  {
   return new LooseEdge(json, selfLoop);
  }
   /**
    * Denotes whether the edge set allows self-looping edges. By default,
    * adding self-looping edges will fail silently.
    * @property selfLoop
    * @final
    * @type {boolean}
    * @default false
    */
   this.selfLoop = !!selfLoop;
   
   /**
    * A map of directed edges, where the keys are the source nodes' ID, and the
    * values are objects. The keys of the nested objects are the destination
    * node's ID, and their values are the edge's associated data.
    *
    * Sample JSON of a inter-personal relationship graph:
    *
    * ```
    * {
    *  "A" : {"B" : "Abuse", "C" : "Rivalry"},
    *  "B" : {"A" : "Friendship"}
    * }
    * ```
    * @property EDGES
    * @type {object}
    * @private
    */
   this.EDGES = {};

   /**
    * A shallow tranpose copy of the current edge set, where the direction
    * of the edges are reversed.
    * @property TRANS
    * @type {object}
    * @private
    */
   this.TRANS = {}; //Edge set transpose for fast backlink access.
   
   if (_.isString(json) || _.isObject(json))
   {
    LooseEdge.prototype.fromJSON.call(this, json);
   }
   
   return this;
 }

 LooseEdge.prototype = (function (){
 
  function edgeCheckID(fromID, toID)
  {
   return (fromID !== toID || this.selfLoop) && 
    isValidID.call(this, fromID) && isValidID.call(this, toID);
  }
  
  function isValidID(nodeID)
  {
   return _.isString(nodeID) || _.isNumber(nodeID);
  }

  function addEdgesArray(key, strArr)
  {
   for (var i = 0, ii = strArr.length; i < ii; i += 1)
   {
    addEdge.call(this, key, strArr[i]);
   }
   return this;
  }
  
  function addEdgesObj(key, obj)
  {
   for (var target in obj)
   {
    if (_.has(obj, target))
    {
     addEdge.call(this, key, target, obj[target]);
    }
   }
   return this;
  }
  
  function addEdges(obj)
  {
   for (var key in obj)
   {
    var targets = _.has(obj, key) ? obj[key] : void(0);
    if (_.isObject(targets))
    {
     addEdgesObj.call(this, key, targets);
    }
    else if (_.isArray(targets))
    {
     addEdgesArray.call(this, key, targets);
    }
   }
   return this;
  }

  function addEdge(fromID, toID, data)
  {
   if (!edgeCheckID.call(this, fromID, toID))
   {
    return this;
   }
   
   this.EDGES[fromID] = this.EDGES[fromID] || {};
   this.TRANS[toID] = this.TRANS[toID] || {};
   this.EDGES[fromID][toID] = data || null;
   this.TRANS[toID][fromID] = data || null;
   
   return this;
  }
  
  /**
   * Adds a collection of directed edges and their associated data, based 
   * on the parameters. If an edge already exists in the graph, it will be
   * the data object will be overwritten by latter calls to `addEdge();`
   * @method addEdge
   * @param fromID {string|number|object}
   * - string|number : The source node identifier to add outbound edges from.
       In this formulation, the second parameter is required.
     - object : A map of edges to connect within the graph. The keys of the 
       object are source node identifiers. Its values can take on either of 
       these two values:
       
       - Array of string|number: List of destination nodes to connect to. 
         The edge's data object shall be `null`.
       - Object: The keys are the destination nodes to connect to, while 
         the values denote the edge's data objects.
         
       In this formulation, the second parameter is discarded.
   * @param toID {string|number|array|object}
   * - If fromID and toID are both string|number, adds this specific directed
       edge to the graph. The third parameter `data` will be the data 
       associated with this edge object.
     - Array of string|number: Adds directed edges from node A to a list 
       of other nodes, with each edge's data object being `null`
     - Object: Adds directed edges from node A to a list of other nodes 
       based on the object's property keys. The object's value denote the
       edge's associated data.
   * @param data {anything}
   * Only used when both fromID and toID are string|number.
   * @return {LooseEdge}
   * The modified LooseEdge instance.
   */
  function addEdgeRoute(fromID, toID, data)
  {
   if (edgeCheckID.call(this, fromID, toID))
   {
    addEdge.call(this, fromID, toID);
   }
   else if (isValidID.call(this, fromID))
   {
    if (_.isArray(toID))
    {
     addEdgesArray.call(this, fromID, toID);
    }
    else if (_.isObject(toID))
    {
     addEdgesObj.call(this, fromID, toID);
    }
   }
   else if (_.isObject(fromID))
   {
    return addEdges.call(this, fromID);
   }
   return this;
  }



  function rmEdgesObj(key, obj)
  {
   for (var target in obj) 
   {
    if (_.has(obj, target)) {rmEdge.call(this, key, target);}
   }
   return this;
  }
  
  function rmEdgesArray(key, strArr)
  {
   for (var i = 0, ii = strArr.length; i < ii; i += 1)
   {
    rmEdge.call(this, key, strArr[i]);
   }
   return this;
  }
  
  function rmEdges(obj)
  {
   for (var key in obj)
   {
    var targets = _.has(obj, key) ? obj[key] : void(0);
    if (_.isArray(targets))
    {
     rmEdgesArray.call(this, key, targets);
    }
    else if (_.isObject(targets))
    {
     rmEdgesObj.call(this, key, targets);
    }
   }
   return this;
  }
  
  function rmEdge(fromID, toID)
  {
   if (!edgeCheckID.call(this, fromID, toID))
   {
    return this;
   }
   
   if (this.EDGES[fromID] && this.TRANS[toID])
   {
    delete this.EDGES[fromID][toID];
    delete this.TRANS[toID][fromID];
   }
   return this;
  }
  
  /**
   * Symmetric version of addEdge(), except this method removes edges 
   * instead. The same parameters passed to addEdge() shall remove the
   * same edge set in this method.
   *
   * @method rmEdge
   * @param fromID {string|number|object}
   * @param toID {string|number|array|object}
   * @return The modified LooseEdge instance.
   */
  function rmEdgeRoute(fromID, toID)
  {
   if (edgeCheckID.call(this, fromID, toID))
   {
    rmEdge.call(this, fromID, toID);
   }
   else if (isValidID.call(this, fromID))
   {
    if (_.isArray(toID))
    {
     rmEdgesArray.call(this, fromID, toID);
    }
    else if (_.isObject(toID))
    {
     rmEdgesObj.call(this, fromID, toID);
    }
   }
   else if (_.isObject(fromID))
   {
    return rmEdges.call(this, fromID);
   }
   return this;
  }


  /**
   * Retrieves the edge A -> B.
   * @method getEdge
   * @param fromID {string|number} Identifier of the source node.
   * @param toID {string|number} Identifier of the destination.
   * @return {anything} 
   * The data object of the edge between fromID and toID; Returns
   * undefined if there's no such edge.
   */
  function getEdgeSingle(fromID, toID)
  {
   if (hasEdge.call(this, fromID, toID))
   {
    return this.EDGES[fromID][toID];
   }
  }
  
  /**
   * Retrieves the current edge set in entirety
   * @method getEdgesAll
   * @return {object}
   * See property EDGES.
   */
  function getEdgesAll()
  {
   return this.EDGES;
  }

  /**
   * Retrieves the set of edges that are going into a particular node.
   *
   * **Note:** These edges do not actually exist in the graph. If a node's 
   * inbound edges need to be removed, use the `transpose()` operation with
   * `getEdgesOut()`:
   *
   * ```
   * g.transpose().rmEdge(sourceID, g.getEdgesOut(sourceID)).transpose();
   * ```
   * 
   * @method getEdgesIn
   * @param nodeID {string} The identifier of the node.
   * @return {object} An object, where the keys represent the source of 
     the edge, and the values the data associated with the edge object. 
     Returns an empty object if the base node doesn't exist.
   */
  function getEdgesIn(nodeID)
  {
   return _.has(this.TRANS, nodeID) ? this.TRANS[nodeID] : {};
  }

  /**
   * Retrieves all outgoing edge objects originating from a particular node.
   * @method getEdgesOut
   * @param nodeID {string} The identifier of the node.
   * @return {object} An object, where the keys represent the destination of
     the edge, and the values the data associated with the edge object. 
     Returns an empty object if the base node doesn't exist.
   */
  function getEdgesOut(nodeID)
  {
   return _.has(this.EDGES, nodeID) ? this.EDGES[nodeID] : {};
  }
  
  /**
   * Tests whether there's a link from node A to node B.
   * @method hasEdge
   * @param fromID {string} Identifier of the source node.
   * @param toID {string} Identifier of the destination.
   * @return {boolean} true if there's a link from "fromID" to "toID"
   */
  function hasEdge(fromID, toID)
  {
   var hasKey = _.has(this.EDGES, fromID);
   var hasVal = hasKey && _.has(this.EDGES[fromID], toID);
   return hasKey && hasVal;
  }

  /**
   * Check if a given node identifier is connected within this edge set.
   * @method isIsolated
   * @param nodeID {string or number} The node identifier to check for.
   * @return {boolean} true if the node is not connected; false otherwise.
   */
  function isIsolated(nodeID)
  {
   return isValidID.call(this, nodeID) &&
    (_.has(this.EDGES, nodeID) || _.has(this.TRANS, nodeID));
  }
  
  /**
   * Check if a node is a sink node (No outgoing edge) in the edge set.
   * @method isSink
   * @param nodeID {string or number} The node identifier to check for.
   * @return {boolean} true if the node has no outgoing edge.
   */
  function isSink(nodeID)
  {
   return isValidID.call(this, nodeID) &&
    !_.has(this.EDGES, nodeID) &&
    _.has(this.TRANS, nodeID);
  }
  
  /**
   * Check if a node is a source node (No incoming edge) in the edge set.
   * @method isSink
   * @param nodeID {string or number} The node identifier to check for.
   * @return {boolean} true if the node has no outgoing edge.
   */
  function isSource(nodeID)
  {
   return isValidID.call(this, nodeID) &&
    _.has(this.EDGES, nodeID) &&
    !_.has(this.TRANS, nodeID);
  }
  
  /**
   * List all nodes that have no inbound edges by their identifiers.
   * @method listIsSource
   * @return {Array} 
   * An array of strings (node keys) in lexicographic order
   */
  function listIsSource()
  {
   return _.difference(_.keys(this.EDGES), _.keys(this.TRANS)).sort();
  }
  
  /**
   * List all nodes that have no outbound edges by their identifiers.
   * @method listIsSource
   * @return {Array} 
   * An array of strings (node keys) in lexicographic order
   */
  function listIsSink()
  {
   return _.difference(_.keys(this.TRANS), _.keys(this.EDGES)).sort();
  }
  
  /**
   * Given a set of nodes, keep those that are not on the endpoints
   * of any edge within the edge set.
   * @listIsIsolated
   * @param {object|(Array of string|number)}
   * An array of node identifiers. In case of an object, the object's
   * keys will be used as the set like the case of array.
   * @return {Array of string}
   * A list of isolated nodes.
   */
  function listIsIsolated(nameList)
  {
   var nList = _.isObject(nameList) ? _.keys(nameList) : 
    _.isArray(nameList) ? nameList : [];
   var notAlone = _.union(_.keys(this.TRANS), _.keys(this.EDGES));
    
   return _.difference(nList.filter(isValidID, this), notAlone);
  }
  
  /**
   * List all nodes that is not a source node (Has at least one inbound edge)
   * @method listIsNotSource
   * @return {Array of string}
   * A list of node names with at least one inbound edge
   */
  function listIsNotSource()
  {
   return _.keys(this.TRANS).sort();
  }
  
  /**
   * List all nodes that is not a sink node (Has at least one outbound edge)
   * @method listIsNotSink
   * @return {Array of string}
   * A list of node names with at least one outbound edge.
   */
  function listIsNotSink()
  {
   return _.keys(this.EDGES).sort();
  }
  
  function listByInboundOutbound(isOutbound)
  {
   var dirFunc = isOutbound ? getEdgesOut : getEdgesIn,
    edgeSet = isOutbound ? this.EDGES : this.TRANS,
    that = this;
   
   return _.keys(edgeSet).sort().reduce(function (acc, key, index, array){
    var vals = _.keys(dirFunc.call(that, key)).sort();
    if (vals.length > 0)
    {
     acc.push({key : key, vals : vals});
    }
    return acc;
   }, []);
  }
  
  /**
   * For each node within the graph, list the names of the nodes that 
   * point to the current node.
   * @method listByInbound
   * @return {Array} 
   * An array of objects, where `key` is the node's name (string), and 
   * `vals` an array of node names (string) pointing at the source node.
   *
   * ```
   * [
   *  {key : "nodeID", vals : ["from-1", "from-2"]},
   *  {key : "nodeID2", vals : ["from-3", "from-4"]}
   * ]
   * ```
   */
  function listByInbound()
  {
   return listByInboundOutbound.call(this);
  }
  
  /**
   * For each node within the graph, list the names of the nodes connected 
   * by their outbound edges.
   * @method listByOutbound
   * @return {Array} 
   * An array of objects, where `key` is the node's name (string), and 
   * `vals` an array of node names (string) pointed by the source node.
   *
   * ```
   * [
   *  {key : "nodeID", vals : ["to-1", "to-2"]},
   *  {key : "nodeID2", vals : ["to-3", "to-4"]}
   * ]
   * ```
   */
  function listByOutbound()
  {
   return listByInboundOutbound.call(this, true);
  }
  
  /**
   * Reverses the directions of all edges within the edge set.
   * @method transpose
   * @return {LooseEdge} The transformed LooseEdge instance.
   */
  function transpose()
  {
   var temp = this.EDGES;
   this.EDGES = this.TRANS;
   this.TRANS = temp;
   
   return this;
  }

  /**
   * Imports graph data with a JSON string|a plain javascript object.
   * @method fromJSON
   * @param input {string|object} 
   * The graph data to import from. Effectively, it parses the input JSON 
   * string and calls `addEdge(object)`, merging that object's edge set
   * into the current one.
   * @return {LooseEdge} The modified directed graph instance.
   * @throw {Error}
   * if the input is of type string, but it is invalid JSON.
   */
  function fromJSON(input)
  {
   var parsed = _.isString(input) ? JSON.parse(input) : input;
   if (_.isObject(parsed))
   {
    addEdges.call(this, parsed);
   }
   return this;
  }


  
  /**
   * Extracts a JSON serializable version of the LooseEdge object.
   * @method toJSON
   * @return {object}
     A plain object ready to be serialized using `JSON.stringify()`
   */
  function toJSON()
  {
   return this.EDGES;
  }
  
  return {
   rmEdge : rmEdgeRoute,
   addEdge : addEdgeRoute,
   getEdgeSingle : getEdgeSingle,
   getEdgesAll : getEdgesAll,
   getEdgesIn : getEdgesIn,
   getEdgesOut : getEdgesOut,
   hasEdge : hasEdge,
   
   isIsolated : isIsolated,
   isSource : isSource,
   isSink : isSink,
   
   listIsSource : listIsSource,
   listIsSink : listIsSink,
   listIsNotSource : listIsNotSource,
   listIsNotSink : listIsNotSink,
   listIsIsolated : listIsIsolated,
   listByInbound : listByInbound,
   listByOutbound : listByOutbound,
   transpose : transpose,
   
   fromJSON : fromJSON,
   toJSON : toJSON
  };
 }());

 return LooseEdge;
}());

if (typeof module != "undefined")
{
 module.exports = LooseEdge;
}





/* requires ./lib/lodash.min.js */
/* requires ./lib/STR.js */
/* requires ./lib/LooseEdge.js */



var DB = (function ()
{
 //List of recognized charsets.
 var CHARSET_ENUM =
 {
  UTF8 : "UTF-8"
 };
 
 //List of recognized mime types.
 var MIME_ENUM =
 {
  TEXT : "text/plain",
  HTML : "text/html",
  WIKI : "text/x-bbm",
  JSON : "application/json"
 };

 //Configuration Object factory
 var Config = (function (){
  function create(title, startup, cfmDel, cfmNav, searchCase)
  {
   var obj =
   {
    title : _.isString(title) ? STR.titleize(title) : "BareBonesWiki",
    startup : startup ? uniqueWords(startup, STR.wordsByPipes) : [],
    cfmDel : !!cfmDel,
    cfmNav : !!cfmNav,
    searchCase : !!searchCase
   };
   return obj;
  }

  function createFromObject(cfgObj)
  {
   var obj = _.isObject(cfgObj) ? cfgObj : {};
   return create(
    obj.title,
    obj.startup,
    obj.cfmDel,
    obj.cfmNav,
    obj.searchCase
   );
  }
  
  function createRoute()
  {
   var args = arguments;
   if (_.isObject(args[0]) && args.length === 1)
   {
    return createFromObject.call(this, args[0]);
   }
   return create.apply(this, args);
  }
  
  return {create : createRoute};
 }());

 //WikiNode Object factory.
 var WikiNode = (function (){
  function defaultTags(tagStr)
  {
   var tags = uniqueWords(tagStr, STR.wordsByPipes).sort();
   if (tags.length < 1)
   {
    tags.push("Uncategorized");
   }
   return tags;
  }
  
  function defaultMime(mimeStr)
  {
   return _.contains(_.values(MIME_ENUM), mimeStr) ? mimeStr : MIME_ENUM.WIKI;
  }

  function create(title, src, mime, tags, created, edited)
  {
   var obj =
   {
    title : STR.titleize(title),
    src : _.isString(src) ? src : "",
    mime : defaultMime(mime),
    tags : defaultTags(tags),
    created : parseInt(created, 10) || Date.now(),
    edited : parseInt(edited, 10) || Date.now() + 1000
   };
   
   if (obj.title.length <= 0)
   {
    throw new RangeError("A WikiNode cannot have an empty title.");
   }
   
   return obj;
  }

  function createFromObject(wNodeObj)
  {
   var obj = _.isObject(wNodeObj) ? wNodeObj : {};
   return create(
    obj.title,
    obj.src,
    obj.mime,
    obj.tags,
    obj.created,
    obj.edited
   );
  }
  
  function createRoute()
  {
   var args = arguments;
   if (_.isObject(args[0]) && args.length === 1)
   {
    return createFromObject.call(this, args[0]);
   }
   return create.apply(this, args);
  }
  
  function validate(obj)
  {
   return _.isObject(obj)
    _.isString(obj.title) && STR.trim(obj.title).length > 0 &&
    _.isArray(obj.tags) && obj.tags.every(_.isString)
    _.isString(obj.src) &&
    _.isString(obj.mime) &&
    _.isNumber(obj.created) &&
    _.isNumber(obj.edited) &&
    obj.edited >= obj.created;
  }
  
  function doSearch(obj, word, caseSense)
  {
   return STR.hasSubstring(obj.title, word, caseSense) ||
    STR.hasSubstringArray(obj.tags, word, caseSense) ||
    STR.hasSubstring(obj.src, word, caseSense);
  }

  //Simple keyword conjunction search; Must contain all keywords.
  function search(obj, wordList, caseSense)
  {
   if (!validate(obj)) {return false;}
  
   var repeats = [];
   for (var i = 0, ii = wordList.length; i < ii; i += 1)
   {
    var word = wordList[i];
    if (!_.isString(word) || repeats.indexOf(word) !== -1) {continue;}
    repeats.push(word);
    if (!doSearch(obj, word, caseSense)) {return false;}
   }
   return true;
  }


  return {
   create : createRoute,
   search : search,
   validate : validate
  };
 }());


 
 //Index cache
 var TAGTITLE = null,
  TITLES = null,
  EDITED = null,
  CREATED = null,
  ORPHANS = null,
  BACKLINKS = null,
  MIME = null;
 
 //Global states
 var CHANGED = false,
  PREF = "New Entry ",
  PREF_TMP = "TMP ",
  DATE = new Date(),
  UUID = 0;
  
  
 //Persistent models.
 var NODES = {}, //Node set; Plain object
  EDGES = LooseEdge(), //Edge set; Special class
  CONFIG = Config.create(); //Config; Plain object
  
 
 function uniqueWords(strArr, delimCallback)
 {
  var delimFunc = _.isFunction(delimCallback) ? delimCallback : STR.words;
  var strArray = _.isString(strArr) ? delimFunc(strArr) :
   _.isArray(strArr) ? strArr.filter(_.isString) : [];
   
  return _.uniq(strArray.filter(STR.isNotBlank));
 }
 
 function itSearchNode(acc, wNode, key, plainObj)
 {
  var wordList = this;
  if (WikiNode.search(wNode, wordList, CONFIG.searchCase))
  {
   acc.push(wNode.title);
  }
  return acc;
 }
 
 function itIsValidNode(wNode, key, plainObj)
 {
  return WikiNode.validate(wNode) && wNode.title === key;
 }
 
 
 
 //Iterators for sortable, nested indices.
 function itGroupTitleByDate(acc, wNode, propStr)
 {
  DATE.setTime(wNode[propStr]);
  
  var last = acc[acc.length - 1],
   time = DATE.toLocaleDateString();
  
  if (last && last.key === time)
  {
   last.vals.push(wNode.title);
  }
  else
  {
   acc.push({key : time, vals : [wNode.title]});
  }
  return acc;
 }
 
 function itGroupTitleByCreated(acc, wNode)
 {
  return itGroupTitleByDate.call(null, acc, wNode, "created");
 }
 
 function itGroupTitleByEdited(acc, wNode)
 {
  return itGroupTitleByDate.call(null, acc, wNode, "edited");
 }

 //Iterators for nested indices assisted by LooseEdge.js
 function itGroupTitleByMime(acc, wNode)
 {
  return acc.addEdge(wNode.title, wNode.mime);
 }
 
 function itGroupTitleByTags(acc, wNode)
 {
  return acc.addEdge(wNode.title, wNode.tags);
 }
 
 //Comparators
 function compareByEdited(t1, t2)
 {
  return t2.edited - t1.edited;
 }
 
 function compareByCreated(t1, t2)
 {
  return t2.created - t1.created;
 }


 //Indexing data structures for UI display.
 function indexMime()
 {
  MIME = MIME || _.values(NODES)
   .reduce(itGroupTitleByMime, LooseEdge())
   .listByInbound();
   
  return MIME;
 }
 
 function indexTags()
 {
  TAGTITLE = TAGTITLE || _.values(NODES)
   .reduce(itGroupTitleByTags, LooseEdge())
   .listByInbound();
   
  return TAGTITLE;
 }
 
 function indexTagSingle(tagName)
 {
  TAGTITLE = indexTags();
  for (var i = 0, ii = TAGTITLE.length; i < ii; i += 1)
  {
   if (TAGTITLE[i].key === tagName) {return TAGTITLE[i].vals;}
  }
  return [];
 }

 function indexTitles()
 {
  TITLES = TITLES || _.keys(NODES).sort();
  return TITLES;
 }
 
 function indexCreated()
 {
  CREATED = CREATED || _.values(NODES)
   .sort(compareByCreated)
   .reduce(itGroupTitleByCreated, []);
   
  return CREATED;
 }
 
 function indexEdited()
 {
  EDITED = EDITED || _.values(NODES)
   .sort(compareByEdited)
   .reduce(itGroupTitleByEdited, []);
   
  return EDITED;
 }
 
 function indexEditedFlat()
 {
  return _.values(NODES).sort(compareByEdited);
 }
 
 function indexBacklinks()
 {
  BACKLINKS = BACKLINKS || EDGES.listByInbound();
  return BACKLINKS;
 }
 
 function indexOrphans()
 {
  ORPHANS = ORPHANS || _.difference(_.keys(NODES), EDGES.listIsNotSource());
  return ORPHANS;
 }
 
 function indexSearch(wordList)
 {
  return _.transform(NODES, itSearchNode, [], uniqueWords(wordList)).sort();
 }



 //CRUD and name generation
 function nextName()
 {
  return PREF + (UUID += 1);
 }
 
 function newName()
 {
  var defTitle = nextName();
  while (hasNode(defTitle))
  {
   defTitle = nextName();
  }
  return defTitle;
 }
 
 function nextTmpName(title)
 {
  return title + " (" + PREF_TMP + (UUID += 1) + ")";
 }
 
 function newTmpName(title)
 {
  var defTitle = title;
  while (hasNode(defTitle))
  {
   defTitle = nextTmpName(title);
  }
  return defTitle;
 }
 
 function newNodeNoConflict(title, src, mime)
 {
  return WikiNode.create(newTmpName(title), src, mime);
 }
 
 function newNode(title, src, mime, tags)
 {
  return WikiNode.create(title, src, mime, tags);
 }
 
 function editNode(wNode, targetList, oldTitle)
 {
  if (!WikiNode.validate(wNode))
  {
   throw new TypeError("Schema error in wiki node objects.");
  }
  if (hasNode(oldTitle))
  {
   wNode.created = getNode(oldTitle).created;
  }
  
  removeNode(oldTitle);
  removeNode(wNode.title);
  addNode(wNode, targetList);
 }
 
 function addNode(wNode, targetList)
 {
  NODES[wNode.title] = wNode;
  EDGES.addEdge(wNode.title, targetList);
  nullifyCache();
 }
 
 function removeNode(title)
 {
  if (hasNode(title))
  {
   delete NODES[title];
   EDGES.rmEdge(title, EDGES.getEdgesOut(title));
  }
  nullifyCache();
 }
 
 function hasNode(title)
 {
  return (_.isString(title) || _.isNumber(title)) && _.has(NODES, title);
 }
 
 function getNode(title)
 {
  var wNode =  hasNode(title) ? NODES[title] : WikiNode.create(title);
  wNode.tags.sort();
  return wNode;
 }
 
 function setConfig(cfgObj)
 {
  CHANGED = true;
  return _.merge(CONFIG, Config.create(cfgObj))
 }
 
 function getConfig()
 {
  return CONFIG;
 }
 
 function hasChanged()
 {
  return CHANGED;
 }
 
 function fromJSON(input)
 {
  var jsonObj = _.isString(input) ? JSON.parse(input) :
   _.isObject(input) ? input : {};
   
  EDGES.addEdge(jsonObj.EDGES);
  _.merge(CONFIG, Config.create(jsonObj.CONFIG));
  _.merge(NODES, jsonObj.NODES);
  _.filter(NODES, itIsValidNode);
  
  nullifyCache()
 }
 
 function toJSON()
 {
  return {
   NODES : NODES,
   EDGES : EDGES,
   CONFIG : CONFIG
  };
 }
 
 //On (C), R, (U), (D) operations, invalidate indices.
 function nullifyCache(isEdit)
 {
  TAGTITLE = null;
  TITLES = null;
  EDITED = null;
  CREATED = null;
  ORPHANS = null;
  BACKLINKS = null;
  MIME = null;
  CHANGED = CHANGED || !isEdit;
 }


 return {
  //Supported Mime types
  MIME : MIME_ENUM,
  CHARSET : CHARSET_ENUM,
  
  //Inner factories and classes.
  Config : Config,
  WikiNode : WikiNode,
 
  //CRUD methods
  getConfig : getConfig,
  setConfig : setConfig,
  newName : newName,
  newNode : newNode,
  newNodeNoConflict : newNodeNoConflict,
  editNode : editNode,
  removeNode : removeNode,
  getNode : getNode,
  hasNode : hasNode,
  hasChanged : hasChanged,
  
  //Indexing methods
  indexSearch : indexSearch,
  indexOrphans : indexOrphans,
  indexTags : indexTags,
  indexTagSingle : indexTagSingle,
  indexEdited : indexEdited,
  indexEditedFlat : indexEditedFlat,
  indexCreated : indexCreated,
  indexTitles : indexTitles,
  indexMime : indexMime,
  indexBacklinks : indexBacklinks,
  
  //Serialization & De-serialization methods
  fromJSON : fromJSON,
  toJSON : toJSON
 };
}());






/* requires ./lib/jquery.min.js */
/* requires ./lib/bbm.min.js*/
/* requires DB.js */

/*
jQuery plugins, CSS and event constants.
*/


//Application-specific events
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
 TAG : "tag",
 INDEX : "index",
 SEARCH : "search",
 
 //UI-specific IO.
 POST : "post",
 SAVE : "save",
 LOAD : "load",
 UPDATE : "update",
 EXPORT : "export",
 IMPORT : "import",
};

//Native GUI events
var EV =
{
 CLICK : "click",
 KEYDOWN : "keydown",
 CHANGE : "change"
};


//Class names without CSS syntax.
var CLS =
{
 WLINK : "js-wlink",
 
 MODAL : "js-modal",
 TAGS : "js-tags",
 CONTENT : "js-content",
 B_CLOSE : "js-b-close",
 B_SAVE : "js-b-save"
};

//CSS selector listing.
var CSS =
{
 WLINK : ".js-wlink",
 
 MODAL : ".js-modal",
 TAGS : ".js-tags",
 CTRL : ".js-ctrl",
 CONTENT : ".js-content",
 CONTENT_DELEGATE : ".js-tags, .js-content",
 B_CLOSE : ".js-b-close",
 B_SAVE : ".js-b-save"
};






/*jQuery convenience & alias plugins, plus CSS manipulation*/
(function ($){
 var protoExtend = (function (){
  
  function filterChecked()
  {
   return this.filter(":checked");
  }
  
  function checked(setChecked)
  {
   if (arguments.length >= 1)
   {
    return this.prop("checked", !!setChecked);
   }
   return this.prop("checked");
  }
  
  function log(text)
  {
   return this.val(this.val() + text + "\n");
  }
  
  function unlog()
  {
   return this.val("");
  }
  
  function placeUnder($target)
  {
   return this.setOffset($target.getOffset());
  }
  
  function links()
  {
   return this.find(CSS.WLINK);
  }
  
  function trans()
  {
   return this.find("p > img:only-child[alt='.']");
  }
  
  function linksTrans()
  {
   return this.links().add(this.trans());
  }
  
  function tabify()
  {
   this.find("a, input, textarea, button").attr("tabindex", 0);
   return this;
  }
  
  function toggleInvis(forceSwitch)
  {
   return this.toggleClass("js-css-invis", !!forceSwitch);
  }
  
  function toggleWikiLink(forceSwitch)
  {
   return this.toggleClass("js-css-wlink", !!forceSwitch);
  }
  
  function toggleRedLink(forceSwitch)
  {
   return this.toggleClass("js-css-rlink", !!forceSwitch);
  }
 
  //Position querying methods for use cases without css module in jQuery
  function getOffset()
  {
   var ele = this.get(0);
   if (!(ele instanceof HTMLElement)) {return;}
  
   var xPos = 0;
   var yPos = 0;
   while (ele)
   {
    xPos += (ele.offsetLeft - ele.scrollLeft + ele.clientLeft);
    yPos += (ele.offsetTop - ele.scrollTop + ele.clientTop);
    ele = ele.offsetParent;
   }
   return {left : xPos, top: yPos};
  }
  
  function setOffset(offsetObj)
  {
   return this.each(function (){
    this.style.left = offsetObj.left + "px";
    this.style.top = offsetObj.top + "px";
   });
  }



  return {
   filterChecked : filterChecked,
   checked : checked,
   log : log,
   unlog : unlog,
   
   trans : trans,
   links : links,
   linksTrans : linksTrans,
   
   tabify : tabify,
   toggleInvis : toggleInvis,
   toggleWikiLink : toggleWikiLink,
   toggleRedLink : toggleRedLink,
   
   setOffset : setOffset,
   getOffset : getOffset,
   placeUnder : placeUnder
  };
 }());

 $.fn.extend(protoExtend);
}(jQuery));



/*jQuery Wikitext integration plugin*/
(function ($){
 var prefix = "bbm-",
  maxVal = Math.pow(2, 20) - 1,
  htmlOpt = BBM.setOptions({CSS_PRE_ID : prefix, CSS_WIKI : CLS.WLINK});
  
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

 function parseBBM(text, mime)
 {
  if (text instanceof jQuery) {return text;}
  if (/^text\/x-bbm/i.test(mime))
  {
   htmlOpt.CSS_PRE_ID = newSeed(prefix);
   return $($.parseHTML(BBM.compile(text)));
  }
  if (/^text\/html/i.test(mime))
  {
   return $($.parseHTML(text, true));
  }
  return $("<pre></pre>").text(text);
 }
 
 $.parseBBM = parseBBM;
}(jQuery));



/*jQuery plugin for BareBonesWiki-specific DOM manipulation.*/
(function ($){
 var maxDepth = 10;
 var protoExtend = (function (){
 
  function doLinkify(index, val)
  {
   var $e = $(val);
   var title = $e.attr("href") || $e.data().title;
   if (title)
   {
    $e.data({title : title});
    $e.toggleRedLink(!DB.hasNode(title));
   }
   
   $e.toggleWikiLink(true);
  }
 
  function linkify()
  {
   this.links().each(doLinkify);
   this.tabify().each(doLinkify);
   return this;
  }
  
  function doTransclude(ele)
  {
   var $e = $(ele),
    cStack = this,
    errMsg = null,
    url = $e.attr("src") || $e.data().title,
    wNode = DB.getNode(url);
   
   
   if (cStack.length > maxDepth)
   {
    errMsg = "Maximum transclusion depth (" + maxDepth + ") reached.";
   }
   if (cStack.indexOf(url) !== -1)
   {
    errMsg = "Transclusion stopped by cycle: " + cStack.join(" ") + " " + url;
   }
   if (url.length <= 0)
   {
    errMsg = "Invalid transclusion target: Blank titles.";
   }
   if (errMsg)
   {
    return $("<p></p>").text(errMsg).replaceAll($e.parent());
   }
   
   cStack.push(url);
   $.parseBBM(wNode.src, wNode.mime)
    .transclude(cStack)
    .replaceAll($e.parent());
   cStack.pop(url);
  }
  
  function transclude(cycleStack)
  {
   var cStack = (cycleStack instanceof Array) ? cycleStack : [];
   var $div = $("<div></div>");
   
   $div.append(this)
    .trans()
    .toArray()
    .forEach(doTransclude, cStack);
   
   return $div.children().unwrap();
  }
  
  function doEdges(val)
  {
   var $e = $(val);
   return $e.attr("href") || $e.attr("src") || $e.data().title;
  }

  function getEdges()
  {
   return this.linksTrans().toArray().map(doEdges);
  }
  
  return {
   linkify : linkify,
   transclude : transclude,
   getEdges : getEdges
  };
 }());
 
 $.fn.extend(protoExtend);
}(jQuery));





/* requires $plugins.js */
//Templates used in the project.
var $TMPL = (function ()
{
 var d = new Date(),
  $tEdit = $($("#js-t-edit").html()),
  $tView = $($("#js-t-view").html()),
  $tDL = $($("#js-t-dl").html()),
  $tDT = $($("#js-t-dt").html()),
  $tDD = $($("#js-t-dd").html()),
  $tPara = $($("#js-t-para").html()),
  $tButton = $($("#js-t-button").html()),
  $tButtonTag = $($("#js-t-button-tag").html()),
  $tLinkW = $($("#js-t-wlink").html());
 
 function sigStr(msEdited, msCreated)
 {
  d.setTime(msEdited);
  var edited = d.toLocaleString();
  d.setTime(msCreated);
  var created = d.toLocaleString();
  return ("Edited: " + edited + " (Created: " + created + ")");
 }
 
 function t_options(valueList, displayTextList)
 {
  var textList = displayTextList ? displayTextList : valueList;
  var $options = $("");
  
  valueList.forEach(function (val, index){
   $options = $options.add(new Option(textList[index], valueList[index]));
  });
  return $options;
 }

 function t_edit(wNode)
 {
  var $edit = $tEdit.clone();
  var $editTags = $edit.find(".js-d-tags");
  var tagIndex = _.pluck(DB.indexTags(), "key").sort();
  
  $edit.find(".js-i-old-title").text("Editing \"" + wNode.title + "\"");
  $edit.find(".js-i-title").val(wNode.title);
  $edit.find(".js-i-src").val(wNode.src);
  $edit.find(".js-i-mime").val(wNode.mime || DB.MIME.TEXT);
  $edit.find(".js-s-tags-lookup").append(t_options(tagIndex));
  $edit.data("title", wNode.title);
  $edit.data("tags", {});
  
  wNode.tags.forEach(function (val, index){
   $edit.data("tags")[val] = t_buttonTag(val)
    .appendTo($editTags)
    .data("tag", val);
  });
  return $edit;
 }

 function t_view(wNode, frag)
 {
  var $view = $tView.clone();
  var $frag = (frag || $.parseBBM(wNode.src, wNode.mime))
   .transclude()
   .linkify();
  
  $view.find(".js-title").text(wNode.title);
  $view.find(".js-subtitle").text(sigStr(wNode.edited, wNode.created));
  $view.find(".js-tags").append(t_links(wNode.tags));
  $view.find(".js-content").append($frag);
  $view.data("title", wNode.title);
  return $view;
 }

 function t_dl(labelStr, $frag)
 {
  return $tDL.clone()
  .append($tDT.clone().text(labelStr))
  .append($tDD.clone().append($frag));
 }
 
 function t_buttonTag(displayText)
 {
  return $tButtonTag.clone()
   .find(".js-b-tag-text")
   .text(displayText)
   .end();
 }
 
 function t_button(displayText)
 {
  return $tButton.clone().text(displayText);
 }

 function t_link(displayText)
 {
  return $tLinkW.clone()
   .text(displayText)
   .attr("href", displayText)
   .data("title", displayText);
 }
 
 function t_doLinks(acc, str)
 {
  return acc.add(t_link(str));
 }
 
 function t_links(strList)
 {
  return strList.filter(_.isString).reduce(t_doLinks, $(""));
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
  $dl.links().linkify();
  return $dl;
 }
 
 
 return {
  edit : t_edit,
  view : t_view,
  dl : t_dl,
  options : t_options,
  buttonTag : t_buttonTag,
  button : t_button,
  link : t_link,
  links : t_links,
  linksPara : t_linksPara,
  linksDL : t_linksDL
 };
}());




/* requires $plugins.js */
/* requires $TMPL.js */


var $CONTENT = (function ($baseEle){

 var $oMap = (function (){
  var $rootEle = $baseEle;
  var $activeTitles = {};
 
  function get(key)
  {
   return _.has($activeTitles, key) ? $activeTitles[key] : void(0);
  }

  function add(key, $e)
  {
   var $oldEle = get(key);
   if ($oldEle)
   {
    $e.replaceAll($oldEle);
    $oldEle.remove();
   }
   else
   {
    $e.prependTo($rootEle);
   }
   $activeTitles[key] = $e;
   return $e.focus();
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
   return $e.focus();
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
   $oMap.add(title, $TMPL.edit(DB.getNode(title)));
  }
  else
  {
   $oMap.add(title, $TMPL.view(DB.getNode(title)));
  }
 }
 
 function edit(evt, title)
 {
  open(evt, title, true);
 }
 
 function close(evt, title)
 {
  if (_.isString(title)) {$oMap.remove(title);}
  else {$oMap.clear();}
 }
 
 function closeO(evt, title)
 {
  var $form = $oMap.detach(title);
  $oMap.clear();
  $oMap.add(title, $form);
 }
 
 function verifyCommit(oldTitle, $edit)
 {
  var nTitle = STR.titleize($edit.find(".js-i-title").val());
  if (nTitle.length <= 0) {return;}
  if (nTitle !== oldTitle && DB.hasNode(nTitle))
  {
   if (!window.confirm("Overwrite \"" + nTitle + "\"?")) {return;}
   $oMap.remove(nTitle);
  }
  return true;
 }
 
 function commit(evt, title)
 {
  var $edit = $oMap.get(title);
  if (!$edit || !verifyCommit(title, $edit)) {return;}
  
  var wNode = DB.newNode(
   $edit.find(".js-i-title").val(),
   $edit.find(".js-i-src").val(),
   $edit.find(".js-i-mime").val() || DB.MIME.TEXT,
   _.keys($edit.data("tags"))
  );
  
  var $frag = $.parseBBM(wNode.src, wNode.mime);
  
  DB.editNode(wNode, $frag.getEdges(), title);
  $oMap.replace(wNode.title, $TMPL.view(wNode, $frag), title);
 }
 
 function cancel(evt, title)
 {
  $oMap.add(title, $TMPL.view(DB.getNode(title)));
 }
 
 function remove(evt, title)
 {
  if (DB.getConfig().cfmDel && !window.confirm("Delete \"" + title + "\"?"))
  {
   return;
  }
  DB.removeNode(title);
  $oMap.remove(title);
 }
 
 function dispatch(evt)
 {
  var title = $(this).parents(".js-form").first().data().title,
   op = evt.data;
  
  $baseEle.trigger(op, [title]);
 }
 
 function toggleTagEdit(evt, title, tag, forceSwitch)
 {
  var $edit = $oMap.get(title);
  if (STR.titleize(tag).length <= 0) {return;}
  if (!$edit) {return;}
  
  var tagTable = $edit.data().tags;
  if (!tagTable) {return;}
  
  function removeTag()
  {
   tagTable[tag].remove();
   delete tagTable[tag];
  }

  function addTag()
  {
   tagTable[tag] = $TMPL.buttonTag(tag).appendTo($edit.find(".js-d-tags"));
  }
  
  if (_.isBoolean(forceSwitch) && forceSwitch)
  {
   if (forceSwitch && !_.has(tagTable, tag)) {addTag();}
   else if (!forceSwitch && _.has(tagTable, tag)) {removeTag();}
  }
  else if (_.has(tagTable, tag)) {removeTag();}
  else {addTag();}
 }
 
 function dispatchTags(evt)
 {
  var $e = $(this),
   $form = $e.parents(".js-form").first(),
   title = $form.data().title,
   tagTable = $form.data().tags;

  if (!tagTable) {return;}

  var $tagField = $form.find(".js-i-tags-add"),
   tag = $tagField.val() || "";
   
  if ($e.hasClass("js-b-tag-item"))
  {
   tag = $e.find(".js-b-tag-text").text();
   toggleTagEdit.call(this, evt, title, tag, false);
  }
  else if ($e.hasClass("js-s-tags-lookup"))
  {
   $tagField.val($e.val());
  }
  else
  {
   $tagField.val("");
   toggleTagEdit.call(this, evt, title, tag);
  }
 }
 
 function dispatchTagsEnter(evt)
 {
  if (evt.which === 13) {dispatchTags.call(this, evt);}
 }
 

 //TODO: change the css class of the self-deleting button
 //In: $TMPL.js, css.css, $CONTENT.js, $plugins.js, main.html
 //TODO: Implement a tag toggle.
 return $baseEle.on(EVT.OPEN, open)
 .on(EVT.EDIT, edit)
 .on(EVT.CLOSE, close)
 .on(EVT.CLOSEO, closeO)
 .on(EVT.DELETE, remove)
 .on(EVT.COMMIT, commit)
 .on(EVT.CANCEL, cancel)
 .on(EVT.TOGGLETAG, toggleTagEdit)
 .on(EV.CLICK, ".js-ctrl > .js-b-tag-item", dispatchTags)
 .on(EV.CLICK, ".js-ctrl > .js-b-tags-add", dispatchTags)
 .on(EV.CHANGE, ".js-ctrl > .js-s-tags-lookup", dispatchTags)
 .on(EV.KEYDOWN, ".js-ctrl > .js-i-tags-add", dispatchTagsEnter)
 .on(EV.CLICK, ".js-ctrl > .js-b-close", EVT.CLOSE, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-close-o", EVT.CLOSEO, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-edit", EVT.EDIT, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-finish", EVT.COMMIT, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-cancel", EVT.CANCEL, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-delete", EVT.DELETE, dispatch)
 
}($("#js-area-content")));





/* requires $plugins.js */
/* requires $TMPL.js */


var $INDEXVIEW = (function ($dest, $text){
 
 var $ivTitle = $dest.find("#js-area-index-title");
 var $ivContent = $dest.find("#js-area-index-content");
 var $ivCloseBtn = $dest.find(CSS.B_CLOSE).on(EV.CLICK, close);
 
 $dest.data({
  Title : function ()
  {
   return $TMPL.linksPara(DB.indexTitles());
  },
  Tags : function ()
  {
   return $TMPL.linksDL(DB.indexTags());
  },
  Created : function ()
  {
   return $TMPL.linksDL(DB.indexCreated());
  },
  Recent : function ()
  {
   return $TMPL.linksDL(DB.indexEdited());
  },
  Orphan : function ()
  {
   return $TMPL.linksPara(DB.indexOrphans());
  },
  Backlink : function ()
  {
   return $TMPL.linksDL(DB.indexBacklinks(), true);
  },
  Mime : function ()
  {
   return $TMPL.linksDL(DB.indexMime());
  }
 });

 function search(evt)
 {
  var wordList = STR.words($text.val());
  if (wordList.length <= 0) {return;}
  
  var titles = DB.indexSearch(wordList);
  
  $dest.toggleInvis(false);
  $ivTitle.empty().text("Found " + titles.length + " match(es).");
  $ivContent.empty().append($TMPL.linksPara(titles));
 }
 
 function index(evt, indexType)
 {
  $dest.toggleInvis(false);
  $ivTitle.empty().text("Indexing " + indexType);
  $ivContent.empty().append($dest.data()[indexType]());
 }
 
 function close(evt)
 {
  $ivTitle.empty();
  $ivContent.empty();
  $dest.toggleInvis(true);
 }
 
 close();
 
 return $dest.on(EVT.SEARCH, search)
  .on(EVT.INDEX, index)
  .on(EVT.CLOSE, close);
}($("#js-area-index"), $("#js-txt-search")));





/**
 * A base64 encoding and decoding factory. Converts arbitrary data
 * into base64, and back to its original form. Contains an encoding
 * and a decoding method.
 *
 * ```
 ( base64.decode(base64.encode("This is some arbitrary data"));
 * ```
 *
 * Original algorithm from:
 *
 * https://github.com/davidchambers/Base64.js/blob/master/base64.js
 * @module base64
 * @main base64
 */

/*jshint boss:true*/
var base64 = (function()
{
 //http://tools.ietf.org/rfc/rfc4648.txt @ page 5
 var chars = 
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

  
 /**
  * Transforms some arbitrary data into a base64 string.
  * @method encode
  * @param input {string} The data to encode.
  * @returns {string} The base64 encoded string.
  * @throw {Error} If the input contains non-Latin1 characters
  */
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

 /**
  * Transforms a base64 string back to the original string.
  * @method encode
  * @param input {string} The data to decode.
  * @returns {string} The original string passed into `base64.encode()`
  * @throw {Error}
  * If there are non-base64 characters in the input, which is of the
  * following list:
  *
  * ```
  * ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
  * ```
  */
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

/**
 * DataURI Generation factory for constructing safe data URI out of 
 * any string values. Contains an encode method to be used as follows:
 *
 * ```
 * dataURI.encode("This is my textual data", "text/plain");
 * ```
 *
 * @module dataURI
 * @main dataURI
 * @requires base64
 */
var dataURI = (function()
{
 function utfBase64(str) {return base64.encode(encodeURIComponent(data));}
 
 /**
  * Given some textual data (string), construct a web-safe data URI.
  * @method dataURI
  * @param dataString {string}
  * The data to be encoded as a data URI. No need to usew 
  * @param [mimeStr] {string}
  * The mime type of the input string, which will affect the way this
  * chunk of data is interpreted. Default: `text/plain` if skipped via
  * `null`.
  * @param [base64Flag] {boolean}
  * If true, uses Base64 encoding; Uses `encodeURIComponent()` otherwise.
  * @return {string}
  * The constructed dataURI ready to be used as a URL, such as in
  * HTML anchor tags and image tags.
  *
  * @see http://www.iana.org/assignments/media-types/media-types.xhtml
  * for examples and an incomplete list of currently known registered
  * mime types.
  */
  
 function encode(dataStr, mimeStr, base64Flag)
 {
  var res = null,
   mime = mimeStr ? ";" + mimeStr : ";text/plain",
   base64 = base64Flag ? ";base64" : "",
   func = base64Flag ? utfBase64 : encodeURIComponent;
   
  return "data:" + mime + base64 + "," + func(dataStr);
 }
 
 return {encode : encode};
}());



/* requires dataURI.js */

/**
 * A convenience browser module for performing automatic client-side
 * data download. Works for the following kinds of web browsers:
 *
 * - IE10 or later
 * - Supports the anchor download attribute `<a download="...">`
 *
 * Sample code:
 *
 * ```
 * autoSave.save("Arbitrary data", "text/plain", "myFile.txt");
 * ```
 * @module autoSave
 * @main autoSave
 * @requires dataURI
 */
var autoSave = (function()
{
 var a = document.createElement("a"),
  hasMSIE = (!!navigator.msSaveBlob),
  hasDownload = (typeof a.download !== "undefined"),
  useFunc = hasMSIE ? msieDownload : hasDownload ? autoDownload : void(0);
  
 a.style.display = "none";
 a.target = "_blank";
 
 function autoDownload(dataStr, mimeStr, fileName)
 {
  a.href = dataURI.encode(dataStr, mimeStr);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  a.download = "";
  a.href = "";
 }
 
 function msieDownload(dataStr, mimeStr, fileName)
 {
  var blob = new Blob([dataStr], {type: mimeStr});
  window.navigator.msSaveBlob(blob, fileName);
 }
 
 
 /**
  * @method save
  * @param dataStr {string} The text data to save.
  * @param [mimeStr] {string}
  * Data mime type, which affects the way the input data is interpreted.
  * Default: "text/plain" (.txt files)
  * @param [fileName] {string}
  * Suggested file name; This is a hint to the web browser for file naming.
  * The actual file name is not guaranteed to the same as the specified
  * name. Default: "default" 
  * @return {boolean}
  * true if the web browser has handled automatic data saving, (which will
  * trigger client-side prompts for saving) false otherwise.
  */
 function handleDownload(dataStr, mimeStr, fileName)
 {
  if (useFunc) {useFunc.call(this, dataStr, mimeStr, fileName);}
  return !!(useFunc);
 }
 
 return {save : handleDownload};
}());



/* requires $plugins.js */

var $EXPORTWIZ = (function ($wiz){
 var $saveLink = $wiz.find("#js-save-link");
 
 $wiz.on(EVT.CLOSE, function (evt){
  $wiz.toggleInvis(true),
  $saveLink.attr("href", "#");
 });
 
 $wiz.on(EVT.LOAD, function (evt, uri){
  $saveLink.attr("href", uri);
  $wiz.toggleInvis(false).focus();
 });
 
 return $wiz;
}($("#js-export-wiz")));






/* requires ./lib.saver/autoSave.js */
/* requires $EXPORTWIZ.js */


var $SAVER = (function ($contentArea){
 var $obj = $({});

 function uOuterHTML($ele)
 {
  return $("<div></div>").append($ele.clone()).html();
 }
 
 function uExportWhole()
 {
  return "<!DOCTYPE HTML>\n" + uOuterHTML($(document.documentElement));
 }
 
 function save(evt, text, mime, fname)
 {
  if (autoSave.save(text, mime, fname)) {return;}
  $EXPORTWIZ.trigger(EVT.LOAD, [dataURI.encode(text, mime)]);
 }
 
 function saveJson(evt, jsonStr, fname)
 {
  save(evt, jsonStr, DB.MIME.JSON, fname);
 }
 
 function saveDoc(evt, fname)
 {
  var $contents = $contentArea.contents().detach();
  save(evt, uExportWhole(), DB.MIME.HTML, fname);
  $contentArea.append($contents);
 }
 
 
 $obj.on(EVT.SAVE, saveDoc);
 $obj.on(EVT.EXPORT, saveJson);
 
 return $obj;
}($("#js-area-content")));





/* requires $plugins.js */

var $CONFIGWIZ = (function ($cfg){
 var $pgTitle = $("#js-pg-title"),
  $docTitle = $cfg.find("#js-i-cfg-title"),
  $startup = $cfg.find("#js-i-cfg-startup"),
  $cfmDel = $cfg.find("#js-c-cfg-cfm-del"),
  $cfmNav = $cfg.find("#js-c-cfg-cfm-nav"),
  $searchCase = $cfg.find("#js-c-cfg-search-case");
 
 $cfg.on(EVT.CLOSE, function (evt){
  $cfg.toggleInvis(true).get(0).reset();
 });
 
 $cfg.on(EVT.SAVE, function (evt){
  var newCfg = DB.setConfig({
   title : $docTitle.val(),
   startup : $startup.val(),
   cfmDel : $cfmDel.checked(),
   cfmNav : $cfmNav.checked(),
   searchCase : $searchCase.checked()
  });
  
  $cfg.trigger(EVT.CLOSE);
  $cfg.trigger(EVT.UPDATE, [newCfg]);
 });
 
 $cfg.on(EVT.LOAD, function (evt){
  var cfg = DB.getConfig();
  
  $docTitle.val(cfg.title);
  $startup.val(cfg.startup.join(" || "));
  $cfmDel.checked(cfg.cfmDel);
  $cfmNav.checked(cfg.cfmNav);
  $searchCase.checked(cfg.searchCase);
  
  $cfg.toggleInvis(false).focus();
 });
 
 $cfg.on(EVT.UPDATE, function (evt, cfgObj){
  document.title = cfgObj.title;
  $pgTitle.text(cfgObj.title);
 });
 
 
 
 return $cfg;
}($("#js-cfg-wiz")));





/* requires $plugins.js */
/* requires $CONTENT.js */
/* requires $CONFIGWIZ.js */

var $IMPORTWIZ = (function ($wiz){
 var $importAs = $wiz.find("input[type='radio'][name='js-import-type']"),
  $charset = $wiz.find("#js-s-import-charset");
  $fileEle = $wiz.find("#js-i-import"),
  $log = $wiz.find("#js-i-import-log"),
  MSIZE = Math.pow(2, 20) * 10;
  
 function importDelegate(evt)
 {
  if (!(File && FileReader))
  {
   $log.log("Error: File reading not supported.");
   return;
  }
  
  var charset = $charset.val() || DB.CHARSET.UTF8;
  var files = evt.target.files;
  for (var i = 0, ii = files.length; i < ii; i += 1)
  {
   var file = files[i];
   var fSize = file.size || file.fileSize;
    
   if (fSize < MSIZE)
   {
    var fReader = new FileReader();
    fReader.onload = onLoad;
    fReader.onerror = onError;
    fReader.fileName = file.name;
    fReader.readAsText(file, charset);
   }
   else {$log.log(sizeErrMsg(file.name, MSIZE, fSize));}
  }
 }
 
 function onLoad(evt)
 {
  var text = evt.target.result,
   fName = evt.target.fileName || DB.newName(),
   type = $importAs.filterChecked().val() || DB.MIME.TEXT;
   
  if (type === DB.MIME.JSON)
  {
   try
   {
    DB.fromJSON(text);
    $CONFIGWIZ.trigger(EVT.UPDATE, [DB.getConfig()]);
    $log.log("Successfully imported JSON dataset");
   }
   catch (err)
   {
    $log.log("Failed to import JSON dataset : " + err.toString());
   }
   return;
  }
  $log.log("Imported " + fName);
  
  var wNode = DB.newNodeNoConflict(fName, text, type);
  DB.editNode(wNode, $.parseBBM(text, type).getEdges());
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
 
 $wiz.on(EVT.LOAD, function (evt){
  $log.unlog();
  $wiz.toggleInvis(false).focus();
 });
 
 $wiz.on(EVT.CLOSE, function (evt){
  $log.unlog();
  $wiz.toggleInvis(true);
 });

 $fileEle.on(EV.CHANGE, importDelegate);

 
 return $wiz;
}($("#js-import-wiz")));





/* requires $CONTENT.js */
/* requires $INDEXVIEW.js */

var $POPUPWIZ = (function ($wiz){

 var $title = $wiz.find("#js-popup-title");
 var $content = $wiz.find("#js-popup-content");
 
 var MODE_ENUM =
 {
  TAGS : 0,
  INDEX : 1,
 };
 var MODE = MODE_ENUM.TAGS;

 $wiz.find(CSS.B_CLOSE).on(EV.CLICK, function(evt){
  evt.stopPropagation();
  $wiz.trigger(EVT.CLOSE);
 });
 
 $wiz.on(EV.CLICK, CSS.WLINK, function (evt){
  evt.preventDefault();
  if (MODE_ENUM.TAGS === MODE)
  {
   $CONTENT.trigger(EVT.OPEN, [$(evt.target).data().title]);
  }
  else if (MODE_ENUM.INDEX === MODE)
  {
   $INDEXVIEW.trigger(EVT.INDEX, [$(evt.target).data().title]);
  }
 });
 
 $wiz.on(EVT.LOAD, function (evt){
  $title.empty();
  $content.empty();
  $wiz.toggleInvis(false);
  evt.stopPropagation();
 });
 
 $wiz.on(EVT.CLOSE, function (evt){
  $title.empty();
  $content.empty();
  $wiz.toggleInvis(true);
 });
 
 $wiz.on(EVT.INDEX, function (evt){
  var indices = _.keys($INDEXVIEW.data());
  var $links = $TMPL.linksPara(indices);
 
  $wiz.trigger(EVT.LOAD);
  $title.text("Choose an index type...");
  $content.append($links);
  
  MODE = MODE_ENUM.INDEX;
 });
 
 $wiz.on(EVT.TAG, function (evt, tagName){
  $wiz.trigger(EVT.LOAD);
  $title.text(tagName);
  $content.append($TMPL.linksPara(DB.indexTagSingle(tagName)));
  
  MODE = MODE_ENUM.TAGS;
 });
 
 
 
 return $wiz;
}($("#js-popup-wiz")));





/* requires $plugins.js */

var $ERRORWIZ = (function ($wiz){
 var $log = $wiz.find("#js-i-error-log");
 
 $wiz.on(EVT.LOAD, function (evt, errMsg){
  $log.unlog().log(errMsg);
  $wiz.toggleInvis(false).focus();
 });
 
 $wiz.on(EVT.CLOSE, function (evt){
  $log.unlog();
  $wiz.toggleInvis(true);
 });
 
 return $wiz;
}($("#js-err-wiz")));





/* requires $CONTENT.js */
/* requires $INDEXVIEW.js */
/* requires $SAVER.js */
/* requires $CONFIGWIZ.js */
/* requires $IMPORTWIZ.js */
/* requires $POPUPWIZ.js */
/* requires $ERRORWIZ.js */


(function ($body){
 var $DS = $("#js-db");
 
 function initStartup(titleStartup)
 {
  $CONTENT.trigger(EVT.OPEN, titleStartup);
 }
 
 function initRecent(entryRecent, index)
 {
  $CONTENT.trigger(EVT.OPEN, entryRecent.title);
 }
 
 DB.fromJSON(STR.decodeHTMLBody($DS.html()));
 if (DB.getConfig().startup.length > 0)
 {
  DB.getConfig().startup.reverse().forEach(initStartup);
 }
 else
 {
  DB.indexEditedFlat().slice(0, 5).reverse().forEach(initRecent);
 }
 
 
 //If a click event manages to bubble up to here, close the popup.
 $body.on(EV.CLICK, function (evt){
  $POPUPWIZ.trigger(EVT.CLOSE);
 });
 
 //Handles wiki link click events in general
 $body.on(EV.CLICK, CSS.WLINK, function (evt){
  var $src = $(evt.target);
  var title = $src.data().title;
  var $parent = $src.parents(CSS.CONTENT_DELEGATE).first();
  
  evt.preventDefault();
  if ($parent.hasClass(CLS.TAGS))
  {
   $POPUPWIZ.trigger(EVT.TAG, [title]).placeUnder($src).focus();
   evt.stopPropagation();
  }
  else if ($parent.hasClass(CLS.CONTENT))
  {
   $CONTENT.trigger(EVT.OPEN, [title]);
  }
 });
 
 //Handles close and save buttons on modal window.
 $body.on(EV.CLICK, CSS.MODAL, function (evt){
  var $src = $(evt.target);
  if ($src.hasClass(CLS.B_CLOSE))
  {
   $(this).trigger(EVT.CLOSE);
  }
  else if ($src.hasClass(CLS.B_SAVE))
  {
   $(this).trigger(EVT.SAVE);
  }
 });
 
 $("#js-txt-search").on(EV.KEYDOWN, function (evt){
  if (evt.which === 13) {$INDEXVIEW.trigger(EVT.SEARCH);}
 }).focus();
 
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
  $POPUPWIZ.trigger(EVT.INDEX).placeUnder($(evt.target)).focus();
  evt.stopPropagation();
 });
 
 $("#js-b-cfg").on(EV.CLICK, function (evt){
  $CONFIGWIZ.trigger(EVT.LOAD);
 });
 
 $("#js-b-save").on(EV.CLICK, function (evt){
  $DS.text(STR.encodeHTMLBody(JSON.stringify(DB, null, " ")));
  $SAVER.trigger(EVT.SAVE, [document.title + ".html"]);
 });
 
 $("#js-b-export").on(EV.CLICK, function (evt){
  var jsonStr = STR.encodeHTMLBody(JSON.stringify(DB, null, " "));
  $SAVER.trigger(EVT.EXPORT, [jsonStr, document.title + ".json"]);
 });
 
 $("#js-b-import").on(EV.CLICK, function (evt){
  $IMPORTWIZ.trigger(EVT.LOAD);
 });
 
 $(window).on("beforeunload", function (evt){
  if (DB.getConfig().cfmNav && DB.hasChanged())
  {
   return "You will lose unsaved changes; Navigate away anyway?";
  }
 });
 
 window.onerror = function (msg, url, ln)
 {
  $ERRORWIZ.trigger(EVT.LOAD, "Line " + ln + ": " + msg);
 };
 
}($("html")));