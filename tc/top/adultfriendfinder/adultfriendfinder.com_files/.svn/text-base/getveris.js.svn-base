
  // Location of the seal flash file and static image file in your server. 
  // Change the directory path if the locations are different in your
  // web server 
  seal_flash_url="adultfriendfinder.com_files/verisignseal.swf";
  seal_gif_url="adultfriendfinder.com_files/verisignseal.gif";

  /* DON'T CHANGE BELOW */
  // dn field is your server host name that hosts the seal that must also 
  // match the SSL certificate common name 
  dn="SECURE.ADULTFRIENDFINDER.COM"
  sap="getverisignsealflash.js";
  splash_url="https://seal.verisign.com";
  tpt="transparent";

  language="en";
  u1=splash_url+"/splash?form_file=fdf/splash.fdf&dn="+dn+"&lang="+language;

  function vrsn_splash() {
    tbar = "location=yes,status=yes,resizable=yes,scrollbars=yes,width=560,height=500";
    sw = window.open(u1,'VRSN_Splash',tbar);
    sw.focus();
  }

  var MM_contentVersion = 5;
  var plugin = (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"]) ? navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin : 0;
  if ( plugin ) { 
    var words = navigator.plugins["Shockwave Flash"].description.split(" ");
    for (var i = 0; i < words.length; ++i) { 
      if (isNaN(parseInt(words[i]))) continue; 
      var MM_PluginVersion = words[i]; 
    }
    var MM_FlashCanPlay = MM_PluginVersion >= MM_contentVersion;
  } else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.appVersion.indexOf("Win") != -1)) {
	document.write('<SCR' + 'IPT LANGUAGE=VBScript\> \n');
	document.write('on error resume next \n');
	document.write('MM_FlashCanPlay = ( IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash." & MM_contentVersion)))\n');
	document.write('</SCR' + 'IPT\> \n');
  }
  if ( MM_FlashCanPlay ) {
	document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"');
	document.write('  codebase="https://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0" ');
	document.write(' ID="seal_130x82" WIDTH="130" HEIGHT="82" ALIGN="">');
	document.write(' <PARAM NAME=movie VALUE="'+seal_flash_url+'"> <PARAM NAME=loop VALUE=false> <PARAM NAME=menu VALUE=false> <PARAM NAME=quality VALUE=best> <PARAM NAME=wmode VALUE='+tpt+'> '); 
	document.write(' <EMBED src="'+seal_flash_url+'" loop=false menu=false quality=best wmode='+tpt);
	document.write(' swLiveConnect=FALSE WIDTH="130" HEIGHT="82" NAME="seal_130x82" ALIGN=""');
	document.write(' TYPE="application/x-shockwave-flash" PLUGINSPAGE="https://www.macromedia.com/go/getflashplayer">');
	document.write(' </EMBED>');
	document.write(' </OBJECT>');
  } else {
    ua=navigator.userAgent.toLowerCase();
    oie=(ua.indexOf("msie")!=-1);
    if(oie) oie=(ua.indexOf("msie 5")==-1 && ua.indexOf("msie 6")==-1);

    function maction(e){
      if (document.addEventListener) {
        var seal=(e.target.name=="seal");
        if (seal) { vrsn_splash(); return false; }
      } else if(document.captureEvents) {
        var tgt=e.target.toString(); 
        var seal=(tgt.indexOf("splash")!=-1);
        if (seal){ vrsn_splash(); return false; }
      }
      return true;
    }

    function mouseDown() {
      if (event.button==1){
        if (oie) { return true; } else { vrsn_splash(); return false; }
      } else if (event.button==2) { vrsn_splash(); return false; }
    }

    document.write("<a HREF=\""+u1+"\" tabindex=\"-1\" onmousedown=\"return mouseDown();\" target=\"VRSN_Splash\"><IMG NAME=\"seal\" BORDER=\"true\" SRC=\""+seal_gif_url+"\" oncontextmenu=\"return false;\"></A>");

    if (document.addEventListener){ 
      document.addEventListener('mouseup', maction, true); 
    } else {
      if (document.layers){
        document.captureEvents(Event.MOUSEDOWN); document.onmousedown=maction;
      }
    }

    function resized(){
      if(pageWidth!=innerWidth || pageHeight!=innerHeight){
        self.history.go(0);
      }
    }

    if(document.layers){
      pageWidth=innerWidth; pageHeight=innerHeight; window.onresize=resized;
    }
  }
