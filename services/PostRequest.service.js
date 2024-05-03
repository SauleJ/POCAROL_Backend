const { Types } = require('mongoose');
const PostRequestModel = require('../models/PostRequest.model');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');

exports.savePostRequest = async (requestData) => {
    const { postID, users } = requestData;

    try {
        // Check if a PostRequest document with the given postID already exists
        let postRequest = await PostRequestModel.findOne({ postID });

        if (!postRequest) {
            // If no document exists, create a new one with the users
            postRequest = new PostRequestModel({ postID, users });
        } else {
            // If a document already exists, check if the user exists and add them if not
            users.forEach(user => {
                const userExists = postRequest.users.some(u => u.userID.equals(user.userID));
                if (!userExists) {
                    postRequest.users.push(user);
                }else{
                    throw { status: 409, message: 'User has already applied to this post' };
                }
            });
            
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

exports.getUsersForPost = async (postId) => {
  try {
    const postRequest = await PostRequestModel.findOne({ postID: postId });
    if (!postRequest) {
      throw new Error('Post not found');
    }
    return postRequest.users;
  } catch (error) {
    throw error;
  }
};

exports.updateUserState = async (userID, postID, newState, index) => {
    try {
        // Find the post request containing the user
        const postRequest = await PostRequestModel.findOne({ postID: postID, 'users.userID': userID });
        if (!postRequest) {
            throw { status: 410, message: 'Post request containing the user not found' };
        }

        // Update the user state at the specified index
        postRequest.users[index].state = newState;

        // Save the updated post request
        await postRequest.save();
        console.log("USERRR updatedd")
        return { message: 'User state updated successfully' };
    } catch (error) {
        console.error('Error updating user state:', error);
        throw error;
    }
};

exports.getPostsByUserIdWithTrueStateUsers = async (userId) => {
    try {
        const postsWithTrueStateUsers = [];

        // Find posts where the user is in the users list and the state is true
        const postRequests = await PostRequestModel.find({
            'users.userID': userId,
            'users.state': true
        });

        // Extract the postIDs from the found postRequests
        const postIDs = postRequests.map(postRequest => postRequest.postID);

        // Find posts related to the postRequests
        const relatedPosts = await PostModel.find({ _id: { $in: postIDs } });

        // Push related posts into postsWithTrueStateUsers
        postsWithTrueStateUsers.push(...relatedPosts);

        // Fetch posts created by the user
        const userPosts = await PostModel.find({ createdBy: userId });

        // Loop through userPosts to check for true state users
        for (const post of userPosts) {
            const postRequest = await PostRequestModel.findOne({ postID: post._id });

            // Check if post request exists and has at least one true state user
            if (postRequest && postRequest.users.some(user => user.state === true)) {
                postsWithTrueStateUsers.push(post);
            }
        }

        return postsWithTrueStateUsers;
    } catch (error) {
        console.error('Error fetching posts by user ID with true state users:', error);
        throw new Error('Error fetching posts by user ID with true state users');
    }
};

exports.saveChatMessages = async (postId, message, senderId) => {
    try {
        // Find the PostRequest document with the given postID
        let postRequest = await PostRequestModel.findOne({ postID: postId });
        if (!postRequest) {
            throw new Error('Post request not found');
        }

        // Retrieve the sender's username from UserModel
        let sender = await UserModel.findOne({ _id: senderId });
        if (!sender) {
            throw new Error('Sender not found');
        }
        let senderUsername = sender.email;

        // Append the new chat message to the existing ones
        postRequest.chatMessages.push({ senderID: senderId, senderUsername: senderUsername, message: message });
        
        // Save the updated PostRequest document
        return await postRequest.save();
    } catch (error) {
        throw error;
    }
};

exports.getChatMessages = async (postId) => {
    try {
        const postRequest = await PostRequestModel.findOne({ postID: postId });
        if (!postRequest) {
            throw new Error('Post request not found');
        }
        return postRequest.chatMessages;
    } catch (error) {
        throw error;
    }
};
