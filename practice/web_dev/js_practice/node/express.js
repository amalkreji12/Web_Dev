const express=require('express');
const path=require('path');
const bodyParser = require('body-parser');

const app=express();


app.use(function(req,res,next){                // use is used as a middleware
    console.log('In the middleware'); 
    next();
})

app.get('/signup',function(req,res){
    res.sendFile(path.join(__dirname,'signup.html'));
    //res.send('Hello World');
})

app.post('/signup',function(req,res){
    res.send('Sign Up')
})

app.get('/about',function(req,res){
    res.send('About Page');
})

app.listen(3000,function(){
    console.log(__filename);
    console.log('Server Started');
}) 