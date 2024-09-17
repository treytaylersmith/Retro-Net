const router = require("express").Router();
const { Post, User, Comment } = require("../models");

// Main page
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

// Post specific pages, displaying comments
router.get('/post/:id', async (req, res) => {
  try {
    const commentData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          

        }
      ],
    });
    //console.log(commentData);   // Console log for testing purposes

    const post = commentData.get({ plain: true });
    //console.log(post);          // Console log for testing purposes

    res.render('comment', {
      post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login page
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/forum');
    return;
  }

  res.render('login');
});


module.exports = router;
