function showAll(){
  for(var i=0; i < arguments.length; i++){
     show(arguments[i]);
  }
  return false;
}

function hideAll(){
	for(var i=0; i < arguments.length; i++){
	   hide(arguments[i]);
	}
	return false;
}

function toggleAll(){
  for(var i=0; i < arguments.length; i++){
	   toggle(arguments[i]);
	}
	return false;
}

function toggleSub(submenu) {
   toggleSub2(submenu,'+','-');
}
function toggleSub2(submenu,show,hide) {
    if (document.getElementById(submenu).style.display == 'none') {
        document.getElementById(submenu).style.display = 'block';
        document.getElementById('toggle'+submenu).innerHTML = hide;
    } else {
        document.getElementById(submenu).style.display = 'none';
        document.getElementById('toggle'+submenu).innerHTML = show;
    }
}

function disableAll(){
  $$(arguments).each(function(e){e.disabled = true;});
}

function enableAll(){
  $$(arguments).each(function(e){e.disabled = false;});
}

function toggleEnabledAll(){
  $$(arguments).each(function(e){e.disabled = !e.disabled;});
}

/* effects */
function fadeIn(element, duration){
   var fx = new Fx.Style(element, 'opacity',{duration: duration});
   fx.addEvent('onStart', function(){ element.setStyle('display','');});
   fx.start(0,1);   
}

function fadeOut(element, duration){
   var fx = new Fx.Style(element, 'opacity', {duration: duration});
   fx.addEvent('onComplete',function(){element.setStyle('display','none');});
   fx.start(1,0);   
}

/* lightspeed helpers */
function linkRemote(controller, action, replaceId) {
   new Ajax("/c/" + controller + "/" + action,
             {method: 'get',update: $(replaceId)}).request();
}

/* lightspeed helpers */
function linkRemoteWithCallback(controller, action, callback) {
   new Ajax("/c/" + controller + "/" + action, {method: 'get',onComplete:callback}).request();
}


function submitRemote(form,callBack){
   $(form).send({onComplete:callBack});
}



/* end lightspeed helpers */

function autoCompleteSelected(element,tokens){
	var name = element.id.substring("selectorfor".length + 1);
	var input = document.getElementById(name);
	input.value = eval("name_to_ids_" + input.id + "['" + element.value + "']"); 
}

function prefillWithDefault(id,defaultValue){
	var elem = $(id);
	elem.addEvent('focus',function(){if(this.value == defaultValue){this.value = '';}});
	elem.addEvent('blur',function(){if(this.value == ''){this.value = defaultValue;}});
}

function multiCompleteSelect(element,tokens){
	var parent = $(element.parentNode); // apply moo prototypes
	var inputName = element.id.substring("selectorfor".length + 1);
	var input = $(element);
	
	// when we add one of these guys, 
	if (!$(inputName + input.value)){
	
		var span = new Element("span",{'class':'added-username','id' : inputName + input.value});
		var hidden = new Element("input", {
					'type':'hidden',
					'value': eval("name_to_ids_" + inputName)[input.value],
					'name' : 'ids[]'
					});	
		var anchor = new Element('a',{'events' : {
													// this happens when someone clicks on the remove links
											  		'click': function(){
											  			var toKill = $(this.parentNode)
											  			fx = new Fx.Style(toKill,'opacity',{ duration: 500, transition: Fx.Transitions.Quart.easeIn});		
											  			fx.addEvent('onComplete', function(){toKill.remove();});
											  			fx.start(1,0);
											  		 }
									  		      },
									   'href':'javascript:void(0);',
									   'class':'remove'
									  }
							      ).adopt(new Element('img', { 'border':'0','src':'/img/Remove.png'}));			
		span.setHTML(element.value);
		span.adopt(hidden);
		span.adopt(anchor);
		span.injectBefore(input);
		input.value='';
	}
  
}

