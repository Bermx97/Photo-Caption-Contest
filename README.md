# Photo Caption Contest App

This is a web application deployed on Render.com. It allows users to register, log in, add humorous captions to images loaded from a database, and like captions added by other users.

## Live Application

The application is fully deployed on Render, including the database. Users can access and use it directly in the browser without installing anything.

**URL:** https://photo-caption-contest-gviy.onrender.com

## Features

- User registration and login
- Add captions to images stored in the database
- Like other users' captions (only one like per user per caption)
- Real-time caption sorting by popularity
- API documentation available at:  https://photo-caption-contest-gviy.onrender.com/api-docs/
- Input validation and error messages
- Security headers via Helmet
- Session-based authentication using express-session

## Technology Stack

- Node.js
- Express.js
- PostgreSQL (hosted on Render)
- EJS template engine
- express-session
- bcrypt
- express-validator
- helmet
- Swagger for API documentation

## API Overview

The API is documented with Swagger and can be explored at https://photo-caption-contest-gviy.onrender.com/api-docs/ .

## Security

- Passwords are securely hashed using bcrypt
- HTTP security headers are handled with Helmet
- Session authentication using secure cookies
- All input is validated with express-validator

## EJS Template Engine

EJS (Embedded JavaScript) is used to dynamically render HTML content on the server side.

## Deployment

This application is fully hosted on Render. It includes:

- Node.js backend
- PostgreSQL database
- Web frontend with EJS views

There is no need to clone or install the project to use it.

## Local Development

To run the project locally:

1. Clone the repository
2. Install dependencies:
   - npm install
3. Create a `.env` file and add your database and session configuration
4. Run the application:
   - npm run dev


## Contact

For questions or feedback, please contact: bermxtf@gmail.com

