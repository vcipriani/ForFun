
(function($) {
        $.fn.extend({
          
          //Function loops through a form and returns the contents as an object
          //Can optionally pass
          toObject: function(options) {
            if(typeof options=='undefined'){
              var options={};
              var skipBlank = true
            }
            else {
              var skipBlank = options.skipBlank
              }
                        var result = {};
                        $.each(this.serializeArray(), function(i,v) {
                          if(v.value!='' || !skipBlank){    
                            result[v.name]=v.value;
                          }
                        });
                        return result;
                },
                fromObject: function(obj) {
                        $.each(this.find(':input'), function(i,v){
                                var name= $(v).attr('name');
                                if (obj[name]) {
                                        $(v).val(obj[name]);
                                } else {
                                        $(v).val('');
                                }
                        });
                }
                
        });
}) (jQuery);