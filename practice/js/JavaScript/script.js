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