/*       Source:  Local Cache                                                                 */
/*     Location:  rsrc:120056:nu_ll:/html/js/status.js                                        */
/*      Machine:  10.16.139.102                                                               */
/*    Generated:  September 13th 2008 1:22:09 AM PDT                                          */
/*    HTTP Host:  static.ak.fbcdn.net                                                         */
/*       Locale:  nu_ll                                                                       */


function StatusEditor(root){this.rootElem=root;this.statusPlaceholder=DOM.find(root,'input.status_placeholder_input');this.statusInput=DOM.find(root,'input.status_input');this.emptyValue=this.statusInput.value;this.initialValue='';this._attach();this.statusPlaceholder.listen('focus',this._onFocused.bind(this));StatusEditor.instances.push(this);}
StatusEditor.instances=[];StatusEditor.update=function(status,time,initiator){if(typeof initiator=='undefined'){initiator=null;}
for(var i=0;i<StatusEditor.instances.length;i++){var editor=StatusEditor.instances[i];if(editor!=initiator){editor._onUpdate(status,time);}}}
StatusEditor.prototype._onUpdate=bagofholding;StatusEditor.prototype._attach=function(){this.statusInput.onkeypress=this.onkeypress.bind(this);this.statusInput.onblur=this.onInputBlur.bind(this);}
StatusEditor.prototype.onkeypress=function(event){if(event_get_keypress_keycode(event)==KEYS.RETURN){this.post();return $E(event).kill();}}
StatusEditor.prototype.onInputBlur=function(){var trimmed=trim(this.statusInput.value);if(this.isNonedit(trimmed)){this.reset();}}
StatusEditor.prototype.clear=function(){new AsyncRequest().setURI('/updatestatus.php').setData({'clear':1}).setHandler(function(){this._onCleared();StatusEditor.update('',null,this);}.bind(this)).send();return false;}
StatusEditor.prototype._onCleared=bagofholding;StatusEditor.prototype._onFocused=bagofholding;StatusEditor.prototype.startEdit=function(value){this.statusInput.value=value;this.initialValue=value;this.statusPlaceholder.focus();}
StatusEditor.prototype.reset=function(){CSS.removeClass(this.rootElem,'placeholder_off');this.statusPlaceholder.getControl().setFocused(false);}
StatusEditor.prototype.isNonedit=function(text){return!text||(text==trim(this.emptyValue))||(this.initialValue&&(text==this.initialValue));}
StatusEditor.prototype.post=function(){var text=trim(this.statusInput.value);if(this.isNonedit(text)){return;}
this.statusInput.disabled=true;CSS.addClass(this.rootElem,'disabled');this.statusInput.blur();new AsyncRequest().setURI('/updatestatus.php').setData({'status':text}).setFinallyHandler(function(){this.statusInput.disabled=false;CSS.removeClass(this.rootElem,'disabled');}.bind(this)).setHandler(function(r){this.reset();this.initialValue=this.statusInput.value;var payload=r.getPayload();this._onPosted(payload);StatusEditor.update(payload.markup,null,this);}.bind(this)).send();}
StatusEditor.prototype._onPosted=bagofholding;function HomeStatusEditor(root){this.parent.construct(this,root);this.statusBody=DOM.find(root,'div.status_body');DOM.find(root,'a.status_clear_link').onclick=this.clear.bind(this);this.postButton=DOM.find(root,'input[type="submit"]');this.postButton.onclick=this.post.bind(this);}
HomeStatusEditor.extend(StatusEditor);HomeStatusEditor.prototype._onUpdate=function(status,time){if(!status){this._onCleared();return;}
set_inner_html(DOM.find(this.rootElem,'span.status_text'),status);set_inner_html(DOM.find(this.rootElem,'span.status_time'),time||tx('sp08'));if(CSS.hasClass(this.statusBody,'status_empty')){CSS.removeClass(this.statusBody,'status_empty');animation(this.statusBody).to('height','auto').from('0px').to('opacity',1).from(0).blind().show().duration(300).ease(animation.ease.end).go();}else{animation(this.statusBody).to('opacity',1).from(0).duration(300).go();}}
HomeStatusEditor.prototype._onPosted=function(payload){this._onUpdate(payload.markup,tx('sp08'));}
HomeStatusEditor.prototype._onCleared=function(){CSS.addClass(this.statusBody,'status_empty');animation(this.statusBody).to('height','0px').to('opacity',0).from(1).blind().hide().duration(300).ease(animation.ease.end).go();}
function ChatStatusEditor(root,isEmpty){this.parent.construct(this,root);this.statusBody=DOM.find(root,'div.chat_status_body');this.isEmpty=isEmpty;this._init();};ChatStatusEditor.extend(StatusEditor);ChatStatusEditor.prototype._init=function(){DOM.find(this.rootElem,'a.status_clear_link').onclick=this.clear.bind(this);var edit_links=DOM.scry(this.rootElem,'a.status_edit_link');for(var i=0;i<edit_links.length;i++){edit_links[i].onclick=this.startEdit.bind(this,this.emptyValue);}}
ChatStatusEditor.prototype.reset=function(){this.parent.reset();CSS.removeClass(this.rootElem,'edit');if(this.isEmpty){CSS.addClass(this.statusBody,'status_empty');}else{CSS.removeClass(this.statusBody,'status_empty');}}
ChatStatusEditor.prototype._onUpdate=function(status,time){if(status){this.isEmpty=false;$('chat_su_text').innerHTML=status;$('chat_su_time').innerHTML=time||tx('sp08');}else{this.isEmpty=true;$('chat_su_text').innerHTML='';$('chat_su_time').innerHTML='';}
this.statusInput.value=this.emptyValue;this.reset();}
ChatStatusEditor.prototype._onCleared=function(){this._onUpdate('',null);}
ChatStatusEditor.prototype.startEdit=function(value){CSS.addClass(this.rootElem,'edit');this.parent.startEdit(value);}
ChatStatusEditor.prototype._onPosted=function(payload){this._onUpdate(payload.markup);};
if (window.Bootloader) { Bootloader.done(["js\/status.js"]); }