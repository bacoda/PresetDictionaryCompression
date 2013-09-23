function write_chart(xml_url,parameters, width, height){
    document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH='+width+' HEIGHT='+height+' id="FusionCharts_1">');
    document.write('<PARAM NAME="movie" VALUE="operatest.swf">');
    document.write('<PARAM NAME="FlashVars" VALUE="&dataURL='+xml_url+'?companyCode='+parameters+'&chartWidth='+width+'&chartHeight='+height+'">');
    document.write('<PARAM NAME="quality" VALUE="high">');
    document.write('<PARAM NAME="bgcolor" VALUE="#FFFFFF">');
    document.write('<EMBED src="operatest.swf" FlashVars="&dataURL='+xml_url+'?companyCode='+parameters+'&chartWidth='+width+'&chartHeight='+height+'" quality="high" bgcolor="#FFFFFF"  WIDTH='+width+' HEIGHT='+height+' NAME="FusionCharts_1" ALIGN="" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>');
    document.write('</OBJECT>');
}

function write_chart_compare(xml_url,parameters, width, height){
    document.write('<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0" WIDTH='+width+' HEIGHT='+height+' id="FusionCharts_1">');
    document.write('<PARAM NAME="movie" VALUE="operatest.swf">');
    document.write('<PARAM NAME="FlashVars" VALUE="&dataURL='+xml_url+'?companyCode='+parameters+'&chartWidth='+width+'&chartHeight='+height+'">');
    document.write('<PARAM NAME="quality" VALUE="high">');
    document.write('<PARAM NAME="bgcolor" VALUE="#FFFFFF">');
    document.write('<EMBED src="operatest.swf" FlashVars="&dataURL='+xml_url+'?companyCode='+parameters+'&chartWidth='+width+'&chartHeight='+height+'" quality="high" bgcolor="#FFFFFF"  WIDTH='+width+' HEIGHT='+height+' NAME="FusionCharts_1" ALIGN="" TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>');
    document.write('</OBJECT>');
}