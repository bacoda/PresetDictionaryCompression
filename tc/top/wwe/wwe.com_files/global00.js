if(typeof(Event) != 'undefined') {
	Event.onDOMReady(function() {WWE.fixSearch();});
}

if (typeof(WWE) == 'undefined') {
	WWE = function () {
		return {
			pageHelper: function () {

				// Links
				$$('#content a', '#footerCopyright a').each(function(link) {
					if (link.protocol === 'javascript:') {return};
					if (link.search.contains('view=wvx')) {return};
					
					// Video
					if (link.pathname.contains('content/media/video')) {
						link.onclick = function () {
							wwevideoplayer(this.href);
							return false;
						};
						return;
					}
					
					// Wallpapers
					if (link.pathname.contains('content/media/wallpapers')) {
						link.onclick = function () {
							popup(this.href, 700, 550);
							return false;
						};
						return;
					}
					
					// Mobile Assets
					if (link.pathname.match(/(content\/ringtones)|(content\/wallpaper)|(content\/polyringtones)|(content\/voicetones)/)) {
						link.onclick = function () {
							popupwebtrigger(this.href);
							return false;
						};
						return;
					}

					// Mobile Alerts
					if(link.pathname.contains('content/alerts')) {
						link.onclick = function () {
							popupmobilealerts(this.href);
							return false;
						};
						return;
					}
				});
				
				// Images
				$$('.content-body img[align]').each(function(image) {
					image.className = image.getAttribute('align');
				});
				
				// Tables
				$$('.content-body table').each(function(table) {
					if (table.getAttribute('class') || table.className) {
						return;
					}
					
					var rows = table.getElementsByTagName('tr');
					for (n=0; n<rows.length; n++) {
						rows[n].className = (n % 2)? 'odd': 'even';
					}
				});
			},
			
			fixSearch: function () {
				if ( $$('#wrapSearch form').length > 0 ) {
					Event.observe( $$('#wrapSearch form')[0], 'submit', function(e) {
						var searchField = $$('#wrapSearch input.search')[0];
						if( searchField.value == '' || searchField.value == 'Enter a search term...' ) {
							searchField.value = 'Enter a search term...';
							Event.stop(e);
						} 
					});
					
					Event.observe( $$('#wrapSearch input.search')[0], 'focus', function(e) {
						var searchField = $$('#wrapSearch input.search')[0];
						if(searchField.value == 'Enter a search term...') {
							searchField.value = '';
						}
					});
				}
			}	
		};
	}();
};

if (typeof(WWE.DoubleClick) == 'undefined') {
	WWE.DoubleClick = function() {
		var VERSION = '200803260008';
	
		// Private Variables
		var random = 0;
		var protocol = window.location.protocol;
		var server = 'ad.doubleclick.net';
		var networkID = 'N4675';
		var siteName = '';
		var zoneName = '';
		var keyValues = {};
		var tile = 1;
		var ads = [];

		// Private Methods
		function reset() {
			tile = 1;
			generateRandomNumber();
		}

		function generateRandomNumber() {
			var rn = new String(Math.random());
			random = rn.substring(2, rn.length);
		}

		function buildTag(size, type, dcopt ) {
			var tag = protocol + '//' + server + '/';
			if (type === 'adj' || type === 'adf') { tag += networkID + '/'; }
			tag += type + '/';
			tag += siteName + '/' + zoneName + ';';

			for (keyValue in keyValues) {
				if (typeof(keyValues[keyValue]) != 'string') {
					for (var i = 0; i < keyValues[keyValue].length; i++ ) {
						tag += keyValue + '=' + keyValues[keyValue][i] + ';';
					}
				} else {
					tag += keyValue + '=' + keyValues[keyValue] + ';';
				}
			}

			if (dcopt) { tag += 'dcopt=ist;'; }

			tag += 'tile=' + tile + ';';
			tile++;

			tag += 'sz=' + size + ';';
			tag += 'dcove=d;';
			tag += 'ord=' + random;

			return tag;
		}
		
		
		// Initialization 
		generateRandomNumber();
		
		// Public Methods
		return {
			setValues: function(values) {
				if (typeof(values.siteName) !== 'undefined') { siteName = values.siteName; }
				if (typeof(values.zoneName) !== 'undefined') { zoneName = values.zoneName; }
				if (typeof(values.keyValues) !== 'undefined') { keyValues = values.keyValues; }
			},
			
			addKeyValue: function(key,value) {
				if(typeof(keyValues[key]) === 'undefined') {
					keyValues[key] = value;
				} else if (typeof(keyValues[key]) === 'string') {
					keyValues[key] = [keyValues[key]];
					keyValues[key].push(value);
				} else {
					keyValues[key].push(value);
				}
			},

			renderAd: function(size, dcopt, type) {
				var dims = size.split('x');
				var width = dims[0];
				var height = dims[1];
				var type = type ? type : 'adj';
				
				var tag = buildTag(size,type,dcopt);

				switch (type) {
					case 'adi':
						document.write('<script type="text/javascript">');
						document.write('var adTag = "' + tag + ';dc_seed=";');
						document.write('</scr' + 'ipt>');
						break;
					case 'pfadx':
						document.write('<script type="text/javascript">');
						document.write('var introclip = "' + tag + '";');
						document.write('</scr' + 'ipt>');
						break;
					case 'adf':
						ads.push({id:'galAd'+size, type:type, size:size, dcopt:dcopt});
						
						document.write('<iframe id="galAd' + size + '" src="' + tag + '" border="0" frameborder="0" width="' + width + '" height="' + height + '" scrolling="no"></iframe>');
						break;
					default:
						document.write('<script type="text/javascript" src="wwe.com_files/default_' + width + 'x' + height + '.js"></scr' + 'ipt>');
						break;
				}
				
			},
			getZoneName: function() {
				return zoneName;
			},
			reloadAds: function() {
				reset();

				ads.each(function(ad) {
					var tag = buildTag(ad.size,ad.type,ad.dcopt);
					$(ad.id).contentWindow.location.replace(tag);					
				});
			}
		};
	}();
}



