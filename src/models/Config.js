/* requires ../lib/lodash.min.js */

//Configuration Object Factory
$models.Config = (function (){

 var STARTUP_ENUM =
 {
  CREATED : "created",
  EDITED : "edited",
  CHOOSE : "choose",
  HOME : "home"
 };

 function create(title, startup, startupType, startupCount, cfmDel, cfmNav)
 {
  var startList = _.isString(startup) ?
   STR.words(startup) : 
   _.isArray(startup) ?
   startup.filter(_.isString).filter(STR.isNotBlank) : [];
   
  var count = parseInt(startupCount, 10);
  var startCount = _.isNumber(count) && !_.isNaN(count) ? 
   Math.max(Math.abs(count), 1) : 5;

  return {
   title : _.isString(title) ? STR.titleize(title) : "BareBonesWiki",
   cfmDel : !!cfmDel,
   cfmNav : !!cfmNav,
   startup : startList,
   startupType : _.isString(startupType) ? startupType : STARTUP_ENUM.HOME,
   startupCount : startCount
  };
 }

 function createFromObject(cfgObj)
 {
  var obj = _.isObject(cfgObj) ? cfgObj : {};
  return create(
   obj.title,
   obj.startup,
   obj.startupType,
   obj.startupCount,
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
 
 return {create : createRoute, startupTypes : STARTUP_ENUM};
}());
