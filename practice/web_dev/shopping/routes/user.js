var express = require('express');
var router = express.Router();
var productHelper =  require('../helpers/product-helpers');

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
    res.render('admin/view-products',{admin:true,product});
  })

});

module.exports = router;
