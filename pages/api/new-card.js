import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    //expects this type of object
    // const { category, title, description, id } = data;

    const client = await MongoClient.connect(
      "mongodb+srv://kasunkavinda:kasunkavinda456123@cluster0.oxj4i.mongodb.net/myPortfolio?retryWrites=true&w=majority"
    );

    const db = client.db();
    const cardCollection = db.collection("CardCollection");
    const result = await cardCollection.insertOne(data);
    console.log(result);
    client.close();

    res.status(201).json({ messgae: "Card Inserted" });
  }
}

export default handler;
