const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
require('dotenv').config();
const { Pool } = require('pg');
const path = require('path');
const { body, validationResult } = require('express-validator');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/styles', express.static(path.join(__dirname, '/styles')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("validation errors", errors.array());  
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

app.get('/gallery', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM images');
    res.render('gallery', { images: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
});

app.get('/image/:id', async (req, res) => {
  try {
    const wanted = req.params.id;
    const data = await pool.query('SELECT username, image_id, caption FROM users INNER JOIN captions ON users.id = captions.user_id WHERE image_id = $1', [wanted]);
    const result = await pool.query('SELECT * FROM images WHERE id = $1', [wanted]);
    if (result.rows.length === 0) {
      return res.status(404).send('image not found :c');
    }
    const captions = data.rows;
    res.render('image', { captions, image: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
});

app.post('/caption/:id',
  body('newcaption')
  .trim()
  .isLength({ min: 1, max: 130 } )
  .withMessage('Caption must be between 1 and 130 characters long')
  .matches(/^[\w\s.,!?()\-]+$/)
  .withMessage('Caption contains prohibited characters'),
  validateRequest,
  async (req, res) => {
  try {
    const id = req.params.id;
    const newcaption = req.body.newcaption;
    const result = await pool.query('INSERT INTO captions (caption, user_id, image_id) VALUES ($1, $2, $3) RETURNING *', [newcaption, 3, id]);
    if (result.rowCount === 0) {
      return res.status(500).send('server error');
    } 
      res.status(200).json({ message: 'caption added', data: result.rows[0] });
    
    } catch (err) {
      console.error(err);
      res.status(500).send('server error');
    }
});


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
