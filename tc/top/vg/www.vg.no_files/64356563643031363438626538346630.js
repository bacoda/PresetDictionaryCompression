document.write('<!-- Template Id = 1 Template Name = Banner Creative (Flash) -->\n<!-- Copyright 2002 DoubleClick Inc., All rights reserved. --><script src=\"flashwrite_1_2.js\"><\/script>');document.write('\n');
 
var dcswf = "no_rfss-180x70.swf"; 
var dcgif = "no_rfss-180x70.gif"; 
var advurl = "http://ad.no.doubleclick.net/click%3Bh=v8/3730/17/c8/%2a/r%3B29651743%3B0-0%3B0%3B12988857%3B882-180/70%3B26511056/26528913/1%3B%3B%7Esscs%3D%3fhttp://ads.vg.basefarm.net/RealMedia/ads/click_lx.ads/www.vg.no/front/1332635533/Right3/OasDefault/Hotels_front_toppknp_3rd_sept08/Hotels_front_toppknp_3rd_jan07.html/64356563643031363438626538346630?http://www.hotell.com/?rffrid=ola.hcom.no.373643.12988857.26511056";
var dcadvurl = escape(advurl);
var dcminversion = 6;
var dcmaxversion = 9;
var plugin = false;
var dccreativewidth = "180";
var dccreativeheight = "70";
var dcwmode = "opaque";
var dcbgcolor = "";
var dcallowscriptaccess = "never";

if (((navigator.appName == "Netscape") && (navigator.userAgent.indexOf("Mozilla") != -1) && (parseFloat(navigator.appVersion) >= 4) && (navigator.javaEnabled()) && navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin)) {
var plugname=navigator.plugins['Shockwave Flash'].description;var plugsub=plugname.substring(plugname.indexOf("."),-1); var plugsubstr=plugsub.substr(-1)
if( plugsubstr >= dcminversion) { plugin = true;}
}
else if (navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 && (navigator.userAgent.indexOf("Opera")<0) && (navigator.userAgent.indexOf("Windows 95")>=0 || navigator.userAgent.indexOf("Windows 98")>=0 || navigator.userAgent.indexOf("Windows NT")>=0) && document.all) 
{
document.write('<script language=VBScript>' + '\n' +
   'dcmaxversion = '+dcmaxversion + '\n' +
   'dcminversion = '+dcminversion + '\n' +
   'Do' + '\n' +
    'On Error Resume Next' + '\n' +
    'plugin = (IsObject(CreateObject(\"ShockwaveFlash.ShockwaveFlash.\" & dcmaxversion & \"\")))' + '\n' +
    'If plugin = true Then Exit Do' + '\n' +
    'dcmaxversion = dcmaxversion - 1' + '\n' +
    'Loop While dcmaxversion >= dcminversion' + '\n' +
  '<\/script>');
}
if ( plugin )  {
 adcode = '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+
  ' ID=FLASH_AD WIDTH="'+ dccreativewidth +'" HEIGHT="'+ dccreativeheight +'">'+
  '<PARAM NAME=movie VALUE="' + dcswf + '?clickTag='+ dcadvurl +'"><PARAM NAME=quality VALUE=high><PARAM NAME=bgcolor VALUE=#'+ dcbgcolor +'><PARAM NAME=wmode VALUE='+ dcwmode +'><PARAM NAME="AllowScriptAccess" VALUE="'+dcallowscriptaccess+'">'+
  '<EMBED src="' + dcswf + '?clickTag='+ dcadvurl +'" quality=high wmode='+dcwmode+
  ' swLiveConnect=TRUE WIDTH="'+ dccreativewidth +'" HEIGHT="'+ dccreativeheight +'" bgcolor=#'+ dcbgcolor+
  ' TYPE="application/x-shockwave-flash" AllowScriptAccess="'+dcallowscriptaccess+'"></EMBED></OBJECT>';
if(('j'!="j")&&(typeof dclkFlashWrite!="undefined")){dclkFlashWrite(adcode);}else{document.write(adcode);}
} else {
 document.write('<A TARGET="_top" HREF="http://ad.no.doubleclick.net/click%3Bh=v8/3730/17/c8/%2a/r%3B29651743%3B0-0%3B0%3B12988857%3B882-180/70%3B26511056/26528913/1%3B%3B%7Esscs%3D%3fhttp://ads.vg.basefarm.net/RealMedia/ads/click_lx.ads/www.vg.no/front/1332635533/Right3/OasDefault/Hotels_front_toppknp_3rd_sept08/Hotels_front_toppknp_3rd_jan07.html/64356563643031363438626538346630?http://www.hotell.com/?rffrid=ola.hcom.no.373643.12988857.26511056"><IMG SRC="' + dcgif + '" alt="" BORDER=0></A>');
}
//-->

document.write('<NOSCRIPT><A TARGET=\"_top\" HREF=\"http://ad.no.doubleclick.net/click%3Bh=v8/3730/17/c8/%2a/r%3B29651743%3B0-0%3B0%3B12988857%3B882-180/70%3B26511056/26528913/1%3B%3B%7Esscs%3D%3fhttp://ads.vg.basefarm.net/RealMedia/ads/click_lx.ads/www.vg.no/front/1332635533/Right3/OasDefault/Hotels_front_toppknp_3rd_sept08/Hotels_front_toppknp_3rd_jan07.html/64356563643031363438626538346630?http://www.hotell.com/?rffrid=ola.hcom.no.373643.12988857.26511056\"><IMG SRC=\"/www.vg.no_files/doubleclick_files/no_rfss-180x70.gif\" alt=\"\" BORDER=0></A></NOSCRIPT>');
