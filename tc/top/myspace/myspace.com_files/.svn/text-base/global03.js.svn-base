
MySpace.MaintenanceKeys={};
MySpace.MaintenanceKeys.MSPLinksConvertAll = false;

// Swap all links on the page with an MSPLink, disable 
// by adding "var disableMSPLinks=1;" to the page
// THIS CODE MUST REMAIN AT THE TOP OF THE DOCUMENT!
if(!window.disableMSPLinks && MySpace.MaintenanceKeys.MSPLinksConvertAll){
  var changeLinksHrefRegex = new RegExp(/(\.|^)(myspace|msplinks)\.com$/i);
  var changeLinksProtocolRegex = new RegExp(/javascript:/i);
  for(var i = 0; i < document.links.length; i ++){ 
    var l = document.links[i];
    if(   !changeLinksProtocolRegex.test(l.protocol) && !changeLinksHrefRegex.test(l.hostname)){
      l["oldHref"]=l.href;
      l.href="http://www.msplinks.com/" + l.href;
      l.onmousemove = function(){
       try{window.status=this["oldHref"];}catch(ex){}
      }
    }
  }
}

Type.registerNamespace("MySpace.Utils.Media");
MySpace.Utils.Media.loadStaticContent = function(){
    // Images
    var a_imgs = document.getElementsByTagName("img");
    for(var i = 0 ; i < a_imgs.length ; i++){
        if(a_imgs[i].getAttribute("source")){
	        a_imgs[i].src = a_imgs[i].getAttribute("source");
        }
    }
    
    // Flash Objects
    var a_objs = document.getElementsByTagName("object");
    if(a_objs){
        for(var i = 0 ; i < a_objs.length ; i++){
            if(a_objs[i].getAttribute("movie")){
                
                var url = a_objs[i].getAttribute("movie");
                
                try{//Try loading it using activeX method
                    a_objs[i].LoadMovie(0,url);
                    var disableAutoPlay = a_objs[i].getAttribute("disableAutoPlay");
                    if(disableAutoPlay == undefined || disableAutoPlay == ""){
                        a_objs[i].Play();
                    }
                    continue;
                }catch(e){
                }
                //Failed loading using activeX, continue loading by replacing the object
                
                var height = a_objs[i].getAttribute("height");
                var width = a_objs[i].getAttribute("width");
                var vars = "";
                var prms = a_objs[i].getElementsByTagName("param");
                for(var x = 0 ; x < prms.length ; x++){
                    try{
                        if(prms[x].getAttribute("name").toLowerCase() === "flashvars"){
                            vars = prms[x].getAttribute("value");
                            break;
                        }
                    }catch(e){
                    }
                }
                
                
                var so = new SWFObject(url, "obj"+Math.random(), width, height, "8", "#FFFFFF");
                
                if(vars){
                    var keyvalue = vars.split(/\&/);
                    for(var v = 0 ; v < keyvalue.length ; v++){
                        var kv = keyvalue[v].split("=");
                        if(kv.length == 2)
                            so.addVariable(kv[0],kv[1]);
                    }
                }
                
                var wrapper = document.createElement("div");
                a_objs[i].parentNode.insertBefore(wrapper,a_objs[i]);
                so.write(wrapper);
                a_objs[i].parentNode.removeChild(a_objs[i]);
            }
        }
    }
}

try{
    if(!MySpace.Application.keyDisabled("JS_ProfilePageStaticMediaPreloader"))
    {
        MySpace.Utils.Media.loadStaticContent();
    }
}catch(e){
}


Type.registerNamespace("MySpace.UI");

Date.prototype.addMilliseconds = function(value){
	/// <param name="value" type="Number" integer="true"></param>
	this.setTime(this.getTime() + value);return this;
}
Date.prototype.addSeconds = function(value){
	/// <param name="value" type="Number" integer="true"></param>
	this.addMilliseconds(value*1000);return this;
}
Date.prototype.addMinutes = function(value){
	/// <param name="value" type="Number" integer="true"></param>
	this.addMilliseconds(value*60000);return this;
}
Date.prototype.addHours = function(value){
	/// <param name="value" type="Number" integer="true"></param>
	this.addMilliseconds(value*3600000);return this;
}
Date.prototype.addDays = function(value){
	/// <param name="value" type="Number" integer="true"></param>
	this.setDate(this.getDate()+value);return this;
}
Date.prototype.addMonths = function(value){
	/// <param name="value" type="Number" integer="true"></param>
	this.setMonth(this.getMonth()+value);return this;
}
Date.prototype.addYears = function(value){
	/// <param name="value" type="Number" integer="true"></param>
	this.setFullYear(this.getFullYear()+value);return this;
}

//
MySpace.UI.hideElements = function(tagNames, TorF){
	/// <param name="value" type="Array" elementType="String"></param>
	/// <param name="TorF" type="Boolean"></param>
	for(var j=0;j<tagNames.length;j++){
		var t = document.getElementsByTagName(tagNames[j]);
		for(var i=0;i<t.length;i++){t[i].style.visibility = TorF? "hidden" : "";}
	}
}
//Generic window overlay
MySpace.UI._Overlay = function(element){
	/// <param name="element" domElement="true"></param>
	document.body.appendChild(element);
	MySpace.UI._Overlay.initializeBase(this,[element]);
}
MySpace.UI._Overlay.prototype = {
	_interval: null,_fadeIn: false,_opacity: 0,_max: 60,_fadeDelegate:null,_resizeHandler:null, _step:20,
	show: function(){MySpace.UI.hideElements(["iframe","object","embed","select"],true);this._fade(true);},
	hide: function(){MySpace.UI.hideElements(["iframe","object","embed","select"],false);this._fade(false);},

	add_fadeComplete:function(handler){
		/// <param name="fadeIn" type="Boolean"></param>
		this.get_events().addHandler("fadeComplete", handler);
	},
	remove_fadeComplete:function(handler){
		/// <param name="fadeIn" type="Boolean"></param>
		this.get_events().removeHandler("fadeComplete", handler);
	},

	initialize:function(){
		var element = this.get_element();
		element.id = "window_overlay";
		element.style.zIndex = "100000";
		element.style.width = "100%";
		this.set_opacity(0);
		Sys.UI.DomElement.setLocation(element,0,0);
		this._setHeight();
		this._resizeHandler = Function.createDelegate(this, this._setHeight);
		$addHandler(window, "resize", this._resizeHandler);
	},
	_setHeight: function(){
		var a=document.body.scrollHeight;//scrolled content
		var b=document.documentElement.clientHeight;//no scroll
		var c=document.documentElement.scrollHeight;//ie7 friendly
		a = ((a>c)?a:c);
		this.get_element().style.height=((a>b)?a:b)+"px";
	},
	_fade: function(fadeIn){
		/// <param name="fadeIn" type="Boolean"></param>
		this._fadeIn = fadeIn;
		if(fadeIn) {this._element.style.visibility='visible'; this._element.style.display='';} else {this._element.style.visibility='hidden'; this._element.style.display='none'; }
		if(!this._fadeDelegate)this._fadeDelegate = Function.createDelegate(this,this._tick);
		this._interval = window.setInterval(this._fadeDelegate, 100);
	},
	_tick: function(){
		if(!this._interval) return;
		var increase = this._step;
		if(!this._fadeIn) increase*=-1;
		var newOpacity = this._opacity + increase;
		if(newOpacity<0) newOpacity = 0;
		else if(newOpacity>this._max) newOpacity = this._max;
		this.set_opacity(newOpacity);
		if(newOpacity<=0 || newOpacity>=this._max){
			window.clearInterval(this._interval);
            var fadeComplete = this.get_events().getHandler("fadeComplete");
            if (fadeComplete) fadeComplete(this, Sys.EventArgs.Empty);
		}
	},
	get_opacity:function(){return this._opacity;},
	set_opacity: function(value){
		/// <param name="value" type="Number" integer="true"></param>
		this._opacity = value;
		var s = this.get_element().style;
		s.opacity = value*.01;
		s.filter = "alpha(opacity="+value+")";
		if(value===0) this.set_visible(false);
	},
	dispose:function(){
		$removeHandler(window, "resize", this._resizeHandler);
		this._fadeDelegate=null;
		MySpace.UI._Overlay.callBaseMethod(this, 'dispose');
	}
}
MySpace.UI._Overlay.registerClass('MySpace.UI._Overlay', Sys.UI.Control);
window.get_overlay = function(){if(!window._overlay)window._overlay=$create(MySpace.UI._Overlay,null,null,null,document.createElement("div"));return window._overlay;};



MySpace.UI._Popup = function(element){
	/// <param name="element" domElement="true"></param>
	this._box = element.firstChild;
	MySpace.UI._Popup.initializeBase(this,[element]);
}
MySpace.UI._Popup.prototype = {
	_box:null,
	_state:null,
	_defaultButton:null,
	_callback:null,
	_globalCss:null,
	_top:null,
	_left:null,
	
	get_top: function() {return this._top;},
	set_top: function(value) {this._top = value;},
	
	get_left: function() {return this._left;},
	set_left: function(value) {this._left = value;},

	get_state: function(){return this._state;},
	set_state: function(value){this._state = value;},

	get_title: function(){return this._box.childNodes[1].innerHTML;},
	set_title: function(value){this._box.childNodes[1].innerHTML = value;},

	get_content: function(){return this._box.childNodes[2].innerHTML;},
	set_content: function(value){if (typeof(value) === 'object') {this._box.childNodes[2].appendChild(value);} else {this._box.childNodes[2].innerHTML = value;}},

	get_callback: function(){return this._callback;},
	set_callback: function(value){this._callback = value;},

	add_button: function(text, isDefault){
		var b=document.createElement("input");
		b.type="button";
		b.value=text;
		if(isDefault)
			this._defaultButton = b;
		$addHandlers(b,{click:this._buttonClick},this);
		this._box.lastChild.appendChild(b);
		return b;
	},

	show: function(callBack){
		if(MySpace.UI._Popup._activePopup)throw "A Popup is already active.";
		if(callBack)this._callback = callBack;
		window.get_overlay().show();
		
		// control popup position through property settings
		if (this._top !== null && this._left !== null){
			this._element.style.top = this._top + 'px';
			this._element.style.left = this._left + 'px';
		}
		
		this._element.style.display='';
		this._element.style.visibility='visible';
		var exclude = MySpace.Utils.Selector.query("iframe,object,embed,select", this._element);
		for (var i=0;i<exclude.length;i++) {exclude[i].style.visibility='';}
		if(this._defaultButton)this._defaultButton.focus();
		MySpace.UI._Popup._activePopup = this;
		
		if (this._globalCss !== null){
			// add the style to fix the popup position
			this._top = (this._top == null ? this._element.offsetTop : this._top);							
			this._globalCss.addRule('.popup_wrapper', 'top:expression( (ignoreMe = document.body.scrollTop + ' + this._top + ') + "px" )');		
		}
	},
	_hide: function(){
		window.get_overlay().hide();
		this._element.style.display='none';
		MySpace.UI._Popup._activePopup=null;
		
		if (this._globalCss !== null)
			this._globalCss.removeRule(this._globalCss.rules.length-1);
	},
	_buttonClick: function(e){
		this._hide();
		var cb=this._callback;
		if(cb)cb(this, e);
	},
	initialize: function(){
		var element = this.get_element();
		//element should always have a parent because it should have been created by a template
		element.parentNode.removeChild(element);
		document.body.appendChild(element);
		this._box.firstChild.isCancel=true; //red-x
		$addHandlers(this._box.firstChild,{click:this._buttonClick},this);
		MySpace.UI._Popup.callBaseMethod(this, 'initialize');
		
		if (typeof(window.pageXOffset) === 'undefined'){
			for (var i = 0; i < document.styleSheets.length; i++){				
				if (/global(\d)*(\.debug)*\.css/.test(document.styleSheets[i].href)){					
					this._globalCss = document.styleSheets[i];					
				}
			}
		}
	},
	dispose: function(){
		var buttons = this._box.lastChild.childNodes;
		for(var i=0;i<buttons.length;i++)
			$clearHandlers(buttons[i]);
		MySpace.UI._Popup.callBaseMethod(this, 'dispose');
	}
}
MySpace.UI._Popup.registerClass('MySpace.UI._Popup', Sys.UI.Control);
MySpace.UI._Popup._activePopup=null;

MySpace.UI.Popup=function(){throw "Cannot instantiate static class.";}
MySpace.UI.Popup.create=function(content, title, callback){
	/// <param name="content" type="String"></param>
	/// <param name="title" type="String"></param>
	/// <param name="callback" type="Function" mayBeNull="true" optional="true"></param>
	/// <returns type="MySpace.UI.Popup"></returns>
	var temp=document.createElement("div");	
    temp.innerHTML="<div class='popup_wrapper' style='z-index:1000001;left:0px;width:100%;display:none;visibility:hidden;'><div class='popup_box'><a class='popup_x'></a><div class='popup_title'></div><div class='popup_content'></div><div class='popup_buttons'></div></div></div>";
	return $create(MySpace.UI._Popup,{title:title, content:content, callback:callback},null,null,temp.firstChild);
}

MySpace.UI.Popup.generic = function(message, buttonText, callback){
	/// <param name="message" type="String"></param>
	/// <param name="buttonText" type="String"></param>
	/// <param name="callback" type="Function" mayBeNull="true" optional="true"></param>
	/// <returns type="MySpace.UI.Popup"></returns>
	var template = document.createElement("div");
	var p = MySpace.UI.Popup.create(message,MySpaceRes.Common.Attention);
	p.add_button(buttonText);
	template.innerHTML=message;
	p.show(callback);
	return p;
}
MySpace.UI.Popup.alert = function(message, callback){
	/// <param name="message" type="String"></param>
	/// <param name="callback" type="Function" mayBeNull="true" optional="true"></param>
	new MySpace.UI.Popup.generic(message,MySpaceRes.Common.Ok,callback);
}
MySpace.UI.Popup.confirm = function(message, callback){
	/// <param name="message" type="String"></param>
	/// <param name="callback" type="Function" mayBeNull="true" optional="true"></param>
	var p=new MySpace.UI.Popup.generic(message,MySpaceRes.Common.Yes,callback);
	p.add_button(MySpaceRes.Common.No);
}
MySpace.UI.Popup.registerClass('MySpace.UI.Popup');



MySpace.WebRequest=function(){throw "Cannot instantiate static class.";}
MySpace.WebRequest.invoke = function(path, useGet, params, onSuccess, onFailure, userContext, timeout) {
	/// <param name="path" type="String"></param>
	/// <param name="useGet" type="Boolean"></param>
	/// <param name="params"></param>
	/// <param name="onSuccess" type="Function" mayBeNull="true" optional="true"></param>
	/// <param name="onFailure" type="Function" mayBeNull="true" optional="true"></param>
	/// <param name="userContext" mayBeNull="true" optional="true"></param>
	/// <returns type="Sys.Net.WebRequest"></returns>
	if (!params) params = {};
	var request = new Sys.Net.WebRequest();
	if (!useGet) {
		if(typeof params==="string")
		var body = (typeof params!=="string")? Sys.Serialization.JavaScriptSerializer.serialize(params) : params;
		if (body === "{}") body = "";
		request.set_body(body);
	}
	request.set_url(Sys.Net.WebRequest._createUrl(path, (useGet)?params:{}));

	request.add_completed(onComplete);
	if (timeout && timeout > 0) request.set_timeout(timeout);
	request.invoke();

	function onComplete(response, eventArgs) {
		if (response.get_responseAvailable()) {
			var statusCode = response.get_statusCode();

			var result = null;
			try {
				var contentType = response.getResponseHeader("Content-Type");
				if (contentType.startsWith("application/json"))
					result = response.get_object();
				else if (contentType.startsWith("text/xml"))
					result = response.get_xml();
				else result = response.get_responseData();
			} catch (ex) {}

			//handle errors
			if ((statusCode < 200) || (statusCode >= 300)) {
				if (onFailure) {
					if (!result) {
						result = new Sys.Net.WebServiceError(false , "WebRequest failed for an unknown reason.", "", "");
					}
					result._statusCode = statusCode;
					onFailure(result, userContext);
				}
				else {//dev doesn't want to handle the error, just alert it
					var error;
					if (result)
						error = result.get_exceptionType() + "-- " + result.get_message();
					else error = response.get_responseData();
					window.alert("WebRequest Failed: "+error);
				}
			}
			else if (onSuccess) {
				onSuccess(result, userContext);
			}
		}
		else {
			var msg;
			if (response.get_timedOut()) msg = "WebRequest timed out.";
			else msg = "WebRequest failed for an unknown reason.";

			if (onFailure) onFailure(new Sys.Net.WebServiceError(response.get_timedOut(), msg, "", ""), userContext);
			else alert(msg);
		}
	}
	return request;
}
MySpace.WebRequest.registerClass('MySpace.WebRequest');



