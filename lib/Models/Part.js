Ext.regModel('PartKeeprMobile.Part', {
	fields: [
	         {	id: 'id', name: 'id',		type: 'int' },
	         {	name: 'category',			type: 'int'},
	         {	name: 'footprint',			type: 'int'},
	         {	name: 'storageLocation',	type: 'int'},
	         {	name: 'partUnit',			type: 'int'},
	         {	name: 'averagePrice',		type: 'float'},
	         {	name: 'name',				type: 'string'},
	         {	name: 'comment',			type: 'string'},
	         {	name: 'status',				type: 'string'},
	         {	name: 'stockLevel',			type: 'int'},
	         {	name: 'minStockLevel',		type: 'int'},
	         {	name: 'createDate',			type: 'datetime'},
	         {	name: 'needsReview',		type: 'boolean'},
	         
	         // Various things that don't belong to the part, but are transmitted anyways to make handling easier
	         {	name: 'initialStockLevel',		type: 'int'},
	         {	name: 'initialStockLevelUser',	type: 'int'},
	         {	name: 'initialStockLevelPrice',	type: 'float'},
	         {	name: 'initialStockLevelPricePerItem',	type: 'boolean'},
	         {	name: 'partUnitName',		type: 'string'},
	         {	name: 'footprintName',		type: 'string'},
	         {	name: 'storageLocationName',type: 'string'},
	         {	name: 'categoryName',		type: 'string'},
	         {	name: 'categoryPath',		type: 'string'},
	         {	name: 'attachmentCount',	type: 'int'},
	         {
	        	 name: 'partUnitDefault',
	        	 type: 'boolean',
	        	 convert: function (val) {
	        		 if (val === "true" || val === "1" || val === true)
	        		 { return true; }
	        		 else { return false; }
	        		 }
	         }
	         
	         ]
});
