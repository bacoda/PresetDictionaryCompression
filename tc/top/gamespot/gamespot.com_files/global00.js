/**
 * Use this to load all the function at the end of the page
**/
onload_functions = [];
function register_onload(func) {
   onload_functions.push(func);
}


function addgamepop(id,list) {
    window.open('/pages/profile/add_game.php?pid=' + id + '&list=' + list, 'trackpop', 'width=260,height=440,resizable=1,scrollbars=0');
}

function AJAX_add_game_pop( id, list ) {
    var url  = '/pages/profile/add_game.php';
    var params  = 'pid='+id+'&list='+list+'&action=update';
    new Ajax( url, { method : 'post', postBody : params, onComplete : AJAX_add_game_display } ).request();
}

function AJAX_add_game_display( results ) {
    var types = {8:'own',9:'playing',10:'want',11:'tracking'};
    var json_res = eval( '(' + results + ')' );
    for(i=0; i<json_res.length; i++) {
        for(var x in types) {
            if(json_res[i]==x) {
                var on_obj = $(types[x]+'_on');
                var off_obj = $(types[x]+'_off');
                if(off_obj.style.display != '') {
                    fadeOut( on_obj, .5 );
                    setTimeout( function() {if (on_obj) {on_obj.style.display = 'none'; }
                                            if (off_obj) {off_obj.style.display = '';
                                            fadeIn( off_obj, .5 );}}, 500 );
                }
            }
        }
    }
}

function track_contact(contact_username, mode, force_reload ) {
    if('undefined' == typeof force_reload) {force_reload = true;}
    addcontactpop( contact_username, mode );

    if ( force_reload ) {
        // reload the current page with the updated data.
        window.location.reload( force_reload );
    }
}

function track_union(union_id, mode, force_reload  ) {
    window.open('/pages/profile/track_union.php?mode=' + mode + '&union_id=' + union_id, 'uniontrackpop', 'width=260,height=260,resizable=1,scrollbars=0');

    if('undefined' == typeof force_reload) {force_reload = true;}
    if ( force_reload ) {
        // reload the current page with the updated data.
        window.location.reload( force_reload );
    }
}

function withdraw_application(union_id) {
    window.open('/pages/unions/withdraw_application.php?action=Retract&union_id=' + union_id, 'retractapp', 'width=260,height=260,resizable=1,scrollbars=0');
    window.location.reload( true );
}

function addcontactpop(contact_username,mode) {
    popupWin = window.open('/pages/profile/track_contact.php?mode=' + mode + '&username=' + contact_username, 'contactpop', 'width=260,height=260,resizable=1,scrollbars=0');
}

function videoplayerpop(sid,pid,rgroup,ontology,dw_enable,section,subsec,usecount,count,mae_bypass,live,event_id) {
    ontology = ontology ? '&ont_override=' + ontology : '';
    mae_bypass = mae_bypass ? '&mb=' + mae_bypass : '';
    rgroup = rgroup ? 'rgroup=' + rgroup : '';
    if (!pid) { pid = '0'; }
    if (pid == '' || pid == 'undefined') { pid = '0'; }
    
    if (live && event_id) {
        var pop_url = '/video/live/' + event_id + '/';
    } else {
        var pop_url = '/video/' + pid + '/' + sid + '/videoplayerpop?' + rgroup + ontology + mae_bypass;
    }
        
    if (dw_enable){
        var dw_tag = "&tag=" + section + ";" + subsec;
        dw_tag = usecount ? dw_tag + ";" + count : dw_tag;
        pop_url = pop_url + dw_tag;
    }
    
    var width = screen.width <= 1200 ? screen.width : 1200;
    var height = screen.height <= 900 ? screen.height : 900;
    popupWin = window.open(pop_url, 'videoplayerpop', 'resizable=1,scrollbars=1,toolbar=1,location=1,menubar=1,width=' + width + ', height=' + height);
    setTimeout("checkWindow(popupWin)", 50);
    if ( popupWin ) popupWin.focus();
	// lutonm (2007-07-23): Commenting the return out for now. This was
	// actually displaying the string 'false' on the page this function
	// launched from. At least on the videos tabs of the special event
	// page anyway.
    //return false;
}

