
function Ajaxian() {
  this.domObj = null;
  this.url = null;
  this.status = null;
  this.statusText = '';	
  this.method = 'GET';
  this.async = true;	 
  this.readyState = null;
  this.responseText = null;
  this.responseXML = null;
  this.handleResponse = null;
	this.handleError = null;
  this.responseFormat = 'xml', // values can 'text','xml','object'
			
  this.getFile = function(url) {	  
    this.url = url;
    this.makeRequest();
  };

  // we can add another method for posting to the server at a later time.
	
  this.makeRequest = function() {
    var self = null;
    //var req = null;	
		var resp = null;									   
    self = this;					
		   
		var stateChange = function() {		       					
      self.readyState = self.domObj.readyState;				
      if (self.readyState == 4) {					 			 	
        self.status = self.domObj.status;				
        self.statusText = self.domObj.statusText;
        self.responseText = self.domObj.responseText;
        self.responseXML = self.domObj.responseXML;				
        switch(self.responseFormat) {
          case 'text':
            resp = self.responseText;
            break;
          case 'xml':
            resp = self.responseXML;
            break;
          case 'object':
            resp = self.domObj;
            break;
        }
				
        if (self.status > 199 && self.status < 300) {		
				     self.handleResponse(resp);						  											 										
        }   
        else {
          self.handleError(resp);
					
        }
			}
    }				

		if (window.ActiveXObject && /Win/.test(navigator.userAgent)) {
			self.domObj = new ActiveXObject('MSXML2.XMLHTTP.3.0');
			//self.domObj.async = self.async;				 
			self.domObj.onreadystatechange =  stateChange;			
      self.domObj.open(self.method, self.url, self.async);
			self.domObj.send(null);
		}
		else if( document.implementation && document.implementation.createDocument ) {
			if(self.async ==  false){
				self.domObj = document.implementation.createDocument("","",null);
				self.domObj.async = self.async;								
				var loaded = self.domObj.load(self.url); 		
				if(loaded){
					self.handleResponse(self.domObj); 
				}
			}else{
				self.domObj = new XMLHttpRequest();
				self.domObj.onreadystatechange =  stateChange;			
				self.domObj.open(self.method, self.url, self.async);
				self.domObj.send(null);
			}
		} 
		else {
			alert("Ajax is not supported.");
			return;
		}
		
  };

  this.setAsync = function(async) {
    this.async = async; 		
  };
	
  this.setResponseFormat = function(responseFormat) {
    this.responseFormat = responseFormat; 
  };
	
  this.setHandlerResponse = function(funcRef) {
    this.handleResponse = funcRef;
  };	
	
  this.setHandlerError = function(funcRef) {
    this.handleError = funcRef; 
  };

}

