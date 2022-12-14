import { MongoClient } from 'mongodb';

const mongoDBPassword = process.env.MONGO_DB_PASSWORD;

async function getMongoClient() {
  const client = await MongoClient.connect(
    `mongodb+srv://cassiorodp:${mongoDBPassword}@startercluster.0cnvf.mongodb.net/?retryWrites=true&w=majority`
  );
  return client;
}

export default getMongoClient;
