// Author: Danny Mavromatis
// Version: 3.00.2
// Created: 10/29/2001
// Updated: 7/5/2006
// FLASH detection system
	var cId = 0;
	var aV = 0;
	var swVersion;
	var isIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;
	var isWin = (navigator.appVersion.indexOf("Windows") != -1) ? true : false;
	if(isIE && isWin){
		document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n');
		document.write('Function VBGetSwfVer(i) \n');
		document.write('on error resume next \n');
		document.write('Dim swControl, swVersion \n');
		document.write('swVersion = 0 \n');
		document.write('set swControl = CreateObject("ShockwaveFlash.ShockwaveFlash." + CStr(i)) \n');
		document.write('if (IsObject(swControl)) then \n');
		document.write('swVersion = 0 \n');
		document.write('swVersion = swControl.GetVariable("$version") \n');
		document.write('end if \n');
		document.write('VBGetSwfVer = swVersion \n');
		document.write('End Function \n');
		document.write('</SCR' + 'IPT\> \n');
	} else {
		var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
		function JSGetSwfVer(i){
		      if (navigator.plugins != null && navigator.plugins.length > 0) {
		            if (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]) {
		                  var swVer2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
		                        var flashDescription = navigator.plugins["Shockwave Flash" + swVer2].description;
		                        descArray = flashDescription.split(" ");
		                        tempArrayMajor = descArray[2].split(".");
		                        versionMajor = tempArrayMajor[0];
		                  if ( descArray[3] != "" ) {
		                        tempArrayMinor = descArray[3].split("r");
		                  } else {
		                        tempArrayMinor = descArray[4].split("r");
		                  }
		                        versionMinor = tempArrayMinor[1] > 0 ? tempArrayMinor[1] : 0;
		                        flashVer = parseFloat(versionMajor + "." + versionMinor);
		            } else {
		                  flashVer = -1;
		            }
		      }
		      else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.6") != -1) flashVer = 4;
		      else if (navigator.userAgent.toLowerCase().indexOf("webtv/2.5") != -1) flashVer = 3;
		      else if (navigator.userAgent.toLowerCase().indexOf("webtv") != -1) flashVer = 2;
		      else {
		            flashVer = -1;
		      }
		      return flashVer;
		}
	}
