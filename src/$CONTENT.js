/* requires $plugins.js */
/* requires $T.js */


var $CONTENT = (function ($baseEle){

 var $oMap = (function (){
  var $rootEle = $baseEle;
  var $activeTitles = {};
 
  function get(key)
  {
   return _.has($activeTitles, key) ? $activeTitles[key] : void(0);
  }

  function add(key, $e)
  {
   var $oldEle = get(key);
   if ($oldEle)
   {
    $e.replaceAll($oldEle);
    $oldEle.remove();
   }
   else
   {
    $e.prependTo($rootEle);
   }
   $activeTitles[key] = $e;
   return $e.focus();
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
   return $e.focus();
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
   $oMap.add(title, $T.edit(DB.getNode(title)));
  }
  else
  {
   $oMap.add(title, $T.view(DB.getNode(title)));
  }
 }
 
 function edit(evt, title)
 {
  open(evt, title, true);
 }
 
 function close(evt, title)
 {
  if (_.isString(title)) {$oMap.remove(title);}
  else {$oMap.clear();}
 }
 
 function closeO(evt, title)
 {
  var $form = $oMap.detach(title);
  $oMap.clear();
  $oMap.add(title, $form);
 }
 
 function verifyCommit(oldTitle, $edit)
 {
  var nTitle = STR.titleize($edit.find(".js-i-title").val());
  if (nTitle.length <= 0) {return;}
  if (nTitle !== oldTitle && DB.hasNode(nTitle))
  {
   if (!window.confirm("Overwrite \"" + nTitle + "\"?")) {return;}
   $oMap.remove(nTitle);
  }
  return true;
 }
 
 function commit(evt, title, $edit)
 {
  if (!verifyCommit(title, $edit)) {return;}
  
  var wNode = DB.newNode(
   $edit.find(".js-i-title").val(),
   $edit.find(".js-i-src").val(),
   $edit.find(".js-i-mime").val() || DB.MIME.TEXT,
   $edit.find(".js-i-tags").val()
  );
  
  var $frag = $.parseBBM(wNode.src, wNode.mime);
  
  DB.editNode(wNode, $frag.getEdges(), title);
  $oMap.replace(wNode.title, $T.view(wNode, $frag), title);
 }
 
 function cancel(evt, title)
 {
  $oMap.add(title, $T.view(DB.getNode(title)));
 }
 
 function remove(evt, title)
 {
  if (DB.getConfig().cfmDel && !window.confirm("Delete \"" + title + "\"?"))
  {
   return;
  }
  DB.removeNode(title);
  $oMap.remove(title);
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

