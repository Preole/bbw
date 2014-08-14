
$views.errorView = (function (){
 var $baseEle = $("#js-err-view"),
  $log = $baseEle.find("#js-err-log"),
  $closeBtn = $baseEle.find("#js-err-close");
 
 function close()
 {
  $baseEle.toggleInvis(true);
  $log.log();
 }
 
 function load(errMsg)
 {
  $baseEle.toggleInvis(false).focus();
  $log.log().log(errMsg);
 }
 
 $closeBtn.on(EV.CLICK, close);
 
 return {
  close : close,
  load : load
 };
}());

