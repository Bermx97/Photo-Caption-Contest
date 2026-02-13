const registerService = require('../services/register.service');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
    try {
      const saltRounds = 10;
      const password = req.body.password
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const username = req.body.username
      const user = await registerService.findUser(username);
      if (user.rows.length > 0) {
        return res.status(409).json({ error: 'Username already taken' });
      }
      const result = await registerService.createUser(username, hashedPassword);
      res.status(200).json({ message: 'user added' });
    } catch (err) {
      console.error(err);
      res.status(500).send('server error');
    }
};

exports.showRegisterPage = async (req, res) => {
    res.render('register');
};
