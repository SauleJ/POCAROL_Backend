const router = require("express").Router();
const AcceptedRequestController = require('../controller/AcceptedRequest.controller');

router.post('/AcceptedRequest', AcceptedRequestController.saveAcceptedRequest);
router.get('/getAllAcceptedRequest', PostController.getAllAcceptedRequest);

module.exports = router;