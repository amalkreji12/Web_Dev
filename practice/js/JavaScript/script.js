console.log('Hello World')

function btn(){
    console.log('Button Clicked')

    var a=1;
    aa();
    bb();
    console.log(a)
    function aa(){
        var a=10;
        console.log(a);
    }
    function bb(){
        var a=100;
        console.log(a);
    }


}

function prt(){
    //console.log(x);
    //var x;
    //console.log(k); //not defined

    // function a(){
    //     var b=10;
    //     c();
    //     function c(){
    //         console.log(b);
    //     }
    // }
    // a();
    //console.log(b); //not defined

    // var a=10;  
    // var a=30;
    // console.log(a);  //30 will printed

    // let a=10;
    // let a=30;  
    // console.log(a);  // This will give syntax error because let is already declared

    // let a = 100;
    // {
    //     let a = 10;
    //     console.log(a);
    // }
    // console.log(a);

    //setTimeout and closures

    // function x(){
    //     for(var i=1;i<=5;i++){
    //         function close(i){
    //             setTimeout(function(){
    //                 console.log(i);
    //             },i*2000);
    //         }
    //         close(i);            
    //     }   
    // }
    // x();

    // function outer(b){
    //     var a=10;
    //     function inner(){
    //         console.log(a,b);
    //     }
    //     //return inner;
    // }
    // var close=outer("hello");
    // close();

    // Different functions terminology

    //Function Statement aka Funtion Declaration
    // a();
    // //b();
    // function a(){
    //     console.log('a is called');
    // }

    // // Function Expression
    // var b=function(){
    //     console.log('b is called');
    // }

    // Anonymous Function  -- Function without name
    // function(){

    // }

   // Named Function Expression
    // var b=function abc(){  //abc is given again as a function name
    //     console.log('b is called');
    // }

    //Parameters and Aguments
    // a(a,b);  //a,b are arguments
    // function a(p1,p2) // p1 and p2 are parameters

    //First Class Functions
    // Passing another function into a function
    // function s(para1){
    //     console.log(para1);
    // }     
    // function d(){
    // }
    // s(d);

    //Arrow Functions

    // Class Stack

    setTimeout(function(){
        console.log('timer');
    },5000);

    function x(y){
        console.log('x');
        y();
    }
    x(function y(){
        console.log('y');
    });

}

//Event Listener
function attachEventListner(){     ///closure along with event listener
    let count=0;
    document.getElementById("button1").addEventListener("click",function abc(){
    console.log('Button Clicked',++count);
    });
}
attachEventListner();

//HIGHER ORDER FUNCTIONS

const radius=[2,3,4,1];

const area=function(radius){
    return Math.PI*radius*radius;
};
const circumference=function(radius){
    return 2*Math.PI*radius;
};
const diameter=function(radius){
    return 2*radius;
};

const calculate=function(radius,logic){
    const output=[];
    for(let i=0;i<radius.length;i++){
        output.push(logic(radius[i]));
    }
    return output;
};

// console.log(calculate(radius,area));
// console.log(calculate(radius,circumference));
// console.log(calculate(radius,diameter));

/////// MAP ////////////////////////////////////////////////////

const arr=[1,2,3,4,5];

// function double(x){
//     return x*2;
// }

// //const output=arr.map(double);
// const output=arr.map(function(x){
//     return x*3;
// });
// console.log(output);

//////////////////////////// FILTER /////////////////////////////////////

/// odd values

// function isOdd(x){
//     return x%2;
// }
// const out=arr.filter(isOdd);
// console.log(out);

///////////////////////////////// REDUCE /////////////////////////////////////////////

// Use when we have to take a whole array and come out with a single value
// SUM
// const output=arr.reduce(function(acc,curr){
//     acc=acc+curr;
//     return acc;
// },0);

// console.log(output);

//LARGEST

// const large=arr.reduce(function(acc,curr){
//     if(curr>acc){
//         acc=curr;
//     }
//     return acc;
// },0);
// console.log(large);

//////////////////////////////////////////////////////////////////////////////////////////////////

const user = [
    {firstName:'Apple',lastName:'Mango',age:10},
    {firstName:'Banana',lastName:'Orange',age:20},
    {firstName:'Pineapple',lastName:'Watermelon',age:10},
    {firstName:'Grapes',lastName:'Kiwi',age:40}
];

// LIST WITH FULL NAME
//MAP

const out=user.map(function(x){
    return x.firstName + ' ' + x.lastName;
})

console.log(out);

/// AGE COUNT
// REDUCE

const output = user.reduce(function(acc,curr){
    if(acc[curr.age]){
        acc[curr.age] = ++acc[curr.age];
    }else{
        acc[curr.age] = 1;
    }
    return acc;
},{});

console.log(output);

/// PRINT FIRST NAME OF ALL ,AGE <30
// FILTER

 const outFilter = user.filter((x)=>x.age<20).map((x)=>x.firstName);
 console.log(outFilter);