function blinkElement(elementId, blinkColor, blinkDelay, blinkCount)
{
    try
    {
        blinkCount = blinkCount * 2 + 1;
        var txt = elementId;
        var originalColor = txt.style.color;
        var intervalID = setInterval(function() { txt.style.color = txt.style.color == originalColor ? blinkColor : originalColor; }, blinkDelay);
        setTimeout("clearInterval(" + intervalID + ");", blinkDelay * blinkCount);
    } catch(e) {}
}

function FriendSubmit(formid)
{
   var searchId = $get("qry_123");
   var oldSearchId = $get("f_first_name");
   var isSubmit = "false";	
   if(oldSearchId != null)
   {
    
	if (oldSearchBox.get_value() != "")
		isSubmit = "true";
	else
	blinkElement(oldSearchId, "red", "400", "3")
			
   }
   else
   {
   
  
	if (newSearchBox.get_value() != "")
	{
		isSubmit = "true";
	}
	else
	blinkElement(searchId, "red", "400", "3")
   
   } 
   if (isSubmit == "true")
   {
      var frmFindFriend = $get(formid);
	  frmFindFriend.submit();
   } 
}

function Menuage(){ 
 if(navigator.appVersion.indexOf("MSIE")==-1){
	 return;
	}
 var i,k,g,lg,r=/\s*hvr/,nn='',c,cs='hvr',bv='globalMenu';
 for(i=0;i<10;i++){
	 g=document.getElementById(bv+nn);
	 if(g){
 lg=g.getElementsByTagName("LI");
 if(lg){
	 for(k=0;k<lg.length;k++){
 lg[k].onmouseover=function(){
	 c=this.className;cl=(c)?c+' '+cs:cs;
	 this.className=cl;
	 this.style.zIndex = 10000;
 };
 lg[k].onmouseout=function(){
	 c=this.className;
 this.className=(c)?c.replace(r,''):'';};}}}nn=i+1;}
}

//Register namespace for Today On Myspace 
Type.registerNamespace("MySpace.Splash.Today");

//
// Define the control properties.
MySpace.Splash.Today.TabControl = function(element) 
{ 
    MySpace.Splash.Today.TabControl.initializeBase(this,[element]);
    this.tabContentDivs = new Array();
    this.tabIDs = null;
    this.tabsString = "";
    this.firstTab = null;
};

