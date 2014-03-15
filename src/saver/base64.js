/*
https://github.com/davidchambers/Base64.js/blob/master/base64.js

By David Chambers, licensed under WTFPL.
Comments removed to preserve space.
*/

/*jshint boss:true*/
var base64 = (function()
{
 //http://tools.ietf.org/rfc/rfc4648.txt @ page 5
 var chars = 
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

 //[https://gist.github.com/999166] by [https://github.com/nignag]
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

 //[https://gist.github.com/1020396] by [https://github.com/atk]
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