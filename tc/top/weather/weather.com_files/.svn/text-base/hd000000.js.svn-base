var hdNav = {
  myOffset: [], // Contains the distance to the left hand side
  mySec: [], // The width of the secondary navigation box
  myPrimary: [], // The width of the navigation button
  mySecOffset: [], //Values of c while looping
  
  myCount: function () {
  	
    var a = document.getElementById("hdNavTable").getElementsByTagName("td").length-1;
	
	var b = 0;
    var c = 0;
    for (i=0;i<=a;i++) {
        this.myOffset[i] = b;
        b = b + 0 + document.getElementById("hdNavTable").getElementsByTagName("td")[i].offsetWidth;
        this.mySec[i] = document.getElementById('hdMI' + i).offsetWidth;
        this.myPrimary[i] = document.getElementById("hdNavTable").getElementsByTagName("td")[i].offsetWidth;
        if (this.myPrimary[i] >= this.mySec[i]) {
          d = this.myPrimary[i];
          document.getElementById('hdMI' + i).style.width = d + "px";
          c = (this.myOffset[i]+((this.myPrimary[i]-d)/2)) - 12; // -12 is to offset for the padding in Secondary
        } else if (this.mySec[i] > this.myPrimary[i]) {
          c = (this.myOffset[i]-((this.mySec[i]-this.myPrimary[i])/2));
        }
		this.mySecOffset[i] = c;
		
        if (i == 0) {
          document.getElementById('hdMI' + i).style.left = "0px";
        } else if (i == a) {
          document.getElementById('hdMI' + i).style.left = (920 - this.mySec[i])+"px";
        } else {
          document.getElementById('hdMI' + i).style.left = c + "px";
        }
    }
    

  },
  show: function () {
    /* Show and display Product */
    obj = document.getElementById("hdHatSignIn");
    obj2 = document.getElementById("hdProducts");
    obj3 = document.getElementById("hdProducts2");
    if (obj.className == 'displayBlock' || obj.className == '') {
      obj.className = 'displayNone';
      obj2.className = 'displayNone';
      obj3.className = 'displayBlock';
    } else {
      obj.className = 'displayBlock';
      obj3.className = 'displayNone';
      obj2.className = 'displayBlock';
    }
  },
  up: function (myNumber) {
  	MyLocationClose('whatwhere');
  	if (hdNav.myOffset == "") {
    	hdNav.myCount(); // Needs to be called twice to get the math right
    	hdNav.myCount();
    }
    var a = document.getElementById("hdNavTable").getElementsByTagName("td").length-1;
    var b = 0;
    var c = 0;
    for (i=0;i<=a;i++) {
      this.down(i);
    }
      document.getElementById('hdMI' + myNumber).className = 'navSecond navSecondUp';
      if (hbBMDefault == ('hdM' + myNumber)) {
        document.getElementById('hdM' + myNumber).className = 'navSelected';
      } else {
        document.getElementById('hdM' + myNumber).className = 'navHovered';
      }
  },
  
  down: function (myNumber) {
      if (hbBMDefault == ('hdM' + myNumber)) {
        document.getElementById('hdM' + myNumber).className = 'navSelected';
      } else {
        document.getElementById('hdM' + myNumber).className = 'navNotSelected';
      }
      document.getElementById('hdMI' + myNumber).className = 'navSecond navSecondDown';
  }
};
