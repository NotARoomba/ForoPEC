import * as mongoDB from 'mongodb';
import {Server} from 'socket.io';
import * as dotenv from 'ts-dotenv';
import ForoPECEvents from '../models/events';
import {usersConnected} from '..';

const env = dotenv.load({
  MONGODB: String,
  USER_DB_NAME: String,
  USER_COLLECTION: String,
  SALON_DB_NAME: String,
  SALON_COLLECTION: String,
});

export const collections: {
  users?: mongoDB.Collection;
  salones?: mongoDB.Collection;
} = {};

export async function connectToDatabase(io: Server) {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(env.MONGODB);
  await client.connect();

  const userDB: mongoDB.Db = client.db(env.USER_DB_NAME);
  const usersCollection: mongoDB.Collection = userDB.collection(
    env.USER_COLLECTION,
  );
  collections.users = usersCollection;

  const salonDB: mongoDB.Db = client.db(env.SALON_DB_NAME);
  const salonsCollection: mongoDB.Collection = salonDB.collection(
    env.SALON_COLLECTION,
  );
  collections.salones = salonsCollection;
  usersCollection
    .watch([], {fullDocument: 'updateLookup'})
    .on('change', async next => {
      if (next.operationType === 'update' || next.operationType === 'insert' || next.operationType === 'replace') {
        if (usersConnected[next.fullDocument?.email] !== undefined) {
          console.log(
            usersConnected[next.fullDocument?.email],
            next.fullDocument,
          );
          io.to(usersConnected[next.fullDocument?.email]).emit(
            ForoPECEvents.UPDATE_DATA,
          );
        } 
      }
    });
  salonsCollection.watch().on('change', async next => {
    io.emit(ForoPECEvents.UPDATE_DATA);
  });
  console.log('Successfully connected to database!');
}
