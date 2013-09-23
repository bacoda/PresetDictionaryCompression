vjo.needs("vjo.dsf.utils.URL");
vjo.type("vjo.darwin.tracking.enabler.TrackingEnabler").props({rewriteURLs:function(_1,_2,_3,_4,_5){
if(_1.nativeEvent==null||_1.nativeEvent==undefined){
return;
}
var _6=_1.nativeEvent.srcElement||_1.nativeEvent.target;
if(_6==null||_6==undefined){
return;
}
if(_6.tagName.toLowerCase()=="img"){
_6=_6.parentNode;
}
var _7=_6.getAttribute(_4);
if(_7==null){
return;
}
var _7=_7.split(_5);
if(_7[0]){
var _8=_6.href;
_8=vjo.dsf.utils.URL.addArg(_8,_2,_7[0]);
if(_7[1]){
_8=vjo.dsf.utils.URL.addArg(_8,_3,_7[1]);
}
_6.href=_8;
}
}});

vjo.type("vjo.dsf.utils.Object").props({hitch:function(_1,_2){
var _3;
if(typeof _2=="string"){
_3=_1[_2];
}else{
_3=_2;
}
return function(){
return _3.apply(_1,arguments);
};
},extend:function(_4,_5){
function inheritance(){
}
inheritance.prototype=_5.prototype;
_4.prototype=new inheritance();
_4.prototype.constructor=_4;
_4.baseConstructor=_5;
_4.superClass=_5.prototype;
}});

vjo.needs("vjo.dsf.EventDispatcher");
vjo.needs("vjo.dsf.Message");
vjo.needs("vjo.dsf.ServiceEngine");
vjo.type("vjo.dsf.utils.Handlers").props({ED:vjo.dsf.EventDispatcher,SE:vjo.dsf.ServiceEngine,attachEvt:function(_1,_2,_3,_4){
return this.ED.addEventListener(_1,_2,_3,_4);
},detachEvt:function(_5,_6,_7){
return this.ED.removeEventListener(_5,_6,_7);
},newMsg:function(_8){
return new vjo.dsf.Message(_8);
},handle:function(_9){
this.SE.handleRequest(_9);
},createHdl:function(_a,_b,_c){
var _d=_a,hdl={};
hdl[_c]=function(){
_b.apply(_d,arguments);
};
return hdl;
},attachSvc:function(_e,_f,_10){
var t=this,hdl=t.createHdl(_10,_f,"invoke");
if(t.SE&&hdl){
t.SE.registerSvcHdl(_e,hdl);
}
},attachSvcReqt:function(_12,_13,_14){
var t=this,hdl=t.createHdl(_14,_13,"handleRequest");
if(t.SE&&hdl){
t.SE.registerSvcReqtHdl(_12,hdl);
}
},attachSvcResp:function(_16,_17,_18){
var t=this,hdl=t.createHdl(_18,_17,"handleResponse");
if(t.SE&&hdl){
t.SE.registerSvcRespHdl(_16,hdl);
}
},resetSvc:function(_1a){
this.SE.inProcHdl.svcHdls[_1a]=[];
},resetSvcReqt:function(_1b){
this.SE.svcReqtHdls[_1b]=[];
},resetSvcResp:function(_1c){
this.SE.svcRespHdls[_1c]=[];
}});

vjo.needs("vjo.dsf.utils.Object");
vjo.type("vjo.dsf.utils.Timer").protos({timer:null,isRunning:false,interval:null,onTick:function(){
},onStart:null,onStop:null,constructs:function(_1){
this.interval=_1;
},setInterval:function(ms){
if(this.isRunning){
window.clearInterval(timer);
}
this.interval=ms;
if(this.isRunning){
this.timer=window.setInterval(vjo.dsf.utils.Object.hitch(this,"onTick"),this.interval);
}
},start:function(){
if(typeof this.onStart=="function"){
this.onStart();
}
this.isRunning=true;
this.timer=window.setInterval(vjo.dsf.utils.Object.hitch(this,"onTick"),this.interval);
},stop:function(){
if(typeof this.onStop=="function"){
this.onStop();
}
this.isRunning=false;
window.clearInterval(this.timer);
}});

vjo.needs("vjo.dsf.Element");
vjo.needs("vjo.dsf.client.Browser");
vjo.type("vjo.dsf.document.Element").inherits("vjo.dsf.Element").props({toggleHideShowRow:function(_1,_2){
var e=this.get(_1),s,d,u="undefined";
var p=vjo.dsf.client.Browser.bFirefox?"table-row":"block";
if(e){
s=e.style;
d=s.display;
if(typeof (_2)===u){
_2=(d===""||d===p)?false:true;
}
e.bIsShown=_2;
s.display=(_2)?p:"none";
}
}});

vjo.type("vjo.darwin.domain.finding.autofill.AutoFillEncoder").protos({aCharList:[[new RegExp("[%]","g"),"_"],[new RegExp("[.]","g"),"_2e"],[new RegExp("[+]","g"),"_2b"],[new RegExp("[']","g"),"_27"]],pseudoDiv:null,constructs:function(){
this.pseudoDiv=document.createElement("div");
},encode:function(_1){
var _2=encodeURIComponent(_1),t=this;
for(var j=0;j<t.aCharList.length;j++){
var _4=t.aCharList[j];
_2=_2.replace(_4[0],_4[1]);
}
return _2;
},decodeCookie:function(_5){
var _6=_5||"";
_6=_6.replace(new RegExp("[+]","g")," ");
_6=decodeURIComponent(_6);
return _6;
},encodeHTML:function(_7){
var e=this.pseudoDiv;
if(typeof (e.textContent)!="undefined"){
e.textContent=_7;
}else{
e.innerText=_7;
}
return e.innerHTML;
}});

