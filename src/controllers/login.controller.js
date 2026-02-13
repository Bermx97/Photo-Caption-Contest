const loginService = require('../services/login.service');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
      const wanted = req.body.username
      const user = await loginService.findUser(wanted) //await pool.query('SELECT * FROM users WHERE username = $1', [req.body.username]);
      if (user.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid login credentials' });
      }
      const foundUser = user.rows[0];
      const isMatch = await bcrypt.compare(req.body.password, foundUser.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid login credentials' });
      }
      req.session.isAuthenticated = true;
      req.session.userId = foundUser.id; //create session
      res.status(200).send('logged');
    } catch (err) {
      console.error(err);
      res.status(500).send('server error');
    }
};



