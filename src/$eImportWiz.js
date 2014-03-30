/* requires $eConsts.js */
/* requires $eContent.js */

var $IMPORTWIZ = (function (){
 var $wiz = $("#js-import-wiz"),
  $radios = $wiz.find("input[type='radio'][name='js-import-type']"),
  $fileEle = $wiz.find("#js-i-import"),
  $fileEleClone = $fileEle.clone(),
  $log = $wiz.find("textarea").first(),
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
    fName = file.name;
   
   if (fSize <= MSIZE)
   {
    fReader = new FileReader();
    fReader.onload = onLoad;
    fReader.onerror = onError;
    fReader.readAsText(files[i]);
   }
   else {$log.log(sizeErrMsg(fName, MSIZE, fSize));}
  }
  
  resetFileEle();
 }
 
 function onLoad(evt)
 {
  var text = evt.target.result,
   type = $radios.filter(":checked").val() || "text/plain";
   
  if (type === "application/json")
  {
   try
   {
    DB.init(text);
    $log.log("Successfully imported JSON dataset");
   }
   catch (err)
   {
    $log.log("Failed to import JSON dataset : " + err.toString());
   }
   return;
  }
  $log.log("Data entry import success.");
  
  var wNode = DB.WikiNode("", text, "", type);
  DB.edit(wNode, $.parseBBM(text, type).getEdges(), "");
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
 
 function resetFileEle()
 {
  $fileEle = $fileEleClone.clone().replaceAll($fileEle);;
  $fileEle.on(EV.CHANGE, importDelegate);
 }
 
 $wiz.on(EVT.CLOSE, FUNC.CLOSE);
 $wiz.on(EVT.LOAD, function (evt){
  $wiz.toggleClass("js-css-invis", false).focus();
  $log.unlog();
 });

 $fileEle.on(EV.CHANGE, importDelegate);

 

 
 return $wiz;
}());

