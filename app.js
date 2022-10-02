require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const dbConnect = require('./config/mongo');
const { router } = require('./routes');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library API',
      version: '1.0.0',
      description: 'Test for tres Autronaustas',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/', router);

app.listen(port, () => {
  console.log(`Listenin in http:localhost: ${port}`);
});

dbConnect();
