const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postsRoutes');

router.use('/user', userRoutes);
router.use('/posts', postRoutes);

module.exports = router;