function boxshotpop(pid) {
    var popupWin = window.open('/pages/image_viewer/boxshot.php?pid=' + pid, 'boxshotpop', 'width=640,height=910,resizable=1,scrollbars=1');
    popupWin.focus();
}

function pollPop(poll_id) {
    if(String(poll_id).length > 0)
    {
        var add = '?poll_id='+poll_id;
    }
    var pollwin = window.open('/pages/modules/poll_results.php'+add,'pollwin','height=760,width=760,resizable=0,scrollbars=1');
    pollwin.focus();
}

function tournChatPop(tourn) {
    window.open('/tournaments/'+tourn+'/chat.php','chatpop','width=620,height=420,scrollbars=0,menubar=0,toolbar=0,location=0,status=0,resizable=1');
}


function eventPopup(event,css,mae_bypass,dw_enable,section,subsec,usecount,count) {

    var ah_cam='';
    var ah_chat='';
    var ah_url='';
    if(event=='afterhours') {
        switch (subsec) {
            case 'cam1':
                ah_cam='1';
                ah_chat='mainstage';
                break;
            case 'cam2':
                ah_cam='2';
                ah_chat='homer';
                break;
            case 'cam3':
                ah_cam='3';
                ah_chat='gameplay';
                break;
            case 'cam4':
                ah_cam='4';
                ah_chat='confess';
                break;
            case 'cam5':
                ah_cam='5';
                ah_chat='remote';
                break;
        }
        ah_url = '&cam='+ah_cam+'&chat='+ah_chat;
    }

    css = css ? '&style=' + css : '';
    mae_bypass = mae_bypass ? '&mb=' + mae_bypass : '';
    url = '/pages/event_popup/index.php?event=' + event + css + mae_bypass + ah_url;
    if (dw_enable){
        var dw_tag = "&tag=" + section + ";" + subsec;
        dw_tag = usecount ? dw_tag + ";" + count : dw_tag;
        url = url + dw_tag;
    }

  var popupWin = window.open(url, 'eventPopup_'+event, 'width=500,height=500,resizable=0,scrollbars=0,menubar=0,toolbar=0,location=0,status=0');
  setTimeout("checkWindow(popupWin)", 50);
  popupWin.focus();
}

function uberpop(event,mae_bypass) {
    mae_bypass = mae_bypass ? '&mb=' + mae_bypass : '';
    url = '/pages/event/uberpop/uberpop.php?event=' + event + mae_bypass
    event = event.replace(/-/g, '_');
    var popupWin = window.open(url, 'uberpop_'+event, 'width=710,height=730,resizable=0,scrollbars=0,menubar=0,toolbar=0,location=0,status=0');
    popupWin.focus();
}

function chatpop(event,mae_bypass) {
    mae_bypass = mae_bypass ? '&mb=' + mae_bypass : '';
    url = '/pages/event/series/live_modules/chat.php?event=' + event + mae_bypass
    event = event.replace(/-/g, '_');
    var popupWin = window.open(url, 'uberpop_'+event, 'width=760,height=442,resizable=1,scrollbars=0,menubar=0,toolbar=0,location=0,status=0');
    popupWin.focus();
}

function livereviewpop(rgroup) {
    popupWin = window.open('/pages/video_player/popup_special.php?rgroup=' + rgroup, 'livereviewpop', 'width=867,height=840,resizable=0,scrollbars=1');
    setTimeout("checkWindow(popupWin)", 50);
    popupWin.focus();
}