function checkFlash(rV){
	var ua=navigator.userAgent.toLowerCase();
	this.webtv = (ua.indexOf("webtv")>-1);
	this.ie = (parseFloat(ua.slice(ua.indexOf("msie")+5)));
	this.nn = (parseFloat(ua.slice(ua.indexOf("mozilla/")+8)));
	var browser = navigator.appName.toLowerCase();
	if (browser=="netscape"){
	this.netscape = true;
	}else{
	this.netscape = false;
	}
	this.mac = (ua.indexOf("mac")>-1);
	this.flash = false;

	if (isIE && isWin){

		aV = VBGetSwfVer(rV);

		if (aV != 0){
			var cVArray = VBGetSwfVer(rV).split(" ");
			cVArray = cVArray[1].split(",");
			aV = cVArray[0];
		}

	} else {
		aV = JSGetSwfVer(rV);
	}

	if (aV >= rV) {
		if (this.netscape && this.IEonly == 'TRUE' || this.mac && this.IEonly == 'TRUE'){
			this.flash = false;
		} else {
			this.flash = true;
		}
	}
}
function flashObj() {
	cId += 1;
	this.flashFile = "/flash/blank.swf";
	this.LiveConnect = "FALSE";
	this.IEonly = null;
	this.wmode = "opaque";
	this.redirect = null;
	this.DenyIEdl = "FALSE";
	this.altImg = "/blank.gif";
	this.bgcolor = null;
	this.altTxt = null;
	this.height = "400";
	this.width = "520";
	this.salign="lt";
	this.align="left";
	this.flashVars = null;
	this.ID = "flash"+ cId;
	this.name = "flash"+ cId;
	this.webTV = "true";
	this.quality = "best";
	this.scale = "exactfit";
	this.menu = "false";
	this.deviceFont = "false";
	this.FlashVer = 5;
	this.cabVersion = "5,0,0,0";
	this.allowScriptAccess = "Always";
	this.allowNetworking = "All";
	this.useDOM = false;
 	this.targetElement = null;
	this.render = writeFlashComponent;
}
function writeFlashComponent(val) {
	var Ticket=new checkFlash(this.FlashVer);
	var sCR = "";

	if (Ticket.flash) {
		if (Ticket.mac || Ticket.netscape) {
			sCR='<EMBED SRC="'+this.flashFile+'" swLiveConnect="'+this.LiveConnect+'" WIDTH="'+this.width+'" HEIGHT="'+this.height+'" QUALITY="'+this.quality+'" SCALE="'+this.scale+'" FlashVars="'+ this.flashVars +'" wmode="'+this.wmode+'" ID="'+this.ID+'" NAME="'+this.name+'" MENU="'+this.menu+'" DEVICEFONT="'+this.deviceFont + '"';
			if (this.bgcolor) {
				sCR += ' BGCOLOR="'+this.bgcolor + '"';
			}
			if (this.salign) {
				sCR += ' SALIGN="'+this.salign + '"';
			}
			if (this.allowScriptAccess) {
				sCR+= ' ALLOWSCRIPTACCESS="'+this.allowScriptAccess+'"';
			}
			if (this.allowNetworking) {
				sCR+= ' ALLOWNETWORKING="'+this.allowNetworking+'"';
			}
			sCR += ' TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></EMBED>';
		} else if (this.DenyIEdl=='TRUE') {
			sCR="<OBJECT classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://active.macromedia.com/flash2/cabs/swflash.cab#version="+this.FlashVer+",0,0,0\" ID=\""+this.ID+"\" WIDTH=\""+this.width+"\" HEIGHT=\""+this.height+"\">\n";
			sCR+="<PARAM NAME=movie VALUE=\""+this.flashFile+"\">\n";
			sCR+="<PARAM NAME=quality VALUE=\""+this.quality+"\">\n";
			sCR+="<PARAM NAME=scale VALUE=\""+this.scale+"\">\n";
			sCR+="<PARAM NAME=menu VALUE=\""+this.menu+"\">\n";
			sCR+="<PARAM NAME=wmode VALUE=\""+this.wmode+"\">\n";
			if (this.bgcolor){
				sCR+="<PARAM NAME=bgcolor VALUE=\""+this.bgcolor+"\">\n";
			}
			if (this.flashVars){
				sCR+="<PARAM NAME=FlashVars VALUE=\""+this.flashVars+"\">\n";
			}
			if (this.salign) {
				sCR+="<PARAM NAME=salign VALUE=\""+this.salign+"\">\n";
			}
			if (this.allowScriptAccess) {
				sCR+="<PARAM NAME=allowScriptAccess VALUE=\""+this.allowScriptAccess+"\">\n";
			}
			if (this.allowNetworking) {
				sCR+="<PARAM NAME=allowNetworking VALUE=\""+this.allowNetworking+"\">\n";
			}
			sCR+="<PARAM NAME=devicefont VALUE=\""+this.deviceFont+"\">\n";
			if (this.bgcolor){
			sCR+="<EMBED SRC="+this.flashFile+" swLiveConnect="+this.LiveConnect+" WIDTH="+this.width+" HEIGHT="+this.height+" QUALITY="+this.quality+" SCALE="+this.scale+" wmode="+this.wmode+" ID="+this.ID+" NAME="+this.name+" MENU="+this.menu+" DEVICEFONT="+this.deviceFont+" FlashVars="+ this.flashVars +" BGCOLOR="+this.bgcolor+" TYPE=application/x-shockwave-flash PLUGINSPAGE=http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash></EMBED></OBJECT>";
			} else {
			sCR+="<EMBED SRC="+this.flashFile+" swLiveConnect="+this.LiveConnect+" WIDTH="+this.width+" HEIGHT="+this.height+" QUALITY="+this.quality+" SCALE="+this.scale+" wmode="+this.wmode+" ID="+this.ID+" NAME="+this.name+" MENU="+this.menu+" DEVICEFONT="+this.deviceFont+" FlashVars="+ this.flashVars +" TYPE=application/x-shockwave-flash PLUGINSPAGE=http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash></EMBED></OBJECT>";
			}
		} else if (Ticket.ie>=4 && this.DenyIEdl=='FALSE') {
			sCR="<OBJECT classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://active.macromedia.com/flash2/cabs/swflash.cab#version="+this.cabVersion+"\" ID=\""+this.ID+"\" WIDTH=\""+this.width+"\" HEIGHT=\""+this.height+"\">\n";
			sCR+="<PARAM NAME=movie VALUE=\""+this.flashFile+"\">\n";
			sCR+="<PARAM NAME=quality VALUE=\""+this.quality+"\">\n";
			sCR+="<PARAM NAME=scale VALUE=\""+this.scale+"\">\n";
			sCR+="<PARAM NAME=menu VALUE=\""+this.menu+"\">\n";
			sCR+="<PARAM NAME=wmode VALUE=\""+this.wmode+"\">\n";
			if (this.flashVars){
				sCR+="<PARAM NAME=FlashVars VALUE=\""+this.flashVars+"\">\n";
			}
			if (this.bgcolor){
				sCR+="<PARAM NAME=bgcolor VALUE=\""+this.bgcolor+"\">\n";
			}
			if (this.salign) {
				sCR+="<PARAM NAME=salign VALUE=\""+this.salign+"\">\n";
			}
			if (this.allowScriptAccess) {
				sCR+="<PARAM NAME=allowScriptAccess VALUE=\""+this.allowScriptAccess+"\">\n";
			}
			if (this.allowNetworking) {
				sCR+="<PARAM NAME=allowNetworking VALUE=\""+this.allowNetworking+"\">\n";
			}
			sCR+="<PARAM NAME=devicefont VALUE=\""+this.deviceFont+"\">\n";
			sCR+="</OBJECT>\n";
		} else if (Ticket.webtv) {
			sCR="<EMBED SRC="+this.flashFile+" swLiveConnect=TRUE WIDTH="+this.width+" HEIGHT="+this.height+" QUALITY="+this.quality+" SCALE="+this.scale+" wmode="+this.wmode+" ID="+this.ID+" NAME="+this.name+" MENU="+this.menu+" DEVICEFONT="+this.deviceFont+" FlashVars="+ this.flashVars +" TYPE=application/x-shockwave-flash PLUGINSPAGE=http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash></EMBED>";
		}
	} else {
	if (this.redirect){
		top.location.href = this.redirect;
	} else {
			if (this.altTxt){
			sCR = this.altTxt;
			} else {
			sCR="<IMG SRC="+this.altImg+" WIDTH="+this.width+" HEIGHT="+this.height+" BORDER=0>";
			}
		}
	}
	if (val == true) {
		if (this.useDOM){
			document.getElementById(this.targetElement).innerHTML = sCR;
		} else {
		 	document.write(sCR);
 		}
	} else{
		return sCR;
	}
}