// Jumpstart Automotive
if (typeof(WWE.Ads) == 'undefined') WWE.Ads = {};

if (typeof(WWE.Ads.Jumpstart) == 'undefined') {
	WWE.Ads.Jumpstart = function() {
		if(typeof(Event) != 'undefined') {
			Event.onDOMReady(function() {
				var trys = 0;
				
				new PeriodicalExecuter(function(pe) {
					if (trys == 10) {
						pe.stop();
					}
					
					if ((typeof(rsinetsegs) != 'undefined')) {
						pe.stop();
	
						if (rsinetsegs.length > 0) {
							sessionData.btSegs = rsinetsegs;
						}
						sessionData.store();
					}
					
					trys++;
				}, 1);
			});
		}

		return {
			addKeyValues: function () {
				if (sessionData.btSegs) {
					sessionData.btSegs.split(',').each(function(s, index) {
						WWE.DoubleClick.addKeyValue('btseg',s);				
					});
				}
			}
		};
	}();
}

function base64_encode(str) {
	map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var ret = "";
	var c, i, acc = 0;
	var div = 1;
	for(i=0,c=0;i<str.length;i++,c++) {
		acc = acc*256 + str.charCodeAt(i);
		div = div*4;
		ret = ret + map.charAt(parseInt(acc/div));
		acc = acc % div;
		if(div==64) {
			ret = ret + map.charAt(parseInt(acc));
			acc = 0;
			div = 1;
			c++;
		}
		if(c>=75) {
			c=-1;
			ret = ret + "\n";
		}
	} if(i%3) {
		ret = ret + map.charAt(parseInt(acc*((i%3==1)?16:4)));
		ret = ret + ((i%3)==1?"==":"=");
	}
	return ret;
}

WWE.Cookie = function(document, name, hours, path, domain, secure) {
	this.$document = document;
	this.$name = name;
	if (hours) {
		this.$expiration = new Date((new Date()).getTime( ) + hours*3600000);
	} else {
		this.$expiration = null;
	}
	if (path) this.$path = path; else this.$path = null;
	if (domain) this.$domain = domain; else this.$domain = null;
	if (secure) this.$secure = true; else this.$secure = false;
}

