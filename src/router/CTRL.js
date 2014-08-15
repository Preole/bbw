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
  var res = _.has(indexFuncMap, indexType) ?
   indexFuncMap[indexType]() : 
   TMPL.viewTmp("Index " + indexType + " is not available.");
  
  return {
   callback : indexByType,
   params : _.toArray(arguments),
   result : res
  };
 }

 function indexSingleTag(tagName)
 {
  return {
   callback : indexSingleTag,
   params : _.toArray(arguments),
   result : TMPL.indexFlat("Tagged under " + tagName, DB.indexSearch(tagName))
  };
 }
 
 function indexSearch(keywords, caseSense)
 {
  var resList = DB.indexSearch(STR.words(keywords), caseSense);
  var displayTxt = "Found "
   + resList.length
   + " results related to "
   + "\"" + keywords + "\"";
  
  return {
   callback : indexSearch,
   params : _.toArray(arguments),
   result : TMPL.indexFlat(displayTxt, resList)
  };
 }
 
 function viewHome()
 {
  return {
   callback : viewHome,
   params : [],
   result : TMPL.home()
  };
 }
 
 function viewOr404(title, preCompiledFrag)
 {
  return DB.hasNode(title) ? 
   TMPL.view(DB.getNode(title), preCompiledFrag) :
   TMPL.viewTmp("404: \"" + title + "\" does not exist.", null, title);
 }
 
 function viewEntry(title, preCompiledFrag)
 {
  return {
   callback : viewEntry,
   params : [title],
   result : viewOr404(title, preCompiledFrag)
  };
 }

 function editEntry(title, editAsNew)
 {
  var tagsList = DB.indexTagsList();
  var res = editAsNew ?
   TMPL.edit($models.WikiNode.create(title), tagsList) : 
   TMPL.edit(DB.getNode(title), tagsList);

  return {
   callback : editEntry,
   params : _.toArray(arguments),
   result : res
  }
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
  
  return {
   callback : viewEntry,
   params : [wNode.title],
   result : viewOr404(wNode.title, $frag)
  };
 }
 
 function editCancel(formObj)
 {
  return {
   callback : viewEntry,
   params : [formObj.oldTitle],
   result : viewOr404(formObj.oldTitle)
  };
 }
 
 function editDelete(formObj)
 {
  var oldT = formObj.oldTitle;
  if (DB.getConfig().cfmDel && !window.confirm("Delete \"" + oldT + "\"?"))
  {
   return;
  }
  DB.removeNode(oldT);

  return {
   callback : viewEntry,
   params : [oldT],
   result : TMPL.viewTmp("Deleted " + "\"" + oldT + "\"", null, oldT)
  };
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