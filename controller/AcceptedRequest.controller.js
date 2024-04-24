const AcceptedRequestService = require('../services/AcceptedRequest.service');

exports.saveAcceptedRequest = async (req, res, next) => {
    try {
        const acceptedRequest = await AcceptedRequestService.saveAcceptedRequest(req.body);
        res.json(acceptedRequest);
    } catch (error) {
        next(error);
    }
};

exports.getAllAcceptedRequest = async (req, res, next) => {
    try {
        const allAcceptedRequests = await AcceptedRequestService.getAllAcceptedRequest();
        res.json(allAcceptedRequests);
    } catch (error) {
        next(error);
    }
};
