/* requires ../lib/lodash.min.js */

/*
A data structure mimicking web browser's page history function.
*/
$models.HistoryList = (function (){

 function isCallback(obj)
 {
  return _.isObject(obj) &&
   _.isFunction(obj.callback) && 
   _.isArray(obj.params);
 }
 
 function isSameCallback(obj1, obj2)
 {
  return isCallback(obj1) &&
   isCallback(obj2) &&
   obj1.callback === obj2.callback && 
   _.isEqual(obj1.params, obj2.params);
 }
 

 function HistoryList(histObj, maxSize)
 {
  if (!(this instanceof HistoryList))
  {
   return new HistoryList(histObj, maxSize);
  }
  this.maxSize = typeof maxSize === "number" ? maxSize : 10;
  this.currIndex = 0;
  this.histStack = [histObj];
  
  HistoryList.prototype.refresh.call(this, true);
 }
 
 HistoryList.isValid = isCallback;
 HistoryList.prototype = (function (){
 
  //Insert new history after current index.
  function push(histObj)
  {
   var isSame = _.isEqual(getCurr.call(this), histObj, isSameCallback);
   var result = doCallback(histObj);
   
   if (result && !isSame)
   {
    if (hasNext.call(this))
    {
     this.histStack = this.histStack.slice(0, this.currIndex + 1);
    }
    if (this.histStack.length >= this.maxSize)
    {
     this.histStack.shift();
    }
    this.currIndex = this.histStack.push(histObj) - 1;
    histObj.result = result;
   }
   return this;
  }
  
  function hasNext()
  {
   return this.currIndex < this.histStack.length - 1;
  }
  
  function hasPrev()
  {
   return this.currIndex > 0;
  }

  function prev()
  {
   if (hasPrev.call(this)) {this.currIndex -= 1;}
   return this;
  }

  function next()
  {
   if (hasNext.call(this)) {this.currIndex += 1;}
   return this;
  }
  
  function getCurr()
  {
   return this.histStack[this.currIndex];
  }
  
  function doCallback(histObj)
  {
   if (isCallback(histObj))
   {
    return histObj.callback.apply(histObj.thisArg, histObj.params);
   }
  }
  
  //Execute callback, return result. In case of no result, use the cache.
  function refresh(doSendRequest)
  {
   var req = getCurr.call(this);
   if (doSendRequest)
   {
    req.result = doCallback.call(this, req) || req.result;
   }
   return req.result;
  }
  
  function replaceCurr(histObj)
  {
   if (isCallback(histObj))
   {
    this.histStack[this.currIndex] = histObj;
   }
   return this;
  }
  
  return {
   push : push,
   prev : prev,
   next : next,
   hasPrev : hasPrev,
   hasNext : hasNext,
   getCurr : getCurr,
   replaceCurr : replaceCurr,
   refresh : refresh
  }; 
 }());
 
 return HistoryList;
}());


