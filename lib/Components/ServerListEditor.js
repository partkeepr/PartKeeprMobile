PartKeeprMobile.ServerListEditor = Ext.extend(PartKeeprMobile.AdvancedList, {
	itemTpl : '{name}',
	
    initComponent: function () {
    	this.store = PartKeeprMobileApplication.serverListStore;
    	
    	this.on("itemtaphold", this.onItemTapHold, this);
    	
    	PartKeeprMobile.ServerListEditor.superclass.initComponent.call(this);
    	
    	
    },
    onItemTapHold: function (record) {
    	console.log(record);
    }
});