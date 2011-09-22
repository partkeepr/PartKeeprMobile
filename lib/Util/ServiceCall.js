PartKeeprMobile.ServiceCall = Ext.extend(Ext.util.Observable, {
	service: null,
	call: null,
	
	sHandler: null,
	overrideServerURL: null,
	parameters: {},
	loadMessage: null,
	anonymous: false,

	constructor: function (service,call) {
		this.setService(service);
		this.setCall(call);
		this.parameters = {};
		
		this.addEvents("exception");
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
	setServerURL: function (url) {
		this.overrideServerURL = url;
	},
	setTimeoutHandler: function (handler) {
		this.timeoutHandler = handler;
	},
	setMessage: function (msg) {
		this.loadMessage = msg;
	},
	doCall: function () {
		var callDefinition = Ext.encode(this.parameters);
		
		var headers = {
			"call": this.call,
			"lang": PartKeeprMobileApplication.getApplication().getLocale()
		};
		
		var url = PartKeeprMobileApplication.getApplication().getServerURL()+"/service.php";
		
		if (this.overrideServerURL) {
			url = this.overrideServerURL;
		}
		
		if (!this.anonymous) {
			this.parameters.session = PartKeeprMobileApplication.getApplication().getSession();
		}
		
		if (this.loadMessage) {
			PartKeeprMobileApplication.getApplication().startLoading(this.loadMessage);
		}
		
		Ext.Ajax.request({
			url: url + '/' + this.service + "/"+this.call,
			success: Ext.createDelegate(this.onSuccess, this),
			failure: Ext.createDelegate(this.onError, this),
			method: "POST",
			params: callDefinition,
			headers: headers
		});
	},
	onRequestComplete: function (responseObj) {
		PartKeeprMobileApplication.getApplication().stopLoading();
		PartKeeprMobile.ServiceCall.timeoutTasks.getByKey(responseObj.key).cancel();
		
        if (responseObj.status == "ok") {
        	this.onSuccess(responseObj);
        } else {
        	this.onError(responseObj);
        }
	},
	onSuccess: function (responseObj) {
		try {
			var response = Ext.decode(responseObj.responseText);	
		} catch (ex) {
			var exception = new PartKeepr.RemoteException();
			
			exception.message = i18n("Critical Error");
			exception.detail = i18n("The server returned a response which we were not able to interpret.");
			exception.exception = "";
			exception.backtrace = responseObj.responseText;
        	
			this.fireEvent("exception", exception);
        	return;
		}
		
				
		/* Check the status */
		if (response.status == "error") {
			this.displayError(response.exception);
			return;
		}
		
		/* Check the status */
		if (response.status == "systemerror") {
			this.displaySystemError(response);
			return;
		}
		
		if (this.sHandler) { 
			this.sHandler(response.response);
		}
	},
	onError: function (response) {
		try {
            var data = Ext.decode(response.responseText);
            
        	PartKeeprMobile.ExceptionWindow.showException(data.exception);
        } catch (ex) {
        	var exception = new PartKeepr.RemoteException();
        	
        	exception.message = i18n("Critical Error");
        	exception.detail = i18n("The server returned a response which we were not able to interpret.");
        	exception.exception = "";
        	exception.backtrace = response.responseText;
        	
        	this.fireEvent("exception", exception);
        }
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
