if (typeof(WWE) == 'undefined') WWE = {};
if (typeof(WWE.Tracking) == 'undefined') {
	WWE.Tracking = function() {
		var rn = new String(Math.random());
		var random = rn.substring(2, rn.length);

		function createImage (url,r) {
			var img = new Image();
			img.src = url + (r ? random : '');
		}

		return {
			registerPage: function (data) {
				if (eval(data.exp)) {
					data.urls.each(function(url) {
  						createImage(url, data.bustCache);
					});
				}
			}
		};
	}();
}

// Silverlight
WWE.Tracking.registerPage({
	exp: "window.location.pathname === '/inside/silverlight/launch/'",
	urls: ["http://switch.atdmt.com/action/mrtyou_FY08SilverlightWWEPage1_1"],
	bustCache: 0
});

WWE.Tracking.registerPage({
	exp: "window.location.pathname === '/inside/silverlight/launch/' && Silverlight.isInstalled('1.0')",
	urls: ["http://switch.atdmt.com/action/mrtyou_FY08SilverlightWWESL3Final_1"],
	bustCache: 0
});

WWE.Tracking.registerPage({
	exp: "window.location.pathname === '/inside/silverlight/launch/' && !Silverlight.isInstalled('1.0')",
	urls: ["http://switch.atdmt.com/action/mrtyou_FY08SilverlightWWENoSL2_1"],
	bustCache: 0
});