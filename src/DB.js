/* requires ./lib/str_.js */
/* requires ./lib/obj_.js */
/* requires ./lib/jquery.min.js */

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
 
 hasOwn = Object.prototype.hasOwnProperty,
 defCfg =
 {
  "title": "BareBonesWiki",
  "startup": [
   "BareBonesWiki"
  ],
  "cfmDel": false,
  "cfmNav": false,
  "searchCase": false
 },

 //Persistent models.
 NODES = null,
 EDGES = null,
 CONFIG = null,

 //Indices
 TAGTITLE = null,
 TITLES = null,
 EDITED = null,
 CREATED = null,
 ORPHAN = null,
 MIME = null,
 BACKLINKS = null,
 HAS_EDITED = false,
 d = new Date(),
 newName = (function (){
  var i = 0;
  
  function iterate()
  {
   return "New Entry " + (i += 1);
  }
  
  return function ()
  {
   var defTitle = iterate();
   while (NODES[defTitle])
   {
    defTitle = iterate();
   }
   return defTitle;
  };
 }());

 function truncate(num, unit) {return (num - (num % unit));}
 function remainder(num, unit) {return (num % unit);}

 //String x4
 function WikiNode(title, src, tags, mime)
 {
  var obj = {}, now = utc.now();
 
  obj.title = str_.titleize(title);
  obj.src = src;
  obj.tags = str_.lines(tags, 1, 1, 1);
  obj.mime = str_.titleize(mime.toLocaleLowerCase());
  obj.created = now;
  obj.edited = now;
 
  if (obj.title.length <= 0) 
  {
   obj.title = newName();
  }
  if (obj.tags.length <= 0) 
  {
   obj.tags = ["Uncategorized"];
  }
  if (obj.mime.length <= 0) 
  {
   obj.mime = "text/x-bbm";
  }
  return obj;
 }

 /*
 [
  {
   key : "Tag1",
   vals : ["t1", "t2"]...
  },
  {
   key : "Tag2",
   vals : ["t1", "t2"]...
  }
 ]
 */
 function buildTagTitle()
 {
  var tagTitleMap = {};
  for (var title in NODES)
  {
   for (var i = 0, ii = NODES[title].tags.length; i < ii; i += 1)
   {
    var tag = NODES[title].tags[i];
    if (!hasOwn.call(tagTitleMap, tag)) {tagTitleMap[tag] = [];}
    tagTitleMap[tag].push(title);
   }
  }

  var keyList = obj_.keys(tagTitleMap).sort();
  TAGTITLE = [];
  for (var j = 0, jj = keyList.length; j < jj; j += 1)
  {
   TAGTITLE.push({
    key : keyList[j],
    vals : tagTitleMap[keyList[j]].sort()
   });
  }
 }

 function buildTitleList()
 {
  TITLES = obj_.keys(NODES).sort();
 }

 function buildOrphanList()
 {
  var nodes = {};
  for (var title in NODES) {nodes[title] = 1;}
  for (var src in EDGES)
  {
   var dests = EDGES[src];
   for (var dest in dests) {delete nodes[dest];}
  }
  ORPHAN = obj_.keys(nodes).sort();
 }

 /*
 [
  {
   key : "SourceTitle",
   vals : ["t1", "t2"]...
  }
 ]
 */
 function buildBackLinks()
 {
  var back = {};
  for (var src in EDGES)
  {
   var dests = EDGES[src];
   for (var dest in dests)
   {
    if (!hasOwn.call(back, dest)) {back[dest] = [];}
    back[dest].push(src);
   }
  }
 
  BACKLINKS = [];
  var destList = obj_.keys(back).sort();
  for (var i = 0, ii = destList.length; i < ii; i += 1)
  {
   BACKLINKS.push({
    key : destList[i],
    vals : back[destList[i]].sort()
   });
  }
 }

 /*
 [
  {
   key : "text/plain",
   vals : ["t1", "t2"]...
  }
 ]
 */
 function buildMime()
 {
  var mimeMap = {};
  for (var title in NODES)
  {
   var mimeStr = NODES[title].mime || "text/plain";
   if (!hasOwn.call(mimeMap, title)) {mimeMap[mimeStr] = [];}
   mimeMap[mimeStr].push(title);
  }
  
  MIME = [];
  var mimeList = obj_.keys(mimeMap).sort();
  for (var i = 0, ii = mimeList.length; i < ii; i += 1)
  {
   MIME.push({
    key : mimeList[i],
    vals : mimeMap[mimeList[i]].sort()
   });
  }
 }

 /*
 [
  {
   key : "October 21st, 2011",
   vals : ["Title", "Title2"]...
  }
 ]

 If edited = true, sort by last-edited date; creation date O/W.
 */
 function buildCreated(edited)
 {
  var propStr = edited ? "edited" : "created",
   wNodes = [];

  for (var title in NODES) {wNodes.push(NODES[title]);}
  wNodes.sort(
   function(t1, t2) {return (t2[propStr] - t1[propStr]);}
  );
  
  var outList = [];
  var ms = 0;
  for (var i = 0, ii = wNodes.length; i < ii; i += 1)
  {
   var ms_day = truncate(wNodes[i][propStr], utc.day);
   var ms_day_r = remainder(wNodes[i][propStr], utc.day);
   if (ms !== ms_day)
   {
    ms = ms_day;
    d.setTime(ms_day + ms_day_r);
    outList.push({
     key : d.toLocaleDateString(),
     vals : [wNodes[i].title]
    });
   }
   else {outList[outList.length - 1].vals.push(wNodes[i].title);}
  }
  if (edited) {EDITED = outList;}
  else {CREATED = outList;}
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

 /*
 Establishes outgoing edges from one node onto a set of other nodes.

 Param:
  srcTitle (String) //The source node by title.
  destTitles ({String : 1}) //A set of destinations nodes by title.
 */
 function setEdge(srcTitle, destTitles)
 {
  if (!hasOwn.call(NODES, srcTitle)) {return;}
  
  var edgeSet = destTitles || {};
  delete EDGES[srcTitle];
  delete edgeSet[srcTitle];
  
  for (var key in edgeSet)
  {
   delete edgeSet[key];
   edgeSet[str_.titleize(key)] = 1;
  }

  if (!$.isEmptyObject(edgeSet))
  {
   EDGES[srcTitle] = edgeSet;
  }
 }

 function setNode(wNode)
 {
  NODES[wNode.title] = wNode;
 }

 function api_rm(title)
 {
  delete EDGES[title];
  delete NODES[title];
  nullifyCache();
 }
 
 function api_getNull(title)
 {
  return NODES[title] ||
  WikiNode(title, "\"" + title + "\" does not exist.", "", "");
 }
 
 
 return {
  WikiNode : WikiNode,
  toJSON : function()
  {
   var jsonObj =
   {
    NODES : NODES,
    EDGES : EDGES,
    CONFIG : CONFIG
   };
   return JSON.stringify(jsonObj, null, " ");
  },
  config : function(cfgJSON)
  {
   $.extend(CONFIG, cfgJSON);
   if (typeof CONFIG.title !== "string" || CONFIG.title.length <= 0)
   {
    CONFIG.title = "BareBonesWiki";
   }
   if (cfgJSON)
   {
    HAS_EDITED = true;
   }
   
   return CONFIG;
  },
  newName : function()
  {
   return newName();
  },
  edit : function(wNode, edgeSet, oldTitle)
  {
   if (NODES[oldTitle]) {wNode.created = NODES[oldTitle].created;}
   else {wNode.created = utc.now();}
   
   api_rm(oldTitle);
   setNode(wNode);
   setEdge(wNode.title, edgeSet);
  },
  rm : function(title)
  {
   api_rm(title);
  },
  get : function(title)
  {
   if (hasOwn.call(NODES, title)) {return NODES[title];}
  },
  getNull : function(title)
  {
   return api_getNull(title);
  },
  getOrphans : function()
  {
   if (!ORPHAN) {buildOrphanList();}
   return ORPHAN;
  },
  getTagMap : function()
  {
   if (!TAGTITLE) {buildTagTitle();}
   return TAGTITLE;
  },
  getTitlesInTag : function(tagName)
  {
   if (!TAGTITLE) {buildTagTitle();}
   for (var i = 0, ii = TAGTITLE.length; i < ii; i += 1)
   {
    if (TAGTITLE[i].key === tagName) {return TAGTITLE[i].vals;}
   }
   return [];
  },
  getRecent : function()
  {
   if (!EDITED) {buildCreated(true);}
   return EDITED;
  },
  getCreated : function()
  {
   if (!CREATED) {buildCreated(false);}
   return CREATED;
  },
  getTitles : function()
  {
   if (!TITLES) {buildTitleList();}
   return TITLES;
  },
  getBackLinks : function()
  {
   if (!BACKLINKS) {buildBackLinks();}
   return BACKLINKS;
  },
  getMimeMap : function()
  {
   if (!MIME) {buildMime();}
   return MIME;
  },
  getMimeList : function()
  {
   if (!MIME) {buildMime();}
   var mimeSet = {"text/x-bbm" : 1, "text/plain" : 1, "text/html" : 1};
   for (var i = 0, ii = MIME.length; i < ii; i += 1)
   {
    mimeSet[MIME[i].key] = 1;
   }
   return  obj_.keys(mimeSet).sort();
  },
  search : function(wordList)
  {
   var caseSense = CONFIG.searchCase, i = 0, ii = wordList.length, res = {};
   
   for (var title in NODES)
   {
    var node = NODES[title], repeat = {};
    for (i = 0; i < ii; i += 1)
    {
     var word = wordList[i];
     if (typeof word !== "string") {continue;}
     if (hasOwn.call(repeat, repeat[word])) {continue;}
     
     repeat[word] = 1;

     if (str_.hasSubstr(title, word, caseSense)) {continue;}
     if (str_.hasSubstrArray(node.tags, word, caseSense)) {continue;}
     if (str_.hasSubstr(node.src, word, caseSense)) {continue;}
     break;
    }
    if (i >= ii) {res[title] = 1;}
   }
   return obj_.keys(res).sort();
  },
  hasEdited : function()
  {
   return HAS_EDITED;
  },
  init : function(jsonStr)
  {
   var dStore = jsonStr;
   if (typeof dStore === "string") {dStore = JSON.parse(dStore);}
   
   NODES = $.extend(NODES, dStore.NODES);
   EDGES = $.extend(EDGES, dStore.EDGES);
   CONFIG = $.extend(CONFIG, defCfg, dStore.CONFIG);
   
   for (var title in NODES)
   {
    NODES[title].mime = NODES[title].mime || "text/x-bbm";
   }
   
   nullifyCache(true);
  }
 };
}());


