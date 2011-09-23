PartKeeprMobile.SearchForm = Ext.extend(Ext.form.FormPanel, {
	initComponent: function () {
		
		this.searchField = Ext.ComponentMgr.create({
		    xtype: 'textfield',
		    name : 'name',
		    label: i18n('Search Term')
		});
		
		this.items = [ this.searchField, new Ext.Button({
			scope: this,
			handler: function () {
					if (this.searchField.getValue() == "") {
						Ext.Msg.alert(i18n("Search Term required"), i18n("Please enter some search terms"));
						return;
					}
					this.fireEvent("search", this.searchField.getValue());
			},
			text: i18n("Search"),
			ui: 'confirm',
			style: 'margin-top: 1.5em'
		}) ];
		
		PartKeeprMobile.SearchForm.superclass.initComponent.call(this);
		
		this.on("beforesubmit", Ext.createDelegate(function () {
			this.fireEvent("search", this.searchField.getValue());
    		return false;
    	}, this));
	}
});