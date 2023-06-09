
const User = require('../models/user');

const userData = [
    {
        name: 'Nathan',
        email: 'nshaw973@gmail.com',
        password: 'Password123456'
    },
    {
        name: 'David',
        email: 'dshaw973@gmail.com',
        password: 'Password123456'
    },
    {
        name: 'Morgan',
        email: 'mshaw973@gmail.com',
        password: 'Password123456'
    }
]

// creates the seeds in bulk, currently set to bulk in case mode data is needed to be seeded.
// Makes sure to go through hooks for each object, currently in for possible more users to be seeded.
const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});
// Sent to seed.js
module.exports = seedUsers;
