require('dotenv').config();
const mongoose = require('mongoose');

const dbConnect = () => {
  const { DB_URI } = process.env;
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err) => {
    if (!err) {
      console.log('**** CONEXION CORRECTA ****');
    } else {
      console.log('**** ERROR DE CONEXION ****');
    }
  });
};

module.exports = dbConnect;
