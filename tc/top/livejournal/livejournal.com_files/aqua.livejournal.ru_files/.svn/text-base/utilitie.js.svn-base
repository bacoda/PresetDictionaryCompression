  function has_class(dom,cname){
	return RegExp('(^|\\s)'.concat(cname,'(\\s|$)')).test(dom.className);
  }

  function add_class(cname,dom){
	if(!has_class(dom,cname))dom.className=dom.className.concat(' ',cname);
	return dom;
  }

  function del_class(cname,dom){
  	var re = RegExp('(^|\\s)'.concat(cname,'(\\s|$)'),'g');
	dom.className = dom.className.replace(re,' ');
	return dom;
  }


  if(!('forEach' in Array.prototype)||(Array.prototype.forEach.length!=3)){
	Array.prototype.forEach = function(callback,context){
		var apply_to = context||this;
		for(var j=0;j<this.length;j++){
			callback.apply(apply_to,[this[j],j,this]);
		}
	}
  }
  
  if(!('map' in Array.prototype)||(Array.prototype.map.length!=3)){
	Array.prototype.map = function(callback,context){
		var res='';
		var apply_to = context||this;
		for(var j=0;j<this.length;j++){
			callback.apply(apply_to,[this[j],j,this]);
		}
		return res;
	}
  }

  Array.to = function(collection){
	return Array.prototype.slice.call(collection,0);
  }

