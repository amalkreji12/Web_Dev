var express = require('express');
var router = express.Router();
var productHelper =  require('../helpers/product-helpers');
var userHelper = require('../helpers/user-helpers');




/* GET home page. */
router.get('/', function(req, res, next) {
  // let products=[
  //   {
  //     name:'Iphone 15',
  //    category:'Mobile',
  //    description:'Experience the iPhone 15  your dynamic companion.',
  //    image:"https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg"
  //   },
    
  // ]

  productHelper.getAllProducts().then((product)=>{
    //console.log(product);
    res.render('user/view-products',{product});
  })

});

router.get('/login',function(req,res){
  res.render('user/login')
});

router.get('/signup',function(req,res){
  res.render('user/signup')
});

router.post('/signup',function(req,res){
  //console.log(req.body);
  userHelper.doSignUP(req.body).then((response)=>{
    console.log(response);
  })
  .catch((err)=>{
    res.status(500).send('Sign up failed');
  })

});

router.post('/login',(req,res)=>{
  userHelper.doLogin(req.body).then((response)=>{
    if(response.status){
      res.redirect('/');
    }else{
      res.redirect('/login');
    }
  })
})



module.exports = router;
