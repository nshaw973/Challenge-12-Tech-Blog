
const { User } = require('../models/user');

const userData = [
    {
        name: 'Nathan',
        email: 'nshaw973@gmail.com',
        password: 'Password123456'
    }
]

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = {
    seedUsers
};
