/*This is channel specific javascript located at the bottom of each pagetype=channel page
My Updates tab calls:
	IGN.latestupdates.MyUpdates.setTabDiv("latest_update_tab2");
	IGN.latestupdates.MyUpdates.outputBox(channel_id)

Community Club Box calls:
	IGN.hub.ClubBox.setOuterDiv("community_box");  
	IGN.hub.ClubBox.setContentDiv("club_box"); 
	IGN.hub.ClubBox.outputBox(channel_id);

*/
if ( typeof IGN == 'undefined' ) {
    IGN = {};
}

/****************************************************
 * JavaScript object for outputting the MyUpdates tab
 ***************************************************/
 
 IGN.latestupdates = {
    TabItem:function() {
		this.articleID= null;
        this.ishot = null;
        this.publishDate = null;
        this.imageURL = null;
        this.articleURL = null;
        this.channelDisplay = null;
        this.headline = null;
        this.teaser = '';
		this.source = null;
		this.objectID = null;
		this.objectTitle = '';
    }
};

IGN.latestupdates.MyUpdates = {
	_tabDiv :null,
    _articleCount:15,
	_art :null,
	_channelId: null,
	_channelGroup: null,
	_headerDividerText: '',
	
   setTabDiv:function( divId ) {
        this._tabDiv = divId;
    },

    outputBox:function( channelId, articleCount ) {
		this._channelId = channelId;
		channelIdParam = '';
		channelGroupParam = '';
		
		if (typeof articleCount != 'undefined'){
			this._articleCount = articleCount;
		}
		if (this._channelId != 58){
		 channelIdParam = '&channel_id='+ this._channelId;
		}
		if (this._channelGroup != null){ //3 for games, 6 for entertainment
		 channelGroupParam = '&channelGroup='+ this._channelGroup;
		}
		updatesJsr = new JSONscriptRequest("ign.com_files/ubt.js");
       	updatesJsr.buildScriptTag();
        updatesJsr.addScriptTag();
        
    },
/*****Private Methods*****/
	 deleteItem:function(id){
	 	  this.msg = "Are you sure you want to remove this item and all of its related articles from your My Updates history?";
		
		if(confirm(this.msg)){
			deleteJsr = new JSONscriptRequest("http://ubt.ign.com/record?deleteArticle=" + id + "&callback=IGN.latestupdates.MyUpdates.refreshTab");
			deleteJsr.buildScriptTag();
            deleteJsr.addScriptTag();
			
		}
		else{return;}
	 
	 },
	 
	 setArticles:function( obj ) {
        this._art = obj;
        IGN.latestupdates.MyUpdates.checkData("after data");
    },
	
	 checkData:function( msg ) {
        if ( this._art != null ) { //in case we add more webservices that need to be sync'd
			IGN.latestupdates.MyUpdates.drawTab(this._art);			
        }
    },
	
	refreshTab:function(){
		IGN.latestupdates.MyUpdates.outputBox(this._channelId);
	},
	
	drawTab:function(object){
		this.updates = new Array();
	
		articles = object[0].articles;

		for ( i = 0; i < articles.length; i++ ) {
			ti = new IGN.latestupdates.TabItem();
			
			ti.articleID = articles[i].articleID;
			ti.ishot = articles[i].ishot;
			ti.publishDate = articles[i].publishDate;
			ti.imageURL = articles[i].imageURL;
			ti.articleURL = articles[i].url;
			ti.channelDisplay = articles[i].channelDisplay;
			ti.headline = articles[i].headline;
			(articles[i].teaser != null ? ti.teaser = articles[i].teaser : ti.teaser = '');
			ti.source = articles[i].source;
			ti.objectID = articles[i].object;
			ti.objectTitle = articles[i].objectTitle;
			this.updates.push(ti);	
		}
	  if (this._tabDiv != null){
		 $(this._tabDiv).innerHTML = this.outputTab(this.updates);
	  }				
	  updatesJsr.removeScriptTag();
	  if (typeof deleteJsr != 'undefined'){
	  	  deleteJsr.removeScriptTag();
	  }
	},
	
	outputTab:function(arr){
	 	s = "";
		s += '<table cellpadding="0" cellspacing="0" align="center" border="0" class="latestUpdates_content_table" style="border-bottom:0px">';
		     
		for ( i = 0; i < arr.length && i < this._articleCount; i++ ) {
		     this.dateTime = this.formatDateTime(arr[i].publishDate);
			
			 if (arr[i].source == 'Club'){
				this.source = ' (<a href="http://club.ign.com/b/list/custom?lid=100105">Club.IGN</a>)';
			 }
			 else if(arr[i].source == 'Hot'){this.source = '';}
			 else if(arr[i].source =='Activity'){this.source=" (<a onclick='javascript:IGN.latestupdates.MyUpdates.deleteItem("+arr[i].articleID+")' style='cursor:pointer'>Activity</a>)";}
			 else {this.source = ' ('+arr[i].source + ')'}
			
			if (arr[i].channelDisplay == 'FAQS'){
				this.headline = arr[i].objectTitle + ' - ' + arr[i].headline;
			}
			else {this.headline = arr[i].headline};
			
			s +='<tr><td class="latestUpdates_hot_td" valign="top"><div class="latestUpdates_hot">';
				  if (arr[i].ishot == true && arr[i].ishot != null){
					   s += '<IMG SRC="http://media.ignimgs.com/media/ign/images/hot_icon.gif" BORDER="0" ALT="" />';
					 }
			s += '</div></td><td valign="top" class="latestUpdates_time_td"><div class="latestUpdates_time">' +
					this.dateTime + '</td><td valign="top" class="latestUpdates_content_text_td">';
				  if(arr[i].imageURL != null){
				   s += '<div class="latestUpdates_image"><a href="' + arr[i].articleURL + '"><IMG SRC="'+ arr[i].imageURL + '" width="80" height="49" BORDER="0" ALT=""/></A></div>';
				  }
				
			s += '<div class="latestUpdates_content_text"><span class="latestupdates_content_channelName">'+ arr[i].channelDisplay + ': </span><a href="'+ arr[i].articleURL +'">'+ this.headline +'</a><br>'+ arr[i].teaser +  '<span class="myUpdatesSource">'+this.source + '</span></div></td></tr>';
		}
		
		tabDesc = this.getTabDesc();
		s+='<tr><td colspan="3" class="myUpdatesDesc" style="background:#FFFFCE url(http://media.ignimgs.com/media/ign/images/yellow_gradiant.gif) repeat-x scroll 0% 0%" valign="top">'+ tabDesc +'</td></tr></table>';				
		return s;
	   },
	   
	  getTabDesc:function(){
	  	desc = '';
		if(checkRegistration() == false) {	
			desc = '<div class="myUpdatesHeader">Customize This Listing</div>My Updates lists the latest IGN updates related to games and other products you have in your wishlist, collection, favorites, custom lists, or email alerts. ' +
			       'Keep these lists current using the Club.IGN features on the site.<br/><br/>To use this service, you must be a registered user. <a onclick="javascript:goLogin();" style="cursor:pointer">Log in</a> or <a onclick="javascript:goLogin();" style="cursor:pointer">sign up</a> for a free account.';
			this._headerDividerText = 'Updated 24 hours a day based on your activities. ';
		}
	  	else{
		   desc = '<div class="myUpdatesHeader">Add More Updates</div>Add to your <a href="http://club.ign.com/b/list/custom?lid=100063">alerts</a>, <a href="http://club.ign.com/b/list/custom?lid=100022">wishlist</a>, <a href="http://club.ign.com/b/list/custom?lid=100018">collection</a>, and other lists using the Club.IGN features on the site to receive more updates.';
		   this._headerDividerText = 'Updated 24 hours a day based on your activities and <a href="LISTSURL">lists</a>. ';
		}
		
	    return desc;
	  },
	  
	  formatDateTime:function(publishDate){ 
	    this.d = new Date(publishDate);
		this.month = this.d.getMonth() +1;
		return (this.d.getHours() < 10 ? "0" + this.d.getHours() : this.d.getHours()) +
			':' + (this.d.getMinutes() < 10 ? "0" + this.d.getMinutes() : this.d.getMinutes()) + 
			' ' + (this.month < 10 ? "0" + this.month : this.month) + 
			'/'+ (this.d.getDate() < 10 ? "0" + this.d.getDate() : this.d.getDate());
	  }
}


