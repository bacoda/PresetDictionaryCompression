/*       Source:  Global Cache                                                                */
/*     Location:  js/privacy.js r119221                                                       */
/*      Machine:  10.16.140.102                                                               */
/*    Generated:  September 13th 2008 1:22:07 AM PDT                                          */
/*    HTTP Host:  static.ak.fbcdn.net                                                         */
/*       Locale:  nu_ll                                                                       */


function privacy_show_public_listing_preview_dialog(){var dialog=new pop_dialog('privacy_pop_public_listing_preview_dialog');dialog.show_ajax_dialog('/ajax/privacy_public_listing_dialog.php');}
function privacy_limited_profile_pop_message(){var dialog=new pop_dialog();dialog.show_choice(tx('prv:lp-title'),tx('prv:lp-text'),tx('prv:lp-edit'),function(){document.location='privacy.php?view=limited'},tx('sh:close-button'),function(){generic_dialog.get_dialog(this).hide()});}
function privacy_view_public_listing_pop_message(){var dialog=new pop_dialog();dialog.show_choice(tx('prv:pl-title'),tx('prv:pl-text-1a')+'<br/><br/>'+
tx('prv:pl-text-2')+'<br/><br/>'+
tx('prv:pl-text-3',{'=Facebook Privacy Policy':'<a href="/policy.php">'+
tx('prv:policy')+'</a>'}),tx('sh:close-button'),function(){generic_dialog.get_dialog(this).hide()});}
function privacy_user_unblock(elm,user_id){new AsyncRequest().setURI('/privacy/ajax/block.php').setData({unblock:user_id}).setHandler(function(response){if(response.getErrorIsWarning()){ErrorDialog.showAsyncError(response);}
DOM.remove($(elm).parentNode);}.bind(this)).send();return false;}
function show_privacy_dialog(field){var edit='privacy_edit_'+field;var panel='privacy_panel_'+field;show(edit);if(ua.ie()){var dialog=ge(panel);var goodFrame=ge('goodFrame_'+panel);goodFrame.style.width=(dialog.offsetWidth+120)+"px";goodFrame.style.height=(dialog.offsetHeight)+"px";}}
function privacy_toggle_form_state(obj,state){old_class=state?'disabled':'enabled';new_class=state?'enabled':'disabled';obj.className=obj.className.indexOf(old_class)==-1?(obj.className.indexOf(new_class)==-1?obj.className+' '+new_class:obj.className):obj.className.replace(old_class,new_class);var inputs=obj.getElementsByTagName('input');var selects=obj.getElementsByTagName('select');var options=obj.getElementsByTagName('option');for(var i=0;i<inputs.length;i++){inputs[i].disabled=!state;}
for(var i=0;i<selects.length;i++){selects[i].disabled=!state;}
for(var i=0;i<options.length;i++){options[i].disabled=!state;}}
function privacy_platform_disable_all_cb(){var platform_options_list=ge('platform_options_list1');for(var i=0;i<platform_options_list.childNodes.length;i++){platform_options_list.childNodes[i].childNodes[0].disabled=true;}
platform_options_list.style.color='gray';platform_options_list=ge('platform_options_list2');for(i=0;i<platform_options_list.childNodes.length;i++){platform_options_list.childNodes[i].childNodes[0].disabled=true;}
platform_options_list.style.color='gray';}
function privacy_platform_enable_all_cb(){var platform_options_list=ge('platform_options_list1');for(var i=0;i<platform_options_list.childNodes.length;i++){platform_options_list.childNodes[i].childNodes[0].disabled=false;}
platform_options_list.style.color='black';platform_options_list=ge('platform_options_list2');for(i=0;i<platform_options_list.childNodes.length;i++){platform_options_list.childNodes[i].childNodes[0].disabled=false;}
platform_options_list.style.color='black';}
function privacy_platform_undo_unblock_app(app_id){var blocked_hidden=ge(app_id+'_app_blocked');if(blocked_hidden!=null){blocked_hidden.value=1;hide(app_id+'_unblocked_div');show(app_id+'_blocked_div');}}
function privacy_platform_show_learn_search_dialog(){var dialog=new pop_dialog();var title=ge('learn_search_dialog_title');var content=ge('learn_search_dialog_text');dialog.show_message(title.innerHTML,content.innerHTML);}
function privacy_platform_show_learn_apps_privacy_dialog(){var dialog=new pop_dialog();var title=ge('learn_apps_privacy_dialog_title');var content=ge('learn_apps_privacy_dialog_text');dialog.show_message(title.innerHTML,content.innerHTML);}
function privacy_platform_show_explain_dialog(){var dialog=new pop_dialog();var title=ge('explain_dialog_title');var content=ge('explain_dialog_text');dialog.show_message(title.innerHTML,content.innerHTML);}
function privacy_platform_show_basic_info_dialog(){var dialog=new pop_dialog();var title=ge('basic_info_dialog_title');var content=ge('basic_info_dialog_text');dialog.show_message(title.innerHTML,content.innerHTML);}
function privacy_platform_select_share_radio(){privacy_platform_enable_all_cb();var base_hidden=ge('base_permission');if(base_hidden!=null){base_hidden.value=1;}}
function privacy_platform_select_noshare_radio(){privacy_platform_disable_all_cb();var base_hidden=ge('base_permission');if(base_hidden!=null){base_hidden.value=0;}}
function privacy_platform_show_disabled_noshare_dialog(){var dialog=new pop_dialog();var title=ge('noshare_dialog_title');var content=ge('noshare_dialog_text');dialog.show_message(title.innerHTML,content.innerHTML);}
var PrivacyPlatform={logout:function(elem,app_id){return PrivacyPlatform._generic({'logout':app_id},function(r){elem.parentNode.parentNode.removeChild(elem.parentNode);});},remove:function(elem,app_id){return PrivacyPlatform._generic({'remove':app_id},function(r){CSS.addClass(elem.parentNode.parentNode,'removed');});},add:function(elem,app_id){return PrivacyPlatform._generic({'add':app_id},function(r){CSS.removeClass(elem.parentNode.parentNode,'removed');});},block:function(elem,app_id){return PrivacyPlatform._generic({'block':app_id},function(r){CSS.removeClass(elem.parentNode.parentNode,'unblocked');});},unblock:function(elem,app_id){return PrivacyPlatform._generic({'unblock':app_id},function(r){CSS.addClass(elem.parentNode.parentNode,'unblocked');});},_generic:function(data,handler){new AsyncRequest().setURI('/privacy/ajax/platform.php').setData(data).setHandler(handler).send();return false;}};var PrivacyPlatformRequestBlocking={unblock:function(elem,blockee_uid){return PrivacyPlatformRequestBlocking._generic('unblock=1&blockee_uid='+blockee_uid,{'confirm':1},function(r){CSS.removeClass(elem,'blocked');CSS.addClass(elem,'unblocked');});},block:function(elem,blockee_uid){return PrivacyPlatformRequestBlocking._generic('blockee_uid='+blockee_uid,{'confirm':1},function(r){CSS.removeClass(elem,'unblocked');CSS.addClass(elem,'blocked');});},_generic:function(params,data,handler){new AsyncRequest().setURI('/ajax/block_user_requests.php?'+params).setData(data).setHandler(handler).send();return false;}};
if (window.Bootloader) { Bootloader.done(["js\/privacy.js"]); }