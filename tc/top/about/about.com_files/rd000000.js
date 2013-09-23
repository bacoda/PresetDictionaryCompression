function getElementsByClassName(classname,node){var a=[];var re=new RegExp('(^| )'+classname+'( |$)');var els=node.getElementsByTagName("*");for(var i=0,j=els.length;i<j;i++)
if(re.test(els[i].className))a.push(els[i]);return a;}
function widont(str){return str.replace(/([^\s])\s+([^\s]+)\s*$/,'$1&nbsp;$2');}
function prepareTools(){if(!document.getElementById('widgets'))return;if(getElementsByClassName('tabs',document.getElementById('widgets')).length==0)return;var tabUnits=getElementsByClassName('tabs',document.getElementById('widgets'));for(var x=0;x<tabUnits.length;x++){var tabs=getElementsByClassName('tab',tabUnits[x]);for(var y=0;y<tabs.length;y++){if(tabs[y].getAttribute('uclick')){tabs[y].getElementsByTagName('h4')[0].onclick=function(){toggleTabs(this.parentNode);var i=new Image();i.src='http://clk.about.com?zi='+this.parentNode.getAttribute('uclick')+'&sdn='+gs+'&tt='+zTt+'&bts='+zBTS;};}else{tabs[y].getElementsByTagName('h4')[0].onclick=function(){toggleTabs(this.parentNode);};}
tabs[y].getElementsByTagName('h4')[0].className="t"+y;(y==0)?tabs[y].className='tab current':tabs[y].className='tab under';}}}
function toggleTabs(show){var parent=show.parentNode;var tabs=getElementsByClassName('tab',parent);for(var x=0;x<tabs.length;x++){var y=tabs[x];y.className='tab under';}
show.className='tab current';}
function zTglc(obj,c){
	if(obj.className) {
		if(obj.className==c) {
			obj.className='';
		} else {
			if(obj.className.match(' '+c)) {
				obj.className=obj.className.replace(' '+c,'');
			} else {
				obj.className=obj.className+' '+c;
			}
		}
	} else {
		obj.className=c;
	}
}
function zCi(){input=document.body.getElementsByTagName("input");for(var i=0;i<input.length;i++){if(input[i].type=='text'&&input[i].value!=''){if(!input[i].getAttribute('autoclear'))continue;input[i].v=input[i].value;input[i].onfocus=function(){if(this.value==this.v){this.value='';}}
input[i].onblur=function(){if(this.value==''){this.value=this.v;}}}}}
var validationFunctions=new Object();validationFunctions["required"]=isReq;validationFunctions["pattern"]=isPat;validationFunctions["postcode"]=isPC;validationFunctions["numeric"]=isNum;validationFunctions["email"]=isEmail;function isReq(formField){switch(formField.type){case'text':case'textarea':case'select-one':if(formField.value)
return true;return false;case'radio':var radios=formField.form[formField.name];for(var i=0;i<radios.length;i++){if(radios[i].checked)return true;}
return false;case'checkbox':return formField.checked;}}
function isPat(formField,pattern){var pattern=pattern||formField.getAttribute('pattern');var regExp=new RegExp("^"+pattern+"$","");var correct=regExp.test(formField.value);if(!correct&&formField.getAttribute('patternDesc'))
correct=formField.getAttribute('patternDesc');return correct;}
function isPC(formField){return isPat(formField,"\\d{4}\\s*\\D{2}");}
function isNum(formField){return isPat(formField,"\\d+");}
function isEmail(formField){return isPat(formField,"([a-zA-Z0-9\._-]+)(\@)([a-zA-Z\-0-9_-]+)((\.)([a-zA-Z0-9_-]+))+")}
var W3CDOM=document.createElement&&document.getElementsByTagName;function validateForms(){if (!W3CDOM) return;var forms=document.forms;for(var i=0;i<forms.length;i++){if(!forms[i].getAttribute('onsubmit'))forms[i].onsubmit=validate;}}
function validate(){var message=(this.getAttribute('alert'))?this.getAttribute('alert'):"All required fields must be filled out properly before submitting.";var els=this.elements;var validForm=true;for(var i=0;i<els.length;i++){els[i].className=els[i].className.replace(/invalid/,'');var req=els[i].getAttribute('validate');if(!req)continue;var OK=validationFunctions[req](els[i]);if(OK!=true){els[i].className+=' invalid';validForm=false;break;}}
if(!validForm){alert(message);}
return validForm;}
function HttpRequest(url){var pageRequest=false
if(window.XMLHttpRequest)
pageRequest=new XMLHttpRequest()
else if(window.ActiveXObject){try{pageRequest=new ActiveXObject("Msxml2.XMLHTTP")}
catch(e){try{pageRequest=new ActiveXObject("Microsoft.XMLHTTP")}
catch(e){}}}
else
return false
if(pageRequest){pageRequest.open('GET',url,false)
pageRequest.send(null)
return pageRequest;}}
var zIfw=self.innerWidth?self.innerWidth:(document.documentElement&&document.documentElement.clientWidth?document.documentElement.clientWidth:(document.body?document.body.clientWidth:0));var thin=(zIfw<850)?1:0;
function createOverlay(){var o=document.createElement('div');o.id='oL';o.style.height=window.document.body.scrollHeight+"px";gEI('abw').insertBefore(o,gEI('abw').childNodes[0]);return o;}
function splitList(obj){var l=obj.cloneNode(true);var li=obj.childNodes.length;if(li<6)return;zTglc(obj,'col1');zTglc(l,'col2');var s=Math.ceil(li/2);for(var i=li-1;i>=0;i--){(i<s)?l.removeChild(l.childNodes[i]):obj.removeChild(obj.childNodes[i]);}
obj.parentNode.appendChild(l);}
function browseInit(){var obj=gEI('browse');if(!obj||!gEI('fp'))return;gEI('abw').insertBefore(obj,gEI('fp'));obj.className='';var list=gEI('clist');if(!list) return;list.className='hide';splitList(list.getElementsByTagName('ul')[0]);var ctrl=gEI('cctrl');var cntnr=gEI('cats');function tglCats(){zTglc(cntnr,'on');zTglc(list,'hide');if(!gEI('oL')){var o=createOverlay();o.onclick=tglCats;}else{gEI('abw').removeChild(gEI('oL'));}}
ctrl.onclick=tglCats;}
function drawer(args){
	//kill the script if a target wasn't specified
	if(!args['element']) return;
	//default values of arguments
	var dargs = {
		'element'	:	null,
		'uclick'	:	null,
		'open'		:	0,
		'moveTime'	:	500,
		'moveFreq'	:	50,
		'minHeight'	:	null,
		'maxHeight'	:	null
	}
	//overwrite default values if they're set in the constructor
	for(var index in dargs) {
		if(typeof args[index] == "undefined") args[index] = dargs[index];
	}
	var self = this; //solves loss-of-scope problem
	this.ele=args['element'];
	this.ele.className+=this.ele.className?' slider':'slider';
	this.uclick = args['uclick'];
	this.moveTime=args['moveTime'];
	this.moveFreq=args['moveFreq'];
	this.moving=false;
	this.timerID=0;
	this.startTime=0;
	this.minHeight=this.currHeight=args['minHeight'] || this.ele.clientHeight;
	this.maxHeight=args['maxHeight'] || this.ele.scrollHeight;
	this.interval=(this.maxHeight-this.minHeight)/(this.moveTime/this.moveFreq);
	this.dir=args['open'];
	this.token=false;
	if(this.dir==1){
		this.ele.className+=this.ele.className?' expand':'expand';
		this.currHeight=this.maxHeight;
		this.ele.style.height=this.currHeight+"px";
	}
	var elements = this.ele.getElementsByTagName("*");
	for(var i=0;i<elements.length;i++){
		//apply the slide function (& drop a pixel if uclick is set) to any elements inside the target with a 'rel="control"' attribute
		if(elements[i].getAttribute('rel')=='control'){
			elements[i].onclick=function() {
				if(self.uclick){var i=new Image();i.src='http://clk.about.com?zi='+self.uclick+'&amp;sdn'+gs+'&amp;cdn='+ch+'&amp;amp;tt=39&amp;bt=0&amp;bts=1';}
				return self.execute();
			}
			elements[i].style.cursor="pointer";
		}
	}
	this.slide=function() {
		if(self.dir==1) {
			self.currHeight+=self.interval;
		} else {
			self.currHeight-=self.interval;	
		}
		self.ele.style.height=self.currHeight+"px";
		var elapsed=(new Date()).getTime() - self.startTime;
		if(elapsed>=self.moveTime) {
			clearInterval(self.timerID);
			self.ele.style.height=(self.dir==1)?self.maxHeight+"px":self.minHeight+"px";
			self.moving=false;
			if(self.dir==0){
				var x=self.ele.className.match(' expand')?' expand':'expand';
				self.ele.className=self.ele.className.replace(x,'');
			}
		}
		return;
	}
	this.execute=function(){
		//only execute if an animation is not in progress
		if(!this.moving) {
			//re-evaluate maxheight & interval
			this.maxHeight=args['maxHeight'] || this.ele.scrollHeight;
			this.interval=(this.maxHeight-this.minHeight)/(this.moveTime/this.moveFreq);
			if(this.ele.style.height==this.maxHeight+"px") {
				this.dir=0;
			} else {
				this.dir=1;
				//apply a class to the target for unique styling
				this.ele.className+=this.ele.className?' expand':'expand';
			} 
			this.startTime=(new Date()).getTime();
			this.moving=true;
			var self = this;
			this.timerID=setInterval(self.slide,this.moveFreq);
		}
		return false;
	}
}