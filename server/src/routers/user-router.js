const {Router} = require('express')
const userController = require('../controllers/user-controller')
const authMiddleware = require("../middleware/auth-middleware");
const errorMiddleware = require("../middleware/error-middleware");

const userRouter = new Router();

userRouter.get('/get-user', authMiddleware, userController.getUser);
userRouter.use(errorMiddleware);

module.exports = userRouter;