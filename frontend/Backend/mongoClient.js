// mongoClient.js
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://y3projectuser:cV6wMpyEnGXq4Zom@y3projectcluster.xatbpya.mongodb.net/?retryWrites=true&w=majority&appName=Y3projectCluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 }); // test connection
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
