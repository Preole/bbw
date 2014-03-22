
//CSS selectors for containers and links.
var CSS =
{
 TITLE : ".js-title",
 WLINK : ".js-wlink",
 RLINK : ".js-css-rlink",
 INVIS : ".js-css-invis",
 TRANSCLUDE : "p > img:only-child[alt='.']",
 
 CONTENTPOPUP : ".js-p-popup", //Should be merged with ".js-form"
 FORM : ".js-form", //For control buttons on each form
 CONTENT : ".js-content", //Wiki links -> Open wiki entry.
 INDEX : ".js-index", //Wiki links -> Post search results @ somewhere.
 TAG : ".js-tags", //Wiki links -> Post popup result @ a popup window.
 
 
 MODAL : ".js-modal",
};

//CSS classes for re-usable input controls.
var CSSI =
{
 //Text inputs
 OLDTITLE : ".js-i-old-title",
 TITLE : ".js-i-title",
 SRC : ".js-i-src",
 TAGS : ".js-i-tags",
 MIME : ".js-i-mime",
 
 //Checkboxes
 C_NAV : ".js-c-cfm-nav",
 C_DEL : ".js-c-cfm-del",
 S_CASE : ".js-c-search-case"
 
 //Buttons
 SAVE : ".js-b-save",
 CLOSE : ".js-b-close",
 CLOSEO : ".js-b-closeo",
 EDIT : ".js-b-edit",
 FINISH : ".js-b-finish",
 CANCEL : ".js-b-cancel",
 DELETE : ".js-b-delete",
}



/*
MIME type module; Has a function form and a direct property access form.
*/
var MIME = (function (){
 var hasOwn = Object.prototype.hasOwnProperty;
 var typeMap =
 {
  BBM : "text/x-bbm",
  HTML : "text/html",
  TEXT : "text/plain"
 };

 function MIME(typeStr)
 {
  if (hasOwn.call(typeMap, typeStr))
  {
   return typeMap[typeStr];
  }
  return typeMap.TEXT;
 }
 
 $.extend(MIME, typeMap);
}());