vjo.needs("vjo.darwin.domain.finding.autofill.AutoFillEncoder");
vjo.type("vjo.darwin.domain.finding.autofill.AutoFillCache").protos({oCache:{},oIndex:{},oReference:{},oLeaf:{},oEncoder:null,constructs:function(){
this.oEncoder=new vjo.darwin.domain.finding.autofill.AutoFillEncoder();
},add:function(_1){
try{
var t=this,kw=_1[0],kwList=_1[1],laList=_1[2],cacheItem=t.oCache[kw];
if(_1.length>=3){
t.addItem(kw,kw,"k",kwList);
}else{
try{
if(typeof (kwList[0])=="string"){
laList=null;
t.addItem(kw,kw,"k",kwList);
}else{
if(typeof (kwList[0])=="object"&&(kwList[0] instanceof Array)){
laList=_1[1];
}
}
}
catch(err){
laList=null;
}
}
if(laList!==null){
for(var i=0;i<laList.length;i++){
var _4=laList[i],lookAheadKw=kw+_4[0],lookAheadType=_4[1],lookAheadList=_4[2];
if(typeof (lookAheadList)=="undefined"||lookAheadList===null){
lookAheadType="fd";
lookAheadList=_4[0];
}
t.addItem(lookAheadKw,kw,lookAheadType,lookAheadList);
}
}else{
t.addItem(kw,kw,"null");
}
}
catch(e){
}
},addItem:function(_5,_6,_7,_8){
var t=this;
_5=_5.toLowerCase();
_6=_6.toLowerCase();
if(_7=="k"){
t.oCache[_5]={"type":"k","keyword":(typeof (_8)=="number")?(""+_8):_8,"shortPrefix":_6};
return t.oCache[_5];
}else{
if(_7=="f"){
t.oIndex[_5]={"type":"f","keyword":(typeof (_8)=="number")?(""+_8):_8,"shortPrefix":_6};
return t.oIndex[_5];
}else{
if(_7=="fd"){
t.oReference[_5]={"type":"fd","keyword":_8,"shortPrefix":_6};
return t.oReference[_5];
}else{
if(_7=="null"){
t.oLeaf[_5]={"type":"null","shortPrefix":_6};
return t.oLeaf[_5];
}
}
}
}
},get:function(_a,_b){
_a=_a.toLowerCase();
_b=_b.toLowerCase();
var t=this,cacheItem=t.oCache[_a],indexItem=t.oIndex[_a],referenceItem=t.oReference[_a];
if(typeof (cacheItem)!="undefined"){
return cacheItem;
}
if(typeof (indexItem)!="undefined"){
return indexItem;
}
if(typeof (referenceItem)!="undefined"){
return referenceItem;
}
if(_b){
var _d=t.oLeaf[_b];
if(typeof (_d)!="undefined"){
return _d;
}
var _e=[];
for(var _f in t.oIndex){
var _10=t.oIndex[_f];
if(_10.shortPrefix==_b){
_e.push(_f);
}
}
_e.sort();
if(_e.length===0){
return null;
}
var _11=_e.length-1;
for(i=0;i<_e.length;i++){
if(_a<_e[i]){
_11=i-1;
break;
}
}
if(_11<0){
_11=0;
}
return t.oIndex[_e[_11]];
}
return null;
}});

