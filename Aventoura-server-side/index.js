const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const { ObjectId } = require("bson");

const app = express();

require("dotenv").config();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6kyz8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

console.log(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db("travel_plan");
    const packagesCollection = database.collection("packages");
    const ordersCollection = client
      .db("order_collection")
      .collection("customerOrder");

    app.get("/packages", async (req, res) => {
      const cursor = packagesCollection.find({});
      const packages = await cursor.toArray();
      res.send(packages);
    });

    app.get("/packages/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const singlePackage = await packagesCollection.findOne(query);
      res.send(singlePackage);
    });

    app.post("/packages", async (req, res) => {
      const addedPackage = req.body;
      const result = await packagesCollection.insertOne(addedPackage);
      res.json(result);
    });

    app.post("/myorders", async (req, res) => {
      const order = req.body;
      const result = await ordersCollection.insertOne(order);
      res.send(result);
    });

    app.get("/myorders", async (req, res) => {
      const cursor = ordersCollection.find({});
      const orders = await cursor.toArray();
      res.send(orders);
    });

    app.get("/myorders/:email", async (req, res) => {
      const queryEmail = req.params.email;
      const query = { email: queryEmail };
      const placedOrder = await ordersCollection.find(query).toArray();
      res.send(placedOrder);
    });

    app.delete("/myorders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const deletedOrder = await ordersCollection.deleteOne(query);
      res.json(deletedOrder);
    });

    app.get("/allorders", async (req, res) => {
      const cursor = ordersCollection.find({});
      const orders = await cursor.toArray();
      res.send(orders);
    });

    app.get("/allorders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const orderPackage = await ordersCollection.findOne(query);
      res.send(orderPackage);
    });

    app.put("/allorders/:id", async (req, res) => {
      const id = req.params.id;
      let prevStatus = req.body;
      const updStatus = "Approved";
      prevStatus.status = updStatus;

      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };

      const updateStatus = {
        $set: {
          status: prevStatus.status,
        },
      };

      const result = await ordersCollection.updateOne(
        filter,
        updateStatus,
        options
      );
      res.json(result);
    });

    app.delete("/allorders/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const deletedOrder = await ordersCollection.deleteOne(query);
      res.json(deletedOrder);
    });
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Travel web server is running");
});

app.listen(port, () => {
  console.log(`travel web server is running on ${port}`);
});
