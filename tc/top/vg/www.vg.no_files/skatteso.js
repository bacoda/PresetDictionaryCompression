
function validateSkattFirstLastNameSearchSubmit() {
    var formObj = document.getElementById('skatteSokFormFirstLastName');
    var lastName = "";
    var firstName = "";
    if ((formObj.navn.value =='Fornavn Etternavn') || (formObj.navn.value.length < 4)) {
        alert('Du må skrive inn fornavn og etternavn.'); return false;
    }else {
        var index = formObj.navn.value.lastIndexOf(' ');
        if(index == -1)
        {
         lastName = formObj.navn.value;
        }else{
            lastName = formObj.navn.value.substr(index, (formObj.navn.value.length - index + 1));
            firstName = formObj.navn.value.substr(0, (index + 1));

        }
        formObj.etternavn.value = lastName;
        formObj.fornavn.value = firstName;

        return true;

    }

}