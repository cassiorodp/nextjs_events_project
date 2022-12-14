import getMongoClient from '../../../helpers/mongo-connection';

async function handler(req, res) {
  const { eventId } = req.query;

  const client = await getMongoClient();
  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db('events');

    const result = await db.collection('comments').insertOne(newComment);

    newComment.id = result.insertedId;

    res.status(201).json({ message: 'Added comment.', comment: newComment });
  }

  if (req.method === 'GET') {
    const dummyList = [{ id: 'c1', name: 'Max', text: 'some comment' }];

    res.status(200).json({ comments: dummyList });
  }

  client.close();
}

export default handler;
