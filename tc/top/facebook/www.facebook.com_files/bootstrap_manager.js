/*       Source:  Local Cache                                                                 */
/*     Location:  rsrc:120319:nu_ll:/html/js/friend_lists/bootstrap_manager.js                */
/*      Machine:  10.16.140.109                                                               */
/*    Generated:  September 13th 2008 1:22:08 AM PDT                                          */
/*    HTTP Host:  static.ak.fbcdn.net                                                         */
/*       Locale:  nu_ll                                                                       */


var FriendListManagerBootstrap={FRIEND_LISTS_CHANGED:'flm_friend_lists_changed',bootstrap:function(){var async=new AsyncRequest().setMethod('GET').setReadOnly(true).setURI('/ajax/friend_lists/manager.php');new Dialog().setAsync(async).setButtons(Dialog.OK).setModal().show();return false;}}
if (window.Bootloader) { Bootloader.done(["js\/friend_lists\/bootstrap_manager.js"]); }