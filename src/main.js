/* requires ./lib/$requires.js */          //Libraries (Mandatory)
/* requires ./const.js */                   //Constants (Mandatory)
/* requires ./models/$requires.js */        
/* requires ./collections/$requires.js */
/* requires ./router/$requires.js */
/* requires ./views/$requires.js */

(function (){
 var $DS = $("#js-db");
 var $body = $(document.body);

 DB.fromJSON(STR.decodeHTMLBody($DS.html()));
 (function (){
  var cfg = DB.getConfig(),
   startEnum = $models.Config.startupTypes,
   startNum = cfg.startupCount || 5;
 
  function initStartup(titleStartup)
  {
   $views.tabView.newTab(titleStartup);
  }
  
  $views.tabView.newTab();
  if (cfg.startupType === startEnum.CHOOSE && cfg.startup.length > 0)
  {
   _.forEach(cfg.startup.reverse(), initStartup)
  }
  else if (cfg.startupType === startEnum.EDITED)
  {
   _.forEach(DB.indexEditedTitle().slice(0, startNum).reverse(), initStartup);
  }
  else if (cfg.startupType === startEnum.CREATED)
  {
   _.forEach(DB.indexCreatedTitle().slice(0, startNum).reverse(), initStartup);
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