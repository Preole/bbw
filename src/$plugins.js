/* requires ./lib/jquery.min.js */
/* requires ./lib/bbm.min.js*/
/* requires DB.js */

/*
A few jQuery plugin for better integration with the wikitext parser and 
the database object.
*/
(function ($){

 var prefix = "bbm-",
  htmlOpt = BBM.setOptions({CSS_PRE_ID : prefix, CSS_WIKI : "js-wlink"}),
  maxVal = Math.pow(2, 20) - 1,
  maxDepth = 10;
 
 
 
 function randInt(min, max)
 {
  return Math.floor(min + Math.random() * (max + 1));
 }
 
 function newSeed(preStr)
 {
  var seed = preStr + randInt(0, maxVal);
  while (document.getElementById(seed))
  {
   seed = preStr + randInt(0, maxVal);
  }
  return seed;
 }

 


 $.parseBBM = function (text, mime){
 
  if (text instanceof jQuery) {return text;}
  if (typeof text !== "string" || typeof mime !== "string")
  {
   throw new TypeError("Missing mime type or input string to parse.");
  }
  if (/^text\/x-bbm$/i.test(mime))
  {
   htmlOpt.CSS_PRE_ID = newSeed(prefix);
   return $($.parseHTML(BBM.compile(text)));
  }
  if (/^text\/html$/i.test(mime))
  {
   return $($.parseHTML(text));
  }
  return $("<pre></pre>").text(text);
 };
 
 $.fn.linkify = function (){
  this.find(".js-wlink").each(function (){
   var $e = $(this);
   var title = $e.attr("href");
   if (title)
   {
    $e.data({title : title});
    if (!DB.get(title)) {$e.toggleClass("js-css-rlink", true);}
   }
   $e.toggleClass("css-wlink", true);
  });
  
  this.find("a").attr("tabindex", 0);
  
  return this;
 };

 $.fn.transclude = function (cycleStack){
  var cStack = cycleStack instanceof Array ? cycleStack : [];
  if (cStack.length > maxDepth)
  {
   return $("Maximum transclusion depth (" + maxDepth + ") reached.");
  }
  var $div = $("<div></div>");
  
  $div.append(this).find("p > img:only-child[alt='.']").each(function (){
   var $e = $(this),
    errMsg = "",
    url = str_.titleize($e.attr("src") || $e.data().title),
    wNode = DB.getNull(url);
   
   if (cStack.indexOf(url) !== -1)
   {
    errMsg = "Transclusion stopped by cycle: " + cStack.join(" ") + " " + url;
   }
   if (url.length <= 0)
   {
    errMsg = "Invalid transclusion target: Blank titles.";
   }
   if (errMsg.length > 0)
   {
    return $("<p></p>").text(errMsg).replaceAll($e.parent());
   }
   
   cStack.push(url);
   $.parseBBM(wNode.src, wNode.mime)
    .linkify()
    .transclude(cStack)
    .replaceAll($e.parent());
   cStack.pop(url);
  });
  
  return $div.children().unwrap();
 };

 
 //Two kinds of edges: Hyperlinks with classes, and images
 //that are alone in a paragraph with a special alt text.
 $.fn.getEdges = function (){
  var edges = {};
  this.find(".js-wlink, p > img:only-child[alt='.']").each(function (){
   var $e = $(this);
   var title = $e.attr("href") || $e.attr("src") || $e.data().title;
   if (title) {edges[title] = 1;}
  });
  
  return edges;
 };
 
 $.fn.log = function (text){
  this.val(this.val() + text + "\n");
  return this;
 };
 
 $.fn.unlog = function (){
  this.val("");
  return this;
 };

 $.fn.setOffset = function (offsetObj){
  return this.each(function (){
   this.style.left = offsetObj.left;
   this.style.top = offsetObj.top
  });
 };
 
 $.fn.getOffset = function (){
  var ele = this.get(0);
  if (!(ele instanceof HTMLElement)) {return;}
  
  var xPosition = 0;
  var yPosition = 0;
  while (ele)
  {
   xPosition += (ele.offsetLeft - ele.scrollLeft + ele.clientLeft);
   yPosition += (ele.offsetTop - ele.scrollTop + ele.clientTop);
   ele = ele.offsetParent;
  }
  return {left : xPosition, top: yPosition};
 };

}(jQuery));