MySpace.CMS=function(){throw "Cannot instantiate static class.";}
MySpace.CMS.cache={};
MySpace.CMS.getContent=function(placementId, callback, context){
	/// <param name="placementId" type="Number"></param>
	/// <param name="callback" type="Function" mayBeNull="true" optional="true"></param>
	/// <param name="context" type="Object" mayBeNull="true" optional="true"></param>
	var cacheItem=MySpace.CMS.cache[placementId];
	if(cacheItem && new Date() < cacheItem.expire) {
		callback(cacheItem.response);
		return null;
	}

	MySpace.WebRequest.invoke("/Modules/Common/HttpHandlers/CMS.ashx", false, "placementId="+placementId, _onComplete, null, context, 0);
	
	function _onComplete(response, eventArgs) {
		var expire = new Date();
		expire.setTime(expire.getTime()+120000);//2 minute cache
		MySpace.CMS.cache[placementId] = {response:response,expire:expire};
		if(callback) callback(response, eventArgs);
	}
	return null;
}
MySpace.CMS.track=function(id){
	/// <param name="id" type="String"></param>
	MySpace.WebRequest.invoke("/Modules/Common/HttpHandlers/CMSClick.ashx?_i="+id, true, null, null, Function.emptyFunction, null, 0);
}
MySpace.CMS.registerClass('MySpace.CMS');



