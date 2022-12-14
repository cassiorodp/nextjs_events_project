import getMongoClient from '../../helpers/mongo-connection';

async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const client = await getMongoClient();

    const db = client.db('events');

    await db.collection('newsletter').insertOne({ email });

    client.close();

    res.status(201).json({ message: 'Signed up!' });
  }
}

export default handler;
