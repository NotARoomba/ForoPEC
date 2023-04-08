import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
const { MongoClient } = require("mongodb");

/*
EXAMPLE REQUEST

{
  body: {
    email
  }
}

-------------

EXAMPLE USER DATA IN MONGO
{
  email
  name
  school
  salon
  hasFood
}
*/



export default async function handler(req, res) {
    const mongo = await MongoClient.connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
      })
    const users = mongo.db("userData").collection("users");
    const user = await users.findOne(req.body)
    if (user != null) {
      res.send(user)
    } else {
      res.sendStatus(400);
    }
}