

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

 return {
  keys : obj_keys
 };
}());

