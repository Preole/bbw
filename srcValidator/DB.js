/* requires ./lib/str_.js */
/* requires ./lib/obj_.js */
/* requires ./lib/Digraph.js */
/* requires ./WikiNode.js */
/* requires ./Config.js */


var DB = (function ()
{
 var utc =
 {
  ms : 1,
  sec : 1000,
  min : 1000 * 60,
  hour : 1000 * 60 * 60,
  day : 1000 * 60 * 60 * 24,
  month : 1000 * 60 * 60 * 24 * 31,
  year : 1000 * 60 * 60 * 24 * 31 * 12,
  now : function() {return Date.now() || (new Date()).getTime();}
 },
 
 //Index cache
 TAGTITLE = null,
 TITLES = null,
 EDITED = null,
 CREATED = null,
 ORPHAN = null,
 BACKLINKS = null,
 MIME = null,
 
 //Global states
 HAS_EDITED = false,
 UUID = 0,
 DEF_NAME = "New Entry ";
 
 //Persistent models.
 GRAPH = Digraph({
  
 }),
 CONFIG = Config.DEFAULTS();

 


 function truncate(num, unit) {return (num - (num % unit));}
 function remainder(num, unit) {return (num % unit);}
 
 function nextName()
 {
  return DEF_NAME + (UUID += 1);
 }
 
 function newName()
 {
  var defTitle = nextName();
  while (GRAPH.hasNode(defTitle)) {defTitle = nextName();}
  return defTitle;
 }
 
 function buildTagTitle()
 {
  tagTitle = Digraph();
  var nodes = GRAPH.listNodes();
  
  for (var i = 0, ii = nodes.length; i < ii; i += 1)
  {
   var tags = nodes[i].tags;
   for (var j = 0, jj = tags.length; j < jj; j += 1)
   {
    tagTitle.addEdge(tags[j], nodes[i].title);
   }
  }
  return tagTitle.listDirectionByKeys(true);
 }

 function buildTitleList()
 {
  return GRAPH.listNodeKeys();
 }
 
 function buildBacklinks()
 {
  return GRAPH.listDirectionByKey();
 }

 function buildOrphanList()
 {
  return GRAPH.listOrphansByKey();
 }
 
 function buildMime()
 {
  var graph = Digraph();
  var nodes = GRAPH.listNodes();
  
  for (var i = 0, ii = nodes.length; i < ii; i += 1)
  {
   graph.addEdge(nodes[i].mime, nodes[i].title);
  }
  return graph.listDirectionByKeys(true);
 }

 /*
 [
  {
   key : "October 21st, 2011",
   vals : ["Title", "Title2"]...
  }
 ]
 */
 function buildCreated(edited)
 {
  var ms = 0;
  var outList = [];
  var propStr = edited ? "edited" : "created";
  var nodes = GRAPH.listNodes().sort(function (t1, t2){
   return (t2[propStr] - t1[propStr]);
  });
  
  for (var i = 0, ii = nodes.length; i < ii; i += 1)
  {
   var node = nodes[i];
   var msDay = truncate(node[propStr], utc.day);
   
   if (ms !== msDay)
   {
    ms = msDay;
    d.setTime(node[propStr]);
    outList.push({
     key : d.toLocaleDateString(),
     vals : [node.title]
    });
   }
   else
   {
    outList[outList.length - 1].vals.push(node.title);
   }
  }
  
  return outList;
 }

 //On (C), R, (U), (D) operations, invalidate indices.
 function nullifyCache(isEdit)
 {
  TAGTITLE = null;
  TITLES = null;
  EDITED = null;
  CREATED = null;
  ORPHAN = null;
  BACKLINKS = null;
  MIME = null;
  HAS_EDITED = HAS_EDITED || !isEdit;
 }


 return {
  WikiNode : WikiNode,
  config : function(cfgJSON)
  {
   HAS_EDITED = HAS_EDITED || cfgJSON;
   CONFIG.fromJSON(cfgJSON);
   return CONFIG;
  },
  newName : function()
  {
   return newName();
  },
  edit : function(wNode, targets, oldTitle)
  {
   if (!(wNode instanceof WikiNode)
   {
    throw new TypeError();
   }
   if (GRAPH.has(oldTitle) instanceof WikiNode)
   {
    wNode.created = GRAPH.get(oldTitle).created;
   }
   
   GRAPH.rmNode(wNode.title)
    .rmEdge(wNode.title)
    .addNode(wNode.title, wNode)
    .addEdge(wNode.title, targets);
    
   HAS_EDITED = true;
   nullifyCache();
  },
  rm : function(title)
  {
   GRAPH.rmNode(title).rmEdge(title);
   HAS_EDITED = true;
  },
  get : function(title)
  {
   if (GRAPH.hasNode(title)) {return GRAPH.getNode(title);}
   return WikiNode(title, "\"" + title + "\" does not exist.", "", "");
  },
  has : function(title)
  {
   return GRAPH.hasNode(title);
  },
  getOrphans : function()
  {
   ORPHAN = ORPHAN || buildOrphanList();
   return ORPHAN;
  },
  getTagMap : function()
  {
   TAGTITLE = TAGTITLE || buildTagTitle();
   return TAGTITLE;
  },
  getTitlesInTag : function(tagName)
  {
   TAGTITLE = TAGTITLE || buildTagTitle();
   for (var i = 0, ii = TAGTITLE.length; i < ii; i += 1)
   {
    if (TAGTITLE[i].key === tagName) {return TAGTITLE[i].vals;}
   }
   return [];
  },
  getRecent : function()
  {
   EDITED = EDITED || buildCreated(true);
   return EDITED;
  },
  getCreated : function()
  {
   CREATED = CREATED || buildCreated(false);
   return CREATED;
  },
  getTitles : function()
  {
   TITLES = TITLES || buildTitleList();
   return TITLES;
  },
  getBackLinks : function()
  {
   BACKLINKS = BACKLINKS || buildBacklinks();
   return BACKLINKS;
  },
  getMimeMap : function()
  {
   MIME = MIME || buildMime();
   return MIME;
  },
  getMimeList : function()
  {
   MIME = MIME || buildMime();
   return obj_.keys(MIME).sort();
  },
  search : function(wordList)
  {
   var caseSense = CONFIG.searchCase;
   var nodes = GRAPH.listNodes();
   var res = [];
   
   for (var i = 0, ii = nodes.length; i < ii; i += 1)
   {
    var node = nodes[i];
    if (node.search(wordList, caseSense))
    {
     res.push(node.title);
    }
   }
   nodes = null;
   return res.sort();
  },
  hasEdited : function()
  {
   return HAS_EDITED;
  },
  
  fromJSON : function(jsonStr)
  {
   GRAPH.fromJSON(jsonStr);
   CONFIG.fromJSON(jsonStr);
   HAS_EDITED = true;
  },
  toJSON : function()
  {
   return {
    GRAPH : GRAPH,
    CONFIG : CONFIG
   };
  }
 };
}());


