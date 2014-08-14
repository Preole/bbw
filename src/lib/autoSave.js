/* requires ./autoSave/dataURI.js */

/**
 * Automatic client-side data download for:
 *
 * - IE 10+
 * - Opera 15+
 * - Firefox 20+
 * - Google Chrome 14+
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

 function handleDownload(dataStr, mimeStr, fileName)
 {
  if (useFunc) {useFunc.call(this, dataStr, mimeStr, fileName);}
  return !!(useFunc);
 }
 
 return {save : handleDownload};
}());