function prefspop(tab,dw_enable,section,subsec,usecount,count) {
    var pop_url = '/pages/preferences/' + tab + '.php';
    if (dw_enable){
        var dw_tag = "?tag=" + section + ";" + subsec;
        dw_tag = usecount ? dw_tag + ";" + count : dw_tag;
        pop_url = pop_url + dw_tag;
    }
    popupWin=window.open(pop_url,'prefspop','width=778,height=480,scrollbars=1,menubar=0,toolbar=0,location=0,status=0,resizable=1');
    popupWin.focus();
}

function pmpop(tab,user,dw_enable,section,subsec,usecount,count) {
    var pop_url = '/pages/pm/' + tab + '.php?to=' + user;
    if (dw_enable){
        var dw_tag = "&tag=" + section + ";" + subsec;
        dw_tag = usecount ? dw_tag + ";" + count : dw_tag;
        pop_url = pop_url + dw_tag;
    }
    popupWin = window.open(pop_url,'pmpop','width=778,height=480,scrollbars=1,menubar=0,toolbar=0,location=0,status=0,resizable=1');
    popupWin.focus();
}

function emblempop(id) {
    popupWin = window.open('/pages/profile/show_emblem.php?id=' + id,'emblempop','width=330,height=360,scrollbars=auto,menubar=0,toolbar=0,location=0,status=0,resizable=1');
    popupWin.focus();
}

function readMePop(id) {
    popupWin = window.open('/pages/gamespace/readme.php?sid='+id,'readmepop','width=600,height=500,scrollbars=1,menubar=0,toolbar=0,location=0,status=0,resizable=1');
    popupWin.focus();
}

function dnapop(uri) {
    if (uri) {
        popupWin = window.open('/pages/dna/popup.php?file_uri=' + escape(uri),'dnapop','width=450,height=550,scrollbars=0,menubar=0,toolbar=0,location=0,status=0,resizable=0');
    } else {
        popupWin = window.open('/pages/dna/popup.php','dnapop','width=450,height=550,scrollbars=0,menubar=0,toolbar=0,location=0,status=0,resizable=0');
    }
    setTimeout("checkWindow(popupWin)", 50);
    popupWin.focus();
}

function open_image_viewer(pid,img,sid,path,caption,numimg,rgroup,dw_enable,section,subsec,usecount,count,mb) {
    rgroup = rgroup ? '&rgroup=' + rgroup : '';
		sid = sid ? '&sid=' + sid : '';
    var page = '/pages/image_viewer/frame_lead.php?pid=' + pid + '&img=' + img + sid + rgroup;
    if(path) {
        page += '&path=' + path;
    }
    if(caption) {
        page += '&caption=' + caption;
    }
    if(numimg) {
        page += '&numimg=' + numimg;
    }
    if (dw_enable){
        var dw_tag = "&tag=" + section + ";" + subsec;
        dw_tag = usecount ? dw_tag + ";" + count : dw_tag;
        page = page + dw_tag;
    }
	if (mb) {
		page += '&mb=' + mb;
	}

    x = window.open(page, '_blank', 'location=0,menubar=0,statusbar=0,toolbar=0,resizable=1,scrollbars=0,width=840,height=725,left=0,top=0');
    setTimeout("checkWindow(x)", 50);
}

function open_blog_image_viewer(path,rgroup,caption) {
    rgroup = rgroup ? '&rgroup=' + rgroup : '';
    var page = '/pages/image_viewer/frame_lead.php?blog=1&img=1' + rgroup;
    if(path) {
        page += '&path=' + path;
    }
    if(caption) {
        page += '&caption=' + caption;
    }
    x = window.open(page, '_blank', 'location=0,menubar=0,statusbar=0,toolbar=0,resizable=1,scrollbars=0,width=800,height=600,left=0,top=0');
}


