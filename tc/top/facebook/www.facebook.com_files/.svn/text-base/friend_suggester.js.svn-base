/*       Source:  Global Cache                                                                */
/*     Location:  js/friend_suggester.js r114564                                              */
/*      Machine:  10.16.139.110                                                               */
/*    Generated:  September 13th 2008 1:22:07 AM PDT                                          */
/*    HTTP Host:  static.ak.fbcdn.net                                                         */
/*       Locale:  nu_ll                                                                       */


FriendSuggesterDialog={_dialog:null,show:function(userid,friend_added){friend_added=friend_added||false;var async=new AsyncRequest().setURI('/ajax/friend_suggester.php').setData({newcomer:userid,friend_added:friend_added})
this._dialog=new Dialog().setClassName('friend_suggester_dialog').setContentWidth(464).setAutoFocus(false).setAsync(async).show();},cancelMultiselect:function(){this._dialog.hide();},submitMultiselect:function(){var data=serialize_form($('friend_suggester_popup_form'));if(!data['ids']){try{fs.notice_show(tx('fs:none-selected'),true);}catch(ex){this._dialog.hide();Util.error('SUGGEST: could not warn user submitting an empty selection: %x',ex);}
return false;}
data['suggest']=1;var async=new AsyncRequest().setURI('/ajax/friend_suggester.php').setData(data);new Dialog().setAsync(async).show();}};
if (window.Bootloader) { Bootloader.done(["js\/friend_suggester.js"]); }