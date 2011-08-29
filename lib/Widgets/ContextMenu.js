Ext.regModel('PartKeeprMobile.ContextMenuActions', {
            fields: ['title', 'command']
});

PartKeeprMobile.ContextMenu = Ext.extend(Ext.List, {
	itemTpl : '{title}',
	floating: true,
    width: 350,
    height: 370,
    centered: true,
    singleSelect: false,
    modal: true,
    hideOnMaskTap: true,
	initComponent: function () {
		
		this.store = new Ext.data.Store({
            model: 'PartKeeprMobile.ContextMenuActions',
            sorters: 'title',
            data: this.commands
		});
		
		PartKeeprMobile.ContextMenu.superclass.initComponent.call(this);
		
		this.addEvents("command");
		this.on("itemtap", this._onItemTap, this);
	},
	setContext: function (context) {
		this.context = context;
	},
	_onItemTap: function (dataview, index, item, event) {
		this.hide();
		var record = this.getRecord(item);
		this.deselect(record);
		this.fireEvent("command", record.get("command"), this.context);
	},
	show: function () {
		this.deselect(this.getSelectedRecords());
		PartKeeprMobile.ContextMenu.superclass.show.apply(this, arguments);
	}
});
	