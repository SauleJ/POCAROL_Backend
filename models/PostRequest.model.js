const { Timestamp } = require('mongodb');
const db = require('../config/db');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postRequestSchema = new Schema({
    postID: {
        type: Schema.Types.ObjectId,
        ref: 'Post' },
    users: [{
        userID: {
            type: Schema.Types.ObjectId,
            ref: 'User' },
        state: { type: Boolean, default: false }
    }],
    chatMessages: [{
        senderID: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        senderUsername: String,
        message: String,
        timestamp: { type: Date, default: Date.now }
    }]
});

const PostRequestModel = db.model('PostRequest', postRequestSchema);
module.exports = PostRequestModel;