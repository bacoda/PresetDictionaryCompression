/*

 Zedge JS library. (c) 2008

*/

var http_request = false;
var ajax_update_div = '';
var ajax_slide_out_delay=0;
var ajax_slide_delay_function='';
var ajax_slide_div='';
var global_callback;

/*	Creates a rewrite-style string */
function makeURLString(str) {
	str = str.toLowerCase();
	str = str.replace(/ /g, '-');
	str = str.replace(/--/g, '-');
	str = str.replace(/\//g, '-');

	achars	= 'abcdefghijklmnopqrstuvwxyz0123456789-';
	new_str	= '';

	for (var i=0; i<str.length; i++) {
		if (achars.indexOf(str.charAt(i)) != -1) {
			new_str += str.charAt(i);
		}
	}
	return new_str;
}

function setFormElement(obj, value, type){
	if (type=="select"){
		for (x=0;x<obj.length;x++){
			if (obj.options[x].value==value){
				obj.selectedIndex=x;
				return;
			}
		}
	}
	if (type=="radio"){
		for (x=0;x<obj.length;x++){
			if (obj[x].value==value){
				obj[x].checked=1;
				return;
			}
		}
	}
}

function showLayer(id, parent, dx, dy) {
	var obj	= $(id);
	if(obj.style.visibility != 'visible') {
		if(typeof(parent) == 'string') parent=$(parent);
		if (obj.parentNode!=document.body) document.body.appendChild(obj);
		pos=parent.getPosition();
		obj.style.left=(dx+pos.x)+"px";
		obj.style.top=(dy+pos.y)+"px";
		obj.style.visibility	= 'visible';
	} else {
		obj.style.visibility	= 'hidden';
	}
}

function hideLayer(id){
	$(id).style.visibility='hidden';
}

// Makes an AJAX request
function makeRequest(url,callback) {
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
    	http_request = new XMLHttpRequest();
	} else if (window.ActiveXObject) { // IE
    	http_request = new ActiveXObject("Microsoft.XMLHTTP");
    }
	http_request.onreadystatechange = callback;
    http_request.open('GET', url, true);
	http_request.send(null);
}


