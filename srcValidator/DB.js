/* requires ./lib/str_.js */
/* requires ./lib/obj_.js */
/* requires ./lib/jquery.min.js */

//Wha wha, what a bloody mess. Understanding this database requires
//a complete scan of this module.
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
 
 defCfg =
 {
  "title": "BareBonesWiki",
  "startup": [
   "BareBonesWiki"
  ],
  "cfmDel": false,
  "cfmNav": false,
  "searchCase": false
 };
 
 
 function truncate(num, unit) {return (num - (num % unit));}
 function remainder(num, unit) {return (num % unit);}

 //String x4... 
 function WikiNode(title, src, mime, tags)
 {
  var obj = {}, now = utc.now();
 
  obj.title = str_.titleize(title);
  obj.src = src;
  obj.tags = str_.lines(tags || "", 1, 1, 1);
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
 
}());


