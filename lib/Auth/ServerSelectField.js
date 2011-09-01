PartKeeprMobile.ServerSelectField = Ext.extend(Ext.form.Field, {
	ui: 'select',
	
	initComponent: function () {
		this.tabIndex = -1;
        this.useMask = true;

        PartKeeprMobile.ServerSelectField.superclass.initComponent.apply(this, arguments);
	},
	onMaskTap: function() {
		this.fireEvent("masktap");
    }
});