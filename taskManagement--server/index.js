const express = require("express");
const app = express();
const port = process.env.port || 5000;

require("dotenv").config();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello TaskyMate 😀!");
});
// --mongodb--

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.BUCKET}:${process.env.BUCKET_SECRET}@cluster0.lyiobzh.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // create database
    const taskCollection = client.db("taskyMateDB").collection("taskDetail");

    // post the data
    app.post("/upload-task", async (req, res) => {
      const task = req.body;
      const result = await taskCollection.insertOne(task);
      console.log({ result });
      res.send(result);
    });
    // get all the data
    app.get("/show-task", async (req, res) => {
      const result = await taskCollection.find().toArray();
      res.send(result);
    });

    // get single data
    app.get("/show-task/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await taskCollection.findOne(filter);
      console.log({ result });
      res.send(result);
    });
    // delete single
    app.delete("/delete-task/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await taskCollection.deleteOne(query);
      console.log({ result });
      res.send(result);
    });
    // update data
    app.patch("/update-task/:id", async (req, res) => {
      const id = req.params.id;
      const prevTaskDetail = req.body;
      const filter = { _id: new ObjectId(id) };
      //   const options = { upsert: true };
      const updateTask = {
        $set: { ...prevTaskDetail },
      };
      const result = await taskCollection.updateOne(filter, updateTask);
      console.log({ result });
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
