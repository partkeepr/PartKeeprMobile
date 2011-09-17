PartKeeprMobile.ServiceCall  = Ext.extend(Ext.form.FormPanel, {
	service: null,
	call: null,
	
	sHandler: null,
	parameters: {},
	loadMessage: null,
	anonymous: false,

	constructor: function (service,call) {
		this.setService(service);
		this.setCall(call);
		this.parameters = {};
	},
	
	/**
	 * <p>This method activates anonymous mode.</p>
	 * <p>Anonymous mode defines that the service is called without passing a valid session. Usually, the only anonymous call is to authenticate a user.</p>
	*/
	enableAnonymous: function () {
		this.anonymous = true;
	},
	/**
	 * <p>This method deactivates anonymous mode.</p>
 	*/
	disableAnonymous: function () {
		this.anonymous = false;
	},
	setService: function (service) {
		this.service = service;
	},
	setCall: function (call) {
		this.call = call;
	},
	setParameter: function (parameter, value) {
		this.parameters[parameter] = value;
	},
	setParameters: function (obj) {
		Ext.apply(this.parameters, obj);
	},
	setLoadMessage: function (message) {
		this.loadMessage = message;
	},
	setHandler: function (handler) {
		this.sHandler = handler;
	},
	doCall: function () {
		
		/*this.setParameter("service", this.service);
		this.setParameter("call", this.call);
		this.setParameter("type", "jsonp");
		this.setParameter("callback", "test");*/
		
		if (!this.anonymous) {
			this.parameters.session = PartKeeprMobileApplication.getApplication().getSession();
		}
		
		Ext.util.JSONP.request({
			url: PartKeeprMobileApplication.getApplication().getServerURL(),
			//success: Ext.bind(this.onSuccess, this),
			//failure: Ext.bind(this.onError, this),
			params: {
				service: this.service,
				call: this.call,
				type: 'jsonp',
				data: Ext.encode(this.parameters)
			},
			callbackKey: 'callback',
            callback: function(result) {
            	if (result.status == "ok") {
            		this.onSuccess(result.response);
            	} else {
            		this.onError(result.onError);
            	}
            }
		});
	},
	onSuccess: function (responseObj) {
		/* Check the status */
		if (response.status == "error") {
			Ext.Msg.alert(i18n("Error"), i18n("Invalid Server Response"));
			return;
		}
		
		/* Check the status */
		if (response.status == "systemerror") {
			Ext.Msg.alert(i18n("Error"), i18n("Invalid Server Response"));
			return;
		}
		
		if (this.sHandler) { 
			this.sHandler(response.response);
		}
	},
	onError: function (response) {
		try {
            var data = Ext.decode(response.responseText);
            
        	PartKeepr.ExceptionWindow.showException(data.exception);
        } catch (ex) {
        	var exception = {
        			message: i18n("Critical Error"),
        			detail: i18n("The server returned a response which we were not able to interpret."),
        			exception: "",
        			backtrace: response.responseText
        	};
        	
        	PartKeepr.ExceptionWindow.showException(exception);
        	
        	
        }
        
		PartKeepr.getApplication().getStatusbar().endLoad();
	},
	displayError: function (obj) {
		
		
			
		Ext.Msg.show({
			title: 'Error',
			msg: this.getErrorMessage(obj),
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
			
		});
	},
	getErrorMessage: function (obj) {
		var errorMsg;
		
		if (obj.message === "") {
			errorMsg = obj.exception;
		} else {
			errorMsg = obj.message;
		}
		
		return errorMsg;
	},
	displaySystemError: function (obj) {
		var errorMsg;

		errorMsg = "Error Message: " + obj.message+"<br>";
		errorMsg += "Exception:"+obj.exception+"<br>";
		errorMsg += "Backtrace:<br>"+str_replace("\n", "<br>", obj.backtrace);
		
		Ext.Msg.maxWidth = 800;
		
		Ext.Msg.show({
			title: 'System Error',
			msg: errorMsg,
			buttons: Ext.MessageBox.OK,
			icon: Ext.MessageBox.ERROR
			
		});
	}
	
});