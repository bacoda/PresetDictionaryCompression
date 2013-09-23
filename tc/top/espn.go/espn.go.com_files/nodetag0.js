(function(){ 
  var d=document,w=window;
  function r(){
	var z=d.createElement('SCRIPT');
	z.src='espn.go.com_files/s.js';
	d.getElementsByTagName('head')[0].appendChild(z);
  }

 if(Math.random()<.05) {
  if (w.DL_MN||d.readyState=="complete"){
	r();
  } else if (w.addEventListener){ 
	w.addEventListener("load", r, false);
  } else if (w.attachEvent){ 
	w.attachEvent("onload", r);
  }
 }
})();
