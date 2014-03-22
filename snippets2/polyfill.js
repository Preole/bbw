(function () {
 if (typeof Object.create === "function") {return;}
 
 var F = function () {};
 Object.create = function (o) {
  if (arguments.length > 1)
  {
   throw Error("Second argument not supported in polyfills.");
  }
  if (o === null) 
  {
   throw Error("Cannot set a null [[Prototype]]");
  }
  if (typeof o !== "object")
  {
   throw TypeError("Argument must be an object");
  }
  
  F.prototype = o;
  return new F;
 };
})();