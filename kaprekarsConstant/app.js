

var app = function() {
    
    //Load the functions from the Kaprekar Libary;
    var k = karepkarFunctions();
    
    //Load HTML from index.html
    var templateSource = $("#stepTemplate").html();

    //Create handlebars template creator
    var template = Handlebars.compile(templateSource);
    
    //Immediately invoked Anonymous initialize function
    (function(){
        
        //Click Monitoring
          $("#run").click(function (e){
                //Grab user input
                userEntered = parseInt($('#kaprekarInput').val());
                
                //Validate Input and execute program
                validateInput(userEntered, executeApp);
          
                //Disable page refresh
                return false;
        })
    })()
    
    ////////////////////////////////////////////////////
    //Proecedures
    ////////////////////////////////////////////////////
    
    //Runs Kaprekar's routine and updates the dom
    function executeApp(input){
        var html = render(k.kaprekarsRoutine(input));
        $('#solution').html(html);
    }
    
    //Returns html based on data passed in (based on template var)
    function render(data){
        return template(data);
    }
    
    //Validates that a 4 digit number was entered and executes a callback function if so
    function validateInput(input,callBack){
        if(input.toString().length===4 && typeof input==="number"){
            return callBack(input);
        }
        
        return alert('Make sure to enter a 4 digit number');
    }
    
}