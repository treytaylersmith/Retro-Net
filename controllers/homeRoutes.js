const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["user_name"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    // console.log(postData);
    console.log(posts);

    res.render('forum', {
      posts,
      logged_in: req.session.logged_in,
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const commentData = await Post.findByPk(req.params.id, {
      include: [
        // {
      //     model: User,
      //     attributes: ['user_name'],
      //   },
        {
          model: Comment,
          

        }
      ],
    });
    console.log(commentData);
    const post = commentData.get({ plain: true });
    console.log(post);

    res.render('comment', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/forum');
    return;
  }

  res.render('login');
});


module.exports = router;