// Create the prototype for the control.
MySpace.Splash.Today.TabControl.prototype = {
    
    initialize : function() 
    {
        try
        {
            this.tabIDs = this.tabsString.split(",");
            
            var thisRef = this;
            for (var i=0; i< this.tabIDs.length; i++)
	        {
	            var tabId = this.tabIDs[i];
	            var tab = $get(tabId);
	            if(tab)    
	            {
	                tab.tabControl = this;
                    $addHandler(tab, "click", this.tab_OnClick);
	            
                    if (tab.className == "selected")
                    {
                        this.tabContentDivs[tabId] = $get(this.firstTab);
                    }
	            }
            }
        }
        catch(ex)
        {
        }            
    },
     
    dispose : function() 
    {
        try
        {
            if (this.tabIDs)
            {
                for (var i=0; i< this.tabIDs.length; i++)
	            {
	               var tab = $get(this.tabIDs[i]);
	               if(tab)    
	                  $clearHandlers(tab);
                }
            }
        }
        catch(ex)
        {
        }            
    },
    
    tab_OnClick : function()
    {
        try
        {
            var tabControl = this.tabControl;
            var tabID = this.id;
                
            for (var i=0; i < tabControl.tabIDs.length; i++)
            {
                var currentTabId = tabControl.tabIDs[i];
                var tab = $get(currentTabId);
                var tabContentDiv = tabControl.tabContentDivs[currentTabId];
                
                if(currentTabId == tabID)
                {
                    tab.className = "selected";

                    if (tabContentDiv)
                    {
                        tabContentDiv.style.display = "block";
                    }
                    else
                    {
                        tabControl._loadTab(tabID);
                    }
                }
                else
                {
                    tab.className = "";
                    
                    if (tabContentDiv)
                    {
                        tabContentDiv.style.display = "none";
                    }
                }
            }
        }
        catch(ex)
        {
        }
    },
    
    _loadTab : function(tabID)
    {
        var tabContentDiv =  document.createElement("div");
        tabContentDiv.className = "today_loading";
        this.tabContentDivs[tabID] = tabContentDiv;
        this.get_element().appendChild(tabContentDiv);

        if(!MySpace.CMS.cache[tabID]) MySpace.CMS.cache[tabID]={};

        var cacheItem = MySpace.CMS.cache[tabID];
        if(cacheItem && new Date() < cacheItem.expire)
        {
           this._onGetContentComplete(cacheItem.response, tabID);
        }
        else
        {
            var type = tabID.substring(5, tabID.length - 3);
            MySpace.WebRequest.invoke("myspace.com_files/puh_"+type+".html", true, "", Function.createDelegate(this, this._onGetContentComplete), Function.createDelegate(this, this._onGetContentFail), tabID, 0);
        }     
    },
    
    _onGetContentComplete :  function(response, eventArgs)
    {
        try
        {
            var tabID = eventArgs;
            
            var expire = new Date();
	        expire.setTime(expire.getTime()+120000);//2 minute cache
            MySpace.CMS.cache[tabID] = {response:response,expire:expire};

            var tabContentDiv = this.tabContentDivs[tabID];
            
            tabContentDiv.className = "";
            
            tabContentDiv.innerHTML = response;
            
            // Removed javascript parsing/execution because it slowed stuff down
            // get the javascript from the tab
            // var scriptFinder = /(<\s*script\b[^>]*>)([\s\S]*?)(<\/script>)/igm;
            
            // tabContentDiv.innerHTML = response.replace(scriptFinder, "");

            // var scripts = null;
            // var i = 0;
            // while (scripts = scriptFinder.exec(response))
            // {
            //     eval(scripts[2]);
            //     if (i++ > 5) break;
            // }
        }
        catch(ex)
        {
        }            
    },
    
    _onGetContentFail : function(eventArgs) 
    {
        try
        {
            var tabID = eventArgs;
            this.tabContentDivs[tabID].className = "";
            this.tabContentDivs[tabID].innerHTML = "";
        }
        catch(ex)
        {
        }            
    }
}

MySpace.Splash.Today.TabControl.registerClass("MySpace.Splash.Today.TabControl", Sys.UI.Control);
if (typeof(Sys) !== 'undefined') Sys.Application.notifyScriptLoaded();

///// End of today tab

// TopTenTab
function TopTenTab(title, name, selected, moreText, moreLink, charts)
{
    this.title = title;
    this.name = name;
    this.moreText = moreText;
    this.moreLink = moreLink;
    this.charts = charts;
    this.selectedChartIndex = 0;
    this.selected = false;
    
    for (var i = 0; i < this.charts.length; i++)
    {
        this.charts[i].isFirst = i === 0;
        this.charts[i].isLast = i === this.charts.length -1;
        this.charts[i].parent = this;
    }
}

TopTenTab.prototype.select = function()
{
    if (this.selected) { return; }
    
    var tabControl = $get(this.name + "Tab");
    if (tabControl === null) { return; }
    Sys.UI.DomElement.addCssClass(tabControl, "selected");
    this.selected = true;

    TopTen.topChartsViewMoreLink.title = this.moreText;
    TopTen.topChartsViewMoreLink.innerHTML = this.moreText;
    TopTen.topChartsViewMoreLink.href = this.moreLink;
    
    Sys.UI.DomElement.addCssClass(TopTen.topChartDiv, "top" + this.name);
    
    // Load the chart
    this.charts[this.selectedChartIndex].select();
};

TopTenTab.prototype.unselect = function()
{
    var tabControl = $get(this.name + "Tab");
    if (tabControl === null) { return; }
    Sys.UI.DomElement.removeCssClass(tabControl, "selected");
    this.selected = false;
    
    Sys.UI.DomElement.removeCssClass(TopTen.topChartDiv, "top" + this.name);
};

TopTenTab.prototype.selectChart = function(index)
{
    this.selectedChartIndex = index;
    this.charts[this.selectedChartIndex].select();
};

