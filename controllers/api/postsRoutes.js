const router = require('express').Router();
const { User } = require('../../models');
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
        const post = await Post.findOne({where: {id: req.body.id}});
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
            id: req.body.id,
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

router.post('/:post_id/comment', withAuth, async (req,res) =>{
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

module.exports = router