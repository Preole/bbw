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
