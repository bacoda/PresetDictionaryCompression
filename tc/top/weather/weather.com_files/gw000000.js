/*
 * Build version UW-11.1.0-94
 */
var rsi_k;
var rsi_now = new Date();
var rsi_csid = 'K06578';
var RSI_REFASLOC=0;var RSI_REFINURL=1;var RSI_TITINURL=0;var RSI_MULTOK=0;var RSI_DOCWRITE=1;var _rsiaa="0805050";var _rsiba="pix04.revsci.net";var _rsica="js";var _rsida="b";var _rsiea="3";var _rsifa=3;var _rsiga=new Array();var _rsiha=0;var _rsiia;var _rsija;var _rsika;var _rsila;var _rsima;var _rsina;_rsioa();function DM_cat(za){_rsiia=za;}function DM_name(Aa){_rsija=Aa;}function DM_keywords(st){_rsika=st;}function DM_event(Ba){_rsila=Ba;}function DM_addToLoc(n,v){_rsima=_rsipa(_rsima,n,v);}function DM_addEncToLoc(n,v){DM_addToLoc(_rsiqa(n),_rsiqa(v));}function DM_setLoc(u){_rsima=u;}function DM_setCsid(Ca){rsi_csid=Ca;}function DM_tag(){var Da;if(_rsiha==0||RSI_MULTOK==1){var Ea=_rsira();if(_rsica=="gif"){Da=new Image(2,3);Da.src=Ea;_rsiga[_rsiga.length]=Da;}else if(_rsica=="js"){if(RSI_DOCWRITE==1){document.write("<script language=\"JavaScript\" type=\"text/javascript\" src=\"weather.com_files/420737968.js\"><"+"/script>");}else{var Fa=document.createElement("script");Fa.language="JavaScript";Fa.type="text/javascript";Fa.src=Ea;Fa.id=_rsisa();if(document.body==null){document.getElementsByTagName("head")[0].appendChild(Fa);}else{document.body.appendChild(Fa);}Da=Fa;}}_rsiha=1;}_rsioa();return Da;}var RSI_CallbackFunc;function _rsita(){var Ga=event.srcElement;if(Ga.readyState=="loaded"){if(RSI_CallbackFunc!=null){RSI_CallbackFunc();}Ga.detachEvent("onreadystatechange",_rsita);__rsicu(Ga.id);}}function __rsicu(id){var Ha=document.getElementById(id);if(Ha!=null){Ha.parentNode.removeChild(Ha);}}function DM_tagAndCallback(Ia){if(_rsiha==0||RSI_MULTOK==1){RSI_CallbackFunc=Ia;var Ja=RSI_DOCWRITE;RSI_DOCWRITE=0;var Ka=DM_tag();if(Ka.readyState!=null){Ka.attachEvent("onreadystatechange",_rsita);}else{var La=document.createElement("script");La.language="JavaScript";La.type="text/javascript";La.id=_rsisa();La.text="RSI_CallbackFunc();__rsicu('"+Ka.id+"');__rsicu('"+La.id+"');";Ka.parentNode.appendChild(La);}RSI_DOCWRITE=Ja;}}function _rsira(){var Ma="";Ma="DM_LOC="+_rsiqa(_rsima);if(_rsiia){Ma+="&DM_CAT="+_rsiqa(_rsiia);}if(_rsila){Ma+="&DM_EVT="+_rsiqa(_rsila);}if(_rsika){Ma+="&DM_KYW="+_rsiqa(_rsika);}if(RSI_REFINURL==1&&_rsina){Ma+="&DM_REF="+_rsiqa(_rsina);}if(RSI_TITINURL==1){Ma+="&DM_TIT="+_rsiqa(document.title);}if(_rsija){Ma+="&DM_NAM="+_rsiqa(_rsija);}Ma+="&DM_EOM=1";var Na=location.protocol+"//";var Oa="/"+rsi_csid+"/"+_rsida+_rsiea+"/0/"+_rsifa+"/"+_rsiaa+"/";var Pa=Math.floor(Math.random()*1000000000)+"."+_rsica;var Qa=Na+_rsiba+Oa+Pa+"?D="+_rsiqa(Ma);var Ra=Qa.length;if(Ra>=2000){if(Qa.charAt(1998)=='%'){Qa=Qa.substr(0,1998);}else if(Qa.charAt(1999)=='%'){Qa=Qa.substr(0,1999);}else{Qa=Qa.substr(0,2000);}}return Qa;}function _rsiua(i){var Sa=i.toString(16).toUpperCase();return Sa.length<2?"0"+str:Sa;}function _rsiva(c){var i=c.charCodeAt(0);if(isNaN(i))return "";if(i<128)return "%"+_rsiua(i);if(i<2048)return "%"+_rsiua(0xC0+(i>>6))+"%"+_rsiua(0x80+(i&0x3F));if(i<65536)return "%"+_rsiua(0xE0+(i>>12))+"%"+_rsiua(0x80+(i>>6&0x3F))+"%"+_rsiua(0x80+(i&0x3F));return "%"+_rsiua(0xF0+(i>>18))+"%"+_rsiua(0x80+(i>>12&0x3F))+"%"+_rsiua(0x80+(i>>6&0x3F))+"%"+_rsiua(0x80+(i&0x3F));}var _rsiqa;if(typeof(encodeURIComponent)=="function"){_rsiqa=encodeURIComponent;}else{var _rsiwa=new RegExp("[\x00-\x20]|[\x22-\x26]|[\x2B-\x2C]|\x2F|[\x3A-\x40]|[\x5B-\x5E]|\x60|[\x7B-\x7D]|[\x7F-\uFFFF]","g");_rsiqa=function(v){return v.toString().replace(_rsiwa,_rsiva);}}function _rsipa(u,n,v){return u+(u.indexOf("?")==-1?"?":"&")+n+"="+v;}function _rsixa(u){var i=u.indexOf('#');return(i>=0)?u.substr(0,i):u;}function _rsioa(){_rsina=_rsixa(document.referrer.toString());_rsima=(RSI_REFASLOC==1)?_rsina:_rsixa(window.location.href);_rsiia=undefined;_rsija=undefined;_rsika=undefined;}var _rsiya=0;function _rsisa(){return "rsi"+_rsiya++;}