/* requires tabView.js */
/* requires configView.js */

$views.importView = (function (){
 var $baseEle = $("#js-import-view"),
  $importAs = $baseEle.find("input[type='radio'][name='js-import-type']"),
  $charset = $baseEle.find("#js-import-charset"),
  $fileEle = $baseEle.find("#js-import-file"),
  $closeBtn = $baseEle.find("#js-import-close"),
  $log = $baseEle.find("#js-import-log"),
  MSIZE = Math.pow(2, 20) * 10;
  
 function importDelegate(evt)
 {
  if (!(File && FileReader))
  {
   $log.log("Error: File reading not supported in this web browser.");
   return;
  }
  
  var charset = $charset.val() || CHARSET.UTF8;
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
    fReader.fileName = file.name;
    fReader.readAsText(file, charset);
   }
   else {$log.log(sizeErrMsg(file.name, MSIZE, fSize));}
  }
 }
 
 function onLoad(evt)
 {
  var text = evt.target.result,
   fName = evt.target.fileName || DB.newName(),
   type = $importAs.filterChecked().val() || MIME.TEXT;
   
  if (type === MIME.JSON)
  {
   try
   {
    DB.fromJSON(text);
    $views.configView.update(DB.getConfig());
    $log.log("Successfully imported JSON dataset");
   }
   catch (err)
   {
    $log.log("Failed to import JSON dataset : " + err.toString());
   }
   return;
  }

  
  var wNode = DB.newNodeNoConflict(fName, text, type);
  var $frag = $.parseBBM(text, type);
  
  $log.log("Imported " + fName + " successfully.")
   .log(fName + " is imported under " + wNode.title);
  
  DB.editNode(wNode, $frag.getEdges());
  $views.tabView.newTab(wNode.title, $frag);
 }
 
 function onError(evt)
 {
  $log.log(evt.target.error);
 }
 
 function sizeErrMsg(fName, max, real)
 {
  return fName + " is too large. (" + maxSize + " >= max " + real + " bytes)";
 }
 
 function load()
 {
  $log.log();
  $baseEle.toggleInvis(false).focus();
 }
 
 function close()
 {
  $log.log();
  $baseEle.toggleInvis(true);
 }
 
 $closeBtn.on(EV.CLICK, close);
 $fileEle.on(EV.CHANGE, importDelegate);
 close();

 return {
  load : load,
  close : close
 };
}());

