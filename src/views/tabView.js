/* requires mainView.js */

$views.tabView = (function (){

 var $baseEle = $("#js-tabs"),
  $tabArea = $("#js-tabs-view"),
  $newBtn = $("#js-new-tab-btn"),
  $forkBtn = $("#js-fork-tab-btn");

 function selectTabClick(evt)
 {
  var $currEle = $(this),
   $otherTabs = $currEle.siblings();

  if ($(evt.target).is(".js-btn-dbl-close") && $otherTabs.length > 0)
  {
   if ($currEle.is($views.mainView.switchToTab()))
   {
    $views.mainView.switchToTab( $otherTabs.first().toggleActive(true) );
   }
   $baseEle.focus();
   $currEle.remove();
  }
  else
  {
   $otherTabs.toggleActive(false);
   $views.mainView.switchToTab($currEle.toggleActive(true));
   $views.mainView.focus();
  }
 }
 
 function newTabClick(evt)
 {
  newTab();
 }
 
 function forkTabClick(evt)
 {
  forkTab();
 }
 
 function newTab(title, frag)
 {
  var hList = null;
  if (_.isString(title))
  {
   hList = $models.HistoryList({
    callback : CTRL.viewEntry,
    params : [title, frag]
   });
  }
  else
  {
   hList = $models.HistoryList({
    callback : CTRL.viewHome, 
    params : []
   });
  }
  
  var $tabBtn = TMPL.dblButton()
   .data({hist : hList})
   .prependTo($tabArea)
   .toggleActive(true)
   .find(CSS.BTN)
   .focus()
   .end();

  $tabBtn.siblings().toggleActive(false);
  $views.mainView.switchToTab($tabBtn);
 }
 
 function forkTab()
 {
  var $tabBtn = $tabArea.findActive().clone(true),
   oldHistObj = $tabBtn.data().hist.getCurr(),
   newHistList = $models.HistoryList({
    callback : oldHistObj.callback,
    params : $.extend(true, [], oldHistObj.params)
   }); 

  $tabBtn.prependTo($tabArea)
   .data({hist : newHistList})
   .toggleActive(true)
   .find(CSS.BTN)
   .focus()
   .end();

  $tabBtn.siblings().toggleActive(false);
  $views.mainView.switchToTab($tabBtn);
 }
 
 function toggle()
 {
  $baseEle.toggleInvis();
  if ($baseEle.isVisible())
  {
   $baseEle.focus();
  }
 }

 $baseEle.toggleInvis(false);
 $tabArea.on(EV.CLICK, ".js-btn-dbl", selectTabClick).empty();
 $newBtn.on(EV.CLICK, newTabClick);
 $forkBtn.on(EV.CLICK, forkTabClick);
 
 return {
  newTab : newTab,
  forkTab : forkTab,
  toggle : toggle
 };
 
}());

