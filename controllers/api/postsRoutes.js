const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');
const {  DataTypes } = require("sequelize");


router.post('/', withAuth, async (req,res) =>{
    try{
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });

        res.status(200).json(newPost);
    } catch(err){
        res.status(400).json(err);
    }
});

router.get('/:post_id', withAuth, async (req,res) =>{
    try{
        const post = await Post.findOne({where: {post_id: req.params.post_id}});
        if(!post){
            res
            .status(40)
            .json( {message: 'No post exists with current id, please try again'});
            return;
        }
        res.status(200).json(post);
    }
    catch(err){
        res.status(400).json(err);
    }   
});

router.put('/:post_id', withAuth, async (req,res) =>{
    try{
        Post.update({
            post_id: req.params.post_id,
            title: req.body.title,
            text: req.body.text,
            date_created: DataTypes.NOW,
            user_id: req.body.user_id,
            user_name: req.body.user_name,
            comments: req.body.comments,
        });
    }
    catch(err){
        res.status(500).json(err);
    }

});

router.delete('/:post_id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          post_id: req.params.post_id,
          user_id: req.session.user_id,
        },
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
  
      res.status(200).json(postData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.post('/:post_id/comment', withAuth, async (req,res) =>{
    try {
        const { post_id } = req.params;
        const { text } = req.body;

        // Create a new comment associated with the post
        const newComment = await Comment.create({
            
            text,
            post_id,
            user_name: req.session.user_id,
        });

        const post = await Post.findOne({where: {id: post_id}});
        let postComments = post.comments;

        if(postComments=== null){
            postComments = [newComment];
        }
        postComments.push(newComment);

        

        res.status(201).json(postComments);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding the comment.' });
    }
});


router.get("/:post_id/comments", withAuth, async (req, res ) =>{
    try{
        const { post_id } = req.params;
        const comments = await Comment.findMany({where: {post_id: post_id }});
        res.status(200).json(comments);
    }
    catch(err){
        res.status(400).json(err);
    }   
});


module.exports = router