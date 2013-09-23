// used for premiere button bar on cnet.com

Array.prototype.shuffle = function() {
	var temp = new Array();
	var thisLength = this.length;
	for (mixup=0;mixup<thisLength;mixup++) {
		rnd = Math.round(Math.random()*(this.length-1));
		temp[mixup] = this[rnd];
		gone = this.splice(rnd,1);
	}
	return temp;
}

var homePrm = homePrm.shuffle();
var bizPrm = bizPrm.shuffle();

function CreatePremiers(prm,pos,type) {
// prm = premiers array (either home or biz)
// pos = 0 or 1 (0=top, 1=bottom)
// type = 0 or 1 (0=home, 1=biz)
	
	var availSlots = (type==0) ? 4 : 3;
	var pLeft = (type==0) ? 0 : ((4)*67)+5;

	//create styles
	document.write('<style type="text/css">');
	for (x=0;x<prm.length;x++) {
		document.write("#"+prm[x].pid+" .indic_top {padding-left:"+pLeft+"px;}");
		document.write("#"+prm[x].pid+" .indic_btm img {visibility:hidden}");
		pLeft+=67;
	}
	document.write('</style>');

	//create buttons and links
	for (x=0;x<prm.length;x++) {
		theClass = (x==0) ? "asl_img_b1" : "asl_img_b2";
		document.write("<a class=\""+theClass+"\" href=\""+prm[x].link+"\" onmouseover=\"showPanel('"+prm[x].pid+"'); return true;\"><img src=\""+prm[x].pgif+"\" alt=\""+prm[x].pname+"\" width=\"66\" height=\"35\" border=\"0\" /></a>");
	}
	
	//check for empties
	if ( (prm.length) < availSlots) {
		blanks = availSlots-prm.length;
		for (x=0;x<blanks;x++) {
			document.write("<span class=\"asl_img_b2\"><img src=\"cnet.com_files/b.gif\" width=\"66\" height=\"35\" border=\"0\" /></a></span>");
		}
	}
		
	document.write("<br />");
}


