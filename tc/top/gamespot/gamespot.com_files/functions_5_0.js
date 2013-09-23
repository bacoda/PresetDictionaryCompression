// global file
// do not edit
// includes function ads_flashSniffer()
// version 5.0

function ads_flashSniffer(){
if ( (ads_is_nav5up) || (ads_is_ie4up) )
	{

	if (navigator.plugins){								
		if (navigator.plugins["Shockwave Flash 2.0"] 	
		|| navigator.plugins["Shockwave Flash"]){		
			var isFlashV2 = navigator.plugins["Shockwave Flash 2.0"] ? " 2.0" : "";
			var desc = navigator.plugins["Shockwave Flash" + isFlashV2].description;
			var versionOfFlash = parseInt(desc.charAt(desc.indexOf(".") - 1));
			ads_gotFlash2 = versionOfFlash == 2;		
			ads_gotFlash3 = versionOfFlash == 3;
			ads_gotFlash4 = versionOfFlash == 4;
			ads_gotFlash5 = versionOfFlash == 5;
			ads_gotFlash6 = versionOfFlash == 6;
			ads_gotFlash7 = versionOfFlash == 7;
			ads_gotFlash8 = versionOfFlash == 8;
			ads_gotFlash9 = versionOfFlash == 9;
		}
	}
	for (var i = 2; i <= ads_highestVersionReleased; i++) {	
		if (eval("ads_gotFlash" + i) == true) ads_usersVersion = i;
	}
	if(navigator.userAgent.indexOf("WebTV") != -1) ads_usersVersion = 2;//edit this with new release of WebTV	
	if (ads_usersVersion >= ads_flashVersionNeeded) { 
		ads_versionIsAcceptable = true;	
		} 
	}
}
ads_flashSniffer();	
