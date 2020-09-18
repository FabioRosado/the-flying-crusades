const MongoClient = require("mongodb").MongoClient;

export default async function (req, res) {
  const data = JSON.parse(req.body);

  try {
    const client = new MongoClient(process.env.MONGO_DB_URL, {
      useUnifiedTopology: true,
    });
    await client.connect();

    const character = await client
      .db(process.env.MONGO_DB_NAME)
      .collection(data.name.toLowerCase())
      .find({ name: data.name.toLowerCase() })
      .toArray();

    await client.close();

    return res.json(character[0]);
  } catch (error) {
    console.log("api error: ", error);
    //keep the API pure, and handle failures at the requester
    return res.status(500).end();
  }
}
