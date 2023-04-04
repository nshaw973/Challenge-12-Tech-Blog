const Blog = require('../models/blog');

//Blog seed data.
const blogData = [
    {
        title: 'Welcome!',
        post: `Welcome to the Blog! Make sure to create an account and after that, you'll be able to creat your own blogs!`,
        user_id: 1
    },
    {
        title: 'First Post',
        post: `Hello, this is my first post!`,
        user_id: 2
    }
]
// creates the seeds in bulk, currently set to bulk in case mode data is needed to be seeded.
const seedBlogs = () => Blog.bulkCreate(blogData)
// Sent to seed.js
module.exports = seedBlogs;