var assert = require("assert");
var LooseEdge = require("./LooseEdge.js");
var fs = require("fs");
var json = fs.readFileSync("./LooseEdge.test.json", {encoding: "utf-8"});
var digraph = LooseEdge(json);

console.log(digraph);
console.log(digraph.listByInbound());
console.log(digraph.listByOutbound());