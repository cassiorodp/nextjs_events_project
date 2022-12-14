import { MongoClient } from 'mongodb';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const mongoDBPassword = process.env.MONGO_DB_PASSWORD;

    const client = await MongoClient.connect(
      `mongodb+srv://cassiorodp:${mongoDBPassword}@startercluster.0cnvf.mongodb.net/?retryWrites=true&w=majority`
    );
    const db = client.db('newsletter');

    await db.collection('emails').insertOne({ email });

    client.close();

    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
