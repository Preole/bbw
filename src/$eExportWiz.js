/* requires $eConsts.js */


var $EXPORTWIZ = (function (){
 var $wiz = $("#js-export-wiz");
 var $saveLink = $wiz.find(".js-save-link");
 
 $wiz.on(EVT.CLOSE, FUNC.CLOSE);
 $wiz.on(EVT.LOAD, function (evt, uri){
  $wiz.find(".js-save-link").attr("href", uri);
  $wiz.toggleClass("js-css-invis", false).focus();
 });
 
 return $wiz;
}());


