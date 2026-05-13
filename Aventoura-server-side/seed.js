require("dotenv").config();
const { MongoClient } = require("mongodb");

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

const demoPackages = [
  {
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    title: "Cox's Bazar Beach Tour",
    desc: "3 days, 2 nights with hotel and breakfast.",
    price: 199,
  },
  {
    img: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
    title: "Sajek Valley Adventure",
    desc: "Mountain stay, local guide, transport included.",
    price: 149,
  },
  {
    img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    title: "Sylhet Tea Garden Escape",
    desc: "2 days scenic trip with tea estate visit.",
    price: 129,
  },
  {
    img: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1",
    title: "Bandarban Hills Expedition",
    desc: "4 days trekking and hillside resort stay.",
    price: 239,
  },
  {
    img: "https://images.unsplash.com/photo-1533105079780-92b9be482077",
    title: "Sundarbans Mangrove Cruise",
    desc: "Wildlife-focused river cruise with guide.",
    price: 219,
  },
  {
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
    title: "Saint Martin Island Getaway",
    desc: "Coral island trip with sea-view accommodation.",
    price: 189,
  },
];

async function seed() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const packagesCollection = client.db("travel_plan").collection("packages");

    const existingCount = await packagesCollection.countDocuments();

    if (existingCount > 0) {
      console.log(
        `Seed skipped: ${existingCount} package(s) already exist in travel_plan.packages`
      );
      return;
    }

    const result = await packagesCollection.insertMany(demoPackages);
    console.log(`Seed complete: inserted ${result.insertedCount} package(s)`);
  } finally {
    await client.close();
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
