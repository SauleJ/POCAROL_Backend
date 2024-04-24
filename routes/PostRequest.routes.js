const router = require("express").Router();
const PostRequestController = require('../controller/PostRequest.controller');

router.post('/savePostRequest', PostRequestController.savePostRequest);
router.get('/getAllPostRequest', PostRequestController.getAllPostRequest);

module.exports = router;