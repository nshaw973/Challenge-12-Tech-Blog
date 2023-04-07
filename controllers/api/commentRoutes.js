const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      // The req body is comment, and the blog_id
      ...req.body,
      //Current user id
      user_id: req.session.user_id,
    });
    // Takes the newpost const and posts into blog table
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json('Unable to create a new post');
  }
});

module.exports = router;
