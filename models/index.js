
const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

Comment.belongsTo(Post,{
    foreignkey: 'post_id',
});

Post.hasMany(Comment, {
    foreignkey: 'post_id',
    // as: 'PostComments',
    onDelete: "CASCADE",
});

Post.belongsTo(User,{
    foreignkey: 'user_id',
})

User.hasMany(Post, {
    foreignkey: 'post_id',
}); 




module.exports = { User, Post, Comment};