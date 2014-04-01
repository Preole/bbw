/* requires lodash.min.js */

/**
 * A simple get-set Associative Array data structure that performs CRUD
 * operations without worries of accidentally stepping on inherited object
 * properties, wrapped around lodash's API.
 *
 * ```
 * var myBlogTable = {};
 * myBlogTable["hasOwnProperty"] = ...;
 *
 * [Sometime later...]
 *
 * if (myBlogTable.hasOwnProperty)
 * {
 *  //Do business logic here.
 * }
 * ```
 *
 * In this blog post title example, hasOwnProperty is a function off the 
 * Object prototype chain. If a blog post happens to use the title 
 * "hasOwnProperty", the application's going to mistakenly think that
 * the post exists, when it actually doesn't.
 *
 * Use this module/class if the application plans to deal with arbitrary
 * user input, especially use cases involving unique title identifiers.
 *
 * This module shall be expanded as needed by the BareBonesWiki project.
 *
 * @module PO
 * @main PO
 * @requires lodash
 */
var PO = (function (){


 /**
  * PlainObject; Contains a formal interface for safely using javascript
    objects as an associative array data structure, rather than using 
    native javascript syntax to do so. It also defines a selection of 
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

  if (_.isObject(obj))
  {
   PO.prototype.put.call(this, obj);
  }
  return this;
 }
 
 
 
 //Define prototype.
 PO.prototype = (function (){
 
  /*
  Basic Object CRUD
  =================
  */
  
  function remove(key)
  {
   delete this.po[key];
   return this;
  }
  
  function get(key)
  {
   return _.has(this) ? this[key] : void(0);
  }
  
  function has(key)
  {
   return _.has(this);
  }
  
  function putKeyVal(key, val)
  {
   this.po[key] = val;
   return this;
  }
  
  function putObject(obj)
  {
   return _.merge(this, obj);
  }
  
  function putRoute(key, val)
  {
   if (_.isObject(arguments[1]))
   {
    return putKeyVal.call(this, key, val);
   }
   return putObject.call(this, key);
  }
  
  
  /*
  Comprehension & Utilities
  =========================
  */
  
  function keys()
  {
   return _.keys(this);
  }
  
  function values()
  {
   return _.values(this);
  }
  
  return {
   remove : remove,
   get : get,
   has : has,
   put : putRoute,
   
   keys : keys,
   values : values
  };
  
 }());
 
 
 return PO;
}());