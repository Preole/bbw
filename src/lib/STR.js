/* requires lodash.min.js */


/**
 * String manipulation and checking library, which operates on Javascript's 
 * native String literals and classes. Contains a selection of static methods
 * that are needed by the BareBonesWiki project.
 *
 * White space character regular expression, including the ASCII white 
 * space `\u0020`
 *
 * ```
 * [
 *  \u2000-\u200d\t\u202f\u205f\u3000\u1680
 *  \u180e\u00a0\u00b7\u237d\u2420\u2422\u2423
 * ]
 * ```
 *
 * Line break regular expression (Also known as control characters)
 *
 * ```
 * [\v\f\r\n\u0085\u2028\u2029]
 * ```
 *
 * Sample invocation:
 *
 * STR.lines("Some\nStr\n").filter(STR.isBlank).map(STR.titleize);
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
  REGEX_QUOTE_G = /"[^"]+"|[^"]+/g;
  REGEX_QUOTE_HT = /^"[^"]+"$/;
  
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

 /**
  * Tokenizes the string by line, breaking it into an array of substrings.
  *
  * @method lines
  * @param str {string} The input string to transform.
  * @return {Array of string} 
  * The original string delimited by line break characters, where each
  * slot in the array denotes the content on a particular line. The array
  * is consecutive (not holey) and all characters except line breaks 
  * are preserved.
  */
 function lines(str)
 {
  REGEX_NL_G.lastIndex = 0;
  return str.split(REGEX_NL_G);
 }

 /**
  * Tokenizes the string by words, treating it as a single long line of 
  * characters, then split it up into an array;
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
  return _.flatten(str.match(REGEX_QUOTE_G)
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

 return {
  hasSubstring : hasSubstring,
  hasSubstringArray : hasSubstringArray,
  trim : trim,
  lines : lines,
  titleize : titleize,
  words : words,
  isBlank : isBlank,
  isNotBlank : isNotBlank
 };
}());


