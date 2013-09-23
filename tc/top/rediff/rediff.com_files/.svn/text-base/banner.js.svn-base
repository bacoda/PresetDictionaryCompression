var OAS_cat ="&OAS_cat=NS";
function getCookie(name)
{
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1)
        {
                begin = dc.indexOf(prefix);
                if (begin != 0) return null;
        }
        else
                begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1)
                end = dc.length;
        return unescape(dc.substring(begin + prefix.length, end));
}

//configuration
OAS_url ='rediff.com_files/';
OAS_listpos = 'Middle,Bottom2,Left3,Right,BottomRight';
var OAS_query = "";
OAS_query=getCookie('Rp');
OAS_loc=getCookie('RLOC');
if (document.referrer)
{
	if (OAS_query)
	{
		OAS_query += '&REFERER=' + document.referrer;
	}
	else
	{
		OAS_query = 'REFERER=' + document.referrer;
	}
}
if (OAS_loc)
{
	if (OAS_query)
	{
		OAS_query += '&RLOC=' + OAS_loc;
	}
	else
	{
		OAS_query = 'RLOC=' + OAS_loc;
	}
}

OAS_sitepage = 'redifflogo.js';
//end of configuration
OAS_version = 10;
OAS_rn = '001234567890'; OAS_rns = '1234567890';
OAS_rn = new String (Math.random()); OAS_rns = OAS_rn.substring (2, 11);
function OAS_NORMAL(pos) {
document.write('<A HREF="' + OAS_url + 'click_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + OAS_query + OAS_cat + '" TARGET=_top>');
document.write('<IMG SRC="' + OAS_url + 'adstream_js.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + OAS_query + OAS_cat + '" BORDER=0 ALT="Click!"></A>');
}

OAS_version = 11;
if (navigator.userAgent.indexOf('Mozilla/3') != -1)
OAS_version = 10;
if (OAS_version >= 11)
//alert(OAS_query);
document.write('<SC'+'RIPT LANGUAGE=JavaScript1.1 SRC="' + OAS_url + 'adstream_js.ads/' + OAS_sitepage + '?' + OAS_query + OAS_cat + '"><\/SCRIPT>');

//-->
function OAS_AD(pos)
{
	if (OAS_version >= 11 && typeof(OAS_RICH)!='undefined')
		OAS_RICH(pos);
	else
		OAS_NORMAL(pos);
}
