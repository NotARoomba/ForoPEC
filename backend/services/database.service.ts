import * as mongoDB from 'mongodb';
import * as dotenv from 'ts-dotenv';

const env = dotenv.load({
  MONGODB: String,
  DB_NAME: String,
  USER_COLLECTION: String,
});

export const collections: {users?: mongoDB.Collection} = {};

export async function connectToDatabase() {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(env.MONGODB);

  await client.connect();

  const db: mongoDB.Db = client.db(env.DB_NAME);

  const usersCollection: mongoDB.Collection = db.collection(
    env.USER_COLLECTION,
  );

  collections.users = usersCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`,
  );
}
