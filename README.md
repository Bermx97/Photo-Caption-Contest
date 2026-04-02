# Photo Caption Contest App

This is a web application deployed on Render.com. It allows users to register, log in, add humorous captions to images stored in a database, edit and delete their own captions, like captions added by other users, and browse captions with pagination. The application also includes user roles, with standard users and admins, which control access to certain actions. Users can also view profile pages that display username, role, total captions added, and total likes received. Additionally, users can visit other profiles by clicking on usernames displayed next to captions.

https://github.com/user-attachments/assets/e58bd78a-6aae-4be0-8fed-662ba955e32c

## Live Application

The application is fully deployed on Render, including the database. Users can access and use it directly in the browser without installing anything.

**URL:** https://photo-caption-contest-gviy.onrender.com

## Features

- User registration and login
- Add captions to images stored in the database
- Editing and deleting your captions
- Like other users' captions (only one like per user per caption)
- Real-time caption sorting by popularity
- Implemented server-side pagination for captions (limit & offset)
- Added dynamic Next/Previous navigation with page validation
- User profile page with statistics (total captions, total likes)
- View other users' profiles via username links
- API documentation available at:  https://photo-caption-contest-gviy.onrender.com/api-docs/
- Input validation and error messages
- Security headers via Helmet
- Session-based authentication using express-session
- The application is fully responsive and adapts to different screen sizes.
- Automated tests for controllers, service and endpoints (run locally with `npm test`)
- Role-based access control (user/admin)
- Dynamic rendering with EJS
  
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
Tests ensure that the application logic works correctly and endpoints behave as expected.

Run tests locally:
- npm install
- npm test

What is tested:

Controllers: login, register, captions, likes, gallery, user

Services: database queries, validation logic, likes handling

Endpoints: authentication, adding captions, liking captions, gallery display, user profile pages

Tests example:

<img width="1523" height="812" alt="Zrzut ekranu 2026-04-02 112908" src="https://github.com/user-attachments/assets/fd7a1bb8-7184-46d3-a499-641ffeb30cce" />
<img width="958" height="261" alt="Zrzut ekranu 2026-04-02 113208" src="https://github.com/user-attachments/assets/6126b6b5-5354-4d4f-88e5-deae737e16f8" />




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


 
<img width="1328" height="641" alt="image" src="https://github.com/user-attachments/assets/10c6d0c4-283a-4876-9508-3afcebeeb29f" />







## Contact

For questions or feedback, please contact: bermxtf@gmail.com

