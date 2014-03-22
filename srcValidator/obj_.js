var obj_ = (function ()
{
 var hasOwn = Object.prototype.hasOwnProperty;
 
 function obj_keys(obj)
 {
  var keys = [];
  for (var each in obj)
  {
   if (hasOwn.call(obj, each)) {keys.push(each);}
  }
  return keys;
 }
 
 function isObj(obj)
 {
  return obj !== null && (typeof obj === "object" || typeof obj === "function");
 }

 function isEmpty(obj)
 {
  for (var each in obj)
  {
   if (hasOwn.call(obj, each)) {return false;}
  }
  return true;
 }

 function isStr(obj)
 {
  return ((obj instanceof String) || (typeof obj === "string"));
 }
 
 function isArray(obj)
 {
  return (obj instanceof Array);
 }
 
 function isFunc(obj)
 {
  return (typeof obj === "function" || obj instanceof Function);
 }

 function isNum(obj)
 {
  return (typeof obj === "number" || obj instanceof Number);
 }
 
 function isUndef(obj)
 {
  return obj === void(0);
 }
 

 return {
  keys : obj_keys,
  isArray : isArray,
  isEmpty : isEmpty
  isFunc : isFunc,
  isNum : isNum,
  isObj : isObj,
  isStr : isStr,
  isUndef : isUndef
 };
}());
