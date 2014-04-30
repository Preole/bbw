/* requires $plugins.js */

var $ERRORWIZ = (function ($wiz){
 var $log = $wiz.find("#js-i-error-log");
 
 $wiz.on(EVT.LOAD, function (evt, errMsg){
  $log.unlog().log(errMsg);
  $wiz.toggleInvis(false).focus();
 });
 
 $wiz.on(EVT.CLOSE, function (evt){
  $log.unlog();
  $wiz.toggleInvis(true);
 });
 
 return $wiz;
}($("#js-err-wiz")));