WWE.Cookie.prototype = {
	store: function() {
		var cookieval = "";
		for(var prop in this) {
			if ((prop.charAt(0) == '$') || ((typeof this[prop]) == 'function') || (prop == '')) continue;
			if (cookieval != "") cookieval += '&';
			cookieval += prop + ':' + escape(this[prop]);
		}
	
		var cookie = this.$name + '=' + cookieval;
		if (this.$expiration) cookie += '; expires=' + this.$expiration.toGMTString();
	    if (this.$path) cookie += '; path=' + this.$path;
	    if (this.$domain) cookie += '; domain=' + this.$domain;
	    if (this.$secure) cookie += '; secure';
	
	    this.$document.cookie = cookie;
	},
	load: function() {
		var allcookies = this.$document.cookie;
		if (allcookies == "") return false;
	
		var start = allcookies.indexOf(this.$name + '=');
		if (start == -1) return false;
		start += this.$name.length + 1;
		var end = allcookies.indexOf(';', start);
		if (end == -1) end = allcookies.length;
		var cookieval = allcookies.substring(start, end);
	
		var a = cookieval.split('&');
		for(var i=0; i < a.length; i++) {
			a[i] = a[i].split(':');
		}
	
		for(var i = 0; i < a.length; i++) {
			this[a[i][0]] = unescape(a[i][1]);
		}
	
		return true;
	},
	remove: function() {
		var cookie;
		cookie = this.$name + '=';
		if (this.$path) cookie += '; path=' + this.$path;
		if (this.$domain) cookie += '; domain=' + this.$domain;
		cookie += '; expires=Fri, 02-Jan-1970 00:00:00 GMT';
	
		this.$document.cookie = cookie;
	},
	sso: function() {
		sso();
	}
}

function sso() {

	if (visitordata.user && visitordata.email) {
		$("sso").update('Welcome '+visitordata.email+'! <span class="signin">[Not you? <a href="https://secure.wwe.com/signout.php">Sign Out</a> | <a href="https://secure.wwe.com/profile/view.php">My Account</a> ]</span>');
	} else {
		$("sso").update('Official site of World Wrestling Entertainment! <span class="signin">[<a href="https://secure.wwe.com/wwe.php?cid=signin_link">Sign In</a>]</span>');
	}

	if (window.location.host != 'secure.wwe.com') visitordata.url = base64_encode(location.href);

	visitordata.store();
}

function popup(url, width, height, resizable, location, statusbar, menubar, toolbar, scrollbars) {
	if (!width || !height) {
		// open a full browser window
		window.open(url);
	} else {
		// open a popup with options
		var day = new Date();
		var id = day.getTime();

		var params = '';

		if (!width) width = 0;
		if (!height) height = 0;
		if (!resizable) resizable = 0;
		if (!location) location = 0;
		if (!statusbar) statusbar = 0;
		if (!menubar) menubar = 0;
		if (!toolbar) toolbar = 0;
		if (!scrollbars) scrollbars = 0;

		if (height >= (window.screen.availHeight - 40)) {
			height = window.screen.availHeight - 40;
			width = width + 20;
			scrollbars = 1;
		}

		if (width >= (window.screen.availWidth - 20)) {
			width = window.screen.availWidth - 20;
			scrollbars = 1;
		}

		params += 'width=' + width + ',';
		params += 'height=' + height + ',';
		params += 'resizable=' + resizable + ',';
		params += 'location=' + location + ',';
		params += 'statusbar=' + statusbar + ',';
		params += 'menubar=' + menubar + ',';
		params += 'toolbar=' + toolbar + ',';
		params += 'scrollbars=' + scrollbars + ',';

		window.open(url, id, params);
	}
}


function wwevideoplayer(path, type, parent) {
	if (typeof(type) == 'undefined') {
		if (path.contains('/content/media/video/jukebox/')) {
			type = 'noskin';
		} else {
			type = 'general';
		}
	}

	var zone = '?zone=' + WWE.DoubleClick.getZoneName();

	switch(type) {
		case 'noskin':
			window.location = path + '?view=wvx&speed=300';
			break;
		default:
			popup(path + zone, 800, 650);
			break;
	}
}



function silverlightpopup() {
	var url = '/silverlightv1/videoplayer.html';

	var slFrame = '<div id="overlay" style="display:none"></div>';
	slFrame += '<div id="box" style="background-color: #000000;background-image: none;display: none">';
	slFrame += '<div id="boxContents"><iframe id="lbFrame" name="sl" width="800" height="525" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" src="' + '"></iframe></div>';
	slFrame += '</div><!-- End: box -->';

	Lightbox.initFrame(slFrame);
	Lightbox.showBoxByIFrame(url, 800, 525);
}

function wweallvideos() {
	if (window.opener && !window.opener.closed) {
		window.opener.location.href='/broadband/';
		window.close();
	} else {
		window.location.href='/broadband/';
	}
}

