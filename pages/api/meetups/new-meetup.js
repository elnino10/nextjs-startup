import { MongoClient } from "mongodb";

async function handler(req, res) {
  // check for the method on the request
  if (req.method === "POST") {
    const data = req.body;

    // connect mongodb via MongoClient to store data on DB
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db();
    const meetupCollection = db.collection("meetups");

    // store the information from the req.body to DB
    const result = await meetupCollection.insertOne(data);

    client.close();

    // send back response
    res.status(201).json({
      status: "success",
      data: result,
    });
  }
}

export default handler;
