document.write('<!-- Template Id = 3547 Template Name = _V4 - ClickTag - _blank -->\n<script src=\"dailymotion.com_files/flashwrite_1_2.js\"><\/script>');document.write('\n');

//Banner template
//(c)Media Contacts 2006
document.write('<scr'+'ipt language=VBScript>' + '\n');
document.write('Function IE_Detect (version)' + '\n');
document.write('\'Do' + '\n');
document.write('On Error Resume Next' + '\n');
document.write('plugin = (IsObject(CreateObject(\"ShockwaveFlash.ShockwaveFlash.\" & version & \"\")))' + '\n');
document.write('If plugin = true Then' + '\n');
document.write('IE_Detect = true' + '\n');
document.write('End If' + '\n');
document.write('End Function');
document.write('<\/scr'+'ipt>'+'\n');

var mc_banner_tpl = new Object;
mc_banner_tpl.gif = new Object;
mc_banner_tpl.flash = new Object;

var SiteControl = function(macro,value,backup,key,alt){
    key=key?key:"site";
    if (macro!="" && !(macro.indexOf('!')>-1) && value==key){
        if (alt){
        if(macro==alt[0][0]) return alt[0][1];
        else if(macro==alt[1][0]) return alt[1][1];
        } else return macro;
    } else {return (value!=key)?value:backup;}
}

mc_banner_tpl.get_flash_code = function(objFlash) {
    var adcode;
    adcode  = '<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
    adcode += ' ID="FLASH_AD" WIDTH="'+ objFlash.width +'" HEIGHT="'+ objFlash.height +'">';
    adcode += '<PARAM NAME="movie" VALUE="' + objFlash.url  + '?=_blank&'+this.flash.click_tag+'='+ escape(objFlash.clickthru_url) +'">';
    adcode += '<PARAM NAME="quality" VALUE="high"><PARAM NAME="bgcolor" VALUE="#'+ objFlash.bgcolor +'">';
    adcode += '<PARAM NAME="wmode" VALUE="'+ objFlash.wmode +'">';
    adcode += '<EMBED src="' + objFlash.url  + '?=_blank&'+objFlash.click_tag+'='+ escape(objFlash.clickthru_url) +'" quality="high" wmode="'+objFlash.wmode+'" ';
    adcode += ' swLiveConnect="TRUE" WIDTH="'+ objFlash.width +'" ';
    adcode += ' HEIGHT="'+ objFlash.height +'" bgcolor="#'+ objFlash.bgcolor+'" ';
    adcode += ' TYPE="application/x-shockwave-flash" ></EMBED></OBJECT>';
    return adcode;
}
mc_banner_tpl.get_gif_code = function(objGif) {
    return '<A TARGET="_blank" HREF="'+objGif.clickthru_url+'"><IMG SRC="' + objGif.url + '" BORDER="0"></A>';
}

mc_banner_tpl.get_code = function() {
    var adcode;
    if(this.flash_check()){
        adcode = this.get_flash_code(this.flash)
    } else {
        adcode = this.get_gif_code(this.gif);
    }
    return adcode;
}

mc_banner_tpl.flash_check = function () {
    if (navigator.mimeTypes && navigator.mimeTypes["application/x-shockwave-flash"] && navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin) {
        var plugname=navigator.plugins['Shockwave Flash'].description;
        var plugsub=plugname.substring(plugname.indexOf("."),-1);
        var plugsubstr=plugsub.substr(-1);
        if( plugsubstr >= this.flash.flash_version) { 
            return true;
        }
    } else if (document.all) {
        return IE_Detect(this.flash.flash_version); 
    }
    return false;
}
mc_banner_tpl.gif.width = '300';
mc_banner_tpl.gif.height = '250';
mc_banner_tpl.gif.url = 'dailymotion.com_files/no_300x250_player.gif';
mc_banner_tpl.gif.alttext = '';
mc_banner_tpl.gif.clickthru_url = 'http://ad.no.doubleclick.net/click%3Bh=v8/3714/17/a2/%2a/e%3B204960927%3B0-0%3B0%3B27787442%3B4307-300/250%3B27115648/27133527/1%3B%3B%7Esscs%3D%3fhttp://mc.dailymotion.com/masscast/5c/dailymotion.com/home/1941138769/Middle/OasDefault/NO_Blizzar_2818_1288/300x250_wow_NO.html/64356563643031363438393961633230?http://teaser.wow-europe.com';
mc_banner_tpl.flash.width = '300';
mc_banner_tpl.flash.height = '250';
mc_banner_tpl.flash.url = 'dailymotion.com_files/operatest.swf';
mc_banner_tpl.flash.wmode = SiteControl('','site','opaque');
mc_banner_tpl.flash.bgcolor = '';
mc_banner_tpl.flash.clickthru_url = 'http://ad.no.doubleclick.net/click%3Bh=v8/3714/17/a2/%2a/e%3B204960927%3B0-0%3B0%3B27787442%3B4307-300/250%3B27115648/27133527/1%3B%3B%7Esscs%3D%3fhttp://mc.dailymotion.com/masscast/5c/dailymotion.com/home/1941138769/Middle/OasDefault/NO_Blizzar_2818_1288/300x250_wow_NO.html/64356563643031363438393961633230?http://teaser.wow-europe.com';
mc_banner_tpl.flash.click_tag = 'clickTag';
mc_banner_tpl.flash.flash_version = 6;


if(('j'!="j")&&(typeof dclkFlashWrite!="undefined")){
  dclkFlashWrite(mc_banner_tpl.get_code());
}else{
  document.write(mc_banner_tpl.get_code());
}

document.write('\n<noscript><a href=\"http://ad.no.doubleclick.net/click%3Bh=v8/3714/17/a2/%2a/e%3B204960927%3B0-0%3B0%3B27787442%3B4307-300/250%3B27115648/27133527/1%3B%3B%7Esscs%3D%3fhttp://mc.dailymotion.com/masscast/5c/dailymotion.com/home/1941138769/Middle/OasDefault/NO_Blizzar_2818_1288/300x250_wow_NO.html/64356563643031363438393961633230?http://teaser.wow-europe.com\" target=\"_blank\"><img src=\"dailymotion.com_files/no_300x250_player.gif\" border=\"0\"></a></noscript>');
