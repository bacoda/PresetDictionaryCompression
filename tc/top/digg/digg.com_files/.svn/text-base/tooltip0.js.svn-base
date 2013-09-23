var config=new Object();var tt_Debug=true;var tt_Enabled=true;var TagsToTip=true;config.Above=false;config.BgColor="#fff";
config.BgImg="";config.BorderColor="#85be35";config.BorderStyle="solid";config.BorderWidth=1;config.CenterMouse=false;
config.ClickClose=false;config.CloseBtn=false;config.CloseBtnColors=["#990000","#FFFFFF","#DD3333","#FFFFFF"];
config.CloseBtnText="&nbsp;X&nbsp;";config.CopyContent=true;config.Delay=500;config.Duration=0;config.FadeIn=0;
config.FadeOut=0;config.FadeInterval=30;config.Fix=null;config.FollowMouse=true;config.FontColor="#777";
config.FontFace="arial,helvetica,sans-serif";config.FontSize="11px";config.FontWeight="normal";config.Left=false;
config.OffsetX=22;config.OffsetY=15;config.Opacity=100;config.Padding=5;config.Shadow=false;config.ShadowColor="";
config.ShadowWidth=0;config.Sticky=false;config.TextAlign="left";config.Title="";config.TitleAlign="left";
config.TitleBgColor="";config.TitleFontColor="#ffffff";config.TitleFontFace="";config.TitleFontSize="";
config.Width=0;function Tip(){tt_Tip(arguments,null)}function TagToTip(){if(TagsToTip){var A=tt_GetElt(arguments[0]);
if(A){tt_Tip(arguments,A)}}}var tt_aElt=new Array(10),tt_aV=new Array(),tt_sContent,tt_scrlX=0,tt_scrlY=0,tt_musX,tt_musY,tt_over,tt_x,tt_y,tt_w,tt_h;
function tt_Extension(){tt_ExtCmdEnum();tt_aExt[tt_aExt.length]=this;return this}function tt_SetTipPos(B,D){var C=tt_aElt[0].style;
tt_x=B;tt_y=D;C.left=B+"px";C.top=D+"px";if(tt_ie56){var A=tt_aElt[tt_aElt.length-1];if(A){A.style.left=C.left;
A.style.top=C.top}}}function tt_Hide(){if(tt_db&&tt_iState){if(tt_iState&2){tt_aElt[0].style.visibility="hidden";
tt_ExtCallFncs(0,"Hide")}tt_tShow.EndTimer();tt_tHide.EndTimer();tt_tDurt.EndTimer();tt_tFade.EndTimer();
if(!tt_op&&!tt_ie){tt_tWaitMov.EndTimer();tt_bWait=false}if(tt_aV[CLICKCLOSE]){tt_RemEvtFnc(document,"mouseup",tt_HideInit)
}tt_AddRemOutFnc(false);tt_ExtCallFncs(0,"Kill");if(tt_t2t&&!tt_aV[COPYCONTENT]){tt_t2t.style.display="none";
tt_MovDomNode(tt_t2t,tt_aElt[6],tt_t2tDad)}tt_iState=0;tt_over=null;tt_ResetMainDiv();if(tt_aElt[tt_aElt.length-1]){tt_aElt[tt_aElt.length-1].style.display="none"
}}}function tt_GetElt(A){return(document.getElementById?document.getElementById(A):document.all?document.all[A]:null)
}function tt_GetDivW(A){return(A?(A.offsetWidth||A.style.pixelWidth||0):0)}function tt_GetDivH(A){return(A?(A.offsetHeight||A.style.pixelHeight||0):0)
}function tt_GetScrollX(){return(window.pageXOffset||(tt_db?(tt_db.scrollLeft||0):0))}function tt_GetScrollY(){return(window.pageYOffset||(tt_db?(tt_db.scrollTop||0):0))
}function tt_GetClientW(){return(document.body&&(typeof (document.body.clientWidth)!=tt_u)?document.body.clientWidth:(typeof (window.innerWidth)!=tt_u)?window.innerWidth:tt_db?(tt_db.clientWidth||0):0)
}function tt_GetClientH(){return(document.body&&(typeof (document.body.clientHeight)!=tt_u)?document.body.clientHeight:(typeof (window.innerHeight)!=tt_u)?window.innerHeight:tt_db?(tt_db.clientHeight||0):0)
}function tt_GetEvtX(A){return(A?((typeof (A.pageX)!=tt_u)?A.pageX:(A.clientX+tt_scrlX)):0)}function tt_GetEvtY(A){return(A?((typeof (A.pageY)!=tt_u)?A.pageY:(A.clientY+tt_scrlY)):0)
}function tt_AddEvtFnc(B,A,C){if(B){if(B.addEventListener){B.addEventListener(A,C,false)}else{B.attachEvent("on"+A,C)
}}}function tt_RemEvtFnc(B,A,C){if(B){if(B.removeEventListener){B.removeEventListener(A,C,false)}else{B.detachEvent("on"+A,C)
}}}var tt_aExt=new Array(),tt_db,tt_op,tt_ie,tt_ie56,tt_bBoxOld,tt_body,tt_flagOpa,tt_maxPosX,tt_maxPosY,tt_iState=0,tt_opa,tt_bJmpVert,tt_t2t,tt_t2tDad,tt_elDeHref,tt_tShow=new Number(0),tt_tHide=new Number(0),tt_tDurt=new Number(0),tt_tFade=new Number(0),tt_tWaitMov=new Number(0),tt_bWait=false,tt_u="undefined";
function tt_Init(){tt_MkCmdEnum();if(!tt_Browser()||!tt_MkMainDiv()){return }tt_IsW3cBox();tt_OpaSupport();
tt_AddEvtFnc(document,"mousemove",tt_Move);if(TagsToTip||tt_Debug){tt_SetOnloadFnc()}tt_AddEvtFnc(window,"scroll",function(){tt_scrlX=tt_GetScrollX();
tt_scrlY=tt_GetScrollY();if(tt_iState&&!(tt_aV[STICKY]&&(tt_iState&2))){tt_HideInit()}});tt_AddEvtFnc(window,"unload",tt_Hide);
tt_Hide()}function tt_MkCmdEnum(){var n=0;for(var i in config){eval("window."+i.toString().toUpperCase()+" = "+n++)
}tt_aV.length=n}function tt_Browser(){var n,nv,n6,w3c;n=navigator.userAgent.toLowerCase(),nv=navigator.appVersion;
tt_op=(document.defaultView&&typeof (eval("window.opera"))!=tt_u);tt_ie=n.indexOf("msie")!=-1&&document.all&&!tt_op;
if(tt_ie){var ieOld=(!document.compatMode||document.compatMode=="BackCompat");tt_db=!ieOld?document.documentElement:(document.body||null);
if(tt_db){tt_ie56=parseFloat(nv.substring(nv.indexOf("MSIE")+5))>=5.5&&typeof document.body.style.maxHeight==tt_u
}}else{tt_db=document.documentElement||document.body||(document.getElementsByTagName?document.getElementsByTagName("body")[0]:null);
if(!tt_op){n6=document.defaultView&&typeof document.defaultView.getComputedStyle!=tt_u;w3c=!n6&&document.getElementById
}}tt_body=(document.getElementsByTagName?document.getElementsByTagName("body")[0]:(document.body||null));
if(tt_ie||n6||tt_op||w3c){if(tt_body&&tt_db){if(document.attachEvent||document.addEventListener){return true
}}else{tt_Err("wz_tooltip.js must be included INSIDE the body section, immediately after the opening <body> tag.")
}}tt_db=null;return false}function tt_MkMainDiv(){if(tt_body.insertAdjacentHTML){tt_body.insertAdjacentHTML("afterBegin",tt_MkMainDivHtm())
}else{if(typeof tt_body.innerHTML!=tt_u&&document.createElement&&tt_body.appendChild){tt_body.appendChild(tt_MkMainDivDom())
}}if(window.tt_GetMainDivRefs&&tt_GetMainDivRefs()){return true}tt_db=null;return false}function tt_MkMainDivHtm(){return('<div id="WzTtDiV"></div>'+(tt_ie56?('<iframe id="WzTtIfRm" src="javascript:false" scrolling="no" frameborder="0" style="filter:Alpha(opacity=0);position:absolute;top:0px;left:0px;display:none;"></iframe>'):""))
}function tt_MkMainDivDom(){var A=document.createElement("div");if(A){A.id="WzTtDiV"}return A}function tt_GetMainDivRefs(){tt_aElt[0]=tt_GetElt("WzTtDiV");
if(tt_ie56&&tt_aElt[0]){tt_aElt[tt_aElt.length-1]=tt_GetElt("WzTtIfRm");if(!tt_aElt[tt_aElt.length-1]){tt_aElt[0]=null
}}if(tt_aElt[0]){var A=tt_aElt[0].style;A.visibility="hidden";A.position="absolute";A.overflow="hidden";
return true}return false}function tt_ResetMainDiv(){var A=(window.screen&&screen.width)?screen.width:10000;
tt_SetTipPos(-A,0);tt_aElt[0].innerHTML="";tt_aElt[0].style.width=(A-1)+"px"}function tt_IsW3cBox(){var A=tt_aElt[0].style;
A.padding="10px";A.width="40px";tt_bBoxOld=(tt_GetDivW(tt_aElt[0])==40);A.padding="0px";tt_ResetMainDiv()
}function tt_OpaSupport(){var A=tt_body.style;tt_flagOpa=(typeof (A.filter)!=tt_u)?1:(typeof (A.KhtmlOpacity)!=tt_u)?2:(typeof (A.KHTMLOpacity)!=tt_u)?3:(typeof (A.MozOpacity)!=tt_u)?4:(typeof (A.opacity)!=tt_u)?5:0
}function tt_SetOnloadFnc(){tt_AddEvtFnc(document,"DOMContentLoaded",tt_HideSrcTags);tt_AddEvtFnc(window,"load",tt_HideSrcTags);
if(tt_body.attachEvent){tt_body.attachEvent("onreadystatechange",function(){if(tt_body.readyState=="complete"){tt_HideSrcTags()
}})}if(/WebKit|KHTML/i.test(navigator.userAgent)){var A=setInterval(function(){if(/loaded|complete/.test(document.readyState)){clearInterval(A);
tt_HideSrcTags()}},10)}}function tt_HideSrcTags(){if(!window.tt_HideSrcTags||window.tt_HideSrcTags.done){return 
}window.tt_HideSrcTags.done=true;if(!tt_HideSrcTagsRecurs(tt_body)){tt_Err("To enable the capability to convert HTML elements to tooltips, you must set TagsToTip in the global tooltip configuration to true.")
}}function tt_HideSrcTagsRecurs(B){var A,E,D;A=B.childNodes||B.children||null;for(var C=A?A.length:0;
C;){--C;if(!tt_HideSrcTagsRecurs(A[C])){return false}E=A[C].getAttribute?A[C].getAttribute("onmouseover"):(typeof A[C].onmouseover=="function")?A[C].onmouseover:null;
if(E){D=E.toString().match(/TagToTip\s*\(\s*'[^'.]+'\s*[\),]/);if(D&&D.length){if(!tt_HideSrcTag(D[0])){return false
}}}}return true}function tt_HideSrcTag(B){var C,A;C=B.replace(/.+'([^'.]+)'.+/,"$1");A=tt_GetElt(C);if(A){if(tt_Debug&&!TagsToTip){return false
}else{A.style.display="none"}}else{tt_Err("Invalid ID\n'"+C+"'\npassed to TagToTip(). There exists no HTML element with that ID.")
}return true}function tt_Tip(A,B){if(!tt_db){return }if(tt_iState){tt_Hide()}if(!tt_Enabled){return }tt_t2t=B;
if(!tt_ReadCmds(A)){return }tt_iState=1|4;tt_AdaptConfig1();tt_MkTipContent(A);tt_MkTipSubDivs();tt_FormatTip();
tt_bJmpVert=false;tt_maxPosX=tt_GetClientW()+tt_scrlX-tt_w-1;tt_maxPosY=tt_GetClientH()+tt_scrlY-tt_h-1;
tt_AdaptConfig2();tt_Move();tt_ShowInit()}function tt_ReadCmds(A){var C;C=0;for(var B in config){tt_aV[C++]=config[B]
}if(A.length&1){for(C=A.length-1;C>0;C-=2){tt_aV[A[C-1]]=A[C]}return true}tt_Err("Incorrect call of Tip() or TagToTip().\nEach command must be followed by a value.");
return false}function tt_AdaptConfig1(){tt_ExtCallFncs(0,"LoadConfig");if(!tt_aV[TITLEBGCOLOR].length){tt_aV[TITLEBGCOLOR]=tt_aV[BORDERCOLOR]
}if(!tt_aV[TITLEFONTCOLOR].length){tt_aV[TITLEFONTCOLOR]=tt_aV[BGCOLOR]}if(!tt_aV[TITLEFONTFACE].length){tt_aV[TITLEFONTFACE]=tt_aV[FONTFACE]
}if(!tt_aV[TITLEFONTSIZE].length){tt_aV[TITLEFONTSIZE]=tt_aV[FONTSIZE]}if(tt_aV[CLOSEBTN]){if(!tt_aV[CLOSEBTNCOLORS]){tt_aV[CLOSEBTNCOLORS]=new Array("","","","")
}for(var A=4;A;){--A;if(!tt_aV[CLOSEBTNCOLORS][A].length){tt_aV[CLOSEBTNCOLORS][A]=(A&1)?tt_aV[TITLEFONTCOLOR]:tt_aV[TITLEBGCOLOR]
}}if(!tt_aV[TITLE].length){tt_aV[TITLE]=" "}}if(tt_aV[OPACITY]==100&&typeof tt_aElt[0].style.MozOpacity!=tt_u&&!Array.every){tt_aV[OPACITY]=99
}if(tt_aV[FADEIN]&&tt_flagOpa&&tt_aV[DELAY]>100){tt_aV[DELAY]=Math.max(tt_aV[DELAY]-tt_aV[FADEIN],100)
}}function tt_AdaptConfig2(){if(tt_aV[CENTERMOUSE]){tt_aV[OFFSETX]-=((tt_w-(tt_aV[SHADOW]?tt_aV[SHADOWWIDTH]:0))>>1)
}}function tt_MkTipContent(A){if(tt_t2t){if(tt_aV[COPYCONTENT]){tt_sContent=tt_t2t.innerHTML}else{tt_sContent=""
}}else{tt_sContent=A[0]}tt_ExtCallFncs(0,"CreateContentString")}function tt_MkTipSubDivs(){var B="position:relative;margin:0px;padding:0px;border-width:0px;left:0px;top:0px;line-height:normal;width:auto;",A=' cellspacing=0 cellpadding=0 border=0 style="'+B+'"><tbody style="'+B+'"><tr><td ';
tt_aElt[0].innerHTML=(""+(tt_aV[TITLE].length?('<div id="WzTiTl" style="position:relative;z-index:1;"><table id="WzTiTlTb"'+A+'id="WzTiTlI" style="'+B+'">'+tt_aV[TITLE]+"</td>"+(tt_aV[CLOSEBTN]?('<td align="right" style="'+B+'text-align:right;"><span id="WzClOsE" style="padding-left:2px;padding-right:2px;cursor:'+(tt_ie?"hand":"pointer")+';" onmouseover="tt_OnCloseBtnOver(1)" onmouseout="tt_OnCloseBtnOver(0)" onclick="tt_HideInit()">'+tt_aV[CLOSEBTNTEXT]+"</span></td>"):"")+"</tr></tbody></table></div>"):"")+'<div class="tooltip" id="WzBoDy" style="position:relative;z-index:0;"><table'+A+'id="WzBoDyI" style="'+B+'">'+tt_sContent+"</td></tr></tbody></table></div>"+(tt_aV[SHADOW]?('<div id="WzTtShDwR" style="position:absolute;overflow:hidden;"></div><div id="WzTtShDwB" style="position:relative;overflow:hidden;"></div>'):""));
tt_GetSubDivRefs();if(tt_t2t&&!tt_aV[COPYCONTENT]){tt_t2tDad=tt_t2t.parentNode||tt_t2t.parentElement||tt_t2t.offsetParent||null;
if(tt_t2tDad){tt_MovDomNode(tt_t2t,tt_t2tDad,tt_aElt[6]);tt_t2t.style.display="block"}}tt_ExtCallFncs(0,"SubDivsCreated")
}function tt_GetSubDivRefs(){var B=new Array("WzTiTl","WzTiTlTb","WzTiTlI","WzClOsE","WzBoDy","WzBoDyI","WzTtShDwB","WzTtShDwR");
for(var A=B.length;A;--A){tt_aElt[A]=tt_GetElt(B[A-1])}}function tt_FormatTip(){var D,B,A,C;if(tt_aV[TITLE].length){D=tt_aElt[1].style;
D.background=tt_aV[TITLEBGCOLOR];D.paddingTop=(tt_aV[CLOSEBTN]?2:0)+"px";D.paddingBottom="1px";D.paddingLeft=D.paddingRight=tt_aV[PADDING]+"px";
D=tt_aElt[3].style;D.color=tt_aV[TITLEFONTCOLOR];D.fontFamily=tt_aV[TITLEFONTFACE];D.fontSize=tt_aV[TITLEFONTSIZE];
D.fontWeight="bold";D.textAlign=tt_aV[TITLEALIGN];if(tt_aElt[4]){D.paddingRight=(tt_aV[PADDING]<<1)+"px";
D=tt_aElt[4].style;D.background=tt_aV[CLOSEBTNCOLORS][0];D.color=tt_aV[CLOSEBTNCOLORS][1];D.fontFamily=tt_aV[TITLEFONTFACE];
D.fontSize=tt_aV[TITLEFONTSIZE];D.fontWeight="bold"}if(tt_aV[WIDTH]>0){tt_w=tt_aV[WIDTH]+((tt_aV[PADDING]+tt_aV[BORDERWIDTH])<<1)
}else{tt_w=tt_GetDivW(tt_aElt[3])+tt_GetDivW(tt_aElt[4]);if(tt_aElt[4]){tt_w+=tt_aV[PADDING]}}A=-tt_aV[BORDERWIDTH]
}else{tt_w=0;A=0}D=tt_aElt[5].style;D.top=A+"px";if(tt_aV[BORDERWIDTH]){D.borderColor=tt_aV[BORDERCOLOR];
D.borderStyle=tt_aV[BORDERSTYLE];D.borderWidth=tt_aV[BORDERWIDTH]+"px"}if(tt_aV[BGCOLOR].length){D.background=tt_aV[BGCOLOR]
}if(tt_aV[BGIMG].length){D.backgroundImage="url("+tt_aV[BGIMG]+")"}D.padding=tt_aV[PADDING]+"px";D.textAlign=tt_aV[TEXTALIGN];
D=tt_aElt[6].style;D.color=tt_aV[FONTCOLOR];D.fontFamily=tt_aV[FONTFACE];D.fontSize=tt_aV[FONTSIZE];D.fontWeight=tt_aV[FONTWEIGHT];
D.background="";D.textAlign=tt_aV[TEXTALIGN];if(tt_aV[WIDTH]>0){B=tt_aV[WIDTH]+((tt_aV[PADDING]+tt_aV[BORDERWIDTH])<<1)
}else{B=tt_GetDivW(tt_aElt[6])+((tt_aV[PADDING]+tt_aV[BORDERWIDTH])<<1)}if(B>tt_w){tt_w=B}if(tt_aV[SHADOW]){tt_w+=tt_aV[SHADOWWIDTH];
C=Math.floor((tt_aV[SHADOWWIDTH]*4)/3);D=tt_aElt[7].style;D.top=A+"px";D.left=C+"px";D.width=(tt_w-C-tt_aV[SHADOWWIDTH])+"px";
D.height=tt_aV[SHADOWWIDTH]+"px";D.background=tt_aV[SHADOWCOLOR];D=tt_aElt[8].style;D.top=C+"px";D.left=(tt_w-tt_aV[SHADOWWIDTH])+"px";
D.width=tt_aV[SHADOWWIDTH]+"px";D.background=tt_aV[SHADOWCOLOR]}else{C=0}tt_SetTipOpa(tt_aV[FADEIN]?0:tt_aV[OPACITY]);
tt_FixSize(A,C)}function tt_FixSize(A,C){var E,D,B;tt_aElt[0].style.width=tt_w+"px";tt_aElt[0].style.pixelWidth=tt_w;
D=tt_w-((tt_aV[SHADOW])?tt_aV[SHADOWWIDTH]:0);E=D;if(!tt_bBoxOld){E-=((tt_aV[PADDING]+tt_aV[BORDERWIDTH])<<1)
}tt_aElt[5].style.width=E+"px";if(tt_aElt[1]){E=D-(tt_aV[PADDING]<<1);if(!tt_bBoxOld){D=E}tt_aElt[1].style.width=D+"px";
tt_aElt[2].style.width=E+"px"}tt_h=tt_GetDivH(tt_aElt[0])+A;if(tt_aElt[8]){tt_aElt[8].style.height=(tt_h-C)+"px"
}B=tt_aElt.length-1;if(tt_aElt[B]){tt_aElt[B].style.width=tt_w+"px";tt_aElt[B].style.height=tt_h+"px"
}}function tt_DeAlt(C){var A;if(C.alt){C.alt=""}if(C.title){C.title=""}A=C.childNodes||C.children||null;
if(A){for(var B=A.length;B;){tt_DeAlt(A[--B])}}}function tt_OpDeHref(A){if(!tt_op){return }if(tt_elDeHref){tt_OpReHref()
}while(A){if(A.hasAttribute("href")){A.t_href=A.getAttribute("href");A.t_stats=window.status;A.removeAttribute("href");
A.style.cursor="hand";tt_AddEvtFnc(A,"mousedown",tt_OpReHref);window.status=A.t_href;tt_elDeHref=A;break
}A=A.parentElement}}function tt_ShowInit(){tt_tShow.Timer("tt_Show()",tt_aV[DELAY],true);if(tt_aV[CLICKCLOSE]){tt_AddEvtFnc(document,"mouseup",tt_HideInit)
}}function tt_OverInit(A){tt_over=A.target||A.srcElement;tt_DeAlt(tt_over);tt_OpDeHref(tt_over);tt_AddRemOutFnc(true)
}function tt_Show(){var A=tt_aElt[0].style;A.zIndex=Math.max((window.dd&&dd.z)?(dd.z+2):0,1010);if(tt_aV[STICKY]||!tt_aV[FOLLOWMOUSE]){tt_iState&=~4
}if(tt_aV[DURATION]>0){tt_tDurt.Timer("tt_HideInit()",tt_aV[DURATION],true)}tt_ExtCallFncs(0,"Show");
A.visibility="visible";tt_iState|=2;if(tt_aV[FADEIN]){tt_Fade(0,0,tt_aV[OPACITY],Math.round(tt_aV[FADEIN]/tt_aV[FADEINTERVAL]))
}tt_ShowIfrm()}function tt_ShowIfrm(){if(tt_ie56){var A=tt_aElt[tt_aElt.length-1];if(A){var B=A.style;
B.zIndex=tt_aElt[0].style.zIndex-1;B.display="block"}}}function tt_Move(A){A=window.event||A;if(A){tt_musX=tt_GetEvtX(A);
tt_musY=tt_GetEvtY(A)}if(tt_iState){if(!tt_over&&A){tt_OverInit(A)}if(tt_iState&4){if(!tt_op&&!tt_ie){if(tt_bWait){return 
}tt_bWait=true;tt_tWaitMov.Timer("tt_bWait = false;",1,true)}if(tt_aV[FIX]){tt_iState&=~4;tt_SetTipPos(tt_aV[FIX][0],tt_aV[FIX][1])
}else{if(!tt_ExtCallFncs(A,"MoveBefore")){tt_SetTipPos(tt_PosX(),tt_PosY())}}tt_ExtCallFncs([tt_musX,tt_musY],"MoveAfter")
}}}function tt_PosX(){var A;A=tt_musX;if(tt_aV[LEFT]){A-=tt_w+tt_aV[OFFSETX]-(tt_aV[SHADOW]?tt_aV[SHADOWWIDTH]:0)
}else{A+=tt_aV[OFFSETX]}if(A>tt_maxPosX){A=tt_maxPosX}return((A<tt_scrlX)?tt_scrlX:A)}function tt_PosY(){var A;
if(tt_aV[ABOVE]&&(!tt_bJmpVert||tt_CalcPosYAbove()>=tt_scrlY+16)){A=tt_DoPosYAbove()}else{if(!tt_aV[ABOVE]&&tt_bJmpVert&&tt_CalcPosYBelow()>tt_maxPosY-16){A=tt_DoPosYAbove()
}else{A=tt_DoPosYBelow()}}if(A>tt_maxPosY){A=tt_DoPosYAbove()}if(A<tt_scrlY){A=tt_DoPosYBelow()}return A
}function tt_DoPosYBelow(){tt_bJmpVert=tt_aV[ABOVE];return tt_CalcPosYBelow()}function tt_DoPosYAbove(){tt_bJmpVert=!tt_aV[ABOVE];
return tt_CalcPosYAbove()}function tt_CalcPosYBelow(){return(tt_musY+tt_aV[OFFSETY])}function tt_CalcPosYAbove(){var A=tt_aV[OFFSETY]-(tt_aV[SHADOW]?tt_aV[SHADOWWIDTH]:0);
if(tt_aV[OFFSETY]>0&&A<=0){A=1}return(tt_musY-tt_h-A)}function tt_OnOut(){tt_AddRemOutFnc(false);if(!(tt_aV[STICKY]&&(tt_iState&2))){tt_HideInit()
}}function tt_HideInit(){tt_ExtCallFncs(0,"HideInit");tt_iState&=~4;if(tt_flagOpa&&tt_aV[FADEOUT]){tt_tFade.EndTimer();
if(tt_opa){var A=Math.round(tt_aV[FADEOUT]/(tt_aV[FADEINTERVAL]*(tt_aV[OPACITY]/tt_opa)));tt_Fade(tt_opa,tt_opa,0,A);
return }}tt_tHide.Timer("tt_Hide();",1,false)}function tt_OpReHref(){if(tt_elDeHref){tt_elDeHref.setAttribute("href",tt_elDeHref.t_href);
tt_RemEvtFnc(tt_elDeHref,"mousedown",tt_OpReHref);window.status=tt_elDeHref.t_stats;tt_elDeHref=null}}function tt_Fade(A,B,C,D){if(D){B+=Math.round((C-B)/D);
if((C>A)?(B>=C):(B<=C)){B=C}else{tt_tFade.Timer("tt_Fade("+A+","+B+","+C+","+(D-1)+")",tt_aV[FADEINTERVAL],true)
}}B?tt_SetTipOpa(B):tt_Hide()}function tt_SetTipOpa(A){tt_SetOpa(tt_aElt[5].style,A);if(tt_aElt[1]){tt_SetOpa(tt_aElt[1].style,A)
}if(tt_aV[SHADOW]){A=Math.round(A*0.8);tt_SetOpa(tt_aElt[7].style,A);tt_SetOpa(tt_aElt[8].style,A)}}function tt_OnCloseBtnOver(B){var A=tt_aElt[4].style;
B<<=1;A.background=tt_aV[CLOSEBTNCOLORS][B];A.color=tt_aV[CLOSEBTNCOLORS][B+1]}function tt_Int(A){var B;
return(isNaN(B=parseInt(A))?0:B)}function tt_AddRemOutFnc(A){var B=A?tt_AddEvtFnc:tt_RemEvtFnc;if(A!=tt_AddRemOutFnc.bOn){B(tt_over,"mouseout",tt_OnOut);
tt_AddRemOutFnc.bOn=A;if(!A){tt_OpReHref()}}}tt_AddRemOutFnc.bOn=false;Number.prototype.Timer=function(C,B,A){if(!this.value||A){this.value=window.setTimeout(C,B)
}};Number.prototype.EndTimer=function(){if(this.value){window.clearTimeout(this.value);this.value=0}};
function tt_SetOpa(B,A){tt_opa=A;if(tt_flagOpa==1){if(A<100){var C=B.visibility!="hidden";B.zoom="100%";
if(!C){B.visibility="visible"}B.filter="alpha(opacity="+A+")";if(!C){B.visibility="hidden"}}else{B.filter=""
}}else{A/=100;switch(tt_flagOpa){case 2:B.KhtmlOpacity=A;break;case 3:B.KHTMLOpacity=A;break;case 4:B.MozOpacity=A;
break;case 5:B.opacity=A;break}}}function tt_MovDomNode(B,A,C){if(A){A.removeChild(B)}if(C){C.appendChild(B)
}}function tt_Err(A){if(tt_Debug){alert("Tooltip Script Error Message:\n\n"+A)}}function tt_ExtCmdEnum(){var s;
for(var i in config){s="window."+i.toString().toUpperCase();if(eval("typeof("+s+") == tt_u")){eval(s+" = "+tt_aV.length);
tt_aV[tt_aV.length]=null}}}function tt_ExtCallFncs(B,C){var A=false;for(var D=tt_aExt.length;D;){--D;
var E=tt_aExt[D]["On"+C];if(E&&E(B)){A=true}}return A}tt_Init();