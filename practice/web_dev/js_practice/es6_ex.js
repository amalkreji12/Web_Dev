
// class Hello{
//     constructor(num1,num2){
//         this.num1=num1;
//         this.num2=num2;
//     }

//     hello(){
//         console.log('Hello :' +(this.num1+this.num2));

//     }
// }
// let a=new Hello(10,20);
// a.hello();

/// Inheritance /////////////////////////////////////////////////////////////////////////////

class Sample{
    sampleHello(){
        console.log('Hello World')
    }
}
class Hello extends Sample{
    constructor(num1,num2){
        super();
        this.num1=num1;
        this.num2=num2;
    }
    hello(){
        console.log('Hello :' +(this.num1+this.num2));
    }
}
let a=new Hello(10,20);
a.hello();
a.sampleHello();

///// Arrow Function //////////////////////////////////////////////////////////////////////////////

function addNum(a,b){
     console.log(a+b);
}

let add=(a,b) => console.log(a+b);    ////arrow function
add(10,20);

///////
// Callback

//Syn

// function Task(millSecTime){
//     dt=new Date();
//     while((new Date-dt) <= millSecTime){

//     }
// }
// console.log('started');
// Task(2000);
// console.log('ended');

///Async
// function showEnd(){              //showEnd is callback here .means we give a function as an argument is async
//     console.log('ended');
// }

// console.log('started');
// setTimeout(showEnd,2000);

// console.log('started');
// setTimeout(showEnd,2000);

// console.log('started');
// setTimeout(showEnd,2000);

//// callback sample

var hello=function(data){
    console.log('Data :'+data);
}

var hey=function(callback){
    callback('World');
}
hey(hello);

/////////////////////
// Module example

var mo=require('./basics')
mo.hello();

