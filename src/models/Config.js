/* requires ../lib/lodash.min.js */

//Configuration Object Factory
$models.Config = (function (){
 function create(title, startup, cfmDel, cfmNav)
 {
  var startList = [];
  if (_.isString(startup))
  {
   startList = STR.words(startup);
  }
  else if (_.isArray(startup))
  {
   startList = startup.filter(_.isString).filter(STR.isNotBlank);
  }
  
  var obj =
  {
   title : _.isString(title) ? STR.titleize(title) : "BareBonesWiki",
   cfmDel : !!cfmDel,
   cfmNav : !!cfmNav,
   startup : startList
  }
  return obj;
 }

 function createFromObject(cfgObj)
 {
  var obj = _.isObject(cfgObj) ? cfgObj : {};
  return create(
   obj.title,
   obj.startup,
   obj.cfmDel,
   obj.cfmNav
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
