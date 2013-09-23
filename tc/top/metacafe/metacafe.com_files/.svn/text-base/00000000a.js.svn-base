var debugData='';
window.onerror=function(m,u,l){
	var c=window.onerror.caller||window.onerror.arguments.caller;
	var i=new Image();
	i.src='http://go.globaladsales.com/1x1.gif?m='+escape(m)
	+'&l='+escape(l)
	+'&c='+escape((''+c).replace(/[+]/g,'%2b'))+'&dd='+escape(debugData)
        +'&u='+escape(u);
	window.onerror=function(){return true;};
	return true;
};
function quoted(str){return(str!=null)?'"'+str+'"':'""';};function aatv_encodeURIComponent(str){if(typeof(encodeURIComponent)=='function')return encodeURIComponent(str);else    return escape(str);};function aatv_add2_url(param,value){if(value)window.aatv_ad_url+='';};function aatv_add2_url_esc(param,value){if(value)aatv_add2_url(param,aatv_encodeURIComponent(value));};function aatv_add_color(param,value,rand){if(value&&typeof(value)=='object')value=value[rand%value.length];aatv_add2_url('color_'+param,value);};function aatv_get_user_data(w,date){var s=w.screen;var n=navigator;var javEnab=navigator.javaEnabled();var tz=-date.getTimezoneOffset();if(s){aatv_add2_url("u_h",s.height);aatv_add2_url("u_w",s.width);aatv_add2_url("u_cd",s.colorDepth);aatv_add2_url("u_ah",s.availHeight);aatv_add2_url("u_aw",s.availWidth);};aatv_add2_url("u_tz",tz);aatv_add2_url("u_hi",history.length);aatv_add2_url("u_ja",javEnab);if(n.plugins)aatv_add2_url("u_pl",n.plugins.length);if(n.mimeTypes)aatv_add2_url("u_mi",n.mimeTypes.length);};function aatv_write_iframe(w,d,theurl){theurl=theurl.substring(0,1000);theurl=theurl.replace(/%\w?$/,'');if(undefined===window.aatv_js){window.aatv_js=true;};if(!aatv_js){var math_var=Math.floor(Math.random()*10000000);d.write('<if'+'rame'+' name="aatv_ads_frame'+math_var+'" id="aatv_ads_frame'+math_var+'"'+' width='+quoted(w.aatv_ad_wid)+' height='+quoted(w.aatv_ad_hei)+' frameborder="0" '+' src="#"'+' scrolling="no">');d.write('</if'+'rame>');top.frames['aatv_ads_frame'+math_var].location.href=theurl;}else{document.write('<scri'+'pt type="text/javascript" src="'+theurl+'">');document.write('</scri'+'pt>');}};function aatv_show_ad(){var nullval=null;var w=window;var d=document;var date=new Date();var rand=date.getTime().toString().substring(0,10);if(w.aatv_port)w.aatv_port=':'+w.aatv_port;else w.aatv_port='';if(w.aatv_srv){srv='http://go.'+w.aatv_srv;}else{srv='http://go.globaladsales.com';};if(undefined===window.aatv_cachebuster||false===window.aatv_cachebuster){w.aatv_ad_url='default.js';}else{w.aatv_ad_url='default.js';};if(undefined===window.aatv_js){w.aatv_js=1;};aatv_add2_url('aatv_js',w.aatv_js);aatv_add2_url('zoneid',w.aatv_zoneid);aatv_add2_url('aatv_wid',w.aatv_ad_wid);aatv_add2_url('aatv_hei',w.aatv_ad_hei);aatv_add2_url('ct0',w.aatv_ct0);aatv_add2_url('bannerid',w.aatv_bannerid);aatv_add2_url('campaignid',w.aatv_campaignid);aatv_add2_url('cpm',w.aatv_cpm);aatv_add2_url_esc('ip',w.ip);aatv_add2_url('gas_test',w.gas_test);aatv_add2_url('srv',w.aatv_srv);
 d.write('<img src="1x1a.gif" width=1 height=1 />');
if(aatv_onpage(w,d)&&d.body){var scr_h=d.body.scrollHeight;var clt_h=d.body.clientHeight;if(clt_h&&scr_h)aatv_add2_url_esc('cc',Math.round(clt_h*100/scr_h));};aatv_get_user_data(w,date);


 var url=location.href;
 var refer=document.referrer;
 if(w.aatv_doc){
         w.aatv_doc[0]=(url === w.aatv_doc[0])? 1:w.aatv_doc[0];
         w.aatv_doc[2]=(url === w.aatv_doc[2])? 1:w.aatv_doc[2];
         aatv_add2_url_esc('url', url);


         w.aatv_doc[1]=(refer === w.aatv_doc[1])? 1:w.aatv_doc[1];
         aatv_add2_url_esc('refer', refer);


         aatv_add2_url_esc('loc', w.aatv_doc[0]);
         aatv_add2_url_esc('ref2', w.aatv_doc[1]);
         aatv_add2_url_esc('loc2', w.aatv_doc[2]);
         aatv_add2_url_esc('tit', w.aatv_doc[3]);
 }else{
/*
         w.aatv_context=w.aatv_context.split('|');

         if(url==w.aatv_context[0].substr(4))w.aatv_context[0]='loc=1';
         if(url==w.aatv_context[2].substr(5))w.aatv_context[2]='loc2=1';
         aatv_add2_url_esc('url',url);

         if(refer==w.aatv_context[1].substr(4))w.aatv_context[1]='ref=1';
         aatv_add2_url_esc('refer',refer);

         w.aatv_context=w.aatv_context.join('|');
         aatv_add2_url_esc('source',w.aatv_context.substr(0,800));
*/
 }


aatv_write_iframe(w,d,w.aatv_ad_url); w.ip=nullval;w.aatv_serv=nullval;w.aatv_ct0=nullval;w.aatv_zoneid=nullval;w.aatv_ad_wid=nullval;w.aatv_ad_hei=nullval;w.aatv_page_loc=nullval;w.aatv_ref_url=nullval;w.aatv_page_url=nullval; };function aatv_onpage(w,d){return w.top.location==d.location;};function aatv_in_adframe(w,d){var documentElement=d.documentElement;if(aatv_onpage(w,d))return false;if(w.aatv_ad_wid&&w.aatv_ad_hei){var wd=1;var ht=1;if(w.innerHeight){wd=w.innerWidth;ht=w.innerHeight;}else if(documentElement&&documentElement.clientHeight){wd=documentElement.clientWidth;ht=documentElement.clientHeight;}else if(d.body){wd=d.body.clientWidth;ht=d.body.clientHeight;};if(ht>2*w.aatv_ad_hei||wd>2*w.aatv_ad_wid)return false;};return true;};function aatv_init_globals(){var w=window;var d=document;var loc=d.location;var ref=d.referrer;var nullval=null;if(w.aatv_page_url==nullval){w.aatv_page_url=ref;if(!aatv_in_adframe(w,d)){w.aatv_page_url=loc;w.aatv_last_modified_time=Date.parse(d.lastModified)/1000;w.aatv_ref_url=ref;}}else{w.aatv_page_loc=ref;if(!aatv_in_adframe(w,d))w.aatv_page_loc=loc;}};aatv_init_globals();aatv_show_ad();