// dates
var today = new Date();
var oneYear = new Date(today.getTime() + 365 * 24 * 60 * 60 * 1000);
var oneMonth = new Date(today.getTime() + 30 * 24 * 60 *60 * 1000);
var oneWeek = new Date(today.getTime() + 7 * 24 * 60 *60 * 1000);
var oneDay = new Date(today.getTime() + 24 * 60 *60 * 1000);

// MOTION.JS

function changeMotionImage (imageName) {
	document.getElementById('motionImage').src = imageName;
}
function playMotionLegacy(id,cat,subcat) {
	var catstr = "";
	if(cat!=null) 
		catstr = "&category="+cat;
	if(subcat!=null) 
		catstr = catstr+"&subcategory="+subcat;
	if(id!=null) {
		if(cat!=null && cat.toLowerCase()=="torino")
			window.open("http://sports.espn.go.com/broadband/motion/echo/oly?id="+id, "mWin", "width=737,height=410");
		else
			window.open("http://sports.espn.go.com/broadband/motion/echo/index?id="+id+catstr, "mWin", "width=737,height=410");
		var host = document.location.hostname;
		if(host=="espn.go.com" || host=="sports.espn.go.com" || host=="sports-att.espn.go.com") {
			if(frames['fsp']) 
				frames['fsp'].stop();
		}
	}	
}
function playMotion(id,cat,subcat) {
	playVideo(id);
}
function playVideoHub(id,cat,ch,mode) {
	if(id==null){
		id="";
	}
	window.location="http://sports.espn.go.com/broadband/video/videopage?videoId="+id;
}
function playVideo(id,cat,ch,mode){
	var catstr = "";
	var chstr = "";
	var modestr = "";
	
	if (id=="3007473") {
		playVideoFantasy(id,cat,ch,mode);
	} else {
		if(id==null)
			id = "";	
		if(cat!=null)
			catstr = "&catname="+cat;
		if(ch!=null)
			chstr = "&channel="+ch;
		if(mode!=null)
			modestr = "&mode="+mode;
		window.open("http://sports.espn.go.com/broadband/ivp/index?id="+id+catstr+chstr+modestr, "mWin", "status=0,top=0,left=0,width=1014,height=620");
		var host = document.location.hostname;
		if(host=="espn.go.com" || host=="sports.espn.go.com" || host=="sports-att.espn.go.com") {
			if(frames['fsp']) 
				frames['fsp'].stop();
		}
	}
}  
function playVideoDeportes(id) {
	var idpart = "";
	if(id!=null)
		idpart = "&id="+id;
	window.open("http://sports.espn.go.com/broadband/ivp/index?lang=es"+idpart, "mWin", "status=0,top=0,left=0,width=1014,height=620");
}

