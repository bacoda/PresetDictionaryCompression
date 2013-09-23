var Advertiser = {    
    "INFO": {"CookieName" : "DERDB"},
    "GADC": {"CookieName" : "GADC","UserInfoKey" : "EUD"},
    "Login":{
        "LoginCookieName" : "Login",
        isLogin : function (){
           regEx = new RegExp(this.LoginCookieName+'[=;]','i');
           cookies = document.cookie.substring(0) + ';';
           if (cookies.search(regEx) == -1){
              return false;
           }
           return true;
        }
    },
	"Util":{
		"CookieDomain" : ".myspace.com", 
		"RandomSeed" : Date.parse(new Date()), 
		_documentURL: decodeURI(document.URL),
		Encode64: function (input){
		   var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		   var output = "";
		   var chr1, chr2, chr3, enc1, enc2, enc3, enc4 = "";
		   var i = 0;           
		   do{
			  chr1 = input.charCodeAt(i++);
			  chr2 = input.charCodeAt(i++);
			  chr3 = input.charCodeAt(i++);
			  enc1 = chr1 >> 2;
			  enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			  enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			  enc4 = chr3 & 63;
			  if (isNaN(chr2)){
				 enc3 = enc4 = 64;
			  }
			  else if (isNaN(chr3)){
				 enc4 = 64;
			  }
			  output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
			  chr1 = chr2 = chr3 = "";
			  enc1 = enc2 = enc3 = enc4 = "";
		   }
		   while (i < input.length);

		   return output;
		},
		Decode64: function (input){
		   var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		   var output = "";
		   var chr1, chr2, chr3, enc1, enc2, enc3, enc4 = "";
		   var i = 0;
		   input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		   do{
			  enc1 = keyStr.indexOf(input.charAt(i++));
			  enc2 = keyStr.indexOf(input.charAt(i++));
			  enc3 = keyStr.indexOf(input.charAt(i++));
			  enc4 = keyStr.indexOf(input.charAt(i++));
			  chr1 = (enc1 << 2) | (enc2 >> 4);
			  chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			  chr3 = ((enc3 & 3) << 6) | enc4;
			  output = output + String.fromCharCode(chr1);

			  if (enc3 != 64) output = output + String.fromCharCode(chr2);
			  if (enc4 != 64) output = output + String.fromCharCode(chr3);

			  chr1 = chr2 = chr3 = "";
			  enc1 = enc2 = enc3 = enc4 = "";
		   }
		   while (i < input.length);

		   return output;
		},
		SetCookie: function (cookieName, cookieValue, expirationDate){
		   var cookie = document.cookie = cookieName + "=" + cookieValue + "; path=/;"
		   if (this.CookieDomain != "")
		      cookie += " domain=" + Advertiser.Util.CookieDomain + ";";
		   if (expirationDate != null)
		      cookie += " expires=" + expirationDate + ";";
		      
		   document.cookie = cookie;
		},
		RemoveCookie: function (name){
		   if (this.CookieDomain == "")
			  document.cookie = name + '=; expires=Wed, 19-Jan-2005 08:28:17 GMT; path=/';
		   else
			  document.cookie = name + '=; domain=' + Advertiser.Util.CookieDomain +
				 '; expires=Wed, 19-Jan-2005 08:28:17 GMT; path=/';
		},
		ReadCookie: function (name){
		   regEx = new RegExp(name+'=([^;]*)','i');
		   if (document.cookie.search(regEx) == -1){
			  return null;
		   }
		   return RegExp.$1;
		},
		ReadCookieKey: function (cookieName,key){
		   var cookie = this.ReadCookie(cookieName);
		   if (cookie != null){
			  regEx = new RegExp(key+'=([^&]*)','i');
			  if (cookie.search(regEx) == -1){
				 return null;
			  }
			  return RegExp.$1;
		   }
		   return null;
		},
		ReadKey: function(source, key) {
		    if (source != null){
			  regEx = new RegExp(key+'=([^&]*)','i');
			  if (source.search(regEx) == -1){
				 return null;
			  }
			  return RegExp.$1;
		   }
		   return null;
		},
		SetKey: function(source, key, value) {
            if (source.indexOf(key+'=') != -1)
            {
                var newPair = key + '=' + value;
                regEx = new RegExp(key+'=([^&]*)','i');
                source = source.replace(regEx, newPair);
            }
            else
            {
                source = source + '&' + key + '=' + value;
            }
            return source;
		},
		AddToCookie: function (cookieName, key, value, isSession)
		{
		   var expirationDate = null;
		   if(!isSession)
		   {
			  expirationDate = new Date();
			  expirationDate.setYear(expirationDate.getFullYear()+1);
			  expirationDate = expirationDate.toGMTString();
		   }

		   var unencodedValue = null;
		   var encodedValue = Advertiser.Util.ReadCookie(cookieName);
		   if (encodedValue != null)
		   {
			  unencodedValue = Advertiser.Util.Decode64(unescape(encodedValue));
		   }

		   if (unencodedValue != null)
		   {
		      unencodedValue = Advertiser.Util.SetKey(unencodedValue, key, value);
			  Advertiser.Util.SetCookie(cookieName, Advertiser.Util.Encode64(unencodedValue), expirationDate);
		   }
		},
		getJSVar: function (name){
		   var v = eval("typeof("+name+")");
		   if(v == "undefined")
			  return null;

		   return eval(name);
		},
		AddEvent: function(obj, evType, fn){
			if (obj.addEventListener){ 
				obj.addEventListener(evType, fn, false); 
				return true; 
			} 
			else if (obj.attachEvent){ 
				var r = obj.attachEvent("on"+evType, fn); 
				return r; 
			} 
			else { 
				return false; 
			} 
		}
    },
    "SDC":{
        "DisplayedFriendEUD" : "",
        //do not change DisplayedFriendEUD name 
        "PixelSrc" : "http://seg.fimserve.com/relay?",
        "RSIKey" : "rsi_want",
        "MindsetKey" : "bl",
        targetValuesSet : false,
        setTargetValues : function(){        
      		var targetValue = Advertiser.Util.ReadCookie(Advertiser.INFO.CookieName);
      		
      		if (targetValue != null)
				targetValue = Advertiser.Util.Decode64(targetValue);

			if (targetValue == null || targetValue.length === 0) return;

			var gender = Advertiser.Util.ReadKey(targetValue, "gender");
			var age = Advertiser.Util.ReadKey(targetValue, "age");
			var culture = Advertiser.Util.ReadKey(targetValue, "cultuserpref");

			try{
				sdcgender = gender == "M" ? "0" : "1";
				sdcage = age;

				if (culture === "21514") sdcculture = 16;

				Advertiser.SDC.targetValuesSet = true;
			}
			catch (e) {}
        },
		writePixel: function(){
			if (typeof(rsi_want) != 'undefined'){
				Advertiser.Util.AddToCookie(Advertiser.INFO.CookieName, Advertiser.SDC.RSIKey, rsi_want, true);
			}
			
			if (typeof(mm_want) != 'undefined'){
				Advertiser.Util.AddToCookie(Advertiser.INFO.CookieName, Advertiser.SDC.MindsetKey, mm_want, true);
			}
		
			derdbValue = Advertiser.Util.ReadCookie(Advertiser.INFO.CookieName);
			googleValue = Advertiser.Util.ReadCookieKey(Advertiser.GADC.CookieName,Advertiser.GADC.UserInfoKey);

			if ((derdbValue == null || derdbValue.length == 0) && (googleValue == null || googleValue.length == 0)) return;

			fimpixelsrc = Advertiser.SDC.PixelSrc;

			if (derdbValue != null && derdbValue.length != 0){
				fimpixelsrc += 'payload=' + derdbValue;

				if (googleValue != null && googleValue.length != 0)
					fimpixelsrc += '&';
			}

			if (googleValue != null && googleValue.length != 0)
				fimpixelsrc += 'eud=' + googleValue;

			fimpixelstyle = 'display:none; position:absolute; left:0px; top:0px; border-width:0px;height:1px;width:1px;';

			fimpixel = document.createElement('img');
			fimpixel.setAttribute('src', fimpixelsrc);
			fimpixel.setAttribute('style', fimpixelstyle);
			fimpixel.style.display = 'none';

			document.getElementsByTagName('body')[0].appendChild(fimpixel);
			 
            Advertiser.Util.RemoveCookie(Advertiser.Login.LoginCookieName);
        }
    },
    "DC":{
        "AdSource" : "",       
        syncBanner: function (tag, which){
        	//only fimserve on videos splash
			var uri = decodeURI(document.URL);
			var fuseaction = '';
			try{
				fuseaction = AdHelper.queryString('fuseaction');
			}			
			catch (e) {}
        	
        	if(uri=="http://vids.myspace.com" || uri=="http://vids.myspace.com/" || fuseaction === "vids.splash") {


        		Advertiser.DC.AdSource = "";
        		return;
        	}
        
	        switch (tag){   
	         	case null:
		        case "null":
		        	var defaultTag = Advertiser.Util.getJSVar("defaultTag");
			        if (defaultTag && defaultTag != '')
				        this.AdSource = defaultTag;
			        break;
		        default:
			        this.AdSource = tag;
			        break;			
	        }
	        
	        if(this.AdSource != "")
	        {
	        	Advertiser.DC.SetByPlayer = true;
				switch (which){
					case "300x250": 
						ad_wrapper("tkn_medrec", "", "x14");
						ad_wrapper("tkn_medrecsonybmg", "", "x14");
						break;
					case "728x90": 
						ad_wrapper("tkn_leaderboard", "", "frame1");
						ad_wrapper("tkn_leaderboardsonybmg", "", "frame1");
						break;
				}
			}
        },
        "RecoverAd" : false,
        "SetByPlayer" : false
    }, 
    "CMS":{"BlueLithium" : "myspace_bluelithium"}
}
// -- End of Advertiser Object
/* AdHelper Object */
var AdHelper = {	
    _ad_randomseed: Date.parse(new Date()),
    _randomNumber: '',
    _adCount: 1,
    _friendId : null,
    _keys: [], // url name/value pairs arrays
    _values: [],
    _livePreviewUrl: null,
    _qsParsed:false,
    _documentURL:document.URL,
    _setRandom: function(){
	    var randomm = 714025;
	    var randoma = 4096;
			var randomc = 150889;
			var rndSeed = (this._ad_randomseed * randoma + randomc) % randomm;
	    return rndSeed / randomm;
    },
    _parseQueryString: function(){
        this._qsParsed = true;
        var uri = decodeURI(this._documentURL);
	    var query = uri.indexOf("?") == -1 ? "" : uri.substring(uri.indexOf("?")+1);
	    var pairs = query.split("&");
	    var j = pairs.length;
	    for (var i = 0; i < j ; i++){
		    var pos = pairs[i].indexOf('=');
		    if (pos >= 0){
			    var argname = pairs[i].substring(0,pos);
			    var value = pairs[i].substring(pos+1);
			    this._keys[this._keys.length] = argname;
			    this._values[this._values.length] = value;
		    }
	    }
    },    
	get_adCount: function(){
	    return this._adCount;
	},	
	set_adCount: function(value){
	    /// <param name="value" type="integer"></param>
	    this._adCount = value;
	},	
	incrementAdCount: function(){
	    this._adCount++;
	},	
	queryString: function(key){
	    /// <param name="key" type="string"></param>
	    if (!this._qsParsed) this._parseQueryString();
	    var value = null;
	    var j = this._keys.length;
	    for (var i = 0 ; i < j; i++){
		    if (this._keys[i] == key){
			    value = escape(this._values[i].toLowerCase());
			    break;
		    }
	    }
	    return value;
    },	
	getID: function(name){
        var v = this.queryString(name);
        if (v != null)
	        return v;
        else
	        return 0;
    },
    getVar: function(name){
	    var v = eval("typeof("+name+")");
	    if(v == "undefined")
		    return null;
	    return eval(name);
    },
    getVarOrId: function(varName,queryName){
	    var v = this.getVar(varName);
	    if (v == null)
		    return null;
	    else if (v != 0)
		    return v;
	    else
		    return this.getID(queryName);
    },
    getDownloadCategory: function (){
    
    	var dcat = this.queryString('cat');
    	if(dcat == null || dcat === '')
    	{
    		if (this.queryString('fuseaction') != null && this.queryString('fuseaction') === 'downloads')
				return 0;
    		else
				return null;
		}
           
		if(dcat=="audiovideo")return 1;
	    if(dcat=="business")return 2;
	    if(dcat=="camera")return 3;
	    if(dcat=="desktopenhancements")return 4;
	    if(dcat=="devtools")return 5;
	    if(dcat=="homeanded")return 6;
	    if(dcat=="internet")return 7;
	    if(dcat=="isit")return 8;
	    if(dcat=="utilities")return 9;
	    if(dcat=="spywarecenter")return 10;
	    if(dcat=="powerdownloader")return 11;
	    if(dcat=="mobile")return 12;
	    if(dcat=="mac")return 13;
	    return 0;		
    },
    getMySpaceTVHomeCategory: function (){
	    if(this._documentURL=="http://vids.myspace.com" || this._documentURL=="http://vids.myspace.com/"){
	        return "1";
	    }
	    else{
	        var qs_action = this.getID('fuseaction');
	        var qs_placement = this.getID('placement');
	        if(qs_action=="vids.splash"){
	            if(qs_placement=="animals")return "2";
	            if(qs_placement=="comedy")return "3";
	            if(qs_placement=="entertainment")return "4";
	            if(qs_placement=="games")return "5";
	            if(qs_placement=="music")return "6";
	            if(qs_placement=="sports")return "7";	    
	            return "1";
	        }
	    }
	    
	    return null;		
    },    
    isPremiumVideoContent: function (tvcatmaster_id,page){
        if( page != 21003206 && 
        	page != 21003306 &&
        	page != 21103206 && 
        	page != 21103306 &&
        	page != 91000017 && 
        	page != 91100017) 
        		return false;
        if(tvcatmaster_id !== 400) return false; 
        var vp = document.getElementById("vplayer");
	    if(vp == null)return false;
        return true;
    },
    getTVCatMasterId: function(){
        var tvcatmaster_id = this.getVar("tvcatmasterid");
        if(tvcatmaster_id == null || isNaN(tvcatmaster_id))
                return null ;
        switch(tvcatmaster_id){
            case 1:
            case 2:
                tvcatmaster_id = 0;
                break;
            case 7:
                tvcatmaster_id = 300;
                break;
            case 9:
                tvcatmaster_id = 100;
                break;
            case 15:
                tvcatmaster_id = 200;
                break;
            case 8:
                tvcatmaster_id = 1001;
                break;
            default:
               break;                              
        }        
        return tvcatmaster_id;
    },     
    get_friendId: function(){ //el=str, case_sensitive=bool
	    if(this._friendId != null){
	        return this._friendId;
	    }	
	    
	    if(typeof(MySpace) != 'undefined' && typeof(MySpace.ClientContext) != 'undefined' &&
	    	typeof(MySpace.ClientContext.DisplayFriendId) != 'undefined' && 
	    	MySpace.ClientContext.DisplayFriendId > 0){
	 		this._friendId = MySpace.ClientContext.DisplayFriendId;
	    }
	    else
	    {
			var urls = this._documentURL;
			//stripTicks
			urls = urls.replace( /'/g, "" );
			// look for friend, channel, or group id
			var re = new RegExp( "\\?[\\w\\W]*(friendid|channelid|groupid)=([^\\&\\?#]*)", "i" );
			var arr = re.exec(urls);
			if(arr && arr.length>1){	
				this._friendId = arr[2] ;
			}
		}
	    return this._friendId;
    },
    readCookie: function(name){
        var nameEQ = name + "=";
	    var ca = document.cookie.split(';');
	    var j = ca.length;
	    for(var i=0;i < j ;i++){
		    var c = ca[i];
		    while (c.charAt(0)==' ') {c = c.substring(1,c.length);}
		    if (c.indexOf(nameEQ) === 0) {return c.substring(nameEQ.length,c.length);}
	    }
	    return "Unknown";
    },
    get_randomNumber: function(){ 
        if(this._randomNumber.length===0){            
            this._randomNumber = this._setRandom() + "";
        }
        return this._randomNumber;
    },
    get_livePreviewUrl : function() {
        if(this._livePreviewUrl != null){
	        return this._livePreviewUrl;
	    }
	    	
    	var env = this.queryString('env');
    	var cid = this.queryString('cid');

		if (cid != null && cid !== '' && env != null & env !== '') {
			this._livePreviewUrl = unescape(env) + '?creativeId=' + cid;
			return this._livePreviewUrl;
		}
		return null;
    }
}
/* End AdHelper */

/* AdCallAd Object */
function AdCallAd (page, subd){
	/// <param name="page" type="string"></param>
	/// <param name="subd" type="string"></param>
	var regex = /,/;
	if(regex.test(page)){
		siteArr = page.split(",");
		this._page = siteArr[1];
	}
	this._subd = subd;
}

AdCallAd.prototype = {
	_page : '',
	_pos : '',
	_adWidth : 0,
	_adHeight : 0,
	_subd : '',
	_friendID : 0,
	_queryString : "",
	get_page:function(){
		return this._page;
	},
	set_page:function(value){
		this._page = value;
	},
	get_pos:function(){
		return this._pos;
	},
	get_adWidth:function(){
		return this._adWidth;
	},
	get_adHeight:function(){
		return this._adHeight;
	},
	get_subd:function(){
		return this._subd;
	},
	get_friendID:function(){
		return this._friendID;
	},	
	get_queryString:function(){
		return this._queryString;
	},	
    setAdProperties:function(givenPos, defaultWidth, defaultHeight, defaultPos, defaultFriendID){
		/// <param name="givenPos" type="String"></param>
		/// <param name="defaultWidth" type="Number" integer="true"></param>
		/// <param name="defaultHeight" type="Number" integer="true"></param>
		/// <param name="defaultPos" type="String"></param>
		/// <param name="defaultFriendID" type="String"></param>
		this._pos = givenPos;

		switch (givenPos){
			case 'frame1':
				this._friendID = AdHelper.get_friendId();
				this._adWidth=728;
				this._adHeight=90;
				this._pos = 'leaderboard';
				this._subd = 'deLB';
				break;
			case 'top':
				this._friendID = AdHelper.get_friendId();
				this._adWidth=468;
				this._adHeight=60;
				this._pos = 'banner';
				this._subd = 'deBR';
				break;
			case 'x08':
				this._friendID = AdHelper.get_friendId();
				this._adWidth=430;
				this._adHeight=600;
				this._pos = 'halfpage';
				this._subd = 'deHP';
				break;
			case 'x14':
				this._adWidth=300;
				this._adHeight=250;
				this._pos = 'mrec';
				this._subd = 'deMR';
				this._friendID = AdHelper.get_friendId();
				break;
			case 'x15':
				this._friendID = AdHelper.get_friendId();
				this._adWidth=160;
				this._adHeight=600;
				this._pos = 'skyscraper';
				this._subd = 'deSK';
				break;
			case 'x77':
				this._friendID = AdHelper.get_friendId();
				this._adWidth=1;
				this._adHeight=1;
				this._pos = '1x1';
				this._subd = 'deSB';
				break;
			case 'x78': // login page
				this._adWidth=750;
				this._adHeight=600;
				this._pos = 'interstitial';
				this._subd = 'deSB';
				break;
			case 'uhpfp': //uhp feature profile
				this._adWidth=200;
				this._adHeight=170;
				this._subd = 'deFP';
				break;
			case 'west':
				this._adWidth=440;
				this._adHeight=160;
				this._subd = 'deWB';
				break;
			case 'east':
				this._friendID = AdHelper.get_friendId();
				this._adWidth=300;
				this._adHeight=100;
				this._subd = 'deEB';
				break;
			case 'fmovl':
				this._adWidth=229;
				this._adHeight=216;
				this._subd = 'deFML';
				break;
			case 'fmovr':
				this._adWidth=229;
				this._adHeight=216;
				this._subd = 'deFMR';
				break;
			case 'vrec':
				this._adWidth=240;
				this._adHeight=400;
				this._subd = 'deVR';
				break;
			case 'nfblog':
			   	this._adWidth=300;
			   	this._adHeight=115;
			   	this._subd = 'desb';
			   	break;
			case 'slogo':
				this._adWidth=80;
				this._adHeight=42;
				this._subd = 'desb';
				break;
			case '923x250':
				this._adWidth=923;
				this._adHeight=250;
				this._subd = 'desb';
				break;
			case 'ccpixel':
				this._friendID = AdHelper.get_friendId();
				this._adWidth=1;
				this._adHeight=1;
				this._subd = 'deSB';
         		break;
			case 'mfapp1':
				this._adWidth=350;
				this._adHeight=100;
				this._subd = 'dewb';
				break;
			case 'mfapp2':
				this._adWidth=350;
				this._adHeight=100;
				this._subd = 'deeb';
				break;
			case 'mfapp3':
				this._adWidth=350;
				this._adHeight=100;
				this._subd = 'defml';
				break;
			case 'mfapp4':
				this._adWidth=350;
				this._adHeight=100;
				this._subd = 'defmr';
				break;
		   	case '540x200':
				this._adWidth=540;
				this._adHeight=200;
				this._subd = 'desb';
				break;
			case '942x250':
				this._adWidth=942;
				this._adHeight=250;
				this._subd = 'desb';
				break;
			case '620x50':
				this._adWidth=620;
				this._adHeight=50;
				this._subd = 'deeb';
				break;
			default:
				this._adWidth = defaultWidth;
			   	this._adHeight = defaultHeight;
			   	this._pos = defaultPos;
				this._friendID = defaultFriendID;
				break;
		}		
		//parse the cookie for JP
		var cultureCookie = AdHelper.readCookie('MSCulture');
		var cookieKey = '&IPCulture=';
		var keyindex = cultureCookie.indexOf(cookieKey);
		var culture = cultureCookie.substring(keyindex + cookieKey.length,cultureCookie.length);
		if (culture.indexOf('&') >= 0){ 
			culture = culture.substring(0, culture.indexOf('&'));
		}
		if (culture.indexOf('ja-JP') >= 0){
			this._subd = 'adjp01';
			switch (givenPos){
				case 'frame1':
					this._pos = 'leaderboard&params.styles=leaderboard';
					break;
				case 'x08':
					this._pos = 'halfpage&params.styles=halfpage';
					break;
				case 'x78': // login page
					this._pos = 'interstitial&params.styles=halfpage';
					break;
				default:
					//keep given position
					break;
			}	
		} else if (culture.indexOf('pl-PL') >= 0 && givenPos == 'frame1'){
			this._adWidth=750;
			this._adHeight=100;
		}
		
	},	
	addParam: function(pKey, pValue){
		/// <param name="pKey" type="String"></param>
		/// <param name="pKey" type="String"></param>
		/// <returns type="Boolean"></returns>
		
		//optional parameter
		var checkNotZero = this.addParam.arguments[2];
		
		if(pValue != null && pValue !== ''){
			if(checkNotZero){
				if(!pValue){
					return false;
				}
			}
			this._queryString += "&" + pKey + "=" + pValue;
			return true;
		}
		else
			return false;
	}
}
/* End AdCallAd Object */

function sdc_wrapper(){
	var argv    = sdc_wrapper.arguments;
	var tokenID = argv[0];
	var page    = argv[1];
	var pos     = argv[2].toLowerCase();   
      
	var ctr = document.getElementById(tokenID);
	if (ctr == null) 
		return;
   
	var ad = new AdCallAd(page, 'deLB');
	
	if (!Advertiser.DC.RecoverAd && AdHelper.isPremiumVideoContent(AdHelper.getTVCatMasterId(), ad.get_page()))
	{
		Advertiser.DC.RecoverAd = true;
		var func = "sdc_wrapper('" + argv[0] + "','" + argv[1] + "','" + argv[2] + "')";
		setTimeout(func, 5000);
		return;
	}
	
	ad.setAdProperties(pos, 728, 90, 'leaderboard&params.styles=leaderboard', AdHelper.get_friendId());		
	
	var qsHeight = AdHelper.queryString('adHeight');
	var qsWidth = AdHelper.queryString('adWidth');
	var livePreviewUrl = AdHelper.get_livePreviewUrl();
	
	if(livePreviewUrl != null && qsHeight == ad.get_adHeight() && qsWidth == ad.get_adWidth()){
		frameURL = livePreviewUrl;
	}
	else if (ad.get_subd() === 'adjp01') {
  		ad_wrapper(tokenID, page, argv[2]);
  		return;
	}
	else{
	    var fuseaction = AdHelper.queryString('fuseaction');
	    
	    if (!Advertiser.SDC.targetValuesSet && (fuseaction === 'user' || fuseaction === 'ad')) {
		    Advertiser.SDC.setTargetValues();
	    }
	    	
		if(fuseaction === "user.viewprofile" && AdHelper.queryString('pe') == "1")
			ad.set_page('11130003');	
		else if(fuseaction === 'sitesearch.results') {
			var searchType = AdHelper.queryString('type');
			if(searchType === 'music')
				ad.set_page('21000002');
			else if(searchType === 'myspacetv')
				ad.set_page('91000003');
		}

		if(typeof(MySpace) != 'undefined' && typeof(MySpace.ClientContext) != 'undefined' 
			&& MySpace.ClientContext.UserId == AdHelper.get_friendId()){
			if(fuseaction === "viewimage")
				ad.set_page('11013108');
			else if(fuseaction === "viewtaggedphoto")
				ad.set_page('11011127');
			else if(fuseaction === "user.viewalbums2")
				ad.set_page('11511119');
			else if(fuseaction === "user.viewpicture")
				ad.set_page('11513004');
		}	   
	    
        ad.addParam("l", ad.get_page());
		ad.addParam("pos", ad.get_pos());
   		ad.addParam("rnd", AdHelper.get_randomNumber().substring(2,11));
		ad.addParam("fid", ad.get_friendID(), true);
		ad.addParam("cat", AdHelper.getVar("ad_Topic_ID"), true);
		ad.addParam("dwcat", AdHelper.getDownloadCategory());
		ad.addParam("tvcat", AdHelper.getVar("tvcat"), true);
		ad.addParam("tvch", AdHelper.getVar("tvchanid"), true);
		ad.addParam("tvvid", AdHelper.getVar("videoid"), true);
		ad.addParam("tvhcat", AdHelper.getMySpaceTVHomeCategory(), true);
		ad.addParam("tvmcat", AdHelper.getTVCatMasterId());
		ad.addParam("sp", AdHelper.queryString("schoolID"));
		ad.addParam("s", AdHelper.queryString("special"));
		ad.addParam("neg", AdHelper.getVar("sdcgender"));
		ad.addParam("ega", AdHelper.getVar("sdcage"));
		ad.addParam("luc", AdHelper.getVar("sdcculture"));
	    ad.addParam("uhpt", AdHelper.getVar("uhpt"));
	    ad.addParam("nwcat", AdHelper.getVar("nwcat"));
	    ad.addParam("nwvert", AdHelper.getVar("nwvert"));
		ad.addParam("gsku", AdHelper.getVar("gsku"));
		ad.addParam("gcat", AdHelper.getVar("gcat"));
		
		if(fuseaction === "apps.gallery") {
	    	var appCat = AdHelper.queryString("category");
	    	if(appCat != null && appCat != "") {
	    		appCat = "10" + appCat;
	    		ad.addParam("dwcat", appCat);
	    	}
	    }

		if(document.getElementById("bandgenre1")){
			ad.addParam("bg1", document.getElementById("bandgenre1").value, true);
			ad.addParam("bg2", document.getElementById("bandgenre2").value, true);
			ad.addParam("bg3", document.getElementById("bandgenre3").value, true);
			
			if(document.getElementById("labeltype"))
			{
				switch (document.getElementById("labeltype").value){ 
					case 'Major':
						ad.addParam('mlt', '2');
						break;
					case 'Indie':
						ad.addParam('mlt', '3');
						break;
					default:
						ad.addParam('mlt', '1');
						break;			
				}
			}	
		}
	
		var uri = decodeURI(AdHelper._documentURL);
		if(uri=="http://latino.myspace.com" || uri=="http://latino.myspace.com/" 
			|| (uri.indexOf("latino.myspace.com") > 0 && fuseaction === "splash")) {
			ad.addParam('luc', '16');
       	}
       	
       	if(uri=="http://us.myspace.com" || uri=="http://us.myspace.com/" 
		  	|| (uri.indexOf("us.myspace.com") > 0 && fuseaction === "splash")) {
			ad.addParam('luc', '14');
		}
		
		var ged = Advertiser.Util.ReadCookieKey(Advertiser.GADC.CookieName,Advertiser.GADC.UserInfoKey);
		if (ged == null){
			ged = "";
		}		
		
		ged += Advertiser.SDC.DisplayedFriendEUD;
		ad.addParam("ged", ged);
		
		if(Advertiser.DC.SetByPlayer && (ad.get_pos() == 'mrec' || ad.get_pos() == 'leaderboard'))
			return;

		frameURL = "http://"+ ad.get_subd() +".opt.fimserve.com/adopt/?r=h" + ad.get_queryString();
	}
	ctr.innerHTML = "<IFRAME width=\""+ ad.get_adWidth() +"\" height=\""+ ad.get_adHeight() +"\" style=\"position:relative;z-index:10000\" MARGINWIDTH=0 MARGINHEIGHT=0 HSPACE=0 VSPACE=0 FRAMEBORDER=0 SCROLLING=no allowTransparency=true src='myspace.com_files/iframe_" + ad.get_adWidth() + "x" + ad.get_adHeight() + ".html'></iframe>";
}//sdc_wrapper

function ad_wrapper(){//this is the ad wrapper version	
	var argv = ad_wrapper.arguments;
	var tokenID = argv[0];
	var page = argv[1];
	var pos = argv[2].toLowerCase();

	var ctr = document.getElementById(tokenID);
	if (ctr == null) 
		return;

	var ad = new AdCallAd(page, 'deSB');
	ad.setAdProperties(pos, 468, 60, 'test', '0');
	var frameURL = "";
	
	var qsHeight = AdHelper.queryString('adHeight');
	var qsWidth = AdHelper.queryString('adWidth');
	var livePreviewUrl = AdHelper.get_livePreviewUrl();
	
	if(livePreviewUrl != null && qsHeight == ad.get_adHeight() && qsWidth == ad.get_adWidth()){
		frameURL = livePreviewUrl;
	}
	else if(Advertiser.DC.AdSource){
		frameURL = Advertiser.DC.AdSource;
	}	
	else{
		var fuseaction = AdHelper.queryString('fuseaction');
	    
	    if (!Advertiser.SDC.targetValuesSet && fuseaction === 'user') {
		    Advertiser.SDC.setTargetValues();
	    }
	
		ad.addParam("page", ad.get_page());
		ad.addParam("position", ad.get_pos());
		ad.addParam("rand", AdHelper.get_randomNumber().substring(2,11));
		ad.addParam("friendid", ad.get_friendID(), true);
		ad.addParam("category", AdHelper.getVar("ad_Topic_ID"), true);
		ad.addParam("acnt", AdHelper.get_adCount());
		ad.addParam("channelid", AdHelper.getVarOrId("ad_Video_CID", "channelid"), true);
		ad.addParam("downcat", AdHelper.getDownloadCategory(), true);
		ad.addParam("tvvideoid", AdHelper.getVar("videoid"), true);
		ad.addParam("tvcategoryid", AdHelper.getVar("tvcat"), true);
		ad.addParam("tvchannelid", AdHelper.getVar("tvchanid"), true);
		ad.addParam("tvhcat", AdHelper.getMySpaceTVHomeCategory(), true);
		ad.addParam("tvmastercategory", AdHelper.getTVCatMasterId());
		ad.addParam("uhpt", AdHelper.getVar("uhpt"));
		ad.addParam("nwcat", AdHelper.getVar("nwcat"));
	    ad.addParam("nwvert", AdHelper.getVar("nwvert"));
	    
		if(fuseaction === "apps.gallery") {
	    	var appCat = AdHelper.queryString("category");
	    	if(appCat != null && appCat != "") {
	    		appCat = "10" + appCat;
	    		ad.addParam("dwcat", appCat);
	    	}
	    }

		var schoolIDAdded = ad.addParam("schoolpage", AdHelper.queryString("schoolID"));
		if(!schoolIDAdded)
			ad.addParam("schoolpage", "0");

		if(document.getElementById("bandgenre1")){
			var bandgenre1Added = ad.addParam("bg1", document.getElementById("bandgenre1").value, true);
			if(bandgenre1Added){
				ad.addParam("bandgenre", document.getElementById("bandgenre1").value);
			}
			
			var bandgenre2Added = ad.addParam("bg2", document.getElementById("bandgenre2").value, true);
			if(bandgenre2Added){
				ad.addParam("bandgenre", document.getElementById("bandgenre2").value);
			}
			
			var bandgenre3Added = ad.addParam("bg3", document.getElementById("bandgenre3").value);
			if(bandgenre3Added){
				ad.addParam("bandgenre", document.getElementById("bandgenre3").value);
			}
			
			if(document.getElementById("labeltype"))
			{
				switch (document.getElementById("labeltype").value){ 
					case 'Major':
						ad.addParam('mlt', '2');
						break;
					case 'Indie':
						ad.addParam('mlt', '3');
						break;
					default:
						ad.addParam('mlt', '1');
						break;			
				}
			}
		}
		
		var testmode = ad.addParam("special", AdHelper.queryString("special"));
		if (testmode)
			frameURL = "http://detst.myspace.com/html.ng/site=myspace" + ad.get_queryString();
		else 
			frameURL = "http://"+ ad.get_subd() +".myspace.com/html.ng/site=myspace" + ad.get_queryString();
	}

	ctr.innerHTML = "<IFRAME width=\""+ ad.get_adWidth() +"\" height=\""+ ad.get_adHeight() +"\" style=\"position:relative;z-index:10000\" MARGINWIDTH=0 MARGINHEIGHT=0 HSPACE=0 VSPACE=0 FRAMEBORDER=0 SCROLLING=no allowTransparency=true src='"+frameURL+"'></iframe>";
	AdHelper.incrementAdCount();
}//ad_wrapper

function sdc_wrapper_medrec_delay(){
	var args = sdc_wrapper_medrec_delay.arguments;
	if(args == null || args.length !== 3) return;
	var token = document.getElementById(args[0]);
	if (token == null) return;
	token.style.height = 250;
	var func = "sdc_wrapper('" + args[0] + "','" + args[1] + "','" + args[2] + "')";
	setTimeout(func, 1000);
}

function ad_wrapper_medrec_delay(){
	var args = ad_wrapper_medrec_delay.arguments;
	if(args == null || args.length !== 3) return;
	var token = document.getElementById(args[0]);
	if (token == null) return;
	token.style.height = 250;
	var func = "ad_wrapper('" + args[0] + "','" + args[1] + "','" + args[2] + "')";
	setTimeout(func, 1000);
}

function syncRoadBlock(adTag)
{
	a = adTag.split(';');
	if (a.length>0)
	{
			for (x=0; x<=a.length-1; x++)
		{
			if (a[x].indexOf('sz=') == 0)
			{
				size = a[x].substring(3);
					dims = size.split('x');
					width = dims[0];
					height = dims[1];

				if(height == 90)
				{
					if(document.getElementById('tkn_leaderboard') != null)
						loadRBs('tkn_leaderboard',width,height,adTag);
					else if (document.getElementById('tkn_leaderboardsonybmg') != null)
						loadRBs('tkn_leaderboardsonybmg',width,height,adTag);
				}
				else if(height == 250)
				{
					if(document.getElementById('tkn_medrec') != null)
						loadRBs('tkn_medrec',width,height,adTag);
					else if(document.getElementById('tkn_medrecsonybmg') != null)
						loadRBs('tkn_medrecsonybmg',width,height,adTag);
				}
			}
		}
	}
}

function loadRBs(s,w,h,adTag)
{
	var adDiv = document.getElementById(s);
	
	if (adDiv != null)
	{
		adDiv.innerHTML = '<iframe src="' + adTag + '" id="ifr_companion" width="'+w+'" height="'+h+'" marginwidth=0 marginheight=0 hspace=0 vspace=0 frameborder=0 scrolling=no>' + '</iframe>';
		Advertiser.DC.SetByPlayer = true;
	}
}

function CallHouseBanner(dcTag)
{
	if(dcTag != null)
	{
		var page;
		var pos;
		var params = dcTag.split(';');
		for(i = 0; i < params.length; i++) {
			var kvp = params[i].split('=');
			if(kvp.length === 2)
			{
				if(kvp[0] === 'page') {
					page = kvp[1];
				}
				else if(kvp[0] === 'pos') {
					pos = kvp[1];
				}
			}
		}
		
		if(page != "91000017") return;
		
		var adTag = "http://ad.doubleclick.net/adi/myspace.video/;";
		var fullpos;
		var width;
		var height;
		if(pos === "leaderboard"){
			fullpos = "leaderboard";
			adTag += "kw=house=lb;sz=728x90;"
			width = 728;
			height = 90;
		}
		else if(pos === "mrec"){
			fullpos = "medrec";
			adTag += "kw=house=mr;sz=300x250;"
			width = 300;
			height = 250;
		}

		var adDiv = document.getElementById('tkn_' + fullpos);
		if(adDiv == null)
			return;

		var rand = AdHelper.get_randomNumber().substring(2,11);
		adTag += dcTag + "adid=na;tile1;ord=" + rand;

		adDiv.innerHTML = '<iframe src="' + adTag + '" id="house_ad" width="'+width+'" height="'+height+'" marginwidth=0 marginheight=0 hspace=0 vspace=0 frameborder=0 scrolling=no>' + '</iframe>';
	}
}
