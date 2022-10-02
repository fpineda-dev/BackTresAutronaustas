const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../model/nosql/users');
require('dotenv').config();
/**
 * register user
 * @param {*} req;
 * @param {*} res;
 */

// eslint-disable-next-line consistent-return
const createUser = async (req, res) => {
  try {
    const {
      name, email, password, token,
    } = req.body;
    // validate user input
    if (!(name && email && password && token)) {
      res.status(400).send('All input is required');
    }

    // check if user already exist in our database
    const olduser = await userModel.findOne({ email });

    if (olduser) {
      return res.status(409).send('User Already Exist. Please Login');
    }

    // Encryp user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // create user in our database
    const data = await userModel.create({
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      token,
    });
    res.send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
};

/**
 * get data user
 * @param {*} req;
 * @param {*} res;
 */
// eslint-disable-next-line consistent-return
const loginUser = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.params;

    // check if user already exist in our database
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(409).send('User Not Exist. Please register');
    }

    if (user && (await bcrypt.compare(password, user.password))) {
    // Create token
      const token = jwt.sign(
      // eslint-disable-next-line no-underscore-dangle
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: '2h', // 5s  1m
        },
      );
      // save user token
      user.token = token;

      console.log(`Data in param.. ${email}, ${password} ${user.token}`);

      const data = await userModel.updateOne(
        { email },
        { token },
      );
      console.log(`Token updated... ${data}`);

      // user
      res.status(200).json(user);
    } else {
      res.status(400).send('Invalid Credentials');
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createUser,
  loginUser,
};
