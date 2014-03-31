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
  
 function encodeDataURI(dataStr, mimeStr, base64Flag)
 {
  var res = null,
   mime = mimeStr ? ";" + mimeStr : ";text/plain",
   base64 = base64Flag ? ";base64" : "",
   func = base64Flag ? utfBase64 : encodeURIComponent;
   
  return "data:" + mime + charset + base64 + "," + func(dataStr);
 }
 
 return {encode : encodeDataURI};
}());