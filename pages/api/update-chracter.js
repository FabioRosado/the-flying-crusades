const MongoClient = require("mongodb").MongoClient

export default async function(req, res) {
    const data = JSON.parse(req.body)

    console.log(data)

    const client = new MongoClient(process.env.MONGO_DB_URL, {useUnifiedTopology: true})
    client.connect()

    // TODO: Update with data
    const character = await client.db(process.env.MONGO_DB_NAME).collection(data.name)

    await client.close()

    return res.status(200).end("Character updated")
}