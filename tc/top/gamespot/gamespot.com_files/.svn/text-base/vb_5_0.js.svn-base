// global file
// sniffs activex control (instead of flash plug in) on Windows IE with vbscript
// version 5.0

var browserIE = (navigator.appVersion.indexOf("MSIE") != -1) ? true : false;		
var OSWindows = (navigator.appVersion.indexOf("Windows") != -1) ? true : false; 
if(browserIE && OSWindows){ 
	document.write('<scr' + 'ipt  type="text/vbscript"\> \n');
	document.write('on error resume next \n');
	document.write('ads_gotFlash2 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.2"))) \n');
	document.write('ads_gotFlash3 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.3"))) \n');
	document.write('ads_gotFlash4 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.4"))) \n');
	document.write('ads_gotFlash5 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.5"))) \n');	
	document.write('ads_gotFlash6 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.6"))) \n');	
	document.write('ads_gotFlash7 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.7"))) \n');	
	document.write('ads_gotFlash8 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.8"))) \n');
	document.write('ads_gotFlash9 = (IsObject(CreateObject("ShockwaveFlash.ShockwaveFlash.9"))) \n');
	document.write('</scr' + 'ipt\> \n'); 
}