if(!MySpace.Util){ MySpace.Util=function(){throw "Cannot instantiate static class.";} }
MySpace.Util.get_profileId=function(){
	var rs = "i";
	var urls = document.URL;
	urls = urls.replace(/'/g,"");
	var el = "friendID";
	var re = new RegExp( "\\?[\\w\\W]*"+ el +"=([^\\&\\?#]*)", rs);
	var arr = re.exec(urls);
	if(!arr) {
		elg = "groupID";
		var red = new RegExp( "\\?[\\w\\W]*"+ elg +"=([^\\&\\?#]*)", rs);
		arr = red.exec(urls);
	}
	if(arr && arr.length>1)
		return arr[1];
	else {
		var expr = /\/([\w]*)$/i;
		arr = expr.exec(urls);
			if(arr && arr.length>1) {
				return arr[1].toLowerCase();
			} else {
				return '';
			}
	}
}
MySpace.Util.registerClass('MySpace.Util');


//Sitewide implimentations of global controls
if(typeof MySpace.Cookies.MSCulture!=='undefined'){
	var d = new Date();
	
	if(typeof updateClientTimeZone !== 'undefined')
	{
	    if(updateClientTimeZone == 1)
	        MySpace.Cookies.MSCulture.get_values().timeZone=(d.getTimezoneOffset()/-60);
	}
    
	
	MySpace.Cookies.save(MySpace.Cookies.MSCulture,".myspace.com",new Date().addDays(7));
}

MySpace.CultureSwitchPrompt=function(){throw "Cannot instantiate static class.";}
MySpace.CultureSwitchPrompt.getContent=function(culture, callback, context){
	/// <param name="culture" type="String"></param>
	/// <param name="callback" type="Function" mayBeNull="true" optional="true"></param>
	/// <param name="context" type="Object" mayBeNull="true" optional="true"></param>		
	MySpace.WebRequest.invoke("/Modules/Common/HttpHandlers/CultureSwitch.ashx", false, "culture="+culture+"&userid="+MySpace.ClientContext.UserId, _onComplete, null, context, 0);
	
	function _onComplete(response, eventArgs) {
		if(callback) callback(response, eventArgs);
	}
	return null;
}
MySpace.CultureSwitchPrompt.registerClass('MySpace.CultureSwitchPrompt');


MySpace.UI.UserGuide=function(){
	throw "Cannot instantiate static class.";
}

MySpace.UI.UserGuide.create=function(content, title, callback){
	/// <param name="content" type="String"></param>
	/// <param name="title" type="String"></param>
	/// <param name="callback" type="Function" mayBeNull="true" optional="true"></param>
	/// <returns type="MySpace.UI.Popup"></returns>
	var temp=document.createElement("div");	
    temp.innerHTML="<div class='popup_wrapper'><div class='tooltipDivContent' id='divContent'><div class='userGuideTitle'></div><div class='userGuideDesc'></div><div class='userGuideCloseBtn'></div></div></div>";
	return $create(MySpace.UI._Popup,{title:title, content:content, callback:callback},null,null,temp.firstChild);
}

MySpace.UI.UserGuide.display = function(title, content){
	/// <param name="title" type="String"></param>
	/// <param name="content" type="String"></param>
	var p = MySpace.UI.UserGuide.create('','');
	var left = parseInt(document.getElementById("userGuide").offsetLeft);
	var top = parseInt(document.getElementById("userGuide").offsetTop);
	
	if (Sys.Browser.agent == Sys.Browser.InternetExplorer){
		left += 360;
		top += 270;
	}
	else if (Sys.Browser.agent == Sys.Browser.Firefox){
		left += 200;
	}
	
	p._element.innerHTML = "<div class='tooltipDivContent' id='divContent'><div class='userGuideTitle'></div><div class='userGuideDesc'></div><div class='userGuideCloseBtn'></div></div>";
	p._box = p._element.firstChild;
	p.set_top(top);
	p.set_left(left);
	p.set_title(title);
	p.set_content(content);
	p.add_button("close", true).isCancel=true;
	p.show(popupCallback);
			
	function popupCallback(sender, args){
		if (args.target.isCancel){
			return;
		}
	}
}

MySpace.UI.UserGuide.registerClass('MySpace.UI.UserGuide');

MySpace.UI.Header=function(){throw "Cannot instantiate static class.";}
MySpace.UI.Header.languageLinkClick=function(culture, domain, index){
	/// <param name="culture" type="String"></param>
	/// <param name="domain" type="String"></param>
	/// <param name="index" type="Number"></param>
	MySpace.CultureSwitchPrompt.getContent(culture, _contentRetrieved);
	function _contentRetrieved(content){
        var cspContent = Sys.Serialization.JavaScriptSerializer.deserialize(content);                                          
        var p=MySpace.UI.Popup.create('',''); 
        p._element.innerHTML = "<div class='popup_box2'><a class='popup_ex'></a><div class='popup_title'></div><div class='popup_content2'></div><div class='popup_buttons'></div></div>";
        p._box = p._element.firstChild;
        p.set_content(cspContent.content);
        p.set_title(cspContent.header);                                          
        p.add_button(cspContent.continuebtn);
        p.add_button(cspContent.cancelbtn, true).isCancel=true;
        p.set_state({culture:culture, domain:domain});
        p.addCssClass("popupChangeLanguage");
        p.show(_popupCallback);		
	}
	function _popupCallback(sender, args){		
	    var state=sender.get_state();    
		if(args.target.isCancel) {//clicked cancel
		    MySpace.Cookies.MSCulture.get_values().PreferredCulturePending=culture.replace("-","*");                	            		        
	        MySpace.Cookies.save(MySpace.Cookies.MSCulture,".myspace.com",new Date().addDays(7));		       
	        if(domain.length==0) 
	            window.location.reload(false);	        
            return;
        }		
        MySpace.Cookies.MSCulture.get_values().PreferredCulturePending=culture;                	
        MySpace.Cookies.MSCulture.get_values().PreferredCulture=culture;                	        
	    MySpace.Cookies.save(MySpace.Cookies.MSCulture,".myspace.com",new Date().addDays(7));	
	    //if they are logged in,there **SHOULD** be two radio buttons
	    var c=sender._box.childNodes[2].getElementsByTagName("input");
		if(c[1]!=null && c[1].checked) {//Persist user's language
			Sys.Net.WebServiceProxy.invoke("/Services/GeoLocation.asmx", "SavePreferredCulture", false, {culture:state.culture}, _goToDomain, _goToDomain, null, 0);
			return;
		}
		_goToDomain();
	}
	function _goToDomain(){//needed for callback
		if(domain.length > 0) window.location = "http://" + domain;		
		else window.location.reload(true);
	}
}
MySpace.UI.Header.gamesLinkClick=function(gamesLink){
    var prompt=MySpace.UI.Popup.create('','');
    prompt._element.innerHTML = "<div class='popup_box2'><a class='popup_ex'></a><div class='popup_title'></div><div class='popup_content2' style='padding:20px'></div><div class='popup_buttons'></div></div>";
    prompt._box = prompt._element.firstChild; 
    prompt.set_content(MySpaceRes.CultureSpecific.GamesPromptEnglish + "<div style='color:#039'>" + MySpaceRes.International.GamesPromptLocal + "</div>");
    prompt.set_title(MySpaceRes.International.GamesPromptTitle);                                          
    prompt.add_button(MySpaceRes.Header.Continue);
    prompt.add_button(MySpaceRes.Header.Cancel, true).isCancel=true;
    prompt.addCssClass("popupChangeLanguage");
    prompt.show(_popupCallback);		

    function _popupCallback(sender, args){		
        if(args.target.isCancel) {//clicked cancel
            return;
        }
        //redirect to games page
        window.location = gamesLink;
    }
}
MySpace.UI.Header.registerClass('MySpace.UI.Header');

MySpace.IM = function(){throw "Cannot instantiate static class.";}
MySpace.IM.get_info = function(){
	switch(Sys.Browser.agent) {
	case Sys.Browser.InternetExplorer:
		var objMySpaceIMX = new ActiveXObject("MySpaceIMX.MySpaceIMPlugin.1");
		if(typeof objMySpaceIMX === "undefined")
			return {ver:null,hasSkype:null};
		else {
			var IMVer = 100;
			if(objMySpaceIMX.GetMSIMVersion()) {
				IMVer = objMySpaceIMX.GetMSIMVersion();
				//Extract build num
				var verArr = IMVer.split(".");
				IMVer = parseInt(verArr[2],10);
			}
			return {ver:IMVer,hasSkype:(parseFloat(IMVer)>0)};
		}
	case Sys.Browser.Firefox:
		if(navigator.mimeTypes || navigator.mimeTypes.length) {
			var mType = navigator.mimeTypes["application/myspaceim.1"];
			if(mType) return {ver:719,hasSkype:true};
			mType = navigator.mimeTypes["application/myspaceim"];
			if(myType) return {ver:100,hasSkype:false};
		}
	case Sys.Browser.Safari:
	case Sys.Browser.Opera:
		//Currently cannot accurately tell if these browsers have IM or not
		//Cookie usually only set for IE but check just in case
		if(document.cookie && document.cookie.indexOf("imyspaceim") != -1)
			return {ver:100,hasSkype:null};
		else
			return {ver:-1,hasSkype:null};
	default:
		return {ver:null,hasSkype:null};
	}
}
MySpace.IM.openGetIM = function(winHeight,winWidth){
	/// <param name="winHeight" type="Number" integer="true"></param>
	/// <param name="winWidth" type="Number" integer="true"></param>
	var getIMurl = "http://www.myspace.com/Modules/IM/Pages/GetIM.aspx";
	var winLeft = (screen.availwidth-winWidth)/2;
	var winTop = (screen.availheight-winHeight)/2;
	window.open(getIMurl,null,'height='+winHeight+',width='+winWidth+',left='+winLeft+',top='+winTop+',status=no,toolbar=no,menubar=no,location=no');
}
MySpace.IM.openIMById = function(friendId){
	/// <param name="friendId" type="Number" integer="true"></param>
	var ver = MySpace.IM.get_info().ver;
	if (typeof ver !== "undefined" && ver != null) {
		window.location.href='myim:sendIM?uID=0&cID='+friendId;
	} else {
		MySpace.IM.openGetIM(475,600);
	}
}
MySpace.IM.openIM = function(){
	MySpace.IM.openIMById(MySpace.Util.get_profileId());
}

MySpace.UI.Tooltip = function (element){
	// Create the div element
	this._tipDiv = document.createElement("div");
	this._tipDiv.innerHTML = '<div class="innerwrapper origin_tl arrow_lt"><div class="closeButton"></div><div class="arrow"></div><div class="corner"></div><div class="top"></div><div class="content"></div></div>';
	this._tipDiv.className = 'tooltip';	
	MySpace.UI.Tooltip.initializeBase(this,[element]);
}
	
MySpace.UI.Tooltip.prototype = {
	_tipDiv: null,
	get_classes : function(){return this._tipDiv.firstChild.className;},
	set_classes : function(value){this._tipDiv.firstChild.className = value;},
	get_content : function(){return this._tipDiv.firstChild.lastChild.innerHTML;},
	set_content : function(value){this._tipDiv.firstChild.lastChild.innerHTML = value;},	
	get_tipDiv : function(){return this._tipDiv;},
	set_tipDiv : function(value){this._tipDiv = value;},	
	initialize : function(){		
        // Add the div element to the current object
		this._element.appendChild(this._tipDiv); 
		
		// attach a close event to the close button image
		$addHandler(this._tipDiv.firstChild,"click", Function.createDelegate(this,function(){this._tipDiv.style.display='none';}));
	},
	dispose : function(){
	  $clearHandlers(this._element);	  
	  MySpace.UI.Tooltip.callBaseMethod(this, 'dispose');
	},
    show : function(){
      this._tipDiv.style.display='block';
      
      var handler = this.get_events().getHandler('visibilityChanged');
        if(handler) {
            var eventArgs = new Sys.EventArgs();
            handler(this, eventArgs);
        }
    },
    hide : function(){
      this._tipDiv.style.display='none';
    },
    add_visibilityChanged : function(handler) {
        this.get_events().addHandler("visibilityChanged", handler);
    },
    remove_visibilityChanged : function(handler) {
        this.get_events().removeHandler("visibilityChanged", handler);
    }
}
MySpace.UI.Tooltip.registerClass('MySpace.UI.Tooltip', Sys.UI.Control);

Type.registerNamespace('MySpace.UI.TooltipBehavior');

MySpace.UI.TooltipBehavior.Hover = function(element)
{
   MySpace.UI.TooltipBehavior.Hover.initializeBase(this, [element]);
}

MySpace.UI.TooltipBehavior.Hover.prototype = {
	_hideDelay: 500,
	_showDelay: 0,
	_timerID: 0,
    
    get_hideDelay : function(){return this._hideDelay;},
	set_hideDelay : function(value){this._hideDelay = value;},
    get_showDelay : function(){return this._showDelay;},
	set_showDelay : function(value){this._showDelay = value;},

    initialize : function(){
        MySpace.UI.TooltipBehavior.Hover.callBaseMethod(this, 'initialize');
   
        // get a ref to the base element
        var el = this.get_element();
      
        // add a mouse out handler to the tool tip div
        $addHandler(el.lastChild,"mouseout", Function.createDelegate(this,this._delayedHide));
        $addHandler(el,"mouseover", Function.createDelegate(this,this._delayedShow));
        $addHandler(el,"mouseout", Function.createDelegate(this,this._delayedHide));        
   },
   dispose : function(){
        $clearHandlers(this.get_element().lastChild);
        $clearHandlers(this.get_element());
      
        MySpace.UI.TooltipBehavior.Hover.callBaseMethod(this, 'dispose');
   },
	_clearTimerID: function(){
		if (this._timerID){
			clearTimeout(this._timerID);
			this._timerID = 0;
		}
	},
	_hide: function(args){
		this.get_element().control.hide();
	},
	_delayedShow: function(e){
		this._clearTimerID();		
		this._timerID = window.setTimeout(Function.createDelegate(this,this._show),this._showDelay);
	},	
	_show: function(e){
		this.get_element().control.show();
	},
	_delayedHide: function(e){
		this._clearTimerID();		
		this._timerID = window.setTimeout(Function.createDelegate(this,this._hide),this._hideDelay);
	}
}

MySpace.UI.TooltipBehavior.Hover.registerClass('MySpace.UI.TooltipBehavior.Hover', Sys.UI.Behavior);

MySpace.UI.TooltipBehavior.AutoPos = function(element)
{
   MySpace.UI.TooltipBehavior.AutoPos.initializeBase(this, [element]);
}

MySpace.UI.TooltipBehavior.AutoPos.prototype = {
    _tipDiv: Function.emptyFunction,
    _quadrants: ["origin_br arrow_rb","origin_bl arrow_lb","origin_tr arrow_rt","origin_tl arrow_lt"],
    
    get_quadrants : function(){return this._quadrants;},
	set_quadrants : function(value){this._quadrants = value;},
    
    initialize : function(){
        MySpace.UI.TooltipBehavior.AutoPos.callBaseMethod(this, 'initialize');
   
        // get a ref to the base element
        var el = this.get_element();
                      
        // get the width and height of the tipDiv for positioning
        this._setTipDivWH(el.lastChild);                
        
        el.control.add_visibilityChanged(Function.createDelegate(this,this._setPos));                
   },
   dispose : function(){
      MySpace.UI.TooltipBehavior.AutoPos.callBaseMethod(this, 'dispose');
   },
   _setTipDivWH : function(tipDiv){
        var style = tipDiv.style;
        
        style.visibility = 'hidden';
        style.display = 'block';        
        
        this._tipDiv.height = tipDiv.firstChild.clientHeight;
        this._tipDiv.width = tipDiv.firstChild.clientWidth;        
        
        style.display = 'none';
        style.visibility = 'visible';
   },
   _setPos : function(e){
    
        var el = this.get_element();
        var tipDiv = el.lastChild;
        
        el.Hover._clearTimerID();
        
        var minX = (typeof(window.pageXOffset) !== 'undefined') ? window.pageXOffset : document.documentElement.scrollLeft;
        var minY = (typeof(window.pageYOffset) !== 'undefined') ? window.pageYOffset : document.documentElement.scrollTop;
        var maxX = (window.innerWidth ? window.innerWidth : document.documentElement.clientWidth);
        var maxY = (window.innerHeight ? window.innerHeight : document.documentElement.clientHeight);
        
        var quadrant = 3;
                
        // determine the quadrant that the tooltip should appear in
        quadrant = (el.offsetLeft - this._tipDiv.width > minX ? 
                    (el.offsetTop - minY + this._tipDiv.height > maxY && el.offsetTop - (this._tipDiv.height) > minY ? 1 : 3) :
                      (el.offsetTop - minY + this._tipDiv.height > maxY ? 2 : 4));
                
        var posCss = this._quadrants[quadrant-1];
                
        tipDiv.firstChild.className = 'innerwrapper ' + posCss;
        tipDiv.style.display = 'block';   
   }   
}

MySpace.UI.TooltipBehavior.AutoPos.registerClass('MySpace.UI.TooltipBehavior.AutoPos', Sys.UI.Behavior);

MySpace.UI.getElementsByClassName = function(className, element) {
    element = element || document;
    className = ' ' + className + ' ';
    var potentials = element.all || element.getElementsByTagName("*");
    var l = potentials.length, results = [], i;
    for (i = 0; i < l; i++) {
        if ((' ' + potentials[i].className + ' ').indexOf(className) !== -1) {
            results[results.length] = potentials[i];
        }
    }
    return results;
};

MySpace.Timer=function(){
	MySpace.Timer.initializeBase(this);
	this._interval=1000;
	this._enabled=false;
	this._timer=null
};
MySpace.Timer.prototype={
	get_interval:function(){
		return this._interval
	},
	set_interval:function(a){
		if(this._interval!==a){
			this._interval=a;
			this.raisePropertyChanged("interval");
			if(!this.get_isUpdating()&&this._timer!==null)this.restartTimer()
		}
	},
	get_enabled:function(){
		return this._enabled
	},
	set_enabled:function(a){
		if(a!==this.get_enabled()){
			this._enabled=a;
			this.raisePropertyChanged("enabled");
			if(!this.get_isUpdating())if(a)this._startTimer();
			else this._stopTimer()
		}
	},
	add_tick:function(a){
		this.get_events().addHandler("tick",a)
	},
	remove_tick:function(a){
		this.get_events().removeHandler("tick",a)
	},
	dispose:function(){
		this.set_enabled(false);
		this._stopTimer();
		MySpace.Timer.callBaseMethod(this,"dispose")
	},
	updated:function(){
		MySpace.Timer.callBaseMethod(this,"updated");
		if(this._enabled)this.restartTimer()
	},
	_timerCallback:function(){
		var a=this.get_events().getHandler("tick");
		if(a)a(this,Sys.EventArgs.Empty)
	},
	restartTimer:function(){
		this._stopTimer();
		this._startTimer()
	},
	_startTimer:function(){
		this._timer=window.setInterval(Function.createDelegate(this,this._timerCallback),this._interval)
	},
	_stopTimer:function(){
		window.clearInterval(this._timer);
		this._timer=null
	}
};
MySpace.Timer.registerClass("MySpace.Timer",Sys.Component);

//PreviewDragDrop.js
//----------------------------------------------------------
MySpace.UI._DragDropManager=function(){ };
MySpace.UI._DragDropManager.prototype={
	_instance:null,
	_events:null,
	add_dragStart:function(a){
		this.get_events().addHandler("dragStart",a)
	},
	remove_dragStart:function(a){
		this.get_events().removeHandler("dragStart",a)
	},
	get_events:function(){
		if(!this._events)this._events=new Sys.EventHandlerList;
		return this._events
	},
	add_dragStop:function(a){
		this.get_events().addHandler("dragStop",a)
	},
	remove_dragStop:function(a){
		this.get_events().removeHandler("dragStop",a)
	},
	_getInstance:function(){
		if(!this._instance){
			this._instance=new MySpace.UI.GenericDragDropManager;
			this._instance.initialize();
			this._instance.add_dragStart(Function.createDelegate(this,this._raiseDragStart));
			this._instance.add_dragStop(Function.createDelegate(this,this._raiseDragStop))
		}
		return this._instance
	},
	startDragDrop:function(dragSource,dragVisual,context){
		this._getInstance().startDragDrop(dragSource,dragVisual,context)
	},
	registerDropTarget:function(target){
		this._getInstance().registerDropTarget(target)
	},
	unregisterDropTarget:function(target){
		this._getInstance().unregisterDropTarget(target)
	},
	dispose:function(){
		delete this._events;
		Sys.Application.unregisterDisposableObject(this);
		Sys.Application.removeComponent(this)
	},
	_raiseDragStart:function(sender,eventArgs){
		var handler=this.get_events().getHandler("dragStart");
		if(handler)handler(this,eventArgs)
	},
	_raiseDragStop:function(sender,eventArgs){
		var handler=this.get_events().getHandler("dragStop");
		if(handler)handler(this,eventArgs)
	}
};
MySpace.UI._DragDropManager.registerClass("MySpace.UI._DragDropManager");
MySpace.UI.DragDropManager=new MySpace.UI._DragDropManager;
MySpace.UI.DragDropEventArgs=function(dragMode,dragDataType,dragData){
	this._dragMode=dragMode;
	this._dataType=dragDataType;
	this._data=dragData;
};
MySpace.UI.DragDropEventArgs.prototype={
	get_dragMode:function(){
		return this._dragMode||null
	},
	get_dragDataType:function(){
		return this._dataType||null
	},
	get_dragData:function(){
		return this._data||null
	}
};
MySpace.UI.DragDropEventArgs.registerClass("MySpace.UI.DragDropEventArgs");
MySpace.UI.IDragSource=function(){
};
MySpace.UI.IDragSource.prototype={
	get_dragDataType:function(){
		throw Error.notImplemented()
	},
	getDragData:function(){
		throw Error.notImplemented()
	},
	get_dragMode:function(){
		throw Error.notImplemented()
	},
	onDragStart:function(){
		throw Error.notImplemented()
	},
	onDrag:function(){
		throw Error.notImplemented()
	},
	onDragEnd:function(){
		throw Error.notImplemented()
	}
};
MySpace.UI.IDragSource.registerInterface("MySpace.UI.IDragSource");
MySpace.UI.IDropTarget=function(){
};
MySpace.UI.IDropTarget.prototype={
	get_dropTargetElement:function(){
		throw Error.notImplemented()
	},
	canDrop:function(){
		throw Error.notImplemented()
	},
	drop:function(){
		throw Error.notImplemented()
	},
	onDragEnterTarget:function(){
		throw Error.notImplemented()
	},
	onDragLeaveTarget:function(){
		throw Error.notImplemented()
	},
	onDragInTarget:function(){
		throw Error.notImplemented()
	}
};
MySpace.UI.IDropTarget.registerInterface("MySpace.UI.IDropTarget");
MySpace.UI.DragMode=function(){
	throw Error.invalidOperation()
};
MySpace.UI.DragMode.prototype={
	Copy:0,Move:1
};
MySpace.UI.DragMode.registerEnum("MySpace.UI.DragMode");
MySpace.UI.GenericDragDropManager=function(){
	MySpace.UI.GenericDragDropManager.initializeBase(this)
};
MySpace.UI.GenericDragDropManager.prototype={
	_dropTargets:null,
	_radius:10,
	_activeDragVisual:null,
	_activeContext:null,
	_activeDragSource:null,
	_underlyingTarget:null,
	_oldOffset:null,
	_potentialTarget:null,
	_isDragging:false,
	_mouseUpHandler:null,
	_mouseMoveHandler:null,

	_scrollEdgeConst:40,
	_scrollByConst:10,
	_scroller:null,
	_scrollDeltaX:null,
	_scrollDeltaY:null,
	_keyPressHandler:null,
	
	add_dragStart:function(a){
		this.get_events().addHandler("dragStart",a)
	},
	remove_dragStart:function(a){
		this.get_events().removeHandler("dragStart",a)
	},
	add_dragStop:function(a){
		this.get_events().addHandler("dragStop",a)
	},
	remove_dragStop:function(a){
		this.get_events().removeHandler("dragStop",a)
	},
	initialize:function(){
		MySpace.UI.GenericDragDropManager.callBaseMethod(this,"initialize");
		this._mouseUpHandler=Function.createDelegate(this,this.mouseUpHandler);
		this._mouseMoveHandler=Function.createDelegate(this,this.mouseMoveHandler);
		this._keyPressHandler=Function.createDelegate(this,this.keyPressHandler);
		if(Sys.Browser.agent===Sys.Browser.Safari){
			MySpace.UI.GenericDragDropManager.__loadSafariCompatLayer(this);
		}
		this._scroller=new MySpace.Timer;
		this._scroller.set_interval(10);
		this._scroller.add_tick(Function.createDelegate(this,this.scrollerTickHandler))
			
	},
	dispose:function(){
		if(this._dropTargets){
			for(var a=0;a<this._dropTargets;a++)this.unregisterDropTarget(this._dropTargets[a]);
			this._dropTargets=null
		}
		MySpace.UI.GenericDragDropManager.callBaseMethod(this,"dispose")
	},
	startDragDrop:function(dragSource,dragVisual,context){
		this._activeDragSource=dragSource;
		this._activeDragVisual=dragVisual;
		this._activeContext=context;
			      
		var h=window._event;
		if(this._isDragging)return;
		this._underlyingTarget=null;
		var e={
			x:h.clientX,y:h.clientY
		};
		dragVisual.originalPosition=dragVisual.style.position;
		dragVisual.style.position="absolute";
		document._lastPosition=e;
		dragVisual.startingPoint=e;
		var i=this.getScrollOffset(dragVisual,true);
		dragVisual.startingPoint=this.addPoints(dragVisual.startingPoint,i);
		if(dragVisual.style.position=="absolute"){
			dragVisual.startingPoint=this.subtractPoints(dragVisual.startingPoint,Sys.UI.DomElement.getLocation(dragVisual));
		}
		else{
			var c=parseInt(dragVisual.style.left),d=parseInt(dragVisual.style.top);
			if(isNaN(c))c="0";
			if(isNaN(d))d="0";
			dragVisual.startingPoint=this.subtractPoints(dragVisual.startingPoint,{
				x:c,y:d
			});
		}
		this._prepareForDomChanges();
		dragSource.onDragStart();
		var j=new MySpace.UI.DragDropEventArgs(dragSource.get_dragMode(),dragSource.get_dragDataType(),dragSource.getDragData(context)),g=this.get_events().getHandler("dragStart");
		if(g)g(this,j);
		this._recoverFromDomChanges();
		this._wireEvents();
		this._drag(true)
	},
	_stopDragDrop:function(canceled){
		this._scroller.set_enabled(false);
			      
		var c=window._event;
		if(this._activeDragSource){
			this._unwireEvents();
			if(!canceled){
				canceled=this._underlyingTarget==null;
			}
			if(!canceled&&this._underlyingTarget){
				this._underlyingTarget.drop(this._activeDragSource.get_dragMode(),this._activeDragSource.get_dragDataType(),this._activeDragSource.getDragData(this._activeContext));
			}
			this._activeDragSource.onDragEnd(canceled);
			var b=this.get_events().getHandler("dragStop");
			if(b){
				b(this,Sys.EventArgs.Empty);
			}
			this._activeDragVisual.style.position=this._activeDragVisual.originalPosition;
			this._activeDragSource=null;
			this._activeContext=null;
			this._activeDragVisual=null;
			this._isDragging=false;
			this._potentialTarget=null;
			c.preventDefault()
		}
	},
	_drag:function(isInitialDrag){
		var d=window._event,c={
			x:d.clientX,y:d.clientY
		};
		document._lastPosition=c;
		var f=this.getScrollOffset(this._activeDragVisual,true),a=this.addPoints(this.subtractPoints(c,this._activeDragVisual.startingPoint),f);

		//Constrain to the page
		var dragVisualRect=Sys.UI.DomElement.getBounds(this._activeDragVisual);
		if(a.x<0){
			a.x=0;
		}else if(a.x+dragVisualRect.width>document.body.offsetWidth){
			a.x=document.body.offsetWidth-dragVisualRect.width;
		}
		if(a.y<0){
			a.y=0;
		}

		if(!isInitialDrag&&parseInt(this._activeDragVisual.style.left)==a.x&&parseInt(this._activeDragVisual.style.top)==a.y)return;
		Sys.UI.DomElement.setLocation(this._activeDragVisual,a.x,a.y);
		this._prepareForDomChanges();
		this._activeDragSource.onDrag();
		this._recoverFromDomChanges();
		this._potentialTarget=this._findPotentialTarget(this._activeDragSource,this._activeDragVisual);
		var b=this._potentialTarget!=this._underlyingTarget||this._potentialTarget==null;
		if(b&&this._underlyingTarget!=null)this._leaveTarget(this._activeDragSource,this._underlyingTarget);
		if(this._potentialTarget!=null){
			if(b){
				this._underlyingTarget=this._potentialTarget;
				this._enterTarget(this._activeDragSource,this._underlyingTarget)
			}
			else{
				this._moveInTarget(this._activeDragSource,this._underlyingTarget);
			}
		}
		else{
		       this._underlyingTarget=null
		}

		this._autoScroll()
	},
	_wireEvents:function(){
		Sys.UI.DomEvent.addHandler(document,"mouseup",this._mouseUpHandler);
		Sys.UI.DomEvent.addHandler(document,"mousemove",this._mouseMoveHandler);
		Sys.UI.DomEvent.addHandler(document,"keypress",this._keyPressHandler)
	},
	_unwireEvents:function(){
		Sys.UI.DomEvent.removeHandler(document,"keypress",this._keyPressHandler);
		Sys.UI.DomEvent.removeHandler(document,"mousemove",this._mouseMoveHandler);
		Sys.UI.DomEvent.removeHandler(document,"mouseup",this._mouseUpHandler)
	},
	registerDropTarget:function(target){
		if(!this._dropTargets)this._dropTargets=[];
		Array.add(this._dropTargets,target);
	},
	unregisterDropTarget:function(target){
		if(this._dropTargets)Array.remove(this._dropTargets,target)
	},
	mouseUpHandler:function(evt){
		window._event=evt;
		this._stopDragDrop(false)
	},
	mouseMoveHandler:function(evt){
		window._event=evt;
		this._drag()
	},
	keyPressHandler:function(evt){
		window._event=evt;
		var b=evt.keyCode?evt.keyCode:evt.rawEvent.keyCode;
		if(b==27)this._stopDragDrop(true)
	},
	_autoScroll:function(){
		var b=window._event,a=this.getBrowserRectangle();
		if(a.width>0){
			this._scrollDeltaX=this._scrollDeltaY=0;
			if(b.clientX<a.x+this._scrollEdgeConst)this._scrollDeltaX=-this._scrollByConst;
			else if(b.clientX>a.width-this._scrollEdgeConst)this._scrollDeltaX=this._scrollByConst;
			if(b.clientY<a.y+this._scrollEdgeConst)this._scrollDeltaY=-this._scrollByConst;
			else if(b.clientY>a.height-this._scrollEdgeConst)this._scrollDeltaY=this._scrollByConst;
			if(this._scrollDeltaX!=0||this._scrollDeltaY!=0)this._scroller.set_enabled(true);
			else this._scroller.set_enabled(false)
		}
	},
	scrollerTickHandler:function(){
		var d=document.body.scrollLeft,f=document.body.scrollTop;
		
		// Don't scroll if already at bottom of page
		var browserRect=this.getBrowserRectangle();
		var scrollY=(document.documentElement.scrollTop + browserRect.height + this._scrollEdgeConst) < document.body.offsetHeight;
		var scrollX=(document.documentElement.scrollLeft + browserRect.width + this._scrollEdgeConst) < document.body.offsetWidth;
		
		window.scrollBy(scrollX ? this._scrollDeltaX : 0, scrollY ? this._scrollDeltaY : 0);
		var c=document.body.scrollLeft,e=document.body.scrollTop,a=this._activeDragVisual,b={
			x:parseInt(a.style.left)+(c-d),y:parseInt(a.style.top)+(e-f)
		};
		Sys.UI.DomElement.setLocation(a,b.x,b.y)
	},
	_getDropTarget:function(element){
		while(element){
			if(element._dropTarget!=null)return element._dropTarget;
			element=element.parentNode
		}
		return null
	},
	_dragDrop:function(){
		if(this._isDragging)return;
		this._isDragging=true;
		this._activeDragVisual.dragDrop();
		document.selection.empty()
	},
	_moveInTarget:function(dragSource,dropTarget){
		this._prepareForDomChanges();
		dropTarget.onDragInTarget(dragSource.get_dragMode(),dragSource.get_dragDataType(),dragSource.getDragData(this._activeContext));
		this._recoverFromDomChanges()
	},
	_enterTarget:function(dragSource,dropTarget){
		this._prepareForDomChanges();
		dropTarget.onDragEnterTarget(dragSource.get_dragMode(),dragSource.get_dragDataType(),dragSource.getDragData(this._activeContext));
		this._recoverFromDomChanges()
	},
	_leaveTarget:function(dragSource,dropTarget){
		this._prepareForDomChanges();
		dropTarget.onDragLeaveTarget(dragSource.get_dragMode(),dragSource.get_dragDataType(),dragSource.getDragData(this._activeContext));
		this._recoverFromDomChanges()
	},
	_findPotentialTarget:function(dragSource){
		var f=window._event;
		if(!this._dropTargets)return null;
		var m=dragSource.get_dragDataType(),l=dragSource.get_dragMode(),k=dragSource.getDragData(this._activeContext),d=this.getScrollOffset(document.body,true),n=f.clientX+d.x,o=f.clientY+d.y,g={
			x:n-this._radius,y:o-this._radius,width:this._radius*2,height:this._radius*2
		};
		for(var c=0;c<this._dropTargets.length;c++){
			var b=this._dropTargets[c],j=b.canDrop(l,m,k);
			if(!j)continue;
			var e=b.get_dropTargetElement(),h=Sys.UI.DomElement.getBounds(e),i=Sys.UI.Control.overlaps(g,h);
			if(i||e===document.body)return b
		}
		return null
	},
	_prepareForDomChanges:function(){
		this._oldOffset=Sys.UI.DomElement.getLocation(this._activeDragVisual)
	},
	_recoverFromDomChanges:function(){
		var a=Sys.UI.DomElement.getLocation(this._activeDragVisual);
		if(this._oldOffset.x!=a.x||this._oldOffset.y!=a.y){
			this._activeDragVisual.startingPoint=this.subtractPoints(this._activeDragVisual.startingPoint,this.subtractPoints(this._oldOffset,a));
			scrollOffset=this.getScrollOffset(this._activeDragVisual,true);
			var b=this.addPoints(this.subtractPoints(document._lastPosition,this._activeDragVisual.startingPoint),scrollOffset);
			Sys.UI.DomElement.setLocation(this._activeDragVisual,b.x,b.y)
		}
	},
	addPoints:function(p1,p2){
		return{
			x:p1.x+p2.x,y:p1.y+p2.y
		}
	},
	subtractPoints:function(p1,p2){
		return{
			x:p1.x-p2.x,y:p1.y-p2.y
		}
	},
	getScrollOffset:function(element,recursive){
		var c=element.scrollLeft,d=element.scrollTop;
		if(recursive){
			var a=element.parentNode;
			while(a!=null&&a.scrollLeft!=null){
				c+=a.scrollLeft;
				d+=a.scrollTop;
				if(a==document.body&&(c!=0&&d!=0))break;
				a=a.parentNode
			}
		}
		return{
			x:c,y:d
		}
	},
	getBrowserRectangle:function(){
		return {
			x:0,
			y:0,
			width:window.innerWidth || document.documentElement.clientWidth,
			height:window.innerHeight || document.documentElement.clientHeight
		};
	},
	getNextSibling:function(item){
		for(item=item.nextSibling;item!=null;item=item.nextSibling)if(item.innerHTML!=null)return item;
		return null
	},
	hasParent:function(element){
		return element.parentNode!=null&&element.parentNode.tagName!=null
	}
};
MySpace.UI.GenericDragDropManager.registerClass("MySpace.UI.GenericDragDropManager",Sys.Component);

if(Sys.Browser.agent===Sys.Browser.Safari){
	MySpace.UI.GenericDragDropManager.__loadSafariCompatLayer=function(ddm){
		ddm._getScrollOffset=ddm.getScrollOffset;
		ddm.getScrollOffset=function(){
			return{ x:0,y:0 }
		};
		ddm._getBrowserRectangle=ddm.getBrowserRectangle;
		ddm.getBrowserRectangle=function(){
			var b=ddm._getBrowserRectangle(),c=ddm._getScrollOffset(document.body,true);
			return{ x:b.x+c.x,y:b.y+c.y,width:b.width+c.x,height:b.height+c.y }
		}
	};
}

MySpace.UI.RepeatDirection=function(){
	throw Error.invalidOperation()
};
MySpace.UI.RepeatDirection.prototype={
	Horizontal:0,Vertical:1
};
MySpace.UI.RepeatDirection.registerEnum("MySpace.UI.RepeatDirection");
MySpace.UI.DragDropList=function(associatedElement){
	MySpace.UI.DragDropList.initializeBase(this,[associatedElement]);
	this._acceptedDataTypes=[];
	this._allowedItemIds=[];
};
MySpace.UI.DragDropList.prototype={
	_isDragging:null,
	_dataType:null,
	_dragMode:null,
	_dragVisual:null,
	_direction:MySpace.UI.RepeatDirection.Vertical,
	_emptyTemplate:null,
	_emptyTemplateInstance:null,
	_dropCueTemplate:null,
	_dropCueTemplateInstance:null,
	_floatContainerInstance:null,
	_originalParent:null,
	_originalNextSibling:null,
	_originalZIndex:null,
	_currentContext:null,
	_data:null,
	get_data:function(){
		return this._data
	},
	set_data:function(a){
		this._data=a
	},
	initialize:function(){
		MySpace.UI.DragDropList.callBaseMethod(this,"initialize");
		this.get_element().__dragDropList=this;
		MySpace.UI.DragDropManager.registerDropTarget(this)
	},
	startDragDrop:function(dragObject,context,dragVisual){
		if(!this._isDragging){
			this._isDragging=true;
			this._currentContext=context;
			if(!dragVisual)dragVisual=this.createDragVisual(dragObject);
			else this._dragVisual=dragVisual;
			MySpace.UI.DragDropManager.startDragDrop(this,dragVisual,context)
		}
	},
	createDragVisual:function(dragObject){
		if(this._dragMode===MySpace.UI.DragMode.Copy)this._dragVisual=dragObject.cloneNode(true);
		else this._dragVisual=dragObject;
		var e=MySpace.UI.DragDropManager._getInstance().getScrollOffset(dragObject,true);
		this._originalSize={w: this._dragVisual.style.width, h: this._dragVisual.style.height};
		this._originalLocation=Sys.UI.DomElement.getLocation(dragObject);
		this._dragVisual.style.width=dragObject.offsetWidth+"px";
		this._dragVisual.style.height=dragObject.offsetHeight+"px";
		this._dragVisual.style.opacity="0.4";
		this._dragVisual.style.filter="progid:DXImageTransform.Microsoft.BasicImage(opacity=0.4);";
		this._originalZIndex=this._dragVisual.style.zIndex;
		this._dragVisual.style.zIndex=99999;
		this._originalParent=this._dragVisual.parentNode;
		this._originalNextSibling=MySpace.UI.DragDropManager._getInstance().getNextSibling(this._dragVisual);
		var f=MySpace.UI.DragDropManager._getInstance(),c=Sys.UI.DomElement.getLocation(dragObject),b=this._getFloatContainer();
		Sys.UI.DomElement.setLocation(b,c.x,c.y);
		if(MySpace.UI.DragDropManager._getInstance().hasParent(this._dragVisual)){
			var dropCue=this._getDropCueTemplateInstance(this._dragVisual);
			this._dragVisual.parentNode.replaceChild(dropCue, this._dragVisual);
		}
		b.appendChild(this._dragVisual);
		var d=f.getScrollOffset(dragObject,true);
		if(e.x!==d.x||e.y!==d.y){
			var h=f.subtractPoints(e,d),g=f.subtractPoints(c,h);
			Sys.UI.DomElement.setLocation(b,g.x,g.y)
		}
		return b
	},
	get_emptyTemplate:function(){
		return this._emptyTemplate
	},
	set_emptyTemplate:function(a){
		this._emptyTemplate=a
	},
	get_dragDataType:function(){
		return this._dataType
	},
	set_dragDataType:function(a){
		this._dataType=a
	},
	getDragData:function(a){
		return a
	},
	get_dragMode:function(){
		return this._dragMode
	},
	set_dragMode:function(a){
		this._dragMode=a
	},
	dispose:function(){
		this.get_element().__dragDropList=null;
		MySpace.UI.DragDropList.callBaseMethod(this,"dispose")
	},
	onDragStart:function(){
		this._validate()
	},
	onDrag:function(){
	},
	onDragEnd:function(canceled){
		if(canceled && this._floatContainerInstance){
			var placeholder = document.createElement("div");
			if(this._originalNextSibling) this._originalParent.insertBefore(placeholder,this._originalNextSibling);
			else this._originalParent.appendChild(placeholder);
			
			var currentLocation=Sys.UI.DomElement.getLocation(this._floatContainerInstance);
			
			var heightAnimation=$create(MySpace.UI.Effects.LengthAnimation, {
				target: placeholder,
				property:"style",
				propertyKey:"height",
				startValue:0,
				endValue:this._floatContainerInstance.offsetHeight
			});
			var leftAnimation=$create(MySpace.UI.Effects.LengthAnimation, {
				target:this._floatContainerInstance,
				property:"style",
				propertyKey:"left",
				startValue:currentLocation.x,
				endValue:this._originalLocation.x
			});
			var topAnimation=$create(MySpace.UI.Effects.LengthAnimation, {
				target:this._floatContainerInstance,
				property:"style",
				propertyKey:"top",
				startValue:currentLocation.y,
				endValue:this._originalLocation.y
			});

			var animation=$create(MySpace.UI.Effects.CompositeAnimation, {
				animations:[heightAnimation, leftAnimation, topAnimation],
				duration:0.3,
				fps:12
			}, {
				ended:Function.createDelegate(this, function(){
					placeholder.parentNode.removeChild(placeholder);
					this._onDragEnd(canceled);
				})
			});
			
			animation.play();
		} else {
			this._onDragEnd(canceled);
		}
	},
	_onDragEnd:function(canceled){
		if(this._floatContainerInstance){
			if(this._dragMode===MySpace.UI.DragMode.Copy){
				this._floatContainerInstance.removeChild(this._dragVisual);
			}
			else{
				this._dragVisual.style.opacity="0.999";
				this._dragVisual.style.filter="";
				this._dragVisual.style.zIndex=this._originalZIndex?this._originalZIndex:0;
				if(this._originalSize){
					this._dragVisual.style.width=this._originalSize.w;
					this._dragVisual.style.height=this._originalSize.h;
				}
				if(canceled){
					this._dragVisual.parentNode.removeChild(this._dragVisual);
					if(this._originalNextSibling!=null){
						this._originalParent.insertBefore(this._dragVisual,this._originalNextSibling);
					}
					else{
						this._originalParent.appendChild(this._dragVisual)
					}
				}
				else if(this._dragVisual.parentNode===this._floatContainerInstance){
					this._dragVisual.parentNode.removeChild(this._dragVisual)
				}
			}
			document.body.removeChild(this._floatContainerInstance)
		}
		else{
			this._dragVisual.parentNode.removeChild(this._dragVisual);
		}
		if(!canceled&&this._data&&this._dragMode===MySpace.UI.DragMode.Move){
			var a=this.getDragData(this._currentContext);
			if(this._data&&a){
				if(this._data instanceof Array){
					if(typeof this._data.remove==="function"){
						this._data.remove(a);
					}
					else{
						Array.remove(this._data,a)
					}
				}
			}
		}
		if(!canceled){
			var handler=this.get_events().getHandler("dragSuccessful");
			if(handler){
			    handler(this, null);
			}
		}
		this._isDragging=false;
		this._validate()
	},
	get_direction:function(){
		return this._direction
	},
	set_direction:function(a){
		this._direction=a
	},
	get_acceptedDataTypes:function(){
		return this._acceptedDataTypes
	},
	set_acceptedDataTypes:function(a){
		this._acceptedDataTypes=a
	},
	get_allowedItemIds:function(){
		return this._allowedItemIds;
	},
	set_allowedItemIds:function(a){
		this._allowedItemIds=a;
	},
	get_dropCueTemplate:function(){
		return this._dropCueTemplate
	},
	set_dropCueTemplate:function(a){
		this._dropCueTemplate=a
	},
	get_dropTargetElement:function(){
		return this.get_element()
	},
	canDrop:function(dragMode, dataType, data){
		if(!Array.contains(this._acceptedDataTypes, dataType)){
			return false;
		}
		if(this._allowedItemIds.length>0 && !Array.contains(this._allowedItemIds, data.id)){
			return false;
		}
		if(data.DraggableListItem.get_allowedListIds().length>0 && !Array.contains(data.DraggableListItem.get_allowedListIds(), this._element.id)){
			return false;
		}
		return true;
	},
	drop:function(dragMode,dataType,data){
		if(dataType==="HTML"&&dragMode===MySpace.UI.DragMode.Move){
			var dragVisual=data;
			var c=this._findPotentialNextSibling(dragVisual);
			this._setDropCueVisible(false,dragVisual);
			dragVisual.parentNode.removeChild(dragVisual);
			if(c)this.get_element().insertBefore(dragVisual,c);
			else this.get_element().appendChild(dragVisual)
		}
		else{
			this._setDropCueVisible(false);
		}

		if(this._data&&data){
			var b=data;
			if(this._data instanceof Array){
				if(typeof this._data.add==="function"){
					this._data.add(b);
				}
				else{
					Array.add(this._data,b)
				}
			}
		}
	},
	onDragEnterTarget:function(dragMode,dataType,data){
		if(dataType==="HTML"){
			this._setDropCueVisible(true,data);
			this._validate()
		}
	},
	onDragLeaveTarget:function(dragMode,dataType){
		if(dataType==="HTML"){
			this._setDropCueVisible(false);
			this._validate()
		}
	},
	onDragInTarget:function(dragMode,dataType,data){
		if(dataType==="HTML")this._setDropCueVisible(true,data)
	},
	add_dragSuccessful: function(handler) {
		this.get_events().addHandler("dragSuccessful", handler);
	},
	remove_dragSuccessful: function(handler) {
		this.get_events().removeHandler("dragSuccessful", handler);
	},			   
	_setDropCueVisible:function(visible,dragVisual){
		if(this._dropCueTemplate){
			var instance=this._getDropCueTemplateInstance(dragVisual);
			if(visible){
				var a=this._findPotentialNextSibling(dragVisual);
				this._dropCueTemplateInstance.style.width=dragVisual.offsetWidth+"px";
				this._dropCueTemplateInstance.style.height=dragVisual.offsetHeight+"px";
				if(!MySpace.UI.DragDropManager._getInstance().hasParent(instance)){
					if(a)this.get_element().insertBefore(instance,a);
					else this.get_element().appendChild(instance);
				}
				else if(MySpace.UI.DragDropManager._getInstance().getNextSibling(instance)!==a){
					this.get_element().removeChild(instance);
					if(a)this.get_element().insertBefore(instance,a);
					else this.get_element().appendChild(instance)
				}
			}
			else if(instance && MySpace.UI.DragDropManager._getInstance().hasParent(instance)){
				this.get_element().removeChild(instance)
			}
		}
	},
	_getDropCueTemplateInstance:function(dragVisual){
		if(!this._dropCueTemplateInstance){
			this._dropCueTemplateInstance=this._dropCueTemplate.cloneNode(true);
		}
		return this._dropCueTemplateInstance;
	},
	_findPotentialNextSibling:function(dragVisual){
		var dragVisualRect=Sys.UI.DomElement.getBounds(dragVisual)
		var isVertical=this._direction===MySpace.UI.RepeatDirection.Vertical
		var nodeRect;
		for(var node=this.get_element().firstChild;node!==null;node=node.nextSibling){
			if(node.innerHTML && node!==this._dropCueTemplateInstance && node!==this._emptyTemplateInstance){
				nodeRect=Sys.UI.DomElement.getBounds(node);
				if(!isVertical&&dragVisualRect.x<=nodeRect.x||isVertical&&(dragVisualRect.y<=nodeRect.y)){
					return node
				}
			}
		}
		return null
	},
	_validate:function(){
		var b=this._dropCueTemplateInstance==null||!MySpace.UI.DragDropManager._getInstance().hasParent(this._dropCueTemplateInstance),c=0;
		for(var a=this.get_element().firstChild;a!==null;a=a.nextSibling)if(a.innerHTML&&a!==this._emptyTemplateInstance&&a!==this._dropCueTemplateInstance)c++;
		if(c>0)b=false;
		this._setEmptyTemplateVisible(b)
	},
	_setEmptyTemplateVisible:function(visible){
		if(this._emptyTemplate)if(visible){
			if(!this._emptyTemplateInstance)this._emptyTemplateInstance=this._emptyTemplate.cloneNode(true);
			else if(!MySpace.UI.DragDropManager._getInstance().hasParent(this._emptyTemplateInstance))this.get_element().appendChild(this._emptyTemplateInstance)
		}
		else if(this._emptyTemplateInstance&&MySpace.UI.DragDropManager._getInstance().hasParent(this._emptyTemplateInstance))this.get_element().removeChild(this._emptyTemplateInstance)
	},
	_getFloatContainer:function(){
		if(!this._floatContainerInstance){
			this._floatContainerInstance=document.createElement(this.get_element().tagName);
			var a="0px 0px 0px 0px";
			this._floatContainerInstance.style.position="absolute";
			this._floatContainerInstance.style.padding=a;
			this._floatContainerInstance.style.margin=a;
			document.body.appendChild(this._floatContainerInstance)
		}
		else if(!MySpace.UI.DragDropManager._getInstance().hasParent(this._floatContainerInstance))document.body.appendChild(this._floatContainerInstance);
		return this._floatContainerInstance
	}
};
MySpace.UI.DragDropList.registerClass("MySpace.UI.DragDropList",Sys.UI.Behavior,MySpace.UI.IDragSource,MySpace.UI.IDropTarget,Sys.IDisposable);

MySpace.UI.DraggableListItem=function(element){
	MySpace.UI.DraggableListItem.initializeBase(this,[element]);
	var d,a,c,b,allowedListIds=[];
	this.get_data=function(){
		if(d==null){
			var a=this._findDragSource();
			if(a!=null&&a.get_dragDataType()=="HTML")return this.get_element()
		}
		return d
	};
	this.set_data=function(a){
		d=a
	};
	this.get_handle=function(){
		return a
	};
	this.set_handle=function(b){
		if(a!=null){
			Sys.UI.DomEvent.removeHandler(a,"mousedown",this._handleMouseDown);
			a.__draggableBehavior=null
		}
		if(b.element)b=b.element;
		a=b;
		a.__draggableBehavior=this;
		Sys.UI.DomEvent.addHandler(a,"mousedown",this._handleMouseDown);
		a.__draggableBehavior=this
		a.style.zoom=1;		// Need to force hasLayout to work right in IE6
	};
	this.get_dragVisualTemplate=function(){
		return c
	};
	this.set_dragVisualTemplate=function(a){
		c=a
	};
	this.get_allowedListIds=function(){
		return allowedListIds;
	};
	this.set_allowedListIds=function(a){
		allowedListIds=a;
	};
	this._handleMouseDown=function(b){
		window._event=b;
		a.__draggableBehavior._handleMouseDownInternal()
	};
	this._handleMouseDownInternal=function(){
		var b=window._event;
		if(b.button<=1){
			var a=this._findDragSource();
			if(a!=null){
				var c=this._createDragVisual();
				a.startDragDrop(this.get_element(),this.get_data(),c);
				b.preventDefault()
			}
		}
	};
	this._createDragVisual=function(){
		var d=window._event;
		if(c!=null){
			if(b==null)b=c.createInstance(this.get_element()).instanceElement;
			else if(!MySpace.UI.DragDropManager._getInstance().hasParent(b))this.get_element().appendChild(b);
			var a={
				x:d.clientX,y:d.clientY
			};
			a=MySpace.UI.DragDropManager._getInstance().addPoints(a,MySpace.UI.DragDropManager._getInstance().getScrollOffset(document.body,true));
			Sys.UI.DomElement.setLocation(b,a.x,a.y)
		}
		return b
	};
	this._findDragSource=function(){
		var a=this.get_element();
		while(a!=null){
			if(a.__dragDropList!=null)return a.__dragDropList;
			a=a.parentNode
		}
		return null
	}
};
MySpace.UI.DraggableListItem.registerClass("MySpace.UI.DraggableListItem",Sys.UI.Behavior);

Sys.UI.Control.overlaps = function(r1, r2) {
    var xLeft = (r1.x >= r2.x && r1.x <= (r2.x + r2.width));
    var xRight = ((r1.x + r1.width) >= r2.x && (r1.x + r1.width) <= r2.x + r2.width);
    var xComplete = ((r1.x < r2.x) && ((r1.x + r1.height) > (r2.x + r2.height)));
    
    var yLeft = (r1.y >= r2.y && r1.y <= (r2.y + r2.height));
    var yRight = ((r1.y + r1.height) >= r2.y && (r1.y + r1.height) <= r2.y + r2.height);
    var yComplete = ((r1.y < r2.y) && ((r1.y + r1.height) > (r2.y + r2.height)));
    if ((xLeft || xRight || xComplete) && (yLeft || yRight || yComplete)) {
        return true;
    }
   
    return false;
}

//PreviewGlitz.js
//----------------------------------------------------------
Type.registerNamespace("MySpace.UI.Effects");

MySpace.UI.Effects.Glitz=function(){
	throw Error.invalidOperation()
};

MySpace.UI.Effects.Glitz.interpolate=function(value1,value2,percentage,easingFn){
	if(easingFn){percentage=100*easingFn(percentage/100);}
	return value1+(value2-value1)*(percentage/100)
};
MySpace.UI.Effects.Glitz.setElementOpacity=function(a,b){
	if(a.filters){
		if(b==1){	// opacity=100 makes text fuzzy on IE7, so remove it
			a.style.cssText=a.style.cssText.replace(/FILTER:[^;]*;?/i, "");
		}
		else{
			a.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+b*100+")"
		}
	}
	else a.style.opacity=b
};

MySpace.UI.Effects.Easing={
	linear:function(n){
		return n;
	},
	quadIn:function(n){
		return n*n;
	},
	quadOut:function(n){
		return n*(n-2)*-1;
	},
	quadInOut: function(n){
		n=n*2;
		if(n<1){ return Math.pow(n, 2) / 2; }
		return -1 * ((--n)*(n-2) - 1) / 2;
	},
	quartIn: function(n){
		return Math.pow(n, 4);
	},
	quartOut: function(n){
		return -1 * (Math.pow(n-1, 4) - 1);
	},
	quartInOut: function(n){
		n=n*2;
		if(n<1){ return Math.pow(n, 4) / 2; }
		n-=2;
		return -1/2 * (Math.pow(n, 4) - 2);
	},
	circIn: function(n){
		return -1 * (Math.sqrt(1 - Math.pow(n, 2)) - 1);
	},
	circOut: function(n){
		n = n-1;
		return Math.sqrt(1 - Math.pow(n, 2));
	},
	circInOut: function(n){
		n = n*2;
		if(n<1){ return -1/2 * (Math.sqrt(1 - Math.pow(n, 2)) - 1); }
		n-=2;
		return 1/2 * (Math.sqrt(1 - Math.pow(n, 2)) + 1);
	},
	backIn: function(n){
		var s = 1.70158;
		return Math.pow(n, 2) * ((s+1)*n - s);
	},
	backOut: function(n){
		// summary: an easing function that pops past the range briefly, and 
		// 	slowly comes back. 
		n = n - 1;
		var s = 1.70158;
		return Math.pow(n, 2) * ((s + 1) * n + s) + 1;
	},
	backInOut: function(n){
		var s = 1.70158 * 1.525;
		n = n*2;
		if(n < 1){ return (Math.pow(n, 2)*((s+1)*n - s))/2; }
		n-=2;
		return (Math.pow(n, 2)*((s+1)*n + s) + 2)/2;
	},
	elasticIn: function(n){
		if(n==0){ return 0; }
		if(n==1){ return 1; }
		var p = .3;
		var s = p/4;
		n = n - 1;
		return -1 * Math.pow(2,10*n) * Math.sin((n-s)*(2*Math.PI)/p);
	},
	elasticOut: function(n){
		// summary: An easing function that elasticly snaps around the target value, near the end of the Animation
		if(n==0) return 0;
		if(n==1) return 1;
		var p = .3;
		var s = p/4;
		return Math.pow(2,-10*n) * Math.sin((n-s)*(2*Math.PI)/p) + 1;
	},
	elasticInOut: function(n){
		// summary: An easing function that elasticly snaps around the value, near the beginning and end of the Animation		
		if(n==0) return 0;
		n = n*2;
		if(n==2) return 1;
		var p = .3*1.5;
		var s = p/4;
		if(n<1){
			n-=1;
			return -.5*(Math.pow(2,10*n) * Math.sin((n-s)*(2*Math.PI)/p));
		}
		n-=1;
		return .5*(Math.pow(2,-10*n) * Math.sin((n-s)*(2*Math.PI)/p)) + 1;
	},
	bounceIn: function(n){
		// summary: An easing function that "bounces" near the beginning of an Animation
		return (1 - MySpace.UI.Effects.Easing.bounceOut(1-n)); // Decimal
	},
	bounceOut: function(n){
		// summary: An easing function that "bounces" near the end of an Animation
		var s=7.5625;
		var p=2.75;
		var l; 
		if(n < (1 / p)){
			l = s*Math.pow(n, 2);
		}else if(n < (2 / p)){
			n -= (1.5 / p);
			l = s * Math.pow(n, 2) + .75;
		}else if(n < (2.5 / p)){
			n -= (2.25 / p);
			l = s * Math.pow(n, 2) + .9375;
		}else{
			n -= (2.625 / p);
			l = s * Math.pow(n, 2) + .984375;
		}
		return l;
	},
	bounceInOut: function(n){
		// summary: An easing function that "bounces" at the beginning and end of the Animation
		if(n<0.5){ return MySpace.UI.Effects.Easing.bounceIn(n*2) / 2; }
		return (MySpace.UI.Effects.Easing.bounceOut(n*2-1) / 2) + 0.5;
	}	
};

MySpace.UI.Effects.Animation=function(){
	MySpace.UI.Effects.Animation.initializeBase(this)
};
MySpace.UI.Effects.Animation.prototype={
	_duration:1,
	_fps:25,
	_target:null,
	_tickHandler:null,
	_timer:null,
	_percentComplete:0,
	_percentDelta:null,
	_parentAnimation:null,
	get_duration:function(){
		return this._duration
	},
	set_duration:function(a){
		this._duration=a
	},
	get_fps:function(){
		return this._fps
	},
	set_fps:function(a){
		this._fps=a
	},
	get_isActive:function(){
		return this._timer!==null
	},
	get_isPlaying:function(){
		return this._timer!==null&&this._timer.get_enabled()
	},
	get_percentComplete:function(){
		return this._percentComplete
	},
	get_target:function(){
		return this._target
	},
	set_target:function(a){
		this._target=a
	},
	add_ended:function(a){
		this.get_events().addHandler("ended",a)
	},
	remove_ended:function(a){
		this.get_events().removeHandler("ended",a)
	},
	add_started:function(a){
		this.get_events().addHandler("started",a)
	},
	remove_started:function(a){
		this.get_events().removeHandler("started",a)
	},
	dispose:function(){
		if(this._timer){
			this._timer.dispose();
			this._timer=null
		}
		this._tickHandler=null;
		this._target=null;
		MySpace.UI.Effects.Animation.callBaseMethod(this,"dispose")
	},
	getAnimatedValue:function(){
		throw Error.notImplemented()
	},
	onEnd:function(){
	},
	onStart:function(){
	},
	onStep:function(percentage){
		this.setValue(this.getAnimatedValue(percentage))
	},
	pause:function(){
		if(!this._parentAnimation)if(this._timer){
			this._timer.set_enabled(false);
			this.raisePropertyChanged("isPlaying")
		}
	},
	play:function(){
		if(!this._parentAnimation){
			var a=true;
			if(!this._timer){
				a=false;
				if(!this._tickHandler)this._tickHandler=Function.createDelegate(this,this._onTimerTick);
				this._timer=new MySpace.Timer;
				this._timer.set_interval(1000/this._fps);
				this._timer.add_tick(this._tickHandler);
				this._percentDelta=100/(this._duration*this._fps);
				this.onStart();
				this._updatePercentComplete(0,true)
			}
			this._timer.set_enabled(true);
			this.raisePropertyChanged("isPlaying");
			if(!a)this.raisePropertyChanged("isActive")
		}
	},
	setOwner:function(a){
		this._parentAnimation=a
	},
	setValue:function(){
		throw Error.notImplemented()
	},
	stop:function(){
		if(!this._parentAnimation){
			var a=this._timer;
			this._timer=null;
			if(a){
				a.dispose();
				this._updatePercentComplete(100);
				this.onEnd();
				var handler = this.get_events().getHandler("ended");
				if (handler) {
				    handler(this, null);
				}					
				this.raisePropertyChanged("isPlaying");
				this.raisePropertyChanged("isActive")
			}
		}
	},
	_onTimerTick:function(){
		this._updatePercentComplete(this._percentComplete+this._percentDelta,true)
	},
	_updatePercentComplete:function(percentComplete,animate){
		if(percentComplete>100)percentComplete=100;
		this._percentComplete=percentComplete;
		this.raisePropertyChanged("percentComplete");
		if(animate)this.onStep(percentComplete);
		if(percentComplete===100)this.stop()
	}
};
MySpace.UI.Effects.Animation.registerClass("MySpace.UI.Effects.Animation",Sys.Component);
MySpace.UI.Effects.PropertyAnimation=function(){
	MySpace.UI.Effects.PropertyAnimation.initializeBase(this)
};
MySpace.UI.Effects.PropertyAnimation.prototype={
	_property:null,
	_propertyKey:null,
	get_property:function(){
		return this._property
	},
	set_property:function(a){
		this._property=a
	},
	get_propertyKey:function(){
		return this._propertyKey
	},
	set_propertyKey:function(a){
		this._propertyKey=a
	},
	add_ended:function(a){
		this.get_events().addHandler("ended",a)
	},
	remove_ended:function(a){
		this.get_events().removeHandler("ended",a)
	},
	add_started:function(a){
		this.get_events().addHandler("started",a)
	},
	remove_started:function(a){
		this.get_events().removeHandler("started",a)
	},
	setValue:function(value){
		if(this._propertyKey){
			this.get_target()[this._property][this._propertyKey] = value;
		}
		else{
			this.get_target()[this._property] = value;
		}
	}
};
MySpace.UI.Effects.PropertyAnimation.registerClass("MySpace.UI.Effects.PropertyAnimation",MySpace.UI.Effects.Animation);
MySpace.UI.Effects.InterpolatedAnimation=function(){
	MySpace.UI.Effects.InterpolatedAnimation.initializeBase(this)
};
MySpace.UI.Effects.InterpolatedAnimation.prototype={
	_startValue:null,
	_endValue:null,
	_easingFunction:null,
	get_endValue:function(){
		return this._endValue
	},
	set_endValue:function(a){
		this._endValue=a
	},
	get_startValue:function(){
		return this._startValue
	},
	set_startValue:function(a){
		this._startValue=a
	},
	get_easingFunction:function(){
		return this._easingFunction;
	},
	set_easingFunction:function(a){
		this._easingFunction=a;
	}
};
MySpace.UI.Effects.InterpolatedAnimation.registerClass("MySpace.UI.Effects.InterpolatedAnimation",MySpace.UI.Effects.PropertyAnimation);
MySpace.UI.Effects.DiscreteAnimation=function(){
	MySpace.UI.Effects.DiscreteAnimation.initializeBase(this);
	this._values=[]
};
MySpace.UI.Effects.DiscreteAnimation.prototype={
	get_values:function(){
		return this._values
	},
	set_values:function(a){
		this._values=a
	},
	getAnimatedValue:function(percentage){
		var b=Math.round(percentage/100*(this._values.length-1));
		return this._values[b]
	}
};
MySpace.UI.Effects.DiscreteAnimation.registerClass("MySpace.UI.Effects.DiscreteAnimation",MySpace.UI.Effects.PropertyAnimation);
MySpace.UI.Effects.NumberAnimation=function(){
	MySpace.UI.Effects.NumberAnimation.initializeBase(this)
};
MySpace.UI.Effects.NumberAnimation.prototype={
	_integralValues:false,
	get_integralValues:function(){
		return this._integralValues
	},
	set_integralValues:function(a){
		this._integralValues=a
	},
	getAnimatedValue:function(percentage){
		var a=MySpace.UI.Effects.Glitz.interpolate(this.get_startValue(),this.get_endValue(),percentage,this.get_easingFunction());
		if(this._integralValues)a=Math.round(a);
		return a
	}
};
MySpace.UI.Effects.NumberAnimation.registerClass("MySpace.UI.Effects.NumberAnimation",MySpace.UI.Effects.InterpolatedAnimation);
MySpace.UI.Effects.LengthAnimation=function(){
	MySpace.UI.Effects.LengthAnimation.initializeBase(this)
};
MySpace.UI.Effects.LengthAnimation.prototype={
	_unit:"px",
	get_unit:function(){
		return this._unit
	},
	set_unit:function(a){
		this._unit=a
	},
	getAnimatedValue:function(percentage){
		var b=MySpace.UI.Effects.Glitz.interpolate(this.get_startValue(),this.get_endValue(),percentage,this.get_easingFunction());
		return Math.round(b)+this._unit
	}
};
MySpace.UI.Effects.LengthAnimation.registerClass("MySpace.UI.Effects.LengthAnimation",MySpace.UI.Effects.InterpolatedAnimation);
MySpace.UI.Effects.CompositeAnimation=function(){
	MySpace.UI.Effects.CompositeAnimation.initializeBase(this);
	this._animations=[];
};
MySpace.UI.Effects.CompositeAnimation.prototype={
	get_animations:function(){
		return this._animations
	},
	add_animation:function(a){
		this._animations.push(a);
	},
	getAnimatedValue:function(){
		throw Error.invalidOperation()
	},
	dispose:function(){
		for(var a=0;a<this._animations.length;a++)this._animations[a].dispose();
		this._animations=null;
		MySpace.UI.Effects.CompositeAnimation.callBaseMethod(this,"dispose")
	},
	onEnd:function(){
		for(var a=0;a<this._animations.length;a++)this._animations[a].onEnd()
	},
	onStart:function(){
		for(var a=0;a<this._animations.length;a++)this._animations[a].onStart()
	},
	onStep:function(b){
		for(var a=0;a<this._animations.length;a++)this._animations[a].onStep(b)
	}
};
MySpace.UI.Effects.CompositeAnimation.registerClass("MySpace.UI.Effects.CompositeAnimation",MySpace.UI.Effects.Animation);

MySpace.UI.Effects.ColorAnimation = function(target, duration, fps, property, propertyKey, startValue, endValue) {
    MySpace.UI.Effects.ColorAnimation.initializeBase(this, [target, duration, fps, property, propertyKey, startValue, endValue]);
    
    this._start = null;
    this._end = null;
    
    this._interpolateRed = false;
    this._interpolateGreen = false;
    this._interpolateBlue = false;
}
MySpace.UI.Effects.ColorAnimation.prototype = {
    onStart : function() {
        MySpace.UI.Effects.ColorAnimation.callBaseMethod(this, 'onStart');
       
        this._start = MySpace.UI.Effects.ColorAnimation.getRGB(this.get_startValue());
        this._end = MySpace.UI.Effects.ColorAnimation.getRGB(this.get_endValue());
        
        this._interpolateRed = (this._start.Red != this._end.Red);
        this._interpolateGreen = (this._start.Green != this._end.Green);
        this._interpolateBlue = (this._start.Blue != this._end.Blue);
    },
    
    getAnimatedValue : function(percentage) {
        var r = this._start.Red;
        var g = this._start.Green;
        var b = this._start.Blue;
        
        if (this._interpolateRed)
            r = Math.round(MySpace.UI.Effects.Glitz.interpolate(r, this._end.Red, percentage, this.get_easingFunction()));
        
        if (this._interpolateGreen)
            g = Math.round(MySpace.UI.Effects.Glitz.interpolate(g, this._end.Green, percentage, this.get_easingFunction()));
        
        if (this._interpolateBlue)
            b = Math.round(MySpace.UI.Effects.Glitz.interpolate(b, this._end.Blue, percentage, this.get_easingFunction()));
        
        return MySpace.UI.Effects.ColorAnimation.toColor(r, g, b);
    },
    
    set_startValue : function(value) {
        if (this._startValue != value) {
            this._startValue = value;
            this.raisePropertyChanged('startValue');
        }
    },
    
    set_endValue : function(value) {
        if (this._endValue != value) {
            this._endValue = value;
            this.raisePropertyChanged('endValue');
        }
    }   
}
MySpace.UI.Effects.ColorAnimation.getRGB = function(color) {
    if (!color || color.length != 7) {
        throw String.format(AjaxControlToolkit.Resources.Animation_InvalidColor, color);
    }
    return { 'Red': parseInt(color.substr(1,2), 16),
             'Green': parseInt(color.substr(3,2), 16),
             'Blue': parseInt(color.substr(5,2), 16) };
}
MySpace.UI.Effects.ColorAnimation.toColor = function(red, green, blue) {
    var r = red.toString(16);
    var g = green.toString(16);
    var b = blue.toString(16);
    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
    return '#' + r + g + b;
}
MySpace.UI.Effects.ColorAnimation.registerClass('MySpace.UI.Effects.ColorAnimation', MySpace.UI.Effects.InterpolatedAnimation);

MySpace.UI.Effects.FadeEffect=function(){
	throw Error.invalidOperation()
};
MySpace.UI.Effects.FadeEffect.prototype={
	FadeIn:0,FadeOut:1
};
MySpace.UI.Effects.FadeEffect.registerEnum("MySpace.UI.Effects.FadeEffect");
MySpace.UI.Effects.FadeAnimation=function(){
	MySpace.UI.Effects.FadeAnimation.initializeBase(this)
};
MySpace.UI.Effects.FadeAnimation.prototype={
	_effect:MySpace.UI.Effects.FadeEffect.FadeIn,
	get_effect:function(){
		return this._effect
	},
	set_effect:function(a){
		this._effect=a
	},
	getAnimatedValue:function(c){
		var a=0,b=1;
		if(this._effect===MySpace.UI.Effects.FadeEffect.FadeOut){
			a=1;
			b=0
		}
		return MySpace.UI.Effects.Glitz.interpolate(a,b,c)
	},
	onStart:function(){
		var a=0;
		if(this._effect===MySpace.UI.Effects.FadeEffect.FadeOut){a=1;}
		this.setValue(a)
		if(a==0){this.get_target().style.visibility="visible";}
	},
	onEnd:function(){
		var a=1;
		if(this._effect===MySpace.UI.Effects.FadeEffect.FadeOut)a=0;
		this.setValue(a)
		if(a==0){this.get_target().style.visibility="hidden";}
	},
	setValue:function(a){
		MySpace.UI.Effects.Glitz.setElementOpacity(this.get_target(),a)
	}
};
MySpace.UI.Effects.FadeAnimation.registerClass("MySpace.UI.Effects.FadeAnimation",MySpace.UI.Effects.Animation);

MySpace.UI.DragDropModuleManager = function() {
	MySpace.UI.DragDropModuleManager.initializeBase(this);
};
MySpace.UI.DragDropModuleManager.prototype = {
	zoneClass: "dropZone",
	moduleClass: "module",
	handleClass: "handle",
	dropCueClass: "dropCue",

	initialize: function(){
		MySpace.UI.DragDropModuleManager.callBaseMethod(this, "initialize");

		// Create template for the drop cue
		var dropCueTemplate=document.createElement("div");
		dropCueTemplate.className=this.dropCueClass;

		// Create a DragDropList for each zone
		var zones=MySpace.UI.getElementsByClassName(this.zoneClass);
		for(var i=0;i<zones.length;i++){
			var modsStr=zones[i].getAttribute("allowedModules") || "";
			var allowedModules=modsStr ? modsStr.split(",") : [];
			$create(MySpace.UI.DragDropList, {acceptedDataTypes: ['HTML'], dragDataType: 'HTML', dragMode: MySpace.UI.DragMode.Move, dropCueTemplate: dropCueTemplate, allowedItemIds: allowedModules}, {dragSuccessful: Function.createDelegate(this, this.onDragSuccessful)}, null, zones[i]);

			// Create a DraggableListItem for each module
			var mods=MySpace.UI.getElementsByClassName(this.moduleClass, zones[i]);
			for(var j=0;j<mods.length;j++){
				var zonesStr=mods[j].getAttribute("allowedZones") || "";
				var allowedZones=zonesStr ? zonesStr.split(",") : [];
				var handle=MySpace.UI.getElementsByClassName(this.handleClass, mods[j])[0];
				$create(MySpace.UI.DraggableListItem, {handle: handle, allowedListIds: allowedZones}, null, null, mods[j]);
			}
		}
	},

	add_moduleMoved: function(handler){
		this.get_events().addHandler("moduleMoved", handler);
	},
	remove_moduleMoved: function(handler){
		this.get_events().removeHandler("moduleMoved", handler);
	},

	onDragSuccessful: function(){
		var handler = this.get_events().getHandler("moduleMoved");
		if (handler) {
		    handler(this, null);
		}		
	}
};
MySpace.UI.DragDropModuleManager.registerClass("MySpace.UI.DragDropModuleManager", Sys.Component);


MySpace.UI.CascadingDropDownSelectionChangedEventArgs = function(oldValue, newValue){
	MySpace.UI.CascadingDropDownSelectionChangedEventArgs.initializeBase(this);
	
	this._oldValue=oldValue;
	this._newValue=newValue;
};
MySpace.UI.CascadingDropDownSelectionChangedEventArgs.prototype={
	get_oldValue:function(){
		return this._oldValue;
	},
	get_newValue:function(){
		return this._newValue;
	}
};
MySpace.UI.CascadingDropDownSelectionChangedEventArgs.registerClass('MySpace.UI.CascadingDropDownSelectionChangedEventArgs', Sys.EventArgs);

MySpace.UI.CascadingDropDown=function(e){
	MySpace.UI.CascadingDropDown.initializeBase(this, [e]);

	this._parentControlIDs=null;
	this._parentCategory=null;
	this._category=null;
	this._optional=false;
	this._defaultValue="";
	this._promptText=null;
	this._loadingText=null;
	this._promptValue=null;
	this._emptyValue=null;
	this._emptyText=null;
	this._disableNode=null;
	this._disableClass="disabled";
	this._labelNode=null;

	this._servicePath=null;
	this._serviceMethod=null;
	this._serviceExtraParams=null;
	
	this._changeHandler=null;
	this._parentChangeHandler=null;
	this._lastParentValues=null;
	this._selectedValue=null;
};
MySpace.UI.CascadingDropDown.prototype={
	initialize:function(){
		MySpace.UI.CascadingDropDown.callBaseMethod(this, 'initialize');

		var e=this.get_element();

		// Clear any items that may have been put there for server side convenience
		this._clearItems();

		// Set properties on element so that children controls (if any) can have easy access
		e.CascadingDropDownCategory=this._category;
		e.CascadingDropDownOptional=this._optional;
		e.CascadingDropDownDefaultValue=this._defaultValue;

		// Attach change handler to self
		this._changeHandler=Function.createDelegate(this, this._onChange);
		$addHandler(e, "change",this._changeHandler);

		if(this._labelNode){
			this._defaultLabel=this._labelNode.innerHTML;
		}
				
		// Attach change handler to parent
		this._parentChangeHandlers=[];
		if(this._parentControlIDs){
			e.CascadingDropDownParentControlIDs=this._parentControlIDs.join(",");
			for(var i=0;i<this._parentControlIDs.length;i++){
				var parentControlID=this._parentControlIDs[i];
				var parentElement=$get(parentControlID);
				Sys.Debug.assert(parentElement != null, String.format("Failed to find parent element '{0}'", parentControlID));
				if(parentElement){
					if(this._parentCategory && !parentElement.CascadingDropDownCategory)
						parentElement.CascadingDropDownCategory=this._parentCategory;
						
					var handler=Function.createDelegate(this, this._onParentChange);
					this._parentChangeHandlers.push(handler);
					$addHandler(parentElement, "change", handler);
					
					if (!parentElement.childDropDown) {
						parentElement.childDropDown = [];
					}
					parentElement.childDropDown.push(this);
				}
			}
		}

		// Simulate parent change to populate self, even if no parent exists.
		this._onParentChange(null, true);
	},

	dispose: function() {
		var e = this.get_element();

		if (this._changeHandler) {
			$removeHandler(e, "change", this._changeHandler);
			this._changeHandler = null;
		}

		for(var i=0;i<this._parentChangeHandlers.length;i++){
			var el=$get(this._parentControlIDs[i]);
			if (el) {
				$removeHandler(el, "change", this._parentChangeHandlers[i]);
			}
			this._parentChangeHandlers = [];
		}

		MySpace.UI.CascadingDropDown.callBaseMethod(this, 'dispose');
	},

	_clearItems: function() {
		var e = this.get_element();
		while (0 < e.options.length) {
			e.remove(0);
		}
	},

	_isPopulated: function() {
		var items = this.get_element().options.length;
		return this._promptText ? (items > 1) : (items > 0);
	},

	_setOptions: function(options, inInit, gettingList) {
		/// <summary>
		/// Set the contents of the DropDownList to the specified list
		/// </summary>
		/// <param name="options" mayBeNull="true" elementType="Object">
		/// Hash of options (value -> description)
		/// </param>
		/// <param name="inInit" type="Boolean" optional="true">
		/// Whether this is being called from the initialize method
		/// </param>
		/// <param name="gettingList" type="Boolean" optional="true">
		/// Whether we are fetching the list of options from the web service
		/// </param>
		/// <returns />

		if (!this.get_isInitialized()) {
			return;
		}

		// Update the label
		if(this._labelNode){
			if(options && options._CascadingDropdownLabel){
				this._labelNode.innerHTML=options._CascadingDropdownLabel;
			}else{
				this._labelNode.innerHTML=this._defaultLabel;
			}
		}
		if(options){ delete options._CascadingDropdownLabel; }
		
		var e = this.get_element();
		this._clearItems();

		var count = 0;
		if(options){
			for(var v in options){
				count++;
			}
		}
		
		// Populate prompt text (if available) 
		var headerText;
		var headerValue = "";
		if (gettingList && this._loadingText) {
			headerText = this._loadingText;
		}
		else if (!gettingList && options && (count == 0) && this._emptyText) {
			headerText = this._emptyText;
			if (this._emptyValue) {
				headerValue = this._emptyValue;
			}
		}
		else if (this._promptText) {
			headerText = this._promptText;
			if (this._promptValue) {
				headerValue = this._promptValue;
			}
		}
		if (headerText) {
			var optionElement = new Option(headerText, headerValue);
			e.options[e.options.length] = optionElement;
		}

		// Add each item to the DropDownList, selecting the previously selected item
		var selectedValueOption = null;

		if (options) {
			for (var listItemValue in options) {
				var listItemName = options[listItemValue];
				
				var optionElement = new Option(listItemName, listItemValue);
				if (listItemValue == this._selectedValue) {
					selectedValueOption = optionElement;
				}

				e.options[e.options.length] = optionElement;
			}
			if (selectedValueOption) {
				selectedValueOption.selected = true;
			}
		}
		
		// if we didn't match the selected value, and we found a default
		// item, select that one.
		if (selectedValueOption) {
			// Call set_selectedValue to store the text as well
			this.set_selectedValue(e.options[e.selectedIndex].value, e.options[e.selectedIndex].text);
		}
		else if (count == 1) {
			// If there's only one item, default to it
			var defaultIndex = this._promptText ? 1 : 0;
			e.options[defaultIndex].selected = true;
			this.set_selectedValue(e.options[defaultIndex].value, e.options[defaultIndex].text);
		}
		else if (!inInit && !gettingList && !this._promptText && (e.options.length > 0)) {
			// If no prompt text or default item, select the first item
			this.set_selectedValue(e.options[0].value, e.options[0].text);
		}
		else if (!inInit && !gettingList) {
			this.set_selectedValue('', '');
		}

		if (e.childDropDown && !gettingList) {
			for(i = 0; i < e.childDropDown.length; i++) {
				e.childDropDown[i]._onParentChange();
			}
		}
		else {
			if (options && (Sys.Browser.agent !== Sys.Browser.Safari) && (Sys.Browser.agent !== Sys.Browser.Opera)) {
				// Fire the onchange event for the control to notify any listeners of the change
				if (document.createEvent) {
					var onchangeEvent = document.createEvent('HTMLEvents');
					onchangeEvent.initEvent('change', true, false);
					e.dispatchEvent(onchangeEvent);
				}
				else if( document.createEventObject ) {
					e.fireEvent('onchange');
				}
			}
		}

		// Disable the control if loading/prompt text is present and an empty list was populated
		if (this._loadingText || this._promptText || this._emptyText) {
			e.disabled = (count == 0);
			grayOut = !options;
			if (this._disableNode && (grayOut != Sys.UI.DomElement.containsCssClass(this._disableNode, this._disableClass))) {
				Sys.UI.DomElement.toggleCssClass(this._disableNode, this._disableClass);
			}
		}

		this.raisePopulated(Sys.EventArgs.Empty);
	},

	_onChange: function() {
		if (!this._isPopulated()) {
			return;
		}

		var e = this.get_element();
		
		// Record the selected value in the client state
		if ((-1 != e.selectedIndex) && !(this._promptText && (0 == e.selectedIndex))) {
			this.set_selectedValue(e.options[e.selectedIndex].value, e.options[e.selectedIndex].text);
		}
		else {
			this.set_selectedValue('', '');
		}
	},

	_onParentChange: function(evt, inInit) {
		var e = this.get_element();

		var knownCategoryValues = {};
		
		var parentIDs=[];
		if(this._parentControlIDs){
			for(var i=0;i<this._parentControlIDs.length;i++)
				parentIDs.push(this._parentControlIDs[i]);
		}
			
		while (parentIDs.length) {
			var parentElement = $get(parentIDs[0]);
			parentIDs=parentIDs.splice(1,parentIDs.length-1); //Remove first element
			if (parentElement && (-1 != parentElement.selectedIndex)){
				var selectedValue = parentElement.options[parentElement.selectedIndex].value;
				
				if (selectedValue && selectedValue != "") {
					knownCategoryValues[parentElement.CascadingDropDownCategory] = selectedValue;
					var ids=parentElement.CascadingDropDownParentControlIDs ? parentElement.CascadingDropDownParentControlIDs.split(",") : [];
					for(var i=0;i<ids.length;i++)
						parentIDs.push(ids[i]);
					continue;
				}
				else if (parentElement.CascadingDropDownOptional){
				    knownCategoryValues[parentElement.CascadingDropDownCategory] = parentElement.CascadingDropDownDefaultValue;
				}
				else{	// Found a required parent with no value, abort
					knownCategoryValues={};
					break;
				}
			}
		}
		
		var serializedValues = Sys.Serialization.JavaScriptSerializer.serialize(knownCategoryValues);
		if (serializedValues != '{}' && this._lastParentValues == serializedValues) {
			return;
		}
		
		this._lastParentValues = serializedValues;
		
		// we have a parent but it doesn't have a valid value
		if (serializedValues == '{}' && this._parentControlIDs) {
			this._setOptions(null, inInit);
			return;
		}
		

		// Show the loading text (if any)
		this._setOptions(null, inInit, true);

		if (this._servicePath && this._serviceMethod) {
			// Raise the populating event and optionally cancel the web service invocation
			var eventArgs = new Sys.CancelEventArgs();
			this.raisePopulating(eventArgs);
			if (eventArgs.get_cancel()) {
				return;
			}
			
			if(this._serviceExtraParams){
				for(var param in this._serviceExtraParams){
					knownCategoryValues[param]=this._serviceExtraParams[param];
				}
			}
			
			// Call the helper web service
			Sys.Net.WebServiceProxy.invoke(this._servicePath, this._serviceMethod, false, knownCategoryValues,
				Function.createDelegate(this, this._onMethodComplete), Function.createDelegate(this, this._onMethodError));
		}
	},

	_onMethodComplete: function(result, userContext, methodName) {
		// Update the DropDownList
		this._setOptions(result);
	},

	_onMethodError: function(webServiceError, userContext, methodName) {
		// Indicate failure
		var msg;
		if (webServiceError.get_timedOut()) {
			msg = "[Method timeout]"; // I18N
		}
		else {
			msg = String.format("[Method error {0}]", webServiceError.get_statusCode()); // I18N
		}
		var options = {};
		options[msg] = msg;
		this._setOptions(options);
	},

	get_parentControlID: function() { return null; },
	set_parentControlID: function(value) { this._parentControlIDs = [value] },
	
	get_parentControlIDs: function(value) { return this._parentControlIDs; },
	set_parentControlIDs: function(value) { this._parentControlIDs = value; },

	get_category: function() { return this._category; },
	set_category: function(value) { this._category = value; },

	get_optional: function() { return this._optional; },
	set_optional: function(value) { this._optional = value; },
	
	get_defaultValue: function() { return this._defaultValue; },
	set_defaultValue: function(value) { this._defaultValue = value; },
	
	get_parentCategory: function() { return this._parentCategory; },
	set_parentCategory: function(value) { this._parentCategory = value; },

	get_promptText: function() { return this._promptText; },
	set_promptText: function(value) { this._promptText = value; },

	get_promptValue: function() { return this._promptValue; },
	set_promptValue: function(value) { this._promptValue = value; },

	get_emptyText: function() { return this._emptyText; },
	set_emptyText: function(value) { this._emptyText = value; },

	get_emptyValue: function() { return this._emptyValue; },
	set_emptyValue: function(value) { this._emptyValue = value; },

	get_loadingText: function() { return this._loadingText; },
	set_loadingText: function(value) { this._loadingText = value; },

 	get_disableNode: function() { return this._disableNode; },
	set_disableNode: function(value) { this._disableNode = value; },

	get_labelNode: function() { return this._labelNode; },
	set_labelNode: function(value) { this._labelNode = value; },
	
 	get_disableClass: function() { return this._disableClass; },
	set_disableClass: function(value) { this._disableClass = value; },

	get_servicePath: function() { return this._servicePath; },
	set_servicePath: function(value) { this._servicePath = value; },

	get_serviceMethod: function() { return this._serviceMethod; },
	set_serviceMethod: function(value) { this._serviceMethod = value; },
	
	get_serviceExtraParams: function() { return this._serviceExtraParams; },
	set_serviceExtraParams: function(value) { this._serviceExtraParams = value; },
	
	get_selectedValue: function() {
		return this._selectedValue;
	},
	set_selectedValue: function(value, text) {
		if (this._selectedValue != value) {
			var oldValue = this._selectedValue;
			this._selectedValue = value;
			this.raiseSelectionChanged(new MySpace.UI.CascadingDropDownSelectionChangedEventArgs(oldValue, value));
		}
	},

	add_selectionChanged: function(handler) { this.get_events().addHandler('selectionChanged', handler); },
	remove_selectionChanged: function(handler) { this.get_events().removeHandler('selectionChanged', handler); },
	raiseSelectionChanged: function(eventArgs) {
		var handler = this.get_events().getHandler('selectionChanged');
		if (handler) {
			handler(this, eventArgs);
		}
	},
	
	add_populating: function(handler) { this.get_events().addHandler('populating', handler); },
	remove_populating: function(handler) { this.get_events().removeHandler('populating', handler); },
	raisePopulating: function(eventArgs) {
		/// The populating event can be used to provide custom data to
		/// CascadingDropDown instead of using a web service.  Just cancel the
		/// event (using the CancelEventArgs) and pass your own data to the
		/// _setOptions method.
		
		var handler = this.get_events().getHandler('populating');
		if (handler) {
			handler(this, eventArgs);
		}
	},
	
	add_populated: function(handler) { this.get_events().addHandler('populated', handler); },
	remove_populated: function(handler) { this.get_events().removeHandler('populated', handler); },
	raisePopulated: function(eventArgs) {
		var handler = this.get_events().getHandler('populated');
		if (handler) {
			handler(this, eventArgs);
		}
	}
}
MySpace.UI.CascadingDropDown.registerClass('MySpace.UI.CascadingDropDown', Sys.UI.Behavior);

(function() {
var Selector = function() {};

var reNth = /^(?:([-]?\d*)(n){1}|(odd|even)$)*([-+]?\d*)$/;

Selector.prototype = {
    document: window.document,
    attrAliases: {
        'for': 'htmlFor'
    },

    shorthand: {
        '\\#(-?[_a-z]+[-\\w]*)': '[id=$1]',
        '\\.(-?[_a-z]+[-\\w]*)': '[class~=$1]'
    },

    operators: {
        '=': function(attr, val) { return attr === val; }, 
        '!=': function(attr, val) { return attr !== val; }, 
        '~=': function(attr, val) { 
            var s = ' ';
            return (s + attr + s).indexOf((s + val + s)) > -1;
        },
        '|=': function(attr, val) { return getRegExp('^' + val + '[-]?').test(attr); }, 
        '^=': function(attr, val) { return attr.indexOf(val) === 0; }, 
        '$=': function(attr, val) { return attr.lastIndexOf(val) === attr.length - val.length; }, 
        '*=': function(attr, val) { return attr.indexOf(val) > -1; }, 
        '': function(attr, val) { return attr; }
    },

    pseudos: {
        'root': function(node) {
            return node === node.ownerDocument.documentElement;
        },

        'nth-child': function(node, val) {
            return getNth(node, val);
        },

        'nth-last-child': function(node, val) {
            return getNth(node, val, null, true);
        },

        'nth-of-type': function(node, val) {
            return getNth(node, val, node.tagName);
        },
         
        'nth-last-of-type': function(node, val) {
            return getNth(node, val, node.tagName, true);
        },
         
        'first-child': function(node) {
            return getChildren(node.parentNode)[0] === node;
        },

        'last-child': function(node) {
            var children = getChildren(node.parentNode);
            return children[children.length - 1] === node;
        },

        'first-of-type': function(node, val) {
            return getChildren(node.parentNode, node.tagName.toLowerCase())[0];
        },
         
        'last-of-type': function(node, val) {
            var children = getChildren(node.parentNode, node.tagName.toLowerCase());
            return children[children.length - 1];
        },
         
        'only-child': function(node) {
            var children = getChildren(node.parentNode);
            return children.length === 1 && children[0] === node;
        },

        'only-of-type': function(node) {
            return getChildren(node.parentNode, node.tagName.toLowerCase()).length === 1;
        },

        'empty': function(node) {
            return node.childNodes.length === 0;
        },

        'not': function(node, simple) {
            return !Selector.test(node, simple);
        },

        'contains': function(node, str) {
            var text = node.innerText || node.textContent || '';
            return text.indexOf(str) > -1;
        },
        'checked': function(node) {
            return node.checked === true;
        }
    },

    test: function(node, selector) {
        node = Selector.document.getElementById(node) || node;

        if (!node) {
            return false;
        }

        var groups = selector ? selector.split(',') : [];
        if (groups.length) {
            for (var i = 0, len = groups.length; i < len; ++i) {
                if ( rTestNode(node, groups[i]) ) { 
                    return true;
                }
            }
            return false;
        }
        return rTestNode(node, selector);
    },
    
    filter: function(nodes, selector) {
        nodes = nodes || [];

        var node,
            result = [],
            tokens = tokenize(selector);

        if (!nodes.item) { 
            for (var i = 0, len = nodes.length; i < len; ++i) {
                if (!nodes[i].tagName) { 
                    node = Selector.document.getElementById(nodes[i]);
                    if (node) { 
                        nodes[i] = node;
                    } else {
                        // skip invalid node
                    }
                }
            }
        }
        result = rFilter(nodes, tokenize(selector)[0]);
        clearParentCache();
        
        return result;
    },

    query: function(selector, root, firstOnly) {
        var result = query(selector, root, firstOnly);
        
        return result;
    }
};

var query = function(selector, root, firstOnly, deDupe) {
    var result =  (firstOnly) ? null : [];
    if (!selector) {
        return result;
    }

    var groups = selector.split(','); 
    if (groups.length > 1) {
        var found;
        for (var i = 0, len = groups.length; i < len; ++i) {
            found = arguments.callee(groups[i], root, firstOnly, true);
            result = firstOnly ? found : result.concat(found); 
        }
        clearFoundCache();
        return result;
    }

    if (root && !root.nodeName) {
        root = Selector.document.getElementById(root);
        if (!root) {
            
            return result;
        }
    }

    root = root || Selector.document;
    var tokens = tokenize(selector);
    var idToken = tokens[getIdTokenIndex(tokens)],
        nodes = [],
        node,
        id,
        token = tokens.pop() || {};
        
    if (idToken) {
        id = getId(idToken.attributes);
    }

    if (id) {
        if (id === token.id) { 
            nodes = [Selector.document.getElementById(id)] || root;
        } else { 
            node = Selector.document.getElementById(id);
            if (root === Selector.document || contains(node, root)) {
                if ( node && rTestNode(node, null, idToken) ) {
                    root = node; 
                }
            } else {
                return result;
            }
        }
    }

    if (root && !nodes.length) {
        nodes = root.getElementsByTagName(token.tag);
    }

    if (nodes.length) {
        result = rFilter(nodes, token, firstOnly, deDupe); 
    }
    clearParentCache();
    return result;
};

var contains = function() {
    if (document.documentElement.contains && !(Sys.Browser.agent === Sys.Browser.Safari && Sys.Browser.version < 3))  {
        return function(needle, haystack) {
            return haystack.contains(needle);
        };
    } else if ( document.documentElement.compareDocumentPosition ) {
        return function(needle, haystack) {
            return !!(haystack.compareDocumentPosition(needle) & 16);
        };
    } else  { 
        return function(needle, haystack) {
            var parent = needle.parentNode;
            while (parent) {
                if (needle === parent) {
                    return true;
                }
                parent = parent.parentNode;
            } 
            return false;
        }; 
    }
}();

var rFilter = function(nodes, token, firstOnly, deDupe) {
    var result = firstOnly ? null : [];

    for (var i = 0, len = nodes.length; i < len; i++) {
        if (! rTestNode(nodes[i], '', token, deDupe)) {
            continue;
        }

        if (firstOnly) {
            return nodes[i];
        }
        if (deDupe) {
            if (nodes[i]._found) {
                continue;
            }
            nodes[i]._found = true;
            foundCache[foundCache.length] = nodes[i];
        }

        result[result.length] = nodes[i];
    }

    return result;
};

var rTestNode = function(node, selector, token, deDupe) {
    token = token || tokenize(selector).pop() || {};

    if (!node.tagName ||
        (token.tag !== '*' && node.tagName.toUpperCase() !== token.tag) ||
        (deDupe && node._found) ) {
        return false;
    }

    if (token.attributes.length) {
        var attribute;
        for (var i = 0, len = token.attributes.length; i < len; ++i) {
            attribute = node.getAttribute(token.attributes[i][0], 2);
            if (attribute === undefined) {
                return false;
            }
            if ( Selector.operators[token.attributes[i][1]] &&
                    !Selector.operators[token.attributes[i][1]](attribute, token.attributes[i][2])) {
                return false;
            }
        }
    }

    if (token.pseudos.length) {
        for (var i = 0, len = token.pseudos.length; i < len; ++i) {
            if (Selector.pseudos[token.pseudos[i][0]] &&
                    !Selector.pseudos[token.pseudos[i][0]](node, token.pseudos[i][1])) {
                return false;
            }
        }
    }

    return (token.previous && token.previous.combinator !== ',') ?
            combinators[token.previous.combinator](node, token) :
            true;
};


var foundCache = [];
var parentCache = [];
var regexCache = {};

var clearFoundCache = function() {
    
    for (var i = 0, len = foundCache.length; i < len; ++i) {
        try { 
            delete foundCache[i]._found;
        } catch(e) {
            foundCache[i].removeAttribute('_found');
        }
    }
    foundCache = [];
    
};

var clearParentCache = function() {
    if (!document.documentElement.children) { 
        return function() {
            for (var i = 0, len = parentCache.length; i < len; ++i) {
                delete parentCache[i]._children;
            }
            parentCache = [];
        };
    } else return function() {}; 
}();

var getRegExp = function(str, flags) {
    flags = flags || '';
    if (!regexCache[str + flags]) {
        regexCache[str + flags] = new RegExp(str, flags);
    }
    return regexCache[str + flags];
};

var combinators = {
    ' ': function(node, token) {
        while (node = node.parentNode) {
            if (rTestNode(node, '', token.previous)) {
                return true;
            }
        }  
        return false;
    },

    '>': function(node, token) {
        return rTestNode(node.parentNode, null, token.previous);
    },
    '+': function(node, token) {
        var sib = node.previousSibling;
        while (sib && sib.nodeType !== 1) {
            sib = sib.previousSibling;
        }

        if (sib && rTestNode(sib, null, token.previous)) {
            return true; 
        }
        return false;
    },

    '~': function(node, token) {
        var sib = node.previousSibling;
        while (sib) {
            if (sib.nodeType === 1 && rTestNode(sib, null, token.previous)) {
                return true;
            }
            sib = sib.previousSibling;
        }

        return false;
    }
};

var getChildren = function() {
    if (document.documentElement.children) { 
        return function(node, tag) {
            return (tag) ? node.children.tags(tag) : node.children || [];
        };
    } else {
        return function(node, tag) {
            if (node._children) {
                return node._children;
            }
            var children = [],
                childNodes = node.childNodes;

            for (var i = 0, len = childNodes.length; i < len; ++i) {
                if (childNodes[i].tagName) {
                    if (!tag || childNodes[i].tagName.toLowerCase() === tag) {
                        children[children.length] = childNodes[i];
                    }
                }
            }
            node._children = children;
            parentCache[parentCache.length] = node;
            return children;
        };
    }
}();

var getNth = function(node, expr, tag, reverse) {
    if (tag) tag = tag.toLowerCase();
    reNth.test(expr);
    var a = parseInt(RegExp.$1, 10), 
        n = RegExp.$2, 
        oddeven = RegExp.$3, 
        b = parseInt(RegExp.$4, 10) || 0, 
        result = [];

    var siblings = getChildren(node.parentNode, tag);

    if (oddeven) {
        a = 2; 
        op = '+';
        n = 'n';
        b = (oddeven === 'odd') ? 1 : 0;
    } else if ( isNaN(a) ) {
        a = (n) ? 1 : 0; 
    }

    if (a === 0) { 
        if (reverse) {
            b = siblings.length - b + 1; 
        }

        if (siblings[b - 1] === node) {
            return true;
        } else {
            return false;
        }

    } else if (a < 0) {
        reverse = !!reverse;
        a = Math.abs(a);
    }

    if (!reverse) {
        for (var i = b - 1, len = siblings.length; i < len; i += a) {
            if ( i >= 0 && siblings[i] === node ) {
                return true;
            }
        }
    } else {
        for (var i = siblings.length - b, len = siblings.length; i >= 0; i -= a) {
            if ( i < len && siblings[i] === node ) {
                return true;
            }
        }
    }
    return false;
};

var getId = function(attr) {
    for (var i = 0, len = attr.length; i < len; ++i) {
        if (attr[i][0] == 'id' && attr[i][1] === '=') {
            return attr[i][2];
        }
    }
};

var getIdTokenIndex = function(tokens) {
    for (var i = 0, len = tokens.length; i < len; ++i) {
        if (getId(tokens[i].attributes)) {
            return i;
        }
    }
    return -1;
};

var patterns = {
    tag: /^((?:-?[_a-z]+[\w-]*)|\*)/i,
    attributes: /^\[([a-z]+\w*)+([~\|\^\$\*!=]=?)?['"]?([^'"\]]*)['"]?\]*/i,
    pseudos: /^:([-\w]+)(?:\(['"]?(.+)['"]?\))*/i,
    combinator: /^\s*([>+~]|\s)\s*/
};

var tokenize = function(selector) {
    var token = {},     
        tokens = [],    
        id,             
        found = false,  
        match;          

    selector = replaceShorthand(selector); 

    do {
        found = false; 
        for (var re in patterns) {
                if (!MySpace.Utils.hasOwnProperty(patterns, re)) {
                    continue;
                }
                if (re != 'tag' && re != 'combinator') { 
                    token[re] = token[re] || [];
                }
            if (match = patterns[re].exec(selector)) {
                found = true;
                if (re != 'tag' && re != 'combinator') {
                    if (re === 'attributes' && match[1] === 'id') {
                        token.id = match[3];
                    }

                    token[re].push(match.slice(1));
                } else { 
                    token[re] = match[1];
                }
                selector = selector.replace(match[0], ''); 
                if (re === 'combinator' || !selector.length) { 
                    token.attributes = fixAttributes(token.attributes);
                    token.pseudos = token.pseudos || [];
                    token.tag = token.tag ? token.tag.toUpperCase() : '*';
                    tokens.push(token);

                    token = {
                        previous: token
                    };
                }
            }
        }
    } while (found);

    return tokens;
};

var fixAttributes = function(attr) {
    var aliases = Selector.attrAliases;
    attr = attr || [];
    for (var i = 0, len = attr.length; i < len; ++i) {
        if (aliases[attr[i][0]]) { 
            attr[i][0] = aliases[attr[i][0]];
        }
        if (!attr[i][1]) { 
            attr[i][1] = '';
        }
    }
    return attr;
};

var replaceShorthand = function(selector) {
    var shorthand = Selector.shorthand;
    var attrs = selector.match(patterns.attributes); 
    if (attrs) {
        selector = selector.replace(patterns.attributes, 'REPLACED_ATTRIBUTE');
    }
    for (var re in shorthand) {
        if (!MySpace.Utils.hasOwnProperty(shorthand, re)) {
            continue;
        }
        selector = selector.replace(getRegExp(re, 'gi'), shorthand[re]);
    }

    if (attrs) {
        for (var i = 0, len = attrs.length; i < len; ++i) {
            selector = selector.replace('REPLACED_ATTRIBUTE', attrs[i]);
        }
    }
    return selector;
};

if (Sys.Browser.agent === Sys.Browser.InternetExplorer) { 
    Selector.prototype.attrAliases['class'] = 'className';
}

Selector = new Selector();
Selector.patterns = patterns;
MySpace.Utils.Selector = Selector;
})();

MySpace.Utils.hasOwnProperty = (Object.prototype.hasOwnProperty) ?
    function(o, prop) {
        return o && o.hasOwnProperty(prop);
    } : function(o, prop) {
        return !(typeof(o[prop]) === 'undefined' && o.constructor.prototype[prop] !== o[prop]);
    };

/* Flash Detection for MS Player */
Type.registerNamespace("MySpace.FlashDetection");
MySpace.FlashDetection = function() {
    return this;
};
MySpace.FlashDetection.prototype = {
    getFlashVersion: function (desc) {
	    var matches = desc.match(/[\d]+/g);
	    matches.length = 3;  // To standardize IE vs FF
	    return matches.join('.');
    },
    
    removeFlashVersionPrefix: function(completeVersion) {
        var version = completeVersion.split(" ");
        if (version.length == 1)
            return version;
        else if (version.length > 1)
            return version[1];
        else        
            return completeVersion;
    },

    hasRequiredFlashVersion: function (requiredVer){        
	    var requiredVerIE = (requiredVer.toString()+".0.0");
	    var requiredVerFF = requiredVer;
	    var hasRequiredVer = 0;
	    var pluginVer = "0.0.0";
	    
	    var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;	
	    if(plugin){
		    var str = navigator.plugins["Shockwave Flash"].description.split(" ");
		    for(var i=0;i<str.length;++i){
			    if(isNaN(parseInt(str[i]))) continue;
			    pluginVer = str[i]; 
		    }
		    hasRequiredVer = pluginVer >= requiredVerFF;	
	    }else if(navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.appVersion.indexOf("Win")!=-1)) {
	        try { //ie7
	            var a = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.7');
	            var versionVariable = this.removeFlashVersionPrefix(a.GetVariable('$version'));
	            var pluginVer = this.getFlashVersion(versionVariable);
	        }catch(e){ //ie6
		        try {
			        var a = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.7');
    	            versionVariable = a.GetVariable('$version');
			        pluginVer = this.getFlashVersion(versionVariable);
		        } catch (e) {
			        try {
				        var a = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.6');
				        versionVariable = a.GetVariable('$version');
				        pluginVer = '6.0.21';
			        } catch (e) {
				        try {
					        var a = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
					        versionVariable = a.GetVariable('$version');
					        pluginVer = this.getFlashVersion(versionVariable);
				        } catch (e) { }			
			        }		
		        }	
		    }           
            
	        var pv = pluginVer.split(".");	
	        var rv = requiredVerIE.split(".");	
    	    
	        rv[0] = parseInt(rv[0], 10);	
	        rv[1] = parseInt(rv[1], 10);	
	        rv[2] = parseInt(rv[2], 10);	
	        
	        pv[0] = parseInt(pv[0], 10);	
	        pv[1] = parseInt(pv[1], 10);	
	        pv[2] = parseInt(pv[2], 10);	        

	        hasRequiredVer = (pv[0] > rv[0] || (pv[0] == rv[0] && pv[1] > rv[1]) || (pv[0] == rv[0] && pv[1] == rv[1] && pv[2] >= rv[2])) ? true : false;      
	    }
    	
	    return hasRequiredVer;
    }
}


MySpace.UI.HistoryEventArgs=function(state){
	MySpace.UI.HistoryEventArgs.initializeBase(this);
	this._state = state;
};
MySpace.UI.HistoryEventArgs.prototype={
	get_state: function() {
		return this._state;
	}
};
MySpace.UI.HistoryEventArgs.registerClass('MySpace.UI.HistoryEventArgs', Sys.EventArgs);    

MySpace.UI._History=function(){
	MySpace.UI._History.initializeBase(this);

	this._appLoadHandler=null;
	this._clientId=null;
	this._currentEntry='';
	this._emptyPageUrl=null;
	this._historyFrame=null;
	this._historyInitialLength=0;
	this._historyLength=0;
	this._iframeLoadHandler=null;
	this._ignoreIFrame=false;
	this._ignoreTimer=false;
	this._historyPointIsNew=false;
	this._state={};
	this._timerCookie=0;
	this._timerHandler=null;
	this._uniqueId=null;
};
MySpace.UI._History.prototype={
	get_stateString: function(){
		var entry=decodeURIComponent(window.location.hash || '');
		if((entry.length > 0) && (entry.charAt(0) === '#')){
			entry=entry.substring(1);
		}
		return entry;    
	},
	add_navigate: function(handler){
		this.get_events().addHandler("navigate", handler);
	},
	remove_navigate: function(handler){
		this.get_events().removeHandler("navigate", handler);
	},
	addHistoryPoint: function(state, title){
		var initialState = this._state;
		for(var key in state){
			var value=state[key];
			if(value === null){
				if(typeof(initialState[key]) !== 'undefined'){
					delete initialState[key];
				}
			}
			else{
				initialState[key] = value;
			}
		}
		var entry=Sys.Serialization.JavaScriptSerializer.serialize(initialState);
		this._ignoreIFrame=true;
		this._historyPointIsNew=true;
		this._setState(entry, title);
	},
	dispose: function(){
		if (this._appLoadHandler) {
			Sys.Application.remove_load(this._appLoadHandler);
			delete this._appLoadHandler;
		}
		if (this._historyFrame) {
			Sys.UI.DomEvent.removeHandler(this._historyFrame, 'load', this._iframeLoadHandler);
			delete this._iframeLoadHandler;
			delete this._historyFrame;
		}
		if (this._timerCookie) {
			window.clearTimeout(this._timerCookie);
			delete this._timerCookie;
		}
		MySpace.UI._History.callBaseMethod(this, 'dispose');
	},
	initialize: function(){
		MySpace.UI._History.callBaseMethod(this, 'initialize');

		this._appLoadHandler = Function.createDelegate(this, this._onApplicationLoaded);
		Sys.Application.add_load(this._appLoadHandler);
	} ,
	setServerId: function(clientId, uniqueId){
		this._clientId = clientId;
		this._uniqueId = uniqueId;
	},
	setServerState: function(value){
		this._state.__s = value;
	},
        
	_navigate: function(entry){
		var state={};
		if(entry){
			try{
				state=Sys.Serialization.JavaScriptSerializer.deserialize(entry, true);
			}
			catch(e){}
		}

		if (this._uniqueId) {
			var oldServerEntry = this._state.__s || '';
			var newServerEntry = state.__s || '';
			if (newServerEntry !== oldServerEntry) {
			__doPostBack(this._uniqueId, newServerEntry);
			this._state = state;
			return;
			}
		}
		this._setState(entry);
		this._state = state;
		this._raiseNavigate();
	},
	_onApplicationLoaded: function(sender, args){
		Sys.Application.remove_load(this._appLoadHandler);
		delete this._appLoadHandler;

		if(Sys.Browser.agent === Sys.Browser.InternetExplorer){
			var frameId='__historyFrame';
			var frame=$get(frameId);
			if(!frame){ throw Error.invalidOperation("For the history feature to work in IE, the page must have an iframe with id '__historyFrame' and src set to point to a page that sets its title to the 'title' querystring parameter when loaded."); }
			var src=frame.src;
			this._emptyPageUrl=src + (src.indexOf('?') === -1 ? '?' : '&') + '_state=';
			this._historyFrame=frame;
			if(frame.readyState === 'loading'){
				this._ignoreIFrame=true;
			}
			this._iframeLoadHandler=Function.createDelegate(this, this._onIFrameLoad);
			Sys.UI.DomEvent.addHandler(this._historyFrame, 'load', this._iframeLoadHandler);
		}

		this._timerHandler=Function.createDelegate(this, this._onIdle);
		this._timerCookie=window.setTimeout(this._timerHandler, 100);

		var loadedEntry=this.get_stateString();
		if(loadedEntry !== this._currentEntry){
			this._navigate(loadedEntry);
		}
	},
	_onIdle: function(){
		delete this._timerCookie;

		var entry=this.get_stateString();
		if(entry !== this._currentEntry){
			if(!this._ignoreTimer){
				this._historyPointIsNew=false;
				this._navigate(entry);
				this._historyLength=window.history.length;
			}
		}
		else{
			this._ignoreTimer=false;
		}
		this._timerCookie=window.setTimeout(this._timerHandler, 100);
	},
	_onIFrameLoad: function(){
		if(!this._ignoreIFrame){
			var entry=this._historyFrame.contentWindow.location.search;
			var statePos=entry.indexOf('_state=');
			if((statePos !== -1) && (statePos + 7 < entry.length)){
				entry=entry.substring(statePos + 7);
				var next=entry.indexOf('&');
				if(next !== -1){
					entry=entry.substring(0, next);
				}
			}
			else{
				entry='';
			}
			this._historyPointIsNew=false;
			this._navigate(entry);
		}
		this._ignoreIFrame=false;
	},
	_onPageRequestManagerBeginRequest: function(sender, args){
		this._ignoreTimer=true;
	},
	_onPageRequestManagerEndRequest: function(sender, args){
		var dataItem=args.get_dataItems()[this._clientId], title;

		if(typeof(dataItem) !== 'undefined'){
			var state=dataItem[0];
			title=dataItem[1];
			this.setServerState(state);
			this._historyPointIsNew=true;
		}
		else{
			this._ignoreTimer=false;
		}
		var entry=Sys.Serialization.JavaScriptSerializer.serialize(this._state);
		if(entry === '{}'){
			entry='';
		}
		if(entry != this._currentEntry){
			this._ignoreTimer=true;
			this._setState(entry, title);
			this._raiseNavigate();
		}
	},
	_raiseNavigate: function() {
		var h=this.get_events().getHandler("navigate");
		var args=new MySpace.UI.HistoryEventArgs(this._state);
		if(h){
			h(this, args);
		}
		if(window.pageNavigate){
			window.pageNavigate(this, args);
		}
	},
	_setState: function(entry, title) {
		if(entry !== this._currentEntry){
			if(this._historyFrame && this._historyPointIsNew){
				var newFrameUrl=this._emptyPageUrl + entry +
					'&title=' + encodeURIComponent(title || document.title);
				if(this._historyFrame.src != newFrameUrl){
					this._ignoreIFrame=true;
					this._historyFrame.src=newFrameUrl;
				}
				this._historyPointIsNew=false;
			}
			this._ignoreTimer=false;
			this._currentEntry=entry;
			var currentHash=this.get_stateString();
			if(currentHash === '{}'){
				currentHash='';
				this._currentEntry=null;
			}
			if(entry !== currentHash){
				window.location.hash=entry ? encodeURIComponent(entry) : '';
			}
			if(title){
				document.title=title;
			}
		}
	}
}
MySpace.UI._History.registerClass('MySpace.UI._History', Sys.Component);

MySpace._Application.prototype.get_history=function(){
	var h=this._history;
	if(!h){
		h=this._history=new MySpace.UI._History();
		Sys.Application.registerDisposableObject(h);
		h.initialize();
	}
	return h;
};
