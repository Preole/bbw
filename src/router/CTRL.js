/* requires $plugins.js */
/* requires TMPL.js */

//Routes "HTTP" requests to HTML Fragments; Side effects to DB.
var CTRL = (function (){

 var indexFuncMap =
 {
  Title : function ()
  {
   return TMPL.indexFlat("Indexing by Titles", DB.indexTitles());
  },
  Tags : function ()
  {
   return TMPL.indexNest("Indexing by Tags", DB.indexTags());
  },
  Created : function ()
  {
   return TMPL.indexNest("Indexing by Date Created", DB.indexCreated());
  },
  Recent : function ()
  {
   return TMPL.indexNest("Indexing by Recently Modified", DB.indexEdited());
  },
  Orphans : function ()
  {
   return TMPL.indexFlat("Indexing by Orphans", DB.indexOrphans());
  },
  Backlink : function ()
  {
   return TMPL.indexNest("Indexing by Back Links", DB.indexBacklinks(), true);
  },
  Mime : function ()
  {
   return TMPL.indexNest("Indexing by Mime Type", DB.indexMime());
  }
 };


 function verifySave(newTitle, oldTitle)
 {
  if (newTitle.length <= 0) {return false;}
  if (newTitle !== oldTitle && DB.hasNode(newTitle))
  {
   return window.confirm("Overwrite \"" + newTitle + "\"?");
  }
  return true;
 }
 
 function indexByType(indexType)
 {
  if (_.has(indexFuncMap, indexType))
  {
   return indexFuncMap[indexType]();
  }
  return TMPL.viewTmp("Index " + indexType + " is not available.");
 }

 function indexSingleTag(tagName)
 {
  return TMPL.indexFlat("Tagged under " + tagName, DB.indexSearch(tagName));
 }
 
 function indexSearch(keywords, caseSense)
 {
  var resList = DB.indexSearch(STR.words(keywords), caseSense);
  var displayTxt = "Found "
   + resList.length
   + " results related to "
   + "\"" + keywords + "\"";
  
  return TMPL.indexFlat(displayTxt, resList);
 }
 
 function viewHome()
 {
  return TMPL.home();
 }
 
 function viewEntry(title, preCompiledFrag)
 {
  if (DB.hasNode(title))
  {
   return TMPL.view(DB.getNode(title), preCompiledFrag);
  }
  
  var tmpText = "404: \"" + title + "\" does not exist.";
  var $textFrag = TMPL.text("Click on the edit button to create it.");
  return TMPL.viewTmp(tmpText, $textFrag);
 }

 function editEntry(title, editAsNew)
 {
  if (editAsNew)
  {
   return TMPL.edit($models.WikiNode.create(title), DB.indexTagsList());
  }
  return TMPL.edit(DB.getNode(title), DB.indexTagsList());
 }
 
 function editFinish(formObj, doSaveAs)
 {
  if (!verifySave(formObj.title, formObj.oldTitle))
  {
   return;
  }
  
  var wNode = $models.WikiNode.create(
   formObj.title,
   formObj.src,
   formObj.mime,
   formObj.tags
  );
  var $frag = $.parseBBM(wNode.src, wNode.mime);

  if (doSaveAs)
  {
   DB.editNode(wNode, $frag.getEdges());
  }
  else
  {
   DB.editNode(wNode, $frag.getEdges(), formObj.oldTitle);
  }
  return viewEntry(wNode.title, $frag);
 }
 
 function editCancel(formObj)
 {
  return viewEntry(formObj.oldTitle);
 }
 
 function editDelete(formObj)
 {
  var cfmDel = DB.getConfig().cfmDel;
  if (cfmDel && !window.confirm("Delete \"" + formObj.oldTitle + "\"?"))
  {
   return;
  }
  DB.removeNode(formObj.oldTitle);

  var delText = "\"" + formObj.oldTitle + "\" no longer exists.";
  return TMPL.viewTmp("Deletion Successful.", TMPL.text(delText));
 }
 
 return {
  viewHome : viewHome,
  viewEntry : viewEntry,
  editEntry : editEntry,
  editFinish : editFinish,
  editCancel : editCancel,
  editDelete : editDelete,
  indexByType : indexByType,
  indexSingleTag : indexSingleTag,
  indexSearch : indexSearch
 };
}());