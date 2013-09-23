var Prototype={Version:"1.5.1.1",Browser:{IE:!!(window.attachEvent&&!window.opera),Opera:!!window.opera,WebKit:navigator.userAgent.indexOf("AppleWebKit/")>-1,Gecko:navigator.userAgent.indexOf("Gecko")>-1&&navigator.userAgent.indexOf("KHTML")==-1},BrowserFeatures:{XPath:!!document.evaluate,ElementExtensions:!!window.HTMLElement,SpecificElementExtensions:(document.createElement("div").__proto__!==document.createElement("form").__proto__)},ScriptFragment:"<script[^>]*>([\\S\\s]*?)<\/script>",JSONFilter:/^\/\*-secure-([\s\S]*)\*\/\s*$/,emptyFunction:function(){},K:function(A){return A
}};var Class={create:function(){return function(){this.initialize.apply(this,arguments)}}};var Abstract=new Object();
Object.extend=function(A,C){for(var B in C){A[B]=C[B]}return A};Object.extend(Object,{inspect:function(A){try{if(A===undefined){return"undefined"
}if(A===null){return"null"}return A.inspect?A.inspect():A.toString()}catch(B){if(B instanceof RangeError){return"..."
}throw B}},toJSON:function(A){var C=typeof A;switch(C){case"undefined":case"function":case"unknown":return ;
case"boolean":return A.toString()}if(A===null){return"null"}if(A.toJSON){return A.toJSON()}if(A.ownerDocument===document){return 
}var B=[];for(var E in A){var D=Object.toJSON(A[E]);if(D!==undefined){B.push(E.toJSON()+": "+D)}}return"{"+B.join(", ")+"}"
},keys:function(A){var B=[];for(var C in A){B.push(C)}return B},values:function(B){var A=[];for(var C in B){A.push(B[C])
}return A},clone:function(A){return Object.extend({},A)}});Function.prototype.bind=function(){var A=this,C=$A(arguments),B=C.shift();
return function(){return A.apply(B,C.concat($A(arguments)))}};Function.prototype.bindAsEventListener=function(C){var A=this,B=$A(arguments),C=B.shift();
return function(D){return A.apply(C,[D||window.event].concat(B))}};Object.extend(Number.prototype,{toColorPart:function(){return this.toPaddedString(2,16)
},succ:function(){return this+1},times:function(A){$R(0,this,true).each(A);return this},toPaddedString:function(C,B){var A=this.toString(B||10);
return"0".times(C-A.length)+A},toJSON:function(){return isFinite(this)?this.toString():"null"}});Date.prototype.toJSON=function(){return'"'+this.getFullYear()+"-"+(this.getMonth()+1).toPaddedString(2)+"-"+this.getDate().toPaddedString(2)+"T"+this.getHours().toPaddedString(2)+":"+this.getMinutes().toPaddedString(2)+":"+this.getSeconds().toPaddedString(2)+'"'
};var Try={these:function(){var C;for(var B=0,D=arguments.length;B<D;B++){var A=arguments[B];try{C=A();
break}catch(E){}}return C}};var PeriodicalExecuter=Class.create();PeriodicalExecuter.prototype={initialize:function(B,A){this.callback=B;
this.frequency=A;this.currentlyExecuting=false;this.registerCallback()},registerCallback:function(){this.timer=setInterval(this.onTimerEvent.bind(this),this.frequency*1000)
},stop:function(){if(!this.timer){return }clearInterval(this.timer);this.timer=null},onTimerEvent:function(){if(!this.currentlyExecuting){try{this.currentlyExecuting=true;
this.callback(this)}finally{this.currentlyExecuting=false}}}};Object.extend(String,{interpret:function(A){return A==null?"":String(A)
},specialChar:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r","\\":"\\\\"}});Object.extend(String.prototype,{gsub:function(E,C){var A="",D=this,B;
C=arguments.callee.prepareReplacement(C);while(D.length>0){if(B=D.match(E)){A+=D.slice(0,B.index);A+=String.interpret(C(B));
D=D.slice(B.index+B[0].length)}else{A+=D,D=""}}return A},sub:function(C,A,B){A=this.gsub.prepareReplacement(A);
B=B===undefined?1:B;return this.gsub(C,function(D){if(--B<0){return D[0]}return A(D)})},scan:function(B,A){this.gsub(B,A);
return this},truncate:function(B,A){B=B||30;A=A===undefined?"...":A;return this.length>B?this.slice(0,B-A.length)+A:this
},strip:function(){return this.replace(/^\s+/,"").replace(/\s+$/,"")},stripTags:function(){return this.replace(/<\/?[^>]+>/gi,"")
},stripScripts:function(){return this.replace(new RegExp(Prototype.ScriptFragment,"img"),"")},extractScripts:function(){var B=new RegExp(Prototype.ScriptFragment,"img");
var A=new RegExp(Prototype.ScriptFragment,"im");return(this.match(B)||[]).map(function(C){return(C.match(A)||["",""])[1]
})},evalScripts:function(){return this.extractScripts().map(function(script){return eval(script)})},escapeHTML:function(){var A=arguments.callee;
A.text.data=this;return A.div.innerHTML},unescapeHTML:function(){var A=document.createElement("div");
A.innerHTML=this.stripTags();return A.childNodes[0]?(A.childNodes.length>1?$A(A.childNodes).inject("",function(B,C){return B+C.nodeValue
}):A.childNodes[0].nodeValue):""},toQueryParams:function(B){var A=this.strip().match(/([^?#]*)(#.*)?$/);
if(!A){return{}}return A[1].split(B||"&").inject({},function(E,F){if((F=F.split("="))[0]){var C=decodeURIComponent(F.shift());
var D=F.length>1?F.join("="):F[0];if(D!=undefined){D=decodeURIComponent(D)}if(C in E){if(E[C].constructor!=Array){E[C]=[E[C]]
}E[C].push(D)}else{E[C]=D}}return E})},toArray:function(){return this.split("")},succ:function(){return this.slice(0,this.length-1)+String.fromCharCode(this.charCodeAt(this.length-1)+1)
},times:function(C){var A="";for(var B=0;B<C;B++){A+=this}return A},camelize:function(){var D=this.split("-"),A=D.length;
if(A==1){return D[0]}var C=this.charAt(0)=="-"?D[0].charAt(0).toUpperCase()+D[0].substring(1):D[0];for(var B=1;
B<A;B++){C+=D[B].charAt(0).toUpperCase()+D[B].substring(1)}return C},capitalize:function(){return this.charAt(0).toUpperCase()+this.substring(1).toLowerCase()
},underscore:function(){return this.gsub(/::/,"/").gsub(/([A-Z]+)([A-Z][a-z])/,"#{1}_#{2}").gsub(/([a-z\d])([A-Z])/,"#{1}_#{2}").gsub(/-/,"_").toLowerCase()
},dasherize:function(){return this.gsub(/_/,"-")},inspect:function(B){var A=this.gsub(/[\x00-\x1f\\]/,function(C){var D=String.specialChar[C[0]];
return D?D:"\\u00"+C[0].charCodeAt().toPaddedString(2,16)});if(B){return'"'+A.replace(/"/g,'\\"')+'"'
}return"'"+A.replace(/'/g,"\\'")+"'"},toJSON:function(){return this.inspect(true)},unfilterJSON:function(A){return this.sub(A||Prototype.JSONFilter,"#{1}")
},isJSON:function(){var A=this.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"/g,"");return(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(A)
},evalJSON:function(sanitize){var json=this.unfilterJSON();try{if(!sanitize||json.isJSON()){return eval("("+json+")")
}}catch(e){}throw new SyntaxError("Badly formed JSON string: "+this.inspect())},include:function(A){return this.indexOf(A)>-1
},startsWith:function(A){return this.indexOf(A)===0},endsWith:function(A){var B=this.length-A.length;
return B>=0&&this.lastIndexOf(A)===B},empty:function(){return this==""},blank:function(){return/^\s*$/.test(this)
}});if(Prototype.Browser.WebKit||Prototype.Browser.IE){Object.extend(String.prototype,{escapeHTML:function(){return this.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
},unescapeHTML:function(){return this.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">")
}})}String.prototype.gsub.prepareReplacement=function(B){if(typeof B=="function"){return B}var A=new Template(B);
return function(C){return A.evaluate(C)}};String.prototype.parseQuery=String.prototype.toQueryParams;
Object.extend(String.prototype.escapeHTML,{div:document.createElement("div"),text:document.createTextNode("")});
with(String.prototype.escapeHTML){div.appendChild(text)}var Template=Class.create();Template.Pattern=/(^|.|\r|\n)(#\{(.*?)\})/;
Template.prototype={initialize:function(A,B){this.template=A.toString();this.pattern=B||Template.Pattern
},evaluate:function(A){return this.template.gsub(this.pattern,function(B){var C=B[1];if(C=="\\"){return B[2]
}return C+String.interpret(A[B[3]])})}};var $break={},$continue=new Error('"throw $continue" is deprecated, use "return" instead');
var Enumerable={each:function(B){var A=0;try{this._each(function(D){B(D,A++)})}catch(C){if(C!=$break){throw C
}}return this},eachSlice:function(C,B){var A=-C,D=[],E=this.toArray();while((A+=C)<E.length){D.push(E.slice(A,A+C))
}return D.map(B)},all:function(B){var A=true;this.each(function(D,C){A=A&&!!(B||Prototype.K)(D,C);if(!A){throw $break
}});return A},any:function(B){var A=false;this.each(function(D,C){if(A=!!(B||Prototype.K)(D,C)){throw $break
}});return A},collect:function(B){var A=[];this.each(function(D,C){A.push((B||Prototype.K)(D,C))});return A
},detect:function(B){var A;this.each(function(D,C){if(B(D,C)){A=D;throw $break}});return A},findAll:function(B){var A=[];
this.each(function(D,C){if(B(D,C)){A.push(D)}});return A},grep:function(C,B){var A=[];this.each(function(F,E){var D=F.toString();
if(D.match(C)){A.push((B||Prototype.K)(F,E))}});return A},include:function(A){var B=false;this.each(function(C){if(C==A){B=true;
throw $break}});return B},inGroupsOf:function(B,A){A=A===undefined?null:A;return this.eachSlice(B,function(C){while(C.length<B){C.push(A)
}return C})},inject:function(A,B){this.each(function(D,C){A=B(A,D,C)});return A},invoke:function(B){var A=$A(arguments).slice(1);
return this.map(function(C){return C[B].apply(C,A)})},max:function(B){var A;this.each(function(D,C){D=(B||Prototype.K)(D,C);
if(A==undefined||D>=A){A=D}});return A},min:function(B){var A;this.each(function(D,C){D=(B||Prototype.K)(D,C);
if(A==undefined||D<A){A=D}});return A},partition:function(C){var B=[],A=[];this.each(function(E,D){((C||Prototype.K)(E,D)?B:A).push(E)
});return[B,A]},pluck:function(B){var A=[];this.each(function(D,C){A.push(D[B])});return A},reject:function(B){var A=[];
this.each(function(D,C){if(!B(D,C)){A.push(D)}});return A},sortBy:function(A){return this.map(function(C,B){return{value:C,criteria:A(C,B)}
}).sort(function(E,D){var C=E.criteria,B=D.criteria;return C<B?-1:C>B?1:0}).pluck("value")},toArray:function(){return this.map()
},zip:function(){var B=Prototype.K,A=$A(arguments);if(typeof A.last()=="function"){B=A.pop()}var C=[this].concat(A).map($A);
return this.map(function(E,D){return B(C.pluck(D))})},size:function(){return this.toArray().length},inspect:function(){return"#<Enumerable:"+this.toArray().inspect()+">"
}};Object.extend(Enumerable,{map:Enumerable.collect,find:Enumerable.detect,select:Enumerable.findAll,member:Enumerable.include,entries:Enumerable.toArray});
var $A=Array.from=function(D){if(!D){return[]}if(D.toArray){return D.toArray()}else{var B=[];for(var A=0,C=D.length;
A<C;A++){B.push(D[A])}return B}};if(Prototype.Browser.WebKit){$A=Array.from=function(D){if(!D){return[]
}if(!(typeof D=="function"&&D=="[object NodeList]")&&D.toArray){return D.toArray()}else{var B=[];for(var A=0,C=D.length;
A<C;A++){B.push(D[A])}return B}}}Object.extend(Array.prototype,Enumerable);if(!Array.prototype._reverse){Array.prototype._reverse=Array.prototype.reverse
}Object.extend(Array.prototype,{_each:function(B){for(var A=0,C=this.length;A<C;A++){B(this[A])}},clear:function(){this.length=0;
return this},first:function(){return this[0]},last:function(){return this[this.length-1]},compact:function(){return this.select(function(A){return A!=null
})},flatten:function(){return this.inject([],function(B,A){return B.concat(A&&A.constructor==Array?A.flatten():[A])
})},without:function(){var A=$A(arguments);return this.select(function(B){return !A.include(B)})},indexOf:function(A){for(var B=0,C=this.length;
B<C;B++){if(this[B]==A){return B}}return -1},reverse:function(A){return(A!==false?this:this.toArray())._reverse()
},reduce:function(){return this.length>1?this:this[0]},uniq:function(A){return this.inject([],function(D,C,B){if(0==B||(A?D.last()!=C:!D.include(C))){D.push(C)
}return D})},clone:function(){return[].concat(this)},size:function(){return this.length},inspect:function(){return"["+this.map(Object.inspect).join(", ")+"]"
},toJSON:function(){var A=[];this.each(function(B){var C=Object.toJSON(B);if(C!==undefined){A.push(C)
}});return"["+A.join(", ")+"]"}});Array.prototype.toArray=Array.prototype.clone;function $w(A){A=A.strip();
return A?A.split(/\s+/):[]}if(Prototype.Browser.Opera){Array.prototype.concat=function(){var E=[];for(var B=0,C=this.length;
B<C;B++){E.push(this[B])}for(var B=0,C=arguments.length;B<C;B++){if(arguments[B].constructor==Array){for(var A=0,D=arguments[B].length;
A<D;A++){E.push(arguments[B][A])}}else{E.push(arguments[B])}}return E}}var Hash=function(A){if(A instanceof Hash){this.merge(A)
}else{Object.extend(this,A||{})}};Object.extend(Hash,{toQueryString:function(B){var A=[];A.add=arguments.callee.addPair;
this.prototype._each.call(B,function(D){if(!D.key){return }var C=D.value;if(C&&typeof C=="object"){if(C.constructor==Array){C.each(function(E){A.add(D.key,E)
})}return }A.add(D.key,C)});return A.join("&")},toJSON:function(A){var B=[];this.prototype._each.call(A,function(D){var C=Object.toJSON(D.value);
if(C!==undefined){B.push(D.key.toJSON()+": "+C)}});return"{"+B.join(", ")+"}"}});Hash.toQueryString.addPair=function(A,C,B){A=encodeURIComponent(A);
if(C===undefined){this.push(A)}else{this.push(A+"="+(C==null?"":encodeURIComponent(C)))}};Object.extend(Hash.prototype,Enumerable);
Object.extend(Hash.prototype,{_each:function(B){for(var A in this){var C=this[A];if(C&&C==Hash.prototype[A]){continue
}var D=[A,C];D.key=A;D.value=C;B(D)}},keys:function(){return this.pluck("key")},values:function(){return this.pluck("value")
},merge:function(A){return $H(A).inject(this,function(B,C){B[C.key]=C.value;return B})},remove:function(){var A;
for(var B=0,C=arguments.length;B<C;B++){var D=this[arguments[B]];if(D!==undefined){if(A===undefined){A=D
}else{if(A.constructor!=Array){A=[A]}A.push(D)}}delete this[arguments[B]]}return A},toQueryString:function(){return Hash.toQueryString(this)
},inspect:function(){return"#<Hash:{"+this.map(function(A){return A.map(Object.inspect).join(": ")}).join(", ")+"}>"
},toJSON:function(){return Hash.toJSON(this)}});function $H(A){if(A instanceof Hash){return A}return new Hash(A)
}if(function(){var A=0,C=function(D){this.key=D};C.prototype.key="foo";for(var B in new C("bar")){A++
}return A>1}()){Hash.prototype._each=function(C){var A=[];for(var B in this){var D=this[B];if((D&&D==Hash.prototype[B])||A.include(B)){continue
}A.push(B);var E=[B,D];E.key=B;E.value=D;C(E)}}}ObjectRange=Class.create();Object.extend(ObjectRange.prototype,Enumerable);
Object.extend(ObjectRange.prototype,{initialize:function(C,A,B){this.start=C;this.end=A;this.exclusive=B
},_each:function(A){var B=this.start;while(this.include(B)){A(B);B=B.succ()}},include:function(A){if(A<this.start){return false
}if(this.exclusive){return A<this.end}return A<=this.end}});var $R=function(C,A,B){return new ObjectRange(C,A,B)
};var Ajax={getTransport:function(){return Try.these(function(){return new XMLHttpRequest()},function(){return new ActiveXObject("Msxml2.XMLHTTP")
},function(){return new ActiveXObject("Microsoft.XMLHTTP")})||false},activeRequestCount:0};Ajax.Responders={responders:[],_each:function(A){this.responders._each(A)
},register:function(A){if(!this.include(A)){this.responders.push(A)}},unregister:function(A){this.responders=this.responders.without(A)
},dispatch:function(D,B,C,A){this.each(function(E){if(typeof E[D]=="function"){try{E[D].apply(E,[B,C,A])
}catch(F){}}})}};Object.extend(Ajax.Responders,Enumerable);Ajax.Responders.register({onCreate:function(){Ajax.activeRequestCount++
},onComplete:function(){Ajax.activeRequestCount--}});Ajax.Base=function(){};Ajax.Base.prototype={setOptions:function(A){this.options={method:"post",asynchronous:true,contentType:"application/x-www-form-urlencoded",encoding:"UTF-8",parameters:""};
Object.extend(this.options,A||{});this.options.method=this.options.method.toLowerCase();if(typeof this.options.parameters=="string"){this.options.parameters=this.options.parameters.toQueryParams()
}}};Ajax.Request=Class.create();Ajax.Request.Events=["Uninitialized","Loading","Loaded","Interactive","Complete"];
Ajax.Request.prototype=Object.extend(new Ajax.Base(),{_complete:false,initialize:function(B,A){this.transport=Ajax.getTransport();
this.setOptions(A);this.request(B)},request:function(A){this.url=A;this.method=this.options.method;var C=Object.clone(this.options.parameters);
if(!["get","post"].include(this.method)){C._method=this.method;this.method="post"}this.parameters=C;if(C=Hash.toQueryString(C)){if(this.method=="get"){this.url+=(this.url.include("?")?"&":"?")+C
}else{if(/Konqueror|Safari|KHTML/.test(navigator.userAgent)){C+="&_="}}}try{if(this.options.onCreate){this.options.onCreate(this.transport)
}Ajax.Responders.dispatch("onCreate",this,this.transport);this.transport.open(this.method.toUpperCase(),this.url,this.options.asynchronous);
if(this.options.asynchronous){setTimeout(function(){this.respondToReadyState(1)}.bind(this),10)}this.transport.onreadystatechange=this.onStateChange.bind(this);
this.setRequestHeaders();this.body=this.method=="post"?(this.options.postBody||C):null;this.transport.send(this.body);
if(!this.options.asynchronous&&this.transport.overrideMimeType){this.onStateChange()}}catch(B){this.dispatchException(B)
}},onStateChange:function(){var A=this.transport.readyState;if(A>1&&!((A==4)&&this._complete)){this.respondToReadyState(this.transport.readyState)
}},setRequestHeaders:function(){var E={"X-Requested-With":"XMLHttpRequest","X-Prototype-Version":Prototype.Version,Accept:"text/javascript, text/html, application/xml, text/xml, */*"};
if(this.method=="post"){E["Content-type"]=this.options.contentType+(this.options.encoding?"; charset="+this.options.encoding:"");
if(this.transport.overrideMimeType&&(navigator.userAgent.match(/Gecko\/(\d{4})/)||[0,2005])[1]<2005){E.Connection="close"
}}if(typeof this.options.requestHeaders=="object"){var C=this.options.requestHeaders;if(typeof C.push=="function"){for(var B=0,D=C.length;
B<D;B+=2){E[C[B]]=C[B+1]}}else{$H(C).each(function(F){E[F.key]=F.value})}}for(var A in E){this.transport.setRequestHeader(A,E[A])
}},success:function(){return !this.transport.status||(this.transport.status>=200&&this.transport.status<300)
},respondToReadyState:function(A){var C=Ajax.Request.Events[A];var F=this.transport,B=this.evalJSON();
if(C=="Complete"){try{this._complete=true;(this.options["on"+this.transport.status]||this.options["on"+(this.success()?"Success":"Failure")]||Prototype.emptyFunction)(F,B)
}catch(D){this.dispatchException(D)}var E=this.getHeader("Content-type");if(E&&E.strip().match(/^(text|application)\/(x-)?(java|ecma)script(;.*)?$/i)){this.evalResponse()
}}try{(this.options["on"+C]||Prototype.emptyFunction)(F,B);Ajax.Responders.dispatch("on"+C,this,F,B)}catch(D){this.dispatchException(D)
}if(C=="Complete"){this.transport.onreadystatechange=Prototype.emptyFunction}},getHeader:function(A){try{return this.transport.getResponseHeader(A)
}catch(B){return null}},evalJSON:function(){try{var A=this.getHeader("X-JSON");return A?A.evalJSON():null
}catch(B){return null}},evalResponse:function(){try{return eval((this.transport.responseText||"").unfilterJSON())
}catch(e){this.dispatchException(e)}},dispatchException:function(A){(this.options.onException||Prototype.emptyFunction)(this,A);
Ajax.Responders.dispatch("onException",this,A)}});Ajax.Updater=Class.create();Object.extend(Object.extend(Ajax.Updater.prototype,Ajax.Request.prototype),{initialize:function(A,C,B){this.container={success:(A.success||A),failure:(A.failure||(A.success?null:A))};
this.transport=Ajax.getTransport();this.setOptions(B);var D=this.options.onComplete||Prototype.emptyFunction;
this.options.onComplete=(function(F,E){this.updateContent();D(F,E)}).bind(this);this.request(C)},updateContent:function(){var B=this.container[this.success()?"success":"failure"];
var A=this.transport.responseText;if(!this.options.evalScripts){A=A.stripScripts()}if(B=$(B)){if(this.options.insertion){new this.options.insertion(B,A)
}else{B.update(A)}}if(this.success()){if(this.onComplete){setTimeout(this.onComplete.bind(this),10)}}}});
Ajax.PeriodicalUpdater=Class.create();Ajax.PeriodicalUpdater.prototype=Object.extend(new Ajax.Base(),{initialize:function(A,C,B){this.setOptions(B);
this.onComplete=this.options.onComplete;this.frequency=(this.options.frequency||2);this.decay=(this.options.decay||1);
this.updater={};this.container=A;this.url=C;this.start()},start:function(){this.options.onComplete=this.updateComplete.bind(this);
this.onTimerEvent()},stop:function(){this.updater.options.onComplete=undefined;clearTimeout(this.timer);
(this.onComplete||Prototype.emptyFunction).apply(this,arguments)},updateComplete:function(A){if(this.options.decay){this.decay=(A.responseText==this.lastText?this.decay*this.options.decay:1);
this.lastText=A.responseText}this.timer=setTimeout(this.onTimerEvent.bind(this),this.decay*this.frequency*1000)
},onTimerEvent:function(){this.updater=new Ajax.Updater(this.container,this.url,this.options)}});function $(B){if(arguments.length>1){for(var A=0,D=[],C=arguments.length;
A<C;A++){D.push($(arguments[A]))}return D}if(typeof B=="string"){B=document.getElementById(B)}return Element.extend(B)
}if(Prototype.BrowserFeatures.XPath){document._getElementsByXPath=function(F,A){var C=[];var E=document.evaluate(F,$(A)||document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
for(var B=0,D=E.snapshotLength;B<D;B++){C.push(E.snapshotItem(B))}return C};document.getElementsByClassName=function(B,A){var C=".//*[contains(concat(' ', @class, ' '), ' "+B+" ')]";
return document._getElementsByXPath(C,A)}}else{document.getElementsByClassName=function(G,I){var D=($(I)||document.body).getElementsByTagName("*");
var A=[],B,F=new RegExp("(^|\\s)"+G+"(\\s|$)");for(var E=0,C=D.length;E<C;E++){B=D[E];var H=B.className;
if(H.length==0){continue}if(H==G||H.match(F)){A.push(Element.extend(B))}}return A}}if(!window.Element){var Element={}
}Element.extend=function(E){var G=Prototype.BrowserFeatures;if(!E||!E.tagName||E.nodeType==3||E._extended||G.SpecificElementExtensions||E==window){return E
}var B={},D=E.tagName,A=Element.extend.cache,C=Element.Methods.ByTag;if(!G.ElementExtensions){Object.extend(B,Element.Methods),Object.extend(B,Element.Methods.Simulated)
}if(C[D]){Object.extend(B,C[D])}for(var I in B){var H=B[I];if(typeof H=="function"&&!(I in E)){E[I]=A.findOrStore(H)
}}E._extended=Prototype.emptyFunction;return E};Element.extend.cache={findOrStore:function(A){return this[A]=this[A]||function(){return A.apply(null,[this].concat($A(arguments)))
}}};Element.Methods={visible:function(A){return $(A).style.display!="none"},toggle:function(A){A=$(A);
Element[Element.visible(A)?"hide":"show"](A);return A},hide:function(A){$(A).style.display="none";return A
},show:function(A){$(A).style.display="";return A},remove:function(A){A=$(A);A.parentNode.removeChild(A);
return A},update:function(B,A){A=typeof A=="undefined"?"":A.toString();$(B).innerHTML=A.stripScripts();
setTimeout(function(){A.evalScripts()},10);return B},replace:function(C,B){C=$(C);B=typeof B=="undefined"?"":B.toString();
if(C.outerHTML){C.outerHTML=B.stripScripts()}else{var A=C.ownerDocument.createRange();A.selectNodeContents(C);
C.parentNode.replaceChild(A.createContextualFragment(B.stripScripts()),C)}setTimeout(function(){B.evalScripts()
},10);return C},inspect:function(B){B=$(B);var A="<"+B.tagName.toLowerCase();$H({id:"id",className:"class"}).each(function(F){var E=F.first(),C=F.last();
var D=(B[E]||"").toString();if(D){A+=" "+C+"="+D.inspect(true)}});return A+">"},recursivelyCollect:function(A,C){A=$(A);
var B=[];while(A=A[C]){if(A.nodeType==1){B.push(Element.extend(A))}}return B},ancestors:function(A){return $(A).recursivelyCollect("parentNode")
},descendants:function(A){return $A($(A).getElementsByTagName("*")).each(Element.extend)},firstDescendant:function(A){A=$(A).firstChild;
while(A&&A.nodeType!=1){A=A.nextSibling}return $(A)},immediateDescendants:function(A){if(!(A=$(A).firstChild)){return[]
}while(A&&A.nodeType!=1){A=A.nextSibling}if(A){return[A].concat($(A).nextSiblings())}return[]},previousSiblings:function(A){return $(A).recursivelyCollect("previousSibling")
},nextSiblings:function(A){return $(A).recursivelyCollect("nextSibling")},siblings:function(A){A=$(A);
return A.previousSiblings().reverse().concat(A.nextSiblings())},match:function(B,A){if(typeof A=="string"){A=new Selector(A)
}return A.match($(B))},up:function(B,D,A){B=$(B);if(arguments.length==1){return $(B.parentNode)}var C=B.ancestors();
return D?Selector.findElement(C,D,A):C[A||0]},down:function(B,C,A){B=$(B);if(arguments.length==1){return B.firstDescendant()
}var D=B.descendants();return C?Selector.findElement(D,C,A):D[A||0]},previous:function(B,D,A){B=$(B);
if(arguments.length==1){return $(Selector.handlers.previousElementSibling(B))}var C=B.previousSiblings();
return D?Selector.findElement(C,D,A):C[A||0]},next:function(C,D,B){C=$(C);if(arguments.length==1){return $(Selector.handlers.nextElementSibling(C))
}var A=C.nextSiblings();return D?Selector.findElement(A,D,B):A[B||0]},getElementsBySelector:function(){var A=$A(arguments),B=$(A.shift());
return Selector.findChildElements(B,A)},getElementsByClassName:function(A,B){return document.getElementsByClassName(B,A)
},readAttribute:function(C,A){C=$(C);if(Prototype.Browser.IE){if(!C.attributes){return null}var B=Element._attributeTranslations;
if(B.values[A]){return B.values[A](C,A)}if(B.names[A]){A=B.names[A]}var D=C.attributes[A];return D?D.nodeValue:null
}return C.getAttribute(A)},getHeight:function(A){return $(A).getDimensions().height},getWidth:function(A){return $(A).getDimensions().width
},classNames:function(A){return new Element.ClassNames(A)},hasClassName:function(A,B){if(!(A=$(A))){return 
}var C=A.className;if(C.length==0){return false}if(C==B||C.match(new RegExp("(^|\\s)"+B+"(\\s|$)"))){return true
}return false},addClassName:function(A,B){if(!(A=$(A))){return }Element.classNames(A).add(B);return A
},removeClassName:function(A,B){if(!(A=$(A))){return }Element.classNames(A).remove(B);return A},toggleClassName:function(A,B){if(!(A=$(A))){return 
}Element.classNames(A)[A.hasClassName(B)?"remove":"add"](B);return A},observe:function(){Event.observe.apply(Event,arguments);
return $A(arguments).first()},stopObserving:function(){Event.stopObserving.apply(Event,arguments);return $A(arguments).first()
},cleanWhitespace:function(B){B=$(B);var C=B.firstChild;while(C){var A=C.nextSibling;if(C.nodeType==3&&!/\S/.test(C.nodeValue)){B.removeChild(C)
}C=A}return B},empty:function(A){return $(A).innerHTML.blank()},descendantOf:function(B,A){B=$(B),A=$(A);
while(B=B.parentNode){if(B==A){return true}}return false},scrollTo:function(A){A=$(A);var B=Position.cumulativeOffset(A);
window.scrollTo(B[0],B[1]);return A},getStyle:function(B,C){B=$(B);C=C=="float"?"cssFloat":C.camelize();
var D=B.style[C];if(!D){var A=document.defaultView.getComputedStyle(B,null);D=A?A[C]:null}if(C=="opacity"){return D?parseFloat(D):1
}return D=="auto"?null:D},getOpacity:function(A){return $(A).getStyle("opacity")},setStyle:function(A,C,B){A=$(A);
var E=A.style;for(var D in C){if(D=="opacity"){A.setOpacity(C[D])}else{E[(D=="float"||D=="cssFloat")?(E.styleFloat===undefined?"cssFloat":"styleFloat"):(B?D:D.camelize())]=C[D]
}}return A},setOpacity:function(A,B){A=$(A);A.style.opacity=(B==1||B==="")?"":(B<0.00001)?0:B;return A
},getDimensions:function(C){C=$(C);var G=$(C).getStyle("display");if(G!="none"&&G!=null){return{width:C.offsetWidth,height:C.offsetHeight}
}var B=C.style;var F=B.visibility;var D=B.position;var A=B.display;B.visibility="hidden";B.position="absolute";
B.display="block";var H=C.clientWidth;var E=C.clientHeight;B.display=A;B.position=D;B.visibility=F;return{width:H,height:E}
},makePositioned:function(A){A=$(A);var B=Element.getStyle(A,"position");if(B=="static"||!B){A._madePositioned=true;
A.style.position="relative";if(window.opera){A.style.top=0;A.style.left=0}}return A},undoPositioned:function(A){A=$(A);
if(A._madePositioned){A._madePositioned=undefined;A.style.position=A.style.top=A.style.left=A.style.bottom=A.style.right=""
}return A},makeClipping:function(A){A=$(A);if(A._overflow){return A}A._overflow=A.style.overflow||"auto";
if((Element.getStyle(A,"overflow")||"visible")!="hidden"){A.style.overflow="hidden"}return A},undoClipping:function(A){A=$(A);
if(!A._overflow){return A}A.style.overflow=A._overflow=="auto"?"":A._overflow;A._overflow=null;return A
}};Object.extend(Element.Methods,{childOf:Element.Methods.descendantOf,childElements:Element.Methods.immediateDescendants});
if(Prototype.Browser.Opera){Element.Methods._getStyle=Element.Methods.getStyle;Element.Methods.getStyle=function(A,B){switch(B){case"left":case"top":case"right":case"bottom":if(Element._getStyle(A,"position")=="static"){return null
}default:return Element._getStyle(A,B)}}}else{if(Prototype.Browser.IE){Element.Methods.getStyle=function(A,B){A=$(A);
B=(B=="float"||B=="cssFloat")?"styleFloat":B.camelize();var C=A.style[B];if(!C&&A.currentStyle){C=A.currentStyle[B]
}if(B=="opacity"){if(C=(A.getStyle("filter")||"").match(/alpha\(opacity=(.*)\)/)){if(C[1]){return parseFloat(C[1])/100
}}return 1}if(C=="auto"){if((B=="width"||B=="height")&&(A.getStyle("display")!="none")){return A["offset"+B.capitalize()]+"px"
}return null}return C};Element.Methods.setOpacity=function(A,D){A=$(A);var C=A.getStyle("filter"),B=A.style;
if(D==1||D===""){B.filter=C.replace(/alpha\([^\)]*\)/gi,"");return A}else{if(D<0.00001){D=0}}B.filter=C.replace(/alpha\([^\)]*\)/gi,"")+"alpha(opacity="+(D*100)+")";
return A};Element.Methods.update=function(C,B){C=$(C);B=typeof B=="undefined"?"":B.toString();var A=C.tagName.toUpperCase();
if(["THEAD","TBODY","TR","TD"].include(A)){var D=document.createElement("div");switch(A){case"THEAD":case"TBODY":D.innerHTML="<table><tbody>"+B.stripScripts()+"</tbody></table>";
depth=2;break;case"TR":D.innerHTML="<table><tbody><tr>"+B.stripScripts()+"</tr></tbody></table>";depth=3;
break;case"TD":D.innerHTML="<table><tbody><tr><td>"+B.stripScripts()+"</td></tr></tbody></table>";depth=4
}$A(C.childNodes).each(function(E){C.removeChild(E)});depth.times(function(){D=D.firstChild});$A(D.childNodes).each(function(E){C.appendChild(E)
})}else{C.innerHTML=B.stripScripts()}setTimeout(function(){B.evalScripts()},10);return C}}else{if(Prototype.Browser.Gecko){Element.Methods.setOpacity=function(A,B){A=$(A);
A.style.opacity=(B==1)?0.999999:(B==="")?"":(B<0.00001)?0:B;return A}}}}Element._attributeTranslations={names:{colspan:"colSpan",rowspan:"rowSpan",valign:"vAlign",datetime:"dateTime",accesskey:"accessKey",tabindex:"tabIndex",enctype:"encType",maxlength:"maxLength",readonly:"readOnly",longdesc:"longDesc"},values:{_getAttr:function(A,B){return A.getAttribute(B,2)
},_flag:function(A,B){return $(A).hasAttribute(B)?B:null},style:function(A){return A.style.cssText.toLowerCase()
},title:function(A){var B=A.getAttributeNode("title");return B.specified?B.nodeValue:null}}};(function(){Object.extend(this,{href:this._getAttr,src:this._getAttr,type:this._getAttr,disabled:this._flag,checked:this._flag,readonly:this._flag,multiple:this._flag})
}).call(Element._attributeTranslations.values);Element.Methods.Simulated={hasAttribute:function(B,D){var A=Element._attributeTranslations,C;
D=A.names[D]||D;C=$(B).getAttributeNode(D);return C&&C.specified}};Element.Methods.ByTag={};Object.extend(Element,Element.Methods);
if(!Prototype.BrowserFeatures.ElementExtensions&&document.createElement("div").__proto__){window.HTMLElement={};
window.HTMLElement.prototype=document.createElement("div").__proto__;Prototype.BrowserFeatures.ElementExtensions=true
}Element.hasAttribute=function(A,B){if(A.hasAttribute){return A.hasAttribute(B)}return Element.Methods.Simulated.hasAttribute(A,B)
};Element.addMethods=function(C){var I=Prototype.BrowserFeatures,D=Element.Methods.ByTag;if(!C){Object.extend(Form,Form.Methods);
Object.extend(Form.Element,Form.Element.Methods);Object.extend(Element.Methods.ByTag,{FORM:Object.clone(Form.Methods),INPUT:Object.clone(Form.Element.Methods),SELECT:Object.clone(Form.Element.Methods),TEXTAREA:Object.clone(Form.Element.Methods)})
}if(arguments.length==2){var B=C;C=arguments[1]}if(!B){Object.extend(Element.Methods,C||{})}else{if(B.constructor==Array){B.each(H)
}else{H(B)}}function H(F){F=F.toUpperCase();if(!Element.Methods.ByTag[F]){Element.Methods.ByTag[F]={}
}Object.extend(Element.Methods.ByTag[F],C)}function A(M,K,F){F=F||false;var L=Element.extend.cache;for(var O in M){var N=M[O];
if(!F||!(O in K)){K[O]=L.findOrStore(N)}}}function E(L){var F;var K={OPTGROUP:"OptGroup",TEXTAREA:"TextArea",P:"Paragraph",FIELDSET:"FieldSet",UL:"UList",OL:"OList",DL:"DList",DIR:"Directory",H1:"Heading",H2:"Heading",H3:"Heading",H4:"Heading",H5:"Heading",H6:"Heading",Q:"Quote",INS:"Mod",DEL:"Mod",A:"Anchor",IMG:"Image",CAPTION:"TableCaption",COL:"TableCol",COLGROUP:"TableCol",THEAD:"TableSection",TFOOT:"TableSection",TBODY:"TableSection",TR:"TableRow",TH:"TableCell",TD:"TableCell",FRAMESET:"FrameSet",IFRAME:"IFrame"};
if(K[L]){F="HTML"+K[L]+"Element"}if(window[F]){return window[F]}F="HTML"+L+"Element";if(window[F]){return window[F]
}F="HTML"+L.capitalize()+"Element";if(window[F]){return window[F]}window[F]={};window[F].prototype=document.createElement(L).__proto__;
return window[F]}if(I.ElementExtensions){A(Element.Methods,HTMLElement.prototype);A(Element.Methods.Simulated,HTMLElement.prototype,true)
}if(I.SpecificElementExtensions){for(var J in Element.Methods.ByTag){var G=E(J);if(typeof G=="undefined"){continue
}A(D[J],G.prototype)}}Object.extend(Element,Element.Methods);delete Element.ByTag};var Toggle={display:Element.toggle};
Abstract.Insertion=function(A){this.adjacency=A};Abstract.Insertion.prototype={initialize:function(B,C){this.element=$(B);
this.content=C.stripScripts();if(this.adjacency&&this.element.insertAdjacentHTML){try{this.element.insertAdjacentHTML(this.adjacency,this.content)
}catch(D){var A=this.element.tagName.toUpperCase();if(["TBODY","TR"].include(A)){this.insertContent(this.contentFromAnonymousTable())
}else{throw D}}}else{this.range=this.element.ownerDocument.createRange();if(this.initializeRange){this.initializeRange()
}this.insertContent([this.range.createContextualFragment(this.content)])}setTimeout(function(){C.evalScripts()
},10)},contentFromAnonymousTable:function(){var A=document.createElement("div");A.innerHTML="<table><tbody>"+this.content+"</tbody></table>";
return $A(A.childNodes[0].childNodes[0].childNodes)}};var Insertion=new Object();Insertion.Before=Class.create();
Insertion.Before.prototype=Object.extend(new Abstract.Insertion("beforeBegin"),{initializeRange:function(){this.range.setStartBefore(this.element)
},insertContent:function(A){A.each((function(B){this.element.parentNode.insertBefore(B,this.element)}).bind(this))
}});Insertion.Top=Class.create();Insertion.Top.prototype=Object.extend(new Abstract.Insertion("afterBegin"),{initializeRange:function(){this.range.selectNodeContents(this.element);
this.range.collapse(true)},insertContent:function(A){A.reverse(false).each((function(B){this.element.insertBefore(B,this.element.firstChild)
}).bind(this))}});Insertion.Bottom=Class.create();Insertion.Bottom.prototype=Object.extend(new Abstract.Insertion("beforeEnd"),{initializeRange:function(){this.range.selectNodeContents(this.element);
this.range.collapse(this.element)},insertContent:function(A){A.each((function(B){this.element.appendChild(B)
}).bind(this))}});Insertion.After=Class.create();Insertion.After.prototype=Object.extend(new Abstract.Insertion("afterEnd"),{initializeRange:function(){this.range.setStartAfter(this.element)
},insertContent:function(A){A.each((function(B){this.element.parentNode.insertBefore(B,this.element.nextSibling)
}).bind(this))}});Element.ClassNames=Class.create();Element.ClassNames.prototype={initialize:function(A){this.element=$(A)
},_each:function(A){this.element.className.split(/\s+/).select(function(B){return B.length>0})._each(A)
},set:function(A){this.element.className=A},add:function(A){if(this.include(A)){return }this.set($A(this).concat(A).join(" "))
},remove:function(A){if(!this.include(A)){return }this.set($A(this).without(A).join(" "))},toString:function(){return $A(this).join(" ")
}};Object.extend(Element.ClassNames.prototype,Enumerable);var Selector=Class.create();Selector.prototype={initialize:function(A){this.expression=A.strip();
this.compileMatcher()},compileMatcher:function(){if(Prototype.BrowserFeatures.XPath&&!(/\[[\w-]*?:/).test(this.expression)){return this.compileXPathMatcher()
}var e=this.expression,ps=Selector.patterns,h=Selector.handlers,c=Selector.criteria,le,p,m;if(Selector._cache[e]){this.matcher=Selector._cache[e];
return }this.matcher=["this.matcher = function(root) {","var r = root, h = Selector.handlers, c = false, n;"];
while(e&&le!=e&&(/\S/).test(e)){le=e;for(var i in ps){p=ps[i];if(m=e.match(p)){this.matcher.push(typeof c[i]=="function"?c[i](m):new Template(c[i]).evaluate(m));
e=e.replace(m[0],"");break}}}this.matcher.push("return h.unique(n);\n}");eval(this.matcher.join("\n"));
Selector._cache[this.expression]=this.matcher},compileXPathMatcher:function(){var E=this.expression,F=Selector.patterns,B=Selector.xpath,D,A;
if(Selector._cache[E]){this.xpath=Selector._cache[E];return }this.matcher=[".//*"];while(E&&D!=E&&(/\S/).test(E)){D=E;
for(var C in F){if(A=E.match(F[C])){this.matcher.push(typeof B[C]=="function"?B[C](A):new Template(B[C]).evaluate(A));
E=E.replace(A[0],"");break}}}this.xpath=this.matcher.join("");Selector._cache[this.expression]=this.xpath
},findElements:function(A){A=A||document;if(this.xpath){return document._getElementsByXPath(this.xpath,A)
}return this.matcher(A)},match:function(A){return this.findElements(document).include(A)},toString:function(){return this.expression
},inspect:function(){return"#<Selector:"+this.expression.inspect()+">"}};Object.extend(Selector,{_cache:{},xpath:{descendant:"//*",child:"/*",adjacent:"/following-sibling::*[1]",laterSibling:"/following-sibling::*",tagName:function(A){if(A[1]=="*"){return""
}return"[local-name()='"+A[1].toLowerCase()+"' or local-name()='"+A[1].toUpperCase()+"']"},className:"[contains(concat(' ', @class, ' '), ' #{1} ')]",id:"[@id='#{1}']",attrPresence:"[@#{1}]",attr:function(A){A[3]=A[5]||A[6];
return new Template(Selector.xpath.operators[A[2]]).evaluate(A)},pseudo:function(A){var B=Selector.xpath.pseudos[A[1]];
if(!B){return""}if(typeof B==="function"){return B(A)}return new Template(Selector.xpath.pseudos[A[1]]).evaluate(A)
},operators:{"=":"[@#{1}='#{3}']","!=":"[@#{1}!='#{3}']","^=":"[starts-with(@#{1}, '#{3}')]","$=":"[substring(@#{1}, (string-length(@#{1}) - string-length('#{3}') + 1))='#{3}']","*=":"[contains(@#{1}, '#{3}')]","~=":"[contains(concat(' ', @#{1}, ' '), ' #{3} ')]","|=":"[contains(concat('-', @#{1}, '-'), '-#{3}-')]"},pseudos:{"first-child":"[not(preceding-sibling::*)]","last-child":"[not(following-sibling::*)]","only-child":"[not(preceding-sibling::* or following-sibling::*)]",empty:"[count(*) = 0 and (count(text()) = 0 or translate(text(), ' \t\r\n', '') = '')]",checked:"[@checked]",disabled:"[@disabled]",enabled:"[not(@disabled)]",not:function(B){var H=B[6],G=Selector.patterns,A=Selector.xpath,E,B,C;
var F=[];while(H&&E!=H&&(/\S/).test(H)){E=H;for(var D in G){if(B=H.match(G[D])){C=typeof A[D]=="function"?A[D](B):new Template(A[D]).evaluate(B);
F.push("("+C.substring(1,C.length-1)+")");H=H.replace(B[0],"");break}}}return"[not("+F.join(" and ")+")]"
},"nth-child":function(A){return Selector.xpath.pseudos.nth("(count(./preceding-sibling::*) + 1) ",A)
},"nth-last-child":function(A){return Selector.xpath.pseudos.nth("(count(./following-sibling::*) + 1) ",A)
},"nth-of-type":function(A){return Selector.xpath.pseudos.nth("position() ",A)},"nth-last-of-type":function(A){return Selector.xpath.pseudos.nth("(last() + 1 - position()) ",A)
},"first-of-type":function(A){A[6]="1";return Selector.xpath.pseudos["nth-of-type"](A)},"last-of-type":function(A){A[6]="1";
return Selector.xpath.pseudos["nth-last-of-type"](A)},"only-of-type":function(A){var B=Selector.xpath.pseudos;
return B["first-of-type"](A)+B["last-of-type"](A)},nth:function(E,C){var F,G=C[6],B;if(G=="even"){G="2n+0"
}if(G=="odd"){G="2n+1"}if(F=G.match(/^(\d+)$/)){return"["+E+"= "+F[1]+"]"}if(F=G.match(/^(-?\d*)?n(([+-])(\d+))?/)){if(F[1]=="-"){F[1]=-1
}var D=F[1]?Number(F[1]):1;var A=F[2]?Number(F[2]):0;B="[((#{fragment} - #{b}) mod #{a} = 0) and ((#{fragment} - #{b}) div #{a} >= 0)]";
return new Template(B).evaluate({fragment:E,a:D,b:A})}}}},criteria:{tagName:'n = h.tagName(n, r, "#{1}", c);   c = false;',className:'n = h.className(n, r, "#{1}", c); c = false;',id:'n = h.id(n, r, "#{1}", c);        c = false;',attrPresence:'n = h.attrPresence(n, r, "#{1}"); c = false;',attr:function(A){A[3]=(A[5]||A[6]);
return new Template('n = h.attr(n, r, "#{1}", "#{3}", "#{2}"); c = false;').evaluate(A)},pseudo:function(A){if(A[6]){A[6]=A[6].replace(/"/g,'\\"')
}return new Template('n = h.pseudo(n, "#{1}", "#{6}", r, c); c = false;').evaluate(A)},descendant:'c = "descendant";',child:'c = "child";',adjacent:'c = "adjacent";',laterSibling:'c = "laterSibling";'},patterns:{laterSibling:/^\s*~\s*/,child:/^\s*>\s*/,adjacent:/^\s*\+\s*/,descendant:/^\s/,tagName:/^\s*(\*|[\w\-]+)(\b|$)?/,id:/^#([\w\-\*]+)(\b|$)/,className:/^\.([\w\-\*]+)(\b|$)/,pseudo:/^:((first|last|nth|nth-last|only)(-child|-of-type)|empty|checked|(en|dis)abled|not)(\((.*?)\))?(\b|$|\s|(?=:))/,attrPresence:/^\[([\w]+)\]/,attr:/\[((?:[\w-]*:)?[\w-]+)\s*(?:([!^$*~|]?=)\s*((['"])([^\]]*?)\4|([^'"][^\]]*?)))?\]/},handlers:{concat:function(B,A){for(var C=0,D;
D=A[C];C++){B.push(D)}return B},mark:function(A){for(var B=0,C;C=A[B];B++){C._counted=true}return A},unmark:function(A){for(var B=0,C;
C=A[B];B++){C._counted=undefined}return A},index:function(A,D,F){A._counted=true;if(D){for(var B=A.childNodes,E=B.length-1,C=1;
E>=0;E--){node=B[E];if(node.nodeType==1&&(!F||node._counted)){node.nodeIndex=C++}}}else{for(var E=0,C=1,B=A.childNodes;
node=B[E];E++){if(node.nodeType==1&&(!F||node._counted)){node.nodeIndex=C++}}}},unique:function(B){if(B.length==0){return B
}var D=[],E;for(var C=0,A=B.length;C<A;C++){if(!(E=B[C])._counted){E._counted=true;D.push(Element.extend(E))
}}return Selector.handlers.unmark(D)},descendant:function(A){var D=Selector.handlers;for(var C=0,B=[],E;
E=A[C];C++){D.concat(B,E.getElementsByTagName("*"))}return B},child:function(A){var F=Selector.handlers;
for(var E=0,D=[],G;G=A[E];E++){for(var B=0,C=[],H;H=G.childNodes[B];B++){if(H.nodeType==1&&H.tagName!="!"){D.push(H)
}}}return D},adjacent:function(A){for(var C=0,B=[],E;E=A[C];C++){var D=this.nextElementSibling(E);if(D){B.push(D)
}}return B},laterSibling:function(A){var D=Selector.handlers;for(var C=0,B=[],E;E=A[C];C++){D.concat(B,Element.nextSiblings(E))
}return B},nextElementSibling:function(A){while(A=A.nextSibling){if(A.nodeType==1){return A}}return null
},previousElementSibling:function(A){while(A=A.previousSibling){if(A.nodeType==1){return A}}return null
},tagName:function(B,A,E,H){E=E.toUpperCase();var D=[],F=Selector.handlers;if(B){if(H){if(H=="descendant"){for(var C=0,G;
G=B[C];C++){F.concat(D,G.getElementsByTagName(E))}return D}else{B=this[H](B)}if(E=="*"){return B}}for(var C=0,G;
G=B[C];C++){if(G.tagName.toUpperCase()==E){D.push(G)}}return D}else{return A.getElementsByTagName(E)}},id:function(B,A,H,F){var G=$(H),D=Selector.handlers;
if(!B&&A==document){return G?[G]:[]}if(B){if(F){if(F=="child"){for(var C=0,E;E=B[C];C++){if(G.parentNode==E){return[G]
}}}else{if(F=="descendant"){for(var C=0,E;E=B[C];C++){if(Element.descendantOf(G,E)){return[G]}}}else{if(F=="adjacent"){for(var C=0,E;
E=B[C];C++){if(Selector.handlers.previousElementSibling(G)==E){return[G]}}}else{B=D[F](B)}}}}for(var C=0,E;
E=B[C];C++){if(E==G){return[G]}}return[]}return(G&&Element.descendantOf(G,A))?[G]:[]},className:function(B,A,C,D){if(B&&D){B=this[D](B)
}return Selector.handlers.byClassName(B,A,C)},byClassName:function(C,B,F){if(!C){C=Selector.handlers.descendant([B])
}var H=" "+F+" ";for(var E=0,D=[],G,A;G=C[E];E++){A=G.className;if(A.length==0){continue}if(A==F||(" "+A+" ").include(H)){D.push(G)
}}return D},attrPresence:function(C,B,A){var E=[];for(var D=0,F;F=C[D];D++){if(Element.hasAttribute(F,A)){E.push(F)
}}return E},attr:function(A,H,G,I,B){if(!A){A=H.getElementsByTagName("*")}var J=Selector.operators[B],D=[];
for(var E=0,C;C=A[E];E++){var F=Element.readAttribute(C,G);if(F===null){continue}if(J(F,I)){D.push(C)
}}return D},pseudo:function(B,C,E,A,D){if(B&&D){B=this[D](B)}if(!B){B=A.getElementsByTagName("*")}return Selector.pseudos[C](B,E,A)
}},pseudos:{"first-child":function(B,F,A){for(var D=0,C=[],E;E=B[D];D++){if(Selector.handlers.previousElementSibling(E)){continue
}C.push(E)}return C},"last-child":function(B,F,A){for(var D=0,C=[],E;E=B[D];D++){if(Selector.handlers.nextElementSibling(E)){continue
}C.push(E)}return C},"only-child":function(B,G,A){var E=Selector.handlers;for(var D=0,C=[],F;F=B[D];D++){if(!E.previousElementSibling(F)&&!E.nextElementSibling(F)){C.push(F)
}}return C},"nth-child":function(B,C,A){return Selector.pseudos.nth(B,C,A)},"nth-last-child":function(B,C,A){return Selector.pseudos.nth(B,C,A,true)
},"nth-of-type":function(B,C,A){return Selector.pseudos.nth(B,C,A,false,true)},"nth-last-of-type":function(B,C,A){return Selector.pseudos.nth(B,C,A,true,true)
},"first-of-type":function(B,C,A){return Selector.pseudos.nth(B,"1",A,false,true)},"last-of-type":function(B,C,A){return Selector.pseudos.nth(B,"1",A,true,true)
},"only-of-type":function(B,D,A){var C=Selector.pseudos;return C["last-of-type"](C["first-of-type"](B,D,A),D,A)
},getIndices:function(B,A,C){if(B==0){return A>0?[A]:[]}return $R(1,C).inject([],function(D,E){if(0==(E-A)%B&&(E-A)/B>=0){D.push(E)
}return D})},nth:function(A,L,N,K,C){if(A.length==0){return[]}if(L=="even"){L="2n+0"}if(L=="odd"){L="2n+1"
}var J=Selector.handlers,I=[],B=[],E;J.mark(A);for(var H=0,D;D=A[H];H++){if(!D.parentNode._counted){J.index(D.parentNode,K,C);
B.push(D.parentNode)}}if(L.match(/^\d+$/)){L=Number(L);for(var H=0,D;D=A[H];H++){if(D.nodeIndex==L){I.push(D)
}}}else{if(E=L.match(/^(-?\d*)?n(([+-])(\d+))?/)){if(E[1]=="-"){E[1]=-1}var O=E[1]?Number(E[1]):1;var M=E[2]?Number(E[2]):0;
var P=Selector.pseudos.getIndices(O,M,A.length);for(var H=0,D,F=P.length;D=A[H];H++){for(var G=0;G<F;
G++){if(D.nodeIndex==P[G]){I.push(D)}}}}}J.unmark(A);J.unmark(B);return I},empty:function(B,F,A){for(var D=0,C=[],E;
E=B[D];D++){if(E.tagName=="!"||(E.firstChild&&!E.innerHTML.match(/^\s*$/))){continue}C.push(E)}return C
},not:function(A,D,I){var G=Selector.handlers,J,C;var H=new Selector(D).findElements(I);G.mark(H);for(var F=0,E=[],B;
B=A[F];F++){if(!B._counted){E.push(B)}}G.unmark(H);return E},enabled:function(B,F,A){for(var D=0,C=[],E;
E=B[D];D++){if(!E.disabled){C.push(E)}}return C},disabled:function(B,F,A){for(var D=0,C=[],E;E=B[D];D++){if(E.disabled){C.push(E)
}}return C},checked:function(B,F,A){for(var D=0,C=[],E;E=B[D];D++){if(E.checked){C.push(E)}}return C}},operators:{"=":function(B,A){return B==A
},"!=":function(B,A){return B!=A},"^=":function(B,A){return B.startsWith(A)},"$=":function(B,A){return B.endsWith(A)
},"*=":function(B,A){return B.include(A)},"~=":function(B,A){return(" "+B+" ").include(" "+A+" ")},"|=":function(B,A){return("-"+B.toUpperCase()+"-").include("-"+A.toUpperCase()+"-")
}},matchElements:function(F,G){var E=new Selector(G).findElements(),D=Selector.handlers;D.mark(E);for(var C=0,B=[],A;
A=F[C];C++){if(A._counted){B.push(A)}}D.unmark(E);return B},findElement:function(B,C,A){if(typeof C=="number"){A=C;
C=false}return Selector.matchElements(B,C||"*")[A||0]},findChildElements:function(E,G){var H=G.join(","),G=[];
H.scan(/(([\w#:.~>+()\s-]+|\*|\[.*?\])+)\s*(,|$)/,function(I){G.push(I[1].strip())});var D=[],F=Selector.handlers;
for(var C=0,B=G.length,A;C<B;C++){A=new Selector(G[C].strip());F.concat(D,A.findElements(E))}return(B>1)?F.unique(D):D
}});function $$(){return Selector.findChildElements(document,$A(arguments))}var Form={reset:function(A){$(A).reset();
return A},serializeElements:function(C,A){var B=C.inject({},function(D,F){if(!F.disabled&&F.name){var E=F.name,G=$(F).getValue();
if(G!=null){if(E in D){if(D[E].constructor!=Array){D[E]=[D[E]]}D[E].push(G)}else{D[E]=G}}}return D});
return A?B:Hash.toQueryString(B)}};Form.Methods={serialize:function(B,A){return Form.serializeElements(Form.getElements(B),A)
},getElements:function(A){return $A($(A).getElementsByTagName("*")).inject([],function(B,C){if(Form.Element.Serializers[C.tagName.toLowerCase()]){B.push(Element.extend(C))
}return B})},getInputs:function(G,C,D){G=$(G);var A=G.getElementsByTagName("input");if(!C&&!D){return $A(A).map(Element.extend)
}for(var E=0,H=[],F=A.length;E<F;E++){var B=A[E];if((C&&B.type!=C)||(D&&B.name!=D)){continue}H.push(Element.extend(B))
}return H},disable:function(A){A=$(A);Form.getElements(A).invoke("disable");return A},enable:function(A){A=$(A);
Form.getElements(A).invoke("enable");return A},findFirstElement:function(A){return $(A).getElements().find(function(B){return B.type!="hidden"&&!B.disabled&&["input","select","textarea"].include(B.tagName.toLowerCase())
})},focusFirstElement:function(A){A=$(A);A.findFirstElement().activate();return A},request:function(B,A){B=$(B),A=Object.clone(A||{});
var C=A.parameters;A.parameters=B.serialize(true);if(C){if(typeof C=="string"){C=C.toQueryParams()}Object.extend(A.parameters,C)
}if(B.hasAttribute("method")&&!A.method){A.method=B.method}return new Ajax.Request(B.readAttribute("action"),A)
}};Form.Element={focus:function(A){$(A).focus();return A},select:function(A){$(A).select();return A}};
Form.Element.Methods={serialize:function(A){A=$(A);if(!A.disabled&&A.name){var B=A.getValue();if(B!=undefined){var C={};
C[A.name]=B;return Hash.toQueryString(C)}}return""},getValue:function(A){A=$(A);var B=A.tagName.toLowerCase();
return Form.Element.Serializers[B](A)},clear:function(A){$(A).value="";return A},present:function(A){return $(A).value!=""
},activate:function(A){A=$(A);try{A.focus();if(A.select&&(A.tagName.toLowerCase()!="input"||!["button","reset","submit"].include(A.type))){A.select()
}}catch(B){}return A},disable:function(A){A=$(A);A.blur();A.disabled=true;return A},enable:function(A){A=$(A);
A.disabled=false;return A}};var Field=Form.Element;var $F=Form.Element.Methods.getValue;Form.Element.Serializers={input:function(A){switch(A.type.toLowerCase()){case"checkbox":case"radio":return Form.Element.Serializers.inputSelector(A);
default:return Form.Element.Serializers.textarea(A)}},inputSelector:function(A){return A.checked?A.value:null
},textarea:function(A){return A.value},select:function(A){return this[A.type=="select-one"?"selectOne":"selectMany"](A)
},selectOne:function(B){var A=B.selectedIndex;return A>=0?this.optionValue(B.options[A]):null},selectMany:function(D){var A,E=D.length;
if(!E){return null}for(var C=0,A=[];C<E;C++){var B=D.options[C];if(B.selected){A.push(this.optionValue(B))
}}return A},optionValue:function(A){return Element.extend(A).hasAttribute("value")?A.value:A.text}};Abstract.TimedObserver=function(){};
Abstract.TimedObserver.prototype={initialize:function(A,B,C){this.frequency=B;this.element=$(A);this.callback=C;
this.lastValue=this.getValue();this.registerCallback()},registerCallback:function(){setInterval(this.onTimerEvent.bind(this),this.frequency*1000)
},onTimerEvent:function(){var A=this.getValue();var B=("string"==typeof this.lastValue&&"string"==typeof A?this.lastValue!=A:String(this.lastValue)!=String(A));
if(B){this.callback(this.element,A);this.lastValue=A}}};Form.Element.Observer=Class.create();Form.Element.Observer.prototype=Object.extend(new Abstract.TimedObserver(),{getValue:function(){return Form.Element.getValue(this.element)
}});Form.Observer=Class.create();Form.Observer.prototype=Object.extend(new Abstract.TimedObserver(),{getValue:function(){return Form.serialize(this.element)
}});Abstract.EventObserver=function(){};Abstract.EventObserver.prototype={initialize:function(A,B){this.element=$(A);
this.callback=B;this.lastValue=this.getValue();if(this.element.tagName.toLowerCase()=="form"){this.registerFormCallbacks()
}else{this.registerCallback(this.element)}},onElementEvent:function(){var A=this.getValue();if(this.lastValue!=A){this.callback(this.element,A);
this.lastValue=A}},registerFormCallbacks:function(){Form.getElements(this.element).each(this.registerCallback.bind(this))
},registerCallback:function(A){if(A.type){switch(A.type.toLowerCase()){case"checkbox":case"radio":Event.observe(A,"click",this.onElementEvent.bind(this));
break;default:Event.observe(A,"change",this.onElementEvent.bind(this));break}}}};Form.Element.EventObserver=Class.create();
Form.Element.EventObserver.prototype=Object.extend(new Abstract.EventObserver(),{getValue:function(){return Form.Element.getValue(this.element)
}});Form.EventObserver=Class.create();Form.EventObserver.prototype=Object.extend(new Abstract.EventObserver(),{getValue:function(){return Form.serialize(this.element)
}});if(!window.Event){var Event=new Object()}Object.extend(Event,{KEY_BACKSPACE:8,KEY_TAB:9,KEY_RETURN:13,KEY_ESC:27,KEY_LEFT:37,KEY_UP:38,KEY_RIGHT:39,KEY_DOWN:40,KEY_DELETE:46,KEY_HOME:36,KEY_END:35,KEY_PAGEUP:33,KEY_PAGEDOWN:34,element:function(A){return $(A.target||A.srcElement)
},isLeftClick:function(A){return(((A.which)&&(A.which==1))||((A.button)&&(A.button==1)))},pointerX:function(A){return A.pageX||(A.clientX+(document.documentElement.scrollLeft||document.body.scrollLeft))
},pointerY:function(A){return A.pageY||(A.clientY+(document.documentElement.scrollTop||document.body.scrollTop))
},stop:function(A){if(A.preventDefault){A.preventDefault();A.stopPropagation()}else{A.returnValue=false;
A.cancelBubble=true}},findElement:function(C,B){var A=Event.element(C);while(A.parentNode&&(!A.tagName||(A.tagName.toUpperCase()!=B.toUpperCase()))){A=A.parentNode
}return A},observers:false,_observeAndCache:function(D,C,B,A){if(!this.observers){this.observers=[]}if(D.addEventListener){this.observers.push([D,C,B,A]);
D.addEventListener(C,B,A)}else{if(D.attachEvent){this.observers.push([D,C,B,A]);D.attachEvent("on"+C,B)
}}},unloadCache:function(){if(!Event.observers){return }for(var A=0,B=Event.observers.length;A<B;A++){Event.stopObserving.apply(this,Event.observers[A]);
Event.observers[A][0]=null}Event.observers=false},observe:function(D,C,B,A){D=$(D);A=A||false;if(C=="keypress"&&(Prototype.Browser.WebKit||D.attachEvent)){C="keydown"
}Event._observeAndCache(D,C,B,A)},stopObserving:function(D,C,B,A){D=$(D);A=A||false;if(C=="keypress"&&(Prototype.Browser.WebKit||D.attachEvent)){C="keydown"
}if(D.removeEventListener){D.removeEventListener(C,B,A)}else{if(D.detachEvent){try{D.detachEvent("on"+C,B)
}catch(E){}}}}});if(Prototype.Browser.IE){Event.observe(window,"unload",Event.unloadCache,false)}var Position={includeScrollOffsets:false,prepare:function(){this.deltaX=window.pageXOffset||document.documentElement.scrollLeft||document.body.scrollLeft||0;
this.deltaY=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop||0},realOffset:function(B){var A=0,C=0;
do{A+=B.scrollTop||0;C+=B.scrollLeft||0;B=B.parentNode}while(B);return[C,A]},cumulativeOffset:function(B){var A=0,C=0;
do{A+=B.offsetTop||0;C+=B.offsetLeft||0;B=B.offsetParent}while(B);return[C,A]},positionedOffset:function(B){var A=0,D=0;
do{A+=B.offsetTop||0;D+=B.offsetLeft||0;B=B.offsetParent;if(B){if(B.tagName=="BODY"){break}var C=Element.getStyle(B,"position");
if(C=="relative"||C=="absolute"){break}}}while(B);return[D,A]},offsetParent:function(A){if(A.offsetParent){return A.offsetParent
}if(A==document.body){return A}while((A=A.parentNode)&&A!=document.body){if(Element.getStyle(A,"position")!="static"){return A
}}return document.body},within:function(B,A,C){if(this.includeScrollOffsets){return this.withinIncludingScrolloffsets(B,A,C)
}this.xcomp=A;this.ycomp=C;this.offset=this.cumulativeOffset(B);return(C>=this.offset[1]&&C<this.offset[1]+B.offsetHeight&&A>=this.offset[0]&&A<this.offset[0]+B.offsetWidth)
},withinIncludingScrolloffsets:function(B,A,D){var C=this.realOffset(B);this.xcomp=A+C[0]-this.deltaX;
this.ycomp=D+C[1]-this.deltaY;this.offset=this.cumulativeOffset(B);return(this.ycomp>=this.offset[1]&&this.ycomp<this.offset[1]+B.offsetHeight&&this.xcomp>=this.offset[0]&&this.xcomp<this.offset[0]+B.offsetWidth)
},overlap:function(B,A){if(!B){return 0}if(B=="vertical"){return((this.offset[1]+A.offsetHeight)-this.ycomp)/A.offsetHeight
}if(B=="horizontal"){return((this.offset[0]+A.offsetWidth)-this.xcomp)/A.offsetWidth}},page:function(D){var A=0,C=0;
var B=D;do{A+=B.offsetTop||0;C+=B.offsetLeft||0;if(B.offsetParent==document.body){if(Element.getStyle(B,"position")=="absolute"){break
}}}while(B=B.offsetParent);B=D;do{if(!window.opera||B.tagName=="BODY"){A-=B.scrollTop||0;C-=B.scrollLeft||0
}}while(B=B.parentNode);return[C,A]},clone:function(C,E){var A=Object.extend({setLeft:true,setTop:true,setWidth:true,setHeight:true,offsetTop:0,offsetLeft:0},arguments[2]||{});
C=$(C);var D=Position.page(C);E=$(E);var F=[0,0];var B=null;if(Element.getStyle(E,"position")=="absolute"){B=Position.offsetParent(E);
F=Position.page(B)}if(B==document.body){F[0]-=document.body.offsetLeft;F[1]-=document.body.offsetTop}if(A.setLeft){E.style.left=(D[0]-F[0]+A.offsetLeft)+"px"
}if(A.setTop){E.style.top=(D[1]-F[1]+A.offsetTop)+"px"}if(A.setWidth){E.style.width=C.offsetWidth+"px"
}if(A.setHeight){E.style.height=C.offsetHeight+"px"}},absolutize:function(B){B=$(B);if(B.style.position=="absolute"){return 
}Position.prepare();var D=Position.positionedOffset(B);var F=D[1];var E=D[0];var C=B.clientWidth;var A=B.clientHeight;
B._originalLeft=E-parseFloat(B.style.left||0);B._originalTop=F-parseFloat(B.style.top||0);B._originalWidth=B.style.width;
B._originalHeight=B.style.height;B.style.position="absolute";B.style.top=F+"px";B.style.left=E+"px";B.style.width=C+"px";
B.style.height=A+"px"},relativize:function(A){A=$(A);if(A.style.position=="relative"){return }Position.prepare();
A.style.position="relative";var C=parseFloat(A.style.top||0)-(A._originalTop||0);var B=parseFloat(A.style.left||0)-(A._originalLeft||0);
A.style.top=C+"px";A.style.left=B+"px";A.style.height=A._originalHeight;A.style.width=A._originalWidth
}};if(Prototype.Browser.WebKit){Position.cumulativeOffset=function(B){var A=0,C=0;do{A+=B.offsetTop||0;
C+=B.offsetLeft||0;if(B.offsetParent==document.body){if(Element.getStyle(B,"position")=="absolute"){break
}}B=B.offsetParent}while(B);return[C,A]}}Element.addMethods();(function(){if(window.jQuery){var _jQuery=window.jQuery}var jQuery=window.jQuery=function(selector,context){return new jQuery.prototype.init(selector,context)
};if(window.$){var _$=window.$}window.$=jQuery;var quickExpr=/^[^<]*(<(.|\s)+>)[^>]*$|^#(\w+)$/;var isSimple=/^.[^:#\[\.]*$/;
jQuery.fn=jQuery.prototype={init:function(selector,context){selector=selector||document;if(selector.nodeType){this[0]=selector;
this.length=1;return this}else{if(typeof selector=="string"){var match=quickExpr.exec(selector);if(match&&(match[1]||!context)){if(match[1]){selector=jQuery.clean([match[1]],context)
}else{var elem=document.getElementById(match[3]);if(elem){if(elem.id!=match[3]){return jQuery().find(selector)
}else{this[0]=elem;this.length=1;return this}}else{selector=[]}}}else{return new jQuery(context).find(selector)
}}else{if(jQuery.isFunction(selector)){return new jQuery(document)[jQuery.fn.ready?"ready":"load"](selector)
}}}return this.setArray(selector.constructor==Array&&selector||(selector.jquery||selector.length&&selector!=window&&!selector.nodeType&&selector[0]!=undefined&&selector[0].nodeType)&&jQuery.makeArray(selector)||[selector])
},jquery:"1.2.3",size:function(){return this.length},length:0,get:function(num){return num==undefined?jQuery.makeArray(this):this[num]
},pushStack:function(elems){var ret=jQuery(elems);ret.prevObject=this;return ret},setArray:function(elems){this.length=0;
Array.prototype.push.apply(this,elems);return this},each:function(callback,args){return jQuery.each(this,callback,args)
},index:function(elem){var ret=-1;this.each(function(i){if(this==elem){ret=i}});return ret},attr:function(name,value,type){var options=name;
if(name.constructor==String){if(value==undefined){return this.length&&jQuery[type||"attr"](this[0],name)||undefined
}else{options={};options[name]=value}}return this.each(function(i){for(name in options){jQuery.attr(type?this.style:this,name,jQuery.prop(this,options[name],type,i,name))
}})},css:function(key,value){if((key=="width"||key=="height")&&parseFloat(value)<0){value=undefined}return this.attr(key,value,"curCSS")
},text:function(text){if(typeof text!="object"&&text!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(text))
}var ret="";jQuery.each(text||this,function(){jQuery.each(this.childNodes,function(){if(this.nodeType!=8){ret+=this.nodeType!=1?this.nodeValue:jQuery.fn.text([this])
}})});return ret},wrapAll:function(html){if(this[0]){jQuery(html,this[0].ownerDocument).clone().insertBefore(this[0]).map(function(){var elem=this;
while(elem.firstChild){elem=elem.firstChild}return elem}).append(this)}return this},wrapInner:function(html){return this.each(function(){jQuery(this).contents().wrapAll(html)
})},wrap:function(html){return this.each(function(){jQuery(this).wrapAll(html)})},append:function(){return this.domManip(arguments,true,false,function(elem){if(this.nodeType==1){this.appendChild(elem)
}})},prepend:function(){return this.domManip(arguments,true,true,function(elem){if(this.nodeType==1){this.insertBefore(elem,this.firstChild)
}})},before:function(){return this.domManip(arguments,false,false,function(elem){this.parentNode.insertBefore(elem,this)
})},after:function(){return this.domManip(arguments,false,true,function(elem){this.parentNode.insertBefore(elem,this.nextSibling)
})},end:function(){return this.prevObject||jQuery([])},find:function(selector){var elems=jQuery.map(this,function(elem){return jQuery.find(selector,elem)
});return this.pushStack(/[^+>] [^+>]/.test(selector)||selector.indexOf("..")>-1?jQuery.unique(elems):elems)
},clone:function(events){var ret=this.map(function(){if(jQuery.browser.msie&&!jQuery.isXMLDoc(this)){var clone=this.cloneNode(true),container=document.createElement("div");
container.appendChild(clone);return jQuery.clean([container.innerHTML])[0]}else{return this.cloneNode(true)
}});var clone=ret.find("*").andSelf().each(function(){if(this[expando]!=undefined){this[expando]=null
}});if(events===true){this.find("*").andSelf().each(function(i){if(this.nodeType==3){return }var events=jQuery.data(this,"events");
for(var type in events){for(var handler in events[type]){jQuery.event.add(clone[i],type,events[type][handler],events[type][handler].data)
}}})}return ret},filter:function(selector){return this.pushStack(jQuery.isFunction(selector)&&jQuery.grep(this,function(elem,i){return selector.call(elem,i)
})||jQuery.multiFilter(selector,this))},not:function(selector){if(selector.constructor==String){if(isSimple.test(selector)){return this.pushStack(jQuery.multiFilter(selector,this,true))
}else{selector=jQuery.multiFilter(selector,this)}}var isArrayLike=selector.length&&selector[selector.length-1]!==undefined&&!selector.nodeType;
return this.filter(function(){return isArrayLike?jQuery.inArray(this,selector)<0:this!=selector})},add:function(selector){return !selector?this:this.pushStack(jQuery.merge(this.get(),selector.constructor==String?jQuery(selector).get():selector.length!=undefined&&(!selector.nodeName||jQuery.nodeName(selector,"form"))?selector:[selector]))
},is:function(selector){return selector?jQuery.multiFilter(selector,this).length>0:false},hasClass:function(selector){return this.is("."+selector)
},val:function(value){if(value==undefined){if(this.length){var elem=this[0];if(jQuery.nodeName(elem,"select")){var index=elem.selectedIndex,values=[],options=elem.options,one=elem.type=="select-one";
if(index<0){return null}for(var i=one?index:0,max=one?index+1:options.length;i<max;i++){var option=options[i];
if(option.selected){value=jQuery.browser.msie&&!option.attributes.value.specified?option.text:option.value;
if(one){return value}values.push(value)}}return values}else{return(this[0].value||"").replace(/\r/g,"")
}}return undefined}return this.each(function(){if(this.nodeType!=1){return }if(value.constructor==Array&&/radio|checkbox/.test(this.type)){this.checked=(jQuery.inArray(this.value,value)>=0||jQuery.inArray(this.name,value)>=0)
}else{if(jQuery.nodeName(this,"select")){var values=value.constructor==Array?value:[value];jQuery("option",this).each(function(){this.selected=(jQuery.inArray(this.value,values)>=0||jQuery.inArray(this.text,values)>=0)
});if(!values.length){this.selectedIndex=-1}}else{this.value=value}}})},html:function(value){return value==undefined?(this.length?this[0].innerHTML:null):this.empty().append(value)
},replaceWith:function(value){return this.after(value).remove()},eq:function(i){return this.slice(i,i+1)
},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments))},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem)
}))},andSelf:function(){return this.add(this.prevObject)},data:function(key,value){var parts=key.split(".");
parts[1]=parts[1]?"."+parts[1]:"";if(value==null){var data=this.triggerHandler("getData"+parts[1]+"!",[parts[0]]);
if(data==undefined&&this.length){data=jQuery.data(this[0],key)}return data==null&&parts[1]?this.data(parts[0]):data
}else{return this.trigger("setData"+parts[1]+"!",[parts[0],value]).each(function(){jQuery.data(this,key,value)
})}},removeData:function(key){return this.each(function(){jQuery.removeData(this,key)})},domManip:function(args,table,reverse,callback){var clone=this.length>1,elems;
return this.each(function(){if(!elems){elems=jQuery.clean(args,this.ownerDocument);if(reverse){elems.reverse()
}}var obj=this;if(table&&jQuery.nodeName(this,"table")&&jQuery.nodeName(elems[0],"tr")){obj=this.getElementsByTagName("tbody")[0]||this.appendChild(this.ownerDocument.createElement("tbody"))
}var scripts=jQuery([]);jQuery.each(elems,function(){var elem=clone?jQuery(this).clone(true)[0]:this;
if(jQuery.nodeName(elem,"script")){scripts=scripts.add(elem)}else{if(elem.nodeType==1){scripts=scripts.add(jQuery("script",elem).remove())
}callback.call(obj,elem)}});scripts.each(evalScript)})}};jQuery.prototype.init.prototype=jQuery.prototype;
function evalScript(i,elem){if(elem.src){jQuery.ajax({url:elem.src,async:false,dataType:"script"})}else{jQuery.globalEval(elem.text||elem.textContent||elem.innerHTML||"")
}if(elem.parentNode){elem.parentNode.removeChild(elem)}}jQuery.extend=jQuery.fn.extend=function(){var target=arguments[0]||{},i=1,length=arguments.length,deep=false,options;
if(target.constructor==Boolean){deep=target;target=arguments[1]||{};i=2}if(typeof target!="object"&&typeof target!="function"){target={}
}if(length==1){target=this;i=0}for(;i<length;i++){if((options=arguments[i])!=null){for(var name in options){if(target===options[name]){continue
}if(deep&&options[name]&&typeof options[name]=="object"&&target[name]&&!options[name].nodeType){target[name]=jQuery.extend(target[name],options[name])
}else{if(options[name]!=undefined){target[name]=options[name]}}}}}return target};var expando="jQuery"+(new Date()).getTime(),uuid=0,windowData={};
var exclude=/z-?index|font-?weight|opacity|zoom|line-?height/i;jQuery.extend({noConflict:function(deep){window.$=_$;
if(deep){window.jQuery=_jQuery}return jQuery},isFunction:function(fn){return !!fn&&typeof fn!="string"&&!fn.nodeName&&fn.constructor!=Array&&/function/i.test(fn+"")
},isXMLDoc:function(elem){return elem.documentElement&&!elem.body||elem.tagName&&elem.ownerDocument&&!elem.ownerDocument.body
},globalEval:function(data){data=jQuery.trim(data);if(data){var head=document.getElementsByTagName("head")[0]||document.documentElement,script=document.createElement("script");
script.type="text/javascript";if(jQuery.browser.msie){script.text=data}else{script.appendChild(document.createTextNode(data))
}head.appendChild(script);head.removeChild(script)}},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toUpperCase()==name.toUpperCase()
},cache:{},data:function(elem,name,data){elem=elem==window?windowData:elem;var id=elem[expando];if(!id){id=elem[expando]=++uuid
}if(name&&!jQuery.cache[id]){jQuery.cache[id]={}}if(data!=undefined){jQuery.cache[id][name]=data}return name?jQuery.cache[id][name]:id
},removeData:function(elem,name){elem=elem==window?windowData:elem;var id=elem[expando];if(name){if(jQuery.cache[id]){delete jQuery.cache[id][name];
name="";for(name in jQuery.cache[id]){break}if(!name){jQuery.removeData(elem)}}}else{try{delete elem[expando]
}catch(e){if(elem.removeAttribute){elem.removeAttribute(expando)}}delete jQuery.cache[id]}},each:function(object,callback,args){if(args){if(object.length==undefined){for(var name in object){if(callback.apply(object[name],args)===false){break
}}}else{for(var i=0,length=object.length;i<length;i++){if(callback.apply(object[i],args)===false){break
}}}}else{if(object.length==undefined){for(var name in object){if(callback.call(object[name],name,object[name])===false){break
}}}else{for(var i=0,length=object.length,value=object[0];i<length&&callback.call(value,i,value)!==false;
value=object[++i]){}}}return object},prop:function(elem,value,type,i,name){if(jQuery.isFunction(value)){value=value.call(elem,i)
}return value&&value.constructor==Number&&type=="curCSS"&&!exclude.test(name)?value+"px":value},className:{add:function(elem,classNames){jQuery.each((classNames||"").split(/\s+/),function(i,className){if(elem.nodeType==1&&!jQuery.className.has(elem.className,className)){elem.className+=(elem.className?" ":"")+className
}})},remove:function(elem,classNames){if(elem.nodeType==1){elem.className=classNames!=undefined?jQuery.grep(elem.className.split(/\s+/),function(className){return !jQuery.className.has(classNames,className)
}).join(" "):""}},has:function(elem,className){return jQuery.inArray(className,(elem.className||elem).toString().split(/\s+/))>-1
}},swap:function(elem,options,callback){var old={};for(var name in options){old[name]=elem.style[name];
elem.style[name]=options[name]}callback.call(elem);for(var name in options){elem.style[name]=old[name]
}},css:function(elem,name,force){if(name=="width"||name=="height"){var val,props={position:"absolute",visibility:"hidden",display:"block"},which=name=="width"?["Left","Right"]:["Top","Bottom"];
function getWH(){val=name=="width"?elem.offsetWidth:elem.offsetHeight;var padding=0,border=0;jQuery.each(which,function(){padding+=parseFloat(jQuery.curCSS(elem,"padding"+this,true))||0;
border+=parseFloat(jQuery.curCSS(elem,"border"+this+"Width",true))||0});val-=Math.round(padding+border)
}if(jQuery(elem).is(":visible")){getWH()}else{jQuery.swap(elem,props,getWH)}return Math.max(0,val)}return jQuery.curCSS(elem,name,force)
},curCSS:function(elem,name,force){var ret;function color(elem){if(!jQuery.browser.safari){return false
}var ret=document.defaultView.getComputedStyle(elem,null);return !ret||ret.getPropertyValue("color")==""
}if(name=="opacity"&&jQuery.browser.msie){ret=jQuery.attr(elem.style,"opacity");return ret==""?"1":ret
}if(jQuery.browser.opera&&name=="display"){var save=elem.style.outline;elem.style.outline="0 solid black";
elem.style.outline=save}if(name.match(/float/i)){name=styleFloat}if(!force&&elem.style&&elem.style[name]){ret=elem.style[name]
}else{if(document.defaultView&&document.defaultView.getComputedStyle){if(name.match(/float/i)){name="float"
}name=name.replace(/([A-Z])/g,"-$1").toLowerCase();var getComputedStyle=document.defaultView.getComputedStyle(elem,null);
if(getComputedStyle&&!color(elem)){ret=getComputedStyle.getPropertyValue(name)}else{var swap=[],stack=[];
for(var a=elem;a&&color(a);a=a.parentNode){stack.unshift(a)}for(var i=0;i<stack.length;i++){if(color(stack[i])){swap[i]=stack[i].style.display;
stack[i].style.display="block"}}ret=name=="display"&&swap[stack.length-1]!=null?"none":(getComputedStyle&&getComputedStyle.getPropertyValue(name))||"";
for(var i=0;i<swap.length;i++){if(swap[i]!=null){stack[i].style.display=swap[i]}}}if(name=="opacity"&&ret==""){ret="1"
}}else{if(elem.currentStyle){var camelCase=name.replace(/\-(\w)/g,function(all,letter){return letter.toUpperCase()
});ret=elem.currentStyle[name]||elem.currentStyle[camelCase];if(!/^\d+(px)?$/i.test(ret)&&/^\d/.test(ret)){var style=elem.style.left,runtimeStyle=elem.runtimeStyle.left;
elem.runtimeStyle.left=elem.currentStyle.left;elem.style.left=ret||0;ret=elem.style.pixelLeft+"px";elem.style.left=style;
elem.runtimeStyle.left=runtimeStyle}}}}return ret},clean:function(elems,context){var ret=[];context=context||document;
if(typeof context.createElement=="undefined"){context=context.ownerDocument||context[0]&&context[0].ownerDocument||document
}jQuery.each(elems,function(i,elem){if(!elem){return }if(elem.constructor==Number){elem=elem.toString()
}if(typeof elem=="string"){elem=elem.replace(/(<(\w+)[^>]*?)\/>/g,function(all,front,tag){return tag.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?all:front+"></"+tag+">"
});var tags=jQuery.trim(elem).toLowerCase(),div=context.createElement("div");var wrap=!tags.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!tags.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||tags.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!tags.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!tags.indexOf("<td")||!tags.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!tags.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||jQuery.browser.msie&&[1,"div<div>","</div>"]||[0,"",""];
div.innerHTML=wrap[1]+elem+wrap[2];while(wrap[0]--){div=div.lastChild}if(jQuery.browser.msie){var tbody=!tags.indexOf("<table")&&tags.indexOf("<tbody")<0?div.firstChild&&div.firstChild.childNodes:wrap[1]=="<table>"&&tags.indexOf("<tbody")<0?div.childNodes:[];
for(var j=tbody.length-1;j>=0;--j){if(jQuery.nodeName(tbody[j],"tbody")&&!tbody[j].childNodes.length){tbody[j].parentNode.removeChild(tbody[j])
}}if(/^\s/.test(elem)){div.insertBefore(context.createTextNode(elem.match(/^\s*/)[0]),div.firstChild)
}}elem=jQuery.makeArray(div.childNodes)}if(elem.length===0&&(!jQuery.nodeName(elem,"form")&&!jQuery.nodeName(elem,"select"))){return 
}if(elem[0]==undefined||jQuery.nodeName(elem,"form")||elem.options){ret.push(elem)}else{ret=jQuery.merge(ret,elem)
}});return ret},attr:function(elem,name,value){if(!elem||elem.nodeType==3||elem.nodeType==8){return undefined
}var fix=jQuery.isXMLDoc(elem)?{}:jQuery.props;if(name=="selected"&&jQuery.browser.safari){elem.parentNode.selectedIndex
}if(fix[name]){if(value!=undefined){elem[fix[name]]=value}return elem[fix[name]]}else{if(jQuery.browser.msie&&name=="style"){return jQuery.attr(elem.style,"cssText",value)
}else{if(value==undefined&&jQuery.browser.msie&&jQuery.nodeName(elem,"form")&&(name=="action"||name=="method")){return elem.getAttributeNode(name).nodeValue
}else{if(elem.tagName){if(value!=undefined){if(name=="type"&&jQuery.nodeName(elem,"input")&&elem.parentNode){throw"type property can't be changed"
}elem.setAttribute(name,""+value)}if(jQuery.browser.msie&&/href|src/.test(name)&&!jQuery.isXMLDoc(elem)){return elem.getAttribute(name,2)
}return elem.getAttribute(name)}else{if(name=="opacity"&&jQuery.browser.msie){if(value!=undefined){elem.zoom=1;
elem.filter=(elem.filter||"").replace(/alpha\([^)]*\)/,"")+(parseFloat(value).toString()=="NaN"?"":"alpha(opacity="+value*100+")")
}return elem.filter&&elem.filter.indexOf("opacity=")>=0?(parseFloat(elem.filter.match(/opacity=([^)]*)/)[1])/100).toString():""
}name=name.replace(/-([a-z])/ig,function(all,letter){return letter.toUpperCase()});if(value!=undefined){elem[name]=value
}return elem[name]}}}}},trim:function(text){return(text||"").replace(/^\s+|\s+$/g,"")},makeArray:function(array){var ret=[];
if(typeof array!="array"){for(var i=0,length=array.length;i<length;i++){ret.push(array[i])}}else{ret=array.slice(0)
}return ret},inArray:function(elem,array){for(var i=0,length=array.length;i<length;i++){if(array[i]==elem){return i
}}return -1},merge:function(first,second){if(jQuery.browser.msie){for(var i=0;second[i];i++){if(second[i].nodeType!=8){first.push(second[i])
}}}else{for(var i=0;second[i];i++){first.push(second[i])}}return first},unique:function(array){var ret=[],done={};
try{for(var i=0,length=array.length;i<length;i++){var id=jQuery.data(array[i]);if(!done[id]){done[id]=true;
ret.push(array[i])}}}catch(e){ret=array}return ret},grep:function(elems,callback,inv){var ret=[];for(var i=0,length=elems.length;
i<length;i++){if(!inv&&callback(elems[i],i)||inv&&!callback(elems[i],i)){ret.push(elems[i])}}return ret
},map:function(elems,callback){var ret=[];for(var i=0,length=elems.length;i<length;i++){var value=callback(elems[i],i);
if(value!==null&&value!=undefined){if(value.constructor!=Array){value=[value]}ret=ret.concat(value)}}return ret
}});var userAgent=navigator.userAgent.toLowerCase();jQuery.browser={version:(userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[])[1],safari:/webkit/.test(userAgent),opera:/opera/.test(userAgent),msie:/msie/.test(userAgent)&&!/opera/.test(userAgent),mozilla:/mozilla/.test(userAgent)&&!/(compatible|webkit)/.test(userAgent)};
var styleFloat=jQuery.browser.msie?"styleFloat":"cssFloat";jQuery.extend({boxModel:!jQuery.browser.msie||document.compatMode=="CSS1Compat",props:{"for":"htmlFor","class":"className","float":styleFloat,cssFloat:styleFloat,styleFloat:styleFloat,innerHTML:"innerHTML",className:"className",value:"value",disabled:"disabled",checked:"checked",readonly:"readOnly",selected:"selected",maxlength:"maxLength",selectedIndex:"selectedIndex",defaultValue:"defaultValue",tagName:"tagName",nodeName:"nodeName"}});
jQuery.each({parent:function(elem){return elem.parentNode},parents:function(elem){return jQuery.dir(elem,"parentNode")
},next:function(elem){return jQuery.nth(elem,2,"nextSibling")},prev:function(elem){return jQuery.nth(elem,2,"previousSibling")
},nextAll:function(elem){return jQuery.dir(elem,"nextSibling")},prevAll:function(elem){return jQuery.dir(elem,"previousSibling")
},siblings:function(elem){return jQuery.sibling(elem.parentNode.firstChild,elem)},children:function(elem){return jQuery.sibling(elem.firstChild)
},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.makeArray(elem.childNodes)
}},function(name,fn){jQuery.fn[name]=function(selector){var ret=jQuery.map(this,fn);if(selector&&typeof selector=="string"){ret=jQuery.multiFilter(selector,ret)
}return this.pushStack(jQuery.unique(ret))}});jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(){var args=arguments;
return this.each(function(){for(var i=0,length=args.length;i<length;i++){jQuery(args[i])[original](this)
}})}});jQuery.each({removeAttr:function(name){jQuery.attr(this,name,"");if(this.nodeType==1){this.removeAttribute(name)
}},addClass:function(classNames){jQuery.className.add(this,classNames)},removeClass:function(classNames){jQuery.className.remove(this,classNames)
},toggleClass:function(classNames){jQuery.className[jQuery.className.has(this,classNames)?"remove":"add"](this,classNames)
},remove:function(selector){if(!selector||jQuery.filter(selector,[this]).r.length){jQuery("*",this).add(this).each(function(){jQuery.event.remove(this);
jQuery.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){jQuery(">*",this).remove();
while(this.firstChild){this.removeChild(this.firstChild)}}},function(name,fn){jQuery.fn[name]=function(){return this.each(fn,arguments)
}});jQuery.each(["Height","Width"],function(i,name){var type=name.toLowerCase();jQuery.fn[type]=function(size){return this[0]==window?jQuery.browser.opera&&document.body["client"+name]||jQuery.browser.safari&&window["inner"+name]||document.compatMode=="CSS1Compat"&&document.documentElement["client"+name]||document.body["client"+name]:this[0]==document?Math.max(Math.max(document.body["scroll"+name],document.documentElement["scroll"+name]),Math.max(document.body["offset"+name],document.documentElement["offset"+name])):size==undefined?(this.length?jQuery.css(this[0],type):null):this.css(type,size.constructor==String?size:size+"px")
}});var chars=jQuery.browser.safari&&parseInt(jQuery.browser.version)<417?"(?:[\\w*_-]|\\\\.)":"(?:[\\w\u0128-\uFFFF*_-]|\\\\.)",quickChild=new RegExp("^>\\s*("+chars+"+)"),quickID=new RegExp("^("+chars+"+)(#)("+chars+"+)"),quickClass=new RegExp("^([#.]?)("+chars+"*)");
jQuery.extend({expr:{"":function(a,i,m){return m[2]=="*"||jQuery.nodeName(a,m[2])},"#":function(a,i,m){return a.getAttribute("id")==m[2]
},":":{lt:function(a,i,m){return i<m[3]-0},gt:function(a,i,m){return i>m[3]-0},nth:function(a,i,m){return m[3]-0==i
},eq:function(a,i,m){return m[3]-0==i},first:function(a,i){return i==0},last:function(a,i,m,r){return i==r.length-1
},even:function(a,i){return i%2==0},odd:function(a,i){return i%2},"first-child":function(a){return a.parentNode.getElementsByTagName("*")[0]==a
},"last-child":function(a){return jQuery.nth(a.parentNode.lastChild,1,"previousSibling")==a},"only-child":function(a){return !jQuery.nth(a.parentNode.lastChild,2,"previousSibling")
},parent:function(a){return a.firstChild},empty:function(a){return !a.firstChild},contains:function(a,i,m){return(a.textContent||a.innerText||jQuery(a).text()||"").indexOf(m[3])>=0
},visible:function(a){return"hidden"!=a.type&&jQuery.css(a,"display")!="none"&&jQuery.css(a,"visibility")!="hidden"
},hidden:function(a){return"hidden"==a.type||jQuery.css(a,"display")=="none"||jQuery.css(a,"visibility")=="hidden"
},enabled:function(a){return !a.disabled},disabled:function(a){return a.disabled},checked:function(a){return a.checked
},selected:function(a){return a.selected||jQuery.attr(a,"selected")},text:function(a){return"text"==a.type
},radio:function(a){return"radio"==a.type},checkbox:function(a){return"checkbox"==a.type},file:function(a){return"file"==a.type
},password:function(a){return"password"==a.type},submit:function(a){return"submit"==a.type},image:function(a){return"image"==a.type
},reset:function(a){return"reset"==a.type},button:function(a){return"button"==a.type||jQuery.nodeName(a,"button")
},input:function(a){return/input|select|textarea|button/i.test(a.nodeName)},has:function(a,i,m){return jQuery.find(m[3],a).length
},header:function(a){return/h\d/i.test(a.nodeName)},animated:function(a){return jQuery.grep(jQuery.timers,function(fn){return a==fn.elem
}).length}}},parse:[/^(\[) *@?([\w-]+) *([!*$^~=]*) *('?"?)(.*?)\4 *\]/,/^(:)([\w-]+)\("?'?(.*?(\(.*?\))?[^(]*?)"?'?\)/,new RegExp("^([:.#]*)("+chars+"+)")],multiFilter:function(expr,elems,not){var old,cur=[];
while(expr&&expr!=old){old=expr;var f=jQuery.filter(expr,elems,not);expr=f.t.replace(/^\s*,\s*/,"");cur=not?elems=f.r:jQuery.merge(cur,f.r)
}return cur},find:function(t,context){if(typeof t!="string"){return[t]}if(context&&context.nodeType!=1&&context.nodeType!=9){return[]
}context=context||document;var ret=[context],done=[],last,nodeName;while(t&&last!=t){var r=[];last=t;
t=jQuery.trim(t);var foundToken=false;var re=quickChild;var m=re.exec(t);if(m){nodeName=m[1].toUpperCase();
for(var i=0;ret[i];i++){for(var c=ret[i].firstChild;c;c=c.nextSibling){if(c.nodeType==1&&(nodeName=="*"||c.nodeName.toUpperCase()==nodeName)){r.push(c)
}}}ret=r;t=t.replace(re,"");if(t.indexOf(" ")==0){continue}foundToken=true}else{re=/^([>+~])\s*(\w*)/i;
if((m=re.exec(t))!=null){r=[];var merge={};nodeName=m[2].toUpperCase();m=m[1];for(var j=0,rl=ret.length;
j<rl;j++){var n=m=="~"||m=="+"?ret[j].nextSibling:ret[j].firstChild;for(;n;n=n.nextSibling){if(n.nodeType==1){var id=jQuery.data(n);
if(m=="~"&&merge[id]){break}if(!nodeName||n.nodeName.toUpperCase()==nodeName){if(m=="~"){merge[id]=true
}r.push(n)}if(m=="+"){break}}}}ret=r;t=jQuery.trim(t.replace(re,""));foundToken=true}}if(t&&!foundToken){if(!t.indexOf(",")){if(context==ret[0]){ret.shift()
}done=jQuery.merge(done,ret);r=ret=[context];t=" "+t.substr(1,t.length)}else{var re2=quickID;var m=re2.exec(t);
if(m){m=[0,m[2],m[3],m[1]]}else{re2=quickClass;m=re2.exec(t)}m[2]=m[2].replace(/\\/g,"");var elem=ret[ret.length-1];
if(m[1]=="#"&&elem&&elem.getElementById&&!jQuery.isXMLDoc(elem)){var oid=elem.getElementById(m[2]);if((jQuery.browser.msie||jQuery.browser.opera)&&oid&&typeof oid.id=="string"&&oid.id!=m[2]){oid=jQuery('[@id="'+m[2]+'"]',elem)[0]
}ret=r=oid&&(!m[3]||jQuery.nodeName(oid,m[3]))?[oid]:[]}else{for(var i=0;ret[i];i++){var tag=m[1]=="#"&&m[3]?m[3]:m[1]!=""||m[0]==""?"*":m[2];
if(tag=="*"&&ret[i].nodeName.toLowerCase()=="object"){tag="param"}r=jQuery.merge(r,ret[i].getElementsByTagName(tag))
}if(m[1]=="."){r=jQuery.classFilter(r,m[2])}if(m[1]=="#"){var tmp=[];for(var i=0;r[i];i++){if(r[i].getAttribute("id")==m[2]){tmp=[r[i]];
break}}r=tmp}ret=r}t=t.replace(re2,"")}}if(t){var val=jQuery.filter(t,r);ret=r=val.r;t=jQuery.trim(val.t)
}}if(t){ret=[]}if(ret&&context==ret[0]){ret.shift()}done=jQuery.merge(done,ret);return done},classFilter:function(r,m,not){m=" "+m+" ";
var tmp=[];for(var i=0;r[i];i++){var pass=(" "+r[i].className+" ").indexOf(m)>=0;if(!not&&pass||not&&!pass){tmp.push(r[i])
}}return tmp},filter:function(t,r,not){var last;while(t&&t!=last){last=t;var p=jQuery.parse,m;for(var i=0;
p[i];i++){m=p[i].exec(t);if(m){t=t.substring(m[0].length);m[2]=m[2].replace(/\\/g,"");break}}if(!m){break
}if(m[1]==":"&&m[2]=="not"){r=isSimple.test(m[3])?jQuery.filter(m[3],r,true).r:jQuery(r).not(m[3])}else{if(m[1]=="."){r=jQuery.classFilter(r,m[2],not)
}else{if(m[1]=="["){var tmp=[],type=m[3];for(var i=0,rl=r.length;i<rl;i++){var a=r[i],z=a[jQuery.props[m[2]]||m[2]];
if(z==null||/href|src|selected/.test(m[2])){z=jQuery.attr(a,m[2])||""}if((type==""&&!!z||type=="="&&z==m[5]||type=="!="&&z!=m[5]||type=="^="&&z&&!z.indexOf(m[5])||type=="$="&&z.substr(z.length-m[5].length)==m[5]||(type=="*="||type=="~=")&&z.indexOf(m[5])>=0)^not){tmp.push(a)
}}r=tmp}else{if(m[1]==":"&&m[2]=="nth-child"){var merge={},tmp=[],test=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(m[3]=="even"&&"2n"||m[3]=="odd"&&"2n+1"||!/\D/.test(m[3])&&"0n+"+m[3]||m[3]),first=(test[1]+(test[2]||1))-0,last=test[3]-0;
for(var i=0,rl=r.length;i<rl;i++){var node=r[i],parentNode=node.parentNode,id=jQuery.data(parentNode);
if(!merge[id]){var c=1;for(var n=parentNode.firstChild;n;n=n.nextSibling){if(n.nodeType==1){n.nodeIndex=c++
}}merge[id]=true}var add=false;if(first==0){if(node.nodeIndex==last){add=true}}else{if((node.nodeIndex-last)%first==0&&(node.nodeIndex-last)/first>=0){add=true
}}if(add^not){tmp.push(node)}}r=tmp}else{var fn=jQuery.expr[m[1]];if(typeof fn=="object"){fn=fn[m[2]]
}if(typeof fn=="string"){fn=eval("false||function(a,i){return "+fn+";}")}r=jQuery.grep(r,function(elem,i){return fn(elem,i,m,r)
},not)}}}}}return{r:r,t:t}},dir:function(elem,dir){var matched=[];var cur=elem[dir];while(cur&&cur!=document){if(cur.nodeType==1){matched.push(cur)
}cur=cur[dir]}return matched},nth:function(cur,result,dir,elem){result=result||1;var num=0;for(;cur;cur=cur[dir]){if(cur.nodeType==1&&++num==result){break
}}return cur},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType==1&&(!elem||n!=elem)){r.push(n)
}}return r}});jQuery.event={add:function(elem,types,handler,data){if(elem.nodeType==3||elem.nodeType==8){return 
}if(jQuery.browser.msie&&elem.setInterval!=undefined){elem=window}if(!handler.guid){handler.guid=this.guid++
}if(data!=undefined){var fn=handler;handler=function(){return fn.apply(this,arguments)};handler.data=data;
handler.guid=fn.guid}var events=jQuery.data(elem,"events")||jQuery.data(elem,"events",{}),handle=jQuery.data(elem,"handle")||jQuery.data(elem,"handle",function(){var val;
if(typeof jQuery=="undefined"||jQuery.event.triggered){return val}val=jQuery.event.handle.apply(arguments.callee.elem,arguments);
return val});handle.elem=elem;jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");
type=parts[0];handler.type=parts[1];var handlers=events[type];if(!handlers){handlers=events[type]={};
if(!jQuery.event.special[type]||jQuery.event.special[type].setup.call(elem)===false){if(elem.addEventListener){elem.addEventListener(type,handle,false)
}else{if(elem.attachEvent){elem.attachEvent("on"+type,handle)}}}}handlers[handler.guid]=handler;jQuery.event.global[type]=true
});elem=null},guid:1,global:{},remove:function(elem,types,handler){if(elem.nodeType==3||elem.nodeType==8){return 
}var events=jQuery.data(elem,"events"),ret,index;if(events){if(types==undefined||(typeof types=="string"&&types.charAt(0)==".")){for(var type in events){this.remove(elem,type+(types||""))
}}else{if(types.type){handler=types.handler;types=types.type}jQuery.each(types.split(/\s+/),function(index,type){var parts=type.split(".");
type=parts[0];if(events[type]){if(handler){delete events[type][handler.guid]}else{for(handler in events[type]){if(!parts[1]||events[type][handler].type==parts[1]){delete events[type][handler]
}}}for(ret in events[type]){break}if(!ret){if(!jQuery.event.special[type]||jQuery.event.special[type].teardown.call(elem)===false){if(elem.removeEventListener){elem.removeEventListener(type,jQuery.data(elem,"handle"),false)
}else{if(elem.detachEvent){elem.detachEvent("on"+type,jQuery.data(elem,"handle"))}}}ret=null;delete events[type]
}}})}for(ret in events){break}if(!ret){var handle=jQuery.data(elem,"handle");if(handle){handle.elem=null
}jQuery.removeData(elem,"events");jQuery.removeData(elem,"handle")}}},trigger:function(type,data,elem,donative,extra){data=jQuery.makeArray(data||[]);
if(type.indexOf("!")>=0){type=type.slice(0,-1);var exclusive=true}if(!elem){if(this.global[type]){jQuery("*").add([window,document]).trigger(type,data)
}}else{if(elem.nodeType==3||elem.nodeType==8){return undefined}var val,ret,fn=jQuery.isFunction(elem[type]||null),event=!data[0]||!data[0].preventDefault;
if(event){data.unshift(this.fix({type:type,target:elem}))}data[0].type=type;if(exclusive){data[0].exclusive=true
}if(jQuery.isFunction(jQuery.data(elem,"handle"))){val=jQuery.data(elem,"handle").apply(elem,data)}if(!fn&&elem["on"+type]&&elem["on"+type].apply(elem,data)===false){val=false
}if(event){data.shift()}if(extra&&jQuery.isFunction(extra)){ret=extra.apply(elem,val==null?data:data.concat(val));
if(ret!==undefined){val=ret}}if(fn&&donative!==false&&val!==false&&!(jQuery.nodeName(elem,"a")&&type=="click")){this.triggered=true;
try{elem[type]()}catch(e){}}this.triggered=false}return val},handle:function(event){var val;event=jQuery.event.fix(event||window.event||{});
var parts=event.type.split(".");event.type=parts[0];var handlers=jQuery.data(this,"events")&&jQuery.data(this,"events")[event.type],args=Array.prototype.slice.call(arguments,1);
args.unshift(event);for(var j in handlers){var handler=handlers[j];args[0].handler=handler;args[0].data=handler.data;
if(!parts[1]&&!event.exclusive||handler.type==parts[1]){var ret=handler.apply(this,args);if(val!==false){val=ret
}if(ret===false){event.preventDefault();event.stopPropagation()}}}if(jQuery.browser.msie){event.target=event.preventDefault=event.stopPropagation=event.handler=event.data=null
}return val},fix:function(event){var originalEvent=event;event=jQuery.extend({},originalEvent);event.preventDefault=function(){if(originalEvent.preventDefault){originalEvent.preventDefault()
}originalEvent.returnValue=false};event.stopPropagation=function(){if(originalEvent.stopPropagation){originalEvent.stopPropagation()
}originalEvent.cancelBubble=true};if(!event.target){event.target=event.srcElement||document}if(event.target.nodeType==3){event.target=originalEvent.target.parentNode
}if(!event.relatedTarget&&event.fromElement){event.relatedTarget=event.fromElement==event.target?event.toElement:event.fromElement
}if(event.pageX==null&&event.clientX!=null){var doc=document.documentElement,body=document.body;event.pageX=event.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc.clientLeft||0);
event.pageY=event.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc.clientTop||0)}if(!event.which&&((event.charCode||event.charCode===0)?event.charCode:event.keyCode)){event.which=event.charCode||event.keyCode
}if(!event.metaKey&&event.ctrlKey){event.metaKey=event.ctrlKey}if(!event.which&&event.button){event.which=(event.button&1?1:(event.button&2?3:(event.button&4?2:0)))
}return event},special:{ready:{setup:function(){bindReady();return },teardown:function(){return }},mouseenter:{setup:function(){if(jQuery.browser.msie){return false
}jQuery(this).bind("mouseover",jQuery.event.special.mouseenter.handler);return true},teardown:function(){if(jQuery.browser.msie){return false
}jQuery(this).unbind("mouseover",jQuery.event.special.mouseenter.handler);return true},handler:function(event){if(withinElement(event,this)){return true
}arguments[0].type="mouseenter";return jQuery.event.handle.apply(this,arguments)}},mouseleave:{setup:function(){if(jQuery.browser.msie){return false
}jQuery(this).bind("mouseout",jQuery.event.special.mouseleave.handler);return true},teardown:function(){if(jQuery.browser.msie){return false
}jQuery(this).unbind("mouseout",jQuery.event.special.mouseleave.handler);return true},handler:function(event){if(withinElement(event,this)){return true
}arguments[0].type="mouseleave";return jQuery.event.handle.apply(this,arguments)}}}};jQuery.fn.extend({bind:function(type,data,fn){return type=="unload"?this.one(type,data,fn):this.each(function(){jQuery.event.add(this,type,fn||data,fn&&data)
})},one:function(type,data,fn){return this.each(function(){jQuery.event.add(this,type,function(event){jQuery(this).unbind(event);
return(fn||data).apply(this,arguments)},fn&&data)})},unbind:function(type,fn){return this.each(function(){jQuery.event.remove(this,type,fn)
})},trigger:function(type,data,fn){return this.each(function(){jQuery.event.trigger(type,data,this,true,fn)
})},triggerHandler:function(type,data,fn){if(this[0]){return jQuery.event.trigger(type,data,this[0],false,fn)
}return undefined},toggle:function(){var args=arguments;return this.click(function(event){this.lastToggle=0==this.lastToggle?1:0;
event.preventDefault();return args[this.lastToggle].apply(this,arguments)||false})},hover:function(fnOver,fnOut){return this.bind("mouseenter",fnOver).bind("mouseleave",fnOut)
},ready:function(fn){bindReady();if(jQuery.isReady){fn.call(document,jQuery)}else{jQuery.readyList.push(function(){return fn.call(this,jQuery)
})}return this}});jQuery.extend({isReady:false,readyList:[],ready:function(){if(!jQuery.isReady){jQuery.isReady=true;
if(jQuery.readyList){jQuery.each(jQuery.readyList,function(){this.apply(document)});jQuery.readyList=null
}jQuery(document).triggerHandler("ready")}}});var readyBound=false;function bindReady(){if(readyBound){return 
}readyBound=true;if(document.addEventListener&&!jQuery.browser.opera){document.addEventListener("DOMContentLoaded",jQuery.ready,false)
}if(jQuery.browser.msie&&window==top){(function(){if(jQuery.isReady){return }try{document.documentElement.doScroll("left")
}catch(error){setTimeout(arguments.callee,0);return }jQuery.ready()})()}if(jQuery.browser.opera){document.addEventListener("DOMContentLoaded",function(){if(jQuery.isReady){return 
}for(var i=0;i<document.styleSheets.length;i++){if(document.styleSheets[i].disabled){setTimeout(arguments.callee,0);
return }}jQuery.ready()},false)}if(jQuery.browser.safari){var numStyles;(function(){if(jQuery.isReady){return 
}if(document.readyState!="loaded"&&document.readyState!="complete"){setTimeout(arguments.callee,0);return 
}if(numStyles===undefined){numStyles=jQuery("style, link[rel=stylesheet]").length}if(document.styleSheets.length!=numStyles){setTimeout(arguments.callee,0);
return }jQuery.ready()})()}jQuery.event.add(window,"load",jQuery.ready)}jQuery.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,change,select,submit,keydown,keypress,keyup,error").split(","),function(i,name){jQuery.fn[name]=function(fn){return fn?this.bind(name,fn):this.trigger(name)
}});var withinElement=function(event,elem){var parent=event.relatedTarget;while(parent&&parent!=elem){try{parent=parent.parentNode
}catch(error){parent=elem}}return parent==elem};jQuery(window).bind("unload",function(){jQuery("*").add(document).unbind()
});jQuery.fn.extend({load:function(url,params,callback){if(jQuery.isFunction(url)){return this.bind("load",url)
}var off=url.indexOf(" ");if(off>=0){var selector=url.slice(off,url.length);url=url.slice(0,off)}callback=callback||function(){};
var type="GET";if(params){if(jQuery.isFunction(params)){callback=params;params=null}else{params=jQuery.param(params);
type="POST"}}var self=this;jQuery.ajax({url:url,type:type,dataType:"html",data:params,complete:function(res,status){if(status=="success"||status=="notmodified"){self.html(selector?jQuery("<div/>").append(res.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(selector):res.responseText)
}self.each(callback,[res.responseText,status,res])}});return this},serialize:function(){return jQuery.param(this.serializeArray())
},serializeArray:function(){return this.map(function(){return jQuery.nodeName(this,"form")?jQuery.makeArray(this.elements):this
}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password/i.test(this.type))
}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:val.constructor==Array?jQuery.map(val,function(val,i){return{name:elem.name,value:val}
}):{name:elem.name,value:val}}).get()}});jQuery.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(i,o){jQuery.fn[o]=function(f){return this.bind(o,f)
}});var jsc=(new Date).getTime();jQuery.extend({get:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;
data=null}return jQuery.ajax({type:"GET",url:url,data:data,success:callback,dataType:type})},getScript:function(url,callback){return jQuery.get(url,null,callback,"script")
},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json")},post:function(url,data,callback,type){if(jQuery.isFunction(data)){callback=data;
data={}}return jQuery.ajax({type:"POST",url:url,data:data,success:callback,dataType:type})},ajaxSetup:function(settings){jQuery.extend(jQuery.ajaxSettings,settings)
},ajaxSettings:{global:true,type:"GET",timeout:0,contentType:"application/x-www-form-urlencoded",processData:true,async:true,data:null,username:null,password:null,accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(s){var jsonp,jsre=/=\?(&|$)/g,status,data;
s=jQuery.extend(true,s,jQuery.extend(true,{},jQuery.ajaxSettings,s));if(s.data&&s.processData&&typeof s.data!="string"){s.data=jQuery.param(s.data)
}if(s.dataType=="jsonp"){if(s.type.toLowerCase()=="get"){if(!s.url.match(jsre)){s.url+=(s.url.match(/\?/)?"&":"?")+(s.jsonp||"callback")+"=?"
}}else{if(!s.data||!s.data.match(jsre)){s.data=(s.data?s.data+"&":"")+(s.jsonp||"callback")+"=?"}}s.dataType="json"
}if(s.dataType=="json"&&(s.data&&s.data.match(jsre)||s.url.match(jsre))){jsonp="jsonp"+jsc++;if(s.data){s.data=(s.data+"").replace(jsre,"="+jsonp+"$1")
}s.url=s.url.replace(jsre,"="+jsonp+"$1");s.dataType="script";window[jsonp]=function(tmp){data=tmp;success();
complete();window[jsonp]=undefined;try{delete window[jsonp]}catch(e){}if(head){head.removeChild(script)
}}}if(s.dataType=="script"&&s.cache==null){s.cache=false}if(s.cache===false&&s.type.toLowerCase()=="get"){var ts=(new Date()).getTime();
var ret=s.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+ts+"$2");s.url=ret+((ret==s.url)?(s.url.match(/\?/)?"&":"?")+"_="+ts:"")
}if(s.data&&s.type.toLowerCase()=="get"){s.url+=(s.url.match(/\?/)?"&":"?")+s.data;s.data=null}if(s.global&&!jQuery.active++){jQuery.event.trigger("ajaxStart")
}if((!s.url.indexOf("http")||!s.url.indexOf("//"))&&s.dataType=="script"&&s.type.toLowerCase()=="get"){var head=document.getElementsByTagName("head")[0];
var script=document.createElement("script");script.src=s.url;if(s.scriptCharset){script.charset=s.scriptCharset
}if(!jsonp){var done=false;script.onload=script.onreadystatechange=function(){if(!done&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){done=true;
success();complete();head.removeChild(script)}}}head.appendChild(script);return undefined}var requestDone=false;
var xml=window.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest();xml.open(s.type,s.url,s.async,s.username,s.password);
try{if(s.data){xml.setRequestHeader("Content-Type",s.contentType)}if(s.ifModified){xml.setRequestHeader("If-Modified-Since",jQuery.lastModified[s.url]||"Thu, 01 Jan 1970 00:00:00 GMT")
}xml.setRequestHeader("X-Requested-With","XMLHttpRequest");xml.setRequestHeader("Accept",s.dataType&&s.accepts[s.dataType]?s.accepts[s.dataType]+", */*":s.accepts._default)
}catch(e){}if(s.beforeSend){s.beforeSend(xml)}if(s.global){jQuery.event.trigger("ajaxSend",[xml,s])}var onreadystatechange=function(isTimeout){if(!requestDone&&xml&&(xml.readyState==4||isTimeout=="timeout")){requestDone=true;
if(ival){clearInterval(ival);ival=null}status=isTimeout=="timeout"&&"timeout"||!jQuery.httpSuccess(xml)&&"error"||s.ifModified&&jQuery.httpNotModified(xml,s.url)&&"notmodified"||"success";
if(status=="success"){try{data=jQuery.httpData(xml,s.dataType)}catch(e){status="parsererror"}}if(status=="success"){var modRes;
try{modRes=xml.getResponseHeader("Last-Modified")}catch(e){}if(s.ifModified&&modRes){jQuery.lastModified[s.url]=modRes
}if(!jsonp){success()}}else{jQuery.handleError(s,xml,status)}complete();if(s.async){xml=null}}};if(s.async){var ival=setInterval(onreadystatechange,13);
if(s.timeout>0){setTimeout(function(){if(xml){xml.abort();if(!requestDone){onreadystatechange("timeout")
}}},s.timeout)}}try{xml.send(s.data)}catch(e){jQuery.handleError(s,xml,null,e)}if(!s.async){onreadystatechange()
}function success(){if(s.success){s.success(data,status)}if(s.global){jQuery.event.trigger("ajaxSuccess",[xml,s])
}}function complete(){if(s.complete){s.complete(xml,status)}if(s.global){jQuery.event.trigger("ajaxComplete",[xml,s])
}if(s.global&&!--jQuery.active){jQuery.event.trigger("ajaxStop")}}return xml},handleError:function(s,xml,status,e){if(s.error){s.error(xml,status,e)
}if(s.global){jQuery.event.trigger("ajaxError",[xml,s,e])}},active:0,httpSuccess:function(r){try{return !r.status&&location.protocol=="file:"||(r.status>=200&&r.status<300)||r.status==304||r.status==1223||jQuery.browser.safari&&r.status==undefined
}catch(e){}return false},httpNotModified:function(xml,url){try{var xmlRes=xml.getResponseHeader("Last-Modified");
return xml.status==304||xmlRes==jQuery.lastModified[url]||jQuery.browser.safari&&xml.status==undefined
}catch(e){}return false},httpData:function(r,type){var ct=r.getResponseHeader("content-type");var xml=type=="xml"||!type&&ct&&ct.indexOf("xml")>=0;
var data=xml?r.responseXML:r.responseText;if(xml&&data.documentElement.tagName=="parsererror"){throw"parsererror"
}if(type=="script"){jQuery.globalEval(data)}if(type=="json"){data=eval("("+data+")")}return data},param:function(a){var s=[];
if(a.constructor==Array||a.jquery){jQuery.each(a,function(){s.push(encodeURIComponent(this.name)+"="+encodeURIComponent(this.value))
})}else{for(var j in a){if(a[j]&&a[j].constructor==Array){jQuery.each(a[j],function(){s.push(encodeURIComponent(j)+"="+encodeURIComponent(this))
})}else{s.push(encodeURIComponent(j)+"="+encodeURIComponent(a[j]))}}}return s.join("&").replace(/%20/g,"+")
}});jQuery.fn.extend({show:function(speed,callback){return speed?this.animate({height:"show",width:"show",opacity:"show"},speed,callback):this.filter(":hidden").each(function(){this.style.display=this.oldblock||"";
if(jQuery.css(this,"display")=="none"){var elem=jQuery("<"+this.tagName+" />").appendTo("body");this.style.display=elem.css("display");
if(this.style.display=="none"){this.style.display="block"}elem.remove()}}).end()},hide:function(speed,callback){return speed?this.animate({height:"hide",width:"hide",opacity:"hide"},speed,callback):this.filter(":visible").each(function(){this.oldblock=this.oldblock||jQuery.css(this,"display");
this.style.display="none"}).end()},_toggle:jQuery.fn.toggle,toggle:function(fn,fn2){return jQuery.isFunction(fn)&&jQuery.isFunction(fn2)?this._toggle(fn,fn2):fn?this.animate({height:"toggle",width:"toggle",opacity:"toggle"},fn,fn2):this.each(function(){jQuery(this)[jQuery(this).is(":hidden")?"show":"hide"]()
})},slideDown:function(speed,callback){return this.animate({height:"show"},speed,callback)},slideUp:function(speed,callback){return this.animate({height:"hide"},speed,callback)
},slideToggle:function(speed,callback){return this.animate({height:"toggle"},speed,callback)},fadeIn:function(speed,callback){return this.animate({opacity:"show"},speed,callback)
},fadeOut:function(speed,callback){return this.animate({opacity:"hide"},speed,callback)},fadeTo:function(speed,to,callback){return this.animate({opacity:to},speed,callback)
},animate:function(prop,speed,easing,callback){var optall=jQuery.speed(speed,easing,callback);return this[optall.queue===false?"each":"queue"](function(){if(this.nodeType!=1){return false
}var opt=jQuery.extend({},optall);var hidden=jQuery(this).is(":hidden"),self=this;for(var p in prop){if(prop[p]=="hide"&&hidden||prop[p]=="show"&&!hidden){return jQuery.isFunction(opt.complete)&&opt.complete.apply(this)
}if(p=="height"||p=="width"){opt.display=jQuery.css(this,"display");opt.overflow=this.style.overflow}}if(opt.overflow!=null){this.style.overflow="hidden"
}opt.curAnim=jQuery.extend({},prop);jQuery.each(prop,function(name,val){var e=new jQuery.fx(self,opt,name);
if(/toggle|show|hide/.test(val)){e[val=="toggle"?hidden?"show":"hide":val](prop)}else{var parts=val.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),start=e.cur(true)||0;
if(parts){var end=parseFloat(parts[2]),unit=parts[3]||"px";if(unit!="px"){self.style[name]=(end||1)+unit;
start=((end||1)/e.cur(true))*start;self.style[name]=start+unit}if(parts[1]){end=((parts[1]=="-="?-1:1)*end)+start
}e.custom(start,end,unit)}else{e.custom(start,val,"")}}});return true})},queue:function(type,fn){if(jQuery.isFunction(type)||(type&&type.constructor==Array)){fn=type;
type="fx"}if(!type||(typeof type=="string"&&!fn)){return queue(this[0],type)}return this.each(function(){if(fn.constructor==Array){queue(this,type,fn)
}else{queue(this,type).push(fn);if(queue(this,type).length==1){fn.apply(this)}}})},stop:function(clearQueue,gotoEnd){var timers=jQuery.timers;
if(clearQueue){this.queue([])}this.each(function(){for(var i=timers.length-1;i>=0;i--){if(timers[i].elem==this){if(gotoEnd){timers[i](true)
}timers.splice(i,1)}}});if(!gotoEnd){this.dequeue()}return this}});var queue=function(elem,type,array){if(!elem){return undefined
}type=type||"fx";var q=jQuery.data(elem,type+"queue");if(!q||array){q=jQuery.data(elem,type+"queue",array?jQuery.makeArray(array):[])
}return q};jQuery.fn.dequeue=function(type){type=type||"fx";return this.each(function(){var q=queue(this,type);
q.shift();if(q.length){q[0].apply(this)}})};jQuery.extend({speed:function(speed,easing,fn){var opt=speed&&speed.constructor==Object?speed:{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&easing.constructor!=Function&&easing};
opt.duration=(opt.duration&&opt.duration.constructor==Number?opt.duration:{slow:600,fast:200}[opt.duration])||400;
opt.old=opt.complete;opt.complete=function(){if(opt.queue!==false){jQuery(this).dequeue()}if(jQuery.isFunction(opt.old)){opt.old.apply(this)
}};return opt},easing:{linear:function(p,n,firstNum,diff){return firstNum+diff*p},swing:function(p,n,firstNum,diff){return((-Math.cos(p*Math.PI)/2)+0.5)*diff+firstNum
}},timers:[],timerId:null,fx:function(elem,options,prop){this.options=options;this.elem=elem;this.prop=prop;
if(!options.orig){options.orig={}}}});jQuery.fx.prototype={update:function(){if(this.options.step){this.options.step.apply(this.elem,[this.now,this])
}(jQuery.fx.step[this.prop]||jQuery.fx.step._default)(this);if(this.prop=="height"||this.prop=="width"){this.elem.style.display="block"
}},cur:function(force){if(this.elem[this.prop]!=null&&this.elem.style[this.prop]==null){return this.elem[this.prop]
}var r=parseFloat(jQuery.css(this.elem,this.prop,force));return r&&r>-10000?r:parseFloat(jQuery.curCSS(this.elem,this.prop))||0
},custom:function(from,to,unit){this.startTime=(new Date()).getTime();this.start=from;this.end=to;this.unit=unit||this.unit||"px";
this.now=this.start;this.pos=this.state=0;this.update();var self=this;function t(gotoEnd){return self.step(gotoEnd)
}t.elem=this.elem;jQuery.timers.push(t);if(jQuery.timerId==null){jQuery.timerId=setInterval(function(){var timers=jQuery.timers;
for(var i=0;i<timers.length;i++){if(!timers[i]()){timers.splice(i--,1)}}if(!timers.length){clearInterval(jQuery.timerId);
jQuery.timerId=null}},13)}},show:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);
this.options.show=true;this.custom(0,this.cur());if(this.prop=="width"||this.prop=="height"){this.elem.style[this.prop]="1px"
}jQuery(this.elem).show()},hide:function(){this.options.orig[this.prop]=jQuery.attr(this.elem.style,this.prop);
this.options.hide=true;this.custom(this.cur(),0)},step:function(gotoEnd){var t=(new Date()).getTime();
if(gotoEnd||t>this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();
this.options.curAnim[this.prop]=true;var done=true;for(var i in this.options.curAnim){if(this.options.curAnim[i]!==true){done=false
}}if(done){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;
if(jQuery.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){this.elem.style.display="none"
}if(this.options.hide||this.options.show){for(var p in this.options.curAnim){jQuery.attr(this.elem.style,p,this.options.orig[p])
}}}if(done&&jQuery.isFunction(this.options.complete)){this.options.complete.apply(this.elem)}return false
}else{var n=t-this.startTime;this.state=n/this.options.duration;this.pos=jQuery.easing[this.options.easing||(jQuery.easing.swing?"swing":"linear")](this.state,n,0,1,this.options.duration);
this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};jQuery.fx.step={scrollLeft:function(fx){fx.elem.scrollLeft=fx.now
},scrollTop:function(fx){fx.elem.scrollTop=fx.now},opacity:function(fx){jQuery.attr(fx.elem.style,"opacity",fx.now)
},_default:function(fx){fx.elem.style[fx.prop]=fx.now+fx.unit}};jQuery.fn.offset=function(){var left=0,top=0,elem=this[0],results;
if(elem){with(jQuery.browser){var parent=elem.parentNode,offsetChild=elem,offsetParent=elem.offsetParent,doc=elem.ownerDocument,safari2=safari&&parseInt(version)<522&&!/adobeair/i.test(userAgent),fixed=jQuery.css(elem,"position")=="fixed";
if(elem.getBoundingClientRect){var box=elem.getBoundingClientRect();add(box.left+Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),box.top+Math.max(doc.documentElement.scrollTop,doc.body.scrollTop));
add(-doc.documentElement.clientLeft,-doc.documentElement.clientTop)}else{add(elem.offsetLeft,elem.offsetTop);
while(offsetParent){add(offsetParent.offsetLeft,offsetParent.offsetTop);if(mozilla&&!/^t(able|d|h)$/i.test(offsetParent.tagName)||safari&&!safari2){border(offsetParent)
}if(!fixed&&jQuery.css(offsetParent,"position")=="fixed"){fixed=true}offsetChild=/^body$/i.test(offsetParent.tagName)?offsetChild:offsetParent;
offsetParent=offsetParent.offsetParent}while(parent&&parent.tagName&&!/^body|html$/i.test(parent.tagName)){if(!/^inline|table.*$/i.test(jQuery.css(parent,"display"))){add(-parent.scrollLeft,-parent.scrollTop)
}if(mozilla&&jQuery.css(parent,"overflow")!="visible"){border(parent)}parent=parent.parentNode}if((safari2&&(fixed||jQuery.css(offsetChild,"position")=="absolute"))||(mozilla&&jQuery.css(offsetChild,"position")!="absolute")){add(-doc.body.offsetLeft,-doc.body.offsetTop)
}if(fixed){add(Math.max(doc.documentElement.scrollLeft,doc.body.scrollLeft),Math.max(doc.documentElement.scrollTop,doc.body.scrollTop))
}}results={top:top,left:left}}}function border(elem){add(jQuery.curCSS(elem,"borderLeftWidth",true),jQuery.curCSS(elem,"borderTopWidth",true))
}function add(l,t){left+=parseInt(l)||0;top+=parseInt(t)||0}return results}})();var $j=jQuery.noConflict();function analyticsEvent(B,C){var A=s_gi(s_account);A.linkTrackVars="events,eVar5,eVar2";A.linkTrackEvents=B;
A.events=B;A.eVar5=aHash;A.eVar2=C;A.tl(true,"o",C)}function analyticsPromoClick(B){var A=s_gi(s_account);
A.linkTrackVars="products,events,eVar15";A.linkTrackEvents="event18";A.events="event18";A.products=B;
A.eVar15=B;A.tl(true,"o","Promo Click")};var countdownTimer=new Object();var commentshowreply=new Object();NSObject=Class.create();Object.extend(NSObject.prototype,{initialize:function(){},namespace:function(C){if(!C||!C.length){return null
}if(typeof C=="object"){for(var B=0;B<C.length;B++){this.namespace.apply(this,[C[B]])}return }var D=C.split(".");
var A=this;for(var B=0;B<D.length;++B){A[D[B]]=A[D[B]]||window[D[B]]||{};A=A[D[B]]}return A}});[].indexOf||(Array.prototype.indexOf=function(B,D){D=(D==null)?0:D;
var A=this.length;for(var C=D;C<A;C++){if(this[C]==B){return C}}return -1});function getElementsByClassName(C){if(document.getElementsByTagName){var B=document.getElementsByTagName("*");
var E=new RegExp("/b^|"+C+"|$/b");elem=new Array();var D=0;for(var A=0;A<B.length;A++){if(B[A].className){if(E.test(B[A].className)){elem[D]=B[A];
D++}}}return elem}else{return false}}function getCookieVal(B){var A=document.cookie.indexOf(";",B);if(A==-1){A=document.cookie.length
}return unescape(document.cookie.substring(B,A))}function GetCookie(D){var B=D+"=";var F=B.length;var A=document.cookie.length;
var E=0;while(E<A){var C=E+F;if(document.cookie.substring(E,C)==B){return getCookieVal(C)}E=document.cookie.indexOf(" ",E)+1;
if(E==0){break}}return null}function SetCookie(B,H){var G=SetCookie.arguments;var E=SetCookie.arguments.length;
var C=(E>2)?G[2]:null;if(C){var D=new Date();D.setTime(D.getTime()+(C*24*60*60*1000));var C="; expires="+D.toGMTString()
}var I=(E>3)?G[3]:null;var F=(E>4)?G[4]:null;var A=(E>5)?G[5]:false;document.cookie=B+"="+escape(H)+((C==null)?"":("; expires="+C))+((I==null)?"":("; path="+I))+((F==null)?"":("; domain="+F))+((A==true)?"; secure":"")
}function startCountdown(A,B,C){$(A).innerHTML=B;commentshowreply[A]=C;if(!countdownTimer[A]){countdownTimer[A]=setInterval("updateCountdown('"+A+"')",1000)
}}function updateCountdown(C){if(C==null){clearInterval(countdownTimer[C]);countdownTimer[C]=null}else{var F=$(C);
if(F){current=parseInt(F.innerHTML);current--;if(current<=0){F.innerHTML=0;clearInterval(countdownTimer[C]);
countdownTimer[C]=null;var G=C.replace(/countdown/,"");var B=$("cbody"+G);var E=B.innerHTML.replace(/^[\s\S]*Seconds\)<\/a>/i,"");
E=E.replace(/\<a [^<]*\[reply\].*$/i,"");var D='<div class="c-body-inside" id="cbody-inside-'+G+'">'+E;
if(commentshowreply[C]){var A=B.innerHTML.replace(/^[\s\S]*setupcreply\(/i,"setupcreply(");A=A.replace(/\)\)[\s\S]*$/mi,")");
D+='<a href="?creplyto='+G+'#creplyform" onclick="return('+A+')" class="c-reply">[reply]</a>'}D+="</div>";
B.innerHTML=D;$("c"+G).className="c-normal"}else{F.innerHTML=current}}}}function initPreview(){setInterval("updateAll()",1000)
}function updateAll(){$("titlepreview").innerHTML=$("title").value;$("bodytextpreview").innerHTML=$("bodytext").value;
charCounter($("title"),75,$("titleCounter"));charCounter($("bodytext"),350,$("bodytextCounter"))}function charLimit(C,B){var A=C.value.length;
if(A>=B){C.value=C.value.substring(0,B)}}function charCounter(D,B,C){var A=D.value.length;if(A>=B){D.value=D.value.substring(0,B)
}C.innerHTML=B-D.value.length}function charCounterPreview(E,A,C,D,B){charCounter(E,A,C);if(B&&E.value.length==0){D.innerHTML="&nbsp;"
}else{D.innerHTML=E.value}}function updateTopicPreview(C,A){var B=$("topicpreview");B.innerHTML=C;B.href="/"+A
}function unpopp(){poppDiv=$("poppDiv");if(poppDiv){poppDiv.parentNode.removeChild(poppDiv);poppDiv=false
}}function popp(B,A){if($("lbContent")){valid.deactivate()}unpopp();$("enclosure"+B).innerHTML+='<div id="poppDiv" class="inline-warning"><div><p><strong>Make your vote count!</strong> To '+A+', <a href="#" onclick="return dologin();">login</a> or <a href="/register/">join Digg</a> for free.</p><a href="javascript:unpopp()"><img src="/img/close.gif" class="close" width="22" height="22" alt="Close" /></a></div></div>';
analyticsEvent("event12","login lightbox");return(false)}function dologin(){jspost("/login",{returnpage:window.location.pathname});
return false}function popr(B,A){if($("lbContent")){valid.deactivate()}unpopp();$("enclosure"+B).innerHTML+='<div id="poppDiv" class="inline-warning"><div><p><strong>Make your vote count!</strong> To '+A+', <a href="/remote-login">login</a> or <a href="/remote-register">join Digg</a> for free.</p><a href="javascript:unpopp()"><img src="/img/close.gif" class="close" width="22" height="22" alt="Close" /></a></div></div>';
analyticsEvent("event12","login lightbox");return(false)}function poppd(A){return(popp(A,"digg"))}function poppdr(A){return(popr(A,"digg"))
}function poppe(A){return(popp(A,"email stories"))}function poppr(A){return(popp(A,"bury stories"))}function poppb(A){return(popp(A,"blog stories"))
}function popps(A){return(popp(A,"share stories"))}function tdw(A){return(toggleDisclosureWidget(A))}function toggleLogin(){if($j("#login-form").css("display")=="none"){$j(".side-header").css("display","none");
$j("#login-form").fadeIn(function(){$j("#side-username").focus()})}else{$j("#login-form").fadeOut(function(){$j(".side-header").css("display","block")
})}return false}function topsearch(){$("top-submit").disabled=true;return true}diggburylock=0;var timeid=new Array();
function checkIE(){var A=navigator.userAgent;var B=A.indexOf("MSIE");if(B>-1){return true}else{return false
}}function flash(A){timeid[A]=window.setTimeout("fadeInSpy(7, '"+A+"')",100)}function alreadydug(){alert("You have already dug this item")
}function myclearTimeout(A){clearTimeout(timeid[A])}var digging=-9;function postdigg(D,C,A,B){$j("#diglink"+D+",lightbox-digg-it").html('<a href="javascript:void(0)">digg it</a>');
if(digging==D){alert("You have already dugg this story");return }else{digging=D}$j("#lightbox-diggs").animate({opacity:0});
$j("#diggs-strong-"+D).animate({opacity:0},function(){new Ajax.Request("/diginfull",{method:"post",parameters:"id="+C+"&row="+D+"&digcheck="+A+"&type="+B+"&loc="+pagetype,onSuccess:function(G){var F=G.responseText;
var I=$j("#diggs-strong-"+D+", #lightbox-diggs");if(F.substr(0,6)=="ERROR:"){alert(F.replace(/ERROR:/,""))
}else{$j("#burytool"+D+", #burymenul, #burymenum").hide();var E=F.split(/~--~/);if(E[1]==2){var H=$j("#diggs"+D);
H.html(H.html().replace(/digg\b/,"diggs"));I=$j("#diggs-strong-"+D+", #lightbox-diggs")}I.text(E[1]);
$j("#diglink"+D+", #lightbox-digg-it").addClass("dugg-it").html("<span>dugg!</span>");$j("#fave"+D+", #favmenul, #favmenum").show();
analyticsEvent("event14","digg")}I.animate({opacity:100})}})})}function dig(C,B,A){postdigg(C,B,A,"s")
}function pcdig(C,B,A){postdigg(C,B,A,"p")}function pcedig(B,C,A){postdigg(B,C,A,"e")}ColorSpy=new Array();
ColorSpy[1]="#FFFFFF";ColorSpy[2]="#F1F3F5";ColorSpy[3]="#EBEEF1";ColorSpy[4]="#DEE2E7";ColorSpy[5]="#CCD5DB";
ColorSpy[6]="#BCC7CF";ColorSpy[7]="#ACB9C4";function fadeInSpy(A,B){if(A>=1){$("main"+B).style.backgroundColor=ColorSpy[A];
if(A>1){A-=1;timeid[B]=window.setTimeout("fadeInSpy("+A+",'"+B+"')",100)}else{A-=1;$("main"+B).style.backgroundColor="transparent";
myclearTimeout(B)}}}function openSpellCheckerComment(){var A=$("comment");var B=new spellChecker(A);B.openChecker()
}allowblock=true;function cb(E,C,B){if(confirm("Are you sure you want to block user "+C+" ?")){allowblock=false;
var D='<form id="newblock" action="/userblock" method="post"><input type="hidden" name="id" value="'+E+'" /><input type="hidden" name="check" value="'+B+'" /></form>';
var A=$("container");A.innerHTML+=D;$("newblock").submit()}return false}reports=new Array();function rjp(E,B,D,C,A){if(reports[D]){return 
}reports[D]=1;new Ajax.Request("/reportj",{method:"post",parameters:"id="+E+"&code="+B+"&check="+A,onSuccess:function(F){if(C==1){$("enclosure"+D).className+=" news-buried";
$("diglink"+D).className="buried-it";$("diglink"+D).innerHTML="<span>buried</span>";$j("#burymenum").css("display","none");
$j("#burymenul").css("display","none")}else{$j("#enclosure"+D).fadeTo(1000,0.05);$j("#enclosure"+D).slideUp()
}analyticsEvent("event15","bury")}})}function showCaptcha(A){var B=$("commentcaptcha");B.onclick=null;
B.style.display="block";if(!(B.innerHTML.length)){$("submitbutton").disabled=true;new Ajax.Request("/get_captcha",{method:"get",parameters:"keyname="+A,onSuccess:function(C){$("commentcaptcha").innerHTML=C.responseText;
$("submitbutton").disabled=false}})}}function enablebutton(C,D,E){var B=E.value;D.disabled=false;if(B.length>0){C.disabled=false
}else{C.disabled=true}var A=$("commentcaptcha")}function getdpage(C,B,A){new Ajax.Request(window.location.pathname,{method:"post",parameters:"getdpage=1&id="+C+"&page="+B+"&friends="+A,onSuccess:function(D){$("diggers").innerHTML=D.responseText
}});return false}function dismiss(C,A,B){SetCookie("dismiss-"+A,B,365);$(C).style.display="none";return false
}function diffclick(){window.location.href=mydiffref;return false}function fave(story,which,check,type){var url="/ajax/favorites/fave";
if(type==1){url="/ajax/favorites/favepodcast"}$j.ajax({url:url,type:"post",dataType:"json",data:{token:check,item:story},success:function(json){$j("a .tool .faved").removeAttr("onclick");
$j("a .tool .faved").attr("class","tool fave");$j("#fave"+which).attr("class","tool faved");$j("#fave"+which).attr("onclick","");
$j("#fave"+which).attr("href",mydiffref+"/history/favorites");$j("#fave"+which).html("Favorite!");analyticsEvent("event17","favorite")
},error:function(xml){var json=eval("("+xml.responseText+")")}});return false}function unfave(B,A){analyticsEvent("event12","unfavorite");
jspost("/unfave",{item:B,check:A});return false}function addtopic(){$("addtopic").submit();return false
}allowpost=true;function jspost(A,C){if(allowpost){allowpost=false;var B='<form id="newpost" action="'+A+'" method="post">';
for(v in C){B+='<input type="hidden" name="'+v+'" value="'+C[v]+'" />'}B+="</form>";$("container").innerHTML+=B;
$("newpost").submit()}}sfHover=function(){var B=document.getElementById("dropdownnav").getElementsByTagName("LI");
for(var A=0;A<B.length;A++){B[A].onmouseover=function(){this.className+=" sfhover"};B[A].onmouseout=function(){this.className=this.className.replace(new RegExp(" sfhover\\b"),"")
}}};probHover=function(){var B=new Array();for(j=0;j<100;j++){B[j]=new Array();var C=document.getElementById("probdrop"+j);
if(C){B[j]=C.getElementsByTagName("LI");for(var A=0;A<B[j].length;A++){B[j][A].onmouseover=function(){this.className+=" probhover"
};B[j][A].onmouseout=function(){this.className=this.className.replace(new RegExp(" probhover\\b"),"")
}}}}};function containsDOM(A,C){var B=false;do{if((B=A==C)){break}C=C.parentNode}while(C!=null);return B
}function checkMouseLeave(B,A){A=(A)?A:((window.event)?window.event:"");window.status=A;if(A.relatedTarget){return !containsDOM(B,A.relatedTarget)
}else{if(B.contains(A.toElement)){return(false)}else{return(true)}}}function HideandUNhideObj(A){nav=document.getElementById("div"+A).style;
con=document.getElementById("ul"+A);if(nav.display=="none"){nav.display="block";con.onmouseout=function(B){if(checkMouseLeave(this,B)){A=parseInt(this.id.substr(2));
nav=document.getElementById("div"+A).style;nav.display="none"}}}else{nav.display="none";con.onmouseout=function(B){if(checkMouseLeave(this,B)){A=parseInt(this.id.substr(2));
nav=document.getElementById("div"+A).style;nav.display="none"}}}}if(window.attachEvent){window.attachEvent("onload",probHover)
}function phpads_deliverActiveX(A){document.write(A)}function playAudioCaptcha(A){if(navigator.userAgent.indexOf("MSIE")>-1){var B='<object classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95" type="audio/x-mpeg" data="'+A+'" height="0" width="0"><param name="FileName" value="'+A+'" /><param name="AutoStart" value="true"></object>'
}else{var B='<object data="'+A+'" height="0" width="0"><param name="src" value="'+A+'" /><param name="autostart" value="true" /><param name="controls" value="false" /><param name="loop" value="false" /></object>'
}$("playAudio").innerHTML="";$("playAudio").innerHTML=B;return false}function generateAudioCaptcha(A){$("playAudio").style.position="absolute";
if(navigator.userAgent.indexOf("MSIE")>-1){var B='<object classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95" type="audio/x-mpeg" data="'+A+'" height="0" width="0"><param name="FileName" value="'+A+'" /><param name="AutoStart" value="true"></object>'
}else{var B='<object data="'+A+'" height="0" width="0"><param name="src" value="'+A+'" /><param name="autostart" value="true" /><param name="controls" value="false" /><param name="loop" value="false" /></object>'
}$("playAudio").innerHTML=B;$("audiocaptchalink").innerHTML='Can\'t read the text? <a href="#" onclick="return playAudioCaptcha(\''+A+"');\">Listen to it</a>";
return false}function gotoLink(A){new Ajax.Request("/link",{method:"post",postBody:"l="+A+"",asynchronous:false});
return true}function getTopTen(endpoint,params){if(!params){params=""}else{params="&"+params}new Ajax.Request("/services",{method:"post",postBody:"type=json&size=a&endPoint="+endpoint+params,onComplete:function(xh){if(xh.status==200){updateTopTen(eval("("+xh.responseText+")"))
}else{}}});return false}function updateTopTen(E,B,J,C,L){var B=B||8;var J=J||"toptenlist";var G=$j("#"+J);
var C=C||"topten-list";var K=$j("#"+C);var L=L||"Currently, there are not enough recent stories of this type on Digg to generate a list.";
K.html("");if(!E){K.html("We were unable to retrieve matching stories from Digg. Please refresh the page to try again.");
return false}if(!E.stories||E.stories.length<B){K.html(L);return false}if(G){G.css("display","block")
}ttaddhtml="";for(var F=0;F<E.stories.length;F++){if(E.stories[F].diggs>10000){E.stories[F].diggs=Math.floor(E.stories[F].diggs/1000)+"K+"
}var I="";var A="";if(typeof (E.stories[F].friends)=="object"){A='<img src="/img/digg-friend-s.png" width="15"  height="15" alt="A Friend Dugg This Post" />';
I="<h6>Friends who dugg this</h6>";for(var D=0;(D<E.stories[F].friends.users.length&&D<4);D++){var I=I+"<img src=\\'"+E.stories[F].friends.users[D].icon+"\\'/> "+E.stories[F].friends.users[D].name+"<br/>"
}if(I!=""){I="onmouseover=\"Tip('"+I+"')\""}}thumb="";thumbclass="";thumburl="";if(E.stories[F].thumbnail){thumburl=E.stories[F].thumbnail.src;
if(E.stories[F].media=="news"){thumbclass=" news-thumb";thumb=' <span><em style="background-image: url('+thumburl+')">thumb</em></span>'
}}if(E.stories[F].media=="videos"){thumb=" <span><em"+((thumburl.length>0)?' style="background-image: url('+thumburl+')"':"")+">thumb</em></span>";
thumbclass=" vid-thumb"}else{if(E.stories[F].media=="images"){thumb=" <span><em"+((thumburl.length>0)?' style="background-image: url('+thumburl+')"':"")+">thumb</em></span>";
thumbclass=" img-thumb"}}ttaddhtml=ttaddhtml+'<div class="news-summary'+thumbclass+'"><h3><a href="'+E.stories[F].href+'">'+E.stories[F].title+thumb+'</a></h3><ul class="news-digg"><li class="digg-count"><a href="'+E.stories[F].href+'" '+I+"><strong>"+E.stories[F].diggs+"</strong>"+A+"</a></li></ul></div>"
}var H=document.getElementById(C);H.innerHTML=H.innerHTML+ttaddhtml}function toggleCatDrop(A){if($j("#catdrop"+A).css("display")=="none"){$j("#catdrop"+A).css("display","block")
}else{$j("#catdrop"+A).css("display","none")}return false}function toggleBury(A){if($j("#div"+A).css("display")=="none"){document.getElementById("div"+A).style.display="block";
document.getElementById("tooltoggle"+A).style.display="block"}else{document.getElementById("div"+A).style.display="none";
document.getElementById("tooltoggle"+A).style.display="none"}return false}function buryHover(B,A){if($j("#div"+B).css("display")=="none"){document.getElementById("tooltoggle"+B).style.display=A
}}function hideBuryMenus(){for(var A=0;A<14;A++){$j("#div"+A).css("display","none");$j("#tooltoggle"+A).css("display","none")
}}function clearMenus(){$j("#submenu-friends, .catdropm").hide();hideBuryMenus();$j("#friends-alink").removeClass("current")
}function handleHover(){$j("body").bind("click",function(A){if(!$j(A.target).is(".catdrop, #friends-activity")&&(!$j(A.target).attr("id")||$j(A.target).attr("id").substring(0,10)!="tooltoggle")){clearMenus()
}});$j(".catdrop").click(function(){var A=$j(this).parents("li.h-drop").children(".catdropm");A.toggle();
$j(".catdropm:visible, #submenu-friends").not(A).hide();$j("#friends-alink").removeClass("current");return false
});$j("#catdrop").click(function(){var A=$j(this).parents("li.h-drop").children(".catdropm");A.toggle();
$j(".catdropm:visible, #submenu-friends").not(A).hide();$j("#friends-alink").removeClass("current");return false
})}function tfriends(){if($j("#submenu-friends").css("display")=="none"){clearMenus();document.getElementById("submenu-friends").style.display="block";
$j("#friends-alink").addClass("current")}else{$j("#submenu-friends").css("display","none");$j("#friends-alink").removeClass("current")
}return false}function dofcount(){if(typeof (friendsjson)=="object"){$j("#friends-activity").html(""+friendsjson.count)
}else{$j("#friends-activity").html("0")}}function dofriends(){if(typeof (friendsjson)=="object"){var A=document.getElementById("submenu-friends-list");
var B="/users/"+friendsjson.name+"/friends";A.innerHTML='<li><a href="'+B+'/diggs"><em>'+friendsjson.activity.dugg+'</em> Diggs</a></li><li><a href="'+B+'/upcoming"><em>'+friendsjson.activity.duggq+'</em> Diggs in Upcoming</a></li><li><a href="'+B+'/comments"><em>'+friendsjson.activity.comment+'</em> Comments</a></li><li><a href="'+B+'/submissions"><em>'+friendsjson.activity.submit+'</em> Submissions</a></li><li><a href="'+B+'/favorites"><em>'+friendsjson.activity.fav+'</em> Favorites</a></li><li><a href="'+B+'/shouts"><em>'+friendsjson.activity.shouts+'</em> Shouts</a></li><li><a href="'+B+'/profile"><em>'+friendsjson.activity.profile+'</em> Profile Changes</a></li><li><a href="'+B+'/add" class="add-more">+ Add More Friends</a></li>'
}return false}function toggleBury(A){if($j("#div"+A).css("display")=="none"){document.getElementById("div"+A).style.display="block";
document.getElementById("tooltoggle"+A).style.display="block"}else{document.getElementById("div"+A).style.display="none";
document.getElementById("tooltoggle"+A).style.display="none"}return false}function buryHover(B,A){if($j("#div"+B).css("display")=="none"){document.getElementById("tooltoggle"+B).style.display=A
}}function reportGalleryPhoto(A){$j.ajax({url:"/ajax/gallery/report",type:"POST",data:{photoId:A,token:tokens.gallery.report},success:function(B){$j(".side-remove").html('<a name="reported">You Reported This Image</a>')
},error:function(B){}})}function doLogout(A,B){jspost("/logout",{logout_check:A,returnpage:B});return false
}function dtpcounter(B){var A=B.length;var C="";for(c=0;c<A;c++){C=C+'<span class="c'+B.charAt(c)+'">'+B.charAt(c)+"</span>"
}return C}$j(document).ready(function(){$j(".promo").each(function(){var C=this.id;var B=new Array();
$j(this).find("a").each(function(){var D="";if(D=$j(this).find("img").attr("src")){D=D.replace(/^.*?([a-z0-9_-]+)\..*$/i,"$1");
D=D.replace(/[^a-z0-9]/gi,"");D="IMG"+D}else{D=$j(this).text();D=D.replace(/[^a-z0-9]/gi,"")}D=";"+C+"_"+D;
B.push(D);$j(this).bind("click",function(){analyticsPromoClick(D)})});var A=s_gi(s_account);A.linkTrackVars="products,events";
A.linkTrackEvents="event13";A.events="event13";A.products=B.join(",");A.tl(true,"o","Promo Impressions")
})});$j(document).ready(function(){var A=jQuery.browser;var B=A.version.split(".");if((A.msie&&B[0]>=8)||(A.safari&&B[0]>=523)||(A.mozilla&&B[0]>=1&&B[1]>=9)){$j(".msad > iframe").each(function(){var C=(this.contentWindow||this.contentDocument||null);
if(C&&C.document){C=C.document}if(C&&C.close){C.close()}})}});$j(document).ready(function(){if(typeof msAnalytics!="undefined"){$j(".offsite").each(function(){$j(this).bind("click",function(){if(rgx=$j(this).attr("class").match(/[ ]ct-([^ ]+)/)){msAnalytics.TrackLink($j(this).attr("href"),LinkType.Outbound,rgx[1])
}return true})})}});var detect=navigator.userAgent.toLowerCase();var OS,browser,version,total,thestring;function getBrowserInfo(){if(checkIt("konqueror")){browser="Konqueror";
OS="Linux"}else{if(checkIt("safari")){browser="Safari"}else{if(checkIt("omniweb")){browser="OmniWeb"}else{if(checkIt("opera")){browser="Opera"
}else{if(checkIt("webtv")){browser="WebTV"}else{if(checkIt("icab")){browser="iCab"}else{if(checkIt("msie")){browser="Internet Explorer"
}else{if(!checkIt("compatible")){browser="Netscape Navigator";version=detect.charAt(8)}else{browser="An unknown browser"
}}}}}}}}if(!version){version=detect.charAt(place+thestring.length)}if(!OS){if(checkIt("linux")){OS="Linux"
}else{if(checkIt("x11")){OS="Unix"}else{if(checkIt("mac")){OS="Mac"}else{if(checkIt("win")){OS="Windows"
}else{OS="an unknown operating system"}}}}}}function checkIt(A){place=detect.indexOf(A)+1;thestring=A;
return place}Event.observe(window,"load",initialize,false);Event.observe(window,"load",getBrowserInfo,false);
Event.observe(window,"unload",Event.unloadCache,false);var lightbox=Class.create();lightbox.prototype={yPos:0,xPos:0,initialize:function(A){this.content=A.href;
this.analyticsTool="video";Event.observe(A,"click",this.activate.bindAsEventListener(this),false);A.onclick=function(){return false
}},activate:function(){if(browser=="Internet Explorer"){this.getScroll();this.prepareIE("100%","hidden");
this.setScroll(0,0);this.hideSelects("hidden")}this.displayLightbox("block");$j(".item_ad_image, .top_ad_image").attr("style","visibility: hidden");
analyticsEvent("event12",this.analyticsTool)},prepareIE:function(A,B){bod=document.getElementsByTagName("body")[0];
bod.style.height=A;bod.style.overflow=B;htm=document.getElementsByTagName("html")[0];htm.style.height=A;
htm.style.overflow=B},hideSelects:function(A){selects=document.getElementsByTagName("select");for(i=0;
i<selects.length;i++){selects[i].style.visibility=A}},getScroll:function(){if(self.pageYOffset){this.yPos=self.pageYOffset
}else{if(document.documentElement&&document.documentElement.scrollTop){this.yPos=document.documentElement.scrollTop
}else{if(document.body){this.yPos=document.body.scrollTop}}}},setScroll:function(A,B){window.scrollTo(A,B)
},displayLightbox:function(B){var A=this;$("overlay").style.display=B;$("overlay").onclick=function(){A.deactivate();
return false};$("lightbox").style.display=B;if(B!="none"){this.loadInfo()}},loadInfo:function(){var A=new Ajax.Request(this.content,{method:"post",parameters:"",onComplete:this.processInfo.bindAsEventListener(this)})
},processInfo:function(A){info="<div id='lbContent'>"+A.responseText+"</div>";new Insertion.Before($("lbLoadMessage"),info);
$("lightbox").className="done";this.actions()},actions:function(){lbActions=document.getElementsByClassName("lbAction");
for(i=0;i<lbActions.length;i++){Event.observe(lbActions[i],"click",this[lbActions[i].rel].bindAsEventListener(this),false);
lbActions[i].onclick=function(){return false}}},insert:function(B){link=Event.element(B).parentNode;Element.remove($("lbContent"));
var A=new Ajax.Request(link.href,{method:"post",parameters:"",onComplete:this.processInfo.bindAsEventListener(this)})
},deactivate:function(){Element.remove($("lbContent"));if(browser=="Internet Explorer"){this.setScroll(0,this.yPos);
this.prepareIE("auto","auto");this.hideSelects("visible")}this.displayLightbox("none");$j(".item_ad_image, .top_ad_image").attr("style","")
}};function initialize(){addLightboxMarkup();$j(".lbOn").each(function(){if($j(this).attr("name")!=undefined){valid=new shortbox(this)
}else{valid=new lightbox(this)}})}function addLightboxMarkup(){bod=document.getElementsByTagName("body")[0];
overlay=document.createElement("div");overlay.id="overlay";lb=document.createElement("div");lb.id="lightbox";
lb.className="loading";lb.innerHTML='<div id="lbLoadMessage"></div>';bod.appendChild(overlay);bod.appendChild(lb)
}var shortbox=Class.create();Object.extend(Object.extend(shortbox.prototype,lightbox.prototype),{initialize:function(A){var B=this;
A=$j(A);this.content=A.attr("name");this.analyticsTool="share";A.click(function(C){B.activate();C.preventDefault()
})}});addEvent(window,"load",labels_init);function labels_init(){if(document.getElementById&&document.styleSheets){try{var C=document.styleSheets[document.styleSheets.length-1];
addStyleRule(C,"label.inside","position:absolute; visibility:hidden;");for(var B=0,A=null;(A=document.getElementsByTagName("label")[B]);
B++){if(A.className=="inside"){label_init(A)}}addEvent(document.forms[0],"submit",labels_uninit)}catch(D){}}}function labels_uninit(D){if(document.getElementById&&document.styleSheets){for(var B=0,A=null;
(A=document.getElementsByTagName("label")[B]);B++){var C=document.getElementById(A.htmlFor);if(C&&C.value==C._labeltext){label_hide(C)
}}}}function label_init(B){try{var C=document.getElementById(B.htmlFor);var E=C.nodeName;var A=C.getAttribute("type");
if(E=="TEXTAREA"||(A=="text"||A=="password")){C._labeltext=B.firstChild.nodeValue;C._type=C.getAttribute("type");
addEvent(C,"focus",label_focused);addEvent(C,"blur",label_blurred);label_blurred({currentTarget:C})}else{B.style.position="static";
B.style.visibility="visible"}}catch(D){B.style.position="static";B.style.visibility="visible"}}function label_focused(B){B=fix_e(B);
var A=B.currentTarget;if(A.value==A._labeltext){A=label_hide(A)}A.select()}function label_hide(A){if(A._type=="password"){A=label_setInputType(A,"password")
}A.value="";return A}function label_blurred(B){B=fix_e(B);var A=B.currentTarget;if(A.value==""){A=label_show(A)
}}function label_show(A){if(A._type=="password"){A=label_setInputType(A,"text")}A.value=A._labeltext;
return A}function label_setInputType(C,B){if(navigator.appName=="Microsoft Internet Explorer"){var E=document.createElement("SPAN");
E.innerHTML='<input type="'+B+'" />';E=E.firstChild;var A="";for(prop in C){try{if(prop!="type"&&prop!="height"&&prop!="width"){E[prop]=C[prop]
}}catch(D){}}addEvent(E,"focus",label_focused);addEvent(E,"blur",label_blurred);C.parentNode.replaceChild(E,C);
return E}else{C.setAttribute("type",B);return C}}function addEvent(D,C,A){if(D.addEventListener){D.addEventListener(C,A,false);
return true}else{if(D.attachEvent){var B=D.attachEvent("on"+C,A);return B}else{return false}}}function addStyleRule(C,A,D){if(C.addRule){C.addRule(A,D)
}else{var B=C.cssRules.length;C.insertRule(A+"{"+D+"}",B)}}function fix_e(A){if(!A&&window.event){A=window.event
}if(!A.currentTarget&&A.srcElement){A.currentTarget=A.srcElement}if(!A.originalTarget&&A.srcElement){A.originalTarget=A.srcElement
}return A};jQuery.fn.createAppend=function(C,A,D){var C=jQuery("<"+C+"></"+C+">");jQuery.each(A,function(E,F){if(jQuery.browser.msie&&E=="style"){var G=F.split(";");
jQuery.each(G,function(K,L){var J=L.split(":");var I=J[0];var H=J[1];if(jQuery.trim(I)!=""){jQuery(C).css(jQuery.trim(I),jQuery.trim(H))
}})}else{jQuery(C).attr(E,F)}});if(typeof D=="object"&&D!=null){for(var B=0;B<D.length;B=B+3){jQuery(C).createAppend(D[B],D[B+1]||{},D[B+2]||[]).appendTo(C)
}}else{if(D!=null){C=jQuery(C).html(D)}}return C.appendTo(this)};jQuery.fn.createPrepend=function(C,A,D){var C=jQuery("<"+C+"></"+C+">");
jQuery.each(A,function(E,F){if(jQuery.browser.msie&&E=="style"){var G=F.split(";");jQuery.each(G,function(K,L){var J=L.split(":");
var I=J[0];var H=J[1];if(jQuery.trim(I)!=""){jQuery(C).css(jQuery.trim(I),jQuery.trim(H))}})}else{jQuery(C).attr(E,F)
}});if(typeof D=="object"&&D!=null){for(var B=0;B<D.length;B=B+3){jQuery(C).createAppend(D[B],D[B+1]||{},D[B+2]||[]).appendTo(C)
}}else{if(D!=null){C=jQuery(C).html(D)}}return C.prependTo(this)};jQuery.fn.tplAppend=function(C,B){var A=this;
if(C.constructor!=Array){C=[C]}jQuery.each(C,function(E,F){var D=B.apply(F);for(var E=0;E<D.length;E=E+3){jQuery(A).createAppend(D[E],D[E+1],D[E+2])
}});return A};jQuery.fn.tplPrepend=function(C,B){var A=this;if(C.constructor!=Array){C=[C]}jQuery.each(C,function(E,F){var D=B.apply(F);
for(var E=0;E<D.length;E=E+3){jQuery(A).createPrepend(D[E],D[E+1],D[E+2])}});return A};