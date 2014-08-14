
//WikiNode Object factory.
$models.WikiNode = (function (){

 var MIME_ENUM =
 {
  TEXT : "text/plain",
  HTML : "text/html",
  WIKI : "text/x-bbm",
  JSON : "application/json"
 };


 function defaultTags(tagStrArray)
 {
  var tags = _.isString(tagStrArray) ? [STR.titleize(tagStrArray)] : 
   _.uniq(_.filter(_.filter(tagStrArray, _.isString), STR.isNotBlank));

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
  var tagArray = _.isString(tags) ? [STR.titleize(tags)] : tags;
 
  var obj =
  {
   title : STR.titleize(title || "New Entry"),
   src : _.isString(src) ? src : "",
   mime : defaultMime(mime || ""),
   tags : defaultTags(tags || []),
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
