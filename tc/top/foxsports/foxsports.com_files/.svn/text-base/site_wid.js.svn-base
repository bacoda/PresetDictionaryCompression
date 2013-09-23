// DCLK variables, required for every page
var axel = Math.random() + "";
var ord = axel * 1000000000000000000;

// Broswer detection - these must be consistent on every page.  make sure the old script file has the same variables.
var NS4 = (document.layers) ? 1 : 0;
var IE4 = ((document.all) && (!document.getElementById)) ? 1 : 0;
var IE5 = ((document.all) && (!document.fireEvent) && (!window.opera)) ? 1 : 0;
var DOM = (document.getElementById) ? 1 : 0;  // ns6+ and ie5+ and mozilla
var NS6 = ((!document.all) && (document.getElementById)) ? 1 : 0;  // ns6+ and mozilla, not ie6
var IE = (navigator.appName == "Microsoft Internet Explorer") ? 1 : 0;
var PC = (navigator.platform == "Win32") ? 1 : 0;
var MAC = ((navigator.appVersion.indexOf("PPC") >0) || (navigator.appVersion.indexOf("Mac") >0)) ? 1 : 0;

// fantasy football
var ff = new Object();

//Layer switch functions using the display property
function layerSwitchDisplay(theDivs, divId) {
// Layer switching functions
  for (var i = 0; i < theDivs.length; i++) {
    if (theDivs[i] == divId) {
      showLayerDisplay(theDivs[i]);
    }
    else {
      hideLayerDisplay(theDivs[i]);
    }
  }
}
function hideLayerDisplay(whichEl) {
  document.getElementById(whichEl).style.display = "none";
}
function showLayerDisplay(whichEl) {
  document.getElementById(whichEl).style.display = "";
}

function ToggleStyleDisplay(elId, state) {
    if (typeof(elId) != "object") {
        var el = document.getElementById(elId);
    }
    else {
        var el = elId;
    }

    if (!el) {
        return;
    }
    var displayValue = el.style.display;

    if (arguments.length > 1) {
        if (state) {
            displayValue = 'none';
        }
        else {
            displayValue = 'block';
        }
    }
    var block = 'block';
    if (NS6) {
        if (el.tagName == 'TR') block = 'table-row';
        if (el.tagName == 'TABLE') block = 'table';
        if (el.tagName == 'TD' || el.tagName == 'TH') block = 'table-cell';
    }
    if ((displayValue == '') || (displayValue == 'none')) {
        el.style.display = block;
    }
    else {
        el.style.display = 'none';
    }
}


function userState(type) {
  if (arguments.length == 0) {
    if (typeof(user) != 'object') return false;
    if (typeof(user.USER_ID) != 'string') return false;
    if (user.USER_ID == 0) return false;
    return true;
  } 
  else {
    if (userState()) {
      if (type == 'players') {
        if (typeof(userPlayers) != 'object') return false;
        if (typeof(userPlayers.length) != 'number') return false;
        if (userPlayers.length == 0) return false;
        return true;
      }
      else if (type == 'teams') {
        if (typeof(userTeams) != 'object') return false;
        if (typeof(userTeams.length) != 'number') return false;
        if (userTeams.length == 0) return false;
        return true;
      }  
    } 
    else {
      return false;
    }
  }  
}

function findX(el) {
  var x = 0;
  var obj = document.getElementById(el);
  while (obj.offsetParent) {
  x += obj.offsetLeft;
  obj = obj.offsetParent;
  }
  return x;
}
function findY(el) {
  var y = 0;
  var obj = document.getElementById(el);
  while (obj.offsetParent) {
  y += obj.offsetTop;
  obj = obj.offsetParent;
  }
  return y;
}

function Redirect(url) {
location.replace(url);
}

/*
  This will turn on the debugInfo area at the bottom of the page then append the message passed in.  The function will work if the 
	user is on dev or passes in a key value pair in the querystring where the key is debug with any value.
*/
function DebugInfo(message) {
    try {
        var args = GetArgs();
        if (typeof(args.debug) != "undefined" || location.hostname.indexOf("dmz.foxsports.com") != -1 || location.hostname.indexOf("dtn.foxsports.com") != -1) {
            document.getElementById("debugHeader").style.display = "block";
            var obj = document.getElementById("debugInfo");
            obj.style.display = "block";
            obj.innerHTML = "<li>" + message + obj.innerHTML;
        }
    }
    catch(e) {
    }
}

