/* requires ../lib/autoSave.js */
/* requires mainView.js */

$views.exportView = (function (){
 
 var $view = $("#js-export-view"),
  $saveLink = $("#js-export-link-save", $view),
  $closeBtn = $("#js-export-close", $view);
 
 function uOuterHTML($ele)
 {
  return $("<div></div>").append($ele.clone()).html();
 }
 
 function uExportWhole()
 {
  return "<!DOCTYPE HTML>\n" + uOuterHTML($(document.documentElement));
 }
 
 function close()
 {
  $saveLink.attr("href", "#");
  $view.toggleInvis(true);
 }

 function load(uri)
 {
  $saveLink.attr("href", uri);
  $view.toggleInvis(false).focus();
 }
 
 function save(text, mime, fname)
 {
  if (autoSave.save(text, mime, fname)) {return;}
  load(dataURI.encode(text, mime));
 }
 
 function saveJSON(jsonStr, fname)
 {
  save(jsonStr, MIME.JSON, fname);
 }
 
 function saveDoc(fname)
 {
  $views.mainView.detach();
  save(uExportWhole(), MIME.HTML, fname);
  $views.mainView.attach();
 }
 
 $closeBtn.on(EV.CLICK, close);
 close();
 
 return {
  close : close,
  saveDoc : saveDoc,
  saveJSON : saveJSON
 };
 
}($("#js-export-wiz")));


