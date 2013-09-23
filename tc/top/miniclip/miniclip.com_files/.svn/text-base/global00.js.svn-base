// homepage animation stuff
var anim_current = 1;
var anim_info = new Array( 3 );
var anim_data = new Array( 3 );
var anim_link = new Array( 3 );
var anim_file = new Array( 3 );
var anim_path = new Array( 3 );

function $( idToGet ) { return document.getElementById( idToGet ); }

// initialize animation data
function anim_init() {

	// only do this if the animation is available
	if ( $( 'animList' ) == null ) { return false; }
	var animations	= $( 'animList' ).getElementsByTagName( 'li' );
	for( var y = 0; y < animations.length; y++ ) { anim_info[ y + 1 ] = animations[ y ]; }

	if ( $( 'animData' ) == null ) { return false; }
	animations	= $( 'animData' ).getElementsByTagName( 'li' );	
	for( var y = 0; y < animations.length; y++ ) { anim_data[ y + 1 ] = animations[ y ]; }

	animations	= $( 'animData' ).getElementsByTagName( 'a' );	
	for( var y = 0; y < animations.length; y++ ) { anim_path[ y + 1 ] = animations[ y ].href; }

	if ( $( 'animNumber' ) == null ) { return false; }	
	animations	= $( 'animNumber' ).getElementsByTagName( 'a' );
	for( var y = 0; y < animations.length; y++ ) {
		anim_link[ y + 1 ] = animations[ y ];
		filename = animations[ y ].href.split( "#" );
		anim_file[ y + 1 ] = filename[ 1 ]; 
		animations[ y ].href = "#";
	}

}

function anim_start() {
	anim_set( 1 );
}

// switch to next animation
function anim_next() {

	// make sure the animation can jump forward
	if ( $( 'animList' ) == null ) { return; }
	
	anim_current ++;

	if ( anim_current > 3 ) { anim_current = 1;	}

	anim_set();
	
}
	
// switch to previous animation
function anim_prev() {
	anim_current --;
		
	if ( anim_current < 1 ) { anim_current = 3; }
	anim_set();
}
	
function anim_set( anim_new ) {
	
	// if anim_new is set then change current anim
	if ( anim_new != null ) { anim_current = anim_new; }
	
	// check animation has loaded ok
	if( anim_info[ anim_current ] == null ) { return; }
	
	// loop through icon holders and set selected value 
	for( var y = 1; y <= 3; y++ ) {
		// if selected set class name else remove
		if ( y == anim_current ) {
				anim_info[ y ].className = "selected";
				anim_data[ y ].className = "selected";
				anim_link[ y ].className = "selected";
		} else {
				anim_info[ y ].className = "";
				anim_data[ y ].className = "";
				anim_link[ y ].className = "";
		}
	}
	
	if( $( "animHolder" ) != null ) {
	
		//alert( "frame not exist" );
		$( "animHolder" ).innerHTML = AC_FL_GetContent(
			'id', 'animation',
			'name', 'animation',
			'codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0',
			'width', '290',
			'height', '200',
			'quality', 'high',
			'bgcolor', '#ffffff',
			'menu', 'false',
			'allowscriptaccess', 'sameDomain',
			'pluginspage', 'http://www.macromedia.com/go/getflashplayer',
			'movie', '/resources/objects/flash',
			'wmode', 'transparent'
		);
		
		// loop through icon holders and set selected value 
		for( var y = 1; y <= 3; y++ ) {
			// if selected set class name else remove
			if ( y == anim_current ) {
					parent.anim_info[ y ].className = "selected";
					parent.anim_data[ y ].className = "selected";
					parent.anim_link[ y ].className = "selected";
			} else {
					parent.anim_info[ y ].className = "";
					parent.anim_data[ y ].className = "";
					parent.anim_link[ y ].className = "";
			}
		}
		
		
	} else {
	
		// loop through icon holders and set selected value 
		for( var y = 1; y <= 3; y++ ) {
			// if selected set class name else remove
			if ( y == anim_current ) {
					anim_info[ y ].className = "selected";
					anim_data[ y ].className = "selected";
					anim_link[ y ].className = "selected";
			} else {
					anim_info[ y ].className = "";
					anim_data[ y ].className = "";
					anim_link[ y ].className = "";
			}
		}
	
		//alert( "frame exist" );
		frames['animHolderFrame'].location.href = "animdata.php?anim=" + anim_current;
		
	}
	
	return false;

}

