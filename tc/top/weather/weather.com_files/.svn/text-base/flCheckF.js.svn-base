var flCheckFlookie ;
// global optin var
floptin = false;
// array containing all VALID input parameters to the flash
// make sure to add new parameters here as needed
flValidInput = new Array();
flValidInput[0] = "in_optin";
flValidInput[1] = "in_rmid";
flValidInput[2] = "in_hlid";
flValidInput[3] = "in_hltype";
flValidInput[4] = "in_hpres";
flValidInput[5] = "in_hlzipid";
flValidInput[6] = "in_hlzippres";
flValidInput[7] = "in_hfamilyprefs";
flValidInput[8] = "in_channelprefs";
flValidInput[9] = "in_age";
flValidInput[10] = "in_gender";


///////////////////////////////////////////////////////////////////////////////////////////////////////////
////// THIS FUNCTION SYNCHRONIZES THE USERPREFERENCES COOKIE BY READING THE VALUE FROM FLOOKIE//////////
////// FLOOKIES ARE AUTHORITATIVE AND MUST REPLACE THE CORRESPONDING POSITIONS IN USERPREFS COOKIE IF NOT IN SYNC////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
	
function flGotVals(hash) {
    var rmiddiff = "false";
	for (var n in hash) {
		floptin = true;
		
		switch (n) {
			case "rmid" :
                //for tracking purposes, we need to check if current user rmid is different than
                // one sent back to us from the flash movie.
                if(GetCookie("RMID")) {
                    var rmidval = GetCookie("RMID");
                    if(rmidval != hash[n]) {
                        rmiddiff = "true";
                    }
                } else {
                    rmiddiff = "true";
                }
	    var expdate = new Date();
	    FixCookieDate(expdate);
	    expdate.setTime(expdate.getTime() + (24 * 60 * 60 * 1000 * 365 * 10));
	    SetCookie ("RMID", hash[n], expdate, "/", ".weather.com");
		break;
		case "in_hlid" :
			
			if (getUserPreferences("11") != unescape(hash[n])){
				setUserPreferences("11", unescape(hash[n]));
			}
			break;
		case "in_hltype" :
			if (getUserPreferences("22") != unescape(hash[n])){
				setUserPreferences("22",unescape(hash[n]))
			}
			break;
		case "in_hpres" :
			if (getUserPreferences("10") != unescape(hash[n])){
				setUserPreferences("10",unescape(hash[n]))
			}
			break;
		case "in_hlzipid" :
			if (getUserPreferences("23") != unescape(hash[n])){
				setUserPreferences("23",unescape(hash[n]))
			}
			break;
		case "in_hlzippres" :
			if (getUserPreferences("24") != unescape(hash[n])){
				setUserPreferences("24",unescape(hash[n]))
			}
			break;
		case "in_hfamilyprefs" :
			if (getUserPreferences("26") != unescape(hash[n])){
				setUserPreferences("26",unescape(hash[n]))
			}
			break;
		case "in_age" :
			if (getUserPreferences("13") != unescape(hash[n])){
				setUserPreferences("13",unescape(hash[n]))
			}
			break;
		case "in_gender" :
			if (getUserPreferences("14") != unescape(hash[n])){
				setUserPreferences("14",unescape(hash[n]))
			}
			break;
		case "in_channelprefs" :
			
			if (getUserPreferences("16") != unescape(hash[n])){
				setUserPreferences("16",unescape(hash[n]))
			}
			break;
		}
	}

	if(rmiddiff == "true") {
        actionLib(26);    
	}
	var playerVersion = swfobject.getFlashPlayerVersion(); // returns a JavaScript object
	playerVersion = playerVersion.major + "." + playerVersion.minor + "." + playerVersion.release;
	flCheck = floptin + "|" + playerVersion;
	var expdate = new Date ();
	FixCookieDate (expdate);
	expdate.setTime (expdate.getTime() + (30 * 60 * 1000));
	SetCookie("flCheck", flCheck, expdate, "/", ".weather.com");	
					
	
	
}


/////////////////////////////////////////////////////////////////
////// THIS FUNCTION SETS VALUES TO THE FLOOKIE   ///////////////
/////////////////////////////////////////////////////////////////
function flSetFlookie(hash) {
try{
	
    var hA = new Array();
    for (var n in hash) {
     
        if(flIsValidInputParam(n)) {
        	 hA[hA.length + 1] = n + "=" + escape(hash[n]);	         		
   		 flCheckFlookie.set(n , escape(hash[n]));     	
		
	   }
    } 	
     

    
}catch(err){
	
}
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////// THIS FUNCTION RETRIEVES ALL FLOOKIE VALUES IF flcheck Cookie indicates that the user has Opted in.
////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

function flGetFlookie()
{
try{
	flCheckFlookie=new Flookie('flCheck');	
	var flCheck = GetCookie("flCheck");
	
	if (flCheck =="") {
		var listenerObj = new Object();
		listenerObj.ready = function(){					

		//let us see if flookie exists
			if (flCheckFlookie.exists()){

				//see if user opted in
				var opt_in = flCheckFlookie.get('in_optin');
				if (opt_in == "true"){	
				//we must restore all userpreferences from flookie
					var myHash= new Object();
					myHash=flCheckFlookie.getAll();
					flGotVals(myHash);


				}

			}
		}
		Flookie.addListener(listenerObj);
	}else{

		if (flCheckFlookie.ready()) {							

			flProcessGotVals();
		} else {
			var listenerObj = new Object();
			listenerObj.ready = function(){					


				flProcessGotVals();


			}
			Flookie.addListener(listenerObj);

		}	
	
	}
	
}catch(err){
	
}
}


////////////////////////////////////////////////////////////////////
//////// THIS FUNCTION DELETES THE FLOOKIE  ////////////////////////
////////////////////////////////////////////////////////////////////
function flDelFlookie() {
	try{
	
		if (flCheckFlookie.exists()){
				flCheckFlookie.destroy();
		}
	}catch(err){
	
	}
	
}


////////////////////////////////////////////////////////////////////
///// THIS IS THE CALLBACK FUNCTION (GETS CALLED BY FLOOKIE ////////
///// THIS IS DEFAULT (BLANK) IMPLEMENTATION THAT NEEDS TO /////////
///// OVERWRITTEN BY SPECIFIC IMPLEMENTATIONS              /////////
////////////////////////////////////////////////////////////////////
function flSetVals(status, message) {
	if(status != 1) {
	    // do something
	}
}

////////////////////////////////////////////////////////////////////
////// THIS IS A CALLBACK FUNCTION AND GETS CALLED WHEN  ///////////
////// FLASH DELETED THE FLOOKIE. THIS IS DEFAULT (BLANK) //////////
////// IMPLEMENTATION THAT NEEDS TO BE OVERWRITTEN BE    ///////////
///// SPECIFIC PAGE IMPLEMENTATION /////////////////////////////////
////////////////////////////////////////////////////////////////////
function flDelVals(status, message) {
    if(status != 1) {
        // do something
    }
}

////////////////////////////////////////////////////////////////////
////// THIS FUNCTION VALIDATES THE INPUT PARAMETERS ///////////////
////// TO THE FLASH                                 ///////////////
///////////////////////////////////////////////////////////////////
function flIsValidInputParam(param) {
    var found = false;
    for(var i=0;i<flValidInput.length;i++) {
        if(flValidInput[i] == param) {
            found = true;
            break;
        }
    }
    return found;
}



// this addds the "load" event for the page to call the flGetFlookie function
addEvent(window, "load", flGetFlookie);
