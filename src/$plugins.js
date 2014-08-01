/* requires ./lib/jquery.min.js */
/* requires ./lib/bbm.min.js*/
/* requires DB.js */

/*
jQuery plugins, CSS and event constants.
*/


//Application-specific events
var EVT =
{
 //Events for content view area.
 OPEN : "open",
 EDIT : "edit",
 CLOSEO : "closeO",
 CLOSE : "close",
 DELETE : "delete",
 CANCEL : "cancel",
 COMMIT : "finish",
 
 //Indexing & searching + search result view area.
 TAG : "tag",
 INDEX : "index",
 SEARCH : "search",
 
 //UI-specific IO.
 POST : "post",
 SAVE : "save",
 LOAD : "load",
 UPDATE : "update",
 EXPORT : "export",
 IMPORT : "import",
};

//Native GUI events
var EV =
{
 CLICK : "click",
 KEYDOWN : "keydown",
 CHANGE : "change"
};


//Class names without CSS syntax.
var CLS =
{
 WLINK : "js-wlink",
 
 MODAL : "js-modal",
 TAGS : "js-tags",
 CONTENT : "js-content",
 B_CLOSE : "js-b-close",
 B_SAVE : "js-b-save"
};

//CSS selector listing.
var CSS =
{
 WLINK : ".js-wlink",
 
 MODAL : ".js-modal",
 TAGS : ".js-tags",
 CTRL : ".js-ctrl",
 CONTENT : ".js-content",
 CONTENT_DELEGATE : ".js-tags, .js-content",
 B_CLOSE : ".js-b-close",
 B_SAVE : ".js-b-save"
};






/*jQuery convenience & alias plugins, plus CSS manipulation*/
(function ($){
 var protoExtend = (function (){
  
  function filterChecked()
  {
   return this.filter(":checked");
  }
  
  function checked(setChecked)
  {
   if (arguments.length >= 1)
   {
    return this.prop("checked", !!setChecked);
   }
   return this.prop("checked");
  }
  
  function log(text)
  {
   return this.val(this.val() + text + "\n");
  }
  
  function unlog()
  {
   return this.val("");
  }
  
  function placeUnder($target)
  {
   return this.setOffset($target.getOffset());
  }
  
  function links()
  {
   return this.find(CSS.WLINK);
  }
  
  function trans()
  {
   return this.find("p > img:only-child[alt='.']");
  }
  
  function linksTrans()
  {
   return this.links().add(this.trans());
  }
  
  function tabify()
  {
   this.find("a, input, textarea, button").attr("tabindex", 0);
   return this;
  }
  
  function toggleInvis(forceSwitch)
  {
   return this.toggleClass("js-css-invis", !!forceSwitch);
  }
  
  function toggleWikiLink(forceSwitch)
  {
   return this.toggleClass("js-css-wlink", !!forceSwitch);
  }
  
  function toggleRedLink(forceSwitch)
  {
   return this.toggleClass("js-css-rlink", !!forceSwitch);
  }
 
  //Position querying methods for use cases without css module in jQuery
  function getOffset()
  {
   var ele = this.get(0);
   if (!(ele instanceof HTMLElement)) {return;}
  
   var xPos = 0;
   var yPos = 0;
   while (ele)
   {
    xPos += (ele.offsetLeft - ele.scrollLeft + ele.clientLeft);
    yPos += (ele.offsetTop - ele.scrollTop + ele.clientTop);
    ele = ele.offsetParent;
   }
   return {left : xPos, top: yPos};
  }
  
  function setOffset(offsetObj)
  {
   return this.each(function (){
    this.style.left = offsetObj.left + "px";
    this.style.top = offsetObj.top + "px";
   });
  }



  return {
   filterChecked : filterChecked,
   checked : checked,
   log : log,
   unlog : unlog,
   
   trans : trans,
   links : links,
   linksTrans : linksTrans,
   
   tabify : tabify,
   toggleInvis : toggleInvis,
   toggleWikiLink : toggleWikiLink,
   toggleRedLink : toggleRedLink,
   
   setOffset : setOffset,
   getOffset : getOffset,
   placeUnder : placeUnder
  };
 }());

 $.fn.extend(protoExtend);
}(jQuery));



/*jQuery Wikitext integration plugin*/
(function ($){
 var prefix = "bbm-",
  maxVal = Math.pow(2, 20) - 1,
  htmlOpt = BBM.setOptions({CSS_PRE_ID : prefix, CSS_WIKI : CLS.WLINK});
  
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

 function parseBBM(text, mime)
 {
  if (text instanceof jQuery) {return text;}
  if (/^text\/x-bbm/i.test(mime))
  {
   htmlOpt.CSS_PRE_ID = newSeed(prefix);
   return $($.parseHTML(BBM.compile(text)));
  }
  if (/^text\/html/i.test(mime))
  {
   return $($.parseHTML(text, true));
  }
  return $("<pre></pre>").text(text);
 }
 
 $.parseBBM = parseBBM;
}(jQuery));



/*jQuery plugin for BareBonesWiki-specific DOM manipulation.*/
(function ($){
 var maxDepth = 10;
 var protoExtend = (function (){
 
  function doLinkify(index, val)
  {
   var $e = $(val);
   var title = $e.attr("href") || $e.data().title;
   if (title)
   {
    $e.data({title : title});
    $e.toggleRedLink(!DB.hasNode(title));
   }
   
   $e.toggleWikiLink(true);
  }
 
  function linkify()
  {
   this.links().each(doLinkify);
   this.tabify().each(doLinkify);
   return this;
  }
  
  function doTransclude(ele)
  {
   var $e = $(ele),
    cStack = this,
    errMsg = null,
    url = $e.attr("src") || $e.data().title,
    wNode = DB.getNode(url);
   
   
   if (cStack.length > maxDepth)
   {
    errMsg = "Maximum transclusion depth (" + maxDepth + ") reached.";
   }
   if (cStack.indexOf(url) !== -1)
   {
    errMsg = "Transclusion stopped by cycle: " + cStack.join(" ") + " " + url;
   }
   if (url.length <= 0)
   {
    errMsg = "Invalid transclusion target: Blank titles.";
   }
   if (errMsg)
   {
    return $("<p></p>").text(errMsg).replaceAll($e.parent());
   }
   
   cStack.push(url);
   $.parseBBM(wNode.src, wNode.mime)
    .transclude(cStack)
    .replaceAll($e.parent());
   cStack.pop(url);
  }
  
  function transclude(cycleStack)
  {
   var cStack = (cycleStack instanceof Array) ? cycleStack : [];
   var $div = $("<div></div>");
   
   $div.append(this)
    .trans()
    .toArray()
    .forEach(doTransclude, cStack);
   
   return $div.children().unwrap();
  }
  
  function doEdges(val)
  {
   var $e = $(val);
   return $e.attr("href") || $e.attr("src") || $e.data().title;
  }

  function getEdges()
  {
   return this.linksTrans().toArray().map(doEdges);
  }
  
  return {
   linkify : linkify,
   transclude : transclude,
   getEdges : getEdges
  };
 }());
 
 $.fn.extend(protoExtend);
}(jQuery));

