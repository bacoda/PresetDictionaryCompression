/* Metacafe Copyright - http://www.metacafe.com/ */
/* Files included: */

// ============ SWF Object Section ==================//
if(typeof deconcept=="undefined"){var deconcept=new Object();}if(typeof deconcept.util=="undefined"){deconcept.util=new Object();}if(typeof deconcept.SWFObjectUtil=="undefined"){deconcept.SWFObjectUtil=new Object();}deconcept.SWFObject=function(_1,id,w,h,_5,c,_7,_8,_9,_a){if(!document.getElementById){return;}this.DETECT_KEY=_a?_a:"detectflash";this.skipDetect=deconcept.util.getRequestParameter(this.DETECT_KEY);this.params=new Object();this.variables=new Object();this.attributes=new Array();if(_1){this.setAttribute("swf",_1);}if(id){this.setAttribute("id",id);}if(w){this.setAttribute("width",w);}if(h){this.setAttribute("height",h);}if(_5){this.setAttribute("version",new deconcept.PlayerVersion(_5.toString().split(".")));}this.installedVer=deconcept.SWFObjectUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){deconcept.SWFObject.doPrepUnload=true;}if(c){this.addParam("bgcolor",c);}var q=_7?_7:"high";this.addParam("quality",q);this.setAttribute("useExpressInstall",false);this.setAttribute("doExpressInstall",false);var _c=(_8)?_8:window.location;this.setAttribute("xiRedirectUrl",_c);this.setAttribute("redirectUrl","");if(_9){this.setAttribute("redirectUrl",_9);}};deconcept.SWFObject.prototype={useExpressInstall:function(_d){this.xiSWFPath=!_d?"expressinstall.swf":_d;this.setAttribute("useExpressInstall",true);},setAttribute:function(_e,_f){this.attributes[_e]=_f;},getAttribute:function(_10){return this.attributes[_10];},addParam:function(_11,_12){this.params[_11]=_12;},getParams:function(){return this.params;},addVariable:function(_13,_14){this.variables[_13]=_14;},getVariable:function(_15){return this.variables[_15];},getVariables:function(){return this.variables;},getVariablePairs:function(){var _16=new Array();var key;var _18=this.getVariables();for(key in _18){_16[_16.length]=key+"="+_18[key];}return _16;},getSWFHTML:function(){var _19="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","PlugIn");this.setAttribute("swf",this.xiSWFPath);}_19="<embed type=\"application/x-shockwave-flash\" src=\""+this.getAttribute("swf")+"\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\"";_19+=" id=\""+this.getAttribute("id")+"\" name=\""+this.getAttribute("id")+"\" ";var _1a=this.getParams();for(var key in _1a){_19+=[key]+"=\""+_1a[key]+"\" ";}var _1c=this.getVariablePairs().join("&");if(_1c.length>0){_19+="flashvars=\""+_1c+"\"";}_19+="/>";}else{if(this.getAttribute("doExpressInstall")){this.addVariable("MMplayerType","ActiveX");this.setAttribute("swf",this.xiSWFPath);}_19="<object id=\""+this.getAttribute("id")+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\""+this.getAttribute("width")+"\" height=\""+this.getAttribute("height")+"\" style=\""+this.getAttribute("style")+"\">";_19+="<param name=\"movie\" value=\""+this.getAttribute("swf")+"\" />";var _1d=this.getParams();for(var key in _1d){_19+="<param name=\""+key+"\" value=\""+_1d[key]+"\" />";}var _1f=this.getVariablePairs().join("&");if(_1f.length>0){_19+="<param name=\"flashvars\" value=\""+_1f+"\" />";}_19+="</object>";}return _19;},write:function(_20){if(this.getAttribute("useExpressInstall")){var _21=new deconcept.PlayerVersion([6,0,65]);if(this.installedVer.versionIsValid(_21)&&!this.installedVer.versionIsValid(this.getAttribute("version"))){this.setAttribute("doExpressInstall",true);this.addVariable("MMredirectURL",escape(this.getAttribute("xiRedirectUrl")));document.title=document.title.slice(0,47)+" - Flash Player Installation";this.addVariable("MMdoctitle",document.title);}}if(this.skipDetect||this.getAttribute("doExpressInstall")||this.installedVer.versionIsValid(this.getAttribute("version"))){var n=(typeof _20=="string")?document.getElementById(_20):_20;n.innerHTML=this.getSWFHTML();return true;}else{if(this.getAttribute("redirectUrl")!=""){document.location.replace(this.getAttribute("redirectUrl"));}}return false;}};deconcept.SWFObjectUtil.getPlayerVersion=function(){var _23=new deconcept.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var x=navigator.plugins["Shockwave Flash"];if(x&&x.description){_23=new deconcept.PlayerVersion(x.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var axo=1;var _26=3;while(axo){try{_26++;axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+_26);_23=new deconcept.PlayerVersion([_26,0,0]);}catch(e){axo=null;}}}else{try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(e){try{var axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");_23=new deconcept.PlayerVersion([6,0,21]);axo.AllowScriptAccess="always";}catch(e){if(_23.major==6){return _23;}}try{axo=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(e){}}if(axo!=null){_23=new deconcept.PlayerVersion(axo.GetVariable("$version").split(" ")[1].split(","));}}}return _23;};deconcept.PlayerVersion=function(_29){this.major=_29[0]!=null?parseInt(_29[0]):0;this.minor=_29[1]!=null?parseInt(_29[1]):0;this.rev=_29[2]!=null?parseInt(_29[2]):0;};deconcept.PlayerVersion.prototype.versionIsValid=function(fv){if(this.major<fv.major){return false;}if(this.major>fv.major){return true;}if(this.minor<fv.minor){return false;}if(this.minor>fv.minor){return true;}if(this.rev<fv.rev){return false;}return true;};deconcept.util={getRequestParameter:function(_2b){var q=document.location.search||document.location.hash;if(_2b==null){return q;}if(q){var _2d=q.substring(1).split("&");for(var i=0;i<_2d.length;i++){if(_2d[i].substring(0,_2d[i].indexOf("="))==_2b){return _2d[i].substring((_2d[i].indexOf("=")+1));}}}return "";}};deconcept.SWFObjectUtil.cleanupSWFs=function(){var _2f=document.getElementsByTagName("OBJECT");for(var i=_2f.length-1;i>=0;i--){_2f[i].style.display="none";for(var x in _2f[i]){if(typeof _2f[i][x]=="function"){_2f[i][x]=function(){};}}}};if(deconcept.SWFObject.doPrepUnload){if(!deconcept.unloadSet){deconcept.SWFObjectUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",deconcept.SWFObjectUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",deconcept.SWFObjectUtil.prepUnload);deconcept.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(id){return document.all[id];};}var getQueryParamValue=deconcept.util.getRequestParameter;var FlashObject=deconcept.SWFObject;var SWFObject=deconcept.SWFObject;

SWFFormFix = function(swfname){
	if(navigator.appName.toLowerCase() != "microsoft internet explorer")return false;
	var testnodename = "SWFFormFixTESTER";
	document.write('<div id="'+testnodename+'" onclick="SWFFormFixCallback(this,\''+swfname+'\');return false;" style="display:none">&nbsp;</div>');
	document.getElementById(testnodename).onclick();
}
SWFFormFixCallback = function (obj,swfname){
	var path = document;
	var error = false;
	var testnode = obj;
	while(obj = obj.parentNode){
		if(obj.nodeName.toLowerCase() == "form"){
			if(obj.name != undefined && obj.name != null && obj.name.length > 0){
				path = path.forms[obj.name];
			}else{
				alert("Error: one of your forms does not have a name!");
				error = true;
			}
		}
	}
	testnode.parentNode.removeChild(testnode);
	if(error) return false;
	window[swfname]=path[swfname];
	return true;
}
//MooTools, My Object Oriented Javascript Tools. Copyright (c) 2006-2007 Valerio Proietti, <http://mad4milk.net>, MIT Style License.

var MooTools={version:"1.11"};function $defined(A){return(A!=undefined);}function $type(B){if(!$defined(B)){return false;}if(B.htmlElement){return"element";
}var A=typeof B;if(A=="object"&&B.nodeName){switch(B.nodeType){case 1:return"element";case 3:return(/\S/).test(B.nodeValue)?"textnode":"whitespace";}}if(A=="object"||A=="function"){switch(B.constructor){case Array:return"array";
case RegExp:return"regexp";case Class:return"class";}if(typeof B.length=="number"){if(B.item){return"collection";}if(B.callee){return"arguments";}}}return A;
}function $merge(){var C={};for(var B=0;B<arguments.length;B++){for(var E in arguments[B]){var A=arguments[B][E];var D=C[E];if(D&&$type(A)=="object"&&$type(D)=="object"){C[E]=$merge(D,A);
}else{C[E]=A;}}}return C;}var $extend=function(){var A=arguments;if(!A[1]){A=[this,A[0]];}for(var B in A[1]){A[0][B]=A[1][B];}return A[0];};var $native=function(){for(var B=0,A=arguments.length;
B<A;B++){arguments[B].extend=function(C){for(var D in C){if(!this.prototype[D]){this.prototype[D]=C[D];}if(!this[D]){this[D]=$native.generic(D);}}};}};
$native.generic=function(A){return function(B){return this.prototype[A].apply(B,Array.prototype.slice.call(arguments,1));};};$native(Function,Array,String,Number);
function $chk(A){return !!(A||A===0);}function $pick(B,A){return $defined(B)?B:A;}function $random(B,A){return Math.floor(Math.random()*(A-B+1)+B);}function $time(){return new Date().getTime();
}function $clear(A){clearTimeout(A);clearInterval(A);return null;}var Abstract=function(A){A=A||{};A.extend=$extend;return A;};var Window=new Abstract(window);
var Document=new Abstract(document);document.head=document.getElementsByTagName("head")[0];window.xpath=!!(document.evaluate);if(window.ActiveXObject){window.ie=window[window.XMLHttpRequest?"ie7":"ie6"]=true;
}else{if(document.childNodes&&!document.all&&!navigator.taintEnabled){window.webkit=window[window.xpath?"webkit420":"webkit419"]=true;}else{if(document.getBoxObjectFor!=null){window.gecko=true;
}}}window.khtml=window.webkit;Object.extend=$extend;if(typeof HTMLElement=="undefined"){var HTMLElement=function(){};if(window.webkit){document.createElement("iframe");
}HTMLElement.prototype=(window.webkit)?window["[[DOMElement.prototype]]"]:{};}HTMLElement.prototype.htmlElement=function(){};if(window.ie6){try{document.execCommand("BackgroundImageCache",false,true);
}catch(e){}}var Class=function(B){var A=function(){return(arguments[0]!==null&&this.initialize&&$type(this.initialize)=="function")?this.initialize.apply(this,arguments):this;
};$extend(A,this);A.prototype=B;A.constructor=Class;return A;};Class.empty=function(){};Class.prototype={extend:function(B){var C=new this(null);for(var D in B){var A=C[D];
C[D]=Class.Merge(A,B[D]);}return new Class(C);},implement:function(){for(var B=0,A=arguments.length;B<A;B++){$extend(this.prototype,arguments[B]);}}};Class.Merge=function(C,D){if(C&&C!=D){var B=$type(D);
if(B!=$type(C)){return D;}switch(B){case"function":var A=function(){this.parent=arguments.callee.parent;return D.apply(this,arguments);};A.parent=C;return A;
case"object":return $merge(C,D);}}return D;};var Chain=new Class({chain:function(A){this.chains=this.chains||[];this.chains.push(A);return this;},callChain:function(){if(this.chains&&this.chains.length){this.chains.shift().delay(10,this);
}},clearChain:function(){this.chains=[];}});var Events=new Class({addEvent:function(B,A){if(A!=Class.empty){this.$events=this.$events||{};this.$events[B]=this.$events[B]||[];
this.$events[B].include(A);}return this;},fireEvent:function(C,B,A){if(this.$events&&this.$events[C]){this.$events[C].each(function(D){D.create({"bind":this,"delay":A,"arguments":B})();
},this);}return this;},removeEvent:function(B,A){if(this.$events&&this.$events[B]){this.$events[B].remove(A);}return this;}});var Options=new Class({setOptions:function(){this.options=$merge.apply(null,[this.options].extend(arguments));
if(this.addEvent){for(var A in this.options){if($type(this.options[A]=="function")&&(/^on[A-Z]/).test(A)){this.addEvent(A,this.options[A]);}}}return this;
}});Array.extend({forEach:function(C,D){for(var B=0,A=this.length;B<A;B++){C.call(D,this[B],B,this);}},filter:function(D,E){var C=[];for(var B=0,A=this.length;
B<A;B++){if(D.call(E,this[B],B,this)){C.push(this[B]);}}return C;},map:function(D,E){var C=[];for(var B=0,A=this.length;B<A;B++){C[B]=D.call(E,this[B],B,this);
}return C;},every:function(C,D){for(var B=0,A=this.length;B<A;B++){if(!C.call(D,this[B],B,this)){return false;}}return true;},some:function(C,D){for(var B=0,A=this.length;
B<A;B++){if(C.call(D,this[B],B,this)){return true;}}return false;},indexOf:function(C,D){var A=this.length;for(var B=(D<0)?Math.max(0,A+D):D||0;B<A;B++){if(this[B]===C){return B;
}}return -1;},copy:function(D,C){D=D||0;if(D<0){D=this.length+D;}C=C||(this.length-D);var A=[];for(var B=0;B<C;B++){A[B]=this[D++];}return A;},remove:function(C){var B=0;
var A=this.length;while(B<A){if(this[B]===C){this.splice(B,1);A--;}else{B++;}}return this;},contains:function(A,B){return this.indexOf(A,B)!=-1;},associate:function(C){var D={},B=Math.min(this.length,C.length);
for(var A=0;A<B;A++){D[C[A]]=this[A];}return D;},extend:function(C){for(var B=0,A=C.length;B<A;B++){this.push(C[B]);}return this;},merge:function(C){for(var B=0,A=C.length;
B<A;B++){this.include(C[B]);}return this;},include:function(A){if(!this.contains(A)){this.push(A);}return this;},getRandom:function(){return this[$random(0,this.length-1)]||null;
},getLast:function(){return this[this.length-1]||null;}});Array.prototype.each=Array.prototype.forEach;Array.each=Array.forEach;function $A(A){return Array.copy(A);
}function $each(C,B,D){if(C&&typeof C.length=="number"&&$type(C)!="object"){Array.forEach(C,B,D);}else{for(var A in C){B.call(D||C,C[A],A);}}}Array.prototype.test=Array.prototype.contains;
String.extend({test:function(A,B){return(($type(A)=="string")?new RegExp(A,B):A).test(this);},toInt:function(){return parseInt(this,10);},toFloat:function(){return parseFloat(this);
},camelCase:function(){return this.replace(/-\D/g,function(A){return A.charAt(1).toUpperCase();});},hyphenate:function(){return this.replace(/\w[A-Z]/g,function(A){return(A.charAt(0)+"-"+A.charAt(1).toLowerCase());
});},capitalize:function(){return this.replace(/\b[a-z]/g,function(A){return A.toUpperCase();});},trim:function(){return this.replace(/^\s+|\s+$/g,"");
},clean:function(){return this.replace(/\s{2,}/g," ").trim();},rgbToHex:function(B){var A=this.match(/\d{1,3}/g);return(A)?A.rgbToHex(B):false;},hexToRgb:function(B){var A=this.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
return(A)?A.slice(1).hexToRgb(B):false;},contains:function(A,B){return(B)?(B+this+B).indexOf(B+A+B)>-1:this.indexOf(A)>-1;},escapeRegExp:function(){return this.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1");
}});Array.extend({rgbToHex:function(D){if(this.length<3){return false;}if(this.length==4&&this[3]==0&&!D){return"transparent";}var B=[];for(var A=0;A<3;
A++){var C=(this[A]-0).toString(16);B.push((C.length==1)?"0"+C:C);}return D?B:"#"+B.join("");},hexToRgb:function(C){if(this.length!=3){return false;}var A=[];
for(var B=0;B<3;B++){A.push(parseInt((this[B].length==1)?this[B]+this[B]:this[B],16));}return C?A:"rgb("+A.join(",")+")";}});Function.extend({create:function(A){var B=this;
A=$merge({"bind":B,"event":false,"arguments":null,"delay":false,"periodical":false,"attempt":false},A);if($chk(A.arguments)&&$type(A.arguments)!="array"){A.arguments=[A.arguments];
}return function(E){var C;if(A.event){E=E||window.event;C=[(A.event===true)?E:new A.event(E)];if(A.arguments){C.extend(A.arguments);}}else{C=A.arguments||arguments;
}var F=function(){return B.apply($pick(A.bind,B),C);};if(A.delay){return setTimeout(F,A.delay);}if(A.periodical){return setInterval(F,A.periodical);}if(A.attempt){try{return F();
}catch(D){return false;}}return F();};},pass:function(A,B){return this.create({"arguments":A,"bind":B});},attempt:function(A,B){return this.create({"arguments":A,"bind":B,"attempt":true})();
},bind:function(B,A){return this.create({"bind":B,"arguments":A});},bindAsEventListener:function(B,A){return this.create({"bind":B,"event":true,"arguments":A});
},delay:function(B,C,A){return this.create({"delay":B,"bind":C,"arguments":A})();},periodical:function(A,C,B){return this.create({"periodical":A,"bind":C,"arguments":B})();
}});Number.extend({toInt:function(){return parseInt(this);},toFloat:function(){return parseFloat(this);},limit:function(B,A){return Math.min(A,Math.max(B,this));
},round:function(A){A=Math.pow(10,A||0);return Math.round(this*A)/A;},times:function(B){for(var A=0;A<this;A++){B(A);}}});var Element=new Class({initialize:function(D,C){if($type(D)=="string"){if(window.ie&&C&&(C.name||C.type)){var A=(C.name)?' name="'+C.name+'"':"";
var B=(C.type)?' type="'+C.type+'"':"";delete C.name;delete C.type;D="<"+D+A+B+">";}D=document.createElement(D);}D=$(D);return(!C||!D)?D:D.set(C);}});var Elements=new Class({initialize:function(A){return(A)?$extend(A,this):this;
}});Elements.extend=function(A){for(var B in A){this.prototype[B]=A[B];this[B]=$native.generic(B);}};function $(B){if(!B){return null;}if(B.htmlElement){return Garbage.collect(B);
}if([window,document].contains(B)){return B;}var A=$type(B);if(A=="string"){B=document.getElementById(B);A=(B)?"element":false;}if(A!="element"){return null;
}if(B.htmlElement){return Garbage.collect(B);}if(["object","embed"].contains(B.tagName.toLowerCase())){return B;}$extend(B,Element.prototype);B.htmlElement=function(){};
return Garbage.collect(B);}document.getElementsBySelector=document.getElementsByTagName;function $$(){var D=[];for(var C=0,B=arguments.length;C<B;C++){var A=arguments[C];
switch($type(A)){case"element":D.push(A);case"boolean":break;case false:break;case"string":A=document.getElementsBySelector(A,true);default:D.extend(A);
}}return $$.unique(D);}$$.unique=function(G){var D=[];for(var C=0,A=G.length;C<A;C++){if(G[C].$included){continue;}var B=$(G[C]);if(B&&!B.$included){B.$included=true;
D.push(B);}}for(var F=0,E=D.length;F<E;F++){D[F].$included=null;}return new Elements(D);};Elements.Multi=function(A){return function(){var D=arguments;
var B=[];var G=true;for(var E=0,C=this.length,F;E<C;E++){F=this[E][A].apply(this[E],D);if($type(F)!="element"){G=false;}B.push(F);}return(G)?$$.unique(B):B;
};};Element.extend=function(A){for(var B in A){HTMLElement.prototype[B]=A[B];Element.prototype[B]=A[B];Element[B]=$native.generic(B);var C=(Array.prototype[B])?B+"Elements":B;
Elements.prototype[C]=Elements.Multi(B);}};Element.extend({set:function(A){for(var C in A){var B=A[C];switch(C){case"styles":this.setStyles(B);break;case"events":if(this.addEvents){this.addEvents(B);
}break;case"properties":this.setProperties(B);break;default:this.setProperty(C,B);}}return this;},inject:function(C,A){C=$(C);switch(A){case"before":C.parentNode.insertBefore(this,C);
break;case"after":var B=C.getNext();if(!B){C.parentNode.appendChild(this);}else{C.parentNode.insertBefore(this,B);}break;case"top":var D=C.firstChild;if(D){C.insertBefore(this,D);
break;}default:C.appendChild(this);}return this;},injectBefore:function(A){return this.inject(A,"before");},injectAfter:function(A){return this.inject(A,"after");
},injectInside:function(A){return this.inject(A,"bottom");},injectTop:function(A){return this.inject(A,"top");},adopt:function(){var A=[];$each(arguments,function(B){A=A.concat(B);
});$$(A).inject(this);return this;},remove:function(){return this.parentNode.removeChild(this);},clone:function(C){var B=$(this.cloneNode(C!==false));if(!B.$events){return B;
}B.$events={};for(var A in this.$events){B.$events[A]={"keys":$A(this.$events[A].keys),"values":$A(this.$events[A].values)};}return B.removeEvents();},replaceWith:function(A){A=$(A);
this.parentNode.replaceChild(A,this);return A;},appendText:function(A){this.appendChild(document.createTextNode(A));return this;},hasClass:function(A){return this.className.contains(A," ");
},addClass:function(A){if(!this.hasClass(A)){this.className=(this.className+" "+A).clean();}return this;},removeClass:function(A){this.className=this.className.replace(new RegExp("(^|\\s)"+A+"(?:\\s|$)"),"$1").clean();
return this;},toggleClass:function(A){return this.hasClass(A)?this.removeClass(A):this.addClass(A);},setStyle:function(B,A){switch(B){case"opacity":return this.setOpacity(parseFloat(A));
case"float":B=(window.ie)?"styleFloat":"cssFloat";}B=B.camelCase();switch($type(A)){case"number":if(!["zIndex","zoom"].contains(B)){A+="px";}break;case"array":A="rgb("+A.join(",")+")";
}this.style[B]=A;return this;},setStyles:function(A){switch($type(A)){case"object":Element.setMany(this,"setStyle",A);break;case"string":this.style.cssText=A;
}return this;},setOpacity:function(A){if(A==0){if(this.style.visibility!="hidden"){this.style.visibility="hidden";}}else{if(this.style.visibility!="visible"){this.style.visibility="visible";
}}if(!this.currentStyle||!this.currentStyle.hasLayout){this.style.zoom=1;}if(window.ie){this.style.filter=(A==1)?"":"alpha(opacity="+A*100+")";}this.style.opacity=this.$tmp.opacity=A;
return this;},getStyle:function(C){C=C.camelCase();var A=this.style[C];if(!$chk(A)){if(C=="opacity"){return this.$tmp.opacity;}A=[];for(var B in Element.Styles){if(C==B){Element.Styles[B].each(function(F){var E=this.getStyle(F);
A.push(parseInt(E)?E:"0px");},this);if(C=="border"){var D=A.every(function(E){return(E==A[0]);});return(D)?A[0]:false;}return A.join(" ");}}if(C.contains("border")){if(Element.Styles.border.contains(C)){return["Width","Style","Color"].map(function(E){return this.getStyle(C+E);
},this).join(" ");}else{if(Element.borderShort.contains(C)){return["Top","Right","Bottom","Left"].map(function(E){return this.getStyle("border"+E+C.replace("border",""));
},this).join(" ");}}}if(document.defaultView){A=document.defaultView.getComputedStyle(this,null).getPropertyValue(C.hyphenate());}else{if(this.currentStyle){A=this.currentStyle[C];
}}}if(window.ie){A=Element.fixStyle(C,A,this);}if(A&&C.test(/color/i)&&A.contains("rgb")){return A.split("rgb").splice(1,4).map(function(E){return E.rgbToHex();
}).join(" ");}return A;},getStyles:function(){return Element.getMany(this,"getStyle",arguments);},walk:function(A,C){A+="Sibling";var B=(C)?this[C]:this[A];
while(B&&$type(B)!="element"){B=B[A];}return $(B);},getPrevious:function(){return this.walk("previous");},getNext:function(){return this.walk("next");},getFirst:function(){return this.walk("next","firstChild");
},getLast:function(){return this.walk("previous","lastChild");},getParent:function(){return $(this.parentNode);},getChildren:function(){return $$(this.childNodes);
},hasChild:function(A){return !!$A(this.getElementsByTagName("*")).contains(A);},getProperty:function(D){var B=Element.Properties[D];if(B){return this[B];
}var A=Element.PropertiesIFlag[D]||0;if(!window.ie||A){return this.getAttribute(D,A);}var C=this.attributes[D];return(C)?C.nodeValue:null;},removeProperty:function(B){var A=Element.Properties[B];
if(A){this[A]="";}else{this.removeAttribute(B);}return this;},getProperties:function(){return Element.getMany(this,"getProperty",arguments);},setProperty:function(C,B){var A=Element.Properties[C];
if(A){this[A]=B;}else{this.setAttribute(C,B);}return this;},setProperties:function(A){return Element.setMany(this,"setProperty",A);},setHTML:function(){this.innerHTML=$A(arguments).join("");
return this;},setText:function(B){var A=this.getTag();if(["style","script"].contains(A)){if(window.ie){if(A=="style"){this.styleSheet.cssText=B;}else{if(A=="script"){this.setProperty("text",B);
}}return this;}else{this.removeChild(this.firstChild);return this.appendText(B);}}this[$defined(this.innerText)?"innerText":"textContent"]=B;return this;
},getText:function(){var A=this.getTag();if(["style","script"].contains(A)){if(window.ie){if(A=="style"){return this.styleSheet.cssText;}else{if(A=="script"){return this.getProperty("text");
}}}else{return this.innerHTML;}}return($pick(this.innerText,this.textContent));},getTag:function(){return this.tagName.toLowerCase();},empty:function(){Garbage.trash(this.getElementsByTagName("*"));
return this.setHTML("");}});Element.fixStyle=function(E,A,D){if($chk(parseInt(A))){return A;}if(["height","width"].contains(E)){var B=(E=="width")?["left","right"]:["top","bottom"];
var C=0;B.each(function(F){C+=D.getStyle("border-"+F+"-width").toInt()+D.getStyle("padding-"+F).toInt();});return D["offset"+E.capitalize()]-C+"px";}else{if(E.test(/border(.+)Width|margin|padding/)){return"0px";
}}return A;};Element.Styles={"border":[],"padding":[],"margin":[]};["Top","Right","Bottom","Left"].each(function(B){for(var A in Element.Styles){Element.Styles[A].push(A+B);
}});Element.borderShort=["borderWidth","borderStyle","borderColor"];Element.getMany=function(B,D,C){var A={};$each(C,function(E){A[E]=B[D](E);});return A;
};Element.setMany=function(B,D,C){for(var A in C){B[D](A,C[A]);}return B;};Element.Properties=new Abstract({"class":"className","for":"htmlFor","colspan":"colSpan","rowspan":"rowSpan","accesskey":"accessKey","tabindex":"tabIndex","maxlength":"maxLength","readonly":"readOnly","frameborder":"frameBorder","value":"value","disabled":"disabled","checked":"checked","multiple":"multiple","selected":"selected"});
Element.PropertiesIFlag={"href":2,"src":2};Element.Methods={Listeners:{addListener:function(B,A){if(this.addEventListener){this.addEventListener(B,A,false);
}else{this.attachEvent("on"+B,A);}return this;},removeListener:function(B,A){if(this.removeEventListener){this.removeEventListener(B,A,false);}else{this.detachEvent("on"+B,A);
}return this;}}};window.extend(Element.Methods.Listeners);document.extend(Element.Methods.Listeners);Element.extend(Element.Methods.Listeners);var Garbage={elements:[],collect:function(A){if(!A.$tmp){Garbage.elements.push(A);
A.$tmp={"opacity":1};}return A;},trash:function(D){for(var B=0,A=D.length,C;B<A;B++){if(!(C=D[B])||!C.$tmp){continue;}if(C.$events){C.fireEvent("trash").removeEvents();
}for(var E in C.$tmp){C.$tmp[E]=null;}for(var F in Element.prototype){C[F]=null;}Garbage.elements[Garbage.elements.indexOf(C)]=null;C.htmlElement=C.$tmp=C=null;
}Garbage.elements.remove(null);},empty:function(){Garbage.collect(window);Garbage.collect(document);Garbage.trash(Garbage.elements);}};window.addListener("beforeunload",function(){window.addListener("unload",Garbage.empty);
if(window.ie){window.addListener("unload",CollectGarbage);}});var Event=new Class({initialize:function(C){if(C&&C.$extended){return C;}this.$extended=true;
C=C||window.event;this.event=C;this.type=C.type;this.target=C.target||C.srcElement;if(this.target.nodeType==3){this.target=this.target.parentNode;}this.shift=C.shiftKey;
this.control=C.ctrlKey;this.alt=C.altKey;this.meta=C.metaKey;if(["DOMMouseScroll","mousewheel"].contains(this.type)){this.wheel=(C.wheelDelta)?C.wheelDelta/120:-(C.detail||0)/3;
}else{if(this.type.contains("key")){this.code=C.which||C.keyCode;for(var B in Event.keys){if(Event.keys[B]==this.code){this.key=B;break;}}if(this.type=="keydown"){var A=this.code-111;
if(A>0&&A<13){this.key="f"+A;}}this.key=this.key||String.fromCharCode(this.code).toLowerCase();}else{if(this.type.test(/(click|mouse|menu)/)){this.page={"x":C.pageX||C.clientX+document.documentElement.scrollLeft,"y":C.pageY||C.clientY+document.documentElement.scrollTop};
this.client={"x":C.pageX?C.pageX-window.pageXOffset:C.clientX,"y":C.pageY?C.pageY-window.pageYOffset:C.clientY};this.rightClick=(C.which==3)||(C.button==2);
switch(this.type){case"mouseover":this.relatedTarget=C.relatedTarget||C.fromElement;break;case"mouseout":this.relatedTarget=C.relatedTarget||C.toElement;
}this.fixRelatedTarget();}}}return this;},stop:function(){return this.stopPropagation().preventDefault();},stopPropagation:function(){if(this.event.stopPropagation){this.event.stopPropagation();
}else{this.event.cancelBubble=true;}return this;},preventDefault:function(){if(this.event.preventDefault){this.event.preventDefault();}else{this.event.returnValue=false;
}return this;}});Event.fix={relatedTarget:function(){if(this.relatedTarget&&this.relatedTarget.nodeType==3){this.relatedTarget=this.relatedTarget.parentNode;
}},relatedTargetGecko:function(){try{Event.fix.relatedTarget.call(this);}catch(A){this.relatedTarget=this.target;}}};Event.prototype.fixRelatedTarget=(window.gecko)?Event.fix.relatedTargetGecko:Event.fix.relatedTarget;
Event.keys=new Abstract({"enter":13,"up":38,"down":40,"left":37,"right":39,"esc":27,"space":32,"backspace":8,"tab":9,"delete":46});Element.Methods.Events={addEvent:function(C,B){this.$events=this.$events||{};
this.$events[C]=this.$events[C]||{"keys":[],"values":[]};if(this.$events[C].keys.contains(B)){return this;}this.$events[C].keys.push(B);var A=C;var D=Element.Events[C];
if(D){if(D.add){D.add.call(this,B);}if(D.map){B=D.map;}if(D.type){A=D.type;}}if(!this.addEventListener){B=B.create({"bind":this,"event":true});}this.$events[C].values.push(B);
return(Element.NativeEvents.contains(A))?this.addListener(A,B):this;},removeEvent:function(C,B){if(!this.$events||!this.$events[C]){return this;}var F=this.$events[C].keys.indexOf(B);
if(F==-1){return this;}var A=this.$events[C].keys.splice(F,1)[0];var E=this.$events[C].values.splice(F,1)[0];var D=Element.Events[C];if(D){if(D.remove){D.remove.call(this,B);
}if(D.type){C=D.type;}}return(Element.NativeEvents.contains(C))?this.removeListener(C,E):this;},addEvents:function(A){return Element.setMany(this,"addEvent",A);
},removeEvents:function(A){if(!this.$events){return this;}if(!A){for(var B in this.$events){this.removeEvents(B);}this.$events=null;}else{if(this.$events[A]){this.$events[A].keys.each(function(C){this.removeEvent(A,C);
},this);this.$events[A]=null;}}return this;},fireEvent:function(C,B,A){if(this.$events&&this.$events[C]){this.$events[C].keys.each(function(D){D.create({"bind":this,"delay":A,"arguments":B})();
},this);}return this;},cloneEvents:function(C,A){if(!C.$events){return this;}if(!A){for(var B in C.$events){this.cloneEvents(C,B);}}else{if(C.$events[A]){C.$events[A].keys.each(function(D){this.addEvent(A,D);
},this);}}return this;}};window.extend(Element.Methods.Events);document.extend(Element.Methods.Events);Element.extend(Element.Methods.Events);Element.Events=new Abstract({"mouseenter":{type:"mouseover",map:function(A){A=new Event(A);
if(A.relatedTarget!=this&&!this.hasChild(A.relatedTarget)){this.fireEvent("mouseenter",A);}}},"mouseleave":{type:"mouseout",map:function(A){A=new Event(A);
if(A.relatedTarget!=this&&!this.hasChild(A.relatedTarget)){this.fireEvent("mouseleave",A);}}},"mousewheel":{type:(window.gecko)?"DOMMouseScroll":"mousewheel"}});
Element.NativeEvents=["click","dblclick","mouseup","mousedown","mousewheel","DOMMouseScroll","mouseover","mouseout","mousemove","keydown","keypress","keyup","load","unload","beforeunload","resize","move","focus","blur","change","submit","reset","select","error","abort","contextmenu","scroll"];
Function.extend({bindWithEvent:function(B,A){return this.create({"bind":B,"arguments":A,"event":Event});}});Elements.extend({filterByTag:function(A){return new Elements(this.filter(function(B){return(Element.getTag(B)==A);
}));},filterByClass:function(A,C){var B=this.filter(function(D){return(D.className&&D.className.contains(A," "));});return(C)?B:new Elements(B);},filterById:function(C,B){var A=this.filter(function(D){return(D.id==C);
});return(B)?A:new Elements(A);},filterByAttribute:function(B,A,D,E){var C=this.filter(function(F){var G=Element.getProperty(F,B);if(!G){return false;}if(!A){return true;
}switch(A){case"=":return(G==D);case"*=":return(G.contains(D));case"^=":return(G.substr(0,D.length)==D);case"$=":return(G.substr(G.length-D.length)==D);
case"!=":return(G!=D);case"~=":return G.contains(D," ");}return false;});return(E)?C:new Elements(C);}});function $E(A,B){return($(B)||document).getElement(A);
}function $ES(A,B){return($(B)||document).getElementsBySelector(A);}$$.shared={"regexp":/^(\w*|\*)(?:#([\w-]+)|\.([\w-]+))?(?:\[(\w+)(?:([!*^$]?=)["']?([^"'\]]*)["']?)?])?$/,"xpath":{getParam:function(B,D,E,C){var A=[D.namespaceURI?"xhtml:":"",E[1]];
if(E[2]){A.push('[@id="',E[2],'"]');}if(E[3]){A.push('[contains(concat(" ", @class, " "), " ',E[3],' ")]');}if(E[4]){if(E[5]&&E[6]){switch(E[5]){case"*=":A.push("[contains(@",E[4],', "',E[6],'")]');
break;case"^=":A.push("[starts-with(@",E[4],', "',E[6],'")]');break;case"$=":A.push("[substring(@",E[4],", string-length(@",E[4],") - ",E[6].length,' + 1) = "',E[6],'"]');
break;case"=":A.push("[@",E[4],'="',E[6],'"]');break;case"!=":A.push("[@",E[4],'!="',E[6],'"]');}}else{A.push("[@",E[4],"]");}}B.push(A.join(""));return B;
},getItems:function(B,E,G){var F=[];var A=document.evaluate(".//"+B.join("//"),E,$$.shared.resolver,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);for(var D=0,C=A.snapshotLength;
D<C;D++){F.push(A.snapshotItem(D));}return(G)?F:new Elements(F.map($));}},"normal":{getParam:function(A,C,E,B){if(B==0){if(E[2]){var D=C.getElementById(E[2]);
if(!D||((E[1]!="*")&&(Element.getTag(D)!=E[1]))){return false;}A=[D];}else{A=$A(C.getElementsByTagName(E[1]));}}else{A=$$.shared.getElementsByTagName(A,E[1]);
if(E[2]){A=Elements.filterById(A,E[2],true);}}if(E[3]){A=Elements.filterByClass(A,E[3],true);}if(E[4]){A=Elements.filterByAttribute(A,E[4],E[5],E[6],true);
}return A;},getItems:function(A,B,C){return(C)?A:$$.unique(A);}},resolver:function(A){return(A=="xhtml")?"http://www.w3.org/1999/xhtml":false;},getElementsByTagName:function(D,C){var E=[];
for(var B=0,A=D.length;B<A;B++){E.extend(D[B].getElementsByTagName(C));}return E;}};$$.shared.method=(window.xpath)?"xpath":"normal";Element.Methods.Dom={getElements:function(A,H){var C=[];
A=A.trim().split(" ");for(var E=0,D=A.length;E<D;E++){var F=A[E];var G=F.match($$.shared.regexp);if(!G){break;}G[1]=G[1]||"*";var B=$$.shared[$$.shared.method].getParam(C,this,G,E);
if(!B){break;}C=B;}return $$.shared[$$.shared.method].getItems(C,this,H);},getElement:function(A){return $(this.getElements(A,true)[0]||false);},getElementsBySelector:function(A,E){var D=[];
A=A.split(",");for(var C=0,B=A.length;C<B;C++){D=D.concat(this.getElements(A[C],true));}return(E)?D:$$.unique(D);}};Element.extend({getElementById:function(C){var B=document.getElementById(C);
if(!B){return false;}for(var A=B.parentNode;A!=this;A=A.parentNode){if(!A){return false;}}return B;},getElementsByClassName:function(A){return this.getElements("."+A);
}});document.extend(Element.Methods.Dom);Element.extend(Element.Methods.Dom);Element.extend({getValue:function(){switch(this.getTag()){case"select":var A=[];
$each(this.options,function(B){if(B.selected){A.push($pick(B.value,B.text));}});return(this.multiple)?A:A[0];case"input":if(!(this.checked&&["checkbox","radio"].contains(this.type))&&!["hidden","text","password"].contains(this.type)){break;
}case"textarea":return this.value;}return false;},getFormElements:function(){return $$(this.getElementsByTagName("input"),this.getElementsByTagName("select"),this.getElementsByTagName("textarea"));
},toQueryString:function(){var A=[];this.getFormElements().each(function(D){var C=D.name;var E=D.getValue();if(E===false||!C||D.disabled){return ;}var B=function(F){A.push(C+"="+encodeURIComponent(F));
};if($type(E)=="array"){E.each(B);}else{B(E);}});return A.join("&");}});Element.extend({scrollTo:function(A,B){this.scrollLeft=A;this.scrollTop=B;},getSize:function(){return{"scroll":{"x":this.scrollLeft,"y":this.scrollTop},"size":{"x":this.offsetWidth,"y":this.offsetHeight},"scrollSize":{"x":this.scrollWidth,"y":this.scrollHeight}};
},getPosition:function(A){A=A||[];var B=this,D=0,C=0;do{D+=B.offsetLeft||0;C+=B.offsetTop||0;B=B.offsetParent;}while(B);A.each(function(E){D-=E.scrollLeft||0;
C-=E.scrollTop||0;});return{"x":D,"y":C};},getTop:function(A){return this.getPosition(A).y;},getLeft:function(A){return this.getPosition(A).x;},getCoordinates:function(B){var A=this.getPosition(B);
var C={"width":this.offsetWidth,"height":this.offsetHeight,"left":A.x,"top":A.y};C.right=C.left+C.width;C.bottom=C.top+C.height;return C;}});Element.Events.domready={add:function(B){if(window.loaded){B.call(this);
return ;}var A=function(){if(window.loaded){return ;}window.loaded=true;window.timer=$clear(window.timer);this.fireEvent("domready");}.bind(this);if(document.readyState&&window.webkit){window.timer=function(){if(["loaded","complete"].contains(document.readyState)){A();
}}.periodical(50);}else{if(document.readyState&&window.ie){if(!$("ie_ready")){var C=(window.location.protocol=="https:")?"://0":"javascript:void(0)";document.write('<script id="ie_ready" defer src="'+C+'"><\/script>');
$("ie_ready").onreadystatechange=function(){if(this.readyState=="complete"){A();}};}}else{window.addListener("load",A);document.addListener("DOMContentLoaded",A);
}}}};window.onDomReady=function(A){return this.addEvent("domready",A);};window.extend({getWidth:function(){if(this.webkit419){return this.innerWidth;}if(this.opera){return document.body.clientWidth;
}return document.documentElement.clientWidth;},getHeight:function(){if(this.webkit419){return this.innerHeight;}if(this.opera){return document.body.clientHeight;
}return document.documentElement.clientHeight;},getScrollWidth:function(){if(this.ie){return Math.max(document.documentElement.offsetWidth,document.documentElement.scrollWidth);
}if(this.webkit){return document.body.scrollWidth;}return document.documentElement.scrollWidth;},getScrollHeight:function(){if(this.ie){return Math.max(document.documentElement.offsetHeight,document.documentElement.scrollHeight);
}if(this.webkit){return document.body.scrollHeight;}return document.documentElement.scrollHeight;},getScrollLeft:function(){return this.pageXOffset||document.documentElement.scrollLeft;
},getScrollTop:function(){return this.pageYOffset||document.documentElement.scrollTop;},getSize:function(){return{"size":{"x":this.getWidth(),"y":this.getHeight()},"scrollSize":{"x":this.getScrollWidth(),"y":this.getScrollHeight()},"scroll":{"x":this.getScrollLeft(),"y":this.getScrollTop()}};
},getPosition:function(){return{"x":0,"y":0};}});var Fx={};Fx.Base=new Class({options:{onStart:Class.empty,onComplete:Class.empty,onCancel:Class.empty,transition:function(A){return -(Math.cos(Math.PI*A)-1)/2;
},duration:500,unit:"px",wait:true,fps:50},initialize:function(A){this.element=this.element||null;this.setOptions(A);if(this.options.initialize){this.options.initialize.call(this);
}},step:function(){var A=$time();if(A<this.time+this.options.duration){this.delta=this.options.transition((A-this.time)/this.options.duration);this.setNow();
this.increase();}else{this.stop(true);this.set(this.to);this.fireEvent("onComplete",this.element,10);this.callChain();}},set:function(A){this.now=A;this.increase();
return this;},setNow:function(){this.now=this.compute(this.from,this.to);},compute:function(B,A){return(A-B)*this.delta+B;},start:function(B,A){if(!this.options.wait){this.stop();
}else{if(this.timer){return this;}}this.from=B;this.to=A;this.change=this.to-this.from;this.time=$time();this.timer=this.step.periodical(Math.round(1000/this.options.fps),this);
this.fireEvent("onStart",this.element);return this;},stop:function(A){if(!this.timer){return this;}this.timer=$clear(this.timer);if(!A){this.fireEvent("onCancel",this.element);
}return this;},custom:function(B,A){return this.start(B,A);},clearTimer:function(A){return this.stop(A);}});Fx.Base.implement(new Chain,new Events,new Options);
Fx.CSS={select:function(B,C){if(B.test(/color/i)){return this.Color;}var A=$type(C);if((A=="array")||(A=="string"&&C.contains(" "))){return this.Multi;
}return this.Single;},parse:function(C,D,A){if(!A.push){A=[A];}var F=A[0],E=A[1];if(!$chk(E)){E=F;F=C.getStyle(D);}var B=this.select(D,E);return{"from":B.parse(F),"to":B.parse(E),"css":B};
}};Fx.CSS.Single={parse:function(A){return parseFloat(A);},getNow:function(C,B,A){return A.compute(C,B);},getValue:function(C,A,B){if(A=="px"&&B!="opacity"){C=Math.round(C);
}return C+A;}};Fx.CSS.Multi={parse:function(A){return A.push?A:A.split(" ").map(function(B){return parseFloat(B);});},getNow:function(E,D,C){var A=[];for(var B=0;
B<E.length;B++){A[B]=C.compute(E[B],D[B]);}return A;},getValue:function(C,A,B){if(A=="px"&&B!="opacity"){C=C.map(Math.round);}return C.join(A+" ")+A;}};
Fx.CSS.Color={parse:function(A){return A.push?A:A.hexToRgb(true);},getNow:function(E,D,C){var A=[];for(var B=0;B<E.length;B++){A[B]=Math.round(C.compute(E[B],D[B]));
}return A;},getValue:function(A){return"rgb("+A.join(",")+")";}};Fx.Style=Fx.Base.extend({initialize:function(B,C,A){this.element=$(B);this.property=C;
this.parent(A);},hide:function(){return this.set(0);},setNow:function(){this.now=this.css.getNow(this.from,this.to,this);},set:function(A){this.css=Fx.CSS.select(this.property,A);
return this.parent(this.css.parse(A));},start:function(C,B){if(this.timer&&this.options.wait){return this;}var A=Fx.CSS.parse(this.element,this.property,[C,B]);
this.css=A.css;return this.parent(A.from,A.to);},increase:function(){this.element.setStyle(this.property,this.css.getValue(this.now,this.options.unit,this.property));
}});Element.extend({effect:function(B,A){return new Fx.Style(this,B,A);}});Fx.Styles=Fx.Base.extend({initialize:function(B,A){this.element=$(B);this.parent(A);
},setNow:function(){for(var A in this.from){this.now[A]=this.css[A].getNow(this.from[A],this.to[A],this);}},set:function(C){var A={};this.css={};for(var B in C){this.css[B]=Fx.CSS.select(B,C[B]);
A[B]=this.css[B].parse(C[B]);}return this.parent(A);},start:function(C){if(this.timer&&this.options.wait){return this;}this.now={};this.css={};var E={},D={};
for(var B in C){var A=Fx.CSS.parse(this.element,B,C[B]);E[B]=A.from;D[B]=A.to;this.css[B]=A.css;}return this.parent(E,D);},increase:function(){for(var A in this.now){this.element.setStyle(A,this.css[A].getValue(this.now[A],this.options.unit,A));
}}});Element.extend({effects:function(A){return new Fx.Styles(this,A);}});Fx.Elements=Fx.Base.extend({initialize:function(B,A){this.elements=$$(B);this.parent(A);
},setNow:function(){for(var C in this.from){var F=this.from[C],E=this.to[C],B=this.css[C],A=this.now[C]={};for(var D in F){A[D]=B[D].getNow(F[D],E[D],this);
}}},set:function(G){var B={};this.css={};for(var D in G){var F=G[D],C=this.css[D]={},A=B[D]={};for(var E in F){C[E]=Fx.CSS.select(E,F[E]);A[E]=C[E].parse(F[E]);
}}return this.parent(B);},start:function(D){if(this.timer&&this.options.wait){return this;}this.now={};this.css={};var I={},J={};for(var E in D){var G=D[E],A=I[E]={},H=J[E]={},C=this.css[E]={};
for(var B in G){var F=Fx.CSS.parse(this.elements[E],B,G[B]);A[B]=F.from;H[B]=F.to;C[B]=F.css;}}return this.parent(I,J);},increase:function(){for(var C in this.now){var A=this.now[C],B=this.css[C];
for(var D in A){this.elements[C].setStyle(D,B[D].getValue(A[D],this.options.unit,D));}}}});Fx.Scroll=Fx.Base.extend({options:{overflown:[],offset:{"x":0,"y":0},wheelStops:true},initialize:function(B,A){this.now=[];
this.element=$(B);this.bound={"stop":this.stop.bind(this,false)};this.parent(A);if(this.options.wheelStops){this.addEvent("onStart",function(){document.addEvent("mousewheel",this.bound.stop);
}.bind(this));this.addEvent("onComplete",function(){document.removeEvent("mousewheel",this.bound.stop);}.bind(this));}},setNow:function(){for(var A=0;A<2;
A++){this.now[A]=this.compute(this.from[A],this.to[A]);}},scrollTo:function(B,F){if(this.timer&&this.options.wait){return this;}var D=this.element.getSize();
var C={"x":B,"y":F};for(var E in D.size){var A=D.scrollSize[E]-D.size[E];if($chk(C[E])){C[E]=($type(C[E])=="number")?C[E].limit(0,A):A;}else{C[E]=D.scroll[E];
}C[E]+=this.options.offset[E];}return this.start([D.scroll.x,D.scroll.y],[C.x,C.y]);},toTop:function(){return this.scrollTo(false,0);},toBottom:function(){return this.scrollTo(false,"full");
},toLeft:function(){return this.scrollTo(0,false);},toRight:function(){return this.scrollTo("full",false);},toElement:function(B){var A=this.element.getPosition(this.options.overflown);
var C=$(B).getPosition(this.options.overflown);return this.scrollTo(C.x-A.x,C.y-A.y);},increase:function(){this.element.scrollTo(this.now[0],this.now[1]);
}});Fx.Transition=function(B,A){A=A||[];if($type(A)!="array"){A=[A];}return $extend(B,{easeIn:function(C){return B(C,A);},easeOut:function(C){return 1-B(1-C,A);
},easeInOut:function(C){return(C<=0.5)?B(2*C,A)/2:(2-B(2*(1-C),A))/2;}});};Fx.Transitions=new Abstract({linear:function(A){return A;}});Fx.Transitions.extend=function(A){for(var B in A){Fx.Transitions[B]=new Fx.Transition(A[B]);
Fx.Transitions.compat(B);}};Fx.Transitions.compat=function(A){["In","Out","InOut"].each(function(B){Fx.Transitions[A.toLowerCase()+B]=Fx.Transitions[A]["ease"+B];
});};Fx.Transitions.extend({Pow:function(B,A){return Math.pow(B,A[0]||6);},Expo:function(A){return Math.pow(2,8*(A-1));},Circ:function(A){return 1-Math.sin(Math.acos(A));
},Sine:function(A){return 1-Math.sin((1-A)*Math.PI/2);},Back:function(B,A){A=A[0]||1.618;return Math.pow(B,2)*((A+1)*B-A);},Bounce:function(D){var C;for(var B=0,A=1;
1;B+=A,A/=2){if(D>=(7-4*B)/11){C=-Math.pow((11-6*B-11*D)/4,2)+A*A;break;}}return C;},Elastic:function(B,A){return Math.pow(2,10*--B)*Math.cos(20*B*Math.PI*(A[0]||1)/3);
}});["Quad","Cubic","Quart","Quint"].each(function(B,A){Fx.Transitions[B]=new Fx.Transition(function(C){return Math.pow(C,[A+2]);});Fx.Transitions.compat(B);
});var Drag={};Drag.Base=new Class({options:{handle:false,unit:"px",onStart:Class.empty,onBeforeStart:Class.empty,onComplete:Class.empty,onSnap:Class.empty,onDrag:Class.empty,limit:false,modifiers:{x:"left",y:"top"},grid:false,snap:6},initialize:function(B,A){this.setOptions(A);
this.element=$(B);this.handle=$(this.options.handle)||this.element;this.mouse={"now":{},"pos":{}};this.value={"start":{},"now":{}};this.bound={"start":this.start.bindWithEvent(this),"check":this.check.bindWithEvent(this),"drag":this.drag.bindWithEvent(this),"stop":this.stop.bind(this)};
this.attach();if(this.options.initialize){this.options.initialize.call(this);}},attach:function(){this.handle.addEvent("mousedown",this.bound.start);return this;
},detach:function(){this.handle.removeEvent("mousedown",this.bound.start);return this;},start:function(C){this.fireEvent("onBeforeStart",this.element);
this.mouse.start=C.page;var A=this.options.limit;this.limit={"x":[],"y":[]};for(var D in this.options.modifiers){if(!this.options.modifiers[D]){continue;
}this.value.now[D]=this.element.getStyle(this.options.modifiers[D]).toInt();this.mouse.pos[D]=C.page[D]-this.value.now[D];if(A&&A[D]){for(var B=0;B<2;B++){if($chk(A[D][B])){this.limit[D][B]=($type(A[D][B])=="function")?A[D][B]():A[D][B];
}}}}if($type(this.options.grid)=="number"){this.options.grid={"x":this.options.grid,"y":this.options.grid};}document.addListener("mousemove",this.bound.check);
document.addListener("mouseup",this.bound.stop);this.fireEvent("onStart",this.element);C.stop();},check:function(A){var B=Math.round(Math.sqrt(Math.pow(A.page.x-this.mouse.start.x,2)+Math.pow(A.page.y-this.mouse.start.y,2)));
if(B>this.options.snap){document.removeListener("mousemove",this.bound.check);document.addListener("mousemove",this.bound.drag);this.drag(A);this.fireEvent("onSnap",this.element);
}A.stop();},drag:function(A){this.out=false;this.mouse.now=A.page;for(var B in this.options.modifiers){if(!this.options.modifiers[B]){continue;}this.value.now[B]=this.mouse.now[B]-this.mouse.pos[B];
if(this.limit[B]){if($chk(this.limit[B][1])&&(this.value.now[B]>this.limit[B][1])){this.value.now[B]=this.limit[B][1];this.out=true;}else{if($chk(this.limit[B][0])&&(this.value.now[B]<this.limit[B][0])){this.value.now[B]=this.limit[B][0];
this.out=true;}}}if(this.options.grid[B]){this.value.now[B]-=(this.value.now[B]%this.options.grid[B]);}this.element.setStyle(this.options.modifiers[B],this.value.now[B]+this.options.unit);
}this.fireEvent("onDrag",this.element);A.stop();},stop:function(){document.removeListener("mousemove",this.bound.check);document.removeListener("mousemove",this.bound.drag);
document.removeListener("mouseup",this.bound.stop);this.fireEvent("onComplete",this.element);}});Drag.Base.implement(new Events,new Options);Element.extend({makeResizable:function(A){return new Drag.Base(this,$merge({modifiers:{x:"width",y:"height"}},A));
}});var XHR=new Class({options:{method:"post",async:true,onRequest:Class.empty,onSuccess:Class.empty,onFailure:Class.empty,urlEncoded:true,encoding:"utf-8",autoCancel:false,headers:{}},setTransport:function(){this.transport=(window.XMLHttpRequest)?new XMLHttpRequest():(window.ie?new ActiveXObject("Microsoft.XMLHTTP"):false);
return this;},initialize:function(A){this.setTransport().setOptions(A);this.options.isSuccess=this.options.isSuccess||this.isSuccess;this.headers={};if(this.options.urlEncoded&&this.options.method=="post"){var B=(this.options.encoding)?"; charset="+this.options.encoding:"";
this.setHeader("Content-type","application/x-www-form-urlencoded"+B);}if(this.options.initialize){this.options.initialize.call(this);}},onStateChange:function(){if(this.transport.readyState!=4||!this.running){return ;
}this.running=false;var A=0;try{A=this.transport.status;}catch(B){}if(this.options.isSuccess.call(this,A)){this.onSuccess();}else{this.onFailure();}this.transport.onreadystatechange=Class.empty;
},isSuccess:function(A){return((A>=200)&&(A<300));},onSuccess:function(){this.response={"text":this.transport.responseText,"xml":this.transport.responseXML};
this.fireEvent("onSuccess",[this.response.text,this.response.xml]);this.callChain();},onFailure:function(){this.fireEvent("onFailure",this.transport);},setHeader:function(A,B){this.headers[A]=B;
return this;},send:function(A,C){if(this.options.autoCancel){this.cancel();}else{if(this.running){return this;}}this.running=true;if(C&&this.options.method=="get"){A=A+(A.contains("?")?"&":"?")+C;
C=null;}this.transport.open(this.options.method.toUpperCase(),A,this.options.async);this.transport.onreadystatechange=this.onStateChange.bind(this);if((this.options.method=="post")&&this.transport.overrideMimeType){this.setHeader("Connection","close");
}$extend(this.headers,this.options.headers);for(var B in this.headers){try{this.transport.setRequestHeader(B,this.headers[B]);}catch(D){}}this.fireEvent("onRequest");
this.transport.send($pick(C,null));return this;},cancel:function(){if(!this.running){return this;}this.running=false;this.transport.abort();this.transport.onreadystatechange=Class.empty;
this.setTransport();this.fireEvent("onCancel");return this;}});XHR.implement(new Chain,new Events,new Options);var Ajax=XHR.extend({options:{data:null,update:null,onComplete:Class.empty,evalScripts:false,evalResponse:false},initialize:function(B,A){this.addEvent("onSuccess",this.onComplete);
this.setOptions(A);this.options.data=this.options.data||this.options.postBody;if(!["post","get"].contains(this.options.method)){this._method="_method="+this.options.method;
this.options.method="post";}this.parent();this.setHeader("X-Requested-With","XMLHttpRequest");this.setHeader("Accept","text/javascript, text/html, application/xml, text/xml, */*");
this.url=B;},onComplete:function(){if(this.options.update){$(this.options.update).empty().setHTML(this.response.text);}if(this.options.evalScripts||this.options.evalResponse){this.evalScripts();
}this.fireEvent("onComplete",[this.response.text,this.response.xml],20);},request:function(A){A=A||this.options.data;switch($type(A)){case"element":A=$(A).toQueryString();
break;case"object":A=Object.toQueryString(A);}if(this._method){A=(A)?[this._method,A].join("&"):this._method;}return this.send(this.url,A);},evalScripts:function(){var B,A;
if(this.options.evalResponse||(/(ecma|java)script/).test(this.getHeader("Content-type"))){A=this.response.text;}else{A=[];var C=/<script[^>]*>([\s\S]*?)<\/script>/gi;
while((B=C.exec(this.response.text))){A.push(B[1]);}A=A.join("\n");}if(A){(window.execScript)?window.execScript(A):window.setTimeout(A,0);}},getHeader:function(A){try{return this.transport.getResponseHeader(A);
}catch(B){}return null;}});Object.toQueryString=function(B){var C=[];for(var A in B){C.push(encodeURIComponent(A)+"="+encodeURIComponent(B[A]));}return C.join("&");
};Element.extend({send:function(A){return new Ajax(this.getProperty("action"),$merge({data:this.toQueryString()},A,{method:"post"})).request();}});var Cookie=new Abstract({options:{domain:false,path:false,duration:false,secure:false},set:function(C,D,B){B=$merge(this.options,B);
D=encodeURIComponent(D);if(B.domain){D+="; domain="+B.domain;}if(B.path){D+="; path="+B.path;}if(B.duration){var A=new Date();A.setTime(A.getTime()+B.duration*24*60*60*1000);
D+="; expires="+A.toGMTString();}if(B.secure){D+="; secure";}document.cookie=C+"="+D;return $extend(B,{"key":C,"value":D});},get:function(A){var B=document.cookie.match("(?:^|;)\\s*"+A.escapeRegExp()+"=([^;]*)");
return B?decodeURIComponent(B[1]):false;},remove:function(B,A){if($type(B)=="object"){this.set(B.key,"",$merge(B,{duration:-1}));}else{this.set(B,"",$merge(A,{duration:-1}));
}}});var Json={toString:function(C){switch($type(C)){case"string":return'"'+C.replace(/(["\\])/g,"\\$1")+'"';case"array":return"["+C.map(Json.toString).join(",")+"]";
case"object":var A=[];for(var B in C){A.push(Json.toString(B)+":"+Json.toString(C[B]));}return"{"+A.join(",")+"}";case"number":if(isFinite(C)){break;}case false:return"null";
}return String(C);},evaluate:function(str,secure){return(($type(str)!="string")||(secure&&!str.test(/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/)))?null:eval("("+str+")");
}};Json.Remote=XHR.extend({initialize:function(B,A){this.url=B;this.addEvent("onSuccess",this.onComplete);this.parent(A);this.setHeader("X-Request","JSON");
},send:function(A){return this.parent(this.url,"json="+Json.toString(A));},onComplete:function(){this.fireEvent("onComplete",[Json.evaluate(this.response.text,this.options.secure)]);
}});var Asset=new Abstract({javascript:function(C,B){B=$merge({"onload":Class.empty},B);var A=new Element("script",{"src":C}).addEvents({"load":B.onload,"readystatechange":function(){if(this.readyState=="complete"){this.fireEvent("load");
}}});delete B.onload;return A.setProperties(B).inject(document.head);},css:function(B,A){return new Element("link",$merge({"rel":"stylesheet","media":"screen","type":"text/css","href":B},A)).inject(document.head);
},image:function(C,B){B=$merge({"onload":Class.empty,"onabort":Class.empty,"onerror":Class.empty},B);var D=new Image();D.src=C;var A=new Element("img",{"src":C});
["load","abort","error"].each(function(E){var F=B["on"+E];delete B["on"+E];A.addEvent(E,function(){this.removeEvent(E,arguments.callee);F.call(this);});
});if(D.width&&D.height){A.fireEvent("load",A,1);}return A.setProperties(B);},images:function(D,C){C=$merge({onComplete:Class.empty,onProgress:Class.empty},C);
if(!D.push){D=[D];}var A=[];var B=0;D.each(function(F){var E=new Asset.image(F,{"onload":function(){C.onProgress.call(this,B);B++;if(B==D.length){C.onComplete();
}}});A.push(E);});return new Elements(A);}});var Hash=new Class({length:0,initialize:function(A){this.obj=A||{};this.setLength();},get:function(A){return(this.hasKey(A))?this.obj[A]:null;
},hasKey:function(A){return(A in this.obj);},set:function(A,B){if(!this.hasKey(A)){this.length++;}this.obj[A]=B;return this;},setLength:function(){this.length=0;
for(var A in this.obj){this.length++;}return this;},remove:function(A){if(this.hasKey(A)){delete this.obj[A];this.length--;}return this;},each:function(A,B){$each(this.obj,A,B);
},extend:function(A){$extend(this.obj,A);return this.setLength();},merge:function(){this.obj=$merge.apply(null,[this.obj].extend(arguments));return this.setLength();
},empty:function(){this.obj={};this.length=0;return this;},keys:function(){var A=[];for(var B in this.obj){A.push(B);}return A;},values:function(){var A=[];
for(var B in this.obj){A.push(this.obj[B]);}return A;}});function $H(A){return new Hash(A);}Hash.Cookie=Hash.extend({initialize:function(B,A){this.name=B;
this.options=$extend({"autoSave":true},A||{});this.load();},save:function(){if(this.length==0){Cookie.remove(this.name,this.options);return true;}var A=Json.toString(this.obj);
if(A.length>4096){return false;}Cookie.set(this.name,A,this.options);return true;},load:function(){this.obj=Json.evaluate(Cookie.get(this.name),true)||{};
this.setLength();}});Hash.Cookie.Methods={};["extend","set","merge","empty","remove"].each(function(A){Hash.Cookie.Methods[A]=function(){Hash.prototype[A].apply(this,arguments);
if(this.options.autoSave){this.save();}return this;};});Hash.Cookie.implement(Hash.Cookie.Methods);



var reloadWindow = false;

function getElement(id) {
	return $(id);
}
function findPos(obj) {
	if(!obj) return;
	var curleft = curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft
		curtop = obj.offsetTop
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft
			curtop += obj.offsetTop
		}
	}
	return [curleft,curtop];
}
function setItemCookie(nextItemID, cookieName, index){
	if (cookieName == 'Related'){
		cookieName = 'nextVideosClkItemID';
	}
	else if (cookieName == 'Recommended'){
		cookieName = 'sideBarDynBanClkItemID';
	}
	else if (cookieName == 'Newest' || cookieName == 'User'){
		cookieName = 'newestVideosClkItemID';
	}
	if (cookieName){
		setRealCookie(cookieName, nextItemID, getExpDate(0, 0, 10), "/", ".metacafe.com");
		setRealCookie('prev' + cookieName, itemID, getExpDate(0, 0, 10), "/", ".metacafe.com");
		setRealCookie('index' + cookieName, index - 1, getExpDate(0, 0, 10), "/", ".metacafe.com");
	}
}

function AjaxRequest(method, sUrl, sPostdata, fnOnComplete, fnOnError)
{
	var ajaxObj = new ajaxObject(method,sUrl,sPostdata, fnOnComplete, fnOnError);
	ajaxObj.load();
	return true;
}
function ajaxObject(method,url,postData,onCompleteFn,onErrorFn){
	this.method = method;
	this.url = getFullURL(url);
	this.postData = postData;
	this.onComplete = onCompleteFn;
	this.onError = onErrorFn;
}
ajaxObject.prototype.load = function(){
	this.request = this.getXHR();
	var _this = this;
	this.request.onreadystatechange = function(){_this.onData()};
	this.request.open(this.method, this.url, true);
	this.request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	this.request.setRequestHeader('Connection', 'close');
	this.request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	this.request.send(this.postData);
}
ajaxObject.prototype.getXHR = function(){
	var xmlHttp;
	try{
		xmlHttp = new ActiveXObject("Msxml2.XMLHttp");
	}
	catch(e){
		try{
			xmlHttp = new ActiveXObject("Microsoft.XMLHttp");
		}
		catch(e2){}
	}
	if(xmlHttp == undefined && (typeof XMLHttpRequest != 'undefined')){
		xmlHttp = new XMLHttpRequest();
	}
	return xmlHttp;
}
ajaxObject.prototype.onData = function(){
	if(this.request.readyState == 1){
		}
	if(this.request.readyState == 4){
		if(this.request.status == "200"){
			this.headers = this.request.getAllResponseHeaders();
			if(this.onComplete != undefined){
				this.onComplete(this.request.responseText);
			}
		}else{
			if(this.onError != undefined){
							this.onError(this.request.status, this.request.responseText);
			}
		}
		delete this.request;
	}
}

function getFullURL(sUrl){
	if (sUrl.charAt(0) == '/') {
		var rand = new String(Math.random());
		rand = rand.substring(2, 11);

		var serverAddr = location.href;
		var lastSlashIndex = serverAddr.indexOf('/', 8);		var fullUrl = new String(serverAddr.substr(0,lastSlashIndex));
		fullUrl = fullUrl.concat('/ajax_services/' + rand + sUrl);
		return fullUrl;
	}
	return sUrl;
}
// format; pass three integer parameters for the number of days, hours,// values for a past date); all three parameters are required,var reloadWindow = false;

function getExpDate(days, hours, minutes) {
    var expDate = new Date( );
    if (typeof days == "number" && typeof hours == "number" && 
        typeof hours == "number") {
        expDate.setDate(expDate.getDate( ) + parseInt(days));
        expDate.setHours(expDate.getHours( ) + parseInt(hours));
        expDate.setMinutes(expDate.getMinutes( ) + parseInt(minutes));
        return expDate.toGMTString( );
    }
}

      // a replacement for escape() which encodes the data using UTF8
      //
      // (C)2004 Cal Henderson <cal@iamcal.com>
      //
      
      function escape_utf8(data) {
		 if (typeof(data) != 'string'){
		 	return data;
		 }
		 
         if (data == '' || data == null){
            return '';
         }
      
         var buffer = '';
         for(var i=0; i<data.length; i++){
            var c = data.charCodeAt(i);
            var bs = new Array();
      
            if (c > 0x10000){
               // 4 bytes
               bs[0] = 0xF0 | ((c & 0x1C0000) >>> 18);
               bs[1] = 0x80 | ((c & 0x3F000) >>> 12);
               bs[2] = 0x80 | ((c & 0xFC0) >>> 6);
               bs[3] = 0x80 | (c & 0x3F);
      
            }else if (c > 0x800){
               // 3 bytes
               bs[0] = 0xE0 | ((c & 0xF000) >>> 12);
               bs[1] = 0x80 | ((c & 0xFC0) >>> 6);
               bs[2] = 0x80 | (c & 0x3F);
      
            }else if (c > 0x80){
               // 2 bytes
               bs[0] = 0xC0 | ((c & 0x7C0) >>> 6);
               bs[1] = 0x80 | (c & 0x3F);
      
            }else{
               // 1 byte
               bs[0] = c;
            }
      
            for(var j=0; j<bs.length; j++){
               var b = bs[j];
               var hex = nibble_to_hex((b & 0xF0) >>> 4) + nibble_to_hex(b & 0x0F);
               buffer += '%'+hex;
            }
         }
      
         return buffer;
      }
      
      function nibble_to_hex(nibble){
         var chars = '0123456789ABCDEF';
         return chars.charAt(nibble);
      }
function getCookie(name) {
   	var cookies = document.cookie;
    var prefix = name + "=";
    var beginP = cookies.indexOf("; " + prefix);
    if (beginP == -1){
        beginP = cookies.indexOf(prefix);
        if (beginP != 0) return null;
    } 
    else {
        beginP += 2;
    }
    var endP = cookies.indexOf(";", beginP);
    if (endP == -1) {
        endP = cookies.length;
    }
    return unescape(cookies.substring(beginP + prefix.length, endP));
}
function onErrorChangeCookie(error) {
	alert('Error: ' + error);
}
function onCompleteChangeCookie(data) {
	if (data != 0) {
	    document.cookie = "mainData=" + data + 
	    					"; expires=" + getExpDate(1000,0,0) +
	    					"; path='/'" +
	    					"; domain='.metacafe.com'";
	    if (reloadWindow){
			var jsonData = Json.evaluate(data);
	    	reloadWindow = false;
	    	if (headerObj.category == "adult"){
	    		var currURL = window.location.href;
	    		currURL = currURL.replace('/adult', '');
	    		window.location.href = currURL;
	    	}
	    	else{
				window.location.href = window.location.href;
	    	}
	    }
	}
}
function setCookies(values) {
	var postData = 'values=' + values + '&action=setc';
	if(typeof sid == "undefined") sid = '';
	AjaxRequest("POST","/cookies.php?sid=" + sid ,postData ,onCompleteChangeCookie, onErrorChangeCookie);
}
function setCookie(name, value, needToReloadWindow) { //, expires, path, domain, secure
	var postData = 'name=' + name + '&value=' + value + '&action=set';
	if (needToReloadWindow) reloadWindow = true;
	AjaxRequest("POST","/cookies.php?sid=" + sid ,postData ,onCompleteChangeCookie, onErrorChangeCookie);
}

function setRealCookie(name, value, expires, path, domain, secure) {
    document.cookie = name + "=" + escape_utf8 (value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}   function deleteCookie(name,path,domain) {
	var postData = 'name=' + name + '&action=delete';
	AjaxRequest("POST","/cookies.php?sid=" + sid ,postData ,onCompleteChangeCookie, onErrorChangeCookie);
}
/* SiteCatalyst code version: H.1.
Copyright 1997-2005 Omniture, Inc. More info available at
http://www.omniture.com */
/* Specify the Report Suite ID(s) to track here */
var s_account=omnitureEnv
var s=s_gi(s_account)
/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkDownloadFileTypes="exe,zip,wav,mp3,mov,mpg,avi,wmv,doc,pdf,xls"
s.linkInternalFilters="javascript:,."
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

/* WARNING: Changing the visitor namespace will cause drastic changes
to how your visitor data is collected.  Changes should only be made
when instructed to do so by your account manager.*/
s.visitorNamespace="metacafe"

/* Plugin Config */
s.usePlugins=true
function s_doPlugins(s) {
	/* Add calls to plugins here */
}
s.doPlugins=s_doPlugins
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * Plugin: getQueryParam 1.1 - Return query string parameter values
 */
s.getQueryParam=new Function("qp","d",""
+"var s=this,v='',d=d?d:'',i,t;while(qp){i=qp.indexOf(',');i=i<0?qp.l"
+"ength:i;t=s.gcgi(qp.substring(0,i));if(t)v+=v?d+t:t;qp=qp.substring"
+"(i==qp.length?i:i+1)}return v");
s.gcgi=new Function("k",""
+"var v='',s=this;if(k&&s.wd.location.search){var q=s.wd.location.sea"
+"rch.toLowerCase(),qq=q.indexOf('?');q=qq<0?q:q.substring(qq+1);v=s."
+"pt(q,'&','cgif',k.toLowerCase())}return v");
s.cgif=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),sk=i<0?t:t.substring(0,i),sv=i<0?"
+"'True':t.substring(i+1);if(sk.toLowerCase()==k)return s.epa(sv)}ret"
+"urn ''");

/*
 * Plugin: Get Query String CGI Variable Value
 */
function s_vp_getCGI(vs,k)
	{var v='';if(k&&s_wd.location.search){var q=s_wd.location.search,
	qq=q.indexOf('?');q=qq<0?q:q.substring(qq+1);v=s_pt(q,'&',s_cgif,
	k.toLowerCase())}s_vpr(vs,v)}function s_cgif(t,k){if(t){var te=
	t.indexOf('='),sk=te<0?t:t.substring(0,te),sv=te<0?'True':
	t.substring(te+1);if(sk.toLowerCase()==k)return s_epa(sv)}
	return ''}
/*
 * Plugin Utilities v2.0 (Required For All Plugins)
 */
/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_objectID;function s_c2fe(f){var x='',s=0,e,a,b,c;while(1){e=
f.indexOf('"',s);b=f.indexOf('\\',s);c=f.indexOf("\n",s);if(e<0||(b>=
0&&b<e))e=b;if(e<0||(c>=0&&c<e))e=c;if(e>=0){x+=(e>s?f.substring(s,e):
'')+(e==c?'\\n':'\\'+f.substring(e,e+1));s=e+1}else return x
+f.substring(s)}return f}function s_c2fa(f){var s=f.indexOf('(')+1,e=
f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')
a+='","';else if(("\n\r\t ").indexOf(c)<0)a+=c;s++}return a?'"'+a+'"':
a}function s_c2f(cc){cc=''+cc;var fc='var f=new Function(',s=
cc.indexOf(';',cc.indexOf('{')),e=cc.lastIndexOf('}'),o,a,d,q,c,f,h,x
fc+=s_c2fa(cc)+',"var s=new Object;';c=cc.substring(s+1,e);s=
c.indexOf('function');while(s>=0){d=1;q='';x=0;f=c.substring(s);a=
s_c2fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(
q){if(h==q&&!x)q='';if(h=='\\')x=x?0:1;else x=0}else{if(h=='"'||h=="'"
)q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)
+'new Function('+(a?a+',':'')+'"'+s_c2fe(c.substring(o+1,e))+'")'
+c.substring(e+1);s=c.indexOf('function')}fc+=s_c2fe(c)+';return s");'
eval(fc);return f}function s_gi(un,pg,ss){var c="function s_c(un,pg,s"
+"s){var s=this;s.wd=window;if(!s.wd.s_c_in){s.wd.s_c_il=new Array;s."
+"wd.s_c_in=0;}s._il=s.wd.s_c_il;s._in=s.wd.s_c_in;s._il[s._in]=s;s.w"
+"d.s_c_in++;s.m=function(m){return (''+m).indexOf('{')<0};s.fl=funct"
+"ion(x,l){return x?(''+x).substring(0,l):x};s.co=function(o){if(!o)r"
+"eturn o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.i"
+"ndexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for"
+"(var p=0;p<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1"
+"))<0)return 0;return 1};s.rep=function(x,o,n){var i=x.indexOf(o),l="
+"n.length>0?n.length:1;while(x&&i>=0){x=x.substring(0,i)+n+x.substri"
+"ng(i+o.length);i=x.indexOf(o,i+l)}return x};s.ape=function(x){var s"
+"=this,i;x=x?s.rep(escape(''+x),'+','%2B'):x;if(x&&s.charSet&&s.em=="
+"1&&x.indexOf('%u')<0&&x.indexOf('%U')<0){i=x.indexOf('%');while(i>="
+"0){i++;if(('89ABCDEFabcdef').indexOf(x.substring(i,i+1))>=0)return "
+"x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}return x}"
+";s.epa=function(x){var s=this;return x?unescape(s.rep(''+x,'+',' ')"
+"):x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.ind"
+"exOf(d);y=y<0?t.length:y;t=t.substring(0,y);r=s.m(f)?s[f](t,a):f(t,"
+"a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.leng"
+"th?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0"
+")a=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);retu"
+"rn (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf"
+"',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var s"
+"=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.c_d='';s.c_gdf=f"
+"unction(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=func"
+"tion(){var s=this,d=s.wd.location.hostname,n=s.cookieDomainPeriods,"
+"p;if(d&&!s.c_d){n=n?parseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');wh"
+"ile(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','"
+"c_gdf',0)?d.substring(p):''}return s.c_d};s.c_r=function(k){var s=t"
+"his;k=s.ape(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:"
+"c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.leng"
+"th:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s"
+".c_gd(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if("
+"e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=n"
+"ew Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cooki"
+"e=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expir"
+"es='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k"
+")==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s._in"
+",n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n"
+"<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l"
+"[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if(x.b){x."
+"o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r;"
+"if(s.isie&&a.apv>=5)eval('try{r=s.m(f)?s[f](a):f(a)}catch(e){r=s.m("
+"t)?s[t](e):t(e)}');else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s.m("
+"b)?s[b](a):b(a);else{s.eh(s.wd,'onerror',0,o);r=s.m(f)?s[f](a):f(a)"
+";s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;"
+"return s.tfs};s.gtfsoe=new Function('e','var s=s_c_il['+s._in+'];s."
+"eh(window,\"onerror\",1);s.etfs=1;var c=s.t();if(c)s.d.write(c);s.e"
+"tfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=fun"
+"ction(w){var s=this,p=w.parent,l=w.location;s.tfs=w;if(p&&p.locatio"
+"n!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return"
+" s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.et"
+"fs)s.tfs=s.cet('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.t"
+"fs};s.ca=function(){var s=this,imn='s_i_'+s.fun;if(s.d.images&&s.ap"
+"v>=3&&!s.isopera&&(s.ns6<0||s.apv>=6.1)){s.ios=1;if(!s.d.images[imn"
+"]&&(!s.isns||(s.apv<4||s.apv>=5))){s.d.write('<im'+'g name=\"'+imn+"
+"'\" height=1 width=1 border=0 alt=\"\">');if(!s.d.images[imn])s.ios"
+"=0}}};s.mr=function(sess,q,ta){var s=this,ns=s.visitorNamespace,unc"
+"=s.rep(s.fun,'_','-'),imn='s_i_'+s.fun,im,b,e,rs='http'+(s.ssl?'s':"
+"'')+'://'+(ns?ns:(s.ssl?'102':unc))+'.122.2O7.net/b/ss/'+s.un+'/1/H"
+".1-pdv-2/'+sess+'?[AQB]&ndh=1'+(q?q:'')+(s.q?s.q:'')+'&[AQE]';if(s."
+"isie&&!s.ismac){if(s.apv>5.5)rs=s.fl(rs,4095);else rs=s.fl(rs,2047)"
+"}if(s.ios){im=s.wd[imn]?s.wd[imn]:s.d.images[imn];if(!im)im=s.wd[im"
+"n]=new Image;im.src=rs;if(rs.indexOf('&pe=')>=0&&(!ta||ta=='_self'|"
+"|ta=='_top'||(s.wd.name&&ta==s.wd.name))){b=e=new Date;while(e.getT"
+"ime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c="
+"\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg=function(v){v"
+"ar s=this;return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0"
+",2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=f"
+"unction(v){var s=this;s.pt(v,',','glf',0)};s.gv=function(v){var s=t"
+"his;return s['vpm_'+v]?s['vpv_'+v]:s[v]};s.havf=function(t,a){var s"
+"=this,b=t.substring(0,4),x=t.substring(4),n=parseInt(x),k='g_'+t,m="
+"'vpm_'+t,q=t,v=s.linkTrackVars,e=s.linkTrackEvents;s[k]=s.gv(t);if("
+"s.lnk||s.eo){v=v?v+','+s.vl_l:'';if(v&&!s.pt(v,',','isf',t))s[k]=''"
+";if(t=='events'&&e)s[k]=s.fs(s[k],e)}s[m]=0;if(t=='pageURL')q='g';e"
+"lse if(t=='referrer')q='r';else if(t=='charSet'){q='ce';if(s[k]&&s."
+"em==2)s[k]='UTF-8'}else if(t=='visitorNamespace')q='ns';else if(t=="
+"'cookieDomainPeriods')q='cdp';else if(t=='cookieLifetime')q='cl';el"
+"se if(t=='visitVariableProvider')q='vvp';else if(t=='currencyCode')"
+"q='cc';else if(t=='channel')q='ch';else if(t=='campaign')q='v0';els"
+"e if(s.num(x)) {if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else"
+" if(b=='hier'){q='h'+n;s[k]=s.fl(s[k],255)}}if(s[k]&&t!='linkName'&"
+"&t!='linkType')s.qav+='&'+q+'='+s.ape(s[k]);return ''};s.hav=functi"
+"on(){var s=this;s.qav='';s.pt(s.vl_t,',','havf',0);return s.qav};s."
+"lnf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var"
+" te=t.indexOf('=');if(t&&te>0&&h.indexOf(t.substring(te+1))>=0)retu"
+"rn t.substring(0,te);return ''};s.ln=function(h){var s=this,n=s.lin"
+"kNames;if(n)return s.pt(n,',','lnf',h);return ''};s.ltdf=function(t"
+",h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';var qi=h.indexOf("
+"'?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.leng"
+"th+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLower"
+"Case():'';h=h?h.toLowerCase():'';if(t&&h.indexOf(t)>=0)return 1;ret"
+"urn 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef="
+"s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.lo"
+"cation.hostname;h=h.toLowerCase();if(s.trackDownloadLinks&&lft&&s.p"
+"t(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&(lef||lif)&"
+"&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))re"
+"turn 'e';return ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],"
+"b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return"
+" this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._"
+"in+'];if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e"
+".srcElement:e.target;s.t();s.eo=0');s.ot=function(o){var a=o.type,b"
+"=o.tagName;return (a&&a.toUpperCase?a:b&&b.toUpperCase?b:o.href?'A'"
+":'').toUpperCase()};s.oid=function(o){var s=this,t=s.ot(o),p=o.prot"
+"ocol,c=o.onclick,n='',x=0;if(!o.s_oid){if(o.href&&(t=='A'||t=='AREA"
+"')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=o.href;else"
+" if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t"
+"\",''),' ','');x=2}else if(o.value&&(t=='INPUT'||t=='SUBMIT')){n=o."
+"value;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,10"
+"0);o.s_oidt=x}}return o.s_oid};s.rqf=function(t,un){var s=this,e=t."
+"indexOf('='),u=e>=0?','+t.substring(0,e)+',':'';return u&&u.indexOf"
+"(','+un+',')>=0?s.epa(t.substring(e+1)):''};s.rq=function(un){var s"
+"=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'"
+"&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=function(t,a){var s="
+"this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';"
+"if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function"
+"(un,q){var s=this;s.squ[un]=q;return 0};s.sq=function(q){var s=this"
+",k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq["
+"q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.sq"
+"u)s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&"
+"s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}retu"
+"rn s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r="
+"true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d"
+".links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick:\"\";"
+"if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf"
+"(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function("
+"){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){if(s.b&&s.b"
+".attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEv"
+"entListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd"
+",'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s.visitorSamplin"
+"g,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),"
+"e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=1"
+"00;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%10000>v)return 0}retur"
+"n 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;retur"
+"n 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if("
+"i>=0&&m){var n=t.substring(0,i),x=t.substring(i+1);if(s.pt(x,',','d"
+"yasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynami"
+"cAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,"
+"i;s.un.toLowerCase();if(x&&l){if(!m)m=s.wd.location.host;if(!m.toLo"
+"werCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dy"
+"asf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substri"
+"ng(0,i)};s.t=function(){var s=this,trk=1,tm=new Date,sed=Math&&Math"
+".random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess="
+"'s'+Math.floor(tm.getTime()/10800000)%10+sed,yr=tm.getYear(),vt=tm."
+"getDate()+'/'+tm.getMonth()+'/'+(yr<1900?yr+1900:yr)+' '+tm.getHour"
+"s()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm."
+"getTimezoneOffset(),tfs=s.gtfs(),ta='',q='',qs='';s.uns();if(!s.q){"
+"var tl=tfs.location,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w"
+"('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(s.apv>=4)x=screen."
+"width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){j='1.1';"
+"v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){j='1.2';c=screen.pixelDept"
+"h;bw=s.wd.innerWidth;bh=s.wd.innerHeight;if(s.apv>=4.06)j='1.3'}}s."
+"pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y'"
+":'N';j='1.2';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElemen"
+"t.offsetWidth;bh=s.d.documentElement.offsetHeight;j='1.3';if(!s.ism"
+"ac&&s.b){s.b.addBehavior('#default#homePage');hp=s.b.isHomePage(tl)"
+"?\"Y\":\"N\";s.b.addBehavior('#default#clientCaps');ct=s.b.connecti"
+"onType}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.p"
+"l[pn].name,100)+';';if(p.indexOf(ps)<0)p+=ps;pn++}s.q=(x?'&s='+s.ap"
+"e(x):'')+(c?'&c='+s.ape(c):'')+(j?'&j='+j:'')+(v?'&v='+v:'')+(k?'&k"
+"='+k:'')+(bw?'&bw='+bw:'')+(bh?'&bh='+bh:'')+(ct?'&ct='+s.ape(ct):'"
+"')+(hp?'&hp='+hp:'')+(p?'&p='+s.ape(p):'')}if(s.usePlugins)s.doPlug"
+"ins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s."
+"pageURL=s.fl(l?l:'',255);if(!s.referrer)s.referrer=s.fl(r?r:'',255)"
+";if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk;if(!o)return '';var p=s.gv('"
+"pageName'),w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o="
+"=s.eo){while(o&&!n&&t!='BODY'){o=o.parentElement?o.parentElement:o."
+"parentNode;if(!o)return '';t=s.ot(o);n=s.oid(o);x=o.s_oidt}oc=o.onc"
+"lick?''+o.onclick:'';if((oc.indexOf(\"s_gs(\")>=0&&oc.indexOf(\".s_"
+"oc(\")<0)||oc.indexOf(\".tl(\")>=0)return ''}ta=o.target;h=o.href?o"
+".href:'';i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substri"
+"ng(0,i);l=s.linkName?s.linkName:s.ln(h);t=s.linkType?s.linkType.toL"
+"owerCase():s.lt(h);if(t&&(h||l))q+='&pe=lnk_'+(t=='d'||t=='e'?s.ape"
+"(t):'o')+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');else trk"
+"=0;if(s.trackInlineStats){if(!p){p=s.gv('pageURL');w=0}t=s.ot(o);i="
+"o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');x=1;i=1}if(p&"
+"&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape"
+"(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}if"
+"(!trk&&!qs)return '';var code='';if(trk&&s.vs(sed))code=s.mr(sess,("
+"vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq(s.un)),ta);s.sq(trk?''"
+":qs);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID='';return cod"
+"e};s.tl=function(o,t,n){var s=this;s.lnk=s.co(o);s.linkType=t;s.lin"
+"kName=n;s.t()};s.ssl=(s.wd.location.protocol.toLowerCase().indexOf("
+"'https')>=0);s.d=document;s.b=s.d.body;s.n=navigator;s.u=s.n.userAg"
+"ent;s.ns6=s.u.indexOf('Netscape6/');var apn=s.n.appName,v=s.n.appVe"
+"rsion,ie=v.indexOf('MSIE '),i;if(v.indexOf('Opera')>=0||s.u.indexOf"
+"('Opera')>=0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer'"
+");s.isns=(apn=='Netscape');s.isopera=(apn=='Opera');s.ismac=(s.u.in"
+"dexOf('Mac')>=0);if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s."
+"apv>3)s.apv=parseFloat(i)}else if(s.ns6>0)s.apv=parseFloat(s.u.subs"
+"tring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(String.fromChar"
+"Code){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C"
+"4%80'?2:(i=='%U0100'?1:0))}s.un=un;s.uns();s.vl_l='charSet,visitorN"
+"amespace,cookieDomainPeriods,cookieLifetime,visitVariableProvider,p"
+"ageName,pageURL,referrer,currencyCode,purchaseID';s.vl_t=s.vl_l+',c"
+"hannel,server,pageType,campaign,state,zip,events,products,linkName,"
+"linkType';for(var n=1;n<51;n++)s.vl_t+=',prop'+n+',eVar'+n+',hier'+"
+"n;s.vl_g=s.vl_t+',trackDownloadLinks,trackExternalLinks,trackInline"
+"Stats,linkLeaveQueryString,linkDownloadFileTypes,linkExternalFilter"
+"s,linkInternalFilters,linkNames';if(pg)s.gl(s.vl_g);if(!ss){s.wds()"
+";s.ca()}}",
l=window.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf(
'MSIE '),m=u.indexOf('Netscape6/'),a,i,s;if(l)for(i=0;i<l.length;i++){
s=l[i];s.uns();if(s.un==un)return s;else if(s.pt(s.un,',','isf',un)){
s=s.co(s);s.un=un;s.uns();return s}}if(e>0){a=parseInt(i=v.substring(e
+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10)
);else a=parseFloat(v);if(a>=5&&v.indexOf('Opera')<0&&u.indexOf(
'Opera')<0){eval(c);return null}

s.detectFlash=new Function("cn",""
+"var s=this,fv=-1,dwi=0,r,w,mt=s.n.mimeTypes;if(cn&&s.c_r(cn))return"
+" s.c_r(cn);if(s.pl&&s.pl.length){if(s.pl['Shockwave Flash 2.0'])fv="
+"2;x=s.pl['Shockwave Flash'];if(x){fv=0;z=x.description;if(z)fv=z.su"
+"bstring(16,z.indexOf('.'));}}else if(mt&&mt.length){x=mt['applicati"
+"on/x-shockwave-flash'];if(x&&x.enabledPlugin)fv=0;}if(fv<=0)dwi=1;w"
+"=s.u.indexOf('Win')!=-1?1:0;if(dwi&&s.isie&&w&&execScript){result=f"
+"alse;for(var i=s.maxFlashVersion;i>=3&&result!=true;i--){execScript"
+"('on error resume next: result = IsObject(CreateObject(\"ShockwaveF"
+"lash.ShockwaveFlash.'+i+'\"))','VBScript');fv=i;}}r=fv==-1?'flash n"
+"ot detected':fv==0?'flash enabled (no version)':'flash '+fv;s.c_w(c"
+"n,r,0);return r;");


Element.extend({
	
	addClassRecursive: function(className, i) {
		if(i<1 || this.getTag()=='body')
			return;
		try{
			this.addClass(className);
			this.getParent().addClassRecursive(className, i-1);
		}catch(e){}
	},
	  
	removeClassRecursive: function(className, i) {
		if(i<1 || this.getTag()=='body')
			return;
		try{
			this.removeClass(className);
			this.getParent().removeClassRecursive(className, i-1);
		}catch(e){}
	},
	
	fadeMessage:function(msg,className){
		this.setStyle('visibility','hidden');
		this.setHTML(msg);
		this.className = "";
		if(msg != ''){
			if(typeof className == 'string') this.addClass(className);
			else if(typeof className == 'object'){
				className.each(function(e){this.addClass(e);}, this);
			}
			var myFx = new Fx.Style(this, 'opacity').start(0,1);
		}
	},
	
	toHash: function(){
		var hash = new Hash();
		this.getFormElements().each(function(el){
			var _name = el.name;
			var value = el.getValue();
			if (value === false || !_name || el.disabled) return;
			var qs = function(val){
				hash.set(_name, val);
			};
			if ($type(value) == 'array') value.each(qs);
			else qs(value);
		});
		return hash.obj;
	},
	
	findUpstream: function(selector) {
		var d = $(this);
		var match = $E(selector, d);
		while(!match && d.getTag()!='body') {
			d = d.getParent();
			match = $E(selector, d);
		}

		return match;
	},
	
	center: function(containerID){
		cWidth = !$defined(containerID) ? window.getWidth() : $(containerID).getCoordinates().width;
		var top = Math.round((window.getHeight() - this.getCoordinates().height - this.getSizeOffset('height')) / 2  + window.getSize().scroll.y);
		var left = Math.round((cWidth/2)-(this.getCoordinates().width/2));
		this.setStyles({
			'top':top+'px',
			'left':left+'px'
		});
		return this;
	},
	
	getSizeOffset: function(offset){
		var size = 0;
		if(offset == 'width')
			size = this.getStyle('padding-left').toInt() + this.getStyle('padding-right').toInt() + (this.getStyle('border').toInt() * 2);
		if(offset == 'height')
			size = this.getStyle('padding-top').toInt() + this.getStyle('padding-bottom').toInt() + (this.getStyle('border').toInt() * 2);
		return size;
	}
});



Hash.implement({
	
	buildCombo : function(combo) {
		var comboObj = $(combo);
		$ES('option',combo).each(function(el){
			el.remove();
		});
		this.each(function(i, index){
			var o = new Element('option',{
				'value':i.value
			}).setHTML(i.text).injectInside(comboObj);
			if(i.selected)
				comboObj.selectedIndex = index;
		}, this);
	}
});


String.extend({
	
	shorten : function(len) {
		if(this.length>len-3)
			return this.substring(0, len-3) + "...";
		else return this;
	},
	isURL : function() {
				var regexp = /((https{0,1}:\/\/\w+\.[^\s]+))|(www\.[^.][^\s]*)/;
		return regexp.test(this);
	},
	
	isNormal: function() {
		return this.test(/^[a-zA-Z0-9\-_\.]+$/);
	}
});


Array.extend({
	
	subtract: function(ar) {
		if((ar==null) || (ar==false))
			return this;
		ar.each(function(value){
			this.remove(value)
		}.bind(this));
		return this;
	}
});

AjaxIndicator = Ajax.extend({
	options: {
		offsets:    {'x': 10, 'y': 8}
	},
	initialize: function(url, options) {
		this.setOptions(options);
		this.parent(url, options);
		this.indicator = null;
		if(typeof headerObj != 'undefined' && $('AjaxProg')){
			this.indicator = $('AjaxProg');
			this.options.imagePath = headerObj.cdnImages + this.options.imagePath;
			this.parent();
		} else {
			this.parent();
		}
	},
	indicatorOff: function() {
		document.removeEvents('mousemove');
		if(this.indicator != null)
			this.indicator.addClass('Hidden');
	},
	onComplete: function() {
		this.indicatorOff();
		this.parent();
	},
	onFailure: function() {
		this.indicatorOff();
		this.parent();
	},
	cancel: function() {
		this.indicatorOff();
		this.parent();
	},
	request: function() {
		if(this.indicator != null){
			document.addEvent('mousemove', this.move.bind(this));
			this.indicator.removeClass('Hidden');
		}
		this.parent();
	},
	move: function(event) {
		var event = new Event(event);

		if ((event.client.y > window.getHeight() - this.options.offsets.y - 20) || (event.client.x > window.getWidth() - this.options.offsets.x - 20)) {
			this.posX = event.page.x - this.options.offsets.x - 20;
			this.posY = event.page.y - this.options.offsets.y;

			this.indicator.setStyles({
				'left' : this.posX,
				'top'  : this.posY
			});
		} else {
			this.posX = event.page.x + this.options.offsets.x;
			this.posY = event.page.y + this.options.offsets.y;

			this.indicator.setStyles({
				'left' : this.posX,
				'top'  : this.posY
			});
		}
	}
});
Ajax = AjaxIndicator;

var AjaxKeepAlive = new Class ({
    initialize: function() {
        this.keepAliveAjax = null;
    	this.sendKeepAlive.periodical(600000);
    },
    sendKeepAlive: function() {
        if(this.keepAliveAjax) this.keepAliveAjax.cancel();
        this.keepAliveAjax = new Ajax("/index.php?inputType=keepAlive");
        this.keepAliveAjax.request();
    },
    onComplete: function() {
        this.keepAliveAjax = null;
    }
});


var OmnitureMC = new Class ({
	initialize: function(props, clickReports){
		this.props = props;
		this.clickReports = new Hash(clickReports);
		this.reportedElements = null;
		window.document.addEvent('click', this.documentClick.bindWithEvent(this));
		},
	documentClick: function(event) {
		for (var el = new Element(event.target); el && el != document.body && el.nodeName != '#document'; el = el.getParent()) {
			if($defined(el.hasClass)) {
				if (el.hasClass('report')) {
					this.saveClickReport(event, el);
					break;
				}
			}
		}
	},
	hookClickReports: function() {
	},
	 
	saveClickReport: function(event, target){
					var clickReport = null;
			target.className.split(' ').each(function(val) {
				var t = this.clickReports.get(val);
				if(t!=null)
					clickReport = t;
			}.bind(this));
			clickReport = clickReport || this.clickReports.get(target.getProperty('id'));
			this.saveCookie(clickReport, event, target);
			kpi.setRndtrpCookie();
	},
	saveCookie: function(clickReport, event, target) {
							var hashCookie = new Hash.Cookie("Omniture", {domain: headerObj.cookieDomain, path: '/', duration: 100}); // save cookie for 100 days
			if(clickReport) {
				new Hash(clickReport).each(function(val, key) {
					var oldVal = hashCookie.get(key);
					if(key=='events' && oldVal){
						if(!oldVal.test(val)) // EventsXX are reported once
							hashCookie.set(key, oldVal + ',' +val); // Concatenate events
					}
					else
						hashCookie.set(key, val);
				}.bind(this));
			} else { // In this case - event & target MUST be defined
							var elementText = event.target.innerHTML.replace(/(<([^>]+)>)/ig,"") || event.target.getProperty('id');
				hashCookie.set('prop23', elementText);
			}
	},
	setModel : function(model) {
		if(model!=undefined) {
			this.model = model;
						}
	},
	onPlay : function() {
		var props = {'prop32' : this.model.selectedItem.itemID + ' ' + this.model.selectedItem.title};
		this.report(props, 'Item');
	},
	report: function(propsSent, section) {
		if(omnitureEnv==undefined)
			return; // This is an error and should not happend!
		var props = propsSent; // MERGE with page props CANCELED since it sends double page view reports: new Hash(this.props).merge(propsSent).obj;
		var s2 = s_gi(omnitureEnv); // omnitureEnv=global
		s2.linkTrackVars='';
		for(prop in props) {
			s2[prop] = props[prop];
			s2.linkTrackVars += (s2.linkTrackVars.length ? ',' : '') + prop;
		}
		s2.linkTrackEvents=s2.events; // strange requirement for omniture
		s2.tl(this,'o',section);
	}
});
  
function getOmnitureIntervalTime(sec){
	if (sec < 3) return "<3";
	else if (sec < 5) return "3-5";
	else if (sec < 8) return "5-8";
	else if (sec < 11) return "8-11";
	else if (sec < 15) return "11-15";
	else if (sec < 20) return "15-20";
	else if (sec < 25) return "20-25";
	else return ">25";
}

function setClickTime(){
	var dateObj = new Date();
	var startTime = dateObj.getTime();
	setRealCookie('clickTime', startTime, getExpDate(0, 0, 10), "/", ".metacafe.com");
}

function goToCatalogPage(url){
	top.location.href = url;
	setClickTime();
}

function goToURL(strURL) {
	if (window.ie) {
		var aLink = new Element('a', {
		    'styles': {
		        'display': 'none'
		    },
		    'href': strURL
		});
		aLink.injectInside($E('body'));
		aLink.click();
	} else {
		window.location = strURL;
	}
}

var MainReportItems = false;
var ReportItems = new Class({
	initialize: function() {
			if(typeof ReportItemsID == 'undefined' || ReportItemsID == 0)
			return;
	
		this.reportID = ReportItemsID; 
			$$('.Items').each(function(catalogContainer) {
			$ES('li', catalogContainer).addEvent('click', this.onClick.bindWithEvent(this));
		}.bind(this));
	},
	initAjax: function(catalog){
		},
	onClick: function(event) {
		for(var el = event.target; el.nodeName !='LI' && el!=document.body; el = el.parentNode);
			if(el==document.body) return;

		var thumb = $E('.ItemThumb', el);

			for(var catalog = el; !catalog.hasClass('Items') && catalog!=document.body; catalog = catalog.getParent());
			if(catalog==document.body) return;
	
			var indexOf = $ES('.ItemThumb', catalog).indexOf(thumb);
			if(indexOf==-1) return

	        // setRealCookie('itemReport', spotID + "__" + reportID, getExpDate(0, 0, 10), '/', '.metacafe.com');
	
		var i = catalog.getProperty('id');
		if(!i)
			return;
		else
			id = i.match(/([0-9]+)/gi)[0];
        var spotID = id.toInt()*100 + indexOf.toInt();
		Cookie.set('itemReport', spotID + "__" + this.reportID, {domain: headerObj.cookieDomain, path: "/"})

		}
});
var searchObj = new Class({
	initialize:function(formId){
		if($(formId)){
			this.serverUrl = headerObj.absoluteServer ? headerObj.absoluteServer : 'http://www.metacafe.com/';
			this.formID = formId;
			this.form = $(this.formID);
			this.form.setProperty('target','_top');
			this.form.addEvent('submit',this.doSearch.bind(this));
		}
	},
	doSearch:function(e){
		new Event(e).preventDefault();
		var qs = $E('input[type="text"]',this.formID).value;
		var filter = $E('select',this.formID) ? $E('select',this.formID).value : '';
		if (qs.length == 0) {
			var url = this.serverUrl + (filter == 'channels' ? 'channels/' : (filter == 'videos' ? 'top_videos/' : 'top_videos/' + filter + '/'));
		} else {
			switch (filter) {
				case 'channels':
					var url = this.serverUrl + 'channels/search/';
					break;
				case 'videos':
					var url = this.serverUrl + 'tags/';
					break;
				default:
					var url = this.serverUrl + 'tags/'+(filter == '' ? '' : filter+'/');
					break;
			}			
			url += filter == 'channels' ? encodeURI(qs) + '/' : this.createSearchString(qs) + '/';
		}
		setClickTime(); //from combined.js
				setRealCookie('searchFromSite', 1, getExpDate(0, 0, 10), "/", ".metacafe.com");
		iOmnitureMC.report({'prop4': 'Search '+qs});
		this.search(url);
	},
	search: function(url){
		self.location.href = url;
	},
	createSearchString:function(searchText){
		var string = new String('');
		var strLen = searchText.length;
		var field = "[A-Za-z0-9~]";
		var lastchar = false;
		for (var ii = 0; ii < strLen; ii++){
			if (searchText.charCodeAt(ii) > 192){
				string += searchText.charAt(ii);
				lastchar = true;
			}
			else{
				var tmpStr = new String(searchText.charAt(ii));
				if (tmpStr.match(field)){
					string += tmpStr.toLowerCase();
					lastchar = true;
				}
				else{
					if ((ii < strLen-1) && lastchar){
						string += "_";
						lastchar = false;
					}
				}
			}
		}
		return string;
	}
});
var FormFocusHighlight = new Class({
	initialize:function(form){
		this.form = form;
		this.fields = $ES('input',this.form);
		this.fields.push($ES('select',this.form));
		this.fields.push($ES('textarea',this.form));
		this.bindEvents();
	},
	bindEvents:function(){
		this.fields.addEvent('click',this.focusField.bind(this));
		this.fields.addEvent('focus',this.focusField.bind(this));
		this.fields.addEvent('blur',this.blurField.bind(this));
	},
	focusField: function(e){
		var ev = new Event(e);
		var el = new Element(ev.target);
		try{
			for(var parent = el; !parent.hasClass('FormRow') && parent != document.body ;parent = parent.getParent());
			$ES('.Focused').removeClass('Focused');
			parent.addClass('Focused');
		}catch(e){}
	},
	blurField: function(e){
		var ev = new Event(e);
		var el = new Element(ev.target);
		try{
			for(var parent = el; !parent.hasClass('FormRow') && parent != document.body ;parent = parent.getParent());
			parent.removeClass('Focused');
		}catch(e){}
	}
});

var ItemCatalog2 = new Class ({
	initialize: function(objID) {
		this.hashCookie = new Hash.Cookie('User', {domain: headerObj.cookieDomain, path: '/', duration: 362});
			if(document.location.toString().test('/watch/')){ //ItemPage
			this.itemPage = true;
		} else {
			this.itemPage = false;
			this.hashCookie.set('LastCatalogReference', '' );
		}
		this.objID = objID;
		this.obj = $(this.objID);
		if(this.obj)
			this.obj.addEvent('click', this.onItemClick.bindWithEvent(this));
	},
	onItemClick: function(event) {
		var foundAnchor = false;
		var foundSend2Mobile = false;
		for(var el=new Element(event.target); el.getTag()!='body'; el=el.getParent()) {
			if(el.getTag()=='a' && (el.getProperty('href').test('/watch/') ) ) {
				foundAnchor=true;
				break;			
			}
			if(el.hasClass('Send2Mobile'))
				foundSend2Mobile = true;
		}
		if(foundAnchor && this.objID.match(/\d.?/) && !this.itemPage) {
			this.hashCookie.set('LastCatalogReference', this.objID.match(/\d.?/)[0] );
			if(foundSend2Mobile) {
				Cookie.set('s2m', '1',{domain: headerObj.cookieDomain, path:'/'});
			}
		}
	
	}
});

var PanelMgr = new Class({
 	initialize:function(){
			$ES('.Scrl').addEvent('scroll',this.loadThumbs.bindWithEvent(this));
			this.hashCookie = new Hash.Cookie('Panels', {domain: headerObj.cookieDomain, path: '/', duration: 362});
	},
	togglePanel:function(h3){
		for(el = h3; !el.hasClass('Panel'); el = el.getParent());//get the panel the user clicked on
		el.toggleClass('Closed');
		this.reportPanelState(el,el.hasClass('Closed') ? 0 : 1);
	},
	reportPanelState:function(panel,state){
		if(el.getProperty('id'))
			this.hashCookie.set(el.getProperty('id'),state);
	},
	loadThumbs: function(ev){
		var panel = ev.target;
		if(panel.hasClass('Loaded'))
			return;
		$ES('img',panel).each(function(el){
			if(el.getProperty('title')){
				el.src = el.getProperty('title');
				el.removeProperty('title');
			}
			
		});
		panel.addClass('Loaded');
	}
});
function setFamilyFilter(statusID, reloadWindow){
	Cookie.set("familyFilter", statusID, {domain: headerObj.cookieDomain, path: "/"});
	setCookie("filters", statusID, reloadWindow);
}
function search(searchType, serverURL){
	if (searchType == 'footer'){
		var category = getElement("categotiesSearchFooter");
	}
	else{
		var category = getElement("slCategoryFilter");
	}
	var URL = serverURL == undefined ? "/" : serverURL;

	if (category) URL += 'tags/' + (category.value.length > 1 ? category.value + '/' : '') + (searchType == 'footer' ? createSearchString('FooterSearchInput') : createSearchString('HeaderSearchInput')) + '/';
	else URL += 'tags/' + (searchType == 'footer' ? createSearchString('FooterSearchInput') : createSearchString('HeaderSearchInput')) + '/';

	window.setTimeout(function(){
	setClickTime();
	setRealCookie('searchFromSite', 1, getExpDate(0, 0, 10), "/", ".metacafe.com");
	top.location.href = URL;
	return false;
				},200);
}

function createSearchString(searchInput){
	var searchText = getElement(searchInput).value;
	var nrmlStr = normalizeSearchString(searchText);
	return nrmlStr;
}

function normalizeSearchString(searchText){
	var string = new String('');
	var strLen = searchText.length;
	var field = "[A-Za-z0-9~]";
	var lastchar = false;
	for (var ii = 0; ii < strLen; ii++){
		if (searchText.charCodeAt(ii) > 192){
			string += searchText.charAt(ii);
			lastchar = true;
		}
		else{
			var tmpStr = new String(searchText.charAt(ii));
			if (tmpStr.match(field)){
				string += tmpStr.toLowerCase();
				lastchar = true;
			}
			else{
				if ((ii < strLen-1) && lastchar){
					string += "_";
					lastchar = false;
				}
			}
		}
	}
	return string;
}
function initMoreText() {
	$ES('.moreToggler').removeEvents().addEvent('click', function(e) {
		new Event(e).preventDefault();
		this.getParent().addClass('invisible');
		this.findUpstream('.moreText', this).removeClass('invisible');
	});
	$ES('.lessToggler').removeEvents().addEvent('click', function(e) {
		new Event(e).preventDefault();
		this.findUpstream('.moreText', this).addClass('invisible');
		this.findUpstream('.moreTogglerWrapper').removeClass('invisible');
	});
}

function initWindowOpen(){
	return;///just stub for backward compatibility. to be removed when migration to new design happens
}

var uuID;
function fpSetUUID(val){
	if(uuID == undefined && val.length > 0){
		uuID = val;
		var jsonCookie = new Hash.Cookie('User', {domain: headerObj.cookieDomain, path: '/', duration: 362});
		jsonCookie.set('uuID', val );
	}
	kpi.onUUID();
}

function initUUID() {
	if($('uuGenContainer')){ // if there is no uuGenContainer (like in the studio) don't render
		var so = new SWFObject(headerObj.uuIDFlashFileURL, "uuGenFlashObj", "1", "1", "8");
		so.addParam("wmode", "transparent");
		so.addParam("AllowScriptAccess", "always");
			so.write("uuGenContainer");
	}
}
// Utility function: receives SelectBox object and changes matching 'value' to be seleceted
function selectByValue(obj, val) {
	for(var n=obj.options.length-1; n>=0; n--) {
		if(obj.options[n].value==val) {
			obj.options[n].selected=true;
			return obj;
		}
	}
	return obj;
}

function removeElement(id){
	if($(id))
	$(id).remove();
}


var FaderOverlay = new Class({
	initialize:function(params){
		this.visible = false;
		this.targetId = params.targetId; 
		this.openerId = params.openerId;
		this.closerId = params.closerId != undefined ? params.closerId : params.targetId;
		this.fadeAmount = params.fadeAmount != undefined ? params.fadeAmount / 100 : 0.5;
		this.animate = params.animate != undefined ? params.animate : false;
		this.initialState = params.initialState != undefined ? params.initialState : false;
		this.isIE6 = navigator.userAgent.indexOf('MSIE 6') != -1 ? true : false;

		if (params.hasBackground != null)// reubenh
			this.hasBackground = params.hasBackground;
		else
			this.hasBackground = true;// /reubenh

		if($(this.targetId)){
			if(!$('fadeOverlay')){
				this.fadeOverlay = new Element('div',{
					'id':'fadeOverlay',
					'styles':{
						'position':'absolute',
						'top':'0px',
						'left':'0px',
						'background':'#000',
						'display':'block',
						'visibility':'hidden',
						'z-index':'999998'
					}
				}).injectInside($E('body'));
				if(navigator.userAgent.indexOf('Firefox') != -1 && navigator.userAgent.indexOf('Mac') != -1){
					this.fadeOverlay.setStyles({
						'background':'none',
						'background-image':'url(/Images/FaderOverlayBG.png)'
					});
				} else {
					this.fadeOverlay.setOpacity(this.fadeAmount)
				}
				if(!this.hasBackground)// reubenh
				{
					this.fadeOverlay.setOpacity(0);
				}// /reubenh
			} else this.fadeOverlay = $('fadeOverlay');
			$(this.targetId).setStyles({
				'position':'absolute',
				'top':'0px',
				'left':'0px',
				'display':'block',
				'visibility':'hidden',
				'z-index':'999999'
			}).injectAfter(this.fadeOverlay);
			this.targetElementSize = $(this.targetId).getCoordinates();

			if(this.animate){
				this.effects = new Fx.Elements([$(this.targetId),this.fadeOverlay],{
					duration: 500,
					transition: Fx.Transitions.Sine.easeInOut,
					onStart:this.onEffectStart.bind(this),
					onComplete:this.onEffectEnd.bind(this)
				});
				this.openerCoords = $(this.openerId).getCoordinates();
			}
			window.addEvent('resize',this.centerOnOverlay.bind(this));
					if(typeof this.closerId == 'string') $(this.closerId).addEvent('click',this.onFaderState.bindWithEvent(this,false));
			else if(typeof this.closerId == 'object'){
				this.closerId.each(function(id){
					$(id).addEvent('click',this.onFaderState.bindWithEvent(this,[false]));
				}.bind(this));
			}
			if(typeof this.openerId.each != 'function') $(this.openerId).addEvent('click',this.onFaderState.bindWithEvent(this,true));
			else if(typeof this.openerId.each == 'function'){
				this.openerId.each(function(id){
					$(id).addEvent('click',this.onFaderState.bindWithEvent(this,[true]));
				}.bind(this));
			}
			if(this.initialState == 'open'){
				this.togglePageFader(true,false);
			}
		} else{
							return false;
		}
	},
	getPageSize:function(){
			var windowSize = window.getSize();
		this.pageHeight = windowSize.scrollSize.y + $E('body').getStyle('margin-top').toInt();
		this.pageWidth = windowSize.size.x + $E('body').getStyle('margin-left').toInt();
		this.absPosLeft = Math.round((windowSize.size.x - this.targetElementSize.width) / 2);
		this.absPosTop = Math.round((windowSize.size.y - this.targetElementSize.height) / 2  + window.getSize().scroll.y);
		if(this.absPosTop < 0) this.absPosTop = 0;
		if($(this.openerId)) this.openerCoords = $(this.openerId).getCoordinates();
	},
	centerOnOverlay:function(e,overrideVisibility){
		if(this.visible || overrideVisibility){
			this.getPageSize();
			$(this.targetId).setStyles({
				top:this.absPosTop+'px',
				left:this.absPosLeft+'px'
			});
			this.fadeOverlay.setStyles({
				width:this.pageWidth+'px',
				height:this.pageHeight+35+'px'
			});
		}
	},
	onFaderState:function(e,state){
		(new Event(e)).preventDefault();
		this.togglePageFader(state,this.animate);
	},
	togglePageFader:function(state,animate){
		if(state){
			this.visible = true;
			this.centerOnOverlay();
			if(animate){
				this.animateTargetIn();
			} else {
				this.fadeOverlay.setStyles({'visibility':'visible','display':'block','z-index':'999998'});
				(function(){$(this.targetId).setStyles({'visibility':'visible','display':'block','z-index':'999999'})}.bind(this)).delay(100);
			}
			if(this.isIE6){
				$ES('select').setStyle('visibility','hidden');
				$ES('select',this.targetId).setStyle('visibility','visible');
			}
			$ES('iframe').setStyle('visibility','hidden');
		} else {
			this.visible = false;
			if(animate){
				this.animateTargetOut();
			} else{
				$(this.targetId).setStyles({'visibility':'hidden','display':'none'});
				(function(){
					this.fadeOverlay.setStyles({'visibility':'hidden','display':'none','z-index':'-1'})
				}.bind(this)).delay(100);
			}
			if(this.isIE6) $ES('select').setStyle('visibility','visible');
			$ES('iframe').setStyle('visibility','visible');
		}
	},
	onEffectStart:function(){
		if(this.visible){
			$(this.targetId).setStyles({
				'visibility':'visible',
				'width':'0px',
				'height':'0px',
				'overflow':'hidden'
			});
			this.fadeOverlay.setStyle('visibility','visible');
		} else {
			$(this.targetId).setStyle('overflow','hidden');
			this.fadeOverlay.setStyle('visibility','hidden');
		}
	},
	onEffectEnd:function(){
		if(!this.visible){
			$(this.targetId).setStyle('visibility','hidden');
		} else {
			$(this.targetId).setStyle('overflow','visible');
		}
	},
	animateTargetIn:function(){
		this.effects.start({
		    '0': { //let's change the first element's opacity and width
			'width': [0,this.targetElementSize.width],
			'height': [0,this.targetElementSize.height],
			'top':[this.openerCoords.top,this.absPosTop],
			'left':[this.openerCoords.left,this.absPosLeft]
		    }
		});
	},
	animateTargetOut:function(){
		this.effects.start({
		    '0': { //let's change the first element's opacity and width
			'width': [this.targetElementSize.width,0],
			'height': [this.targetElementSize.height,0],
			'top':[this.absPosTop,this.openerCoords.top],
			'left':[this.absPosLeft,this.openerCoords.left]
		    }
		});
	}
});
var KPI = new Class({
	initialize:function(){
		if( (typeof pwStartTime =='undefined') && (typeof startTime == 'undefined') ){
			return;
		}
		this.headerTime = ( typeof pwStartTime != 'undefined' ) ? pwStartTime : startTime;
		this.reported = false;
		this.combinedReports=new Array();
		this.params;

	
		this.prevReports = new Array();
		this.prevServerParams;
		this.prevServerParams;
	
	
		this.UUIDReady = false;
		this.windowLoadReady = false;
	
		this.addLostSessionReport();
		this.initPreviousReports();
	
		window.addEvent('load',this.onWindowLoad.bind(this));
		window.addEvent('error',this.onError.bind(this));
	
	},

	addSimpleReport: function(name){
		this.addReport({name: name,value: this.getTimeFromInit()});
	},

	addReport: function(report,force){
		if( (typeof force=='undefined') && (!this.isKPIReporting()) ){
			return true;
		}
		if(!this.reported){
			this.combinedReports[this.combinedReports.length]=report;
		}
		else{ // If we've already reported, keep reports in cookie, for the next page to report

			this.combinedReports.data[this.combinedReports.data.length]=report;
			Cookie.set('KPIPrevReports',Json.toString(this.combinedReports),{path:'/', duration: 0, domain: document.domain});
		}
	},

	initPreviousReports: function(){
		prevReports=Cookie.get('KPIPrevReports',{path:'/', duration: 0, domain: document.domain});
		if(!prevReports)
			return false;
		Cookie.remove('KPIPrevReports',{path:'/', duration: 0, domain: document.domain});

		prevReports=Json.evaluate(prevReports);
	
		this.prevClientParams=prevReports.PrevClientParams;
		this.prevServerParams=prevReports.PrevServerParams;
	
		delete prevReports.PrevClientParams;
		delete prevReports.PrevServerParams;
	
		this.prevReports=prevReports.data;
	
		return true;
	},

	getBrowser: function(){
		if(window.ie6) browser = 'IE6';
		if(window.ie7) browser = 'IE7';
		if(window.gecko) browser = 'Mozilla/Gecko';
		if(window.webkit) browser = 'Safari/Konqueror';
		if(window.opera) browser = 'Opera';
		return browser;
	},

	report: function(params){
		if( (this.combinedReports.length==0) || (this.reported) ){
			return true;
		}
		if(typeof KPIServerParams == 'undefined'){
			serverParams='';
		}
		else{
			serverParams=KPIServerParams;
		}
		var rand = Math.floor(Math.random()*100 * Math.random()*200);
		this.reported=true;
		var qs = reportURL + '/index.php?inputType=reporter&reportName=KPI&rand='+rand+'&headerType=css&'
			+ 'serverParams=' + encodeURIComponent(Json.toString(serverParams)) + '&clientParams=' 
			+ encodeURIComponent(Json.toString(this.params)) + '&data=' + encodeURIComponent(Json.toString(this.combinedReports));
		
		if (this.prevReports.length > 0) {
			qs += '&prevClientParams=' + encodeURIComponent(Json.toString(this.prevClientParams)) + '&prevServerParams='
					+ encodeURIComponent(Json.toString(this.prevServerParams)) + '&prevData=' +
					encodeURIComponent(Json.toString(this.prevReports));
		}
	
		new Asset.css(qs, {id: 'PageLoadReport'});
	
			delete this.combinedReports;
		this.combinedReports={'PrevClientParams': this.params, 'PrevServerParams': KPIServerParams, 'data': new Array()};
	
		Cookie.remove('KPIPageInit',{duration: 0, domain: document.domain, path: '/'});
	
	},

	addRndtrpReport: function(serverLoadTime){
		var lastClicktime;
		if(!(lastClickTime=Cookie.get('KPIRndtrpStart'))){
			return;
		}
		lastClickTime=new Date(Cookie.get('KPIRndtrpStart'));
		Cookie.remove('KPIRndtrpStart', {duration: 0, domain: document.domain, path: '/'});
		rndtrpTime=(this.headerTime - lastClickTime) - serverLoadTime;
		this.addReport({name: 'Rndtrp', value: rndtrpTime});
	},

	getTimeFromInit: function(){
		var d = new Date();
		return d.getTime() - this.headerTime;
	},

	addLostSessionReport: function(){ //Checks whether the previous session wasn't finished
		if(Cookie.get('KPIPageInit')){
			this.addReport({name: 'LostSession', value: '1'});
			return true;
		}
		return false;
	},

	isKPIReporting: function(){
		return !(typeof KPIServerParams == 'undefined');
	},

	setRndtrpCookie: function(){
		if(kpi.isKPIReporting()){ 
			Cookie.set('KPIRndtrpStart', new Date(),{duration: 0, domain: document.domain, path: '/'});
		}
	},

	setKPIPageInitCookie: function(){
		if(kpi.isKPIReporting()){ 
			Cookie.set('KPIPageInit', this.headerTime ,{duration: 0, domain: document.domain, path: '/'});
		}
	},

	initParams: function(){
		var d=new Date();
		this.params={OS: navigator.platform, browser: this.getBrowser(),
				gmtOffset: d.getTimezoneOffset(), UUID: (uuID || '') };
	},

	

	onUUID: function(){
		if(!this.UUIDReady){
			this.initParams();
			this.UUIDReady = true;
		}
		if(this.UUIDReady & this.windowLoadReady){
			this.report();
		}
	},

	onDOMLoad: function(serverLoadTime){
		this.addSimpleReport('HTMLLoadTime');
		this.addRndtrpReport(serverLoadTime);
	},

	onWindowLoad: function(){
		this.addSimpleReport('FullLoadTime');
		this.windowLoadReady = true;
		if(this.UUIDReady & this.windowLoadReady){
			this.report();
		}
	},

	onError: function(){
		this.addSimpleReport('JSError');
		return true;
	}

});

kpi=new KPI();



var Moobox = new Class({
	options:{
		useOverlay: false,
		openerClass:'modalOpener',
		closerClass:'modalCloser',
		internalCloserClass:'modalInternalCloser',
		internalOpenerClass:'modalInternalOpener',
		bindOpeners: true,
		addGlobalCloser: true,
		initialHeight:80,
		initialWidth:120,
		zIndex: 2,
		onOpen: Class.empty,
		onClose: Class.empty,
		onLoad: Class.empty,
		externalCSS:null
	},
	initialize: function(options){
		this.setOptions(options);
		this.options.container = document.body;
			this.opener = null;
		this.opened = false;
			if(this.options.externalCSS != null)
			new Asset.css(this.options.externalCSS,{id: 'mooboxCSS'});
			if (this.options.useOverlay) {
			this.overlay = new Overlay({
				container: this.options.container,
				onClick: this.closeAll.bind(this),
				zIndex: this.options.zIndex - 1
			});
		}
			var html = '<table cellspacing="0" cellpadding="0"><tr><td colspan="3" class="Edge"><em>&nbsp;</em></td></tr><tr><td class="Side"><em>&nbsp;</em></td><td class="ContCell"></td><td class="Side"><em>&nbsp;</em></td></tr><tr><td colspan="3" class="Edge"><em>&nbsp;</em></td></tr></table>'
		this.container = new Element('div').addClass('MooboxContainer').setStyles({
			'position': 'absolute',
			'z-index':this.options.zIndex,
			'display':'none'
		}).setHTML(html).injectInside(this.options.container);
	
		this.table = this.container.getFirst();
			if(window.ie6){
			this.iframe = new Element('iframe',{
				'src':'about:blank',
				'width':'100%',
				'height':'100%',
				'id':'IE6IframeHack',
				'frameborder':0
			}).setOpacity(0.1).injectTop(this.container);
		}
			if (this.options.addGlobalCloser) {
			this.closer = new Element('a', {
				'class': 'MooboxCloser',
				'title': 'Close'
			}).setStyle('z-index',this.options.zIndex + 1).setHTML('Close').injectTop(this.container);
			this.closer.addEvent('click', this.closeAll.bind(this));
		}
			this.content = $E('td.ContCell',this.container);
	
			this.contentElements = 0;
			this.containerFx = new Fx.Styles(this.container, {
			duration: 200,
			transition: Fx.Transitions.sineInOut
		});

			if(this.options.bindOpeners) this.bindOpeners();
			this.bindEvents();
					this.tempContainer = new Element('div').setStyles({
			'display':'block',
			'position':'absolute',
			'top':'-1000px',
			'left':'-1000px',
			'visibility':'hidden'
		}).injectInside(document.body);
	},

	bindOpeners: function(){
		if($ES('.'+this.options.openerClass))
			$ES('.'+this.options.openerClass).addEvent('click',function(e){
				var url;
				var ev = new Event(e);
				ev.preventDefault();
				var el = new Element(ev.target);
				url = el.getProperty('href') || el.getProperty('rel') ;
				if(url == undefined)
					return;
				this.open(url,el);
			}.bind(this));
	},

	bindInternalOpeners: function(p){
		if($ES('.'+this.options.internalOpenerClass,$(p)))
			$ES('.'+this.options.internalOpenerClass,$(p)).addEvent('click',function(e){
				var url;
				var ev = new Event(e);
				ev.preventDefault();
				var el = new Element(ev.target);
				url = el.getProperty('href') || el.getProperty('rel');
				if(url == undefined)
					return;
				this.open(url,el);
			}.bind(this));
	},

	bindClosers: function(p){
		if($ES('.'+this.options.closerClass,$(p)))
			$ES('.'+this.options.closerClass,$(p)).addEvent('click',this.closeAll.bind(this));
	},

	bindInternalClosers: function(p){
		if($ES('.'+this.options.internalCloserClass,$(p)))
			$ES('.'+this.options.internalCloserClass,$(p)).addEvent('click',this.close.bind(this));
	},

	bindEvents: function(){
		this.onOpen = this.options.onOpen;
		this.onClose = this.options.onClose;
		this.onLoad = this.options.onLoad;
	},

	open: function(url,el){
			if(url == undefined || url == '#')
			return;
		if(el != undefined){//check if this method was called by clicking on an element
									this.openMode = (el.getCoordinates().top.toInt() - window.getSize().scroll.y > (window.getHeight() / 2).toInt()) ? 'above' : 'below';
			this.openMode += (el.getCoordinates().left.toInt() > (window.getWidth() / 2).toInt()) ? 'Right' : 'Left';
					this.opener = el;
		} else {
					this.openMode = 'centered';
			this.opener = null;
		}

		if(!this.opened){
					if(this.options.useOverlay)
				this.overlay.show();
							if (el) {
							this.getOpenClosePos(el);
				this.container.setStyles(this.openClosePos);
			}
					else
				this.container.setStyles(this.getOpenClosePos(null));
			this.container.setStyles({
				opacity: 0,
				display: 'block'
			});
		}
				if (!el.hasClass(this.options.internalOpenerClass)) {
			this.moveToElement(el);
			var d = 400;
		} else
			var d = 0;
			if (!this.opened)
			this.onModalOpen.pass(null,this).delay(d);

			this.load.pass(url,this).delay(d);
	},

	onModalOpen: function(){
		this.opened = true;
		this.fireEvent('onOpen');
	},

	close: function(e){
		if(e)
			new Event(e).preventDefault();

		this.removeCurrentContent();
	},

	closeAll: function(e){
		if(e)
			new Event(e).preventDefault();
		if(this.options.useOverlay)
			this.overlay.hide();
		if(this.mbAjax) this.mbAjax.cancel();
		this.containerFx.stop();
		this.zoomOut.bind(this).delay(500);
	},

	zoomOut: function(){
		this.containerFx.start({
			opacity: 0
		}).chain(function(){
			this.fireEvent('onClose');
		}.bind(this));
		this.reset.bind(this).delay(500);
	},

	reset: function(){
		this.container.setStyles({
			display: 'none',
			width: this.openClosePos.width,
			height: this.openClosePos.height,
			top: this.openClosePos.top,
			left: this.openClosePos.left
		});
		this.content.getChildren().each(function(el){
			el.remove();
		});
		this.opened = false;
		this.opener = null;
		this.contentObj = null;
	},

	getOpenClosePos: function(el){
		if(el == null){
			this.openClosePos = {
				width: 0,
				height: 0,
				top: 0,
				left: 0
			};
		}else{
			var w = el.getCoordinates().width - el.getSizeOffset('width');
			if(w < 0) w = 0;
			var h = el.getCoordinates().height - el.getSizeOffset('height');
			if(h < 0) h = 0;
			this.openClosePos = {
				width: w,
				height: h,
				top: el.getCoordinates().top,
				left: el.getCoordinates().left,
				right: el.getCoordinates().right
			};
		}
		return this.openClosePos;
	},

	load: function(url){
		if(!this.opened) this.open(url);
		else{
			if(this.opener != null){
				this.openMode = (this.opener.getCoordinates().top.toInt() - window.getSize().scroll.y > (window.getHeight() / 2).toInt()) ? 'above' : 'below';
				this.openMode += (this.opener.getCoordinates().left.toInt() > (window.getWidth() / 2).toInt()) ? 'Right' : 'Left';
			} else this.openMode = 'centered';

			this.mbAjax = new Ajax(url,{
				method:'get',
				onRequest:this.onRequest.bind(this),
				onSuccess:this.onSuccess.bind(this),
				onFailure:this.onFailure.bind(this)
			}).request();
		}
	},

	onRequest: function(){
		if (this.contentObj) {
			if(this.contentObj.getStyle('opacity') > 0){
				this.contentFx = new Fx.Styles(this.contentObj, {
					duration: 200,
					transition: Fx.Transitions.linear
				});
				this.contentFx.start({
					opacity: [1, 0]
				});
			}
		}
		this.content.addClass('Loading');
	},

	onSuccess: function(response){
		this.content.removeClass('Loading');
		this.addContent(response);
		this.timer = this.showContent.bind(this).delay(200);
		this.bindClosers(this.contentObj);
		this.bindInternalClosers(this.contentObj);
		this.bindInternalOpeners(this.contentObj);
		this.fireEvent('onLoad');
	},

	onFailure: function(){
		this.addContent("<p>Loading content failed</p>");
		this.timer = this.showContent.bind(this).delay(200);
	},

	removeCurrentContent: function(){
		if (this.contentElements.toInt() > 0) {
					this.contentObj.remove();
					this.contentElements -= 1;
			var content = $ES('.MooboxContent');
			if (content.length > 0) {
							this.contentObj = content[content.length - 1];
							this.contentObj.setStyles({'display':'block','visibility':'hidden','float':'left'}).injectInside(this.tempContainer);
							this.showContent();
			}
		}
		if(this.contentElements.toInt() == 0)
			this.closeAll();
	},

	moveToElement: function(el){
			if(el == undefined)
			this.openMode = 'centered';
			var fxHash = !this.opened ? this.getFXHash(el) : this.getFXHash();
		if(this.contentObj){
					this.contentFx.start({
				opacity: [1,0]
			}).chain(function(){
				this.container.setStyles(fxHash);
			}.bind(this));
		} else {
					this.containerFx.start(fxHash);
		}
	},

	showContent: function(){
			var fxHash = this.getFXHash();
		this.container.setStyles(fxHash);
			$ES('.MooboxContent').setStyle('display','none');
			this.contentObj.setStyles({'display':'block','visibility':'hidden','float':'none'}).injectInside(this.content);
	
			if (window.ie) {
			this.evalScripts(this.contentObj);
		}
			this.contentFx = new Fx.Styles(this.contentObj, {
			duration: 200,
			transition: Fx.Transitions.linear
		});
	
		this.contentFx.start({
			opacity: [0,1]
		});
	},

	getFXHash: function(el){
		var fxHash;
		if(el){
			fxHash = {
				opacity: [0, 1],
				width:this.options.initialWidth,
				height:this.options.initialHeight
			}

			switch(this.openMode){
				case 'belowLeft'://position below the opening element, aligned to its left side
					fxHash.top = el.getCoordinates().top + (el.getCoordinates().height * 2);
					fxHash.left = el.getCoordinates().left;
					break;
				case 'belowRight'://position below the opening element, aligned to its right side
					fxHash.top = el.getCoordinates().top + (el.getCoordinates().height * 2);
					fxHash.left = el.getCoordinates().right - this.options.initialWidth - 16;
					break;
				case 'aboveLeft'://position below the opening element, aligned to its left side
					fxHash.top = el.getCoordinates().top - (el.getCoordinates().height + this.options.initialHeight + 16);
					fxHash.left = el.getCoordinates().left;
					break;
				case 'aboveRight'://position below the opening element, aligned to its right side
					fxHash.top = el.getCoordinates().top - (el.getCoordinates().height + this.options.initialHeight + 16);
					fxHash.left = el.getCoordinates().right - this.options.initialWidth - 16;
					break;
				default://position at the center of the window
					fxHash.top = (window.getHeight()/2)-((this.options.initialHeight + 16)/2);
					fxHash.left = (window.getWidth()/2)-((this.options.initialHeight + 16)/2);
					break;
			}

			fxHash.top = fxHash.top < 0 ? 0 : fxHash.top;
			fxHash.left = fxHash.left < 0 ? 0 : fxHash.left;
			fxHash.left = fxHash.left >= (window.getWidth() - this.options.initialWidth - 16) ? (window.getWidth() - this.options.initialWidth - 16) : fxHash.left;

		} else {
					this.getOpenClosePos(this.opener);
			fxHash = {
				width: this.contentObj.getCoordinates().width + 16,
				height: 'auto',
				opacity:1
			};
			if(!this.opener.hasClass(this.options.internalOpenerClass)){
				switch(this.openMode){
					case 'belowLeft':
						fxHash.left = this.openClosePos.left;
						fxHash.top = this.openClosePos.top + this.openClosePos.height * 2;
						break;
					case 'belowRight':
						fxHash.left = (this.openClosePos.right - this.contentObj.getCoordinates().width - 16);
						fxHash.top = this.openClosePos.top + this.openClosePos.height * 2;
						break;
					case 'aboveLeft'://position below the opening element, aligned to its left side
						fxHash.left = this.openClosePos.left;
						fxHash.top = this.openClosePos.top - this.openClosePos.height - this.contentObj.getCoordinates().height - this.content.getSizeOffset('height') - 16;
						break;
					case 'aboveRight'://position below the opening element, aligned to its right side
						fxHash.left = (this.openClosePos.right - this.contentObj.getCoordinates().width - 16);
						fxHash.top = this.openClosePos.top - this.openClosePos.height - this.contentObj.getCoordinates().height - this.content.getSizeOffset('height') - 16;
						break;
					default:
						fxHash.left = window.getWidth() / 2 - this.contentObj.getCoordinates().width / 2 - 16;
						fxHash.top = window.getHeight() / 2 - this.contentObj.getCoordinates().height / 2 - 16;
						break;
				}
			
				fxHash.top = fxHash.top < 0 ? 0 : fxHash.top;
				fxHash.left = fxHash.left < 0 ? 0 : fxHash.left;
				fxHash.left = fxHash.left >= (window.getWidth() - this.contentObj.getCoordinates().width - 16 - this.content.getSizeOffset('width')) ? (window.getWidth() - this.contentObj.getCoordinates().width - 16 - this.content.getSizeOffset('width')) : fxHash.left;
			}
		}
		return fxHash;
	},

	addContent: function(html){
				this.contentObj = new Element('div').addClass('MooboxContent').setStyles({'visibility':'hidden','float':'left'}).setHTML(html);
			this.contentObj.injectInside(this.tempContainer);
			this.contentElements += 1;
	},

	evalScripts: function(parentEl){
			var elements = parentEl.getChildren()

			elements.each(function(el){
			if(el.getTag()=='script' && !el.getProperty('src')) {
				if(typeof console!='undefined' && document.location.href.test('.dev.')) console.log('evaluating script ', el.innerHTML);
				eval(el.innerHTML);
				return;
			}
			else if(el.getTag()=='script' || el.getTag()=='link') {
							if((el.getTag()=='script' && $$('script[src="'+el.getProperty('src')+'"]').length )||
				 (el.getTag()=='link' && $$('link[href="'+el.getProperty('href')+'"]').length) ) {				 	return;
				 }
				if(typeof console!='undefined' && document.location.href.test('.dev.')) console.log('Injecting script tag', el);
				if(document.location.href.test('debug')) alert('injecting ' + el.getProperty('src') + el.getProperty('href'));
				if(document.location.href.test('debug')) alert('handling element tag:' + el.getTag() + ' id:' + el.getProperty('id') + ' defer:' + el.getProperty('defer') + ' src:' + el.getProperty('src') + ' href:' + el.getProperty('href')+ ' innerHTML:' + el.innerHTML);
				if(el.getTag()=='script')
					new Asset.javascript(el.getProperty('src'));
				else
					el.injectTop(document.head);
			}
		});
	}
});

Moobox.implement(new Options);
Moobox.implement(new Events);

var Overlay = new Class({

	getOptions: function(){
		return {
			colour: '#000',
			opacity: 0.7,
			zIndex: 1,
			container: document.body,
			onClick: Class.empty
		};
	},

	initialize: function(options){
		this.setOptions(this.getOptions(), options);

		this.options.container = $(this.options.container);

		if (!$('Overlay')) {
			this.overlay = new Element('div').setProperty('id', 'Overlay').setStyles({
				position: 'absolute',
				left: '0px',
				top: '0px',
				width: '100%',
				zIndex: this.options.zIndex,
				backgroundColor: this.options.colour
			}).injectInside(this.options.container);
		}
		else {
			this.overlay = $('Overlay');
			this.overlay.setStyle('z-index',this.options.zIndex);
		}

		this.overlay.addEvent('click', function(){
			this.options.onClick();
		}.bind(this));

		this.fade = new Fx.Style(this.overlay, 'opacity').set(0);
		this.position();

		window.addEvent('resize', this.position.bind(this));
	},

	position: function(){
		if(this.options.container == document.body){
			var h = window.getScrollHeight()+'px';
			this.overlay.setStyles({top: '0px', height: h});
		}else{
			var myCoords = this.options.container.getCoordinates();
			this.overlay.setStyles({
				top: myCoords.top+'px',
				height: myCoords.height+'px',
				left: myCoords.left+'px',
				width: myCoords.width+'px'
			});
		}
	},

	show: function(){
		this.fade.start(0,this.options.opacity);
	},

	hide: function(){
		this.fade.start(this.options.opacity,0);
	}

});
Overlay.implement(new Options);


var panelMgr;//global Panel Manager
function initPage() {
	headerObj.target = headerObj.target ? headerObj.target : '_top';
	if (headerObj.target) {
		$ES('a', 'Header').setProperty('target', headerObj.target);
		$ES('a', 'Footer').setProperty('target', headerObj.target);
	}

	if(headerObj.currentTab && $(headerObj.currentTab))
		$(headerObj.currentTab).addClass('Active');
	else{
		$ES('a','SiteNav').each(function(el){
			url = el.getProperty('href');
			l = new String(document.location.href);
			l = l.substr(l.indexOf(location.host),l.length);
			if(l.match(url) && url != '/') el.getParent().addClass('Active');
		});
	}

	if(window.ie6){
		if($E('body').getFirst().getTag()=='img')
			$E('img',document.body).setStyle('display','none');
	}

	if($('ClientDL')){
		if(!navigator.platform.test('Win')) {
			$('ClientDL').setStyle('display','none');
		} else{ //disable Video pausing when downloading the client
			if($('fpObj')){
				$('ClientDL').addEvent('click',function(e){
					try{itemManager.shouldPausePlayer = false}catch(e){};
				});
				$('ClientDL').addEvent('mouseout',function(e){
					try{itemManager.shouldPausePlayer = true}catch(e){};
				});
			}
		}
	}

	initMoreText();

	if ($('SiteSearch')) {
		new searchObj('SiteSearch');
	}

	if(headerObj.search) {
		$('SearchQuery').setProperty('value', headerObj.search);
	}

	if (Cookie.get('familyFilter') == 0) {
		$ES('.FamilyFilter a').addEvent('click', function(e){
			new Event(e).preventDefault();
			setFamilyFilter(5, true);
		});
	}

	if(!(new String(window.location.href).test('/notifications')) && headerObj.userID){//if we're outside the message center and logged in
		$('Notices').addEvent('click',function(e){ //report clicks to omniture
			iOmnitureMC.report({'events': 'event72'}, "Private Messaging");
		});
		$('Msgs').addEvent('click',function(e){ //report clicks to omniture
			iOmnitureMC.report({'events': 'event72'}, "Private Messaging");
		});
	}
	if(!Cookie.get('TZOffset')){// add local TZ value to a cookie so time in message center can be localized
		var d = new Date();
		Cookie.set('TZOffset',d.getTimezoneOffset(),{
			duration: 1,
			domain:document.domain,
			path:'/'
		});
	}
	if($E('.Panel')) //new panel manager
		panelMgr = new PanelMgr();

	if($('slCat')){
		$('slCat').addEvent('change',function(){
			document.location = $('slCat').value;
		});
	}
	var so = new SWFObject(headerObj.cdnFlash+'/Misc/ajax.swf', "AjaxProgSwf", "20", "20", "8");
	so.addParam("wmode", "transparent");
	so.write("AjaxProg");
}

function initFooter() {
	window.addEvent('load', function(){
		MainReportItems = new ReportItems();
	});
}
var RPC = new Class({
	initialize: function(){
		this.cachedObjects = {};//create an empty object for cached elements
		this.inProcess = false;//initialize inProcess property and set to 'false'
		this.scrollToTop = false;
	},
	doRPC: function(el, event){
			if(this.inProcess || el.hasClass('Disabled') || el.getParent().hasClass('Disabled')) {
			if(event)
				event.stop();
			return;
		}
			if(el.getProperty('href') || el.getProperty('rel')){
					var url = el.hasClass('useHREF') ? el.getProperty('href') : (el.getProperty('rel') || el.getProperty('href'));
			if(el.getProperty('class').match('post([0-9a-zA-Z_\-]*)')){
				var data = $ES('.'+el.getProperty('class').match('post([0-9a-zA-Z_\-]*)')[1]).toQueryString().join('&');
				var method = 'post';//set request method to 'get'
			} else {
				var method = 'get';//set request method to 'get'
				var data = null;//set request data to 'null'
			}
		}
			if(el.getTag() == 'input' || el.getTag() == 'button'){
			if(event)
				event.preventDefault();
			for(p = el; p.getTag() != 'form'; p = p.getParent()); //find the calling element's containing form
					p.fireEvent('onBeforeSubmit');
					if(p.hasClass('notvalid'))
				return;
					var method = p.getProperty('method') || 'post';
			var url = p.getProperty('action');
			var data = p.toQueryString();
		}
	
			this.url = url = url + (url.test('/$') ? '?' : '&') + 'ajax=1&rand=' +  Math.random();//add an AJAX flag to the request URL
		this.postBody = data || '';
		this.inProcess = true;
		this.scrollToTop = el.hasClass('scrollTop');
			this.ajax = new Ajax(url,{
			method: method,
			postBody: data,
			headers: {'X-Requested-With':'XMLHttpRequest'},
			onSuccess: this.onRequest.bind(this),
			onFailure: this.onFailure.bind(this)
		}).request();
	},
	onRequest: function(response){
		var elements = new Element('div').setHTML(response).getChildren();
		this.replaceElements(elements);
		delete elements;
		this.inProcess = false;
		if(this.scrollToTop)
			new Fx.Scroll(window).scrollTo(0,$('Content').getCoordinates().top-20);
	},
	onFailure: function(response){
			var msg = 'Your request could not be completed.';
		if($defined(response) && response.responseText.length > 0)
			msg += '\n'+response.responseText;
		alert(msg);
	},
	replaceElements: function(elements){
		elements.each(function(el){
			var id = el.getProperty('id');
			if(el.getTag()=='script' && !el.getProperty('src')) {
				if(typeof console!='undefined' && document.location.href.test('.(dev|qa).')) console.log('evaluating script ', el.innerHTML);
				eval(el.innerHTML.replace('<!--','').replace('--!>',''));
				return;
			}
			else if(el.getTag()=='script' || el.getTag()=='link') {
							if((el.getTag()=='script' && $$('script[src="'+el.getProperty('src')+'"]').length )||
				 (el.getTag()=='link' && $$('link[href="'+el.getProperty('href')+'"]').length) ) {				 	return;
				 }
				if(typeof console!='undefined' && document.location.href.test('.dev.')) console.log('Injecting script tag', el);
				if(document.location.href.test('debug')) alert('injecting ' + el.getProperty('src') + el.getProperty('href'));
				if(document.location.href.test('debug')) alert('handling element tag:' + el.getTag() + ' id:' + el.getProperty('id') + ' defer:' + el.getProperty('defer') + ' src:' + el.getProperty('src') + ' href:' + el.getProperty('href')+ ' innerHTML:' + el.innerHTML);
				if(el.getTag()=='script')
					new Asset.javascript(el.getProperty('src'));
				else
					el.injectTop(document.head);
			}
					else if(el.innerHTML=='' && el.getTag()!='input' && el.getTag()!='button') {
				if(this.cachedObjects[id])
					this.getFromCache(id);
			}
			else {
				var oldElement = $(id);
					this.fireEvent('onUnload',[id, this.url],0)
				if(!oldElement) {
					if(typeof console!='undefined' && document.location.href.test('.dev.')) console.log('could not find an element to replace with',el);
					return;
				}
				if(!oldElement.hasClass('nocache'))
					this.cachedObjects[id] = oldElement;
				if(document.location.href.test('debug')) alert(el);
				oldElement.replaceWith(el);
			}
			this.fireEvent('onChange',[id, this.url, this.postBody],0)
		},this);
	},
	getFromCache: function(id) {
		return $(id).replaceWith(this.cachedObjects[id]);
	},
	callModal: function(el){//backward compatibility with old RPC
		clickManager.callModal(el);
	},
	setManager: function(manager){//backward compatibility with old RPC
		this.manager = manager;
	}
});

RPC.implement(new Events);
var rpc = new RPC();

var ClickManager = new Class({
	initialize: function(){
		this.modal = null;
		document.addEvent('click',this.documentClick.bindWithEvent(this));
	},
	documentClick: function(event){
		if(event.rightClick)
			return;
		var BrandedContainer = BrandedContainer || false;
		var _break = false;
		for(var el=new Element(event.target); el && el!=document.body; el=el.parentNode){
			if($defined(el.hasClass)) {
				if(el.hasClass('windowBlank')){//add a _blank target to the link so it opens in a new window
					el.setProperty('target','_blank');
					_break = true;
				}
				if(el.hasClass('modalOpener')){
					event.preventDefault();
					this.callModal(el);
					_break = true;
				}
				if(el.hasClass('rpc')){ //delegate click to the RPC
					if(el.getTag() == 'a')
						event.preventDefault();
					rpc.doRPC(el, event);
					_break = true;
				}
				if(el.hasClass('Fold')){
					el.blur();
					this.togglePanel(el);
					_break = true;
				}
				if(el.hasClass('Toggler') && !BrandedContainer){
					event.preventDefault();
					el.blur();
					this.toggleSibling(el);
					_break = true;
				}
							if(_break)
					break;
													if(el.getTag() == 'a'){
					setClickTime();
					break;
				}
			}
		}
		if($('AjaxProg')){
			$('AjaxProg').setStyles({
				'top':(event.page.y+10)+'px',
				'left':(event.page.x+8)+'px'
			});
		}
	},
	togglePanel:function(el){
		panelMgr.togglePanel(el);//panelMgr is a global variable defined in PageInit.js
	},
	toggleSibling:function(el){
		$ES('.Toggled',el.getParent()).toggleClass('Hidden');
		if(el.hasClass('More')){
			el.setHTML('&laquo;Less').removeClass('More').addClass('Less');
		} else if(el.hasClass('Less')){
			el.setHTML('More&raquo;').addClass('More').removeClass('Less');
		} else
			el.toggleClass('Folded');
	},
	callModal: function(el){
		if(this.modal == null){
			this.modal = new Moobox({
				bindOpeners:false,
				zIndex:10000
			});
		}
		var url = (el.getProperty('rel') || el.getProperty('href'));
		this.modal.open(url,el);
	}
});

var clickManager = new ClickManager();
}