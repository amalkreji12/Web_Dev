var express = require('express');
var router = express.Router();
var productHelper =  require('../helpers/product-helpers');
var userHelper = require('../helpers/user-helpers');

// used to check whether the user is logged in or not
const varifyLogin = (req,res,next)=>{
  if(req.session.loggedIn){
    next();
  }else{
    res.redirect('/login');
  }
}



/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user;
  //console.log(user);
  productHelper.getAllProducts().then((product)=>{
    //console.log(product);
    res.render('user/view-products',{product,user});
  })


});

router.get('/login',function(req,res){
  if(req.session.loggedIn){
    res.redirect('/');
  }else{
    res.render('user/login',{'loginError':req.session.loginError});
    req.session.loginError = false;
  }
});

router.get('/signup',function(req,res){
  res.render('user/signup')
});

router.post('/signup',function(req,res){
  userHelper.doSignUP(req.body).then((response)=>{
  })
  .catch((err)=>{
    res.status(500).send('Sign up failed');
  })

});

router.post('/login',(req,res)=>{
  userHelper.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect('/');
    }else{
      req.session.loginError = 'Invalid Username or Password';
      res.redirect('/login');
    }
  })
})

router.get('/logout',(req,res)=>{
  req.session.destroy();
  res.redirect('/');
})

router.get('/cart',varifyLogin,(req,res)=>{
  res.render('user/cart');
})



module.exports = router;
