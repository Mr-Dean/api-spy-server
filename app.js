const express = require('express');
const cors = require('cors');
const knex = require('knex')({
  client: 'pg',
  connection: {
    connectionString: 'postgres://aispy_user:Bso20lLoKQyGBe2TwBE4d3TNOkFPAZTB@dpg-cjckqac5kgrc73cfmh70-a.oregon-postgres.render.com/aispy',
    port : 5432,
    user : 'aispy_user',
    password : 'Bso20lLoKQyGBe2TwBE4d3TNOkFPAZTB',
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

app.put('/api/updateCount', (req, res) => updateCount(req, res, knex));



app.listen(3000, () => {
    console.log("Listening on port 3000")
})