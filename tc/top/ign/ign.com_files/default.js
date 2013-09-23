function google_ad_request_done(google_ads)
{
	var i = 0;
	if (google_ads == null || google_ads.length == 0) return;
	var ctl = null;
	var str = '';
			str = '';
		str += '<DIV id=innerAfcGoogle> <DIV id=ad-wrap> <DIV id=ad-hdr>Sponsored Links</DIV> ';
			for (l = 0; l < 2; l++)
			{
			if (google_ads[i] == null) break;
			str += ' <DIV class=afcRow>';
				for (m = 0; m < 2; m++)
				{
				if (google_ads[i] == null) break;
				str += ' <A onmouseover="window.status=\'go to ' + google_ads[i].visible_url + '\'; return true;" onmouseout="window.status=\'\';" href="http://fimserve.ign.com/' + google_ads[i].url + '" target=_blank><STRONG>' + google_ads[i].line1 + '</STRONG>  <P>' + google_ads[i].line2 + '<BR>' + google_ads[i].line3 + '</P><SPAN>' + google_ads[i].visible_url + '</SPAN></A> ';
				i++;
				}
				str += '</DIV>';
				}
				str += ' </DIV></DIV>';
	document.write(str);
var gafc = document.getElementById("gafc");
if (gafc == null) return;
gafc.className = gafc.className.replace("adcount4", "adcount" + google_ads.length);
}
var google_ad_client = "ca-fim_ign_js";
var google_encoding = "utf8";
var google_safe = "high";
var google_max_num_ads = 4;
var google_ad_type = "text";
var google_adtest = "off";
var google_ed = "";
var google_ad_output = "js";
document.write('<script type="text/javascript" language="JavaScript" src="ign.com_files/show_ads.js"></script>');
