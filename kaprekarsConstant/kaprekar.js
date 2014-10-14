
function karepkarFunctions() {
    
/////////////////////////////////////////
//Private Utility functions
/////////////////////////////////////////
//Used as a callback in sort
var sortDescHelper = function(a,b){
    return b-a;
}

//Used as a callback in sort
var sortAscHelper = function(a,b){
    return a-b;
}

//Takes an input, attempts to convert to string and splits into characters
var parseToChar = function(x) {
    return x.toString().split('');
}

//Parses a string to a number
var convertToNum = function(str){
    return parseInt(str);
}

////////////////////////////////////////////
//Individual Steps of Kaprekar's Routine
///////////////////////////////////////////
//Step 1 of Kaprekar's routine
//Takes a number and and returns asc and desc sorted digits as new numbers in array
var step1 = function(num){
    var numArr = parseToChar(num).map(convertToNum);
    var x = convertToNum(numArr.sort(sortAscHelper).join(''));
    var y = convertToNum(numArr.sort(sortDescHelper).join(''));
    return [x,y];
}

//Step 2 of Kaprekar's routine
//Takes an array of two numbers and subtracts the smaller from the larger
var step2 = function(arr){
    if(arr[0]>=arr[1]){return arr[0]-arr[1];}
    return arr[1]-arr[0];
}


///////////////////////////////////////////////////////////////
//Three implementations of Kaprekar's Routine
///////////////////////////////////////////////////////////////

//Recursive version of Kaprekar's routine - no logic to stop infinite loop
var kaprekarsRecursion = function(num){
       if(num=6174) {
           return num;
       }
       return kaprekarsRecursion(step2(step1(num)));
}

//Recursive w/ a counter to count turns.  Seemed messy to create the counter within each recursive call so I created it in a outer scope.  
var kaprekarsComplicated = function(input){
    var count = 0; //Counter for number of iterations
    
    var combinedSteps = function(num){   
        while(num!=6174 && count<10){ //<10 is to prevent infinite loops
            count++;          
            return combinedSteps(step2(step1(num)));
        }
        return num;
    }
     
    return [combinedSteps(input),count]
   // return {iterations: count, kaprekarsConstant: num};
}

//Non-recursive, but expressive and incorporates the counter

var kaprekarsGoldilocks = function(num){
    var count = 0; //Counter for number of iterations
    var stepObj = {steps: []};//Array to store our results
    
    //Store inital step values
    stepObj.steps.push(logStep(num,count,step1(num)))
        while(num!=6174 && count<10){ //<10 is to prevent infinite loops
            count++;          
            num =  step2(step1(num));
            stepObj.steps.push(logStep(num,count,step1(num)))
        }
        return stepObj;
}


///////////////////////////////////////////////////////////////
//Factory to store steps of Routine
///////////////////////////////////////////////////////////////
//
var logStep = function(initialValue,stepNum,sortedArr) {
    return {initialValue: initialValue,
            stepNum: stepNum,
            sortedArr: sortedArr}   
}

return {kaprekarsRoutine: kaprekarsGoldilocks,
        step1: step1,
        step2: step2};
}