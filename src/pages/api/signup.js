require("dotenv").config();
const { MongoClient } = require("mongodb");

export default async function handler(req, res) {
    const mongo = MongoClient.connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
      })
    const users = mongo.db("userData").collection("users");
    if (req.body.json())
    try {
      await users.insertOne(req.body);
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(200);
    }
}