function wweecwxstream() {
	if (window.opener && !window.opener.closed) {
		window.opener.location.href='/shows/ecw/ecwreplay/';
		window.close();
	} else {
		window.location.href='/shows/ecw/ecwreplay/';
	}
}

var currentYear = null;

function showTable(year,tableName) {
	document.getElementById(tableName+"-"+currentYear).className = tableName+" hide";
	document.getElementById(tableName+"-"+year).className = tableName+" show";
	document.getElementById(tableName+"-menu-"+currentYear).className = "";
	document.getElementById(tableName+"-menu-"+year).className = "selected";
	currentYear = year;
}

// Setup Global Cookie
var host;
if (window.location.host.toString() != 'localhost') host = '.wwe.com';
var visitordata = new WWE.Cookie(document, ".visitor", 24*356, '/', host);
if (!visitordata.load()) visitordata.store();

// WWE Session Cookie
var sessionData = new WWE.Cookie(document, ".session", null, '/', host);
if (!sessionData.load()) sessionData.store();



// opens the wwe media player with automatic wvx
function popwwevideo1 (advert, wmv, title, show, speed) {
	var url ="/common/video/pop_wwevideo.jsp?advert=" + advert +  "&wmv=" + wmv + "&title=" + title + "&show=" + show + "&speed=" + speed + '&section=' + encodeURIComponent(window.location.pathname);
	popup(url,700,515);
}

// opens the wwe jukebox player
function popwwejukebox (date, path) {
	return popupjukebox (date, path);
}

function popupjukebox (date, path) {
	switch (date) {
		case '200501':
			window.location.replace('/subscriptions/247online/mostrequested/');
			break;
		case '200411':
			window.location.replace('/subscriptions/247online/shawnmichaels/');
			break;
		case '200410':
			window.location.replace('/subscriptions/247online/hulkhogan/');
			break;
		case '042005':
			window.location.replace('/subscriptions/247online/divas/');
			break;
		case '032005':
			window.location.replace('/subscriptions/247online/wrestlemania/');
			break;
		case '022005':
			window.location.replace('/subscriptions/247online/february/');
			break;
		default:
			break;
	}
}

// opens the wwe photo gallery
function popupgallery (url) {
	popup(url,351,438);
}


/************* Start Splash Bubble Code ********************/

var max = 0;
var timeout = null;
var splashDivArray = null;
var previousIndex = 0;
var nextIndex = 0;
var currentDOMObject;
var nextDOMObject;
var firstTime=true;
var insertionIndex = 0;
var currentDiv = null;
var nextDiv = null;
var debug = false;
var disabled = false;
var firstMove = true;
var isPlaying = false;
var pauseButton = null;
var playButton = null;
var buttonsvisible = false;

/************* Player Controls ********************/

function wweplay(){
	if(disabled){
		if(debug){
			alert('play called on disabled player');
		}
		return;
	}

	if(firstTime){
		init();
	}else{
		if(isPlaying){
			progressIndices();
		}

		resetDivs();
		showNextDiv();
	}

	divTimeout();

	if(!isPlaying){
		togglePausePlay();
	}
	if(!buttonsvisible){
		wweshowButtons();
	}
}

function wweshowButtons(){
	var buttons = document.getElementById("buttons1");
	buttons.style.display="inline";
	buttonsvisible = true;

}

function wwepause(){
	if(disabled){
		if(debug){
			alert('pause called on disabled player');
		}
	return;
	}

	if(timeout != null){
		window.clearTimeout(timeout);
		timeout = null;
		firstMove=true;
		if(isPlaying){
			togglePausePlay();
		}
	}
}

function wweback(){
	if(disabled){
		if(debug){
			alert('back called on disabled player');
		}
		return;
	}

	wwepause();
	regressIndices();
	resetDivs();
	showNextDiv();
}

function wweforward(){
	if(disabled){
		if(debug){
			alert('forward called on disabled player');
		}
		return;
	}

	wwepause();
	progressIndices();
	resetDivs();
	showNextDiv();

}

function init(){
	firstTime=false;
	resetDivs();
	getPausePlayButtons();
}

/**************************** Splash Helper Functions ***************************/
function addSplashDiv(splashDiv){
	splashDivArray[insertionIndex] = splashDiv;
	insertionIndex++;
}

function getPausePlayButtons(){
	pauseButton = document.getElementById("pause");
	playButton = document.getElementById("play");
}

