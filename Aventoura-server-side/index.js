const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();

require("dotenv").config();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());

const port = process.env.PORT || 5000;

const mongoUri = process.env.MONGODB_URI;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

if (!mongoUri && (!dbUser || !dbPass)) {
  throw new Error(
    "Missing MongoDB configuration. Set MONGODB_URI or both DB_USER and DB_PASS in .env"
  );
}

const uri =
  mongoUri ||
  `mongodb+srv://${encodeURIComponent(dbUser)}:${encodeURIComponent(
    dbPass
  )}@cluster0.6kyz8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

const toObjectId = (id) => {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
};
let packagesCollection;
let ordersCollection;

async function run() {
  await client.connect();
  const database = client.db("travel_plan");
  packagesCollection = database.collection("packages");
  ordersCollection = client.db("order_collection").collection("customerOrder");

  app.get("/packages", async (req, res) => {
    const cursor = packagesCollection.find({});
    const packages = await cursor.toArray();
    res.send(packages);
  });

  app.get("/packages/:id", async (req, res) => {
    const id = req.params.id;
    const objectId = toObjectId(id);

    if (!objectId) {
      return res.status(400).json({ message: "Invalid package id" });
    }

    const query = { _id: objectId };
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
    const objectId = toObjectId(id);

    if (!objectId) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const query = { _id: objectId };
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
    const objectId = toObjectId(id);

    if (!objectId) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const query = { _id: objectId };
    const orderPackage = await ordersCollection.findOne(query);
    res.send(orderPackage);
  });

  app.put("/allorders/:id", async (req, res) => {
    const id = req.params.id;
    let prevStatus = req.body;
    const updStatus = "Approved";
    prevStatus.status = updStatus;

    const objectId = toObjectId(id);

    if (!objectId) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const filter = { _id: objectId };

    const updateStatus = {
      $set: {
        status: prevStatus.status,
      },
    };

    const result = await ordersCollection.updateOne(filter, updateStatus);
    res.json(result);
  });

  app.delete("/allorders/:id", async (req, res) => {
    const id = req.params.id;
    const objectId = toObjectId(id);

    if (!objectId) {
      return res.status(400).json({ message: "Invalid order id" });
    }

    const query = { _id: objectId };
    const deletedOrder = await ordersCollection.deleteOne(query);
    res.json(deletedOrder);
  });
}

const startServer = async () => {
  try {
    await run();
    app.get("/", (req, res) => {
      res.send("Travel web server is running");
    });
    app.listen(port, () => {
      console.log(`travel web server is running on ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error?.message || error);
    process.exit(1);
  }
};

startServer();