function open_image_viewer_for_feature(pid,img,sid,path,caption,single,ont_override) {
    var page = '/pages/image_viewer/frame_lead.php?pid=' + pid + '&img=' + img + '&sid=' + sid + "&feature=1";
    if(path) {
        page += '&path=' + path;
    }
    if(caption) {
        page += '&caption=' + caption;
    }

    if (ont_override) {
      page += '&ontology=' + ont_override;
    }

    x = window.open(page, '_blank', 'location=0,menubar=0,statusbar=0,toolbar=0,resizable=1,scrollbars=0,width=800,height=600,left=0,top=0');
    setTimeout("checkWindow(x)", 50);
}

function open_image_viewer_for_path_gallery(img,numimg,path,caption) {
    var page = '/pages/image_viewer/frame_lead.php?img=' + img + '&numimg=' + numimg + '&path=' + path;
    if(caption) {
        page += '&caption=' + caption;
    }

    x = window.open(page, '_blank', 'location=0,menubar=0,statusbar=0,toolbar=0,resizable=1,scrollbars=0,width=800,height=600,left=0,top=0');
    setTimeout("checkWindow(x)", 50);
}

function genpop(url,name,width,height,resize,scroll) {
    popupWin = window.open(url, name,'width='+width+',height='+height+',resizable='+resize+',scrollbars='+scroll+',location=0,menubar=0,statusbar=0,toolbar=0,left=0,top=0');
    setTimeout("checkWindow(popupWin)", 50);
}


function e3prefcon(vendor) {
    var path = '/misc/e3confpopup/index.php?vendor=' + vendor;
    popupWin = window.open(path, 'e3confpopup', 'width=447,height=511,resizable=0,scrollbars=0,location=0,menubar=0,statusbar=0,toolbar=0');
    setTimeout("checkWindow(popupWin)", 50);
}

function resize_forum_images() {
    divs = document.getElementsByTagName("div");
    for (i=0; i < divs.length; i++) {
        if (divs[i].className == 'message') {
            child = divs[i].childNodes;
            for (j=0; j < child.length; j++) {
                if (child[j].nodeName.toLowerCase() == 'img' && child[j].width > 600) {
                    child[j].width = 600;
                }
            }
        }
    }
}

function loadDateOfBirth(mode) {    
    var day = document.getElementById("dayOfBirth");
    var month = document.getElementById("monthOfBirth");
    var year = document.getElementById("yearOfBirth");
    var dateOfBirth = document.getElementById("dateOfBirth");    
    
    // Get Current Year
    var time = new Date();
    var currYear = time.getFullYear();
    var thisYear = time.getFullYear();
    
    
    var daysInMonth=0;
    var totalMonths=12;
    var totalYears=110;
    
    // Prepare Year Dropdown
    year.options.length=totalYears+1;
    year.options[0].value=-1;
    year.options[0].text="Year";
    for (var i=1; i<=totalYears; i++,thisYear--) {
        year.options[i].value=thisYear;
        year.options[i].text=thisYear;
    }
    
    // Prepare Month Dropdown
    month.options.length=13;
    month.options[0].value=-1;
    month.options[0].text="Month";
    month.options[1].value=1;
    month.options[1].text="January";
    month.options[2].value=2;
    month.options[2].text="February";
    month.options[3].value=3;
    month.options[3].text="March";
    month.options[4].value=4;
    month.options[4].text="April";
    month.options[5].value=5;
    month.options[5].text="May";
    month.options[6].value=6;
    month.options[6].text="June";
    month.options[7].value=7;
    month.options[7].text="July";
    month.options[8].value=8;
    month.options[8].text="August";
    month.options[9].value=9;
    month.options[9].text="September";
    month.options[10].value=10;
    month.options[10].text="October";
    month.options[11].value=11;
    month.options[11].text="November";
    month.options[12].value=12;
    month.options[12].text="December";
    
    var od = 0;
    var om = 0;
    var oy = 0;
    if (mode == 1 && dateOfBirth) {
        // We need to parse dateOfBirth and reset value for
        // day, month, year select list
        var dob = dateOfBirth.value;
        var dobLen = dob.length;
        if (dobLen>0) {
            var dateOfBirthArr=dob.split("/");  
            om=dateOfBirthArr[0];
            od=dateOfBirthArr[1];
            oy=dateOfBirthArr[2];          
            oy = (currYear - oy) + 1;           
            month.options.selectedIndex=om;
            year.options.selectedIndex=oy;          
        }
    }
        
    var monthValue = month.value;
    if (year.value > 0 && monthValue > 0) {
        if (monthValue==2) {
            if (year.value % 4 != 0) {
                daysInMonth=28;
            } else if  (year.value % 400 == 0) {
                daysInMonth=29;
            } else if (year.value % 100 == 0) {
                daysInMonth=28;
            } else {
                daysInMonth=29;
            }        
        } else if (monthValue==1 || monthValue==3 || monthValue==5 || 
                   monthValue==7 || monthValue==8 || monthValue==10 || monthValue==12) {
            daysInMonth=31;
        } else {
            daysInMonth=30;
        }
    }                
    day.options.length=daysInMonth+1;
    day.options[0].value=-1;
    day.options[0].text="Day";
    for (var i=1; i<=daysInMonth; i++) {
        day.options[i].value=i;
        day.options[i].text=i;
    }    
    
    if (mode == 1 && od > 0) {
        day.options.selectedIndex=od;
    }
    
    // Prepare dateOfBirth
    if (year.value > 0 || month.value > 0 || day.value > 0) {        
        dateOfBirth.value = month.value + "/" + day.value + "/" + year.value;        
    } else {
        dateOfBirth.value="";
    }
}
//Begin Iframe Auto Resize

