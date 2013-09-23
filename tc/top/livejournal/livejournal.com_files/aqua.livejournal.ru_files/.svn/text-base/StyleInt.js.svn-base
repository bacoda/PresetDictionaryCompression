StyleInterface = function(){
	this.urlbase='s/';
}

//keep it simple, stupid )))
StyleInterface.prototype = {
	load:function(name){
		var style_sheet = document.styleSheets[0];
		var link = style_sheet.ownerNode||style_sheet.owningElement;
		//console.log(link);
		var old_name = link.href.replace(/.*\/(.*)\.css/,'$1');
		if(old_name!==name){
			var name = this.urlbase+name+'.css';
			link.setAttribute('href',name);
		}
		return;
	},
	addNew:function(name){
	},
	list:function(){
	}	
}

