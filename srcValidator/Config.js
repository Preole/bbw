/* requires ./lib/str_.js */
/* requires ./lib/obj_.js */

var Config = (function (){
 
 var DEF =
 {
  "title": "BareBonesWiki",
  "startup": ["BareBonesWiki"],
  "cfmDel": false,
  "cfmNav": false,
  "searchCase": false
 };
 
 //TODO: Don't repeat isNotEmptyString() and isUnique() with WikiNode.js
 function isNotEmptyString(str, index, array)
 {
  return obj_.isStr(str) && str.length > 0;
 }
 
 function isUnique(value, index, array)
 {
  return array.indexOf(value) === index;
 }
 
 //Throws exception if parameter is not of type string.
 function verifyTitle(titleStr)
 {
  if (!obj_.isStr(titleStr))
  {
   throw new TypeError("Expected a string value.");
  }
  return str_.titleize(titleStr);
 }
 
 //Throws exception if receiving an array that is not all strings.
 function verifyStartup(startupStr)
 {
  if (obj_.isStr(startupStr))
  {
   return str_.lines(startupStr, 1, 1, 1);
  }
  
  if (obj_.isArray(startupStr))
  {
   return startupStr.map(verifyTitle)
    .filter(isNotEmptyString)
    .filter(isUnique);
  }
  return [];
 }

 function Config(title, startup, confirmDel, confirmNav, searchCase)
 {
  if (!(this instanceof Config))
  {
   return new Config(title, startup, confirmDel, confirmNav, searchCase);
  }
  
  this.startup = verifyStartup(startup);
  this.title = verifyTitle(title);
  this.cfmNav = !!confirmNav;
  this.cfmDel = !!cfmDel;
  this.searchCase = !!searchCase;
  return this;
 }
 
 Config.prototype = (function (){
  function fromJSON(str)
  {
   fromObj.call(this, JSON.parse(str));
   return this;
  }
  
  function fromObj(obj)
  {
   var ob = obj.CONFIG || obj;
   Config.call(this,
    ob.title,
    ob.startup,
    ob.cfmDel,
    ob.cfmNav,
    ob.searchCase
   );
   return this;
  }
  
  function fromRoute(input)
  {
   if (obj_.isStr(input))
   {
    fromJSON.call(this, input);
   }
   else if (obj_.isObj(input))
   {
    fromObj.call(this, input);
   }
   return this;
  }
 
  return {fromJSON : fromRoute};
 }());
 
 Config.DEFAULTS = function ()
 {
  return Config(
   DEF.title,
   DEF.startup,
   DEF.cfmDel,
   DEF.cfmNav,
   DEF.searchCase
  );
 };

 
 return Config;
}());