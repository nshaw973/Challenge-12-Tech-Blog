const router = require('express').Router();
const { Blog, User } = require('../models')

router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [{ model: User, attributes: ['name'] }]
        })
        const blogPosts = blogData.map((posts) => posts.get({ plain: true }));

        res.render('homepage', {
            blogPosts
        })
    } catch (err) {
        res.status(500)
        console.log(err)
    }
})

module.exports = router;