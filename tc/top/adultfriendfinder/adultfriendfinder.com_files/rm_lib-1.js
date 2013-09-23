function createSWFText(sID,sSWF,w,h,aParams,bgColor)
{if(!bgColor)bgColor="transparent";var sParams=createParams(aParams);if(sParams.length>0)sSWF+="?"+sParams;var s='';s+='<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="'+w+'" height="'+h+'" id="'+sID+'" align="middle">';s+='<param name="allowScriptAccess" value="always" />';s+='<param name="movie" value="'+sSWF+'" />';s+='<param name="quality" value="best" />';if(bgColor=="transparent")
{s+='<param name="wmode" value="transparent" />';var bg='wmode="transparent"';}
else
{var bg='bgcolor="'+bgColor+'"';s+='<param name="bgcolor" value="'+bgColor+'" />';}
s+='<embed src="'+sSWF+'" quality="best" '+bg+' width="'+w+'" height="'+h+'" name="'+sID+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />';s+='</object>';return s;}
function createSWF(sID,sSWF,w,h,aParams,bgColor)
{var s=createSWFText(sID,sSWF,w,h,aParams,bgColor);document.writeln(s);return s;}
function setupFSCommand(sID)
{var InternetExplorer=navigator.appName.indexOf("Microsoft")!=-1;document.writeln('<SCRIPT LANGUAGE=JavaScript\>');document.writeln('function '+sID+'_DoFSCommand(command, args) {');document.writeln('fsCommand(command, args);');document.writeln('}');document.writeln('</SCRIPT\>');if(navigator.appName&&InternetExplorer!=-1&&navigator.userAgent.indexOf("Windows")!=-1&&navigator.userAgent.indexOf("Windows 3.1")==-1)
{document.writeln('<SCRIPT LANGUAGE=VBScript\>');document.writeln('on error resume next');document.writeln('Sub '+sID+'_FSCommand(ByVal command, ByVal args)');document.writeln(' call '+sID+'_DoFSCommand(command, args)');document.writeln('end sub');document.writeln('</SCRIPT\>');}}
function createParams(aParams)
{var s="";var a="";for(var i in aParams)
{s+=a+i+"="+aParams[i];a="&";}
return s;}
function getURLParams(s)
{var aTemp=s.split("?");if(aTemp.length>1)
s=aTemp[1];var aData=s.split("&");var oData=new Object();for(var i in aData)
{var name=aData[i].split("=")[0];var value=aData[i].split("=")[1];oData[name]=value;}
return oData;}
function setWindowSize(w,h)
{var InternetExplorer=navigator.appName.indexOf("Microsoft")>-1;var Safari=((navigator.platform.indexOf("Mac")>-1)||(navigator.platform.indexOf("MacIntel")>-1))&&navigator.appName=="Netscape";if(InternetExplorer||Safari)
{self.resizeTo(w,h+20);}
else
{window.outerWidth=w;window.outerHeight=h;}}