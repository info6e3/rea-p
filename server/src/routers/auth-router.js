const {Router} = require('express')
const authController = require('../controllers/auth-controller')
const {check, query} = require('express-validator');
const authMiddleware = require('../middleware/auth-middleware')
const rolesMiddleware = require('../middleware/role-middleware')
const errorMiddleware = require('../middleware/error-middleware')

const authRouter = new Router();

authRouter.get('/validate-email', [
    query('email', 'Email не может быть пустым.').notEmpty(),
    query('email', 'Это не email.').isEmail()
], authController.validateEmail);

authRouter.post('/registration', [
    check('user.email', 'Email не может быть пустым.').notEmpty(),
    check('user.email', 'Это не email.').isEmail(),
    check('user.password', 'Пароль должен быть от 4 до 18 символов.').isLength({min: 4, max: 18})
], authController.registration);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/refresh', authController.refresh);
//authRouter.get('/users', authMiddleware, authController.getUsers);
authRouter.get('/activate', authController.activate)
authRouter.use(errorMiddleware);

module.exports = authRouter;