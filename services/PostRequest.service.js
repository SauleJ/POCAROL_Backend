const { Types } = require('mongoose');
const PostRequestModel = require('../models/PostRequest.model');

exports.savePostRequest = async (requestData) => {
    const { postID, users } = requestData;

    try {
        // Check if a PostRequest document with the given postID already exists
        let postRequest = await PostRequestModel.findOne({ postID });

        if (!postRequest) {
            // If no document exists, create a new one
            postRequest = new PostRequestModel({ postID, users });
        } else {
            // If a document already exists, update its users array
            postRequest.users = [...postRequest.users, ...users];
        }

        // Save the post request (create or update) and return the result
        return await postRequest.save();
    } catch (error) {
        throw error;
    }
};

exports.getAllPostRequest = async () => {
    // Retrieve all post requests
    return await PostRequestModel.find();
};
