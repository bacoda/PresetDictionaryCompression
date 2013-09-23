var finishedFading = false;
var responseText = '';
var swapTabs = false;
var aj_url = {};
var aj_tabs = {};
var aj_module = {};
var aj_content = {};
var url;
var divtabs;
var divmodule;
var divcontent;


function swap_tabs(c1, aj, pl) {
	swapTabs = true;
	if(aj != null) {
		url = aj_url[aj];
		divtabs = aj_tabs[aj];
		divmodule = aj_module[aj];
		divcontent = aj_content[aj];
	}
	if(pl != null) {
		if(url.indexOf('pl=') == -1) {
			//url += '&pl='+pl;
		}
	}
	return swap_it(c1);
}

/**
 * Swaps tabs and updates
 * @return false if successful, true if you want the link to follow through
 */
function swap_it(c1, c2) {
	var tiles = (swapTabs) ? $(divmodule) : $(divcontent);
	if (!tiles) { return true; }
	
	if (tiles.style.visible != 'hidden') {
		tiles.style.visibility = 'hidden';
		finishTransition();
	}

	var newUrl = url +'&c1='+c1;
	if (c2 != null) {
		newUrl += '&c2='+c2;
	} else {
		newUrl += '&tabs=1';
	}
	newUrl = url + c1 + ".html";

	//Update the tab
	var activeTab;
	if (c2 == null) {
		var el = $(divtabs);
		activeTab = c1;
	} else {
		var el = $(divsubtabs);
		activeTab = c2;
	}
	
	var nodes = el.getElementsByTagName('LI');
	var classes, className;
	for (i = nodes.length - 1; i >= 0; i--) {
		className = '';
		if (nodes[i].className) {
			//classes may have more than one class name
			classes = nodes[i].className.split(' ');
			for(j = classes.length - 1; j >= 0; j--) {
				if (classes[j] != 'on' || activeTab == i) {
					className += classes[j] + ' ';
				}
			}
		}
		if (activeTab == i) {
			className += 'on ';
		}
		nodes[i].className = className;
	}
	
	//fix for sliver
	var sliv = $('mp_tab_sliver');
	if(sliv) {
		if(navigator.appVersion.indexOf("MSIE")!=-1) {
			sliv.parentNode.className = sliv.parentNode.nextSibling.className;
		}
		else {
			sliv.parentNode.className = sliv.parentNode.nextSibling.nextSibling.className;
		}
	}
	new Ajax(newUrl, {'method' : 'get', 'onComplete' : finishFetch}).request();
	
	return false;
}

/**
 * This handles the race condition of the ajax returning vs. the fade finishing.
 * We have to wait for the fade out to finish before we can start fading in.
 */
function finishFetch(request) {
	if (finishedFading) {
	    update_it(request);
	  } else {
	  	responseText = request;
	  }
}

/**
 * This handles the race condition of the ajax returning vs. the fade finishing.
 * We have to wait for the fade out to finish before we can start fading in.
 */
function finishTransition() {
	if (responseText) {
		update_it(responseText);
	} else {
		finishedFading = true;
	}
}

/**
 *	Update the box car videos
 */
function update_it(text) {
	var container = (swapTabs) ? $(divmodule) : $(divcontent);
	container.style.visibility = 'visible';
	container.innerHTML = text;
	//fadeIn(container);
	finishedFading = false;
	responseText = '';
	swapTabs = false;
}
