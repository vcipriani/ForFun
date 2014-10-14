
var App = Backbone.Router.extend({

  routes: {"": "index",
           "index": "index",
           "vendor/:id": "showVendor",
           "vendor": "newVendor"},
  
    initialize: function(){
    Parse.initialize("ZE0QcNCgcti3ki8VLo83ATycg4HGFyXJhxNXbIwo", "uEaJdYzJdjb4v2jHw7XmINAJtB6VHsrQqmqhnCZy"); 
    Backbone.history.start({pushState: true});
    //Disables page refreshes when clicking local links starting w/ "/" - ensures router is used.
    backbonePushState();
    this.index();
},
  
  index: function(){
    $('#main').html('')
 //if(this.vendorList===undefined){
    this.vendorControl = new VendorControl ({});
    this.vendorList = new VendorList();   
    this.vendorListView = new VendorListView ({collection: this.vendorList});
    this.vendorList.fetch({remove: false})
// };

     this.vendorListView.render();
     this.vendorControl.render(); 
     this.vendorControl.$el.append(this.vendorListView.el);
     $('#main').append(this.vendorControl.el); 
  },
  
  newVendor: function(){
     this.tempVendor = new Vendor({});
     this.vendorForm = new VendorForm({model:this.tempVendor});
     this.vendorControl.hideCreateVendorBtn();
    $('#vendorFormContainer').html(this.vendorForm.el);  
  },
  
  showVendor: function(id){
  //TODO - check and see if model is in collection. If so grab, if not fetch from server
    var vendorForm = new VendorForm({model: this.vendorList.get(id)});
    $('#vendorFormContainer').html(vendorForm.el);
  }
  
  
    
  

})