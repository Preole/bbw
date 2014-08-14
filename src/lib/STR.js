/* requires lodash.min.js */


/**
 * String manipulation library used in BareBonesWiki.
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
  REGEX_QUOTE_HT = /^"[^"]+"$/;

 //Returns true for "", or strings containing spaces & line breaks only.
 function isBlank(str)
 {
  return REGEX_BLANK.test(str);
 }

 //Opposite of isBlank()
 function isNotBlank(str)
 {
  return !isBlank(str);
 }

 //Trim, strips line break, normalize word space into ASCII white space.
 function titleize(str)
 {
  REGEX_WS_WS_G.lastIndex = 0;
  REGEX_NL_G.lastIndex = 0;
  return trim(str.replace(REGEX_WS_WS_G, " ").replace(REGEX_NL_G, ""));
 }

 //Strips leading and trailing space.
 function trim(str)
 {
  return str.replace(/(^\s+)|(\s+$)/g, "");
 }
 
 //Strips leading and trailing double quotes.
 function trimQuotes(str)
 {
  return str.replace(/(^"+)|("+$)/g, "");
 }
 
 //String -> Array, separated by either spaces or surrounding double quotes.
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
 
 //Test if substr is contained in str.
 function hasSubstring(str, substr, caseSense)
 {
  if (caseSense)
  {
   return str.indexOf(substr) >= 0;
  }
  return str.toLocaleLowerCase().indexOf(substr.toLocaleLowerCase()) >= 0;
 }

 //Test if substr is a substring of any string inside the array.
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
  isBlank : isBlank,
  isNotBlank : isNotBlank,
  encodeHTMLBody : encodeHTMLBody,
  decodeHTMLBody : decodeHTMLBody
 };
}());


