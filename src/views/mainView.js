/* requires ../router/$plugins.js */
/* requires ../router/CTRL.js */

$views.mainView = (function (){

 var $refreshBtn = $("#js-refresh-btn"),
  $backBtn = $("#js-back-btn"),
  $nextBtn = $("#js-next-btn"),
  $homeBtn = $("#js-home-btn");
  
 var $baseEle = $("#js-main").empty(),
  $viewEle = null,
  $hostEle = null,
  hList = null;
 
 //"Form Action" : "Submit Name" : Function Pointer(form)
 var formActMap =
 {
  "index" :
  {
   "searchText" : submitSearch,
   "search" : submitSearch,
   "index" : submitIndex
  },
  "edit" :
  {
   "editTmp" : submitEditTmp,
   "edit" : submitEdit
  },
  "editFinish" :
  {
   "save" : submitEditFinish,
   "saveAs" : submitEditSaveAs,
   "cancel" : submitEditCancel,
   "delete" : submitEditDelete
  }
 };
 
 function doRefresh()
 {
  var hist = hList.getCurr();
  
  if ($viewEle instanceof jQuery && $viewEle !== hist.result)
  {
   $viewEle.detach();
  }

  if (hist.result instanceof jQuery)
  {
   $viewEle = hist.result.appendTo($baseEle);
   $hostEle.find(".js-btn-dbl-main").text($viewEle.findTitle());
  }
  else
  {
   $viewEle.appendTo($baseEle);
  }
  
  $backBtn.toggleDisabled(!hList.hasPrev());
  $nextBtn.toggleDisabled(!hList.hasNext());
 }

 /*
 Exposed controls
 */
 function focus()
 {
  $baseEle.focus();
 }
 
 function switchToTab(hostTab)
 {
  if (arguments.length > 0 && hostTab instanceof jQuery)
  {
   $hostEle = hostTab;
   hList = hostTab.data().hist;
   doRefresh();
  }
  else
  {
   return $hostEle;
  }
 }
 
 function refreshPage()
 {
  hList.refresh(true);
  doRefresh();
 }

 function nextPage()
 {
  hList.next();
  doRefresh();
 }

 function prevPage()
 {
  hList.prev();
  doRefresh();
 }

 function homePage()
 {
  hList.push({
   callback : CTRL.viewHome,
   params : []
  });
  doRefresh();
 }

 /*
 Link click handlers.
 */
 function wikiLinkClick(evt)
 {
  hList.push({
   callback : CTRL.viewEntry,
   params : [$(evt.target).data().title]
  });
  doRefresh();
 }
 
 function tagsLinkClick(evt)
 {
  hList.push({
   callback : CTRL.indexSingleTag,
   params : [$(evt.target).data().title]
  });
  doRefresh();
 }
 
 function submitIndex(formObj)
 {
  hList.push({
   callback : CTRL.indexByType,
   params : [formObj.indexType]
  });
 }

 function submitSearch(formObj)
 {
  var query = STR.titleize(formObj.searchText || "");
  if (STR.isNotBlank(query))
  {
   hList.push({
    callback : CTRL.indexSearch,
    params : [query, formObj.caseSense]
   });
  }
 }

 function submitEditTmp(formObj)
 {
  hList.push({
   callback : CTRL.editEntry,
   params : [formObj.title, true],
  });
 }
 
 function submitEdit(formObj)
 {
  hList.push({
   callback : CTRL.editEntry,
   params : [formObj.title],
  });
 }
 
 function submitEditFinish(formObj)
 {
  hList.push({
   callback : CTRL.editFinish,
   params : [formObj]
  });
 }

 function submitEditCancel(formObj)
 {
  hList.push({
   callback : CTRL.editCancel,
   params : [formObj]
  });
 }

 function submitEditSaveAs(formObj)
 {
  hList.push({
   callback : CTRL.editFinish,
   params : [formObj, true]
  });
 }

 function submitEditDelete(formObj)
 {
  hList.push({
   callback : CTRL.editDelete,
   params : [formObj]
  });
 }
 
 function submitRouter($form, actName, ctrlName)
 {
  var formActs = _.has(formActMap, actName) ? formActMap[actName] : {};
  var formAct = _.has(formActs, ctrlName) ? formActs[ctrlName] : void(0);

  if (_.isFunction(formAct))
  {
   formAct($form.serializeObject(), ctrlName);
   doRefresh();
  }
 }

 function handleWikiLinkClick(evt)
 {
  hList.push({
   callback : CTRL.viewEntry,
   params : [$(evt.target).data().title]
  });
  doRefresh();
  return false;
 }

 function handleTagLinkClick(evt)
 {
  hList.push({
   callback : CTRL.indexSingleTag,
   params : [$(evt.target).data().title]
  });
  doRefresh();
  return false;
 }
 
 function handleSubmitClick(evt)
 {
  var $src = $(this),
   name = STR.titleize($src.attr("name") || ""),
   $form = $src.closest("form");
  
  if (name.length > 0 && $form.length > 0)
  {
   submitRouter($form, ($form.attr("action") || ""), name);
  }
  evt.preventDefault();
 }
 
 function handleImplicitSubmit(evt)
 {
  if (evt.which === 13)
  {
   handleSubmitClick.call(this, evt);
  }
 }
 
 function handleTagWidget(evt)
 {
  var $deleg = $(this),
   $src = $(evt.target),
   $tagsView = $deleg.find(".js-tags-view"),
   $addTxt = $deleg.find(".js-tags-txt"),
   $addBtn = $deleg.find(".js-tags-add-btn"),
   $select = $deleg.find(".js-tags-select");
   
  var isEnter = evt.type === EV.KEYDOWN && evt.which === 13,
   isClick = evt.type === EV.CLICK,
   isAddEnter = $src.is($addTxt) && isEnter,
   isAddClick = $src.is($addBtn) && isClick,
   isDelClick = $src.is(".js-tag-field") && (isEnter || isClick);
   
  if (isAddEnter || isAddClick)
  {
   var tagName = STR.titleize($addTxt.val());
   if (tagName.length > 0)
   {
    TMPL.tagField(tagName).appendTo($tagsView);
   }
   $addTxt.log();
   return false;
  }
  else if (isDelClick)
  {
   $deleg.focus();
   $src.remove();
  }
  else if ($src.is($select) && evt.type === EV.CHANGE)
  {
   $addTxt.val($select.val());
  }
 }

 $refreshBtn.on(EV.CLICK, refreshPage);
 $backBtn.on(EV.CLICK, prevPage);
 $nextBtn.on(EV.CLICK, nextPage);
 $homeBtn.on(EV.CLICK, homePage);
 
 $baseEle.on(EV.CLICK, CSS.BTN, handleSubmitClick)
  .on(EV.CLICK, CSS.DLG_WLINK, handleWikiLinkClick)
  .on(EV.CLICK, CSS.DLG_TLINK, handleTagLinkClick)
  .on(EV.KEYDOWN, CSS.TXTFIELD, handleImplicitSubmit)
  .on(EV.CHANGE, CSS.TAGWIDGET, handleTagWidget)
  .on(EV.CLICK, CSS.TAGWIDGET, handleTagWidget)
  .on(EV.KEYDOWN, CSS.TAGWIDGET, handleTagWidget);
 
 
 function detachContent()
 {
  $baseEle.contents().detach();
 }
 
 function attachContent()
 {
  doRefresh();
 }
 
 return {
  focus : focus,
  switchToTab : switchToTab,
  detach : detachContent,
  attach : attachContent
 };
}());