// player homepage animation
var player_current = 1;
var playersAnim_time = 0;
var player_info = new Array( 3 );
var player_link = new Array( 3 );
var player_file = new Array( 3 );

// initialize animation data
function player_init() {

	// only do this if the animation is available
	// player tab info
	if ( $( 'playerList' ) == null ) { return false; }
	var animations	= $( 'playerList' ).getElementsByTagName( 'li' );
	for( var y = 0; y < animations.length; y++ ) { player_info[ y + 1 ] = animations[ y ];	}
	
	// player id
	if ( $( 'playerNumber' ) == null ) { return false; }
	animations	= $( 'playerNumber' ).getElementsByTagName( 'a' );
	for( var y = 0; y < animations.length; y++ ) {
		player_link[ y + 1 ] 	= animations[ y ];
		filename 				= animations[ y ].href.split( "#" );
		player_file[ y + 1 ]	= filename[ 1 ]; 
		animations[ y ].href 	= "#";
		//alert( filename[ 1 ] + " : " + player_link[ y + 1 ] + " : " + player_info[ y + 1 ] );
		
		//alert( "frame not exist" );
		$( "playerHolder" ).innerHTML = $( "playerHolder" ).innerHTML + AC_FL_GetContent(
			'id', 'animation',
			'name', 'animation',
			'codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0',
			'width', '290',
			'height', '260',
			'quality', 'high',
			'bgcolor', '#ffffff',
			'menu', 'false',
			'allowscriptaccess', 'sameDomain',
			'pluginspage', 'http://www.macromedia.com/go/getflashplayer',
			'movie', '/resources/objects/flash',
			'wmode', 'transparent'
		);		
	}
	
	

}

function player_start() {

	player_set( 1 );
	
}

// switch to next animation
function player_next() {
	
	player_current ++;

	if ( player_current > 3 ) { player_current = 1;	}

	player_set();
	
}
	
// switch to previous animation
function player_prev() {

	player_current --;
		
	if ( player_current < 1 ) { player_current = 3; }
	
	player_set();
	
}
	
function player_set( player_new ) {
	
	// if anim_new is set then change current anim
	if ( player_new != null ) { player_current = player_new; }
	
	// check animation has loaded ok
	if( player_info[ player_current ] == null ) { return; }
	
	// loop through icon holders and set selected value 
	for( var y = 1; y <= 3; y++ ) {
		// if selected set class name else remove
		if ( y == player_current ) {
				player_info[ y ].className = "selected";
				player_link[ y ].className = "selected";
		} else {
				player_info[ y ].className = "";
				player_link[ y ].className = "";
		}
	}
	
	if( $( "playerHolder" ) != null ) {
		
		scrollPos = (player_current - 1) * 260;
		//alert( scrollPos );
		$( 'playerHolder' ).scrollTop = scrollPos;
		
		// loop through icon holders and set selected value 
		for( var y = 1; y <= 3; y++ ) {
			// if selected set class name else remove
			if ( y == player_current ) {
					parent.player_info[ y ].className = "selected";
					parent.player_link[ y ].className = "selected";
			} else {
					parent.player_info[ y ].className = "";
					parent.player_link[ y ].className = "";
			}
		}
		
		
	} else {
	
		// loop through icon holders and set selected value 
		for( var y = 1; y <= 3; y++ ) {
			// if selected set class name else remove
			if ( y == player_current ) {
					player_info[ y ].className = "selected";
					player_link[ y ].className = "selected";
			} else {
					player_info[ y ].className = "";
					player_link[ y ].className = "";
			}
		}
			
	}
	
	clearTimeout( playersAnim_time );
	playersAnim_time = setTimeout( "player_next();", 10 * 1000 );	
	
	return false;

}

/* LIST ALL GAMES */

//var req = getXMLHttpRequest();
function list_init(languageCountrycode, category) { //category = games, ecards, toons
	xml_loadXMLDoc('miniclip.com_files/full_games_list.php', xml_onReadyStateChange_list);
//	list_ready();
}

