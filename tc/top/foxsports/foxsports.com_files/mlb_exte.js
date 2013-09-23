function playMedia2(o){
	var template="http://mlb.mlb.com/media/player/mp_tpl_3_1.jsp",width=1012,height=600,name="MLBPlayer";
	launchPlayer(o);
	function launchPlayer(o){
		var _left,_top,_url = buildURL(o);
		if( width > screen.availWidth-12 ){ width = screen.availWidth - 12; }
		if( height > screen.availHeight-48 ){ height = screen.availHeight - 48; }
		_left = (screen.availWidth - width - 12) / 2;
		_top = (screen.availHeight - height - 48) / 2;
		void( window.open(_url, name, "width=" + width + ",height=" + height + ",left=" + _left + ",top=" + _top + ",resizable=false") );
	}
	function buildURL(o){
		var q="",d="";
		for(var key in o){d=(q=="")?"":"&";q+=d+key+"="+escape(o[key]);}
		if(template.indexOf("?")>-1){ url = template + "&" + q; }
		else{ url = template + "?" + q; }
		return url;
	}
}