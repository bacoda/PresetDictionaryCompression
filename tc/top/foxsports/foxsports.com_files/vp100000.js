/** VIDEO **/
function msnvDwd(pid,guid,mkt,pl,t,idp,fg)
//function msn4dw(mkt, brand, vid, from, playlist, editor)
{

	var obj = window.event ? window.event.srcElement : null;

    var rf = document.URL;
    var fg = window.location.pathname;
    var from = '';
    var target = '';

    if((null != obj) &&
       (null != obj.target) &&
       (obj.target.length > 0))
    {
        target = obj.target;
        target = target.replace(/^\s*/, '').replace(/\s*$/, '');
    }


	if(!guid) {guid='';}
	if(target == '') {target = '_msn4v'}

    var href = "http://video.msn.com/video.aspx?" + "mkt=en-us&brand=foxsports&vid=" + guid + "&playlist=&editor=&from=FOXSPORTS&fg=" + fg + "&rf=" + rf;
    if (navigator.userAgent.indexOf('MSIE') != -1)
    {
        window.open(href, target, "height=750,width=1020,status=no,toolbar=no,menubar=no,location=no,resizable=yes,scrollbars=yes");
    }
    else
    {
        window.open(href, target, "height=750,width=1020,status=no,toolbar=no,menubar=no,location=yes,resizable=yes,scrollbars=yes");
    }
    if(null != obj)
    {
        obj.returnValue = false;
        obj.cancelBubble=true;
    }
}
