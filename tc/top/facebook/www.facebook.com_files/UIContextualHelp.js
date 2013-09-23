/*       Source:  Global Cache                                                                */
/*     Location:  js/lib/ui/UIContextualHelp.js r121060                                       */
/*      Machine:  10.16.140.103                                                               */
/*    Generated:  September 13th 2008 1:22:10 AM PDT                                          */
/*    HTTP Host:  static.ak.fbcdn.net                                                         */
/*       Locale:  nu_ll                                                                       */


function UIContextualHelp(){UIContextualHelp.destroy();UIContextualHelp.instance=this;this.lastDocumentHeight=Vector2.getElementDimensions($('content'));this.redrawInterval=function(){if(Vector2.getElementDimensions($('content'))!=this.lastDocumentHeight){this.redraw();}}.bind(this).recur(100);onunloadRegister(UIContextualHelp.destroy);return false;}
UIContextualHelp.prototype.contextualFlags=[];UIContextualHelp.prototype.addFlags=function(flags){for(var i=0;i<flags.length;i++){this.contextualFlags.push(new UIContextualFlag(flags[i]));}}
UIContextualHelp.prototype.hideFlags=function(){for(var i=0;i<this.contextualFlags.length;i++){this.contextualFlags[i].hide();}}
UIContextualHelp.prototype.showFlags=function(){for(var i=0;i<this.contextualFlags.length;i++){this.contextualFlags[i].show();}}
UIContextualHelp.prototype.redraw=function(){for(var i=0;i<this.contextualFlags.length;i++){this.contextualFlags[i].redraw();}}
UIContextualHelp.prototype.destroy=function(){for(var i=0;i<this.contextualFlags.length;i++){this.contextualFlags[i].destroy();}
if(this.redrawInterval){clearInterval(this.redrawInterval);}
delete UIContextualHelp.instance;}
UIContextualHelp.getInstance=function(){if(UIContextualHelp.instance){return UIContextualHelp.instance;}
return new UIContextualHelp();}
UIContextualHelp.destroy=function(){if(UIContextualHelp.instance){UIContextualHelp.instance.destroy();}}
function UIContextualFlag(properties){copy_properties(this,properties);this.follow_obj=$(this.idToFollow);if(!this.parentContainerId){this.parentContainer=$('dropmenu_container');}else{this.parentContainer=$(this.parentContainerId);}
if(!UIContextualFlag.tempContainer){UIContextualFlag.tempContainer=document.createElement('div');CSS.addClass(UIContextualFlag.tempContainer,'UIContextualFlag_TempContainer');document.body.appendChild(UIContextualFlag.tempContainer);}
this.obj=document.createElement('div');CSS.addClass(this.obj,'UIContextualFlag_Container');if(this.id){this.obj.id=this.id;}
var html='<div class="UIContextualFlag_Container'+(this.sideArrow?' UIContextualFlag_HasSideArrow':'')+'">'+'<div class="UIContextualFlag_SideArrow">&nbsp;</div>'+'<div class="UIContextualFlag_Main">'+'<table cellspacing="0" cellpadding="0" border="0"><tr>'+'<td><a class="UIContextualFlag_Hide"></a></td>'+'<td><a class="UIContextualFlag_Title">'+this.title+'</a></td>'+'</tr></table>'+'</div>';if(!this.sideArrow){html+='<div class="UIContextualFlag_Arrow">&nbsp;</div>';}
html+='<div class="UIContextualFlag_Description hidden_elem" id="MyMenu'+this.letter+'">'+this.body+'</div>'+'</div>';set_inner_html(this.obj,html);UIContextualFlag.tempContainer.appendChild(this.obj);this.dimVector=Vector2.getElementDimensions(this.obj.childNodes[0]);if(!this.sideArrow){var arrow=DOM.find(this.obj,'div.UIContextualFlag_Arrow');arrow.style.marginLeft=(this.dimVector.x/2)+'px';}
DOM.find(this.obj,'a.UIContextualFlag_Hide').listen('click',function(event){this.destroy(true);event.kill();return false;}.bind(this));var showHide=function(show){CSS.conditionClass(this.obj,'UIContextualFlag_ShowDescription',show);};this.dropmenu=new dropmenu(DOM.find(this.obj,'div.UIContextualFlag_Main')).registerHTMLMenu('MyMenu'+this.letter).setMenuClickArea('MyMenu'+this.letter).setPosition(this.align).addHook('show',showHide.bind(this,true)).addHook('hide',showHide.bind(this,false));this.show();}
UIContextualFlag.prototype.descriptionShown=false;UIContextualFlag.prototype.show=function(){if(this.obj.parentNode==UIContextualFlag.tempContainer){if(this.cssClass){CSS.addClass(document.body,this.cssClass);}
CSS.setOpacity(this.obj,0);this.obj.parentNode.removeChild(this.obj);this.parentContainer.appendChild(this.obj);this.redraw();animation(this.obj).to('opacity',1).duration(100).go();}}
UIContextualFlag.prototype.redraw=function(){if(this.destroyed){this.hide();return;}
var fposVector=Vector2.getElementPosition(this.follow_obj);if(!fposVector.x&&!fposVector.y){this.hide();return;}
var is_hidden=this.follow_obj;while(is_hidden.parentNode&&is_hidden.parentNode!=document.body){if(CSS.hasClass(is_hidden,'hidden_elem')){this.hide();return;}
is_hidden=is_hidden.parentNode;}
var bookPos=Vector2.getElementPosition(this.parentContainer);var dimVectorOffset=this.sideArrow?0:(this.dimVector.x/2);var newVector=fposVector.add(this.offsetX-bookPos.x-dimVectorOffset,this.offsetY-bookPos.y);newVector.setElementPosition(this.obj);this.show();}
UIContextualFlag.prototype.hide=function(){if(this.obj.parentNode!=UIContextualFlag.tempContainer){if(this.cssClass){CSS.removeClass(document.body,this.cssClass);}
this.dropmenu.hide();this.obj.parentNode.removeChild(this.obj);UIContextualFlag.tempContainer.appendChild(this.obj);}}
UIContextualFlag.prototype.destroy=function(hidden_by_user){if(hidden_by_user&&this.pingOnCloseURI){AsyncRequest.pingURI(this.pingOnCloseURI);}
this.destroyed=true;this.hide();}
if (window.Bootloader) { Bootloader.done(["js\/lib\/ui\/UIContextualHelp.js"]); }