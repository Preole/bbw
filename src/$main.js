/* requires DB.js */
/* requires $t.js */
/* requires $eConsts.js */
/* requires $eContent.js */
/* requires $eSearch.js */
/* requires $eSave.js */
/* requires $eConfigWiz.js */
/* requires $eImportWiz.js */


(function ($body){
 var $DS = $("#js-db");
 
 function placeAfter($ele, $target)
 {
  var modal = $ele[0];
  var target = $target[0];
  var rect = target.getBoundingClientRect();
  
  $target.parent().append($ele.focus());
  modal.style.left = rect.left + "px";
  return $ele;
 }
 
 function indexPopup()
 {
  var $links = $t.linksPara(obj_.keys($INDEXVIEW.data()));
  var $p = $t.popup("Choose an index type...", $links);
  return $p.toggleClass("js-index", true);
 }

 function tagPopup(tagName)
 {
  var $links = $t.linksPara(DB.getTitlesInTag(tagName));
  var $p = $t.popup(tagName, $links);
  return $p.toggleClass("js-content", true);
 }
 
 function init()
 {
  $(".js-popup").remove();
  DB.init($DS.text());
  
  var startups = DB.config().startup, i, ii, j, jj;
  for (i = 0, ii = startups.length; i < ii && i < 20; i += 1)
  {
   $CONTENT.trigger(EVT.OPEN, startups[i]);
  }
  startups = null;
  if (i > 0) {return;}

  var editList = DB.getRecent();
  for (i = 0, ii = editList.length; i < ii && i < 5; i += 1)
  {
   var titles = editList[i].vals;
   for (j = 0, jj = titles.length; j < jj && i < 5; j += 1, i += 1)
   {
    $CONTENT.trigger(EVT.OPEN, [titles[j]]);
   }
  }
 }
 
 
 
 $body.on(EV.CLICK, function (evt){
  $(".js-popup").each(function (){
   var $popup = $(this);
   var clicksLeft = $popup.data().clicks -= 1;
   if (!clicksLeft || clicksLeft <= 0) {$popup.remove();}
  });
 });
 
 $body.on(EV.CLICK, ".js-wlink", function (evt){
  var $src = $(evt.target);
  var title = $src.data().title;
  var $parent = $src.parents(".js-content, .js-tags, .js-index").first();
  evt.preventDefault();
  
  if ($parent.hasClass("js-index"))
  {
   $INDEXVIEW.trigger(EVT.INDEX, [title]);
  }
  else if ($parent.hasClass("js-tags"))
  {
   placeAfter(tagPopup(title), $src);
  }
  else
  {
   $CONTENT.trigger(EVT.OPEN, [title]);
  }
 });

 $body.on(EV.CLICK, ".js-popup", function (evt){
  if ($(evt.target).hasClass("js-b-close")) {$(this).remove();}
  evt.stopPropagation();
 });
 
 $body.on(EV.CLICK, ".js-modal", function (evt){
  var $src = $(evt.target);
  if ($src.hasClass("js-b-close")) {$(this).trigger(EVT.CLOSE);}
  else if ($src.hasClass("js-b-save")) {$(this).trigger(EVT.SAVE);}
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
  placeAfter(indexPopup(), $(this));
 });
 
 $("#js-b-cfg").on(EV.CLICK, function (evt){
  $CONFIGWIZ.trigger(EVT.LOAD);
 });
 
 $("#js-b-save").on(EV.CLICK, function (evt){
  $DS.text(DB.toJSON());
  $SAVER.trigger(EVT.SAVE, [document.title + ".html"]);
 });
 
 $("#js-b-export").on(EV.CLICK, function (evt){
  var jsonStr = DB.toJSON();
  $DS.text(jsonStr);
  $SAVER.trigger(EVT.EXPORT, [jsonStr, document.title + ".json"]);
 });
 
 $("#js-b-import").on(EV.CLICK, function (evt){
  $IMPORTWIZ.trigger(EVT.LOAD);
 });
 
 init();
 
 $(window).on("beforeunload", function (evt){
  var cfmNav = DB.config().cfmNav;
  var hasEdited = DB.hasEdited();
  
  if (cfmNav && hasEdited)
  {
   return "You will lose unsaved changes; Navigate away anyway?";
  }
  
 });
 
}($(document.body)));