function playVideoFantasy(id,cat,ch,mode){ 
        var catstr = ""; 
        var chstr = ""; 
        var modestr = ""; 
        if(id==null) 
                id = "";        
        if(cat!=null) 
                catstr = "&catname="+cat; 
        if(ch!=null) 
                chstr = "&channel="+ch; 
        if(mode!=null) 
                modestr = "&mode="+mode; 
        window.open("http://sports.espn.go.com/broadband/ivp/index?swf=ffn&id="+id+catstr+chstr+modestr, "mWin", "status=0,top=0,left=0,width=794,height=492");

        var host = document.location.hostname; 
        if(host=="espn.go.com" || host=="sports.espn.go.com" || host=="sports-att.espn.go.com") { 
                if(frames['fsp']) 
                        frames['fsp'].stop(); 
        } 
}

// FLASH PROXY
/*
Part of the Flash / JavaScript Integration Kit
http://www.macromedia.com/go/flashjavascript/

Created by:

Christian Cantrell
http://weblogs.macromedia.com/cantrell/
mailto:cantrell@macromedia.com

Mike Chambers
http://weblogs.macromedia.com/mesh/
mailto:mesh@macromedia.com

Macromedia
*/

/**
 * Create a new Exception object.
 * name: The name of the exception.
 * message: The exception message.
 */
function Exception(name, message)
{
    if (name)
        this.name = name;
    if (message)
        this.message = message;
}

/**
 * Set the name of the exception. 
 */
Exception.prototype.setName = function(name)
{
    this.name = name;
}

/**
 * Get the exception's name. 
 */
Exception.prototype.getName = function()
{
    return this.name;
}

/**
 * Set a message on the exception. 
 */
Exception.prototype.setMessage = function(msg)
{
    this.message = msg;
}

/**
 * Get the exception message. 
 */
Exception.prototype.getMessage = function()
{
    return this.message;
}

/**
 * Generates a browser-specific Flash tag. Create a new instance, set whatever
 * properties you need, then call either toString() to get the tag as a string, or
 * call write() to write the tag out.
 */

/**
 * Creates a new instance of the FlashTag.
 * src: The path to the SWF file.
 * width: The width of your Flash content.
 * height: the height of your Flash content.
 */
function FlashTag(src, width, height)
{
    this.src       = src;
    this.width     = width;
    this.height    = height;
    this.version   = '7,0,14,0';
    this.id        = null;
    this.bgcolor   = 'ffffff';
    this.flashVars = null;
}

/**
 * Sets the Flash version used in the Flash tag.
 */
FlashTag.prototype.setVersion = function(v)
{
    this.version = v;
}

/**
 * Sets the ID used in the Flash tag.
 */
FlashTag.prototype.setId = function(id)
{
    this.id = id;
}

/**
 * Sets the background color used in the Flash tag.
 */
FlashTag.prototype.setBgcolor = function(bgc)
{
    this.bgcolor = bgc;
}

/**
 * Sets any variables to be passed into the Flash content. 
 */
FlashTag.prototype.setFlashvars = function(fv)
{
    this.flashVars = fv;
}

/**
 * Get the Flash tag as a string. 
 */