function validateEmail(email){
	var emailFilter=/^.+@.+\..{2,4}$/;
    if (!emailFilter.test(email)) {
    	return false;
    }else{
    	var illegalChars= /[\(\)\<\>\,\;\:\\\"\[\]]/;
		if (email.match(illegalChars)) {
			return false;
       	}
    }
    return true;
}

function updateDownCounter(){
	$('d2pccount').innerHTML=parseInt($('d2pccount').innerHTML)+1;
	return true;
}





function doBlur(obj){
	$(obj).innerHTML="";
}

function doArea(obj,obj_target,max_length,allowed_chars){

	obj_target=$(obj_target);
 	if(obj.value.length > max_length) {
	    obj.value = obj.value.substring(0, max_length);
  	}
  	if (allowed_chars!="*"){
  		new_val="";
  		for (i=0; i<obj.value.length; i++) {
    		if (allowed_chars.indexOf(obj.value.charAt(i),0) != -1) new_val+=obj.value.charAt(i);
		}
		if (obj.value!=new_val) obj.value=new_val;
  	}
	obj_target.innerHTML="( "+obj.value.length+" / "+max_length+" )";
}

// Acceptable characters in forms
var ac_numb = '0123456789';
var ac_lwr = 'abcdefghijklmnopqrstuvwxyz_';
var ac_upr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var ac_pg = ac_numb+ac_upr+'abcdefghijklmnopqrstuvwxyz -';
var ac_tags = ac_numb+ac_upr+'abcdefghijklmnopqrstuvwxyz/-, ';
var ac_desc = ac_numb+ac_upr+ac_lwr+'-,.\"/#!()?+-:*= ';

function isValid(parm,val) {
	if (parm == "") return false;
	for (i=0; i<parm.length; i++) {
    	if (val.indexOf(parm.charAt(i),0) == -1) return false;
	}
	return true;
}


// Count words in a string
function ZJSCountWords(str){
	str=trim(str);
	str=str.split(' ');
	return str.length;
}

// trims a string
function trim(str) {
	return str.replace(/^\s+/,'').replace(/\s+$/,'');
}

// Returns number of "valid" tags in a comma separated string
function checkTags(field,min_length,max_length){
	var tag_text=field.value;
	tag_text=trim(tag_text);
	tags=tag_text.split(',');

	var valid_tags=0;
	var tags2=new Array();
	var found=false;
	for (x=0;x<tags.length;x++){
		tags[x]=trim(tags[x]);
		if (tags[x].length>=min_length && tags[x].length<=max_length){
			found=false;
			for (y=0;y<tags2.length;y++){
			  	if (tags2[y]==tags[x]) found=true;
			}
			if (found==false){
				tags2[valid_tags]=tags[x];
			 	valid_tags++;
			}
		}
	}
	return valid_tags;
}

function showPCard(uid,parent,dx,dy){

	if (typeof(zPCards)=="undefined") return;

	if (zPCards[uid][2]=="1") gender="Male";
		else gender="Female";
	obj=$('zProfCard');
	obj.innerHTML="<h3 style='margin:0px 0px 10px 0px;'>"+zPCards[uid][0]+"</h3>"+
	"<p style='line-height:17px;margin-bottom:0px;'><img style='float:left;margin-right:12px;width:85px;height:85px;' src='"+zPCards[uid][1]+"'>"+
	"<span style='font-size:13px;color:#555555'>"+
	"<b>Gender:</b> &nbsp;"+gender+"<br/>"+
	"<b>Age:</b> &nbsp;"+zPCards[uid][3]+"<br/>"+
	"<b>Country:</b> &nbsp;"+zPCards[uid][4]+"<br/>"+
	"<b>Phone:</b> &nbsp;"+zPCards[uid][5]+"<br/>"+
	"<b>Online Status:</b> &nbsp;<span>"+zPCards[uid][6]+"</span></span></p>";
	showLayer('zProfCard',parent,dx,dy);

}

function hidePCard(){
	if (typeof(zPCards)=="undefined") return;
	showLayer('zProfCard',null,0,0);
}

// Makes the flash so we dont have to click it in IE
function createControl(divID, content){
  $(divID).innerHTML = content;
}



function makePOSTRequest(url, parameters, callback) {
      http_request = false;
      global_callback=callback;
      if (window.XMLHttpRequest) { // Mozilla, Safari,...
         http_request = new XMLHttpRequest();
         if (http_request.overrideMimeType) {
            http_request.overrideMimeType('text/html');
         }
      } else if (window.ActiveXObject) { // IE
         try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
         } catch (e) {
            try {
               http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
         }
      }
	if (!http_request) {
		global_callback(false,"");
		return false;
    }

    http_request.onreadystatechange = alertContents;
    http_request.open('POST', url, true);
    http_request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http_request.setRequestHeader("Content-length", parameters.length);
		http_request.setRequestHeader("Connection", "close");
		http_request.send(parameters);
}

function alertContents() {
	if (http_request.readyState == 4) {
    	if (http_request.status == 200) global_callback(true,http_request.responseText);
    		else global_callback(false,"");
	}
}

function ZJSdoRating(ctype,item_id,vote){
	parameters="rate="+ctype+"-"+item_id+"-"+vote;
	$('ratecontainer').innerHTML='. . .';
	makePOSTRequest('/ajax/ajax-rating-new.php', parameters, ZJSdoRatingCallback);
}

function ZJSdoRatingCallback(){
	if (http_request.readyState == 4) {
		if (http_request.status == 200){
			var json = eval('(' + http_request.responseText + ')');
			if(json.success == true){
				$('num_votes').innerHTML		= json.num_votes_html;
				$('vote_stars').className		= json.stars_class;
				$('ratecontainer').innerHTML	= 'Thank you for rating!';
			}else{
				//TODO
				//differntiate on cause of failure
				//1. has already voted
				//2. is not logged in
				if(json.user_logged_in == true){
					$('ratecontainer').innerHTML	= 'You can only vote once.';
				} else {
					$('ratecontainer').innerHTML	= 'You must <a href="/sign-in/">sign in</a> to vote.';
				}
			}
		}
	}
}

function ZJSaddToMyAccount(parameters) {
	ajax_update_div	= 'add_to_my_account_container';

	makePOSTRequest('/ajax/ajax-add-to-my-account.php', parameters, ZJSdoGenericCallback);
}


function ZJSsendSMS(parameters) {
	ajax_update_div	= 'send_to_phone_container';

	makePOSTRequest('/ajax/ajax-send-to-mobile.php', parameters, ZJSdoGenericCallback);
}


// Generic AJAX callback function.
// This function generally accepts 2 return values: success and message.
function ZJSdoGenericCallback(){
	if(http_request.readyState == 4) {
		if(http_request.status == 200) {
			if(ajax_update_div.substr(0, 24) == 'send_to_phone_container_')
			{
				response = http_request.responseText.replace(/send_to_phone_container/g, ajax_update_div);
				response = response.replace(/return false;/g, 'ajax_update_div=\''+ajax_update_div+'\';return false;');
			}
			else
				response = http_request.responseText;

			var json	= eval('(' + response + ')');

			if(json.success == true) {
				if($chk(json.redirect_url)) {
					window.location	= json.redirect_url;
				}
			}

			if($chk(json.message) && $chk( $(ajax_update_div) )) {
				$(ajax_update_div).set('html', json.message);

				if($defined(ajax_slide_out_delay) && ajax_slide_out_delay > 0) {
					$clear(ajax_slide_delay_function);
					ajax_slide_delay_function = $(ajax_update_div).slide.delay(ajax_slide_out_delay*1000, $(ajax_update_div), 'out');
					if($(ajax_update_div).getStyle('display') == "none")
					{
						$(ajax_update_div).slide('hide');
						$(ajax_update_div).setStyle('display', 'block');
					}
					$(ajax_update_div).slide('in');
				}
				else
					$(ajax_update_div).setStyle('display', 'block');
			}
		}
	}
}

// Generic AJAX callback function that uses slide out.
// The div will slide out after ajax_slide_out_delay seconds
// This function generally accepts 2 return values: success and message.
function ZJSdoGenericSlideCallback(){
	if(http_request.readyState == 4) {
		if(http_request.status == 200) {
			var json	= eval('(' + http_request.responseText + ')');
			var slider = new Fx.Slide(ajax_update_div);
			if(json.success == true) {
				if($chk(json.redirect_url)) {
					window.location	= json.redirect_url;
				}

				if($chk(json.message)) {
					$(ajax_update_div).innerHTML		= json.message;
					slider.show();
				}

			} else {
				// Some kind of error occured
				if($chk(json.message)) {
					$(ajax_update_div).innerHTML		= json.message;
					slider.show();
				}
			}
			(function() { slider.slideOut('vertical') }).delay(ajax_slide_out_delay*1000);
		}
	}
}

function ZJSRedirect(url){
	window.location.href = url;
}

function ZJSisIE(){
	if ((navigator.userAgent.indexOf("MSIE")!= -1)&&!window.opera) return true;
		return false;
}

function ZJSisOpera(){
	if (navigator.userAgent.indexOf("Opera")!= -1) return true;
		return false;
}


function ZJSToggleDownLayer(parentobj,dotest){
	obj=$('zdDownLayer');
	if (typeof(obj)=="undefined") return;
	if (obj.style.visibility=='visible'){
		hideLayer('zdDownLayer');
	}else{
		if (dotest)	showLayer('zdDownLayer',parentobj, (ZJSisIE()?3:2), -obj.offsetHeight-5);
			else showLayer('zdDownLayer',parentobj, 2, -obj.offsetHeight-5);
	}
}

/*
	Sets display to none for all siblings of element, and flips the element
	between display:none and display:block
*/
function ZJSFlipElementDisableSiblings(element) {
	// First disable siblings
	$clear(ajax_slide_delay_function);
	parentEl = $('get_it');
	parentEl.getChildren().each( function(el) {
		if (el.id == '') {  // mootools wrapper - empty it and set it as the container
			child = el.firstChild;
			el.setAttribute('id', child.id);
			el.removeAttribute('style', '');
			el.innerHTML = '';
		}
		el.style.display = 'none';
	});
	// Then flip display for the item
	if(element.style.display == 'none' || element.style.display == '') element.style.display = 'block';
	else element.style.display = 'none';
}


function ZJSFlipElementToolTray (element, count) {
	for (x=0; x < count; x++) {
		parentEl = $('getits_'+x);
		parentEl.getChildren().each( function(el) {
			if (el.id == '') {  // mootools wrapper - empty it and set it as the container
				child = el.firstChild;
				el.setAttribute('id', child.id);
				el.removeAttribute('style');
				el.innerHTML = '';
				el.className = 'getitContainer';
			}
			el.style.display = 'none';
		});
	}
	element.style.display = 'block';
}

function ZAjaxSubscribeInProfile(userid, subscribed_userid, username) {
	//ajax_update_div	= 'message';
	ajax_update_div	= 'action_message';
	ajax_slide_out_delay = 5;
	var parameters = "stype=user&uid=" + userid + "&sid=" + subscribed_userid + "&sname=" + username;
	makePOSTRequest('/ajax/ajax-subscriptions.php', parameters, ZJSdoGenericCallback);
}

function ZJSgetPhoneOperators(ctype,country_id,op_select) {
	var parameters="mode="+ctype+"-"+country_id+"-"+op_select;
	makePOSTRequest('/ajax/ajax-get-phone-operators.php', parameters, ZJSgetPhoneOperatorsCallback);
}

function ZJSgetPhoneOperatorsCallback() {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			var json = eval('(' + http_request.responseText + ')');
			if(json.success == true) {
				var parentEl = document.getElementById('v_carrier');
				parentEl.length = json.val.length;
				parentEl.selectedIndex = 0;
				for(i=0; i<parentEl.length; i++) {
					parentEl.options[i].value = json.id[i];
					parentEl.options[i].text = json.val[i];
					if (json.op_select == json.id[i]) {
						parentEl.selectedIndex = i;
					}
				}
			} else {
				parentEl.length = 1;
				parentEl.options[0].text = json.message;
			}
		}
	}
}

function ZJSupdateIntPrefix(country_id) {
	var parameters="mode=single-"+country_id;
	makePOSTRequest('/ajax/ajax-get-country-data.php', parameters, ZJSupdateIntPrefixCallback);
}