var iframeids=["most_popular"]
var getFFVersion=navigator.userAgent.substring(navigator.userAgent.indexOf("Firefox")).split("/")[1]
var FFextraHeight=getFFVersion>=0.1? 16 : 0 //extra height in px to add to iframe in FireFox 1.0+ browsers

function dyniframesize() {
    var dyniframe=new Array()
    for (i=0; i<iframeids.length; i++) {
        if (document.getElementById) { //begin resizing iframe procedure
            dyniframe[dyniframe.length] = document.getElementById(iframeids[i]);
            if (dyniframe[i] && !window.opera) {
                dyniframe[i].style.display="block"
                if (dyniframe[i].contentDocument && dyniframe[i].contentDocument.body.offsetHeight) //ns6 syntax
                    dyniframe[i].height = dyniframe[i].contentDocument.body.offsetHeight+FFextraHeight;
                else if (dyniframe[i].Document && dyniframe[i].Document.body.scrollHeight) //ie5+ syntax
                dyniframe[i].height = dyniframe[i].Document.body.scrollHeight;
            }
        }
    }
}

//window.addEvent("load", dyniframesize);

// community piechart flipper

function show_piechart(x) {
    var a = new Array('score', 'diff', 'time');

    for (i=0; i < a.length; i++) {
        if (a[i] == x) {
            document.getElementById('piechart_' + a[i]).style.display='';
            document.getElementById('piechart_span_' + a[i]).className='on';
        }
        else {
            document.getElementById('piechart_' + a[i]).style.display='none';
            document.getElementById('piechart_span_' + a[i]).className='';
        }
    }
}


// use: <img onerror="hide_broken_img(this)" src="http://broken.com/image.gif" />
function hide_broken_img(img) {
    img.src='http://img.gamespot.com/gamespot/shared/forum/user_icons/GameSpot/gamespot.gif';
}

function hide_broken_union_img(img) {
    img.src='http://img.gamespot.com/gamespot/shared/unions/union_icon.gif';
}

function embed(tag){
    // msoft activex controls no longer start up 'activated' after april 11/06 (require focus to activate)
    // workaround requires object/embed tags to be included in external js
    // hence this func... sb
    // note: if 'allow script debugging' is *not* checked in ie settings, you will still get the activiation prompt!
    document.write(tag);
}