TopTenTab.prototype.previousChart = function()
{
    if (this.selectedChartIndex === 0) { return; }
    
    this.selectChart(this.selectedChartIndex -1);
};

TopTenTab.prototype.nextChart = function()
{
    if (this.selectedChartIndex === this.charts.length -1) { return; }
    
    this.selectChart(this.selectedChartIndex +1);
};

// TopTenChart
function TopTenChart(title, page, culture)
{
    this.title = title;
    this.page = page;
    this.items = null;
    this.culture = culture;

    this.isFirst = false;
    this.isLast = false;
}

TopTenChart.prototype.select = function()
{
    TopTen.currentChart = this;
    
    TopTen.topChartTitle.innerHTML = this.title;
    
    // Set previous/next buttons
    if (this.isFirst) 
    {
        Sys.UI.DomElement.addCssClass(TopTen.topChartPrevious, "disabled");
    }
    else
    {
        Sys.UI.DomElement.removeCssClass(TopTen.topChartPrevious, "disabled");
    }

    if (this.isLast) 
    {
        Sys.UI.DomElement.addCssClass(TopTen.topChartNext, "disabled");
    }
    else
    {
        Sys.UI.DomElement.removeCssClass(TopTen.topChartNext, "disabled");
    }
    
    TopTen.showLoading();

    // Load the chart items
    if (this.items === null)
    {
        this.getItems();   
    }
    else
    {
        TopTen.topTenList.innerHTML = this.getHTML();
        TopTen.showChart();
    }
};

TopTenChart.prototype.getItems = function()
{
    try
    {
        var chartCulture = (this.culture == null || this.culture == "") ? userCulture : this.culture;
        MySpace.Web.Modules.Splash.Services.TopTenService.GetTopTen(this.parent.name, this.page, chartCulture, this.getItems_onComplete, this.getItems_onFail, this);
    }
    catch(err)
    { 
        TopTen.showError();
    }
};

TopTenChart.prototype.getItems_onComplete = function(response, eventArgs)
{
    try
    {
        var chart = eventArgs;
        chart.items = response;
        
        if (TopTen.currentChart == chart)
        {
            TopTen.topTenList.innerHTML = chart.getHTML();
            TopTen.showChart();
        }        
    }
    catch(err)
    { 
        TopTen.showError();
    }
};
    
TopTenChart.prototype.getItems_onFail = function()
{
    TopTen.showError();
};

TopTenChart.prototype.getHTML = function()
{
    
    var listHtml = "";
    
    for (var i = 0; i < this.items.length; i++)
    {
        var item = this.items[i];

        listHtml += "<li><span class=\"listNumbers\">" + item.Rank + "</span> \
            <div class=\"artistImage\"> \
            <img src=\"" + item.ImageUrl + "\" alt=\"" + item.Name + "\" /></div> \
            <div class=\"artistRank\"><h4><a href=\"" + item.LinkUrl + "\" title=\"" + item.Name + "\">" + item.Name + "</a></h4> \
            <div class=\"genre\" style=\"width: " + item.Width + "%;\">" + item.Description + "</div></div></li>";
    }
    
    return listHtml;    
};

// TopTen
if (typeof TopTen != 'object') { TopTen = new Object(); }

TopTen.init = function()
{
    this.selectedTab = null;
    this.currentChart = null;
    this.topChartsViewMoreLink = $get("topChartsViewMoreLink");
    this.topChartDiv = $get("topChart");
    this.topChartTitle = $get("topChartTitle");
    this.topChartPrevious = $get("topChartPrevious");
    this.topChartNext = $get("topChartNext");
    this.topTenList = $get("topTenList");
    this.topChartLoading = $get("topChartLoading");
    this.topChartError = $get("topChartError");
}

TopTen.selectTab = function(tabName)
{
    try
    {
        if (this.selectedTab === null)
        {
            this.selectedTab = this.tabs[0];
        }
        
        for (var i = 0; i < this.tabs.length; i++)
        {
            if (this.tabs[i].name == tabName)
            {
                this.tabs[i].select();
                this.selectedTab = this.tabs[i];
            }
            else
            {
                this.tabs[i].unselect();
            }
        }
    }
    catch(err)
    {
        TopTen.showError();
    }    
};

