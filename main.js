const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
require('dotenv').config();
const { Pool } = require('pg');
const path = require('path');
const { body, validationResult } = require('express-validator');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }
});

app.use(session({
  store: new pgSession({
    pool: pool,
    createTableIfMissing: true
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // true (require HTTPS)
    maxAge: 1000 * 60 * 60 * 24 
  }
}));



app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/styles', express.static(path.join(__dirname, '/styles')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:"],
  },
}));

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
  .isLength({ min: 1, max: 130 })
  .withMessage('Caption must be between 1 and 130 characters long')  // <=== remember to add it to the client response
  .matches(/^[\p{L}\p{N}\p{P}\p{S}\p{Zs}]+$/u)
  .withMessage('Caption contains prohibited characters'),
  validateRequest,
  async (req, res) => {
  try {
    const id = req.params.id;
    const newcaption = req.body.newcaption;
    const result = await pool.query('INSERT INTO captions (caption, user_id, image_id) VALUES ($1, $2, $3) RETURNING *', [newcaption, req.session.userId, id]); //use session details
    if (result.rowCount === 0) {
      return res.status(500).send('server error');
    } 
      res.status(200).json({ message: 'caption added', data: result.rows[0] });
    } catch (err) {
      console.error(err);
      res.status(500).send('server error');
    }
});



app.get('/register', (req, res) => {
  res.render('register')
})



app.post('/register',
  body('username')
  .isLength({ min: 3, max: 20 })
  .withMessage('username must be 3-20 characters long')
  .isAlphanumeric()
  .withMessage('Username must contain only letters and numbers'),
  body('password')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters long')
  .matches(/[A-Z]/)
  .withMessage('Password must contain at least one uppercase letter'),
  validateRequest, async (req, res) => {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
      const user = await pool.query('SELECT * FROM users WHERE username = $1', [req.body.username]);
      if (user.rows.length > 0) {
        return res.status(409).json({ error: 'Username already taken' });
      }
      const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [req.body.username, hashedPassword]);
      res.status(200).json({ message: 'user added' });
    } catch (err) {
      console.error(err);
      res.status(500).send('server error');
    }
});

app.post('/login', 
  body('username')
  .notEmpty()
  .withMessage('Username is required')
  .isLength({ min: 3, max: 20 })
  .withMessage('username must be 3-20 characters long'),
  body('password')
  .notEmpty()
  .withMessage('password is required')
  .isLength({ min: 6 })
  .withMessage('Password must be at least 6 characters long'),
  validateRequest, async (req, res) => {
    try {
      const user = await pool.query('SELECT * FROM users WHERE username = $1', [req.body.username]);
      if (user.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid login credentials' });
      }
      const foundUser = user.rows[0];
      const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid login credentials' });
      }
      req.session.userId = foundUser.id; //create session
      res.status(200).send('logged');
    } catch (err) {
      console.error(err);
      res.status(500).send('server error');
    }
});

app.get('/', (req, res) => {
  res.render('homepage')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});