vjo.type("vjo.dsf.utils.URL").props({addArg:function(_1,_2,_3){
if(_1==null||_1==undefined){
return null;
}
if(_1.indexOf("?")<0){
_1+="?"+_2+"="+_3;
return _1;
}
var _4=this.getArgPairIfExists(_1,_2);
if(_4!==null){
_1=_1.replace(_4,_2+"="+_3);
}else{
_1+="&"+_2+"="+_3;
}
return _1;
},getArg:function(_5,_6){
if(_5==null||_5==undefined){
return null;
}
if(_5.indexOf("?")<0){
return null;
}
var _7=this.getArgPairIfExists(_5,_6);
if(_7!==null){
return _7.substring(_7.indexOf("=")+1);
}
return null;
},getArgPairIfExists:function(_8,_9){
var _a=_8.indexOf("?");
if(_a<0){
return null;
}
var _b=_8;
var _c,argName;
while(_a>=0){
_b=_b.substring(_a+1);
_c=_b;
_a=_b.indexOf("&");
if(_a>=0){
_c=_b.substring(0,_a);
}
argName=_c.substring(0,_c.indexOf("="));
if(argName==_9){
return _c;
}
}
return null;
}});

vjo.needs("vjo.dsf.client.Browser");
vjo.type("vjo.dsf.client.ActiveX").props({init:function(){
var oC=vjo.dsf.client.Browser;
if(oC.bIE){
var d=document;
dw=function(s){
d.writeln(s);
};
dw("<scr"+"ipt language=\"vbscript\" type=\"text/vbscript\">");
dw("\tFunction vbCheckActiveXControl (pActXName)");
dw("\t\taX = false");
dw("\t\ton error resume next");
dw("\t\taX = IsObject(CreateObject(pActXName))");
dw("\t\tvbCheckActiveXControl = aX");
dw("End Function");
dw("</scr"+"ipt>");
}
},isLibLoaded:function(_4){
var oC=vjo.dsf.client.Browser;
return oC.bActiveXSupported&&vbCheckActiveXControl(_4);
}}).inits(function(){
vjo.dsf.client.ActiveX.init();
});

vjo.needs("vjo.dsf.utils.URL");
vjo.type("vjo.darwin.core.rtm.RTMInit").satisfies("vjo.dsf.common.IJsServiceHandler").protos({constructs:function(_1){
this.oRTM=new vjo.darwin.core.rtm.RTM(_1);
},invoke:function(_2){
var _3=this.oRTM.processGlobalNavPids();
if(_3!=""){
var U=vjo.dsf.utils.URL;
var _5=this.oRTM.oJSBean.url;
_5=U.addArg(_5,"e","USC:"+this.oRTM.getSegment(false));
var p=U.getArg(_5,"p");
if((p!=null)&&!p.has(_3)){
this.oRTM.oJSBean.url=_5.replace("p="+p,"p="+p+":"+_3);
}
}
this.oRTM.appendUrl("");
this.oRTM.appendUrl("");
if(this.oRTM.getEncodingType()!=null){
this.oRTM.appendUrl("");
}
this.oRTM.registerGlobalNavPlacements();
if(!this.oRTM.oJSBean.onload){
this.onSend();
}else{
vjo.dsf.EventDispatcher.addEventListener(window,"load",this.onLoad,this);
}
vjo.dsf.EventDispatcher.addEventListener(window,"load",this.oRTM.setTimeOut,this.oRTM);
_2.returnData=false;
return _2;
},onLoad:function(){
var _7=this;
window.setTimeout(function(){
_7.onSend();
},0);
},onSend:function(){
var _8=new vjo.dsf.assembly.VjClientAssemblerRequest(this.oRTM.oJSBean.url,this.oRTM.setInlineContent,this.oRTM,"cb");
vjo.dsf.assembly.VjClientAssembler.load(_8);
}});

