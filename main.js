const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3002;
const path = require('path');
const helmet = require('helmet');
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session);
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
    },
  },
}));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.set('trust proxy', 1);
const pool = require('./src/db');
app.use(session({
  store: new pgSession({
    pool,
    createTableIfMissing: true
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: true, // true (require HTTPS)
    maxAge: 1000 * 60 * 60 * 24 
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const captionsRoutes = require('./src/routes/captions.routes');
const galleryRoutes = require('./src/routes/gallery.routes');
const likesRoutes = require('./src/routes/likes.routes');
const loginRoutes = require('./src/routes/login.routes');
const registerRoutes = require('./src/routes/register.routes');
const homeRoutes = require('./src/routes/home.routes');
const logoutRoutes = require('./src/routes/logout.routes');
const errorHandler = require('./src/middlewares/errorHandler');

app.use('/', homeRoutes);
app.use('/caption', captionsRoutes);
app.use('/gallery', galleryRoutes);
app.use('/likes', likesRoutes);
app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/logout', logoutRoutes);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});