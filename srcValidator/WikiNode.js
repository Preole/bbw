

function WikiNode(title, src, mime, tags, edges)
{
 var obj = {}, now = utc.now();

 this.title = title;
 this.src = src;
 this.tags = tags;
 this.mime = mime;
 this.created = now;
 this.edited = now;
 
 this.validate();
 
 if (this.title.length <= 0)
 {
  this.title = newName();
 }
 if (obj.mime.length <= 0) 
 {
  this.mime = "text/x-bbm";
 }
 
 return obj;
}

WikiNode.prototype = (function (){
 
 function validate()
 {
  this.title = str_.titleize(title);
  this.tags = 
  
  if (this.title.length)
 }
 
 function defaults()
 {
  this.mime = this.mime || "text/x-bbm";
  this.tags = this.tags || ["Uncategorized"];
 }
 
 return {
  
 };
});