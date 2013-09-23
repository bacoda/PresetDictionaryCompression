var t = '';

t += '<div style="position:relative; background-image: url(foxsports.com_files/jumbotron_background_2.jpg); height:67px; width:770px;"><a href="http://msn.foxsports.com"><img src="foxsports.com_files/spacer.gif" alt="" width="110" height="67" border="0"></a><style>.userName {font-family: verdana;font-size:10px;color:#000;font-weight: bold;}.userName a:link, .userName a:visited {color: #000;} .userName a:hover {color: #fff;}</style><div style="position:absolute; top:2px; left:117px; ">';

if(typeof(user) == "undefined" || user.USER_ID == "null" || user.USER_ID == 0) {
  //logged out
  t += '<span class="userName"><a href="http://msn.foxsports.com/feedback" style="text-decoration:none">Where\'s my login?</a>';
} else {
  t += '<span class="userName">Hi, ' + user.USER_FIRST_NAME + ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ';
  if (euid != null && euid != '') { 
    t += '<a href="http://msn.foxsports.com/prefs" style="text-decoration:none">Customize</a> <b>&middot;</b>&nbsp;';
  }
  t+= 'Not ' + user.USER_FIRST_NAME + '? <a href="/logout" style="text-decoration:none">Click here.</a></span>';
}

t += '</div>';
//t += '<div style="position: absolute; font-family: Verdana; font-weight:bold; font-size: 24px; color: #CDF; top: 30px; left: 120px; height: 90px; width: 100%; filter: alpha(opacity=60)"></DIV>';
t += '<div id="headerSearch" >';
t += '  <div style="position:absolute; top:6px; left:543px;">';
t += '    <form onsubmit="return FindWhichSearch(this);" name="search" style="display:inline;">';
t += '      <div style="position:absolute; top:-1px; left:-130px;"><input type="radio" name="whichSearch" value="fox" checked></div>';
t += '      <div style="position:absolute; top:-1px; left:-58px;"><input type="radio" name="whichSearch" value="msn"></div>';
t += '      <input onfocus="this.value=\'\'" type="text" name="searchTerm" value="Enter Keyword" size="16" maxlength="50" style="color: #000; height: 15px; width: 140px; background-color: transparent; font-family: verdana; font-size: 10px; border: none; padding:0px; margin:0px;" onFocus="this.value=\'\';">';
t += '    </div>';
t += '    <div style="position:absolute; top:3px; left:675px;">';
t += '      <input type="image" height="17" width="80" border="0" value="Go" name="Go" src="foxsports.com_files/spacer.gif" align=absmiddle>';
t += '    </form>';
t += '  </div>';
t += '</div>';
t += '</div>';
document.write(t);

function FindWhichSearch(f) {
  var q = f.elements.searchTerm.value;
  if (f.elements.whichSearch[0].checked) {
    window.location.href = "http://msn.foxsports.com/search?sp-q=" + q ;
  }
  else {
    window.location.href = "http://search.msn.com/results.aspx?q=" + q + "&cp=1252&FORM=FOXSP";
  }
  return false;
}
