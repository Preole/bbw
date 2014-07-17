/* requires $plugins.js */
/* requires $TMPL.js */


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
   $oMap.add(title, $TMPL.edit(DB.getNode(title)));
  }
  else
  {
   $oMap.add(title, $TMPL.view(DB.getNode(title)));
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
 
 function commit(evt, title)
 {
  var $edit = $oMap.get(title);
  if (!$edit || !verifyCommit(title, $edit)) {return;}
  
  var wNode = DB.newNode(
   $edit.find(".js-i-title").val(),
   $edit.find(".js-i-src").val(),
   $edit.find(".js-i-mime").val() || DB.MIME.TEXT,
   _.keys($edit.data("tags"))
  );
  
  var $frag = $.parseBBM(wNode.src, wNode.mime);
  
  DB.editNode(wNode, $frag.getEdges(), title);
  $oMap.replace(wNode.title, $TMPL.view(wNode, $frag), title);
 }
 
 function cancel(evt, title)
 {
  $oMap.add(title, $TMPL.view(DB.getNode(title)));
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
  var title = $(this).parents(".js-form").first().data().title,
   op = evt.data;
  
  $baseEle.trigger(op, [title]);
 }
 
 function toggleTagEdit(evt, title, tag, forceSwitch)
 {
  var $edit = $oMap.get(title);
  if (STR.titleize(tag).length <= 0) {return;}
  if (!$edit) {return;}
  
  var tagTable = $edit.data().tags;
  if (!tagTable) {return;}
  
  function removeTag()
  {
   tagTable[tag].remove();
   delete tagTable[tag];
  }

  function addTag()
  {
   tagTable[tag] = $TMPL.buttonTag(tag).appendTo($edit.find(".js-d-tags"));
  }
  
  if (_.isBoolean(forceSwitch) && forceSwitch)
  {
   if (forceSwitch && !_.has(tagTable, tag)) {addTag();}
   else if (!forceSwitch && _.has(tagTable, tag)) {removeTag();}
  }
  else if (_.has(tagTable, tag)) {removeTag();}
  else {addTag();}
 }
 
 function dispatchTags(evt)
 {
  var $e = $(this),
   $form = $e.parents(".js-form").first(),
   title = $form.data().title,
   tagTable = $form.data().tags;

  if (!tagTable) {return;}

  var $tagField = $form.find(".js-i-tags-add"),
   tag = $tagField.val() || "";
   
  if ($e.hasClass("js-b-tag-item"))
  {
   tag = $e.find(".js-b-tag-text").text();
   toggleTagEdit.call(this, evt, title, tag, false);
  }
  else if ($e.hasClass("js-s-tags-lookup"))
  {
   $tagField.val($e.val());
  }
  else
  {
   $tagField.val("");
   toggleTagEdit.call(this, evt, title, tag);
  }
 }
 
 function dispatchTagsEnter(evt)
 {
  if (evt.which === 13) {dispatchTags.call(this, evt);}
 }
 

 //TODO: change the css class of the self-deleting button
 //In: $TMPL.js, css.css, $CONTENT.js, $plugins.js, main.html
 //TODO: Implement a tag toggle.
 return $baseEle.on(EVT.OPEN, open)
 .on(EVT.EDIT, edit)
 .on(EVT.CLOSE, close)
 .on(EVT.CLOSEO, closeO)
 .on(EVT.DELETE, remove)
 .on(EVT.COMMIT, commit)
 .on(EVT.CANCEL, cancel)
 .on(EVT.TOGGLETAG, toggleTagEdit)
 .on(EV.CLICK, ".js-ctrl > .js-b-tag-item", dispatchTags)
 .on(EV.CLICK, ".js-ctrl > .js-b-tags-add", dispatchTags)
 .on(EV.CHANGE, ".js-ctrl > .js-s-tags-lookup", dispatchTags)
 .on(EV.KEYDOWN, ".js-ctrl > .js-i-tags-add", dispatchTagsEnter)
 .on(EV.CLICK, ".js-ctrl > .js-b-close", EVT.CLOSE, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-close-o", EVT.CLOSEO, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-edit", EVT.EDIT, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-finish", EVT.COMMIT, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-cancel", EVT.CANCEL, dispatch)
 .on(EV.CLICK, ".js-ctrl > .js-b-delete", EVT.DELETE, dispatch)
 
}($("#js-area-content")));

