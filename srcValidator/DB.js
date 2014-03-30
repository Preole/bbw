/* requires ./lib/PO.js */
/* requires ./lib/STR.js */
/* requires ./lib/LooseEdge.js */



var DB = (function ()
{
 //List of recognized charsets.
 var CHARSET_ENUM =
 {
  UTF8 : "UTF-8"
 };
 
 //Lsit of recognized mime types.
 var MIME_ENUM =
 {
  TEXT : "text/plain",
  HTML : "text/html",
  WIKI : "text/x-bbm",
  JSON : "application/json"
 };

 //Configuration Object prototype
 var Config = (function (){
  
  function Config(title, startup, cfmDel, cfmNav, searchCase)
  {
   if (!(this instanceof Config))
   {
    return new Config(title, startup, cfmDel, cfmNav, searchCase);
   }
   this.title = PO.isString(title) ? STR.titleize(title) : "BareBoneswiki";
   this.startup = uniqueLines(startup);
   this.cfmDel = !!cfmDel;
   this.cfmNav = !!cfmNav;
   this.searchCase = !!searchCase;
   return this;
  }
  
  Config.prototype = (function (){
   function compact(configObj)
   {
    return Config.call(this,
     configObj.title,
     configObj.startup,
     configObj.cfmDel,
     configObj.cfmNav,
     configObj.searchCase
    );
   }
   
   function fromJSON(objOrString)
   {
    var obj = PO.isString(objOrString) ? JSON.parse(objOrString) :
     PO.isObject(objOrString) ? objOrString : {};
     
    return compact.call(this, obj);
   }
   
   function toJSON()
   {
    return compact.call(this, this);
   }
  
   return {
    compact : compact,
    fromJSON : fromJSON,
    toJSON : toJSON
   };
  }());
  
  return Config;
 }());

 //WikiNode factory.
 var WikiNode = (function (){
  function defaultTags(tagStr)
  {
   var tags = uniqueLines(startupStr);
   if (tags.length < 1)
   {
    tags.push("Uncategorized");
   }
   return tags;
  }
  
  function defaultMime(mimeStr)
  {
   if (PO.isString(mimeStr))
   {
    for (var each in MIME_ENUM)
    {
     if (MIME_ENUM[each] === mimeStr) {return mimeEnum;}
    }
   }
   return MIME.TEXT;
  }
  
  function defaultSrc(srcStr)
  {
   return PO.isString(srcStr) ? srcStr : "";
  }

  function create(title, src, mime, tags, created, edited)
  {
   var obj =
   {
    title : STR.titleize(title),
    src : defaultSrc(src),
    mime : defaultMime(mime),
    tags : defaultTags(tags),
    created : parseInt(created, 10) || Date.now(),
    edited : parseInt(edited, 10) || Date.now() + 1000)
   };
   
   if (obj.title.length <= 0)
   {
    throw new RangeError("A WikiNode cannot have an empty title.");
   }
   
   return obj;
  }
   
  function doSearch(obj, wordList, caseSense)
  {
   return STR.hasSubstring(obj.title, word, caseSense) ||
    STR.hasSubstringArray(obj.tags, word, caseSense) ||
    STR.hasSubstring(obj.src, word, caseSense);
  }
  
  function search(obj, wordList, caseSense)
  {
   if (!validate(obj)) {return false;}
  
   var repeats = [];
   for (var i = 0, ii = wordList.length; i < ii; i += 1)
   {
    var word = wordList[i];
    if (!PO.isString(word)) {continue;}
    if (repeats.indexOf(word) !== -1) {continue;}
    
    repeats.push(word);
    if (!doSearch(obj, word, caseSense)) {return false;}
   }
   return true;
  }

  function validate(obj)
  {
   return PO.isObject(obj)
    PO.isString(obj.title) && STR.trim(obj.title).length > 0 &&
    PO.isArray(obj.tags) && obj.tags.every(PO.isString)
    PO.isString(obj.src) &&
    PO.isString(obj.mime) &&
    PO.isNum(obj.created) &&
    PO.isNum(obj.edited) &&
    obj.edited >= obj.created;
  }
  
  
  
  return {
   create : create,
   search : search,
   validate : validate,
   MIME : MIME_ENUM
  };
 }());


 
 //Index cache
 var TAGTITLE = null,
  TITLES = null,
  EDITED = null,
  CREATED = null,
  ORPHAN = null,
  BACKLINKS = null,
  MIME = null;
 
 //Global states
 var CHANGED = false,
  PREF = "New Entry ",
  DATE = new Date(),
  UUID = 0;
  
  
 //Persistent models.
 var NODES = new PO(),
  EDGES = new LooseEdge(),
  CONFIG = new Config();

 
 
 //String array transformation.
 function uniqueLines(strArr)
 {
  var strArray = PO.isString(strArr) ? STR.lines(strArr) :
   PO.isArray(strArr) ? strArr.filter(PO.isString) : [];
   
  return strArray.map(STR.titleize)
   .filter(STR.isBlankString)
   .filter(itFilterUnique);
 }
 
 function uniqueWords(strArr)
 {
  var strArray = PO.isString(strArr) ? STR.words(strArr) :
   PO.isArray(strArr) ? strArr.filter(PO.isString) : [];
   
  return strArray.filter(itFilterUnique);
 }
 
 //Iterators
 function itUniqueArray(value, index, array)
 {
  return array.indexOf(value) === index;
 }

 function itSearchNode(wNode)
 {
  var wordList = this;
  return WikiNode.search(wNode, wordList, CONFIG.caseSense);
 }

 function itValidNode(wNode, key, obj)
 {
  return WikiNode.validate(wNode) && wNode.title === key;
 }
 
 
 
 //Iterators for sortable, nested indices.
 function itGroupTitleByDate(acc, wNode, propStr)
 {
  DATE.setTime(wNode[propStr]);
  
  var last = acc[acc.length - 1],
   time = DATE.toLocaleDateString();
  
  if (last && last.key === time)
  {
   last.vals.push(wNode.title);
  }
  else
  {
   acc.push({key : time, vals : [wNode.title]});
  }
  return acc;
 }
 
 function itGroupTitleByCreated(acc, wNode)
 {
  return itGroupByDate.call(null, acc, wNode, "created");
 }
 
 function itGroupTitleByEdited(acc, wNode)
 {
  return itGroupByDate.call(null, acc, wNode, "edited");
 }

 //Iterators for nested indices assisted by LooseEdge.js
 function itGroupTitleByMime(acc, wNode)
 {
  return prevEdge.addEdge(wNode.mime, wNode.title);
 }
 
 function itGroupTitleByTags(prevEdge, wNode)
 {
  return prevEdge.addEdge(wNode.title, wNode.tags);
 }
 
 //Comparators
 function compareByEdited(t1, t2)
 {
  return t2.edited - t1.edited;
 }
 
 function compareByCreated(t1, t2)
 {
  return t2.created - t1.created;
 }


 //Indexing data structures for UI display.
 function indexMime()
 {
  MIME = MIME || NODES.values()
   .reduce(itGroupTitleByMime, new LooseEdge())
   .listInboundOutbound(true);
   
  return MIME;
 }
 
 function indexTags()
 {
  TAGTITLE = TAGTITLE || NODES.values()
   .reduce(itGroupTitleByTag, new LooseEdge())
   .listInboundOutbound();
   
  return TAGTITLE;
 }
 
 function indexTagSingle(tagName)
 {
  for (var i = 0, ii = indexTags().length; i < ii; i += 1)
  {
   if (TAGTITLE[i].key === tagName) {return TAGTITLE[i].vals;}
  }
  return [];
 }

 function indexTitles()
 {
  TITLES = TITLES || NODES.keys().sort();
  return TITLES;
 }
 
 function indexCreated()
 {
  CREATED = CREATED || NODES.values()
   .sort(compareByCreated)
   .reduce(itGroupTitleByCreated, []);
   
  return CREATED;
 }
 
 function indexEdited()
 {
  EDITED = EDITED || NODES.values()
   .sort(compareByEdited)
   .reduce(itGroupByEdited, []);
   
  return EDITED;
 }
 
 function indexEditedFlat()
 {
  return NODES.values().sort(compareByEdited);
 }
 
 function indexBacklinks()
 {
  BACKLINKS = BACKLINKS || EDGES.listInboundOutbound();
  return BACKLINKS;
 }
 
 function indexOrphans()
 {
  ORPHANS = ORPHANS || EDGES.listOrphans();
  return ORPHANS;
 }
 
 function indexSearch(wordList)
 {
  return NODES.values()
   .filter(itSearchNode, uniqueWords(wordList))
   .sort();
 }

 
 
 //CRUD and name generation
 function nextName()
 {
  return PREF + (UUID += 1);
 }
 
 function newName()
 {
  var defTitle = nextName();
  while (hasNode(defTitle))
  {
   defTitle = nextName();
  }
  return defTitle;
 }
 
 function newNodeNoConflict(src, mime)
 {
  return newNode(newName(), src, mime);
 }
 
 function newNode(title, src, mime, tags)
 {
  return WikiNode.create(title, src, mime, tags);
 }
 
 function editNode(wNode, targetList, oldTitle)
 {
  if (!WikiNode.validate(wNode))
  {
   throw new TypeError("Schema error in wiki node objects.");
  }
  if (hasNode(oldTitle))
  {
   wNode.created = getNode(oldTitle).created;
  }
  
  NODES.remove(oldTitle)
   .remove(wNode.title)
   .put(wNode.title);
   
  EDGES.rmEdge(oldTitle)
   .rmEdge(wNode.title)
   .addEdge(wNode.title, targetList);
  
  nullifyCache();
 }
 
 function rmNode(title)
 {
  NODES.remove(title);
  EDGES.remove(title);
  nullifyCache();
 }
 
 function hasNode(title)
 {
  return NODES.has(title);
 }
 
 function getNode(title)
 {
  if (hasNode(title))
  {
   return NODES.get(title);
  }
  
  return WikiNode.create(title);
 }


 
 function config(cfgObj)
 {
  var newConfig = Config.fromJSON(cfgObj);
  
  CHANGED = !!(CHANGED || cfgObj);
  CONFIG = PO.isObject(newConfig) ? newConfig : CONFIG;
  
  return CONFIG;
 }
 
 function hasChanged()
 {
  return CHANGED;
 }
 
 function fromJSON(input)
 {
  var jsonObj = PO.isString(input) ? JSON.parse(input) :
   PO.isObject(input) ? input : {};
  
  CONFIG.fromJSON(jsonObj.CONFIG);
  EDGES.fromJSON(jsonObj.EDGES);
  NODES.fromJSON(jsonObj.NODES).filter(itValidNode);
 }
 
 function toJSON()
 {
  return {
   NODES : NODES,
   EDGES : EDGES,
   CONFIG : CONFIG
  };
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
  CHANGED = CHANGED || !isEdit;
 }


 return {
  //Supported Mime types
  MIME : MIME_ENUM,
  CHARSET : CHARSET_ENUM,
 
  //CRUD methods
  config : config,
  newName : newName,
  newNode : newNode,
  newNodeNoConflict : newNodeNoConflict,
  editNode : editNode,
  rmNode : rmNode,
  getNode : getNode,
  hasNode : hasNode,
  hasChanged : hasChanged,
  
  //Indexing methods
  indexSearch : indexSearch,
  indexOrphans : indexOrphans,
  indexTags : indexTags,
  indexTagSingle : indexTagSingle,
  indexEdited : indexEdited,
  indexEditedFlat : indexEditedFlat,
  indexCreated : indexCreated,
  indexTitles : indexTitles,
  indexMime : indexMime,
  indexBacklinks : IndexBacklinks,
  
  //Serialization & De-serialization methods
  fromJSON : fromJSON,
  toJSON : toJSON
 };
}());


