/**
 * Adds some features to the stock sencha list:
 * 
 * - Item Tap Hold support
 */
PartKeeprMobile.AdvancedList = Ext.extend(Ext.List, {
	initComponent: function () {
		PartKeeprMobile.AdvancedList.superclass.initComponent.apply(this, arguments);
		
		this.tapHold = false;
		
		this.addEvents(
					/**
					 * Fires when an item is taphold'ed.
					 * 
					 * Parameters for the event listener:
					 * record	The record
					 * list		The reference to this list
					 */
					"tapitemhold"
		);
	},
	onRender: function () {
		PartKeeprMobile.AdvancedList.superclass.onRender.apply(this, arguments);
		
		this.mon(this.getTargetEl(), {
    		scope: this,
    		taphold: this._onTapHold
    	});
		
		this.tapHold = false;
	},
	_onTapHold: function (e) {
		this.tapHold = true;
		
		var node = e.getTarget();
    	
		var record = this.getRecord(node);
    	
    	if (!record) {
    		record = this.getRecord(node.parentNode);
    	}
    	
    	if (record) {
    		this.fireEvent("itemtaphold", record, this);
    	}
    	
	},
	onTap: function(e) {
		if (this.tapHold) {
			this.tapHold = false;
		} else {
			PartKeeprMobile.AdvancedList.superclass.onTap.apply(this, arguments);
		}
	}
});
	