const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{ model: User, attributes: ['name'] }]
        });
        const blogPosts = blogData.map((posts) => posts.get({ plain: true }));

        res.render('homepage', {
            blogPosts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500)
        console.log(err)
    };
});

router.get('/login', (req, res) => {
    try {
        res.render('login')
    } catch(err) {
        res.redirect('/');
    };
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Blog }],
        });
        const user = userData.get({ plain: true });

        res.render('dashboard', {
            user,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.redirect('/');
    };
});

module.exports = router;