vjo.needs("vjo.dsf.XDomainRequest");
vjo.needs("vjo.Registry");
vjo.needs("vjo.dsf.utils.Object");
vjo.needs("vjo.dsf.utils.Handlers");
vjo.needs("vjo.dsf.utils.Timer");
vjo.needs("vjo.dsf.document.Element");
vjo.needs("vjo.darwin.domain.finding.autofill.AutoFillCache");
vjo.needs("vjo.darwin.domain.finding.autofill.AutoFillEncoder");
vjo.type("vjo.darwin.domain.finding.autofill.AutoFillRequest").singleton().protos({aReqList:[],oCache:null,oConfig:{"baseURL":null,"dirDepth":null,"rootDir":null,"algorithm":null,"version":null,"siteId":null},oEncoder:null,sRespSvc:"autofill_response",iTimeout:1000,iProcessInterval:20,oProcessTimer:null,inProcess:false,bInit:false,constructs:function(){
},init:function(_1){
var t=this;
if(t.bInit){
return;
}
var tO=t.oConfig;
tO.baseURL=_1.baseURL;
tO.dirDepth=_1.dirDepth;
tO.rootDir=_1.rootDir;
tO.algorithm=_1.algorithm;
tO.version=_1.version;
tO.siteId=_1.siteId;
t.oCache=new vjo.darwin.domain.finding.autofill.AutoFillCache();
t.oEncoder=new vjo.darwin.domain.finding.autofill.AutoFillEncoder();
t.oProcessTimer=new vjo.dsf.utils.Timer();
t.oProcessTimer.setInterval(t.iProcessInterval);
t.oProcessTimer.onTick=function(){
if(t.inProcess){
return;
}
t.inProcess=true;
try{
t.processQue();
t.cleanQue();
}
catch(e){
}
t.inProcess=false;
};
t.oProcessTimer.start();
t.bInit=true;
},processQue:function(){
var t=this,queLength=t.aReqList.length;
if(queLength===0){
return;
}
var _5=t.aReqList[0];
if(_5&&(_5.state=="wait")){
t.aReqList[0].state="process";
if(vjo.Registry.get("autofilltest_local")){
var _6=vjo.Registry.get(_5.prefix);
if(_6){
t.handleResponse(_6);
}
}else{
var _7=vjo.dsf.XDomainRequest.bUseIframe;
try{
vjo.dsf.XDomainRequest.bUseIframe=false;
var _8=vjo.dsf.XDomainRequest.send(_5.url);
t.aReqList[0].scriptId=_8;
}
catch(e){
}
vjo.dsf.XDomainRequest.bUseIframe=_7;
}
}
},cleanQue:function(){
var t=this,newList=[],i;
for(i=0;i<t.aReqList.length;i++){
var _a=t.aReqList[i];
if(_a.state=="wait"){
newList.push(_a);
}else{
if(_a.state=="process"){
var _b=new Date(),time=_b.getTime()-_a.timestamp;
if(time>=t.iTimeout){
t.removeScriptTag(_a.scriptId);
t.sendRespService(true,_a.requester,_a.prefix,null,null,_a.shortPrefix);
}else{
newList.push(_a);
}
}
}
}
t.aReqList=newList;
},removeScriptTag:function(_c){
if(_c&&_c.length>0){
var _d=vjo.dsf.document.Element.get(_c),scriptLoc=vjo.dsf.XDomainRequest.getReqDiv();
if(scriptLoc&&_d){
scriptLoc.removeChild(_d);
}
}
},getRespSvc:function(){
return this.sRespSvc;
},getShortPrefix:function(_e){
var t=this,dirDepth=t.oConfig.dirDepth,shortPrefix=_e.substr(0,dirDepth+1);
return shortPrefix;
},buildPath:function(pKw,_11){
var t=this,pd=_11?10000:t.oConfig.dirDepth,pathStr=pKw.length>pd?pKw.substr(0,pd):pKw.substr(0,pKw.length-1),fileStr=pKw.length>pd?pKw.substr(pd,1):pKw.substr(pKw.length-1,1),encodedPathStr="";
var _13=pathStr.toLowerCase(),lowFileStr=fileStr.toLowerCase();
for(var i=0;i<_13.length;i++){
encodedPathStr+=t.encodeChar(_13.charAt(i))+"/";
}
return [encodedPathStr,t.encodeChar(lowFileStr),pathStr+fileStr];
},encodeChar:function(_15){
return this.oEncoder.encode(_15);
},buildURL:function(){
var tO=this.oConfig,url=tO.baseURL;
if(url.lastIndexOf("/")<url.length-1){
url+="/";
}
url+=tO.rootDir+"/";
url+=tO.algorithm+"/";
url+=tO.siteId+"/";
url+=tO.version+"/";
return url;
},addRequest:function(_17,_18,_19,_1a){
var t=this,url=t.buildURL(),fileInfo=t.buildPath(_18,(_19=="fd"));
if(url.lastIndexOf("/")<url.length-1){
url+="/";
}
url+=fileInfo[0]+fileInfo[1];
if(_19=="f"&&typeof (_1a)!="undefined"&&_1a.length>0){
url+=_1a;
}
url+=".js";
var _1c=new Date();
this.aReqList.push({"requester":_17,"prefix":_18,"shortPrefix":t.getShortPrefix(_18),"url":url,"state":"wait","timestamp":_1c.getTime(),"type":_19});
},send:function(_1d,_1e){
if(!this.bInit){
return;
}
var _1f=this.getShortPrefix(_1e),cacheResp=this.oCache.get(_1e,_1f);
if(cacheResp===null){
this.addRequest(_1d,_1e,"k");
}else{
if(cacheResp.type=="f"||cacheResp.type=="fd"){
this.addRequest(_1d,_1e,cacheResp.type,cacheResp.keyword);
}else{
if(cacheResp.type=="null"){
this.sendRespService(true,_1d,_1e,[],[],_1f);
}else{
this.sendRespService(false,_1d,_1e,cacheResp.keyword,[],_1f);
}
}
}
},sendRespService:function(_20,_21,_22,_23,_24,_25){
var H=vjo.dsf.utils.Handlers,m=H.newMsg(this.sRespSvc);
if(_20){
m.clientContext={"timeout":true,"prefix":_22,"shortPrefix":_25,"requestId":_21};
}else{
m.clientContext={"timeout":false,"prefix":_22,"shortPrefix":_25,"requestId":_21,"kwList":_23,"laList":_24};
}
H.handle(m);
},handleResponse:function(_27){
var t=this,kw=_27[0],kwList=_27[1],laList=_27[2],i;
if(!t.bInit){
return;
}
t.oCache.add(_27);
var _29=[];
for(i=0;i<t.aReqList.length;i++){
var _2a=t.aReqList[i];
if(_2a.state!="process"){
continue;
}
if(_2a.prefix.toLowerCase()==_2a.shortPrefix.toLowerCase()){
if(_2a.prefix.toLowerCase()==kw.toLowerCase()){
t.aReqList[i].state="done";
t.removeScriptTag(t.aReqList[i].scriptId);
t.sendRespService(false,_2a.requester,kw,kwList,laList,_2a.shortPrefix);
}
}else{
if(_2a.shortPrefix.toLowerCase()==kw.toLowerCase()){
var _2b=t.oCache.get(_2a.prefix,_2a.shortPrefix);
t.aReqList[i].state="done";
t.removeScriptTag(t.aReqList[i].scriptId);
if(_2a.type=="f"&&_2b.type!="k"){
t.sendRespService(true,_2a.requester,_2a.prefix,null,null,_2a.shortPrefix);
}else{
_29.push(_2a);
}
}
}
}
for(i=0;i<_29.length;i++){
t.send(_29[i].requester,_29[i].prefix);
}
}}).inits(function(){
vjo.darwin.domain.finding.autofill.AutoFillRequest=new vjo.darwin.domain.finding.autofill.AutoFillRequest();
});

