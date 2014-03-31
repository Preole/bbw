/* requires ./lib.saver/autoSave.js */
/* requires $EXPORTWIZ.js */


var $SAVER = (function ($detachList){
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
  $EXPORTWIZ.trigger(EVT.LOAD, [dataURI(text, mime)]);
 }
 
 function saveJson(evt, jsonStr, fname)
 {
  save(evt, jsonStr, DB.MIME.JSON, fname);
 }
 
 function saveDoc(evt, fname)
 {
  var cList = [];
  
  $detachList.each(function (){
   cList.push($(this).contents().detach());
  });
  
  save(evt, uExportWhole(), DB.MIME.HTML, fname);
  
  cList = cList.reverse();
  $detachList.each(function (){
   cList.pop().appendTo($(this));
  });
 }
 
 
 $obj.on(EVT.SAVE, saveDoc);
 $obj.on(EVT.EXPORT, saveJson);
 
 return $obj;
}($("#js-area-index, #js-area-content")));

