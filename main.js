const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
require('dotenv').config();
const { Pool } = require('pg');
const path = require('path');
const { body, validationResult } = require('express-validator');  //do wywwalenia
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const pool = new Pool({                 //do usunięcia
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  }
});

app.set('trust proxy', 1);

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
    secure: false, // true (require HTTPS) zmień to po localhoście
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

const captionsRoutes = require('./routes/captions.routes');
const imagesRoutes = require('./routes/images.routes');
const galleryRoutes = require('./routes/gallery.routes');
app.use('/caption', captionsRoutes);
app.use('/image', imagesRoutes);
app.use('/gallery', galleryRoutes);

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:"],
  },
}));


const validateRequest = (req, res, next) => {  //do wywalenia
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("validation errors", errors.array());  
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

/*const isAuthenticated = (req, res, next) => {
  if (req.session.isAuthenticated) {
    return next();
  } else {
    res.status(401).json({ message: "Please log in to do this." });
  }
}; */


/*app.post('/like/:captionId', isAuthenticated, async (req, res) => {             wyłączone na potrzeby testu NIE WYWALAĆ
  const captionId = req.params.captionId;
  try {
    const alreadyLiked = await pool.query(
      'SELECT 1 FROM likes WHERE captions_id = $1 AND user_id = $2',
      [captionId, req.session.userId]
    );
    if (alreadyLiked.rows.length > 0) {
      return res.status(400).json({ error: 'You already liked this coment' });
    }
    await pool.query(
      'INSERT INTO likes (captions_id, user_id) VALUES ($1, $2)',
      [captionId, req.session.userId]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'server error' });
  }
}); */


app.get('/register', (req, res) => {
  res.render('register');
});

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
      req.session.isAuthenticated = true;
      req.session.userId = foundUser.id; //create session
      res.status(200).send('logged');
    } catch (err) {
      console.error(err);
      res.status(500).send('server error');
    }
});

app.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Logout failed');
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

app.get('/', (req, res) => {
  res.render('homepage');
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});