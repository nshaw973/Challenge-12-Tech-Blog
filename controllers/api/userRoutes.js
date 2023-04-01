const router = require('express').Router();
const { User } = require('../../models');

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

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            window.prompt('Error with login, check email or password and try again')
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            window.prompt('Error with login, check email or password and try again')
            return;
        }
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
          
          res.redirect('/');
        });
      } catch (err) {
        res.status(400).json(err);
      }
})

module.exports = router;