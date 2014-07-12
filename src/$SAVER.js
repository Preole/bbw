/* requires ./lib.saver/autoSave.js */
/* requires $EXPORTWIZ.js */


var $SAVER = (function ($contentArea){
 var $obj = $({});

 function uOuterHTML($ele)
 {
  return $("<div></div>").append($ele.clone()).html();
 }
 
 function uExportWhole()
 {
  return "<!DOCTYPE HTML>\n" + uOuterHTML($(document.documentElement));
 }
 
 function save(evt, text, mime, fname)
 {
  if (autoSave.save(text, mime, fname)) {return;}
  $EXPORTWIZ.trigger(EVT.LOAD, [dataURI.encode(text, mime)]);
 }
 
 function saveJson(evt, jsonStr, fname)
 {
  save(evt, jsonStr, DB.MIME.JSON, fname);
 }
 
 function saveDoc(evt, fname)
 {
  var $contents = $contentArea.contents().detach();
  save(evt, uExportWhole(), DB.MIME.HTML, fname);
  $contentArea.append($contents);
 }
 
 
 $obj.on(EVT.SAVE, saveDoc);
 $obj.on(EVT.EXPORT, saveJson);
 
 return $obj;
}($("#js-area-content")));

