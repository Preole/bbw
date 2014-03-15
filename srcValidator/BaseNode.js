

function Graph()
{
 this.nodes = Object.create(null);
 this.edges = Object.create(null);
}

Graph.prototype = (function (){

 var funcObj =
 {
 };
 
 function addNode(name, obj)
 {
  this.nodes[name] = obj;
 }
 
 function rmNode(name)
 {
  delete this.nodes[name];
  delete this.edges[name];
 }
 
 function addEdge(name, targetName)
 {
  if (this.nodes[name] === undefined)
  {
   throw ReferenceError("Outbound edge failed: " + name + " does not exist.");
  }
 
  var adjList = this.edges[name] || [];
  if (adjList.indexOf(targetName) === -1) {adjList.push(targetName);}
  this.edges[name] = adjList;
 }
 
 function addEdges(name, targetNames)
 {
  for (var i = 0, ii = targetNames.length; i < ii; i += 1)
  {
   addEdge.call(this, name, targetNames[i]);
  }
 }
 
 function rmEdge(name, targetName)
 {
  var adjList = this.edges[name];
  
  if (!(adjList instanceof Array)) {return;}
  if (typeof targetName === "string")
  {
   var index = adjList.indexOf(targetName);
   if (index >= 0)
   {
    return adjList.splice(index, 1);
   }
  }
  else
  {
   delete this.edges[name];
   return adjList;
  }
 }
 
 function rmEdges(name, targetNames)
 {
  for (var i = 0, ii = targetNames.length; i < ii; i += 1)
  {
   rmEdge.call(this, name, targetNames[i]);
  }
 }
 
 function get(name)
 {
  return (this.nodes[name]);
 }
 
 function outEdges(name)
 {
  return (this.edges[name] || []);
 }
 
 function inEdges(name)
 {
  var edges = this.edges;
  var inList = [];
  
  for (var src in edges)
  {
   var dests = edges[src];
   var index = dests.indexOf(name);
   
   if (index >= 0) inList.push(dests[index]);
  }
  return inList;
 }
 
 function orphans()
 {
  var edges = this.edges;
  var orph = [];
  
  for (var src in edges)
  {
   if (inEdges.call(this, src).length <= 0)
   {
    orph.push(src);
   }
  }
  
  return orph;
 }
 
 function backlinks()
 {
  var back = {}, edges = this.edges;
  for (var src in edges)
  {
   var dests = edges[src];
   for (var dest in dests)
   {
    if (!back[dest]) {back[dest] = [];}
    back[dest].push(src);
   }
  }
  
  var destList = obj_.keys(back).sort();
  for (var i = 0, ii = destList.length; i < ii; i += 1)
  {
   destList[i] =
   {
    key : destList[i],
    vals : back[destList[i]].sort()
   };
  }
  return destList;
 }
 
 

 return funcObj;
}());