var refURL;
refURL=document.referrer.toLowerCase();

// specify the invitation criteria here
// NOTE you cannot use double quotes " in the text of any of these fields
var survey_location = "https://www.msnfeedback.com/perseus/surveys/961278308/29348a72.htm";
var survey_title = "<img src='http://msimg.com/w/logo_bf2.gif'>";
var invite_title = "MSN wants your feedback!<BR>";
var invite_text = "You have been randomly selected to represent MSN Sports users in a brief survey.  If you have a few minutes, we'd love to hear from you!";
var expiration_date = new Date();
//-------------------------------------
//set the cookie expiration date 4 months from now.
var four_months_from_now = expiration_date.getTime() + (120 * 24 * 60 * 60 * 1000);
expiration_date.setTime(four_months_from_now);
var ex_date = expiration_date;

function getValue(offset) {
	    var endstr = document.cookie.indexOf (";", offset);
		if (endstr == -1)
			endstr = document.cookie.length;
		return unescape(document.cookie.substring(offset, endstr));
}
function GetCookie(name) {
		var arg = name + "=";
		var arg_len = arg.length;
		var cookie_length = document.cookie.length;
		var i = 0;
		while (i<cookie_length) {
		   var j= i + arg_len;
		   if (document.cookie.substring(i,j) == arg)
		       return getValue(j);
			   i = document.cookie.indexOf(" ",i) + 1;
		   if (i == 0) break;
		}
		return null;
}
function SetCookie(name,value,expires) {
	    document.cookie = name + "=" + escape(value) + ";expires=" + expires.toGMTString();
}
//--------------------------------------
// opens the survey when they click on YES
var nextwindow;
function openSurvey() {
	nextwindow = window.open(survey_location,"survey","width=550,height=350,location=no,resizable=yes,status=yes,scrollbars=yes");
}

var rn = Math.random() * 50;
rn = Math.round(rn);
 
if((refURL.indexOf(".foxsports.com")>-1)&&(rn==2)) 
{
// opens the popup invite window and writes the invite text into it
	var already_seen = GetCookie("qnet_popup");
	if (already_seen != "true") {
	   //open the invite
	    window.setTimeout("popUpWindow()", 250);
	    SetCookie("qnet_popup","true",ex_date);
	}
	else {
		//aleady seen the invite
		//do nothing
	}
}

function popUpWindow() {
	var filter = (navigator.appName == "Netscape" && parseInt(navigator.appVersion)<3.0);
	var today = new Date();
	//var ex_date = new Date(expiration_date);

	if (!filter) {

		var  window_html = '<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">';
		window_html += '<html><head><title>MSN Survey</title></head>';
		window_html += '<body alink="#000000" bgcolor="#ffffff" leftmargin="0" link="#000000" text="#000000" topmargin="6" vlink="#000000">';
		window_html += '<center>';
		window_html += '<table border="0" cellpadding="15" cellspacing="0" width="300">';
  		window_html += '<tr><td colspan="2" align="center">';
		window_html += '<p><font color="#ff8000" face="arial" size="4"><b>';
		window_html += survey_title;
		window_html += '</b></font></p></td></tr>'
		window_html += '<tr><td colspan="2">';
		window_html += '<font face="arial"><font color="#004080" size="5"><strong><center>' + invite_title + '</strong></font><br>';
  	    window_html += '<font size="3">' + invite_text + '</center></font></font>';
		window_html += '</td></tr>';
  		window_html += '<tr><td width="10%"></td><td width="90%">';
		window_html += '<ul>';
       	window_html += '<li><font face="arial" size="3"><a href="javascript:window.opener.openSurvey();window.close();"><font color="#ff8000">Yes,</font></a> I\'ll take the survey</font>';
        window_html += '<li><font face="arial" size="3"><a href="javascript:window.close();"><font color="#ff8000">No,</font></a> close this window.</font>';
  		window_html += '</li></ul></td></tr></table></center></body></html>';
		var popup_window = window.open("","eval_invite","width=350,height=350,location=no,resizable=yes,status=0,scrollbars=no");
		if(popup_window){
			popup_window.document.write(window_html);
			popup_window.document.close();
			popup_window.focus();
		}
	}
}