function togglePausePlay(){
	if(!isPlaying){
		pauseButton.style.display="inline";
		playButton.style.display="none";
		isPlaying = true;
	}else{
		playButton.style.display="inline";
		pauseButton.style.display="none";
		isPlaying = false;
	}
}

function progressIndices(){
	previousIndex = nextIndex;
	if((previousIndex + 1) < max){
		nextIndex = previousIndex + 1;
	}else{
		nextIndex = 0;
	}
}

function resetDivs(){
	nextDiv = splashDivArray[nextIndex];
	previousDiv = splashDivArray[previousIndex];
}

function divTimeout(){
	var delay = nextDiv.delay;
	if(isNaN(delay)){
		if(debug){
			alert('delay for timeout is not a number');
		}
		disable();
		return;
	}

	timeout = window.setTimeout("wweplay()",delay);
}

function regressIndices(){
	previousIndex = nextIndex;

	if((previousIndex - 1) >= 0){
		nextIndex = previousIndex - 1;
	}else{
		nextIndex = max -1;
	}
}

function showNextDiv(){
	var previousDivSortOrder = previousDiv.sortOrder;
	var nextDivSortOrder = nextDiv.sortOrder;

	if(isNaN(previousDivSortOrder) || isNaN(nextDivSortOrder)){
		if(debug){
			alert('sort order returned by div is not a number');
		}
		disable();
		return;
  	}

  	previousDOMObject = document.getElementById("bubble_left_" + previousDivSortOrder);
  	nextDOMObject = document.getElementById("bubble_left_" + nextDivSortOrder);

  	if(previousDOMObject == null || nextDOMObject == null){
  		if(debug){
  			alert('unable to retrieve one of the DOM Objects');
  		}
  		disable();
  		return;
  	}

    previousDOMObject.className = "left offscreen";
    nextDOMObject.className = "left";
}

function disable(){
	disabled = true;
	if(timeout != null){
		window.clearTimeout(timeout);
	}
}

/************************* Helper Object Encapsulates properties for each Div*******************/

function splashDiv(delay,sortOrder){
	var defaultDelay = 3;
	if(delay == "-1"){
		delay = defaultDelay;
	}

	this.delay = delay * 1000;
	this.sortOrder = sortOrder;
}

function countrySelect(country) {
	visitordata.country = country;
	visitordata.store();
	document.location.href='?country='+country;
}

/*** Start WWE Mobile ***/
	function popupwebtrigger(url) {
		var separator = queryStringSeparator(url);
        var lightboxtext = '<div id="overlay" style="display:none"></div><div id="box" style="display: none"><div id="boxNav"><img id="logo" src="/images/common/lightbox/mobile.gif" alt="w mobile" /><img id="close" src="/images/common/lightbox/x_close.gif" onclick="Lightbox.hideBox()" alt="Close" title="Close this window" /></div><!-- End: boxNav --><div id="boxContents"><iframe id="lbFrame" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" width="100%" height="380" src=""></iframe></div></div><!-- End: box -->';		
		Lightbox.initFrame(lightboxtext);
		Lightbox.showBoxByIFrame(url + separator + 'heir=' + encodeURIComponent(s.hier1), 630, 380);
		return false;
	}

	function popupmobilealerts(url) {
		var separator = queryStringSeparator(url);
        var lightboxtext = '<div id="overlay" style="display:none"></div><div id="box" style="display: none"><div id="boxNav"><img id="logo" src="/styles/v4/images/mobile/mobileAlerts.gif" width="273" height="47" alt="Mobile Alerts" /><img id="close" src="/images/common/lightbox/x_close.gif" onclick="Lightbox.hideBox()" alt="Close" title="Close this window" /></div><!-- End: boxNav --><div id="boxContents"><iframe id="lbFrame" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" width="100%" height="380" src=""></iframe></div></div><!-- End: box -->';
		Lightbox.initFrame(lightboxtext);
		Lightbox.showBoxByIFrame(url + separator + 'heir=' + encodeURIComponent(s.hier1), 630, 380);
		return false;
	}

	function queryStringSeparator (url) {
		if (url.indexOf('?') > -1) {
			return "&";
		} else {
			return "?";
		}
	}
/*** End WWE Mobile ***/

/*** Start WWE Premium ***/
function getpremiumCookie (name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return '';
		} else {
			begin += 2;
		}
	var end = document.cookie.indexOf(";", begin);
	if (end == -1) {
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}

