const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth')

router.post('/', withAuth, async (req, res) => {
    try {
      const newPost = await Blog.create({
        //spread operator needed to get all the values in the body, in this case title and post
        ...req.body,
        //Current user id
        user_id: req.session.user_id,
      });
      // Takes the newpost const and posts into blog table
      res.status(200).json(newPost)
      } catch (err) {
        res.status(400).json('Unable to create a new post')
      };
  });

module.exports = router