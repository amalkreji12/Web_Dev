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
router.get('/', async function(req, res, next) {
  let user=req.session.user;
  //console.log(user);
  let cartCount=null;
  if(req.session.user){
    cartCount=await userHelper.getCartCount(req.session.user._id)
  }
  
  productHelper.getAllProducts().then((product)=>{
    res.render('user/view-products',{product,user,cartCount});
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
  req.session.loggedIn=true;
  req.session.user=response;
  res.redirect('/');
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

router.get('/cart',varifyLogin,async(req,res)=>{
  let products=await userHelper.getCartProducts(req.session.user._id)
  //console.log(products);
  if(products.length==0){
    res.render('user/empty-cart',{user:req.session.user});
  }else{
    res.render('user/cart',{products,user:req.session.user});
  }  
  
})

router.get('/add-to-cart/:id',(req,res)=>{   //verifyLogin is removed from argument to use ajax
  console.log('api called');
  userHelper.addToCart(req.params.id,req.session.user._id).then(()=>{
    res.json({status:true})
    //res.redirect('/');
  })
})

router.post('/change-product-quantity',(req,res,next)=>{
  console.log(req.body)
  userHelper.changeProductCount(req.body).then(()=>{
    res.json({status:true})
  })
})


module.exports = router;
