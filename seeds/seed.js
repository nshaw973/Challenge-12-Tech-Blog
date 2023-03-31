const sequelize = require('../config/connection');
const seedUsers = require('./userData');
const seedBlogs = require('./blogData');


const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await seedUsers();
    await seedBlogs();

  process.exit(0);
};

seedDatabase();
