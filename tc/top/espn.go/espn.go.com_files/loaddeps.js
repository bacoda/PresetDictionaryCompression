mc_activity_hours = typeof(mc_activity_hours) != 'undefined' ? mc_activity_hours : 1;
mc_count = typeof(mc_count) != 'undefined' ? mc_count : 5;
mc_cat = typeof(mc_cat) != 'undefined' ? mc_cat : 'all';
mc_feed_url = typeof(mc_feed_url) != 'undefined' ? mc_feed_url : 'http://mb.espn.go.com/dir-app/acx/activeContent.aspx?webtag=espnmb&type=discussions&fmt=json&activityHours=' + mc_activity_hours + '&count=' + mc_count + '&timeout=10&mappedOnly=True&catList=' + mc_cat;


if(typeof(ProsperoResponse) == "undefined")
{
	document.write('<scr'+'ipt type="text/javascript" src="' + mc_feed_url + '"></scr'+'ipt>');
}

if(typeof(Prototype) == "undefined")
{
	document.write('<scr'+'ipt type="text/javascript" src="espn.go.com_files/prototype-1.5.1.1-packer.js"></scr'+'ipt>');
}

document.write('<scr'+'ipt type="text/javascript" src="espn.go.com_files/domready.js"></scr'+'ipt>');

if( typeof( conversation_url ) == 'undefined' )
{
	document.write('<scr'+'ipt type="text/javascript" src="espn.go.com_files/conversation_utils_6.js"></scr'+'ipt>');
}
