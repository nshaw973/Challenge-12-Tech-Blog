const Blog = require('./blog');
const User = require('./user');
const Comment = require('./comment');

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

Blog.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Blog }