const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await Blog.create({
        ...req.body,
        user_id: req.session.user_id,
      });

      res.status(200).json(newPost)
      } catch (err) {
        res.status(400).json('Unable to create a new post')
      };
  });

module.exports = router