regParam = "&regAction=login";
logoutLink = "";

document.writeln('<div id="loginBar">');
document.writeln('<div class="loginMenuLink" id="loginMenuLink"><a id="loginMenuMore">More</a></div>');
document.writeln('<div class="loginBarText" id="loginBarText">');

if (checkRegistration()) {
	uName = getUserName();
	var displayName = uName;
	if (displayName.length > 9) {
		displayName = (uName.substring(0,9)) + "...";
	}
	if (typeof(displayName) == 'undefined') {displayName = "";} 

	regParam = "";
	logoutLink = " | <a href=\"http://my.ign.com/my/sb?paction=logout&network=1&cb=" + random + "\" onclick=\"trackclick('LoginBox_logout-click.ign.com')\" rel=\"nofollow\">Log Out</a>";
 
	document.writeln('<b>Welcome</b> <a href="http://club.ign.com" onclick="trackclick(\'LoginBox_name-click.ign.com\')" rel="nofollow">'+displayName+'</a>'+logoutLink);		
    document.writeln('<img src="http://login.ign.com/cookieupdate.aspx?ohrs=1" width="1" height="1" style="display:none;" />');
	
} else {  // have to do this so the user won't get redirected back to teaser page after logging in as an insider....
	var window_loc = "" + window.location;
	if (window_loc.indexOf("/teasers/")>-1) {
		window_loc = js_replace(window_loc,".html","p1.html");
		window_loc = js_replace(window_loc,"/teasers/","/articles/");
    }
	window_loc = js_replace(window_loc,"/teaser.html","/index.html");
 	
	document.writeln('<a href="http://my.ign.com/my/sb?paction=relogin&params='+urlEncode("#action#protect#location#" + urlEncode(window_loc)) + '" onclick="trackclick(\'LoginBox_login-click.ign.com\')" rel="nofollow">Log In</a> | <a href="http://my.ign.com/my/sb?regAction=reg&network=1&params='+urlEncode("#action#protect#location#"+ urlEncode(window_loc)) +'" onclick="trackclick(\'LoginBox_register-click.ign.com\')" rel="nofollow">Register</a>');
}

document.writeln('</div>');
document.writeln('</div>');