 /*  	 
 $Id: common.js,v 1.13 2007/10/16 14:42:34 cookn Exp $ 	 
 (c) 2006-2007 The New York Times Company 	 
 */

function nameIt() {
    	//window.name = 'nytimesmain';
	    if ((navigator.appName == "Microsoft Internet Explorer") && (document.all.globalsearchform)){
			document.all.globalsearchform.style.visibility = "visible";
        }
    }
     
	function pop_me_up(pURL,features){ 
		new_window = window.open(pURL, "popup_window", features);
		new_window.focus();
	}

	function pop_me_up2(pURL,name,features){
		new_window = window.open(pURL,name,features);
		new_window.focus();
	}

	function changeImage(image_name,image_src) {
   		document.images[image_name].src = image_src;
	}

	function goToURL(obj){
		var f = (obj.section) ? obj : obj.form;
		var selected = f.section.selectedIndex;
		var URL = f.section.options[selected].value;
		if (URL != "") document.location = URL;
		return false;
	}

	function goToURL2(sel){
	// This version only works for onChange events from select objects
	// but the select object can have any name, unlike goToURL() which requires 
	// the select object to be named "section"
	
		var selected = sel.selectedIndex;
		var url = sel.options[selected].value;
		if (url != "") document.location = url;
		return false;
	}
	/*removed not to break frames
	if (window.self != window.top) { 
		top.location.replace(window.location.pathname); 
	}
	*/
	//begin functions for Travel flash slideshows
	function writeFlashSlideShow(xmlFile){
		var swfFile = "/slideshow/swf/slideshow.swf?XMLfile=/slideshow/xml/travel/" + xmlFile;
		
		var HTMLstr = "";
		HTMLstr += "<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" width=\"390\" height=\"300\" id=\"slideshow\" align=\"middle\">";
		HTMLstr += "<param name=\"allowScriptAccess\" value=\"sameDomain\" />";
		HTMLstr += "<param name=\"movie\" value=\"" + swfFile + "\" />";
		HTMLstr += "<param name=\"quality\" value=\"high\" />";
		HTMLstr += "<param name=\"wmode\" value=\"transparent\" />";
		HTMLstr += "<embed src=\"" + swfFile + "\" wmode=\"transparent\" quality=\"high\" width=\"390\" height=\"300\" name=\"slideshow\" align=\"middle\" allowScriptAccess=\"sameDomain\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />";
		HTMLstr += "</object>";
		return HTMLstr;
	}
	
	function showFirstSlide(imgName, photoCredit, photoCaption){
		var HTMLstr = "";
		HTMLstr += "<!-- begin photo -->";
		HTMLstr += "<img src=\"http://graphics.nytimes.com/images/section/travel/slideshow/" + imgName + "\" width=\"390\" height=\"200\" alt=\"photo\" border=\"0\">";
		HTMLstr += "<!-- end photo -->";
		HTMLstr += "<div align=\"right\" class=\"photocredit\">" + photoCredit + "</div>";
		HTMLstr += "<div class=\"photocaption\">" + photoCaption + "</div>";
		return HTMLstr;
	}
	//end functions for Travel flash slideshows
	
	//begin functions for Global flash slideshows
	function writeEmbeddedFlashSlideShow(xmlFile){
		var swfFile = "/slideshow/swf/slideshow.swf?XMLfile=/slideshow/xml/" + xmlFile;
		
		var HTMLstr = "";
		HTMLstr += "<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" codebase=\"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0\" width=\"390\" height=\"300\" id=\"slideshow\" align=\"middle\">";
		HTMLstr += "<param name=\"allowScriptAccess\" value=\"sameDomain\" />";
		HTMLstr += "<param name=\"movie\" value=\"" + swfFile + "\" />";
		HTMLstr += "<param name=\"quality\" value=\"high\" />";
		HTMLstr += "<param name=\"wmode\" value=\"transparent\" />";
		HTMLstr += "<embed src=\"" + swfFile + "\" wmode=\"transparent\" qualityaigh\" width=\"390\" height=\"300\" name=\"slideshow\" align=\"middle\" allowScriptAccess=\"sameDomain\" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" />";
		HTMLstr += "</object>";
		return HTMLstr;
	}
	
	function showFirstEmbeddedSlide(imgName, photoCredit, photoCaption){
		var HTMLstr = "";
		HTMLstr += "<!-- begin photo -->";
		HTMLstr += "<img src=\"" + imgName + "\" width=\"390\" height=\"200\" alt=\"photo\" border=\"0\">";
		HTMLstr += "<!-- end photo -->";
		HTMLstr += "<div align=\"right\" class=\"photocredit\">" + photoCredit + "</div>";
		HTMLstr += "<div class=\"photocaption\">" + photoCaption + "</div>";
		return HTMLstr;
	}
	//end functions for Global flash slideshows
	
	
	function preloadNavImages(imageNames, imagePath){
		var loadedImages = new Array();
		if (document.images) {
			for (var i=0; i < imageNames.length; i++){
				loadedImages[i] = new Image();
				loadedImages[i].src = imagePath + "nav_" + imageNames[i] + "_off.gif";
			}
		}
	
	}
	
	function readCookie(value){
		var allCookieVals = document.cookie.split(";");
		for (var i=0; i < allCookieVals.length; i++){ //loop through all cookies
			if (allCookieVals[i].indexOf(value) != -1) { //find target cookie
				var cookieVal = allCookieVals[i].split("="); //split name/value pair
				return cookieVal[1]; //return target cookie value
			}
		}
	}
	
	function expandMultimediaWindow(){
		if (window.resizeTo && window.moveTo) {
			window.resizeTo(screen.availWidth, screen.availHeight);
			window.moveTo(0,0);
		}
	}
	
	function shrinkMultimediaWindow(w,h){
		if (window.resizeTo) window.resizeTo(w,h);
		if (window.moveTo) {
			var winX = ((screen.availWidth/2) - (w/2));
			var winY = ((screen.availHeight/2) - (h/2));
			window.moveTo(winX,winY);
		}
	}
	
	function ieXLiquidWidth() {
		if (document.body.clientWidth < 774) {
			return "768px";
		} else if (document.body.clientWidth > 984) {
			return "980px";
		} else {
			return "auto";
		}
	}

	function setClientSizeCookies() {
        	var client_w = document.body.clientWidth;
       		var path = "/";
        	var domain = "nytimes.com";
        	document.cookie = "client_w=" + client_w + "; path= " + path + "; domain=" + domain;
	}



