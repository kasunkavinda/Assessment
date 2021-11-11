import { MongoClient } from "mongodb";

const database_url = process.env.DATABASE_URL;

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //expects this type of object
    // const { category, title, description } = data;

    const client = await MongoClient.connect(database_url);

    //connecting
    const db = client.db();
    const cardCollection = db.collection("CardCollection");
    const result = await cardCollection.insertOne(data);

    //closing the connection
    client.close();

    res.status(201).json({ messgae: "Card Inserted" });
  }
}

export default handler;
