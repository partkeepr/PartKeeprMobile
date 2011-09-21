PartKeeprMobile.ServiceCall = Ext.extend(Ext.form.FormPanel, {
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
		var url = PartKeeprMobileApplication.getApplication().getServerURL()+"/service.php";
		
		if (this.overrideServerURL) {
			url = this.overrideServerURL;
		}
		
		
		if (!this.anonymous) {
			this.parameters.session = PartKeeprMobileApplication.getApplication().getSession();
		}
		
		var callbackKey = createUUID();
		
		if (this.loadMessage) {
			PartKeeprMobileApplication.getApplication().startLoading(this.loadMessage);
		}
		
		Ext.util.JSONP.request({
			url: url,
			params: {
				service: this.service,
				call: this.call,
				type: 'jsonp',
				key: callbackKey,
				data: Ext.encode(this.parameters),
				_dc: new Date().getTime()
			},
			callbackKey: 'callback',
			scope: this,
            callback: this.onRequestComplete
		});
		
		PartKeeprMobile.ServiceCall.registerJSONPCallback(callbackKey, Ext.createDelegate(this.onRequestComplete, this));

		var task = new Ext.util.DelayedTask(this.onRequestTimeout, this, [callbackKey]);
		task.delay(10000);
		PartKeeprMobile.ServiceCall.registerJSONPTimeoutTask(callbackKey, task);
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
	onRequestTimeout: function () {
		PartKeeprMobileApplication.getApplication().stopLoading();
		if (this.timeoutHandler) {
			this.timeoutHandler();	
		}
	},
	onSuccess: function (responseObj) {
		/* Check the status */
		if (responseObj.status == "error") {
			Ext.Msg.alert(i18n("Error"), i18n("Invalid Server Response"));
			return;
		}
		
		/* Check the status */
		if (responseObj.status == "systemerror") {
			Ext.Msg.alert(i18n("Error"), i18n("Invalid Server Response"));
			return;
		}
		
		if (this.sHandler) { 
			this.sHandler(responseObj.response);
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

PartKeeprMobile.ServiceCall.registerJSONPCallback = function (id, callback) {
	if (!(PartKeeprMobile.ServiceCall.callbacks instanceof Ext.util.MixedCollection)) {
		PartKeeprMobile.ServiceCall.callbacks = new Ext.util.MixedCollection();
	}
	
	PartKeeprMobile.ServiceCall.callbacks.add(id, callback);
};

PartKeeprMobile.ServiceCall.registerJSONPTimeoutTask= function (id, task) {
	if (!(PartKeeprMobile.ServiceCall.timeoutTasks instanceof Ext.util.MixedCollection)) {
		PartKeeprMobile.ServiceCall.timeoutTasks = new Ext.util.MixedCollection();
	}
	
	PartKeeprMobile.ServiceCall.timeoutTasks.add(id, task);
};