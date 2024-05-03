const router = require("express").Router();
const PostRequestController = require('../controller/PostRequest.controller');

router.post('/savePostRequest', PostRequestController.savePostRequest);
router.get('/getAllPostRequest', PostRequestController.getAllPostRequest);
router.get('/getUsersForPost/:postId', PostRequestController.getUsersForPost);
router.put('/updateUserState', PostRequestController.updateUserState);
router.get('/getPostsByUserIdWithTrueStateUsers/:userId', PostRequestController.getPostsByUserIdWithTrueStateUsers);
router.post('/saveChatMessages', PostRequestController.saveChatMessages);
router.get('/getChatMessages/:postId', PostRequestController.getChatMessages);

module.exports = router;