PartKeeprMobile.SearchView = Ext.extend(Ext.Panel, {
	layout: 'card',
	initComponent: function () {
		
		this.store = new Ext.data.Store({
			model: 'PartKeeprMobile.Part',
			clearOnPageLoad: false,
			proxy: {
				type: 'rest',
				url: PartKeeprMobileApplication.getApplication().getServer().get("server") + "/rest.php/Part",
				reader: {
		            type: 'json',
		            root: 'response.data',
		            successProperty: "success",
		            messageProperty: 'message',
		            totalProperty  : 'response.totalCount'
		        }
			}
		});
		
		
		this.searchForm = new PartKeeprMobile.SearchForm({
			cardSwitchAnimation: {
				type: 'slide',
				direction: 'right'
			}
		});
		
		this.searchResults = new PartKeeprMobile.SearchResults({
			store: this.store
		});
		
		this.searchResultsPanel = new Ext.Panel({
			cardSwitchAnimation: {
				type: 'slide',
				direction: 'left'
			},	
			layout: 'fit',
			dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				title: i18n("Search Results"),
				items: [{
						xtype: 'button',
	    				text: i18n("Back"),
	    				ui: 'back',
	    				handler: this.onSearchResultsBack,
	    				scope: this
					}]
			}],
			items: this.searchResults
		});
		
		this.items = [ this.searchForm, this.searchResultsPanel ];
		
		this.searchForm.on("search", this.startSearch, this);
		
		PartKeeprMobile.SearchView.superclass.initComponent.call(this);
	},
	onSearchResultsBack: function () {
		this.setActiveItem(this.searchForm);
	},
	startSearch: function (term) {
		this.store.getProxy().extraParams.query = term;
		this.store.getProxy().extraParams.session = PartKeeprMobileApplication.getApplication().getSession();
		this.store.load({
			scope: this,
			callback: this.showResults
		});
	},
	showResults: function () {
		this.setActiveItem(this.searchResultsPanel);
	}
});
