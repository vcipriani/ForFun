
//Create simple array for testing
var arr=[1,2,3];

//////////////////////////////////////////////
//Create some basic functions to test the callbacks on new array methods
//////////////////////////////////////////////


//Function takes an input number and returns a function that multiplies by the input - unnecessary for array testing but fun
function multiply(num){return function(x){ return x*num;}}


//Instance of multiply.  Multiplies by 2
var x2 = multiply(2);

//Returns true if odd
function odd(num) {return !((num % 2) === 0);}

//Returns true if even
function even(num) {return (num % 2) === 0;}

//Sums two parameters
function sum(a,b) {return a+b;}

//////////////////////////////////////////////
///Actual Array methods below
/////////////////////////////////////////////


//forEach loops through an array and applies a function to each element.  Does not return anything
Array.prototype.forEach2 = function(func){
    for(var i=0; i<this.length; i++){
        func(this[i],i,this);
    }
}

//filter loops through array and applies a function.  It returns an array of all elements where the callback
//function returned true
Array.prototype.filter2 = function(func){
    var results = [];

    for(var i=0; i<this.length; i++){
        if (func(this[i],i,this)) {results.push(this[i]);}
    }
    
    return results;
}

//map loops through array and applies a function to each element.  it returns an array of the results;
Array.prototype.map2 = function(func) {
    var results = [];
    
    for(var i=0; i<this.length; i++){
        results.push(func(this[i],i,this));
    }
    
    return results;
}

//reduce takes a callback and applies it to each element. It takes the returned value and passes it back into 
//the next iteration of the function; therfore, "reduce"ing it.
Array.prototype.reduce2 = function(func, initialValue) {
    
    //if no initial value provided use first element of array
    var previousValue = initialValue || this[0];
    
    //If no initial value, call arr[0] the previous value and arr[1] the current value on first call
    var startingPoint = (initialValue) ? 0:1
    for(var i=startingPoint; i<this.length; i++){
        previousValue = func(previousValue,this[i],i,this);
    }
    
    return previousValue;
}
