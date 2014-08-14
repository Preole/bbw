/* requires ./lib/$requires.js */          //Libraries (Mandatory)
/* requires ./const.js */                   //Constants (Mandatory)
/* requires ./models/$requires.js */        
/* requires ./collections/$requires.js */
/* requires ./router/$requires.js */
/* requires ./views/$requires.js */

(function (){
 var $DS = $("#js-db");
 var $body = $(document.body);

 (function (){
  function initStartup(titleStartup)
  {
   $views.tabView.newTab(titleStartup);
  }
  
  function initRecent(entryRecent, index)
  {
   $views.tabView.newTab(entryRecent.title);
  }
  
  DB.fromJSON(STR.decodeHTMLBody($DS.html()));
  
  $views.tabView.newTab();
  if (DB.getConfig().startup.length > 0)
  {
   _.forEach(DB.getConfig().startup.reverse(), initStartup);
  }
  else
  {
   _.forEach(DB.indexEditedFlat().slice(0, 5).reverse(), initRecent);
  }
 }());
 
 function exportClick()
 {
  var jsonStr = JSON.stringify(DB, null, " ");
  $views.exportView.saveJSON(jsonStr, STR.trim(document.title) + ".json");
 }

 function importClick()
 {
  $views.importView.load();
 }

 function saveClick()
 {
  $DS.text(STR.encodeHTMLBody(JSON.stringify(DB, null, " ")));
  $views.exportView.saveDoc(STR.trim(document.title) + ".html");
 }

 function configClick()
 {
  $views.configView.load();
 }
 
 function topClick()
 {
  window.scrollTo(0, 0);
 }
 
 function tabsClick()
 {
  $views.tabView.toggle();
 }
 
 function stopSubmit(evt)
 {
  return false;
 }

 function stopImplicitSubmit(evt)
 {
  if (evt.which === 13)
  {
   return false;
  }
 }
 
 $("#js-tabs-btn").on(EV.CLICK, tabsClick);
 $("#js-top-btn").on(EV.CLICK, topClick);
 $("#js-config-btn").on(EV.CLICK, configClick);
 $("#js-import-btn").on(EV.CLICK, importClick);
 $("#js-export-btn").on(EV.CLICK, exportClick);
 $("#js-save-btn").on(EV.CLICK, saveClick);
 $body.on(EV.CLICK, CSS.BTN, stopSubmit)
  .on(EV.KEYDOWN, CSS.TXTFIELD, stopImplicitSubmit)
  .on(EV.CLICK, CSS.WLINK, stopSubmit)
 
 $(window).on("beforeunload", function (evt){
  if (DB.getConfig().cfmNav && DB.hasChanged())
  {
   return "You will lose unsaved changes; Navigate away anyway?";
  }
 });
 
 window.onerror = function (msg, url, ln)
 {
  $views.errorView.load("Uncaught Exception on Line " + ln + ": " + msg);
  return false;
 };
 
}());