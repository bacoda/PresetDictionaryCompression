//making the futuredate object available to outside calls
var futuredate;

function startCountdown(targetDiv, targetTime, targetFormat, endMessage, endStyle, callBack) {

    futuredate = new cdtime(targetDiv, targetTime, targetFormat,endMessage, endStyle, callBack)
    futuredate.displaycountdown("days", formatresults)

}

/***********************************************
* Dynamic Countdown script- ? Dynamic Drive (http://www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit http://www.dynamicdrive.com/ for this script and 100s more.
***********************************************/

function cdtime(container, targetTime, targetformat,endMessage, endStyle, callBack){
    if (!document.getElementById || !document.getElementById(container)) return
    this.container=document.getElementById(container)
    this.currentTime=new Date()
    this.targetdate=new Date(targetTime)
    this.timesup=false
    this.endMessage = endMessage || '';
    this.endStyle = endStyle
    this.callBack = self[callBack]
    this.targetformat=targetformat
    this.updateTime()
}

cdtime.prototype.updateTime=function(){
    var thisobj=this
    this.currentTime.setSeconds(this.currentTime.getSeconds()+1)
    setTimeout(function(){thisobj.updateTime()}, 1000) //update time every second
}

cdtime.prototype.displaycountdown=function(baseunit, functionref){
    this.baseunit=baseunit
    this.formatresults=functionref
    this.showresults()
}

cdtime.prototype.showresults=function(){
    var thisobj=this
    var timediff=(this.targetdate-this.currentTime)/1000 //difference btw target date and current date, in seconds
    if (timediff<0){ //if time is up
        this.timesup=true
        this.container.innerHTML=this.formatresults()
        return
    }

    var oneMinute=60 //minute unit in seconds
    var oneHour=60*60 //hour unit in seconds
    var oneDay=60*60*24 //day unit in seconds
    var dayfield=Math.floor(timediff/oneDay)
    var hourfield=Math.floor((timediff-dayfield*oneDay)/oneHour)
    var minutefield=Math.floor((timediff-dayfield*oneDay-hourfield*oneHour)/oneMinute)
    var secondfield=Math.floor((timediff-dayfield*oneDay-hourfield*oneHour-minutefield*oneMinute))
    if (this.baseunit=="hours"){ //if base unit is hours, set "hourfield" to be topmost level
        hourfield=dayfield*24+hourfield
        dayfield="n/a"
    }
    else if (this.baseunit=="minutes"){ //if base unit is minutes, set "minutefield" to be topmost level
        minutefield=dayfield*24*60+hourfield*60+minutefield
        dayfield=hourfield="n/a"
    }
    else if (this.baseunit=="seconds"){ //if base unit is seconds, set "secondfield" to be topmost level
        var secondfield=timediff
        dayfield=hourfield=minutefield="n/a"
    }
    this.container.innerHTML=this.formatresults(dayfield, hourfield, minutefield, secondfield)
    setTimeout(function(){thisobj.showresults()}, 1000) //update results every second
}

/////CUSTOM FORMAT OUTPUT FUNCTIONS BELOW//////////////////////////////

//Create your own custom format function to pass into cdtime.displaycountdown()
//Use arguments[0] to access "Days" left
//Use arguments[1] to access "Hours" left
//Use arguments[2] to access "Minutes" left
//Use arguments[3] to access "Seconds" left

function formatresults(){

    var displaystring = '';
    if (this.timesup==false){//if target date/time not yet met
        if (this.targetformat) {
            days = /<days>/gi
            hours = /<hours>/gi
            minutes = /<minutes>/gi
            seconds = /<seconds>/gi
            displaystring = this.targetformat

            //if a preceeding value is missing, add what was preceeding it
            //to the value that is there.
            if ( !displaystring.match(days) ) {
                arguments[1] = ( arguments[0] * 24 ) + arguments[1];
            }

            if ( !displaystring.match(hours) ) {
                arguments[2] = ( arguments[1] * 60 ) + arguments[2]
            }

            if ( !displaystring.match(minutes) ) {
                arguments[3] = ( arguments[2] * 60 ) + arguments[3]
            }

            displaystring = displaystring.replace(days, arguments[0])
            displaystring = displaystring.replace(hours, arguments[1])
            displaystring = displaystring.replace(minutes, arguments[2])
            displaystring = displaystring.replace(seconds, arguments[3])
        }
        else {

            displaystring = arguments[0]+" <span class=\"countdown_days\">days</span> "+arguments[1]+" <span class=\"countdown_hrs\">hours</span> "+arguments[2]+" <span class=\"countdown_mins\">minutes</span> "+arguments[3]+" <span class=\"countdown_secs\">seconds</span>"
        }

        return displaystring
    }
    else{ //else if target date/time met

        if(this.endStyle != '') {
            this.container.className += ' ' + this.endStyle;
        }


        if(this.endMessage != '') {
            displaystring=this.endMessage;
            return displaystring
        }

        if(this.callBack){
            this.callBack();
        }


        if (this.endStyle == '' && this.endMessage == '') {
            this.container.style.display = 'none';
        }

        return '';

    }

}