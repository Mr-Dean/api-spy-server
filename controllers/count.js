async function getCount(req, res, knex) {
    try {
        const result = await knex('total_count').select('count');
        console.log('Query result:', result); // Log the result
        res.json(0);
      } catch (error) {
        console.error('Error fetching total count:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
};

async function updateCount(req, res, knex) {
  const { count } = req.body;

  const parsedCount = parseInt(count); // Parse the count value as an integer

  if (!isNaN(parsedCount)) {
    try {
      await knex('total_count').update({ count: parsedCount });

      res.status(200).json({ message: 'Count updated successfully' });
      console.log(`Count updated by: ${parsedCount}`);

    } catch (error) {
      console.error('Error updating count value:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(400).json({ error: 'Invalid count value' });
  }
};

module.exports = {
  getCount,
  updateCount
};