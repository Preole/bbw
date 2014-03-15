/* requires ./lib/jquery.min.js */
/* requires $eConsts.js */

var $CONFIGWIZ = (function (){
 var $pgTitle = $("#js-pg-title");
 var $cfg = $("#js-cfg-wiz");
 
 $cfg.on(EVT.CLOSE, FUNC.CLOSE);
 
 $cfg.on(EVT.SAVE, function (evt){
  var newCfg = DB.config({
   title : str_.titleize($cfg.find(".js-i-title").val()),
   startup : str_.lines($cfg.find(".js-i-startup").val(), 1, 1, 1),
   cfmDel : $cfg.find(".js-c-cfm-del").prop("checked"),
   cfmNav : $cfg.find(".js-c-cfm-nav").prop("checked"),
   searchCase : $cfg.find(".js-c-search-case").prop("checked")
  });
  
  $cfg.trigger(EVT.LOAD, [newCfg]);
  $cfg.trigger(EVT.CLOSE);
 });
 
 $cfg.on(EVT.LOAD, function (evt, cfgObj){
  var cfg = cfgObj || DB.config();
 
  document.title = cfg.title;
  $pgTitle.text(cfg.title);
  
  $cfg.find(".js-i-title").val(cfg.title);
  $cfg.find(".js-i-startup").val(cfg.startup.join("\n"));
  $cfg.find(".js-c-cfm-del").prop("checked", cfg.cfmDel);
  $cfg.find(".js-c-cfm-nav").prop("checked", cfg.cfmNav);
  $cfg.find(".js-c-search-case").prop("checked", cfg.searchCase);
  $cfg.toggleClass("js-css-invis", false).focus();
 });
 
 
 
 return $cfg;
}());