function initAjaxAutocomplete(id,tokens,onSelectCallback){
	var selector = $$('#' + id);
	if ( selector != null){
		selector.addEvent('focus',function() {
			var selectorName = id.substring("selectorfor-".length);
			var namesToIds = eval('name_to_ids_' + selectorName);
			
			if ( namesToIds == null){ 
				var xhr = new XHR({async: true, 
								   method: 'get',
								   onRequest: function(){
								   				$(selectorName + "-throbber").setStyle('display','inline');
								   			  },
								   onSuccess: function(response){
								   				var json = Json.evaluate(response);
												eval('name_to_ids_' + selectorName + "= json.nameToIds");
												initAutocomplete(id,json.list,onSelectCallback);
												$(selectorName + "-throbber").setStyle('display','none');
								   			  }
								   });
				xhr.send("/ajax/friend-data", null);
			}
		});
	}
}

function initAutocomplete(id,tokens,onSelectCallback){
	onSelectCallback = onSelectCallback|| autoCompleteSelected;
	
	var el = $$('#' + id);
	
	var completer = new Autocompleter.Local(el[0], tokens, {
		'delay': 100,
		'maxChoices':500,
		'filterTokens': function() {
			var regex = new RegExp('^' + this.queryValue.escapeRegExp(), 'i');
			return this.tokens.filter(function(token){
				return (regex.test(token[0]) || regex.test(token[1]));
			});
		},
		'injectChoice': function(choice) {
		    var name = (choice[0].length > 20)? choice[0].substring(0,10) + "..." : choice[0];
		    var un  = null;
		    if ( choice.length > 1){
		     	un = (choice[1].length > 20)? choice[1].substring(0,10) + "..." : choice[1];
		    }
			var el = new Element('li').setHTML(this.markQueryValue(name));
			if ( un != null) {
				el.adopt(new Element('span', {'class': 'username'}).setHTML('&lt;' + this.markQueryValue(un) + '&gt;'));
			}
			el.inputValue = choice[0];
			this.addChoiceEvents(el).injectInside(this.choices);
		},
		'onSelect' : onSelectCallback
	});
}



/* multi friend selector stuff */

var numAdded = 0;
var max = 0;

function toggleFriend(link,memberId){
	var elem = $(link);
	if (elem.getParent().hasClass('added')){
		removeFriend(elem,memberId);
	} else {
		addFriend(elem,memberId);
	}
	var addedFriendsLink = $E("a","added-friends");
	addedFriendsLink.setHTML(addedFriendsLink.getProperty('title') + ' (' + numAdded + '/' + max + ')');
}

function clearFriends(form){
	var inputs = $$('.friend-id');
	for(var i = 0 ; i < inputs.length; i++){
		inputs[i].remove();
	}
	return false;
}

function removeFriend(link,memberId){
	$E('#friend-element-' + memberId).toggleClass('added');
	$E('#toggler-' + memberId).toggleClass('added');
	$E('#input-' + memberId).remove();
	var removed = $E('#toggler-' + memberId);
	$E('#not-added').adopt(removed);
	numAdded--;
	
}
function addFriend(link,memberId){
	if ( numAdded < max ){
		$E('#friend-element-' + memberId).toggleClass('added');
		$E('#toggler-' + memberId).toggleClass('added');
		numAdded++;
		var ul = link.getParent();
		var added = $E('#toggler-' + memberId);
		added.remove();
		
		$E('#already-added').adopt(added);
		link.adopt(new Element('input',
					  		      {'type' : 'hidden', 
					  		      'name' :"ids[]", 
					  		      'class' : 'friend-id',
					  		      'value' : memberId, 
					  		      'id' : "input-" + memberId
					  		      }));
	}
}

function selectTopFriends(selectorId){
    var top = $$('#'+selectorId+" a.top").each(function(element,idx){
        var memberId = $(element).getParent().id.substring("friend-element-".length);
        toggleFriend(element,memberId);
    });
   ;
}

function select(element,containerId,toEnable,toDisable){
	$E('.current',containerId).toggleClass('current');	 
	$(element).getParent().toggleClass('current');
	
	$(toEnable).setStyle('display','');
	for(var i=0; i < toDisable.length; i++){
		$(toDisable[i]).setStyle('display','none');
	}

}

