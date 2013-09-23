/*       Source:  Local Cache                                                                 */
/*     Location:  rsrc:119701:nu_ll:/html/js/homefeed.js                                      */
/*      Machine:  10.16.140.110                                                               */
/*    Generated:  September 13th 2008 1:22:11 AM PDT                                          */
/*    HTTP Host:  static.ak.fbcdn.net                                                         */
/*       Locale:  nu_ll                                                                       */


function HomeFeed(newestStoryTime,oldestStoryTime,autoRefresh,tabset,tabIds,nonTabId,logMode,showLogModeOption){HomeFeed.instance=this;this.resetState();this.oldestStoryTime=oldestStoryTime||0;this.newestStoryTime=newestStoryTime||0;this.submenuShown=false;this.requestCount=0;this.requestLastSeen=0;this.currentDelay=HomeFeed.defaultDelay;this.logModeOptionShown=showLogModeOption;this.logMode=logMode;this.resetRefreshCount();this.setAutoRefresh(autoRefresh);this.tabset=tabset;this.nonTabId=nonTabId;this.tabIds=tabIds;this.timerHandle=null;this.newStoriesClass=null;PageTransitions.registerHandler(HomeFeed.pageTransitionHandler);}
HomeFeed.getInstance=function(){return HomeFeed.instance;}
HomeFeed.defaultDelay=10*1000;HomeFeed.inactiveDelay=300*1000;HomeFeed.defaultRefreshes=90;HomeFeed.intermittentDelay=7*1000;HomeFeed.LOC_REPLACE=1;HomeFeed.LOC_PREPEND=2;HomeFeed.LOC_APPEND=3;HomeFeed.pageTransitionHandler=function(uri){if(uri.getPath()=='/home.php'){var query=uri.getQueryData();var inst=HomeFeed.getInstance();if(inst){if('tab'in query){inst.resetState();inst.setTab(query.tab);if(query.tab==2){inst.setAutoRefresh(true);inst.showLogModeOption(true);inst.refreshLogMode(inst.logMode);}else{inst.refreshLogMode(false);}
if(inst.tabset){inst.tabset.selectTab(inst.tabIds[query.tab]);}
if(inst.nonTabId){CSS.removeClass($(inst.nonTabId),'HomeFeed_selected');}
inst.refresh(HomeFeed.LOC_REPLACE,{'new_request':1},true,true);return true;}else{var app=query.app_id||0;var friendList=query.fl||0;if(app||friendList){if(inst.tabset){inst.tabset.unselect();}
if(inst.nonTabId){CSS.addClass($(inst.nonTabId),'HomeFeed_selected');}
inst.resetState();inst.refreshLogMode(false);inst.showLogModeOption(false);if(app){inst.setApp(app);}
if(friendList){inst.setFriendList(friendList);}
inst.refresh(HomeFeed.LOC_REPLACE,{'new_request':1},true,true);return true;}}}}
return false;}
HomeFeed.prototype.resetState=function(){this.apps=[];this.friendLists=[];this.tabId=null;this.oldestStoryTime=0;this.newestStoryTime=0;if(this.timerSet){clearTimeout(this.timerHandle);}
this.timerSet=false;this.timerHandle=null;this.storyQueue=[];this.queueTimerHandle=null;this.newStoriesClass=null;this.clearStoryQueue();this.resetRefreshCount();this.setAutoRefresh(false);return this;}
HomeFeed.prototype.resetRefreshCount=function(){this.currentRefreshes=HomeFeed.defaultRefreshes;return this;}
HomeFeed.prototype.setLogMode=function(status,fireSignal){this.logMode=status;this.refreshLogMode(status);if(fireSignal){var data={'log_mode_pref':status?1:0,'log_mode_save':1};new AsyncSignal('/ajax/feed.php',data).send();}
return this;}
HomeFeed.prototype.refreshLogMode=function(logModeStatus){var wrapperEl=$('newsfeed_wrapper');if(logModeStatus){CSS.addClass(wrapperEl,'log_mode');CSS.removeClass(wrapperEl,'full_mode');}else{CSS.addClass(wrapperEl,'full_mode');CSS.removeClass(wrapperEl,'log_mode');}
return this;}
HomeFeed.prototype.addApp=function(appId){if(appId){if(this.apps.indexOf(appId)==-1){this.apps.push(appId);}}
return this;}
HomeFeed.prototype.removeApp=function(appId){if(this.apps.indexOf(appId)!=-1){this.apps.remove(appId);}
return this;}
HomeFeed.prototype.clearApps=function(){if(this.apps.length>0){this.apps=[];}
return this;}
HomeFeed.prototype.setApp=function(appId){this.clearApps().addApp(appId);return this;}
HomeFeed.prototype.addFriendList=function(flId){if(this.friendLists.indexOf(flId)==-1){this.friendLists.push(flId);}
return this;}
HomeFeed.prototype.removeFriendList=function(flId){if(this.friendLists.indexOf(flId)!=-1){this.friendLists.remove(flId);}
return this;}
HomeFeed.prototype.clearFriendLists=function(){this.friendLists=[];return this;}
HomeFeed.prototype.setFriendList=function(flId){this.clearFriendLists().addFriendList(flId);return this;}
HomeFeed.prototype.setTab=function(tabId){this.tabId=tabId;return this;}
HomeFeed.prototype.clearTab=function(){this.tabId=null;return this;}
HomeFeed.prototype.showSubmenu=function(text){set_inner_html($('newsfeed_submenu_content'),text);if(!this.submenuShown){$('newsfeed_submenu').removeClass('hidden_elem');}
this.submenuShown=true;this.refreshLogModeOption();return this;}
HomeFeed.prototype.hideSubmenu=function(){if(this.submenuShown){$('newsfeed_submenu').addClass('hidden_elem');}
this.submenuShown=false;return this;}
HomeFeed.prototype.showLogModeOption=function(status){this.logModeOptionShown=status;return this;}
HomeFeed.prototype.refreshLogModeOption=function(){var logModeOptionEl=$('newsfeed_submenu_log_mode_option');var logModeSelectedClass='log_mode_selected';if(this.logMode){$('newsfeed_submenu_headlines_only').addClass(logModeSelectedClass);$('newsfeed_submenu_full_stories').removeClass(logModeSelectedClass);}else{$('newsfeed_submenu_headlines_only').removeClass(logModeSelectedClass);$('newsfeed_submenu_full_stories').addClass(logModeSelectedClass);}
if(this.logModeOptionShown){logModeOptionEl.removeClass('hidden_elem');}else{logModeOptionEl.addClass('hidden_elem');}
return this;}
HomeFeed.prototype.loadOlder=function(){var extraData={'oldest':this.oldestStoryTime};this.refresh(HomeFeed.LOC_APPEND,extraData,true,false);return this;}
HomeFeed.prototype.loadNewer=function(){var extraData={'newest':this.newestStoryTime};this.refresh(HomeFeed.LOC_PREPEND,extraData,false,false);return this;}
HomeFeed.prototype.loadMore=function(start){var extraData={'more_from':start};this.refresh(HomeFeed.LOC_APPEND,extraData,false,false);return this;}
HomeFeed.prototype.autoRefreshFire=function(){this.timerSet=false;this.timerHandle=null;if(!this.autoRefresh){return;}
this.loadNewer();}
HomeFeed.prototype.autoRefreshHandler=function(){if(!this.autoRefresh||this.timerSet||!this.currentDelay){return;}
var delay=this.currentDelay;if(this.currentRefreshes<=0){delay=HomeFeed.inactiveDelay;}else{this.currentRefreshes--;}
this.timerSet=true;this.timerHandle=setTimeout(this.autoRefreshFire.bind(this),delay);}
HomeFeed.prototype.setAutoRefresh=function(status){if(!status&&this.timerSet){clearTimeout(this.timerHandle);this.timerHandle=null;}
this.autoRefresh=status;this.autoRefreshHandler();return this;}
HomeFeed.prototype.refresh=function(location,extraData,showIndicator,isTransition){var isAutoRefresh=this.autoRefresh;location=location||HomeFeed.LOC_REPLACE;showIndicator=(showIndicator===undefined)?true:showIndicator;isTransition=isTransition||false;var animOnDone=function(animObj){if(showIndicator&&!ge('feed_loading_image')){var loadEl=document.createElement('img');loadEl.src="/images/loaders/indicator_blue_large.gif";loadEl.id="feed_loading_image";var wrapperEl=$('newsfeed_wrapper');if(location==HomeFeed.LOC_APPEND){wrapperEl.parentNode.appendChild(loadEl);}else{wrapperEl.parentNode.insertBefore(loadEl,wrapperEl);}}
this.requestCount++;var requestNumber=this.requestCount;var loadStoriesHandler=function(asyncResponse){var payload=asyncResponse.getPayload();if(payload){if('newDelay'in payload){this.currentDelay=payload.newDelay;}
if('newRefreshCount'in payload){HomeFeed.defaultRefreshes=payload.newRefreshCount;}
if('newStoriesClass'in payload){this.newStoriesClass=payload.newStoriesClass;}
if(requestNumber!=this.requestCount){return;}
this.removeLoadingImage();this.removeErrorMessage();this.updateLastSeen(requestNumber);var wrapperEl=$('newsfeed_wrapper');var html=payload['html']||null;var stories=payload['stories']||[];if(html||(stories&&stories.length)){if('newestStoryTime'in payload&&payload['newestStoryTime']>this.newestStoryTime){this.newestStoryTime=payload['newestStoryTime'];}
if('oldestStoryTime'in payload&&(this.oldestStoryTime==0||payload['oldestStoryTime']<this.oldestStoryTime)){this.oldestStoryTime=payload['oldestStoryTime'];}
if('submenuText'in payload){this.showSubmenu(payload.submenuText);}else{this.hideSubmenu();}
this.refreshLogModeOption();if(stories&&stories.length){this._addStoriesToQueue(stories);}else if(html){var newDiv=document.createElement('div');set_inner_html(newDiv,html);newDiv.style.overflow='hidden';CSS.addClass(newDiv,this.newStoriesClass);this.updateWrapper(location,newDiv,false);}}}
if(isAutoRefresh){this.autoRefreshHandler();}}.bind(this);if(location!=HomeFeed.LOC_PREPEND){var bottomEl=ge('feed_bottom_links');if(bottomEl){bottomEl.parentNode.removeChild(bottomEl);}}
var postData=(typeof extraData=='object')?extraData:{};if(this.apps.length){postData['apps']=this.apps;}
if(this.friendLists.length){postData['fl']=this.friendLists;}
if(this.tabId){postData['tab']=this.tabId;}
var async=new AsyncRequest().setURI('/ajax/feed.php').setData(postData).setHandler(loadStoriesHandler).setErrorHandler(bind(this,this._refreshErrorHandler,location,requestNumber)).setTransportErrorHandler(bind(this,this._refreshErrorHandler,location,requestNumber)).setFinallyHandler(function(){if(isTransition){PageTransitions.transitionComplete();}});if(this.tabset){async.setContextData('src_tab_name',this.tabset.lastSelected).setContextData('dst_tab_name',this.tabset.selectedId);}
async.send();}.bind(this);var wrapperEl=$('newsfeed_wrapper');if(location==HomeFeed.LOC_REPLACE){set_inner_html(wrapperEl,'');}
animOnDone();}
HomeFeed.prototype.removeLoadingImage=function(){this._removeElementWithId('feed_loading_image');return this;}
HomeFeed.prototype.removeErrorMessage=function(){this._removeElementWithId('feed_error_wrapper');return this;}
HomeFeed.prototype._removeElementWithId=function(id){var el=ge(id);if(el){el.parentNode.removeChild(el);}
return this;}
HomeFeed.prototype.updateLastSeen=function(requestNumber){if(this.requestLastSeen<requestNumber){this.requestLastSeen=requestNumber;}}
HomeFeed.prototype._addStoriesToQueue=function(stories){this.storyQueue=this.storyQueue.concat(stories);this.startStoryQueue();}
HomeFeed.prototype.startStoryQueue=function(){if(this.queueTimerHandle){return;}
this._handleStoryQueue();}
HomeFeed.prototype.clearStoryQueue=function(){if(this.queueTimerHandle){clearTimeout(this.queueTimerHandle);}
this.storyQueue=[];}
HomeFeed.prototype._handleStoryQueue=function(){if(this.storyQueue.length){var len=this.storyQueue.length;var storiesToShow=Math.ceil(len/3);var stories=this.storyQueue.splice(0,storiesToShow);var html=stories.join('');var newDiv=document.createElement('div');set_inner_html(newDiv,html);newDiv.style.overflow='hidden';CSS.addClass(newDiv,this.newStoriesClass);this.updateWrapper(HomeFeed.LOC_PREPEND,newDiv,true);this.queueTimerHandle=null;if(this.storyQueue.length>0){this.queueTimerHandle=setTimeout(this._handleStoryQueue.bind(this),HomeFeed.intermittentDelay);}}}
HomeFeed.prototype._refreshErrorHandler=function(location,requestNumber,response){if(requestNumber!=this.requestCount){return;}
this.removeLoadingImage();this.updateLastSeen(requestNumber);var error=response.getError();if(error==kError_Async_NotLoggedIn){var title=tx('hf04');var msg=tx('hf02',{'login':'<a href="/login.php">'+tx('hf03')+'</a>'});new ErrorDialog().showError(title,msg);return;}
if(location==HomeFeed.LOC_PREPEND){return;}
var errorDiv=document.createElement('div');errorDiv.id='error';CSS.addClass(errorDiv,'error');set_inner_html(errorDiv,tx('hf01'));var newDiv=document.createElement('div');newDiv.id='feed_error_wrapper';newDiv.appendChild(errorDiv);this.updateWrapper(location,newDiv,false);return;}
HomeFeed.prototype.updateWrapper=function(location,element,animate){var wrapperEl=$('newsfeed_wrapper');if(location==HomeFeed.LOC_APPEND){wrapperEl.appendChild(element);}else if(location==HomeFeed.LOC_PREPEND){DOM.prependChild(wrapperEl,element);var startColor='#FFF9D7';var pauseColor='#FFFBE7';if(animate){animation(element).to('background',startColor).from(startColor).to('height','auto').from(0).ease(animation.ease.both).show().duration(500).to('opacity',0).from(0).checkpoint().to('opacity',1).from(0).ease(animation.ease.both).duration(750).checkpoint().to('background',pauseColor).from(startColor).duration(5000).checkpoint().duration(20000).checkpoint().to('background','#fff').from(pauseColor).duration(5000).go();}else{show(element);}}else{set_inner_html(wrapperEl,'');wrapperEl.appendChild(element);}
return this;}
onloadRegister(function(){var fn=function(){var inst=HomeFeed.getInstance();if(inst){inst.resetRefreshCount();inst.setAutoRefresh(inst.autoRefresh);}};window.onfocus=chain(window.onfocus,fn);window.onclick=chain(window.onclick,fn);});
if (window.Bootloader) { Bootloader.done(["js\/homefeed.js"]); }