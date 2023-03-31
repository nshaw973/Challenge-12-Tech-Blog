
const Blog = require('../models/blog');

const blogData = [
    {
        name: 'Nathan',
        title: 'Welcome!',
        post: `Welcome to the Blog! Make sure to create an account and after that, you'll be able to creat youur own blogs!`,
        user_id: 1
    }
]

const seedBlogs = () => Blog.bulkCreate(blogData)

module.exports = seedBlogs;