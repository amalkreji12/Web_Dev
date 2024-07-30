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

    function a(){
        var b=10;
        c();
        function c(){
            console.log(b);
        }
    }
    a();
    //console.log(b); //not defined


}