function ZJSupdateIntPrefixCallback() {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			var json = eval('(' + http_request.responseText + ')');
			if(json.success == true) {
				document.getElementById('int_prefix_span').innerHTML = '+' + json.int_prefix;
			} else {
				alert(json.message);
			}
		}
	}
}

function ZJSswitchCountry (ctype,country_id,op_select) {
	ZJSgetPhoneOperators(ctype,country_id,op_select);
	setTimeout('ZJSupdateIntPrefix('+country_id+')', 500);
}


function ZJSdeleteGuestbookComment(post_id, profile_uid, key) {
	var parameters	= 'gb_data=2-' + profile_uid + '-' + post_id + '-' + key;
	makePOSTRequest('/ajax/ajax-guestbook.php', parameters, ZJSdeleteGuestbookCommentCallback);
}


function ZJSdeleteGuestbookCommentCallback() {
	if (http_request.readyState == 4) {
		if (http_request.status == 200) {
			var json = eval('(' + http_request.responseText + ')');
			if(json.success == true) {
				$('ztext_' + json.gb_id).remove();
			} else {
				alert(json.message);
			}
		}
	}
}

function doToolAddToFavorite(val){
	ajax_update_div	= 'tool_add_favorite';
	ajax_slide_out_delay = 5;
	makePOSTRequest('/ajax/ajax-add-to-my-account.php', 'item=2-'+val, ZJSdoGenericCallback);
}

function ZJSToggleDisplay(obj,scroll_to){
	if ($(obj).style.display=='none'){
		$(obj).style.display='block';
		if (scroll_to) ZJSscrollWindow(obj);
	}else{
		$(obj).style.display='none';
	}
};


function ZJSscrollWindow(obj){
	if(arguments.length != 2)
		offset = -100;
	else
		offset = -arguments[1];
	var myScroll = new Fx.Scroll(window, {'fps':35, offset: { 'x': 0, 'y': offset }});
	//return; alert($(obj).getPosition().y);
	myScroll.toElement(obj);
}


function ZJSEditItem(ctype, item_id, title, description, tags, category, familyfriendly, familyfriendly_claim) {
	ajax_update_div			= 'edit_item_info_container';
	ajax_slide_out_delay	= 0;

	parameters	= 'edit_item=' + ctype + '-' + item_id + '-' + title + '-' + description + '-' + tags + '-' + category + '-' + familyfriendly + '-' + familyfriendly_claim;

	makePOSTRequest('/ajax/ajax-edit-item.php', parameters, ZJSdoGenericCallback);

}

function ZJSShareWithFriends (div_id, count) {
	if (div_id != '' && typeof count != 'undefined') {
		ZJSFlipElementToolTray ($('share_friends_container'+div_id), count)
	} else {
		ZJSFlipElementDisableSiblings($('share_friends_container'));
	}
	if (document.getElementById('share_friends_container'+div_id).style.display == 'block') {
		document.getElementById('from_name'+div_id).focus();
	}
	return false;
}


function zedgeCode(myValue, myValue2) {

		myField = $('zeditor');
		var pos = myField.selectionStart;
		var scrollPos = myField.scrollTop ;

		//IE support
		if (document.selection) {
			myField.focus();
			sel = document.selection.createRange();
			if (myValue2){
				sel.text = myValue+sel.text+myValue2;
			}else{
				sel.text = myValue;
			}
		}

		//MOZILLA/NETSCAPE support
		else if (myField.selectionStart || myField.selectionStart == '0') {
			var startPos = myField.selectionStart;
			var endPos = myField.selectionEnd;

			if (myValue2){
				myField.value = myField.value.substring(0, startPos)+ myValue + myField.value.substring(startPos, endPos) + myValue2 + myField.value.substring(endPos, myField.value.length);
			}else{
				myField.value = myField.value.substring(0, startPos)+ myValue + myField.value.substring(endPos, myField.value.length);
			}

		} else {
			if (myValue2){
				myField.value += myValue+myValue2;
			}else{
				myField.value += myValue;
			}
		}
		myField.scrollTop = scrollPos;
		myField.focus();
	}

function zedgeCode2(w){

	var e=$('zeditor');
	var s=document.selection;
	e.focus();
	if(s){
		var r=s.createRange();
		var d=r.duplicate();
		var	t="["+w+"]"+d.text+"[/"+w+"]";
	}else{
		var ss=e.selectionStart;
		var se=e.selectionEnd;
		var t=e.value.substring(0,ss)+"["+w+"]"+e.value.substring(ss,se)+"[/"+w+"]"+e.value.substring(se);
	}
	t=t.replace(/( )+\[\/(i|b|u|quote)\]/img,"[/$2]$1");
	if(d){
		d.text=t;
	}else{
		e.value=t;
		e.selectionEnd=e.selectionStart=ss;
	}
	return false
}

function ZJSBlindTArea(obj){
	obj.style.color="#999999";
	obj.readOnly=true;
	obj.blur();
}

function ZJSUnblindTArea(obj){
	obj.style.color="#000000";
	obj.readOnly=false;
	obj.focus();
}

// Does the ZEditor Ajax request. And validation of:
// title_min_length, title_max_length, title_min_words,	body_min_length, body_max_length, body_min_words
function doZeditorAjax(button,params) {

	var zerror='';
	if ($defined($('zeditor_title'))){
			if ($('zeditor_title').value.length<zeditor_validation["title_min_length"]) zerror+="The title must be minimum "+zeditor_validation["title_min_length"]+" characters.\n";
			if ($('zeditor_title').value.length>zeditor_validation["title_max_length"]) zerror+="The title can be maximum "+zeditor_validation["title_max_length"]+" characters.\n";
			if (ZJSCountWords($('zeditor_title').value)<zeditor_validation["title_min_words"]) zerror+="The title must have at least "+zeditor_validation["title_min_words"]+" words.\n";
	}
	if ($defined($('zeditor'))){
			if ($('zeditor').value.length<zeditor_validation["body_min_length"]) zerror+="The message must be minimum "+zeditor_validation["body_min_length"]+" characters.\n";
			if ($('zeditor').value.length>zeditor_validation["body_max_length"]) zerror+="The message can be maximum "+zeditor_validation["body_max_length"]+" characters.\n";
			if (ZJSCountWords($('zeditor').value)<zeditor_validation["body_min_words"]) zerror+="The message must have at least "+zeditor_validation["body_min_words"]+" words.\n";
	}

	if(zerror!='') {
		alert(zerror);
		return false;
	} else {
		var text=trim($('zeditor').value);
		ZJSBlindTArea($('zeditor'));
		button.focus();
		if ($defined($('zeditor_preview'))) $('zeditor_preview').disabled=true;
		if ($defined($('zeditor_submit'))) $('zeditor_submit').disabled=true;
		if ($defined($('zeditor_title'))) params+='&title='+encodeURIComponent($('zeditor_title').value);
		if (params.length!=0 && params.charAt(0)!='&') params='&'+params;
		makePOSTRequest('/ajax/ajax-zeditor.php', 'text='+encodeURIComponent(text)+params, doZeditorCallback);
	}
	return true;
}


