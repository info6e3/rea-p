const Database = require("../database");
const bcrypt = require('bcryptjs');
const tokenService = require('./token-service');
const uuid = require('uuid');
const mailService = require('../services/mail-service')
const AuthError = require('../exceptions/auth-error')
async function getUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = '${email}'`;
    const {rows} = await Database.dbClient.query(query);
    return rows[0];
}

async function getUserById(id) {
    const query = `SELECT * FROM users WHERE id = '${id}'`;
    const {rows} = await Database.dbClient.query(query);
    return rows[0];
}

class UserService {
    // (str, str): number(id) | null
    async getUser(id) {
        return getUserById(id);
    }

    async validateEmail(email) {
        if(await getUserByEmail(email)) {
            throw AuthError.BadRequest('Такой email уже зарегестрирован.')
        }
        return true;
    }

    async registration (user) {
        const {email, password, role, name, surname, description = null, birth_date = null} = {...user};
        if(await getUserByEmail(email)) {
            throw AuthError.BadRequest('Такой email уже зарегестрирован.')
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        const activationLink = uuid.v4();

        await mailService.sendActivationLink(email, `${process.env.CLIENT_URL}/activate/${activationLink}`);

        let id;
        {
            const query =  {
                text: `INSERT INTO users (email, password, role, name, surname, description, birth_date, registration_date, active)
                       VALUES ($1, $2, $3, $4, $5, $6, $7, 'NOW()', $8) RETURNING id`,
                values: [email, hashPassword, role, name, surname, description, birth_date, false]
            }
            const {rows} = await Database.dbClient.query(query)
            id = rows[0].id
        }
        {
            const query = `INSERT INTO activation_links (user_id, link)\n` +
                `VALUES (${id}, '${activationLink}')`;
            await Database.dbClient.query(query)
        }

        return true;
    }

    async login (email, password) {
        const user = await getUserByEmail(email)
        if(!user) {
            throw AuthError.BadRequest('Такого пользователя нет.')
        }
        if(!user.active) {
            throw AuthError.BadRequest('Учетная запись не активна.')
        }
        const validPassword = bcrypt.compareSync(password, user.password);
        if(!validPassword) {
            throw AuthError.BadRequest('Неправильный пароль.')
        }
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        const tokens = tokenService.generateTokens(payload);
        await tokenService.saveToken(user.id, tokens.refreshToken)
        return {
            user,
            ...tokens
        }
    }

    async activate(uuid) {
        let id;
        {
            const query = `SELECT user_id FROM activation_links WHERE link = '${uuid}'`;
            const {rows} = await Database.dbClient.query(query)
            id = rows[0].user_id
        }
        if(!id) {
            throw AuthError.BadRequest('Такой ссылки нет')
        }
        const query = `UPDATE users SET active = TRUE WHERE id = ${id}`;
        await Database.dbClient.query(query)
        return true;
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if(!refreshToken) {
            throw AuthError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const userId = await tokenService.findUserIdByToken(refreshToken);
        if(!userData || !userId) {
            throw AuthError.UnauthorizedError();
        }
        const user = await getUserById(userId);
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role
        }
        const tokens = tokenService.generateTokens(payload);
        await tokenService.saveToken(payload.id, tokens.refreshToken)
        return {
            user,
            ...tokens
        }
    }
}

module.exports = new UserService();