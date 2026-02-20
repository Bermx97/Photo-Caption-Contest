const registerService = require('../services/register.service');
const loginService = require('../services/login.service')
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
      const saltRounds = 10;
      const password = req.body.password;
      const username = req.body.username;
      if (!username || !password) {
        const error = new Error ('Username and password are required');
        error.status = 400;
        throw error;
      }
      const user = await loginService.findUser(username);
      if (user.rows.length > 0) {
        const error = new Error('Username already taken');
        error.status = 409;
        throw error;
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const result = await registerService.createUser(username, hashedPassword);
      if (!result || result.rowCount === 0) {
        const error = new Error('server error');
        error.status = 500;
        throw error;
      }
      res.status(201).json({ message: 'user added' });
};

exports.showRegisterPage = (req, res) => {
    res.render('register');
};
