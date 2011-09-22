Ext.regModel('PartKeeprMobile.ServerListModel', {
    fields: [
             {
            	name: 'id',
            	type: 'string'
             },
             {
            	name: 'name',
            	type: 'string'
             },
            {
            	name: 'server',
            	type: 'string',
            },{
            	name: 'favourite',
            	type: 'boolean', defaultValue: false
            }],

    proxy: {
        type: 'localstorage',
        id  : 'server-list'
    },
    checkConnectivity: function (callback) {
    	var j = new PartKeeprMobile.ServiceCall("Ping", "ping");
    	j.setServerURL(this.get("server")+"/service.php");
    	j.setMessage(i18n("Checking connectivity..."));
		j.setHandler(function () {
			console.log("OK");
		});
		j.on("exception", function () {
			Ext.Msg.alert(i18n("Connectivity check failed"), i18n("Could not connect to the specified server. Please specify the exact URL you would use to access the PartKeepr Desktop frontend."));
		});
		
		j.doCall();
    }
});