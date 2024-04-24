const db = require('../config/db');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    description: {
        type: String,
        required: [true, "description is required"],
    },
    date: {
        type: String,
        required: [true, "Date is required"],
    },
    fromCity: {
        type: String,
        required: [true, "From city is required"],
    },
    toCity: {
        type: String,
        required: [true, "To city is required"],
    },
    peopleAmount: {
        type: Number,
        required: [false, "people amount is required"],
    },
    priceAmount: {
        type: Number,
        required: [false, "Price is required"],
    },
    createdBy: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    }
},{timestamps:true});

const PostModel = db.model('Posts', postSchema);
module.exports = PostModel;
