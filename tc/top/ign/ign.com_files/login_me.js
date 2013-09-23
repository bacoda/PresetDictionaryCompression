$j(document).ready(function() {	
	$j('#loginMenuLink').click(function(){
		$j('#loginMenuContainer').toggleClass('loginMenuOn');
		$j('#loginMenuLink').toggleClass('loginMenuLinkHover');
	});
	
	$j('body').click(function(e){
		var target = e.target;
		if (target.id != 'loginMenuLink' && target.id != 'loginMenuMore'){
			$j('#loginMenuContainer').removeClass('loginMenuOn');
			$j('#loginMenuLink').removeClass('loginMenuLinkHover');
		}
	});
	
	$j('.loginOption').click(function(){
		document.location = $j(this).find('a').attr('href');
	});
	
	$j('.loginOption').hover(function(){
		$j(this).addClass('loginOptionHover');
	}, function() {
        $j(this).removeClass('loginOptionHover');
    });	
		
	function detectMacXFF2() {
  var userAgent = navigator.userAgent.toLowerCase();
  if (/firefox[\/\s](\d+\.\d+)/.test(userAgent)) {
    var ffversion = new Number(RegExp.$1);
    if (ffversion < 3 && userAgent.indexOf('mac') != -1) {
     document.getElementById("loginMenuBg").style.opacity = '1';
    }
  }
}
detectMacXFF2();
	
});