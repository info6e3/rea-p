const jwt = require("jsonwebtoken");
const Database = require("../database");

async function checkToken(userId) {
    const query = `SELECT * FROM tokens WHERE user_id = ${userId}`;
    const {rows} = await Database.dbClient.query(query);
    return rows[0];
}

class TokenService {
     generateTokens(payload) {
         const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.JWT_ACCESS_TIME})
         const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.JWT_REFRESH_TIME})
         return {
             accessToken,
             refreshToken
         }
     }

     validateAccessToken(token) {
         try {
            const result = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return result;
         } catch (e) {
            return null;
         }
     }

    validateRefreshToken(token) {
        try {
            const result = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return result;
        } catch (e) {
            return null;
        }
    }

     async saveToken(userId, refreshToken) {
         if(!await checkToken(userId)) {
             const query = `INSERT INTO tokens (user_id, refresh_token) VALUES(${userId}, '${refreshToken}')`;
             await Database.dbClient.query(query);
         } else {
             const query = `UPDATE tokens SET refresh_token = '${refreshToken}' WHERE user_id = ${userId}`;
             await Database.dbClient.query(query);
         }
     }

     async removeToken(refreshToken) {
         const query = `DELETE FROM tokens WHERE refresh_token = '${refreshToken}'`;
         await Database.dbClient.query(query)
         return true;
     }

    async findUserIdByToken(refreshToken) {
        const query = `SELECT user_id FROM tokens WHERE refresh_token = '${refreshToken}'`;
        const {rows} = await Database.dbClient.query(query)
        if(!rows[0]) {
            return false;
        }
        return rows[0].user_id;
    }
}

module.exports = new TokenService();