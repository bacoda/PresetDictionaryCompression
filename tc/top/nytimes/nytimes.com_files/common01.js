	function callWebtrends(timestatus) {
	_global.headline_str = (escape(_global.story_headline[_global.nowplay])).toString();
	var webtrendTrack_str = "'DCS.dcssip','www.nytimes.com','DCS.dcsuri','/video/"+_global.story_id[_global.nowplay]+".html','WT.ti','"+_global.headline_str+"','WT.cg_s','','WT.z_gpt','Multimedia','WT.z_gpst','Video','WT.z_vl','"+_global.TotalVideoTime+"','WT.z_vpt','HP Player','WT.z_va','"+timestatus+"','WT.z_vid','"+_global.story_id[_global.nowplay]+"','WT.z_aiv','"+_global.aiv+"','WT.z_vsr','0'";
	_root.getURL("javascript:void(dcsMultiTrack("+escape(webtrendTrack_str)+"));");
}


	function timer(miliseconds){
		this.timeoutId = null;
		this.miliseconds = miliseconds; // homepage default: 900000 (15 min);
		this.videoPlaying = false;
		this.start();
		return this;
	}
	
	timer.prototype.start = function(){
		this.timeoutId = window.setTimeout("checkVideoPlayingCookie();", this.miliseconds);
	}
	
	timer.prototype.stop = function(){
		if (this.timeoutId != null) window.clearTimeout(this.timeoutId);
	}
	
	timer.prototype.toggle = function(){
		if (!this.videoPlaying) { this.start(); }
		else { this.stop(); }
	}

	function checkVideoPlayingCookie() {
		pageTimer.stop(); // resetting timeout
		if (readCookie("playing") == "true") {
			pageTimer.start(); // check again later
		} else {
			document.location.reload();
		}
	}
	
	var pageTimer = new timer(900000);
