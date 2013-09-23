/* jason - for app icons on profile_jsp */
var loadTips = function() {
  window.addEvent('load', function (e) {
    new Tips($$('.fixed_tip'), {
      showDelay: 100,
      hideDelay: 100,
      fixed: true
    });
  });
}
/* end fixed tips */

/* begin scroll to apps - jason */
var scroll = new Fx.Scroll(window, {
  wait : false,
  duration : 1000,
  offset: {'y': -50},
  transition: Fx.Transitions.Cubic.easeOut
});
var scrollToApp = function(id, profileMemberId) {
   if ($defined($(id))) {
      BeboModule.show(id, profileMemberId, false);
      scroll.toElement(id);
   } else {
      //ajax
      var url = "/c/apps/get_app_content?ProfileMemberId=" + profileMemberId + "&AppId=" + id + "&AsProfileModule=Y&Display=N";
      new Ajax(url, {
         method: 'get',
         evalScripts : true,
         onComplete: function (resp) {
           var e = new Element('div');
           e.setHTML(resp);
           var profileModule = e.getFirst();
           profileModule.injectBefore($('Comment'));
           scroll.toElement(profileModule.id);
           BeboModule.show(profileModule.id, profileMemberId, false);
         }
     }).request();
   }
}
/* end scroll to apps */

/* rounding */
var roundingComplete=false;
$(window).addEvent("domready",function() {
  if(roundingComplete==true)
    return;

  $$('.round').each(function(el) {
    round(el);
  });

  roundingComplete = true;
});

function round(el) {
  var top = new Element('b', {'class':'rtop'});
  var bottom = new Element('b', {'class':'rbottom'});
  top.innerHTML = '<b class="r1"></b> <b class="r2"></b> <b class="r3"></b> <b class="r4"></b>';
  bottom.innerHTML = '<b class="r4"></b><b class="r3"></b><b class="r2"></b><b class="r1"></b>';

  top.injectTop(el);
  bottom.injectInside(el);
}
/* rounding: END */

/* ad placment */

var adMoveTimer = null;  // will hold reference to interval that checks for new ad content

// this code moves ads rendered at the end of the document to the spot in the page where they belong
function _moveAd( startNode, destinationNode, endNodeId ){
  if( destinationNode == null ) {
    return;
  }

  var curNode = startNode.nextSibling;
  while( curNode != null && curNode.id != "ad-block-hack-end" ){
    // store nextSibling now, because it will be different if elCurrent is removed from the DOM and appended to elAdBlock
    var nextSibling = curNode.nextSibling;

    // copy all content except script tags to the ad-block container
    if(curNode.nodeName != 'SCRIPT') {

      // adding a try/catch for Ken's WebTest
      try {

        // try turning on and off display to make sure that flash anmiations start after they are moved
        if( curNode.nodeType != 3 ){  // node type 3 is #text
          var oldDisplay = curNode.style.display;
          curNode.style.display = "none";
        }

        destinationNode.appendChild(curNode);

        // set the display back to it's previous value
        if( curNode.nodeType != 3 ){  // #text node
          curNode.style.display = oldDisplay;
        }

      } catch(e) {
      }


    }
    curNode = nextSibling;
  }
  return;
}


// try to move the ad when the domready event fires, which is when the browser has finished parsing the HTML document,
//  but before all of the images and external files have loaded
$(window).addEvent("domready",function() {

   var startNode = $('ad-block-hack-begin');
   if(!$defined(startNode)) {
      return;
   }

   var destinationNode = $("ad-spot-0");
   var endNodeId = "ad-block-hack-end";

   _moveAd( startNode, destinationNode, endNodeId);
});