function doZeditorCallback() {
	if(http_request.readyState == 4 && http_request.status == 200) {
		try {
			var json = eval('(' + http_request.responseText + ')');

		} catch (e){
			alert(http_request.responseText);
			return false;
		}
		if (json.success){
			ZJSUnblindTArea($('zeditor'));
			if ($defined($('zeditor_preview'))) $('zeditor_preview').disabled=false;
			if ($defined($('zeditor_submit'))) $('zeditor_submit').disabled=false;

			if ($('zeditor_msg').style.display!="block")
				$('zeditor_msg').style.display="block";

			$('zeditor_msg').innerHTML=json.html;
			json.scroll_to = 'zeditor_msg';

			if (json.was_preview != true){
				if($chk($('zeditor_container'))) $('zeditor_container').remove();
				if($chk($('signlink'))) $('signlink').remove();
				if($chk($('no_comments'))) $('no_comments').remove();
			}

			if ($defined(json.hide_elements)){
				var s=json.hide_elements.length;
				for (x=0;x<s;x++) $(json.hide_elements[x]).style.display="none";
				}

			if ($defined(json.show_elements)){
				var s=json.show_elements.length;
				for (x=0;x<s;x++) $(json.show_elements[x]).style.display="block";
				}

			if ($defined(json.replace_html)){
				var s=json.replace_html.length;
				for (x=0;x<s;x++) $(json.replace_html[x].id).innerHTML=json.replace_html[x].html;
				}

			if ($defined(json.inject)){
				var s=json.inject.length;
				for (x=0;x<s;x++) $(json.inject[x].id).inject(json.inject[x].inject_to,json.inject[x].pos);
			}

			if ($defined(json.scroll_to)) ZJSscrollWindow(json.scroll_to);

			if ($defined(json.debug)) console.log(json.debug);

			if($defined(json.redirect_url)) {
				// Redirects the user to a given URL
				if($defined(json.redirect_time)) {
					// Redirects to json.redirect_url after {json.redirect_time / 1000) seconds
					(function(){ window.location = json.redirect_url; }).delay(json.redirect_time);
				} else {
					// Redirects to json.redirect_url after {default} 5 seconds
					(function(){ window.location = json.redirect_url; }).delay(5000);
				}
			}

			return true;
		}else{
			//TODO disable alert, show div instead
			alert(json.error_message);
			return false;
		}
	}else {
		//TODO disable alert
		alert(http_request.readyState);
	}
}



//Todo: Domain name in images
function ZShowEmoticons(server_name){
	showLayer('zeditor_emoticons','zeditor',60,-280);
	if ($('zeditor_emoticons').innerHTML.length>50) return;
	$('zeditor_emoticons').innerHTML="<p class=\"med\"><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :D ');hideLayer('zeditor_emoticons');return false;\"><img title='Very Happy' src='http://"+server_name+"/static/smileys/mw_grin.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :) ');hideLayer('zeditor_emoticons');return false;\"><img title='Smile' src='http://"+server_name+"/static/smileys/mw_smile1.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :( ');hideLayer('zeditor_emoticons');return false;\"><img title='Sad' src='http://"+server_name+"/static/smileys/mw_sad.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :shock: ');hideLayer('zeditor_emoticons');return false;\"><img title='Shocked/Suprised' src='http://"+server_name+"/static/smileys/mw_ohmy.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :??: ');hideLayer('zeditor_emoticons');return false;\"><img title='Confused' src='http://"+server_name+"/static/smileys/mw_confused.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :cool: ');hideLayer('zeditor_emoticons');return false;\"><img title='Cool' src='http://"+server_name+"/static/smileys/mw_smirk.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :lol: ');hideLayer('zeditor_emoticons');return false;\"><img title='Laughing' src='http://"+server_name+"/static/smileys/mw_laugh.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :mad: ');hideLayer('zeditor_emoticons');return false;\"><img title='Mad' src='http://"+server_name+"/static/smileys/mw_evilmad.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :razz: ');hideLayer('zeditor_emoticons');return false;\"><img title='Razz' src='http://"+server_name+"/static/smileys/mw_tongue.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :blush: ');hideLayer('zeditor_emoticons');return false;\"><img title='Embaressed' src='http://"+server_name+"/static/smileys/mw_blush.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :cry: ');hideLayer('zeditor_emoticons');return false;\"><img title='Crying' src='http://"+server_name+"/static/smileys/mw_cry.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :evil: ');hideLayer('zeditor_emoticons');return false;\"><img title='Evil smile' src='http://"+server_name+"/static/smileys/mw_evil.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :roll: ');hideLayer('zeditor_emoticons');return false;\"><img title='Rolling Eyes' src='http://"+server_name+"/static/smileys/mw_rolleyes.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :wink: ');hideLayer('zeditor_emoticons');return false;\"><img title='Wink' src='http://"+server_name+"/static/smileys/mw_wink.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :s: ');hideLayer('zeditor_emoticons');return false;\"><img title='Nah' src='http://"+server_name+"/static/smileys/mw_nah.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' #-o ');hideLayer('zeditor_emoticons');return false;\"><img title='Doh!' src='http://"+server_name+"/static/smileys/mw_slap.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :!: ');hideLayer('zeditor_emoticons');return false;\"><img title='Exclamation' src='http://"+server_name+"/static/smileys/mw_excl.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :?: ');hideLayer('zeditor_emoticons');return false;\"><img title='Question' src='http://"+server_name+"/static/smileys/mw_question.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :arrowleft: ');hideLayer('zeditor_emoticons');return false;\"><img title='Arrow Left' src='http://"+server_name+"/static/smileys/mw_arrow2.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :arrowright: ');hideLayer('zeditor_emoticons');return false;\"><img title='Arrow Right' src='http://"+server_name+"/static/smileys/mw_arrow.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :wall: ');hideLayer('zeditor_emoticons');return false;\"><img title='Wall' src='http://"+server_name+"/static/smileys/mw_wall.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :sick: ');hideLayer('zeditor_emoticons');return false;\"><img title='Sick' src='http://"+server_name+"/static/smileys/mw_sick.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :thumbsup: ');hideLayer('zeditor_emoticons');return false;\"><img title='Thumbs Up' src='http://"+server_name+"/static/smileys/mw_thumbsup.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :thumbsdown: ');hideLayer('zeditor_emoticons');return false;\"><img title='Thumbs Down' src='http://"+server_name+"/static/smileys/mw_thumbsdown.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :rant: ');hideLayer('zeditor_emoticons');return false;\"><img title='Rant' src='http://"+server_name+"/static/smileys/mw_rant2.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :wave: ');hideLayer('zeditor_emoticons');return false;\"><img title='Wave' src='http://"+server_name+"/static/smileys/mw_wave.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :nod: ');hideLayer('zeditor_emoticons');return false;\"><img title='Nod' src='http://"+server_name+"/static/smileys/mw_yes.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :disagree: ');hideLayer('zeditor_emoticons');return false;\"><img title='Disagree' src='http://"+server_name+"/static/smileys/mw_no.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :fist: ');hideLayer('zeditor_emoticons');return false;\"><img title='Fist' src='http://"+server_name+"/static/smileys/mw_fist.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :-k ');hideLayer('zeditor_emoticons');return false;\"><img title='Think' src='http://"+server_name+"/static/smileys/mw_hmmm.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :woot ');hideLayer('zeditor_emoticons');return false;\"><img title='Woot' src='http://"+server_name+"/static/smileys/mw_w00t.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :beer: ');hideLayer('zeditor_emoticons');return false;\"><img title='Beer' src='http://"+server_name+"/static/smileys/mw_beer2.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :oops: ');hideLayer('zeditor_emoticons');return false;\"><img title='Oops' src='http://"+server_name+"/static/smileys/mw_oops.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :please: ');hideLayer('zeditor_emoticons');return false;\"><img title='Please' src='http://"+server_name+"/static/smileys/mw_please.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :sorry: ');hideLayer('zeditor_emoticons');return false;\"><img title='Sorry' src='http://"+server_name+"/static/smileys/mw_sorry.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :spam: ');hideLayer('zeditor_emoticons');return false;\"><img title='Spam' src='http://"+server_name+"/static/smileys/mw_spam.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :...: ');hideLayer('zeditor_emoticons');return false;\"><img title='Dots' src='http://"+server_name+"/static/smileys/mw_dots.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :offtopic: ');hideLayer('zeditor_emoticons');return false;\"><img title='Off Topic' src='http://"+server_name+"/static/smileys/mw_offtopic.gif' alt='' /></a><a href=\"JavaScript:void(0);\" onclick=\"zedgeCode(' :hi: ');hideLayer('zeditor_emoticons');return false;\"><img title='Hi' src='http://"+server_name+"/static/smileys/mw_hi.gif' alt='' /></a></p><p style=\"margin-bottom:0px;\"><a onclick=\"hideLayer('zeditor_emoticons');return false;\" href=\"javascript:void(0);\">[Close]</a></p>";
	return false;
}

