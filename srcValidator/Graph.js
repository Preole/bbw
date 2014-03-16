


/* 
Graph JSON:
{
 "NODES" :
 {
  "NodeA" : ["data"],
  "NodeB" : 120
 },
 
 "EDGES" :
 {
  "NodeA" :
  {
   "NodeB" : ["data"]
  },
  "NodeB" :
  {
   "NodeC" : 1,
   "NodeD" : 2,
   "NodeE" : "Arbitrary data"
  }
 }
}

... Guess we need a redesign; A dedicated edge object?
Inbound edge (Reverse direction) is ridiculously expensive unless
we store a reverse edge for every inbound edge in a node.

New Graph JSON for edges:

{
 "NodeA" :
 {
  "NodeB" :
  {
   from : ["NodeA", "NodeX", "NodeC"],
   data : [Arbitrary data]
  }
 },
}

When serializing to JSON or accessing these edge objects, they shall
shall only store key and data value, rather than an object with two fields.
*/
  

var Graph = (function (){

 var hasOwn = Object.prototype.hasOwnProperty;
 
 //Polyfills
 (function (){
  Object.keys = Object.keys || function (obj)
  {
   if (!isObj(obj) || obj === null)
   {
    throw new TypeError("Object.keys called on non-object");
   }
   var res = [];
   for (var each in obj)
   {
    if (hasOwn.call(obj, each))
    {
     res.push(each);
    }
   }
   return res;
  };
 }());
 
 //Object supplements.
 function isObj(obj)
 {
  return (typeof obj === "object" || typeof obj === "function");
 }

 function isEmpty(obj)
 {
  for (var each in obj)
  {
   if (hasOwn(obj, each)) {return false;}
  }
  return true;
 }

 

 function Graph()
 {
  if (!(this instanceof Graph)) {return new Graph();}
  
  this.nodes = {};
  this.edges = {};
  return this;
 }

 Graph.prototype = (function (){

  var funcObj =
  {
   addNode : addNodeRoute,
   rmNode : rmNodeRoute
   addEdge : addEdgeRoute,
   rmEdge : rmEdgeRoute,
   setEdge : setEdge,
   
   has : has,
   get : get,
   
   adjacent : adjacent,
   neighborsOut : neighborsOut,
   neighborsIn : neighborsIn,
   getBacklinks : getBacklinks,
   getOrphans : getOrphans,
   
   
   toJSON : toJSON
  };
  
  //Array: A list of node names. Default data value: integer 1
  //Object: Each node name is mapped to an arbitrary data value.
  function addNodes(obj)
  {
   if (obj instanceof Array)
   {
    for (var i = 0, ii = obj.length; i < ii; i += 1)
    {
     addNode.call(this, obj[i], 1);
    }
   }
   else if (isObj(obj))
   {
    for (var key in obj) {addNode.call(this, key, obj[key]);}
   }
   
   return this;
  }
  
  //Adds a node with the label id and a custom data object. If omitted,
  //the integer "1" shall be the placeholder value.
  function addNode(id, dataObj)
  {
   this.nodes[id] = dataObj || 1;
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
  
  
  
  function rmNode(id)
  {
   delete this.nodes[id];
   delete this.edges[id];
   return this;
  }
  
  function rmNodes(idArray)
  {
   for (var i = 0, ii = idArray.length; i < ii; i += 1)
   {
    rmNode.call(this, idArray[i]);
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
  
  
  
  //Add directed edges specified by source : destination pairs.
  function addEdges(obj)
  {
   for (var key in obj)
   {
    var targets = obj[key];
    for (var target in targets)
    {
     addEdge.call(this, key, target, targets[target]);
    }
   }
   return this;
  }

  //Add a single directed edge with arbitrary data. (Integer 1 if omitted)
  function addEdge(fromID, toID, data)
  {
   if (!hasOwn.call(this.nodes, fromID))
   {
    throw new ReferenceError(fromID + " does not exist in graph.");
   }
   var edges = this.edges[fromID] || {};
   if (!hasOwn.call(this.edges, fromID))
   {
    this.edges[fromID] = edges;
   }
   edges[toID] = data;
   return this;
  }
  
  function addEdgeRoute()
  {
   if (arguments.length === 1)
   {
    addEdges.apply(this, arguments);
   }
   return addEdge.apply(this, arguments);
  }


  //Array: Kills all outbound edges for each specified node name.
  //Object: Kills all edges specified by source : destination pair.
  function rmEdges(obj)
  {
   if (obj instanceof Array)
   {
    for (var i = 0, ii = obj.length; i < ii; i += 1)
    {
     rmEdge.call(this, obj[i]);
    }
   }
   else if (isObj(obj))
   {
    for (var key in obj)
    {
     var targets = obj[key];
     for (var target in targets) {rmEdge.call(this, key, target);}
    }
   }
   return this;
  }
  
  //Kills the edge from node A to node B.
  //Kills all edges from node A if 2nd parameter is not a string.
  function rmEdge(fromID, toID)
  {
   var targets = getEdges.call(this, fromID) || {};
   if (arguments.length >= 2)
   {
    delete targets[toID];
   }
   else
   {
    delete this.edges[fromID];
   }
   return this;
  }
  
  function rmEdgeRoute()
  {
   if (typeof arguments[0] === "string")
   {
    rmEdge.apply(this, arguments);
   }
   return rmEdges.apply(this, arugments);
  }
  
  //Resets all outgoing edges of a particular node to a new set of edges.
  function setEdge(fromIDOrObj, toID, data)
  {
   rmEdgeRoute.apply(this, arguments);
   addEdgeRoute.apply(this, arguments);
   return this;
  }
  
  
  //Grab the data object of the edge from node A to node B;
  //If 2nd parameter is omitted, grab all outbound edges of node A.
  function getEdges(fromID, toID)
  {
   if (!hasOwn.call(this.edges, fromID))
   {
    return;
   }
   if (arguments.length === 1)
   {
    return this.edges[fromID];
   }
   if (arguments.length >= 2 && hasOwn.call(this.edges[fromID], toID))
   {
    return this.edges[fromID][toID];
   }
  }
  
  //Tests if there's an edge from A to B.
  function adjacent(fromID, toID)
  {
   return getEdges.call(this, fromID, toID) !== undefined;
  }
  
  //Retrieves all node objects node A is pointing to.
  function neighborsOut(fromID)
  {
   if (!hasOwn.call(this.edges, fromID)) {return;}
   
   var res = {};
   for (var key in this.edges[fromID])
   {
    res[key] = get.call(this, key);
   }
   return res;
  }

  //Retrieves all node objects pointing at node A.
  function neighborsIn(fromID)
  {
   var inbound = {}, edges = this.edges;
   for (var src in edges)
   {
    if (hasOwn.call(edges[src], fromID))
    {
     inbound[src] = get.call(this, src);
    }
   }
   return inbound;
  }

  function get(name)
  {
   if (hasOwn(this.nodes, name)) {return this.nodes[name];}
  }
  
  function has(name)
  {
   return (hasOwn(this.nodes, name));
  }
  
  //Returns all nodes in the graph as a single array.
  //If a callback function is provided, the callback function
  //gets to dedicate how to present the list.
  function list(callback)
  {
   var res = [];
   var nodes = this.nodes;
   
   for (var key in nodes)
   {
    if (typeof callback === "function")
    {
     callback.call(this, res, key, nodes[key]);
    }
    else
    {
     res.push(nodes[key]);
    }
   }
   return res;
  }
  
  function toJSON()
  {
   return {
    NODES : this.nodes,
    EDGES : this.edges
   };
  }
  
  

  return funcObj;
 }());
  
 
 
 if (module && module.exports)
 {
  module.exports = Graph;
 }
 
 return Graph;
}());

