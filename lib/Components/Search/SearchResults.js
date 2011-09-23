PartKeeprMobile.SearchResults = Ext.extend(Ext.List, {
	initComponent: function () {
		this.itemTpl = '{name}<br/><small>{stockLevel} available</small>';
		PartKeeprMobile.SearchResults.superclass.initComponent.call(this);
	}
});