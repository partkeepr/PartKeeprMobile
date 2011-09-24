PartKeeprMobile.MainMenu = Ext.extend(Ext.TabPanel, {
	tabBar: {
        dock: 'bottom',
        ui: 'light',
        layout: {
            pack: 'center'
        }
    },
    initComponent: function () {
    	
    	this.searchView = new PartKeeprMobile.SearchView({
    		title: i18n("Search"),
    		iconCls: "search"
    	});
    	
    	this.items = [this.searchView,{
    		title: 'Foo'
    	}];
    	
    	PartKeeprMobile.MainMenu.superclass.initComponent.call(this);    	
    }
});