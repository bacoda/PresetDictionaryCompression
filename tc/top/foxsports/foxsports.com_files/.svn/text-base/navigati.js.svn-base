var isOver = false; var isOverChild = false;
var timer = null; var timerChild = null;
var ddTop = 0;
var ddLeft = 0;
var myObject;

function Initms() {
  for (i = 0; i < tt.length; i++) {  // set m properties
  var ff = eval("nav_" + tt[i][1]);
  w_m = "gn" + tt[i][1];
  w_m = document.getElementById(w_m);
    if (tt[i][0] == 1) { // parent ms
      w_m.isChildm = 0;
      w_m.onmouseover = Overm;
      w_m.onmouseout = Outm;
      w_m.categoryId = tt[i][1];
      for ( j = 0 ; j < ff.length ; j++ ) {
        w_mItem = "nav_" + tt[i][1] + "_" + j;
        w_mItem = document.getElementById(w_mItem);
        w_mItem.onmouseover = OvermEl;
        w_mItem.onmouseout = OutmEl;
        if (ff[j][2]) w_mItem.childm = ff[j][3];
        w_mItem.destination = ff[j][0];
        w_mItem.newWin = ff[j][4];
        w_mItem.w_Class = "dd";
        w_mItem.onclick = LinkingPage;
      }
    }
    else { //child ms
      w_m.isChildm = 1;
      w_m.onmouseover = OverChildm;
      w_m.onmouseout = OutChildm;
      for ( j = 0 ; j < ff.length ; j++ ) {
        w_mItem = "nav_" + tt[i][1] + "_" + j;
        w_mItem = document.getElementById(w_mItem);
        w_mItem.onmouseover = OverChildmEl;
        w_mItem.onmouseout = OutChildmEl;
        w_mItem.destination = ff[j][0];
        w_mItem.newWin = ff[j][4];
        w_mItem.w_Class = "dd";
        w_mItem.onclick = LinkingPage;
      }
    }
  }
}

function ShowLayer(el) {
  var showEl = "gn" + el;
  if (!DOM) return;
  clearTimeout(timer);
  HideAllLayers();
  isOver = true;
  var w_El = document.getElementById(showEl);
  w_Anchor = "nav_" + el;
	
	//if (el == 2407) {
		// document.getElementById("nav_2407").style.backgroundImage = '';
		// alert(document.getElementById("nav_2407").style.backgroundImage);
	//}
	
  if (document.getElementById(w_Anchor)){
    myObject = document.getElementById(w_Anchor);
    //ddLeft = myObject.offsetLeft;
    while (myObject.offsetParent) {
      ddTop += myObject.offsetTop;
			ddLeft += myObject.offsetLeft;
      myObject = myObject.offsetParent;
    }
    ddTop += 21;
    ddLeft -= 1;
  }
  if (w_El.className == "dd1") {var w_ElWidth = 190;}
  else if (w_El.className == "dd2") {var w_ElWidth = 190;}
  if ((ddLeft + w_ElWidth) > document.body.clientWidth) {
    ddLeft = document.body.clientWidth - w_ElWidth;
  }
  w_El.style.top = ddTop;
  w_El.style.left = ddLeft;
  ToggleSelect('hidden');
  for (i = 0; i < tt.length; i++) {
    w_nav = "nav_" + tt[i][1];
    if (document.getElementById(w_nav)) {
      w_nav = document.getElementById(w_nav);
      if (w_nav.className == "navElOn") w_nav.className = "navElOnOver";
    }
  }
  document.getElementById(w_Anchor).className = "navElOver";
  w_El.style.visibility = "visible";
  ddTop = 0; ddLeft = 0;
}

function ToggleSelect(visState) {
  if (!IE) return;
  for (i=0; i < document.all.tags('SELECT').length; i++){
    var obj = document.all.tags('SELECT')[i];
    if (!obj || !obj.offsetParent) continue;
    obj.style.visibility = visState;
  }
}

