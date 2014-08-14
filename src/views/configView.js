
$views.configView = (function (){
 var $view = $("#js-cfg-view"),
  $pgTitle = $("#js-pg-title"),
  $docTitle = $view.find("#js-cfg-title"),
  $startup = $view.find("#js-cfg-startup"),
  $cfmDel = $view.find("#js-cfg-cfm-del"),
  $cfmNav = $view.find("#js-cfg-cfm-nav"),
  $saveBtn = $view.find("#js-cfg-save"),
  $cancelBtn = $view.find("#js-cfg-cancel");
 
 function save()
 {
  var newCfg = DB.setConfig($models.Config.create(
   $docTitle.val(),
   $startup.val(),
   $cfmDel.checked(),
   $cfmNav.checked()
  ));

  update(newCfg);
  close();
 }
 
 function update(newCfg)
 {
  document.title = newCfg.title;
  $pgTitle.text(newCfg.title);
 }

 function load(evt)
 {
  var cfg = DB.getConfig();
  
  $docTitle.val(cfg.title);
  $startup.val(cfg.startup.join("\n"));
  $cfmDel.checked(cfg.cfmDel);
  $cfmNav.checked(cfg.cfmNav)
  
  $view.toggleInvis(false).focus();
 }
 
 function close(evt)
 {
  $view.toggleInvis(true).get(0).reset();
 }
 
 $saveBtn.on(EV.CLICK, save);
 $cancelBtn.on(EV.CLICK, close);
 close();
 
 return {
  update : update,
  load : load,
  close : close
 };
}());

