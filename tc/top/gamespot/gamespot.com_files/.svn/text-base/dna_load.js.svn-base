var winHandle = null;

function spawn_dw_redir(url,page) {
    var params = "page="+page;
    new Ajax(url, {method: 'post', postBody: params}).request(); 
}

function start_dlm_promo_download(uri) {

	document.getElementById("mymovie").addFile(uri);
}

function start_dna_download(dna_uri, id, type, destinationTab) {

    // This line fails in IE
	//document.domain = "gamespot.com";

	dna_base_url = "/pages/dna/popup.php?file_uri=";
	options = "width=450,height=550,scrollbars=0,menubar=0,toolbar=0,location=0,status=0,resizable=0";

	if (dna_uri.length > 0) {
		dna_uri = escape(dna_uri);
	}

    var windowName = 'dnapop';

    if (winHandle) {
        // If the winHandle variable is set
        if ( winHandle.closed ) {
            // If they closed the download manager and then re-opened it
			// without  navigating to a different page (thus leaving the
			// winHandle intact) then open new player.
            winHandle = open(dna_base_url + dna_uri, windowName, options);
			setTimeout("checkWindow(winHandle)", 50);
            winHandle.focus();
        }
		else {
            // If they are adding files with the winHandle intact.
			if (dna_uri.length > 0 && isNaN(parseFloat(dna_uri))) {
				try {
            		winHandle.document.getElementById("mymovie").addFile(dna_uri);
				}
				catch(e) {
					// Just whistle a tune and pretend nothing happened.
				}
			} 
            else if (dna_uri.length > 0 && !isNaN(parseFloat(dna_uri))) {
                try {
                    winHandle.document.getElementById("mymovie").addFileBySID(dna_uri);
                }
                catch(e) {
                }
            }
	setTimeout("checkWindow(winHandle)", 50);
            winHandle.focus();
        }
    }
	else {
        // Our winHandle is not set, but that doesn't necessarily mean the
		// download manager is not open yet.
        winHandle = window.open('', windowName, options);
		setTimeout("checkWindow(winHandle)", 50);

		// God bless Safari
		if (winHandle) {
			wL = new String(winHandle.location.href);
			pL = new String(parent.location.href);
	
			// This solution is bound to break at some point, maybe other browsers
			// have a different default Location (URL).
			if ( (winHandle.location == 'about:blank') ||
				 (wL.toLowerCase() == pL.toLowerCase()) ) {
				// If the window is not open
	            winHandle.location = dna_base_url + dna_uri;
	            winHandle.focus();
	        }
			else {
	            // If the window is already open then add the xml
				if (dna_uri.length > 0 && dna_uri != "undefined" && isNaN(parseFloat(dna_uri))) {
					try {
	            		winHandle.document.getElementById('mymovie').addFile(dna_uri);
					}
					catch(e) {
						// Just whistle a tune and pretend nothing happened.
					}
				}
	            else if (dna_uri.length > 0 && !isNaN(parseFloat(dna_uri))) {
	                try {
	                    winHandle.document.getElementById("mymovie").addFileBySID(dna_uri);
	                }
	                catch(e) {
	                }
	            }
	
	            winHandle.focus();
	        }
		}
    }
}
