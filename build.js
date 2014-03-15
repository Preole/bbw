/*
Invocation:

"""
node build.js
"""

From the main .js file, join all of its dependencies and sub-dependencies
in the right order.

Next, from the HTML skeleton file, fuse the built .js and pre-written
.css file together into <script> and <style> tags respectively.
*/

var fs = require("fs");
var fsOptW = {encoding : "utf8", mode : 438, flag : "w"};
var combiner = require("jscombiner").combiner;
var fuse = require("fuse");

var jsIn = "./src/$main.js";
var jsOut = "./src/html-dist/bbw.js";
var jsOutMin = "./src/html-dist/bbw.min.js"
var htmlIn = "./src/html-dist/main.html";
var htmlOut = "./dist/BareBonesWiki.html";


fs.writeFileSync(jsOut, combiner({
 entryFile : jsIn,
 delimiter : "\n\n\n\n"
}), fsOptW);

fuse.fuseFile(htmlIn, htmlOut, function () {});