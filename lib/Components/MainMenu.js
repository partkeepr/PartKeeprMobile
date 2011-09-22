PartKeeprMobile.MainMenu = Ext.extend(Ext.TabPanel, {
	tabBar: {
        dock: 'bottom',
        ui: 'light',
        layout: {
            pack: 'center'
        }
    },
    defaults: {
    	scroll: 'vertical'
    },
    initComponent: function () {
    	
    	this.items = [{
    		title: 'About'
    	},{
    		title: 'Foo'
    	}];
    	
    	PartKeeprMobile.MainMenu.superclass.initComponent.call(this);    	
    }
});