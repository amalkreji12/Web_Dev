var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/submit',function(req,res){
  console.log(req.body);

  MongoClient.connect(url).then(function(client){
    client.db('datas').collection('users').insertOne(req.body);
    console.log('client');
  })
  .catch(function(err){
    console.log('error');
  })

  // MongoClient.connect(url,function(err,client){
  //   if(err){
  //     console.log('Error');
  //   }else{
  //     //client.db('datas').collection('users').insertOne(req.body);
  //     console.log('Datebase Connected');
  //   }
  // })

  res.send('Form Submitted');
})


module.exports = router;
