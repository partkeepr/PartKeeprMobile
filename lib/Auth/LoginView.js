PartKeeprMobile.LoginView = Ext.extend(Ext.Panel, {
	layout: 'card',
	initComponent: function () {
		this.loginForm = new PartKeeprMobile.LoginForm({cardSwitchAnimation: {
				type: 'slide',
				direction: 'right'
				
			}});
		this.serverView = new PartKeeprMobile.ServerView({
			cardSwitchAnimation: {
				type: 'slide',
				direction: 'left'
				
			}
		});
		
		
		this.items = [ this.loginForm, this.serverView ];
		
		this.loginForm.serverSelectField.on("masktap", this.onShowServerList, this);
		this.serverView.on("serverSelect", this.onServerSelected, this);
		PartKeeprMobile.ServerView.superclass.initComponent.call(this);
	},
	onShowServerList: function () {
		this.setActiveItem(this.serverView);
	},
	onServerSelected: function (rec) {
		this.setActiveItem(this.loginForm);
		this.loginForm.serverSelectField.setValue(rec.get("name"));
	}
});