// used on story pages
var months = new Array ("Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec");
function formatDate(seconds) {
  var d = new Date(seconds * 1000);
  var y = d.getYear();
  var h = d.getHours();
  var m = d.getMinutes();
  var p;

  if (h >= 12) {
    p = "p.m.";
  } else {
    p = "a.m.";
  }
  if (h > 12) {
    h -=12;
  } else if (!h) {
    h = 12;
  }
  if (m < 10) {
    m = "0" + m;
  }
  if (y < 1000) {
    y += 1900;
  }
  return months[d.getMonth()] + " " + d.getDate() + ", " + y +
    " " + h + ":" + m + " " + p;
}

// Image swapping function
function imageSwap(imageName, imageSource) {
  // Don't do anything if images aren't supported in DOM
  if (document.images) {
    // Change the source of the image
    // Both of these are passed in the function arguments
    imageName.src = imageSource;
  }
}

function validate5DigitZIP(f) {
	var temp = '';
	var valid = "0123456789";
	var formZIP = f.zipcode.value;
	if (formZIP.length != 5) {
		alert("Please enter a 5 digit zip code.  Thank you.");
		return false;
	}
	for (var i=0; i < formZIP.length; i++) {
		temp = "" + formZIP.substring(i, i+1);
		if (valid.indexOf(temp) == "-1") {
			alert("Your zip code must be five numerals.  Please try again.");
			return false;
		}
	}
	return true;
}
				
//Generic Window Opener function
function openWin(winURL, winName, winWidth, winHeight) {
  var winTop = 25;
  var winLeft = 25;
  if (screen.availWidth <= 800) {
    var winLeft = screen.availWidth - winWidth;
  }
  if (arguments.length == 2) {  //open generic window
    var theWin = window.open(winURL, winName);
  }
  else { // open standard pop-up window with tool bars disabled  
    var theWin = window.open(winURL, winName, "width=" + winWidth + ",height=" + winHeight + ",top=" + winTop + ",left=" + winLeft + ",screenY=" + winTop + ",screenY=" + winLeft + ",toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=1,scrollbars=no");
  }
}

//Browser Bookmarking function
function addBookmark(){
  var bookmarkurl = document.URL;
  var bookmarktitle = document.title;
  if(window.sidebar){ // Firefox
    window.sidebar.addPanel(bookmarktitle, bookmarkurl,'');
  } else if(window.opera){ //Opera
    var a = document.createElement("A");
    a.rel = "sidebar";
    a.target = "_search";
    a.title = title;
    a.href = url;
    a.click();
  } else if(document.all){ //IE
    window.external.AddFavorite(bookmarkurl, bookmarktitle);
  }
}

//Flash Detection
if (typeof(requiredVersion)=="undefined") {
  var requiredVersion = 6;
}
var flash5Installed = false;
var flash6Installed = false;
var actualVersion = 0;
var useFlash = false;
if(IE && PC){
  document.writeln('<SCR' + 'IPT LANGUAGE=VBScript\>');
  document.writeln('on error resume next');
  document.writeln('flash6Installed  = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.6")))');
  document.writeln('If (flash6Installed) then');
  document.writeln('  flash5Installed  = True');
  document.writeln('Else');
  document.writeln('  flash5Installed  = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.5")))');
  document.writeln('End If');
  document.writeln('</SCR' + 'IPT\>');
}
function detectFlash() {
  if (navigator.plugins) {
    if (navigator.plugins["Shockwave Flash"]) {
      var flashDescription = navigator.plugins["Shockwave Flash"].description;
      //alert("Flash plugin description: " + flashDescription);
      var actualVersion = parseInt(flashDescription.charAt(flashDescription.indexOf(".") - 1));
    }
  }
  //alert("version detected: " + actualVersion);
  if (flash5Installed) {
    var actualVersion = 5;
  }
  if (flash6Installed) { 
    var actualVersion = 6;
  }
  if (actualVersion >= requiredVersion) {
    useFlash = true;
    var url = document.URL;
    if (url.indexOf("flash=0") != -1) useFlash = false; //debug code so user can add flash=0 to url string and see what the site looks like w/o flash
  }
}
detectFlash();

