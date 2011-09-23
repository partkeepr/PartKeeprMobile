PartKeeprMobile.SearchView = Ext.extend(Ext.Panel, {
	layout: 'card',
	initComponent: function () {
		
		this.store = new Ext.data.Store({
			model: 'PartKeeprMobile.Part',
			proxy: {
				type: 'rest',
				url: PartKeeprMobileApplication.getApplication().getServer().get("server") + "/rest.php/Part",
				reader: {
		            type: 'json',
		            root: 'response.data'
		            /*successProperty: "success",
		            messageProperty: 'message',
		            totalProperty  : 'response.totalCount'*/
		        }
			}
		});
		
		
		this.searchForm = new PartKeeprMobile.SearchForm();
		this.searchResults = new PartKeeprMobile.SearchResults({
			store: this.store
		});
		
		this.items = [ this.searchForm, this.searchResults ];
		
		this.searchForm.on("search", this.startSearch, this);
		
		PartKeeprMobile.SearchView.superclass.initComponent.call(this);
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
		this.setActiveItem(this.searchResults);
	}
});

Ext.override(Ext.data.Proxy, {
	setReader: function(reader) {
	    if (reader == undefined || typeof reader == 'string') {
	    	console.log("FOO1");
	        reader = {
	            type: reader
	        };
	    }

	    console.log(reader);
	    if (reader instanceof Ext.data.Reader) {
	    	console.log("FOO2");
	        reader.setModel(this.model);
	    } else {
	        Ext.applyIf(reader, {
	            proxy: this,
	            model: this.model,
	            type : this.defaultReaderType
	        });
	        console.log("FOO3");
	        reader = Ext.data.ReaderMgr.create(reader);
	    }
	    
	    this.reader = reader;
	    
	    console.log(this.reader);
	    return this.reader;
	}
});
