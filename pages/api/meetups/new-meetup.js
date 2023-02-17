import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://joe:YmvB1ytGykhuFmM2@cluster0.lsur2ve.mongodb.net/meetup?retryWrites=true&w=majority"
    );

    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const result = await meetupCollection.insertOne(data);

    client.close();

    res.status(201).json({
      status: "success",
      data: result,
    });
  }
}

export default handler;