/** Handle controls in the input img url zeditor layer
 */
function ZJSImgPromptHandler(code,res){
	if(code==1){ //ok
		if ( ZJSIsUrl(res) ) {
			zedgeCode('[img]'+res+'[/img]');
		}
		hideLayer('zeditor_image');	
	}
	else if(code==2){ //preview
		if ( ZJSIsUrl(res) ) {
			var img='<img style="width:128px;" src="' + res + '" />';
			$('img_preview').set('html', img);
		}else{
			$('img_preview').set('html', '<br \><br \>Enter valid URL');
		}	
	}
	else{ //cancel
		hideLayer('zeditor_image');	
	}
}

/** Primitive valid URL checker
 */
function ZJSIsUrl(s) {
	var regexp = /(ftp|http|https):\/\/[A-Za-z0-9\.-]{3,}\.[A-Za-z]{3}/
	return regexp.test(s);
}


function closeDiv(obj,time){
	var mySlider = new Fx.Slide(obj, {duration: time});
	mySlider.toggle();
}


//	Do verification on telephone number and verification code
function doCheckSMS(obj, obj_target, submit_btn, min_length, max_length) {
	obj_target	= $(obj_target);

	allowed_chars	= ac_numb + '()- ';		// defined in /js/zedge.js

	// First remove all illegal chars
	new_val	= '';
	for(i = 0; i < obj.value.length; i++) {
		if(allowed_chars.indexOf(obj.value.charAt(i), 0) != -1)	new_val	+= obj.value.charAt(i);
	}
	if(obj.value != new_val)	obj.value	= new_val;

	if(obj.value.length >= min_length) {
		if(obj.value.length > max_length) {
		    obj.value	= obj.value.substring(0, max_length);
		}

	  	obj_target.innerHTML	= obj.value.length + ' / ' + max_length;

	  	$(submit_btn).disabled	= false;

	} else {
		obj_target.innerHTML	= 'Must be minimum ' + min_length + ' characters';


		$(submit_btn).disabled	= true;
	}


}

function doSWFAjax(div_id, count) {
	ajax_update_div	= 'status_container'+div_id;
	var from_name=trim($('from_name'+div_id).value);
	var message=trim($('share_friends'+div_id).value);
	var mail1=trim($('mail1'+div_id).value);
	var mail2=trim($('mail2'+div_id).value);
	var mail3=trim($('mail3'+div_id).value);
	var ctype=trim($('ctype'+div_id).value);
	var item_id=trim($('item_id'+div_id).value);
	if(	false) {
		alert('Please enter only valid email addresses.');
		return false;
	} else {
		var status_container = $('status_container'+div_id);
		status_container.innerHTML = '<div id="alert_1" class="notify_info">Sending emails...</div>';
		if(typeof div_id != 'undefined' && div_id != '')
		{
			ZJSFlipElementToolTray(status_container, count);
		}
		else
		{
			ZJSFlipElementDisableSiblings(status_container);
		}
		ajax_slide_out_delay = 5;
		makePOSTRequest('/ajax/ajax-share-friends.php', 'div_id='+encodeURIComponent(div_id)+'&from_name='+encodeURIComponent(from_name)+'&mail[1]='+encodeURIComponent(mail1)+'&mail[2]='+encodeURIComponent(mail2)+'&mail[3]='+encodeURIComponent(mail3)+'&message='+encodeURIComponent(message)+'&ctype='+encodeURIComponent(ctype)+'&item_id='+encodeURIComponent(item_id), ZJSdoGenericCallback);

	}
	return true;
}

function ZJSselectedSwap(id)
{
	if($('set_'+id).get('checked'))
	{
		$('row_'+id).addClass('uploadrow-selected');
		$('set_'+id).set("checked", true);
	}
	else
	{
		$('row_'+id).removeClass('uploadrow-selected');
		$('set_'+id).set("checked", false);
	}
}

function ZJSselectAll()
{
	var checked = $('set_all').get('checked');

	$$('.chk input').each(function(chk) {
		chk.set("checked", checked);
		if($chk(prnt = chk.getParent('*=.uploadrow')))
		{
			prnt.toggleClass('uploadrow-selected');
		}
	});
}

function ZJSFFilterSelectable(cat_dropdown_id, ffriendly_yes_id, ffriendly_no_id)
{
	var babes_category = 14;
	var hunks_category = 15;
	var ffriendly_yes = $(ffriendly_yes_id);
	var ffriendly_no = $(ffriendly_no_id);
	var ffriendly_parent = ffriendly_no.getParent();
	var category = $(cat_dropdown_id).value;

	if(category == babes_category || category == hunks_category)
	{
		ffriendly_parent.slide('out');
		if(typeof ffriendly_yes.prev_state == "undefined" || ffriendly_yes.prev_state == "keep_selected")
		{
			ffriendly_yes.prev_state = ffriendly_yes.checked;
		}
		ffriendly_no.checked = true;
		ffriendly_yes.disabled = true;
		ffriendly_no.disabled = true;
	}
	else
	{
		if(ffriendly_parent.getStyle('display') == 'none')
		{
			ffriendly_parent.slide('hide');
			ffriendly_parent.setStyle('display', 'block');
		}
		ffriendly_parent.slide('in');
		//Only change checked state if we move away from babes/hunks
		if(typeof ffriendly_yes.prev_state != "undefined" && ffriendly_yes.prev_state != "keep_selected")
		{
			if(ffriendly_yes.prev_state) ffriendly_yes.checked = true;
			else ffriendly_no.checked = true;
			ffriendly_yes.prev_state = "keep_selected";
		}
		ffriendly_yes.disabled = false;
		ffriendly_no.disabled = false;
	}
}


//	Generic function to show a message in a div.
function ZJSShowMessage(delay, div, message) {
	$(div).set('html', message);
	if($(div).getStyle('display') == 'none') {
		$(div).slide('hide');
		$(div).setStyle('display', 'block');
	}
	$(div).slide('in');
	var slider = new Fx.Slide($(div));
	(function() { slider.slideOut('vertical') }).delay(delay*1000);
}

