require("dotenv").config();
const { MongoClient } = require("mongodb");

export default function handler(req, res) {
    MongoClient.connect(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        keepAlive: true,
      }).then(mongo => {
        const users = mongo.db("userData").collection("users");
        users
          .findOne(req.body)
          .then((user) => {
            res.send(user);
          })
          .catch((err) => {
            res.send(err);
          });
      })
  }
  