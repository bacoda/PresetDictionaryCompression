/*       Source:  Global Cache                                                                */
/*     Location:  js/lib/util/quickling.js r120977                                            */
/*      Machine:  10.16.139.104                                                               */
/*    Generated:  September 13th 2008 1:22:10 AM PDT                                          */
/*    HTTP Host:  static.ak.fbcdn.net                                                         */
/*       Locale:  nu_ll                                                                       */


var Quickling={isActive:function(){return Quickling._is_active||false;},init:function(version){copy_properties(Quickling,{_is_active:true,_version:version});Quickling._instrumentTimeoutFunc('setInterval');Quickling._instrumentTimeoutFunc('setTimeout');PageTransitions.registerHandler(Quickling._transitionHandler);},_isPageActive:function(uri){if(uri=='#'){return false;}
var uri=new URI(uri);if(uri.getDomain()&&uri.getDomain()!=URI().getDomain()){return false;}
var regex=Quickling._isPageActive.regex;if(!regex){regex=Quickling._isPageActive.regex=new RegExp(env_get('quickling_inactive_page_regex'));}
var testURIString=uri.getPath();var queryData=uri.getQueryData();if(queryData){testURIString+='?'+URI.implodeQuery(queryData);}
if(regex.test(testURIString)){return false;}
return true;},_transitionHandler:function(uri){Quickling._load_count=(Quickling._load_count||0)+1;if(Quickling._isTimeToRefresh()){return false;}
if(!Quickling._isPageActive(uri)){return false;}
uri=new URI(uri).addQueryData({quickling:true});removeHook('onafterloadhooks');removeHook('onloadhooks');new AsyncRequest().setURI(uri.getPath()).setData(uri.getQueryData()).setHandler(Quickling._onresponse).setFinallyHandler(PageTransitions.transitionComplete).setMethod('GET').setReadOnly(true).setOption('useIframeTransport',true).send();return true;},_onresponse:function(response){var payload=response.getPayload();if(payload.redirect){PageTransitions.go(payload.redirect,true);return;}
if(payload.version!=Quickling._version){go_or_replace(window.location,URI(payload.uri).removeQueryData('quickling'),true);return;}
document.title=payload.title||'Facebook';_runHooks('onleavehooks');var content_div=ge('content');if(content_div){content_div.style.height='1234px';content_div.innerHTML='';}
Vector2.scrollTo(new Vector2(0,0,'document'),false);var body_class=payload.body_class||'';document.body.className=body_class
+(CSS.hasClass(document.body,'chat_body')?' chat_body':'');var page_body_element=ge('page_body');if(page_body_element){page_body_element.className=body_class+' pagebody';}
for(var div_id in payload.content){var div=ge(div_id);var content=payload.content[div_id];if(div){if(content===undefined||content===null){Util.warn('Content for div id: '+div_id+' is null');}else{set_inner_html(div,content,true);}}else{Util.warn('Unknown content div id: '+div_id);}}
if(content_div&&content_div.style.height=='1234px'){content_div.style.height='';}},_isTimeToRefresh:function(){return Quickling._load_count>=10;},_instrumentTimeoutFunc:function(original_name){window[original_name+'_native']=(function(orig){var _native=function _native(func,delay){return orig(func,delay);};return _native;})(window[original_name]);window[original_name]=function _setTimeout(func,delay,clear_on_quickling_event){var timeout_id=window[original_name+'_native'](func,delay);if(delay>0){onunloadRegister(function(){clearInterval(timeout_id);},clear_on_quickling_event);}
return timeout_id;};}};
if (window.Bootloader) { Bootloader.done(["js\/lib\/util\/quickling.js"]); }