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