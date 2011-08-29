PartKeeprMobile.LoginForm = Ext.extend(Ext.Panel, {
	layout: 'fit',
	xtype: 'form',
	scroll: 'vertical',
    initComponent: function () {
    	
    	this.serverSelectField = new Ext.form.Select({
    		label: i18n("Server"),
    		store: PartKeeprMobileApplication.serverListStore,
    		displayField: "name",
    		valueField: "name",
    		name: Ext.id()
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