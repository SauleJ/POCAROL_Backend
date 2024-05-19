const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

//In services, all the database operation happens like fetching, Insertion, Deletion.

class UserServices{
 
    static async registerUser(email,password, name, username){
        try{
                console.log("-----Email --- Password-----",email,password, name, username);
                
                const createUser = new UserModel({email,password, name, username});
                return await createUser.save();
        }catch(err){
            throw err;
        }
    }

    static async getUserByEmail(email){
        try{
            return await UserModel.findOne({email});
        }catch(err){
            console.log(err);
        }
    }


    static async checkUser(email){
        try {
            return await UserModel.findOne({email});
        } catch (error) {
            throw error;
        }
    }

    static async generateAccessToken(tokenData,JWTSecret_Key,JWT_EXPIRE){
        return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
    }

    static async getUserById(userID) {
        try {
            const user = await UserModel.findOne({_id: userID});
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async verifyAccessToken(token, JWTSecret_Key) {
        try {
            return jwt.verify(token, JWTSecret_Key);
        } catch (error) {
            throw error;
        }
    }
    
}

module.exports = UserServices;