//To create dropdowns that automatically go to a url.
//Usage: <select name="NewsMenu" onChange="JumpMenu('self',this,1)"><option value="/index.html">Homepage</option></select>

function JumpMenu(targ,selObj,restore) {
    if(!selObj.options[selObj.selectedIndex].value) {
        return false;
    }
    eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
}

function checkWindow(windowToCheck) {
    if (!windowToCheck) {
        // Check for cookie indicating the popup warning has been seen the
        // maximum number of times. If so, then don't display the warning.
        var popupWarnings = getCookie("popupwarning");
        var maxPopupWarnings = 1;

        if (popupWarnings < maxPopupWarnings) {
            var popup = document.getElementById("popup_warning");
            popup.style.display = "block";
            centerPopup(popup);
            setCookie("popupwarning", ++popupWarnings, getExpDate(1, 0, 0), "/");
        }
    }
}

function centerPopup(popup) {
    var iWidth = (window.innerWidth) ? window.innerWidth : document.body.offsetWidth;
    var iHeight = screen.height;
    popup.style.left = Math.round((iWidth / 2) - (popup.offsetWidth / 2)) + "px";
    popup.style.top = Math.round((iHeight / 4) - (popup.offsetHeight / 2)) + "px";
}

window.onresize = recenterPopup;

function recenterPopup() {
    var popup = document.getElementById("popup_warning");
    if( popup ) {
        if (popup.style.display == 'block') {
            centerPopup(popup);
        }
    }
}

function hidePopupWarning() {
  document.getElementById("popup_warning").style.visibility = "hidden";
}

//get the number of chatters from the main chat server and write it to a div
function get_chatters(div_id) {
    // Check chatters via AJAX call
    var check_rand = Math.floor ( Math.random ( ) * 10000 + 1 );
    var url = '/pages/chat/chatcount.php?rand='+check_rand;
    new Ajax(url, {method: 'get', update: div_id}).request();
}

// use: <a href="#" id="link_id" class="class1" onclick="classChanger('link_id','class1','class2');return false;">
function classChanger(el_id,el_class,el_class_toggle) {
    var el = document.getElementById(el_id);
    if (el.className == el_class) {
        el.className = el_class_toggle;
    } else {
        el.className = el_class;
    }

}

// use to change input values
function shareSize(bbcode, html, size_link) {
    document.getElementById('bbcode_input').value = bbcode;
    document.getElementById('html_input').value = html;

    for(i=1;i<=5;i++) {
        document.getElementById('size_link_'+i).className = '';
    }

    document.getElementById('size_link_'+size_link).className = 'on';
}

// effect hide headbands on close
function hidebonusnav(a){
    new Fx.Style('bonusnav','height', {duration:750}).start(60,0);
    Cookie.set("hidebonusnav", "1", {path: "/", duration: 1});
}


function addHideBonusNavEvent(){
	if(!$('closebonusnav'))return;
	$('closebonusnav').addEvent('click',function(evt){
		(new Event(evt)).stop();
		hidebonusnav(this);
	});
}

register_onload(addHideBonusNavEvent);


// generic function to toggle between tab sections
// use: see templates/modules/recent_updates/body.tpl
// author: mike horn
// modified by: regina luk
function toggleTab(module,section) {

    // get all ULs in module
    var uls = document.getElementById(module).getElementsByTagName('ul');

    // find the tabs
    var tabs = new Array();
    for (i=0;i<uls.length;i++)
    if (uls[i].className == 'tabs') tabs = uls[i].getElementsByTagName('li');

    // get all DIVs in module
    var divs = document.getElementById(module).getElementsByTagName('div');

    // get sections
    var sections = new Array();
    for (i=0;i<divs.length;i++)
        if (divs[i].className.indexOf('section') >= 0) sections[sections.length++] = divs[i];

    // check if tab # is equal to section #
    if (tabs.length != sections.length) {
        alert('warning: your number of tabs ('+tabs.length+') differs from your number of sections ('+sections.length+')');
        return;
    }

    // turn on selected tab
    section--;
    for (i=0;i<tabs.length;i++) {
        if (i == section) {
            if ((tabs[i].className != '') && (tabs[i].className.indexOf(' on') < 0)) tabs[i].className = tabs[i].className + ' on'
            else if(tabs[i].className == '') tabs[i].className = 'on'
        } else {
            if (tabs[i].className.indexOf(' on') > 0) tabs[i].className = tabs[i].className.slice(0,tabs[i].className.indexOf(' on'));
            else if(tabs[i].className.indexOf('on') >= 0) tabs[i].className = '';
        }
    }

    // turn on selected content
    for (i=0;i<sections.length;i++) {
        if (i == section) sections[i].style.display = '';
        else sections[i].style.display = 'none';
    }
}


