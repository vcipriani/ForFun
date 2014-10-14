

var VendorControl = Backbone.View.extend({
  template: _.template( 
    '<div id="vendorControl">'+
    '<h1>Vendors</h1>'+
       '<div id="vendorFormContainer"> </div>'+
        '<button id="btnCreateVendor" type="submit" class="pure-button pure-button-primary">Create Vendor</button>'+
    '</div>'
    ),
  render: function(){
    this.$el.html(this.template());
    return this;
  },


  events: {
  'click #btnCreateVendor': function(event){
  event.preventDefault();
  Backbone.history.navigate('vendor',{trigger: true});
  }
  },
  
  hideCreateVendorBtn: function(){
  $('#btnCreateVendor').hide();    
  },
  
  showCreateVendorBtn: function(){
  $('#btnCreateVendor').show();
  }
  
});

var VendorForm = Backbone.View.extend({

  tagName: 'div',
  className: 'editVendor',
  template: _.template('<form id="formNewVendor" class="pure-form pure-form-stacked">' +
              '<fieldset>' +
                  '<legend></legend>' +  
                  '<label for="vendorName">Company Name</label>' +
                  '<input id="vendorName" name="vendorName" placeholder="Company Name" value="<%=vendorName%>">' +
                  '<label for="vendorAddress">Company Address</label>' +
                  '<input id="vendorAddress" name="vendorAddress"  placeholder="Company Address" value="<%=vendorAddress%>">' +
                  '<label for="purchasingContactEmail">Purchasing Contact Email</label>' +
                  '<input id="purchasingContactEmail" name="purchasingContactEmail"  type="email" placeholder="Email" value="<%=purchasingContactEmail%>">' +
                  '<label for="purchasingContactName">Purchasing Contact Name</label>' +
                  '<input id="purchasingContactName" name="purchasingContactName" value="<%=purchasingContactName%>">' +
                  '<button id="btnSaveVendor" type="submit" class="pure-button pure-button-primary">Save Vendor</button>' +
                  '<button id="btnDeleteVendor" type="submit" class="pure-button pure-button-primary">Delete Vendor</button>' +                    
             '</fieldset>' +
          '</form>' +
        '</div>'),
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  
  initialize: function(){
    this.render();
  },
  
  formContents: function(){
    return this.$el.children().toObject({skipBlank:false})
  },  
  
  destroy: function(){
      this.remove();
      //vendorControl.showCreateVendorBtn();
      },
  
  save: function(){
    this.model.set(this.formContents());
    this.model.save();
    this.destroy();
  },
  events: {
    "click #btnSaveVendor": function(event){
      event.preventDefault();
      this.save();
      Backbone.history.navigate('/',{trigger: true});

    },
    "click #btnDeleteVendor": function(event) {
      var check = confirm("Are you sure you want to delete this vendor?")
      if(check===true){
      event.preventDefault();
      this.model.destroy();
      this.destroy();
      Backbone.history.navigate('/',{trigger: true});
}
  }
    
  }
});

var VendorRow = Backbone.View.extend({
  model: Vendor,
  template: _.template('<td><%=vendorName%></td> ' +
                       '<td><%=vendorAddress%></td>' +
                       '<td><%=purchasingContactName%></td>' +
                       '<td><%=purchasingContactEmail%></td>' +
                       '<td><a href="#" class="vendorEdit">Edit</a></td>' +
                      '<td><a href="#" class="vendorSelect">Select</a></td>'),
  
  tagName: 'tr',
  render: function(){
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
  
  //this function selects the model that was clicked
  initialize: function(){
    this.model.on('change', this.render, this)
    this.model.on('remove', this.remove, this)
    },
  events:{
    //When the edit button is clicked, toForm is called
    "click .vendorEdit": function(event){
    event.preventDefault();
      Backbone.history.navigate('vendor/'+this.model.id,{trigger: true});
    },
    
    "click .vendorSelect": function(){this.model.setActive()}
  }
  
 });


var VendorListView = Backbone.View.extend({
  heading: '',
  tagName: 'div',
  id: 'listVendors',
  template: _.template(
          "<table id='tblVendors' class='pure-table-striped'>"+
           ' <thead id="tblVendorsHead">'+
              '<tr>'+
                '<th>Vendor Name</th>'+
                '<th>Address</th>'+
                '<th>Contact Name</th>'+
                '<th>Contact Email</th>'+
                '<th></th>'+
                '<th></th>'+
              '</tr>'+
            '</thead>'+
          '</table>'
        ),
  addAll: function(){
  this.$el.empty();
  this.$el.html(this.template())
  this.collection.forEach(this.addOne, this);
    },
  
  addOne: function(vendor){
   var vendorRow = new VendorRow({model: vendor});  
  $('#tblVendorsHead').after(vendorRow.render().el);
  },
  initialize: function(){
    this.collection.on('reset', this.render, this)
    this.collection.on('add', this.addOne,this)
  },
                   
  render: function(){
    this.addAll();
  }
  
});



