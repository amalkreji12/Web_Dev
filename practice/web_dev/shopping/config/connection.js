var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
var dbname='shopping';

let db;

function connectToDatabase() {
  return MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((client) => {
      console.log("Connected successfully to database");
      db = client.db(dbname);
    })
    .catch((err) => {
      console.error("Failed to connect to the database:", err);
    });
}

function getDb() {
  if (!db) {
    console.warn("Database not initialized yet");
  }
  return db;
}

module.exports = {
  connectToDatabase,
  getDb
};
