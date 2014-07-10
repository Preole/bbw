/* requires $plugins.js */
/* requires $TMPL.js */


var $INDEXVIEW = (function ($dest, $text){
 
 var $ivTitle = $dest.find("#js-area-index-title");
 var $ivContent = $dest.find("#js-area-index-content");
 var $ivCloseBtn = $dest.find(".js-b-close").on(EV.CLICK, close);
 
 $dest.data({
  Title : function ()
  {
   return $TMPL.linksPara(DB.indexTitles());
  },
  Tags : function ()
  {
   return $TMPL.linksDL(DB.indexTags());
  },
  Created : function ()
  {
   return $TMPL.linksDL(DB.indexCreated());
  },
  Recent : function ()
  {
   return $TMPL.linksDL(DB.indexEdited());
  },
  Orphan : function ()
  {
   return $TMPL.linksPara(DB.indexOrphans());
  },
  Backlink : function ()
  {
   return $TMPL.linksDL(DB.indexBacklinks(), true);
  },
  Mime : function ()
  {
   return $TMPL.linksDL(DB.indexMime());
  }
 });

 function search(evt)
 {
  var wordList = STR.words($text.val());
  if (wordList.length <= 0) {return;}
  
  var titles = DB.indexSearch(wordList);
  
  $dest.toggleInvis(false);
  $ivTitle.empty().text("Found " + titles.length + " match(es).");
  $ivContent.empty().append($TMPL.linksPara(titles));
 }
 
 function index(evt, indexType)
 {
  $dest.toggleInvis(false);
  $ivTitle.empty().text("Indexing " + indexType);
  $ivContent.empty().append($dest.data()[indexType]());
 }
 
 function close(evt)
 {
  $ivTitle.empty();
  $ivContent.empty();
  $dest.toggleInvis(true);
 }
 
 return $dest.on(EVT.SEARCH, search).on(EVT.INDEX, index);
}($("#js-area-index"), $("#js-txt-search")));

