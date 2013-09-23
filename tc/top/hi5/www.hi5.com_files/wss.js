//alert("> wss");

//
// Supporting Functions
//

function createCookie(name,value,days){
	if (days)
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/;domain=hi5.com";
}

function eraseCookie(name)
{
	createCookie(name,"",-1);
}

function readCookie(c_name) {	
	if (document.cookie.length > 0) {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1) { 
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) {
				c_end=document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start,c_end));
		} 
	}
	return null;
}


function hasHi5Cookie() {
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		if(c.match(/^hi5*/)) {
			return true;
		}		
	}	
	return false;
}

function getViewerSegment() {
	
	var segment;
	if( readCookie("Userid") != null) {		
		segment = '4'; //AUTH_MEMBER
	} else if (readCookie("Email") != null) {
		segment = '3'; //UNAUTH_MEMBER
	} else if (hasHi5Cookie()) {	
		segment = '2'; //RET_VISITOR
	} else {	
		segment = '1'; //NEW_VISITOR
	}
	return segment;
}

function getViewerId() {
	var viewerId;
	viewerId = readCookie("Userid");
	return viewerId;
}

function isUserInPopulation() {
	var flag = false;
	
	if(readCookie("Userid") != null) { // if member
		var viewerId = getViewerId();
		if((viewerId > 0) && ((viewerId % 1000) <= 9)) { // if user in sample
			createCookie("WSSSampleCookie","Y",30*365);
			flag = true;	
		} else {
			createCookie("WSSSampleCookie","N",30*365);	
			flag = false;
		}		
	} else { // else visitor
		if(readCookie("WSSSampleCookie") == null) { // if no sample cookie
			var jSessionId = readCookie("JSESSIONID");
			if(jSessionId != null && (getHashCode(jSessionId) % 100 == 0)) { // check visitor in sample from jsessionid
				createCookie("WSSSampleCookie","Y",30*365);		
			} else {
				createCookie("WSSSampleCookie","N",30*365);		
			}
		} 
		
		if(readCookie("WSSSampleCookie") == "Y") {
			flag = true;
		} else {
			flag = false;
		}
	}
	
	return flag;
}

function getHashCode(str) {
	var count = str.length;
	var hashcode = 0;
	for(var i=0;i<count;i++) {
		hashcode = parseInt(hashcode * 31 + str.charCodeAt(i));
		hashcode = hashcode & 0x00000000FFFFFFFF; // to convert long to int
	}
	return hashcode;
}

function getLoginMetrics() {
	var loginInfo = readCookie("LoginInfo");
	if( loginInfo != null) {
		eraseCookie("LoginInfo");		
		return loginInfo;
	}
	
	return null;
}

// non wss functions

function appendCookie(name, value){
  var oldValue = readCookie(name);
  var newValue = value.substring(value.indexOf("friend/") + 6);
  newValue = new Date().getTime() + newValue;
  if (oldValue == null || oldValue.length==0){
    oldValue = newValue;
  }
  else{
    oldValue = oldValue + "!" + newValue;
  }
  eraseCookie(name);
  createCookie(name, oldValue, 7);
  if (oldValue.split(",").length > 5)
  {
        return 1;
  }
  else
  {
    return 0;
  }
}

function hitServer(ajaxUrl) {
	var req = null;

	if(window.XMLHttpRequest)
			req = new XMLHttpRequest();
	else if (window.ActiveXObject)
			req  = new ActiveXObject(Microsoft.XMLHTTP);

	req.open("GET", ajaxUrl, true);
	req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	req.send(null);
}
