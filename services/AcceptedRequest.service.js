const AcceptedRequestModel = require('../models/AcceptedRequest.model');

exports.saveAcceptedRequest = async (requestData) => {
    const { postID, users, chatName } = requestData;
    const acceptedRequest = new AcceptedRequestModel({
        postID,
        users,
        chatName,
        chat: []
    });
    return await acceptedRequest.save();
};

exports.getAllAcceptedRequest = async () => {
    return await AcceptedRequestModel.find();
};
