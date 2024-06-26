const UserServices = require('../services/user.service');

exports.register = async (req, res, next) => {
    try {
        console.log("---req body---", req.body);
        const { email, password, name, username} = req.body;
        const duplicate = await UserServices.getUserByEmail(email);
        if (duplicate) {
            throw new Error(`UserName ${email}, Already Registered`)
        }
        const response = await UserServices.registerUser(email, password, name, username);

        res.json({ status: true, success: 'User registered successfully' });


    } catch (err) {
        console.log("---> err -->", err);
        next(err);
    }
}

exports.login = async (req, res, next) => {
    try {

        const { email, password } = req.body;

        if (!email || !password) {
            throw new Error('Parameter are not correct');
        }
        let user = await UserServices.checkUser(email);
        if (!user) {
            throw new Error('User does not exist');
        }

        const isPasswordCorrect = await user.comparePassword(password);

        if (isPasswordCorrect === false) {
            throw new Error(`Username or Password does not match`);
        }

        // Creating Token

        let tokenData;
        tokenData = { _id: user._id, email: user.email };
    

        const token = await UserServices.generateAccessToken(tokenData,"secret","1h")

        res.status(200).json({ status: true, success: "sendData", token: token });
    } catch (error) {
        console.log(error, 'err---->');
        next(error);
    }
}

exports.getUserById = async (req, res, next) => {
    try {
        const userID = req.params.userID; // Extracting user ID from URL parameters
        const user = await UserServices.getUserById(userID);
        if (!user) {
            throw new Error('User not found');
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getUserByToken = async (req, res, next) => {
    try {
        const token = req.params.token;
        const decodedToken = await UserServices.verifyAccessToken(token, "secret");
        const userId = decodedToken._id;
        const user = await UserServices.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        res.json(user);
    } catch (error) {
        console.log(error);
        next(error);
    }
}