function list_ready() {

	if( $( 'gameList' ) == null ) { return; }
	
	if( document.forms[ 'jumpList' ] == null ) { return; }
	// list all games menu
	var games	= $( 'gameList' ).getElementsByTagName( 'a' );

	document.forms[ 'jumpList' ].jumpSelect.options[ 0 ] = new Option(  language[ 9 ], "" );

	var oCount = 1;
	for( var y = 0; y < games.length; y++ ) {
	
		jlText = "";
		jlText = games[ y ].innerHTML;
		jlText = jlText.replace( /&amp;/, "&" );
		jlText = jlText.replace( "<img src=\"/images/challenge_game.gif\" style=\"margin: 0pt 0pt 0pt 4px; vertical-align: middle;\">", "" );
		jlText = jlText.replace( "<IMG style=\"MARGIN: 0px 0px 0px 4px; VERTICAL-ALIGN: middle\" src=\"http://cms.miniclip.com/images/challenge_game.gif\">", "" );
		jlText = jlText.replace( "<IMG style=\"MARGIN: 0px 0px 0px 4px; VERTICAL-ALIGN: middle\" src=\"http://www.miniclip.com/images/challenge_game.gif\">", "" );
		jlText = jlText.replace(/^\s+|\s+$/g, ''); // trim
		
		if( jlText != "" ) {
			document.forms[ 'jumpList' ].jumpSelect.options[ oCount ] = new Option( jlText, games[ y ].href );
			oCount ++;
		}
		
	}
	
	document.forms[ 'jumpList' ].jumpSelect.onchange = function() {
		list_jump();
	}
		
	// grab cookies
	var list_display = cookie_read( 'list_display' );
		
	// no cookie so set default
	if ( list_display == null ) {
		
		cookie_create( "list_display", "1", 150 );
		list_display = 1;
			
	// hidden so hide stuff
	} else if( list_display == "0" ) {
	
		$( 'WrapperComplete' ).className = "hidden";
		$( 'listToggle' ).innerHTML = language[ 7 ];
	}
}

// show/ hide the list
function list_toggle() {

	// grab cookies
	var list_display = cookie_read( 'list_display' );
	
	// currently hidden so show
	if( list_display == "0" ) {
			
		$( 'WrapperComplete' ).className = "shown";
		$( 'listToggle' ).innerHTML = language[ 8 ];
		cookie_create( "list_display", "1", 150 );
		
	// else hide	
	} else {

		$( 'WrapperComplete' ).className = "hidden";
		$( 'listToggle' ).innerHTML = language[ 7 ];		
		cookie_create( "list_display", "0", 150 );
		
	}
		
}

function list_jump( list ) {

	if( list == null ) { list = "jumpList"; }

	var newIndex = document.forms[ list ].jumpSelect.selectedIndex;
	
	if ( newIndex != 0 ) { 

		url = document.forms[ list ].jumpSelect.options[ newIndex ].value;
		top.location = url; 

	} 

}

/* MORE MENU */

var more_displayed = false;

function more_display() {

	if ( more_displayed == true ) {
		$( 'moreNav' ).className = "hidden";
		more_displayed = false;
	} else {
		$( 'moreNav' ).className = "shown";
		more_displayed = true;	
	}
	
}

/* TOOLBAR */

var cookName = "minicliptoolbar_id";
var cookieGame = "minicliptoolbarsession";
var msg_noplace = "There is no space to add more Miniclips, use the \"Edit My Miniclips...\" function to make space for new games.";

var gameurl = new Array();
var gametit = new Array();

var Maxgame = ( gametit.length - 1 );

// Function to extract game information from cookie
function toolbar_list() {

	var mg = $( 'mg_miniclips' );
	
	if( mg == null ) { return; }
	
	var thecook = cookie_read( cookieGame );
	var output = "";
	
	if( thecook == null || thecook == "" ) {
	
		output = language[ 0 ];	
	
	} else {
	
		thecook.toString();
		
		var cookArray = thecook.split( "~" );

		for( var ig = 1; ig < 12; ig = ig + 2 ) {
			
			if ( ig < cookArray.length ) {

				var num = cookArray[ ig ].split( "^" );
				
				tidVal = $( 'tid_' + num[ 1 ] );
				
				if( tidVal != null ) {
					detail1 = tidVal.href;
					detail2 = tidVal.innerHTML;
		
					output = output + "<li><a href='javascript:toolbar_delete( " + num[ 1 ] + " );' class='toolbar_delete'><img src='http://images-vip.napmia.miniclip.com/images/button_delete.gif' alt='delete this miniclip' /></a><a href='" + detail1 + "'>" + detail2 +"</a></li>";
					//output = output + "<li><a href='" + detail1 + "'>" + detail2 +"</a></li>";
				}
			
			}
		}

	}

	mg.innerHTML = output;

}

