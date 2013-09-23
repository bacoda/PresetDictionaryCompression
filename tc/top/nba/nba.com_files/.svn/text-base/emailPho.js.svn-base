//Set Cookie
function SetCookie (name,value,expires,path,domain,secure) {
	if(name == "path" || name == "expires" || name == "domain" || name == "version") {
		name = "badCookieName";
	}
  	document.cookie = name + "=" + value +
    ((expires) ? "; expires=" + expires.toGMTString() : "") +
    ((path) ? "; path=" + path : "") +
	((domain) ? "; domain=" + domain : "") +
	((secure) ? "; secure" : "");
}

function photoGalleryEmail(imageURL, label, credit) {
	var target = document;
	if(label.length < 1)
		label = "&nbsp;";
	if(credit.length < 1)
		credit = "&nbsp;";
	
	SetCookie ("imageSRC", imageURL, null, "/");
	SetCookie ("imageCaption", label, null, "/");
	SetCookie ("imageCredit", credit, null, "/");
	SetCookie ("articleURL", target.location, null, "/");
	SetCookie ("articleTitle", target.title, null, "/");
	//SetCookie ("omitAmex", imageAmex[indexPos], null, "/");
	
	var host = location.hostname;
	host = host.substring(host.indexOf("."));
	
	if(host == ".nba.com" || host == "linuxpub1" || host == "linuxpub2") {
	SetCookie ("teamPath", location.pathname.substring(1, location.pathname.indexOf('/', 1)), null, "/");
	SetCookie("site", 'NBA', null, "/");
	}
	attrs = 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,screenX=25,screenY=25,top=25,left=25,copyhistory=no,,width=700,height=488';
	newPopup=window.open('/components/EmailAPhotoForm.html','EmailaPhoto',attrs);
	newPopup.focus();
}

function photoGalleryEmailFlash(imageURL, label, credit) {
	var target = document;
	if(label.length < 1)
		label = "&nbsp;";
	if(credit.length < 1)
		credit = "&nbsp;";
	
	SetCookie ("imageSRC", imageURL, null, "/");
	SetCookie ("imageCaption", label, null, "/");
	SetCookie ("imageCredit", credit, null, "/");
	SetCookie ("articleURL", target.location, null, "/");
	SetCookie ("articleTitle", target.title, null, "/");
	//SetCookie ("omitAmex", imageAmex[indexPos], null, "/");
	
	var host = location.hostname;
	host = host.substring(host.indexOf("."));
	
	if(host == ".nba.com" || host == "linuxpub1" || host == "linuxpub2") {
	SetCookie ("teamPath", location.pathname.substring(1, location.pathname.indexOf('/', 1)), null, "/");
	SetCookie("site", 'NBA', null, "/");
	}
	attrs = 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,screenX=25,screenY=25,top=25,left=25,copyhistory=no,,width=900,height=520';
	newPopup=window.open('/components/EmailAPhotoForm.html','EmailaPhoto',attrs);
	newPopup.focus();
}