/*       Source:  Local Cache                                                                 */
/*     Location:  rsrc:108910:nu_ll:/html/js/wizard_log.js                                    */
/*      Machine:  10.16.140.105                                                               */
/*    Generated:  September 13th 2008 1:22:12 AM PDT                                          */
/*    HTTP Host:  static.ak.fbcdn.net                                                         */
/*       Locale:  nu_ll                                                                       */


function wizard_initialize_onclick_logging(){var hrefs=document.getElementsByTagName('a');for(var ii=hrefs.length-1;ii>=0;ii--){var elem=hrefs[ii];addEventBase(elem,'click',_wizard_log_onclick.bind(elem),'wizard');}
var search_form=ge('universal_search_form');if(search_form){addEventBase(search_form,'submit',function(){var textbox=ge('q');if(textbox){wizard_log_string('search:'+textbox.value);}},'wizard');}}
function _wizard_log_onclick(){if(this.getAttribute('href')=='#'||_wizard_log_onclick.already_logged==true){return;}
var script=this.href&&URI(this.href).getPath();if(script&&script.search(/^javascript:/)!=0){_wizard_log_onclick.already_logged=true;wizard_log_string(DOM.getText(this)+','+script);}}
_wizard_log_onclick.already_logged=false;function wizard_log_string(str){str=str.replace(/ /g,'_');new AsyncSignal('/ajax/wizard.php',{log:str}).send();}
if (window.Bootloader) { Bootloader.done(["js\/wizard_log.js"]); }