var wwereturner = location.protocol + '//' + location.host + location.pathname;
/*** End WWE Premium ***/

function silverlightpopup() {
	var url = '/silverlightv1/videoplayer.html';

	var slFrame = '<div id="overlay" style="display:none"></div>';
	slFrame += '<div id="box" style="background-color: #000000;background-image: none;display: none">';
	slFrame += '<div id="boxContents"><iframe id="lbFrame" name="sl" width="800" height="525" frameborder="0" scrolling="no" marginwidth="0" marginheight="0" src="' + '"></iframe></div>';
	slFrame += '</div><!-- End: box -->';

	Lightbox.initFrame(slFrame);
	Lightbox.showBoxByIFrame(url, 800, 525);
}

function breakingNewsLightbox() {
	var html = '<div id="overlay" onclick="Lightbox.hideBox()" style="display:none"></div>';
	html += '<div id="box" style="background-color: #000000;background-image: none;display: none">';
	html += '<div id="boxContents"><iframe id="lbFrame" name="sl" width="624" height="364" frameborder="0" scrolling="no" marginwidth="0" marginheight="0"></iframe></div>';
	html += '</div>';

	Lightbox.initFrame(html);
	Lightbox.showBoxByIFrame('/breakingnews/', 624, 364,$$('.tout.promo.splash .tout-box')[0]); //, 
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
	return this.replace(/^\s+/g,"");
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/g,"");
}
String.prototype.contains = function(t) {
	return this.indexOf(t) >= 0;
}

if (typeof(WWE.Touts) == 'undefined') WWE.Touts = {};