vjo.needs("vjo.darwin.domain.finding.autofill.AutoFillEncoder");
vjo.type("vjo.darwin.domain.finding.autofill.AutoFillConfig").protos({oModel:{"rootDir":"autofill","listSize":7,"delayTime":200,"dirDepth":3,"noSugShowTime":1500,"algorithm":null,"version":null,"trkSuggest":null,"trkRS":null,"trkInput":null,"trkShow":null,"trkHide":null,"containerId":null,"idList":null,"sugDivId":null,"noSugDivId":null,"hideLnkList":null,"lastSearch":null,"baseURL":null,"siteId":null,"svcIn":"SVC_GH_IN","svcOut":"SVC_GH_OUT"},defaultAlgo:"1",algoMap:{"1":"f","2":"a"},widthDef:{"unit":9,"min":{"px":233,"char":26},"max":{"px":400,"char":40}},oEncoder:null,constructs:function(_1){
this.oEncoder=new vjo.darwin.domain.finding.autofill.AutoFillEncoder();
this.loadConfig(_1);
},loadConfig:function(_2){
var tM=this.oModel;
if(_2.version===null||_2.algorithm===null){
tM.version=_2.algoVerMap[this.defaultAlgo];
tM.algorithm=this.algoMap[this.defaultAlgo];
}else{
tM.version=_2.version;
tM.algorithm=this.algoMap[_2.algorithm];
}
tM.trkSuggest=_2.trkSuggest;
tM.trkRS=_2.trkRS;
tM.trkInput=_2.trkInput;
tM.trkShow=_2.trkShow;
tM.trkHide=_2.trkHide;
tM.containerId=_2.containerId;
tM.idList=_2.idList;
tM.sugDivId=_2.sugDivId;
tM.noSugDivId=_2.noSugDivId;
tM.hideLnkList=_2.hideLnkList;
tM.baseURL=_2.baseURL;
tM.siteId=_2.siteId;
tM.lastSearch=this.oEncoder.decodeCookie(_2.lastSearch);
tM.svcIn=_2.svcIn;
tM.svcOut=_2.svcOut;
},updateWidthDef:function(_4){
var t=this,inputWidth=parseInt(_4.offsetWidth,10);
t.widthDef.max={"px":inputWidth,"char":Math.floor(inputWidth/t.widthDef.unit)-1};
},getHideLnkList:function(){
return this.oModel.hideLnkList;
},getWidthUnit:function(){
return this.widthDef.unit;
},getWidthMin:function(){
return this.widthDef.min;
},getWidthMax:function(){
return this.widthDef.max;
},getRootDir:function(){
return this.oModel.rootDir;
},getListSize:function(){
return this.oModel.listSize;
},getDelayTime:function(){
return this.oModel.delayTime;
},getDirDepth:function(){
return this.oModel.dirDepth;
},getAlgorithm:function(){
return this.oModel.algorithm;
},getVersion:function(){
return this.oModel.version;
},getTrkSuggest:function(){
return this.oModel.trkSuggest;
},getTrkRS:function(){
return this.oModel.trkRS;
},getTrkInput:function(){
return this.oModel.trkInput;
},getTrkShow:function(){
return this.oModel.trkShow;
},getTrkHide:function(){
return this.oModel.trkHide;
},getContainerId:function(){
return this.oModel.containerId;
},getIdList:function(){
return this.oModel.idList;
},getKeyUpSvc:function(){
return this.oModel.keyUpSvc;
},getKeyDownSvc:function(){
return this.oModel.keyDownSvc;
},getInputOverSvc:function(){
return this.oModel.inputOverSvc;
},getUpdInputSvc:function(){
return this.oModel.updInputSvc;
},getFillContentSvc:function(){
return this.oModel.fillContentSvc;
},getInSvc:function(){
return this.oModel.svcIn;
},getOutSvc:function(){
return this.oModel.svcOut;
},getBaseURL:function(){
return this.oModel.baseURL;
},getSiteId:function(){
return this.oModel.siteId;
},getSugDivId:function(){
return this.oModel.sugDivId;
},getNoSugDivId:function(){
return this.oModel.noSugDivId;
},getNoSugShowTime:function(){
return this.oModel.noSugShowTime;
},getLastSearch:function(){
return this.oModel.lastSearch;
}});

vjo.needs("vjo.dsf.client.Browser");
vjo.type("vjo.dsf.document.Shim").props({add:function(_1,_2,_3){
var f,p="px",w,h,s;
if(this.check()){
w=_1.offsetWidth;
h=_1.offsetHeight;
w+=_2?_2:0;
h+=_3?_3:0;
f=document.createElement("IFRAME");
s=f.style;
s.width=w+p;
s.height=h+p;
s.filter="chroma(color='white')";
f.frameBorder=0;
s.position="absolute";
s.left="0"+p;
s.top="0"+p;
s.zIndex="-1";
s.filter="Alpha(Opacity=\"0\")";
if(document.location.protocol=="https:"){
f.src="https://securepics.ebaystatic.com/aw/pics/s.gif";
}
_1.appendChild(f);
return f;
}
},remove:function(_5,_6){
if(this.check()){
if(_6&&_6.parentNode){
_6.parentNode.removeChild(_6);
}
}
},check:function(){
var B=vjo.dsf.client.Browser;
return (B.bIE||B.bFirefox);
}});

