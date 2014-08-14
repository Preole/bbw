/* requires ../lib/lodash.min.js */



/**
 * See: https://gist.github.com/Preole/a8d797e74ce5f1438a9a
 * for complete comment.
 * @module LooseEdge
 * @main LooseEdge
 * @requires lodash
 */
$models.LooseEdge = (function (){

 function LooseEdge(json, selfLoop)
 {
  if (!(this instanceof LooseEdge))
  {
   return new LooseEdge(json, selfLoop);
  }
   this.selfLoop = !!selfLoop;
   this.EDGES = {};
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

  function getEdgeSingle(fromID, toID)
  {
   if (hasEdge.call(this, fromID, toID))
   {
    return this.EDGES[fromID][toID];
   }
  }
  
  function getEdgesAll()
  {
   return this.EDGES;
  }
  
  function getEdgesIn(nodeID)
  {
   return _.has(this.TRANS, nodeID) ? this.TRANS[nodeID] : {};
  }

  function getEdgesOut(nodeID)
  {
   return _.has(this.EDGES, nodeID) ? this.EDGES[nodeID] : {};
  }
  
  function hasEdge(fromID, toID)
  {
   var hasKey = _.has(this.EDGES, fromID);
   var hasVal = hasKey && _.has(this.EDGES[fromID], toID);
   return hasKey && hasVal;
  }
  
  function isIsolated(nodeID)
  {
   return isValidID.call(this, nodeID) &&
    (_.has(this.EDGES, nodeID) || _.has(this.TRANS, nodeID));
  }
  
  function isSink(nodeID)
  {
   return isValidID.call(this, nodeID) &&
    !_.has(this.EDGES, nodeID) &&
    _.has(this.TRANS, nodeID);
  }
  
  function isSource(nodeID)
  {
   return isValidID.call(this, nodeID) &&
    _.has(this.EDGES, nodeID) &&
    !_.has(this.TRANS, nodeID);
  }
  
  function listIsSource()
  {
   return _.difference(_.keys(this.EDGES), _.keys(this.TRANS)).sort();
  }
  
  function listIsSink()
  {
   return _.difference(_.keys(this.TRANS), _.keys(this.EDGES)).sort();
  }
  
  function listIsIsolated(nameList)
  {
   var nList = _.isObject(nameList) ? _.keys(nameList) : 
    _.isArray(nameList) ? nameList : [];
   var notAlone = _.union(_.keys(this.TRANS), _.keys(this.EDGES));
    
   return _.difference(nList.filter(isValidID, this), notAlone);
  }
  
  function listIsNotSource()
  {
   return _.keys(this.TRANS).sort();
  }
  
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
  
  function listByInbound()
  {
   return listByInboundOutbound.call(this);
  }
  
  function listByOutbound()
  {
   return listByInboundOutbound.call(this, true);
  }
  
  function transpose()
  {
   var temp = this.EDGES;
   this.EDGES = this.TRANS;
   this.TRANS = temp;
   
   return this;
  }
  
  function fromJSON(input)
  {
   var parsed = _.isString(input) ? JSON.parse(input) : input;
   if (_.isObject(parsed))
   {
    addEdges.call(this, parsed);
   }
   return this;
  }

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

