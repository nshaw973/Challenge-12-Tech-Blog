const router = require('express').Router();
const { Blog } = require('../../models');
const withAuth = require('../../utils/auth')

// Creates new blogpost
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

// Updates blogpost
router.put('/:id', withAuth, async (req, res) => {
  try {
    const editPost = await Blog.update(
      {
        ...req.body
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id
        }
      }
    );
    res.status(200).json(editPost)
  } catch (err) {
    res.status(400).json('Unable to update post')
  };
});

// Deletes blogpost through the red delete button in dashboard
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json('Unable to delete post');
  }
});

module.exports = router