// Unfortunately we need to be prepared for domready to fire too early and not see the ad content in the page.
//  We'll define the same handler for window.onload too in case this happens.  If domready succeedes, then this will just return.
$(window).addEvent("load",function() {

   var startNode = $('ad-block-hack-begin');
   var destinationNode = $("ad-spot-0");
   var endNodeId = "ad-block-hack-end";

   _moveAd( startNode, destinationNode, endNodeId);

   // in IE6 and IE7, keep checking for ad content to move into its spot
   if( destinationNode != null && document.all ){
     setInterval( function(){ _moveAd( startNode, destinationNode, endNodeId) }, 250);
   }
});




/* ad placement: END */

function hide(id){
   return display(id,"none");
}

function show(id){
   return display(id,"");
}

function toggle_element(element) {
   var display = element.style.display;
   if ( display == "none"){
      element.style.display = "";
   } else {
      element.style.display = "none";
   }
}

function toggle(id){
  var element = document.getElementById(id);
  if ( element != null ){
     toggle_element( element );
  } else {
    alert("could not find " + id);
  }
}

function display(elementName, display){
   var elem = document.getElementById(elementName);

   if ( elem != null ){
    elem.style.display = display;
   } else {
     alert("could not find " + elementName);
   }
   return false;
}


function showFlagsDiv( siteElem ){

  var tabBar = document.getElementById('tab-bar');
  var flagDiv = document.getElementById('flagDiv');
  if ( flagDiv != null ){
    flagDiv.style.left = (tabBar.offsetLeft + 752) + "px";

    toggle_element( flagDiv );
  } else {
    alert("flagDiv not found");
  }
}

function verifySearch( searchForm, searchDefaultText ){
  // make sure not a search for '' or 'Search...'
  if( searchForm.SearchTerm.value == searchDefaultText || searchForm.SearchTerm.value == '') {
    searchForm.SearchTerm.value='';
    searchForm.SearchTerm.focus();
    return false;
  } else {
    return true;
  }
}

var BeboJS = {
   show : function(name) {
      var el = document.getElementById(name);
      if (el) {
         el.style.display = 'inline';
      }
   },
   hide : function(name) {
      var el = document.getElementById(name);
      if (el) {
         el.style.display = 'none';
      }
   }
};

var ampUnescaped = '&';


/* BEGIN: flags */
//TODO: cleanup and convert to namespace
//TODO: this could be simplified using moo tools
function closeFlagDiv() { 
  var flagDiv = document.getElementById('flagDiv');
    if(!flagDiv){ 
        return;
    }
  if (flagDiv && flagDiv.style.display != 'none')
    flagDiv.style.display = 'none';
}


function _hideFlagsOnDocumentClick(e){
  if( document.getElementById != null ) {  // aplatti: hack for QA WebTest
    if( !$('flagDiv') ) {
      return;
    } 
    var element = e.target || e.srcElement;
    var flagDiv = document.getElementById( "flagDiv" );
    if(!flagDiv){ 
        return;
    }
    if (element.className!=null && element.className.indexOf('flagDiv') == -1 &&       
        element.className.indexOf('currentFlag') == -1 &&
        flagDiv.style.display == "" ) {
      closeFlagDiv();
    }
  }
}

if (window.addEventListener) {
  // W3C
  document.addEventListener( "click", _hideFlagsOnDocumentClick, false );
} else if (window.attachEvent) {
  // Microsoft
  document.attachEvent("onclick", _hideFlagsOnDocumentClick );
} 

/* BEGIN: mp3 player */
//TODO: cleanup and convert to namespace
// JavaScript Document
var swfButtonIndex = 0;
function getFlashMovieObject(movieName) {
  if (window.document[movieName]) {
    return window.document[movieName];
  }
   if (navigator.appName.indexOf("Microsoft Internet")==-1) {
    if (document.embeds && document.embeds[movieName])
      return document.embeds[movieName]; 
  } else { // if (navigator.appName.indexOf("Microsoft Internet")!=-1)
    return document.getElementById(movieName);
  }
}

