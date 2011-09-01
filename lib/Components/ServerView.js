PartKeeprMobile.ServerView = Ext.extend(Ext.Panel, {
	layout: 'card',
	initComponent: function () {
		
		this.serverList = new PartKeeprMobile.ServerList();
		
		this.serverListPanel = new Ext.Panel({
			layout: 'fit',
			cardSwitchAnimation: {
				type: 'slide',
				direction: 'right'
				
			},
			dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				title: i18n("Servers")
			},{
    			xtype: 'toolbar',
    			dock: 'bottom',
    			items: {
    				xtype: 'button',
    				text: i18n("Add Server"),
    				handler: this.addServer,
    				scope: this
    			}
    		}],
    		items: this.serverList
		});
		
		this.serverEditor = new PartKeeprMobile.ServerEditor({
			cardSwitchAnimation: 'slide'
		});
		
		this.serverEditor.titleToolbar.add({
			xtype: 'button',
    				text: i18n("Back"),
    				ui: 'back',
    				handler: this.cancelEdit,
    				scope: this
		});
		this.items = [ this.serverListPanel, this.serverEditor ];
		
		this.serverList.on("editServer", this.editServer, this);
		this.serverEditor.on("serverSave", this.onServerSave, this);
		this.serverList.on("itemtap", this.onServerTap, this);
		
		PartKeeprMobile.ServerView.superclass.initComponent.call(this);
	},
	onServerTap: function (dataview, index, item, event) {
		var rec = this.serverList.getRecord(item);
		
		this.fireEvent("serverSelect", rec);
	},
	editServer: function (context) {
		this.serverEditor.loadRecord(context);
		this.setActiveItem(this.serverEditor);
		
		if (context.phantom) {
			this.serverEditor.setTitle("Add Server");
		} else {
			this.serverEditor.setTitle("Edit Server");
		}
	},
	addServer: function () {
		var j = Ext.ModelMgr.create({ protocol: 'https'}, 'PartKeeprMobile.ServerListModel');
		
		this.editServer(j);
	},
	cancelEdit: function () {
		this.setActiveItem(this.serverListPanel);
	},
	onServerSave: function (editor) {
		editor.updateRecord(editor.record);
		
		if (editor.record.phantom) {
			this.serverList.store.add(editor.record);
		}
		this.serverList.store.sync();
		
		this.setActiveItem(this.serverListPanel);
	}
});