vjo.needs("vjo.dsf.ServiceEngine");
vjo.needs("vjo.Registry");
vjo.needs("vjo.dsf.document.Element");
vjo.needs("vjo.dsf.Message");
vjo.needs("vjo.dsf.utils.Object");
vjo.needs("vjo.dsf.document.Shim");
vjo.needs("vjo.dsf.utils.Handlers");
vjo.needs("vjo.dsf.cookie.VjCookieJar");
vjo.needs("vjo.darwin.domain.finding.autofill.AutoFillRequest");
vjo.needs("vjo.darwin.domain.finding.autofill.AutoFillEncoder");
vjo.type("vjo.darwin.domain.finding.autofill.AutoFill").props({_do:function(_1){
vjo.darwin.domain.finding.autofill.AutoFillRequest.handleResponse(_1);
}}).protos({oConfig:null,oKeyTimer:null,sCurKw:"",sLastKw:"",iCurSel:-1,aCurKwList:[],bInSugDiv:false,sInputId:null,oIframeShim:null,bHideSug:false,oRequest:null,sRequestId:"autofill",bLastQueryEmpty:false,oEncoder:null,constructs:function(_2,_3){
var t=this,vE=vjo.dsf.document.Element,vEvt=vjo.dsf.EventDispatcher,vO=vjo.dsf.utils.Object,vS=vjo.dsf.ServiceEngine;
t.sRequestId=_3;
t.oConfig=_2;
t.oEncoder=new vjo.darwin.domain.finding.autofill.AutoFillEncoder();
t.oRequest=vjo.darwin.domain.finding.autofill.AutoFillRequest;
vS.registerSvcHdl(t.oRequest.getRespSvc(),vO.hitch(t,"handleResp"));
vEvt.add(_2.getContainerId(),"mouseover",vO.hitch(t,"onMouseIn"));
vEvt.add(_2.getContainerId(),"mouseout",vO.hitch(t,"onMouseOut"));
vEvt.addEventListener(window,"resize",t.onWindowResize,t);
var _5=_2.getIdList(),i,id;
for(i=0;i<_5.length;i++){
id=_5[i];
vEvt.add(id,"mouseover",vO.hitch(t,"onListMouseOver"));
vEvt.add(id,"click",vO.hitch(t,"onListClick"));
}
_5=_2.getHideLnkList();
for(i=0;i<_5.length;i++){
id=_5[i];
vEvt.add(id,"click",vO.hitch(t,"onHideClick"));
}
vS.registerSvcHdl(_2.getOutSvc(),function(_6){
var _7=_6.clientContext;
t.setInputId(_7.srcId);
switch(_7.type){
case "kw_keyup":
t.kw_keyup(_7);
break;
case "kw_blur":
t.kw_blur(_7);
break;
case "kw_keydown":
t.kw_keydown(_7);
break;
case "kw_mouseover":
t.kw_mouseover(_7);
break;
case "show_click":
t.show_click(_7);
break;
}
});
t.updTrk(t.oConfig.getTrkInput());
t.setAutoComplete(t.isHideSuggestion());
},handleResp:function(_8){
var vE=vjo.dsf.document.Element,t=this,context=_8.clientContext,i;
var _a=context.kwList||[],laList=context.laList||[];
if(t.sRequestId!=context.requestId||context.prefix.toLowerCase()!=t.getInputValue().toLowerCase()){
return;
}
var _b=t.getRecentSearch();
if(_b&&_b.length>0){
var _c=_b.toLowerCase(),index=_c.indexOf(t.sCurKw.toLowerCase()),bRecentMatch=false,sRecentPart=_c;
while(index>=0){
if(t.isWordStart(sRecentPart,index)){
bRecentMatch=true;
break;
}
sRecentPart=sRecentPart.substr(index+1);
index=sRecentPart.indexOf(t.sCurKw.toLowerCase());
}
if(bRecentMatch){
var _d=[];
_d.push(_b);
for(i=0;i<_a.length;i++){
if(_a[i].toLowerCase()!=_c){
_d.push(_a[i]);
}
}
if(_d.length>t.oConfig.getListSize()){
_d.pop();
}
_a=_d;
}
}
if(context.timeout&&(context.prefix==t.sCurKw)&&_a.length<1){
if(!t.bLastQueryEmpty){
t.showNoSugMessage(true);
t.showSugDiv(true,t.oConfig.getWidthMin().px);
}else{
t.showSugDiv(false);
}
t.bLastQueryEmpty=true;
return;
}
t.bLastQueryEmpty=false;
t.showNoSugMessage(false);
t.iCurSel=-1;
t.aCurKwList=[];
var _e=t.oConfig.getIdList(),listLength=_e.length;
if(listLength>t.oConfig.getListSize()){
listLength=t.oConfig.getListSize();
}
if(t.sInputId!==null){
var _f=vjo.dsf.document.Element.get(t.sInputId);
if(_f){
t.oConfig.updateWidthDef(_f);
}
}
var _10=t.getMaxKwLength(_a,listLength),clipLength=t.oConfig.getWidthMax()["char"],dispPx=_10*t.oConfig.getWidthUnit();
if(dispPx<t.oConfig.getWidthMin().px){
dispPx=t.oConfig.getWidthMin().px;
}else{
if(dispPx>t.oConfig.getWidthMax().px){
dispPx=t.oConfig.getWidthMax().px;
}
}
for(i=0;i<listLength;i++){
var en=_e[i],e=vE.get(en);
if(e===null){
continue;
}
e.className="unsel";
if(i<_a.length){
e.innerHTML=t.genKwHTML(_a[i],t.sCurKw,clipLength);
vE.toggleHideShow(en,true);
var trk=(_a[i]==_b)?t.oConfig.getTrkRS():t.oConfig.getTrkSuggest();
t.aCurKwList[i]={"divId":en,"sugKw":_a[i],"trk":trk};
}else{
vE.toggleHideShow(en,false);
}
}
t.showSugDiv(true,dispPx);
},getInputValue:function(){
var e=vjo.dsf.document.Element.get(this.sInputId);
return e?e.value:"";
},isHideSuggestion:function(){
if(vjo.Registry.get("autofilltest")){
return this.bHideSug;
}
var vC=vjo.dsf.cookie.VjCookieJar,pbf=vC.readCookie("dp1","pbf"),bit=vC.getBitFlag(pbf,29);
return bit==1;
},setHideSuggestion:function(_15){
if(vjo.Registry.get("autofilltest")){
this.bHideSug=_15;
}
var vC=vjo.dsf.cookie.VjCookieJar,pbf=vC.readCookie("dp1","pbf");
vC.writeCookielet("dp1","pbf",vC.setBitFlag(pbf,29,_15?1:0));
},getRecentSearch:function(){
var lss=this.oConfig.getLastSearch();
if(lss!==null&&lss.length>0){
lss=lss.substring(lss.indexOf(".")+1);
return lss;
}
return "";
},getMaxKwLength:function(_18,_19){
if(!_18){
return 0;
}
var max=0,length=_18.length;
if(length>_19){
length=_19;
}
for(var i=0;i<_18.length;i++){
if(_18[i].length>max){
max=_18[i].length;
}
}
return max;
},isWordStart:function(pKw,_1d){
if(_1d<=0||_1d>pKw.length-1){
return true;
}
var _1e=pKw.substr(_1d-1,1),wordDelimiter=new RegExp("[\\s \\.,]");
return _1e.search(wordDelimiter)>=0;
},genKwHTML:function(pKw,_20,_21){
var _22=_20.length,out=pKw,t=this;
var _23,startIndex=-1;
for(var i=0;i<pKw.length;i++){
_23=pKw.substr(i,_22);
if(_23.length!=_22){
break;
}
if(_23.toLowerCase()==_20.toLowerCase()&&t.isWordStart(pKw,i)){
startIndex=i;
break;
}
}
var _25=pKw.substring(0,startIndex),afterPart=pKw.substr(startIndex+_22),keepLength;
if(startIndex>=0){
if(pKw.length>_21){
if(_25.length>_21){
out=t.oEncoder.encodeHTML(out.substr(0,_21));
out+="...";
}else{
if((_25.length+_23.length)>_21){
keepLength=_21-_25.length;
_23="<span class='hl'>"+t.oEncoder.encodeHTML(_23.substr(0,keepLength))+"...</span>";
out=t.oEncoder.encodeHTML(_25)+_23;
}else{
keepLength=_21-_25.length-_23.length;
out=t.oEncoder.encodeHTML(_25)+"<span class='hl'>"+t.oEncoder.encodeHTML(_23)+"</span>"+t.oEncoder.encodeHTML(afterPart.substr(0,keepLength))+"...";
}
}
}else{
out=t.oEncoder.encodeHTML(_25)+"<span class='hl'>"+t.oEncoder.encodeHTML(_23)+"</span>"+t.oEncoder.encodeHTML(afterPart);
}
}else{
if(pKw.length>_21){
out=t.oEncoder.encodeHTML(out.substr(0,_21));
out+="...";
}
}
return out;
},startKeyTimer:function(_26){
var t=this;
t.stopKeyTimer();
var _28=function(){
var _29=t.getInputValue();
if(_26!=_29||_29.length<1){
return;
}
t.oRequest.send(t.sRequestId,_26);
};
t.oKeyTimer=window.setTimeout(_28,t.oConfig.getDelayTime());
},stopKeyTimer:function(){
var t=this;
if(t.oKeyTimer!==null){
window.clearTimeout(t.oKeyTimer);
t.oKeyTimer=null;
}
},getKwSelect:function(){
var t=this;
if(t.iCurSel<0){
return t.sCurKw;
}
return t.aCurKwList[t.iCurSel].sugKw;
},selectSug:function(_2c,_2d){
var t=this,kw=t.sCurKw;
if(t.iCurSel>=0){
t.unselectSug(t.aCurKwList[t.iCurSel].divId);
}
if(_2c!==null){
var e=vjo.dsf.document.Element.get(_2c);
for(var i=0;i<t.aCurKwList.length;i++){
if(t.aCurKwList[i].divId==_2c){
t.iCurSel=i;
kw=t.aCurKwList[i].sugKw;
break;
}
}
if(e){
e.className="sel";
}
}else{
t.iCurSel=-1;
}
t.updateInput(kw);
if(!_2d){
t.focusInput();
}
},unselectSug:function(_31){
var e=vjo.dsf.document.Element.get(_31);
if(e){
e.className="unsel";
}
},createTrackingImg:function(_33){
var _34=new Date(),r=_34.getTime(),imgUrl=_33;
if(imgUrl.indexOf("?")>0){
imgUrl+="&"+r;
}else{
imgUrl+="?"+r;
}
var img=new Image(),bodyLoc=document.getElementsByTagName("body")[0];
bodyLoc.appendChild(img);
img.setAttribute("src",imgUrl);
img.setAttribute("width","1");
img.setAttribute("height","1");
img.setAttribute("border","0");
},sendInSvc:function(_36){
var H=vjo.dsf.utils.Handlers,m=H.newMsg(this.oConfig.getInSvc());
m.clientContext=_36;
H.handle(m);
},isCtrlKey:function(_38){
var _39=[38,39,40,27];
for(var i=0;i<_39.length;i++){
if(_39[i]==_38){
return true;
}
}
return false;
},isIgnorKey:function(_3b){
var _3c=[16,17,18];
for(var i=0;i<_3c.length;i++){
if(_3b==_3c[i]){
return true;
}
}
return false;
},isSugShown:function(){
var _3e=vjo.dsf.document.Element.get(this.oConfig.getContainerId());
disp=_3e.currentStyle?_3e.currentStyle.display:window.getComputedStyle(_3e,null).getPropertyValue("display");
return (disp!="none");
},isNoSugMsgShow:function(){
var _3f=vjo.dsf.document.Element.get(this.oConfig.getNoSugDivId());
disp=_3f.currentStyle?_3f.currentStyle.display:window.getComputedStyle(_3f,null).getPropertyValue("display");
return (disp!="none");
},showNoSugMessage:function(_40){
var vE=vjo.dsf.document.Element,t=this;
vE.toggleHideShow(t.oConfig.getSugDivId(),!_40);
vE.toggleHideShow(t.oConfig.getNoSugDivId(),_40);
if(_40){
var _42=function(){
if(t.isNoSugMsgShow()){
t.showSugDiv(false);
}
};
window.setTimeout(_42,t.oConfig.getNoSugShowTime());
}
},showSugDiv:function(_43,_44){
var t=this;
if(t.isHideSuggestion()&&_43){
t.showIcon(true);
return;
}
var vS=vjo.dsf.document.Shim,oDiv=vjo.dsf.document.Element.get(t.oConfig.getContainerId());
vjo.dsf.document.Element.toggleHideShow(t.oConfig.getContainerId(),_43);
if(_43){
t.posLayer(_44);
if(t.oIframeShim){
vS.remove(oDiv,t.oIframeShim);
}
t.oIframeShim=vS.add(oDiv);
}else{
if(t.oIframeShim!==null){
vS.remove(oDiv,t.oIframeShim);
t.oIframeShim=null;
}
}
},posLayer:function(_47){
var _48=this.getAbsPos(this.sInputId);
if(_48===null){
return false;
}
var e=vjo.dsf.document.Element.get(this.oConfig.getContainerId());
if(e===null){
return false;
}
e.style.left=_48.left+"px";
e.style.top=_48.top+_48.height+"px";
if((typeof (_47)!="undefined")&&(_47!==null)){
e.style.width=parseInt(_47,10)+"px";
}
return true;
},getAbsPos:function(_4a,_4b){
var obj=_4a;
if(!_4a){
return null;
}
if(typeof (_4a)=="string"){
obj=vjo.dsf.document.Element.get(_4a);
if(obj===null){
return null;
}
}
var top=obj.offsetTop,left=obj.offsetLeft,height=obj.offsetHeight,width=obj.offsetWidth;
var pos="",of="";
obj=obj.offsetParent;
while(obj!==null){
if(_4b){
pos=obj.currentStyle?obj.currentStyle.position:window.getComputedStyle(obj,null).getPropertyValue("position");
of=obj.currentStyle?obj.currentStyle.overflow:window.getComputedStyle(obj,null).getPropertyValue("overflow");
if(pos=="absolute"||pos=="relative"||(of!=="visible"&&of!=="")){
break;
}
}
top+=obj.offsetTop;
left+=obj.offsetLeft;
obj=obj.offsetParent;
}
return {"left":parseInt(left,10),"top":parseInt(top,10),"height":parseInt(height,10),"width":parseInt(width,10)};
},updateInput:function(pKw){
if(this.isSugShown()){
this.sLastKw=pKw;
var _50={"type":"kw_updvalue","value":pKw};
this.sendInSvc(_50);
}
},updTrk:function(_51){
var _52={"type":"search_updtrk","lnkStr":_51};
this.sendInSvc(_52);
},submitForm:function(){
var t=this;
if(t.iCurSel>=0){
var trk=t.aCurKwList[t.iCurSel].trk;
t.updTrk(trk);
}
var _55={"type":"search_submit"};
this.sendInSvc(_55);
},showIcon:function(_56){
var _57={"type":"sug_icon_show","bShow":_56};
this.sendInSvc(_57);
},focusInput:function(){
var _58={"type":"kw_focus"};
this.sendInSvc(_58);
},setAutoComplete:function(bOn){
var _5a={"type":"kw_autocomplete","bOn":bOn};
this.sendInSvc(_5a);
},setInputId:function(pId){
if(this.sInputId===null){
this.sInputId=pId;
}
var e=vjo.dsf.document.Element.get(pId);
if(e){
this.oConfig.updateWidthDef(e);
}
},show_click:function(_5d){
var t=this;
t.showIcon(false);
t.setHideSuggestion(false);
t.bLastQueryEmpty=false;
t.oRequest.send(t.sRequestId,t.getInputValue());
var _5f=function(){
t.createTrackingImg(t.oConfig.getTrkShow());
};
window.setTimeout(_5f,500);
t.setAutoComplete(false);
},kw_blur:function(_60){
if(this.isSugShown()&&!this.isNoSugMsgShow()){
if(!this.bInSugDiv){
this.selectSug(null,true);
this.showSugDiv(false);
}else{
this.focusInput();
}
}
},kw_mouseover:function(_61){
if(this.isSugShown()&&!this.isNoSugMsgShow()){
this.selectSug(null);
}
},kw_keydown:function(_62){
var t=this,kc=_62.keyCode;
if(kc==13&&t.isSugShown()&&!t.isNoSugMsgShow()){
t.submitForm();
t.showSugDiv(false);
}
},kw_keyup:function(_64){
var t=this,vE=vjo.dsf.document.Element,kc=_64.keyCode,cv=_64.value;
if(t.isIgnorKey(kc)){
return;
}
if(t.isSugShown()&&!t.isNoSugMsgShow()){
if(t.isCtrlKey(kc)){
var e,nextId,divId;
switch(kc){
case 38:
nextId=t.iCurSel-1;
if(nextId<-1){
nextId=t.aCurKwList.length-1;
}
divId=nextId>=0?t.aCurKwList[nextId].divId:null;
t.selectSug(divId);
t.iCurSel=nextId;
break;
case 40:
nextId=t.iCurSel+1;
if(nextId>=t.aCurKwList.length){
nextId=-1;
}
divId=nextId>=0?t.aCurKwList[nextId].divId:null;
t.selectSug(divId);
break;
case 39:
if(cv.length!==0){
t.sCurKw=cv;
t.startKeyTimer(cv);
t.sLastKw=cv;
}
break;
case 27:
t.selectSug(null);
t.showSugDiv(false);
break;
}
}else{
if(cv.length!==0){
if(t.sLastKw!=cv){
t.sCurKw=cv;
t.startKeyTimer(cv);
t.sLastKw=cv;
}
}else{
t.showSugDiv(false);
t.showIcon(false);
t.sCurKw=cv;
t.sLastKw=cv;
t.bLastQueryEmpty=false;
}
}
}else{
if(cv.length!==0){
if(t.sLastKw!=cv){
t.sCurKw=cv;
t.startKeyTimer(cv);
t.sLastKw=cv;
}
}else{
t.sCurKw=cv;
if(t.isHideSuggestion()){
t.showIcon(false);
}
t.sLastKw=cv;
t.bLastQueryEmpty=false;
}
}
},onListMouseOver:function(_67){
this.bInSugDiv=true;
var e=_67.src;
this.selectSug(e.id);
},onListClick:function(_69){
var e=_69.src;
this.selectSug(e.id);
this.submitForm();
this.showSugDiv(false);
},onMouseIn:function(_6b){
this.bInSugDiv=true;
},onMouseOut:function(_6c){
this.bInSugDiv=false;
},onHideClick:function(_6d){
var t=this;
t.setHideSuggestion(true);
t.selectSug(null);
t.showSugDiv(false);
t.setAutoComplete(true);
t.showIcon(true);
var _6f=function(){
t.createTrackingImg(t.oConfig.getTrkHide());
};
window.setTimeout(_6f,500);
return false;
},onWindowResize:function(_70){
var t=this;
if(t.isSugShown()){
t.showSugDiv(true);
}
}});

