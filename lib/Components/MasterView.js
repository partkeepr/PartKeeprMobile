PartKeeprMobile.MasterView = Ext.extend(Ext.Panel, {
	layout: 'card',
	initComponent: function () {
		this.loginView = new PartKeeprMobile.LoginView({
			cardSwitchAnimation: {
				type: 'slide',
				direction: 'right'
			}	
		});

		this.mainMenu = new PartKeeprMobile.MainMenu({
			cardSwitchAnimation: {
				type: 'slide',
				direction: 'left'
			}
		});
		
		this.items = [ this.loginView, this.mainMenu ];
		
		this.loginView.loginForm.on("login", function () {
			this.setActiveItem(this.mainMenu);
		}, this);
		PartKeeprMobile.MasterView.superclass.initComponent.call(this);	
	}
});