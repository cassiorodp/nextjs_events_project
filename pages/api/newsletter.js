import getMongoClient from '../../helpers/mongo-connection';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    let client;

    try {
      client = await getMongoClient();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    const db = client.db('events');

    await db.collection('newsletter').insertOne({ email });

    client.close();

    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
