PartKeeprMobile.ServerEditor = Ext.extend(Ext.form.FormPanel, {
	initComponent: function () {
		
		this.titleToolbar = new Ext.Toolbar({
			dock: 'top',
			xtype: 'toolbar',
			title: i18n("Edit Server")
		});
		
		
		this.dockedItems = [ this.titleToolbar ];
		
		this.nameField = Ext.ComponentMgr.create({
		    xtype: 'textfield',
		    name : 'name',
		    label: i18n('Name')
		});
		
		this.items = [
				this.nameField,
				new Ext.form.Url({
					name: 'server',
					label: i18n("Server URL")
				}),
				new Ext.form.Select({
					name: 'protocol',
					label: i18n("Protocol"),
					options: [{
						text: 'http',
						value: 'http'
					}, {
						text: 'https',
						value: 'https'
					}]
				}),
				new Ext.Button({
					scope: this,
					handler: function () {
							if (this.nameField.getValue() == "") {
								Ext.Msg.alert(i18n("Name required"), i18n("You need to enter a name for the server entry"));
								return;
							}
							this.fireEvent("serverSave", this);
					},
					text: 'Save',
					ui: 'confirm',
					style: 'margin-top: 1.5em'
				})
		              ];
				
		PartKeeprMobile.ServerEditor.superclass.initComponent.call(this);
	},
	setTitle: function (title) {
		this.titleToolbar.setTitle(title);
	}
});