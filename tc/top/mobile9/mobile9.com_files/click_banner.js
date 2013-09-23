document.write('<script src=\"flashwrite_1_2.js\"><\/script>');document.write('\n');

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
    adcode += '<PARAM NAME="movie" VALUE="' + objFlash.url  + '?'+this.flash.click_tag+'='+ escape(objFlash.clickthru_url) +'">';
    adcode += '<PARAM NAME="quality" VALUE="high"><PARAM NAME="bgcolor" VALUE="#'+ objFlash.bgcolor +'">';
    adcode += '<PARAM NAME="wmode" VALUE="'+ objFlash.wmode +'">';
    adcode += '<EMBED src="' + objFlash.url  + '?'+objFlash.click_tag+'='+ escape(objFlash.clickthru_url) +'" quality="high" wmode="'+objFlash.wmode+'" ';
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
mc_banner_tpl.gif.width = '728';
mc_banner_tpl.gif.height = '90';
mc_banner_tpl.gif.url = 'NO_b2c_A_728x90_no_300608.gif';
mc_banner_tpl.gif.alttext = '';
mc_banner_tpl.gif.clickthru_url = 'http://ad.no.doubleclick.net/click%3Bh=v8/3714/17/5d/%2a/g%3B206372166%3B0-0%3B0%3B28783935%3B3454-728/90%3B27210846/27228725/1%3B%3B%7Esscs%3D%3fhttp://media.fastclick.net/w/click.here?cid=135576&mid=258757&sid=18423&m=1&c=0&forced_click=http://www.klm.com/travel/no_en/special_offers/all_offers/index.htm?adcamp=sal.STRJuly2008&adchan=ads.MC&adtype=swf.728x90EUR&adctry=NO&adlang=NO';
mc_banner_tpl.flash.width = '728';
mc_banner_tpl.flash.height = '90';
mc_banner_tpl.flash.url = 'operatest.swf';
mc_banner_tpl.flash.wmode = SiteControl('','site','opaque');
mc_banner_tpl.flash.bgcolor = '';
mc_banner_tpl.flash.clickthru_url = 'http://ad.no.doubleclick.net/click%3Bh=v8/3714/17/5d/%2a/g%3B206372166%3B0-0%3B0%3B28783935%3B3454-728/90%3B27210846/27228725/1%3B%3B%7Esscs%3D%3fhttp://media.fastclick.net/w/click.here?cid=135576&mid=258757&sid=18423&m=1&c=0&forced_click=http://www.klm.com/travel/no_en/special_offers/all_offers/index.htm?adcamp=sal.STRJuly2008&adchan=ads.MC&adtype=swf.728x90EUR&adctry=NO&adlang=NO';
mc_banner_tpl.flash.click_tag = 'clickTag';
mc_banner_tpl.flash.flash_version = 7;


if(('j'!="j")&&(typeof dclkFlashWrite!="undefined")){
  dclkFlashWrite(mc_banner_tpl.get_code());
}else{
  document.write(mc_banner_tpl.get_code());
}


document.write('\n<noscript><a href=\"http://ad.no.doubleclick.net/click%3Bh=v8/3714/17/5d/%2a/g%3B206372166%3B0-0%3B0%3B28783935%3B3454-728/90%3B27210846/27228725/1%3B%3B%7Esscs%3D%3fhttp://media.fastclick.net/w/click.here?cid=135576&mid=258757&sid=18423&m=1&c=0&forced_click=[:Clickthrough URL:]\" target=\"_blank\"><img src=\"NO_b2c_A_728x90_no_300608.gif\" border=\"0\"></a></noscript>');
