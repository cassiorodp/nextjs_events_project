import { MongoClient } from 'mongodb';

const mongoDBPassword = process.env.MONGO_DB_PASSWORD;

async function getMongoClient() {
  const client = await MongoClient.connect(
    `mongodb+srv://cassiorodp:${mongoDBPassword}@startercluster.0cnvf.mongodb.net/events?retryWrites=true&w=majority`
  );
  return client;
}

export default getMongoClient;

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}
