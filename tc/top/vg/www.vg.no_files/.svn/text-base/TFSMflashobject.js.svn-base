function FlashObject(swfFile, id, dim, transparent, clsid, flashversion, element)
{
	var content = '';
	var swfArray = swfFile.split("?");
	
	var swfUrl = swfArray[0];
	var swfClicktag = swfFile.replace(swfUrl + "?", "");
		
	content = content +'<OBJECT classid="'+clsid+'" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version='+flashversion+',0,0,0" ID="'+id+'" '+dim+' ALIGN="">';
	content = content +'<PARAM NAME=movie VALUE="'+swfUrl+'"><PARAM NAME=quality VALUE=high><PARAM NAME="wmode" VALUE="'+transparent+'"><param name=FlashVars value="'+swfClicktag+'">'; 
	content = content + '<EMBED src="'+swfUrl+'" quality=high wmode='+transparent+' swLiveConnect=FALSE '+dim+' NAME="'+id+'" FlashVars="'+swfClicktag+'" ALIGN="" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer">';
	content =content +'</EMBED></OBJECT>';
	document.getElementById(element).innerHTML=content;
}