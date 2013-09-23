function cnnGetId(query) 
{
	var queryId = cnnGetQueryId( query);
	var wId = cnnGetWindowNameId();
	
	var idsMatch = (queryId == wId);
	
	var imageObj = document.createElement('img');
	imageObj.setAttribute('src','1.gif');
	if(document.documentElement)
	{
		document.documentElement.appendChild( imageObj );
	} 
	return queryId;

}
function cnnGetWindowNameId()
{
	if(window.name && (window.name.indexOf('csiDataIframe')==0))
	{
		return window.name.substring(13);
	}
	return '';
}

function cnnGetQueryId(query)
{
	var keyValPairs = query.split('&');
	if(!keyValPairs)
	{
		keyValPairs = new Array();
		keyValPairs[keyValPairs.length]=query;
	}
	for(var counter=0;counter<keyValPairs.length;counter++) 
	{
		var keyVal = keyValPairs[counter].split('=');

		if(keyVal[0]=='csiID') 
		{
			return keyVal[1];
		}
	}
}

function cnnSend() 
{
	var paramStr = location.hash;
	if(!paramStr)
	{
		paramStr = location.search.substring(1);
	}
	var docId = cnnGetId( paramStr 	);
	docId = "cnnLWPWeather";
	if(document.mainForm.htmlArea && document.mainForm.htmlArea.value) 
 	{
		var rawHtml = document.mainForm.htmlArea.value;
		if(rawHtml) 
	 	{
			parent.CSIManager.getInstance().callBackHtml(rawHtml, docId);
		}
	}
	else  if(document.mainForm.jsCode.value) 
 	{
		var rawJS = document.mainForm.jsCode.value;
		if(rawJS) 
	 	{
			parent.CSIManager.getInstance().callBackJS( eval('('+rawJS+')'), docId);
		}
	}
}
var oldonloadfunction = window.onunload;
function dummyonunload(evt)
{
	if(oldonloadfunction)
	{
		oldonloadfunction(evt);
	}
}
window.onunload=dummyonunload;

var oldshowpagefunction = window.onshowpage;
function cnnshowpageSend(evt)
{

        if(evt.persisted)
	{
		cnnSend();
	}
	oldshowpagefunction(evt);
}
