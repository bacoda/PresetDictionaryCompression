//Initialize the first tab
		document.getElementById('left_tab1').className="left_tab_on";
		document.getElementById('middle_tab1').className="middle_tab_on";
		document.getElementById('right_tab1').className="right_tab_on";
		document.getElementById('tab_text1').style.color="#fff";
		document.getElementById('latest_update_tab1').style.display="block";
		document.getElementById('1check').style.display="block";
		if (document.getElementById('tab_text1').innerHTML == "All"){document.getElementById('latestUpdates_moreLink').style.display="none";}
			else {getLatestTab('1')};
//End first tab initialization
var tabContainerWidth = parseInt(document.getElementById('tabHeader').style.width);
var totalTabWidth=0;
for(i=1;i<=tabCount;i++){
 totalTabWidth += document.getElementById('tab'+i).clientWidth;
}
if (totalTabWidth < tabContainerWidth){
	var extraSpace = tabContainerWidth - totalTabWidth;
	var addPadding = extraSpace / tabCount;
	for (j=1;j<=tabCount;j++){
	  document.getElementById('tab'+j).style.width = document.getElementById('tab'+j).clientWidth + addPadding +'px';
	  document.getElementById('middle_tab'+j).style.paddingRight = addPadding + 'px';
	}
if (tabCount == 7){document.getElementById('tab7').style.width = document.getElementById('tab7').clientWidth - 1 +'px';}
if (tabCount == 6){document.getElementById('tab6').style.width = document.getElementById('tab6').clientWidth - 1 +'px';}
if (tabCount == 4){document.getElementById('tab4').style.width = document.getElementById('tab4').clientWidth - 1 +'px';}

//if (tabCount == 8){document.getElementById('tab2').style.width = document.getElementById('tab2').clientWidth + 2 +'px';}
}
function getLatestTab(tab){
	var d = document;
	var tabText = d.getElementById('tab_text'+tab).innerHTML;
	var moreLinkURLPage = tabText.toLowerCase() + '.html';
	var moreLinkURL = moreLinkURLRoot + moreLinkURLPage;
	var trackID = 'latest_hub_'+ tabText.toLowerCase();
	var moreLinkChannel = '';
	var headerDividerText ='Updated 24 hours a day.';
	if (d.getElementById('rssChannelName') != null){
		var moreLinkChannel = d.getElementById('rssChannelName').innerHTML; //grabs the channel name to use for the 'All' link
	}
	if (tabText == "Head-to-Heads"){moreLinkURL = moreLinkURLRoot + 'features.html?constraint.topic_id.article=840&constraint.return_all=is_true'; trackID = 'latest_hub_head2head';};
	if (tabText == "Video Tips"){moreLinkURL = moreLinkURLRoot +'videos.html?constraint.topic_id.article=624&constraint.return_all=is_true&topic_name=Video%20Tips';trackID = 'latest_hub_videotips';};
	if (tabText == "Video Specials"){moreLinkURL = moreLinkURLRoot +'videos.html';trackID = 'latest_hub_videos';};
	if (tabText == "Desktops"){moreLinkURL = moreLinkURLRoot +'features.html?constraint.topic_id.article=744&constraint.return_all=is_true'};
	if (tabText == "Babe of the Day"){moreLinkURL = moreLinkURLRoot +'features.html?constraint.topic_id.article=751&constraint.return_all=is_true';trackID = 'latest_hub_babeoftheday';};
	if (tabText == "Interviews"){moreLinkURL = moreLinkURLRoot +'features.html?constraint.topic_id.article=537&constraint.return_all=is_true'};
if (tabChannelID == 541){
	if (tabText == "Previews"){moreLinkURL = moreLinkURLRoot +'features.html?constraint.topic_id.article=539&constraint.return_all=is_true'};
}
if (tabChannelID ==  192){
	if (tabText == "Reviews"){moreLinkURL = moreLinkURLRoot +'products.html'};
}
if (tabChannelID == 558){
	document.getElementById('latestUpdatesRSS').style.display="none";
}
	for(i=1;i<=tabCount;i++){
		d.getElementById('left_tab'+i).className="left_tab";
		d.getElementById('middle_tab'+i).className="middle_tab";
		d.getElementById('right_tab'+i).className="right_tab";
		d.getElementById('tab_text'+i).style.color='';
		d.getElementById('latest_update_tab'+i).style.display="none";
		d.getElementById(i+'check').style.display="none";
	}
		d.getElementById('left_tab'+tab).className="left_tab_on";
		d.getElementById('middle_tab'+tab).className="middle_tab_on";
		d.getElementById('right_tab'+tab).className="right_tab_on";
		d.getElementById('tab_text'+tab).style.color="#fff";
		d.getElementById('latest_update_tab'+tab).style.display="block";
		d.getElementById(tab+'check').style.display="";
		if(d.getElementById('tab_text'+tab).innerHTML == "All"){
			d.getElementById('latestUpdates_moreLink').style.display = "none";
		}
		else if (d.getElementById('tab_text'+tab).innerHTML =='My Updates'){
		  	if(checkRegistration() == false) {
			   headerDividerText = 'Updated based on your activities.'; 
			}
			else{
			   headerDividerText = 'Updated based on your activities and <a href="http://club.ign.com/b/list/custom?lid=100105">lists</a>.';
			}
			d.getElementById('latestUpdates_moreLink').innerHTML= '<a href="http://www.ign.com/myupdates" onclick="return trackclick(\'latest_hub_myupdates_more-click.ign.com\');">All '+ tabText +'<span style="position:relative;top:1px;font-size:10pt;">&#9658</span></a>';
			d.getElementById('latestUpdates_moreLink').style.display='';
		}
	    else{
			d.getElementById('latestUpdates_moreLink').innerHTML= '<a href="'+moreLinkURL+'" onclick="return trackclick(\''+trackID + '_more-click.ign.com\');">All '+moreLinkChannel+ ' '+ tabText +'<span style="position:relative;top:1px;font-size:10pt;">&#9658</span></a>';
			d.getElementById('latestUpdates_moreLink').style.display='';
		}
	if (d.getElementById('headerDividerUpdateText') != null){
	  d.getElementById('headerDividerUpdateText').innerHTML= headerDividerText;
	}
	return trackclick(trackID + '-click.ign.com');
}
if(checkRegistration() == true){
	if(getFavTab() == 'none' || getFavTab() == '0'){
		getLatestTab(1);
		document.getElementById('1check').childNodes[0].checked = true;	
	}
	else if (getFavTab().length != 0 && getFavTab() != 'none') {
		updateTab(getFavTab());
	}
	else{
		document.getElementById('1check').childNodes[0].checked = true;
		saveNewFavoriteTab(tabChannelID,null,updateTab);
	}
}
else{
	document.getElementById('1check').childNodes[0].checked = true;
}
function checkboxClick(tabID){
  if(checkRegistration() == false) {
  		trackclick('latest_hub_dfltchbx_'+tabID+'_on-click.ign.com');
   		goLogin();
	} 
  else if(document.getElementById(tabID).checked == false){
  	    trackclick('latest_hub_dfltchbx_'+tabID+'_off-click.ign.com');
		deleteFavTab();
	}
  else{
	  for(i=1;i<=tabCount;i++){
	     document.getElementById(i+'check').childNodes[0].checked = false;
	   } 
      document.getElementById(tabID).checked = true;
	  trackclick('latest_hub_dfltchbx_'+tabID+'_on-click.ign.com');
  	  saveNewFavoriteTab(tabChannelID,tabID,updateTab);
  }
}
function updateTab(tabID){
    if (tabID != null && tabID != '0'){
	  if (document.getElementById(tabID) != null){
	  	var tabNumber = parseInt(document.getElementById(tabID).parentNode.id);
		getLatestTab(tabNumber);
	    for(i=1;i<=tabCount;i++){
		  document.getElementById(i+'check').childNodes[0].checked = false;
		   } 
	    document.getElementById(tabID).checked = true;
	  }
	}
}
function deleteFavTab(){
	saveNewFavoriteTab(tabChannelID,'none',null);
}
function sendUserToLogin() {
	goLogin();
}
// channelId and tabId are optional.
// If callbackOnLoad is not null then it'll be passed the FavoriteTabCookie object once it's loaded.
function saveNewFavoriteTab(channelId,tabId,callbackOnLoad) {
    var url = "/b/gamerprof/list/FavoriteTabService?channel="+ channelId;
    if(tabId != null){
       url += "&tab="+ tabId;
    }
    new Ajax.Request(url,
      {
        method:'get',
        onSuccess: function(transport){
            var response = transport.responseText || "no response text";
            if(response == 'NOT_LOGGED_IN') {
                sendUserToLogin();
            } else if(callbackOnLoad != null && response.substr(0,7)=='FavTab=') {
                var cookieStr = response.substr(7);
                callbackOnLoad(cookieStr);
            }
        },
        onFailure: function(){  }
      });
}