import { MongoClient } from "mongodb";

const database_url = process.env.DATABASE_URL;

async function updateHandler(req, res) {
  if (req.method === "PATCH") {
    const data = req.body;

    //expects this type of object
    // const { category, title, description } = data;

    const client = await MongoClient.connect(database_url);

    //connecting
    const db = client.db();
    const cardCollection = db.collection("CardCollection");
    const result = await cardCollection.updateOne(data.id, {
      favorite: data.favorite,
    });

    //closing the connection
    client.close();

    res.status(201).json({ messgae: "Card Updated" });
  }
}

export default updateHandler;
