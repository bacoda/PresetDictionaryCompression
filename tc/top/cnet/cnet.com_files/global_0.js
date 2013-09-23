// ***edit with caution!! shared by redball sites***

var consoleOK = false;
if (typeof console != "undefined") { // safari, firebug
	if (typeof console.debug != "undefined") { // firebug
		consoleOK = true;
	}
}

// todo move to utils
function trapSearchKey(e, keyToCheck, enterFunction){
	if (!e) e = window.event;
	if (e.keyCode == keyToCheck){
		enterFunction();
		return false;
	} else {
		return true;
	}
}
                
// sendSearchRedirect2()
// handles search submit
// action = original form action
// formId = name of the form
// searchTypeId = name of field used for type of search, use '' if there is none
function sendSearchRedirect2(host, action, formId, searchTypeId, oId, siteId) {
	//if (consoleOK) {console.log('sendSearchRedirect2');}
	var searchForm = document.forms[formId];

	//Correct smartquotes and other high-value ascii characters. In a try statement for older sites not using the latest framework
	try {
		var qInput = searchForm.q || searchForm.query || searchForm.qt;
		qInput.value = qInput.value.tidy();
	} catch (e) {}
	
	// put everything in a try catch just in case
	try {
		var qs = "?";
		var usrAction = "37"; // UE tracking, default = internal
		
		// if a search type is defined find set the user action id
		// else assume this is internal
		
		if (searchTypeId != '') {
			var sel = searchForm[searchTypeId].selectedIndex;
			var searchType = searchForm[searchTypeId].options[sel].value;
			
			if (searchType == 'nw' || searchType == 'http://cnet.search.com/search?chkpt=astg.cnet.fd.search.cnet') {usrAction = "98";} // all cnet
			if (searchType == 'wb' || searchType == 'http://www.search.com/search?chkpt=astg.cnet.fd.search.web') {usrAction = "97";} // the web
			
			// special handling for tips & tricks
			if (siteId == '39' || siteId == '102') {
				if (searchType == 'http://help.cnet.com/9606-12576_39-0.html?') {
					//set new action since this is set to javascript:void
					action = 'http://www.search.com/redirect';
					//append q as kw onto target url
					searchType += 'kw=' + escape(searchForm.q.value);
				} else if (searchType == 'nw') {
					action = '/4244-5_1-0.html';
					searchType += '&query=' + escape(searchForm.q.value);
				} else {
					action = 'http://www.search.com/search';
					searchType += '&query=' + escape(searchForm.q.value);
				}
			}

			// special handling for my products
			if (siteId == '92') {
				if (searchType == 'nw') {
					action = '/4244-5_1-0.html';
					searchType += '&query=' + escape(searchForm.q.value);
				} else {
					action = 'http://www.search.com/search';
					searchType += '&query=' + escape(searchForm.q.value);
				}
			}

			// special handling for downloads music
			if (siteId == '32') {
				action = '/3607-5_32-0.html';
				if (searchType == '3608') {
					action = '/3608-5_32-0.html';
				}
				if ( searchType == 'dl-20' || searchType == 'dl-2012' || searchType == 'nw' || searchType == 'wb' ) {
					searchTypeId = 'tg';
					action = '/3120-20_4-0.html';
				}
			}
			
			// special handling for clearance center
			if (siteId == '28') {
				if (searchType == 'sh') {
					action = '/4144-5_9-0.html';
					searchType += 'query=' + escape(searchForm.q.value);
				} else if (searchType == 'nw') {
					action = '/4244-5_1-0.html';
					searchType += '&query=' + escape(searchForm.q.value);
				} else {
					action = 'http://www.search.com/search';
					searchType += '&query=' + escape(searchForm.q.value);
				}
			}
			
			
			// special handling for shopper
			if (siteId == '9') {
				if ( searchType == 'sh' ) {
					action = '/4144-5_9-0.html';
					searchType += 'query=' + escape(searchForm.q.value);
				}
				if (searchType == 'nw') {
					action = '/4244-5_1-0.html';
					searchType += 'query=' + escape(searchForm.q.value);
				}
				if ( searchType == 'wb' ) {
					action = 'http://www.search.com/redirect';
					qs += "target=http://www.search.com/search?chkpt=astg.cnet.fd.search.web&";
				}
			}
			
			// special handling for reviews
			if (siteId == '7') {
				if ( searchType == '' ) {
					action = '/4244-5_7-0.html';
					searchType += '&query=' + escape(searchForm.q.value);
				}
				if ( searchType == 'nw') {
					action = '/4244-5_1-0.html';
					searchType += '&query=' + escape(searchForm.q.value);
				}
				if ( searchType == 'wb' ) {
					action = 'http://www.search.com/redirect';
					qs += "target=http://www.search.com/search?chkpt=astg.cnet.fd.search.web&";
				}
			}
			
			// special handling for cnet
			if (siteId == '1') {
				if ( searchType == 'nw') {
					action = '/4244-5_1-0.html';
					searchType += '&query=' + escape(searchForm.q.value);
				}
				if ( searchType == 'wb' ) {
					action = 'http://www.search.com/redirect';
					qs += "target=http://www.search.com/search?chkpt=astg.cnet.fd.search.web&";
				}
			}
			
			//downloads
      if (siteId == '4') {
          action = 'http://www.download.com/3120-20_4.html';

          if ( searchType == 'nw' ) {
             action = 'http://www.cnet.com/4244-5_1-0.html?query=' + escape(searchForm.qt.value) + '&';
             } else {
                     searchType += '&qt=' + escape(searchForm.qt.value);
                     }

          searchForm.qt.remove();
}
			
			//news
			if (siteId == '3' ) {
				try {
					$('rb_srch').q.name = "q";
				} catch(e){
					try {
						dbug.log(e);
					} catch (err) {}
				};
				if ( searchType == 'nw') {
					action = 'http://www.cnet.com/4244-5_1-0.html';
				} else if (searchType != '') {
					action = searchType;
				}  else if (searchType == '') {
					action = '/2990-5_3-1.html';
					searchType += '&query=' + escape(searchForm.q.value);
				}
			}
			
			// re-add search type to qs
			qs += searchTypeId + "=" + searchType + "&";
		}
		
		// the rest of the query args
		for (i=0; i<searchForm.childNodes.length; i++) {
			if (searchForm.childNodes[i].tagName == "INPUT") {
				if ((searchForm.childNodes[i].type == "text") || (searchForm.childNodes[i].type == "hidden")) {
					qs += searchForm.childNodes[i].name + "=" + searchForm.childNodes[i].value + "&";
				}
			}
		}
		
		// trim off the last &
		qs = qs.substring(0, qs.length-1);
		
		// add the host if the action is relative
		var action = action.indexOf("http:") < 0 ? host + action : action;
		var destURL = action + escape(qs);
		var url = 'http://dw.com.com/redir?usraction=' + usrAction + '&oId=' + oId + '&siteId=' + siteId + '&destUrl=' + destURL;
		//if (consoleOK) {console.log(url);}
		window.location.href=url;
	} catch (e) {
		//if (consoleOK) {console.log('Exception caught, submitting directly. Error: %s',e);}
		try {
			dbug.log(e);
		} catch (err) {}
		
		searchForm.action = action;
		searchForm.submit();
	}
}

var btn_on = function() {return true;};
var btn_off = function() {return true;};
