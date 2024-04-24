const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const acceptedRequestSchema = new Schema({
    postID: {
         type: Schema.Types.ObjectId,
         ref: 'Post',
         required: true},
    users: [{
         type: Schema.Types.ObjectId,
         ref: 'User' }],
    chatName: String,
    chat: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        messages: [String]
    }]
});

const AcceptedRequestModel = db.model('AcceptedRequest', acceptedRequestSchema);
module.exports = AcceptedRequestModel;