
$views.configView = (function (){
 var $view = $("#js-cfg-view"),
  $pgTitle = $("#js-pg-title"),
  $docTitle = $view.find("#js-cfg-title"),
  $startupType = $view.find("input[type='radio'][name='js-startup-type']"),
  $startupCount = $view.find("#js-cfg-startup-count"),
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
   $startupType.filterChecked().val(),
   $startupCount.val(),
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
 
 function changeType(evt)
 {
  var type = $(evt.target).val();
  var startType = $models.Config.startupTypes;
  if (type === startType.EDITED || type === startType.CREATED)
  {
   $startup.toggleInvis(true);
   $startupCount.parent().toggleInvis(false);
  }
  else if (type === startType.CHOOSE)
  {
   $startup.toggleInvis(false);
   $startupCount.parent().toggleInvis(true);
  }
  else
  {
   $startup.toggleInvis(true);
   $startupCount.parent().toggleInvis(true);
  }
 }

 function load(evt)
 {
  var cfg = DB.getConfig();
  var startType = cfg.startupType || $models.Config.startupType.HOME;
  
  $docTitle.val(cfg.title);
  $startup.val(cfg.startup.join("\n"));
  $startupCount.val(cfg.startupCount || 5);
  $cfmDel.checked(cfg.cfmDel);
  $cfmNav.checked(cfg.cfmNav);
  
  $startupType.filter("[value='" + startType + "']")
   .prop("checked", true)
   .trigger(EV.CHANGE);
  
  $view.toggleInvis(false).focus();
 }
 
 function close(evt)
 {
  $view.toggleInvis(true).get(0).reset();
 }
 
 $saveBtn.on(EV.CLICK, save);
 $cancelBtn.on(EV.CLICK, close);
 $startupType.change(EV.CHANGE, changeType);
 close();
 
 return {
  update : update,
  load : load,
  close : close
 };
}());

