const PostRequestService = require('../services/PostRequest.service');

exports.savePostRequest = async (req, res, next) => {
    try {
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

exports.getUsersForPost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const users = await PostRequestService.getUsersForPost(postId);

    return res.json({ users });
  } catch (error) {
    console.error('Error fetching users for post:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateUserState = async (req, res, next) => {
    try {
        const { userID, postID, newState, index } = req.body;

        // Check if the user ID, post ID, state, and index are provided
        if (!userID || !postID || newState === undefined || index === undefined) {
            return res.status(400).json({ message: 'User ID, post ID, new state, and index are required' });
        }

        const result = await PostRequestService.updateUserState(userID, postID, newState, index);
        res.json(result);
    } catch (error) {
        next(error);
    }

};

exports.getPostsByUserIdWithTrueStateUsers = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const posts = await PostRequestService.getPostsByUserIdWithTrueStateUsers(userId);
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

exports.saveChatMessages = async (req, res, next) => {
    try {
        const {postId, message, senderId } = req.body;
        // Check if the postId, senderId, and chatMessages are provided
        if (!senderId || !postId || !message) {
            return res.status(400).json({ message: 'postId, senderId, and chat messages are required' });
        }
        const result = await PostRequestService.saveChatMessages(postId, message, senderId);
        res.json(result);
    } catch (error) {
        next(error);
    }
};

exports.getChatMessages = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const chatMessages = await PostRequestService.getChatMessages(postId);
        res.json(chatMessages);
    } catch (error) {
        next(error);
    }
};

