import getMongoClient, {
  getAllDocuments,
  insertDocument,
} from '../../../helpers/mongo-connection';

async function handler(req, res) {
  const { eventId } = req.query;

  let client;

  try {
    client = await getMongoClient();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    client.close();
    return;
  }

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

    try {
      await insertDocument(client, 'comments', newComment);
      newComment.id = result.insertedId;

      res.status(201).json({ message: 'Added comment.', comment: newComment });
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed!' });
      return;
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(
        client,
        'comments',
        { _id: -1 },
        { eventId }
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed!' });
      return;
    }
  }

  client.close();
}

export default handler;
