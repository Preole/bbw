/* requires ./lib/jquery.min.js */

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
 INDEX : "index",
 SEARCH : "search",
 POST : "post",
 SAVE : "save",
 LOAD : "load",
 EXPORT : "export",
 IMPORT : "import"
};

//Native GUI events
var EV =
{
 CLICK : "click",
 KEYDOWN : "keydown",
 CHANGE : "change"
};

//Re-usable event handling functions.
var FUNC = (function (){

 function closeEle(evt)
 {
  var $e = $(this);
  
  $e.toggleClass("js-css-invis", true);
  $e.find("input[type='text'], textarea").val("");
  $e.find("a").attr("href", "");
 }

 return {CLOSE : closeEle};
}());