// Function for Classifieds and Most Popular modules
   function Accordian(target) {
   	typeof target == "object" ? this.element = target : this.element = document.getElementById(target); if (!this.element) return false;  
   	this.ul = this.element.getElementsByTagName("ul")[0]; 
   	this.tabs = this.ul.getElementsByTagName("li");
   	this.tabContent = this.getTabContent();
   	this.bind();
   }

   Accordian.prototype.getTabContent = function() {
   	tabContent= new Array();    
   	this.divs = this.element.getElementsByTagName("div");
   	for(var i = 0; i < this.divs.length; i++) {
           if (/tabContent/i.test(this.divs[i].className)) {
           tabContent.push(this.divs[i]);                        
   		}
   	}
   	return tabContent;
   }


   Accordian.prototype.bind = function() {    
   	var o = this;
   	for(var i = 0; i < this.tabs.length; i++) {
   		this.tabs[i].onclick = function() { 
   		   if (this.className != 'selected') {
   		      o.open(this); return false;
   		      var a = this.getElementsByTagName("a")[0];
   		      if (a) a.onclick = function() { 
                    return false; 
               }
   		   }
   		} 
   	}
   }

   Accordian.prototype.open = function(caller) {    
   	for(var i = 0; i < this.tabs.length; i++) {
   		var tab = this.tabs[i]; 
   		if (tab == caller) {  
   			this.collapse();
   			tab.className = "selected"
   			this.tabContent[i].style.display = "block";
   		}
   	}
   }

   Accordian.prototype.collapse = function() {
   	for(var i = 0; i < this.tabs.length; i++) {    
   		this.tabs[i].className = "";
   		this.tabContent[i].style.display = "none";                 
   	}                                                                
   }

//Function for Google ads links
function linkbox(url, winName) {
   window.open(url, winName, 
"location=yes,directories=yes,menubar=yes,toolbar=yes,status=yes,resizable=yes,scrollbars=yes");
}    


function enhanceAccordians() {
	var divs = document.getElementsByTagName('div');
	for (var i = 0; i < divs.length; i++) {
		var element = divs[i];     
		if (/accordian/i.test(element.className)) {
			new Accordian(element);
		}
	} 
}

getMetaTagValue = function(name){
        if (document.getElementsByTagName) {
                var meta = document.getElementsByTagName("meta");
                for (var i=0; i < meta.length; i++) {
                        if (meta[i].name == name) return meta[i].content;
                }
        }
}
