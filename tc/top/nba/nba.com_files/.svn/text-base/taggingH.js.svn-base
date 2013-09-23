var sPopulate = {
	
	channel: function() {
		
		var ret = "";
		var host = window.location.hostname;
		var path = window.location.pathname;
		
		path = (path.charAt(path.length-1) == '/')?(path+"index.html"):path;
		
		path = (path.substring(0, path.indexOf('.'))).toLowerCase();
		
		var regex = /\//g;
		path = path.replace(regex, ':');
		
		ret = ((host.indexOf('nba.com')>-1)?'NBA':'') + path;
		return ret;
	
	}
	
}
