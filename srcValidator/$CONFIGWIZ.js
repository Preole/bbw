/* requires $plugins.js */

var $CONFIGWIZ = (function ($cfg){
 var $pgTitle = $("#js-pg-title"),
  $docTitle = $cfg.find("#js-i-cfg-title"),
  $startup = $cfg.find("#js-i-cfg-startup"),
  $cfmDel = $cfg.find("#js-c-cfg-cfm-del"),
  $cfmNav = $cfg.find("#js-c-cfg-cfm-nav"),
  $searchCase = $cfg.find("#js-c-cfg-search-case");
 
 $cfg.on(EVT.CLOSE, function (evt){
  $cfg.toggleVis(false).get(0).reset();
 });
 
 $cfg.on(EVT.SAVE, function (evt){
  var newCfg = DB.config({
   title : $docTitle.val(),
   startup : $startup.val(),
   cfmDel : $cfmDel.checked(),
   cfmNav : $cfmNav.checked(),
   searchCase : $searchCase.checked()
  });
  
  document.title = newCfg.title;
  $pgTitle.text(newCfg.title);
  
  $cfg.trigger(EVT.CLOSE);
 });
 
 $cfg.on(EVT.LOAD, function (evt){
  var cfg = DB.config();
  
  $docTitle.val(cfg.title);
  $startup.val(cfg.startup.join("\n"));
  $cfmDel.checked(cfg.cfmDel);
  $cfmNav.checked(cfg.cfmNav);
  $searchCase.checked(cfg.searchCase);
  
  $cfg.toggleVis(true, true);
 });
 
 
 
 return $cfg;
}($("#js-cfg-wiz")));

