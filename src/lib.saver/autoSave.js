/* requires dataURI.js */

/**
 * A convenience browser module for performing automatic client-side
 * data download. Works for the following kinds of web browsers:
 *
 * - IE10 or later
 * - Supports the anchor download attribute `<a download="...">`
 *
 * Sample code:
 *
 * ```
 * autoSave.save("Arbitrary data", "text/plain", "myFile.txt");
 * ```
 * @module autoSave
 * @main autoSave
 * @requires dataURI
 */
var autoSave = (function()
{
 var a = document.createElement("a"),
  hasMSIE = (!!navigator.msSaveBlob),
  hasDownload = (typeof a.download !== "undefined"),
  useFunc = hasMSIE ? msieDownload : hasDownload ? autoDownload : void(0);
  
 a.style.display = "none";
 a.target = "_blank";
 
 function autoDownload(dataStr, mimeStr, fileName)
 {
  a.href = dataURI.encode(dataStr, mimeStr);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  a.download = "";
  a.href = "";
 }
 
 function msieDownload(dataStr, mimeStr, fileName)
 {
  var blob = new Blob([dataStr], {type: mimeStr});
  window.navigator.msSaveBlob(blob, fileName);
 }
 
 
 /**
  * @method save
  * @param dataStr {string} The text data to save.
  * @param [mimeStr] {string}
  * Data mime type, which affects the way the input data is interpreted.
  * Default: "text/plain" (.txt files)
  * @param [fileName] {string}
  * Suggested file name; This is a hint to the web browser for file naming.
  * The actual file name is not guaranteed to the same as the specified
  * name. Default: "default" 
  * @return {boolean}
  * true if the web browser has handled automatic data saving, (which will
  * trigger client-side prompts for saving) false otherwise.
  */
 function handleDownload(dataStr, mimeStr, fileName)
 {
  if (useFunc) {useFunc.call(this, dataStr, mimeStr, fileName);}
  return !!(useFunc);
 }
 
 return {save : handleDownload};
}());