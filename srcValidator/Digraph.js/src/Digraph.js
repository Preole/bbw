

//TODO: Add node set enumeration and manipulation methods, such as
//each, filter, map...
//TODO: Add two more option hashes; edgeProto, nodeProto.
var Digraph = (function (){

 var hasOwn = Object.prototype.hasOwnProperty;
 
 /**
  * An enumeration of edge types used in this directed graph. They will
  * enforce the following semantics within the graph.
  *
  * - "LOOSE": Edges and nodes have no relationship with each other.
  * - "HALF": Edges cannot have empty source endpoint. All outgoing edges
  *   are deleted from the node when it is removed.
  * - "FULL": Edges cannot have any endpoint left dangling. All edges related 
  *   to the node will be removed when the node is removed.
  * 
  * @property Digraph.prototype.EDGE_ENUM
  * @type {object}
  * @final
  */
 var EDGE_ENUM =
 {
  LOOSE : "loose",
  HALF : "half",
  FULL : "full"
 };
 
 //Polyfills & Type checking
 (function (){
  if (typeof Object.create === "function") {return;}
  
  var hasOwn = Object.prototype.hasOwnProperty;
  var F = function () {};
  
  Object.create = function (o, p) {
   if (o === null) 
   {
    throw Error("Cannot set a null [[Prototype]]");
   }
   if (typeof o !== "object" && typeof o !== "function")
   {
    throw TypeError("Argument must be an object");
   }
   
   
   
   F.prototype = o;
   var inst = new F();
   
   if (typeof p === "object" || typeof p === "function")
   {
    for (var each in p)
    {
     if (hasOwn.call(p, each))
     {
      inst[each] = p[each];
     }
    }
   }
   
   return inst;
  };
 })();

 (function (){
  if (typeof Object.keys === "function") {return;}
  
  Object.keys = function (obj)
  {
   if (!(typeof obj === "object" || typeof obj === "function") || obj === null)
   {
    throw new TypeError("Object.keys called on non-object");
   }
   var res = [];
   for (var each in obj)
   {
    if (own.call(obj, each)) {res.push(each);}
   }
   return res;
  };
 }());
 
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
  return (typeof obj === "function");
 }

 function isNum(obj)
 {
  return (typeof obj === "number" || obj instanceof Number);
 }
 
 
 /**
  * A basic directed graph class. It contains basic nodes and edges 
  * manipulation methods with a fairly readable JSON serialization.
  *
  * @class Digraph
  * @constructor Digraph
  * @param [options] {object}
  * A javascript object containing a selection of options for initialization.
  * The following fields are available:
  *
  * - `JSONSTR`
  
      If specified, fill the graph with data parsed from this object or 
      JSON string, gleaning from its `NODES` and `EDGES` properties.
  
  * - `SELFLOOP`
       
      If true, adding self-loops will not raise errors.
   
  * - `EDGETYPE`
  
      "full", "half", "loose"; One of `Digraph.prototype.EDGE_ENUM`.
      Refer to the property `EDGE_ENUM` for detailed behaviors.
      
  * - `EDGEPROTO`
  
      The prototype object for edge data in the graph; Specify this if 
      these edge data objects need to inherit from a class.
      
  * - `NODEPROTO`
  
      The prototype object for node data in the graph; Specify this for 
      the same reason as `EDGEPROTO`

  * @return {Digraph} a newly generated Digraph instance.
  */
 function Digraph(options)
 {
  if (!(this instanceof Digraph))
  {
   return new Digraph(options);
  }
  var opt = isObj(options) ? options || {};
  
  /**
   * Denotes whether the graph allows self-looping edges.
   * @property SELFLOOP
   * @final
   * @type {boolean}
   * @default false
   */
  this.SELFLOOP = !!opt.SELFLOOP;
  
  /**
   * Denotes the degree of tolerance for edges with dangling endpoint.
   * @property EDGETYPE
   * @final
   * @type {string}
   * @default "loose" or Digraph.prototype.EDGE_ENUM.LOOSE
   */
  this.EDGETYPE = hasOwn.call(EDGE_ENUM, opt.EDGETYPE) ? opt.EDGETYPE : EDGE_ENUM.LOOSE;

  /**
   * The prototype object to be used for node data objects, when importing a
   * graph from JSON string or plain javascript objects.
   * @property NODEPROTO
   * @final
   * @type {function}
   * @default {undefined}
   */
  this.NODEPROTO = opt.NODEPROTO;
  
  /**
   * The prototype object to be used for edge data objects, when importing a 
   * graph from JSON string or plain javascript objects.
   * @property EDGEPROTO
   * @final
   * @type {function}
   * @default {undefined}
   */
  this.EDGEPROTO = opt.EDGEPROTO;
  
  
  /**
   * A map of nodes' identifiers to their associated data.
   * 
   * Sample JSON for an employee catalog:
   * 
   * ```
   * {
   *  "Joe Smith" : 
   *  {
   *   "Name" : "Joe Smith",
   *   "Phone" : "3333-333333-3333",
   *   "EmploymentDateUTC : 8981214573
   *  }
   * }
   * ```
   *
   * @property NODES
   * @type {object}
   */
  this.NODES = {};
  
  /**
   * A map of directed edges, where the keys are the source nodes' ID, and the
   * values are objects. The keys of the nested objects are the destination
   * node's ID, and their values are the edge's associated data.
   *
   * Sample JSON of a inter-personal relationship graph:
   *
   * ```
   * {
   *  "A" : 
   *  {
   *   "B" : "Abuse",
   *   "C" : "Rivalry"
   *  },
   *  "B" :
   *  {
   *   "D" : "Friendship"
   *  }
   * }
   * ```
   *
   * @property EDGES
   * @type {object}
   */
  this.EDGES = {};
  this.TRANS = {};
  
  if (opt.JSONSTR)
  {
   Digraph.prototype.fromRoute.call(this, opt.JSONSTR);
  }
  
  return this;
 }

 Digraph.prototype = (function (){

  var funcObj =
  {
   addNode : addNodeRoute,
   rmNode : rmNodeRoute,
   getNode : getNode,
   hasNode : hasNode,
   
   addEdge : addEdgeRoute,
   rmEdge : rmEdgeRoute,
   setEdge : setEdge,
   getEdge : getEdge,
   hasEdge : hasEdge,
   getEdgesIn : getEdgesIn,
   getEdgesOut : getEdgesOut,
   getDegreesIn : getDegreesIn,
   getDegreesOut : getDegreesOut,
   
   listNodes : listNodes,
   listNodeKeys : listNodeKeys,
   listOrphansByKeys : listOrphansByKeys,
   listDirectionByKeys : listDirectionByKeys,
   
   
   transpose : transpose,
   toJSON : toJSON,
   fromJSON : fromRoute,
   
   
   EDGE_ENUM : EDGE_ENUM
  };

  
  function edgeCheck(fromID, toID)
  {
   //Type checking for graph types & Input parameters
   edgeCheckID.call(this, fromID, toID);   
   var existFrom = hasNode.call(this, fromID);
   var existTo = hasNode.call(this, toID);
   
   if (this.EDGETYPE === EDGE_ENUM.FULL && !(existFrom && existTo))
   {
    throw new TypeError("Both edge endpoints must exist in full-edge digraphs.");
   }
   if (this.EDGETYPE === EDGE_ENUM.HALF && !(existTo))
   {
    throw new TypeError("Source edge endpoint must exist in half-edge digraphs.");
   }
   if (!this.SELFLOOP && fromID === toID)
   {
    throw new TypeError("Self loops are disallowed in this digraph.")
   }
   return this;
  }

  function edgeCheckID(fromID, toID)
  {
   if (!(isStr(fromID) || isNum(fromID)) || !(isStr(toID) || isNum(toID)))
   {
    throw new TypeError("Edge endpoint identifiers must be strings or numbers.");
   }
  }


  /**
  * Adds a set of nodes into the graph.
  * @method addNode
  * @param obj {object} 
  * A mapping of node identifiers and their associated data values. The 
  * keys are the identifier, while the value is the data associated with 
  * the node.
  * @return {Digraph} The modified graph instance.
  */
  function addNodes(obj)
  {
   for (var key in obj)
   {
    addNode.call(this, key, obj[key]);
   }
   return this;
  }

  /**
   * Adds a node into the graph with a given identifier and a block
   * of data.
   * @method addNode
   * @param id {string} 
   * The identifier of the node.
   * @param [dataObj=null] {anything}
   * The data object of the node, which can be anything.
   * @return {Digraph} The modified graph instance.
   */
  function addNode(id, dataObj)
  {
   this.NODES[id] = arguments.length >= 2 ? dataObj : null;
   return this;
  }
  
  function addNodeRoute()
  {
   if (arguments.length >= 2)
   {
    addNode.apply(this, arguments);
   }
   return addNodes.apply(this, arguments);
  }


  /**
   * Kills a list of nodes, calling rmNode(id) for each identifier
   * in the array.
   * @method rmNode
   * @param idArray {Array of string} An array of identifier strings.
   * @return {Digraph} The modified graph instance.
   */
  function rmNodes(idArray)
  {
   for (var i = 0, ii = idArray.length; i < ii; i += 1)
   {
    rmNode.call(this, idArray[i]);
   }
   return this;
  }

  /**
   * Kills a node with a given identifier if it exists.
   * For full-edge Digraphs, all edges associated with this node will be
   * removed, while half-edge digraphs will remove all outgoing edges of
   * this node.
   * @method rmNode
   * @param id {string} The node's identifier string
   * @return {Digraph} The modified graph instance
   */
  function rmNode(id)
  {
   if (isStr(id))
   {
    delete this.NODES[id];
    
    if (this.EDGETYPE === EDGE_ENUM.FULL)
    {
     rmEdge.call(this, id);
     rmEdge.call(this, null, id);
    }
    else if (this.EDGETYPE === EDGE_ENUM.HALF)
    {
     rmEdge.call(this, id);
    }
   }
   return this;
  }

  function rmNodeRoute()
  {
   if (arguments[0] instanceof Array)
   {
    rmNode.apply(this, arguments);
   }
   return rmNodes.apply(this, arguments);
  }


  /**
   * Retrieves the data object of the node with the identifier id.
   * @method getNode()
   * @param id {string} The node's identifier string
   * @return {anything} 
   * The data associated with the node if the node exists. Returns 
   * `undefined` otherwise.
   */
  function getNode(id)
  {
   if (hasOwn.call(this.NODES, id)) {return this.NODES[id];}
  }
  
  /**
   * Determines whether a node with the identifier id exists.
   * @method hasNode()
   * @param id {string} The node's identifier string
   * @return {boolean} True if the node exists; false otherwise.
   */
  function hasNode(id)
  {
   return (hasOwn.call(this.NODES, id));
  }



  function addEdgesArray(key, strArr)
  {
   for (var i = 0, ii = strArr.length; i < ii; i += 1)
   {
    addEdge.call(this, key, strArr[i], null);
   }
   return this;
  }
  
  function addEdgesObj(key, obj)
  {
   for (var target in obj)
   {
    addEdge.call(this, key, target, obj[target]);
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
   * - string: The source 
   * - Array of strings: Adds a directed edge from node A to each node
   *   specified in the array. These edges' associated data will be the
   *   value `null`.
   * - Object: The keys denote the identifier of the destination node, 
   *   while the values denote any data associated with the edge object.
   * @return {Digraph}
   * The modified Digraph instance.
   * @throws {TypeError}
   * The same error as the three-parameter formulation.
   */
  function addEdges(obj)
  {
   for (var key in obj)
   {
    var targets = obj[key];
    
    if (isStr(targets))
    {
     addEdge.call(this, key, targets, null);
    }
    else if (isArray(targets))
    {
     addEdgesArray.call(this, key, targets);
    }
    else if (isObj(targets))
    {
     addEdgesObj.call(this, key, targets);
    }
   }
   return this;
  }

  /**
   * Adds one directed edge that points from node A to node B.
   * @method addEdge
   * @param fromID {string} Source node's identifier
   * @param toID {string} Destination node's identifier.
   * @param [data=null] {anything} Any data associated with the edge.
   * @return {Digraph} The modified Digraph instance.
   * @throws {TypeError} On one of the following situations:
   * - Full-edge graph & either endpoint has no node.
   * - Half-edge graph & source endpoint has no node.
   * - Self-loops in graphs that explicitly forbids it.
   * - Non-string identifiers in either fromID or toID.
   */
  function addEdge(fromID, toID, data)
  {
   edgeCheck.call(this, fromID, toID);
   
   var EDGES = this.EDGES[fromID] || {};
   var TRANS = this.TRANS[toID] || {};
   if (!hasOwn.call(this.EDGES, fromID))
   {
    this.EDGES[fromID] = EDGES;
   }
   if (!hasOwn.call(this.TRANS, toID))
   {
    this.TRANS[toID] = TRANS;
   }
   
   EDGES[toID] = data;
   TRANS[fromID] = data;
   
   return this;
  }
  
  function addEdgeRoute()
  {
   if (isStr(arguments[0]))
   {
    addEdge.apply(this, arguments);
   }
   return addEdges.apply(this, arguments);
  }



  function rmEdgesObj(key, obj)
  {
   for (var target in obj) 
   {
    rmEdge.call(this, key, target);
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
   * Kills all outbound edge for all nodes in this array, specified by their
   * identifier string.
   * @method rmEdge
   * @param idArray {Array} An array of string (identifiers).
   * @return {Digraph} The modified Digraph instance.
   */
  function rmEdgesSrc(strArr)
  {
   for (var i = 0, ii = strArr.length; i < ii; i += 1)
   {
    rmEdge.call(this, strArr[i]);
   }
  }
  
  /**
   * Kills a set of directed edges specified by the object. The option object
   * used in `addEdge(idObject)` shall remove the set of edges added by that 
   * object.
   * @method rmEdge
   * @param idObj {object or Array} The set of directed edges to remove.
   * @return {Digraph} The modified Digraph instance.
   */
  function rmEdges(obj)
  {
   for (var key in obj)
   {
    var targets = obj[key];
    if (isStr(targets))
    {
     rmEdge.call(this, key, targets);
    }
    else if (isArray(targets))
    {
     rmEdgesArray.call(this, key, targets);
    }
    else if (isObj(targets))
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
   * @return {Digraph} The modified Digraph instance.
   *
   */
  function rmEdge(fromID, toID)
  {
   var hasSrc = isStr(fromID) ? hasOwn.call(this.EDGES, fromID) : false;
   var hasSrcTrans = isStr(toID) ? hasOwn.call(this.TRANS, toID) : false;
   
   if (hasSrc && hasSrcTrans)
   {
    delete this.EDGES[fromID][toID];
    delete this.TRANS[toID][fromID];
   }
   else if (hasSrc)
   {
    for (var dest in this.EDGES[fromID])
    {
     if (hasOwn.call(this.TRANS, dest))
     {
      delete this.TRANS[dest][fromID];
     }
    }
    delete this.EDGES[fromID];
   }
   else if (hasSrcTrans)
   {
    for (var dest in this.TRANS[toID])
    {
     if (hasOwn.call(this.EDGES, dest))
     {
      delete this.EDGES[dest][toID];
     }
    }
    delete this.TRANS[toID];
   }
   return this;
  }

  function rmEdgeRoute()
  {
   if (isStr(arguments[0]))
   {
    rmEdge.apply(this, arguments);
   }
   else if (isArray(arguments[0]))
   {
    rmEdgesSrc.apply(this, arguments);
   }
   return rmEdges.apply(this, arguments);
  }


  /**
   * Resets the edges from one node to another, or one node to a set of other
     nodes. Effectively the same as calling `rmEdge()` and `addEdge()` in that 
     order with the same parameters.
   * @method setEdge
   * @param fromID {string or Array or object} 
   * @param [toID] {string}
   * @return {Digraph} The modified Digraph instance.
   */
  function setEdge()
  {
   rmEdgeRoute.apply(this, arguments);
   addEdgeRoute.apply(this, arguments);
   return this;
  }


  /**
   * Retrieves a specified set of edge objects.
   * @method getEdge
   * @param [fromID] {string} Identifier of the source node.
   * @param [toID] {string} Identifier of the destination.
   * @return {anything} 
   * - If both parameters are supplied, returns the data object of the edge.
   * - If only the first parameter is supplied, same as `getEdgesOut()`.
   * - If only the 2nd parameter is provided, same as `getEdgesIn()`.
   * 
   * Omitting parameters returns the entire edge set, where the keys
     denote the source node identifier. Each key points to another object, 
     where their keys are the destination nodes' identifier, and their 
     values the data object of that edge.
   */
  function getEdge(fromID, toID)
  {
   var argLen = arguments.length;
   var hasSrc = isStr(fromID);
   var hasDest = isStr(toID);
   
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
   edgeCheckID(fromID, toID);
   
   var hasKey = hasOwn.call(this.EDGES, fromID);
   var hasVal = hasKey && hasOwn.call(this.EDGES[fromID], toID);
   return hasKey && hasVal;
  }

  /**
   * Retrieves all incoming edge objects going into a particular node.
   * @method getEdgesIn
   * @param nodeID {string} The identifier of the node.
   * @return {Object} An object, where the keys represent the source of
   * of the edge, and the value represents any data associated with the
   * edge object. Returns undefined if the node doesn't exist.
   */
  function getEdgesIn(nodeID)
  {
   if (!isStr(nodeID) || !hasOwn.call(this.TRANS, nodeID)) {return;}
   return this.TRANS[nodeID];
  }

  /**
   * Retrieves all outgoing edge objects originating from a particular node.
   * @method getEdgesOut
   * @param nodeID {string} The identifier of the node.
   * @return {Object} An object, where the keys represent the destination
   * of the edge, and the value represents any data associated with the
   * edge object. Returns undefined if the node doesn't exist.
   */
  function getEdgesOut(nodeID)
  {
   if (!isStr(nodeID) || !hasOwn.call(this.EDGES, nodeID)) {return;}
   return this.EDGES[nodeID];
  }
  
  /**
   * Retrieves the number of incoming edges into a particular node.
   * @method getDegreesIn
   * @param nodeID {string} The identifier of the node.
   * @return {Number} The number of incoming edges for the given node ID.
   * Returns 0 if the node doesn't exist.
   */
  function getDegreesIn(nodeID)
  {
   var inEdges = getEdgesIn.call(this, nodeID);
   if (isObj(inEdges))
   {
    return Object.keys(inEdges).length;
   }
   return 0;
  }
  
  /**
   * Retrieves the number of outgoing edges from a particular node.
   * @method getDegreesOut
   * @param nodeID {string} The identifier of the node.
   * @return {Number} The number of outgoing edges for the given node ID.
   * Returns 0 if the node doesn't exist.
   */
  function getDegreesOut(nodeID)
  {
   var outEdges = getEdgesOut.call(this, nodeID);
   if (isObj(outEdges))
   {
    return Object.keys(outEdges).length;
   }
   return 0;
  }
  
  /**
   * List all node names within the graph.
   * @method listNodeKeys
   * @return {Array}
   * An array of strings (node keys) in sorted order.
   */
  function listNodeKeys()
  {
   return Object.keys(this.NODES).sort();
  }
  
  /**
   * List all nodes' data object within the graph.
   * @method listNodes
   * @return {Array} 
   * An array of anything, depending on the exact data stored within 
   * each node.
   */
  function listNodes()
  {
   var nodes = [];
   for (var key in this.NODES)
   {
    nodes.push(this.NODES[key]);
   }
   return nodes;
  }
  
  /**
   * List all orphaned nodes by key that have no inbound edges.
   * @method listOrphansByKey
   * @return {Array} 
   * An array of strings (node keys) in sorted order.
   */
  function listOrphansByKeys()
  {
   var nodes = this.NODES;
   var res = [];
   for (var key in nodes)
   {
    var edgesIn = getEdgesIn.call(this, key);
    if (isObj(edgesIn) && isEmpty(edgesIn))
    {
     res.push(key);
    }
   }
   
   return res.sort();
  }
  
  /**
   * List all nodes in order, then within each node, list the source node
   * of their inbound edges, or destination nodes of their outbound edges
   * by keys.
   * @method listDirectionByKey
   * @param [direction] {boolean}
   * If truthy, each node's inbound edge sources are listed; List each 
   * node's outbound edge target otherwise.
   * @return {Array} 
   * An array of objects with the following formulation, sorted by the 
   * node's name, then by the nodes their edges are connected to.
   *
   * ```
   * [
   *  {
   *   key : "targetNode", //Must be a string
   *   vals : ["srcNode1", "srcNode2"] //Must be an array of strings.
   *  }
   * ]
   * ```
   */
  function listDirectionByKeys(direction)
  {
   var srcList = Object.keys(this.EDGES).sort();
   var dirFunc = direction ? getEdgesIn : getEdgesOut;
   
   for (var i = 0, ii = srcList.length; i < ii; i += 1)
   {
    srcList[i] =
    {
     key : srcList[i],
     vals : Object.keys(dirFunc.call(this, srcList[i])).sort();
    }
   }
   return srcList;
  }

  /**
   * Reverse the direction of all edges in the graph.
   * @method transpose
   * @return {Digraph} The same Digraph transposed.
   */
  function transpose()
  {
   var temp = this.EDGES;
   this.EDGES = this.TRANS;
   this.TRANS = temp;
   
   return this;
  }

  /**
   * Generates a serializable view of the Digraph instance to be
   * turned into JSON string using JSON.stringify();
   * @method toJSON
   * @return {Object} The serializable version of the Digraph instance.
   */
  function toJSON()
  {
   return {
    SELFLOOP : this.SELFLOOP,
    EDGETYPE : this.EDGETYPE,
    NODES : this.NODES,
    EDGES : this.EDGES
   };
  }

  /**
   * Imports graph data with a JSON string or a plain javascript object.
   *
   * @method fromJSON
   * @param input {string or object} 
   * The graph data to import from. Effectively, it takes the `NODES` and 
   * `EDGES` property of the object and calls `addNodes()` followed by 
   * `addEdges()`.
   * @return {Digraph} The modified graph instance.
   * @throws {TypeError} 
   * If the import violates the semantic rules defined for edges in this 
   * graph, such as a graph containing self loops when it is explicitly
   * forbidden.
   */
  function fromRoute(input)
  {
   if (isStr(input))
   {
    fromJSON.call(this, input);
   }
   else if (isObj(input))
   {
    fromObj.call(this, input);
   }
   return this;
  }
  
  function fromJSON(str)
  {
   var that = this;
   fromObj.call(this, JSON.parse(str, reviveRoute));
   return this;
  }
  
  function fromObj(obj)
  {
   addNodeRoute.call(this, obj.NODES);
   addEdgeRoute.call(this, obj.EDGES);
   return this;
  }
  
  //TODO: Reviver...
  function reviveRoute(key, val)
  {
   if (key === "NODES") {reviveNode.call(this, key, val);}
   else if (key === "EDGES") {reviveEdge.call(this, key, val);}
  }
  
  function reviveEdge(key, val)
  {
   if (!isObj(this.EDGEPROTO)) {return;}
   for (var src in val)
   {
    var targets = val[src];
    for (var target in targets)
    {
     targets[target] = isObj(targets[target]) ?
      Object.create(this.EDGEPROTO, targets[target]) :
      targets[target];
    }
   }
   return val;
  }
  
  function reviveNode(key, val)
  {
   if (!isObj(this.NODEPROTO)) {return;}
   if (key === "NODES" && isObj(this.NODEPROTO) && isObj(val))
   {
    for (var key in val)
    {
     val[key] = isObj(val[key]) ? 
      Object.create(this.NODEPROTO, val[key]) :
      val[key];
    }
   }
   return val;
  }
  
  return funcObj;
 }());




 return Digraph;
}());

//Node.js module export.
if (typeof module === "object")
{
 module.exports = Digraph;
}

