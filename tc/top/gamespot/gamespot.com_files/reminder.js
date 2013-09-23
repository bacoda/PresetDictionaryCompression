
function reminderBuilder(){

	this.init = function() {
		//set up the object vars
		this.reminderDom = new Object;
		this.reminderIds = new Object;
		this.user = 'pete';

	
	},

	this.addReminder = function(user, domId, reminderId, classNotSet, classSet){
		//sets up a hash of the reminders on the page so tht they can be individually refrenced
		this.user = user;
		var dom_element = document.getElementById(domId);
		this.reminderDom[domId] = {"domEle" : dom_element, 
									"reminderId" : reminderId, 
									"classSet" : classSet, 
									"classNotSet" : classNotSet};
		
		this.reminderIds[reminderId] = reminderId;
	},
	
	this.checkReminders = function(id, action) {
		//does the ajax check for all the ids from this.reminderIds or the passed id
		//action is a flag that when set tells the processing page to add/remove a reminder
		// otherwise it just checks state
		
		//this is because when checkReminders is called by the pageonload 'this' is something else.
		var self = reminderObj;

		var dom = self.reminderDom;
		var url_action = action == true ? '&delete=1' : '';
		var check_rand = Math.floor( Math.random( ) * 10000 + 1 );
		var ids = id ? id : '';
		if(!ids){
			for( i in self.reminderIds ) {
				ids += i + ',';
			}
			ids = ids.substr(0, ids.length - 1);//trim the trailing ,
		}		
				
	
		if(ids.length == 0 ){
			return;
		}
				
		var url = '/pages/ajax/reminder_process.php?user_id=';
			url += self.user+'&event_id='+ids+'&rand='+check_rand+url_action;

		new Ajax(url,
        {
            method: 'get',
            onComplete: function(data) {
				var dataObj = Json.evaluate(data, true);
                if(  typeof( dataObj ) == 'object' ) {

                	for( r in self.reminderDom ) {

                		self.styleReminder(dataObj[self.reminderDom[r].reminderId], self.reminderDom[r]);
                	                	
                	}
                	
                
                }
                
             }
        }
    	).request();
    	
	},
	
	this.styleReminder = function( state, r ){
		
		if( state == 1 || state == 0 ){
		
			var classIn = ( state == 1 ) ? r.classSet : r.classNotSet;
			var classOut = ( state == 1 ) ? r.classNotSet : r.classSet
			
			var ele = $(r.domEle);
			var fx = ele.effects({duration: 250});
			//using mootools.  the .99999 is for a safari bug when setting opacity to 1 on a floated element
			fx.start({'opacity': (0.999999,0)}).chain( 
				
											function(){
												 ele.removeClass(classOut).addClass(classIn); 
												 fx.start({'opacity':(0,0.999999)});
											}
										);
	
		}
				
	}
		
}
reminderObj = new reminderBuilder(); 
reminderObj.init();
window.addEvent('domready', reminderObj.checkReminders);
