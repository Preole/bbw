/* requires $plugins.js */
/* requires $CONTENT.js */
/* requires $CONFIGWIZ.js */

var $IMPORTWIZ = (function ($wiz){
 var $importAs = $wiz.find("input[type='radio'][name='js-import-type']"),
  $charset = $wiz.find("#js-s-import-charset");
  $fileEle = $wiz.find("#js-i-import"),
  $fileEleClone = $fileEle.clone(),
  $log = $wiz.find("#js-i-import-log"),
  MSIZE = Math.pow(2, 20) * 10;
 
 function importDelegate(evt)
 {
  if (!(File && FileReader)) {return;}
  
  var files = this.files;
  for (var i = 0, ii = files.length; i < ii; i += 1)
  {
   var file = files[i],
    fReader = null,
    fSize = file.size || file.fileSize,
    fName = file.name,
    fCharset = $charset.val() || [];
   
   if (fSize <= MSIZE)
   {
    fReader = new FileReader();
    fReader.onload = onLoad;
    fReader.onerror = onError;
    fReader.readAsText(files[i], fCharset[0] || DB.CHARSET.UTF8);
   }
   else {$log.val(sizeErrMsg(fName, MSIZE, fSize));}
  }
  resetFileEle();
 }
 
 function onLoad(evt)
 {
  var text = evt.target.result,
   type = $importAs.filterChecked().val() || DB.MIME.TEXT;
   
  if (type === DB.MIME.JSON)
  {
   try
   {
    DB.fromJSON(text);
    $CONFIGWIZ.trigger(EVT.UPDATE, [DB.config()]);
    $log.val("Successfully imported JSON dataset");
   }
   catch (err)
   {
    $log.val("Failed to import JSON dataset : " + err.toString());
   }
   return;
  }
  $log.val("Data entry import success.");
  
  var wNode = DB.newNodeNoConflict(text, type);
  DB.editNode(wNode, $.parseBBM(text, type).getEdges());
  $CONTENT.trigger(EVT.OPEN, [wNode.title]);
 }
 
 function onError(evt)
 {
  $log.val(evt.target.error);
 }
 
 function sizeErrMsg(fName, max, real)
 {
  return fName + " is too large. (" + maxSize + " >= max " + real + " bytes)";
 }
 
 function loadClose(evt)
 {
  $wiz.toggleVis(evt.data, evt.data);
  $log.val();
 }
 
 function resetFileEle()
 {
  $fileEle = $fileEleClone.clone().replaceAll($fileEle);
  $fileEle.on(EV.CHANGE, importDelegate);
 }

 $wiz.on(EVT.CLOSE, null, false, loadClose);
 $wiz.on(EVT.LOAD, null, true, loadClose);

 $fileEle.on(EV.CHANGE, importDelegate);

 
 return $wiz;
}($("#js-import-wiz")));

