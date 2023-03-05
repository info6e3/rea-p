const {validationResult} = require('express-validator');
const userService = require('../services/user-service');
const AuthError = require('../exceptions/auth-error')

class AuthController {

    async validateEmail(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(AuthError.BadRequest('Ошибка валидации.', errors.array()));
            }
            const {email} = req.query;
            const validateStatus = await userService.validateEmail(email);
            return res.status(200).send(validateStatus)
        } catch(e) {
            next(e);
        }
    }
    async registration(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(AuthError.BadRequest('Ошибка валидации.', errors.array()));
            }
            const {user} = req.body;
            const registrationStatus = await userService.registration(user);
            return res.status(200).send(registrationStatus)
        } catch(e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const loginStatus = await userService.login(email, password);
            res.cookie('refreshToken', loginStatus.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.status(200).send(loginStatus)
        } catch(e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const {uuid} = req.query;
            const result = await userService.activate(uuid);
            return res.status(200).send(result);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).send(token);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const refreshStatus = await userService.refresh(refreshToken);
            res.cookie('refreshToken', refreshStatus.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
            return res.status(200).send(refreshStatus)
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new AuthController();