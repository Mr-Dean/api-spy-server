const express = require('express');
const cors = require('cors');

const app = express();

const database = {
    count: 0
}

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).json(database)
})


app.put('/api/updateCount', (req, res) => {
    const { count } = req.body;
    if (typeof count === 'number') {
      database.count += count;
      res.status(200).json({ message: 'Count updated successfully' });
      console.log(count)
    } else {
      res.status(400).json({ error: 'Invalid count value' });
    }
    
  });

app.listen(3000, () => {
    console.log("Listening on port 3000")
})