function ShowChildLayer(childm, mItem) {
  var childm = "gn" + childm;
  clearTimeout(timer);
  HideChildLayers();
  var w_El = document.getElementById(childm);
  if (document.getElementById(mItem)){
    var myObject = document.getElementById(mItem);
    while (myObject.offsetParent) {
      ddTop = ddTop + myObject.offsetTop;
      ddLeft = ddLeft + myObject.offsetLeft;
      myObject = myObject.offsetParent;
    }
  }
  if (w_El.className == "dd1") {var w_ElWidth = 130;}
  else if (w_El.className == "dd2") {var w_ElWidth = 130;}
  if ((ddLeft + (2*w_ElWidth)) > document.body.clientWidth) {
    w_El.style.top = ddTop - 2;
    w_El.style.left = ddLeft - 127;
  }
  else {
    w_El.style.top = ddTop - 2;
    w_El.style.left = ddLeft + 117;
  }
  w_El.style.visibility = "visible";
  ddTop = 0; ddLeft = 0;
}
function HideAllLayers() {
  if (isOver || isOverChild) return;
  for (i = 0; i < tt.length; i++) {
    w_El = "gn" + tt[i][1];
    w_El = document.getElementById(w_El);
    w_El.style.visibility = "hidden";
    w_El.style.left = -1000;
    w_nav = "nav_" + tt[i][1];
    if (document.getElementById(w_nav)) {
      w_nav = document.getElementById(w_nav);
      if (tt[i][1] != navOn) {//restore to original state
      	if(tt[i][1] != 2407 && tt[i][1] != 5776 && tt[i][1] != 351  &&
           tt[i][1] != 5865 && tt[i][1] != 5866 && tt[i][1] != 5867 && 
           tt[i][1] != 6017 && tt[i][1] != 6018 && tt[i][1] != 6019 && 
           tt[i][1] != 6023 && tt[i][1] != 6024 && tt[i][1] != 6025 &&
           tt[i][1] != 6030 && tt[i][1] != 6031 && tt[i][1] != 6032 &&
           tt[i][1] != 6197 && tt[i][1] != 6198 && tt[i][1] != 6199 &&
           tt[i][1] != 6057 && tt[i][1] != 6058 && tt[i][1] != 6059) {  //this is the arcade button
          w_nav.className = "navEl";
        } else {
          w_nav.className = "navEl2";
        }
      } else {
        w_nav.className = "navElOn";
      }
    }
  }
  ToggleSelect('visible');
}
function HideChildLayers() {
  if (isOverChild) return;
  for (i = 0; i < tt.length; i++) {
    if (tt[i][0] == 2) {
      w_El = "gn" + tt[i][1];
      w_El = document.getElementById(w_El);
      w_El.style.visibility = "hidden";
    }
  }
}
function Overm() {
  clearTimeout(timer);
  isOver = true;
}
function OverChildm() {
  clearTimeout(timerChild);
  isOverChild = true;
}
function OutChildm() {
  clearTimeout(timerChild);
  isOverChild = false;
  timerChild = setTimeout("HideAllLayers()",300);
}
function OvermEl() {
  this.className = 'ddHigh';
  this.style.cursor = 'hand';
  if (this.childm || isOverChild) {
    ShowChildLayer(this.childm, this.id);
  }
  if (!this.childm) {
    HideChildLayers();
  }
}
function OverChildmEl() {
  this.className = 'ddHigh';
  this.style.cursor = 'hand';
}
function OutmEl() {
  this.className = this.w_Class;
}
function Outm() {
  clearTimeout(timer);
  isOver = false;
  timer = setTimeout("HideAllLayers()", 300);
}
function OutChildmEl() {
  this.className = this.w_Class;
}
function LinkingPage() {
  var url = String(this.destination);
  if (!this.newWin) {window.location.href = url;}
  else {window.open(url);}
}
