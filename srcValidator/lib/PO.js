
/**
 * A collection of convenience and common Object methods, such as type 
 * checking, property possession, keys and values.
 *
 * This module shall be expanded as needed by the BareBonesWiki project.
 *
 * @module PO
 * @main PO
 */
var PO = (function (){

 var staticMethods =
 {
  own : own,
  isObject : isObject,
  isString : isString,
  isNumber : isNumber,
  isArray : isArray,
  isEmptyObject : isEmptyObject,
  keys : objectKeys,
  merge : objectMerge,
  values : objectValues
 };

 /**
  * Check if a key in object is directly owned by that object.
  * @method own
  * @static
  * @param obj {anything} The object to check its type for.
  * @return {boolean} true If the key is directly owned by the object.
  */
 function own(obj, key)
 {
  return Object.prototype.hasOwnProperty.call(obj, key);
 }
 
 /**
  * Check if an object is `object` or `function`, but not null.
  * @method isObject
  * @static
  * @param obj {anything} The object to check its type for.
  * @return {boolean} true If it's an `object` that's not `null`.
  */
 function isObject(obj)
 {
  return obj !== null && (typeof obj === "object" || typeof obj === "function");
 }
 
 /**
  * Check if the object is a string.
  * @method isString
  * @static
  * @param obj {anything} The object to check its type for.
  * @return {boolean} true If the object is a string.
  */
 function isString(obj)
 {
  return ((obj instanceof String) || (typeof obj === "string"));
 }
 
 /**
  * Check if the object is a number.
  * @method isNumber
  * @static
  * @param obj {anything} The object to check its type for.
  * @return {boolean} true If the object is a number.
  */
 function isNumber(obj)
 {
  return (typeof obj === "number" || obj instanceof Number);
 }
 
 /**
  * Check if the object is an Array
  * @method isArray
  * @static
  * @param obj {anything} The object to check its type for.
  * @return {boolean} true If the object is an Array.
  */
 function isArray(obj)
 {
  return (obj instanceof Array);
 }
 
 /**
  * Check if the object an empty object, meaning the object does not 
  * directly own any properties.
  * @method isString
  * @static
  * @param obj {anything} The object to check its type for.
  * @return {boolean} true If the object has no directly owned properties.
  */
 function isEmptyObject(obj)
 {
  if (!isObj(obj))
  {
   throw new TypeError("Non-object called on PO.isEmptyObject.");
  }
  
  for (var each in obj)
  {
   if (own(obj, each)) {return false;}
  }
  return true;
 }
 
 /**
  * Lists the keys directly owned by the object.
  * @method keys
  * @static
  * @param obj {object} The object to retrieve the keys from.
  * @return {Array of string} A list of property names in no specified order.
  * @throw {TypeError} If the parameter is not a valid object.
  */
 function objectKeys(obj)
 {
  if (!isObj(obj))
  {
   throw new TypeError(obj + " is not a valid object.");
  }
  
  var keyList = [];
  for (var key in obj)
  {
   if (own(obj, key)) {keyList.push(key);}
  }
  return keyList;
 }
 
 /**
  * Lists the values directly owned by the object. The order of these
    values is not guaranteed to be consistent with `keys()`.
  * @method values
  * @static
  * @param obj {object} The object to retrieve the values from.
  * @return {Array of anything} A list of object values in no specified order.
  * @throw {TypeError} If the parameter is not a valid object.
  */
 function objectValues(obj)
 {
  if (!isObj(obj))
  {
   throw new TypeError(obj + " is not a valid object.");
  }
 
  var vals = [];
  for (var key in obj)
  {
   if (own(obj, key)) {vals.push(obj[key]);}
  }
  return vals;
 }
 
 
 /**
  * Merges the direct properties of one object onto another, left to 
  * right, ignoring invalid objects. The left-most object in the parameter 
  * list shall be affected by this merger. It's a no-op if there are less 
  * than two objects in the parameter list.
  * @method merge
  * @static
  * @param obj {object...} A list of objects to merge 
  * @return {object}
    The left-most valid object with all properties merged, or `undefined`
    if no valid object exist in the parameter list.
  */
 function objectMerge()
 {
  var args = arguments, obj = void(0), ii = args.length, i = 0;
  for (i = 0; i < ii; i += 1)
  {
   if (isObj(args[i]))
   {
    obj = args[i];
    break;
   }
  }
  
  for (i += 1; i < ii; i += 1)
  {
   var obj2 = args[i];
   if (!isObj(obj2)) {continue;}
   
   for (var key in obj2)
   {
    if (own(obj2, key))
    {
     obj[key] = obj2[key];
    }
   }
  }
  return obj;
 }
 

 
 //Object Class.
 
 /**
  * PlainObject; A utility class augmenting the native javascript object.
    It defines a formal interface for safely using javascript objects as an 
    associative array data structure. It also defines a selection of 
    convenience methods that can be invoked directly by the object.
  * @class PO
  * @constructor
  * @param obj {object} The PO object's initial content.
  */
 function PO(obj)
 {
  if (!(this instanceof PO))
  {
   return new PO(obj);
  }
 
  this.po = {};
  if (isObj(obj))
  {
   PO.prototype.put.call(this, obj);
  }
  return this;
 }
 
 //Merge static functions.
 objectMerge(PO, staticMethods);
 
 //Define prototype.
 PO.prototype = (function (){
 
  /*
  Basic Object CRUD
  =================
  */
  
  /**
   * Destroys a key-value pair from the PO object.
   * @method get
   * @param key {anything}
     Anything that can be coerced into a string representation.
     @return {PO}
     The PO instance with the key value mapping removed.
   */
  function remove(key)
  {
   delete this.po[key];
   return this;
  }
  
  /**
   * Retrieves the data associated with the key.
   * @method get
   * @param key {anything}
     Anything that can be coerced into a string representation.
     @return {anything}
     The data owned by this PO object, if it exists. returns void(0) 
     otherwise.
   */
  function get(key)
  {
   return PO.own(this.po, key) ? this.po[key] : void(0);
  }
  
  /**
   * Queries whether a key has already been defined for the PO object.
   * @method has
   * @param key {anything}
     Anything that can be coerced into a string representation.
     @return {boolean}
     True if the key is defined; false otherwise.
   */
  function has(key)
  {
   return PO.own(this.po, key);
  }
  
  /**
   * Puts a pair of key and value into the PO object, overwriting the 
   * existing key value pairs.
   * @method put
   * @param key {anything}
     Anything that can be coerced into a string representation.
   * @param val {anything}
     The value to be mapped by the key.
     @return {PO}
     The modified PO instance.
   */
  function putKeyVal(key, val)
  {
   this.po[key] = val;
   return this;
  }
  
  /**
   * Merges an object's key value pairs into the current PO object, 
   * overwriting all of the existing key value pairs.
   * @method put
   * @param key {object or PO}
     A plain javascript object or a PO instance to merge with.
   * @return {PO}
     The modified PO instance.
   */
  function putObject(obj)
  {
   if (obj instanceof PO && PO.own(obj.po) && PO.isObject(obj.po))
   {
    PO.merge.call(this.po, obj.po);
   }
   else
   {
    PO.merge.call(this.po, obj);
   }
   return this;
  }
  
  function putRoute(key, val)
  {
   if (arguments.length > 1)
   {
    return putKeyVal.call(this, key, val);
   }
   return putObject.call(this, key);
  }
  
  
  /*
  Import & Export & Serialization
  ===============================
  */
  
  /**
   * Retrieves a JSON serializable version of this object.
   * @method toJSON
   * @return {object} The serializable object.
   */
  function toJSON()
  {
   return this.po;
  }
  
  //Imports from a valid JSON string that returns an object.
  /**
   * Populates the PO object with the content of a JSON string or
   * another javascript object, similar to `put()`
   * @method fromJSON
   * @param str {string or object}
   * A valid JSON string (which resolves to an object) or an existing 
   * object to merge with. No-op if this parameter doesn't resolve to an
   * object.
   * @return {PO} The merged PO instance.
   * @throw {Error} If `JSON.parse()` fails to parse the string.
   */
  function fromJSON(str)
  {
   var parseRes = PO.isString(str) ? JSON.parse(str) : str;
   return putObject.call(this, parseRes);
  }
  
  
  
  /*
  Comprehension & Utilities
  =========================
  */
  
  /**
   * Lists the keys directly owned by this PO instance, as the static
   * `PO.keys()`.
   * @method keys
   * @return {Array of string}
   */
  function keys()
  {
   return PO.keys(this.po);
  }
  
  /**
   * Lists the values directly owned by this PO instance, as the static
   * `PO.values()`.
   * @method values
   * @return {Array of anything}
   */
  function values()
  {
   return PO.values(this.po);
  }

  /**
   * Returns a new PO instance keeping key-value pairs that bypasses a check 
     imposed by the callback function. The original instance shall not be 
     modified by this method.
   * @method filter
   * @param callback {function}
   * The callback function to execute, which has the following parameters:
     - `this`: Set by `thisArg
     - `value`: The object's value in the current iteration.
     - `key` : The object's key in the current iteration.
     - `plainObject` : The PO instance that invoked this method.
     
     A key-value pair is preserved if the callback function returns a truthy 
     value; Otherwise, it is discarded.
     
   * @param [thisArg] {anything}
     Sets the `this` context in the callback function.
   * @return {PO}
   * The new PO object with contents that survived the filter check.
   */
  function filter(callback, thisArg)
  {
   var newPO = new PO();
   var newKeys = this.keys();
   for (var i = 0, ii = newKeys.length; i < ii; i += 1)
   {
    var key = newKeys[i];
    var val = this.get(key);
    
    if (!callback.call(thisArg, val, key, this)) {newPO.put(key, val);}
   }
   return newPO;
  }
  
  
  
  return {
   put : putRoute,
   remove : remove,
   get : get,
   has : has,
   
   fromJSON : fromJSON,
   toJSON : toJSON,
   
   keys : keys,
   values : values,
   filter : filter
  };
  
 }());
 
 
 
 return PO;
}());