TopTen.previousChart = function()
{
    try
    {
        if (this.selectedTab === null)
        {
            this.selectedTab = this.tabs[0];
        }
        
        this.selectedTab.previousChart();
    }
    catch(err)
    {
        TopTen.showError();
    }  
};

TopTen.nextChart = function()
{
    try
    {
        if (this.selectedTab === null)
        {
            this.selectedTab = this.tabs[0];
        }
        
        this.selectedTab.nextChart();
    }
    catch(err)
    {
        TopTen.showError();
    }  
};

TopTen.showLoading = function()
{
    try
    {
        if (TopTen.topTenList.clientHeight > 0) 
        {
            TopTen.topChartLoading.style.height = TopTen.topTenList.clientHeight + "px";
        }

        TopTen.topChartError.style.display = "none";
        TopTen.topTenList.style.display = "none";
        TopTen.topChartLoading.style.display = "block";
    }
    catch(err)
    {
        TopTen.showError();
    }        
};

TopTen.showError = function()
{
    try
    {
        TopTen.topChartError.style.display = "block";
        TopTen.topTenList.style.display = "none";
        TopTen.topChartLoading.style.display = "none";
    }
    catch(err)
    {
    }  
};

TopTen.showChart = function()
{
    try
    {
        TopTen.topChartError.style.display = "none";
        TopTen.topTenList.style.display = "block";
        TopTen.topChartLoading.style.display = "none";
    }
    catch(err)
    {
        TopTen.showError();
    }  
};


// <WebServiceGeneratedProxy Path="/Modules/Splash/Services/TopTenService.asmx">
Type.registerNamespace('MySpace.Web.Modules.Splash.Services');
MySpace.Web.Modules.Splash.Services.TopTenService=function() {
MySpace.Web.Modules.Splash.Services.TopTenService.initializeBase(this);
this._timeout = 0;
this._userContext = null;
this._succeeded = null;
this._failed = null;
}
MySpace.Web.Modules.Splash.Services.TopTenService.prototype={
GetTopTen:function(module,chart,culture,succeededCallback, failedCallback, userContext) {
return this._invoke(MySpace.Web.Modules.Splash.Services.TopTenService.get_path(), 'GetTopTen',false,{module:module,chart:chart,culture:culture},succeededCallback,failedCallback,userContext); }}
MySpace.Web.Modules.Splash.Services.TopTenService.registerClass('MySpace.Web.Modules.Splash.Services.TopTenService',Sys.Net.WebServiceProxy);
MySpace.Web.Modules.Splash.Services.TopTenService._staticInstance = new MySpace.Web.Modules.Splash.Services.TopTenService();
MySpace.Web.Modules.Splash.Services.TopTenService.set_path = function(value) { MySpace.Web.Modules.Splash.Services.TopTenService._staticInstance._path = value; }
MySpace.Web.Modules.Splash.Services.TopTenService.get_path = function() { return MySpace.Web.Modules.Splash.Services.TopTenService._staticInstance._path; }
MySpace.Web.Modules.Splash.Services.TopTenService.set_timeout = function(value) { MySpace.Web.Modules.Splash.Services.TopTenService._staticInstance._timeout = value; }
MySpace.Web.Modules.Splash.Services.TopTenService.get_timeout = function() { return MySpace.Web.Modules.Splash.Services.TopTenService._staticInstance._timeout; }
MySpace.Web.Modules.Splash.Services.TopTenService.set_defaultUserContext = function(value) { MySpace.Web.Modules.Splash.Services.TopTenService._staticInstance._userContext = value; }
MySpace.Web.Modules.Splash.Services.TopTenService.get_defaultUserContext = function() { return MySpace.Web.Modules.Splash.Services.TopTenService._staticInstance._userContext; }
MySpace.Web.Modules.Splash.Services.TopTenService.set_defaultSucceededCallback = function(value) { MySpace.Web.Modules.Splash.Services.TopTenService._staticInstance._succeeded = value; }
MySpace.Web.Modules.Splash.Services.TopTenService.get_defaultSucceededCallback = function() { return MySpace.Web.Modules.Splash.Services.TopTenService._staticInstance._succeeded; }
MySpace.Web.Modules.Splash.Services.TopTenService.set_defaultFailedCallback = function(value) { MySpace.Web.Modules.Splash.Services.TopTenService._staticInstance._failed = value; }
MySpace.Web.Modules.Splash.Services.TopTenService.get_defaultFailedCallback = function() { return MySpace.Web.Modules.Splash.Services.TopTenService._staticInstance._failed; }
MySpace.Web.Modules.Splash.Services.TopTenService.set_path("/Modules/Splash/Services/TopTenService.asmx");
MySpace.Web.Modules.Splash.Services.TopTenService.GetTopTen= function(module,chart,culture,onSuccess,onFailed,userContext) {MySpace.Web.Modules.Splash.Services.TopTenService._staticInstance.GetTopTen(module,chart,culture,onSuccess,onFailed,userContext); }
var gtc = Sys.Net.WebServiceProxy._generateTypedConstructor;
if (typeof(MySpace.Web.Modules.Splash.Services.TopItem) === 'undefined') {
MySpace.Web.Modules.Splash.Services.TopItem=gtc("MySpace.Web.Modules.Splash.Services.TopItem");
MySpace.Web.Modules.Splash.Services.TopItem.registerClass('MySpace.Web.Modules.Splash.Services.TopItem');
}
// </WebServiceGeneratedProxy>

