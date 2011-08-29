Ext.ns('PartKeeprMobile');

var PartKeeprMobileApplication;

new Ext.Application({
		initializeStores: function () {
			this.serverListStore = new Ext.data.Store({
			    model: "PartKeeprMobile.ServerListModel"
			});
			
			this.serverListStore.load();

			if (this.serverListStore.getCount() == 0) {
				this.serverListStore.add({
					name: 'demo.partkeepr.org',
					server: 'demo.partkeepr.org',
					protocol: 'http',
					favourite: true
				});
				
				this.serverListStore.sync();
				console.log("Added demo.partkeepr.org site");
			}
		},
		initialize: function () {
			this.initializeStores();
			console.log("FOO");
		},
        launch: function() {
        	PartKeeprMobileApplication = this;
        	
        	this.initialize();
        	/*new PartKeeprMobile.LoginForm({
        		fullscreen: true
        	});*/
        	
        	new PartKeeprMobile.ServerView({
        		fullscreen: true
        	});
        	/*this.j = new PartKeeprMobile.ServerList({
        		
        	});
        	
        	var k = new Ext.Panel({
        		items: this.j,
        		fullscreen: true,
        		layout: 'fit',
        		
        	});*/
            
        }
    });