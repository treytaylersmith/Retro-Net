
const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

Comment.belongsTo(Post,{
    foreignkey: 'post_id',
});

Post.hasMany(Comment, {
    foreignkey: 'post_id',
    onDelete: "CASCADE",
});

User.hasMany(Post, {
    foreignkey: 'post_id',
}); 

User.hasMany(Comment, {
    foreignkey: 'comment_id',
});