var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers');
var userHelper = require('../helpers/user-helpers');


// used to check whether the user is logged in or not
const varifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect('/login');
  }
}



/* GET home page. */
router.get('/', async function (req, res, next) {
  let user = req.session.user;
  //console.log(user);
  let cartCount = null;
  if (req.session.user) {
    cartCount = await userHelper.getCartCount(req.session.user._id)
  }

  productHelper.getAllProducts().then((product) => {
    res.render('user/view-products', { product, user, cartCount });
  })


});

router.get('/login', function (req, res) {
  if (req.session.loggedIn) {
    res.redirect('/');
  } else {
    res.render('user/login', { 'loginError': req.session.loginError });
    req.session.loginError = false;
  }
});

router.get('/signup', function (req, res) {
  res.render('user/signup')
});

router.post('/signup', function (req, res) {
  userHelper.doSignUP(req.body).then((response) => {
  })
    .catch((err) => {
      res.status(500).send('Sign up failed');
    })
  req.session.loggedIn = true;
  req.session.user = response;
  res.redirect('/');
});

router.post('/login', (req, res) => {
  userHelper.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      res.redirect('/');
    } else {
      req.session.loginError = 'Invalid Username or Password';
      res.redirect('/login');
    }
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

router.get('/cart', varifyLogin, async (req, res) => {
  let products = await userHelper.getCartProducts(req.session.user._id)
  let totalValue = await userHelper.getTotalAmount(req.session.user._id)
  //console.log(products);
  if (products.length == 0) {
    res.render('user/empty-cart', { user: req.session.user });
  } else {
    res.render('user/cart', { products, user: req.session.user._id,totalValue});
  }

})

router.get('/add-to-cart/:id', (req, res) => {   //verifyLogin is removed from argument to use ajax
  console.log('api called');
  userHelper.addToCart(req.params.id, req.session.user._id).then(() => {
    res.json({ status: true })
    //res.redirect('/');
  })
})

router.post('/change-product-quantity', (req, res, next) => {
  userHelper.changeProductCount(req.body).then(async(response) => {
    response.total=await userHelper.getTotalAmount(req.body.user)
    res.json(response)
  })
})

router.get('/remove-product/:id/:cartID', (req, res, next) => {
  const details = {
    product: req.params.id,
    cart: req.params.cartID
  };

  userHelper.deleteCartProduct(details).then((response) => {
    if (response.modifiedCount > 0) {
      res.redirect('/cart');
    } else {
      res.status(400).send('Failed to remove product from cart');
    }
  })
    .catch((err) => {
      console.error('Error removing product:', err);
      res.status(500).send('Server error');
    });
})

router.get('/place-order',varifyLogin,async(req,res)=>{
  let products = await userHelper.getCartProducts(req.session.user._id)
  let total=await userHelper.getTotalAmount(req.session.user._id)
  let cartCount = await userHelper.getCartCount(req.session.user._id)

  res.render('user/place-order',{user:req.session.user,total,products,cartCount})
})

router.post('/place-order',async(req,res)=>{
  let products = await userHelper.getCartProductList(req.body.userId)
  let totalPrice = await userHelper.getTotalAmount(req.body.userId)
  userHelper.placeOrder(req.body,products,totalPrice).then((response)=>{
   res.json({status:true})
  })
  
})

router.get('/order-confirm',varifyLogin,(req,res)=>{
  res.render('user/order-confirm',{user:req.session.user})
})

router.get('/orders',varifyLogin,async(req,res)=>{
  let orders = await userHelper.getUserOrders(req.session.user._id)
  // console.log(orders)
  res.render('user/orders',{user:req.session.user,orders})
  
})

router.get('/view-order-products/:id',varifyLogin,async(req,res)=>{
  let products = await userHelper.getOrderProducts(req.params.id)
  let amount= await userHelper.getTotalAmountOrders(req.params.id)
  //console.log(amount);
  
  res.render('user/view-order-products',{user:req.session.user,products,amount})
})





module.exports = router;


