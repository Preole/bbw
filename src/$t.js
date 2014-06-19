/* requires $plugins.js */

var $T = (function ()
{
 var d = new Date(),
  $tEdit = $($("#js-t-edit").html()),
  $tView = $($("#js-t-view").html()),
  $tDL = $($("#js-t-dl").html()),
  $tDT = $($("#js-t-dt").html()),
  $tDD = $($("#js-t-dd").html()),
  $tPara = $($("#js-t-para").html()),
  $tButton = $($("#js-t-button").html()),
  $tLinkW = $($("#js-t-wlink").html());
 
 function sigStr(msEdited, msCreated)
 {
  d.setTime(msEdited);
  var edited = d.toLocaleString();
  d.setTime(msCreated);
  var created = d.toLocaleString();
  return ("Edited: " + edited + " (Created: " + created + ")");
 }

 function t_edit(wNode)
 {
  var $edit = $tEdit.clone();
  $edit.find(".js-i-old-title").text("Editing \"" + wNode.title + "\"");
  $edit.find(".js-i-title").val(wNode.title);
  $edit.find(".js-i-src").val(wNode.src);
  $edit.find(".js-i-tags").val(wNode.tags.join("\n"));
  $edit.find(".js-i-mime").val(wNode.mime || DB.MIME.TEXT);
  $edit.data("title", wNode.title);
  return $edit;
 }

 function t_view(wNode, frag)
 {
  var $view = $tView.clone();
  var $frag = (frag || $.parseBBM(wNode.src, wNode.mime))
   .linkify()
   .transclude();
  
  $view.find(".js-title").text(wNode.title);
  $view.find(".js-subtitle").text(sigStr(wNode.edited, wNode.created));
  $view.find(".js-tags").append(t_links(wNode.tags));
  $view.find(".js-content").append($frag);
  $view.data("title", wNode.title);
  return $view;
 }

 function t_dl(labelStr, $frag)
 {
  return $tDL.clone()
  .append($tDT.clone().text(labelStr))
  .append($tDD.clone().append($frag));
 }
 
 function t_button(displayText)
 {
  return $tButton.clone().text(displayText);
 }

 function t_link(displayText)
 {
  return $tLinkW.clone()
   .text(displayText)
   .data("title", displayText)
   .attr("href", displayText);
 }
 
 function t_doLinks(acc, str, index, array)
 {
  return acc.add(t_link(str));
 }
 
 function t_links(strList)
 {
  return strList.filter(_.isString).reduce(t_doLinks, $());
 }
 
 function t_linksDD(strList)
 {
  return t_links(strList).wrap($tDD).parent();
 }
 
 function t_linksPara(strList)
 {
  return t_links(strList).wrap($tPara).parent();
 }

 /*
 Take an array of objects, which contains a display key and an array of
 strings to produce grouped lists of hyperlinks:
 [
  {
   key : "DisplayText"
   vals : ["Text1", "Text2", "Text3"]
  }, //[...]
 ]
 */
 function t_linksDL(objList, linkDT)
 {
  var $dl = $tDL.clone();
  for (var i = 0, ii = objList.length; i < ii; i += 1)
  {
   var $label = $tDT.clone(),
    vals = objList[i].vals,
    key = objList[i].key;
   
   if (linkDT) {$label.append(t_link(key));}
   else {$label.text(key);}
  
   $dl.append($label).append(t_linksDD(vals));
  }
  return $dl;
 }
 
 
 return {
  edit : t_edit,
  view : t_view,
  dl : t_dl,
  button : t_button,
  link : t_link,
  links : t_links,
  linksPara : t_linksPara,
  linksDL : t_linksDL
 };
}());
