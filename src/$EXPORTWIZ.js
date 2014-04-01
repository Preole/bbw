/* requires $plugins.js */

var $EXPORTWIZ = (function ($wiz){
 var $saveLink = $wiz.find("#js-save-link");
 
 $wiz.on(EVT.CLOSE, function (evt){
  $wiz.toggleInvis(true),
  $saveLink.attr("href", "#");
 });
 
 $wiz.on(EVT.LOAD, function (evt, uri){
  $saveLink.attr("href", uri);
  $wiz.toggleInvis(false).focus();
 });
 
 return $wiz;
}($("#js-export-wiz")));