vjo.needs("vjo.dsf.typeextensions.string.Comparison");
vjo.needs("vjo.dsf.cookie.VjCookieJar");
vjo.needs("vjo.dsf.client.Browser");
vjo.needs("vjo.dsf.client.ActiveX");
vjo.needs("vjo.darwin.core.rtm.RTMInit");
vjo.type("vjo.darwin.core.rtm.RTM").protos({constructs:function(_1){
this.oJSBean=_1||{};
this.aContent=[];
this.iContentLen=0;
this.bTimedOut=false;
this.oTimeoutId=null;
this.iTIMEOUT=1500;
this.oClient=vjo.dsf.client.Browser;
this.bResponseReturned=false;
this.iOrd=(new Date()).getTime();
this.aGlobalNavPlacements=null;
},getFlashVersion:function(){
var b=this.oClient;
var fv=0;
if(b.bIE&&b.bWin&&!b.bOpera){
for(var i=3;i<10;i++){
if(vjo.dsf.client.ActiveX.isLibLoaded("ShockwaveFlash.ShockwaveFlash."+i)){
fv=i;
}
}
}else{
if(navigator.plugins["Shockwave Flash"]){
var pd=navigator.plugins["Shockwave Flash"].description;
fv=parseInt(pd.charAt(pd.indexOf(".")-1));
}
if(b.bWebTV){
fv=3;
}
}
return fv;
},getEncodingType:function(){
var _6=null;
if(typeof (_GlobalNavHeaderUtf8Encoding)!="undefined"){
_6=_GlobalNavHeaderUtf8Encoding?"UTF-8":"cp1252";
}
return _6;
},setInlineContent:function(_7){
this.bResponseReturned=true;
if(this.bTimedOut){
return;
}
if(this.oTimeoutId){
window.clearTimeout(this.oTimeoutId);
}
this.aContent=_7;
this.iContentLen=this.aContent.length;
for(var i=0;i<this.iContentLen;i++){
with(this){
if(aContent[i].type=="doubleclick"){
processDoubleClickAd(aContent[i]);
}else{
if(aContent[i].type=="html"){
processHTMLAd(aContent[i]);
}else{
if(aContent[i].type=="htmlform"){
processHTMLFormAd(aContent[i]);
}else{
if(aContent[i].type=="popUnder"){
processPopUnderAd(aContent[i]);
}else{
processNoneAd(aContent[i]);
}
}
}
}
}
}
var _9=new vjo.dsf.Message("RTM_COMPLETE");
_9.status=1;
_9.vjRTMObject=this;
vjo.dsf.ServiceEngine.handleRequest(_9);
return;
},processPopUnderAd:function(_a){
var _b="height="+_a.height;
_b+=",width="+_a.width;
_b+=",menubars=no,scrollbars=no'";
var id="p_u_"+_a.id;
var _d=window.open("",id,_b);
if(_d){
_d.blur();
_d.document.open();
_d.document.write(_a.content);
_d.document.close();
}
return;
},processDoubleClickAd:function(_e){
var _f=this.oJSBean;
var _10=this.getIndex(_e.id);
var id=_f.htmlIds[_10];
var _12=this.getUIElement(id);
var url=_f.dblclkUrls[_10];
if(_12&&!_12.length){
if(_e.content!=""){
url+=_e.content+";";
}
url+="ord="+this.iOrd;
_12.innerHTML=this.createIframe(id,url,_f.heights[_10],_f.widths[_10]);
}
return;
},processNoneAd:function(pAd){
var _15=this.oJSBean;
var _16=this.getIndex(pAd.id);
var id=_15.htmlIds[_16];
var _18=this.getUIElement(id);
var _19=_15.defaultUrls[_16];
if(_18&&!_18.length){
if(!_19||_19=="collapse"||_19==""){
_18.style.height="0px";
_18.style.height="0px";
_18.style.display="none";
}else{
_18.innerHTML=this.createIframe(id,_19,_15.heights[_16],_15.widths[_16]);
}
}
return;
},processHTMLAd:function(pAd){
if(pAd.height=="-1"||pAd.height=="9999"){
pAd.height="auto";
}
if(pAd.width=="-1"||pAd.width=="9999"){
pAd.width="auto";
}
var _1b=this.getIndex(pAd.id);
var _1c=this.getUIElement(this.oJSBean.htmlIds[_1b]);
if(_1c&&!_1c.length){
var _1d=_1c.style,h,w;
_1d.height=h=(pAd.height.has("auto"))?pAd.height:pAd.height+"px";
_1d.width=w=(pAd.width.has("auto"))?pAd.width:pAd.width+"px";
if(h!="auto"&&w!="auto"){
_1d.overflow="hidden";
}
_1c.innerHTML=pAd.content;
}
return;
},processHTMLFormAd:function(pAd){
if(pAd.height=="-1"||pAd.height=="9999"){
pAd.height="auto";
}
if(pAd.width=="-1"||pAd.width=="9999"){
pAd.width="auto";
}
var _1f=this.getIndex(pAd.id);
var _20=this.getUIElement(this.oJSBean.htmlIds[_1f]);
if(_20&&!_20.length){
var _21=_20.style,h,w;
_21.height=h=(pAd.height.has("auto"))?pAd.height:pAd.height+"px";
_21.width=w=(pAd.width.has("auto"))?pAd.width:pAd.width+"px";
if(h!="auto"&&w!="auto"){
_21.overflow="hidden";
}
var _22=document.createElement("iframe");
_22.setAttribute("hspace",0);
_22.setAttribute("vspace",0);
_22.setAttribute("width","100%");
_22.setAttribute("frameBorder",0);
_22.setAttribute("scrolling","no");
_22.setAttribute("marginWidth",0);
_22.setAttribute("marginHeight",0);
_20.appendChild(_22);
_22.doc=null;
if(_22.contentDocument){
_22.doc=_22.contentDocument;
}else{
if(_22.contentWindow){
_22.doc=_22.contentWindow.document;
}else{
if(_22.document){
_22.doc=_22.document;
}
}
}
if(_22.doc==null){
throw "Document not found, append the parent element to the DOM before creating the IFrame";
}
_22.doc.open();
try{
_22.doc.write(pAd.content);
}
finally{
_22.doc.close();
}
}
return;
},getUIElement:function(_23){
var s=_23,d=window.document;
if(d.getElementById){
return d.getElementById(s);
}else{
if(d.all){
return d.all(s);
}
}
return null;
},getIndex:function(pId){
for(var i=0;i<this.iContentLen;i++){
if(this.aContent[i].id==pId){
return i;
}
}
return;
},createIframe:function(pId,_28,_29,_2a){
var _2b="ifrm_"+pId;
var f="<iframe frameborder=\"no\" border=\"0\" marginwidth=\"0\" marginheight=\"0\" scrolling=\"no\""+" id=\""+_2b+"\""+" name=\""+_2b+"\""+" src=\""+_28+"\""+" width=\""+_2a+"\" height=\""+_29+"\"></iframe>";
return f;
},appendUrl:function(_2d){
this.oJSBean.url+=_2d;
},processGlobalNavPids:function(){
var _2e="";
var _2f;
if(typeof (_oGlobalNavRTMInfo)!="undefined"){
_2f=_oGlobalNavRTMInfo;
this.aGlobalNavPlacements=_2f.aRTMPlacementData;
}
if(_2f&&this.aGlobalNavPlacements&&this.aGlobalNavPlacements.length>0){
var _30=_oGlobalNavRTMInfo.aRTMPlacementData,data;
for(i=0;i<_30.length;i++){
data=_30[i];
if(_2e){
_2e+=":";
}
_2e+=data.pid;
}
}
return _2e;
},registerGlobalNavPlacements:function(){
if(!this.aGlobalNavPlacements||this.aGlobalNavPlacements.length==0){
return;
}
var _31=this.oJSBean;
var len=this.aGlobalNavPlacements.length;
for(var i=0;i<len;i++){
var _34=_31.htmlIds.length;
var _35=this.aGlobalNavPlacements[i];
_31.htmlIds[_34]=(_35.htmlId)?_35.htmlId:"glbl_nav_no_html_id";
_31.pids[_34]=(_35.pid)?_35.pid:"glbl_nav_no_pid";
_31.heights[_34]=(_35.maxHeight)?_35.maxHeight:"glbl_nav_no_height";
_31.widths[_34]=(_35.maxWidth)?_35.maxWidth:"glbl_nav_no_width";
_31.dblclkUrls[_34]=(_35.dblclkUrl)?_35.dblclkUrl:"glbl_nav_no_dblclk";
_31.defaultUrls[_34]=(_35.defaultUrl)?_35.defaultUrl:"collapse";
}
},setTimeOut:function(){
if(!this.bResponseReturned){
var _36="vjo.darwin.core.rtm.RTM.processTimeOut()";
var _37=this;
var _38=function(){
_37.processTimeOut();
};
this.oTimeoutId=window.setTimeout(_38,this.iTIMEOUT);
}
},processTimeOut:function(){
this.bTimedOut=true;
var _39=this.oJSBean;
var _3a=_39.defaultUrls.length;
for(var i=0;i<_3a;i++){
var id=_39.htmlIds[i];
var _3d=this.getUIElement(id);
var _3e=_39.defaultUrls[i];
if(_3d&&!_3d.length){
if(!_3e||_3e=="collapse"||_3e==""){
_3d.style.height="0px";
_3d.style.height="0px";
_3d.style.display="none";
}else{
_3d.innerHTML=this.createIframe(id,_3e,_39.heights[i],_39.widths[i]);
}
}
}
var _3f=_39.url;
var _40=_3f.indexOf("&");
var _41=Math.random();
_3f=_3f.substring(0,_40);
_3f=_3f+"&p="+_39.pids.join(":")+"&ite=2"+"&to="+this.iTIMEOUT;
_3f=_3f.replace("RtmCmd","RtmIt");
_3f="ebay.com_files/rtm.js"
var _42=document.createElement("script");
_42.type="text/javascript";
if(_41<0.05){
_42.src=_3f;
document.getElementsByTagName("head")[0].appendChild(_42);
}
window.clearTimeout(this.oTimeoutId);
var _43=new vjo.dsf.Message("RTM_COMPLETE");
_43.status=0;
_43.vjRTMObject=this;
vjo.dsf.ServiceEngine.handleRequest(_43);
return;
},getBrowserWidth:function(){
var b=this.oClient;
var _45=document.body.clientWidth;
if(!b.bIE){
_45=window.innerWidth;
}
return _45;
},popUp:function(_46,_47,_48,_49,_4a,_4b,_4c,_4d,_4e,_4f,_50,_51){
var sP="";
sP+=(_48!=null)?",width="+_48:"";
sP+=(_49!=null)?",height="+_49:"";
sP+=(_4d!=null)?",screenX="+_4d+",left="+_4d:"";
sP+=(_4e!=null)?",screenY="+_4e+",top="+_4e:"";
sP+=",toolbar="+((_4b)?"1":"0");
sP+=",location="+((_4f)?"1":"0");
sP+=",status="+((_4a)?"1":"0");
sP+=",scrollbars="+((_4c)?"1":"0");
sP+=",resizable="+((_50)?"1":"0");
sP+=",menubar="+((_51)?"1":"0");
if(sP.length>0){
sP=sP.substring(1);
}
window.open(_47,_46,sP);
return false;
},getSegment:function(_53){
var oCJ=vjo.dsf.cookie.VjCookieJar,e=oCJ.readCookie("etfc"),r=oCJ.readCookie("reg"),s=oCJ.readCookie("ebay","sin"),c,n;
if(e=="0"){
n="3";
c="E";
}else{
if(e=="1"){
n="4";
c="C";
}else{
if(e=="2"){
n="5";
c="D";
}else{
if((e==""&&(r!=""&&r!=";"))||s=="in"||e=="5"){
n="2";
c="B";
}else{
n="1";
c="A";
}
}
}
}
return _53?c:n;
}});


// en_US/e567/CCHP_HomepageV4_SLDR_e5676717327_3_en_US
// b=6717327
