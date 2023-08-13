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
const { getCount, updateCount } = require('./controllers/count');
const { detectImage } = require('./controllers/clarifaiApi');


const app = express();

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => getCount(req, res, knex));

app.post('/imageUrl', (req, res) => detectImage(req, res));

app.put('/api/updateCount', (req, res) => updateCount(req, res, knex));



app.listen(3000, () => {
    console.log("Listening on port 3000")
})