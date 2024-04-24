const PostRequestService = require('../services/PostRequest.service');

exports.savePostRequest = async (req, res, next) => {
    try {
        console.log("mee controller")
        const postRequest = await PostRequestService.savePostRequest(req.body);
        res.json(postRequest);
    } catch (error) {
        next(error);
    }
};

exports.getAllPostRequest = async (req, res, next) => {
    try {
        const allPostRequests = await PostRequestService.getAllPostRequest();
        res.json(allPostRequests);
    } catch (error) {
        next(error);
    }
};