/**************************************************
 * JavaScript object for outputting the hub Club box
 ***************************************************/
 IGN.hub = {
    TopPostItem:function(location,title,postType) {
		this.title = title;
		this.location = location;
		this.postType = postType;
		this.author = null;
		this.objectID = null;
		this.iconImg = null;
		this.snippet = null;
		this.score = null;
		this.objectName = null;
		this.channelURL = null;	
    }
};

IGN.hub.ClubBox = {
	_channelId:0,
    _contentDiv:null,
	_outerDiv:null,
	_agg :null,

	outputBox:function(channel_id){
	  this._channelId = channel_id;
	 boardsJsr = new JSONscriptRequest("ign.com_files/JSON_GetTopDailyPostsByForeignCategoryID.js");
	 boardsJsr.buildScriptTag();
      boardsJsr.addScriptTag();
	
	},
	
    setContentDiv:function( divId ) {
      this._contentDiv = divId;
    },
	
	setOuterDiv:function( divId ) {
      this._outerDiv = divId;
    },
	
	setAgg:function( obj ) {
        this._agg = obj;
		IGN.hub.ClubBox.checkData("after agg");
    },
	
	checkData:function( msg ) {
        if ( this._agg != null && typeof this._agg=='object') {
          IGN.hub.ClubBox.drawBox(this._agg);	 
        }
		else{
			this.outputNoTopPosts();
		}
    },
	
/**
 * Private method called by the JSON service when it's returned.
 */
    drawBox:function(items) {
		this.blog = null;
		this.review = null;
		this.quote = null;
		

		for ( i = 0; i < items.length; i++ ) {
			ci = new IGN.hub.TopPostItem(items[i].ContentLocation, cleanText(items[i].Title), items[i].PostType);
		    
			ci.author = items[i].Author.Name;
			ci.objectID = items[i].ForeignID;
			ci.iconImg = items[i].Author.Icon.ImageURL;
			ci.snippet = cleanText(items[i].Snippet);
			ci.score = 'Score: ' + items[i].Score;
			ci.objectName = items[i].ObjectName;
		
			if (ci.postType == 'blog'){this.blog = ci}
			if (ci.postType == 'review'){this.review = ci}
			if (ci.postType == 'wiki'){this.quote = ci}
			
		}

		if (this._contentDiv != null){
			$(this._contentDiv).innerHTML = this.outputTopPosts(this.blog,this.review,this.quote)
		}
		
		 boardsJsr.removeScriptTag();
	},
	
	outputTopPosts:function(blog,review,quote){
		if (blog == null && review == null && quote == null){
			return  this.outputNoTopPosts();
		}
		
		s = '<div id="communityHeader" class="editHead2"><span class="clubbox_headtext">Community</span><span class="clubbox_subheader">Based on recent user activity</span></div>'+
		   '<a href="http://club.ign.com" id="community_hub_joinClub_link-click.ign.com" onclick="return trackclick(this.id);"><img width="291"  align="absbottom" src="ign.com_files/right_box_club.gif"/></a>';
	
		if (blog != null){
			if (blog.iconImg == null){ blog.iconImg = 'http:\/\/media.ignimgs.com/media/boards/images/icons/monkey_ign.gif';}
			if (blog.title.length > 20){ blog.title = blog.title.slice(0,20) + '...'}
			blog.snippet = blog.snippet.slice(0,80);
			snipIndex = blog.snippet.lastIndexOf(' ');
			blog.snippet = blog.snippet.slice(0,snipIndex) +'...';
			
			s += '<div id="blogSection"><span id="blogUserIcon"><a href="' + blog.location + '"><img class="blogIcon" src="' + blog.iconImg + '"/></a></span><div id="userInfo">' +
				'<div id="blogUser" class="clubBold"><a href="' + blog.location + '">' + blog.author + '</a></div>' +
				'<div id="blogTitle" class="clubBold">' + blog.title  +'</div>' +
				'<div id="blogSummary">'+ blog.snippet +'</div>' +
				'<div id="blogMore"><a href="' + blog.location + '" id="community_hub_blogMore_link-click.ign.com" onclick="return trackclick(this.id);">More&#9658</a></div></div></div>';
		}
		
		if (quote != null){
			s += '<div id="quoteSection"><img src="ign.com_files/clubbox_quote_top.gif" />' +
			    '<div id="quoteContent" class="quoteText">'+ quote.snippet  +'</div>' +
				'<div id="quoteContentLink" class="quoteLink"><a href="'+ quote.location +'?tab=quote" id="community_hub_quote_link-click.ign.com" onclick="return trackclick(this.id);">What is this from?</a></div><img src="ign.com_files/clubbox_quote_bottom.gif" align="absbottom"/></div>';
		}
		
		if (review != null){
			rTitle = review.title;
			rName = review.objectName;
			
			if (review.iconImg != null){
				rLink = '<a href="'+ review.location +'"><img class="rrIcon" src="' + review.iconImg + '"/></a>';
				if (rTitle.length > 30){rTitle = rTitle.slice(0,30) + "..."}
				if (rName.length > 30){rName = rName.slice(0,30) + "..."}
				rOffset = 'margin-left:80px';
			}
			else{
				rLink = '';
				if (rTitle.length > 35){rTitle = rTitle.slice(0,35) + "..."}
				if (rName.length > 35){rName = rName.slice(0,35) + "..."}
			    rOffset = 'margin-left:20px';
			}
			
			s +=  '<div id="readerReviewSection"><img src="ign.com_files/clubbox_rr_top.gif" />'+
				  '<div id="readerIcon">' + rLink +'</div><div class="rrContent" id="readerReviewContent" style="'+ rOffset +'">' +
				  '<div id="objectName" class="clubBold">'+ rName +'</div>' +
				  '<div id="rrInfo" class="clubBold"><a href="' + review.location + '" id="community_hub_RRhead_link-click.ign.com" onclick="return trackclick(this.id);">' + rTitle + '</a></div>' +
				  '<div id="author" class="clubBold">Author: <a href="' + review.location + '" id="community_hub_RRusername_link-click.ign.com" onclick="return trackclick(this.id);">' + review.author + '</a></div>' +
				  '<div id="readerScore" class="clubBold">'+ review.score +'</div></div><img src="ign.com_files/clubbox_rr_bottom.gif" align="absbottom"/></div>';
		}
		return s;
	},
	
	outputNoTopPosts:function(){
		 if(this._channelId == 171 || this._channelId==558){  //Set channels to show only the clubbox image
		 	s = '<a href="http://club.ign.com" id="community_hub_joinClub_link-click.ign.com" onclick="return trackclick(this.id);"><img width="291"  align="absbottom" src="http://media.ignimgs.com/media/ign/images/right_box_club.gif"/></a>';
		    $(this._contentDiv).style.border="1px solid black";
		  return s;
		 
		 }
		 else{
			 if (this._outerDiv != null){
			  $(this._outerDiv).style.display = "none";
			 }
			}
		}
}

/**
 * Get an HTML element by its ID. Source:prototype.js.
 */
function $() {
    var elements = new Array();

    for ( var i = 0; i < arguments.length; i++ ) {
        var element = arguments[i];
        if ( typeof element == 'string' )
            element = document.getElementById(element);

        if ( arguments.length == 1 )
            return element;

        elements.push(element);
    }

    return elements;
}

function cleanText(str){
  if (str != null){
		str = str.replace(/\é/g,"&#233;");
		str = str.replace(/\’/g,"&#39;");
		str = str.replace(/\“/g,"&#34;");
		str = str.replace(/\”/g,"&#34;");
		str = str.replace(/\…/g,"...");
		str = str.replace(/<[^<|>]+?>/gi,'');
	  return str;
	}
   else{return null;}
}

