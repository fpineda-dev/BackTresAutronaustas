const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    owner: {
      type: String,
      unique: true,
    },
  },
  {
    timesstamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('product', ProductSchema);
