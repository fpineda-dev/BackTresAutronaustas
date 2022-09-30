const productModel = require('../model/nosql/product');

const findAllProduct = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (req, res) => {
  try {
    const {
      name, price, owner,
    } = req.body;
    // validate user input
    if (!(name && price && owner)) {
      res.status(400).send('All input is required');
    }
    const { body } = req;
    const data = await productModel.create(body);
    res.send({ data });
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line consistent-return
const updateProduct = async (req, res) => {
  try {
    // const { body } = req;
    const { id } = req.params;
    const { body } = req;
    console.log(`Data in param.. ${id}, ${body}`);
    if (!(id)) {
      res.status(400).send('id product is required');
    }

    const product = await productModel.findOne({ id });
    if (!product) {
      return res.status(409).send('Product Not Exist. Please create');
    }

    console.log(`Its product... ${product}, and Body ${body}`);
    const data = await productModel.findOneAndUpdate(id, body);
    res.send(data); // data
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  try {
    // const { body } = req;
    const { id } = req.params;
    const { body } = req;
    console.log(`Data in param.. ${id}, ${body}`);
    if (!(id)) {
      res.status(400).send('id product is required');
    }
    console.log(`Its product... Body ${body}`);
    const data = await productModel.deleteOne({ _id: id });
    res.send(data); // data
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProduct, updateProduct, findAllProduct, deleteProduct,
};
