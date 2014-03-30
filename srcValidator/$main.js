/* requires $CONTENT.js */
/* requires $INDEXVIEW.js */
/* requires $SAVER.js */
/* requires $CONFIGWIZ.js */
/* requires $IMPORTWIZ.js */
/* requires $POPUPWIZ.js */


(function ($body){
 var $DS = $("#js-db");
 
 function initStartup(titleStartup)
 {
  $CONTENT.trigger(EVT.OPEN, titleStartup);
 }
 
 function initRecent(entryRecent, index)
 {
  if (DB.config().startup.length > 0 || index >= 5) {return true;}
  $CONTENT.trigger(EVT.OPEN, entryRecent.title);
 }
 
 function init()
 {
  DB.fromJSON($DS.text());
  DB.config().startup.some(initStartup);
  DB.indexEditedFlat().some(initRecent);
 }
 
 //If a click event manages to bubble up to here, close the popup.
 $body.on(EV.CLICK, function (evt){
  $POPUPWIZ.trigger(EVT.CLOSE);
 });
 
 //Handles wiki link click events in general
 $body.on(EV.CLICK, CSS.CONTENT_DELEGATE, function (evt){
  var $src = $(evt.target);
  if (!$src.hasClass(CLS.WLINK)) {return;}
  
  var $delegate = $(this);
  if ($delegate.hasClass(CLS.CONTENT))
  {
   $CONTENT.trigger(EVT.OPEN, [$src.data().title]);
  }
  else if ($delegate.hasClass(CLS.TAGS))
  {
   $POPUPWIZ.trigger(EVT.TAG, [$src.data().title]).under($src);
  }
  evt.preventDefault();
 });
 
 //Handles close and save buttons on modal window.
 $body.on(EV.CLICK, CLS_CSS.MODAL, function (evt){
  var $src = $(evt.target);
  if ($src.hasClass(CLS.B_CLOSE))
  {
   $(this).trigger(EVT.CLOSE);
  }
  else if ($src.hasClass(CLS.B_SAVE))
  {
   $(this).trigger(EVT.SAVE);
  }
 });
 
 $("#js-txt-search").on(EV.KEYDOWN, function (evt){
  if (evt.which === 13) {$INDEXVIEW.trigger(EVT.SEARCH);}
 });
 
 $("#js-b-search").on(EV.CLICK, function (evt){
  $INDEXVIEW.trigger(EVT.SEARCH);
 });
 
 $("#js-b-new").on(EV.CLICK, function (evt){
  $CONTENT.trigger(EVT.EDIT, [DB.newName()]);
 });
 
 $("#js-b-top").on(EV.CLICK, function (evt){
  window.scrollTo(0, 0);
 });
 
 $("#js-b-index").on(EV.CLICK, function (evt){
  $POPUPWIZ.trigger(EVT.INDEX).under($(evt.target));
 });
 
 $("#js-b-cfg").on(EV.CLICK, function (evt){
  $CONFIGWIZ.trigger(EVT.LOAD);
 });
 
 $("#js-b-save").on(EV.CLICK, function (evt){
  $DS.text(JSON.stringify(DB, null, " "));
  $SAVER.trigger(EVT.SAVE, [document.title + ".html"]);
 });
 
 $("#js-b-export").on(EV.CLICK, function (evt){
  var jsonStr = JSON.stringify(DB, null, " ");
  $DS.text(jsonStr);
  $SAVER.trigger(EVT.EXPORT, [jsonStr, document.title + ".json"]);
 });
 
 $("#js-b-import").on(EV.CLICK, function (evt){
  $IMPORTWIZ.trigger(EVT.LOAD);
 });
 
 $(window).on("beforeunload", function (evt){
  if (DB.config().cfmNav && DB.hasChanged())
  {
   return "You will lose unsaved changes; Navigate away anyway?";
  }
 });
 
 $(window).on("error", function (evt){
  //TODO: Global error handling; Build an exclusive global log widget?
 });
 
}($(document.body)));

