function MPlayer(o){
	/////////////////////////////////////////////////////////////
	// **** Initialize ****
	var version      = "2.0",
		template     = (o["template"]) ? o["template"] : "",
		name         = (o["name"])     ? o["name"]     : "mediaPlayer",
		width        = (o["width"])    ? o["width"]    : 100,
		height       = (o["height"])   ? o["height"]   : 100,
		templateUrl  = "",
		wfUrl        = "",
		playFrameUrl = "/shared/media/mplayer.jsp",
		isSafari     = ( navigator.userAgent.toLowerCase() ).indexOf("safari") > -1,
		pagePath     = "";

	/////////////////////////////////////////////////////////////
	// **** Public Params ****
	this.config           = getParamObject();
	this.playerObj        = null;
	this.isAudOrVid       = null;
	this.playerFrame      = null;
	this.workflowFrame    = null;
	this.playerFrameUrl   = null;
	this.loginRequired    = null;
	this.workflowFrameUrl = null;
	this.isActiveXEnabled = null;
	this.customCtrls      = true;
	this.isNested         = ( this.config != null && this.config["_mp"] ) ? true : false;
	if(this.isNested){ window.top["mplayerObj"] = this; }
	if(this.isNested){
		this.isActiveXEnabled = MPlayer.checkActiveX();
		this.playerFrame      = getDisplayFrame("p");
		this.workflowFrame    = getDisplayFrame("w");
	}

	/////////////////////////////////////////////////////////////
	// **** Public Methods ****
	this.getVersion        = function(){ return version; }
	this.setWorkflow       = function(url){ wfUrl = url; }
	this.setPlayerFrameUrl = function(url){ playFrameUrl = url; }
	this.setReferer        = function(url){ pagePath = url; }
	this.preLaunch         = function(o){ return true; }
	this.postLaunch        = function(o){}
	this.initPlayer        = function(o){}
	this.setTemplate          = function(t){ template = t; }
	this.setWidth             = function(w){ width = w; }
	this.setHeight            = function(h){ height = h; }
	//---------- play
	this.play = function(o){
		//var mpObj = ( window == window.top ) ? this : window.top["mplayerObj"];
		var mpObj;
		if(window==window.top || window.top["mplayerObj"]==null) mpObj=this;
		else if(window.top["mplayerObj"]!=null) mpObj=window.top["mplayerObj"];

		if(this.isNested){ if( mpObj.preLaunch(o) ) { mpObj.initPlayer(o); } }
		else if( mpObj.preLaunch(o) ) launch(o);
		mpObj.postLaunch(o);
	}
	//---------- runGenericRules
	this.runGenericRules = function(o){
		var stream_type = (o["type"]) ? o["type"].split("_") : ["v", "free"],
						  av, q;
		this.isAudOrVid = stream_type[0];
		this.loginRequired = (stream_type[1] != "free");
		if(o["adUrl"]) this.config.adUrl = o.adUrl;
		av = "&av=" + this.isAudOrVid;
		q = (wfUrl.indexOf("?")>-1) ? "&" : "?";
		if(this.loginRequired){
			var mediaId     = (o["w_id"])       ? unescape(o.w_id)                    : (o["r_id"]) ? unescape(o.r_id) : "NULL",
				catCode     = (o["catCode"])    ? "&catCode=" + o["catCode"]          : "",
				nsId        = (o["nsId"])       ? "&namespaceId=" + o["nsId"]         : "",
				startOffset = (o["start"])      ? "&startOffsetSeconds=" + o["start"] : "",
				endOffset   = (o["end"])        ? "&endTimeSeconds=" + o["end"]       : "",
				debugParam  = (mediaId=="NULL") ? "&refPath=" + pagePath              : "";
			this.workflowFrameUrl = wfUrl + q + "mediaId=" + mediaId + startOffset + endOffset + nsId + catCode + av + debugParam;
		}
		else{
			var mtype = "",
				murl  = (o[mtype="w"]) ? unescape(o.w) : (o[mtype="r"]) ? unescape(o.r) : "NULL";
			this.playerFrameUrl = playFrameUrl + "?media_url=" + escape(murl) + "&format=" + mtype + av;
		}
		try{ mp_swf.setVariable("mplayer_killResize", ( this.isAudOrVid=='a' ? 'yes' : 'no' ) ); }catch(e){} // set flash skin vars
	}
	//---------- setDisplay
	this.setDisplay = function(){
		if(this.playerObj!=null){ this.playerObj.kill(); }
		if(this.loginRequired){
			this.playerFrame.hide();
			try{
				if(isSafari && mp_swf){
					mp_swf.height= MPlayer.WORKFLOW_VIEW.x + "px";
				}
			}catch(e){}
			this.workflowFrame.init(MPlayer.WORKFLOW_VIEW, this.workflowFrameUrl);
		}
		else{
			var aView;
			this.workflowFrame.hide();
			if(this.config.resize!=null){
				var size = this.config.resize.split("x");
				try{
					if(isSafari && mp_swf){
						mp_swf.height="600px";
					}
				}catch(e){}
				aView = {w:size[0], h:size[1], x:null, y:null};
			}
			else{ aView = MPlayer.PLAYER_VIEW; }
			
			this.playerFrame.init(aView, this.playerFrameUrl);
		}
	}
	//---------- postWorkflow
	this.postWorkflow = function(o){
		this.workflowFrame.hide();
		this.playerFrameUrl = playFrameUrl + "?media_url=" + escape(o.url) + "&format=" + o.type + "&av=" + this.isAudOrVid;
		this.playerFrame.init(MPlayer.PLAYER_VIEW, this.playerFrameUrl);
	}

	/////////////////////////////////////////////////////////////
	// **** Private Methods ****
	function launch(o){
		var _left, _top;
		//var playedFromUrl = window.location.pathname;
		//o.refPath = playedFromUrl; // referer url
		buildUrl(o);
		if( width > screen.availWidth-12 ) width = screen.availWidth - 12;
		if( height > screen.availHeight-48 ) height = screen.availHeight - 48;
		_left = (screen.availWidth - width - 12) / 2;
		_top = (screen.availHeight - height - 48) / 2;
		void( window.open(templateUrl, name, "width=" + width + ",height=" + height + ",left=" + _left + ",top=" + _top) );
	}
	//---------- buildUrl
	function buildUrl(o){
		var q = "", d = "";
		o["_mp"] = "1"; //used to check if in player
		for(var key in o){
			d = (q=="") ? "" : "&";
			q += d + key + "=" + escape(o[key]);
		}
		if(template.indexOf("?")>-1) templateUrl = template + "&" + q;
		else templateUrl = template + "?" + q;
	}
	//---------- getParamObject
	function getParamObject(){
		var q = document.location.search;
		if(q!=""){
			var p = {};
			q = ( q.substring(1) ).split("&");
			for(var x=0; x<q.length; x++){
				var tmp = q[x].split("=");
				switch( typeof p[tmp[0]] ){
					case "undefined" : p[tmp[0]] = tmp[1]; break;
					case "string"    : var _tmp = p[tmp[0]]; p[tmp[0]] = [_tmp,tmp[1]]; break;
					case "object"    : var _tmp = p[tmp[0]].length; p[tmp[0]][_tmp] = tmp[1]; break;
				}
			}
			return p;
		}
		else return null;
	}
	//---------- getDisplayFrame
	function getDisplayFrame(id){
		var f     = document.createElement("iframe"), 
			fs    = f.style, 
			mpObj = window.top["mplayerObj"];

		f.id               = id;
		f.frameBorder      = "0";
		f.scrolling        = "no";
		fs.position        = "absolute";
		fs.top             = "-2000px";
		fs.left            = "-2000px";
		fs.zIndex          = "99999";
		fs.backgroundColor = "#000";
		fs.width           = "1px";
		fs.height          = "1px";
		f.hide             = function(){
								this.moveTo(-2000, -2000); 
								if(this.id=="w" && this["closeBtn"]){ this.closeBtn.className	= "wfCloseBtnOff"; }
							}
		f.moveTo           = function(x,y){
								this.previousLeft = this.style.left;
								this.previousTop = this.style.top;
								this.style.top = x+"px";
								this.style.left = y+"px";
								if(this.id=="w" && this["closeBtn"]){ this.closeBtn.className	= "wfCloseBtn"; }
							}
		f.resizeTo         = function(w,h){
								this.style.width = w+"px";
								this.style.height = h+"px";
							}
		f.show             = function(){
								this.style.left = (this["previousLeft"]) ? this.previousLeft : "0";
								this.style.top = (this["previousTop"]) ? this.previousTop : "0";
							}
		f.init             = function(view, url){
								if(this.id=="p" && view.h!=null && (!mpObj.isActiveXEnabled || !mpObj.customCtrls)) view.h += 85;
								if(this.id=="w"){ this.closeBtn = getCloseFrameBtn(this); }
								if(view.w!=null && view.h!=null) this.resizeTo(view.w, view.h);
								if(view.x!=null && view.y!=null) this.moveTo(view.x, view.y);
								document.body.appendChild(this);
								if(url!=null) this.src = url;
							}
		return f;
	}
	//---------- getCloseFrameBtn
	function getCloseFrameBtn(f){
		var d  = document.createElement("div"),
			ds = d.style;
		d.wfFrame   = f;
		d.innerHTML = "&nbsp;";
		d.className = "wfCloseBtn";
		d.onclick   = function(){ this.wfFrame.hide(); }
		document.body.appendChild(d);
		return d;
	}
}

