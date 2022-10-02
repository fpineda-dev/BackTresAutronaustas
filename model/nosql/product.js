const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    productManage: {
      type: String,
      require: true,
      // index: true,
      // unique: true,
      sparse: true,
    },
  },
  {
    timesstamps: true,
    versionKey: false,
  },
);

ProductSchema.plugin(require('mongoose-beautiful-unique-validation'));

module.exports = mongoose.model('product', ProductSchema);
