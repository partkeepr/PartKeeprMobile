PartKeeprMobile.LoginView = Ext.extend(Ext.Panel, {
	layout: 'card',
	initComponent: function () {
		this.loginForm = new PartKeeprMobile.LoginForm();
		
		this.loginPanel = new Ext.Panel({
			layout: 'fit',
			cardSwitchAnimation: {
				type: 'slide',
				direction: 'right'
			},
			dockedItems: [{
				dock: 'top',
				xtype: 'toolbar',
				title: i18n("PartKeepr Mobile")
			}],
			items: this.loginForm
		});
		
		this.serverView = new PartKeeprMobile.ServerView({
			cardSwitchAnimation: {
				type: 'slide',
				direction: 'left'
				
			}
		});
		
		
		this.items = [ this.loginPanel, this.serverView ];
		
		this.loginForm.serverSelectField.on("masktap", this.onShowServerList, this);
		this.serverView.on("serverSelect", this.onServerSelected, this);
		PartKeeprMobile.ServerView.superclass.initComponent.call(this);
	},
	onShowServerList: function () {
		console.log(this);
		this.getLayout().setActiveItem(this.serverView);
	},
	onServerSelected: function (rec) {
		this.setActiveItem(this.loginPanel);
		PartKeeprMobileApplication.getApplication().setServer(rec);
		this.loginForm.serverSelectField.setValue(rec.get("name"));
	}
});