PartKeeprMobile.SearchResults = Ext.extend(Ext.List, {
	plugins: [new mobile.plugins.ListPullPager({
        previousFn: function(cb,scope){
        	this.cmp.store.previousPage(); 
        	cb.call(this);
		},
		nextFn: function(cb,scope){
        	this.cmp.store.nextPage(); 
        	cb.call(this);
		}
	})],
	initComponent: function () {
		this.itemTpl = '{name}<br/><small>{stockLevel} {partUnitName} available</small>';
		PartKeeprMobile.SearchResults.superclass.initComponent.call(this);
		
		//this.store.on("load", this.onPageLoad, this);
	},
	onPageLoad: function () {
		console.log(this.scroller);
		if (!this.scroller) { return; };
		this.scroller.scrollTo({
			x: 0,
			y: 0
		}, true);
	}
});