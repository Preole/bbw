/* requires $CONTENT.js */
/* requires $INDEXVIEW.js */

var $POPUPWIZ = (function ($wiz){

 var $title = $wiz.find("#js-popup-title");
 var $content = $wiz.find("#js-popup-content");
 
 
 var MODE_ENUM =
 {
  TAGS : 0,
  INDEX : 1,
 };
 var MODE = MODE_ENUM.TAGS;

 /*
 The popup wizard is responsible for events generated under its subtree.
 For events happening outside its jurisdiction, the popup window gets closed.
 */
 $wiz.on(EV.CLICK, function(evt){
  evt.stopPropagation();
  if ($(evt.target).hasClass(CLS.B_CLOSE))
  {
   $wiz.trigger(EVT.CLOSE);
  }
 });
 
 $wiz.on(EV.CLICK, CSS.WLINK, function (evt){
  evt.preventDefault();
  if (MODE_ENUM.TAGS === MODE)
  {
   $CONTENT.trigger(EVT.OPEN, [$(evt.target).data().title]);
  }
  else if (MODE_ENUM.INDEX === MODE)
  {
   $INDEXVIEW.trigger(EVT.INDEX, [$(evt.target).data().title]);
  }
 });
 
 $wiz.on(EVT.LOAD, function (evt){
  $title.empty();
  $content.empty();
  $wiz.toggleInvis(false);
  evt.stopPropagation();
 });
 
 $wiz.on(EVT.CLOSE, function (evt){
  $title.empty();
  $content.empty();
  $wiz.toggleInvis(true);
 });
 
 $wiz.on(EVT.INDEX, function (evt){
  var indices = _.keys($INDEXVIEW.data());
  var $links = $TMPL.linksPara(indices);
 
  $wiz.trigger(EVT.LOAD);
  $title.text("Choose an index type...");
  $content.append($links);
  
  MODE = MODE_ENUM.INDEX;
 });
 
 $wiz.on(EVT.TAG, function (evt, tagName){
  $wiz.trigger(EVT.LOAD);
  $title.text(tagName);
  $content.append($TMPL.linksPara(DB.indexTagSingle(tagName)));
  
  MODE = MODE_ENUM.TAGS;
 });
 
 
 
 return $wiz;
}($("#js-popup-wiz")));

