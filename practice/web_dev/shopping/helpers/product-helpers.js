var db = require('../config/connection');
var collection = require('../config/collections');
const collections = require('../config/collections');
//var { ObjectId } = require ('mongodb')
var objectId = require("mongodb").ObjectId;

module.exports = {
  addProduct(product, callback) {
    const database = db.getDb(); // Get the initialized database instance
    database.collection('products').insertOne(product)
      .then((result) => {
        console.log("Product added:", result);
        callback(result.insertedId); // Invoke the callback with `true` on success
      })
      .catch((err) => {
        console.error("Error inserting product:", err);
        callback(false); // Invoke the callback with `false` on failure
      });
  },




  getAllProducts(){
    return new Promise(async(resolve,reject)=>{
      try{
        let product=await db.getDb().collection(collections.PRODUCT_COLLECTION).find().toArray();
        resolve(product);
      }catch(error){
        reject(error);
      }
      
    })
  },


  deleteProduct(proId){
    return new Promise((resolve,reject)=>{
      db.getDb().collection(collections.PRODUCT_COLLECTION).deleteOne({_id:new objectId(proId)}).then((response)=>{
        console.log(response);
        resolve(response);
      })
    })
  }

};
