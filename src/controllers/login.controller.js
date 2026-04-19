const loginService = require('../services/login.service');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
      const wanted = req.body.username;
      const password = req.body.password;
      const user = await loginService.findUser(wanted);
      if (user.rows.length === 0 ) {
        const error = new Error('Invalid login credentials');
        error.status = 401;
        throw error;
      }
      const foundUser = user.rows[0];
      const isMatch = await bcrypt.compare(password, foundUser.password);
      if (!isMatch) {
        const error = new Error('Invalid login credentials');
        error.status = 401;
        throw error;
      }
      req.session.isAuthenticated = true;
      req.session.username = foundUser.username;
      req.session.userId = foundUser.id; //create session
      req.session.role = foundUser.role; //crate role
      res.status(200).json({ message: 'logged' });
};


