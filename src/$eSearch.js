/* requires $plugins.js */
/* requires $eConsts.js */
/* requires DB.js */


var $INDEXVIEW = (function ($dest, $text){
 
 $dest.data({
  Title : function (){return $t.linksPara(DB.getTitles());},
  Tags : function (){return $t.linksDL(DB.getTagMap());},
  Created : function (){return $t.linksDL(DB.getCreated());},
  Recent : function (){return $t.linksDL(DB.getRecent());},
  Orphan : function (){return $t.linksPara(DB.getOrphans());},
  Backlink : function (){return $t.linksDL(DB.getBackLinks(), true);},
  Mime : function (){return $t.linksDL(DB.getMimeMap());}
 });
 
 function post(evt, $frag)
 {
  $dest.empty();
  if ($frag) 
  {
   $frag.linkify();
   $dest.append($frag);
  }
 }
 
 function search(evt)
 {
  $dest.trigger(EVT.POST);
  
  var query = str_.trim($text.val());
  if (query.length <= 0) {return;}
  
  var titles = DB.search(str_.words(query));
  var frag =
  [
   {
    key : "Found " + titles.length + " match(es).",
    vals : titles
   }
  ];
  
  $dest.trigger(EVT.POST, [$t.linksDL(frag)]);
 }
 
 function index(evt, indexType)
 {
  var $resFrag = $dest.data()[indexType]();
  var $resView = $t.dl("Indexing " + indexType, $resFrag);
  $dest.trigger(EVT.POST, [$resView]);
 }
 
 function empty(evt) {$dest.empty();}
 
 return $dest.on(EVT.POST, post)
 .on(EVT.SEARCH, search)
 .on(EVT.INDEX, index)
 .on(EVT.CLOSE, empty);
 
}($("#js-area-index"), $("#js-txt-search")));

