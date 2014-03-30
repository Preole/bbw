/* requires dataURI.js */
/*
A browser module performing client-side automatic data download:

- IE10+
- <a download="...">

Parameters:
 string dataStr: The text data to save.
 [string] mimeStr: Data mime type. Default: "text/html"
 [string] charsetStr: Data charset. Default: "utf-8"
 [string] fileName: Suggested file name. Default: "default"

returns: true if automatic download; false o/w
*/
var autosave = (function()
{
 var a = document.createElement("a"),
 data = "",
 mime = "",
 fName = "",
 charset = "",
 failsave = function() {return false;},
 msieDL = (!!navigator.msSaveBlob) ? function()
 {
  var blob = new Blob([data], {type: mime});
  window.navigator.msSaveBlob(blob, fName);
  return true;
 } : failsave,

 autoDL = (typeof a.download !== "undefined") ? function()
 {
  a.target = "_blank";
  a.download = fName;
  a.href = dataURI(data, mime, charset);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  a.href = "";
  return true;
 } : failsave;
 a.style.display = "none";
 
 
 
 return function(dataStr, mimeStr, charsetStr, fileName)
 {
  var res = false;
 
  data = dataStr;
  mime = mimeStr || "text/plain";
  fName = fileName || "default";
  charset = charsetStr || "utf-8";
  res = msieDL() || autoDL();
  data = "";
  mime = "";
  fName = "";
  charset = "";
  return res;
 };
}());