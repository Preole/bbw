/* requires ../models/$requires.js */
/* requires ../lib/lodash.min.js */
/* requires ../lib/STR.js */

var DB = (function (){
 //Database Tables
 var NODES = {},
  EDGES = $models.LooseEdge(),
  CONFIG = $models.Config.create();

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
  PREF_TMP = "TMP ",
  DATE = new Date(),
  UUID = 0,
  CASE_SENSE = false;
  

 function itSearchNode(acc, wNode, key, plainObj)
 {
  var wordList = this;
  if ($models.WikiNode.search(wNode, wordList, CASE_SENSE))
  {
   acc.push(wNode.title);
  }
  return acc;
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
 
 function itValidateNode(acc, wNode)
 {
  if ($models.WikiNode.validate(wNode))
  {
   acc[wNode.title] = wNode;
  }
  return acc;
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
   .reduce(itGroupTitleByMime, $models.LooseEdge())
   .listByInbound();
   
  return MIME;
 }
 
 function indexTagsList()
 {
  TAGTITLE = indexTags();
  return _.pluck(TAGTITLE, "key").sort();
 }
 
 function indexTags()
 {
  TAGTITLE = TAGTITLE || _.values(NODES)
   .reduce(itGroupTitleByTags, $models.LooseEdge())
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
 
 function indexSearch(wordList, caseSense)
 {
  CASE_SENSE = !!caseSense;
  return _.transform(NODES, itSearchNode, [], _.uniq(wordList)).sort();
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
 
 function nextTmpName(title)
 {
  return title + " (" + PREF_TMP + (UUID += 1) + ")";
 }
 
 function newTmpName(title)
 {
  var defTitle = title;
  while (hasNode(defTitle))
  {
   defTitle = nextTmpName(title);
  }
  return defTitle;
 }
 
 function newNodeNoConflict(title, src, mime)
 {
  return $models.WikiNode.create(newTmpName(title), src, mime);
 }
 
 function newNode(title, src, mime, tags)
 {
  return $models.WikiNode.create(title, src, mime, tags);
 }
 
 function editNode(wNode, targetList, oldTitle)
 {
  if (!$models.WikiNode.validate(wNode))
  {
   throw new TypeError("Schema error in wiki node objects.");
  }
  if (_.isString(oldTitle) && hasNode(oldTitle))
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
  if (_.isString(title) && hasNode(title))
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
  var wNode = hasNode(title) ? NODES[title] : $models.WikiNode.create(title);
  wNode.tags.sort();
  return wNode;
 }
 
 function setConfig(cfgObj)
 {
  CHANGED = true;
  return _.merge(CONFIG, $models.Config.create(cfgObj))
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
  _.merge(CONFIG, $models.Config.create(jsonObj.CONFIG));
  _.merge(NODES, _.reduce(jsonObj.NODES, itValidateNode, {}));
  
  nullifyCache();
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
  indexTagsList : indexTagsList,
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