function toolbar_update(){

	//var checkSystemForUpdate = checkSystem();

	//var url = "http://www.donotchangeme.com/?bar=minicliptoolbar&command=reloadbar";
	if (navigator.userAgent.indexOf("Gecko") == -1) {
		var url = "res://minicliptoolbar.dll/?bar=minicliptoolbar&command=reloadbar";
		//$( "iToolbar" ).src = url;
	}
}

function toolbar_refresh( full, addOrRemove, gameName ){

	var thecook = cookie_read( cookieGame );
	thecook = thecook.toString();
	
	if ( thecook.length > 5 ){
	
		toolbar_update();
		
		if ( full == 1 ){
		
			alert( msg_noplace );
			
		} else if( addOrRemove == "add" ){
		
			//alert( gameName + " has been added to My Miniclips. Click \"My Miniclips\" in the toolbar to use it!" );
			
		} else if( addOrRemove == "remove" ) {
		
			//alert( gameName + " " + language[ 1 ] );
				
		}
	
	}
	
}

function toolbar_add( thegameid, refresh_list ) {
	toolbar_update();

	var thecook = cookie_read( cookieGame );
	thecook.toString();
	
	gameName = $( "tid_" + thegameid ).innerHTML;

	// if game already exists...
	if ( thecook.indexOf( "^" + thegameid + "~" ) >= 0 ){
			
		alert( language[ 3 ] + " " + gameName + " " + language[ 2 ] );
		return;
									
	}
	
	var theline = "";
	
	if ( thecook.length < 5 ) {
	
		theline += "gm1^" + gameName + "~";
		theline += "ur1^" + thegameid + "~";
		
	} else {
	
		theline += "gm1^" + gameName + "~";
		theline += "ur1^" + thegameid + "~";
		theline += thecook;

	}
	
	countTheCook = thecook.split( "~" );
	toolbarcook = cookie_read( cookName );
	/*
	// too many miniclips and not enough toolbar space
	if ( ( countTheCook.length - 1 ) / 2 >= 6 && toolbarcook.length < 5 ) {
	
		language[ 10 ] = "test";
		
		if ( confirm( language[ 10 ] ) ) {
		
			//alert( "install toolbar ");
		
		}
		
	}
	*/

	cookie_create( cookieGame, theline, 20000 );
	
	toolbar_refresh( 0, "add", gameName );

	if( refresh_list == true ) { toolbar_list(); }
	
}

function toolbar_delete( gameID ) {
	var thecook = cookie_read( cookieGame );
	var theline = "";
	
	gameName = $( "tid_" + gameID ).innerHTML;
	
	thegames = thecook.split( "~" );

	for( i = 0; i < thegames.length - 2; i = i + 2 ) {

		// with the old code gameID could be 1 (3-foot-ninja) and it would delete any game with
		// a 1 in it. so i removed indexOf.. /andreas
		number = thegames[ i + 1 ].split( "^" );
		number = number[1];

		if (number == gameID) {
//		if( thegames[ i + 1 ].indexOf( gameID ) > -1 ) {
		
		} else {
		
			theline += thegames[ i ] + "~" + thegames[ i + 1 ] + "~";
		
		}
	
	}
	cookie_create( cookieGame, theline, 20000 );
	toolbar_refresh( 0, "remove", gameName );
	toolbar_list();

}

/* clear current page links */

function clearCurrentLink() {

    var a = document.getElementsByTagName( "A" );
    
    for( var i = 0; i < a.length; i++ ) {
        if( a[ i ].href == window.location.href.split( "#" )[ 0 ] ) {
		    a[ i ].className = a[ i ].className + " current";
		}
    }
}

/* RECENTLY PLAYED */
function recent_save() {

	// load existing recent games
	var recentgame = t_gameId;
	var recentlist = recent_load();
	var savedgames = 0;
	
	if( recentlist != null ) {
		var recentArray = recentlist.split( "|" );
		
		// loop through array
		for( i = 0; i < recentArray.length; i++ ) {
		
			// remove duplicates and crop list to recent 6
			if ( recentArray[ i ] != t_gameId && savedgames < 5 ) {
				recentgame = recentgame + "|" + recentArray[ i ];
				savedgames ++;			
			}
		}	
	}
	
	// save new list
	cookie_create( "recent_games", recentgame, 28 );
	
}

function recent_load() {

	// load recent games into array
	recentlist = cookie_read( "recent_games" );
	
	return recentlist;
	
}