/* rating tag stuff */
function enhanceAppRatingTags() {
   $$(".app-rating").each(function(element){
      element.rating = element.getAttribute("rating");
      element.formToken = element.getAttribute("FormToken");
      element.originalRating = element.rating;
      setRatingImage(element, element.getAttribute("friend") == "Y", element.rating);
      //alert("appId=" + element.appId);
      if (element.getAttribute("appId") != null) {
         element.appId = element.getAttribute("appId");
         element.addEvents({
            "mouseleave": function(event) {
               element.rating = element.savingRating == null ? element.originalRating : element.savingRating;
               setRatingImage(element, false, element.rating);
            },
            "mousemove": function(event) {
               var star = calculateStar(new Event(event));
               setRatingImage(element, true, star);
            },
            "click": function(event) {
                        var star = calculateStar(new Event(event));
                        new Json.Remote("/c/apps/save_rating?AppId=" + element.appId + "&NewRatingNum=" + star + "&FormToken=" + element.formToken,
                                {onComplete: function(response) {
                                                if(response.data.result=="Saved") {
                                                   element.originalRating = element.rating = star;
                                                   //open the review box
                                                   openReviewLightBox("review"+element.appId);
                                                } else {
                                                   element.rating = element.originalRating;
                                                }
                                                element.savingRating = null;
                                                setRatingImage(element, false, star);
                                             } 
                                }).send();
               element.savingRating = element.rating = star;
               setRatingImage(element, true, star);
            }
         });
      }
   }); 
}
                                                   
function calculateStar(event){
   var target = $(event.target);
   return Math.ceil((event.client.x - target.getLeft())/(target.getCoordinates().width/5));
}

function setRatingImage(imgElement, friend, rating) {
   var stars = rating === undefined ? 0 : Math.round(rating);
   imgElement.setAttribute("src", "/img/" + (friend ? "Orange" : "Red") + "Stars" + stars + ".png");
}
/* end rating tag stuff */

/* app icon zoom stuff */
function enhanceMyApplications() {
   var div = $("my-applications");
   var drawer = div.getElement(".drawer");
   var slide = new Fx.Slide(drawer);
   slide.hide();
   var toggle = div.getElement("a.toggle");
   toggle.addEvent("click", function(event) {
      if (div.hasClass("expand")) {
         with (new Event(event)) {
            div.removeClass("expand");
            slide.stop();
            slide.slideOut();
            stop();
         }
      } else {
         with (new Event(event)) {
            div.addClass("expand");
            slide.stop();
            slide.slideIn();
            stop();
         }
      }
   });
}
/* end app icon zoom stuff */

/* app review stuff */
var reviewlightbox;

function enhanceAppReviews() {
	$$(".app_review_form").each(
		function(element){
        	element.addEvents({
           	 		"submit": function(event) {
                        new Event(event).stop();
                        this.send({
                        	onComplete: function(response) {
		    					if (typeof(reviewlightbox) != "undefined") reviewlightbox.close();
		    				}
		    			})
  					}
  				})
  		}
  	)
}

function openReviewLightBox(id) {
   if (typeof(reviewlightbox) != "undefined") reviewlightbox.close();
   reviewlightbox = new LightBox(id,{'valign':'top'});
   reviewlightbox.open();
   reviewlightbox.element.getElement('textarea').focus();
}

/* end app review stuff */

/* app tooltip stuff */
function enhanceAppLinks() {
   var container = $("top-rated-applications")
   container.responses = new Object();
   var memberId = container.getAttribute("memberId");
   //alert("memberId=" + memberId);
   var tooltip = $("app-tool-tip");
   var body = $E("body");
   //alert(body.id); 
   tooltip.injectTop(body);
   $$(".app-link").each(function(element){
      element.addEvents({
         "mouseenter" : function(event) {
            var appId = element.getAttribute("appId");
            var data = topRatedApplicationsToolTipData[appId];
            setupTooltip(tooltip, data);
            showAppTooltip(tooltip, element);
         }, 
         "mouseleave" : function(event) {
            hideTooltip(tooltip);
         } 
      });
   });
   tooltip.addEvents({
      "mouseenter" : function(event) {
         if (tooltip.fx != undefined) {
            tooltip.fx.stop();
         }
         if (tooltip.getStyle("opacity") > 0.5) {
            tooltip.setStyle("opacity", "1");
         } else {
            tooltip.setStyle("opacity", "0");
         }
      }, 
      "mouseleave" : function(event) {
         hideTooltip(tooltip);
      } 
   });
};

