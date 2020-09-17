const MongoClient = require("mongodb").MongoClient

export default async function (req, res) {
    const data = JSON.parse(req.body)

    const { item } = data
    const charName = data.character.name

    try {
        const client = new MongoClient(process.env.MONGO_DB_URL, {useUnifiedTopology: true})
        await client.connect()

        const collection = await client.db(process.env.MONGO_DB_NAME).collection(charName.toLowerCase())

        const character = await collection.findOne({"name": charName.toLowerCase()})

        if (character.gold >= item.cost) {

            character.gold -= item.cost

            if (character.inventory.items[item.name]) {
                character.inventory.items[item.name]++
            } else {
                character.inventory.items[item.name] = 1
            }

            await collection.updateOne({"name": charName.toLowerCase()}, {$set: {"inventory": character.inventory, "gold": character["gold"]}})

        }

        await client.close()

        return res.status(200).end(JSON.stringify(character))
    }
    catch(error) {
        return res.status(500).end("An error occurred when attempting to connect or updating the databse")
    }
    finally {
        await client.close()
    }
}