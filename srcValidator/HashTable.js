/* requires obj_.js */


//Slightly modified Javascript object; 
var Hashtable = (function (){
 
 function Hashtable()
 {
  if (!(this instanceof Hashtable)) {return new Hashtable();}
  this.table = Object.create(null);
  return this;
 }

 Hashtable.prototype = (function (){
 
  function put(strKey, obj)
  {
   this.table[strKey] = obj;
   return this;
  }
  
  function get(strKey)
  {
   return this.table[strKey];
  }
  
  function keys()
  {
   return obj_.keys(this.table);
  }
  
  function clear()
  {
   return Hashtable.call(this);
  }
  
  function toJSON()
  {
   return this.table;
  }
  

  return {
   put : put,
   get : get,
   keys : keys,
   clear : clear,
   toJSON : toJSON,
  };
 }());
 
 
 
 return Hashtable;
}());


