/* requires PO.js */

var STR = (function()
{
 var WS =
   "[ \\u2000-\\u200d\\t\\u202f\\u205f\\u3000\\u1680" +
   "\\u180e\\u00a0\\u00b7\\u237d\\u2420\\u2422\\u2423]",
  NL = "[\\v\\f\\r\\n\\u0085\\u2028\\u2029]",
  REGEX_NL_G = new RegExp(NL, "g"),
  REGEX_WS_WS_G = new RegExp(WS + WS + "+", "g"),
  REGEX_BLANK = /^\s*$/;
  
  
 function isBlankString(str)
 {
  return !PO.isString(str) || !REGEX_BLANK.test(string);
 }
 
 function titleize(str)
 {
  REGEX_WS_WS_G.lastIndex = 0;
  REGEX_NL_G.lastIndex = 0;
  return trim(str.replace(REGEX_WS_WS_G, " ").replace(REGEX_NL_G, ""));
 }
 
 function trim(str)
 {
  return str.replace(/(^\s+)|(\s+$)/g, "");
 }
  
 function lines(str)
 {
  REGEX_NL_G.lastIndex = 0;
  return str.split(REGEX_NL_G);
 }

 function words(str)
 {
  return str.split(/\s+/g).filter(isBlankString);
 }
 
 function hasSubstring(str, substr, caseSense)
 {
  if (!PO.isString(str) || !PO.isString(substr))
  {
   return false;
  }
  if (caseSense)
  {
   return str.indexOf(substr) >= 0;
  }
  return str.toLocaleLowerCase().indexOf(substr.toLocaleLowerCase()) >= 0;
 }

 function hasSubstringArray(arr, substr, caseSense)
 {
  return arr.some(function (str){
   return hasSubstring(str, substr, caseSense);
  });
 }

 return {
  hasSubstring : hasSubstring,
  hasSubstringArray : hasSubstringArray,
  trim : trim,
  lines : lines,
  titleize : titleize,
  words : words,
  isBlankString : isBlankString
 };
}());