function setupTooltip(tooltip, response) {
   tooltip.getElement("h1").setHTML(response.appName);
   setRatingImage(tooltip.getElement(".friends-rating"), true, response.friendRating);
   setRatingImage(tooltip.getElement(".bebo-rating"), false, response.beboRating);
   var label = tooltip.getElement("label#recently-added-label");
   var ul = tooltip.getElement("ul#recently-added");
   ul.empty();
   var recentlyAdded = response.recentlyAdded;
   if (recentlyAdded.length > 0) {
      label.setStyle("display", "block");      
      ul.setStyle("display", "block");      
      for(var i = 0; i < recentlyAdded.length; i+=1) {
         var one = recentlyAdded[i];
         var li = new Element("li");
         li.injectInside(ul);
         var a = new Element("a", {"href":"?MemberId=" + one.memberId}); //E4T
         a.setText(one.displayName);
         a.injectTop(li);
         //alert(ul.innerHTML);
      }
   } else {
      label.setStyle("display", "none");      
      ul.setStyle("display", "none");      
   }
}

function showAppTooltip(tooltip, element) {
   var c = element.getCoordinates();
   var left = (c.left + c.right) / 2 - 27;
   var correctedLeft = Math.min(left, window.getWidth() - 265);
   tooltip.setStyle("left", correctedLeft);
   tooltip.setStyle("background-position", (left - correctedLeft - 247) + "px bottom");
   tooltip.setStyle("bottom", window.getHeight() - element.getElement("img").getTop() - 7);
   tooltip.setStyles({display: 'block',opacity: 0});
   if (tooltip.fx != undefined) {
      tooltip.fx.stop();
   }
   tooltip.fx = new Fx.Style(tooltip, 'opacity', {transition: Fx.Transitions.Cubic.easeIn, duration: 300, onComplete : function(event) {tooltip.fx=undefined;}} ).start(1);
}

function hideTooltip(tooltip) {
   if (tooltip.fx != undefined) {
      tooltip.fx.stop();
   }
   tooltip.fx = new Fx.Style(tooltip, 'opacity', {transition: Fx.Transitions.Cubic.easeOut, duration: 800, onComplete : function(event){tooltip.setStyle("display", "none"); tooltip.fx=undefined;}}).start(0);
}
/* end app tooltip stuff */

/* drop down */
function closeDropDowns(id){
	$$('.drop-down-options').each(function(elem){elem.style.display = 'none';});
	$('content').removeEvent('click',closeDropDowns);
}
function dropDownSelected(id) {
	toggle(id);
	setTimeout("$('content').addEvent('click',closeDropDowns)",100);
}
/* end drop down  */

/*lightbox*/
var LightBox = new Class({
  initialize: function(element) {
    this.params = arguments[1];
    if (arguments[1] == null){
        this.params = {};
    }
    
    if ($type(element) == 'element') {
      this.element = element;
    } else {
      this.element = $(element);
    }

    //init element
    this.element.setStyle('z-index', '9999');
    this.element.setStyle('position', 'absolute');
    this.element.setStyle('background-color', 'white');
    this.element.injectInside(document.body);

    //init background
    if (!$defined($('lightbox_bg'))) { 
      margin = 8;
      this.bg = new Element('div');
      this.bg.setStyle('id', 'lightbox_bg');
      this.bg.injectAfter(this.element);
      this.bg.setStyle('z-index', '9998');
      this.bg.setStyle('background-color', 'black');
      this.bg.setStyle('position', 'absolute');
    }

    this.close();
  }
});

LightBox.implement({
  open: function() {
    //display
    this.element.setStyle('display', 'block');
    this.element.setOpacity(1);

    //hide all ads
    $$('div.advertisement').each(function(ad, index) {
          ad.setOpacity(0);
       });

    //center
    elementLeft = parseInt(window.getWidth()/2 - this.element.getSize().size.x/2 + window.getScrollLeft());
    if (this.params.valign == 'top'){
        elementTop = window.getScrollTop() + 80;
    } else {
        elementTop = parseInt(window.getHeight()/2 - this.element.getSize().size.y/2 + window.getScrollTop());
    } 
    this.element.setStyle('left', elementLeft);
    this.element.setStyle('top', elementTop);

    //show and center bg
    this.bg.setStyle('display', 'block');
    this.bg.setStyle('top', elementTop - margin);
    this.bg.setStyle('left', elementLeft - margin);
    this.bg.setStyle('width', this.element.getSize().size.x + margin * 2);
    this.bg.setStyle('height', this.element.getSize().size.y + margin * 2);
    this.bg.setOpacity(0.4);
    
    //show and position close button
    this.visible = true;
  }
});

