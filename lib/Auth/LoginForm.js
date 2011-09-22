PartKeeprMobile.LoginForm = Ext.extend(Ext.form.FormPanel, {
    initComponent: function () {
    	
    	this.serverSelectField = new PartKeeprMobile.ServerSelectField({
    		label: i18n("Server")
    	});
    	
    	this.usernameField = Ext.ComponentMgr.create({
    		xtype: "textfield",
      	  	required: true,
      	  	label: i18n('Username'),
      	  	value: 'admin',
            useClearIcon: true
    	});
    	
    	this.passwordField = Ext.ComponentMgr.create({
      	  	xtype: 'passwordfield',
          	name: 'password',
          	label: i18n('Password'),
          	value: 'admin',
          	required: true,
          	useClearIcon: true
    	});
    	
        this.items = [{
            xtype: 'fieldset',
            title: i18n("PartKeepr Login"),
            items: [
                    this.usernameField,
                    this.passwordField,
					this.serverSelectField
          ]
        },{
          	  xtype: 'button',
          	  ui: 'confirm',
          	  style: 'margin-top: 1.5em',
          	  text: i18n("Login"),
          	  scope: this,
          	  handler: this.submitLogin
            
        }];
    	
        this.addEvents("login");
        
        if (PartKeeprMobileApplication.getApplication().getServer()) {
        	this.serverSelectField.setValue(PartKeeprMobileApplication.getApplication().getServer().get("name"));
        }
    	PartKeeprMobile.LoginForm.superclass.initComponent.call(this);
    	
    	this.on("beforesubmit", Ext.createDelegate(function () {
    		this.submitLogin();
    		return false;
    	}, this));
	},
	submitLogin: function () {
		if (this.usernameField.getValue() == "") {
			Ext.Msg.show({
				title: i18n("Error"),
				msg: i18n("Please enter an username"),
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});
			return;
		}
		
		if (!PartKeeprMobileApplication.getApplication().getServer()) {
			Ext.Msg.show({
				title: i18n("Error"),
				msg: i18n("Please select a server"),
				buttons: Ext.MessageBox.OK,
				icon: Ext.MessageBox.ERROR
			});
			return;
		};
		
		var j = new PartKeeprMobile.ServiceCall("Auth", "login");
		j.setParameter("username", this.usernameField.getValue());
		j.setParameter("password", md5(this.passwordField.getValue()));
		j.setHandler(Ext.createDelegate(this.onLogin, this));
		j.doCall();
	},
	onLogin: function (v) {
		PartKeeprMobileApplication.getApplication().setSession(v.sessionid);
		this.fireEvent("login");
	}
});