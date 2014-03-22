/* requires ./lib/str_.js */
/* requires ./lib/obj_.js */

/*
WikiNode object; Contains basic data correction/verification
Need polyfills for IE8-9, Konqueror.

 - Array.prototype.filter
 - Array.prototype.map
*/
var WikiNode = (function (){
 
 var MIME_ENUM =
 {
  TEXT : "text/plain",
  HTML : "text/html",
  WIKI : "text/x-bbm"
 };
 var own = Object.prototype.hasOwnProperty;
 
 function dateNow()
 {
  return Date.now() || (new Date()).getTime();
 }

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
  var newTitle = str_.titleize(titleStr);
  if (newTitle.length <= 0)
  {
   throw new RangeError("A wiki entry cannot have an empty title.");
  }
  return newTitle;
 }
 
 //Throws exception if receiving an array that is not all strings.
 function verifyTags(tagStr)
 {
  if (obj_.isStr(tagStr))
  {
   return str_.lines(tagStr, 1, 1, 1);
  }
  
  var tags = [];
  if (obj_.isArray(tagStr))
  {
   tags = tagStr.map(verifyTitle)
    .filter(isNotEmptyString)
    .filter(isUnique);
  }
  if (tags.length < 1)
  {
   tags.push("Uncategorized");
  }
  return tags;
 }
 
 function verifyMime(mimeEnum)
 {
  var hasOwn = Object.prototype.hasOwnProperty;
  if (obj_.isStr(mimeEnum) && hasOwn.call(MIME_ENUM, mimeEnum))
  {
   return MIME_ENUM[mimeEnum];
  }
  return MIME_ENUM.TEXT;
 }
 
 function verifyDate(utcNumber)
 {
  return obj_.isNumber(utcNumber) ? utcNumber : dateNow();
 }

 function verifySrc(srcStr)
 {
  return obj_.isStr(srcStr) ? srcStr : "";
 }

 function WikiNode(title, src, mime, tags, prevDate)
 {
  if (!(this instanceof WikiNode))
  {
   return new WikiNode(title, src, mime, tags, prevDate);
  }
  
  this.title = verifyTitle(title);
  this.src = verifySrc(src);
  this.tags = verifyTags(tags);
  this.mime = verifyMime(mime);
  this.created = verifyDate(prevDate);
  this.edited = verifyDate(dateNow());
  
  return this;
 }

 WikiNode.prototype = (function (){
  function doSearch(node, word, caseSense)
  {
   return str_.hasSubstr(this.title, word, caseSense) ||
    str_.hasSubstrArray(this.tags, word, caseSense) ||
    str_.hasSubstr(this.src, word, caseSense);
  }
  
  function search(wordList, caseSense)
  {
   var res = [];
   var repeats = [];
   
   for (var i = 0, ii = wordList.length; i < ii; i += 1)
   {
    var word = wordList[i];
    if (!obj_.isStr(word)) {continue;}
    if (repeats.indexOf(word) !== -1) {continue;}
    
    repeats.push(word);
    if (doSearch.call(this, word, caseSense)) {break;}
   }
   return res.sort();
  }
 
  return {search : search};
 }());
 
 WikiNode.MIME_ENUM = MIME_ENUM;
 
 return WikiNode;
}());