function ZJSSiteGuardReport(ctype, itemid) {
	ajax_update_div			= 'siteguard_message';
	ajax_slide_out_delay	= 5;
	var parameters			= 'siteguard-report=' + ctype + '-' + itemid;
	makePOSTRequest('/ajax/ajax-siteguard.php', parameters, ZJSdoGenericCallback);

}


//   Copied from zedge-new.js - todo: trim and optimzie
window.addEvent( 'domready', function () {

	$$( 'a' ).each( function ( a ) { a.addEvent( 'focus', function () { this.blur() } ) } );

	$$( 'input.blackbutton' ).each( function ( el ) {
		el.addEvent( 'mouseover', function () { this.addClass( 'hover' ) } );
		el.addEvent( 'mouseout', function () { this.removeClass( 'hover' ) } );
	} );

	$$( 'input[disabled="disabled"]' ).each( function ( el ) { el.addClass( 'disabled' ) } );

	$$( '#menu a' ).each( function( a ) {
		var fx = new Fx.Morph( a, { duration : 200, wait : false } );
		a.addEvent( 'mouseenter', function() { if (!a.getParent().hasClass('active')) fx.start({ 'background-color': '#a00' }); });
		a.addEvent( 'mouseleave', function() { if (!a.getParent().hasClass('active')) fx.start({ 'background-color': '#000' }); });
	} );

	$$( 'input[type="submit"]' ).each( function( x ) {
		x.addEvent( 'mouseenter', function() { x.setStyle('backgroundPosition','bottom left'); });
		x.addEvent( 'mouseleave', function() { x.setStyle('backgroundPosition','top left'); });
	} );
	$$( 'input[type="button"]' ).each( function( y ) {
		y.addEvent( 'mouseenter', function() { y.setStyle('backgroundPosition','bottom left'); });
		y.addEvent( 'mouseleave', function() { y.setStyle('backgroundPosition','top left'); });
	} );

	/*$( 'html' ).setStyle( 'overflow', '-moz-scrollbars-vertical' );*/

	if ($defined($('tabs_front_default'))){
		var content_tabs = new CTabsNew(
			[
				{id: 'content_tabs_2',  url: '/ajax/ajax-get-front-items.php?ctype=2', content_type: 2},
				{id: 'content_tabs_4',  url: '/ajax/ajax-get-front-items.php?ctype=4', content_type: 4},
				{id: 'content_tabs_9',  url: '/ajax/ajax-get-front-items.php?ctype=9', content_type: 9},
				{id: 'content_tabs_1',  url: '/ajax/ajax-get-front-items.php?ctype=1', content_type: 1},
				{id: 'content_tabs_3',	url: '/ajax/ajax-get-front-items.php?ctype=3', content_type: 3}
			], 'browse'
		);
	}

	if ($defined($('tabs_front_usa'))){
		var content_tabs = new CTabsNew(
			[
				{id: 'content_tabs_4',  url: '/ajax/ajax-get-front-items.php?ctype=4', content_type: 4},
				{id: 'content_tabs_9',  url: '/ajax/ajax-get-front-items.php?ctype=9', content_type: 9},
				{id: 'content_tabs_1',  url: '/ajax/ajax-get-front-items.php?ctype=1', content_type: 1},
				{id: 'content_tabs_3',  url: '/ajax/ajax-get-front-items.php?ctype=3', content_type: 3},
				{id: 'content_tabs_2',	url: '/ajax/ajax-get-front-items.php?ctype=2', content_type: 2}
			], 'browse'
		);
	}

	if ($defined($('tabs_dl_default'))){
		var content_tabs = new CTabsNew(
			[
				{id: 'content_tabs_2',	url: '/ajax/ajax-get-dl-items.php?ctype=2', content_type: 2},
				{id: 'content_tabs_4',	url: '/ajax/ajax-get-dl-items.php?ctype=4', content_type: 4},
				{id: 'content_tabs_9',	url: '/ajax/ajax-get-dl-items.php?ctype=9', content_type: 9},
				{id: 'content_tabs_1',	url: '/ajax/ajax-get-dl-items.php?ctype=1', content_type: 1},
				{id: 'content_tabs_3',	url: '/ajax/ajax-get-dl-items.php?ctype=3', content_type: 3}
			], 'browse'
		);
	}

	if ($defined($('tabs_dl_usa'))){
		var content_tabs = new CTabsNew(
			[
				{id: 'content_tabs_4',	url: '/ajax/ajax-get-dl-items.php?ctype=4', content_type: 4},
				{id: 'content_tabs_9',	url: '/ajax/ajax-get-dl-items.php?ctype=9', content_type: 9},
				{id: 'content_tabs_1',	url: '/ajax/ajax-get-dl-items.php?ctype=1', content_type: 1},
				{id: 'content_tabs_3',	url: '/ajax/ajax-get-dl-items.php?ctype=3', content_type: 3},
				{id: 'content_tabs_2',	url: '/ajax/ajax-get-dl-items.php?ctype=2', content_type: 2}
			], 'browse'
		);
	}

	if ($defined($('zedgers_tab1'))){
		var people_tabs = new CTabsNew(
			[
				{id: 'zedgers_tab1',  url: '/ajax/ajax-get-people-items.php?ptype=online'},
				{id: 'zedgers_tab2',  url: '/ajax/ajax-get-people-items.php?ptype=ranks'},
				{id: 'zedgers_tab3',  url: '/ajax/ajax-get-people-items.php?ptype=subscribed'}
			], 'people'
		);
	}

	if ($defined($('zedgers_tab1_6'))){
		var people_tabs = new CTabsNew(
			[
				{id: 'zedgers_tab1_6',  url: '/ajax/ajax-get-people-items.php?ptype=online&size=6'},
				{id: 'zedgers_tab2_6',  url: '/ajax/ajax-get-people-items.php?ptype=ranks&size=6'},
				{id: 'zedgers_tab3_6',  url: '/ajax/ajax-get-people-items.php?ptype=subscribed&size=6'}
			], 'people'
		);
	}

	if ($defined($('related_items'))){
		var related_tabs = new CTabsRelated(
			[
				{id: 'related_tab_1',	url: '/ajax/ajax-get-related-items.php'},
				{id: 'related_tab_2',	url: '/ajax/ajax-get-related-items.php?tab='+related.tab2+
													'&ctype='+related.ctype+'&type='+related.subtype+
													'&cat='+related.cat+'&uid='+related.uid+
													'&limit='+related.limit+'&filter='+related.filter}
			], related, unescape(related.cache)
		);
	}

	if ($defined($('upload_items'))){ var upload_tabs = new CTabsUploads( tobj ); }

	/*deprecated?*/
	$$( 'input[name="query"]' ).addEvent( 'focus', function () {
		if ( this.get( 'value' ) == 'keywords' || this.get( 'value' ) == 'Search for free downloads now!' ) this.set( 'value', '' );
	} );
} );

var phones = "";
function PhoneSelector_Slide()
{
	if(phones == "" && $defined($('pselectbox')) && $defined('phone_ctype')) {
		phones = new Phones( 'pselectbox', 'phoneselect_brands', 'phoneselect_models', 'phoneselgo', 'phonesel', phone_ctype, true);
		$('pselectbox').slide('hide');
		$('pselectbox').setStyle('display', 'block');
	}
	if($defined($('change-it')))
	{
		if(!$('pselectbox').get('slide').open)
			$('change-it').set('text', 'Cancel');
		else
			$('change-it').set('text', 'Change it');
	}
	$('pselectbox').slide();
}

