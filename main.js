const express = require('express');
const app = express();
const PORT = 3002;
require('dotenv').config();
const { Pool } = require('pg');
const path = require('path');


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }
});

app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/styles', express.static(path.join(__dirname, '/styles')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));


app.get('/', (req, res) => {
  res.json('hi');
});

app.get('/gallery', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM images');
    res.render('gallery', { images: result.rows})
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});


    


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})
