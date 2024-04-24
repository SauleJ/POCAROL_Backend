const router = require("express").Router();
const UserController = require('../controller/user.controller');

router.post("/register",UserController.register);

router.post("/login", UserController.login);

router.get("/getUserById/:userID", UserController.getUserById);

router.get("/getUserByToken/:token", UserController.getUserByToken);


module.exports = router;