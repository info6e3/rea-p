const userService = require('../services/user-service');
const ImageService = require("../services/image-service");

class UserController {
    async getUser(req, res, next) {
        try {
            const user_id = req.user.id;
            const user = await userService.getUser(user_id);
            return res.status(200).send(user)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();