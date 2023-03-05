const AuthError = require('../exceptions/auth-error')
const tokenService = require('../services/token-service');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) {
            return next(AuthError.UnauthorizedError());
        }

        const accessToken = req.headers.authorization.split(' ')[1]
        if(!accessToken) {
            return next(AuthError.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if(!userData) {
            return next(AuthError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (e) {
        throw AuthError.UnauthorizedError();
    }
}