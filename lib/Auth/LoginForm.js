PartKeeprMobile.LoginForm = Ext.extend(Ext.Panel, {
	layout: 'fit',
	xtype: 'form',
	scroll: 'vertical',
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
          
          this.serverSelectField
          
          ]
        }];
    	
    	
    	PartKeeprMobile.LoginForm.superclass.initComponent.call(this);
	}	
});