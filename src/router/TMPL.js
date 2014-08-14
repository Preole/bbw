/* requires $plugins.js */

//Generates HTML Snippets.
var TMPL = (function (){

 var dateObj = new Date(),
  $tHome = $($("#js-t-home-form").html()),
  $tViewTmp = $($("#js-t-viewTmp-form").html()),
  $tView = $($("#js-t-view-form").html()),
  $tEdit = $($("#js-t-edit-form").html()),
  $tTagField = $($("#js-t-tag-field").html()),
  $tDblButton = $($("#js-t-btn-dbl").html()),
  $tLinkW = $($("#js-t-wlink").html());
  
 var $tLI = $(document.createElement("li")),
  $tDD = $(document.createElement("dd")),
  $tDT = $(document.createElement("dt")),
  $tDL = $(document.createElement("dl")),
  $tUL = $(document.createElement("ul")),
  $tP = $(document.createElement("p"));

 function tOptions(valsList, textsList)
 {
  var texts = textsList ? textsList : valsList;
  var opts = [];
  
  _.forEach(valsList, function (val, index){
   opts.push(new Option(texts[index], valsList[index]));
  });

  return $(opts);
 }
 
 function tLinkW(displayText)
 {
  return $tLinkW.clone()
   .text(displayText)
   .attr("href", displayText)
   .data("title", displayText)
   .get(0);
 }
 
 function tLinksW(strList)
 {
  return _.map(strList, tLinkW);
 }
 
 function tLinksWSpace(strList)
 {
  var newLinks = [];
  _.forEach(tLinksW(strList), function (linkEle){
   newLinks.push(linkEle);
   newLinks.push("\n");
  });
  return newLinks;
 }
 
 function tDblButton(displayText)
 {
  return $tDblButton.clone()
   .find(".js-btn-dbl-main")
   .text(displayText)
   .end();
 }

 function tTagField(displayText)
 {
  return $tTagField.clone()
   .find("[name='tags']")
   .val(displayText)
   .attr("size", displayText.length)
   .end();
 }
  
 function tTagFields(strList)
 {
  return _.map(strList, tTagField);
 }
 
 function tLinksUL(strList)
 {
  var wrapped = $(tLinksW(strList)).wrap($tLI).parent();
  return $tUL.clone().append(wrapped);
 }
 
 function tLinksDL(objList, linkDT)
 {
  var $dl = $tDL.clone();
  
  _.forEach(objList, function (val, index){
   var $label = $tDT.clone(),
    vals = objList[index].vals,
    key = objList[index].key,
    $dd = $(tLinksW(vals)).wrap($tDD).parent();
  
   if (linkDT)
   {
    $label.append(tLinkW(key));
   }
   else
   {
    $label.text(key);
   }
  
   $dl.append($label).append($dd);
  });
  
  return $dl;
 }
 
 function viewTmpl(wNode, frag)
 {
  var $view = $tView.clone();
  var $frag = (frag || $.parseBBM(wNode.src, wNode.mime))
   .transclude()
   .linkify();
  
  $view.find("[name='title']").val(wNode.title);
  $view.find(".js-title").text(wNode.title);
  $view.find(".js-tags").append(tLinksWSpace(wNode.tags));
  $view.find(".js-content").append($frag);
  $view.find(".js-create-stamp")
   .text((new Date(wNode.created)).toLocaleString());
  $view.find(".js-edited-stamp")
   .text((new Date(wNode.edited)).toLocaleString());
  
  return $view.tabify();
 }
 
 function editTmpl(wNode, tagList)
 {
  var $edit = $tEdit.clone();

  $edit.find(".js-title-old").text(wNode.title);
  $edit.find("[name='oldTitle']").val(wNode.title);
  $edit.find("[name='title']").val(wNode.title);
  $edit.find("[name='src']").val(wNode.src);
  $edit.find("[name='mime']").val(wNode.mime || MIME.TEXT);
  $edit.find(".js-tags-select").append(tOptions(tagList));
  $edit.find(".js-tags-view").append( tTagFields(wNode.tags) );

  return $edit;
 }
 
 function viewTmpTmpl(displayTxt, $frag, editVal)
 {
  var $viewTmp = $tViewTmp.clone();
  $viewTmp.find(".js-title").text(displayTxt);
  $viewTmp.find(".js-content").append($frag || $());
  $viewTmp.find("[name='title']").val(editVal || "New Entry");
  return $viewTmp.tabify().linkify();
 }
 
 function indexFlatTmpl(displayTxt, strList)
 {
  var $links = tLinksUL(strList);
  return viewTmpTmpl(displayTxt, $links);
 }

 function indexNestTmpl(displayTxt, objList, linkGroup)
 {
  var $links = tLinksDL(objList, linkGroup);
  return viewTmpTmpl(displayTxt, $links);
 }
 
 function homeTmpl()
 {
  return $tHome.clone();
 }
 
 function textTmpl(text)
 {
  return $tP.clone().text(text);
 }
 
 return {
  home : homeTmpl,
  view : viewTmpl,
  edit : editTmpl,
  text : textTmpl,
  viewTmp : viewTmpTmpl,
  indexFlat : indexFlatTmpl,
  indexNest : indexNestTmpl,
  dblButton : tDblButton,
  tagField : tTagField
 };
}());
