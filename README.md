# Photo Caption Contest App

This is a web application deployed on Render.com. It allows users to register, log in, add humorous captions to images loaded from a database, and like captions added by other users.


https://github.com/user-attachments/assets/cc1e6698-8204-4af3-819f-c2afb04273b9


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
- The application is fully responsive and adapts to different screen sizes.
- Automated tests for controllers, service and endpoints (run locally with `npm test`)
  
## Technology Stack

- ******Backend:****** Node.js, Express.js
- ****Database:**** PostgreSQL (hosted on Render)
- ****Templating Engine:**** EJS
- ****Authentication:**** express-session, bcrypt
- ****Validation & Security:**** express-validator, helmet
- ****API Docs:**** Swagger
- ****Testing:**** Jest, Supertest

## API Overview

The API is documented with Swagger and can be explored at https://photo-caption-contest-gviy.onrender.com/api-docs/ .

## Testing

The project includes unit and integration tests covering all controllers, services, and endpoints.

Run tests locally:
- npm install
- npm test

What is tested:

Controllers: login, register, captions, likes, gallery

Services: database queries, validation logic, likes handling

Endpoints: authentication, adding captions, liking captions, gallery display

Test example:

<img width="1053" height="564" alt="image" src="https://github.com/user-attachments/assets/56edff23-f0e8-4d59-bb85-9336cb33900c" />


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
  
## Database Schema:


 
![Database Schema](https://github.com/user-attachments/assets/c6416d4d-069d-4497-9017-0440ba4f35d9)




## Contact

For questions or feedback, please contact: bermxtf@gmail.com

