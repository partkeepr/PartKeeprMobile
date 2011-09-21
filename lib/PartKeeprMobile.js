Ext.ns('PartKeeprMobile');

PartKeeprMobileApplication = {
		app: null,
		
		getApplication: function () {
			return this.app;
		},
		setApplication: function (app) {
			this.app = app;
		}
};

new Ext.Application({
		initializeStores: function () {
			this.serverListStore = new Ext.data.Store({
			    model: "PartKeeprMobile.ServerListModel"
			});
			
			this.serverListStore.load();

			if (this.serverListStore.getCount() == 0) {
				this.serverListStore.add({
					name: 'demo.partkeepr.org',
					server: 'http://demo.partkeepr.org',
					favourite: true
				});
				
				this.serverListStore.sync();
			}
		},
		initialize: function () {
			this.initializeStores();
		},
		getSession: function () {
			return "";
		},
		getServerURL: function () {
			return PartKeeprMobileApplication.getApplication().serverUrl;
		},
		setServerURL: function (url) {
			PartKeeprMobileApplication.getApplication().serverUrl = url;
		},
		startLoading: function (msg) {
			this.stopLoading();
			this.loadingMask = new Ext.LoadMask(Ext.getBody(), {msg: msg});	
			this.loadingMask.show();
		},
		stopLoading: function () {
			if (this.loadingMask instanceof Ext.LoadMask) {
				this.loadingMask.hide();
			}
		},
        launch: function() {
        	PartKeeprMobileApplication.setApplication(this);
        	
        	this.initialize();
        	new PartKeeprMobile.LoginView({
        		fullscreen: true
        	});
        	
        	/*new PartKeeprMobile.ServerView({
        		fullscreen: true
        	});*/
        	/*this.j = new PartKeeprMobile.ServerList({
        		
        	});
        	
        	var k = new Ext.Panel({
        		items: this.j,
        		fullscreen: true,
        		layout: 'fit',
        		
        	});*/
            
        }
    });