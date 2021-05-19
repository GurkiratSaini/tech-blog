const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Vote = require('./Vote');

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Post, {
    foreignKey: 'post_id'
});

Vote.belongsTo(Comment, {
    foreignKey: 'comment_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Post.hasMany(Vote, {
    foreignKey: 'post_id'
});

Comment.hasMany(Vote, {
    foreignKey: 'comment_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

User.belongsToMany(Comment, {
    through: Vote,
    as: 'voted_comments',
    foreignKey: 'user_id'
});

Comment.belongsToMany(User, {
    through: Vote,
    as: 'voted_comments',
    foreignKey: 'comment_id'
})

module.exports = { User, Post, Comment, Vote };