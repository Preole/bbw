/*
Invocation:

"""
node build.js
"""

From the main .js file, join all of its dependencies and sub-dependencies
in the right order.

Then, remove the require comments (Rudimentary dependency tool) from the 
source code.

Finally, from the HTML skeleton file, fuse the built .js and pre-written
.css file together into <script> and <style> tags respectively.
*/

var fs = require("fs"),
 fsOptW = {encoding : "utf8", mode : 438, flag : "w"},
 fsOptR = {encoding : "utf8", flag : "r"},
 combiner = require("jscombiner").combiner,
 fuse = require("fuse")

var jsIn = "./src/main.js";
var jsOut = "./src/html-dist/bbw.js";
var htmlIn = "./src/html-dist/main.html";
var htmlOut = "./dist/BareBonesWiki.html";
var regexReq = /\/\* requires [^\n]+[\n]+/g;


fs.writeFileSync(jsOut, combiner({
 entryFile : jsIn,
 delimiter : "\n\n"
}), fsOptW);

var srcCode = fs.readFileSync(jsOut, fsOptR).replace(regexReq, "");
fs.writeFileSync(jsOut, srcCode);

fuse.fuseFile(htmlIn, htmlOut, function () {});
fs.unlinkSync(jsOut);