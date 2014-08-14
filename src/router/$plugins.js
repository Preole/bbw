/* requires ../lib/$requires.js */
/* requires ../collections/$requires.js */



//jQuery convenience & alias plugins, plus CSS manipulation
(function ($){
 var protoExtend = (function (){
 
  function serializeObject()
  {
   var res = {};
   var hasOwn = Object.prototype.hasOwnProperty;

   $.each(this.serializeArray(), function (index, ele){
    var node = hasOwn.call(res, ele.name) ? res[ele.name] : void(0);
    
    if (node && $.isArray(node))
    {
     node.push(ele.value);
    }
    else if (node)
    {
     res[ele.name] = [node, ele.value];
    }
    else
    {
     res[ele.name] = ele.value;
    }
   });
   
   return res;
  }

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
   if (arguments.length > 0)
   {
    return this.val(this.val() + text + "\n");
   }
   return this.val("");
  }

  function findTitle()
  {
   return this.find("h1").first().text() || "No Title";
  }

  function findActive()
  {
   return this.find(".js-css-active");
  }

  function links()
  {
   return this.find(CSS.WLINK); //Grab wiki links.
  }

  function trans()
  {
   return this.find("p > img:only-child[alt='.']"); //Grab transclusion links.
  }

  function linksTrans()
  {
   return this.links().add(this.trans());
  }

  function tabify()
  {
   return this.find("a, input, label, video, audio, textarea, button")
    .attr("tabindex", 0)
    .end();
  }

  function isVisible()
  {
   return !this.hasClass("js-css-invis");
  }

  function toggleInvis(force)
  {
   return this.toggleClass("js-css-invis", force);
  }

  function toggleRedLink(force)
  {
   return this.toggleClass("js-css-rlink", force);
  }

  function toggleActive(force)
  {
   return this.toggleClass("js-css-active", force);
  }

  function toggleDisabled(force)
  {
   return this.each(function() {
    this.disabled = _.isBoolean(force) ? force : !this.disabled;
   });
  }

  return {
   checked : checked,
   filterChecked : filterChecked,
   findActive : findActive,
   findTitle : findTitle,
   isVisible : isVisible,
   log : log,
   serializeObject : serializeObject,
   
   trans : trans,
   links : links,
   linksTrans : linksTrans,
   
   tabify : tabify,
   toggleInvis : toggleInvis,
   toggleRedLink : toggleRedLink,
   toggleActive : toggleActive,
   toggleDisabled : toggleDisabled
  };
 }());

 $.fn.extend(protoExtend);
}(jQuery));



//jQuery BakaBakaMark Wiki Text integration plugin
(function ($){
 var prefix = "bbw-",
  maxVal = Math.pow(2, 20) - 1,
  htmlOpt = BBM.setOptions({
   CSS_PRE_ID : prefix, 
   CSS_WIKI : "js-wlink",
   MIN_HEADER : 1
  });
  
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
  var $frag = null;

  if (mime === MIME.WIKI)
  {
   htmlOpt.CSS_PRE_ID = newSeed(prefix);
   $frag = $($.parseHTML(BBM.compile(text)));
  }
  else if (mime === MIME.HTML)
  {
   $frag = $($.parseHTML(text, true));
  }
  else
  {
   $frag = $("<pre></pre>").text(text);
  }

  return $frag.find("a")
   .not(CSS.WLINK)
   .not(CSS.HLINK)
   .attr("target", "_blank")
   .end()
   .end()
   .end();
 }
 
 $.parseBBM = parseBBM;
}(jQuery));



//jQuery plugin for BareBonesWiki-specific DOM manipulation.
(function ($){
 var maxDepth = 10;
 var protoExtend = (function (){

  //For each wiki link in the set, title field = HREF attribute.
  function doLinkify(index, val)
  {
   var $e = $(val);
   if (!$e.is("a")) {return;}
   
   var title = $e.attr("href") || $e.data().title;
   if (title)
   {
    $e.data({title : title});
    $e.toggleRedLink(!DB.hasNode(title));
   }
  }

  function linkify()
  {
   this.add(this.links()).each(doLinkify);
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

  //Replace the transclusion link with content from the targeted entry.
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


  //Retrieves an array of titles targeted by transclusion links and
  //wiki links from this jQuery set.  
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