FlashTag.prototype.toString = function()
{
    var ie = (navigator.appName.indexOf ("Microsoft") != -1) ? 1 : 0;
    var flashTag = new String();
    if (ie)
    {
        flashTag += '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
        if (this.id != null)
        {
            flashTag += 'id="'+this.id+'" ';
        }
        flashTag += 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version='+this.version+'" ';
        flashTag += 'width="'+this.width+'" ';
        flashTag += 'height="'+this.height+'">';
        flashTag += '<param name="movie" value="'+this.src+'"/>';
        flashTag += '<param name="quality" value="high"/>';
        flashTag += '<param name="bgcolor" value="#'+this.bgcolor+'"/>';
        if (this.flashVars != null)
        {
            flashTag += '<param name="flashvars" value="'+this.flashVars+'"/>';
        }
        flashTag += '</object>';
    }
    else
    {
        flashTag += '<embed src="'+this.src+'" ';
        flashTag += 'quality="high" '; 
        flashTag += 'bgcolor="#'+this.bgcolor+'" ';
        flashTag += 'width="'+this.width+'" ';
        flashTag += 'height="'+this.height+'" ';
        flashTag += 'type="application/x-shockwave-flash" ';
        if (this.flashVars != null)
        {
            flashTag += 'flashvars="'+this.flashVars+'" ';
        }
        if (this.id != null)
        {
            flashTag += 'name="'+this.id+'" ';
        }
        flashTag += 'pluginspage="http://www.macromedia.com/go/getflashplayer">';
        flashTag += '</embed>';
    }
    return flashTag;
}

/**
 * Write the Flash tag out. Pass in a reference to the document to write to. 
 */
FlashTag.prototype.write = function(doc)
{
    doc.write(this.toString());
}

/**
 * The FlashSerializer serializes JavaScript variables of types object, array, string,
 * number, date, boolean, null or undefined into XML. 
 */

/**
 * Create a new instance of the FlashSerializer.
 * useCdata: Whether strings should be treated as character data. If false, strings are simply XML encoded.
 */
function FlashSerializer(useCdata)
{
    this.useCdata = useCdata;
}

/**
 * Serialize an array into a format that can be deserialized in Flash. Supported data types are object,
 * array, string, number, date, boolean, null, and undefined. Returns a string of serialized data.
 */
FlashSerializer.prototype.serialize = function(args)
{
    var qs = new String();

    for (var i = 0; i < args.length; ++i)
    {
        switch(typeof(args[i]))
        {
            case 'undefined':
                qs += 't'+(i)+'=undf';
                break;
            case 'string':
                qs += 't'+(i)+'=str&d'+(i)+'='+escape(args[i]);
                break;
            case 'number':
                qs += 't'+(i)+'=num&d'+(i)+'='+escape(args[i]);
                break;
            case 'boolean':
                qs += 't'+(i)+'=bool&d'+(i)+'='+escape(args[i]);
                break;
            case 'object':
                if (args[i] == null)
                {
                    qs += 't'+(i)+'=null';
                }
                else if (args[i] instanceof Date)
                {
                    qs += 't'+(i)+'=date&d'+(i)+'='+escape(args[i].getTime());
                }
                else // array or object
                {
                    try
                    {
                        qs += 't'+(i)+'=xser&d'+(i)+'='+escape(this._serializeXML(args[i]));
                    }
                    catch (exception)
                    {
                        throw new Exception("FlashSerializationException",
                                            "The following error occurred during complex object serialization: " + exception.getMessage());
                    }
                }
                break;
            default:
                throw new Exception("FlashSerializationException",
                                    "You can only serialize strings, numbers, booleans, dates, objects, arrays, nulls, and undefined.");
        }

        if (i != (args.length - 1))
        {
            qs += '&';
        }
    }

    return qs;
}

/**
 * Private
 */
FlashSerializer.prototype._serializeXML = function(obj)
{
    var doc = new Object();
    doc.xml = '<fp>'; 
    this._serializeNode(obj, doc, null);
    doc.xml += '</fp>'; 
    return doc.xml;
}

/**
 * Private
 */
FlashSerializer.prototype._serializeNode = function(obj, doc, name)
{
    switch(typeof(obj))
    {
        case 'undefined':
            doc.xml += '<undf'+this._addName(name)+'/>';
            break;
        case 'string':
            doc.xml += '<str'+this._addName(name)+'>'+this._escapeXml(obj)+'</str>';
            break;
        case 'number':
            doc.xml += '<num'+this._addName(name)+'>'+obj+'</num>';
            break;
        case 'boolean':
            doc.xml += '<bool'+this._addName(name)+' val="'+obj+'"/>';
            break;
        case 'object':
            if (obj == null)
            {
                doc.xml += '<null'+this._addName(name)+'/>';
            }
            else if (obj instanceof Date)
            {
                doc.xml += '<date'+this._addName(name)+'>'+obj.getTime()+'</date>';
            }
            else if (obj instanceof Array)
            {
                doc.xml += '<array'+this._addName(name)+'>';
                for (var i = 0; i < obj.length; ++i)
                {
                    this._serializeNode(obj[i], doc, null);
                }
                doc.xml += '</array>';
            }
            else
            {
                doc.xml += '<obj'+this._addName(name)+'>';
                for (var n in obj)
                {
                    if (typeof(obj[n]) == 'function')
                        continue;
                    this._serializeNode(obj[n], doc, n);
                }
                doc.xml += '</obj>';
            }
            break;
        default:
            throw new Exception("FlashSerializationException",
                                "You can only serialize strings, numbers, booleans, objects, dates, arrays, nulls and undefined");
            break;
    }
}

