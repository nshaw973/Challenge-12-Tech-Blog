const Blog = require('./blog');
const User = require('./user');
const Comment = require('./comment');

// User Joins
User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

// Blog Joins
Blog.belongsTo(User, {
    foreignKey: 'user_id'
});

Blog.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

// Comment Joins
Comment.belongsTo(Blog, {
    foreignKey: 'blog_id',
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

module.exports = { User, Blog, Comment }