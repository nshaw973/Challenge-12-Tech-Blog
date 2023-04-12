const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Main page
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User, attributes: ['name'] }],
      order: [['id', 'DESC']],
    });
    const blogPosts = blogData.map((posts) => posts.get({ plain: true }));
    res.render('homepage', {
      blogPosts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500);
  }
});

//Login / Signup Page
router.get('/login', (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.redirect('/');
  }
});

// User Profile/Dashboard
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });
    const user = userData.get({ plain: true });

    res.render('dashboard', {
      user,
      logged_in: req.session.logged_in,
      current_id: req.session.user_id,
    });
  } catch (err) {
    res.redirect('/');
  }
});

// Specific blog post to edit
router.get('/dashboard/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{ model: User, attributes: ['name', 'id'] }],
    });
    const blog = blogData.get({ plain: true });
    // Prevents user from typing in the ID of a different blog that doesn't belong to them
    if (req.session.user_id !== blog.user_id) {
      res.redirect('/dashboard');
      return;
    }
    res.render('edit', {
      blog,
      id: req.params.id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.redirect('/');
  }
});

// Goes to a specific blogpost and it's corresponding comments
router.get('/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment, include: ['user'] }],
    });

    const blog = blogData.get({ plain: true });

    res.render('blogpost', {
      ...blog,
      id: req.params.id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log('this is the error',err);
    res.redirect('/');
  }
});

module.exports = router;
