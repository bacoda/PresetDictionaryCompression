document.write('<SCR' + 'IPT LANGUAGE=JavaScript1.1 SRC="weather.com_files/swfobject.js?0422008"><\/script>');
	
if(typeof wxtools == 'undefined') var wxtools = {};
wxtools.FlookieURL = 'weather.com_files/flookies07.swf';
wxtools.FlookieReady = false;
wxtools.FlookieSWFLoaded = function() {
	wxtools.FlookieReady = true;			
	wxtools.FlookieSWF = swfobject.getObjectById(wxtools.flookieName + '_obj');
	wxtools.Flookie.broadcastMessage('ready');
};
wxtools.Flookie = function(flookieName) {
	this.flookieName = flookieName;
	wxtools.flookieName = flookieName;
	
	wxtools.FlookieSWF = null;
	this.init();
};
wxtools.Flookie.prototype = {
	init: function() {
		if (!wxtools.FlookieSWF) {
			var divElementId = this.flookieName + "_div"; 
			var params = {swliveconnect:"true", allowScriptAccess:"always", wmode: "transparent"};
			var attributes = {};
			attributes.id = this.flookieName  + '_obj';
			attributes.name = this.flookieName + '_obj';

			var div = document.createElement('div');
			div.id = divElementId;
			div.style.position = 'absolute';

			if (document.body.firstChild) {
				document.body.insertBefore(div, document.body.firstChild);
			} else {
				document.body.appendChild(div);
			}
			swfobject.embedSWF(wxtools.FlookieURL, divElementId, '1', '1', "8.0.0", "expressInstall.swf", {}, params, attributes);

			
			
		}
	},
	
	
	ready: function() { 
		
		return wxtools.FlookieReady; 
	},
	exists: function() {
		try{
			return wxtools.FlookieSWF.exists(this.flookieName); 
		}catch(err){
		
			return false;
		}
	},
	destroy: function() { 
		wxtools.FlookieSWF.destroy(this.flookieName); },
	get: function(param) { return wxtools.FlookieSWF.get(this.flookieName, param); },
	set: function(param, value) { 
		
		wxtools.FlookieSWF.set(this.flookieName, param, value);	
		
		},
	getAll: function() { return wxtools.FlookieSWF.getAll(this.flookieName); },
	setAll: function(params) { wxtools.FlookieSWF.setAll(this.flookieName, params); },
	remove: function(param) { wxtools.FlookieSWF.remove(this.flookieName, param); }
};
EventBroadcaster.initialize(wxtools.Flookie);

var Flookie = wxtools.Flookie;
