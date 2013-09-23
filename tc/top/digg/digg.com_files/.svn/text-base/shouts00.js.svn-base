function sendShout(data,callback,error){$j.ajax({type:"POST",url:"/ajax/shouts/post",dataType:"json",data:data,success:function(json){if(typeof (callback)=="function"){return callback(json)
}analyticsEvent("event16","shout")},error:function(xml){var json=eval("("+xml.responseText+")");if(typeof (error)=="function"){return error(json)
}else{alert(json.error)}}});return false}function remShout(data,callback){$j.ajax({type:"POST",url:"/ajax/shouts/remove",dataType:"json",data:data,success:function(json){if(typeof (callback)=="function"){return callback(json)
}analyticsEvent("event12","remove shout")},error:function(xml){var json=eval("("+xml.responseText+")");
alert(json.error)}})};Sharebox=new NSObject();Sharebox.namespace(["shouts","email","blog"]);Object.extend(Sharebox,{tab:function(A){$("lightbox-blog-it-tab").removeClassName("active");
$("lightbox-email-it-tab").removeClassName("active");$("lightbox-shout-it-tab").removeClassName("active");
$("lightbox-"+A+"-tab").addClassName("active");$("lightbox-blog-it").hide();$("lightbox-email-it").hide();
$("lightbox-shout-it").hide();$("lightbox-"+A).show()}});Object.extend(Sharebox.shouts,{select:function(A){if($("friend"+A).hasClassName("selected")){$("friend"+A).removeClassName("selected")
}else{$("friend"+A).addClassName("selected")}},toggleAll:function(){var B="addClassName",A=$$("#lightbox-shout-friends a");
if(A.all(function(C){if(C.hasClassName("selected")){return true}return false})){B="removeClassName"}A.each(function(C){C[B].apply(C,["selected"])
});$("lightbox-shout-filter").focus()},send:function(D){var E=[],B=$j("#lightbox-shout-friends a.selected");
if(B.size()<1){alert("Please select one or more friends to send this shout to");return false}$j("#sendShout").val("Shouting!").attr("disabled","disabled");
var A="",C="";if($("lightbox-shout-captcha-text")){A=$j("#lightbox-shout-captcha-text").val();C=$j("#md5").val()
}B.each(function(){E.push($j(this).text()!=""?$j(this).text():",")});sendShout({token:tokens.shouts.post,to:E.join(","),shout:$j("#lightbox-shout-text").val(),activity:9,activityid:D,captcha:A,md5:C},function(G){$j("#lightbox-share-notice").html('<div class="confirm"><div><h3>Success!</h3>Your shout was successfully sent</div></div>');
$j("#lightbox-share-notice").show();$j("#lightbox-share-notice").fadeTo(3000,1,function(){$j("#lightbox-share-notice").fadeOut(3000)
});$j("#lightbox-shout-filter").val("");$j("#lightbox-shout-text").val("");$j("#sendShout").removeAttr("disabled").val("Shout It!");
if(ups){ups.prefix="";ups.search()}var F=$$("#lightbox-shout-friends a");F.each(function(H){H.removeClassName.apply(H,["selected"])
});$("lightbox-shout-filter").focus()},function(F){$j("#lightbox-share-notice").html('<div class="warning"><div><h3>ERROR!</h3>'+F.error+"</div></div>");
$j("#lightbox-share-notice").show();$j("#lightbox-share-notice").fadeTo(3000,1,function(){$j("#lightbox-share-notice").fadeOut(3000)
})})}});UserPrefixSearch=Class.create();UserPrefixSearch.prototype={initialize:function(C,A,B){this.jfield=$j("#"+C);
this.field=$(C);this.url=A;this.limit=500;this.callback=B.success||function(){};this.errorFunc=B.error||function(){};
this.change=false;this.updater=false;this.prefix="";this.oldValue=false;if($j.browser.safari&&Number($j.browser.version)<500){this.limit=30
}this.getMutualFriendCount(function(D){Event.observe(this.field,"keyup",function(F){clearTimeout(this.change);
this.prefix=this.field.value;if(D<this.limit||this.prefix.length>0){var E=this.prefix.length>0?500:1000;
if(this.prefix!=this.oldValue){this.change=setTimeout(this.search.bind(this),E)}}else{if(D>this.limit&&this.prefix.length==0){this.errorFunc.apply(this,[{title:"Crikey!",message:"You have lots of friends! Type below to filter them down a bit."}]);
if(this.prefix!=this.oldValue){this.change=setTimeout(this.search.bind(this),E)}}else{this.errorFunc.apply(this,[{message:"We didn't really like your input. Please try again."}])
}}this.oldValue=this.prefix}.bind(this));if(D>this.limit){this.errorFunc.apply(this,[{title:"Crikey!",message:"You have lots of friends! Type below to filter them down a bit."}])
}this.search()})},search:function(){$j.ajax({url:"/ajax/usersearch/mutual.html",type:"POST",data:{prefix:this.prefix,token:tokens.usersearch.mutual},success:function(A){A.length>0?this.callback.apply(this,[A]):this.errorFunc.apply(this,[{title:"Darn!",message:"Your filter had no results. Try being less specific."}])
}.bind(this),error:function(A){this.errorFunc.apply(this,[{title:"Whoops!",message:"We couldn't fetch your friends. Please reopen this window."}])
}.bind(this)})},getMutualFriendCount:function(A){A=A||false;$j.ajax({url:"/ajax/usersearch/mutualCount",type:"POST",dataType:"json",data:{token:tokens.usersearch.mutualCount},success:function(B){return A?A.apply(this,[B.mutualFriendCount]):B.mutualFriendCount
}.bind(this),error:function(B){this.errorFunc.apply(this,[{message:"A pretty bad error occurred. Please reload and try again."}])
}.bind(this)})}};Object.extend(Sharebox.email,{add:function(){var C=$j(".lightbox-email-wrapper");var B=C.length+1;
var A=$j(".lightbox-email-wrapper:last");if(B<7){A.after('<div class="lightbox-email-wrapper" style="margin-right: 200px; clear: left;"><input style="width: 200px; margin-bottom: 3px;" class="lightbox-email" type="text" name="email'+B+'" id="email'+B+'" value="" /></div>')
}if(B==6){$j(".lightbox-add").hide()}},viewMessage:function(){$("lightbox-message-text-toggle").hide();
$("lightbox-message-text").show()},updateAppLink:function(){var B="";$$(".lightbox-email").each(function(C){B+=C.value!=""?C.value+",":""
});B=B.replace(/,$/,"");var A=$("lightbox-email-app");A.href=A.href.replace(/mailto:[^\?]*\?/,"mailto:"+B+"?")
}});