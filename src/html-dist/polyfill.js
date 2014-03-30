
/* Object.create() */
(function () {
 if (typeof Object.create === "function") {return;}
 
 var F = function () {};
 
 function objectCreate(o)
 {
  if (arguments.length > 1)
  {
   throw Error("Object.create polyfill cannot support second parameter.");
  }
  if ((typeof o !== "object" && typeof o !== "function") || o === null)
  {
   throw TypeError("Argument must be a non-null object");
  }
  
  F.prototype = o;
  return new F();
 }
 
 Object.create = objectCreate;
}());


/* Date.now() */
(function (){
 if (typeof Date.now === "function") {return;}
 
 function dateNow()
 {
  return (new Date()).getTime();
 }
 
 Date.now = dateNow;
}());