LightBox.implement({
  close: function() {
    this.bg.setOpacity(0);
    this.bg.setStyle('display', 'none');
    this.element.setOpacity(0);
    this.element.setStyle('display', 'none');
    this.visible = false;

    //show ads again
    $$('div.advertisement').each(function(ad, index) {
          ad.setOpacity(1);
       });

  }
});

LightBox.implement({
    destroy: function() {
        this.element.remove();
    }
});

LightBox.implement({
  toggle: function() {
    if (!this.visible) {
      this.open();
    } else {
      this.close();
    }
  }
});
/* end lightbox */

/* photoselector */
//(to be used with sn:photo-selector tag)
var activePhotoSelector;

var PhotoSelector = new Class({
  initialize: function(id, member_id, select, deselect, url, size) {
    this.id = id; //id of photo_selector div
    this.member_id = member_id;
    this.select_callback = select;
    this.deselect_callback = deselect;
    //this.remote_url = '/c/photo_selector/'
    this.base_url = url;//'/c/photo_selector/'; // //
    this.size = size;
    //make div a lightbox
    this.lightbox = new LightBox('selector' + this.id, {'valign':'top'});
    this.content = $('content' + this.id);
    this.tip = $('tip' + this.id);
    this.add_link = $('add' + this.id);
    this.remove_link = $('remove' + this.id);
    this.photo = $('photo' + this.id);
    this.active = false;
  }
});

PhotoSelector.implement({
  loading: function() {
    this.content.setHTML('<img src="/img/throbber_default.gif" /> Loading...');
  }
});

PhotoSelector.implement({
  open: function() {
    if (!activePhotoSelector) {
	  activePhotoSelector = this;
	  this.lightbox.open();
	  this.active = true;
      this.render();
	}
  }
});

PhotoSelector.implement({
  render: function() {
    this.loading();
  	this.tip.innerHTML = 'First, pick an album to open:';
	//show albums
	url = this.base_url + 'show_albums?MemberId=' + this.member_id + '&no_layout=1';
	new Ajax(url, {onComplete:function(transport) { activePhotoSelector.content.setHTML(transport); }}).request();
  }
});

PhotoSelector.implement({
  select_album: function(album_id) {
  	this.album_id = album_id;
    this.loading();
    this.tip.setHTML('Now select a photo to use (<a href="javascript:activePhotoSelector.render();">back</a>)');
    //show photos
 	url = this.base_url + 'show_photos?MemberId=' + this.member_id + '&AlbumId=' + this.album_id + '&Size=' + this.size + '&no_layout=1';
  	new Ajax(url, {onComplete:function(transport) { activePhotoSelector.content.setHTML(transport); }}).request();
  }
});

PhotoSelector.implement({
  select_photo: function(photo_id, file_url) {
  	this.photo_id = photo_id;
  	//swap the add/remove
  	this.add_link.setStyle('display', 'none');
  	this.remove_link.setStyle('display', 'inline');
  	//insert the image
  	this.photo.setHTML('<img src="' + file_url + '"/>');
    //call the callback
    eval (this.select_callback + '(photo_id, file_url);');
    this.close();
  }
});

PhotoSelector.implement({
  deselect_photo: function() {
  	this.photo_id = null;
  	//swap the add/remove
  	this.remove_link.setStyle('display', 'none');
  	this.add_link.setStyle('display', 'inline');
  	//remove image
  	this.photo.setHTML('');
  	eval (this.deselect_callback + '();');
    this.close();
  }
});

PhotoSelector.implement({
  close: function() {
  	activePhotoSelector = null;
  	this.active = false;
  	this.lightbox.close();
  }
});

//default photoselect callback
function wee(photo_id, file_url) {
  alert('selected photo: ' + photo_id);
}
/* end photoselector */

/* dialog */
function showDialog(id){
   closeDialog();
   var orig = $(id + "-orig");
   // cloning protects agains mock ajax permanently messing with 
   // the original contents of the box.
   var cloned = orig.clone();
   var form = $E('form',cloned);
   if ( form != null) {
      form.id = form.id.substring(0,form.id.length - "-orig".length);
   }
   cloned.id = id;
   cloned.injectAfter(orig);
   
   window.dialogBox = new LightBox(id,{'valign':'top'});
   window.dialogBox.open();
}

