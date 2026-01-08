const { MongoClient } = require("mongodb");

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI não definida");
}

const uri = process.env.MONGODB_URI;

let client;
let clientPromise;

if (!global._mongoClientPromiseCron) {
  client = new MongoClient(uri);
  global._mongoClientPromiseCron = client.connect();
}

clientPromise = global._mongoClientPromiseCron;

module.exports = clientPromise;
