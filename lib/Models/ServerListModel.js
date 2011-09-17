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
            	name: 'protocol',
            	type: 'string',
            }, {
            	name: 'favourite',
            	type: 'boolean', defaultValue: false
            }],

    proxy: {
        type: 'localstorage',
        id  : 'server-list'
    }
});