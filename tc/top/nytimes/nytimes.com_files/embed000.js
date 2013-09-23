/*** Configurable items follow ***/
// 1. Change this URL base pre-deployment
var swfHostBase = "nytimes.com_files/";   // trailing slash required!

// 2. Adjust the following page type-specific params as needed; channelId and videoId are optional defaults
    var pageSpecific = {
        "homepage"     : { "width" : 336, "height" : 459, "channelId" : "37516689419c443dc73e1fda3b2bf42c358d151c" },
	 "oneclip"      : { "width" : 315, "height" : 361 },
        "sectionfront" : { "width" : 397, "height" : 363 }
    }
/*** End of configurable items ***/

/* function NYTFeedroomPlayer
    - produces <EMBED ...> tag for flash vid player
    - document.write()s the EMBED tag to the currently loading page
*/

var NYTFeedroomPlayer = function(
    skinType,  // required; possible values: 'homepage', 'sectionfront', 'oneclip'
    options    // optional; possible keys: height, width, channelId, videoId;
               // channelId and videoId override any defaults in the pageSpecific hash
) {
    var channelParam, videoParam, skinParam, embedBuffer='';
    var baseFlashParams = 'site=nytd';  // static portion of the flash vid player parameters

    // 2. Check the skin type, make sure it's available
    if( typeof(pageSpecific[skinType])=='undefined' ) {
	 var errMsg = "Couldn't find skin named '"+skinType+"'.  Check your parameters to NYTFeedroomPlayer and try again.";
	 if( console && console.log )
	     console.log( errMsg );
	 else
	     alert( errMsg );
    }

    // 3. Looks like the skinType is valid, get local ref to the static params
    var pageDefs = pageSpecific[skinType];

    // 4. If there is an 'options' param, see about using it
    for(var optName in options) {
        pageDefs[optName] = options[optName];
    }

    // 4. Set some more params
    skinParam    = typeof(skinType)!='undefined'           ? 'skin='      + skinType           : 'skin=';
    channelParam = typeof(pageDefs.channelId)!='undefined' ? '&fr_chl='   + pageDefs.channelId : '';
    vidParam     = typeof(pageDefs.videoId)!='undefined'   ? '&fr_story=' + pageDefs.videoId   : '';

    //** Opera edit **//
    skinType = '';

    embedTag =
	 '<EMBED '
	 + 'src="'
	 + swfHostBase     // http://graphics8...
	 + skinType        // sectionfront, homepage etc.
	 + '/Player.swf" '
	 + 'flashvars="'   // start flashvars
	 + skinParam       // one of 'homepage', 'sectionfront', 'oneclip'
	 + '&'+baseFlashParams
	 + channelParam    // if provided, channel for the given section or homepage
	 + vidParam        // id of the video to be played by default
	 + '" '            // end of flashvars
	 + 'quality=high ' // of exceeding high quality of course
	 + 'menu=false '
	 + 'WIDTH="'
	 + pageDefs.width  // width of player canvas
	 + '" '
	 + 'HEIGHT="'
	 + pageDefs.height // width of player canvas
	 + '" '
	 + 'allowFullScreen="true" '
	 + 'allowScriptAccess="always" '
	 + 'TYPE="application/x-shockwave-flash" '
	 + 'PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"'
	 + 'scale="">'
	 + '</EMBED>';

    // Now, write that bad boy out to the currently loading document object
    document.writeln( embedTag );
}

if( typeof(nytFeedroomSkin)!='undefined' ) {
    nytFeedroomOptions = typeof(nytFeedroomOptions)!='undefined' ? nytFeedroomOptions : {};
    NYTFeedroomPlayer( nytFeedroomSkin, nytFeedroomOptions );
}

