var express = require('express');
const { log } = require('handlebars');
var router = express.Router();
var productHelper =  require('../helpers/product-helpers');


/* GET users listing. */
router.get('/', function(req, res, next) {

  productHelper.getAllProducts().then((product)=>{
    //console.log(product);
    res.render('admin/view-products',{admin:true,product});
  })

});

router.get('/add-product',function(req,res){
  res.render('admin/add-product',{admin:true});
})

router.post('/add-product',function(req,res){
  console.log(req.body);
  console.log(req.files.img);

  productHelper.addProduct(req.body,function(insertedId){
    let image=req.files.img;
    let id=insertedId.toString();
    image.mv('./public/product-images/'+id+'.png',(err,done)=>{
      if(!err){
        res.render('admin/add-product');
      }else{
        console.log('error',err)
      }
    })
    
  })
})

router.get('/delete-product/:id',(req,res)=>{
  let proId=req.params.id;
  //console.log(proId);
  productHelper.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })
})

router.get('/edit-product/:id',async(req,res)=>{
  let product=await productHelper.getProductDetails(req.params.id);
  console.log(product);
  res.render('admin/edit-product',{product});
})

router.post('/edit-product/:id',(req,res)=>{
  productHelper.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin/');
    if(req.files.img){
      let image = req.files.img;
      let id = req.params.id;
      image.mv('./public/product-images/'+id+'.png')
    }
  })
})

module.exports = router;
