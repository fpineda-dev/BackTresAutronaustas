const productModel = require('../model/nosql/product');
const userModel = require('../model/nosql/users');

// eslint-disable-next-line consistent-return
const findAllProduct = async (req, res) => {
  try {
    // find user loged
    const accessToken = req.headers['x-access-token'];
    const query = { token: accessToken };
    console.log(`[findAllProduct] It's Access token... ${accessToken}`);

    const userRegistered = await userModel.find(query);
    if (!userRegistered) {
      console.log('[findAllProduct] User logout :( bad ');
      return res.status(401).send('Invalid Token');
    }

    const owner = { productManage: userRegistered[0].email };

    console.log(`[findAllProduct] It's Mail of user registered... ${owner}`);
    // const products = await productModel.find();
    const products = await productModel.find(owner);
    res.status(200).send({
      Nombre: userRegistered[0].name,
      products,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
};

// eslint-disable-next-line consistent-return
const createProduct = async (req, res) => {
  try {
    const {
      name, price,
    } = req.body;
    // validate user input
    if (!(name && price)) {
      res.status(400).send('All input is required');
    }
    // find user loged
    // eslint-disable-next-line no-use-before-define

    const accessToken = req.headers['x-access-token'];
    const query = { token: accessToken };
    console.log(`It's Access token... ${accessToken}`);

    const userRegistered = await userModel.find(query);
    if (!userRegistered) {
      console.log('User logout :( bad ');
    }

    // const email = typeof (userRegistered);

    console.log(`It's Mail of user registered... ${userRegistered}`);
    console.log(`Only mail... ${userRegistered[0].email}`);

    const { body } = req;
    const data = await productModel.create({
      name: body.name,
      price: body.price,
      productManage: userRegistered[0].email,
    });
    res.send(data);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send(error);
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

    const accessToken = req.headers['x-access-token'];
    const query = { token: accessToken };
    console.log(`It's Access token... ${accessToken}`);

    const userRegistered = await userModel.find(query);
    if (!userRegistered) {
      console.log('User logout :( bad ');
    }

    const idProduct = { _id: id };

    const product = await productModel.find(idProduct);
    if (!product) {
      return res.status(409).send('Product Not Exist. Please create');
    }

    console.log(`[updateProduct] It's Email of user register... ${userRegistered[0].email}`);

    // eslint-disable-next-line no-empty
    if (userRegistered[0].email === product[0].productManage) {
      console.log('Se ha comprobado que eres el dueño del producto');
      console.log(`Manager and Product ${product[0].productManage} - ${product[0].name} - ${product[0].id}`);
      console.log(`Body ${id} - ${body.name}`);
      const data = await productModel.updateOne(
        { _id: id },
        body,
      );
      res.send(data); // data
    // eslint-disable-next-line no-empty
    } else {
      return res.status(401).send({ message: 'Unauthorized to edit current product' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// eslint-disable-next-line consistent-return
const deleteProduct = async (req, res) => {
  try {
    // const { body } = req;
    const { id } = req.params;
    const { body } = req;
    console.log(`Data in param.. ${id}, ${body}`);
    if (!(id)) {
      res.status(400).send('id product is required');
    }

    const accessToken = req.headers['x-access-token'];
    const query = { token: accessToken };
    console.log(`It's Access token... ${accessToken}`);

    const userRegistered = await userModel.find(query);
    if (!userRegistered) {
      console.log('User logout :( bad ');
    }

    const idProduct = { _id: id };

    const product = await productModel.find(idProduct);
    if (!product) {
      return res.status(409).send('Product Not Exist. Please create');
    }

    console.log(`[updateProduct] It's Email of user register... ${userRegistered[0].email}`);

    if (userRegistered[0].email === product[0].productManage) {
      console.log('Se ha comprobado que eres el dueño del producto');
      console.log(`Its product... Body ${body}`);
      const data = await productModel.deleteOne({ _id: id });
      res.send(data);
    } else {
      return res.status(401).send({ message: 'Unauthorized to delete current product' });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = {
  createProduct, updateProduct, findAllProduct, deleteProduct,
};
