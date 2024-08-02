//sum
var a=10;
var b=20;
var sum=a+b;
console.log(sum);

// Inputing values from user

var read=require('readline-sync')

// var val=read.question('Enter a number : ');
// console.log(val);

//condition statement

// num1=read.question('Enter a number : ');
// num2=read.question('Enter a number : ');
// if(num1>num2){
//     console.log('num1 is greater');
// }else if(num1===num2){
//     console.log('Both are equal')
// }else{
//     console.log('num2 is greater');
// }

//loop
//for loop
// for(i=0;i<=100;i=i+2){
//     console.log(i);
// }

//switch
// let day=7
// let dayName;
// switch(day){
//     case 1:
//         dayName='Monday';
//         break;
//     case 2:
//         dayName='Tuesday';
//         break;
//     case 3:
//         dayName='Wednesday';
//         break;
//     case 4:
//         dayName = "Thursday";
//         break;
//     case 5:
//         dayName = "Friday";
//         break;
//     case 6:
//         dayName = "Saturday";
//         break;
//     case 7:
//         dayName = "Sunday";
//         break;
//     default:
//         dayName = "Invalid day";
// }
// console.log(dayName);

//Function
// function hello(){
//     console.log('Hello');
//     return 10;
// }
// hello();
// console.log(hello());

// //array

// var arr=['apple','banana','mango','orange'];
// console.log(arr[1]);
// arr.push('grapes');
// console.log(arr);

// //nested function
// var nn=10;
// function hello(){
//     var nn=20;
//     console.log(nn);
//     function hey(){
//         var nn=30;
//         console.log(nn);
//     }
//     hey();
// }
// //console.log(nn);
// hello();


//object
// var person={name:'Apple',age:10,place:'India',display:function(){
//     console.log(this.name);
// }}
// console.log(person.name)
// // for (x in person){
// //     console.log(person[x])
// // }
// person.dob='10-10-2010'; //adding new component
// person.displayAge=function(){
//     console.log(this.age);
// }
// console.log(person)
// console.log(person.displayAge())

//Object Constructor
function Person(name,age,place){
    this.name=name;
    this.age=age;
    this.place=place;
    this.dispay=function(){
        console.log('Name:'+this.name+ 'Age:'+this.age+ 'Place:'+this.place);
    }
}
var per1=new Person('Apple',10,'India');
var per2=new Person('Orange',12,'USA');
//console.log(per1);
per1.dispay();
per2.dispay();

//Date
var d=new Date("30 April 2020");
var d1=new Date("10 April 2020");
console.log(d.getDate());
diff=d.getTime()- d1.getTime(); 
var diffDays = diff / (1000 * 3600 * 24);
console.log(diffDays);
