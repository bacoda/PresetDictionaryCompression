/*       Source:  Global Cache                                                                */
/*     Location:  js/poke.js r114579                                                          */
/*      Machine:  10.16.139.110                                                               */
/*    Generated:  September 13th 2008 1:22:10 AM PDT                                          */
/*    HTTP Host:  static.ak.fbcdn.net                                                         */
/*       Locale:  nu_ll                                                                       */


function show_poke_dialog(uid,pobj,DEPRECATED,parent,refresh,first_name){new PokeController(uid,pobj,parent,refresh,first_name);return false;}
function PokeController(uid,pokeback_obj,parent,refresh,first_name){copy_properties(this,{uid:uid,pokeback:(pokeback_obj?1:0),pokeback_obj:pokeback_obj,failed_captcha:0,parent:parent,refresh:refresh,dialog:null,first_name:first_name,title:null});this.show();}
PokeController.prototype.show=function(){this.dialog=new pop_dialog();if(this.first_name){this.dialog.show_loading_title(tx('pk06',{user_first_name:this.first_name}));this.dialog.do_expand_animation=true;}else{var loading='<div class="dialog_loading">'+tx('sh:loading')+'</div>';this.dialog.show_dialog(loading);}
new AsyncRequest().setURI('/ajax/poke.php').setData({can_poke:this.uid,pokeback:this.pokeback,failed_captcha:this.failed_captcha}).setHandler(this.onresponse.bind(this)).send();}
PokeController.prototype.onresponse=function(response){var p=response.getPayload();this.title=p.dialog_title;if(!p.status||p.warned){this.dialog.make_modal();}
if(p.status){this.dialog.show_choice(this.title,p.dialog_contents,tx('pk01'),this.poke.bind(this),tx('sh:cancel-button'),this.cancel.bind(this));}else{this.dialog.show_message(this.title,p.dialog_contents);}}
PokeController.prototype.cancel=function(){this.dialog.enable_buttons(false);this.dialog.fade_out(100);}
PokeController.prototype.poke=function(){var data={uid:this.uid,pokeback:this.pokeback};var captcha_form=ge('captcha_form');if(captcha_form){var captcha_elements=captcha_form.getElementsByTagName('input');for(var i=0;i<captcha_elements.length;i++){data[captcha_elements[i].name]=captcha_elements[i].value;}}
this.dialog.enable_buttons(false);new AsyncRequest().setURI('/ajax/poke.php').setData(data).setHandler(this.onpoke.bind(this)).send();}
function hide_poke(poke){AsyncRequest.pingURI('ajax/poke.php',{'p':poke},false);return false;}
function hide_poke_obj(obj,rem_class,parent_class){if(obj&&parent_class){pobj=obj;while(pobj.className!=parent_class&&pobj.parentNode){pobj=pobj.parentNode;}}
if(obj&&rem_class){while(obj.className!=rem_class&&obj.parentNode){obj=obj.parentNode;}
if(obj){if(obj.parentNode.getElementsByTagName('div').length==3){DOM.remove(pobj);}
else{DOM.remove(obj);}}}
return false;}
PokeController.prototype.onpoke=function(response){var p=response.getPayload();if(!p.captcha){this.dialog.fade_out(100);this.failed_captcha=1;this.show();return;}
if(this.pokeback){var poke_parent_str=this.parent||'sidebar_item pokes';hide_poke_obj(this.pokeback_obj,'ind_poke',poke_parent_str);if(this.refresh){update_poke_summary(this.refresh,'poke_start_index','poke_end_index','poke_total');}}
this.dialog.show_message(this.title,p.dialog_contents);if(p.status){this.dialog.fade_out(500,1100);}}
function update_poke_summary(display_obj,start,end,total){var start_count=$(start).innerHTML;var end_count=$(end).innerHTML-1;var total_count=$(total).innerHTML-1;$(end).innerHTML=end_count;$(total).innerHTML=total_count;$(display_obj).innerHTML=_gen_poke_summary_text(start_count,end_count,total_count);}
function _gen_poke_summary_text(start,end,total){if(total==1){return tx('pk02');}else if(total==0||end<start){return tx('pk03');}else if(end==total){return tx('pk04',{'number':total});}else{return tx('pk05',{'start':start,'end':end,'total':total});}}
if (window.Bootloader) { Bootloader.done(["js\/poke.js"]); }