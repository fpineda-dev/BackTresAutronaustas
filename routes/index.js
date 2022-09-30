const express = require('express');

const router = express.Router();
const fs = require('fs');

const PATH_ROUTER = __dirname;

// wathever file
const cleanFileName = (filename) => {
  const clean = filename.split('.').shift();
  return clean;
};

// charge all routers
// eslint-disable-next-line array-callback-return
fs.readdirSync(PATH_ROUTER).filter((fileNname) => {
  const prefixRoute = cleanFileName(fileNname);
  if (prefixRoute !== 'index') {
    console.log(`Loading the rute ... ${prefixRoute}`);
    // eslint-disable-next-line import/no-dynamic-require, global-require
    router.use(`/${prefixRoute}`, require(`./${prefixRoute}.js`));
  }
});

module.exports = { router };
