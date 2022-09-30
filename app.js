require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo');
const { router } = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/', router);

app.listen(port, () => {
  console.log(`Listenin in http:localhost: ${port}`);
});

dbConnect();
