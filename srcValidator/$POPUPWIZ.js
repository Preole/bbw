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



 function loadClose(evt)
 {
  $wiz.toggleVis(evt.data);
  $title.empty();
  $content.empty();
 }
 
 function handleTags(evt)
 {
  $CONTENT.trigger(EVT.OPEN, [$(evt.target).data().title]);
 }
 
 function handleIndex(evt)
 {
  $INDEXVIEW.trigger(EVT.INDEX, [$(evt.target).data().title]);
 }

 $wiz.on(EV.CLICK, function(evt){
  evt.stopPropagation();
  evt.preventDefault();
 });
 
 $wiz.on(EV.CLICK, CLS_CSS.WLINK, function (evt){
  if (MODE_ENUM.TAGS === MODE)
  {
   handleTags(evt);
  }
  else if (MODE_ENUM.INDEX === MODE)
  {
   handleIndex(evt);
  }
 });
 
 $wiz.on(EVT.CLOSE, null, true, loadClose);
 $wiz.on(EVT.LOAD, null, false, loadClose);
 
 $wiz.on(EVT.INDEX, function (evt){
  $wiz.trigger(EVT.LOAD);
  $title.text("Choose an index type...");
  $content.append($T.linksPara(PO.keys($INDEXVIEW.data())));
  
  MODE = MODE_ENUM.INDEX;
 });
 
 $wiz.on(EVT.TAG, function (evt, title){
  $wiz.trigger(EVT.LOAD);
  $title.text(title);
  $content.append($T.linksPara(DB.indexTagSingle(tagName)));
  
  MODE = MODE_ENUM.TAGS;
 });
 
 return $wiz;
}($("#js-popup-wiz")));

