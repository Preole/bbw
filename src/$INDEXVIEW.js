/* requires $plugins.js */
/* requires $T.js */


var $INDEXVIEW = (function ($dest, $text){
 
 var $ivTitle = $dest.find("#js-area-index-title");
 var $ivContent = $dest.find("#js-area-index-content");
 var $ivCloseBtn = $dest.find(".js-b-close").on(EV.CLICK, close);
 
 $dest.data({
  Title : function ()
  {
   return $T.linksPara(DB.indexTitles());
  },
  Tags : function ()
  {
   return $T.linksDL(DB.indexTags());
  },
  Created : function ()
  {
   return $T.linksDL(DB.indexCreated());
  },
  Recent : function ()
  {
   return $T.linksDL(DB.indexEdited());
  },
  Orphan : function ()
  {
   return $T.linksPara(DB.indexOrphans());
  },
  Backlink : function ()
  {
   return $T.linksDL(DB.indexBacklinks(), true);
  },
  Mime : function ()
  {
   return $T.linksDL(DB.indexMime());
  }
 });

 function search(evt)
 {
  var wordList = STR.words($text.val());
  if (wordList.length <= 0) {return;}
  
  var titles = DB.indexSearch(wordList);
  
  $dest.toggleInvis(false);
  $ivTitle.empty().text("Found " + titles.length + " match(es).");
  $ivContent.empty().append($T.linksPara(titles));
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

