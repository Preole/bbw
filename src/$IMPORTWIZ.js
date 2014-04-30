/* requires $plugins.js */
/* requires $CONTENT.js */
/* requires $CONFIGWIZ.js */

var $IMPORTWIZ = (function ($wiz){
 var $importAs = $wiz.find("input[type='radio'][name='js-import-type']"),
  $charset = $wiz.find("#js-s-import-charset");
  $fileEle = $wiz.find("#js-i-import"),
  $log = $wiz.find("#js-i-import-log"),
  MSIZE = Math.pow(2, 20) * 10;
  
 function importDelegate(evt)
 {
  if (!(File && FileReader))
  {
   $log.log("Error: File reading not supported.");
   return;
  }
  
  var charset = $charset.val() || DB.CHARSET.UTF8;
  var files = evt.target.files;
  for (var i = 0, ii = files.length; i < ii; i += 1)
  {
   var file = files[i];
   var fSize = file.size || file.fileSize;
    
   if (fSize < MSIZE)
   {
    var fReader = new FileReader();
    fReader.onload = onLoad;
    fReader.onerror = onError;
    fReader.readAsText(file, charset);
   }
   else {$log.log(sizeErrMsg(file.name, MSIZE, fSize));}
  }
 }
 
 function onLoad(evt)
 {
  var text = evt.target.result;
  var type = $importAs.filterChecked().val() || DB.MIME.TEXT;
  if (type === DB.MIME.JSON)
  {
   try
   {
    DB.fromJSON(text);
    $CONFIGWIZ.trigger(EVT.UPDATE, [DB.getConfig()]);
    $log.log("Successfully imported JSON dataset");
   }
   catch (err)
   {
    $log.log("Failed to import JSON dataset : " + err.toString());
   }
   return;
  }
  
  $log.log("Data entry import success.");
  var wNode = DB.newNodeNoConflict(text, type);
  DB.editNode(wNode, $.parseBBM(text, type).getEdges());
  $CONTENT.trigger(EVT.OPEN, [wNode.title]);
 }
 
 function onError(evt)
 {
  $log.log(evt.target.error);
 }
 
 function sizeErrMsg(fName, max, real)
 {
  return fName + " is too large. (" + maxSize + " >= max " + real + " bytes)";
 }
 
 $wiz.on(EVT.LOAD, function (evt){
  $log.unlog();
  $wiz.toggleInvis(false).focus();
 });
 
 $wiz.on(EVT.CLOSE, function (evt){
  $log.unlog();
  $wiz.toggleInvis(true);
 });

 $fileEle.on(EV.CHANGE, importDelegate);

 
 return $wiz;
}($("#js-import-wiz")));

