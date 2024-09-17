const router = require('express').Router();
const { Post, Comment } = require('../../models');

const withAuth = require('../../utils/auth');
const {  DataTypes } = require("sequelize");

// Create a new post
router.post('/', withAuth, async (req,res) =>{
    try{
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });
    
        // console.log(newPost); //Uncomment for testing purposes

        res.status(200).json(newPost);
        console.log('Post Successfully added');
    } catch(err){
        console.log(err);
        res.status(400).json(err);
    }
});

// Get all posts
router.get('/',  async (req, res) =>{
    try{
        const posts = await Post.findAll({
            include:
            [{
                model: Comment,
                
            }]
        });

        if(!posts){
            res
            .status(40)
            .json( {message: 'No posts exist'});
            return;
        }
        res.status(200).json(posts);
    }
    catch(err){
        console.log(err);
        res.status(400).json(err)
    }
})

// Get a specific post by its id
router.get('/:id', withAuth, async (req,res) =>{
    try{
        const post = await Post.findOne({where: {id: req.params.id}});
        if(!post){
            res
            .status(40)
            .json( {message: 'No post exists with current id, please try again'});
            return;
        }
        res.status(200).json(post);
    }
    catch(err){
        console.log(err);
        res.status(400).json(err);
    }   
});

// Update a post UNIMPLEMENTED
router.put('/:id', withAuth, async (req,res) =>{
    try{
        
        Post.update({
           
            text: req.body.text,
            date_created: DataTypes.NOW,
           
        },
        {
            where: {
                id: req.params.id,
            }
        });
    }
    catch(err){
        res.status(500).json(err);
    }

});

// Delete a post UNIMPLEMENTED
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const postData = await Post.destroy({
        where: {
          id: req.params.id,
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

// Create a comment, linked to a specific post
router.post('/:id/comment', withAuth, async (req,res) =>{
    try {
        const post_id = req.params.id;
        const { text } = req.body;
        console.log(post_id + " " + text);

        // Create a new comment associated with the post
        const newComment = await Comment.create({
            
            text,
            post_id,
            user_name: req.session.user_id,
        });

       

        res.status(200).json(newComment);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'An error occurred while adding the comment.' });
    }
});

// Get all comments, used for testing comments
router.get("/:id/comments", withAuth, async (req, res ) =>{
    try{
        const { id } = req.params;
        const comments = await Comment.findMany({where: {id: id }});
        res.status(200).json(comments);
    }
    catch(err){
        res.status(400).json(err);
    }   
});


module.exports = router