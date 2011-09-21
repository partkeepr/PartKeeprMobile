PartKeeprMobile.LoginForm = Ext.extend(Ext.form.FormPanel, {
    initComponent: function () {
    	
    	this.serverSelectField = new PartKeeprMobile.ServerSelectField({
    		label: i18n("Server")
    	});
    	
        this.items = [{
            xtype: 'fieldset',
            title: i18n("PartKeepr Login"),
            items: [{
          	  xtype: "textfield",
        	  required: true,
        	  label: i18n('Username'),
              useClearIcon: true
          }, {
        	  xtype: 'passwordfield',
              name: 'password',
              label: i18n('Password'),
              required: true,
              useClearIcon: true
          },
          
          this.serverSelectField,
          
          ]
        },{
          	  xtype: 'button',
          	  ui: 'confirm',
          	  style: 'margin-top: 1.5em',
          	  text: i18n("Login"),
          	  scope: this,
          	  handler: this.foo
            
        }];
    	
    	
    	PartKeeprMobile.LoginForm.superclass.initComponent.call(this);
	},
	foo: function () {
		var j = new PartKeeprMobile.ServiceCall("Auth", "login");
		j.setParameter("username", "admin");
		j.setParameter("password", md5("admin"));
		j.setHandler(Ext.createDelegate(this.bar, this));
		j.doCall();
	},
	bar: function (v) {
		console.log(v);
		
	}
});