//-------------Login-----------------//

function doSubmit() {
    document.cookie="SplashDisplayName=1; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
    if (oneClick == 1) 
    {
	    oneClick = 0;
	    
	    if(loginText == null)
        {
            loginText = document.getElementById('LoginText');
        }
		loginText.innerText = preLoadLogin;	
		//alert('doSubmit' + preLoadLogin);				
		setTimeout('oneClick=1;', 8000);
	    //alert('doSubmit doing submit');
	    document.aspnetForm.submit();
	    //alert('submit done');
	    
	} 
}

function clearCookieAndHideGreeting()
{
    document.cookie="SplashDisplayName=1; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
    
    if (email != null)
    {
        email.value = "";
    }
    if (greetingDiv != null) 
    {
        greetingDiv.style.display="none";
    }
    return false;
}

function validate_form()
{
  if (validate_element(email) == false) return false;
  if (validate_element(password) == false) return false;
  if (validate_element(verification) == false) return false;
  return true;
}

function validate_element(elemObj)
{
  if (elemObj != null && validate_required(elemObj.value)==false)
  {
      elemObj.focus(); return false;
  }
  return true;
}

function validate_required(value)
{
   //var psw = document.getElementById('<%= Password_Textbox.ClientID %>');
   
   return (value==null|| value=="" ? false:true);
}       

function onWindowSubmit()
{
   var result = (typeof(validate_form) == "function" ? validate_form():true);
    if (result == false) {
        if(loginText == null)
        {
            loginText = document.getElementById('LoginText');
        }
        //alert('onWindowSubmit logging in');
        loginText.innerText = postLoadLogin;					
        //alert('onWindowSubmit login');
	    setTimeout('oneClick=1;', 8000);
        
    }
    return result;
}

function Email_Textbox_onKeyUp(e)
{
    var keyCode;
    if(window.event) { keyCode = window.event.keyCode; }
    else if(e) { keyCode = e.keyCode; }
    
    if(keyCode == 13)  { 
        password.focus();
    }
}

function Password_Textbox_onKeyUp(e)
{
    var keyCode;
    if(window.event) { keyCode = window.event.keyCode; }
    else if(e) { keyCode = e.keyCode; }
    if(keyCode == 13) { 
        if (onWindowSubmit() == true) { doSubmit(); }
    }
}

function RefreshCI()
{
     clearTimeout(timerID);
     var tb = document.getElementById(tbID);
     tb.value = '';
     var ci = document.getElementById(imageID);
     ci.src = url + "&r=" + ++i;
     timerID = self.setTimeout("RefreshCI()", secs * 1000);						    
}

function StartCITimer()
{
     timerID = self.setTimeout("RefreshCI()", secs * 1000);
}

//------------end login--------------//