function getPlayer(vars,title) {

   if (vars == "") {
      var flashMovie=getFlashMovieObject("bebo_player");
      vars=flashMovie.GetVariable("_root.vars");
   }

   function flashObject(win,type) {
      if (type == "button") {
         swfButtonIndex++;
         idName = "bebo_player_button"+swfButtonIndex;
         swfWidth = 20;
         swfHeight = 20;
         swfName = "/mp3_player_button";
         vars = "songurl="+vars;
      } else {
         idName = "bebo_player";
         swfWidth = 404;
         swfHeight = 354;
         swfName = "/mp3_player";
      }
      win.document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="'+swfWidth+'" height="'+swfHeight+'" id="'+idName+'" align="middle">');
      win.document.write('<param name="allowScriptAccess" value="sameDomain" />');
      win.document.write('<param name="FlashVars" value="'+vars+'" />');
      win.document.write('<param name="movie" value="'+swfName+'.swf" />');
      win.document.write('<param name="quality" value="high" />');
      win.document.write('<param name="bgcolor" value="#000000" />');
      win.document.write('<embed src="'+swfName+'.swf" quality="high" FlashVars="'+vars+'" bgcolor="#000000" width="'+swfWidth+'" height="'+swfHeight+'" name="'+idName+'" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
      win.document.write('</object>');
   }
   if (title) {
      winww = 404;
      winhh = 354;
   
      LeftPosition=(screen.width)?(screen.width-winww)/2:100;
      TopPosition=(screen.height)?(screen.height-winhh)/2:100;
      
      settings='width='+winww+',height='+winhh+',top='+TopPosition+',left='+LeftPosition+',scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no';
      
      win = open("",'bebo_player',settings);
      win.document.write('<head>');
      win.document.write('<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />');
      win.document.write('<title>'+title+'</title>');
      win.document.write('</head>');
      win.document.write('<body bgcolor="#000000" leftmargin="0" topmargin="0" rightmargin="0" bottommargin="0">');     
      flashObject(win);
      win.document.write('</body>');
      win.document.write('</html>');
      win.focus();
   } else {
      if (vars.substr(0,4).toLowerCase() == "http") {
         flashObject(window,"button");
      } else {
         flashObject(window);
      }
   }
}

function getPlayer2(vars,title,htmlParentId) {

   if (vars == "") {
      var flashMovie=getFlashMovieObject("bebo_player");
      vars=flashMovie.GetVariable("_root.vars");
   }

   function flashObject(win,type, parentId) {
      if (type == "button") {
         swfButtonIndex++;
         idName = "bebo_player_button"+swfButtonIndex;
         swfWidth = 20;
         swfHeight = 20;
         swfName = "http://s.bebo.com/music_player_button.swf?v=3";
//       vars = "songurl="+vars;
         vars = vars;
      } else {
         idName = "bebo_player";
         swfWidth = 404;
         swfHeight = 354;
         swfName = "/mp3_player.swf";
      }

    if( parentId ){
      // aplatti: if an parent element ID was supplied, set the HTML directly.  (Used for MP3 buttons in modules dynamically added through expand/collapse)

      var mp3Html = '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="'+swfWidth+'" height="'+swfHeight+'" id="'+idName+'" align="middle">'+
        '<param name="allowScriptAccess" value="sameDomain" />'+
        '<param name="FlashVars" value="'+vars+'" />'+
        '<param name="movie" value="'+swfName+'" />'+
        '<param name="quality" value="high" />'+
        '<param name="bgcolor" value="#000000" />'+
        '<embed src="'+swfName+'" quality="high" FlashVars="'+vars+'" bgcolor="#000000" width="'+swfWidth+'" height="'+swfHeight+'" name="'+idName+'" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'+
        '</object>';

      var parentElem = document.getElementById( parentId );
      if( parentElem ) {
        parentElem.innerHTML = mp3Html;
      }

    } else {
      win.document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="'+swfWidth+'" height="'+swfHeight+'" id="'+idName+'" align="middle">');
      win.document.write('<param name="allowScriptAccess" value="sameDomain" />');
      win.document.write('<param name="FlashVars" value="'+vars+'" />');
      win.document.write('<param name="movie" value="'+swfName+'" />');
      win.document.write('<param name="quality" value="high" />');
      win.document.write('<param name="bgcolor" value="#000000" />');
      win.document.write('<embed src="'+swfName+'" quality="high" FlashVars="'+vars+'" bgcolor="#000000" width="'+swfWidth+'" height="'+swfHeight+'" name="'+idName+'" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />');
      win.document.write('</object>');
    }
  }
   if (title) {
      winww = 404;
      winhh = 354;
   
      LeftPosition=(screen.width)?(screen.width-winww)/2:100;
      TopPosition=(screen.height)?(screen.height-winhh)/2:100;
      
      settings='width='+winww+',height='+winhh+',top='+TopPosition+',left='+LeftPosition+',scrollbars=no,location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no';
      
      win = open("",'bebo_player',settings);
      win.document.write('<head>');
      win.document.write('<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />');
      win.document.write('<title>'+title+'</title>');
      win.document.write('</head>');
      win.document.write('<body bgcolor="#000000" leftmargin="0" topmargin="0" rightmargin="0" bottommargin="0">');     
      flashObject(win);
      win.document.write('</body>');
      win.document.write('</html>');
      win.focus();
   } else {
      if (vars.substr(0,4).toLowerCase() == "song") {
         flashObject(window,"button", htmlParentId);
      } else {
         flashObject(window);
      }
   }
}

function playTrack(song) {
   if (song) {
    var objs = document.getElementsByTagName("object");
    var numObjs = objs.length;
    for( var i=0; i < numObjs; i++){
      var curObj = objs[i];
      if( curObj.id.indexOf("bebo_player_button") == 0 ){
        
        var flashMovie = getFlashMovieObject(curObj.id);
        
        if ( flashMovie.GetVariable("_root.haskey") == "play" ) {
          if (song == flashMovie.GetVariable("_root.songId")) {
            flashMovie.SetVariable("_root.control", "play");
          }
        }
      }
    }
  }
}

function playTrack2(song) {
   if (song) {
    var objs = document.getElementsByTagName("object");
    var numObjs = objs.length;
    for( var i=0; i < numObjs; i++){
      var curObj = objs[i];
      if( curObj.id.indexOf("bebo_player_button") == 0 ){
        
        var flashMovie = getFlashMovieObject(curObj.id);
        
        if ( flashMovie.GetVariable("_root.haskey") == "play" ) {
          if (song == flashMovie.GetVariable("_root.songId")) {
            flashMovie.SetVariable("_root.control", "play");
          }
        }
      }
    }
  }
}




function stopTrack(song) {
  var objs = document.getElementsByTagName("object");
  var numObjs = objs.length;
  for( var i=0; i < numObjs; i++){
    var curObj = objs[i];
    if( curObj.id.indexOf("bebo_player_button") == 0 ){
      
      var flashMovie = getFlashMovieObject(curObj.id);

      if ( flashMovie.GetVariable("_root.haskey") == "play" ) {
        if (song != flashMovie.GetVariable("_root.songurl")) {
          flashMovie.SetVariable("_root.control", "stop");
        }
      }
    }
  }
}



function stopTrack2(song) {

  // aplatti: changed this to remove the need for a sequential number suffix on the mp3 player button objects.

  var objs = document.getElementsByTagName("object");
  var numObjs = objs.length;
  for( var i=0; i < numObjs; i++){
    var curObj = objs[i];
    if( curObj.id.indexOf("bebo_player_button") == 0 ){
      
      var flashMovie = getFlashMovieObject(curObj.id);

      if ( flashMovie.GetVariable("_root.haskey") == "play" ) {
        if (song != flashMovie.GetVariable("_root.songId")) {
          flashMovie.SetVariable("_root.control", "stop");
        }
      }
    }
  }
}

/* END mp3 player */
