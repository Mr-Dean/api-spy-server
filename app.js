const express = require('express');
const cors = require('cors');
const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    host: process.env.DATABASE_HOST,
    port : 5432,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : 'aispy',
    ssl: {
      rejectUnauthorized: false, 
    }
    
  }
});
const { getCount, updateCount } = require('./controllers/count');
const { detectImage } = require('./controllers/clarifaiApi');


const app = express();

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => getCount(req, res, knex));

app.post('/imageUrl', (req, res) => detectImage(req, res));

app.put('/updateCount', (req, res) => updateCount(req, res, knex));



app.listen(3000, () => {
    console.log("Listening on port 3000")
})