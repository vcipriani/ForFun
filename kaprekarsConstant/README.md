
#####Intro

[Demo](http://htmlpreview.github.io/?https://github.com/vcipriani/ForFun/blob/master/kaprekarsConstant/index.html)

I was reading the other day and stumbled on Kaprekar's constant (jump to bottom to read about it).  Immediately, I thought this would be a cool project to try and model out using javascript and functional programming. I created a simple SPA that accepts a 4 digit number and prints the iterations on the screen.  This project turned out to be a great microcosm of everything I've been reading studying.  It contains:

-Closure  
-Recursion  
-Callbacks  
-Modules   
-Input validation
-jQuery and handlebars,js to handle the DOM.  

#####To Do  
-Update HTML template to look better and provide more context into the calculation

#####Wikipedia description of Kaprekar's constant below:

6174 is known as Kaprekar's constant after the Indian mathematician D. R. Kaprekar. This number is notable for the following property:

1. Take any four-digit number, using at least two different digits. (Leading zeros are allowed.)  

2. Arrange the digits in descending and then in ascending order to get two four-digit numbers, adding leading zeros if necessary.  

3. Subtract the smaller number from the bigger number.  

4. Go back to step 2.  

The above process, known as Kaprekar's routine, will always reach its fixed point, 6174, in at most 7 iterations.[4] Once 6174 is reached, the process will continue yielding 7641 – 1467 = 6174. For example, choose 3524:

5432 – 2345 = 3087  
8730 – 0378 = 8352  
8532 – 2358 = 6174  
7641 – 1467 = 6174  