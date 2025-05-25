const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation for the Photo Caption Contest app',
    },
    servers: [
      {
        url: 'https://photo-caption-contest-gviy.onrender.com' || 'http://localhost:3002/',
      },
    ],
  },
  apis: ['./main.js'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
