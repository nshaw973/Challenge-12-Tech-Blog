const router = require('express').Router();
const { User } = require('../../models');

// Creates new user, and tehn logs them in
router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
      req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      res.status(200).json(userData);
    });
    } catch (err) {
      res.status(400).json(err);
    };
});

// User logs in based on matching credentials in DB
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData) {
      window.prompt('Error with login, check email or password and try again')
      return;
    }
    // Checking pasword with bcrypt, which is part of the user class model
    const validPassword = await userData.checkPassword(req.body.password);
    if (!validPassword) {
      window.prompt('Error with login, check email or password and try again')
      return;
    }
    // after succesful login, saves the session data for the current user_id, and the logged in status turns to true
    req.session.save(() => {
    req.session.user_id = userData.id;
    req.session.logged_in = true;    
    res.redirect('/');
    });
    } catch (err) {
      res.status(400).json('An error has occured');
    }
})

// logs user out
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;