// Stuff for Plugin Detection
    // this is where we write out the VBScript for MSIE Windows
    var WM_startTagFix = '</';
    var msie_windows = 0;
    if ((navigator.userAgent.indexOf('MSIE') != -1) && (navigator.userAgent.indexOf('Win') != -1)){
        msie_windows = 1;
        document.writeln('<script language="VBscript">');
        document.writeln('\'This will scan for plugins for all versions of Internet Explorer that have a VBscript engine version 2 or greater.');
        document.writeln('\'This includes all versions of IE4 and beyond and some versions of IE 3.');
        document.writeln('Dim WM_detect_through_vb');
        document.writeln('WM_detect_through_vb = 0');
        document.writeln('If ScriptEngineMajorVersion >= 2 then');
        document.writeln('  WM_detect_through_vb = 1');
        document.writeln('End If');
        document.writeln('Function WM_activeXDetect(activeXname)');
        document.writeln('  on error resume next');
        document.writeln('  If ScriptEngineMajorVersion >= 2 then');
        document.writeln('     WM_activeXDetect = False');
        document.writeln('     WM_activeXDetect = IsObject(CreateObject(activeXname))');
        document.writeln('     If (err) then');
        document.writeln('        WM_activeXDetect = False');
        document.writeln('     End If');
        document.writeln('   Else');
        document.writeln('     WM_activeXDetect = False');
        document.writeln('   End If');
        document.writeln('End Function');
        document.writeln(WM_startTagFix+'script>');
    }

