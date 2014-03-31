/* requires PO.js */


/*
Non-API Note: Since the wiki has no need for a full-blown Graph data structure 
algorithm library yet, only limited algorithms and use cases are implemented.
//TODO: Test cases
*/

/**
 * A simple implementation of the Directed Graph data structure. Currently,
 * it can support inbound and outbound edge listing, arbitrary data on edge
 * object, locating orphaned nodes, and fluid JSON serialization. (Nodes 
 * without any inbound edge) 
 *
 * This module shall be expanded as needed by the BareBonesWiki project.
 *
 * > **Notes on parameter omission**
 *
 *   If parameter omission is specified with a method, use `null`, `undefined`
 *   or `void(0)` (an expression that always return `undefined`) for omitting 
 *   that parameter.
 *
 * 
 * @module LooseEdge
 * @main LooseEdge
 * @requires PO
 */
var LooseEdge = (function (){

 function doArrayDiff(val, index, array)
 {
  return this.indexOf(val) !== -1;
 }
 
 function arrayDiff(a1, a2)
 {
  return a1.filter(doArrayDiff, a2);
 }
 
 /**
  * Creates a new LooseEdge instance, which is a directed graph that 
  * permits loose-edges; That is, edge endpoints that do not point to an
  * existing node. The endpoints are identified using string or numeric
  * identifiers, which can be used to select individual objects. Each edge
  * object contains its own data set, such as weight or flow.
  *
  * @class LooseEdge
  * @constructor
  * @param [json] {string or object}
    If not omitted attempts to import LooseEdge data with an existing object
    or a JSON string.
  * @param [selfLoop] {boolean}
    If true, this collection of LooseEdge permits self-loops, rather than 
    failing silently when they're added.
  */
 function LooseEdge(json, selfLoop)
 {
  if (!(this instanceof LooseEdge))
  {
   return new LooseEdge(json, selfLoop);
  }
 
  /**
   * Denotes whether the edge set allows self-looping edges. By default,
   * adding self-looping edges will fail silently.
   * @property selfLoop
   * @final
   * @type {boolean}
   * @default false
   */
  this.selfLoop = !!selfLoop;
  
  /**
   * A map of directed edges, where the keys are the source nodes' ID, and the
   * values are objects. The keys of the nested objects are the destination
   * node's ID, and their values are the edge's associated data.
   *
   * Sample JSON of a inter-personal relationship graph:
   *
   * ```
   * {
   *  "A" : {"B" : "Abuse", "C" : "Rivalry"},
   *  "B" : {"A" : "Friendship"}
   * }
   * ```
   * @property edges
   * @type {object}
   */
  this.EDGES = {};
  this.TRANS = {}; //Edge set transpose for fast backlink access.
  
  if (PO.isString(json) || PO.isObject(json))
  {
   LooseEdge.prototype.fromRoute.call(this, jsonImport);
  }
  
  return this;
 }

 LooseEdge.prototype = (function (){
 
  function edgeCheckID(fromID, toID)
  {
   return (fromID !== toID || !this.selfLoop) &&
    (PO.isString(fromID) || PO.isNumber(fromID)) && 
    (PO.isString(toID) || PO.isNumber(toID));
  }



  function addEdgesArray(key, strArr)
  {
   for (var i = 0, ii = strArr.length; i < ii; i += 1)
   {
    addEdge.call(this, key, strArr[i]);
   }
   return this;
  }
  
  function addEdgesObj(key, obj)
  {
   for (var target in obj)
   {
    if (PO.own(obj, target))
    {
     addEdge.call(this, key, target, obj[target]);
    }
   }
   return this;
  }
  
  /**
   * Adds a collection of directed edges into the graph.
   * @method addEdge
   * @param idObject {object} An object, where the keys are the identifiers
   * of the source node. The values can either be a string, object, or an 
   * array with the following formulations:
   *
   * - Array of strings or number: Adds a directed edge from node A to 
   *   each node specified in the array. These edges' associated data 
   *   will be the value `null`.
   * - Object: The keys denote the identifier of the destination node, 
   *   while the values denote any data associated with the edge object.
   * @return {LooseEdge}
   * The modified LooseEdge instance.
   * @throws {TypeError}
   * The same error as the three-parameter formulation.
   */
  function addEdges(obj)
  {
   for (var key in obj)
   {
    var targets = PO.own(obj, key) ? obj[key] || void(0);
    if (PO.isObject(targets))
    {
     addEdgesObj.call(this, key, targets, null);
    }
    else if (PO.isArray(targets))
    {
     addEdgesArray.call(this, key, targets);
    }
   }
   return this;
  }

  /**
   * Adds one directed edge that points from node A to node B.
   * Will be a no-op if this is a self-loop when self-loops are
   * explicitly forbidden in the graph.
   * @method addEdge
   * @param fromID {string, number} Source node's identifier
   * @param toID {string, number} Destination node's identifier.
   * @param [data=null] {anything} Any data associated with the edge.
   * @return {LooseEdge} The modified LooseEdge instance.
   * @throws {TypeError} If fromID or toID are not strings or numbers.
   */
  function addEdge(fromID, toID, data)
  {
   if (!edgeCheckID.call(this, fromID, toID))
   {
    return this;
   }
   
   var EDGES = this.EDGES[fromID] || {};
   var TRANS = this.TRANS[toID] || {};
   if (!PO.own(this.EDGES, fromID))
   {
    this.EDGES[fromID] = EDGES;
   }
   if (!PO.own(this.TRANS, toID))
   {
    this.TRANS[toID] = TRANS;
   }
   
   EDGES[toID] = data || null;
   TRANS[fromID] = data || null;
   
   return this;
  }
  
  function addEdgeRoute(fromID, toID, data)
  {
   if (arguments.length > 1)
   {
    addEdge.call(this, fromID, toID, data);
   }
   return addEdges.call(this, fromID);
  }



  function rmEdgesObj(key, obj)
  {
   for (var target in obj) 
   {
    if (PO.own(obj, target)) {rmEdge.call(this, key, target);}
   }
   return this;
  }
  
  function rmEdgesArray(key, strArr)
  {
   for (var i = 0, ii = strArr.length; i < ii; i += 1)
   {
    rmEdge.call(this, key, strArr[i]);
   }
   return this;
  }
  
  /**
   * Kills a set of directed edges specified by the object. The option object
   * used in `addEdge(idObject)` shall remove the set of edges added by that 
   * object.
   * @method rmEdge
   * @param idObj {object or Array}
   * The set of directed edges to remove, where the key denotes the source
   * node, while the values can be of the following formulations:
   *
   * - `Array of string or number` Kills the directed edges A -> [B, C, D...]
   * - `Object` Kills the directed edges A -> [B, C, D...] where the
       destination is supplied by the key values of the object. The values
       of the object is not used.
   * @return {LooseEdge} The modified LooseEdge instance.
   */
  function rmEdges(obj)
  {
   for (var key in obj)
   {
    var targets = PO.own(obj, key) ? obj[key] || void(0);
    if (PO.isArray(targets))
    {
     rmEdgesArray.call(this, key, targets);
    }
    else if (PO.isObject(targets))
    {
     rmEdgesObj.call(this, key, targets);
    }
   }
   return this;
  }
  
  /**
   * Removes one, or a set of directed edges depending on the identifiers
   * specified for each endpoint:
   *
   * - Both parameters provided: Kills the directed edge A -> B.
   * - First parameter only: Kills all outbound edges of A: A -> *.
   * - Second parameter only : Kills all inbound edges of B: * -> B.
   *
   * Does nothing if no parameters are supplied.
   * @method rmEdge
   * @param [fromID] {string} Identifier of the source node. May be omitted
   * if there's a 2nd parameter.
   * @param [toID] {string} Identifier of the destination.
   * @return {LooseEdge} The modified LooseEdge instance.
   *
   */
  function rmEdge(fromID, toID)
  {
   var hasSrc = PO.own(this.EDGES, fromID);
   var hasSrcTrans = PO.own(this.TRANS, toID);
   
   if (hasSrc && hasSrcTrans)
   {
    delete this.EDGES[fromID][toID];
    delete this.TRANS[toID][fromID];
   }
   else if (hasSrc)
   {
    rmEdgesObj.call(this, fromID, getEdgesIn.call(this, fromID));
   }
   else if (hasSrcTrans)
   {
    rmEdgesObj.call(this, toID, getEdgesOut.call(this, toID));
   }
   return this;
  }

  function rmEdgeRoute(fromID, toID)
  {
   if (arguments.length > 1))
   {
    rmEdge.call(this, fromID, toID);
   }
   return rmEdges.call(this, fromID);
  }


  
  /**
   * Retrieves a specified set of edge objects.
   * @method getEdge
   * @param [fromID] {string or number} Identifier of the source node.
   * @param [toID] {string or number} Identifier of the destination.
   * @return {anything} 
   * - If both parameters are supplied, returns the data object of the edge.
   * - If the second parameter is omitted, same as `getEdgesOut()`.
   * - If the first parameter is omitted, same as `getEdgesIn()`.
   * - Omitting both parameters returns the entire edge object.
   */
  function getEdge(fromID, toID)
  {
   var hasSrc = PO.isString(fromID) || PO.isNumber(fromID);
   var hasDest = PO.isString(toID) || PO.isNumber(toID);
   
   if (hasSrc && !hasDest)
   {
    return getEdgesOut.call(this, fromID);
   }
   if (!hasSrc && hasDest)
   {
    return getEdgesIn.call(this, toID);
   }
   if (hasSrc && hasDest && hasEdge.call(this, fromID, toID))
   {
    return this.EDGES[fromID][toID];
   }
   return this.EDGES;
  }

  /**
   * Tests whether there's a link from node A to node B.
   * @method hasEdge
   * @param fromID {string} Identifier of the source node.
   * @param toID {string} Identifier of the destination.
   * @return {boolean} true if there's a link from "fromID" to "toID"
   * @throws {TypeError} Both parameters must be of type string.
   */
  function hasEdge(fromID, toID)
  {
   var hasKey = PO.own(this.EDGES, fromID);
   var hasVal = hasKey && PO.own(this.EDGES[fromID], toID);
   return hasKey && hasVal;
  }


  
  /**
   * Retrieves all incoming edge objects going into a particular node.
   * @method getEdgesIn
   * @param nodeID {string} The identifier of the node.
   * @return {object} An object, where the keys represent the source of 
     the edge, and the values the data associated with the edge object. 
     Returns an empty object if the base node doesn't exist.
   */
  function getEdgesIn(nodeID)
  {
   return PO.own(this.TRANS, nodeID) ? this.TRANS[nodeID] : {};
  }

  /**
   * Retrieves all outgoing edge objects originating from a particular node.
   * @method getEdgesOut
   * @param nodeID {string} The identifier of the node.
   * @return {object} An object, where the keys represent the destination of
     the edge, and the values the data associated with the edge object. 
     Returns an empty object if the base node doesn't exist.
   */
  function getEdgesOut(nodeID)
  {
   return PO.own(this.EDGES, nodeID) ? this.EDGES[nodeID] : {};
  }
  
  /**
   * List all orphaned nodes by key that have no inbound edges.
   * @method listOrphansByKey
   * @return {Array} 
   * An array of strings (node keys) in sorted order.
   */
  function listOrphans()
  {
   return arrayDiff(PO.keys(this.EDGES), PO.keys(this.TRANS)).sort();
  }
  
  /**
   * List all nodes in order, then within each node, list the source node
   * of their inbound edges, or destination nodes of their outbound edges
   * by keys.
   * @method listInboundOutbound
   * @param [isOutbound] {boolean}
   * If truthy, each node's outbound targets are listed; List each node's
   * inbound edge source otherwise.
   * @return {Array} 
   * An array of objects, where `key` is the node's name (string), and 
   * `vals` an array of node names (string) at the endpoint of an outbound 
   * or inbound edge.
   *
   * ```
   * [
   *  {key : "sourceID", vals : ["inbound-1", "inbound-2"]},
   *  {key : "sourceID2", vals : ["inbound-3", "inbound-4"]}
   * ]
   * ```
   */
  function listInboundOutbound(isOutbound)
  {
   var srcList = PO.keys(this.EDGES).sort();
   var dirFunc = isOutbound ? getEdgesIn : getEdgesOut;
   
   for (var i = 0, ii = srcList.length; i < ii; i += 1)
   {
    srcList[i] =
    {
     key : srcList[i],
     vals : PO.keys(dirFunc.call(this, srcList[i])).sort();
    }
   }
   return srcList;
  }
  
  function transpose()
  {
   var temp = this.EDGES;
   this.EDGES = this.TRANS;
   this.TRANS = temp;
   
   return this;
  }
  
  /**
   * Imports graph data with a JSON string or a plain javascript object.
   * @method fromJSON
   * @param input {string or object} 
   * The graph data to import from. Effectively, it parses the input JSON 
   * string and calls `addEdge(object)`, merging that object's edge set
   * into the current one.
   * @return {LooseEdge} The modified directed graph instance.
   */
  function fromJSON(input)
  {
   var parsed = PO.isObject(input) ? input : JSON.parse(input);
   if (PO.isObject(parsed))
   {
    addEdges.call(this, parsed);
   }
   return this;
  }
  
  /**
   * Extracts a JSON serializable version of the LooseEdge object.
   * @method toJSON
   * @return {object}
     A plain object ready to be serialized using `JSON.stringify()`
   */
  function toJSON()
  {
   return this.EDGES;
  }
  
  return {
   rmEdge : rmEdgeRoute,
   addEdge : addEdgeRoute,
   getEdge : getEdge,
   hasEdge : hasEdge,
   
   getEdgesIn : getEdgesIn,
   getEdgesOut : getEdgesOut,
   
   listOrphans : listOrphans,
   listInboundOutbound : listInboundOutbound,
   transpose : transpose,
   
   fromJSON : fromJSON,
   toJSON : toJSON
  };
 }());

}());