/**
 * Private
 */
FlashSerializer.prototype._addName= function(name)
{
    if (name != null)
    {
        return ' name="'+name+'"';
    }
    return '';
}

/**
 * Private
 */
FlashSerializer.prototype._escapeXml = function(str)
{
    if (this.useCdata)
        return '<![CDATA['+str+']]>';
    else
        return str.replace(/&/g,'&amp;').replace(/</g,'&lt;');
}

/**
 * The FlashProxy object is what proxies function calls between JavaScript and Flash.
 * It handles all argument serialization issues.
 */

/**
 * Instantiates a new FlashProxy object. Pass in a uniqueID and the name (including the path)
 * of the Flash proxy SWF. The ID is the same ID that needs to be passed into your Flash content as lcId.
 */
function FlashProxy(uid, proxySwfName)
{
    this.uid = uid;
    this.proxySwfName = proxySwfName;
    this.flashSerializer = new FlashSerializer(false);
}

/**
 * Call a function in your Flash content.  Arguments should be:
 * 1. ActionScript function name to call,
 * 2. any number of additional arguments of type object,
 *    array, string, number, boolean, date, null, or undefined. 
 */
FlashProxy.prototype.call = function()
{

    if (arguments.length == 0)
    {
        throw new Exception("Flash Proxy Exception",
                            "The first argument should be the function name followed by any number of additional arguments.");
    }

    var qs = 'lcId=' + escape(this.uid) + '&functionName=' + escape(arguments[0]);

    if (arguments.length > 1)
    {
        var justArgs = new Array();
        for (var i = 1; i < arguments.length; ++i)
        {
            justArgs.push(arguments[i]);
        }
        qs += ('&' + this.flashSerializer.serialize(justArgs));
    }

    var divName = '_flash_proxy_' + this.uid;
    if(!document.getElementById(divName))
    {
        var newTarget = document.createElement("div");
        newTarget.id = divName;
        document.body.appendChild(newTarget);
    }
    var target = document.getElementById(divName);
    var ft = new FlashTag(this.proxySwfName, 1, 1);
    ft.setVersion('6,0,65,0');
    ft.setFlashvars(qs);
    target.innerHTML = ft.toString();
}

/**
 * This is the function that proxies function calls from Flash to JavaScript.
 * It is called implicitly.
 */
FlashProxy.callJS = function()
{
    var functionToCall = eval(arguments[0]);
    var argArray = new Array();
    for (var i = 1; i < arguments.length; ++i)
    {
        argArray.push(arguments[i]);
    }
    functionToCall.apply(functionToCall, argArray);
}


// * OTHER
function goTo(where) {
	window.location = where;
}
function goToNew(where,winName,features) {
	window.open(where,winName,features);
}
  
function passiveLoginComplete() {
  var myif = document.getElementById("myespn");
  if(myif!=null)
  	myif.src = "http://my.espn.go.com/profile/myfp";
}

// flash pop-up code
function daughter(pstr1,pstr2,pstr3)  {
	var windowFeatures = 'toolbar=no,status=no,scrollbars=no,location=no,menubar=no,directories=no,resizable=no,width=' + pstr2 + ',height=' + pstr3;
	window.open(pstr1,'thisPopup', windowFeatures);
}

// because daughter conflicts with a function in ad-production flash js version
function daughter2(pstr1,pstr2,pstr3)  {
	var windowFeatures = 'toolbar=no,status=no,scrollbars=no,location=no,menubar=no,directories=no,resizable=no,width=' + pstr2 + ',height=' + pstr3;
	window.open(pstr1,'thisPopup', windowFeatures);
}

// hide motion player on nav rollover
function hideSWF() {
	swfList = new Array('fspMovie');
}
hideSWF();