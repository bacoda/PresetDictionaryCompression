/*       Source:  Global Cache                                                                */
/*     Location:  js/tabs/tabset.js r121202                                                   */
/*      Machine:  10.16.140.107                                                               */
/*    Generated:  September 13th 2008 1:22:08 AM PDT                                          */
/*    HTTP Host:  static.ak.fbcdn.net                                                         */
/*       Locale:  nu_ll                                                                       */


function Tabset(id,selectedId){if(!Tabset.instances){Tabset.instances={};}
Tabset.instances[id]=this;onunloadRegister(function(){Tabset.instances={}});this.id=id;this.selectedId=selectedId;}
Tabset.getInstance=function(id){if(Tabset.instances&&Tabset.instances[id]){return Tabset.instances[id];}
return null;}
Tabset.prototype.getFullTabId=function(tabId){return this.id+'_'+tabId;}
Tabset.prototype.selectTab=function(tabId,func,beforeClickFunc){if(beforeClickFunc&&!beforeClickFunc()){return false;}
if(this.selectedId){this.lastSelected=this.selectedId;CSS.removeClass(ge(this.selectedId),'Tabset_selected');}
this.selectedId=tabId;CSS.addClass(ge(this.selectedId),'Tabset_selected');if(func){return func();}
return true;}
Tabset.prototype.unselect=function(){if(this.selectedId){CSS.removeClass($(this.selectedId),'Tabset_selected');}}
Tabset.prototype.hasTabElem=function(id){return ge(this.id+'_'+id);}
Tabset.prototype.getTabElem=function(id){return $(this.id+'_'+id);}
if (window.Bootloader) { Bootloader.done(["js\/tabs\/tabset.js"]); }