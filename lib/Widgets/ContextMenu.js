Ext.regModel('PartKeeprMobile.ContextMenuActions', {
            fields: ['title', 'command']
});

PartKeeprMobile.ContextMenuList = Ext.extend(Ext.List, {
	itemTpl : '{title}',
	
    singleSelect: false,
    
	initComponent: function () {
		
		this.store = new Ext.data.Store({
            model: 'PartKeeprMobile.ContextMenuActions',
            sorters: 'title',
            data: this.commands
		});
		
		PartKeeprMobile.ContextMenuList.superclass.initComponent.call(this);
		
		this.addEvents("command");
		this.on("itemtap", this._onItemTap, this);
	},
	setContext: function (context) {
		this.context = context;
	},
	_onItemTap: function (dataview, index, item, event) {
		var record = this.getRecord(item);
		this.deselect(record);
		this.fireEvent("command", record.get("command"), this.context);
	}
});

PartKeeprMobile.ContextMenu = Ext.extend(Ext.Panel, {
	floating: true,
    centered: true,
    modal: true,
    minWidth: 250,
    width: 300,
    hideOnMaskTap: true,
	initComponent: function () {
		this.titleToolbar = new Ext.Toolbar({
			dock: 'top',
			xtype: 'toolbar'
		});
		
		if (this.title) {
			this.titleToolbar.setTitle(this.title);
			
		}
		
		this.dockedItems = [ this.titleToolbar ];
		
		this.addEvents("command");
		
		this.list = new PartKeeprMobile.ContextMenuList({
			commands: this.commands
		});
		
		this.list.on("command", this.onCommand, this);
		
		this.items = this.list;
		
		PartKeeprMobile.ContextMenu.superclass.initComponent.call(this);
	},
	setContext: function (context) {
		this.list.setContext(context);
	},
	onCommand: function (command, context) {
		this.hide();
		this.fireEvent("command", command, context);
	},
	show: function () {
		this.list.deselect(this.list.getSelectedRecords());
		PartKeeprMobile.ContextMenu.superclass.show.apply(this, arguments);
	}
});