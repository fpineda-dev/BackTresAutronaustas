const models = {
  // eslint-disable-next-line global-require
  userModel: require('./nosql/users'),
  // eslint-disable-next-line global-require
  productModel: require('./nosql/product'),
};

module.export = models;
