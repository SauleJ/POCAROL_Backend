const db = require('../config/db');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, "userName can't be empty"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    username: String,
    name: String,
    rating: { type: Number, default: 0 },
    lastname: String,
    photo: String,
    carNumber: String
},{timestamps:true});


// used while encrypting user entered password
userSchema.pre("save",async function(){
    var user = this;
    if(!user.isModified("password")){
        return
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password,salt);

        user.password = hash;
    }catch(err){
        throw err;
    }
});


userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        console.log('---',this.password);
        // @ts-ignore
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

const UserModel = db.model('Users',userSchema);
module.exports = UserModel;