/**
 *	@class		CTabsUploads
 *	@author		Erik Kjelling
 */
var CTabsUploads = new Class( {
	tobj:'',
	processing: false,
	initialize: function( tobj ){
		this.tobj = tobj;
		tobj.tabs.each( function(element) {
			if(typeof element == 'object' && $(element.id)){
				$( element.id).addEvent( 'click', (function() {
					if(this.processing) return;
					$(element.id).blur();
					if(!$(element.id).hasClass('active') ) {
						this.processing = true;
						var req = new Request({ url:tobj.url, method:'get' });
						req.addEvent( 'onComplete', (function() {
							var res = JSON.decode(req.response.text);
							if(res.result==true){
								$('uploadsbox_body').empty();
								new Element('div', {'html':res.body.html, 'class':''}).inject('uploadsbox_body');
								new Element('div', {'class':'clear'}).inject('uploadsbox_body');
								element.html = $('uploadsbox_body').get('html');
								$('upload_items').getElement('.active').removeClass('active');
								$( element.id ).addClass( 'active' );
								$( element.id ).getNext().setStyle( 'visibility', 'hidden' );
							}else {
								$( element.id ).getNext().setStyle( 'visibility', 'hidden' );
							}
							// for ringtones
							if (res.cache_flash_players.length > 0) {
								element.js_cache = res.cache_flash_players;
								element.rtp_count = res.cache_flash_players.length;
								element.jsRefreshRTP = function () {
										for (j=0; j<element.rtp_count; j++) {
											$(element.js_cache[j].id).set('html', element.js_cache[j].obj);
										}
									};
							} else {
								element.jsRefreshRTP = function () { return false; };
							}
							element.jsRefreshRTP();
							this.processing = false;
						}).bind(this));
						if( ! $chk(element.html) ) {
							$( element.id ).getNext().setStyle( 'visibility', 'visible' );
							req.send( "ctype="+element.ctype+"&uid="+tobj.uid+"&usr="+tobj.usr+"&uls="+element.uls );
						}
						else {
							$('upload_items').getElement('.active').removeClass('active');
							var temp = $('uploadsbox_body').get('html');
							$('uploadsbox_body').set('html', unescape(element.html));
							$( element.id ).addClass( 'active' );
							if (typeof element.jsRefreshRTP == 'function')
								element.jsRefreshRTP();
							this.processing = false;
						}
					}

				}).bind(this) )
			}
		},this );
	}
});

/**
*	@class		Tabs class
*	@author		Maxim Rubis
*/

var Tabs = new Class( {
	_tabs: '',
	_divid: '',

	initialize: function(_tabs, _divid)
	{
		this._tabs = _tabs;
		this._divid = _divid;

		this._tabs.each(function( element ) {
			if ( $( element.id ) ) {
				$( element.id ).addEvent( 'click', function ( ) {
					this.blur();
					if ( !$( element.id ).getProperty( 'class' ).test( 'active' ) ) {
						var req = new Request();
						req.addEvent( 'onComplete', function() {
							if ( this.response.text.substr( 0, 9 ) != 'Exception' ) {
								$( _divid ).setProperty( 'html', this.response.text );
								_tabs.each( function( el ) { $( el.id ).removeClass( 'active' ) });
								$( element.id ).addClass( 'active' );
							}
						} );
						req.send( { url: element.url, method: 'get' } );
					}
				} );
			}
		} );
	}
} );


/**
 *	@class		CTabsRelated - ajax box on view content item page
 *	@author		Erik Kjelling
 */
/*TODO if request in progress, disable all click events from init */
var CTabsRelated = new Class( {
	cache:'',
	tabs:'',
	related:'',
	initialize: function(tabs, related, cache){
		this.tabs = tabs;
		this.related = related;
		this.cache = cache;
		this.tabs.each( function(element) {
			if($(element.id)){
				/*console.log(element.id);*/
				var test = element.id;
				js_cache = ''; // for ringtones
				rtp_count = 0; // for ringtones
				/*alert(test);*/
				$(test).addEvent('click', function() {
					this.blur();
					if(!$(element.id).hasClass('active') ) {
					var req = new Request();
					req.addEvent( 'onComplete', function() {
						var res = JSON.decode(this.response.text);
						if(res.result==true){
							$('relatedbox_body').empty();
							var rows = res.body.html;
							for(var i=0; i<rows.length; i++){
								new Element('div', {'html':rows[i], 'class':''}).inject('relatedbox_body');
							};
							new Element('div', {'class':'clear'}).inject('relatedbox_body');
							$('related_items').getElement('.active').removeClass('active');
							$( element.id ).addClass( 'active' );
							$( element.id ).getNext().setStyle( 'visibility', 'hidden' );
						}else {
							$( element.id ).getNext().setStyle( 'visibility', 'hidden' );
						}
						// for ringtones
						if (res.cache_flash_players.length > 0) {
							js_cache = res.cache_flash_players;
							rtp_count = res.cache_flash_players.length;
							for (j=0; j<rtp_count; j++) {
								$(res.cache_flash_players[j].id).set('html', res.cache_flash_players[j].obj);
							}
						}
					});
					if( ! $chk(cache) ) {
						/*console.log('no cache, sending request');*/
						cache = $('relatedbox_body').get('html');
						$( element.id ).getNext().setStyle( 'visibility', 'visible' );
						req.send( { url: element.url, method: 'get' } );
					} else {
						/*console.log('cache exists, swapping content...');*/
						$('related_items').getElement('.active').removeClass('active');
						var temp = $('relatedbox_body').get('html');
						$('relatedbox_body').set('html', cache);
						cache = temp;
						$( element.id ).addClass( 'active' );
						// for ringtones
						if (rtp_count>0 && js_cache!='') {
							if (this.id=='related_tab_2'){
								for (j=0; j<rtp_count; j++) {
									$(js_cache[j].id).set('html', js_cache[j].obj);
								}
							} else {
								rtpResetFlash();
							}
						}
					}
					}
				}
				);
			}
		});
	}
});


/**
 *	@class		CTabsNew
 *	@author		Erik Kjelling
 */
var CTabsNew = new Class( {
	tabs:'',
	divid:'',
	processing: false,
	initialize: function(tabs, container){
		this.tabs = tabs;
		this.container = container;
		this.processing = false;
		this.tabs.each( function(element) {
			if($(element.id)){
				$(element.id).addEvent('click', (function() {
					if(this.processing) return;
					$(element.id).blur();
					if(!$(element.id).hasClass('active') ) {
					$( element.id ).getNext().setStyle( 'visibility', 'visible' );
					this.processing = true;
					var req = new Request();
					req.addEvent( 'onComplete', (function() {
						var res = JSON.decode(req.response.text);
						if(res.result==true){
							$(container).getElement('.header_link').setProperty('html', res.header.link);
							$(container).getElement('.header_info').setProperty('html', res.header.info);
							$(container).getElement('.itembox_body').setProperty('html', res.body.html);
							$(container).getElement('.itembox_footer_link').setProperty('html', res.footer.link);
							if($chk($(container).getElement('.active'))){
								$(container).getElement('.active').removeClass('active');
							}
							if($defined(element.content_type)){
								$('lst_content_type').value = element.content_type;
								if($(container).getElement('.box')){
									if(element.content_type==4){
										$(container).getElement('.box').addClass('ringtones');
									}
									else{
										if($(container).getElement('.box').hasClass('ringtones')){
											$(container).getElement('.box').removeClass('ringtones');
										}
									}
								}
							}
							$( element.id ).addClass( 'active' );
						}
						else
						{
						}
						$( element.id ).getNext().setStyle( 'visibility', 'hidden' );
						this.processing = false;
					}).bind(this));
					req.send( { url: element.url, method: 'get' } );
					}
				}).bind(this) )
			}
		},this);
	}
});