vjo.needs("vjo.dsf.EventDispatcher");
vjo.needs("vjo.dsf.ServiceEngine");
vjo.needs("vjo.darwin.domain.finding.autofill.AutoFillConfig");
vjo.needs("vjo.darwin.domain.finding.autofill.AutoFill");
vjo.needs("vjo.darwin.domain.finding.autofill.AutoFillRequest");
vjo.type("vjo.darwin.domain.finding.autofill.AutoFillInit").protos({constructs:function(_1){
this.oModel=_1;
var t=this;
var _3=function(){
var _4=new vjo.darwin.domain.finding.autofill.AutoFillConfig(t.oModel);
var _5={"baseURL":_4.getBaseURL(),"dirDepth":_4.getDirDepth(),"rootDir":_4.getRootDir(),"algorithm":_4.getAlgorithm(),"version":_4.getVersion(),"siteId":_4.getSiteId()};
vjo.darwin.domain.finding.autofill.AutoFillRequest.init(_5);
new vjo.darwin.domain.finding.autofill.AutoFill(_4,t.oModel.requestId);
};
vjo.dsf.EventDispatcher.add("body","load",_3);
}});

vjo.needs("vjo.dsf.cookie.VjCookieJar");
vjo.needs("vjo.dsf.client.Browser");
vjo.needs("vjo.dsf.utils.URL");
vjo.needs("vjo.dsf.typeextensions.string.Comparison");
vjo.type("vjo.darwin.core.exitsurvey.ExitSurvey").protos({constructs:function(_1){
this.oC=_1;
this.oLastActElem=null;
this.bDisable=false;
this.bQualified=true;
this.oCl=vjo.dsf.client.Browser;
this.oCJ=vjo.dsf.cookie.VjCookieJar;
},onload:function(){
with(this){
var u=oC.commandUrl,l=document.location.href,ex="express.",cg="cgi1.";
if(l.has(ex)&&!u.has(ex)){
u=u.replace(cg,cg+ex);
oC.commandUrl=u;
}
if(((oCl.bFirefox&&oCl.fVer>=1.5)||(oCl.bIE&&oCl.fVer>=6)||(oCl.bSafari&&oCl.fVer>=2)||(oCl.bOpera&&oCl.fVer>=9))){
bQualified=true;
}
bQualified=true;
}
vjo.dsf.EventDispatcher.addEventListener(window,"unload",function(_3){
vjo.Registry.get("ExitSurvey").onunload(_3);
});
},onunload:function(_4){
with(this){
var _5=oCJ.readCookie("ebay","sbf"),svy=oCJ.readCookie("dp1","svy"),ie=isImmediateExit();
if(oC.showOnlyImmediateExits&&!ie){
return;
}
if(!bDisable&&bQualified&&isExit()&&!svy.has(oC.surveyId)&&!oCJ.getBitFlag(_5,14)){
oCJ.writeCookielet("ebay","sbf",oCJ.setBitFlag(_5,14,1));
oCJ.writeCookielet("dp1","svy",svy+oC.surveyId,"","",oCJ.getExpDate(183));
b=confirm(oC.headText+"\n\n"+oC.bodyText);
u=oC.commandUrl;
u=addArg(u,"flow",oC.flow);
u=addArg(u,"vpagename",oC.pageName);
u=addArg(u,"surveyid",oC.surveyId);
u=addArg(u,"immexit",(ie?oC.yes:oC.no));
if(b){
u=addArg(u,"action",oC.ok)+"&"+oC.extraQryStrInfo;
w=window.open(u,"pop","width="+(parseInt(screen.availWidth)-30)+",height="+(parseInt(screen.availHeight)-30)+",left=0,top=0,scrollbars=1,resizable=1");
if(w&&!w.closed){
w.focus();
}else{
window.location.href=u;
}
}else{
u=addArg(u,"action",oC.cancel)+"&"+oC.extraQryStrInfo;
window.open(u,"pop","width=1,height=1,screenX=5000,screenY=5000,left=5000,top=5000");
}
}
}
},onclick:function(_6){
if(_6&&_6.nativeEvent){
var ev=_6.nativeEvent,e=ev.srcElement||ev.target;
if(e){
this.setActElem(e);
}
}
},onkeydown:function(_8){
if(_8&&_8.nativeEvent){
if(_8.nativeEvent.keyCode==13){
this.disable();
}
}
},isExit:function(){
with(this){
var oA=oLastActElem,t,b=true,pe;
var _a=oC.lnkExceptions,aBtn=oC.btnExceptions,aFunc=oC.funcExceptions,aImg=oC.imgExceptions;
if(!oA||oA==null){
return true;
}
if(!oA.tagName||typeof (oA.tagName)=="unknown"){
return false;
}
t=oA.tagName;
t=t.toUpperCase();
if(t=="A"&&typeof (oA.onclick)!="function"&&!oA.target&&!isOtherDomain(oA)){
b=false;
}else{
if(oA.href=="javascript:{}"||isException(oA.id,_a)||isException(oA.name,_a)||(typeof (oA.onclick)=="function"&&isException(oA.onclick.toString(),aFunc))){
b=false;
}else{
if(t=="INPUT"){
if(oA.type=="submit"||oA.type=="image"||oA.type=="text"||oA.type=="checkbox"){
b=false;
}else{
if(oA.type=="button"&&typeof (oA.onclick)=="function"&&!isException(oA.id,aBtn)){
b=false;
}
}
}else{
if(t=="IMG"){
pe=oA.parentNode;
if(pe!=null&&pe.tagName=="A"&&!pe.target&&!isException(oA.href,aImg)){
b=false;
}
}else{
if(t=="I"||t=="B"||t=="SPAN"){
if(!oCl.bFirefox){
pe=oA.parentNode;
if(pe!=null&&pe.tagName=="A"&&!pe.target&&!isException(pe.href,_a)&&!isOtherDomain(pe)){
b=false;
}
}else{
b=false;
}
}else{
if(t=="SELECT"||t=="BUTTON"||t=="OPTION"||t=="TEXT"){
b=false;
}
}
}
}
}
}
return b;
}
},isImmediateExit:function(){
var dd=document.domain,i=dd.indexOf(".ebay.");
if(i!=-1){
dd=dd.substr(i+1);
}
return !document.referrer.has(dd);
},isOtherDomain:function(_c){
var s=this.oC.domainExceptionString;
return s?!_c.href.has(this.oC.domainExceptionString):false;
},isException:function(_e,_f){
for(var i=0;i<_f.length;i++){
if(_e&&_e.has(_f[i])){
return true;
}
}
return false;
},disable:function(){
this.bDisable=true;
},enable:function(){
this.bDisable=false;
},setActElem:function(_11){
this.oLastActElem=_11;
},addArg:function(_12,_13,_14){
return vjo.dsf.utils.URL.addArg(_12,_13,_14);
}});


// en_US/e571/CCHP_HomepageV4_SLDR_e5716844959_6_en_US
// b=6844959