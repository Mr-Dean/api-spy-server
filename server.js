const express = require('express');
const cors = require('cors');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    port : 5432,
    user : 'deanarnold',
    password : '',
    database : 'ai-spy'
  }
});




const app = express();


app.use(cors());
app.use(express.json())

app.get('/', async (req, res) => {
  try {
    const result = await knex('total_count').select('count');
    console.log('Query result:', result); // Log the result
    res.json(result);
  } catch (error) {
    console.error('Error fetching total count:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.put('/api/updateCount', async (req, res) => {
  const { count } = req.body;

  if (typeof count === 'number') {
    try {
      await knex('total_count').update({ count });

      res.status(200).json({ message: 'Count updated successfully' });
      console.log(`Count updated by: ${count}`);

    } catch (error) {
      console.error('Error updating count value:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(400).json({ error: 'Invalid count value' });
  }
});

app.listen(3000, () => {
    console.log("Listening on port 3000")
})