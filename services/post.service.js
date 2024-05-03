const PostModel = require('../models/post.model');
const jwt = require("jsonwebtoken");

class PostService {
    static async savePost(postData, token) {
        try {
            console.log("-----Postdata-----", postData);
            console.log("-----PostdataTYPE-----", typeof postData);

            const decodedToken = jwt.verify(token, "secret");
            const userId = decodedToken._id; // Assuming user ID is stored in the token

            const { description, date, fromCity, toCity, peopleAmount, priceAmount } = postData;

            const SaveCreatedPost = new PostModel({
                description,
                date,
                fromCity,
                toCity,
                peopleAmount,
                priceAmount,
                createdBy: userId // Assign user ID to createdBy field
            });

            return await SaveCreatedPost.save();
        } catch (error) {
            throw error;
        }
    }

    static async getAllPosts() {
        try {
            // Fetch all posts from the database
            return await PostModel.find({});
        } catch (error) {
            throw error;
        }
    }

    static async getPostsByUserId (userId) {
        try {
            const posts = await PostModel.find({ createdBy: userId });
            return posts;
    } catch (error) {
        throw new Error('Error fetching posts by user ID');
    }

    };
    
}

module.exports = PostService;
