/* requires $plugins.js */
/* requires $T.js */


var $INDEXVIEW = (function ($dest, $text){
 
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
   return $T.linksDL(DB.indexBackLinks(), true);
  },
  Mime : function ()
  {
   return $T.linksDL(DB.indexMime());
  }
 });
 
 function post(evt, $frag)
 {
  $dest.empty();
  if ($frag instanceof jQuery) 
  {
   $frag.linkify();
   $dest.append($frag);
  }
 }
 
 function search(evt)
 {
  $dest.trigger(EVT.POST);
  
  var wordList = STR.words($text.val());
  if (wordList.length <= 0) {return;}
  
  var titles = DB.search(wordList),
   message = "Found " + titles.length + " match(es).";
  
  $dest.trigger(EVT.POST, [$T.linksDL(message, titles)];
 }
 
 function index(evt, indexType)
 {
  var $resFrag = $dest.data()[indexType]();
  var $resView = $T.dl("Indexing " + indexType, $resFrag);
  $dest.trigger(EVT.POST, [$resView]);
 }
 
 function empty(evt)
 {
  $dest.empty();
 }
 
 return $dest.on(EVT.POST, post)
  .on(EVT.SEARCH, search)
  .on(EVT.INDEX, index)
  .on(EVT.CLOSE, empty);
 
}($("#js-area-index"), $("#js-txt-search")));