/**
*	@class		CTabs
*	@author		Erik Kjelling, Maxim Rubis
*/
var CTabs = new Class( {
	_tabs: '',
	_divid: '',
	initialize: function(_tabs, _divid)	{
		this._tabs = _tabs;
		this._divid = _divid;
		this._tabs.each(function( element ) {
			if ( $( element.id ) ) {
				$( element.id ).addEvent( 'click', function ( ) {
					this.blur();
					if ( ! $( element.id ).hasClass('active') ) {

						/*TODO add layer with spinning load icon; remove when done*/

						var req = new Request();
						req.addEvent( 'onComplete', function() {
							var res = JSON.decode( this.response.text );
							/*console.log(res);*/
							if ( res.result==true ) {
								$('itembox_header_link').setProperty( 'html', res.header.link );
								/*$('itembox_header_info').setProperty( 'html', res.header.link );*/
								$('itembox_body1').setProperty( 'html', res.body.html1 );
								$('itembox_body2').setProperty( 'html', res.body.html2 );
								/*$('itembox_footer_info').setProperty( 'html', res.footer.info );*/
								$('itembox_footer_link').setProperty( 'html', res.footer.link );

								_tabs.each( function( el ) { $( el.id ).removeClass( 'active' ) });
								$( element.id ).addClass( 'active' );
							}
						} );
						req.send( { url: element.url, method: 'get' } );
					}
				} );
			}
		} );
	}
} );

/**
*	@package	Phone selection
*	@version	beta 2
*	@author		Erik Kjelling, rewritten by Henrik Kjelsberg
*/
var Phones = new Class( {
	phone: '',
	processing: '',
	ctype: 0,

	initialize: function( container, selbox_brands, selbox_models, phoneselgo, spinner, ctype, do_redirect) {
		if ( !( this.selbox_brands = $( selbox_brands ) ) ) return false;
		if ( !( this.selbox_models = $( selbox_models ) ) ) return false;
		if ( !( this.phoneselgo = $( phoneselgo ) ) ) return false;

		//if(container == "pselectbox")
		this.ctype = ctype;

		this.container	= $( container );
		this.spinner	= $( spinner );
		this.section	= this.selbox_brands.title;

		this.selbox_models.removeChild( this.selbox_models.firstChild );
		if(do_redirect) this.phoneselgo.addEvent( 'click', ( function () { this.change() } ).bind( this ) );
		this.selbox_brands.addEvent( 'change', ( function () { this.populate() } ).bind( this ) );

		// get operators
		var req = new Request( { url : '/ajax/ajax-get-phones.php?ctype=' + this.ctype, onComplete: ( function ( phones ) {
			this.phones = JSON.decode( phones );
			this.processing = this.phones.slice();
			this.selbox_brands.options.length = 0;
			var option = new Element( 'option' ).setProperties( { 'value' : '', 'html' : 'Choose a brand'} ).inject( this.selbox_brands );
			this.phones.each( ( function ( el ) {
				var option = new Element( 'option' ).setProperties( { 'value' : el.id, 'html' : el.brand } ).inject( this.selbox_brands );
			} ).bind( this ) );
			this.spinner.setStyle( 'display', 'none' );
		} ).bind( this ) } ).post();
	},

	populate: function () {
		if($defined($("pmselectbox")))
			$("pmselectbox").slide('hide');
		this.spinner.setStyle( 'display', 'block' );
		var req = new Request( { url : '/ajax/ajax-get-phones.php?brand='+this.selbox_brands.get('value') + '&ctype=' + this.ctype, onComplete: ( function ( phones ) {
			this.phones = JSON.decode( phones );
			this.processing = this.phones.slice();
			this.selbox_models.options.length = 0;
			var option = new Element( 'option' ).setProperties( { 'value' : '', 'html' : 'Select model'} ).inject( this.selbox_models );
			this.phones.each( ( function ( el ) {
				var option = new Element( 'option' ).setProperties( { 'value' : el.id, 'html' : el.model } ).inject( this.selbox_models );
			} ).bind( this ) );

			this.spinner.setStyle( 'display', 'none' );
			if($defined($("pmselectbox")))
			{
				if (this.selbox_brands.get('value') != '') {
					$("pmselectbox").slide('show');
				} else {
					$("pmselectbox").slide('hide');
				}
			}
		} ).bind( this ) } ).post();
	},

	change: function () {
		var value = this.selbox_models.get( 'value' );
		this.phone = this.selbox_brands.options[this.selbox_brands.selectedIndex].get( 'text' ) + '-' + this.selbox_models.options[this.selbox_models.selectedIndex].get( 'text' );
		window.location.href = '/' + this.section + '/' + value + '/' + makeURLString( this.phone ) + '-' + this.section + '/?updPhone';
	}
} );

var Lightbox = new Class({
	onDone: '',

	initialize: function(options){
		this.options = $extend({
			width: 395,
			height: 250
		}, options || {});

		this.overlay = new Element('div', {'id': 'lbOverlay'}).inject(document.body);
		this.overlay.set('opacity', 0);
		this.overlay.set('tween', {duration: 'short'});
		//this.overlay.onclick = this.close.bind(this);

		this.center = new Element('div', {'id': 'lbCenter', 'styles': {'width': this.options.width, 'height': this.options.height, 'background':'none', 'marginLeft': -(this.options.width/2)}}).inject(document.body);
		this.center.set('opacity', 0);
		this.center.set('tween', {duration: 'short'});
	},

	show: function(html, onDone){
		this.setup(true);

		this.onDone = onDone;

		this.center.setProperty('html', html);
		this.center.get('tween').addEvent("onComplete", onDone);

		this.center.setStyles({top: document.getScroll().y + (document.getOffsetSize().y / 3)});
		this.overlay.setStyles({'top': 0, 'height': document.getScrollSize().y});

		// animate
		this.overlay.tween('opacity', 0.5);
		this.center.tween('opacity', 1);
		document.getElementById('cancelLink').onclick = this.close.bind(this);
		return true;
	},

	close: function(){
		this.overlay.tween('opacity', 0)
		this.center.tween('opacity', 0);
		this.overlay.empty();
		this.center.empty();
		this.setup(false);
		return false;
	},

	setup: function(open){
		var elements = $A(document.getElementsByTagName('object'));
		elements.extend(document.getElementsByTagName(Browser.Engine.trident ? 'select' : 'embed'));
		elements.each(function(el){
			if (open) el.lbBackupStyle = el.style.visibility;
			el.style.visibility = open ? 'hidden' : el.lbBackupStyle;
		});
	}
});