WWE.Touts.NewsTout = function(){
	
	// NewsTout settings
	var settings = sessionData;
	if (!settings.load()) settings.store();
					
	//Private methods
	function _getDifferenceFromNow(dateToConvert){
		var now = new Date();
		var difference = now.getTime() - dateToConvert.getTime();
		return difference;
	}
	
	function _createDate(milliseconds){
		var newDate = new Date();
		newDate.setTime(milliseconds);
		var offsetMillis = newDate.getTimezoneOffset();

		var dateMillis = newDate.getTime();

		var now = new Date();
		now.setTime(offsetMillis + dateMillis);

		return now;
	}
	
	function _getDifferenceText(difference){
		if(difference <= 0){
			return "in the future";
		}
	
		var minutes = Math.round(difference/1000/60);
		if(minutes <=59){
			mp = (minutes > 1) ? 's' : '';
			return minutes + ' minute' + mp + ' ago';
		}
		
		var minutesExcess = minutes %60;
		minutes = minutes - minutesExcess;
		var hours = minutes/60;
		if(hours <=23){
			hp = (hours > 1) ? 's' : '';

			if(minutesExcess > 0){
				mp = (minutesExcess > 1) ? 's' : '';
				return hours + " hour" + hp + ", " + minutesExcess + " minute" + mp + " ago";
			}else{
				return hours + " hour" + hp + " ago";
			} 
		}
		
		var hoursExcess = hours % 24;
		hours = hours - hoursExcess;
		var days = hours/24;
		var dp = (days > 1) ? 's' : '';			
		if(hoursExcess > 0){
			hp = (hoursExcess > 1) ? 's' : '';
			return days + " day" + dp + ", "  + hoursExcess + " hour" + hp + " ago";
		}else{
			return days + " day" + dp + " ago";
		}
	}
		
	//Public methods
	return {
		init: function(ulid, btnRss) {
			this.tabids = (btnRss) ? $(ulid).childElements().without($('btnExpand'), $('btnList'), btnRss).pluck('id').invoke('substring','3') : $(ulid).childElements().without($('btnExpand'), $('btnList')).pluck('id').invoke('substring','3');
			this.tabs = new Array();
			this.tabids.each(function(i) {
				this.tabs.push({id:i,type:$$('#div' + i + ' ul').pluck('className'),count:$$('#div' + i + ' ul li').length});
			}.bind(this));
			this.fixDates();
			this.loadSettings();
			this.select((typeof(settings.tab) != 'undefined') ? settings.tab : this.tabs[0].id);
		},
		loadSettings: function() {
			if(settings.size) {
				var remove = ['collapse','expand'].without(settings.size)[0];
				var addclass = settings.size;
				this.tabs.each(function(i) {
					if (settings.size == 'collapse') {
						addclass = (i.type == 'media') ? 'collapsemedia' : 'collapsenews';
					} else {
						remove = (i.type == 'media') ? 'collapsemedia' : 'collapsenews';
					}
					if (addclass == 'expand' && i.count > 12) 
						$('div'+i.id).removeClassName(remove).addClassName(addclass);
				});
				if (settings.size == 'expand') this.toggleCollapseExpandButton();
			}
			
			if(settings.view) {
				var remove = ['news','media'].without(settings.view)[0];
				this.tabs.each(function(i) {
					if(i.type == 'media') {
						var div = $('div' + i.id);
						var ul = $$('#div' + i.id + ' ul')[0];
						
						(settings.view == 'media') ? div.removeClassName('collapsenews').addClassName('collapsemedia') : div.removeClassName('collapsemedia').addClassName('collapsenews');
						$(ul).removeClassName(remove).addClassName(settings.view);
					}
				}.bind(this));

				if (settings.view == 'news') this.toggleListGridButton();
			} 
		},
		select: function(tab) {
			var type = '';
			this.tabs.each(function(i) {
				if (i.id != tab) {
					$('div' + i.id).hide();
					$('tab' + i.id).removeClassName('selected').addClassName('unselected');
				} else {
					type = i.type;
					count = i.count;
				}
			});

			//hide/show the list/grid button 
			(type == 'news') ? $('btnList').hide() : $('btnList').show();
			//hide/show the expand button
			(count < 13) ? $('btnExpand').hide() : $('btnExpand').show();
			$('div' + tab).show();
			$('tab' + tab).removeClassName('unselected').addClassName('selected');
			settings.tab = tab;
			settings.store();
		},
		toggle: function(action) {
			if (action === 'size') {
				this.toggleCollapseExpandButton();
				this.tabs.each(function(i) {
					if (i.count > 12) {
						var classname = $('div'+i.id).classNames().toArray()[0];
 
 						if (classname.indexOf('collapse') > -1) {
							$('div'+i.id).removeClassName(classname).addClassName('expand');
							size = 'expand';
						} else {
							if ($$('#div' + i.id + ' ul')[0].hasClassName('news')) {
								addclass = 'collapsenews';
							} else {
								addclass = 'collapsemedia';
							}
							$('div'+i.id).removeClassName(classname).addClassName(addclass);
							size = 'collapse';
						}
						settings.size = size;
					}
					settings.store();						
				});
			}
			
			if (action === 'view') {
				this.toggleListGridButton();
									
				this.tabs.each(function(i) {
					if(i.type == 'media') {
						var div = $('div' + i.id);
						var ul = $$('#div' + i.id + ' ul')[0];
						
						if ($(ul).hasClassName('news')) {
							$(ul).removeClassName('news').addClassName('media');
							if (div.hasClassName('collapsenews')) div.removeClassName('collapsenews').addClassName('collapsemedia');
							settings.view = 'media';
						} else if ($(ul).hasClassName('media')) {
							$(ul).removeClassName('media').addClassName('news');
							if (div.hasClassName('collapsemedia')) div.removeClassName('collapsemedia').addClassName('collapsenews');
							settings.view = 'news';
						}
						settings.store();
					}
				});
			}
		},
		toggleListGridButton: function() {
			//toggle list/grid button and save state
			if($('btnList').hasClassName('list')) {
				$('btnList').removeClassName('list').addClassName('thumb');
				$$('li#btnList a')[0].writeAttribute('title','Grid View');
			} else {
				$('btnList').removeClassName('thumb').addClassName('list');
				$$('li#btnList a')[0].writeAttribute('title','List View');
			}
		},	
		toggleCollapseExpandButton: function() {
			if($('btnExpand').hasClassName('collapse')) {
				$('btnExpand').removeClassName('collapse').addClassName('expand');
				$$('li#btnExpand a')[0].writeAttribute('title','View More');
			} else {
				$('btnExpand').removeClassName('expand').addClassName('collapse');
				$$('li#btnExpand a')[0].writeAttribute('title','View Less');
			}
		},			
		fixDates: function() {
			$$('span.publishedDate').each(function(pubdate) {
				var inputDate = _createDate(pubdate.innerHTML);
				var difference = _getDifferenceFromNow(inputDate);
				pubdate.update(_getDifferenceText(difference));
			});
		}
	};
}();