function recent_write() {

	var mg_latest = $( "mg_latest" );
	
	if( mg_latest == null ) { return; }

	var recentlist = recent_load();
	var outputHTML = "<ul>";
	
	if( recentlist != null ) {
	
		var recentArray = recentlist.split( "|" );
		
		// loop through array
		for( i = 0; i <= recentArray.length; i++ ) {
		
			var gamelist = $( "tid_" + recentArray[ i ] );
			
			if ( recentArray[ i ] != 0 && gamelist != null ) {
			
				gamename = gamelist.innerHTML;
				gameurl = gamelist.href;

				outputHTML = outputHTML + "<li><a href=\"" + gameurl + "\">" + gamename + "</a></li>\n";
				
			}
					
		}
		
		outputHTML = outputHTML + "</ul>";
		
	} else {
		
		outputHTML = language[ 4 ];
		
	}
	
	mg_latest.innerHTML = outputHTML;
	
}

/* set homepage for IE */
function SetHomepage() {

	if ( document.all ){
		document.write( '<a href="javascript:history.go(0);" id="icon_blog" onClick="this.style.behavior=\'url(#default#homepage)\';this.setHomePage(\'http://www.miniclip.com/\');">' );
		document.write( language[ 5 ] + '</a>');
	}
	
}

function popProduct( productID ) {

	var url		= "http://www.miniclip.com/metacharge/www/index.php?id=" + productID;
	var width	= 440;
	var height	= 580;

	var args	= "width = " + width + ","
	    + "height=" + height + ","
	    + "resizable=0,"
	    + "scrollbars=0,"
	    + "statusbar=0,"
	    + "menubar=0,"
	    + "hotkeys=0,"
    	+ "titlebar=0";

   	popupWin = window.open( url, 'popupWin', args );
		
}

/* preview the games room */
function previewGamesRoom() {

	title = "Miniclip Games Room preview";
	widthVal = 600;
	heightVal = 280;
	       
    args="width = " + widthVal + ","
	+ "height=" + heightVal + ","
	+ "resizable=1,"
	+ "scrollbars=1,"
	+ "statusbar=1,"
	+ "menubar=1,"
	+ "hotkeys=0,"
	+ "titlebar=1";
    
	popupWin = window.open( '/games/gamesroom.htm', 'popupWin', args );
	popupWin.document.write( page_data );
	popupWin.document.close( );
	
	return false;
								
}
/* COOKIES */
	
function cookie_create( name, value, days ) {

	if ( days ) {
		var date = new Date();
		date.setTime( date.getTime() + ( days * 24 * 60 * 60 * 1000 ) );
		var expires = "; expires=" + date.toGMTString();
	} else {
		var expires = "";
	}
	
	document.cookie = name + "=" + value + expires + "; path=/";
}
	
function cookie_read( name ) {

	var nameEQ = name + "=";
	var ca = document.cookie.split( ';' );
		
	for( var i = 0; i < ca.length; i++ ) {
		var c = ca[i];
		while ( c.charAt(0) == ' ' ) c = c.substring( 1, c.length );
		if ( c.indexOf( nameEQ ) == 0 ) return c.substring( nameEQ.length, c.length );
	}
	
	return "";
	
}
	
function cookie_erase( name ) {
	createCookie( name, "", -1 );
}

/* CLIPBOARD ( IE only naturally ).. naturally?*/

function cb_init() {

	// check we're not in MSIE
	if ( navigator.appName != "Microsoft Internet Explorer" ) {
	
		// grab all the divs
		var divs = document.getElementsByTagName( "div" );
	
		// if a copy div replace content
	  	for( var i = 0; i < divs.length; i++ ) {
			var div = divs[ i ];
			
			// hide unusable buttons
			if ( div.className == "copyButton" ) {
	
				div.innerHTML = language[ 6 ];
				
			}
			
		}	
	}

}

function cb_copy( item ) {

	copied = item.createTextRange();
	item.focus();
	item.select();
	copied.execCommand("Copy");
	
}

/* GENERIC STUFF */
	
function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

function writeEmail( name ) {
 
	address = name + "&#64" + "miniclip.com";
	
	document.write( "<a href='mailto:" + address + "'>" + address + "</a>" );
  
}