function linksInit() {
    var re = /\/video\/\d+\/\d+/;
    $$('a').each(function(a){

        if (re.test(a.getProperty('href'))) {
            a.addEvent('click', function(evt) {
                (new Event(evt)).stop();
                var width = getWidth() >= 1000 ? getWidth() : (screen.width >= 1000 ? 1000 : screen.width);
                popupWin = window.open(this.getProperty('href'), 'videoplayerpop', 'resizable=1,scrollbars=1,toolbar=1,location=1,menubar=1,width='+width);
                setTimeout("checkWindow(popupWin)", 50);
                if ( popupWin ) popupWin.focus();
            });
        }

        if (!a.getProperty('href') || !a.getProperty('rel')) return;

        switch (a.getProperty('rel')) {
            case 'external':
                a.addEvent('click', function (evt) {
                    (new Event(evt)).stop();
                    var newwin = window.open(this.getProperty('href'));
                });
                break;
            case '_blank':
                a.addEvent('click', function (evt) {
                    (new Event(evt)).stop();
                    if (window.opener && !window.opener.closed) {
                        var width = window.opener.getWidth();
                        var height = window.opener.getHeight();
                    } else {
                        var width = 800;
                        var height = 600;
                    }
                    var ts = +new Date()+'_'+i;
                    var newwin = window.open(this.getProperty('href'),'_blank_'+ts,'width='+width+',height='+height+',location=yes,resizable=yes,toolbar=yes,scrollbars=yes,menubar=yes,directories=yes')
                });
                break;
            case 'opener':
                a.addEvent('click', function (evt) {
                    (new Event(evt)).stop();
                    if (window.opener && !window.opener.closed) {
                        window.opener.location = this.getProperty('href');
                        window.opener.focus();
                    } else {
                        var ts = +new Date()+'_'+i;
                        var newwin = window.open(this.getProperty('href'),'_blank_'+ts,'width=800,height=600,location=yes,resizable=yes,toolbar=yes,scrollbars=yes,menubar=yes,directories=yes')
                        newwin.focus();
                    }
                });
                break;
			case 'openchart':
				a.addEvent('click', function (evt) {
					(new Event(evt)).stop();
					var newwin = window.open(this.getProperty('href'),'compchartpop','width=726,height=805,location=no,resizable=no,toolbar=no,scrollbars=yes,menubar=no,directories=no');
				});
                break;
        }

    });
}
register_onload(linksInit);


