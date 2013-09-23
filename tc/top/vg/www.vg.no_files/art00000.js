  function skp(obj) {
    location.href = obj.options[obj.selectedIndex].value;
  }
   
function removeText(field)
        {
        field.value = '';
        }

function popUp(url) {
javascript:void(window.open(url, 'popup', 'width=500,height=450,resizable=yes,scrollbars=yes'))

}

function popOrd(url) {
javascript:void(window.open(url, 'popup', 'width=650,height=700,resizable=yes,scrollbars=yes'))

}

function selectSend(relForm){
var URL = document.relForm.site.options[document.relForm.site.selectedIndex].value;
window.location.href = URL;
}
function selSend(site){
var URL = site.options[site.selectedIndex].value;
window.location.href = URL;
}



	  function valgListState(state) {
	  	p = document.getElementById("peter");
	  	document.getElementById("gabriel").style.display = state;
		if (p.className == 'valgDrop')
			p.className = 'valgDropOver';
		else
			p.className = 'valgDrop';
	  }
