/* requires ./lib/lodash.min.js */
/* requires ./lib/STR.js */
/* requires ./lib/LooseEdge.js */



var DB = (function ()
{
 //List of recognized charsets.
 var CHARSET_ENUM =
 {
  UTF8 : "UTF-8"
 };
 
 //List of recognized mime types.
 var MIME_ENUM =
 {
  TEXT : "text/plain",
  HTML : "text/html",
  WIKI : "text/x-bbm",
  JSON : "application/json"
 };

 //Configuration Object factory
 var Config = (function (){
  function create(title, startup, cfmDel, cfmNav, searchCase)
  {
   var obj =
   {
    title : _.isString(title) ? STR.titleize(title) : "BareBonesWiki",
    startup : startup ? uniqueLines(startup) : [],
    cfmDel : !!cfmDel,
    cfmNav : !!cfmNav,
    searchCase : !!searchCase
   };
   return obj;
  }

  function createFromObject(cfgObj)
  {
   var obj = _.isObject(cfgObj) ? cfgObj : {};
   return create(
    obj.title,
    obj.startup,
    obj.cfmDel,
    obj.cfmNav,
    obj.searchCase
   );
  }
  
  function createRoute()
  {
   var args = arguments;
   if (_.isObject(args[0]) && args.length === 1)
   {
    return createFromObject.call(this, args[0]);
   }
   return create.apply(this, args);
  }
  
  return {create : createRoute};
 }());

 //WikiNode Object factory.
 var WikiNode = (function (){
  function defaultTags(tagStr)
  {
   var tags = uniqueLines(tagStr);
   if (tags.length < 1)
   {
    tags.push("Uncategorized");
   }
   return tags;
  }
  
  function defaultMime(mimeStr)
  {
   return _.contains(_.values(MIME_ENUM), mimeStr) ? mimeStr : MIME_ENUM.WIKI;
  }

  function create(title, src, mime, tags, created, edited)
  {
   var obj =
   {
    title : STR.titleize(title),
    src : _.isString(src) ? src : "",
    mime : defaultMime(mime),
    tags : defaultTags(tags),
    created : parseInt(created, 10) || Date.now(),
    edited : parseInt(edited, 10) || Date.now() + 1000
   };
   
   if (obj.title.length <= 0)
   {
    throw new RangeError("A WikiNode cannot have an empty title.");
   }
   
   return obj;
  }

  function createFromObject(wNodeObj)
  {
   var obj = _.isObject(wNodeObj) ? wNodeObj : {};
   return create(
    obj.title,
    obj.src,
    obj.mime,
    obj.tags,
    obj.created,
    obj.edited
   );
  }
  
  function createRoute()
  {
   var args = arguments;
   if (_.isObject(args[0]) && args.length === 1)
   {
    return createFromObject.call(this, args[0]);
   }
   return create.apply(this, args);
  }
  
  function validate(obj)
  {
   return _.isObject(obj)
    _.isString(obj.title) && STR.trim(obj.title).length > 0 &&
    _.isArray(obj.tags) && obj.tags.every(_.isString)
    _.isString(obj.src) &&
    _.isString(obj.mime) &&
    _.isNumber(obj.created) &&
    _.isNumber(obj.edited) &&
    obj.edited >= obj.created;
  }
  
  function doSearch(obj, word, caseSense)
  {
   return STR.hasSubstring(obj.title, word, caseSense) ||
    STR.hasSubstringArray(obj.tags, word, caseSense) ||
    STR.hasSubstring(obj.src, word, caseSense);
  }

  //Simple keyword conjunction search; Must contain all keywords.
  function search(obj, wordList, caseSense)
  {
   if (!validate(obj)) {return false;}
  
   var repeats = [];
   for (var i = 0, ii = wordList.length; i < ii; i += 1)
   {
    var word = wordList[i];
    if (!_.isString(word) || repeats.indexOf(word) !== -1) {continue;}
    repeats.push(word);
    if (!doSearch(obj, word, caseSense)) {return false;}
   }
   return true;
  }


  return {
   create : createRoute,
   search : search,
   validate : validate
  };
 }());


 
 //Index cache
 var TAGTITLE = null,
  TITLES = null,
  EDITED = null,
  CREATED = null,
  ORPHANS = null,
  BACKLINKS = null,
  MIME = null;
 
 //Global states
 var CHANGED = false,
  PREF = "New Entry ",
  DATE = new Date(),
  UUID = 0;
  
  
 //Persistent models.
 var NODES = {}, //Node set; Plain object
  EDGES = LooseEdge(), //Edge set; Special class
  CONFIG = Config.create(); //Config; Plain object

 
 
 //String array transformation.
 function uniqueLines(strArr)
 {
  var strArray = _.isString(strArr) ? STR.lines(strArr) :
   _.isArray(strArr) ? strArr.filter(_.isString) : [];
   
  return _.uniq(strArray.filter(STR.isNotBlank).map(STR.titleize));
 }
 
 function uniqueWords(strArr)
 {
  var strArray = _.isString(strArr) ? STR.words(strArr) :
   _.isArray(strArr) ? strArr.filter(_.isString) : [];
   
  return _.uniq(strArray);
 }
 
 function itSearchNode(acc, wNode, key, plainObj)
 {
  var wordList = this;
  console.log(CONFIG.searchCase);
  if (WikiNode.search(wNode, wordList, CONFIG.searchCase))
  {
   acc.push(wNode.title);
  }
  return acc;
 }
 
 function itIsValidNode(wNode, key, plainObj)
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
  return itGroupTitleByDate.call(null, acc, wNode, "created");
 }
 
 function itGroupTitleByEdited(acc, wNode)
 {
  return itGroupTitleByDate.call(null, acc, wNode, "edited");
 }

 //Iterators for nested indices assisted by LooseEdge.js
 function itGroupTitleByMime(acc, wNode)
 {
  return acc.addEdge(wNode.title, wNode.mime);
 }
 
 function itGroupTitleByTags(acc, wNode)
 {
  return acc.addEdge(wNode.title, wNode.tags);
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
  MIME = MIME || _.values(NODES)
   .reduce(itGroupTitleByMime, LooseEdge())
   .listByInbound();
   
  return MIME;
 }
 
 function indexTags()
 {
  TAGTITLE = TAGTITLE || _.values(NODES)
   .reduce(itGroupTitleByTags, LooseEdge())
   .listByInbound();
   
  return TAGTITLE;
 }
 
 function indexTagSingle(tagName)
 {
  TAGTITLE = indexTags();
  for (var i = 0, ii = TAGTITLE.length; i < ii; i += 1)
  {
   if (TAGTITLE[i].key === tagName) {return TAGTITLE[i].vals;}
  }
  return [];
 }

 function indexTitles()
 {
  TITLES = TITLES || _.keys(NODES).sort();
  return TITLES;
 }
 
 function indexCreated()
 {
  CREATED = CREATED || _.values(NODES)
   .sort(compareByCreated)
   .reduce(itGroupTitleByCreated, []);
   
  return CREATED;
 }
 
 function indexEdited()
 {
  EDITED = EDITED || _.values(NODES)
   .sort(compareByEdited)
   .reduce(itGroupTitleByEdited, []);
   
  return EDITED;
 }
 
 function indexEditedFlat()
 {
  return _.values(NODES).sort(compareByEdited);
 }
 
 function indexBacklinks()
 {
  BACKLINKS = BACKLINKS || EDGES.listByInbound();
  return BACKLINKS;
 }
 
 function indexOrphans()
 {
  ORPHANS = ORPHANS || _.difference(_.keys(NODES), EDGES.listIsNotSource());
  return ORPHANS;
 }
 
 function indexSearch(wordList)
 {
  return _.transform(NODES, itSearchNode, [], uniqueWords(wordList)).sort();
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
  return WikiNode.create(newName(), src, mime);
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
  
  removeNode(oldTitle);
  removeNode(wNode.title);
  addNode(wNode, targetList);
 }
 
 function addNode(wNode, targetList)
 {
  NODES[wNode.title] = wNode;
  EDGES.addEdge(wNode.title, targetList);
  nullifyCache();
 }
 
 function removeNode(title)
 {
  if (hasNode(title))
  {
   delete NODES[title];
   EDGES.rmEdge(title, EDGES.getEdgesOut(title));
  }
  nullifyCache();
 }
 
 function hasNode(title)
 {
  return (_.isString(title) || _.isNumber(title)) && _.has(NODES, title);
 }
 
 function getNode(title)
 {
  return hasNode(title) ? NODES[title] : WikiNode.create(title);
 }
 
 function setConfig(cfgObj)
 {
  CHANGED = true;
  return _.merge(CONFIG, Config.create(cfgObj))
 }
 
 function getConfig()
 {
  return CONFIG;
 }
 
 function hasChanged()
 {
  return CHANGED;
 }
 
 function fromJSON(input)
 {
  var jsonObj = _.isString(input) ? JSON.parse(input) :
   _.isObject(input) ? input : {};
   
  EDGES.addEdge(jsonObj.EDGES);
  _.merge(CONFIG, Config.create(jsonObj.CONFIG));
  _.merge(NODES, jsonObj.NODES);
  _.filter(NODES, itIsValidNode);
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
  ORPHANS = null;
  BACKLINKS = null;
  MIME = null;
  CHANGED = CHANGED || !isEdit;
 }


 return {
  //Supported Mime types
  MIME : MIME_ENUM,
  CHARSET : CHARSET_ENUM,
  
  //Inner factories and classes.
  Config : Config,
  WikiNode : WikiNode,
 
  //CRUD methods
  getConfig : getConfig,
  setConfig : setConfig,
  newName : newName,
  newNode : newNode,
  newNodeNoConflict : newNodeNoConflict,
  editNode : editNode,
  removeNode : removeNode,
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
  indexBacklinks : indexBacklinks,
  
  //Serialization & De-serialization methods
  fromJSON : fromJSON,
  toJSON : toJSON
 };
}());