var search_term;
var search_type;
var search_sort;
var search_track;
function search_query(term, type, offset, sort, track) {

    // Change tab class
    $('search_tab_game').className = "off";
    $('search_tab_story').className = "off";
    $('search_tab_preview').className = "off";
    $('search_tab_image').className = "off";
    $('search_tab_movie').className = "off";
    $('search_tab_guide').className = "off";
    $('search_tab_download').className = "off";
    $('search_tab_cheat').className = "off";

    if (type == 'user_video') {
        $('search_tab_movie').className = "on";
    } else if (type == 'user_image') {
        $('search_tab_image').className = "on";
    } else {
        $('search_tab_' + type).className = "on";
    }

    if (!offset) {
        offset = 0;
    } else {
        window.scrollTo(0,0);
    }

    if (!sort) {
        sort = 'rank';
    }

    search_term = term.replace(/(\u003c|\u003e|\x3c|\x3e)/gi, '');
    search_type = type;
    search_sort = sort;
    search_track = track;

    $('search_status').innerHTML = "<h2 class=\"f21 pt10 pl5 pb5\">Searching ...</h2>";
    if ( $('tags_only') ) {
    	var tags_only = $('tags_only').checked;
    }
    else {
    	var tags_only = false;
    }
    var url = '/pages/search/solr_search_ajax.php?q=' + escape(term) + '&type=' + type + '&offset=' + offset + '&tags_only=' + tags_only + '&sort=' + sort;

    new Ajax(url, {method: 'get', update: 'search_results', onComplete: search_query_complete}).request();
}


function search_query_complete() {
    $('search_status').innerHTML = "<h2 class=\"f21 pt10 pl5 pb5\">Search results for '" + search_term + "'</h2>";

    if (search_sort == 'date') {
        $('sort_rank').style.display = 'none';
        $('sort_date').style.display = 'block';
        if (search_type == 'game') $('sort_score').style.display = 'none';
    } else if (search_sort == 'score') {
        $('sort_rank').style.display = 'none';
        $('sort_date').style.display = 'none';
        if (search_type == 'game') $('sort_score').style.display = 'block';
    } else {
        $('sort_rank').style.display = 'block';
        $('sort_date').style.display = 'none';
        if (search_type == 'game') $('sort_score').style.display = 'none';
    }

    // Create DW request
    if (search_track) {
        DW.pageParams.cval = "filter;"+search_type;
        DW.pageParams.siteid = 6;
        //DW.pageParams.srch = search_term;
        //DW.clearCalled = false;
        //DW.clear();
        DW.redir();
    }

}


// use: to replace foldToggle
var mooTogglers = new Array();

function mooToggle(id) {
    if ( !id || !$(id) ) {
        return;
    }
    $(id).className = 'show_toggle';
    if (!mooTogglers[id]) {
        mooTogglers[id] = new Fx.Slide(id, {duration: 500});
    }
    mooTogglers[id].toggle();
}

function togglersInit() {
    // hide some toggles
    // if the hidden div has the class "hidden_toggle" this will go through the page and hide them
    // that way if the user doesn't have JS they will still see it.
    $$('.hidden_toggle').each(function(togglee){
        var id = togglee.getProperty('id');
        if (!mooTogglers[id]) {
            mooTogglers[id] = new Fx.Slide(id, {duration: 500});
        }
        mooTogglers[id].hide();
    });

    // init togglers
    // the proper use should be:
    // <a href="#div-id" rel="toggle">link</a>
    $$('a').each(function(a){
        if (a.getProperty('rel') == 'toggle') {
            a.addEvent('click', function(evt) {
                (new Event(evt)).stop();
                var url = this.getProperty('href').split('#');
                mooToggle(url[url.length-1]);
            });
        }
    });
}

register_onload(togglersInit);

// E3 '07 Promotion: any link that has tr=e3 in it's url will pop up an e3 matrix
if (window.location.href.indexOf('tr=e3') != -1) {
	var chart = window.open("/templates/special_events/modules/e3_matrix.html", 'chart', 'width=487,height=606,scrollbars=0,menubar=0,toolbar=0,location=0,status=0,resizable=0');
	chart.focus();
}

// Just for fun

var k_code = ['up','up','down','down','left','right','left','right','b','a','enter'];
var k_place = 0;
document.addEvent('keydown', function(event) {
	var event = new Event(event);
	if (event.key == k_code[k_place]) {
		k_place++;
		if (k_place == k_code.length) window.location.href = '/nes/action/contra/hints.html';
	} else {
		k_place = 0;
	}
});