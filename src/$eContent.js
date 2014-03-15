/* requires ./lib/jquery.min.js */
/* requires DB.js */
/* requires $plugins.js */
/* requires $eConsts.js */
/* requires $t.js */


var $CONTENT = (function ($baseEle){

 var $oMap = (function (){
  var $rootEle = $baseEle;
  var $activeTitles = {};
 
  function get(key)
  {
   if (Object.prototype.hasOwnProperty.call($activeTitles, key))
   {
    return $activeTitles[key];
   }
  }

  function add(key, $e)
  {
   var $oldEle = get(key);
   if ($oldEle)
   {
    $e.replaceAll($oldEle);
    $activeTitles[key] = $e;
    $oldEle.remove();
   }
   else
   {
    $e.prependTo($rootEle);
    $activeTitles[key] = $e;
   }
   $e.focus();
   return $e;
  }

  function detach(key)
  {
   var $e = get(key);
   if ($e)
   {
    $e.detach();
    delete $activeTitles[key];
   }
   return $e;
  }

  function replace(key, $e, oldKey)
  {
   add(key, $e);
   if (key !== oldKey) {remove(oldKey);}
   $e.focus();
   return $e;
  }

  function remove(key)
  {
   var $e = get(key);
   if ($e) {$e.remove();}
   delete $activeTitles[key];
  }

  function clear()
  {
   $activeTitles = {};
   $rootEle.empty();
  }
  
  return {
   get : get,
   add : add,
   detach : detach,
   replace : replace,
   remove : remove,
   clear : clear
  };
 }());
 
 function open(evt, title, isEdit)
 {
  if ($oMap.get(title) && !isEdit)
  {
   return $oMap.get(title).focus();
  }
  if (isEdit)
  {
   $oMap.add(title, $t.edit(DB.getNull(title)));
  }
  else
  {
   $oMap.add(title, $t.view(DB.getNull(title)));
  }
 }
 
 function edit(evt, title)
 {
  open(evt, title, true);
 }
 
 function close(evt, title)
 {
  if (typeof title === "string") {$oMap.remove(title);}
  else {$oMap.clear();}
 }
 
 function closeO(evt, title)
 {
  var $form = $oMap.detach(title);
  $oMap.clear();
  $oMap.add(title, $form);
 }
 
 function commit(evt, title, $edit)
 {
  var nTitle = str_.titleize($edit.find(".js-i-title").val());
  if (nTitle === "") {return;}
  if (nTitle !== title && DB.get(nTitle))
  {
   if (!window.confirm("Overwrite \"" + nTitle + "\"?")) {return;}
   $oMap.remove(nTitle);
  }
  
  var wNode = DB.WikiNode(
   nTitle,
   $edit.find(".js-i-src").val(),
   $edit.find(".js-i-tags").val(),
   $edit.find(".js-i-mime").val()
  );
  
  var $frag = $.parseBBM(wNode.src, wNode.mime);
  DB.edit(wNode, $frag.getEdges(), title);
  $oMap.replace(nTitle, $t.view(wNode, $frag), title);
 }
 
 function cancel(evt, title)
 {
  $oMap.add(title, $t.view(DB.getNull(title)));
 }
 
 function remove(evt, title)
 {
  if (!DB.config().cfmDel || window.confirm("Delete \"" + title + "\"?"))
  {
   DB.rm(title);
   $oMap.remove(title);
  }
 }
 
 function dispatch(evt)
 {
  var $e = $(this),
   $form = $e.parents(".js-form").first(),
   title = $form.data().title,
   op = evt.data;
  
  if (op === EVT.COMMIT)
  {
   $baseEle.trigger(op, [title, $form]);
  }
  else
  {
   $baseEle.trigger(op, [title]);
  }
 }
 

 return $baseEle.on(EVT.OPEN, open)
 .on(EVT.EDIT, edit)
 .on(EVT.CLOSE, close)
 .on(EVT.CLOSEO, closeO)
 .on(EVT.DELETE, remove)
 .on(EVT.COMMIT, commit)
 .on(EVT.CANCEL, cancel)
 .on(EV.CLICK, ".js-ctrl > .js-b-close", EVT.CLOSE, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-close-o", EVT.CLOSEO, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-edit", EVT.EDIT, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-finish", EVT.COMMIT, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-cancel", EVT.CANCEL, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-delete", EVT.DELETE, dispatch)
 
}($("#js-area-content")));

