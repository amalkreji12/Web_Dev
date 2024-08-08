
///USING CALLBACK

// function add(num1,num2,callback){
//     let err=false;
//     if(num1 ==0){
//         err=true
//     }
//     callback(num1+num2,err);
// }
// function multiply(num1,num2,callback){
//     callback(num1*num2);
// }
// function divide(num1,num2,callback){
//     callback(num1/num2);
// }

// add(10,20,(sum,err)=>{
//     if(err){
//         console.log('First number is zero');
//     }else{
//         console.log(sum);  
//         // multiply(sum,sum,(product)=>{
//         //     console.log(product);
//         // })
//         multiply(sum,sum,function(product){
//             console.log(product);
//         })
//         divide(product,10,(result)=>{
//             console.log(result);
//         })   
//     }  
// })

///////////////USING PROMISE
const promise=require('promise');
function add(num1,num2){
    return new promise(function(resolve,reject){
        if(num1==0){
            reject('First number is zero');
        }
        resolve(num1+num2);
    })
}
function multiply(num1,num2){
    return new promise((resolve,reject)=>{
        if(num1==0){
            reject('First number is zero');
        }
        resolve(num1*num2);
    })
}
function divide(num1,num2){
    return new promise(function(resolve,reject){
        resolve(num1/num2);
    })
}


add(10,20).then(sum=>{
    console.log(sum);
    return multiply(sum,sum);
}).then(product=>{
    console.log(product);
    return divide(product,10);
}).then(result=>{
    console.log(result);
})
.catch((err)=>{
    console.log(err)
})

////////////////////////////////////////
function getName(){
    return new promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('Apple');
        },3000)
    })
}
function getMob(){
    return new promise(function(resolve,reject){
        setTimeout(function(){
            resolve('12121212');
        },2000)
    })
}


///THIS WILL PRINT THE OUTPUT IN SAME TIME (ASYNC)
promise.all([getName(),getMob()]).then((result)=>{
    console.log(result)
})


///AWAIT AND ASYNC
async function getUser(){                 // await is an async function ,so we need ti define it
    let name=await getName();      //await used to wait the program till it runs 
    console.log(name)  
    let mob=await getMob();
    console.log(mob);          
}
getUser();