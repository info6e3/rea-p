module.exports = class AuthError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new AuthError(401, 'Пользователь не авторизован')
    }

    static BadRequest(message, errors = []) {
        return new AuthError(400, message, errors);
    }
}