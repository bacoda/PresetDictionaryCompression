function getTMqs(prot, furl, dotl, tmac, tmcc, enc, sec) {
    var n = new Date();

    if (sec) {
        var loc = window.location + '&' + sec.join('&');
    } else {
        var loc = window.location;
    }

    if (parent.frames) {
        var ref = parent.document.referrer;
    } else {
        var ref = document.referrer;
    }

    var qs = loc + '*' + furl + '*' + dotl + '*' + ref + '*' + navigator.javaEnabled() + '/';
    if (window.screen) {
        qs += screen.width+'x'+screen.height + '/' + screen.colorDepth + '/';
    } else {
        qs += '//';
    };
    qs += tmac + '/' + tmcc + '/' + enc + '/' + n.getTime() + '/';
    
    var tmImg1 = '<img name="tmImg1" border="0" height="1" width="1" onLoad="nxtImg(\'tmImg2\', \'' + prot + '\', \'' + qs + '\')">';
    var tmImg2 = '<img name="tmImg2" border="0" height="1" width="1">';
    document.write(tmImg1);
    document.write(tmImg2);
    nxtImg('tmImg1', prot, n.getTime()); 
}

var tmLoc = 'statistik-gallup.net';
var tmVer = 'V11';
var tmLd = false;
function nxtImg(img, prot, qs)
{
   if((!document.images) || tmLd) return;
   tmLd = true;
   var n = '';
   if(img == 'tmImg1') {
      n = prot + '://' + tmLoc + '/VC' + qs;
   }
   else if(img == 'tmImg2') {
      n = prot + '://' + tmLoc + '/' + tmVer + qs;
   }
   if(document.images[img].src.indexOf(n)<0) {
      document.images[img].src = n;
   }
   tmLd = false;
}


// 20060411 - fix for ie problem with activex [erlend/eivind]
// 20070109 - added techsource test [erlend]
// 20070215 - added vgtv test in isAllowedUrl

// Get all objects from the page as an array
var aTechsourceObjects = document.getElementsByTagName('object');
var iObjectsCounter;

// This function waits until the document is ready and then activates the objects
function TechsourceWaitReadyStateIsComplete() {
  // Is the document loaded, parsed and ready?
  if( document.readyState != 'complete' ) { 
    // No, wait a bit more
    self.setTimeout( "TechsourceWaitReadyStateIsComplete()", 100 );
  } else if( iTechsource != 1 ) {
    iTechsource = 1;
    // Loop on objects
    for( iObjectsCounter = 0; iObjectsCounter < aTechsourceObjects.length; iObjectsCounter++ ) {
      // Check if it's a techsource generated object
      if( aTechsourceObjects[iObjectsCounter].id.substring(0,7) != 'OAS_AD_' ) { 
        // Reassign the outerHTML code to itself
        aTechsourceObjects[iObjectsCounter].outerHTML=aTechsourceObjects[iObjectsCounter].outerHTML;
      }
    }
  }
}


function isAllowedUrl(u) {
    
       var res = true;
	    
       if (u.search(/live2op=spill/i) >= 0) {
         res = false;
       } else if (u.search(/atvs\.vg\.no/i) >= 0) {
         res = false;
       } else if (u.search(/vgtv\.no/i) >= 0) {
       	 res = false;
       } else if (u.search(/spillarkaden/) >= 0) {
       	 res = false;
       }

       return res;
}




if( ( navigator.userAgent && navigator.userAgent.indexOf("MSIE")>=0 ) && isAllowedUrl(document.location.href) ) {
  TechsourceWaitReadyStateIsComplete();
}

var iTechsource = 0;






















