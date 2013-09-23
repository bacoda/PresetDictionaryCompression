if (ads_versionIsAcceptable) {
        document.write(scriptDiv);
	document.write('<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+ movieWidth +'" height="'+ movieHeight +'" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab">');
	document.write('<param name="movie" value="'+ swfPath +'" />');
	document.write('<param name="FlashVars" value="'+ flashVars +'" />');
	document.write('<param name="play" value="true" />');
	document.write('<param name="loop" value="true" />');
	document.write('<param name="quality" value="high" />');
	document.write('<param name="menu" value="false" />');
	document.write('<param name="wmode" value="opaque" />'); 
	document.write('<param name="allowScriptAccess" value="always" />'); 
	document.write('<embed src="'+ swfPath +'" FlashVars="'+ flashVars +'" width="'+ movieWidth +'" height="'+ movieHeight +'" play="true" loop="true" quality="high" menu="false" wmode="opaque" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash">');
	document.write('</embed>');
	document.write('</object>');
	document.write('<br /><img src="dotclear.gif" alt="flashImpTrack" border="0" height="1" width="1" />');
 	document.write(endScriptDiv);
} else if (defaultValue && !ads_versionIsAcceptable) {
        document.write(scriptDiv);
	document.write('<a href="'+ defaultImageClick +'" target="_blank">');
	document.write('<img src="'+ defaultImage +'" width="'+ movieWidth +'" height="'+ movieHeight +'" border="0" alt="'+ altText +'" /></a>');
        document.write(endScriptDiv);
}
