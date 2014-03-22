

var WikiNode = (function (){

 function WikiNode(title, src, mime, tags)
 {
  if (!(this instanceof WikiNode))
  {
   return new WikiNode(title, src, mime, tags)
  }
  var now = utc.now();
  
  if (title.length <= )
  this.title = title || "";
  this.src = src || "";
  this.tags = (tags instanceof Array) ? tags : [];
  this.mime = (typeof mime === "string") ? mime : "text/x-bbm";
  this.created = now;
  this.edited = now;
  this.defaults();
  
  return this;
 }
 
 WikiNode.prototype = (function (){
  var funcObj =
  {
   validate : validate,
   MIME :
   {
    WIKI : "text/x-bbm",
    TEXT : "text/plain",
    HTML : "text/html"
   }
  };
  
  function validate()
  {
   this.title = str_.titleize(this.title);
   if (this.title.length <= 0)
   {
    throw new RangeError("No empty/space wiki entry titles allowed.");
   }
   return this;
  }
  
  return funcObj;
 }());
 
 
 return WikiNode;
}());