function prerollCreateGame( pr_gamename, pr_gamewidth, pr_gameheight ) {

	// --------------------------------------------------------------------
	// create the code for a flash game, simple function that can be reused
	// --------------------------------------------------------------------

	str_return = "<object classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" codebase=\"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,29,0\" width=\"" + pr_gamewidth + "\" height=\"" + pr_gameheight + "\">";
	str_return = str_return + "<param name=\"movie\" value=\"" + pr_gamename + "\">";
	str_return = str_return + "<param name=\"quality\" value=\"high\">";
	str_return = str_return + "<param name=\"menu\" value=\"false\">";
	str_return = str_return + "<embed src=\"" + pr_gamename + "\" quality=\"high\" menu=\"false\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" type=\"application/x-shockwave-flash\" width=\"" + pr_gamewidth + "\" height=\"" + pr_gameheight + "\"></embed>";
	str_return = str_return + "</object>";

	$( "video_ad" ).innerHTML = str_return;

}


var xml_request = null;

// XML stuff..
function xml_getXMLHttpRequest() {
	var req = false;

    if(window.XMLHttpRequest) {
    	try {
			req = new XMLHttpRequest();
        } catch(e) {
			req = false;
        }
    } else if(window.ActiveXObject) {
       	try {
        	req = new ActiveXObject("Msxml2.XMLHTTP");
      	} catch(e) {
        	try {
          		req = new ActiveXObject("Microsoft.XMLHTTP");
        	} catch(e) {
          		req = false;
        	}
		}
    }
	return req;
}


// ready-function for list_init()
function xml_onReadyStateChange_list(e) {
    if (xml_request.readyState == 4) {
		var itemList = $('WrapperComplete');
		itemList.innerHTML = xml_request.responseText;
		list_ready();
		toolbar_list();
		recent_write();
    }
}

// ready-function for xml_tracker()
function xml_onReadyStateChange_tracker(e) {
	xml_debug('readystatechange: ' + xml_request.readyState);
    if (xml_request.readyState == 4) {
		xml_debug('done: ' + xml_url);
    }
}

function xml_loadXMLDoc(url, onReadyStateChange) {
	xml_request = xml_getXMLHttpRequest();
	if(xml_request) {
		xml_request.onreadystatechange = onReadyStateChange;
		try {
			xml_request.open("GET", url, true);
			xml_request.send(null);
		} catch(e) {
		}
	}
}

function xml_tracker(id) {
	var xml_url = 'http://www.miniclip.com/php/tracker/tracker.php?p=' + id + "&rand=" + Math.round(Math.random()*10000);
	xml_loadXMLDoc(xml_url, xml_onReadyStateChange_tracker);
}

// banner rotation

var rotatorList = new Array();

function rotator( idVal ) {

	this.id			= idVal;
	this.count		= -1;
	this.list		= new Array();
	this.link		= new Array();
	
	rotatorList.push( this );
	
	// update the rotation
	this.update		= function() {
	
		this.count ++;
		
		if( this.count >= this.list.length ) { this.count = 0; }
		
		$( this.id ).style.backgroundImage = "url( http://images-vip.napmia.miniclip.com/images/banners/324x76_" + this.list[ this.count ] + ".gif )";

		$( "link_" + this.id ).href	= this.link[ this.count ];				
		$( "link_" + this.id ).push	= this.list[ this.count ];
		$( "link_" + this.id ).onclick = this.click;
	
	}
	
	this.makeRandom = function() {
		this.count = Math.floor( Math.random() * this.list.length );
	}
	
	this.click		= function() {
		urchinTracker( "outgoing/push_" + this.push );
	}
	
	this.add		= function( image, url ) {
	
		this.list.push( image );
		this.link.push( url );

		//document.write( "<div style=\"display:block; height:76px; background-image:url( /images/banners/324x76_" + image + ".gif );\"></div>" );
	
	}
	
}

function playRandomGame() {

	randomNumber	= Math.ceil( document.forms[ 'jumpList' ].jumpSelect.options.length * Math.random() );
	url				= document.forms[ 'jumpList' ].jumpSelect.options[ randomNumber ].value;
	top.location	= url;

}

function rotatorUpdate() {

	// loop through all rotator objects and update them
	for( var y = 0; y < rotatorList.length; y++ ) {
		rotatorList[ y ].update();
	}

}

function initRotator() {

	rotatorUpdate();
	setInterval( "rotatorUpdate()", 10000 );
	
}

function animation_DoFSCommand( command, args ) { 
	
	if ( command == "nextAnim" ) { 
		anim_next();
	}
}


var BrowserDetect = {
	init: function () {
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			this.navigator = data[i].string;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};
BrowserDetect.init();
