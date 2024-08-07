

var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){

    const disName=['Apple','Mango','Banana'];

    const person={name:'Orange',comments:{comment:'This is a comment',date:'01-01-2021'}};

    const value={name:'Apple',admin:true};  

    res.render('about',{disName,text:'About Page',person,value});
});

module.exports=router;