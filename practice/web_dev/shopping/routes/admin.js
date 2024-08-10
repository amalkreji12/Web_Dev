var express = require('express');
const { log } = require('handlebars');
var router = express.Router();
var productHelper =  require('../helpers/product-helpers');

/* GET users listing. */
router.get('/', function(req, res, next) {

  let products=[
    {
      name:'Iphone 15',
     category:'Mobile',
     description:'Experience the iPhone 15  your dynamic companion.',
     image:"https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-1.jpg"
    },
    {
      name:'Samsung S24',
      category:'Mobile',
      description:'Enjoy new Samsung Galaxy S24 with new AI features.',
      image:"https://www.91-img.com/gallery_images_uploads/b/a/bad6ad3b107cfbb752c4dc1de91c61d6703bb60e.JPG?tr=h-550,w-0,c-at_max"
    },
    {
      name: 'Pixel 8pro',
      category: 'Mobile',
      description: 'Experience the Pixel 8pro  your next-level phone.',
      image:"https://cdn.dxomark.com/wp-content/uploads/medias/post-157488/Google-Pixel-8-Pro-featured-image-packshot-review.jpg"
    },
    {
      name:'Motorola Edge 50 Fusion',
      category: 'Mobile',
      description:'A fast charging Android phone with long battery life.',
      image:"https://fdn2.gsmarena.com/vv/bigpic/motorola-edge-50-fusion.jpg"
    }
  ]


  res.render('admin/view-products',{admin:true,products});
});

router.get('/add-product',function(req,res){
  res.render('admin/add-product');
})

router.post('/add-product',function(req,res){
  console.log(req.body);
  console.log(req.files.img)
  productHelper.addProduct(req.body,function(result){
    res.render('admin/add-product');
  })
})


module.exports = router;
