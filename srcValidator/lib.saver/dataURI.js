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