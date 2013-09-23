
doesDom = document.getElementById;
visiblePanel="none";
cPanel = "";

function showPanel(brandPanel) {
	if (doesDom) {
		document.getElementById(brandPanel).style.height="0px";
		document.getElementById(brandPanel).style.display = "block";
		if (visiblePanel!="none") {
			document.getElementById(brandPanel).style.height= "85px";
			document.getElementById(visiblePanel).style.display = "none";
			document.getElementById(visiblePanel).style.height = "0px";
		} else {
			cPanel = brandPanel;
			x=1;
			newHeight=0;
			RollInt = setInterval("DoRoll()",15);
		}
		visiblePanel = brandPanel;
	}
}



function hidePanel() {
	if (doesDom && visiblePanel!="none") {
		document.getElementById(visiblePanel).style.display = "none";
		document.getElementById(visiblePanel).style.height = "0px";
		visiblePanel = "none";
	}
}

function stopprop(e) {
    if (e.stopPropagation) e.stopPropagation();
}

function killbubble(e) {
    window.event.cancelBubble = true;
}

function doListeners() {
    wrap = document.getElementById("asl_wrap");
    
    if (document.all) {
		wrap.attachEvent("onmouseout", killbubble);
		document.attachEvent("onmouseout", hidePanel);
	} else {
		wrap.addEventListener("mouseout", stopprop, false);
		document.addEventListener("mouseout", hidePanel, false);
	}
  }

doListeners();



function DoRoll() {
	cH = document.getElementById(cPanel).style.height;
	cH = cH.substring(0,cH.length-2);
	if ( cH<75 && !document.all) {
		newHeight += (Math.round(Math.sin(x*Math.PI/180)*15));
		x+=3;
		document.getElementById(cPanel).style.height= newHeight+"px";
	} else {
		document.getElementById(cPanel).style.height= "85px";
		clearInterval(RollInt);
	}
		
}