function submitDialog(formId){
   var form = $(formId);
   //IE does not find the element to submit (a cloned form) in the
   //previous line, the hack below fixes that problem
   if (form.id=="") { //damn IE!
      var formArray = document.getElementsByTagName('form');
      for (i=0; i<formArray.length; i++) {
         if (formArray[i].id==formId) {
            form = formArray[i];
            break;
         }
      }
   }
   form.submit();
}

function closeDialog(){
   if ( window.dialogBox != null) {
      window.dialogBox.close();
      window.dialogBox.destroy();
      window.dialogBox = null;
   }
}

/* app tracking */
function initFocusTracker(appId) {
   var heartbeat = window.setInterval('heartbeat(\''+appId+'\')', 60000);
   var intervalSet = true;
   $(window).addEvent('focus', function(){canvasFocus(appId); if (!intervalSet) {heartbeat = window.setInterval('heartbeat(\''+appId+'\')', 60000); intervalSet = true;}});
   $(window).addEvent('blur', function(){canvasBlur(appId); window.clearInterval(heartbeat); intervalSet = false;});
   $(window).addEvent('unload', function(){canvasBlur(appId);});
}

function canvasBlur(appId) {
   new Ajax("/c/apps/canvas_blur?AppId="+appId, {method: 'get'}).request();
}

function canvasFocus(appId) {
   new Ajax("/c/apps/canvas_focus?AppId="+appId, {method: 'get'}).request();
}

function heartbeat(appId) {
   new Ajax("/c/apps/canvas_heartbeat?AppId="+appId, {method: 'get'}).request();
}

function recordNotificationClick(appIdNotif,sourceCd,sourceId,hasNotifApp,appUsernameLink) {
   new Ajax("/c/app_request/record_notification_click?AppIdNotif="+appIdNotif+"&SourceCd="+sourceCd+"&SourceId="+sourceId+"&AppUsernameLink="+appUsernameLink+"&HasNotifApp="+hasNotifApp, {method: 'get', async:false}).request();
}

function recordInvitationClick(appIdInvite,sourceCd,sourceId,hasInviteApp,appUsernameLink) {
   new Ajax("/c/app_request/record_invitation_click?AppIdInvite="+appIdInvite+"&SourceCd="+sourceCd+"&SourceId="+sourceId+"&AppUsernameLink="+appUsernameLink+"&HasInviteApp="+hasInviteApp, {method: 'get', async:false}).request();
}

function trackAppSourceInstall(appId,sourceCd,sourceId) {
   if (window.Ajax) {   
      new Ajax("/c/app_request/track_app_source_install?AppId="+appId+"&SourceCd=" + sourceCd+"&SourceId="+sourceId, {method: 'get',async:false}).request();
   } else {
      new Request({method:'get', url: '/c/app_request/track_app_source_install'}).send("AppId="+appId+"&SourceCd="+sourceCd+"&SourceId="+sourceId);  
   }
}

function recordNotificationView() {
   new Ajax("/c/app_request/record_notification_view", {method: 'get'}).request();
}

function recordInvitationView() {
   new Ajax("/c/app_request/record_invitation_view", {method: 'get'}).request();
}

function trackAppCanvasView(appId,sourceCd) {
   if (window.Ajax) {
      new Ajax("/c/app_request/track_app_canvas_view?AppId="+appId+"&SourceCd="+sourceCd, {method: 'get'}).request();
   } else {
      new Request({method:'get', url: '/c/app_request/track_app_canvas_view'}).send("AppId="+appId+"&SourceCd="+sourceCd);
   }
}

function trackAppByUsername(appUsername,sourceCd,sourceId) {
   if (window.Ajax) {
      new Ajax("/c/app_request/track_app_by_username?AppUsername="+appUsername+"&SourceCd="+sourceCd+"&SourceId="+sourceId, {method: 'get',async:false}).request();
   } else {
      new Request({method:'get', async:false, url: '/c/app_request/track_app_by_username'}).send("AppUsername="+appUsername+"&SourceCd="+sourceCd+"&SourceId="+sourceId);
   }
}