var state=({})

//Create Our Models


var Vendor = Parse.Object.extend({
  className: 'Vendor',
	defaults: {
		vendorName:'',
		vendorAddress:'',
		purchasingContactName:'',
		purchasingContactEmail:''
  },  
    update: function(obj){
      this.set(obj);
  },
	
  setActive: function(){
    state.activeVendor=this
  },
  
  //Modify the toJSON method so that it includes the cid.  
  toJSON: function() {
  var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
  json.cid = this.cid;
  return json;
}
});

var VendorList = Parse.Collection.extend({
	model: Vendor,
  
  set: function(model,options){
    if(model.id===undefined){
      this.add(model);
    }
    model.save();
  }
  
});


// var PurchaseOrder = Backbone.Model.extend({
// 	defaults: {
// 		businessPurpose: '',
// 		status: 'Setup',
// 		vendorName: '',
//     vendorPurchasingContact:'',
//     vendorPurchasingEmail:'',
// 		createDate: moment.utc().format(),
// 		lineitems:'',
// 		approvedDate: ''
// 	}


// });

// var PurchaseOrderItem = Backbone.Model.extend({
// 	defaults: {
//     partID:'',
//     partName:'',
// 		quantity: 0,
// 		price: '',
// 		requiredShipDate: ''
// 	}

	
// });

// var Part = Backbone.Model.extend({
// 	defaults: {
// 		supplierPartNumber:'',
// 		partName: '',
// 		defaultPrice:null
// 	}
// });



// //Create instances

// var PurchaseOrderList = Backbone.Collection.extend({
// 	model: PurchaseOrder
// });

// var PurchaseOrderItemList = Backbone.Collection.extend({
// 	model: PurchaseOrderItem
// });

// var PartList = Backbone.Collection.extend({
// 	model: Part
// });

// var initPurchaseOrders = {id:1,
// 		businessPurpose: 'We need more stuff',
// 		status: 'Setup',
// 		vendor: 'Trenton',
// 		createDate: moment.utc().format(),
// 		approvedDate: ''}


// //Create purchase order collection and populate
// var purchaseOrderList = new PurchaseOrderList();
// purchaseOrderList.reset(initPurchaseOrders);




     

