PartKeeprMobile.ServerList = Ext.extend(PartKeeprMobile.AdvancedList, {
	itemTpl : '{name}',
	
    initComponent: function () {
    	this.store = PartKeeprMobileApplication.serverListStore;
    	
    	this.contextMenu = new PartKeeprMobile.ContextMenu({
    		commands: [
    		           { title: i18n("Delete Server"), command: 'delete-server' },
    		           { title: i18n("Edit Server"), command: 'edit-server' }
    		           ]
    	});
    	
    	this.on("itemtaphold", this.onItemTapHold, this);
    	
    	PartKeeprMobile.ServerList.superclass.initComponent.call(this);
    	
		this.contextMenu.on("command", this.commandHandler, this);
    	
    },
    onItemTapHold: function (record) {
    	this.showContextMenu(record);
    },
    showContextMenu: function (record) {
    	this.contextMenu.setContext(record);
    	this.contextMenu.titleToolbar.setTitle(record.get("name"));
    	this.contextMenu.show("pop");
    },
    commandHandler: function (command, context) {
    	switch (command) {
    		case "edit-server":
    			this.fireEvent("editServer", context);
    			break;
    		case "delete-server":
    			Ext.Msg.confirm(i18n("Delete Server"), sprintf(i18n("Do you really wish to delete the server %s?"), context.get("name")), function (button) {
    				if (button == "yes") {
    					this.store.remove(context);
            			this.store.sync();	
    				}
    			}, this);
    			break;
    	}
    	
    }
});