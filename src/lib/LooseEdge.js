/* requires lodash.min.js */



/**
 * A simple implementation of the Directed Graph data structure used to 
 * represent directionality between data nodes.
 *
 * This module shall be expanded as needed by the BareBonesWiki project.
 * 
 * @module LooseEdge
 * @main LooseEdge
 * @requires lodash
 */
var LooseEdge = (function (){

 /**
  * Creates a new LooseEdge instance, which is a directed graph that 
  * permits dangling endpoints.
  *
  * @class LooseEdge
  * @constructor
  * @param [json] {string|object}
    If not omitted, attempts to import LooseEdge data with an existing object
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
    * @property EDGES
    * @type {object}
    * @private
    */
   this.EDGES = {};

   /**
    * A shallow tranpose copy of the current edge set, where the direction
    * of the edges are reversed.
    * @property TRANS
    * @type {object}
    * @private
    */
   this.TRANS = {}; //Edge set transpose for fast backlink access.
   
   if (_.isString(json) || _.isObject(json))
   {
    LooseEdge.prototype.fromJSON.call(this, json);
   }
   
   return this;
 }

 LooseEdge.prototype = (function (){
 
  function edgeCheckID(fromID, toID)
  {
   return (fromID !== toID || this.selfLoop) && 
    isValidID.call(this, fromID) && isValidID.call(this, toID);
  }
  
  function isValidID(nodeID)
  {
   return _.isString(nodeID) || _.isNumber(nodeID);
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
    if (_.has(obj, target))
    {
     addEdge.call(this, key, target, obj[target]);
    }
   }
   return this;
  }
  
  function addEdges(obj)
  {
   for (var key in obj)
   {
    var targets = _.has(obj, key) ? obj[key] : void(0);
    if (_.isObject(targets))
    {
     addEdgesObj.call(this, key, targets);
    }
    else if (_.isArray(targets))
    {
     addEdgesArray.call(this, key, targets);
    }
   }
   return this;
  }

  function addEdge(fromID, toID, data)
  {
   if (!edgeCheckID.call(this, fromID, toID))
   {
    return this;
   }
   
   this.EDGES[fromID] = this.EDGES[fromID] || {};
   this.TRANS[toID] = this.TRANS[toID] || {};
   this.EDGES[fromID][toID] = data || null;
   this.TRANS[toID][fromID] = data || null;
   
   return this;
  }
  
  /**
   * Adds a collection of directed edges and their associated data, based 
   * on the parameters. If an edge already exists in the graph, it will be
   * the data object will be overwritten by latter calls to `addEdge();`
   * @method addEdge
   * @param fromID {string|number|object}
   * - string|number : The source node identifier to add outbound edges from.
       In this formulation, the second parameter is required.
     - object : A map of edges to connect within the graph. The keys of the 
       object are source node identifiers. Its values can take on either of 
       these two values:
       
       - Array of string|number: List of destination nodes to connect to. 
         The edge's data object shall be `null`.
       - Object: The keys are the destination nodes to connect to, while 
         the values denote the edge's data objects.
         
       In this formulation, the second parameter is discarded.
   * @param toID {string|number|array|object}
   * - If fromID and toID are both string|number, adds this specific directed
       edge to the graph. The third parameter `data` will be the data 
       associated with this edge object.
     - Array of string|number: Adds directed edges from node A to a list 
       of other nodes, with each edge's data object being `null`
     - Object: Adds directed edges from node A to a list of other nodes 
       based on the object's property keys. The object's value denote the
       edge's associated data.
   * @param data {anything}
   * Only used when both fromID and toID are string|number.
   * @return {LooseEdge}
   * The modified LooseEdge instance.
   */
  function addEdgeRoute(fromID, toID, data)
  {
   if (edgeCheckID.call(this, fromID, toID))
   {
    addEdge.call(this, fromID, toID);
   }
   else if (isValidID.call(this, fromID))
   {
    if (_.isArray(toID))
    {
     addEdgesArray.call(this, fromID, toID);
    }
    else if (_.isObject(toID))
    {
     addEdgesObj.call(this, fromID, toID);
    }
   }
   else if (_.isObject(fromID))
   {
    return addEdges.call(this, fromID);
   }
   return this;
  }



  function rmEdgesObj(key, obj)
  {
   for (var target in obj) 
   {
    if (_.has(obj, target)) {rmEdge.call(this, key, target);}
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
  
  function rmEdges(obj)
  {
   for (var key in obj)
   {
    var targets = _.has(obj, key) ? obj[key] : void(0);
    if (_.isArray(targets))
    {
     rmEdgesArray.call(this, key, targets);
    }
    else if (_.isObject(targets))
    {
     rmEdgesObj.call(this, key, targets);
    }
   }
   return this;
  }
  
  function rmEdge(fromID, toID)
  {
   if (!edgeCheckID.call(this, fromID, toID))
   {
    return this;
   }
   
   if (this.EDGES[fromID] && this.TRANS[toID])
   {
    delete this.EDGES[fromID][toID];
    delete this.TRANS[toID][fromID];
   }
   return this;
  }
  
  /**
   * Symmetric version of addEdge(), except this method removes edges 
   * instead. The same parameters passed to addEdge() shall remove the
   * same edge set in this method.
   *
   * @method rmEdge
   * @param fromID {string|number|object}
   * @param toID {string|number|array|object}
   * @return The modified LooseEdge instance.
   */
  function rmEdgeRoute(fromID, toID)
  {
   if (edgeCheckID.call(this, fromID, toID))
   {
    rmEdge.call(this, fromID, toID);
   }
   else if (isValidID.call(this, fromID))
   {
    if (_.isArray(toID))
    {
     rmEdgesArray.call(this, fromID, toID);
    }
    else if (_.isObject(toID))
    {
     rmEdgesObj.call(this, fromID, toID);
    }
   }
   else if (_.isObject(fromID))
   {
    return rmEdges.call(this, fromID);
   }
   return this;
  }


  /**
   * Retrieves the edge A -> B.
   * @method getEdge
   * @param fromID {string|number} Identifier of the source node.
   * @param toID {string|number} Identifier of the destination.
   * @return {anything} 
   * The data object of the edge between fromID and toID; Returns
   * undefined if there's no such edge.
   */
  function getEdgeSingle(fromID, toID)
  {
   if (hasEdge.call(this, fromID, toID))
   {
    return this.EDGES[fromID][toID];
   }
  }
  
  /**
   * Retrieves the current edge set in entirety
   * @method getEdgesAll
   * @return {object}
   * See property EDGES.
   */
  function getEdgesAll()
  {
   return this.EDGES;
  }

  /**
   * Retrieves the set of edges that are going into a particular node.
   *
   * **Note:** These edges do not actually exist in the graph. If a node's 
   * inbound edges need to be removed, use the `transpose()` operation with
   * `getEdgesOut()`:
   *
   * ```
   * g.transpose().rmEdge(sourceID, g.getEdgesOut(sourceID)).transpose();
   * ```
   * 
   * @method getEdgesIn
   * @param nodeID {string} The identifier of the node.
   * @return {object} An object, where the keys represent the source of 
     the edge, and the values the data associated with the edge object. 
     Returns an empty object if the base node doesn't exist.
   */
  function getEdgesIn(nodeID)
  {
   return _.has(this.TRANS, nodeID) ? this.TRANS[nodeID] : {};
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
   return _.has(this.EDGES, nodeID) ? this.EDGES[nodeID] : {};
  }
  
  /**
   * Tests whether there's a link from node A to node B.
   * @method hasEdge
   * @param fromID {string} Identifier of the source node.
   * @param toID {string} Identifier of the destination.
   * @return {boolean} true if there's a link from "fromID" to "toID"
   */
  function hasEdge(fromID, toID)
  {
   var hasKey = _.has(this.EDGES, fromID);
   var hasVal = hasKey && _.has(this.EDGES[fromID], toID);
   return hasKey && hasVal;
  }

  /**
   * Check if a given node identifier is connected within this edge set.
   * @method isIsolated
   * @param nodeID {string or number} The node identifier to check for.
   * @return {boolean} true if the node is not connected; false otherwise.
   */
  function isIsolated(nodeID)
  {
   return isValidID.call(this, nodeID) &&
    (_.has(this.EDGES, nodeID) || _.has(this.TRANS, nodeID));
  }
  
  /**
   * Check if a node is a sink node (No outgoing edge) in the edge set.
   * @method isSink
   * @param nodeID {string or number} The node identifier to check for.
   * @return {boolean} true if the node has no outgoing edge.
   */
  function isSink(nodeID)
  {
   return isValidID.call(this, nodeID) &&
    !_.has(this.EDGES, nodeID) &&
    _.has(this.TRANS, nodeID);
  }
  
  /**
   * Check if a node is a source node (No incoming edge) in the edge set.
   * @method isSink
   * @param nodeID {string or number} The node identifier to check for.
   * @return {boolean} true if the node has no outgoing edge.
   */
  function isSource(nodeID)
  {
   return isValidID.call(this, nodeID) &&
    _.has(this.EDGES, nodeID) &&
    !_.has(this.TRANS, nodeID);
  }
  
  /**
   * List all nodes that have no inbound edges by their identifiers.
   * @method listIsSource
   * @return {Array} 
   * An array of strings (node keys) in lexicographic order
   */
  function listIsSource()
  {
   return _.difference(_.keys(this.EDGES), _.keys(this.TRANS)).sort();
  }
  
  /**
   * List all nodes that have no outbound edges by their identifiers.
   * @method listIsSource
   * @return {Array} 
   * An array of strings (node keys) in lexicographic order
   */
  function listIsSink()
  {
   return _.difference(_.keys(this.TRANS), _.keys(this.EDGES)).sort();
  }
  
  /**
   * Given a set of nodes, keep those that are not on the endpoints
   * of any edge within the edge set.
   * @listIsIsolated
   * @param {object|(Array of string|number)}
   * An array of node identifiers. In case of an object, the object's
   * keys will be used as the set like the case of array.
   * @return {Array of string}
   * A list of isolated nodes.
   */
  function listIsIsolated(nameList)
  {
   var nList = _.isObject(nameList) ? _.keys(nameList) : 
    _.isArray(nameList) ? nameList : [];
   var notAlone = _.union(_.keys(this.TRANS), _.keys(this.EDGES));
    
   return _.difference(nList.filter(isValidID, this), notAlone);
  }
  
  /**
   * List all nodes that is not a source node (Has at least one inbound edge)
   * @method listIsNotSource
   * @return {Array of string}
   * A list of node names with at least one inbound edge
   */
  function listIsNotSource()
  {
   return _.keys(this.TRANS).sort();
  }
  
  /**
   * List all nodes that is not a sink node (Has at least one outbound edge)
   * @method listIsNotSink
   * @return {Array of string}
   * A list of node names with at least one outbound edge.
   */
  function listIsNotSink()
  {
   return _.keys(this.EDGES).sort();
  }
  
  function listByInboundOutbound(isOutbound)
  {
   var dirFunc = isOutbound ? getEdgesOut : getEdgesIn,
    edgeSet = isOutbound ? this.EDGES : this.TRANS,
    that = this;
   
   return _.keys(edgeSet).sort().reduce(function (acc, key, index, array){
    var vals = _.keys(dirFunc.call(that, key)).sort();
    if (vals.length > 0)
    {
     acc.push({key : key, vals : vals});
    }
    return acc;
   }, []);
  }
  
  /**
   * For each node within the graph, list the names of the nodes that 
   * point to the current node.
   * @method listByInbound
   * @return {Array} 
   * An array of objects, where `key` is the node's name (string), and 
   * `vals` an array of node names (string) pointing at the source node.
   *
   * ```
   * [
   *  {key : "nodeID", vals : ["from-1", "from-2"]},
   *  {key : "nodeID2", vals : ["from-3", "from-4"]}
   * ]
   * ```
   */
  function listByInbound()
  {
   return listByInboundOutbound.call(this);
  }
  
  /**
   * For each node within the graph, list the names of the nodes connected 
   * by their outbound edges.
   * @method listByOutbound
   * @return {Array} 
   * An array of objects, where `key` is the node's name (string), and 
   * `vals` an array of node names (string) pointed by the source node.
   *
   * ```
   * [
   *  {key : "nodeID", vals : ["to-1", "to-2"]},
   *  {key : "nodeID2", vals : ["to-3", "to-4"]}
   * ]
   * ```
   */
  function listByOutbound()
  {
   return listByInboundOutbound.call(this, true);
  }
  
  /**
   * Reverses the directions of all edges within the edge set.
   * @method transpose
   * @return {LooseEdge} The transformed LooseEdge instance.
   */
  function transpose()
  {
   var temp = this.EDGES;
   this.EDGES = this.TRANS;
   this.TRANS = temp;
   
   return this;
  }

  /**
   * Imports graph data with a JSON string|a plain javascript object.
   * @method fromJSON
   * @param input {string|object} 
   * The graph data to import from. Effectively, it parses the input JSON 
   * string and calls `addEdge(object)`, merging that object's edge set
   * into the current one.
   * @return {LooseEdge} The modified directed graph instance.
   * @throw {Error}
   * if the input is of type string, but it is invalid JSON.
   */
  function fromJSON(input)
  {
   var parsed = _.isString(input) ? JSON.parse(input) : input;
   if (_.isObject(parsed))
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
   getEdgeSingle : getEdgeSingle,
   getEdgesAll : getEdgesAll,
   getEdgesIn : getEdgesIn,
   getEdgesOut : getEdgesOut,
   hasEdge : hasEdge,
   
   isIsolated : isIsolated,
   isSource : isSource,
   isSink : isSink,
   
   listIsSource : listIsSource,
   listIsSink : listIsSink,
   listIsNotSource : listIsNotSource,
   listIsNotSink : listIsNotSink,
   listIsIsolated : listIsIsolated,
   listByInbound : listByInbound,
   listByOutbound : listByOutbound,
   transpose : transpose,
   
   fromJSON : fromJSON,
   toJSON : toJSON
  };
 }());

 return LooseEdge;
}());

if (typeof module != "undefined")
{
 module.exports = LooseEdge;
}

