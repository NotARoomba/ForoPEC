import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()
const { MongoClient } = require("mongodb");

export default async function handler(req, res) {
  const mongo = await MongoClient.connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    keepAlive: true,
  })
        const users = mongo.db("userData").collection("users");
        users
          .findOne(req.body)
          .then((user) => {
            res.send(user);
          })
          .catch((err) => {
            res.send(err);
          });
  }
  