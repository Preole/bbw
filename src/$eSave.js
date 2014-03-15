/* requires ./saver/autosave.js */
/* requires $eConsts.js */
/* requires $eContent.js */
/* requires $eSearch.js */
/* requires $eExportWiz.js */



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
 
 function save(evt, text, mime, charset, fname)
 {
  if (autosave(text, mime, charset, fname)) {return;}
  $EXPORTWIZ.trigger(EVT.LOAD, [dataURI(text, mime, charset)]);
 }
 
 
 
 function saveJson(evt, jsonStr, fname)
 {
  save(evt, jsonStr, "application/json", "utf-8", fname);
 }
 
 
 function saveDoc(evt, fname)
 {
  var cList = [];
  var text = "";
  
  $detachList.each(function (){
   cList.push($(this).contents().detach());
  });
  
  text = uExportWhole();
  
  cList = cList.reverse();
  $detachList.each(function (){
   cList.pop().appendTo($(this));
  });
  
  save(evt, text, "text/html", "utf-8", fname);
 }
 
 
 $obj.on(EVT.SAVE, saveDoc);
 $obj.on(EVT.EXPORT, saveJson);
 
 return $obj;
}( $().add($INDEXVIEW).add($CONTENT) ));