/////////////////////////////////////////////////////////////
// **** Public Static Methods ****
//---------- Set Custom Controls
MPlayer.setControls = function(mpo, po){
	var ax = mpo.isActiveXEnabled;
	mpo.stop         = function(){ if(ax) po.controls.stop(); }
	mpo.pause        = function(){ if(ax) po.controls.pause(); }
	mpo.setVolume    = function(v){ if(ax) po.settings.volume=v; }
	mpo.resume       = function(){ if(ax) po.controls.play(); }
	mpo.getMediaTime = function(){ if(ax) return po.controls.currentPosition; }
	mpo.getPlayState = function(){ if(ax) return po.playState; }
	mpo.seek         = function(t){ if(ax) po.controls.currentPosition = t; }
	mpo.fullscreen   = function(){ if(ax && po.playState == 3) po.fullScreen='true'; }
	mpo.hide         = function(){ mpo.playerFrame.hide(); }
	mpo.show         = function(){ mpo.playerFrame.show(); }
	mpo.resizeTo     = function(w,h){
		mpo.playerFrame.resizeTo(w,h)
		if(ax){
			po.height = h;
			po.width  = w;
		}
		else{
			mpo.config.resize = w + "x" + h;
			mpo.play(mpo.config);
		}
	}
	mpo.moveTo = function(x,y){ mpo.playerFrame.moveTo(x,y); }
	mpo.mute = function(){
		if(ax){
			var b = po.mute;
			po.mute = (b=="true") ? "false" : "true";
		}
	}
}
//---------- Get media player plugin object
MPlayer.getPlayerObj = function(o){
	var _obj = null,
		plyr_tpl = (o.type!=null && o.type!="" && MPlayer[o.type]) ? MPlayer[o.type] : "";
	plyr_tpl = plyr_tpl.replace(/\[NAME\]/g, o.name);
	plyr_tpl = plyr_tpl.replace(/\[URL\]/g, o.url);
	plyr_tpl = plyr_tpl.replace(/\[HEIGHT\]/g, o.height);
	plyr_tpl = plyr_tpl.replace(/\[WIDTH\]/g, o.width);
	if(typeof o["resize"]!=undefined && o["resize"]==true){
		plyr_tpl = plyr_tpl.replace(/\[IERESIZE\]/g, "true");
		plyr_tpl = plyr_tpl.replace(/\[OTHERRESIZE\]/g, "4");
	}
	else{
		plyr_tpl = plyr_tpl.replace(/\[IERESIZE\]/g, "false");
		plyr_tpl = plyr_tpl.replace(/\[OTHERRESIZE\]/g, "1");
	}
	if(typeof o["controls"]!=undefined && o["controls"]==true){
		plyr_tpl = plyr_tpl.replace(/\[UIMODE\]/g, "none");
		plyr_tpl = plyr_tpl.replace(/\[CONTROLS\]/g, "0");
	}
	else{
		plyr_tpl = plyr_tpl.replace(/\[UIMODE\]/g, "full");
		plyr_tpl = plyr_tpl.replace(/\[CONTROLS\]/g, "1");
	}
	document.write("<div id='" + o.name + "Wrapper" + "'>" + plyr_tpl + "</div>");
	_obj = document[o.name];
	_obj.wrapper = document.getElementById(o.name + "Wrapper");
	_obj.kill = function(){ try{ this.controls.stop(); } catch(e){ this.wrapper.innerHTML = ""; } }
	return _obj;
}
//---------- Get Player Info
MPlayer.checkActiveX=function(){
	if( ( window.ActiveXObject && navigator.userAgent.indexOf('Windows') != -1 ) || window.GeckoActiveXObject ){
		var player=createActiveXObject("WMPlayer.OCX.7");
		if(player){ return true; }
		else{
			player=createActiveXObject("MediaPlayer.MediaPlayer.1");
			if(player){ return true; }
		}
		return false;
	}
	function createActiveXObject(id){
	  var control = null;
	  try{
	    if(window.ActiveXObject){ control = new ActiveXObject(id); }
	    else if(window.GeckoActiveXObject){ control = null; }
	  }catch(e){}
	  return control;
	}
}
//---------- Create SilverLight Player
MPlayer.SilverLightPlayer = function(o){
	var xaml	= (o["xaml"])   ? o["xaml"]   : "",
		name	= (o["name"])   ? o["name"]   : "SLPlayer",
		width	= (o["width"])  ? o["width"]  : 240,
		height	= (o["height"]) ? o["height"] : 180;

	this.preWrite = function(o){ return true; }
	this.getWidth = function(){ return width; }
	this.getHeight = function(){ return height; }
	this.getName = function(){ return name; }
	this.getXaml = function(){ return xaml; }

	this.writePlayer = function(o){
		var writePlayer = this.preWrite(o);
		if( writePlayer ){
			var plyr_tpl = MPlayer["sl"],
				width  = (o["width"])  ? o.width  : this.getWidth(),
				height = (o["height"]) ? o.height : this.getHeight(),
				name   = (o["name"])   ? o.name   : this.getName(),
				xaml   = (o["xaml"])   ? o.xaml   : this.getXaml(),
				mid	   = (o["mid"])    ? o["mid"] : "";
				slUrl  = "/media/player/viral_video_player.jsp?xaml=" + xaml + "&name=" + name + "&width=" + width + "&height=" + height + "&mid=" + mid,
				iframe = "<iframe src='" + slUrl + "' name='" + name + "' id='" + name + "' width='" + width + "' height='" + height + "' marginwidth='0' marginheight='0' scrolling='no' frameborder='0'></iframe>";
			document.write("<div id='" + name + "Frame" + "'>" + iframe + "</div>");
		}
	}
}
MPlayer.emailVideo = function(mediaId, metaId, title){
	var url    ="/media/email/send.jsp?mediaId=" + mediaId + "&metaId=" + metaId + "&title=" + escape(title),
		width  = 500,
		height = 470;
	if( width > screen.availWidth-12 ) width = screen.availWidth - 12;
	if( height > screen.availHeight-48 ) height = screen.availHeight - 48;
	var left = (screen.availWidth - width - 12) / 2,
		top  = (screen.availHeight - height - 48) / 2;
	void( window.open(url, name, "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top) );
}
//---------- object tag templates
MPlayer.w = "<object id='[NAME]' name='[NAME]' classid='CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6' src='[URL]' width='[WIDTH]' height='[HEIGHT]'><param name='autoStart' value='true'>"+
			"<param name='uiMode' value='[UIMODE]'><param name='animationAtStart' value='0'><param name='transparentAtStart' value='true'><param name='url' value='[URL]'>"+
			"<param name='stretchToFit' value='[IERESIZE]'><param name='defaultFrame' value='wmpEventFrame'><param name='align' value='middle'><param name='showStatusBar' value='1'><param name='showTracker' value='1'><param name='showDisplay' value='false'>"+
			"<embed type='application/x-mplayer2' pluginspage='http://www.microsoft.com/Windows/MediaPlayer/' src='[URL]' name='[NAME]' id='mplayer' width='[WIDTH]' "+
			"height='[HEIGHT]' autostart='1' displaysize='[OTHERRESIZE]' align='middle' animationatstart='0' transparentatstart='1' showstatusbar='[CONTROLS]' showdisplay='0' showtracker='[CONTROLS]' "+ 
			"showcontrols='[CONTROLS]' defaultFrame='wmpEventFrame' swliveconnect='0' nojava='1'></embed></object>";
MPlayer.q = "<object id='[NAME]' name='[NAME]' width='[WIDTH]' height='[HEIGHT]' classid='clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B' codebase='http://www.apple.com/qtactivex/qtplugin.cab'>"+
			"<param name='src' value='[URL]'><param name='autoplay' value='true'><param name='loop' value='false'><param name='controller' value='true'><param name='scale' value='true'>"+
			"<embed id='test' name='test' width='[WIDTH]' height='[HEIGHT]' type='video/quicktime' pluginspage='http://www.apple.com/quicktime/' src='[URL]' scale='true' autoplay='true' loop='false' "+
			"controller='true'></embed></object>";
MPlayer.r = "<object id='[NAME]' name='[NAME]' classid='clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA' width='[WIDTH]' height='[HEIGHT]'>"+
			"<param name='CONTROLS' value='imagewindow'/><param name='AUTOGOTOURL' value='false'/><param name='CENTER' value='true'/>"+
			"<param name='AUTOSTART' value='true'/><param name='CONSOLE' value='[NAME]'/><param name='NOLOGO' value='true'/><param name='SRC' value='[URL]'>"+
			"<embed name='[NAME]' id='[NAME]' type='audio/x-pn-realaudio-plugin' src='[URL]' height='[HEIGHT]' width='[WIDTH]' "+
			"controls='imagewindow' autogotourl='false' center='true' autostart='true' console='[NAME]' nologo='1' /></object>"+
			"<object id='realPlayerControl' classid='clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA' width='[WIDTH]' height='30'>"+
			"<param name='CONTROLS' value='ControlPanel'><param name='CONSOLE' value='[NAME]'><embed name='realPlayerControl' type='audio/x-pn-realaudio-plugin' height='30' "+
			"width='319' controls='controlpanel' console='[NAME]' autogotourl='false' src='[URL]' /></object>";