
(function (){
var fs = require("fs");
var assert = require("assert");
var Digraph = require("./src/Digraph.js");

var cases =
{
 chains : chainCases,
 loops : loopCases,
 imports : importCases,
 nodes : nodeCases
};


//For methods that return the object itself, ensure that they always
//return the same object.
function chainCases()
{
 var g = Digraph();
 var g2 = g.addNode("A", 1)
  .addEdge("A", "B", 50)
  .addEdge({
   A : [1, 2, 3, 4, 5],
   B : [1, 2, 3, 4, 5]
  })
  .addNode({
   1 : 1,
   2 : 2,
   3 : 3,
   4 : 4,
   5 : 5
  });
  
 assert.strictEqual(g, g2);
}


//Should throw exceptions on self-loops when they're not allowed.
function loopCases()
{
 var g = Digraph();
 assert.throws(function (){
  g.addEdge("A", "A", 300)
  .addEdge("B", "B")
  .addEdge("C", "C");
 });
 
 g = Digraph(null, true);
 
 assert.strictEqual(300, g.addEdge("A", "A", 300)
  .getEdge("A", "A"));
}

//Basic node insertion and removal operations.
function nodeCases()
{
 var g = Digraph();
 assert.strictEqual(g, g.addNode("A", 1)
  .addNode("B", 2)
  .addNode("C", 3)
  .addNode("D", 4));
  
 assert.strictEqual(true, g.hasNode("A"));
 assert.strictEqual(false, g.hasNode("Nowhere"));
 assert.strictEqual(4, g.getNode("D"));
 assert.ok(!g.getNode(5));
 assert.ok(!g.getNode(6));
 
 assert.strictEqual(4, g.addNode("A", 4)
  .rmNode("A")
  .addNode("A", 4)
  .getNode("A"));

 assert.ok(!g.addNode("E", 4)
  .rmNode("E")
  .addNode("E", 4)
  .rmNode("E")
  .getNode("E"));

 //Numbers should be acceptable as node identifiers as well.
 assert.strictEqual(40, g.addNode(40, 40)
  .getNode(40));
}

//Basic importing; Make sure the states are consistent before and
//after importing.
function importCases()
{
 var g = Digraph().fromJSON(fs.readFileSync("./test.json",  {encoding : "utf-8"}));
 var g2 = Digraph().fromJSON(JSON.stringify(g.toJSON()));
 var g3 = Digraph().fromJSON(g.toJSON());
 
 assert.strictEqual(true, g.hasEdge("NodeA", "NodeB"));
 assert.strictEqual(true, g.getEdge("NodeB", "NodeF") instanceof Array);
 
 assert.deepEqual(g, g2);
 assert.deepEqual(g, g3);
 assert.deepEqual(g2, g3);
 assert.notStrictEqual(g, g2);
 assert.notStrictEqual(g, g3);
 assert.notStrictEqual(g2, g3);
}


for (var each in cases)
{
 cases[each]();
}


}());