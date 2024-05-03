const router = require("express").Router();
const PostController = require('../controller/post.controller')

router.post('/savePost', PostController.savePost);
router.get('/getAllPosts', PostController.getAllPosts);
router.get('/getPostsByUserId/:userId', PostController.getPostsByUserId);

module.exports = router;