function WM_pluginDetect(plugindescription, pluginxtension, pluginmime, activeXname){
        //This script block will test all user agents that have a real plug-in array
        //(i.e. Netscape) and set the variables, otherwise it directs the routine
        // to WM_activeXDetect to detect the activeX control.
        // First define some variables
        var i,plugin_undetectable=0,detected=0, daPlugin=new Object();
        // Then we check to see if it's an MSIE browser that you can actually
        // check for the plugin in question.
        if (msie_windows && WM_detect_through_vb){
            plugin_undetectable = 0;
        } else {
            plugin_undetectable = 1;
        }
        // If it has a real plugins or mimetypes array, we look there for the plugin first
        if(navigator.plugins) {
            numPlugins = navigator.plugins.length;
            if (numPlugins > 1) {
                if (navigator.mimeTypes && navigator.mimeTypes[pluginmime] && navigator.mimeTypes[pluginmime].enabledPlugin && (navigator.mimeTypes[pluginmime].suffixes.indexOf(pluginxtension) != -1)) { // seems like we have it, let's just make sure and check the version (if specified)
                    if ((navigator.appName == 'Netscape') && (navigator.appVersion.indexOf('4.0') != -1)) { // stupid, stupid Netscape can't handle the references to navigator.plugins by number, sooo...
                        for(i in navigator.plugins) {
                            if ((navigator.plugins[i].description.indexOf(plugindescription) != -1) || (i.indexOf(plugindescription) != -1)) { // some versions of quicktime have no description. feh!
                                detected=1;
                                break;
                            }
                        }
                    } else {
                        for (i = 0; i < numPlugins; i++) {
                            daPlugin = navigator.plugins[i];
                            if ((daPlugin.description.indexOf(plugindescription) != -1) || (daPlugin.name.indexOf(plugindescription) != -1)) {
                                detected=1;
                                break;
                            }
                        }
                    }
                    // Mac weirdness
                    if (navigator.mimeTypes[pluginmime] == null) {
                        detected = 0;
                    }
                }
                return detected;
            } else if((msie_windows == 1) && !plugin_undetectable){
                return WM_activeXDetect(activeXname);
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }


//NFL PRO BOWL
function openBallot(url,width,height) {
 popupWin = window.open(url, name, "menubar=0,toolbar=0,location=0,directories=0,status=0,scrollbars=0,resizable=0,width=" +width +",height=" +height +",left=50,top=50");
}

// MLB.com gameday04
// new window launch
// usage: <a href="[url]" onclick="popWin(this,'[window_name]','[width]','[height]' {,'_optional_options'}); return false;" ... >
var _pw_l,_pw_t,_pw_z;
function popWin(url,n,w,h,o) {
  if (w>screen.availWidth-12) w=screen.availWidth-12;
  if (h>screen.availHeight-48) h=screen.availHeight-48;
  _pw_l=(screen.availWidth-w-12)/2;
  _pw_t=(screen.availHeight-h-48)/2;
  _pw_z=window.open(url,n,'width='+w+',height='+h+',left='+_pw_l+',top='+_pw_t+','+o);
}
function launchGameday(params) {
  var gamedayURL = 'http://mlb.mlb.com/mlb/gameday/gd2004.html?' + params;
  popWin(gamedayURL,'GamedayWin','770','600','location=no,menubar=no,scrollbars=no,status=no,toolbar=no,resizable=yes');
}

// retrieve arguments from url query string
function GetArgs() {
	var args = new Object();
	var query = location.search.substring(1);
	var pairs = query.split("&");
	for (var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('=');
		if (pos == -1) continue;
		var argname = pairs[i].substring(0,pos);
		var value = pairs[i].substring(pos+1);
		args[argname] = unescape(value);
	}
	return args;
}

// possible function if we center pages
function PositionElementsOnResize() {
	if (document.getElementById('ad300x250')) {
    var ad300x250 = document.getElementById('ad300x250');
    ad300x250.style.top = findY('ad300x250box');
    ad300x250.style.left = findX('ad300x250box');
	}
	if (document.getElementById('ad160x600')) {
    var ad160x600 = document.getElementById('ad160x600');
    ad160x600.style.top = findY('ad160x600box');
    ad160x600.style.left = findX('ad160x600box');
	}
}
window.onresize = PositionElementsOnResize;

// Called by the Point Roll AD Iframe to hide the AD.
function hidePointRoll() {
  //try {
		var adDiv = document.getElementById('advertLabel728x90');
		adDiv.style.display = "none";
                //parent.dap_Resize(document.body.id,1,1);
		//var iframes = adDiv.getElementsByTagName("IFRAME");
		//adDiv.removeChild(iframes[0]);
		//window.top.focus();
	//}
	//catch(e) {
//	}
}

// function used to display fantasy information
// this function will take the teamId and return the team name either linked or not linked.
function ff_dt(teamId, type) {	
	try {
		// need to find the correct league for the team id passed in.
		for (var i = 0; i < teamsInfo.length; i++) {
			 if (teamsInfo[i][0] == teamId) var teamName = teamsInfo[i][1];
		}
		if (arguments.length == 1) {
			var link = '<a href="http://msnfantasy.foxsports.com/nfl/commish/team/home?teamId=' + teamId + '">' + teamName + '</a>';
			return link;
		}
		if (arguments.length == 2 && arguments[1] == 0) {
			return teamName;
		}
	}
  catch(e) {
	  //do nothing
	}
}
function ff_dw_dt(teamId, type) {
	try {
		var teamName = teamsInfo[0][1];
		if (arguments.length == 1) {
			var link = '<a href="http://msnfantasy.foxsports.com/nfl/commish/team/home?teamId=' + teamId + '">' + teamName + '</a>';
			document.write(link);
			return;
		}
		if (arguments.length == 2 && arguments[1] == 0) {
			document.write(teamName);
			return;
		}
	}
  catch(e) {
	  //do nothing
	}
}

function ff_dg(leagueId, type) {
	try {
		for (var i = 0; i < teamsInfo.length; i++) {
			 if (teamsInfo[i][4] == leagueId) var leagueName = teamsInfo[i][5];
		}
		if (arguments.length == 1) {
			var link = '<a href="http://msnfantasy.foxsports.com/nfl/commish/league/home?leagueId=' + leagueId + '">' + leagueName + '</a>';
			return link;
		}
		if (arguments.length == 2 && arguments[1] == 0) {
			return leagueName;
		}
	}
  catch(e) {
	  //do nothing
	}
}

function ff_dw_dg(leagueId, type) {
	try {
		var leagueName = teamsInfo[0][5];
		if (arguments.length == 1) {
			var link = '<a href="http://msnfantasy.foxsports.com/nfl/commish/league/home?leagueId=' + leagueId + '">' + leagueName + '</a>';
			document.write(link);
			return;
		}
		if (arguments.length == 2 && arguments[1] == 0) {
			document.write(leagueName);
			return;
		}
	}
  catch(e) {
	  //do nothing
	}
}

function openRadioWindow() {
  var radioWindow = window.open("/radio/radioPlayer", "subwindow", "height=100,width=299");
}

/* BEGIN: [Tab Switch Function] */
function tabSwitch(me){
	me.className = me.className.replace("_off","_on"); // set the tab to "On"
	for(i=0; i<me.parentNode.childNodes.length; i++){  // cycle through the tags in the containing node of this anchor						
		if(me.parentNode.childNodes[i].title != me.title){ // look for everthing that isn't the anchor you just changed
		
			if(me.parentNode.childNodes[i].className == me.className){ // find the class name that matches the current class name
				me.parentNode.childNodes[i].className = me.parentNode.childNodes[i].className.replace("_on","_off"); // Turn them all "Off"
			}
			
			if(me.parentNode.childNodes[i].title == me.title+"_Data"){  // find the associated "Data" with the user picked (related by titles)
				me.parentNode.childNodes[i].style.display = "block"; // display the data
			}else if(me.parentNode.childNodes[i].title){ // find all of the other "Data" related to tabs
				
				if(me.parentNode.childNodes[i].title.search("_Data") != -1){ // filter out the one that matches the one the user picked
					me.parentNode.childNodes[i].style.display = "none"; // "hide" the other related data
				}	
			}			
		}
	}
}
/* END: [Tab Switch Function] */


/* BEGIN: [ Add This defaults} */
addthis_logo = 'http://msn.foxsports.com/fe/img/add_this_header.jpg';
addthis_brand = 'Fox Sports'; 	
addthis_options = 'myspace,live,ballhype,yardbarker,favorites,digg,delicious,google,facebook,reddit,newsvine,more';
/* END: [ Add This defaults} */		   



/* BEGIN: [Global Navigation Script] */
function rackEm(me){
	try{
	var navSec = document.getElementById(me); // get the nav
	var navUls = navSec.getElementsByTagName("ul"); // grab all of the list items
	for(i=0; i<navUls.length; i++){ // cycle throught the list items
		var node = navUls[i];								
		node.id=i; // set the id for the ul list items	
		node.parentNode.onmouseover=function(){
			this.className = this.className +' openNavParent';			
			this.childNodes[2].className = "openNav openNavImg";
		};
		node.parentNode.onmouseout=function(){
			this.className = this.className.replace(' openNavParent','');			
			this.childNodes[2].className = "";
			if(this.className == "openNavParent"){
				this.className ='';
			}
		};
		
		if(node.parentNode.nodeName == "LI"){				
			node.parentNode.childNodes[0].className=node.parentNode.childNodes[0].className +=" openNavImg";							
		}else{
			if(document.all){
				node.style.marginLeft = "-"+(Math.round(node.parentNode.offsetWidth))+"px";
			}else{
				node.style.marginLeft = "-"+(Math.round(node.parentNode.offsetWidth/navUls.length-10))+"px";
			}
		}	
	}
	}catch(e){alert("nav error: "+e.message);}
}
/* END: [Global Navigation Script] */


/* BEGIN: [Global Open Window Script]
	** Example on calling this function:
	** openNewWin(this, {url:"http://foxsports.com", scrollbars: "yes", name: "my_window"});
	** Using options, call what you want to change only.  Inside the function, defaults are set and explained. 
*/
function openNewWin(me, options){
	var options = options || {}; // options setup.
	var wUrl = options.url || null; // url for pop-up.  Default is null.
	var wName = options.name || "FS_Window"; // name for pop-up.  Default is "FS_Window".
	var wWidth = options.width || 800; // width of pop-up. Default is 800px;
	var wHeight = options.height || 600; // height of popup.  Default is 600px.
	var wTop = options.top || 25; // top position from the browser.  Default is 25px.
	var wLeft = options.left || 25; // left position form the browser. Default is 25px.
	var wToolbar = options.toolbar || "no"; // Whether or not to display the browser toolbar. Default is "no".
	var wLocation = options.location || "no"; // Whether or not to display the address field. Default is "no".
	var wDirectories = options.directories || "no"; // Whether or not to add directory buttons. Default is "no"
	var wStatus = options.status || "no"; // Whether or not to add a status bar. Default is "no".
	var wMenubar = options.menubar || "no"; // Whether or not to display the menu bar. Default is "no".
	var wResizable = options.resizable || "yes"; // Whether or not the window is resizable. Default is "yes".
	var wScrollbars = options.scrollbars || "no"; // Whether or not to display scroll bars. Default is "no".
	var wFullscreen = options.fullscreen || "no"; // Whether or not to display the browser in full-screen mode. Default is "no". A window in full-screen mode must also be in theater mode.
	var wChannelmode = options.channelmode || "no"; // Whether or not to display the window in theater mode. Default is "no".
	
	window.open(wUrl,wName,"width="+wWidth+",height="+wHeight+",top="+wTop+",left="+wLeft+",toolbar="+wToolbar+",location="+wLocation+",directories"+wDirectories+",status="+wStatus+",menubar="+wMenubar+",resizable="+wResizable+",scrollbars="+wScrollbars+",fullscreen="+wFullscreen+",channelmode="+wChannelmode);
}
/* END: [Global Open Window Script] */



/* BEGIN: [Number Randomizer v1]
	** Example on calling this function:
	** randomizeMe(this, {maxNumber: 10, exempt: [5, 6,7,8]});
	** The Randomizer randomly generate a number from 0 to the "maximumNumber" you pass it.  
	** If it comes across any exempt numbers, it will start the script over until it finds one that doesn't match the exempt.
*/
function randomizeMe(me, options){
	var options = options || {}; // setup the options
	var imExempt = options.exempt || null; // capture the exempt numbers
	var maxNum = options.maxNumber || 0; // capture the maximum number to randomize	
	var rand_no = Math.floor(Math.random()*maxNum); // run the random numbers
	
	if(imExempt != null){ // check to see if there are any exempt numbers
		imExempt = imExempt.toString(); // turn the exemptions into a string
		for(i=0; i<maxNum; i++){ // loop throught the set number
			if(imExempt.search(rand_no) != -1){ // check for exempt numbers			
				return randomizeMe(me, {exempt: imExempt, maxNumber: maxNum}); // start over 
				
			}
		}
	}
	
	return rand_no;// return the new random number
}
/* END: [Number Randomizer] */

/* BEGIN: [Odd/Even states]
	** Example on calling this function:
	** evenOdd("round_table", {even: "on", rollOverClass: "over"});
	** This will grab the table you set, cylce through it, set the even class (on) and set a rollover state for the table rows
*/
function evenOdd(me, options){
	var options = options || {}; // options setup.
	var roc = options.RollOverClass || null;
	var ec = options.Even || "on";
	var oc = options.odd || "off";
	var table = document.getElementById(me); // get the table		
	if(table.nodeName == "TABLE"){ // make sure a table is being passed
		var tBody = table.getElementsByTagName('tbody')[0];	// capture the table body
		var tableRows = tBody.getElementsByTagName("TR"); // capture all of the table rows in the table
		var trs = 0; // set the secondary holder
		for(var i=0; i<tableRows.length; i++){ // loop through all of the rows			
			/* odd / even selection */
			if(trs==1){ // check for even rows
				tableRows[i].className = ec; // set the class name to on
				trs = 0; // reset the trs to the odd state so next one is skipped
			}else{
				tableRows[i].className = oc; // set the class name to on
				trs=1;	// set the next one to even if an odd one is found
			}
			
			/* roll over class change */
			if(roc){ // check to see if a roll over class has been set
				tableRows[i].onmouseover=function(){ // set the onmouse over event
					this.className = this.className +' '+roc;	// add the class to the TR
				};
				tableRows[i].onmouseout=function(){ // set the onmouse out event
					this.className = this.className.replace(' '+roc,''); // remove the preset class						
					if(this.className == roc){ // remove the class set
						this.className =''; // remove the class set
					}
				};	
			}
		}
	}
}
/* BEGIN: [Odd/Even states] */