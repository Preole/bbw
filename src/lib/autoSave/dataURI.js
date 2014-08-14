/* requires base64.js */

/**
 * var uri = dataURI.encode("This is my textual data", "text/plain");
 */
var dataURI = (function()
{
 function utfBase64(str) {return base64.encode(encodeURIComponent(data));}
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

