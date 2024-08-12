var db = require('../config/connection');

module.exports = {
  addProduct(product, callback) {
    const database = db.getDb(); // Get the initialized database instance
    database.collection('products').insertOne(product)
      .then((result) => {
        console.log("Product added:", result);
        callback(true); // Invoke the callback with `true` on success
      })
      .catch((err) => {
        console.error("Error inserting product:", err);
        callback(false); // Invoke the callback with `false` on failure
      });
  }
};
